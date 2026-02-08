/**
 * AccordionGroup: Renders a stacked set of accordion items (single or multiple open).
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - A11y: each item uses a real `<button>` trigger with `aria-expanded`, `aria-controls`, and a region panel.
 * - Controlled + uncontrolled:
 *   - `type="single"`: `value?: string|null` / `defaultValue?: string|null`
 *   - `type="multiple"`: `value?: string[]` / `defaultValue?: string[]`
 *
 * Reference (Mindtris UI) variants we mirror in Mindtris docs:
 * - Basic (single item)
 * - Table row accordion
 * - Rich table row accordion
 *
 * Planned Mindtris variants (placeholders; refine later per `button.tsx` + `simplifi-frontend/CONTRIBUTING.md`):
 * - Group: `type="single"` (only one open)
 * - Group: `type="multiple"` (multiple open)
 * - Group: `collapsible={false}` (single mode cannot close last open)
 * - Group: `disabled` at group/item level
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 *
 * @example
 * <AccordionGroup
 *   type="single"
 *   defaultValue="first"
 *   items={[
 *     { id: 'first', title: 'First item', content: 'Content for the first item' },
 *     { id: 'second', title: 'Second item', content: 'Content for the second item' },
 *   ]}
 * />
 */

"use client"

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface AccordionGroupItem {
  id: string
  title: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

type SharedAccordionGroupProps = {
  items: AccordionGroupItem[]
  disabled?: boolean
  className?: string
  itemClassName?: string
  triggerClassName?: string
  contentClassName?: string
}

export type AccordionGroupSingleProps = SharedAccordionGroupProps & {
  type?: 'single'
  /** When false, the currently-open item cannot be collapsed by clicking it again. */
  collapsible?: boolean
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
}

export type AccordionGroupMultipleProps = SharedAccordionGroupProps & {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type AccordionGroupProps = AccordionGroupSingleProps | AccordionGroupMultipleProps

function normalizeDomId(value: string) {
  // Keep it deterministic and safe for DOM ids.
  return value.trim().replace(/[^a-zA-Z0-9\-_:.]/g, '-')
}

export function AccordionGroup(props: AccordionGroupProps) {
  const baseId = React.useId()

  const {
    items,
    disabled = false,
    className,
    itemClassName,
    triggerClassName,
    contentClassName,
  } = props

  const mode: 'single' | 'multiple' = props.type === 'multiple' ? 'multiple' : 'single'
  const isSingle = mode === 'single'

  const singleProps = props as AccordionGroupSingleProps
  const multipleProps = props as AccordionGroupMultipleProps

  const [internalSingle, setInternalSingle] = React.useState<string | null>(() => {
    if (mode === 'multiple') return null
    return singleProps.defaultValue ?? null
  })
  const [internalMultiple, setInternalMultiple] = React.useState<string[]>(() => {
    if (mode === 'single') return []
    return multipleProps.defaultValue ?? []
  })

  const isControlled = isSingle ? singleProps.value !== undefined : multipleProps.value !== undefined
  const value = isSingle ? (singleProps.value ?? internalSingle) : (multipleProps.value ?? internalMultiple)

  const setValue = React.useCallback(
    (next: string | null | string[]) => {
      if (isSingle) {
        const v = (next as string | null) ?? null
        if (!isControlled) setInternalSingle(v)
        singleProps.onValueChange?.(v)
      } else {
        const v = Array.isArray(next) ? next : []
        if (!isControlled) setInternalMultiple(v)
        multipleProps.onValueChange?.(v)
      }
    },
    [isControlled, isSingle, multipleProps, singleProps]
  )

  const isItemOpen = React.useCallback(
    (id: string) => {
      if (isSingle) return value === id
      return Array.isArray(value) ? value.includes(id) : false
    },
    [isSingle, value]
  )

  const toggleItem = React.useCallback(
    (id: string) => {
      if (disabled) return

      if (isSingle) {
        const collapsible = (props as AccordionGroupSingleProps).collapsible ?? true
        const currentlyOpen = value === id
        if (currentlyOpen) {
          if (collapsible) setValue(null)
          return
        }
        setValue(id)
        return
      }

      const current = Array.isArray(value) ? value : []
      if (current.includes(id)) {
        setValue(current.filter((x) => x !== id))
      } else {
        setValue([...current, id])
      }
    },
    [disabled, isSingle, props, setValue, value]
  )

  return (
    <div className={cn('rounded-lg border border-border bg-card overflow-hidden', className)}>
      <div className="divide-y divide-border">
        {items.map((item, idx) => {
          const open = isItemOpen(item.id)
          const itemDisabled = disabled || Boolean(item.disabled)
          const safeId = normalizeDomId(item.id || String(idx))
          const triggerId = `${baseId}-trigger-${safeId}`
          const panelId = `${baseId}-panel-${safeId}`

          return (
            <div key={item.id} className={cn('px-5 py-4', itemClassName)}>
              <button
                type="button"
                className={cn(
                  'w-full flex items-center justify-between gap-3 text-left rounded-md',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  itemDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
                  triggerClassName
                )}
                aria-expanded={open}
                aria-controls={panelId}
                id={triggerId}
                disabled={itemDisabled}
                onClick={() => toggleItem(item.id)}
              >
                <div className="text-base font-semibold text-foreground">{item.title}</div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)]',
                    open && 'rotate-180'
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
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
              >
                <div className={cn('overflow-hidden', contentClassName)}>
                  <div className="pt-3 text-sm text-muted-foreground">{item.content}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

