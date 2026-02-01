"use client"

import React from 'react'
import { X, Check } from 'lucide-react'
import type { ImportedTheme, CustomThemeArtifactV1 } from '../../theme/types'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { validateImportedTheme, validateCustomThemeArtifact } from '../../theme/utils/validation'

function normalizeImportedThemeVars(vars: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  Object.entries(vars).forEach(([key, value]) => {
    const k = key.trim().replace(/^--/, '')
    out[k] = value.trim()
  })
  return out
}

interface ImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Import CSS theme (:root + .dark). */
  onImport?: (theme: ImportedTheme, name: string) => void
  /** Import standardized Custom Theme artifact JSON (theme.json). */
  onImportArtifact?: (theme: CustomThemeArtifactV1) => void
}

export function ImportModal({ open, onOpenChange, onImport, onImportArtifact }: ImportModalProps) {
  const [importText, setImportText] = React.useState("")
  const [themeName, setThemeName] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const raw = importText.trim()
  const isJsonArtifact = raw.startsWith('{')
  const canImport = Boolean(raw) && (isJsonArtifact || Boolean(themeName.trim()))

  const processImport = () => {
    try {
      if (!importText.trim()) {
        setError("Please paste CSS or theme.json content")
        return
      }

      const raw = importText.trim()

      // 1) JSON artifact import (preferred)
      if (raw.startsWith('{')) {
        const parsed = JSON.parse(raw) as unknown
        const validation = validateCustomThemeArtifact(parsed)
        if (!validation.isValid) {
          setError(validation.error || 'Invalid theme.json format')
          return
        }

        if (!onImportArtifact) {
          setError('Theme.json import is not supported in this app')
          return
        }

        const artifact = parsed as CustomThemeArtifactV1
        const nextArtifact: CustomThemeArtifactV1 =
          themeName.trim()
            ? { ...artifact, name: themeName.trim() }
            : artifact

        setError(null)
        onImportArtifact(nextArtifact)
        onOpenChange(false)
        setImportText("")
        setThemeName("")
        return
      }

      // Parse CSS content into light and dark theme variables
      const lightTheme: Record<string, string> = {}
      const darkTheme: Record<string, string> = {}
      
      // Split CSS into sections
      const cssText = importText.replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      
      // Extract :root section (light theme)
      const rootMatch = cssText.match(/:root\s*\{([^}]+)\}/)
      if (rootMatch) {
        const rootContent = rootMatch[1]
        const variableMatches = rootContent.matchAll(/--([^:]+):\s*([^;]+);/g)
        Array.from(variableMatches).forEach((match) => {
          const [, variable, value] = match
          lightTheme[String(variable).trim()] = String(value).trim()
        })
      }
      
      // Extract .dark section (dark theme)
      const darkMatch = cssText.match(/\.dark\s*\{([^}]+)\}/)
      if (darkMatch) {
        const darkContent = darkMatch[1]
        const variableMatches = darkContent.matchAll(/--([^:]+):\s*([^;]+);/g)
        Array.from(variableMatches).forEach((match) => {
          const [, variable, value] = match
          darkTheme[String(variable).trim()] = String(value).trim()
        })
      }
      
      // Validate theme name
      if (!themeName.trim()) {
        setError('Please enter a theme name')
        return
      }

      if (!onImport) {
        setError('CSS theme import is not supported in this app')
        return
      }

      // Store the imported theme
      const importedThemeData = {
        light: normalizeImportedThemeVars(lightTheme),
        dark: normalizeImportedThemeVars(darkTheme),
      }

      // Validate imported theme structure
      const validation = validateImportedTheme(importedThemeData)
      if (!validation.isValid) {
        setError(validation.error || 'Invalid theme format')
        return
      }

      setError(null)
      onImport(importedThemeData, themeName.trim())
      
      onOpenChange(false)
      setImportText("")
      setThemeName("")
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to import theme')
      console.error("Error importing theme:", error)
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 z-[60]"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] flex flex-col border border-border">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Import Theme</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Paste either a standardized <code className="px-1 py-0.5 bg-muted rounded">theme.json</code> artifact (recommended) or a CSS theme with <code className="px-1 py-0.5 bg-muted rounded">:root</code> and <code className="px-1 py-0.5 bg-muted rounded">.dark</code>.
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 rounded-md hover:bg-muted transition-colors text-lg"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {error && (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Theme name</label>
              <Input
                type="text"
                placeholder="Optional for theme.json, required for CSS"
                value={themeName}
                onChange={(e) => {
                  setThemeName(e.target.value)
                  setError(null)
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Theme content</label>
              <textarea
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground min-h-[300px] max-h-[400px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border/80"
                placeholder={`// theme.json (recommended)
{
  "version": 1,
  "name": "Custom",
  "base": { "type": "preset", "value": "default" },
  "overrides": { "other": { "hue-shift": "60" } }
}

// OR CSS
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #171717;
  /* And more */
}
.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --primary: #e5e5e5;
  /* And more */
}`}
                value={importText}
                onChange={(e) => {
                  setImportText(e.target.value)
                  setError(null)
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border flex justify-end gap-2">
            <Button
              variant="icon"
              size="md"
              onClick={() => onOpenChange(false)}
              aria-label="Cancel"
            >
              <X className="w-5 h-5" />
            </Button>
            <Button
              variant="icon"
              size="md"
              onClick={processImport}
              disabled={!canImport}
              aria-label="Import theme"
            >
              <Check className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
