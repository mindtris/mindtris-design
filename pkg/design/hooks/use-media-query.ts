'use client'

import { useState, useEffect } from 'react'

/**
 * useMediaQuery
 * Hook to track media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler)
    }
  }, [query])

  return matches
}

/**
 * useBreakpoint
 * Hook to track common breakpoints
 */
export function useBreakpoint(): {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLarge: boolean
} {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px) and (max-width: 1280px)')
  const isLarge = useMediaQuery('(min-width: 1281px)')

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
  }
}
