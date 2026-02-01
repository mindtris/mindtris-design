/**
 * Design system theme constants
 * Radius options and brand colors for theme customizer
 */

import type { RadiusOption, BrandColor, SidebarVariant, SidebarCollapsibleOption, SidebarSideOption, ColorGroup } from './types'

// Radius options
export const radiusOptions: RadiusOption[] = [
  { name: "0", value: "0rem" },
  { name: "0.3", value: "0.3rem" },
  { name: "0.5", value: "0.5rem" },
  { name: "0.75", value: "0.75rem" },
  { name: "1.0", value: "1rem" },
]

// Define brand colors for custom color inputs
export const baseColors: BrandColor[] = [
  { name: "Primary", cssVar: "--primary" },
  { name: "Primary Foreground", cssVar: "--primary-foreground" },
  { name: "Secondary", cssVar: "--secondary" },
  { name: "Secondary Foreground", cssVar: "--secondary-foreground" },
  { name: "Accent", cssVar: "--accent" },
  { name: "Accent Foreground", cssVar: "--accent-foreground" },
  { name: "Muted", cssVar: "--muted" },
  { name: "Muted Foreground", cssVar: "--muted-foreground" },
]

/** Color groups for tweakcn-style sidebar. Vars match Mindtris Mosaic presets in presets.ts. */
export const colorGroups: ColorGroup[] = [
  { title: "Primary Colors", colors: [{ name: "Primary", cssVar: "--primary" }, { name: "Primary Foreground", cssVar: "--primary-foreground" }] },
  { title: "Secondary Colors", colors: [{ name: "Secondary", cssVar: "--secondary" }, { name: "Secondary Foreground", cssVar: "--secondary-foreground" }] },
  { title: "Accent Colors", colors: [{ name: "Accent", cssVar: "--accent" }, { name: "Accent Foreground", cssVar: "--accent-foreground" }] },
  { title: "Base Colors", colors: [{ name: "Background", cssVar: "--background" }, { name: "Foreground", cssVar: "--foreground" }] },
  { title: "Card Colors", colors: [{ name: "Card Background", cssVar: "--card" }, { name: "Card Foreground", cssVar: "--card-foreground" }] },
  { title: "Popover Colors", colors: [{ name: "Popover Background", cssVar: "--popover" }, { name: "Popover Foreground", cssVar: "--popover-foreground" }] },
  { title: "Muted Colors", colors: [{ name: "Muted", cssVar: "--muted" }, { name: "Muted Foreground", cssVar: "--muted-foreground" }] },
  { title: "Destructive Colors", colors: [{ name: "Destructive", cssVar: "--destructive" }, { name: "Destructive Foreground", cssVar: "--destructive-foreground" }] },
  { title: "Border & Input Colors", colors: [{ name: "Border", cssVar: "--border" }, { name: "Input", cssVar: "--input" }, { name: "Ring", cssVar: "--ring" }] },
  { title: "Chart Colors", colors: [{ name: "Chart 1", cssVar: "--chart-1" }, { name: "Chart 2", cssVar: "--chart-2" }, { name: "Chart 3", cssVar: "--chart-3" }, { name: "Chart 4", cssVar: "--chart-4" }, { name: "Chart 5", cssVar: "--chart-5" }] },
  { title: "Sidebar Colors", colors: [{ name: "Sidebar Background", cssVar: "--sidebar" }, { name: "Sidebar Foreground", cssVar: "--sidebar-foreground" }, { name: "Sidebar Primary", cssVar: "--sidebar-primary" }, { name: "Sidebar Primary Foreground", cssVar: "--sidebar-primary-foreground" }, { name: "Sidebar Accent", cssVar: "--sidebar-accent" }, { name: "Sidebar Accent Foreground", cssVar: "--sidebar-accent-foreground" }, { name: "Sidebar Border", cssVar: "--sidebar-border" }, { name: "Sidebar Ring", cssVar: "--sidebar-ring" }] },
]

/** Typography options — font-sans, font-mono in presets.ts. Letter spacing not in preset. */
export const fontSansOptions = [
  { value: 'var(--font-inter, "Inter", ui-sans-serif, system-ui, sans-serif)', label: 'Inter (default)' },
  { value: 'ui-sans-serif, system-ui, sans-serif, "Segoe UI", Roboto, sans-serif', label: 'System UI' },
  { value: '"Helvetica Neue", Helvetica, Arial, sans-serif', label: 'Helvetica' },
] as const

export const fontMonoOptions = [
  { value: 'ui-monospace, SFMono-Regular, Consolas, monospace', label: 'Consolas (default)' },
  { value: '"Fira Code", "Fira Mono", monospace', label: 'Fira Mono' },
] as const

export const fontSerifOptions = [
  { value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif', label: 'Georgia' },
  { value: '"Times New Roman", Times, serif', label: 'Times New Roman' },
] as const

// Sidebar variant options (optional - for layout tab)
export const sidebarVariants: SidebarVariant[] = [
  { name: "Default", value: "sidebar", description: "Standard sidebar layout" },
  { name: "Floating", value: "floating", description: "Floating sidebar with border" },
  { name: "Inset", value: "inset", description: "Inset sidebar with rounded corners" },
]

// Sidebar collapsible options
export const sidebarCollapsibleOptions: SidebarCollapsibleOption[] = [
  { name: "Off Canvas", value: "offcanvas", description: "Slides out of view" },
  { name: "Icon", value: "icon", description: "Collapses to icon only" },
  { name: "None", value: "none", description: "Always visible" },
]

// Sidebar side options
export const sidebarSideOptions: SidebarSideOption[] = [
  { name: "Left", value: "left" },
  { name: "Right", value: "right" },
]
