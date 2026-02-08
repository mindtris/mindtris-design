# Design System Next Steps — Modular Package & Easy Migration

This plan turns **mindtris-template** into the single source of truth for a **modular design system** that:
- Uses **tokens-first** + **theme customizer** (reference: shadcn-dashboard-landing-template) so you can view and switch themes live.
- Builds **components that respect themes** (all styles via CSS variables).
- Enables **low-impact migration** into simplifi-frontend (and pkg/dash, etc.) with one consistent design system, one standard API, and one integration approach.

---

## Naming & base theme

- **Theme names**: Use **mindtris-** prefixed names only (e.g. `mindtris-ui`, `mindtris-default`, `mindtris-dark`, `mindtris-minimal`). Do not use other product names (Deel, Vercel, Linear) as theme identifiers to avoid conflicts and branding confusion.
- **Base theme**: The **default/base theme** is the **current mindtris-ui** look — the existing mindtris-template palette, spacing, and feel. We capture it as tokens and name it e.g. `mindtris-ui` or `mindtris-default`; it is the fallback when no other theme is selected.

---

## 1. Target Package Layout (mindtris-template)

Structure the design system as a **self-contained package** inside mindtris-template so it can be:
- **Developed and previewed** in mindtris-template (customizer + internal UI page).
- **Imported** into simplifi-frontend via npm package, pnpm workspace, or copy.

```
mindtris-template/
├── packages/
│   └── design-system/                    # Consumable design system package
│       ├── package.json                 # name: "@mindtris/ui"
│       ├── tokens/
│       │   ├── base/
│       │   │   ├── colors.css           # Semantic: --primary, --accent, --background, etc. (HSL/OKLCH)
│       │   │   ├── typography.css       # --font-sans, --font-mono, text scale
│       │   │   ├── spacing.css          # Optional; or rely on Tailwind scale
│       │   │   ├── radii.css            # --radius-sm, --radius-md, --radius-lg
│       │   │   ├── shadows.css          # --shadow-sm, --shadow-md, --shadow-card
│       │   │   └── gradients.css        # Optional: --gradient-hero, etc.
│       │   ├── themes/                  # All theme names: mindtris-* (no other product names)
│       │   │   ├── mindtris-ui.css       # Base = current mindtris-ui (default template look)
│       │   │   ├── mindtris-dark.css     # Dark mode overrides (combine with any theme)
│       │   │   ├── mindtris-minimal.css  # Example alternate preset
│       │   │   └── mindtris-*.css        # Further presets as needed
│       │   └── index.css                # @import base/* + default theme (mindtris-ui)
│       ├── theme/
│       │   ├── presets.ts               # Named token sets (light/dark) — align with reference customizer
│       │   ├── theme-data.ts            # ColorTheme[] for dropdown (from presets)
│       │   ├── constants.ts             # Radius, sidebar, brand color CSS vars (from reference)
│       │   ├── apply-theme.ts           # Apply preset to document.documentElement
│       │   ├── use-theme-manager.ts     # applyTheme, applyRadius, handleColorChange, etc.
│       │   └── types.ts                 # ThemePreset, ColorTheme, ImportedTheme
│       ├── components/
│       │   ├── ui/                      # Atomic primitives — use token classes only
│       │   │   ├── Button.tsx
│       │   │   ├── Card.tsx
│       │   │   ├── Input.tsx
│       │   │   ├── Badge.tsx
│       │   │   └── ...
│       │   ├── sections/                # Marketing/landing blocks — token-only, copy-paste
│       │   │   ├── Hero.tsx             # Bold headline + gradient/illustration bg + strong CTAs
│       │   │   ├── PricingGrid.tsx      # Comparison table/cards + popular badge
│       │   │   ├── FeaturesGrid.tsx     # Stats/icons + descriptions (global/trust vibe)
│       │   │   ├── StatsSection.tsx     # Counters (countries, users, etc.)
│       │   │   ├── TrustLogos.tsx       # Client logos grid/carousel
│       │   │   ├── CTASection.tsx       # Full-width optimistic CTA with accent color
│       │   │   └── ...                  # Testimonials, FAQ, Footer variants
│       │   └── theme-customizer/        # ThemeCustomizer UI (from reference)
│       │       ├── index.tsx
│       │       ├── theme-tab.tsx
│       │       ├── layout-tab.tsx       # Optional for mindtris; include if needed
│       │       └── import-modal.tsx
│       ├── lib/
│       │   └── utils.ts                 # cn() = clsx + tailwind-merge
│       ├── tailwind.config.preset.js    # Optional: extend colors/fonts from tokens for consumers
│       └── index.ts                     # Re-export components + theme APIs
├── app/                                 # Next app: consumes design-system for preview
│   ├── css/
│   │   └── style.css                    # @import design-system tokens
│   ├── (internal)/
│   │   ├── ui/page.tsx                  # Component preview (Button, Input, etc.)
│   │   └── theme/page.tsx               # Theme customizer route (or embed in layout)
│   └── layout.tsx                       # Wrap with ThemeProvider; optional ThemeCustomizer trigger
├── references/
│   └── shadcn-dashboard-landing-template-main/   # Reference for customizer + presets
└── ...
```

**Why this layout**
- **Single source of truth**: Tokens and themes live in `pkg/design/`; app only imports from there.
- **Reference alignment**: `theme/presets.ts`, `apply-theme`, and `use-theme-manager` mirror the reference customizer so you can port the Sheet-based customizer with minimal changes.
- **Easy migration**: simplifi-frontend can depend on `@mindtris/design-system` (or copy the package) and replace `ui/` with design-system components over time.

---

## 2. Phased Implementation (Next Steps)

### Execute now (in order)

| Step | Action | Done |
|------|--------|------|
| **A1** | Create `pkg/design/` and subfolders: `tokens/base`, `tokens/themes`, `theme`, `components/ui`, `components/sections`, `components/theme-customizer`, `lib`. | ✅ **DONE** |
| **A2** | Add base token files: `colors.css`, `typography.css`, `radii.css`, `shadows.css` in `tokens/base/`. | ✅ **DONE** |
| **A3** | Add theme files: `mindtris-ui.css` (base = mindtris-ui), `mindtris-dark.css` in `tokens/themes/`. | ✅ **DONE** |
| **A4** | Add `tokens/index.css` that imports base + mindtris-ui; include `:root` and `.dark`. | ✅ **DONE** - `:root` and `.dark` blocks included via imports (base/colors.css and themes/mindtris-ui.css) |
| **A5** | Wire tokens in app: import design-system tokens in `app/css/style.css`. | ✅ **DONE** |
| **B1** | Port theme engine: types, constants, presets (mindtris-* only), use-theme-manager, apply-theme. | ✅ **DONE** |
| **B2** | Port ThemeCustomizer UI (index, theme-tab, import-modal) and add internal theme route. | ✅ **DONE** |
| **C1** | Build token-only UI primitives (Button, Card, Input, Badge) in `components/ui/`. | |
| **C2** | Build sections: Hero, PricingGrid, FeaturesGrid, StatsSection, TrustLogos, CTASection (token-only). | |
| **C3** | Add internal UI + sections preview page; then Phase D when ready to integrate simplifi-frontend. | |

---

### Phase A — Tokens & theme layer (do first)

1. **Create `pkg/design/`** in mindtris-template.
2. **Add `tokens/base/`**  
   - `colors.css`: semantic vars (`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--accent`, `--muted`, `--border`, `--ring`, `--radius`, etc.) — use same names as reference so customizer applies cleanly.  
   - `typography.css`, `radii.css`, `shadows.css` (and optionally spacing, gradients).
3. **Add `tokens/themes/`**  
   - `mindtris-ui.css` (base = current mindtris-ui), `mindtris-dark.css`, plus optional presets (`mindtris-minimal.css`, etc.). Use only **mindtris-** prefixed names.
4. **Add `tokens/index.css`**  
   - Imports base + default theme (mindtris-ui); include `:root` and `.dark` rules.
5. **Wire tokens in mindtris-template app**  
   - In `app/css/style.css`: `@import '../pkg/design/tokens/index.css';` (or equivalent path).  
   - Ensure Tailwind uses these vars (e.g. `background: var(--background)` in globals or via Tailwind config).

**Outcome**: Changing theme file or CSS vars changes the whole look; no component code changes.

---

### Font handling

- **Tokens**: Base tokens define `--font-sans`, `--font-mono` (and optionally `--font-serif`). All UI and theme presets use these variables so fonts are theme-switchable.
- **Loading**: The **app** is responsible for loading font files. In Next.js use `next/font` (e.g. Inter, JetBrains Mono) and expose a CSS variable (e.g. `--font-inter`); then in base tokens set e.g. `--font-sans: var(--font-inter), system-ui, sans-serif`. Alternatively load via `<link>` and set `--font-sans: "Inter", system-ui, sans-serif` in tokens.
- **Theme presets**: Presets can override `font-sans` / `font-mono` with the same variable names. Values should be font stacks that are already loaded by the app (e.g. "Inter, sans-serif") or generic (e.g. "system-ui, sans-serif"). If a preset uses "Plus Jakarta Sans", the app must load that font somewhere so it applies.
- **Summary**: Fonts are token-driven and theme-overridable; the app loads the fonts, tokens and presets assign them to `--font-sans` / `--font-mono`.

---

### Phase B — Theme customizer (view themes live)

1. **Port reference customizer into design-system**  
   - From `references/shadcn-dashboard-landing-template-main/.../nextjs-version/src/`:
     - `config/theme-data.ts` → `pkg/design/theme/theme-data.ts`
     - `config/theme-customizer-constants.ts` → `pkg/design/theme/constants.ts`
     - `utils/shadcn-ui-theme-presets.ts` and `utils/tweakcn-theme-presets.ts` → **rename and adapt** into `pkg/design/theme/presets.ts` using **mindtris-** preset names only (e.g. mindtris-ui, mindtris-minimal; do not ship third-party preset names as-is).
     - `hooks/use-theme-manager.ts` → `pkg/design/theme/use-theme-manager.ts`
     - `types/theme-customizer.ts` & `types/theme.ts` → `pkg/design/theme/types.ts`
   - Implement **apply-theme**: same logic as reference — write preset’s `light`/`dark` object to `document.documentElement.style` (`--*`).
2. **Align preset keys with your tokens**  
   - Presets should set the same CSS variable names you use in `tokens/base/colors.css` (and radii, fonts). Include `font-sans`, `font-mono` (and optionally `font-serif`) in presets so theme switching can change fonts.
3. **Port ThemeCustomizer UI**  
   - `components/theme-customizer/*` (index, theme-tab, layout-tab, **import-modal**) into `pkg/design/components/theme-customizer/`.  
   - Dependencies: Sheet, Tabs, Button, Dialog, Textarea. Either add minimal shadcn-like primitives to `design-system/components/ui/` or let the app supply them.
4. **Tweakcn-like import/export**  
   - The reference **ImportModal** already supports a [tweakcn.com](https://tweakcn.com/)-like workflow: users paste custom CSS that contains `:root` and `.dark` blocks with CSS variables (`--primary`, `--background`, etc.). The customizer parses and applies them. Keep this behavior so themes generated or copied from tweakcn (or any shadcn-compatible CSS) can be imported without naming conflicts. Optionally add **Export** to output current theme as CSS for use elsewhere.
5. **Add customizer to mindtris-template app**  
   - Route: e.g. `app/(internal)/theme/page.tsx` or a floating trigger in layout that opens the customizer Sheet.  
   - Wrap app with ThemeProvider/useTheme; use-theme-manager reads light/dark and applies the selected preset (mindtris-* or imported theme).

**Outcome**: You can switch built-in presets (mindtris-*), import custom CSS (e.g. from tweakcn.com), and see all token-driven UI (including fonts) update live.

---

### Phase C — Components that respect themes

1. **Build or wrap UI primitives in `pkg/design/components/ui/`**  
   - Button, Card, Input, Badge, etc. Use only token-based classes (e.g. `bg-primary text-primary-foreground`, `rounded-[var(--radius)]`). No hard-coded colors.
2. **Build sections in `pkg/design/components/sections/`**  
   - Hero (bold headline + gradient/illustration bg + strong CTAs), PricingGrid (comparison table/cards + popular badge), FeaturesGrid (stats/icons + descriptions), StatsSection (counters), TrustLogos (client logos grid/carousel), CTASection (full-width CTA with accent). Same rule: token-only; optional later: Testimonials, FAQ, Footer variants.
3. **Internal UI + sections preview page**  
   - In mindtris-template: `app/(internal)/ui/page.tsx` — sections for Button, Input, Card, Badge (all variants/sizes) and for Hero, PricingGrid, FeaturesGrid, StatsSection, TrustLogos, CTASection. Use this to verify themes and customizer.

**Outcome**: Every component (ui + sections) respects whatever theme is applied via customizer or theme file.

---

### Phase D — Easy migration into simplifi-frontend

Goal: **Low impact** — one design system, one API, one way to integrate.

#### Option 1 — Monorepo / workspace package (recommended long-term)

1. **pnpm workspace**  
   - In a parent repo or in simplifi-frontend’s repo: add `mindtris-template/pkg/design` (or a copy) as a workspace package, e.g. `"@mindtris/design-system": "workspace:*"`.
2. **In simplifi-frontend**  
   - `import { Button, Card } from '@mindtris/design-system'` (or `from '@mindtris/design-system/components/ui'`).  
   - In `app/layout.tsx` or root CSS: import design-system tokens (`@mindtris/design-system/tokens` or similar).  
   - Add ThemeProvider and optional ThemeCustomizer (e.g. on internal route).
3. **Migration**  
   - Replace existing `@/ui/components/Button` usages with design-system Button.  
   - Delete or thin `simplifi-frontend/ui/` once all usage is migrated; keep a single entrypoint (e.g. `@/ui` re-exports from `@mindtris/design-system` if you want to keep the same import path).

#### Option 2 — Publish npm package

1. **Publish** `pkg/design` to npm (private or public) as `@mindtris/design-system`.
2. **In simplifi-frontend**  
   - `pnpm add @mindtris/design-system`.  
   - Same as above: import tokens in CSS, use ThemeProvider, replace `ui/` imports with design-system over time.

#### Option 3 — Copy package (fastest for “quick integration”)

1. **Copy** `pkg/design/` into simplifi-frontend, e.g. `simplifi-frontend/pkg/design/` or `simplifi-frontend/design/`.
2. **Path alias**  
   - e.g. `"@mindtris/design-system": ["./design-system"]` or `"@/design-system": ["./design-system"]`.  
   - Import tokens in root CSS; import components from `@/design-system` or `@mindtris/design-system`.
3. **Migration**  
   - Same as Option 1: switch app imports from `@/ui/components/Button` to design-system Button; optionally keep `@/ui` as re-export for minimal diff.

**Recommendation**: Start with **Option 3** for quick integration and to validate tokens + customizer in simplifi-frontend; move to **Option 1 or 2** when you want a single published/workspace package for multiple apps (simplifi-frontend, pkg/dash, etc.).

---

## 3. Standard API & Integration Checklist

So that every app (simplifi-frontend, pkg/dash, future apps) follows one standard:

- **One design system package**: `@mindtris/design-system` (or local path).
- **One token set**: All theming via CSS variables; no duplicate token definitions in apps.
- **One theme API**: `applyTheme(presetKey, darkMode)`, `applyRadius(radius)`, optional `handleColorChange(cssVar, value)`; ThemeProvider for light/dark.
- **One component API**: Components accept the same props (variant, size, etc.); no app-specific button variants outside the design system.
- **Optional ThemeCustomizer**: Same component in every app (internal or dev-only) for live theme switching and export/import.

**Enforcement (low impact)**  
- ESLint: disallow direct imports from old `components/` in app code (only allow `@mindtris/design-system` or `@/ui` if it re-exports design-system).  
- CONTRIBUTING.md: “Use only design-system components and tokens; do not add new one-off button/input styles.”

---

## 4. Concrete “Next Step” You Can Do Now

**Immediate next step (Phase A + start B):**

1. **Create folder**  
   `mindtris-template/pkg/design/` with subfolders: `tokens/base`, `tokens/themes`, `theme`, `components/ui`, `components/theme-customizer`, `lib`.

2. **Add base tokens**  
   - `tokens/base/colors.css` with semantic vars matching the reference (background, foreground, primary, accent, muted, border, ring, radius).  
   - `tokens/base/radii.css`, `typography.css`, `shadows.css`.  
   - `tokens/themes/deel.css` (and `dark.css`) and `tokens/index.css` that imports them.

3. **Wire in app**  
   - In mindtris-template `app/css/style.css`, import the new tokens so the app uses them.

4. **Port theme engine**  
   - Copy reference `theme-data`, `presets`, `use-theme-manager`, and `apply-theme` into `pkg/design/theme/`, and align preset keys with your token names.

5. **Add internal route**  
   - `app/(internal)/theme/page.tsx` that renders the ThemeCustomizer (or a minimal dropdown of presets + radius that calls `applyTheme` / `applyRadius`).  
   - Then add the full ThemeCustomizer UI (Sheet + tabs) once Sheet/Button are available (from reference or from your ui primitives).

After that, build Button/Card/Input in `pkg/design/components/ui/` using only token classes, and add the internal UI preview page. Then you can copy `pkg/design` into simplifi-frontend, add the path alias and token import, and start replacing `@/ui/components/Button` with the design-system Button for a low-impact, consistent migration path.
