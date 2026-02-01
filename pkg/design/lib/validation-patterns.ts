/**
 * Validation patterns
 * Common validation rules and utilities for form validation
 */

export type ValidationRule<T = string> = (value: T) => string | undefined

/**
 * Required field validation
 */
export const required: ValidationRule = (value) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return 'This field is required'
  }
  return undefined
}

/**
 * Email validation
 */
export const email: ValidationRule<string> = (value) => {
  if (!value) return undefined // Let required handle empty values
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address'
  }
  return undefined
}

/**
 * Minimum length validation
 */
export const minLength = (min: number): ValidationRule<string> => {
  return (value) => {
    if (!value) return undefined
    if (value.length < min) {
      return `Must be at least ${min} characters`
    }
    return undefined
  }
}

/**
 * Maximum length validation
 */
export const maxLength = (max: number): ValidationRule<string> => {
  return (value) => {
    if (!value) return undefined
    if (value.length > max) {
      return `Must be no more than ${max} characters`
    }
    return undefined
  }
}

/**
 * Pattern validation (regex)
 */
export const pattern = (regex: RegExp, message: string): ValidationRule<string> => {
  return (value) => {
    if (!value) return undefined
    if (!regex.test(value)) {
      return message
    }
    return undefined
  }
}

/**
 * Number range validation
 */
export const numberRange = (min: number, max: number): ValidationRule<number> => {
  return (value) => {
    if (value === undefined || value === null) return undefined
    if (value < min || value > max) {
      return `Must be between ${min} and ${max}`
    }
    return undefined
  }
}

/**
 * Minimum value validation
 */
export const min = (minimum: number): ValidationRule<number> => {
  return (value) => {
    if (value === undefined || value === null) return undefined
    if (value < minimum) {
      return `Must be at least ${minimum}`
    }
    return undefined
  }
}

/**
 * Maximum value validation
 */
export const max = (maximum: number): ValidationRule<number> => {
  return (value) => {
    if (value === undefined || value === null) return undefined
    if (value > maximum) {
      return `Must be no more than ${maximum}`
    }
    return undefined
  }
}

/**
 * URL validation
 */
export const url: ValidationRule<string> = (value) => {
  if (!value) return undefined
  try {
    new URL(value)
    return undefined
  } catch {
    return 'Please enter a valid URL'
  }
}

/**
 * Combine multiple validation rules
 */
export const combine = <T>(...rules: ValidationRule<T>[]): ValidationRule<T> => {
  return (value) => {
    for (const rule of rules) {
      const error = rule(value)
      if (error) return error
    }
    return undefined
  }
}

/**
 * Conditional validation
 * Only validate if condition is true
 */
export const conditional = <T>(
  condition: (value: T) => boolean,
  rule: ValidationRule<T>
): ValidationRule<T> => {
  return (value) => {
    if (!condition(value)) return undefined
    return rule(value)
  }
}

/**
 * Custom validation rule creator
 */
export const createRule = <T>(
  validator: (value: T) => boolean,
  message: string
): ValidationRule<T> => {
  return (value) => {
    if (!validator(value)) {
      return message
    }
    return undefined
  }
}
