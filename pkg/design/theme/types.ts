/**
 * Design system theme types
 * Adapted from reference customizer for built-in themes only
 */

export type ThemeStyleProps = {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  "chart-1": string;
  "chart-2": string;
  "chart-3": string;
  "chart-4": string;
  "chart-5": string;
  // Sidebar semantic tokens (used by sidebar layout/component)
  sidebar?: string;
  "sidebar-foreground"?: string;
  "sidebar-primary"?: string;
  "sidebar-primary-foreground"?: string;
  "sidebar-accent"?: string;
  "sidebar-accent-foreground"?: string;
  "sidebar-border"?: string;
  "sidebar-ring"?: string;
  radius: string;
  "font-sans": string;
  "font-serif"?: string;
  "font-mono": string;
  // Spacing/typography tuning (tweakcn style)
  spacing?: string;
  "tracking-normal"?: string;
  // Shadow system (tweakcn style)
  "shadow-color"?: string;
  "shadow-opacity"?: string;
  "shadow-blur"?: string;
  "shadow-spread"?: string;
  "shadow-x"?: string;
  "shadow-y"?: string;
  "shadow-2xs"?: string;
  "shadow-xs"?: string;
  "shadow-sm"?: string;
  shadow?: string;
  "shadow-md"?: string;
  "shadow-lg"?: string;
  "shadow-xl"?: string;
  "shadow-2xl"?: string;
  // Optional HSL adjust knobs (if used by themes)
  "hue-shift"?: string;
  "saturation-mult"?: string;
  "lightness-mult"?: string;
};

export type ThemeStyles = {
  /**
   * Theme CSS variables, without `--` prefix.
   * Keep this as a simple map so we can support hex, hsl(), oklch(), shadows, spacing, etc.
   */
  light: Record<string, string>;
  dark: Record<string, string>;
};

export type ThemePreset = {
  source?: "SAVED" | "BUILT_IN";
  createdAt?: string;
  label?: string;
  styles: ThemeStyles;
};

export interface ColorTheme {
  name: string;
  value: string;
  preset: ThemePreset;
}

export interface RadiusOption {
  name: string;
  value: string;
}

export interface BrandColor {
  name: string;
  cssVar: string;
}

/** One collapsible section in the color sidebar (e.g. "Primary Colors") */
export interface ColorGroup {
  title: string;
  colors: BrandColor[];
}

export interface ImportedTheme {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export type CustomThemeBase =
  | { type: 'preset'; value: string }
  | { type: 'imported'; theme: ImportedTheme }

export type CustomThemeLayoutOverrides = {
  sidebar?: {
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
    side?: "left" | "right";
  }
}

export type CustomThemeOverrides = {
  /** Per-mode overrides (keys without `--`). Only include deltas vs base. */
  light?: Record<string, string>;
  dark?: Record<string, string>;
  /**
   * Mode-agnostic overrides (keys without `--`).
   * Used for tweakcn-style knobs: hue-shift/saturation-mult/lightness-mult, spacing, tracking, shadow component vars, radius, etc.
   */
  other?: Record<string, string>;
  /** Non-token layout settings (kept separate from CSS vars). */
  layout?: CustomThemeLayoutOverrides;
}

export type CustomThemeArtifactV1 = {
  version: 1;
  name: string;
  base: CustomThemeBase;
  overrides: CustomThemeOverrides;
}

export interface SidebarVariant {
  name: string;
  value: "sidebar" | "floating" | "inset";
  description: string;
}

export interface SidebarCollapsibleOption {
  name: string;
  value: "offcanvas" | "icon" | "none";
  description: string;
}

export interface SidebarSideOption {
  name: string;
  value: "left" | "right";
}
