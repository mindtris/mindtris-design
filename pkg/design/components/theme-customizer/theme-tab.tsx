"use client"

import React from 'react'
import { Sun, Moon, Upload, ExternalLink } from 'lucide-react'
import { useThemeManager } from '../../theme/use-theme-manager'
import { colorThemes } from '../../theme/theme-data'
import { radiusOptions } from '../../theme/constants'
import type { ImportedTheme } from '../../theme/types'
import { ColorsPanel } from './colors-panel'
import { Select } from '../ui/select'

export type ThemeTabVariant = 'full' | 'colors-only' | 'others-only'

interface ThemeTabProps {
  selectedTheme: string
  setSelectedTheme: (theme: string) => void
  selectedRadius: string
  setSelectedRadius: (radius: string) => void
  setImportedTheme: (theme: ImportedTheme | null) => void
  onImportClick: () => void
  /** When set, render only colors section (Mindtris UI) or only others (Radius, Mode, Import). */
  variant?: ThemeTabVariant
  /** When true (e.g. preset in sidebar header), don't render preset selector. */
  hidePreset?: boolean
}

export function ThemeTab({
  selectedTheme,
  setSelectedTheme,
  selectedRadius,
  setSelectedRadius,
  setImportedTheme,
  onImportClick,
  variant = 'full',
  hidePreset = false,
}: ThemeTabProps) {
  const {
    isDarkMode,
    setTheme,
    applyTheme,
    applyRadius,
  } = useThemeManager()

  const handleThemeSelect = (themeValue: string) => {
    setSelectedTheme(themeValue)
    setImportedTheme(null)
    applyTheme(themeValue, isDarkMode)
  }

  const handleRadiusSelect = (radius: string) => {
    setSelectedRadius(radius)
    applyRadius(radius)
  }

  const handleLightMode = () => {
    if (isDarkMode === false) return
    setTheme("light")
  }

  const handleDarkMode = () => {
    if (isDarkMode === true) return
    setTheme("dark")
  }

  const showColors = variant === 'full' || variant === 'colors-only'
  const showOthers = variant === 'full' || variant === 'others-only'
  const showPreset = showColors && !hidePreset
  const colorsOnlyInSidebar = showColors && hidePreset && !showPreset && !showOthers

  return (
    <div
      className={
        colorsOnlyInSidebar
          ? 'px-3 pt-2 pb-4'
          : 'p-4 space-y-6'
      }
    >
      {showPreset && (
        <>
          {/* Mindtris UI — preset selector (no "Mindtris Theme Presets" label) */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Mindtris UI</label>
            <Select
              value={selectedTheme}
              onChange={(e) => handleThemeSelect(e.target.value)}
            >
              {colorThemes.map((theme) => (
                <option key={theme.value} value={theme.value}>
                  {theme.name}
                </option>
              ))}
            </Select>
          </div>
          {variant === 'full' && <div className="border-t border-border" />}
        </>
      )}

      {showColors && hidePreset && (
        <ColorsPanel selectedTheme={selectedTheme} isDarkMode={isDarkMode} />
      )}

      {showOthers && (
        <>
          {variant === 'full' && <div className="border-t border-border" />}
          {/* Radius Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Radius</label>
            <div className="grid grid-cols-5 gap-2">
              {radiusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleRadiusSelect(option.value)}
                  className={`
                    relative rounded-md p-3 border transition-colors text-xs font-medium
                    ${selectedRadius === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-border/80"
                    }
                  `}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Mode Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleLightMode}
                className={`
                  flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${!isDarkMode
                    ? "bg-muted text-foreground"
                    : "bg-card border border-border hover:bg-muted text-foreground"
                  }
                `}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                onClick={handleDarkMode}
                className={`
                  flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${isDarkMode
                    ? "bg-muted text-foreground"
                    : "bg-card border border-border hover:bg-muted text-foreground"
                  }
                `}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Import Theme Button */}
          <div className="space-y-3">
            <button
              onClick={onImportClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import Theme
            </button>
          </div>
        </>
      )}

      {variant === 'full' && (
        <>
          <div className="border-t border-border" />
          {/* Tweakcn Info */}
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Advanced Customization</span>
            </div>
            <p className="text-xs text-muted-foreground">
              For advanced theme customization with real-time preview, visit{" "}
              <a
                href="https://tweakcn.com/editor/theme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                tweakcn.com
              </a>
            </p>
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted/70 transition-colors text-sm"
              onClick={() => typeof window !== "undefined" && window.open('https://tweakcn.com/editor/theme', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              Open Tweakcn
            </button>
          </div>
        </>
      )}
    </div>
  )
}
