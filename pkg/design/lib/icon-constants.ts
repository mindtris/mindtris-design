/**
 * Icon constants for consistent styling across the design system
 */

export const ICON_DEFAULT_SIZE = 16 // 16px = h-4 w-4
export const ICON_DEFAULT_STROKE_WIDTH = 2.25 // Icon stroke width

export const ICON_SIZES = {
  xs: 12, // h-3 w-3
  sm: 14, // h-3.5 w-3.5
  md: 16, // h-4 w-4 (default)
  lg: 20, // h-5 w-5
  xl: 24, // h-6 w-6
} as const

export type IconSize = keyof typeof ICON_SIZES
