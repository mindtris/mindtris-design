'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '../../lib/utils'
import Logo from './logo'

export interface NavbarLink {
  href: string
  label: string
}

export interface NavbarProps {
  /** Left side brand. Defaults to Mindtris logo + "Design System". */
  brand?: React.ReactNode
  links?: readonly NavbarLink[]
  rightSlot?: React.ReactNode
  className?: string
}

export function Navbar({ brand, links = [], rightSlot, className }: NavbarProps) {
  return (
    <div className={cn('sticky top-0 z-50 border-b border-border bg-background', className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="h-14 flex items-center gap-4">
          {brand ?? (
            <div className="flex items-center gap-2 font-semibold text-foreground shrink-0">
              <Logo />
              <span className="hidden sm:block">Design System</span>
            </div>
          )}

          {links.length > 0 ? (
            <nav className="hidden md:flex items-center gap-1.5 min-w-0">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}

          {rightSlot != null ? <div className="ml-auto flex items-center gap-2 min-w-0">{rightSlot}</div> : null}
        </div>
      </div>
    </div>
  )
}

