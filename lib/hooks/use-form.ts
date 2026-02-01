'use client'

import { useForm as useReactHookForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback } from 'react'

// Generic form hook with Zod validation
export function useForm<T extends z.ZodType>(
  schema: T,
  options?: Omit<UseFormProps<z.infer<T>>, 'resolver'>
): UseFormReturn<z.infer<T>> & {
  handleSubmit: (onSubmit: (data: z.infer<T>) => void | Promise<void>) => (e?: React.BaseSyntheticEvent) => Promise<void>
} {
  const form = useReactHookForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    ...options
  })

  const handleSubmitWithErrorHandling = useCallback(
    (onSubmit: (data: z.infer<T>) => void | Promise<void>) =>
      form.handleSubmit(async (data: z.infer<T>) => {
        try {
          await onSubmit(data)
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Form submission error:', error)
          }
          // You can add global error handling here
        }
      }),
    [form]
  )

  return {
    ...form,
    handleSubmitWithErrorHandling
  } as UseFormReturn<z.infer<T>> & {
    handleSubmitWithErrorHandling: (onSubmit: (data: z.infer<T>) => void | Promise<void>) => (e?: React.BaseSyntheticEvent) => Promise<void>
  }
}

// Form field hook for controlled components
export function useFormField<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  name: keyof T
) {
  const {
    register,
    formState: { errors, touchedFields, isDirty },
    setValue,
    getValues,
    watch
  } = form

  const error = errors[name]
  const touched = (touchedFields as any)[name]
  const value = watch(name as any)
  const isFieldDirty = isDirty

  const fieldProps = register(name as any)

  return {
    ...fieldProps,
    error: error?.message as string | undefined,
    touched: !!touched,
    value,
    isDirty: isFieldDirty,
    setValue: (value: any) => setValue(name as any, value),
    getValue: () => getValues(name as any)
  }
}

// Form validation hook
export function useFormValidation<T extends z.ZodType>(
  schema: T,
  data: Partial<z.infer<T>>
) {
  const validate = useCallback(
    async (fieldData: Partial<z.infer<T>>) => {
      try {
        await schema.parseAsync(fieldData)
        return { isValid: true, errors: {} }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: Record<string, string> = {}
          error.errors.forEach((err) => {
            if (err.path.length > 0) {
              fieldErrors[err.path[0] as string] = err.message
            }
          })
          return { isValid: false, errors: fieldErrors }
        }
        return { isValid: false, errors: { general: 'Validation failed' } }
      }
    },
    [schema]
  )

  return {
    validate: () => validate(data),
    validateField: (fieldName: keyof z.infer<T>, value: any) =>
      validate({ ...data, [fieldName]: value })
  }
}

// Form state hook
export function useFormState<T extends Record<string, any>>(
  form: UseFormReturn<T>
) {
  const {
    formState: { isSubmitting, isDirty, isValid, errors, touchedFields },
    watch,
    getValues,
    setValue,
    reset
  } = form

  const values = watch()
  const hasErrors = Object.keys(errors).length > 0
  const hasTouchedFields = Object.keys(touchedFields).length > 0

  return {
    isSubmitting,
    isDirty,
    isValid,
    hasErrors,
    hasTouchedFields,
    values,
    getValues,
    setValue,
    reset,
    canSubmit: !hasErrors && hasTouchedFields && !isSubmitting
  }
}

// Form reset hook
export function useFormReset<T extends Record<string, any>>(
  form: UseFormReturn<T>
) {
  const { reset, formState } = form

  const resetToDefault = useCallback(
    (defaultValues?: Partial<T>) => {
      reset(defaultValues as any)
    },
    [reset]
  )

  const resetToInitial = useCallback(() => {
    reset()
  }, [reset])

  const resetField = useCallback(
    (fieldName: keyof T, value?: any) => {
      reset({ ...formState.defaultValues, [fieldName]: value } as any)
    },
    [reset, formState.defaultValues]
  )

  return {
    resetToDefault,
    resetToInitial,
    resetField
  }
}

// Form submission hook
export function useFormSubmission<T extends Record<string, any>>(
  form: UseFormReturn<T>
) {
  const { handleSubmit, formState } = form

  const submitWithLoading = useCallback(
    async (onSubmit: (data: T) => void | Promise<void>) => {
      if (formState.isSubmitting) return

      try {
        await handleSubmit(onSubmit)()
      } catch (error) {
        console.error('Form submission error:', error)
        throw error
      }
    },
    [handleSubmit, formState.isSubmitting]
  )

  const submitWithErrorHandling = useCallback(
    async (
      onSubmit: (data: T) => void | Promise<void>,
      onError?: (error: any) => void
    ) => {
      try {
        await submitWithLoading(onSubmit)
      } catch (error) {
        onError?.(error)
      }
    },
    [submitWithLoading]
  )

  return {
    submitWithLoading,
    submitWithErrorHandling,
    isSubmitting: formState.isSubmitting
  }
}

// Form field array hook (for dynamic forms)
export function useFormFieldArray<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  name: keyof T
) {
  const { control, register, unregister, setValue, getValues, watch } = form

  const fields = watch(name as any) || []

  const append = useCallback(
    (value: any) => {
      const currentFields = getValues(name as any)
      setValue(name as any, [...(currentFields || []), value] as any)
    },
    [setValue, getValues, name]
  )

  const prepend = useCallback(
    (value: any) => {
      const currentFields = getValues(name as any)
      setValue(name as any, [value, ...(currentFields || [])] as any)
    },
    [setValue, getValues, name]
  )

  const remove = useCallback(
    (index: number) => {
      const currentFields = getValues(name as any)
      if (currentFields && Array.isArray(currentFields)) {
        const newFields = currentFields.filter((_: any, i: number) => i !== index)
        setValue(name as any, newFields as any)
      }
    },
    [setValue, getValues, name]
  )

  const move = useCallback(
    (from: number, to: number) => {
      const currentFields = getValues(name as any)
      if (currentFields && Array.isArray(currentFields)) {
        const newFields = [...currentFields]
        const [movedField] = newFields.splice(from, 1)
        newFields.splice(to, 0, movedField)
        setValue(name as any, newFields as any)
      }
    },
    [setValue, getValues, name]
  )

  const update = useCallback(
    (index: number, value: any) => {
      const currentFields = getValues(name as any)
      if (currentFields && Array.isArray(currentFields)) {
        const newFields = [...currentFields]
        newFields[index] = value
        setValue(name as any, newFields as any)
      }
    },
    [setValue, getValues, name]
  )

  return {
    fields,
    append,
    prepend,
    remove,
    move,
    update,
    register,
    unregister
  }
}
