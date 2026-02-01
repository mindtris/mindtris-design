import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// Types for API responses
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  status: number
}

export interface ApiError {
  message: string
  status: number
  code?: string
  details?: any
}

// Environment variables
import { config } from '@/lib/config'

const API_BASE_URL = config.api.baseUrl
const API_TIMEOUT = config.api.timeout

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId()

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
          })
        }

        return config
      },
      (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Request Error:', error)
        }
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
          })
        }

        return response
      },
      (error: AxiosError) => {
        const apiError = this.handleError(error)
        
        // Log error
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ API Error:', apiError)
        }

        // Handle specific error cases
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }

        return Promise.reject(apiError)
      }
    )
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        message: (error.response.data as any)?.message || error.message,
        status: error.response.status,
        code: (error.response.data as any)?.code,
        details: error.response.data,
      }
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error - please check your connection',
        status: 0,
        code: 'NETWORK_ERROR',
      }
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0,
        code: 'UNKNOWN_ERROR',
      }
    }
  }

  private handleUnauthorized() {
    // Clear auth tokens
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_token')
    }
    
    // Redirect to login (you can customize this)
    if (typeof window !== 'undefined') {
      window.location.href = '/signin'
    }
  }

  // HTTP Methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put(url, data, config)
    return response.data
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete(url, config)
    return response.data
  }

  // File upload method
  async upload<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    })

    return response.data
  }

  // Set auth token
  setAuthToken(token: string, persistent: boolean = true) {
    if (typeof window === 'undefined') return
    
    if (persistent) {
      localStorage.setItem('auth_token', token)
    } else {
      sessionStorage.setItem('auth_token', token)
    }
  }

  // Clear auth token
  clearAuthToken() {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem('auth_token')
    sessionStorage.removeItem('auth_token')
  }

  // Get the underlying axios instance for advanced usage
  getInstance(): AxiosInstance {
    return this.client
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient()

// Export types for use in other files
export type { AxiosRequestConfig, AxiosResponse, AxiosError }
