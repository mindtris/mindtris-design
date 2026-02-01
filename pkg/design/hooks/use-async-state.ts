'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

export interface UseAsyncStateOptions<T> {
  /**
   * Initial data value
   */
  initialData?: T
  /**
   * Whether to reset state when component unmounts
   * @default false
   */
  resetOnUnmount?: boolean
  /**
   * Callback when async operation succeeds
   */
  onSuccess?: (data: T) => void
  /**
   * Callback when async operation fails
   */
  onError?: (error: Error) => void
}

/**
 * useAsyncState
 * Hook to manage async operation state (loading, success, error)
 * Useful for API calls, form submissions, and other async operations
 * 
 * @param options - Configuration options
 * @returns Object with state and control functions
 * 
 * @example
 * ```tsx
 * const { state, execute, reset } = useAsyncState()
 * 
 * const handleSubmit = async () => {
 *   execute(async () => {
 *     const data = await api.createUser(formData)
 *     return data
 *   })
 * }
 * 
 * return (
 *   <div>
 *     {state.status === 'loading' && <Spinner />}
 *     {state.status === 'error' && <Error message={state.error.message} />}
 *     {state.status === 'success' && <Success data={state.data} />}
 *   </div>
 * )
 * ```
 */
export function useAsyncState<T = unknown>(
  options: UseAsyncStateOptions<T> = {}
): {
  state: AsyncState<T>
  execute: (asyncFn: () => Promise<T>) => Promise<T | undefined>
  reset: () => void
  setData: (data: T) => void
  setError: (error: Error) => void
} {
  const {
    initialData,
    resetOnUnmount = false,
    onSuccess,
    onError,
  } = options

  const [state, setState] = useState<AsyncState<T>>(
    initialData !== undefined ? { status: 'success', data: initialData } : { status: 'idle' }
  )
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (resetOnUnmount) {
        setState(initialData !== undefined ? { status: 'success', data: initialData } : { status: 'idle' })
      }
    }
  }, [resetOnUnmount, initialData])

  const execute = useCallback(
    async (asyncFn: () => Promise<T>): Promise<T | undefined> => {
      if (!isMountedRef.current) return undefined

      setState({ status: 'loading' })

      try {
        const data = await asyncFn()
        if (!isMountedRef.current) return undefined

        setState({ status: 'success', data })
        onSuccess?.(data)
        return data
      } catch (error) {
        if (!isMountedRef.current) return undefined

        const err = error instanceof Error ? error : new Error(String(error))
        setState({ status: 'error', error: err })
        onError?.(err)
        throw err
      }
    },
    [onSuccess, onError]
  )

  const reset = useCallback(() => {
    setState(initialData !== undefined ? { status: 'success', data: initialData } : { status: 'idle' })
  }, [initialData])

  const setData = useCallback((data: T) => {
    setState({ status: 'success', data })
  }, [])

  const setError = useCallback((error: Error) => {
    setState({ status: 'error', error })
  }, [])

  return { state, execute, reset, setData, setError }
}
