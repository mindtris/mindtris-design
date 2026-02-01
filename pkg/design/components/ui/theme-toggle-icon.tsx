"use client"

import { useTheme } from 'next-themes'
import { Moon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { createIcon } from './icon'

export function ThemeToggleIcon() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={theme === 'light'}
        onChange={() => {
          if (theme === 'dark') {
            return setTheme('light')
          }
          return setTheme('dark')
        }}
      />
      <label
        className={cn(
          'flex items-center justify-center cursor-pointer w-8 h-8 rounded-full transition-colors',
          'hover:bg-muted'
        )}
        htmlFor="light-switch"
      >
        {createIcon(Moon, { size: 16, strokeWidth: 2.25, className: 'text-muted-foreground' })}
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  )
}
