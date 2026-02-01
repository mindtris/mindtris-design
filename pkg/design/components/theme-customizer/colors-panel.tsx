'use client'

import React from 'react'
import { colorGroups } from '../../theme/constants'
import { useThemeManager } from '../../theme/use-theme-manager'
import { CollapsibleSection } from '../ui/collapsible-section'
import { ColorInput } from './color-input'
import { validateColorValue } from '../../theme/utils/validation'

/** Read current CSS variable values from document (like tweakcn) */
function getComputedColorValues(): Record<string, string> {
  if (typeof document === 'undefined') return {}
  const root = document.documentElement
  const styles = getComputedStyle(root)
  const out: Record<string, string> = {}
  colorGroups.forEach((group) => {
    group.colors.forEach((c) => {
      const varName = c.cssVar.startsWith('--') ? c.cssVar : `--${c.cssVar}`
      const value = styles.getPropertyValue(varName).trim()
      if (value) out[c.cssVar] = value
    })
  })
  return out
}

interface ColorsPanelProps {
  /** When these change (e.g. preset or mode), re-read values from document */
  selectedTheme?: string
  isDarkMode?: boolean
}

export function ColorsPanel({ selectedTheme, isDarkMode }: ColorsPanelProps = {}) {
  const { handleColorChange } = useThemeManager()
  const [colorValues, setColorValues] = React.useState<Record<string, string>>({})
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({})
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {}
    colorGroups.forEach((g) => { o[g.title] = true })
    return o
  })

  const refreshValues = React.useCallback(() => {
    setColorValues(getComputedColorValues())
  }, [])

  React.useEffect(() => {
    refreshValues()
  }, [refreshValues, selectedTheme, isDarkMode])

  const handleChange = React.useCallback(
    (cssVar: string, value: string) => {
      const validation = validateColorValue(value)
      if (validation.isValid) {
        handleColorChange(cssVar, value)
        setColorValues((prev) => ({ ...prev, [cssVar]: value }))
        setValidationErrors((prev) => {
          const next = { ...prev }
          delete next[cssVar]
          return next
        })
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          [cssVar]: validation.error || 'Invalid color value'
        }))
      }
    },
    [handleColorChange]
  )

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <div className="space-y-3 pt-5 pb-2">
      {colorGroups.map((group) => (
        <CollapsibleSection
          key={group.title}
          title={group.title}
          open={openGroups[group.title] !== false}
          onToggle={() => toggleGroup(group.title)}
        >
          {group.colors.map((color) => (
            <div key={color.cssVar} className="space-y-1">
              <ColorInput
                label={color.name}
                cssVar={color.cssVar}
                value={colorValues[color.cssVar] ?? ''}
                onChange={handleChange}
                className={validationErrors[color.cssVar] ? 'border-destructive' : ''}
              />
              {validationErrors[color.cssVar] && (
                <p className="text-xs text-destructive px-1">{validationErrors[color.cssVar]}</p>
              )}
            </div>
          ))}
        </CollapsibleSection>
      ))}
    </div>
  )
}
