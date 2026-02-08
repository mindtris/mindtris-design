/**
 * Theme persistence utilities
 * Stores theme preferences in localStorage
 * Follows CONTRIBUTING.md: error handling, defensive programming
 */

const STORAGE_KEY_THEME = 'mindtris-ui-theme'
const STORAGE_KEY_RADIUS = 'mindtris-ui-radius'
const STORAGE_KEY_CUSTOM_THEME = 'mindtris-ui-custom-theme'

/**
 * Get stored theme preference
 */
export function getStoredTheme(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return localStorage.getItem(STORAGE_KEY_THEME)
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error)
    return null
  }
}

/**
 * Store theme preference
 */
export function storeTheme(themeValue: string): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY_THEME, themeValue)
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error)
  }
}

/**
 * Get stored radius preference
 */
export function getStoredRadius(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return localStorage.getItem(STORAGE_KEY_RADIUS)
  } catch (error) {
    console.warn('Failed to read radius from localStorage:', error)
    return null
  }
}

/**
 * Store radius preference
 */
export function storeRadius(radius: string): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY_RADIUS, radius)
  } catch (error) {
    console.warn('Failed to store radius in localStorage:', error)
  }
}

/**
 * Get stored custom theme (imported theme)
 */
export function getStoredCustomTheme(): unknown {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_THEME)
    if (!stored) return null
    return JSON.parse(stored)
  } catch (error) {
    console.warn('Failed to read custom theme from localStorage:', error)
    return null
  }
}

/**
 * Store custom theme (imported theme)
 */
export function storeCustomTheme(theme: unknown): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_THEME, JSON.stringify(theme))
  } catch (error) {
    console.warn('Failed to store custom theme in localStorage:', error)
  }
}

/**
 * Clear all stored theme preferences
 */
export function clearStoredTheme(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEY_THEME)
    localStorage.removeItem(STORAGE_KEY_RADIUS)
    localStorage.removeItem(STORAGE_KEY_CUSTOM_THEME)
  } catch (error) {
    console.warn('Failed to clear theme preferences from localStorage:', error)
  }
}
