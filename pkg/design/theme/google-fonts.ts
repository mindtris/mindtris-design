/**
 * Google Fonts integration for design-system.
 * Injects a Google Fonts stylesheet when a font family that exists on Google Fonts is selected.
 * Uses the public CSS API: https://fonts.googleapis.com/css2
 */

const GOOGLE_FONTS_MAP: Record<string, string> = {
  Inter: 'Inter:wght@400;500;600;700&display=swap',
  'Fira Code': 'Fira+Code:wght@400;500;600&display=swap',
  'Fira Mono': 'Fira+Mono:wght@400;500;600&display=swap',
  Roboto: 'Roboto:wght@400;500;700&display=swap',
  'Open Sans': 'Open+Sans:wght@400;600;700&display=swap',
  Lato: 'Lato:wght@400;700&display=swap',
  Oswald: 'Oswald:wght@400;500;600&display=swap',
  Source: 'Source+Sans+3:wght@400;600;700&display=swap',
  'Source Sans 3': 'Source+Sans+3:wght@400;600;700&display=swap',
  Montserrat: 'Montserrat:wght@400;500;600;700&display=swap',
  Poppins: 'Poppins:wght@400;500;600;700&display=swap',
  Nunito: 'Nunito:wght@400;600;700&display=swap',
  'DM Sans': 'DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700&display=swap',
  'Libre Baskerville': 'Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap',
  Merriweather: 'Merriweather:ital,wght@0,400;0,700;1,400&display=swap',
  'Playfair Display': 'Playfair+Display:ital,wght@0,400;0,600;0,700&display=swap',
}

const LINK_ID = 'design-google-fonts'
const LOADING_STATE_KEY = 'design-google-fonts-loading'

function extractFirstQuotedFamily(value: string): string | null {
  const match = value.match(/"([^"]+)"/)
  return match ? match[1] : null
}

function getGoogleFontsSpec(fontFamily: string): string | null {
  const key = Object.keys(GOOGLE_FONTS_MAP).find(
    (k) => k.toLowerCase() === fontFamily.toLowerCase()
  )
  return key ? GOOGLE_FONTS_MAP[key] : null
}

/**
 * Check if a font is loaded
 */
function isFontLoaded(fontFamily: string): boolean {
  if (typeof document === 'undefined') return false
  try {
    return document.fonts.check(`16px "${fontFamily}"`)
  } catch {
    return false
  }
}

/**
 * Wait for font to load with timeout
 */
function waitForFontLoad(fontFamily: string, timeout: number = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isFontLoaded(fontFamily)) {
      resolve(true)
      return
    }

    const startTime = Date.now()
    const checkInterval = setInterval(() => {
      if (isFontLoaded(fontFamily)) {
        clearInterval(checkInterval)
        resolve(true)
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval)
        resolve(false)
      }
    }, 100)
  })
}

/**
 * Ensure a Google Fonts stylesheet is loaded for the given font-family value (e.g. from --font-sans).
 * If the value contains a quoted family name that we support, injects or updates the link.
 * Safe to call on every font change; only one link is kept and updated.
 * Returns a promise that resolves when the font is loaded (or times out).
 */
export function loadGoogleFontsForFontValue(value: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve(false)
      return
    }

    const family = extractFirstQuotedFamily(value)
    if (!family) {
      resolve(false)
      return
    }

    const spec = getGoogleFontsSpec(family)
    if (!spec) {
      resolve(false)
      return
    }

    const href = `https://fonts.googleapis.com/css2?family=${spec}`
    let link = document.getElementById(LINK_ID) as HTMLLinkElement | null
    
    if (!link) {
      link = document.createElement('link')
      link.id = LINK_ID
      link.rel = 'stylesheet'
      link.setAttribute('data-design', 'google-fonts')
      document.head.appendChild(link)
    }

    // If already loading the same font, wait for it
    const loadingState = sessionStorage.getItem(LOADING_STATE_KEY)
    if (loadingState === href && link.href === href) {
      waitForFontLoad(family).then(resolve)
      return
    }

    // Set loading state
    sessionStorage.setItem(LOADING_STATE_KEY, href)

    // Handle load/error
    const handleLoad = () => {
      sessionStorage.removeItem(LOADING_STATE_KEY)
      waitForFontLoad(family).then(resolve)
    }

    const handleError = () => {
      sessionStorage.removeItem(LOADING_STATE_KEY)
      console.warn(`Failed to load Google Font: ${family}`)
      resolve(false)
    }

    link.onload = handleLoad
    link.onerror = handleError

    if (link.href !== href) {
      link.href = href
    } else {
      // Already loaded, just check if font is available
      waitForFontLoad(family).then(resolve)
    }
  })
}
