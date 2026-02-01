/**
 * Accordion: Shows/hides content under a trigger.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - A11y: uses a real `<button>` trigger with `aria-expanded`, `aria-controls`, and a region panel.
 * - Controlled + uncontrolled: supports `open` + `onOpenChange` or `defaultOpen`.
 * - Motion: uses token durations/easings; content is visually collapsed via CSS grid.
 *
 * @author: @mindtris-team
 * @version: 1.0.0
 * @since: 2026-01-31
 *
 * @example
 * <Accordion title="Details" defaultOpen={true}>
 *   Content goes here.
 * </Accordion>
 */

"use client"

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface AccordionProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
}
export function Accordion({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
}: AccordionProps) {
  const triggerId = React.useId()
  const panelId = React.useId()

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = open != null
  const isOpen = isControlled ? Boolean(open) : internalOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  return (
    <div className={cn('rounded-lg border border-border bg-card px-5 py-4', className)}>
      <button
        type="button"
        className={cn(
          'w-full flex items-center justify-between gap-3 text-left rounded-md',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          triggerClassName
        )}
        aria-expanded={isOpen}
        aria-controls={panelId}
        id={triggerId}
        disabled={disabled}
        onClick={() => setOpen(!isOpen)}
      >
        <div className="text-sm font-medium text-foreground">{title}</div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)]',
            isOpen && 'rotate-180'
          )}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          'grid transition-[grid-template-rows] duration-[var(--duration-normal)] ease-[var(--ease-out)]',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className={cn('overflow-hidden', contentClassName)}>
          <div className={cn('pt-2 text-sm text-muted-foreground')}>{children}</div>
        </div>
      </div>
    </div>
  )
}

