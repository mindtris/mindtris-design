import useSWR, { SWRResponse, mutate } from 'swr'
import useSWRInfinite from 'swr/infinite'
import { swrFetcher, swrKeys, swrMutations } from '../swr-config'
import { BaseApiResponse, PaginatedResponse, PaginationParams } from '../api/types'

// Generic SWR hook for GET requests
export function useSWRData<T = any>(
  key: string | string[] | null,
  options?: any
): SWRResponse<T, any> {
  return useSWR(key, swrFetcher, options)
}

// Hook for user data
export function useUser(id?: string) {
  const key = id ? swrKeys.user(id) : null
  return useSWRData(key)
}

// Hook for users list with pagination
export function useUsers(params?: PaginationParams) {
  return useSWRData<PaginatedResponse<any>>(swrKeys.users(params))
}

// Hook for user profile
export function useUserProfile() {
  return useSWRData(swrKeys.userProfile())
}

// Hook for dashboard stats
export function useDashboardStats() {
  return useSWRData(swrKeys.dashboardStats())
}

// Hook for dashboard charts
export function useDashboardChart(type: string, period: string) {
  return useSWRData(swrKeys.dashboardChart(type, period))
}

// Hook for dashboard activity
export function useDashboardActivity() {
  return useSWRData(swrKeys.dashboardActivity())
}

// Hook for products
export function useProducts(params?: PaginationParams) {
  return useSWRData<PaginatedResponse<any>>(swrKeys.products(params))
}

// Hook for single product
export function useProduct(id: string) {
  return useSWRData(swrKeys.product(id))
}

// Hook for orders
export function useOrders(params?: PaginationParams) {
  return useSWRData<PaginatedResponse<any>>(swrKeys.orders(params))
}

// Hook for single order
export function useOrder(id: string) {
  return useSWRData(swrKeys.order(id))
}

// Hook for user orders
export function useUserOrders(userId: string, params?: PaginationParams) {
  return useSWRData<PaginatedResponse<any>>(swrKeys.userOrders(userId, params))
}

// Hook for notifications
export function useNotifications(params?: PaginationParams) {
  return useSWRData<PaginatedResponse<any>>(swrKeys.notifications(params))
}

// Hook for settings
export function useSettings() {
  return useSWRData(swrKeys.settings())
}

// Hook for files
export function useFiles() {
  return useSWRData(swrKeys.files())
}

// Generic CRUD hooks
export function useList<T = any>(resource: string, params?: any) {
  return useSWRData<PaginatedResponse<T>>(swrKeys.list(resource, params))
}

export function useDetail<T = any>(resource: string, id: string) {
  return useSWRData<T>(swrKeys.detail(resource, id))
}

export function useSearch<T = any>(resource: string, query: string, filters?: any) {
  return useSWRData<PaginatedResponse<T>>(swrKeys.search(resource, query, filters))
}

// Mutation hooks for data updates
export function useSWRMutation() {
  return {
    // Optimistic update
    optimisticUpdate: <T>(
      key: string | string[],
      newData: T,
      rollbackData?: T
    ) => {
      return swrMutations.optimisticUpdate(mutate, key, newData, rollbackData)
    },
    
    // Add to list
    addToList: <T>(listKey: string | string[], newItem: T) => {
      return swrMutations.addToList(mutate, listKey, newItem)
    },
    
    // Update in list
    updateInList: <T extends { id: string }>(
      listKey: string | string[],
      updatedItem: T
    ) => {
      return swrMutations.updateInList(mutate, listKey, updatedItem)
    },
    
    // Remove from list
    removeFromList: <T extends { id: string }>(
      listKey: string | string[],
      itemId: string
    ) => {
      return swrMutations.removeFromList(mutate, listKey, itemId)
    },
    
    // Revalidate specific key
    revalidate: (key: string | string[]) => {
      return mutate(key)
    },
    
    // Revalidate all
    revalidateAll: () => {
      return mutate(() => true)
    }
  }
}

// Hook for infinite loading (pagination)
export function useInfiniteSWR<T = any>(
  key: string | string[],
  fetcher: (url: string, page: number) => Promise<PaginatedResponse<T>>,
  options?: any
) {
  const { data, error, isLoading, mutate, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.pagination.hasNext) return null
      return key ? [key, pageIndex + 1] : null
    },
    ([, page]) => fetcher(Array.isArray(key) ? key.join('/') : key, page || 1),
    {
      revalidateFirstPage: false,
      ...options
    }
  )

  const items = data ? data.flatMap(page => page.data) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.data?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.pagination?.hasNext === false)

  return {
    items,
    error,
    isLoading,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    size,
    setSize,
    mutate
  }
}

// Hook for real-time data with polling
export function useRealtimeSWR<T = any>(
  key: string | string[],
  interval: number = 30000,
  options?: any
) {
  return useSWRData<T>(key, {
    refreshInterval: interval,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    ...options
  })
}

// Hook for conditional data fetching
export function useConditionalSWR<T = any>(
  key: string | string[] | null,
  condition: boolean,
  options?: any
) {
  return useSWRData<T>(condition ? key : null, options)
}

// Hook for dependent data fetching
export function useDependentSWR<T = any>(
  key: string | string[] | null,
  dependencies: any[],
  options?: any
) {
  const shouldFetch = dependencies.every(dep => dep !== null && dep !== undefined)
  return useSWRData<T>(shouldFetch ? key : null, options)
}

// Hook for prefetching data
export function usePrefetch() {
  return {
    prefetch: (key: string | string[]) => {
      return mutate(key, swrFetcher(Array.isArray(key) ? key.join('/') : key))
    },
    
    prefetchUser: (id: string) => {
      return mutate(swrKeys.user(id), swrFetcher(`/users/${id}`))
    },
    
    prefetchUsers: (params?: PaginationParams) => {
      return mutate(swrKeys.users(params), swrFetcher('/users'))
    },
    
    prefetchDashboard: () => {
      return Promise.all([
        mutate(swrKeys.dashboardStats(), swrFetcher('/dashboard/stats')),
        mutate(swrKeys.dashboardActivity(), swrFetcher('/dashboard/activity'))
      ])
    }
  }
}
