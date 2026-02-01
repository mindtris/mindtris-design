'use client'

import { useEffect, useRef } from 'react'

/**
 * useFocusReturn
 * Hook to return focus to a previously focused element
 * Useful for modals, dropdowns, and other overlay components that close
 * 
 * @param shouldReturn - Whether to return focus (typically when component closes)
 * @param fallbackElement - Element to focus if previous element is not available
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * const triggerRef = useRef<HTMLButtonElement>(null)
 * 
 * useFocusReturn(!isOpen, triggerRef.current)
 * 
 * return (
 *   <>
 *     <button ref={triggerRef} onClick={() => setIsOpen(true)}>Open</button>
 *     {isOpen && <Modal onClose={() => setIsOpen(false)} />}
 *   </>
 * )
 * ```
 */
export function useFocusReturn(
  shouldReturn: boolean,
  fallbackElement?: HTMLElement | null
): void {
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (shouldReturn) {
      // Store the currently focused element before it changes
      if (document.activeElement instanceof HTMLElement) {
        previousActiveElementRef.current = document.activeElement
      }
    } else {
      // Return focus when component closes
      const elementToFocus = previousActiveElementRef.current || fallbackElement

      if (elementToFocus) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          if (elementToFocus && document.body.contains(elementToFocus)) {
            elementToFocus.focus()
          } else if (fallbackElement && document.body.contains(fallbackElement)) {
            fallbackElement.focus()
          }
        })
      }

      previousActiveElementRef.current = null
    }
  }, [shouldReturn, fallbackElement])
}
