'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

export type SidebarVariant = 'sidebar' | 'floating' | 'inset'
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none'
export type SidebarSide = 'left' | 'right'

export interface SidebarLinkProps {
  children: React.ReactNode
  href: string
  /** Controlled active state (app determines current route). */
  active?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?: string
}

/**
 * SidebarLink: route-agnostic link styling.
 * Apps own routing + active matching; pass `active`.
 */
export function SidebarLink({ children, href, active = false, onClick, className }: SidebarLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'block truncate text-sm font-medium transition-colors',
        active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
        className
      )}
    >
      {children}
    </a>
  )
}

export interface SidebarLinkGroupProps {
  children: (handleClick: () => void, openGroup: boolean) => React.ReactNode
  open?: boolean
  className?: string
}

/**
 * SidebarLinkGroup: UI-only disclosure wrapper for grouped nav.
 * It does not own routes or nav items.
 */
export function SidebarLinkGroup({ children, open = false, className }: SidebarLinkGroupProps) {
  const [openGroup, setOpenGroup] = React.useState<boolean>(open)
  const handleClick = () => setOpenGroup((v) => !v)

  return (
    <li className={cn('pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r group', className)}>
      {children(handleClick, openGroup)}
    </li>
  )
}

export interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Optional: show a backdrop for mobile/offcanvas patterns. */
  showBackdrop?: boolean
  variant?: SidebarVariant
  collapsible?: SidebarCollapsible
  side?: SidebarSide
  className?: string
  headerSlot?: React.ReactNode
  children?: React.ReactNode
}

/**
 * Sidebar: layout chrome + state wiring.
 *
 * Design-system contract:
 * - No routes, no domain nav items, no permission logic.
 * - Token-only styling via semantic classes.
 * - Apps provide the content (links, groups) via children/slots.
 */
export default function Sidebar({
  open,
  onOpenChange,
  showBackdrop = true,
  variant = 'sidebar',
  collapsible = 'none',
  side = 'left',
  className,
  headerSlot,
  children,
}: SidebarProps) {
  const sidebarRef = React.useRef<HTMLDivElement>(null)

  // close on click outside (only when open + backdrop pattern)
  React.useEffect(() => {
    if (!open) return
    const clickHandler = (event: MouseEvent) => {
      if (!sidebarRef.current) return
      if (sidebarRef.current.contains(event.target as Node)) return
      onOpenChange(false)
    }
    document.addEventListener('mousedown', clickHandler)
    return () => document.removeEventListener('mousedown', clickHandler)
  }, [open, onOpenChange])

  // close on esc
  React.useEffect(() => {
    if (!open) return
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [open, onOpenChange])

  const containerChrome =
    variant === 'sidebar'
      ? side === 'left'
        ? 'border-r border-sidebar-border bg-sidebar'
        : 'border-l border-sidebar-border bg-sidebar'
      : 'rounded-2xl border border-sidebar-border bg-sidebar shadow-xs'

  const widthClasses = collapsible === 'icon' ? 'w-64 lg:w-20 lg:hover:w-64' : 'w-64'
  const mobilePosition = side === 'left' ? 'left-0' : 'right-0'
  const mobileClosedTranslate = side === 'left' ? '-translate-x-64' : 'translate-x-64'

  return (
    <div className={cn('min-w-fit', className)}>
      {showBackdrop ? (
        <div
          className={cn(
            'fixed inset-0 z-40 lg:hidden transition-opacity',
            open ? 'opacity-100 bg-foreground/20' : 'opacity-0 pointer-events-none'
          )}
          aria-hidden="true"
          onClick={() => onOpenChange(false)}
        />
      ) : null}

      <div
        ref={sidebarRef}
        className={cn(
          'flex flex-col absolute z-50 lg:static top-0 lg:translate-x-0 h-[100dvh] overflow-y-auto no-scrollbar p-4 transition-all duration-200 ease-in-out',
          mobilePosition,
          widthClasses,
          containerChrome,
          open ? 'translate-x-0' : mobileClosedTranslate
        )}
        aria-hidden={!open && collapsible === 'offcanvas'}
      >
        {headerSlot != null ? <div className="mb-6">{headerSlot}</div> : null}
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  )
}

