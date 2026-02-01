/**
 * Button: Displays a button or a component that looks like a button.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - One source of truth: variants/sizes via `createVariants(...)`.
 * - A11y: icon-only requires `aria-label`; `isLoading` => `aria-busy` + disabled.
 * - Disabled: native `disabled` for `<button>`; emulate for `render` targets (`aria-disabled`, `tabIndex=-1`, prevent click).
 * - API: `size` supports text (`default|xs|sm|md|lg|xl`) + icon (`icon|icon-...`) sizes; `render` enables Link-as-button.
 * - Motion: spinner respects `prefers-reduced-motion`.
 *
 * @author: @mindtris-team
 * @version: 1.0.0
 * @since: 2026-01-31
 *
 * @example
 * <Button variant="primary" size="md" isLoading={true} fullWidth={true} leadingIcon={<Icon name="plus" />} trailingIcon={<Icon name="minus" />} iconOnly={true} tooltip="Add item" render={<Link href="/items">Items</Link>} />
 */


"use client"

import React from 'react'
import { ChevronRight, Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import { createVariants } from '../../lib/variant-utils'
import { usePrefersReducedMotion } from '../../hooks/use-prefers-reduced-motion'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'outline-strong'
  | 'ghost'
  | 'link'
  | 'menu'
  | 'icon'
  | 'icon-ghost'
  | 'danger'
  | 'danger-outline'
  | 'destructive'
  | 'destructive-outline'

export type ButtonTextSize = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ButtonIconSize = 'icon' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl'
export type ButtonSize = ButtonTextSize | ButtonIconSize
export type ButtonWeight = 'default' | 'strong'
export type ButtonAlign = 'left' | 'center' | 'right' | 'between'
export type ButtonMotion = 'none' | 'lift'
export type ButtonShape = 'rounded' | 'pill'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  weight?: ButtonWeight
  /** Controls horizontal alignment of button content (best paired with `fullWidth`). */
  align?: ButtonAlign
  /** Controls the button corner shape. */
  shape?: ButtonShape
  /** Subtle interaction motion (respects prefers-reduced-motion). */
  motion?: ButtonMotion
  isLoading?: boolean
  fullWidth?: boolean
  /** Adds a chevron and animates it on hover (like “Learn more →”). */
  arrowIcon?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  /** Forces icon-only layout (square button). Also implied by `variant="icon"`. */
  iconOnly?: boolean
  tooltip?: string
  /**
   * Render as another element (e.g. `next/link`), while preserving button styles.
   *
   * Similar intent to coss's `render` prop.
   */
  render?: React.ReactElement<any>
}

/**
 * Button
 * Uses semantic CSS variables (design tokens) for theme-aware styling.
 * Colors automatically adapt when themes change.
 */
const baseClasses =
  'text-sm inline-flex items-center border border-transparent leading-5 shadow-sm transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer data-[disabled=true]:cursor-not-allowed data-[loading=true]:cursor-not-allowed'

const buttonVariants = createVariants({
  base: [
    baseClasses,
    // Only apply "disabled" visuals when explicitly disabled (not when loading).
    'data-[disabled=true]:border-border data-[disabled=true]:bg-card data-[disabled=true]:text-muted-foreground data-[disabled=true]:shadow-none',
    // Loading should keep variant colors, but look inert.
    'data-[loading=true]:shadow-none data-[loading=true]:opacity-90',
  ],
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/90',
      tertiary: 'bg-card border-border hover:bg-card/95 text-primary',
      outline: 'bg-card border border-border text-foreground hover:bg-muted',
      'outline-strong': 'bg-card border border-primary text-foreground hover:bg-muted',
      ghost: 'bg-transparent border-0 shadow-none text-foreground hover:bg-muted',
      link: 'bg-transparent border-0 shadow-none text-primary underline-offset-4 hover:underline',
      // Header/menu link style: shows a rounded "box" on hover.
      menu: 'bg-transparent border-0 shadow-none rounded-md text-muted-foreground hover:text-foreground hover:bg-muted',
      icon: 'bg-transparent border-0 shadow-none text-muted-foreground hover:text-foreground hover:bg-muted',
      // Icon-only, minimal: no background and no border (even on hover).
      'icon-ghost': 'bg-transparent border-0 shadow-none text-muted-foreground hover:text-foreground',
      danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      'danger-outline': 'bg-card border border-border text-destructive hover:bg-muted',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      'destructive-outline': 'bg-card border border-border text-destructive hover:bg-muted',
    },
    weight: {
      default: 'font-medium',
      strong: 'font-semibold',
    },
    shape: {
      rounded: 'rounded-lg',
      pill: 'rounded-full',
    },
    align: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    },
    size: {
      default: 'px-3 py-2',
      xs: 'px-2 py-0.5 text-xs',
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2',
      lg: 'px-4 py-3 text-base',
      xl: 'px-5 py-3.5 text-base',
    },
    iconSize: {
      xs: 'p-1.5',
      sm: 'p-2',
      md: 'p-2.5',
      lg: 'p-3',
      xl: 'p-3.5',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    iconOnly: {
      true: 'aspect-square',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    weight: 'default',
    shape: 'rounded',
    align: 'center',
    size: 'default',
    iconSize: 'md',
    fullWidth: 'false',
    iconOnly: 'false',
  },
})

export function Button({
  className,
  variant = 'primary',
  size = 'default',
  weight = 'default',
  align = 'center',
  shape = 'rounded',
  motion = 'none',
  isLoading = false,
  fullWidth = false,
  arrowIcon = false,
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  disabled,
  tooltip,
  render,
  children,
  ...props
}: ButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isExplicitlyDisabled = Boolean(disabled)
  const isDisabled = isExplicitlyDisabled || isLoading
  const showLeadingIcon = Boolean(leadingIcon && !isLoading)
  const resolvedTrailingIcon =
    !isLoading && arrowIcon && !trailingIcon ? <ChevronRight className="h-4 w-4" aria-hidden /> : trailingIcon
  const showTrailingIcon = Boolean(resolvedTrailingIcon && !isLoading)
  const isIconSize = size === 'icon' || size.startsWith('icon-')
  const isIconOnly = iconOnly || variant === 'icon' || isIconSize

  const ariaLabelProp = props['aria-label']
  if (process.env.NODE_ENV !== 'production') {
    // For icon buttons, require an accessible name (aria-label) unless visible text exists.
    // Note: if the caller passes an icon element, `children` won't be a string.
    if (isIconOnly && !ariaLabelProp && typeof children !== 'string') {
      // eslint-disable-next-line no-console
      console.warn(
        '[Button] Icon-only buttons should include an `aria-label` for accessibility.'
      )
    }
  }

  const resolveTextSize = (): ButtonTextSize => {
    if (isIconSize) return 'default'
    return size as ButtonTextSize
  }

  const resolveIconSize = (): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
    switch (size) {
      case 'icon-xs':
        return 'xs'
      case 'icon-sm':
        return 'sm'
      case 'icon-md':
      case 'icon':
        return 'md'
      case 'icon-lg':
        return 'lg'
      case 'icon-xl':
        return 'xl'
      default:
        // Back-compat: if caller uses regular sizes with `variant="icon"` / `iconOnly`
        if (size === 'xs' || size === 'sm' || size === 'md' || size === 'lg' || size === 'xl') {
          return size
        }
        return 'md'
    }
  }

  const computedClassName = cn(
    buttonVariants({
      variant,
      weight,
      shape,
      align,
      size: isIconOnly ? undefined : resolveTextSize(),
      iconSize: isIconOnly ? resolveIconSize() : undefined,
      iconOnly: isIconOnly ? 'true' : 'false',
      fullWidth: fullWidth && !isIconOnly ? 'true' : 'false',
    }),
    arrowIcon && 'group',
    motion === 'lift' &&
      !prefersReducedMotion &&
      'transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 active:translate-y-0',
    className,
    (render?.props as any)?.className
  )

  const content = (
    <>
      {isLoading && (
        <Loader2
          className={cn('h-4 w-4 shrink-0', !prefersReducedMotion && 'animate-spin')}
          aria-hidden
        />
      )}
      {showLeadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      {children != null && !isIconOnly && (
        <span
          className={cn(
            (isLoading || showLeadingIcon) && 'ml-2',
            showTrailingIcon && 'mr-2'
          )}
        >
          {children}
        </span>
      )}
      {isIconOnly && !isLoading && !showLeadingIcon && !showTrailingIcon && children}
      {showTrailingIcon && (
        <span
          className={cn(
            'shrink-0',
            arrowIcon &&
              !prefersReducedMotion &&
              'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] opacity-0 translate-x-[-2px] group-hover:opacity-100 group-hover:translate-x-0.5 group-focus-visible:opacity-100 group-focus-visible:translate-x-0.5'
          )}
        >
          {resolvedTrailingIcon}
        </span>
      )}
    </>
  )

  // Render-as-another-element path (e.g. Link)
  if (render) {
    const renderProps: Record<string, any> = {
      ...(render.props as any),
      ...(props as any),
      className: computedClassName,
      title: tooltip || (render.props as any)?.title,
      'aria-busy': isLoading || undefined,
      'data-loading': isLoading ? 'true' : 'false',
      'data-disabled': isExplicitlyDisabled ? 'true' : 'false',
      children: content,
    }

    // Disabled handling for non-<button> render targets
    if (isDisabled) {
      renderProps['aria-disabled'] = true
      renderProps['data-disabled'] = true
      renderProps['tabIndex'] = -1

      renderProps['onClick'] = (event: any) => {
        event?.preventDefault?.()
        event?.stopPropagation?.()
        return
      }
    } else {
      // Merge onClick handlers if both exist.
      const existingOnClick = (render.props as any)?.onClick
      const userOnClick = (props as any)?.onClick
      if (existingOnClick || userOnClick) {
        renderProps['onClick'] = (event: any) => {
          existingOnClick?.(event)
          userOnClick?.(event)
        }
      }
    }

    // aria-label handling
    if (!ariaLabelProp && isIconOnly && typeof children === 'string') {
      renderProps['aria-label'] = children
    }

    return React.cloneElement(render, renderProps)
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={computedClassName}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      data-loading={isLoading ? 'true' : 'false'}
      data-disabled={isExplicitlyDisabled ? 'true' : 'false'}
      aria-label={isIconOnly && typeof children === 'string' ? children : undefined}
      title={tooltip || undefined}
      {...props}
    >
      {content}
    </button>
  )
}
