'use client'

import { useState, useEffect } from 'react'

/**
 * usePrefersReducedMotion
 * Hook to detect user's preference for reduced motion
 * Respects prefers-reduced-motion media query for accessibility
 * 
 * @returns boolean - true if user prefers reduced motion
 * 
 * @example
 * ```tsx
 * const prefersReducedMotion = usePrefersReducedMotion()
 * const animationDuration = prefersReducedMotion ? 0 : 200
 * ```
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler)
    }
  }, [])

  return prefersReducedMotion
}
