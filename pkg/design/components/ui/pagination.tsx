/**
 * Pagination: Page navigation controls.
 *
 * Design-system contract
 * - Scope: UI-only primitive. No routing, no API calls, no domain logic.
 * - Tokens-only: semantic token classes only.
 * - A11y: uses nav/aria-label and current page semantics.
 *
 * Mindtris UI reference variants we mirror:
 * - Numeric pager with ellipsis
 * - Classic prev/next with a results summary (apps can render the summary)
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './button'

export type PaginationVariant = 'numeric' | 'classic'

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  variant?: PaginationVariant
  /** Max numeric buttons (including first/last). Default 7. */
  maxButtons?: number
  /** Optional results summary slot (for classic layout). */
  summary?: React.ReactNode
}

type PageToken = number | 'ellipsis'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function buildPageTokens(page: number, total: number, maxButtons: number): PageToken[] {
  const safeMax = Math.max(5, maxButtons)
  if (total <= safeMax) return Array.from({ length: total }, (_, i) => i + 1)

  const first = 1
  const last = total
  const windowSize = safeMax - 2 // reserve for first + last
  const half = Math.floor(windowSize / 2)

  let start = page - half
  let end = page + half

  if (start < 2) {
    start = 2
    end = start + windowSize - 1
  }
  if (end > last - 1) {
    end = last - 1
    start = end - windowSize + 1
  }

  const tokens: PageToken[] = [first]
  if (start > 2) tokens.push('ellipsis')
  for (let i = start; i <= end; i++) tokens.push(i)
  if (end < last - 1) tokens.push('ellipsis')
  tokens.push(last)
  return tokens
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  variant = 'numeric',
  maxButtons = 7,
  summary,
  className,
  ...props
}: PaginationProps) {
  const current = clamp(page, 1, Math.max(1, totalPages))
  const canPrev = current > 1
  const canNext = current < totalPages

  if (variant === 'classic') {
    return (
      <nav className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3', className)} aria-label="Pagination" {...props}>
        <div className="order-2 sm:order-1">
          <div className="flex justify-center sm:justify-start gap-2">
            <Button variant="secondary" size="sm" disabled={!canPrev} onClick={() => onPageChange(current - 1)}>
              &larr; Previous
            </Button>
            <Button variant="secondary" size="sm" disabled={!canNext} onClick={() => onPageChange(current + 1)}>
              Next &rarr;
            </Button>
          </div>
        </div>
        {summary ? <div className="order-1 sm:order-2 text-sm text-muted-foreground text-center sm:text-left">{summary}</div> : null}
      </nav>
    )
  }

  const tokens = buildPageTokens(current, totalPages, maxButtons)

  return (
    <nav className={cn('flex justify-center', className)} aria-label="Pagination" {...props}>
      <div className="flex items-center">
        <Button
          variant="secondary"
          size="icon-sm"
          aria-label="Previous page"
          disabled={!canPrev}
          onClick={() => onPageChange(current - 1)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </Button>

        <div className="mx-2 inline-flex rounded-lg border border-border overflow-hidden">
          {tokens.map((t, idx) => {
            if (t === 'ellipsis') {
              return (
                <span key={`e-${idx}`} className="inline-flex items-center justify-center px-3 py-2 text-sm text-muted-foreground bg-card">
                  …
                </span>
              )
            }
            const isActive = t === current
            return (
              <button
                key={t}
                type="button"
                onClick={() => onPageChange(t)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center justify-center px-3.5 py-2 text-sm font-medium transition-colors',
                  'bg-card hover:bg-muted border-r border-border last:border-r-0',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t}
              </button>
            )
          })}
        </div>

        <Button
          variant="secondary"
          size="icon-sm"
          aria-label="Next page"
          disabled={!canNext}
          onClick={() => onPageChange(current + 1)}
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </nav>
  )
}

