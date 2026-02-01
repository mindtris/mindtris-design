/**
 * HSL transformation utilities
 * Applies HSL adjustments (hue-shift, saturation-mult, lightness-mult) to colors
 * Similar to tweakcn implementation
 */

/**
 * Convert hex color to HSL
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  // Remove # if present
  const cleanHex = hex.replace('#', '')
  
  // Handle 3-digit hex
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex

  if (fullHex.length !== 6) {
    return null
  }

  const r = parseInt(fullHex.substring(0, 2), 16) / 255
  const g = parseInt(fullHex.substring(2, 4), 16) / 255
  const b = parseInt(fullHex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  }
}

/**
 * Convert HSL to hex
 */
function hslToHex(h: number, s: number, l: number): string {
  h = h % 360
  if (h < 0) h += 360

  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  } else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  } else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  } else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  } else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  } else if (h >= 300 && h < 360) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return `#${[r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')}`
}

/**
 * Parse RGB/RGBA color
 */
function parseRgb(color: string): { r: number; g: number; b: number } | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return null

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10)
  }
}

/**
 * Apply HSL adjustments to a color value
 */
export function applyHSLAdjustments(
  colorValue: string,
  hueShift: number = 0,
  saturationMult: number = 1,
  lightnessMult: number = 1
): string {
  if (!colorValue || colorValue.trim() === '') {
    return colorValue
  }

  const trimmed = colorValue.trim()

  // Skip if already a CSS variable or special value
  if (trimmed.startsWith('var(') || trimmed === 'transparent' || trimmed === 'currentColor') {
    return colorValue
  }

  // Try to parse as hex
  let hsl = hexToHsl(trimmed)
  
  // Try to parse as RGB
  if (!hsl) {
    const rgb = parseRgb(trimmed)
    if (rgb) {
      hsl = hexToHsl(hslToHex(0, 0, 0)) // Convert RGB to hex first
      if (hsl) {
        // Convert RGB to HSL manually
        const r = rgb.r / 255
        const g = rgb.g / 255
        const b = rgb.b / 255
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        let h = 0
        let s = 0
        const l = (max + min) / 2

        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
          switch (max) {
            case r:
              h = ((g - b) / d + (g < b ? 6 : 0)) / 6
              break
            case g:
              h = ((b - r) / d + 2) / 6
              break
            case b:
              h = ((r - g) / d + 4) / 6
              break
          }
        }

        hsl = {
          h: h * 360,
          s: s * 100,
          l: l * 100
        }
      }
    }
  }

  // If we couldn't parse the color, return as-is
  if (!hsl) {
    return colorValue
  }

  // Apply adjustments
  let adjustedH = hsl.h + hueShift
  let adjustedS = Math.max(0, Math.min(100, hsl.s * saturationMult))
  let adjustedL = Math.max(0, Math.min(100, hsl.l * lightnessMult))

  // Convert back to hex
  return hslToHex(adjustedH, adjustedS, adjustedL)
}

/**
 * Apply HSL adjustments to all color values in a theme style object
 */
export function applyHSLToThemeStyles(
  styles: Record<string, string>,
  hueShift: number = 0,
  saturationMult: number = 1,
  lightnessMult: number = 1
): Record<string, string> {
  const adjusted: Record<string, string> = {}

  // Color variables that should be adjusted
  const colorVars = [
    'background', 'foreground', 'card', 'card-foreground',
    'popover', 'popover-foreground', 'primary', 'primary-foreground',
    'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
    'accent', 'accent-foreground', 'destructive', 'destructive-foreground',
    'border', 'input', 'ring',
    'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
    'sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground',
    'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring'
  ]

  for (const [key, value] of Object.entries(styles)) {
    if (colorVars.includes(key) && value) {
      adjusted[key] = applyHSLAdjustments(value, hueShift, saturationMult, lightnessMult)
    } else {
      adjusted[key] = value
    }
  }

  return adjusted
}
