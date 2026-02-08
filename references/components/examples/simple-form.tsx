'use client'

import { useForm } from '@/lib/hooks/use-form'
import { loginSchema } from '@/lib/validations/schemas'

export default function SimpleForm() {
  const form = useForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Form submitted:', data)
    }
    // Handle form submission here
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Address
        </label>
        <input
          {...form.register('email')}
          type="email"
          id="email"
          className="form-input w-full"
          placeholder="Enter your email"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <input
          {...form.register('password')}
          type="password"
          id="password"
          className="form-input w-full"
          placeholder="Enter your password"
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <input
          {...form.register('rememberMe')}
          type="checkbox"
          id="rememberMe"
          className="form-checkbox"
        />
        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          Remember me
        </label>
      </div>

      <button
        type="submit"
        disabled={!form.formState.isValid || form.formState.isSubmitting}
        className="btn bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 w-full"
      >
        {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
