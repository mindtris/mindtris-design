/**
 * Apply theme preset to document.documentElement
 * Writes preset's light/dark object to CSS variables
 * Includes HSL transformations and shadow updates
 */

import type { ThemePreset, ImportedTheme, CustomThemeArtifactV1 } from './types'
import { applyHSLToThemeStyles } from './utils/hsl-transform'
import { updateShadowTokens } from './utils/shadow-utils'
import { themePresets } from './presets'

/**
 * Reset all CSS variables that could be set by themes
 */
export function resetTheme(): void {
  const root = document.documentElement
  const allPossibleVars = [
    // Standard shadcn/ui variables
    'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
    'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
    'accent', 'accent-foreground', 'destructive', 'destructive-foreground', 'border', 'input',
    'ring', 'radius',
    
    // Chart variables
    'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
    
    // Sidebar variables
    'sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground',
    'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring',
    
    // Font variables
    'font-sans', 'font-serif', 'font-mono',
    
    // Shadow variables
    'shadow-2xs', 'shadow-xs', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl',
    
    // Spacing variables
    'spacing', 'tracking-normal',
    // Shadow (single token or component-level, tweakcn-style)
    'shadow-color', 'shadow-opacity', 'shadow-blur', 'shadow-spread', 'shadow-x', 'shadow-y',
  ]
  
  // Remove all possible CSS variables
  allPossibleVars.forEach(varName => {
    root.style.removeProperty(`--${varName}`)
  })
}

export const THEME_VAR_KEYS: readonly string[] = [
  // Standard shadcn/ui variables
  'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
  'accent', 'accent-foreground', 'destructive', 'destructive-foreground', 'border', 'input',
  'ring', 'radius',

  // Chart variables
  'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',

  // Sidebar variables
  'sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground',
  'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring',

  // Font variables
  'font-sans', 'font-serif', 'font-mono',

  // Shadow variables
  'shadow-2xs', 'shadow-xs', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl',

  // Spacing variables
  'spacing', 'tracking-normal',
  // Shadow (single token or component-level, tweakcn-style)
  'shadow-color', 'shadow-opacity', 'shadow-blur', 'shadow-spread', 'shadow-x', 'shadow-y',
]

function readComputedNumberVar(varName: string, fallback: number): number {
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`).trim()
    const n = parseFloat(raw)
    return Number.isFinite(n) ? n : fallback
  } catch {
    return fallback
  }
}

function readComputedStringVar(varName: string): string {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`).trim()
  } catch {
    return ''
  }
}

const PRESERVE_VARS_ACROSS_THEME_APPLY: readonly string[] = [
  // tweakcn knobs
  'hue-shift',
  'saturation-mult',
  'lightness-mult',
  'spacing',
  'tracking-normal',
  'shadow-color',
  'shadow-opacity',
  'shadow-blur',
  'shadow-spread',
  'shadow-x',
  'shadow-y',
  // radius is treated as a knob in the editor
  'radius',
]

/**
 * Apply a theme preset to the document
 * Includes HSL transformations and shadow updates
 */
export function applyThemePreset(preset: ThemePreset, darkMode: boolean): void {
  try {
    // Preserve tweakcn “Other” knobs across theme re-application.
    const preserved: Record<string, string> = {}
    PRESERVE_VARS_ACROSS_THEME_APPLY.forEach((k) => {
      const v = readComputedStringVar(k)
      if (v) preserved[k] = v
    })

    // Read adjustments BEFORE reset so they persist across theme switches.
    const hueShift = parseFloat(preserved['hue-shift'] ?? '0') || 0
    const saturationMult = parseFloat(preserved['saturation-mult'] ?? '1') || 1
    const lightnessMult = parseFloat(preserved['lightness-mult'] ?? '1') || 1

    resetTheme()
    let styles = darkMode ? preset.styles.dark : preset.styles.light
    const root = document.documentElement

    // Apply HSL adjustments if any are set
    if (hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1) {
      styles = applyHSLToThemeStyles(styles, hueShift, saturationMult, lightnessMult)
    }

    // Apply theme variables
    Object.entries(styles).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--${key}`, value)
      }
    })

    // Restore preserved knob vars last so user adjustments remain intact.
    Object.entries(preserved).forEach(([k, v]) => {
      root.style.setProperty(`--${k}`, v)
    })

    // Update shadow tokens from component variables
    updateShadowTokens()
  } catch (error) {
    console.error('Failed to apply theme preset:', error)
    // Fallback: try to apply without HSL adjustments
    try {
      resetTheme()
      const styles = darkMode ? preset.styles.dark : preset.styles.light
      const root = document.documentElement
      Object.entries(styles).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--${key}`, value)
        }
      })
    } catch (fallbackError) {
      console.error('Fallback theme application also failed:', fallbackError)
    }
  }
}

/**
 * Apply an imported theme to the document
 * Includes HSL transformations and shadow updates
 */
export function applyImportedTheme(themeData: ImportedTheme, darkMode: boolean): void {
  try {
    // Preserve tweakcn “Other” knobs across theme re-application.
    const preserved: Record<string, string> = {}
    PRESERVE_VARS_ACROSS_THEME_APPLY.forEach((k) => {
      const v = readComputedStringVar(k)
      if (v) preserved[k] = v
    })

    // Read adjustments BEFORE reset so they persist across theme switches.
    const hueShift = parseFloat(preserved['hue-shift'] ?? '0') || 0
    const saturationMult = parseFloat(preserved['saturation-mult'] ?? '1') || 1
    const lightnessMult = parseFloat(preserved['lightness-mult'] ?? '1') || 1

    resetTheme()
    const root = document.documentElement
    let themeVars = darkMode ? themeData.dark : themeData.light
    
    // Apply HSL adjustments if any are set
    if (hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1) {
      themeVars = applyHSLToThemeStyles(themeVars, hueShift, saturationMult, lightnessMult)
    }
    
    // Apply all variables from the theme
    Object.entries(themeVars).forEach(([variable, value]) => {
      // Remove -- prefix if present
      const varName = variable.startsWith('--') ? variable.slice(2) : variable
      if (value) {
        root.style.setProperty(`--${varName}`, value)
      }
    })

    // Restore preserved knob vars last so user adjustments remain intact.
    Object.entries(preserved).forEach(([k, v]) => {
      root.style.setProperty(`--${k}`, v)
    })

    // Update shadow tokens from component variables
    updateShadowTokens()
  } catch (error) {
    console.error('Failed to apply imported theme:', error)
    // Fallback: try to apply without HSL adjustments
    try {
      resetTheme()
      const root = document.documentElement
      const themeVars = darkMode ? themeData.dark : themeData.light
      Object.entries(themeVars).forEach(([variable, value]) => {
        const varName = variable.startsWith('--') ? variable.slice(2) : variable
        if (value) {
          root.style.setProperty(`--${varName}`, value)
        }
      })
    } catch (fallbackError) {
      console.error('Fallback theme application also failed:', fallbackError)
    }
  }
}

function normalizeVarKey(key: string): string {
  return key.trim().replace(/^--/, '')
}

export function applyCustomThemeArtifact(theme: CustomThemeArtifactV1, darkMode: boolean): void {
  try {
    const root = document.documentElement

    const other = theme.overrides?.other ?? {}
    const hueShift = parseFloat(other['hue-shift'] ?? '0') || 0
    const saturationMult = parseFloat(other['saturation-mult'] ?? '1') || 1
    const lightnessMult = parseFloat(other['lightness-mult'] ?? '1') || 1

    const baseVars =
      theme.base.type === 'preset'
        ? (themePresets[theme.base.value]?.styles ?? themePresets.default.styles)
        : theme.base.theme

    let styles = darkMode ? baseVars.dark : baseVars.light

    // Apply HSL adjustments first (tweakcn behavior), then per-mode overrides win.
    if (hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1) {
      styles = applyHSLToThemeStyles(styles, hueShift, saturationMult, lightnessMult)
    }

    const modeOverrides = darkMode ? theme.overrides?.dark ?? {} : theme.overrides?.light ?? {}
    const merged: Record<string, string> = { ...styles, ...modeOverrides }

    resetTheme()

    // Apply mode-agnostic overrides first (so shadow token build can see them).
    Object.entries(other).forEach(([k, v]) => {
      const key = normalizeVarKey(k)
      if (v) root.style.setProperty(`--${key}`, v)
    })

    // Apply resolved theme vars.
    Object.entries(merged).forEach(([k, v]) => {
      const key = normalizeVarKey(k)
      if (v) root.style.setProperty(`--${key}`, v)
    })

    updateShadowTokens()
  } catch (error) {
    console.error('Failed to apply custom theme artifact:', error)
  }
}

/**
 * Apply radius value
 */
export function applyRadius(radius: string): void {
  document.documentElement.style.setProperty('--radius', radius)
}

/**
 * Single entry point for any theme CSS variable (colors, typography, radius, HSL, spacing, shadow).
 * Use this from all customizer panels so one component controls the design tokens.
 * Includes validation and shadow updates.
 */
export function handleColorChange(cssVar: string, value: string): void {
  try {
    const varName = cssVar.startsWith('--') ? cssVar : `--${cssVar}`
    document.documentElement.style.setProperty(varName, value)

    // If HSL adjustments changed, reapply theme with adjustments
    if (cssVar === '--hue-shift' || cssVar === '--saturation-mult' || cssVar === '--lightness-mult') {
      // Trigger shadow update
      updateShadowTokens()
      // Note: Full theme reapplication with HSL would require storing current theme
      // This is handled at theme application time
    }

    // If shadow component variables changed, update shadow tokens
    if (cssVar.startsWith('--shadow-') && (cssVar.includes('color') || cssVar.includes('opacity') || cssVar.includes('blur') || cssVar.includes('spread') || cssVar.includes('x') || cssVar.includes('y'))) {
      updateShadowTokens()
    }
  } catch (error) {
    console.error(`Failed to set CSS variable ${cssVar}:`, error)
  }
}
