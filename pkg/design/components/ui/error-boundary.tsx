'use client'

import React from 'react'
import { Button } from './button'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error | null; resetError: () => void }>
}

/**
 * Error Boundary component for theme system
 * Follows CONTRIBUTING.md: error handling, error boundaries
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Theme system error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback
        return <Fallback error={this.state.error} resetError={this.resetError} />
      }

      return (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <h3 className="text-sm font-semibold text-destructive mb-2">Theme Error</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {this.state.error?.message || 'An error occurred while applying the theme'}
          </p>
          <Button onClick={this.resetError} size="sm" variant="outline">
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export function ErrorFallback({
  error,
  resetError,
}: {
  error: Error | null
  resetError: () => void
}) {
  return (
    <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
      <h3 className="text-sm font-semibold text-destructive mb-2">Something went wrong</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={resetError} size="sm" variant="outline">
        Try Again
      </Button>
    </div>
  )
}

export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const handleError = React.useCallback((err: unknown) => {
    setError(err instanceof Error ? err : new Error(String(err)))
  }, [])

  return {
    error,
    setError,
    resetError,
    handleError,
  }
}
