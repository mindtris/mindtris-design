'use client'

import { useState, useCallback, useRef } from 'react'
import type { ValidationRule } from '../lib/validation-patterns'

export interface FieldValidation<T = unknown> {
  value: T
  error?: string
  touched: boolean
  rules?: ValidationRule<any>[]
}

export interface UseFormValidationOptions {
  /**
   * Whether to validate on change (in addition to blur)
   * @default false
   */
  validateOnChange?: boolean
  /**
   * Whether to validate on blur
   * @default true
   */
  validateOnBlur?: boolean
}

/**
 * useFormValidation
 * Hook to manage form field validation
 * Provides validation state and handlers for form fields
 * 
 * @param options - Validation options
 * @returns Object with validation state and handlers
 * 
 * @example
 * ```tsx
 * const { fields, setFieldValue, setFieldError, validateField, validateForm } = useFormValidation()
 * 
 * const handleSubmit = () => {
 *   if (validateForm()) {
 *     // Form is valid, submit
 *   }
 * }
 * 
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input
 *       value={fields.email?.value || ''}
 *       onChange={(e) => setFieldValue('email', e.target.value, [required, email])}
 *       onBlur={() => validateField('email')}
 *     />
 *     {fields.email?.error && <span>{fields.email.error}</span>}
 *   </form>
 * )
 * ```
 */
export function useFormValidation(
  options: UseFormValidationOptions = {}
): {
  fields: Record<string, FieldValidation>
  setFieldValue: <T>(
    name: string,
    value: T,
    rules?: ValidationRule<T>[]
  ) => void
  setFieldError: (name: string, error: string | undefined) => void
  validateField: (name: string) => boolean
  validateForm: () => boolean
  resetField: (name: string) => void
  resetForm: () => void
  getFieldValue: <T>(name: string) => T | undefined
} {
  const { validateOnChange = false, validateOnBlur = true } = options
  const [fields, setFields] = useState<Record<string, FieldValidation>>({})
  const validationRulesRef = useRef<Record<string, ValidationRule<any>[]>>({})

  const validateField = useCallback((name: string): boolean => {
    const field = fields[name]
    if (!field) return true

    const rules = validationRulesRef.current[name] || field.rules || []
    if (rules.length === 0) return true

    for (const rule of rules) {
      const error = rule(field.value)
      if (error) {
        setFields((prev) => ({
          ...prev,
          [name]: { ...prev[name], error, touched: true },
        }))
        return false
      }
    }

    // No errors
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], error: undefined, touched: true },
    }))
    return true
  }, [fields])

  const setFieldValue = useCallback(
    <T,>(name: string, value: T, rules?: ValidationRule<T>[]) => {
      setFields((prev) => {
        const existingField = prev[name]
        const newField: FieldValidation = {
          value,
          touched: existingField?.touched || false,
          error: existingField?.error,
          rules: rules as ValidationRule<any>[] | undefined,
        }

        // Store rules for validation
        if (rules) {
          validationRulesRef.current[name] = rules as ValidationRule<any>[]
        }

        // Validate on change if enabled
        if (validateOnChange && (existingField?.touched || false)) {
          const validationRules = (rules as ValidationRule<any>[] | undefined) || validationRulesRef.current[name] || []
          for (const rule of validationRules) {
            const error = rule(value)
            if (error) {
              newField.error = error
              return { ...prev, [name]: newField }
            }
          }
          newField.error = undefined
        }

        return { ...prev, [name]: newField }
      })
    },
    [validateOnChange]
  )

  const setFieldError = useCallback((name: string, error: string | undefined) => {
    setFields((prev) => {
      const field = prev[name]
      if (!field) return prev
      return {
        ...prev,
        [name]: { ...field, error, touched: true },
      }
    })
  }, [])

  const validateForm = useCallback((): boolean => {
    let isValid = true
    const fieldNames = Object.keys(fields)

    for (const name of fieldNames) {
      const fieldValid = validateField(name)
      if (!fieldValid) {
        isValid = false
      }
    }

    return isValid
  }, [fields, validateField])

  const resetField = useCallback((name: string) => {
    setFields((prev) => {
      const { [name]: _, ...rest } = prev
      return rest
    })
    delete validationRulesRef.current[name]
  }, [])

  const resetForm = useCallback(() => {
    setFields({})
    validationRulesRef.current = {}
  }, [])

  const getFieldValue = useCallback(<T,>(name: string): T | undefined => {
    return fields[name]?.value as T | undefined
  }, [fields])

  // Handle blur validation
  const handleBlur = useCallback(
    (name: string) => {
      if (validateOnBlur) {
        validateField(name)
      } else {
        // Mark as touched even if not validating
        setFields((prev) => {
          const field = prev[name]
          if (!field) return prev
          return {
            ...prev,
            [name]: { ...field, touched: true },
          }
        })
      }
    },
    [validateOnBlur, validateField]
  )

  return {
    fields,
    setFieldValue,
    setFieldError,
    validateField,
    validateForm,
    resetField,
    resetForm,
    getFieldValue,
  }
}
