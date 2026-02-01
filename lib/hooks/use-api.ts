import { useState, useEffect, useCallback } from 'react'
import { BaseApiResponse, ApiError } from '../api/types'

// Generic API hook for handling async operations
export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(async (apiCall: () => Promise<BaseApiResponse<T>>) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await apiCall()
      setData(response.data)
      return response
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset
  }
}

// Hook for handling paginated data
export function usePaginatedApi<T = any>() {
  const [data, setData] = useState<T[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(async (
    apiCall: (page: number, limit: number) => Promise<any>,
    page: number = 1,
    limit: number = 10
  ) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await apiCall(page, limit)
      setData(response.data)
      setPagination(response.pagination)
      return response
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = useCallback(async (
    apiCall: (page: number, limit: number) => Promise<any>
  ) => {
    if (!pagination.hasNext || loading) return

    setLoading(true)
    try {
      const response = await apiCall(pagination.page + 1, pagination.limit)
      setData(prev => [...prev, ...response.data])
      setPagination(response.pagination)
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
    } finally {
      setLoading(false)
    }
  }, [pagination, loading])

  const reset = useCallback(() => {
    setData([])
    setPagination({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false
    })
    setError(null)
    setLoading(false)
  }, [])

  return {
    data,
    pagination,
    loading,
    error,
    execute,
    loadMore,
    reset
  }
}

// Hook for handling form submissions
export function useFormApi<T = any>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = useCallback(async (apiCall: () => Promise<BaseApiResponse<T>>) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      const response = await apiCall()
      setSuccess(true)
      return response
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setSuccess(false)
    setLoading(false)
  }, [])

  return {
    loading,
    error,
    success,
    submit,
    reset
  }
}

// Hook for handling file uploads
export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<ApiError | null>(null)
  const [uploadedFile, setUploadedFile] = useState<any>(null)

  const upload = useCallback(async (
    file: File,
    apiCall: (file: File, onProgress?: (progress: number) => void) => Promise<any>
  ) => {
    setUploading(true)
    setError(null)
    setProgress(0)
    setUploadedFile(null)
    
    try {
      const response = await apiCall(file, setProgress)
      setUploadedFile(response.data)
      return response
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    } finally {
      setUploading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setProgress(0)
    setUploadedFile(null)
    setUploading(false)
  }, [])

  return {
    uploading,
    progress,
    error,
    uploadedFile,
    upload,
    reset
  }
}

// Hook for handling real-time data (WebSocket-like behavior)
export function useRealtimeApi<T = any>(
  apiCall: () => Promise<BaseApiResponse<T>>,
  interval: number = 30000
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await apiCall()
      setData(response.data)
      setIsConnected(true)
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  useEffect(() => {
    fetchData()
    
    const intervalId = setInterval(fetchData, interval)
    
    return () => clearInterval(intervalId)
  }, [fetchData, interval])

  return {
    data,
    loading,
    error,
    isConnected,
    refetch: fetchData
  }
}
