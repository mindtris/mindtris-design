import { useState } from 'react'
import { mutate } from 'swr'
import { apiClient } from '../api-client'
import { swrKeys, swrMutations } from '../swr-config'
import { BaseApiResponse, CreateRequest, UpdateRequest, DeleteRequest } from '../api/types'

// Generic mutation hook for API operations
export function useMutation<T = any, P = any>(
  mutationFn: (params: P) => Promise<BaseApiResponse<T>>,
  options?: {
    onSuccess?: (data: T, params: P) => void
    onError?: (error: any, params: P) => void
    onSettled?: (data: T | undefined, error: any, params: P) => void
    optimisticUpdate?: {
      key: string | string[]
      data: T
      rollback?: T
    }
  }
) {
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState<any>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const mutate = async (params: P) => {
    setIsLoading(true)
    setError(undefined)
    setData(undefined)
    setIsSuccess(false)

    // Optimistic update
    if (options?.optimisticUpdate) {
      const rollback = swrMutations.optimisticUpdate(
        mutate,
        options.optimisticUpdate.key,
        options.optimisticUpdate.data,
        options.optimisticUpdate.rollback
      )
    }

    try {
      const response = await mutationFn(params)
      setData(response.data)
      setIsSuccess(true)
      options?.onSuccess?.(response.data, params)
      return response.data
    } catch (err) {
      setError(err)
      options?.onError?.(err, params)
      throw err
    } finally {
      setIsLoading(false)
      options?.onSettled?.(data, error, params)
    }
  }

  const reset = () => {
    setData(undefined)
    setError(undefined)
    setIsLoading(false)
    setIsSuccess(false)
  }

  return {
    mutate,
    data,
    error,
    isLoading,
    isSuccess,
    reset
  }
}

// Authentication mutations
export function useAuthMutations() {
  const login = useMutation(
    async (credentials: { email: string; password: string }) => {
      const response = await apiClient.post('/auth/login', credentials)
      // Store token
      apiClient.setAuthToken(response.data.token, true)
      return response.data
    },
    {
      onSuccess: () => {
        // Revalidate user profile
        mutate(swrKeys.userProfile())
      }
    }
  )

  const register = useMutation(
    async (userData: { email: string; password: string; name: string }) => {
      return apiClient.post('/auth/register', userData)
    }
  )

  const logout = useMutation(
    async () => {
      const response = await apiClient.post('/auth/logout')
      apiClient.clearAuthToken()
      return response
    },
    {
      onSuccess: () => {
        // Clear all cached data
        mutate(() => true)
      }
    }
  )

  const updateProfile = useMutation(
    async (data: any) => {
      return apiClient.patch('/auth/profile', data)
    },
    {
      onSuccess: () => {
        // Revalidate user profile
        mutate(swrKeys.userProfile())
      }
    }
  )

  return {
    login,
    register,
    logout,
    updateProfile
  }
}

// User management mutations
export function useUserMutations() {
  const createUser = useMutation(
    async (data: CreateRequest<any>) => {
      return apiClient.post('/users', data)
    },
    {
      onSuccess: () => {
        // Revalidate users list
        mutate(swrKeys.users())
      }
    }
  )

  const updateUser = useMutation(
    async (data: UpdateRequest<any>) => {
      return apiClient.patch(`/users/${data.id}`, data.data)
    },
    {
      onSuccess: (updatedUser, params) => {
        // Revalidate users list and specific user
        mutate(swrKeys.users())
        mutate(swrKeys.user(params.id))
      }
    }
  )

  const deleteUser = useMutation(
    async (data: DeleteRequest) => {
      return apiClient.delete(`/users/${data.id}`)
    },
    {
      onSuccess: () => {
        // Revalidate users list
        mutate(swrKeys.users())
      }
    }
  )

  return {
    createUser,
    updateUser,
    deleteUser
  }
}

// Product mutations
export function useProductMutations() {
  const createProduct = useMutation(
    async (data: CreateRequest<any>) => {
      return apiClient.post('/products', data)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.products())
      }
    }
  )

  const updateProduct = useMutation(
    async (data: UpdateRequest<any>) => {
      return apiClient.patch(`/products/${data.id}`, data.data)
    },
    {
      onSuccess: (updatedProduct, params) => {
        mutate(swrKeys.products())
        mutate(swrKeys.product(params.id))
      }
    }
  )

  const deleteProduct = useMutation(
    async (data: DeleteRequest) => {
      return apiClient.delete(`/products/${data.id}`)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.products())
      }
    }
  )

  return {
    createProduct,
    updateProduct,
    deleteProduct
  }
}

// Order mutations
export function useOrderMutations() {
  const createOrder = useMutation(
    async (data: CreateRequest<any>) => {
      return apiClient.post('/orders', data)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.orders())
      }
    }
  )

  const updateOrder = useMutation(
    async (data: UpdateRequest<any>) => {
      return apiClient.patch(`/orders/${data.id}`, data.data)
    },
    {
      onSuccess: (updatedOrder, params) => {
        mutate(swrKeys.orders())
        mutate(swrKeys.order(params.id))
      }
    }
  )

  const deleteOrder = useMutation(
    async (data: DeleteRequest) => {
      return apiClient.delete(`/orders/${data.id}`)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.orders())
      }
    }
  )

  return {
    createOrder,
    updateOrder,
    deleteOrder
  }
}

// Notification mutations
export function useNotificationMutations() {
  const markAsRead = useMutation(
    async (id: string) => {
      return apiClient.patch(`/notifications/${id}/read`)
    },
    {
      onSuccess: (_, id) => {
        mutate(swrKeys.notifications())
        mutate(swrKeys.notification(id))
      }
    }
  )

  const markAllAsRead = useMutation(
    async () => {
      return apiClient.patch('/notifications/read-all')
    },
    {
      onSuccess: () => {
        mutate(swrKeys.notifications())
      }
    }
  )

  const deleteNotification = useMutation(
    async (id: string) => {
      return apiClient.delete(`/notifications/${id}`)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.notifications())
      }
    }
  )

  return {
    markAsRead,
    markAllAsRead,
    deleteNotification
  }
}

// Settings mutations
export function useSettingsMutations() {
  const updateSettings = useMutation(
    async (data: any) => {
      return apiClient.patch('/settings', data)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.settings())
      }
    }
  )

  return {
    updateSettings
  }
}

// File upload mutations
export function useFileMutations() {
  const uploadFile = useMutation(
    async (file: File) => {
      return apiClient.upload('/files/upload', file)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.files())
      }
    }
  )

  const deleteFile = useMutation(
    async (filename: string) => {
      return apiClient.delete(`/files/${filename}`)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.files())
      }
    }
  )

  return {
    uploadFile,
    deleteFile
  }
}

// Generic CRUD mutations
export function useCrudMutations<T extends { id: string }>(resource: string) {
  const create = useMutation(
    async (data: CreateRequest<T>) => {
      return apiClient.post(`/${resource}`, data)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.list(resource))
      }
    }
  )

  const update = useMutation(
    async (data: UpdateRequest<T>) => {
      return apiClient.patch(`/${resource}/${data.id}`, data.data)
    },
    {
      onSuccess: (updatedItem, params) => {
        mutate(swrKeys.list(resource))
        mutate(swrKeys.detail(resource, params.id))
      }
    }
  )

  const remove = useMutation(
    async (data: DeleteRequest) => {
      return apiClient.delete(`/${resource}/${data.id}`)
    },
    {
      onSuccess: () => {
        mutate(swrKeys.list(resource))
      }
    }
  )

  return {
    create,
    update,
    remove
  }
}

// Batch operations
export function useBatchMutations() {
  const batchUpdate = useMutation(
    async (updates: Array<{ id: string; data: any }>) => {
      return apiClient.post('/batch/update', { updates })
    }
  )

  const batchDelete = useMutation(
    async (ids: string[]) => {
      return apiClient.post('/batch/delete', { ids })
    }
  )

  return {
    batchUpdate,
    batchDelete
  }
}
