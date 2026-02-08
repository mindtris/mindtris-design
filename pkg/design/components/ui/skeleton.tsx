/**
 * Skeleton: Loading placeholder (composable building block).
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Compositional: prefer composition (Avatar/Text/Card/Form/Table patterns) over config-heavy APIs.
 * - Motion: respects `prefers-reduced-motion` via Tailwind `motion-*` utilities.
 * - A11y: skeletons are typically decorative; set `aria-busy` on the parent region while loading.
 *
 * @author: @mindtris-team
 * @version: 0.3.0
 * @since: 2026-02-01
 *
 * @example
 * <div aria-busy="true" aria-live="polite">
 *   <Skeleton className="h-10 w-10 rounded-full" />
 *   <Skeleton lines={2} className="mt-3" />
 * </div>
 *
 * Reference: shadcn + Mindtris UI (composition patterns).
 */

"use client"

import * as React from 'react'
import { cn } from '../../lib/utils'

export type SkeletonTone = 'muted' | 'accent'
export type SkeletonRadius = 'sm' | 'md' | 'lg' | 'full'
export type SkeletonLineSize = 'sm' | 'md' | 'lg'

export interface SkeletonProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Optional multi-line skeleton helper (kept for back-compat).
   * When set to > 1, the component renders a stack of line placeholders.
   */
  lines?: number
  /** Visual tone (semantic token background). */
  tone?: SkeletonTone
  /** Corner radius for the single-block skeleton. */
  radius?: SkeletonRadius
  /** Line height when `lines` is used. */
  lineSize?: SkeletonLineSize
}

const toneClasses: Record<SkeletonTone, string> = {
  muted: 'bg-muted',
  // Keep skeletons neutral by default (avoid theme accent hues unless explicitly needed).
  // Still token-driven: uses the `--muted` token with opacity.
  accent: 'bg-muted/60',
}

const radiusClasses: Record<SkeletonRadius, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

const lineHeightClasses: Record<SkeletonLineSize, string> = {
  sm: 'h-3',
  md: 'h-4',
  lg: 'h-5',
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      lines,
      tone = 'muted',
      radius = 'md',
      lineSize = 'md',
      ...props
    },
    ref
  ) => {
    const base = cn(
      // Motion-safe pulse; never animate for users who prefer reduced motion.
      'motion-safe:animate-pulse motion-reduce:animate-none',
      toneClasses[tone]
    )

    if (typeof lines === 'number' && lines > 1) {
      // Deterministic widths (helps avoid layout jump while still feeling realistic).
      const widths = ['w-full', 'w-11/12', 'w-5/6', 'w-4/5']
      return (
        <div ref={ref} className={cn('space-y-2', className)} {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              data-slot="skeleton-line"
              className={cn(
                base,
                radiusClasses.md,
                lineHeightClasses[lineSize],
                widths[Math.min(i, widths.length - 1)]
              )}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        data-slot="skeleton"
        className={cn(base, radiusClasses[radius], className)}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

