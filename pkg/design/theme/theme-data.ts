/**
 * Design system theme data
 * Converts presets to ColorTheme[] for dropdown
 */

import { themePresets } from './presets'
import type { ColorTheme } from './types'

// Theme presets for the dropdown
// Deduplicate by value to prevent duplicate entries
export const colorThemes: ColorTheme[] = Object.entries(themePresets)
  .map(([key, preset]) => ({
    name: preset.label || key,
    value: key,
    preset: preset
  }))
  .filter((theme, index, self) => 
    index === self.findIndex(t => t.value === theme.value)
  )
