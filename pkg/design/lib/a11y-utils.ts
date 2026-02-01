/**
 * Accessibility utilities
 * Helper functions for ARIA attributes, IDs, and screen reader support
 */

let idCounter = 0

/**
 * Generate a unique ID for use in ARIA attributes
 * Safe to call on server (uses counter instead of random)
 * 
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 * 
 * @example
 * ```tsx
 * const id = generateId('input')
 * // Returns: 'input-1', 'input-2', etc.
 * ```
 */
export function generateId(prefix: string = 'id'): string {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

/**
 * Get ARIA label from various sources
 * Prioritizes explicit label, then aria-label, then aria-labelledby
 * 
 * @param options - Label options
 * @returns Label string or undefined
 */
export function getAriaLabel(options: {
  label?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  element?: HTMLElement
}): string | undefined {
  if (options.label) return options.label
  if (options['aria-label']) return options['aria-label']
  if (options['aria-labelledby'] && options.element) {
    const labelledByElement = options.element.ownerDocument.getElementById(
      options['aria-labelledby']
    )
    return labelledByElement?.textContent || undefined
  }
  return undefined
}

/**
 * Get ARIA described by ID from helper text or error message
 * 
 * @param options - Description options
 * @returns ID string or undefined
 */
export function getAriaDescribedBy(options: {
  helperTextId?: string
  errorId?: string
  hasError?: boolean
}): string | undefined {
  const { helperTextId, errorId, hasError } = options
  if (hasError && errorId) return errorId
  if (helperTextId) return helperTextId
  return undefined
}

/**
 * Announce a message to screen readers via ARIA live region
 * Creates a temporary live region element and announces the message
 * 
 * @param message - Message to announce
 * @param priority - Priority level ('polite' or 'assertive')
 * 
 * @example
 * ```tsx
 * announceToScreenReader('Form submitted successfully', 'polite')
 * announceToScreenReader('Error: Invalid input', 'assertive')
 * ```
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  if (typeof window === 'undefined') return

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

  // Use setTimeout to ensure the element is in the DOM before setting text
  setTimeout(() => {
    liveRegion.textContent = message

    // Remove after announcement (screen readers typically read within 1-2 seconds)
    setTimeout(() => {
      document.body.removeChild(liveRegion)
    }, 1000)
  }, 100)
}

/**
 * Check if an element is visible to screen readers
 * 
 * @param element - Element to check
 * @returns true if element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element)
  const hasAriaHidden = element.getAttribute('aria-hidden') === 'true'
  const hasDisplayNone = style.display === 'none'
  const hasVisibilityHidden = style.visibility === 'hidden'
  const hasOpacityZero = style.opacity === '0'

  return !hasAriaHidden && !hasDisplayNone && !hasVisibilityHidden && !hasOpacityZero
}

/**
 * Get accessible name for an element
 * Uses ARIA naming algorithm: aria-label > aria-labelledby > visible text content
 * 
 * @param element - Element to get name for
 * @returns Accessible name or undefined
 */
export function getAccessibleName(element: HTMLElement): string | undefined {
  // Check aria-label
  const ariaLabel = element.getAttribute('aria-label')
  if (ariaLabel) return ariaLabel

  // Check aria-labelledby
  const ariaLabelledBy = element.getAttribute('aria-labelledby')
  if (ariaLabelledBy) {
    const labelledByElement = element.ownerDocument.getElementById(ariaLabelledBy)
    if (labelledByElement) {
      return labelledByElement.textContent || undefined
    }
  }

  // Check for visible text content
  const textContent = element.textContent?.trim()
  if (textContent) return textContent

  // Check for associated label (for form inputs)
  if (element.id) {
    const label = element.ownerDocument.querySelector(`label[for="${element.id}"]`)
    if (label) {
      return label.textContent?.trim() || undefined
    }
  }

  return undefined
}
