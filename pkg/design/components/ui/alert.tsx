/**
 * Alert: Inline message block for status and feedback.
 *
 * Design-system contract
 * - Scope: UI-only primitive. No domain copy, no API calls.
 * - Tokens-only: semantic token classes only.
 * - Composition: title/description slots, optional icon.
 *
 * Mindtris UI reference variants we mirror:
 * - Banner-like inline alerts (apps can compose dismiss + actions)
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from 'react'
import { cn } from '../../lib/utils'
import { createVariants } from '../../lib/variant-utils'

export type AlertVariant = 'default' | 'accent' | 'destructive'

const alertVariants = createVariants({
  base: 'rounded-xl border p-4',
  variants: {
    variant: {
      default: 'bg-card border-border text-foreground',
      accent: 'bg-accent/40 border-border text-foreground',
      destructive: 'bg-destructive/10 border-destructive/25 text-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  /** Optional action slot (e.g. button). */
  action?: React.ReactNode
}

export function Alert({
  variant = 'default',
  icon,
  title,
  description,
  action,
  className,
  ...props
}: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant }), className)} role="status" {...props}>
      <div className="flex items-start gap-3">
        {icon ? <div className="mt-0.5 text-muted-foreground">{icon}</div> : null}
        <div className="min-w-0 flex-1">
          {title ? <div className="text-sm font-semibold text-foreground">{title}</div> : null}
          {description ? <div className="mt-1 text-sm text-muted-foreground">{description}</div> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  )
}

