'use client'

import * as React from 'react'
import { Palette, Shapes, LayoutGrid, BarChart3, MoreHorizontal } from 'lucide-react'

import {
  SectionHeader,
  Button,
  colorThemes,
  useThemeManager,
} from '@mindtris/ui'

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
      { href: '/?tab=colors', label: 'Theme', icon: <Palette className="h-4 w-4" aria-hidden /> },
      {
        href: '/components?tab=accordion',
        label: 'Components',
        icon: <LayoutGrid className="h-4 w-4" aria-hidden />,
      },
      { href: '/blocks?tab=cta', label: 'Blocks', icon: <Shapes className="h-4 w-4" aria-hidden /> },
      { href: '/charts?tab=bar', label: 'Charts', icon: <BarChart3 className="h-4 w-4" aria-hidden /> },
      { href: '/more?tab=icons', label: 'More', icon: <MoreHorizontal className="h-4 w-4" aria-hidden /> },
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
          rightSlot={
            <Button
              variant="primary"
              size="sm"
              shape="pill"
              className="h-8 px-4 py-0"
              onClick={() => applyTheme('default', isDarkMode)}
              tooltip="Reset theme to Default"
            >
              Reset theme
            </Button>
          }
        />

        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </PlaygroundContext.Provider>
  )
}
