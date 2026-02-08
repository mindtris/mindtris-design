"use client"

import React from 'react'
import { Settings, X } from 'lucide-react'
import { Button } from '../ui'
import { useThemeManager } from '../../theme/use-theme-manager'
import { ThemeTab } from './theme-tab'
import { LayoutTab } from './layout-tab'
import { OtherPanel } from './other-panel'
import { ImportModal } from './import-modal'
import type { ImportedTheme } from '../../theme/types'

/** Section when used under Colors / Typography / Others tabs (like tweakcn). No Theme/Layout tabs. */
export type ThemeCustomizerSection = 'colors' | 'typography' | 'others'

interface ThemeCustomizerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** When true, render as inline content (no fixed overlay/backdrop). Use in sidebar layout. */
  inline?: boolean
  /** When true, hide the internal header (Customizer title + Reset). Use when the host provides its own top bar. */
  hideHeader?: boolean
  /** When set (e.g. by theme sidebar), render only this section. Theme/Layout tabs are removed; content lives under Colors, Typography, Others. */
  section?: ThemeCustomizerSection
  /** When true, preset selector is in parent header; Colors section won't show preset (avoid duplicate). */
  presetInHeader?: boolean
  /** Controlled preset (when preset is in parent header). */
  selectedTheme?: string
  setSelectedTheme?: (value: string) => void
  // Optional: Pass sidebar config if you have sidebar state management
  sidebarConfig?: {
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
    side?: "left" | "right";
  };
  onSidebarConfigChange?: (config: {
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
    side?: "left" | "right";
  }) => void;
  /** When true, Import is not shown inside Others tab (e.g. when host provides Import in top bar). */
  hideImportInOthers?: boolean;
  /** When true, Layout (Sidebar Variant / Collapsible / Position) is not shown in Others tab. */
  hideLayoutSection?: boolean;
}

export function ThemeCustomizer({ 
  open, 
  onOpenChange,
  inline = false,
  hideHeader = false,
  section: sectionProp,
  presetInHeader = false,
  selectedTheme: selectedThemeProp,
  setSelectedTheme: setSelectedThemeProp,
  sidebarConfig,
  onSidebarConfigChange,
  hideImportInOthers = false,
  hideLayoutSection = false,
}: ThemeCustomizerProps) {
  const { applyImportedTheme, isDarkMode, resetTheme, applyRadius, setBrandColorsValues, applyTheme } = useThemeManager()

  const [internalTheme, setInternalTheme] = React.useState("mindtris-ui")
  const selectedTheme = selectedThemeProp ?? internalTheme
  const setSelectedTheme = setSelectedThemeProp ?? setInternalTheme
  const [selectedRadius, setSelectedRadius] = React.useState("0.5rem")
  const [importModalOpen, setImportModalOpen] = React.useState(false)
  const [importedTheme, setImportedTheme] = React.useState<ImportedTheme | null>(null)

  const handleReset = () => {
    // Complete reset to application defaults
    setSelectedTheme("mindtris-ui")
    setSelectedRadius("0.5rem")
    setImportedTheme(null)
    setBrandColorsValues({})
    resetTheme()
    applyRadius("0.5rem")
  }

  const handleImport = (themeData: ImportedTheme) => {
    setImportedTheme(themeData)
    setSelectedTheme("")
    applyImportedTheme(themeData, isDarkMode)
  }

  // Re-apply themes when theme mode changes
  React.useEffect(() => {
    if (importedTheme) {
      applyImportedTheme(importedTheme, isDarkMode)
    } else if (selectedTheme) {
      applyTheme(selectedTheme, isDarkMode)
    }
  }, [isDarkMode, importedTheme, selectedTheme, applyImportedTheme, applyTheme])

  // Apply initial theme and radius on mount so preview reflects defaults
  React.useEffect(() => {
    if (importedTheme) {
      applyImportedTheme(importedTheme, isDarkMode)
    } else {
      applyTheme(selectedTheme, isDarkMode)
    }
    applyRadius(selectedRadius)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!open && !inline) return null

  const content = (
    <div
      className={
        inline
          ? 'flex flex-col h-full'
          : 'fixed inset-y-0 right-0 z-50 w-96 bg-card text-card-foreground border-l border-border shadow-lg flex flex-col'
      }
    >
      {/* Header (hidden when hideHeader or when host provides its own) */}
      {!hideHeader && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Customizer</h2>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Reset
              </Button>
              {!inline && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                  className="p-1.5"
                  aria-label="Close"
                  tooltip="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content — no Theme/Layout tabs; section comes from parent (Colors, Typography, Others) */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {sectionProp === 'colors' && (
          <ThemeTab
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            selectedRadius={selectedRadius}
            setSelectedRadius={setSelectedRadius}
            setImportedTheme={setImportedTheme}
            onImportClick={() => setImportModalOpen(true)}
            variant="colors-only"
            hidePreset={presetInHeader}
          />
        )}
        {sectionProp === 'others' && (
          <div className="px-3 pt-2 pb-4">
            <OtherPanel
              selectedRadius={selectedRadius}
              setSelectedRadius={setSelectedRadius}
              onImportClick={hideImportInOthers ? undefined : () => setImportModalOpen(true)}
              hideLayoutSection={hideLayoutSection}
              sidebarConfig={sidebarConfig}
              onSidebarConfigChange={onSidebarConfigChange}
            />
          </div>
        )}
        {!sectionProp && (
          <>
            <ThemeTab
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              selectedRadius={selectedRadius}
              setSelectedRadius={setSelectedRadius}
              setImportedTheme={setImportedTheme}
              onImportClick={() => setImportModalOpen(true)}
              variant="full"
            />
            <div className="border-t border-border" />
            <LayoutTab
              sidebarConfig={sidebarConfig}
              onSidebarConfigChange={onSidebarConfigChange}
            />
          </>
        )}
      </div>
    </div>
  )

  return (
    <>
      {content}
      {!inline && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40"
          onClick={() => onOpenChange(false)}
        />
      )}
      {!hideImportInOthers && (
        <ImportModal
          open={importModalOpen}
          onOpenChange={setImportModalOpen}
          onImport={handleImport}
        />
      )}
    </>
  )
}
