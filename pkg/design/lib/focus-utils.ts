/**
 * Focus utilities
 * Helper functions for managing focus and focusable elements
 */

/**
 * Get all focusable elements within a container
 * 
 * @param container - Container element to search within
 * @returns Array of focusable HTMLElements
 */
export function getFocusableElements(container: HTMLElement | Document = document): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter((el) => {
    // Filter out hidden elements
    const style = window.getComputedStyle(el)
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      !el.hasAttribute('inert') &&
      !el.hasAttribute('aria-hidden')
    )
  })
}

/**
 * Focus the first focusable element in a container
 * 
 * @param container - Container element to search within
 * @returns The focused element, or null if none found
 */
export function focusFirstElement(container: HTMLElement | Document = document): HTMLElement | null {
  const focusableElements = getFocusableElements(container)
  if (focusableElements.length === 0) return null

  const firstElement = focusableElements[0]
  firstElement.focus()
  return firstElement
}

/**
 * Focus the last focusable element in a container
 * 
 * @param container - Container element to search within
 * @returns The focused element, or null if none found
 */
export function focusLastElement(container: HTMLElement | Document = document): HTMLElement | null {
  const focusableElements = getFocusableElements(container)
  if (focusableElements.length === 0) return null

  const lastElement = focusableElements[focusableElements.length - 1]
  lastElement.focus()
  return lastElement
}

/**
 * Focus the next focusable element after the current one
 * 
 * @param currentElement - Current focused element
 * @param container - Container to search within (default: document)
 * @returns The focused element, or null if none found
 */
export function focusNextElement(
  currentElement: HTMLElement,
  container: HTMLElement | Document = document
): HTMLElement | null {
  const focusableElements = getFocusableElements(container)
  const currentIndex = focusableElements.indexOf(currentElement)

  if (currentIndex === -1 || currentIndex === focusableElements.length - 1) {
    return focusFirstElement(container)
  }

  const nextElement = focusableElements[currentIndex + 1]
  nextElement.focus()
  return nextElement
}

/**
 * Focus the previous focusable element before the current one
 * 
 * @param currentElement - Current focused element
 * @param container - Container to search within (default: document)
 * @returns The focused element, or null if none found
 */
export function focusPreviousElement(
  currentElement: HTMLElement,
  container: HTMLElement | Document = document
): HTMLElement | null {
  const focusableElements = getFocusableElements(container)
  const currentIndex = focusableElements.indexOf(currentElement)

  if (currentIndex === -1 || currentIndex === 0) {
    return focusLastElement(container)
  }

  const previousElement = focusableElements[currentIndex - 1]
  previousElement.focus()
  return previousElement
}

/**
 * Check if an element is focusable
 * 
 * @param element - Element to check
 * @returns true if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableElements = getFocusableElements(element.ownerDocument)
  return focusableElements.includes(element)
}
