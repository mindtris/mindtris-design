/**
 * Validation utilities for theme values
 * Follows CONTRIBUTING.md: defensive programming, error handling
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Validate HSL adjustment values
 */
export function validateHSLValue(value: string, type: 'hue' | 'saturation' | 'lightness'): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: true } // Empty is allowed (will use default)
  }

  const numValue = parseFloat(value)
  
  if (isNaN(numValue)) {
    return {
      isValid: false,
      error: `${type} must be a number`
    }
  }

  if (type === 'hue') {
    // Hue can be any number (degrees, can be negative or > 360)
    return { isValid: true }
  }

  if (type === 'saturation' || type === 'lightness') {
    // Multipliers should typically be positive, but allow 0
    if (numValue < 0) {
      return {
        isValid: false,
        error: `${type} multiplier cannot be negative`
      }
    }
    return { isValid: true }
  }

  return { isValid: true }
}

/**
 * Validate color value (hex, rgb, hsl, oklch, etc.)
 */
export function validateColorValue(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: 'Color value cannot be empty'
    }
  }

  const trimmed = value.trim()

  // Check for valid color formats
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  const rgbPattern = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/
  const rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/
  const hslPattern = /^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/
  const hslaPattern = /^hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*[\d.]+)?\)$/
  const oklchPattern = /^oklch\([\d.]+%?\s+[\d.]+\s+[\d.]+\)$/
  const cssVarPattern = /^var\(--[\w-]+\)$/

  if (
    hexPattern.test(trimmed) ||
    rgbPattern.test(trimmed) ||
    rgbaPattern.test(trimmed) ||
    hslPattern.test(trimmed) ||
    hslaPattern.test(trimmed) ||
    oklchPattern.test(trimmed) ||
    cssVarPattern.test(trimmed) ||
    trimmed === 'transparent' ||
    trimmed === 'currentColor'
  ) {
    return { isValid: true }
  }

  return {
    isValid: false,
    error: 'Invalid color format. Use hex (#ffffff), rgb(), hsl(), or oklch()'
  }
}

/**
 * Validate radius value
 */
export function validateRadiusValue(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: 'Radius value cannot be empty'
    }
  }

  const trimmed = value.trim()
  
  // Check for valid CSS length units
  const lengthPattern = /^[\d.]+(px|rem|em|ch|ex|vh|vw|vmin|vmax|%)$/
  const zeroPattern = /^0(px|rem|em)?$/

  if (lengthPattern.test(trimmed) || zeroPattern.test(trimmed)) {
    const numValue = parseFloat(trimmed)
    if (numValue < 0) {
      return {
        isValid: false,
        error: 'Radius cannot be negative'
      }
    }
    return { isValid: true }
  }

  return {
    isValid: false,
    error: 'Invalid radius format. Use CSS length units (e.g., 0.5rem, 8px)'
  }
}

/**
 * Validate spacing value
 */
export function validateSpacingValue(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: true } // Empty is allowed
  }

  const trimmed = value.trim()
  const lengthPattern = /^[\d.]+(px|rem|em|ch|ex|vh|vw|vmin|vmax|%)$/
  const zeroPattern = /^0(px|rem|em)?$/

  if (lengthPattern.test(trimmed) || zeroPattern.test(trimmed)) {
    const numValue = parseFloat(trimmed)
    if (numValue < 0) {
      return {
        isValid: false,
        error: 'Spacing cannot be negative'
      }
    }
    return { isValid: true }
  }

  return {
    isValid: false,
    error: 'Invalid spacing format. Use CSS length units (e.g., 0.25rem, 4px)'
  }
}

/**
 * Validate shadow value (opacity, blur, spread, offset)
 */
export function validateShadowValue(value: string, type: 'opacity' | 'blur' | 'spread' | 'offset'): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: true } // Empty is allowed
  }

  const trimmed = value.trim()

  if (type === 'opacity') {
    const numValue = parseFloat(trimmed)
    if (isNaN(numValue)) {
      return {
        isValid: false,
        error: 'Opacity must be a number'
      }
    }
    if (numValue < 0 || numValue > 1) {
      return {
        isValid: false,
        error: 'Opacity must be between 0 and 1'
      }
    }
    return { isValid: true }
  }

  // For blur, spread, offset - check for CSS length units
  const lengthPattern = /^[\d.]+(px|rem|em|ch|ex|vh|vw|vmin|vmax|%)$/
  const zeroPattern = /^0(px|rem|em)?$/

  if (lengthPattern.test(trimmed) || zeroPattern.test(trimmed)) {
    return { isValid: true }
  }

  return {
    isValid: false,
    error: `Invalid ${type} format. Use CSS length units (e.g., 3px, 0.5rem)`
  }
}

/**
 * Validate imported theme structure
 */
export function validateImportedTheme(theme: unknown): ValidationResult {
  if (!theme || typeof theme !== 'object') {
    return {
      isValid: false,
      error: 'Theme must be an object'
    }
  }

  const themeObj = theme as Record<string, unknown>

  if (!themeObj.light || typeof themeObj.light !== 'object') {
    return {
      isValid: false,
      error: 'Theme must have a "light" property with an object'
    }
  }

  if (!themeObj.dark || typeof themeObj.dark !== 'object') {
    return {
      isValid: false,
      error: 'Theme must have a "dark" property with an object'
    }
  }

  const light = themeObj.light as Record<string, unknown>
  const dark = themeObj.dark as Record<string, unknown>

  // Check for required color variables
  const requiredVars = ['background', 'foreground', 'primary', 'primary-foreground']
  
  for (const varName of requiredVars) {
    if (!light[varName] || typeof light[varName] !== 'string') {
      return {
        isValid: false,
        error: `Missing required variable in light theme: ${varName}`
      }
    }
    
    const colorValidation = validateColorValue(light[varName] as string)
    if (!colorValidation.isValid) {
      return {
        isValid: false,
        error: `Invalid color value for ${varName} in light theme: ${colorValidation.error}`
      }
    }
  }

  for (const varName of requiredVars) {
    if (!dark[varName] || typeof dark[varName] !== 'string') {
      return {
        isValid: false,
        error: `Missing required variable in dark theme: ${varName}`
      }
    }
    
    const colorValidation = validateColorValue(dark[varName] as string)
    if (!colorValidation.isValid) {
      return {
        isValid: false,
        error: `Invalid color value for ${varName} in dark theme: ${colorValidation.error}`
      }
    }
  }

  return { isValid: true }
}

export function validateCustomThemeArtifact(theme: unknown): ValidationResult {
  if (!theme || typeof theme !== 'object') {
    return { isValid: false, error: 'Custom theme must be an object' }
  }

  const t = theme as Record<string, unknown>
  if (t.version !== 1) {
    return { isValid: false, error: 'Custom theme must have version: 1' }
  }
  if (!t.name || typeof t.name !== 'string') {
    return { isValid: false, error: 'Custom theme must have a name' }
  }
  if (!t.base || typeof t.base !== 'object') {
    return { isValid: false, error: 'Custom theme must have a base' }
  }

  const base = t.base as Record<string, unknown>
  const baseType = base.type
  if (baseType !== 'preset' && baseType !== 'imported') {
    return { isValid: false, error: 'Custom theme base.type must be "preset" or "imported"' }
  }
  if (baseType === 'preset') {
    if (!base.value || typeof base.value !== 'string') {
      return { isValid: false, error: 'Custom theme base.value must be a string' }
    }
  } else {
    if (!base.theme || typeof base.theme !== 'object') {
      return { isValid: false, error: 'Custom theme base.theme must be an object' }
    }
    const importedValidation = validateImportedTheme(base.theme)
    if (!importedValidation.isValid) {
      return importedValidation
    }
  }

  if (!t.overrides || typeof t.overrides !== 'object') {
    return { isValid: false, error: 'Custom theme must have overrides' }
  }

  const overrides = t.overrides as Record<string, unknown>
  const maybeMaps: Array<['light' | 'dark' | 'other', unknown]> = [
    ['light', overrides.light],
    ['dark', overrides.dark],
    ['other', overrides.other],
  ]

  for (const [key, val] of maybeMaps) {
    if (val == null) continue
    if (typeof val !== 'object') {
      return { isValid: false, error: `Custom theme overrides.${key} must be an object` }
    }
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      if (typeof v !== 'string') {
        return { isValid: false, error: `Custom theme overrides.${key}.${k} must be a string` }
      }
    }
  }

  return { isValid: true }
}
