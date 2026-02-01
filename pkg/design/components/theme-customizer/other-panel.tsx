'use client'

import React from 'react'
import { radiusOptions } from '../../theme/constants'
import { useThemeManager } from '../../theme/use-theme-manager'
import { CollapsibleSection } from '../ui/collapsible-section'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LayoutTab } from './layout-tab'
import { cn } from '../../lib/utils'
import {
  validateHSLValue,
  validateSpacingValue,
  validateShadowValue,
  validateRadiusValue
} from '../../theme/utils/validation'

/** Read current CSS var values from document (same single source as Colors/Typography). */
function getComputedOtherValues(): Record<string, string> {
  if (typeof document === 'undefined') return {}
  const root = document.documentElement
  const styles = getComputedStyle(root)
  const get = (name: string) => styles.getPropertyValue(`--${name}`).trim()
  return {
    '--hue-shift': get('hue-shift') || '0',
    '--saturation-mult': get('saturation-mult') || '1',
    '--lightness-mult': get('lightness-mult') || '1',
    '--spacing': get('spacing') || '',
    '--shadow-color': get('shadow-color') || '',
    '--shadow-opacity': get('shadow-opacity') || '',
    '--shadow-blur': get('shadow-blur') || '',
    '--shadow-spread': get('shadow-spread') || '',
    '--shadow-x': get('shadow-x') || '',
    '--shadow-y': get('shadow-y') || '',
  }
}

function getComputedRadius(): string {
  if (typeof document === 'undefined') return ''
  const styles = getComputedStyle(document.documentElement)
  return styles.getPropertyValue('--radius').trim()
}

/** Other tab: matches tweakcn order — Mode, HSL, Radius, Spacing, Shadow (no separators). Optional Layout section (wire sidebarConfig + onSidebarConfigChange to apply; hide with hideLayoutSection). */
interface OtherPanelProps {
  /** Controlled radius value (optional). If omitted, panel reads `--radius` from the active theme. */
  selectedRadius?: string
  /** Controlled radius setter (optional). */
  setSelectedRadius?: (value: string) => void
  onImportClick?: () => void
  /** When true, hide Mode (Light/Dark) controls. Useful when host app owns mode toggle. */
  hideModeSection?: boolean
  /** When true, Layout (Sidebar Variant / Collapsible / Position) is not shown. */
  hideLayoutSection?: boolean
  sidebarConfig?: {
    variant?: 'sidebar' | 'floating' | 'inset'
    collapsible?: 'offcanvas' | 'icon' | 'none'
    side?: 'left' | 'right'
  }
  onSidebarConfigChange?: (config: { variant?: 'sidebar' | 'floating' | 'inset'; collapsible?: 'offcanvas' | 'icon' | 'none'; side?: 'left' | 'right' }) => void
}

export function OtherPanel({
  selectedRadius,
  setSelectedRadius,
  onImportClick,
  hideModeSection = false,
  hideLayoutSection = false,
  sidebarConfig,
  onSidebarConfigChange,
}: OtherPanelProps) {
  const { applyRadius, setTheme, isDarkMode, handleColorChange } = useThemeManager()
  const [hslOpen, setHslOpen] = React.useState(true)
  const [hslPresetsOpen, setHslPresetsOpen] = React.useState(true)
  const [radiusOpen, setRadiusOpen] = React.useState(true)
  const [spacingOpen, setSpacingOpen] = React.useState(true)
  const [shadowOpen, setShadowOpen] = React.useState(true)
  const [values, setValues] = React.useState<Record<string, string>>({})
  const [uncontrolledRadius, setUncontrolledRadius] = React.useState<string>('')
  const effectiveRadius = selectedRadius ?? uncontrolledRadius

  React.useEffect(() => {
    setValues(getComputedOtherValues())
    if (selectedRadius == null) {
      setUncontrolledRadius(getComputedRadius())
    }
  }, [isDarkMode, selectedRadius])

  // Watch theme updates (inline style/class changes) and keep UI in sync.
  React.useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement

    const refresh = () => {
      setValues(getComputedOtherValues())
      if (selectedRadius == null) {
        setUncontrolledRadius(getComputedRadius())
      }
    }

    refresh()

    const obs = new MutationObserver(() => refresh())
    obs.observe(root, { attributes: true, attributeFilter: ['style', 'class'] })
    return () => obs.disconnect()
  }, [selectedRadius])

  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({})

  const handleChange = (cssVar: string, value: string) => {
    // Validate based on variable type
    let validation: { isValid: boolean; error?: string } = { isValid: true }
    
    if (cssVar === '--hue-shift') {
      validation = validateHSLValue(value, 'hue')
    } else if (cssVar === '--saturation-mult') {
      validation = validateHSLValue(value, 'saturation')
    } else if (cssVar === '--lightness-mult') {
      validation = validateHSLValue(value, 'lightness')
    } else if (cssVar === '--spacing') {
      validation = validateSpacingValue(value)
    } else if (cssVar === '--shadow-opacity') {
      validation = validateShadowValue(value, 'opacity')
    } else if (cssVar === '--shadow-blur') {
      validation = validateShadowValue(value, 'blur')
    } else if (cssVar === '--shadow-spread') {
      validation = validateShadowValue(value, 'spread')
    } else if (cssVar === '--shadow-x' || cssVar === '--shadow-y') {
      validation = validateShadowValue(value, 'offset')
    }

    if (validation.isValid) {
      handleColorChange(cssVar, value)
      setValues((prev) => ({ ...prev, [cssVar]: value }))
      setValidationErrors((prev) => {
        const next = { ...prev }
        delete next[cssVar]
        return next
      })
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        [cssVar]: validation.error || 'Invalid value'
      }))
    }
  }

  const handleRadiusSelect = (value: string) => {
    const validation = validateRadiusValue(value)
    if (validation.isValid) {
      if (setSelectedRadius) setSelectedRadius(value)
      else setUncontrolledRadius(value)
      applyRadius(value)
      setValidationErrors((prev) => {
        const next = { ...prev }
        delete next['--radius']
        return next
      })
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        '--radius': validation.error || 'Invalid radius value'
      }))
    }
  }

  const hslPresets = React.useMemo(
    () =>
      [
        { name: 'Default', hue: 0, sat: 1, light: 1 },
        { name: 'Warm', hue: 30, sat: 1.2, light: 1.05 },
        { name: 'Sunset', hue: 60, sat: 1.5, light: 1.1 },
        { name: 'Cool', hue: 220, sat: 1.15, light: 1.05 },
        { name: 'Neon', hue: 120, sat: 1.8, light: 1.05 },
        { name: 'Muted', hue: 0, sat: 0.8, light: 1 },
        { name: 'Contrast+', hue: 0, sat: 1, light: 1.15 },
        { name: 'Contrast-', hue: 0, sat: 1, light: 0.9 },
        { name: 'Mono+', hue: 0, sat: 0.6, light: 1.05 },
        { name: 'Mono-', hue: 0, sat: 0.6, light: 0.95 },
      ] as const,
    [],
  )

  const setHsl = React.useCallback(
    (next: { hue?: number; sat?: number; light?: number }) => {
      const hue = next.hue ?? (parseFloat(values['--hue-shift'] ?? '0') || 0)
      const sat = next.sat ?? (parseFloat(values['--saturation-mult'] ?? '1') || 1)
      const light = next.light ?? (parseFloat(values['--lightness-mult'] ?? '1') || 1)

      handleChange('--hue-shift', String(hue))
      handleChange('--saturation-mult', String(sat))
      handleChange('--lightness-mult', String(light))
    },
    [handleChange, values],
  )

  return (
    <div className="space-y-4 pt-5 pb-2">
      {/* Mode first (like tweakcn top-level controls) — no separator */}
      {!hideModeSection && (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Mode</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setTheme('light')}
              className={cn(!isDarkMode && 'border-primary bg-primary/10 text-primary')}
            >
              Light
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setTheme('dark')}
              className={cn(isDarkMode && 'border-primary bg-primary/10 text-primary')}
            >
              Dark
            </Button>
          </div>
        </div>
      )}

      {/* HSL like tweakcn: label + input + unit suffix (deg, x, x) */}
      <CollapsibleSection title="HSL Adjustments" open={hslOpen} onToggle={() => setHslOpen(!hslOpen)}>
        <div className="pt-2 space-y-4">
          {/* Presets */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setHslPresetsOpen((v) => !v)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              {hslPresetsOpen ? 'Hide presets' : 'Show presets'}
              <span className={cn('transition-transform', hslPresetsOpen ? 'rotate-180' : '')}>^</span>
            </button>
          </div>

          {hslPresetsOpen && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {hslPresets.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setHsl({ hue: p.hue, sat: p.sat, light: p.light })}
                  className="h-10 w-10 rounded-lg border border-border bg-card shadow-none overflow-hidden"
                  aria-label={`HSL preset: ${p.name}`}
                  title={p.name}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      background:
                        `linear-gradient(90deg, hsl(${p.hue} 80% 45%) 0 50%, hsl(${(p.hue + 220) % 360} 80% 55%) 50% 100%)`,
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Sliders */}
          <div className="space-y-5">
            {/* Hue */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium">Hue Shift</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={values['--hue-shift'] ?? '0'}
                    onChange={(e) => handleChange('--hue-shift', e.target.value)}
                    className={cn(
                      'w-20 font-mono text-xs shadow-none',
                      validationErrors['--hue-shift'] && 'border-destructive',
                    )}
                  />
                  <span className="text-xs text-muted-foreground">deg</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={parseFloat(values['--hue-shift'] ?? '0') || 0}
                onChange={(e) => handleChange('--hue-shift', e.target.value)}
                className="w-full h-2 rounded-full bg-muted accent-foreground"
              />
              {validationErrors['--hue-shift'] && <p className="text-xs text-destructive">{validationErrors['--hue-shift']}</p>}
            </div>

            {/* Saturation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium">Saturation Multiplier</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={values['--saturation-mult'] ?? '1'}
                    onChange={(e) => handleChange('--saturation-mult', e.target.value)}
                    className={cn(
                      'w-20 font-mono text-xs shadow-none',
                      validationErrors['--saturation-mult'] && 'border-destructive',
                    )}
                  />
                  <span className="text-xs text-muted-foreground">x</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={3}
                step={0.05}
                value={parseFloat(values['--saturation-mult'] ?? '1') || 1}
                onChange={(e) => handleChange('--saturation-mult', e.target.value)}
                className="w-full h-2 rounded-full bg-muted accent-foreground"
              />
              {validationErrors['--saturation-mult'] && (
                <p className="text-xs text-destructive">{validationErrors['--saturation-mult']}</p>
              )}
            </div>

            {/* Lightness */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium">Lightness Multiplier</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={values['--lightness-mult'] ?? '1'}
                    onChange={(e) => handleChange('--lightness-mult', e.target.value)}
                    className={cn(
                      'w-20 font-mono text-xs shadow-none',
                      validationErrors['--lightness-mult'] && 'border-destructive',
                    )}
                  />
                  <span className="text-xs text-muted-foreground">x</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={3}
                step={0.05}
                value={parseFloat(values['--lightness-mult'] ?? '1') || 1}
                onChange={(e) => handleChange('--lightness-mult', e.target.value)}
                className="w-full h-2 rounded-full bg-muted accent-foreground"
              />
              {validationErrors['--lightness-mult'] && (
                <p className="text-xs text-destructive">{validationErrors['--lightness-mult']}</p>
              )}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Radius */}
      <CollapsibleSection title="Radius" open={radiusOpen} onToggle={() => setRadiusOpen(!radiusOpen)}>
        <div className="pt-2 space-y-2">
          <label className="text-sm font-medium">Corner radius</label>
          <div className="flex flex-wrap gap-2">
            {radiusOptions.map((opt) => (
              <Button
                key={opt.value}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRadiusSelect(opt.value)}
                className={cn(effectiveRadius === opt.value && 'border-primary bg-primary/10 text-primary')}
              >
                {opt.name}
              </Button>
            ))}
          </div>
          {validationErrors['--radius'] && <p className="text-xs text-destructive">{validationErrors['--radius']}</p>}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Spacing" open={spacingOpen} onToggle={() => setSpacingOpen(!spacingOpen)}>
        <div className="pt-2 space-y-1">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Spacing (base scale for layout, rem)</label>
          <Input
            type="text"
            value={values['--spacing'] ?? ''}
            onChange={(e) => handleChange('--spacing', e.target.value)}
            placeholder="rem"
            className={cn(
              "font-mono text-xs",
              validationErrors['--spacing'] && "border-destructive"
            )}
          />
          {validationErrors['--spacing'] && (
            <p className="text-xs text-destructive">{validationErrors['--spacing']}</p>
          )}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Shadow" open={shadowOpen} onToggle={() => setShadowOpen(!shadowOpen)}>
        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Shadow color</label>
            <Input
              type="text"
              value={values['--shadow-color'] ?? ''}
              onChange={(e) => handleChange('--shadow-color', e.target.value)}
              placeholder="—"
              className="font-mono text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Shadow Opacity</label>
            <Input
              type="text"
              value={values['--shadow-opacity'] ?? ''}
              onChange={(e) => handleChange('--shadow-opacity', e.target.value)}
              placeholder="—"
              className="font-mono text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Blur radius</label>
              <Input
                type="text"
                value={values['--shadow-blur'] ?? ''}
                onChange={(e) => handleChange('--shadow-blur', e.target.value)}
                placeholder="px"
                className="font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Spread</label>
              <Input
                type="text"
                value={values['--shadow-spread'] ?? ''}
                onChange={(e) => handleChange('--shadow-spread', e.target.value)}
                placeholder="px"
                className="font-mono text-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Offset X</label>
              <Input
                type="text"
                value={values['--shadow-x'] ?? ''}
                onChange={(e) => handleChange('--shadow-x', e.target.value)}
                placeholder="px"
                className="font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Offset Y</label>
              <Input
                type="text"
                value={values['--shadow-y'] ?? ''}
                onChange={(e) => handleChange('--shadow-y', e.target.value)}
                placeholder="px"
                className="font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Layout: wire sidebarConfig + onSidebarConfigChange to apply; can hide with hideLayoutSection */}
      {!hideLayoutSection && (
        <LayoutTab sidebarConfig={sidebarConfig} onSidebarConfigChange={onSidebarConfigChange} />
      )}
    </div>
  )
}
