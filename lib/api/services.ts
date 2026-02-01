import { apiClient } from '../api-client'
import type {
  BaseApiResponse,
  PaginatedResponse,
  PaginationParams,
  SearchParams,
  CreateRequest,
  UpdateRequest,
  DeleteRequest,
  User,
  Product,
  Order,
  DashboardStats,
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  Notification,
  AppSettings,
  FileUploadResponse
} from './types'

// Authentication Services
export const authService = {
  async login(credentials: LoginRequest) {
    return apiClient.post('/auth/login', credentials)
  },

  async register(userData: RegisterRequest) {
    return apiClient.post('/auth/register', userData)
  },

  async logout() {
    return apiClient.post('/auth/logout')
  },

  async refreshToken() {
    return apiClient.post('/auth/refresh')
  },

  async forgotPassword(email: string) {
    return apiClient.post('/auth/forgot-password', { email })
  },

  async resetPassword(token: string, password: string) {
    return apiClient.post('/auth/reset-password', { token, password })
  },

  async getProfile() {
    return apiClient.get('/auth/profile')
  },

  async updateProfile(data: Partial<User>) {
    return apiClient.patch('/auth/profile', data)
  }
}

// User Management Services
export const userService = {
  async getUsers(params?: PaginationParams) {
    return apiClient.get('/users', { params })
  },

  async getUser(id: string) {
    return apiClient.get(`/users/${id}`)
  },

  async createUser(data: CreateRequest<User>) {
    return apiClient.post('/users', data)
  },

  async updateUser(data: UpdateRequest<User>) {
    return apiClient.patch(`/users/${data.id}`, data.data)
  },

  async deleteUser(data: DeleteRequest) {
    return apiClient.delete(`/users/${data.id}`)
  },

  async searchUsers(params: SearchParams) {
    return apiClient.get('/users/search', { params })
  }
}

// Dashboard Services
export const dashboardService = {
  async getStats() {
    return apiClient.get('/dashboard/stats')
  },

  async getChartData(type: string, period: string) {
    return apiClient.get(`/dashboard/charts/${type}`, { 
      params: { period } 
    })
  }
}

// Product Services
export const productService = {
  async getProducts(params?: PaginationParams) {
    return apiClient.get('/products', { params })
  },

  async getProduct(id: string) {
    return apiClient.get(`/products/${id}`)
  },

  async createProduct(data: CreateRequest<Product>) {
    return apiClient.post('/products', data)
  },

  async updateProduct(data: UpdateRequest<Product>) {
    return apiClient.patch(`/products/${data.id}`, data.data)
  },

  async deleteProduct(data: DeleteRequest) {
    return apiClient.delete(`/products/${data.id}`)
  },

  async searchProducts(params: SearchParams) {
    return apiClient.get('/products/search', { params })
  }
}

// Order Services
export const orderService = {
  async getOrders(params?: PaginationParams) {
    return apiClient.get('/orders', { params })
  },

  async getOrder(id: string) {
    return apiClient.get(`/orders/${id}`)
  },

  async createOrder(data: CreateRequest<Order>) {
    return apiClient.post('/orders', data)
  },

  async updateOrder(data: UpdateRequest<Order>) {
    return apiClient.patch(`/orders/${data.id}`, data.data)
  },

  async deleteOrder(data: DeleteRequest) {
    return apiClient.delete(`/orders/${data.id}`)
  },

  async searchOrders(params: SearchParams) {
    return apiClient.get('/orders/search', { params })
  }
}

// Notification Services
export const notificationService = {
  async getNotifications(params?: PaginationParams) {
    return apiClient.get('/notifications', { params })
  },

  async markAsRead(id: string) {
    return apiClient.patch(`/notifications/${id}/read`)
  },

  async markAllAsRead() {
    return apiClient.patch('/notifications/read-all')
  },

  async deleteNotification(id: string) {
    return apiClient.delete(`/notifications/${id}`)
  }
}

// Settings Services
export const settingsService = {
  async getSettings() {
    return apiClient.get('/settings')
  },

  async updateSettings(data: Partial<AppSettings>) {
    return apiClient.patch('/settings', data)
  }
}

// File Upload Services
export const fileService = {
  async uploadFile(file: File, folder?: string) {
    const formData = new FormData()
    formData.append('file', file)
    if (folder) formData.append('folder', folder)
    
    return apiClient.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  async deleteFile(filename: string) {
    return apiClient.delete(`/files/${filename}`)
  }
}

// Generic CRUD Factory
export function createCrudService<T extends { id: string }>(endpoint: string) {
  return {
    async getAll(params?: PaginationParams) {
      return apiClient.get(`/${endpoint}`, { params })
    },

    async getById(id: string) {
      return apiClient.get(`/${endpoint}/${id}`)
    },

    async create(data: CreateRequest<T>) {
      return apiClient.post(`/${endpoint}`, data)
    },

    async update(data: UpdateRequest<T>) {
      return apiClient.patch(`/${endpoint}/${data.id}`, data.data)
    },

    async delete(data: DeleteRequest) {
      return apiClient.delete(`/${endpoint}/${data.id}`)
    },

    async search(params: SearchParams) {
      return apiClient.get(`/${endpoint}/search`, { params })
    }
  }
}