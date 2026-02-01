'use client'

import { useState, useCallback } from 'react'

export interface UseCounterOptions {
  /**
   * Initial counter value
   * @default 0
   */
  initialValue?: number
  /**
   * Minimum value (inclusive)
   */
  min?: number
  /**
   * Maximum value (inclusive)
   */
  max?: number
  /**
   * Step value for increment/decrement
   * @default 1
   */
  step?: number
}

/**
 * useCounter
 * Hook to manage numeric counter state with increment, decrement, and reset functions
 * Useful for quantity selectors, pagination, and other numeric inputs
 * 
 * @param options - Configuration options
 * @returns Object with value and control functions
 * 
 * @example
 * ```tsx
 * const { value, increment, decrement, reset, setValue } = useCounter({
 *   initialValue: 0,
 *   min: 0,
 *   max: 10,
 *   step: 1
 * })
 * 
 * return (
 *   <div>
 *     <button onClick={decrement}>-</button>
 *     <span>{value}</span>
 *     <button onClick={increment}>+</button>
 *   </div>
 * )
 * ```
 */
export function useCounter(options: UseCounterOptions = {}): {
  value: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setValue: (value: number) => void
} {
  const {
    initialValue = 0,
    min,
    max,
    step = 1,
  } = options

  const [value, setValue] = useState(initialValue)

  const increment = useCallback(() => {
    setValue((prev) => {
      const next = prev + step
      return max !== undefined ? Math.min(next, max) : next
    })
  }, [step, max])

  const decrement = useCallback(() => {
    setValue((prev) => {
      const next = prev - step
      return min !== undefined ? Math.max(next, min) : next
    })
  }, [step, min])

  const reset = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  const setValueWithBounds = useCallback(
    (newValue: number) => {
      let boundedValue = newValue
      if (min !== undefined) {
        boundedValue = Math.max(boundedValue, min)
      }
      if (max !== undefined) {
        boundedValue = Math.min(boundedValue, max)
      }
      setValue(boundedValue)
    },
    [min, max]
  )

  return {
    value,
    increment,
    decrement,
    reset,
    setValue: setValueWithBounds,
  }
}
