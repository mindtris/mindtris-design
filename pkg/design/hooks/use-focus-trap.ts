'use client'

import { useEffect, useRef } from 'react'

/**
 * useFocusTrap
 * Hook to trap focus within a container element
 * Useful for modals, dialogs, and other overlay components
 * 
 * @param isActive - Whether the focus trap should be active
 * @param containerRef - Ref to the container element
 * @param options - Configuration options
 * 
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 * useFocusTrap(isOpen, containerRef)
 * 
 * return (
 *   <div ref={containerRef}>
 *     <button>First</button>
 *     <button>Last</button>
 *   </div>
 * )
 * ```
 */
export function useFocusTrap(
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement>,
  options: {
    /**
     * Whether to return focus to the previously focused element on deactivate
     * @default true
     */
    returnFocus?: boolean
    /**
     * Initial element to focus when trap activates
     * @default first focusable element
     */
    initialFocus?: HTMLElement | null
  } = {}
): void {
  const { returnFocus = true, initialFocus = null } = options
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current

    // Store the previously focused element
    if (returnFocus && document.activeElement instanceof HTMLElement) {
      previousActiveElementRef.current = document.activeElement
    }

    // Get all focusable elements within the container
    const getFocusableElements = (): HTMLElement[] => {
      const selector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ')

      return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => {
          // Filter out hidden elements
          const style = window.getComputedStyle(el)
          return style.display !== 'none' && style.visibility !== 'hidden'
        }
      )
    }

    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    // Focus initial element or first focusable element
    const elementToFocus = initialFocus || focusableElements[0]
    if (elementToFocus) {
      elementToFocus.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab: focus previous element
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: focus next element
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Prevent focus from escaping the container
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement
      if (!container.contains(target)) {
        event.preventDefault()
        const firstElement = focusableElements[0]
        if (firstElement) {
          firstElement.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    container.addEventListener('focusin', handleFocusIn)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      container.removeEventListener('focusin', handleFocusIn)

      // Return focus to the previously focused element
      if (returnFocus && previousActiveElementRef.current) {
        previousActiveElementRef.current.focus()
        previousActiveElementRef.current = null
      }
    }
  }, [isActive, containerRef, returnFocus, initialFocus])
}
