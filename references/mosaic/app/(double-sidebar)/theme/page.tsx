'use client'

import React from 'react'
import { ThemeCustomizer } from '../../../pkg/design/components/theme-customizer'
import ThemePreview from './theme-preview'

/**
 * Theme page: double-sidebar layout (like inbox).
 * - Top: header from (double-sidebar) layout
 * - Left (small): theme customizer
 * - Center (big): live preview
 * - Right (small): layout / tips
 */
export default function ThemePage() {
  return (
    <div className="relative flex flex-1 min-h-0">
      {/* Left: customizer (small) */}
      <div className="w-full md:w-[22rem] xl:w-[24rem] shrink-0 border-r border-border overflow-hidden flex flex-col h-[calc(100dvh-64px)]">
        <ThemeCustomizer
          open
          onOpenChange={() => {}}
          inline
        />
      </div>

      {/* Center: live preview (big) */}
      <div className="flex-1 min-w-0 flex flex-col">
        <ThemePreview />
      </div>

      {/* Right: small panel */}
      <div className="hidden lg:flex w-[18rem] xl:w-[20rem] shrink-0 border-l border-border overflow-y-auto no-scrollbar h-[calc(100dvh-64px)]">
        <div className="p-4 space-y-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase">
            Layout options
          </div>
          <p className="text-sm text-muted-foreground">
            Use the Layout tab in the customizer to change sidebar variant, collapsible mode, and position. Connect to your app&apos;s sidebar state to see changes.
          </p>
          <div className="text-xs text-muted-foreground">
            Theme, radius, and mode changes apply globally and are reflected in the preview.
          </div>
        </div>
      </div>
    </div>
  )
}
