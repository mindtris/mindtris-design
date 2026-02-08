/**
 * Badge: Small status/label pill.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Composition: optional `leadingIcon` slot; content via children.
 *
 * mindtris-ui reference variants we mirror:
 * - Small + large pills
 * - Pills with an icon
 * - Compact “chart delta” pills
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 *
 * @example
 * <Badge variant="accent">Working on</Badge>
 *
 * @example
 * <Badge size="sm" variant="inverse" leadingIcon={<Icon name="bolt" />}>Special Offer</Badge>
 */

"use client"

import * as React from 'react'
import { cn } from '../../lib/utils'
import { createVariants } from '../../lib/variant-utils'

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'muted'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'inverse'
export type BadgeSize = 'xs' | 'sm' | 'md'

const badgeVariants = createVariants({
  base: 'inline-flex items-center font-medium whitespace-nowrap select-none rounded-full',
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground border border-border',
      tertiary: 'bg-card border border-border text-primary',
      accent: 'bg-accent text-accent-foreground',
      muted: 'bg-muted text-muted-foreground',
      outline: 'bg-transparent text-foreground border border-border',
      ghost: 'bg-transparent text-muted-foreground',
      destructive: 'bg-destructive/15 text-destructive border border-destructive/30',
      inverse: 'bg-foreground text-background',
    },
    size: {
      xs: 'text-xs px-2.5 py-0.5',
      sm: 'text-xs px-2.5 py-1',
      md: 'text-sm px-3 py-1',
    },
  },
  defaultVariants: { variant: 'muted', size: 'sm' },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

export function Badge({ variant = 'muted', size = 'sm', leadingIcon, trailingIcon, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {leadingIcon ? <span className="mr-1 shrink-0 [&_svg]:size-3.5" aria-hidden="true">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="ml-1 shrink-0 [&_svg]:size-3.5" aria-hidden="true">{trailingIcon}</span> : null}
    </span>
  )
}

