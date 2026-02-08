/**
 * Breadcrumb: Hierarchical navigation trail.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - A11y: renders `<nav aria-label="Breadcrumb">`.
 *
 * Mindtris UI reference variants we mirror:
 * - Separators: slash, dot, chevron
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

"use client"

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export type BreadcrumbSeparator = 'slash' | 'dot' | 'chevron' | React.ReactNode

export interface BreadcrumbItem {
  label: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  current?: boolean
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: BreadcrumbSeparator
}

function Separator({ separator }: { separator: BreadcrumbSeparator }) {
  if (separator === 'slash') return <span className="px-2 text-muted-foreground/70">/</span>
  if (separator === 'dot') return <span className="px-2 text-muted-foreground/70">·</span>
  if (separator === 'chevron') return <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground/70" aria-hidden />
  return <span className="px-2 text-muted-foreground/70">{separator}</span>
}

export function Breadcrumb({ items, separator = 'slash', className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn(className)} {...props}>
      <ol className="inline-flex flex-wrap items-center text-sm font-medium">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          const isCurrent = Boolean(item.current) || isLast
          const linkClass = cn(
            'transition-colors',
            isCurrent ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          )

          return (
            <li key={idx} className="inline-flex items-center">
              {item.href ? (
                <a href={item.href} onClick={item.onClick} aria-current={isCurrent ? 'page' : undefined} className={linkClass}>
                  {item.label}
                </a>
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined} className={linkClass}>
                  {item.label}
                </span>
              )}

              {!isLast ? <Separator separator={separator} /> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

