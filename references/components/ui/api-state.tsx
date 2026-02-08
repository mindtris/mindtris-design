'use client'

import { ReactNode } from 'react'
import LoadingSpinner, { CardSkeleton, TableSkeleton } from './loading-spinner'
import { ErrorFallback } from './error-boundary'

// Inline empty state components following existing design patterns
function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  className 
}: { 
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string 
}) {
  const defaultIcon = (
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 mb-4">
      <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
  )

  return (
    <div className={`text-center py-16 ${className || ''}`}>
      {icon || defaultIcon}
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-2">{title}</h2>
      {description && (
        <div className="mb-6 text-gray-600 dark:text-gray-400">{description}</div>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  )
}

interface ApiStateProps {
  loading?: boolean
  error?: Error | string | null
  data?: any[] | any
  empty?: boolean
  loadingComponent?: ReactNode
  errorComponent?: ReactNode
  emptyComponent?: ReactNode
  children: ReactNode
  className?: string
  loadingText?: string
  emptyTitle?: string
  emptyDescription?: string
  errorTitle?: string
  errorDescription?: string
  onRetry?: () => void
  showRetry?: boolean
}

export default function ApiState({
  loading = false,
  error = null,
  data,
  empty = false,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
  className,
  loadingText = 'Loading...',
  emptyTitle = 'No data available',
  emptyDescription = 'There is no data to display at the moment.',
  errorTitle = 'Something went wrong',
  errorDescription = 'An error occurred while loading the data.',
  onRetry,
  showRetry = true
}: ApiStateProps) {
  // Show loading state
  if (loading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>
    }
    
    return (
      <div className={className}>
        <LoadingSpinner text={loadingText} size="lg" />
      </div>
    )
  }

  // Show error state
  if (error) {
    if (errorComponent) {
      return <>{errorComponent}</>
    }

    const errorMessage = typeof error === 'string' ? error : error.message
    const errorObj = typeof error === 'string' ? new Error(error) : error

    return (
      <div className={className}>
        <EmptyState
          icon={
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          }
          title={errorTitle}
          description={errorDescription}
          action={
            showRetry && onRetry ? (
              <button
                onClick={onRetry}
                className="btn bg-violet-600 text-white hover:bg-violet-700"
              >
                Try Again
              </button>
            ) : undefined
          }
        />
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <summary className="cursor-pointer">Error Details (Development)</summary>
            <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">
              {errorMessage}
            </pre>
          </details>
        )}
      </div>
    )
  }

  // Show empty state
  if (empty || (Array.isArray(data) && data.length === 0) || (!data && !loading)) {
    if (emptyComponent) {
      return <>{emptyComponent}</>
    }

    return (
      <div className={className}>
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={
            onRetry ? (
              <button
                onClick={onRetry}
                className="btn bg-violet-600 text-white hover:bg-violet-700"
              >
                Refresh
              </button>
            ) : undefined
          }
        />
      </div>
    )
  }

  // Show content
  return <div className={className}>{children}</div>
}

// Specialized components for common use cases

interface DataListProps {
  loading?: boolean
  error?: Error | string | null
  data?: any[]
  children: ReactNode
  onRetry?: () => void
  emptyTitle?: string
  emptyDescription?: string
  errorTitle?: string
  errorDescription?: string
  className?: string
}

export function DataList({
  loading = false,
  error = null,
  data = [],
  children,
  onRetry,
  emptyTitle = 'No items found',
  emptyDescription = 'There are no items to display.',
  errorTitle = 'Failed to load items',
  errorDescription = 'Something went wrong while loading the items.',
  className
}: DataListProps) {
  return (
    <ApiState
      loading={loading}
      error={error}
      data={data}
      onRetry={onRetry}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      errorTitle={errorTitle}
      errorDescription={errorDescription}
      className={className}
    >
      {children}
    </ApiState>
  )
}

interface DataTableProps {
  loading?: boolean
  error?: Error | string | null
  data?: any[]
  children: ReactNode
  onRetry?: () => void
  emptyTitle?: string
  emptyDescription?: string
  errorTitle?: string
  errorDescription?: string
  className?: string
  columns?: number
}

export function DataTable({
  loading = false,
  error = null,
  data = [],
  children,
  onRetry,
  emptyTitle = 'No data available',
  emptyDescription = 'There is no data to display in the table.',
  errorTitle = 'Failed to load data',
  errorDescription = 'Something went wrong while loading the table data.',
  className,
  columns = 4
}: DataTableProps) {
  if (loading) {
    return (
      <div className={className}>
        <TableSkeleton columns={columns} />
      </div>
    )
  }

  return (
    <ApiState
      loading={false}
      error={error}
      data={data}
      onRetry={onRetry}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      errorTitle={errorTitle}
      errorDescription={errorDescription}
      className={className}
    >
      {children}
    </ApiState>
  )
}

interface DataCardProps {
  loading?: boolean
  error?: Error | string | null
  data?: any
  children: ReactNode
  onRetry?: () => void
  emptyTitle?: string
  emptyDescription?: string
  errorTitle?: string
  errorDescription?: string
  className?: string
}

export function DataCard({
  loading = false,
  error = null,
  data,
  children,
  onRetry,
  emptyTitle = 'No data available',
  emptyDescription = 'There is no data to display.',
  errorTitle = 'Failed to load data',
  errorDescription = 'Something went wrong while loading the data.',
  className
}: DataCardProps) {
  if (loading) {
    return (
      <div className={className}>
        <CardSkeleton />
      </div>
    )
  }

  return (
    <ApiState
      loading={false}
      error={error}
      data={data}
      onRetry={onRetry}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      errorTitle={errorTitle}
      errorDescription={errorDescription}
      className={className}
    >
      {children}
    </ApiState>
  )
}

// Hook for managing API states
export function useApiState<T>(
  data: T | undefined,
  loading: boolean,
  error: Error | string | null
) {
  const isEmpty = Array.isArray(data) ? data.length === 0 : !data
  const hasError = !!error
  const isLoading = loading

  return {
    isEmpty,
    hasError,
    isLoading,
    hasData: !isEmpty && !hasError && !isLoading
  }
}
