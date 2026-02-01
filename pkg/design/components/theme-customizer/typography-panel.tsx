'use client'

import React from 'react'
import { useThemeManager } from '../../theme/use-theme-manager'
import { loadGoogleFontsForFontValue } from '../../theme/google-fonts'
import { fontSansOptions, fontSerifOptions, fontMonoOptions } from '../../theme/constants'
import { CollapsibleSection } from '../ui/collapsible-section'
import { Input } from '../ui/input'
import { ClassicDropdown } from '../ui/dropdown'
import type { DropdownOption } from '../ui/dropdown'

/** Typography: preset sets --font-sans, --font-mono. Letter spacing (--tracking-normal) read/write from document. Google Fonts loaded via design-system when available. */
function getComputedTypography(): Record<string, string> {
  if (typeof document === 'undefined') return {}
  const root = document.documentElement
  const styles = getComputedStyle(root)
  return {
    '--font-sans': styles.getPropertyValue('--font-sans').trim(),
    '--font-serif': styles.getPropertyValue('--font-serif').trim(),
    '--font-mono': styles.getPropertyValue('--font-mono').trim(),
    '--tracking-normal': styles.getPropertyValue('--tracking-normal').trim() || '0',
  }
}

export function TypographyPanel() {
  const { handleColorChange } = useThemeManager()
  const [values, setValues] = React.useState<Record<string, string>>({})
  const [fontOpen, setFontOpen] = React.useState(true)
  const [letterOpen, setLetterOpen] = React.useState(true)
  const [loadingFonts, setLoadingFonts] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    setValues(getComputedTypography())
  }, [])

  const handleChange = async (cssVar: string, value: string) => {
    handleColorChange(cssVar, value)
    setValues((prev) => ({ ...prev, [cssVar]: value }))
    
    if (cssVar === '--font-sans' || cssVar === '--font-serif' || cssVar === '--font-mono') {
      setLoadingFonts((prev) => ({ ...prev, [cssVar]: true }))
      try {
        await loadGoogleFontsForFontValue(value)
      } catch (error) {
        console.warn('Failed to load Google Font:', error)
      } finally {
        setLoadingFonts((prev) => ({ ...prev, [cssVar]: false }))
      }
    }
  }

  return (
    <div className="space-y-4 pt-5 pb-2">
      <p className="text-xs text-muted-foreground px-0">
        Fonts use the theme preset and can load from Google Fonts when selected. Letter spacing uses <code className="text-xs">--tracking-normal</code>.
      </p>

      <CollapsibleSection title="Font Family" open={fontOpen} onToggle={() => setFontOpen((o) => !o)}>
        <div className="space-y-3 pt-2">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-muted-foreground">Sans-serif font</label>
              {loadingFonts['--font-sans'] && (
                <span className="text-xs text-muted-foreground">Loading...</span>
              )}
            </div>
            <ClassicDropdown
              ariaLabel="Sans-Serif Font"
              value={values['--font-sans'] ?? fontSansOptions[0].value}
              options={fontSansOptions.map((o) => ({ value: o.value, label: o.label }))}
              onChange={(value) => handleChange('--font-sans', value)}
              fullWidth
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-muted-foreground">Serif font</label>
              {loadingFonts['--font-serif'] && (
                <span className="text-xs text-muted-foreground">Loading...</span>
              )}
            </div>
            <ClassicDropdown
              ariaLabel="Serif Font"
              value={values['--font-serif'] ?? ''}
              options={[
                { value: '', label: '—' },
                ...fontSerifOptions.map((o) => ({ value: o.value, label: o.label })),
              ]}
              onChange={(value) => handleChange('--font-serif', value)}
              fullWidth
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-muted-foreground">Monospace Font</label>
              {loadingFonts['--font-mono'] && (
                <span className="text-xs text-muted-foreground">Loading...</span>
              )}
            </div>
            <ClassicDropdown
              ariaLabel="Monospace Font"
              value={values['--font-mono'] ?? fontMonoOptions[0].value}
              options={fontMonoOptions.map((o) => ({ value: o.value, label: o.label }))}
              onChange={(value) => handleChange('--font-mono', value)}
              fullWidth
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Letter spacing" open={letterOpen} onToggle={() => setLetterOpen((o) => !o)}>
        <div className="pt-2">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Letter spacing (em) — CSS var: --tracking-normal</label>
          <Input
            type="text"
            value={values['--tracking-normal'] ?? '0'}
            onChange={(e) => handleChange('--tracking-normal', e.target.value)}
            placeholder="0"
            className="font-mono text-xs"
          />
        </div>
      </CollapsibleSection>
    </div>
  )
}
