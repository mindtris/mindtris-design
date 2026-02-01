import { SWRConfiguration } from 'swr'
import { apiClient } from './api-client'
import { config } from './config'

// SWR fetcher function that works with our API client
export const swrFetcher = async (url: string) => {
  try {
    const response = await apiClient.get(url)
    return response.data
  } catch (error) {
    throw error
  }
}

// SWR fetcher for POST requests
export const swrPostFetcher = async (url: string, data: any) => {
  try {
    const response = await apiClient.post(url, data)
    return response.data
  } catch (error) {
    throw error
  }
}

// SWR fetcher for PUT requests
export const swrPutFetcher = async (url: string, data: any) => {
  try {
    const response = await apiClient.put(url, data)
    return response.data
  } catch (error) {
    throw error
  }
}

// SWR fetcher for DELETE requests
export const swrDeleteFetcher = async (url: string) => {
  try {
    const response = await apiClient.delete(url)
    return response.data
  } catch (error) {
    throw error
  }
}

// Global SWR configuration
export const swrConfig: SWRConfiguration = {
  fetcher: swrFetcher,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  revalidateIfStale: true,
  dedupingInterval: 2000,
  focusThrottleInterval: 5000,
  errorRetryCount: config.api.retryAttempts,
  errorRetryInterval: config.api.retryDelay,
  loadingTimeout: 10000,
  onError: (error: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('SWR Error:', error)
    }
    // You can add global error handling here
    // e.g., show toast notification, log to monitoring service
  },
  onSuccess: (data: any, key: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('SWR Success:', key, data)
    }
  },
  onLoadingSlow: (key: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('SWR Slow Loading:', key)
    }
  },
  onErrorRetry: (error: any, key: any, config: any, revalidate: any, { retryCount }: { retryCount: number }) => {
    // Don't retry on 4xx errors (client errors)
    if (error.status >= 400 && error.status < 500) {
      return
    }
    
    // Don't retry on 401 (unauthorized)
    if (error.status === 401) {
      return
    }
    
    // Retry up to 3 times for other errors
    if (retryCount >= 3) {
      return
    }
    
    // Exponential backoff
    const timeout = Math.min(1000 * 2 ** retryCount, 30000)
    setTimeout(() => revalidate({ retryCount }), timeout)
  }
}

// SWR key generators for consistent caching
export const swrKeys = {
  // User related keys
  users: (params?: any) => ['users', params],
  user: (id: string) => ['users', id],
  userProfile: () => ['auth', 'profile'],
  
  // Dashboard keys
  dashboardStats: () => ['dashboard', 'stats'],
  dashboardChart: (type: string, period: string) => ['dashboard', 'charts', type, period],
  dashboardActivity: () => ['dashboard', 'activity'],
  
  // Product keys
  products: (params?: any) => ['products', params],
  product: (id: string) => ['products', id],
  
  // Order keys
  orders: (params?: any) => ['orders', params],
  order: (id: string) => ['orders', id],
  userOrders: (userId: string, params?: any) => ['users', userId, 'orders', params],
  
  // Notification keys
  notifications: (params?: any) => ['notifications', params],
  notification: (id: string) => ['notifications', id],
  
  // Settings keys
  settings: () => ['settings'],
  
  // File keys
  files: () => ['files'],
  file: (filename: string) => ['files', filename],
  
  // Generic CRUD keys
  list: (resource: string, params?: any) => [resource, params],
  detail: (resource: string, id: string) => [resource, id],
  search: (resource: string, query: string, filters?: any) => [resource, 'search', query, filters]
}

// SWR mutation helpers
export const swrMutations = {
  // Optimistic update helper
  optimisticUpdate: <T>(
    mutate: any,
    key: string | string[],
    newData: T,
    rollbackData?: T
  ) => {
    // Update the cache optimistically
    mutate(key, newData, false)
    
    // Return a rollback function
    return () => {
      if (rollbackData !== undefined) {
        mutate(key, rollbackData, false)
      }
    }
  },
  
  // Add to list helper
  addToList: <T>(
    mutate: any,
    listKey: string | string[],
    newItem: T
  ) => {
    mutate(
      listKey,
      (currentData: T[] | undefined) => {
        if (!currentData) return [newItem]
        return [...currentData, newItem]
      },
      false
    )
  },
  
  // Update in list helper
  updateInList: <T extends { id: string }>(
    mutate: any,
    listKey: string | string[],
    updatedItem: T
  ) => {
    mutate(
      listKey,
      (currentData: T[] | undefined) => {
        if (!currentData) return [updatedItem]
        return currentData.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        )
      },
      false
    )
  },
  
  // Remove from list helper
  removeFromList: <T extends { id: string }>(
    mutate: any,
    listKey: string | string[],
    itemId: string
  ) => {
    mutate(
      listKey,
      (currentData: T[] | undefined) => {
        if (!currentData) return []
        return currentData.filter(item => item.id !== itemId)
      },
      false
    )
  }
}

// SWR provider configuration for the app
export const swrProviderConfig = {
  value: swrConfig
}
