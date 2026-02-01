'use client'

import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Shared collapsible section used across Colors, Typography, Other tabs (design-system consistency) */
interface CollapsibleSectionProps {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
  className?: string
}

export function CollapsibleSection({ title, open, onToggle, children, className }: CollapsibleSectionProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card overflow-hidden shadow-none',
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
      >
        <span>{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="px-3 pb-3 pt-0 space-y-3 border-t border-border/50">
          {children}
        </div>
      )}
    </div>
  )
}
