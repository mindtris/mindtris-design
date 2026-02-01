import { z } from 'zod'
import { config } from '@/lib/config'

// Common validation patterns
export const emailSchema = z.string().email('Please enter a valid email address')
export const passwordSchema = z
  .string()
  .min(config.security.password.minLength, `Password must be at least ${config.security.password.minLength} characters`)
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
  .min(10, 'Phone number must be at least 10 digits')

export const urlSchema = z.string().url('Please enter a valid URL')

// User schemas
export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: emailSchema,
  phone: phoneSchema.optional(),
  role: z.enum(['admin', 'user', 'guest'], {
    errorMap: () => ({ message: 'Please select a valid role' })
  }),
  avatar: z.string().url().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  isActive: z.boolean().default(true),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    notifications: z.boolean().default(true),
    language: z.string().default('en')
  }).optional()
})

export const createUserSchema = userSchema.omit({ id: true })
export const updateUserSchema = userSchema.partial().required({ id: true })

// Authentication schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false)
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

export const resetPasswordSchema = z.object({
  email: emailSchema
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmNewPassword: z.string()
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword']
})

// Product schemas
export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Product name must be at least 2 characters').max(100, 'Product name must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  price: z.number().min(0, 'Price must be a positive number'),
  cost: z.number().min(0, 'Cost must be a positive number').optional(),
  sku: z.string().min(1, 'SKU is required').max(50, 'SKU must be less than 50 characters'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
  minStock: z.number().int().min(0, 'Minimum stock must be a non-negative integer').default(0),
  maxStock: z.number().int().min(0, 'Maximum stock must be a non-negative integer').optional(),
  weight: z.number().min(0, 'Weight must be a positive number').optional(),
  dimensions: z.object({
    length: z.number().min(0).optional(),
    width: z.number().min(0).optional(),
    height: z.number().min(0).optional()
  }).optional(),
  images: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  isDigital: z.boolean().default(false),
  metadata: z.record(z.any()).optional()
})

export const createProductSchema = productSchema.omit({ id: true })
export const updateProductSchema = productSchema.partial().required({ id: true })

// Order schemas
export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0, 'Price must be a positive number'),
  discount: z.number().min(0).max(100, 'Discount must be between 0 and 100').default(0)
})

export const orderSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1, 'Customer ID is required'),
  items: z.array(orderItemSchema).min(1, 'Order must have at least one item'),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']).default('pending'),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).default('pending'),
  shippingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required')
  }),
  billingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required')
  }).optional(),
  subtotal: z.number().min(0, 'Subtotal must be a positive number'),
  tax: z.number().min(0, 'Tax must be a positive number').default(0),
  shipping: z.number().min(0, 'Shipping must be a positive number').default(0),
  discount: z.number().min(0, 'Discount must be a positive number').default(0),
  total: z.number().min(0, 'Total must be a positive number'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
  trackingNumber: z.string().optional(),
  estimatedDelivery: z.date().optional()
})

export const createOrderSchema = orderSchema.omit({ id: true })
export const updateOrderSchema = orderSchema.partial().required({ id: true })

// Contact/Support schemas
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters').max(1000, 'Message must be less than 1000 characters'),
  category: z.enum(['general', 'support', 'sales', 'billing', 'technical']).default('general'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium')
})

// Settings schemas
export const settingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().max(500, 'Description must be less than 500 characters').optional(),
  siteUrl: urlSchema,
  adminEmail: emailSchema,
  supportEmail: emailSchema,
  features: z.object({
    registration: z.boolean().default(true),
    notifications: z.boolean().default(true),
    analytics: z.boolean().default(true),
    maintenance: z.boolean().default(false)
  }),
  limits: z.object({
    maxUsers: z.number().int().min(1).default(1000),
    maxStorage: z.number().int().min(1).default(1000000), // in MB
    maxFileSize: z.number().int().min(1).default(10) // in MB
  }),
  integrations: z.object({
    googleAnalytics: z.string().optional(),
    stripe: z.string().optional(),
    sendgrid: z.string().optional()
  }).optional()
})

// File upload schemas
export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: 'Please select a file' }),
  category: z.enum(['avatar', 'product', 'document', 'other']).default('other'),
  description: z.string().max(200, 'Description must be less than 200 characters').optional()
})

// Search and filter schemas
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  filters: z.object({
    category: z.string().optional(),
    dateRange: z.object({
      from: z.date().optional(),
      to: z.date().optional()
    }).optional(),
    status: z.string().optional(),
    tags: z.array(z.string()).optional()
  }).optional(),
  sort: z.object({
    field: z.string().default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc')
  }).optional(),
  pagination: z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10)
  }).optional()
})

// Generic form schemas
export const genericFormSchema = z.object({
  fields: z.array(z.object({
    name: z.string(),
    type: z.enum(['text', 'email', 'password', 'number', 'select', 'textarea', 'checkbox', 'radio', 'date', 'file']),
    label: z.string(),
    placeholder: z.string().optional(),
    required: z.boolean().default(false),
    options: z.array(z.object({
      label: z.string(),
      value: z.string()
    })).optional(),
    validation: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      pattern: z.string().optional(),
      message: z.string().optional()
    }).optional()
  }))
})

// Export types
export type User = z.infer<typeof userSchema>
export type CreateUser = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>

export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>
export type ChangePasswordForm = z.infer<typeof changePasswordSchema>

export type Product = z.infer<typeof productSchema>
export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>

export type Order = z.infer<typeof orderSchema>
export type CreateOrder = z.infer<typeof createOrderSchema>
export type UpdateOrder = z.infer<typeof updateOrderSchema>

export type ContactForm = z.infer<typeof contactSchema>
export type Settings = z.infer<typeof settingsSchema>
export type FileUpload = z.infer<typeof fileUploadSchema>
export type SearchForm = z.infer<typeof searchSchema>
export type GenericForm = z.infer<typeof genericFormSchema>
