'use client'

import { useState, useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './use-prefers-reduced-motion'

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited'

export interface UseTransitionStateOptions {
  /**
   * Duration of enter transition in milliseconds
   * @default 200
   */
  enterDuration?: number
  /**
   * Duration of exit transition in milliseconds
   * @default 150
   */
  exitDuration?: number
  /**
   * Whether to mount the component initially
   * @default false
   */
  initialMount?: boolean
  /**
   * Whether to respect prefers-reduced-motion
   * @default true
   */
  respectReducedMotion?: boolean
}

/**
 * useTransitionState
 * Hook to manage enter/exit transition states for components
 * Useful for modals, dropdowns, tooltips, and other animated components
 * 
 * @param isOpen - Whether the component should be visible
 * @param options - Transition configuration options
 * @returns Object with transition state and control functions
 * 
 * @example
 * ```tsx
 * const { state, shouldMount, endTransition } = useTransitionState(isOpen)
 * 
 * return shouldMount && (
 *   <div className={state === 'entered' ? 'opacity-100' : 'opacity-0'}>
 *     Content
 *   </div>
 * )
 * ```
 */
export function useTransitionState(
  isOpen: boolean,
  options: UseTransitionStateOptions = {}
): {
  state: TransitionState
  shouldMount: boolean
  endTransition: () => void
} {
  const {
    enterDuration = 200,
    exitDuration = 150,
    initialMount = false,
    respectReducedMotion = true,
  } = options

  const prefersReducedMotion = usePrefersReducedMotion()
  const [state, setState] = useState<TransitionState>(
    initialMount ? (isOpen ? 'entered' : 'exited') : 'exited'
  )
  const [shouldMount, setShouldMount] = useState(initialMount || isOpen)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const effectiveEnterDuration = respectReducedMotion && prefersReducedMotion ? 0 : enterDuration
    const effectiveExitDuration = respectReducedMotion && prefersReducedMotion ? 0 : exitDuration

    if (isOpen) {
      // Opening: mount immediately, then enter
      setShouldMount(true)
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        setState('entering')
        timeoutRef.current = setTimeout(() => {
          setState('entered')
        }, effectiveEnterDuration)
      })
    } else {
      // Closing: exit, then unmount
      if (shouldMount) {
        setState('exiting')
        timeoutRef.current = setTimeout(() => {
          setState('exited')
          setShouldMount(false)
        }, effectiveExitDuration)
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isOpen, enterDuration, exitDuration, shouldMount, prefersReducedMotion, respectReducedMotion])

  const endTransition = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (isOpen) {
      setState('entered')
    } else {
      setState('exited')
      setShouldMount(false)
    }
  }

  return { state, shouldMount, endTransition }
}
