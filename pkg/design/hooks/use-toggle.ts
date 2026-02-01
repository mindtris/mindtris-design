'use client'

import { useState, useCallback } from 'react'

/**
 * useToggle
 * Hook to manage boolean state with toggle, setTrue, and setFalse functions
 * Useful for modals, dropdowns, checkboxes, and other boolean states
 * 
 * @param initialValue - Initial boolean value
 * @returns Object with value and control functions
 * 
 * @example
 * ```tsx
 * const { value: isOpen, toggle, setTrue, setFalse } = useToggle(false)
 * 
 * return (
 *   <>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={setTrue}>Open</button>
 *     <button onClick={setFalse}>Close</button>
 *     {isOpen && <Modal />}
 *   </>
 * )
 * ```
 */
export function useToggle(initialValue: boolean = false): {
  value: boolean
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
  setValue: (value: boolean) => void
} {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue,
  }
}
