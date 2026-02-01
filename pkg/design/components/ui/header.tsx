'use client'

import { useState, type ReactNode } from 'react'
import { useAppProvider } from '../../contexts/app-provider'

export default function Header({
  variant = 'default',
  rightSlot,
}: {
  variant?: 'default' | 'v2' | 'v3'
  /** App-specific header actions (search, notifications, theme toggle, profile). Pass from app. */
  rightSlot?: ReactNode
}) {
  const { sidebarOpen, setSidebarOpen } = useAppProvider()

  return (
    <header className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-background/90 before:-z-10 z-30 ${variant === 'v2' || variant === 'v3' ? 'before:bg-background after:absolute after:h-px after:inset-x-0 after:top-full after:bg-border after:-z-10' : 'max-lg:shadow-sm lg:before:bg-muted/90'} ${variant === 'v2' ? '' : ''} ${variant === 'v3' ? '' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-border'}`}>

          {/* Header: Left side */}
          <div className="flex">
            <button
              className="text-muted-foreground hover:text-foreground lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side — app passes rightSlot (search, notifications, profile, etc.) */}
          {rightSlot != null && (
            <div className="flex items-center space-x-3">
              {rightSlot}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
