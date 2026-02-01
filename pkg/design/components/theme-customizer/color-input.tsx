'use client'

import React from 'react'
import { cn } from '../../lib/utils'
import { Input } from '../ui/input'

/** Single color row: swatch + label + input (like tweakcn / form input with prefix) */
interface ColorInputProps {
  label: string
  cssVar: string
  value: string
  onChange: (cssVar: string, value: string) => void
  className?: string
}

export function ColorInput({ label, cssVar, value, onChange, className }: ColorInputProps) {
  const swatchColor = value && value.trim() !== '' ? value : 'transparent'
  const showBorder = !swatchColor || swatchColor === 'transparent'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(cssVar, e.target.value)
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 shrink-0 rounded-md border border-border bg-background overflow-hidden"
          title={value}
        >
          <div
            className="h-full w-full rounded-[calc(var(--radius)-1px)] border border-border"
            style={{
              background: swatchColor,
              borderColor: showBorder ? 'var(--border)' : 'transparent',
            }}
          />
        </div>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          className="flex-1 min-w-0 text-xs font-mono"
          placeholder="e.g. #755ff8"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
