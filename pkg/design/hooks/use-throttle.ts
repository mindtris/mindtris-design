'use client'

import { useRef, useCallback } from 'react'

/**
 * useThrottle
 * Hook to throttle a callback function
 * Useful for scroll handlers, resize handlers, and other frequent events
 * 
 * @param callback - Function to throttle
 * @param delay - Throttle delay in milliseconds
 * @returns Throttled callback function
 * 
 * @example
 * ```tsx
 * const throttledScroll = useThrottle((event) => {
 *   console.log('Scroll position:', window.scrollY)
 * }, 100)
 * 
 * useEffect(() => {
 *   window.addEventListener('scroll', throttledScroll)
 *   return () => window.removeEventListener('scroll', throttledScroll)
 * }, [throttledScroll])
 * ```
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRunRef = useRef<number>(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const throttledCallback = useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now()
      const timeSinceLastRun = now - lastRunRef.current

      if (timeSinceLastRun >= delay) {
        // Enough time has passed, execute immediately
        lastRunRef.current = now
        callback(...args)
      } else {
        // Schedule execution for the remaining time
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          lastRunRef.current = Date.now()
          callback(...args)
        }, delay - timeSinceLastRun)
      }
    }) as T,
    [callback, delay]
  )

  return throttledCallback
}
