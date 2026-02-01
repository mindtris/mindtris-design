// Application configuration constants
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10),
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Authentication
  auth: {
    provider: process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'local',
    jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET || 'your-jwt-secret-here',
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    refreshTokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  },

  // Pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
    pageSizeOptions: [10, 20, 50, 100],
  },

  // Date & Time
  dateTime: {
    formats: {
      date: 'yyyy-MM-dd',
      time: 'HH:mm:ss',
      datetime: 'yyyy-MM-dd HH:mm:ss',
      display: 'MMM dd, yyyy',
      displayWithTime: 'MMM dd, yyyy HH:mm',
      iso: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    },
    timezone: 'UTC',
    locale: 'en-US',
  },

  // File Upload
  fileUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB in bytes
    allowedTypes: {
      images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      spreadsheets: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      archives: ['application/zip', 'application/x-rar-compressed'],
    },
    s3: {
      bucket: process.env.NEXT_PUBLIC_S3_BUCKET || '',
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  },

  // UI Configuration
  ui: {
    theme: {
      default: 'system',
      options: ['light', 'dark', 'system'],
    },
    sidebar: {
      collapsedWidth: 64,
      expandedWidth: 256,
      mobileBreakpoint: 768,
    },
    notifications: {
      duration: 5000, // 5 seconds
      maxVisible: 5,
    },
    animations: {
      duration: 200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // External Services
  services: {
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      secretKey: process.env.STRIPE_SECRET_KEY || '',
    },
    googleAnalytics: {
      id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
    },
    sentry: {
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    },
  },

  // Email Configuration
  email: {
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
    from: {
      name: 'Mindtris Support',
      email: 'support@mindtris.com',
    },
    templates: {
      welcome: 'welcome',
      resetPassword: 'reset-password',
      notification: 'notification',
    },
  },

  // Database
  database: {
    url: process.env.DATABASE_URL || '',
    pool: {
      min: 2,
      max: 10,
    },
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: 3600, // 1 hour in seconds
  },

  // Application
  app: {
    name: 'Mindtris',
    version: '1.0.0',
    environment: process.env.NEXT_PUBLIC_APP_ENV || 'development',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    supportEmail: 'support@mindtris.com',
    features: {
      registration: true,
      notifications: true,
      analytics: true,
      maintenance: false,
    },
  },

  // Security
  security: {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      credentials: true,
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
    password: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
  },

  // Monitoring
  monitoring: {
    enabled: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    logLevel: process.env.NEXT_PUBLIC_APP_ENV === 'development' ? 'debug' : 'info',
  },
} as const

// Type definitions for better TypeScript support
export type Config = typeof config
export type ApiConfig = typeof config.api
export type AuthConfig = typeof config.auth
export type PaginationConfig = typeof config.pagination
export type DateTimeConfig = typeof config.dateTime
export type FileUploadConfig = typeof config.fileUpload
export type UIConfig = typeof config.ui
export type ServicesConfig = typeof config.services
export type EmailConfig = typeof config.email
export type DatabaseConfig = typeof config.database
export type RedisConfig = typeof config.redis
export type AppConfig = typeof config.app
export type SecurityConfig = typeof config.security
export type MonitoringConfig = typeof config.monitoring

// Utility functions for configuration
export const getConfig = () => config

export const isDevelopment = () => config.app.environment === 'development'
export const isProduction = () => config.app.environment === 'production'
export const isStaging = () => config.app.environment === 'staging'

export const getApiUrl = (endpoint: string = '') => {
  const baseUrl = config.api.baseUrl.endsWith('/') 
    ? config.api.baseUrl.slice(0, -1) 
    : config.api.baseUrl
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${baseUrl}${cleanEndpoint}`
}

export const getFileUrl = (path: string) => {
  if (path.startsWith('http')) return path
  return `${config.app.url}${path.startsWith('/') ? path : `/${path}`}`
}

export const formatDate = (date: Date | string, format: keyof typeof config.dateTime.formats = 'display') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  // This would typically use a date formatting library like date-fns
  return dateObj.toLocaleDateString(config.dateTime.locale)
}

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat(config.dateTime.locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat(config.dateTime.locale).format(number)
}

// Validation helpers
export const validateFileSize = (size: number) => {
  return size <= config.fileUpload.maxSize
}

export const validateFileType = (type: string, category: keyof typeof config.fileUpload.allowedTypes) => {
  return (config.fileUpload.allowedTypes[category] as readonly string[]).includes(type)
}

export const validatePassword = (password: string) => {
  const { minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars } = config.security.password
  
  if (password.length < minLength) return false
  if (requireUppercase && !/[A-Z]/.test(password)) return false
  if (requireLowercase && !/[a-z]/.test(password)) return false
  if (requireNumbers && !/[0-9]/.test(password)) return false
  if (requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) return false
  
  return true
}

// Environment-specific configurations
export const getEnvironmentConfig = () => {
  const env = config.app.environment
  
  switch (env) {
    case 'development':
      return {
        api: {
          ...config.api,
          timeout: 30000, // Longer timeout for development
        },
        monitoring: {
          ...config.monitoring,
          enabled: false,
          logLevel: 'debug' as const,
        },
      }
    case 'staging':
      return {
        api: {
          ...config.api,
          timeout: 15000,
        },
        monitoring: {
          ...config.monitoring,
          enabled: true,
          logLevel: 'warn' as const,
        },
      }
    case 'production':
      return {
        api: {
          ...config.api,
          timeout: 10000,
        },
        monitoring: {
          ...config.monitoring,
          enabled: true,
          logLevel: 'error' as const,
        },
      }
    default:
      return config
  }
}
