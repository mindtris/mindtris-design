/**
 * Shadow utilities
 * Connects shadow component variables to shadow tokens dynamically
 */

/**
 * Build shadow value from component variables
 */
export function buildShadowValue(
  color: string = 'hsl(0 0% 0%)',
  opacity: string = '0.1',
  blur: string = '3px',
  spread: string = '0px',
  x: string = '0px',
  y: string = '1px'
): string {
  // Parse opacity
  const opacityNum = parseFloat(opacity) || 0.1
  const opacityValue = Math.max(0, Math.min(1, opacityNum))

  // Convert color to rgba if needed
  let shadowColor = color
  if (color.startsWith('hsl(')) {
    // Convert HSL to RGBA
    const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
    if (hslMatch) {
      const h = parseInt(hslMatch[1], 10)
      const s = parseInt(hslMatch[2], 10) / 100
      const l = parseInt(hslMatch[3], 10) / 100
      
      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
      const m = l - c / 2
      
      let r = 0, g = 0, b = 0
      if (h >= 0 && h < 60) {
        r = c; g = x; b = 0
      } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0
      } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x
      } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c
      } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c
      } else {
        r = c; g = 0; b = x
      }
      
      r = Math.round((r + m) * 255)
      g = Math.round((g + m) * 255)
      b = Math.round((b + m) * 255)
      
      shadowColor = `rgba(${r}, ${g}, ${b}, ${opacityValue})`
    } else {
      shadowColor = `rgba(0, 0, 0, ${opacityValue})`
    }
  } else if (color.startsWith('oklch(')) {
    // For oklch, use as-is and append opacity
    shadowColor = color.replace(')', ` / ${opacityValue})`)
  } else if (color.startsWith('#')) {
    // Convert hex to rgba
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    shadowColor = `rgba(${r}, ${g}, ${b}, ${opacityValue})`
  } else if (color.startsWith('rgb(')) {
    shadowColor = color.replace('rgb(', 'rgba(').replace(')', `, ${opacityValue})`)
  } else {
    shadowColor = `rgba(0, 0, 0, ${opacityValue})`
  }

  return `${x} ${y} ${blur} ${spread} ${shadowColor}`
}

/**
 * Update shadow tokens from component variables
 */
export function updateShadowTokens(): void {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  const styles = getComputedStyle(root)

  const shadowColor = styles.getPropertyValue('--shadow-color').trim() || 'hsl(0 0% 0%)'
  const shadowOpacity = styles.getPropertyValue('--shadow-opacity').trim() || '0.1'
  const shadowBlur = styles.getPropertyValue('--shadow-blur').trim() || '3px'
  const shadowSpread = styles.getPropertyValue('--shadow-spread').trim() || '0px'
  const shadowX = styles.getPropertyValue('--shadow-x').trim() || '0px'
  const shadowY = styles.getPropertyValue('--shadow-y').trim() || '1px'

  // Build shadow values for different sizes
  const baseShadow = buildShadowValue(shadowColor, shadowOpacity, shadowBlur, shadowSpread, shadowX, shadowY)
  
  // Only update if component variables are set (not empty)
  if (shadowColor && shadowOpacity && shadowBlur) {
    // Update shadow tokens with calculated values
    // These are used by components that reference --shadow-sm, --shadow-md, etc.
    root.style.setProperty('--shadow-sm', baseShadow)
    root.style.setProperty('--shadow-md', baseShadow)
    root.style.setProperty('--shadow-lg', baseShadow)
  }
}
