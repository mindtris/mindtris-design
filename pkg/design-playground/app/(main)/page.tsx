"use client"

import React, { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { GitCompareArrows, Upload, Download } from 'lucide-react'

import {
  Button,
  ColorsPanel,
  Input,
  TabsWithContainer,
  TypographyPanel,
  OtherPanel,
  ImportModal,
  useThemeManager,
  type ImportedTheme,
} from '@mindtris/ui'
import { usePlayground } from '../playground-shell'

type TabId = 'colors' | 'typography' | 'others'

const validTabs: TabId[] = ['colors', 'typography', 'others']

type ComponentNavItem = { id: string; label: string }

const componentNavItems: ComponentNavItem[] = [
  { id: 'accordion', label: 'Accordion' },
  { id: 'alert', label: 'Alert' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'badge', label: 'Badge' },
  { id: 'breadcrumb', label: 'Breadcrumb' },
  { id: 'buttons', label: 'Button' },
  { id: 'cards', label: 'Card' },
  { id: 'dropdowns', label: 'Dropdown' },
  { id: 'form', label: 'Form' },
  { id: 'inputs', label: 'Input' },
  { id: 'pagination', label: 'Pagination' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'tooltip', label: 'Tooltip' },
]

function HomePageContent() {
  const { sidebarConfig, setSidebarConfig } = usePlayground()
  const { isDarkMode: darkMode, applyTheme, saveCustomThemeArtifactFromCurrent, importCustomThemeArtifact, currentThemeValue } =
    useThemeManager()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [componentQuery, setComponentQuery] = React.useState('')
  const selectedTheme = currentThemeValue ?? 'default'
  
  // Get tab from URL or default to 'colors'
  const urlTab = searchParams.get('tab') as TabId | null
  const initialTab = urlTab && validTabs.includes(urlTab) ? urlTab : 'colors'
  
  const [tab, setTab] = React.useState<TabId>(initialTab)
  const [importModalOpen, setImportModalOpen] = React.useState(false)

  // Sync tab state with URL on mount and when URL changes
  React.useEffect(() => {
    const urlTab = searchParams.get('tab') as TabId | null
    if (urlTab && validTabs.includes(urlTab) && urlTab !== tab) {
      setTab(urlTab)
    }
  }, [searchParams])


  // Update URL when tab changes
  const handleTabChange = (id: string) => {
    const newTab = id as TabId
    setTab(newTab)
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', newTab)
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  // Handle CSS theme import: convert into a standardized custom theme artifact (Option C).
  const handleImport = (themeData: ImportedTheme, name: string) => {
    importCustomThemeArtifact({
      version: 1,
      name,
      base: { type: 'imported', theme: themeData },
      overrides: {},
    })
    applyTheme(`custom:${name.toLowerCase().replace(/\s+/g, '-')}`, darkMode)
  }

  const filteredItems = React.useMemo(() => {
    const q = componentQuery.trim().toLowerCase()
    if (!q) return componentNavItems
    return componentNavItems.filter((i) => i.label.toLowerCase().includes(q))
  }, [componentQuery])

  // Flat list (no A/B/C grouping headers)
  const flatItems = filteredItems

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
        {/* Left: Component index */}
        <aside className="rounded-xl border border-border bg-card p-4 sm:sticky sm:top-20">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="text-sm font-semibold text-foreground">Components</div>
            <Button
              size="icon-sm"
              variant="ghost"
              tooltip="Open components page"
              render={<Link href="/components" />}
              aria-label="Open components page"
            >
              <GitCompareArrows className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <Input
            value={componentQuery}
            onChange={(e) => setComponentQuery(e.target.value)}
            placeholder="Search components..."
          />

          <div className="mt-4 max-h-[calc(100dvh-180px)] overflow-y-auto pr-1">
            {flatItems.length === 0 ? (
              <div className="text-sm text-muted-foreground py-2">No matches</div>
            ) : (
              <ul className="space-y-1">
                {flatItems.map((item) => (
                  <li key={item.id}>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                      render={<Link href={`/components?tab=${item.id}`} />}
                    >
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Right: Existing content */}
        <div className="flex flex-col items-start">
          {/* Theme Box */}
          <aside className="rounded-xl border border-border bg-card p-6 h-fit w-full max-w-[900px]">
              {/* Tabs + actions INSIDE the box */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <TabsWithContainer
                  items={[
                    { id: 'colors', label: 'Colors' },
                    { id: 'typography', label: 'Typography' },
                    { id: 'others', label: 'Others' },
                  ]}
                  value={tab}
                  onValueChange={handleTabChange}
                />

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setImportModalOpen(true)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors inline-flex items-center gap-1.5"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      // Export a standardized Custom Theme artifact (Option C).
                      const artifact = saveCustomThemeArtifactFromCurrent('Custom', { sidebar: sidebarConfig }) // overwrites/updates single custom theme
                      if (!artifact) return

                      const blob = new Blob([JSON.stringify(artifact, null, 2)], { type: 'application/json' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = 'theme.json'
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                      URL.revokeObjectURL(url)
                    }}
                    className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors inline-flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Save current edits as a Custom Theme artifact and apply it.
                      const artifact = saveCustomThemeArtifactFromCurrent('Custom', { sidebar: sidebarConfig })
                      if (!artifact) return
                      applyTheme('custom:custom', darkMode)
                    }}
                    className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-4 border-t border-border" />

              {/* Tab Content */}
              <div className="pt-2">
                {tab === 'colors' && <ColorsPanel selectedTheme={selectedTheme} isDarkMode={darkMode} />}
                {tab === 'typography' && <TypographyPanel />}
                {tab === 'others' && (
                  <OtherPanel
                    hideModeSection={true}
                    hideLayoutSection={false}
                    sidebarConfig={sidebarConfig}
                    onSidebarConfigChange={(next) =>
                      setSidebarConfig((prev) => ({
                        variant: next.variant ?? prev.variant,
                        collapsible: next.collapsible ?? prev.collapsible,
                        side: next.side ?? prev.side,
                      }))
                    }
                  />
                )}
              </div>
          </aside>
        </div>
      </div>

      {/* Import Modal */}
      <ImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImport}
        onImportArtifact={(artifact) => {
          importCustomThemeArtifact(artifact)
          // Keep header selection consistent
          applyTheme(`custom:${artifact.name.toLowerCase().replace(/\s+/g, '-')}`, darkMode)
        }}
      />
    </main>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomePageContent />
    </Suspense>
  )
}

