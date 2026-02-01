'use client'

import { useEffect, useRef } from 'react'
import { announceToScreenReader } from '../lib/a11y-utils'

/**
 * useAriaLive
 * Hook to manage ARIA live region for screen reader announcements
 * Creates a persistent live region element
 * 
 * @param priority - Priority level ('polite' or 'assertive')
 * @returns Function to announce messages
 * 
 * @example
 * ```tsx
 * const announce = useAriaLive('polite')
 * 
 * useEffect(() => {
 *   if (success) {
 *     announce('Operation completed successfully')
 *   }
 * }, [success, announce])
 * ```
 */
export function useAriaLive(priority: 'polite' | 'assertive' = 'polite'): (message: string) => void {
  const liveRegionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create live region element
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('role', 'status')
    liveRegion.setAttribute('aria-live', priority)
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    `

    document.body.appendChild(liveRegion)
    liveRegionRef.current = liveRegion

    return () => {
      if (liveRegionRef.current && document.body.contains(liveRegionRef.current)) {
        document.body.removeChild(liveRegionRef.current)
      }
    }
  }, [priority])

  const announce = (message: string) => {
    if (liveRegionRef.current) {
      // Clear and set new message to trigger announcement
      liveRegionRef.current.textContent = ''
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = message
        }
      }, 100)
    } else {
      // Fallback to one-time announcement
      announceToScreenReader(message, priority)
    }
  }

  return announce
}
