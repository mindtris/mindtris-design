"use client"

import React from 'react'
import { cn } from '../../lib/utils'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-2 py-1',
  md: 'px-3 py-2',
  lg: 'px-4 py-3',
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = 'md', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Based on `app/(alternative)/components-library/form` (.form-input).
          // Token-driven, no hardcoded grays.
          'w-full rounded-lg border border-input bg-background text-sm text-foreground leading-5 shadow-none',
          'placeholder:text-muted-foreground',
          'hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border/80',
          'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed',
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

/**
 * Checkbox
 * Token-driven checkbox component
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border-input bg-background text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Checkbox.displayName = 'Checkbox'

/**
 * Radio
 * Token-driven radio button component
 */
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="radio"
        className={cn(
          'h-4 w-4 rounded-full border-input bg-background text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Radio.displayName = 'Radio'

/**
 * Switch
 * Toggle switch component
 */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, checked, onChange, disabled, ...props }, ref) => {
    const autoId = React.useId()
    const switchId = id ?? autoId
    
    return (
      <div className="flex items-center">
        <div className="relative inline-flex">
          <input
            type="checkbox"
            id={switchId}
            className="sr-only"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            ref={ref}
            {...props}
          />
          <label
            htmlFor={switchId}
            className={cn(
              'relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors',
              checked ? 'bg-primary' : 'bg-muted',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-card shadow-sm transition-transform',
                checked ? 'translate-x-6' : 'translate-x-1'
              )}
              aria-hidden="true"
            />
            {label && <span className="sr-only">{label}</span>}
          </label>
        </div>
        {label && (
          <span className={cn('text-sm ml-2 text-foreground', disabled && 'text-muted-foreground')}>
            {label}
          </span>
        )}
      </div>
    )
  }
)
Switch.displayName = 'Switch'
