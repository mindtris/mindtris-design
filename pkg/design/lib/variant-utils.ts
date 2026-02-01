import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cn } from './utils'

/**
 * Variant configuration for component variants
 */
export interface VariantConfig<T extends string> {
  base?: ClassValue
  variants: Record<string, Record<T | string, ClassValue>>
  defaultVariants?: Partial<Record<string, T | string>>
  compoundVariants?: Array<{
    variants: Partial<Record<string, T | string>>
    class: ClassValue
  }>
}

/**
 * Create a variant function for type-safe component variants
 * Combines base classes with variant classes and compound variants
 * 
 * @param config - Variant configuration
 * @returns Function that generates className strings from variant props
 * 
 * @example
 * ```tsx
 * const buttonVariants = createVariants({
 *   base: "px-4 py-2 rounded font-medium",
 *   variants: {
 *     variant: {
 *       primary: "bg-primary text-primary-foreground",
 *       secondary: "bg-secondary text-secondary-foreground",
 *     },
 *     size: {
 *       sm: "text-sm px-3 py-1",
 *       md: "px-4 py-2",
 *       lg: "text-lg px-6 py-3",
 *     },
 *   },
 *   defaultVariants: {
 *     variant: "primary",
 *     size: "md",
 *   },
 *   compoundVariants: [
 *     {
 *       variants: { variant: "primary", size: "lg" },
 *       class: "shadow-lg",
 *     },
 *   ],
 * })
 * 
 * // Usage
 * const className = buttonVariants({ variant: "primary", size: "lg" })
 * ```
 */
export function createVariants<T extends string>(
  config: VariantConfig<T>
): (props?: Partial<Record<string, T | string | undefined>>) => string {
  return (props = {}) => {
    const { base, variants, defaultVariants = {}, compoundVariants = [] } = config

    // Merge props with defaults
    const mergedProps = { ...defaultVariants, ...props }

    // Build class array
    const classes: ClassValue[] = []

    // Add base classes
    if (base) {
      classes.push(base)
    }

    // Add variant classes
    Object.entries(variants).forEach(([variantKey, variantMap]) => {
      const value = mergedProps[variantKey]
      if (value && variantMap[value]) {
        classes.push(variantMap[value])
      }
    })

    // Add compound variant classes
    compoundVariants.forEach((compound) => {
      const matches = Object.entries(compound.variants).every(
        ([key, value]) => mergedProps[key] === value
      )
      if (matches) {
        classes.push(compound.class)
      }
    })

    return cn(classes)
  }
}

/**
 * Generate variant class names from variant props
 * Simpler version without compound variants
 * 
 * @param base - Base classes
 * @param variants - Variant class maps
 * @param props - Variant props
 * @returns Merged className string
 * 
 * @example
 * ```tsx
 * const className = variantClassNames(
 *   "px-4 py-2",
 *   {
 *     variant: {
 *       primary: "bg-primary",
 *       secondary: "bg-secondary",
 *     },
 *   },
 *   { variant: "primary" }
 * )
 * ```
 */
export function variantClassNames(
  base: ClassValue,
  variants: Record<string, Record<string, ClassValue>>,
  props: Record<string, string | undefined>
): string {
  const classes: ClassValue[] = [base]

  Object.entries(variants).forEach(([variantKey, variantMap]) => {
    const value = props[variantKey]
    if (value && variantMap[value]) {
      classes.push(variantMap[value])
    }
  })

  return cn(classes)
}
