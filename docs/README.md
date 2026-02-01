# Mindtris Template - Developer Guide

A comprehensive Next.js template with enterprise-grade features for rapid development.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp env.example .env.local

# Start development server
pnpm dev
```

## 📁 Project Structure

```
mindtris-template/
├── app/                    # Next.js App Router
├── components/             # Reusable UI components
│   ├── ui/                # Core UI components (Card, LoadingSpinner, etc.)
│   ├── charts/            # Chart components (ChartWrapper, etc.)
│   └── examples/          # Example components
├── lib/                    # Utilities, config, and business logic
│   ├── api-client.ts      # Axios-based API client
│   ├── config.ts          # Centralized configuration
│   ├── swr-config.ts      # SWR data fetching setup
│   ├── validations/       # Zod schemas
│   ├── hooks/             # Custom React hooks
│   └── utils.ts           # Utility functions
├── docs/                   # Documentation
└── public/                 # Static assets
```

## 🔧 Core Features

### 1. API Client (Axios)
```typescript
import { apiClient } from '@/lib/api-client'

// GET request
const users = await apiClient.get('/users')

// POST request
const newUser = await apiClient.post('/users', userData)

// With error handling
try {
  const data = await apiClient.get('/users')
} catch (error) {
  console.error('API Error:', error)
}
```

### 2. Data Fetching (SWR)
```typescript
import { useUsers, useDashboardStats } from '@/lib/hooks/use-swr'

function UsersList() {
  const { data: users, error, isLoading } = useUsers()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### 3. Forms & Validation (React Hook Form + Zod)
```typescript
import { useForm } from '@/lib/hooks/use-form'
import { loginSchema } from '@/lib/validations/schemas'

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    schema: loginSchema
  })

  const onSubmit = (data) => {
    console.log('Form data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        className="form-input"
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        {...register('password')}
        type="password"
        className="form-input"
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit" className="btn bg-violet-600 text-white">
        Login
      </button>
    </form>
  )
}
```

### 4. Loading & Error States
```typescript
import { ApiState } from '@/components/ui/api-state'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

function DataComponent() {
  const { data, error, isLoading } = useUsers()

  return (
    <ApiState
      data={data}
      error={error}
      loading={isLoading}
      loadingComponent={<LoadingSpinner size="lg" />}
      emptyTitle="No users found"
      emptyDescription="Get started by creating your first user."
    >
      {/* Your data rendering logic */}
      <UserList users={data} />
    </ApiState>
  )
}
```

### 5. Charts & Cards
```typescript
import { LineChart, BarChart, DoughnutChart } from '@/components/charts/chart-wrapper'
import { DashboardCard, StatCard } from '@/components/ui/card'

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard>
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-3xl font-bold">1,234</p>
      </StatCard>
      
      <DashboardCard>
        <LineChart 
          data={chartData}
          title="User Growth"
          height={300}
        />
      </DashboardCard>
    </div>
  )
}
```

### 6. Configuration
```typescript
import { config, getApiUrl, formatCurrency } from '@/lib/config'

// Access configuration
const apiUrl = config.api.baseUrl
const maxFileSize = config.fileUpload.maxSize

// Use utility functions
const userUrl = getApiUrl('/users')
const price = formatCurrency(99.99, 'USD')
```

## 🎨 Styling

The template uses Tailwind CSS with custom design system:

```typescript
// Form inputs
<input className="form-input" />

// Buttons
<button className="btn bg-violet-600 text-white hover:bg-violet-700">
  Primary Button
</button>

// Cards
<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
  Card content
</div>
```

## 🔐 Environment Variables

Create `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_API_TIMEOUT=10000

# Authentication
NEXT_PUBLIC_AUTH_PROVIDER=local
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-here

# Application
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📚 Common Patterns

### API Integration
```typescript
// 1. Define types
interface User {
  id: string
  name: string
  email: string
}

// 2. Create SWR hook
export const useUsers = () => {
  return useSWR<User[]>('/users', swrFetcher)
}

// 3. Use in component
function UsersPage() {
  const { data: users, error, isLoading } = useUsers()
  
  return (
    <ApiState data={users} error={error} loading={isLoading}>
      <UserList users={users} />
    </ApiState>
  )
}
```

### Form Handling
```typescript
// 1. Define schema
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

// 2. Create form
function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    schema: userSchema
  })

  const onSubmit = async (data) => {
    try {
      await apiClient.post('/users', data)
      // Handle success
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

### Error Boundaries
```typescript
import { ErrorBoundary } from '@/components/ui/error-boundary'

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <YourComponent />
    </ErrorBoundary>
  )
}
```

## 🛠️ Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript check
```

## 🎯 Key Benefits

- **Type-safe** - Full TypeScript support
- **Performance** - SWR caching and optimization
- **Developer Experience** - Hot reload, error boundaries
- **Scalable** - Modular architecture
- **Production-ready** - Error handling, loading states
- **Customizable** - Centralized configuration

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [SWR](https://swr.vercel.app/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

---

**Ready to build? Start with `pnpm dev` and check the examples in `/components/examples/`**
