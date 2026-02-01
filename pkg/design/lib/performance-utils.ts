/**
 * Performance utilities
 * Helper functions for performance optimization
 */

/**
 * Throttle a function call
 * Ensures function is called at most once per delay period
 * 
 * @param func - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 * 
 * @example
 * ```tsx
 * const throttledScroll = throttle((event) => {
 *   console.log('Scroll')
 * }, 100)
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    const now = Date.now()
    const timeSinceLastCall = now - lastCall

    if (timeSinceLastCall >= delay) {
      lastCall = now
      func(...args)
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        lastCall = Date.now()
        func(...args)
      }, delay - timeSinceLastCall)
    }
  }
}

/**
 * Debounce a function call
 * Delays execution until after delay has passed since last call
 * 
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 * 
 * @example
 * ```tsx
 * const debouncedSearch = debounce((query) => {
 *   performSearch(query)
 * }, 300)
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

/**
 * Request animation frame wrapper
 * Provides a clean way to use requestAnimationFrame
 * 
 * @param callback - Callback to execute on next frame
 * @returns Function to cancel the animation frame
 * 
 * @example
 * ```tsx
 * const cancel = raf(() => {
 *   updatePosition()
 * })
 * ```
 */
export function raf(callback: () => void): () => void {
  const id = requestAnimationFrame(callback)
  return () => cancelAnimationFrame(id)
}

/**
 * Double request animation frame
 * Useful for ensuring DOM updates are complete
 * 
 * @param callback - Callback to execute after two frames
 * @returns Function to cancel
 */
export function doubleRaf(callback: () => void): () => void {
  let id1: number
  let id2: number

  id1 = requestAnimationFrame(() => {
    id2 = requestAnimationFrame(callback)
  })

  return () => {
    cancelAnimationFrame(id1)
    cancelAnimationFrame(id2)
  }
}
