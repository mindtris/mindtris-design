"use client"

import React from 'react'
import { useTheme } from 'next-themes'
import { baseColors } from './constants'
import { colorThemes } from './theme-data'
import {
  resetTheme,
  applyThemePreset,
  applyImportedTheme,
  applyCustomThemeArtifact,
  applyRadius,
  handleColorChange as applyColorChange,
} from './apply-theme'
import type { ThemePreset, ImportedTheme, CustomThemeArtifactV1, CustomThemeLayoutOverrides } from './types'
import { getStoredTheme, storeTheme, getStoredCustomTheme, storeCustomTheme } from './utils/persistence'
import { debounce } from './utils/debounce'
import { validateImportedTheme, validateCustomThemeArtifact } from './utils/validation'
import { themePresets } from './presets'
import { applyHSLToThemeStyles } from './utils/hsl-transform'
import { THEME_VAR_KEYS } from './apply-theme'

type LastAppliedTheme =
  | { kind: 'preset'; themeValue: string }
  | { kind: 'imported'; theme: ImportedTheme }
  | { kind: 'custom'; theme: CustomThemeArtifactV1; value: string }
  | null

export function useThemeManager() {
  const { theme, setTheme } = useTheme()
  const [brandColorsValues, setBrandColorsValues] = React.useState<Record<string, string>>({})
  const [currentThemeValue, setCurrentThemeValue] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [lastApplied, setLastApplied] = React.useState<LastAppliedTheme>(null)
  const [customTheme, setCustomTheme] = React.useState<CustomThemeArtifactV1 | null>(null)
  const [customThemeValue, setCustomThemeValue] = React.useState<string | null>(null)

  // Simple, reliable theme detection - just follow the theme provider
  const isDarkMode = React.useMemo(() => {
    if (theme === "dark") return true
    if (theme === "light") return false
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  }, [theme])

  const updateBrandColorsFromTheme = React.useCallback((styles: Record<string, string>) => {
    const newValues: Record<string, string> = {}
    baseColors.forEach(color => {
      const cssVar = color.cssVar.replace('--', '')
      if (styles[cssVar]) {
        newValues[color.cssVar] = styles[cssVar]
      }
    })
    setBrandColorsValues(newValues)
  }, [])

  // Load persisted theme on mount
  React.useEffect(() => {
    try {
      const storedTheme = getStoredTheme()
      const storedCustom = getStoredCustomTheme()
      if (storedCustom) {
        const customValidation = validateCustomThemeArtifact(storedCustom)
        if (customValidation.isValid) {
          const ct = storedCustom as CustomThemeArtifactV1
          setCustomTheme(ct)
          setCustomThemeValue(`custom:${ct.name.toLowerCase().replace(/\s+/g, '-')}`)
        }
      }
      
      if (storedTheme) {
        setCurrentThemeValue(storedTheme)
        // Apply theme if it's valid (preset or custom)
        if (storedTheme.startsWith('custom:') && storedCustom) {
          const customValidation = validateCustomThemeArtifact(storedCustom)
          if (customValidation.isValid) {
            applyCustomThemeArtifact(storedCustom as CustomThemeArtifactV1, isDarkMode)
            setLastApplied({ kind: 'custom', theme: storedCustom as CustomThemeArtifactV1, value: storedTheme })
          }
        } else {
          const themeObj = colorThemes.find(t => t.value === storedTheme)
          if (themeObj) {
            applyThemePreset(themeObj.preset, isDarkMode)
            updateBrandColorsFromTheme(isDarkMode ? themeObj.preset.styles.dark : themeObj.preset.styles.light)
            setLastApplied({ kind: 'preset', themeValue: storedTheme })
          }
        }
      }
    } catch (err) {
      console.warn('Failed to load persisted theme:', err)
      setError('Failed to load saved theme preferences')
    }
  }, [isDarkMode, updateBrandColorsFromTheme])

  // Debounced theme application for rapid changes
  const debouncedApplyTheme = React.useMemo(
    () => debounce((themeValue: string, darkMode: boolean) => {
      try {
        if (themeValue.startsWith('custom:')) {
          if (!customTheme) {
            setError('Custom theme not found')
            return
          }
          applyCustomThemeArtifact(customTheme, darkMode)
          updateBrandColorsFromTheme(darkMode ? customTheme.base.type === 'preset'
            ? (themePresets[customTheme.base.value]?.styles.dark ?? themePresets.default.styles.dark)
            : customTheme.base.theme.dark
            : customTheme.base.type === 'preset'
              ? (themePresets[customTheme.base.value]?.styles.light ?? themePresets.default.styles.light)
              : customTheme.base.theme.light)
          setCurrentThemeValue(themeValue)
          setLastApplied({ kind: 'custom', theme: customTheme, value: themeValue })
          storeTheme(themeValue)
          setError(null)
          return
        }

        const theme = colorThemes.find(t => t.value === themeValue)
        if (!theme) {
          setError(`Theme "${themeValue}" not found`)
          return
        }

        applyThemePreset(theme.preset, darkMode)
        updateBrandColorsFromTheme(darkMode ? theme.preset.styles.dark : theme.preset.styles.light)
        setCurrentThemeValue(themeValue)
        setLastApplied({ kind: 'preset', themeValue })
        storeTheme(themeValue)
        setError(null)
      } catch (err) {
        console.error('Failed to apply theme:', err)
        setError(`Failed to apply theme: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }, 100),
    [customTheme, isDarkMode, updateBrandColorsFromTheme]
  )

  const applyTheme = React.useCallback((themeValue: string, darkMode: boolean) => {
    debouncedApplyTheme(themeValue, darkMode)
  }, [debouncedApplyTheme])

  const applyTweakcnTheme = React.useCallback((themePreset: ThemePreset, darkMode: boolean) => {
    try {
      applyThemePreset(themePreset, darkMode)
      updateBrandColorsFromTheme(darkMode ? themePreset.styles.dark : themePreset.styles.light)
      setError(null)
    } catch (err) {
      console.error('Failed to apply tweakcn theme:', err)
      setError(`Failed to apply theme: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }, [updateBrandColorsFromTheme])

  const applyImportedThemeHandler = React.useCallback((themeData: ImportedTheme, darkMode: boolean) => {
    try {
      // Validate imported theme
      const validation = validateImportedTheme(themeData)
      if (!validation.isValid) {
        setError(validation.error || 'Invalid theme format')
        return
      }

      applyImportedTheme(themeData, darkMode)
      setLastApplied({ kind: 'imported', theme: themeData })
      
      // Update brand colors values for the customizer UI
      const themeVars = darkMode ? themeData.dark : themeData.light
      const newBrandColors: Record<string, string> = {}
      baseColors.forEach(color => {
        const varName = color.cssVar.replace('--', '')
        if (themeVars[varName]) {
          newBrandColors[color.cssVar] = themeVars[varName]
        }
      })
      setBrandColorsValues(newBrandColors)
      setError(null)
    } catch (err) {
      console.error('Failed to apply imported theme:', err)
      setError(`Failed to apply imported theme: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }, [])

  const getComputedVarsForMode = React.useCallback((dark: boolean): Record<string, string> => {
    if (typeof document === 'undefined') return {}
    const root = document.documentElement
    const hadDark = root.classList.contains('dark')
    try {
      if (dark) root.classList.add('dark')
      else root.classList.remove('dark')
      const styles = getComputedStyle(root)
      const out: Record<string, string> = {}
      THEME_VAR_KEYS.forEach((k) => {
        const v = styles.getPropertyValue(`--${k}`).trim()
        if (v) out[k] = v
      })
      // Also capture tweakcn knobs
      ;['hue-shift', 'saturation-mult', 'lightness-mult'].forEach((k) => {
        const v = styles.getPropertyValue(`--${k}`).trim()
        if (v) out[k] = v
      })
      return out
    } finally {
      if (hadDark) root.classList.add('dark')
      else root.classList.remove('dark')
    }
  }, [])

  const saveCustomThemeArtifactFromCurrent = React.useCallback((name = 'Custom', layout?: CustomThemeLayoutOverrides): CustomThemeArtifactV1 | null => {
    if (typeof document === 'undefined') return null
    if (!lastApplied) return null

    const otherKeys = new Set([
      'hue-shift', 'saturation-mult', 'lightness-mult',
      'spacing', 'tracking-normal',
      'shadow-color', 'shadow-opacity', 'shadow-blur', 'shadow-spread', 'shadow-x', 'shadow-y',
      'radius',
    ])

    const computedLight = getComputedVarsForMode(false)
    const computedDark = getComputedVarsForMode(true)

    const other: Record<string, string> = {}
    otherKeys.forEach((k) => {
      const v = computedLight[k] ?? computedDark[k]
      if (v) other[k] = v
    })

    const hueShift = parseFloat(other['hue-shift'] ?? '0') || 0
    const saturationMult = parseFloat(other['saturation-mult'] ?? '1') || 1
    const lightnessMult = parseFloat(other['lightness-mult'] ?? '1') || 1

    const resolveBaseVars = (): { light: Record<string, string>; dark: Record<string, string>; base: CustomThemeArtifactV1['base'] } => {
      if (lastApplied.kind === 'preset') {
        const preset = themePresets[lastApplied.themeValue] ?? themePresets.default
        return { light: preset.styles.light, dark: preset.styles.dark, base: { type: 'preset', value: lastApplied.themeValue } }
      }
      if (lastApplied.kind === 'imported') {
        return { light: lastApplied.theme.light, dark: lastApplied.theme.dark, base: { type: 'imported', theme: lastApplied.theme } }
      }
      if (lastApplied.kind === 'custom') {
        // If saving on top of custom, keep its base.
        const baseVars =
          lastApplied.theme.base.type === 'preset'
            ? (themePresets[lastApplied.theme.base.value]?.styles ?? themePresets.default.styles)
            : lastApplied.theme.base.theme
        return { light: baseVars.light, dark: baseVars.dark, base: lastApplied.theme.base }
      }
      return { light: themePresets.default.styles.light, dark: themePresets.default.styles.dark, base: { type: 'preset', value: 'default' } }
    }

    const { light: baseLight, dark: baseDark, base } = resolveBaseVars()

    const baseLightAfterHsl =
      hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1
        ? applyHSLToThemeStyles(baseLight, hueShift, saturationMult, lightnessMult)
        : baseLight
    const baseDarkAfterHsl =
      hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1
        ? applyHSLToThemeStyles(baseDark, hueShift, saturationMult, lightnessMult)
        : baseDark

    const diff = (computed: Record<string, string>, baseVars: Record<string, string>): Record<string, string> => {
      const out: Record<string, string> = {}
      for (const k of Object.keys(baseVars)) {
        if (otherKeys.has(k)) continue
        const cv = computed[k]
        const bv = baseVars[k]
        if (cv && bv && cv !== bv) out[k] = cv
      }
      return out
    }

    const overridesLight = diff(computedLight, baseLightAfterHsl)
    const overridesDark = diff(computedDark, baseDarkAfterHsl)

    const artifact: CustomThemeArtifactV1 = {
      version: 1,
      name,
      base,
      overrides: {
        other,
        light: Object.keys(overridesLight).length ? overridesLight : undefined,
        dark: Object.keys(overridesDark).length ? overridesDark : undefined,
        layout,
      },
    }

    storeCustomTheme(artifact)
    setCustomTheme(artifact)
    setCustomThemeValue(`custom:${name.toLowerCase().replace(/\s+/g, '-')}`)
    return artifact
  }, [getComputedVarsForMode, lastApplied])

  const importCustomThemeArtifact = React.useCallback((theme: CustomThemeArtifactV1) => {
    try {
      const validation = validateCustomThemeArtifact(theme)
      if (!validation.isValid) {
        setError(validation.error || 'Invalid custom theme format')
        return
      }

      const value = `custom:${theme.name.toLowerCase().replace(/\s+/g, '-')}`
      storeCustomTheme(theme)
      setCustomTheme(theme)
      setCustomThemeValue(value)
      setCurrentThemeValue(value)
      setLastApplied({ kind: 'custom', theme, value })
      storeTheme(value)

      applyCustomThemeArtifact(theme, isDarkMode)
      setError(null)
    } catch (err) {
      console.error('Failed to import custom theme artifact:', err)
      setError(`Failed to import custom theme: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }, [isDarkMode])

  // Debounced color change handler
  const debouncedColorChange = React.useMemo(
    () => debounce((cssVar: string, value: string) => {
      try {
        applyColorChange(cssVar, value)
        // Update brand colors if this is a brand color
        const brandColor = baseColors.find(c => c.cssVar === cssVar)
        if (brandColor) {
          setBrandColorsValues(prev => ({
            ...prev,
            [cssVar]: value
          }))
        }
        // If HSL adjustments changed, re-apply the last-applied theme so colors update live (tweakcn behavior).
        if (
          cssVar === '--hue-shift' ||
          cssVar === '--saturation-mult' ||
          cssVar === '--lightness-mult'
        ) {
          if (lastApplied?.kind === 'preset') {
            const theme = colorThemes.find((t) => t.value === lastApplied.themeValue)
            if (theme) {
              applyThemePreset(theme.preset, isDarkMode)
            }
          } else if (lastApplied?.kind === 'imported') {
            applyImportedTheme(lastApplied.theme, isDarkMode)
          } else if (lastApplied?.kind === 'custom') {
            applyCustomThemeArtifact(lastApplied.theme, isDarkMode)
          }
        }

        setError(null)
      } catch (err) {
        console.error(`Failed to change color ${cssVar}:`, err)
        setError(`Failed to update color: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }, 150),
    [isDarkMode, lastApplied, updateBrandColorsFromTheme]
  )

  const handleColorChange = React.useCallback((cssVar: string, value: string) => {
    debouncedColorChange(cssVar, value)
  }, [debouncedColorChange])

  const handleRadiusChange = React.useCallback((radius: string) => {
    try {
      applyRadius(radius)
      setError(null)
    } catch (err) {
      console.error('Failed to change radius:', err)
      setError(`Failed to update radius: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }, [])

  return {
    theme,
    setTheme,
    isDarkMode,
    brandColorsValues,
    setBrandColorsValues,
    currentThemeValue,
    customThemeValue,
    customThemeName: customTheme?.name ?? null,
    customThemeArtifact: customTheme,
    error,
    resetTheme,
    applyTheme,
    applyTweakcnTheme,
    applyImportedTheme: applyImportedThemeHandler,
    saveCustomThemeArtifactFromCurrent,
    importCustomThemeArtifact,
    applyRadius: handleRadiusChange,
    handleColorChange,
    updateBrandColorsFromTheme,
    clearError: () => setError(null)
  }
}
