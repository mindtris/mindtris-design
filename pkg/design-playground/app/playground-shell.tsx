'use client'

import * as React from 'react'

import {
  SectionHeader,
  colorThemes,
  useThemeManager,
} from '@mindtris/design-system'

type SidebarConfig = {
  variant: 'sidebar' | 'floating' | 'inset'
  collapsible: 'offcanvas' | 'icon' | 'none'
  side: 'left' | 'right'
}

type PlaygroundContextValue = {
  sidebarConfig: SidebarConfig
  setSidebarConfig: React.Dispatch<React.SetStateAction<SidebarConfig>>
}

const PlaygroundContext = React.createContext<PlaygroundContextValue | null>(null)

export function usePlayground() {
  const ctx = React.useContext(PlaygroundContext)
  if (!ctx) throw new Error('usePlayground must be used within PlaygroundShell')
  return ctx
}

export default function PlaygroundShell({ children }: { children: React.ReactNode }) {
  const { applyTheme, isDarkMode, currentThemeValue, customThemeValue, customThemeName, customThemeArtifact } = useThemeManager()

  const [sidebarConfig, setSidebarConfig] = React.useState<SidebarConfig>({
    variant: 'sidebar',
    collapsible: 'none',
    side: 'left',
  })

  // Sync sidebar layout from explicit Custom Theme artifact (no hidden localStorage).
  React.useEffect(() => {
    if (!currentThemeValue?.startsWith('custom:')) return
    const next = customThemeArtifact?.overrides?.layout?.sidebar
    if (!next) return
    setSidebarConfig((prev) => ({
      variant: next.variant ?? prev.variant,
      collapsible: next.collapsible ?? prev.collapsible,
      side: next.side ?? prev.side,
    }))
  }, [currentThemeValue, customThemeArtifact])

  const handleThemeChange = React.useCallback((value: string) => {
    applyTheme(value, isDarkMode)
  }, [applyTheme, isDarkMode])

  const selectedTheme = currentThemeValue ?? 'default'

  const themeOptions = React.useMemo(
    () => [
      ...colorThemes.map((t) => ({ value: t.value, label: t.name })),
      ...(customThemeValue && customThemeName ? [{ value: customThemeValue, label: customThemeName }] : []),
    ],
    [customThemeName, customThemeValue],
  )

  const headerLinks = React.useMemo(
    () => [
      { href: '/', label: 'Theme' },
      {
        href: '/components',
        label: 'Components',
        options: [
          { value: 'buttons', label: 'Buttons' },
          { value: 'inputs', label: 'Inputs' },
          { value: 'dropdowns', label: 'Dropdowns' },
          { value: 'tabs', label: 'Tabs' },
          { value: 'cards', label: 'Cards' },
        ] as const,
      },
      { href: '/blocks', label: 'Blocks' },
      { href: '/charts', label: 'Charts' },
      { href: '/more', label: 'More' },
    ],
    [],
  )

  return (
    <PlaygroundContext.Provider
      value={{
        sidebarConfig,
        setSidebarConfig,
      }}
    >
      <div className="min-h-screen flex flex-col">
        <SectionHeader
          themeOptions={themeOptions}
          selectedTheme={selectedTheme}
          onThemeChange={handleThemeChange}
          links={headerLinks}
        />

        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </PlaygroundContext.Provider>
  )
}
