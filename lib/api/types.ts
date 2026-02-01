// Common API types for the Mindtris template

// Base API response structure
export interface BaseApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  status: number
  timestamp?: string
}

// Pagination types
export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}

export interface PaginatedResponse<T> extends BaseApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
  GUEST = 'guest'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended'
}

// Authentication types
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
  expiresIn: number
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  role?: UserRole
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  totalOrders: number
  conversionRate: number
  growthRate: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    fill?: boolean
  }[]
}

// E-commerce types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  stock: number
  status: ProductStatus
  createdAt: string
  updatedAt: string
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued'
}

export interface Order {
  id: string
  userId: string
  products: OrderItem[]
  total: number
  status: OrderStatus
  shippingAddress: Address
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  product: Product
  quantity: number
  price: number
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// File upload types
export interface FileUploadResponse {
  url: string
  filename: string
  size: number
  mimeType: string
}

// Error types
export interface ApiError {
  message: string
  code: string
  status: number
  details?: any
  field?: string
}

// Generic CRUD operations
export interface CreateRequest<T> {
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
}

export interface UpdateRequest<T> {
  id: string
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
}

export interface DeleteRequest {
  id: string
}

// Search and filter types
export interface SearchParams {
  query: string
  filters?: Record<string, any>
  pagination?: PaginationParams
}

// Notification types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  createdAt: string
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

// Settings types
export interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

// Export all types as a namespace for easy importing
export namespace ApiTypes {
  export type Response<T> = BaseApiResponse<T>
  export type Paginated<T> = PaginatedResponse<T>
  export type Error = ApiError
}
