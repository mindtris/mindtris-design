# Mindtris-Design-System
A lightweight, opinionated design system for fast product & marketing teams. **Inspired by Deel** clean, confident, professional SaaS aesthetic with optimistic colors, strong hierarchy, trustworthy feel, and modern simplicity using Mindtris UI and Shadcn systems.

### Philosophy
- **Tokens-first** — everything (colors, typography, spacing, radius, shadows) lives in CSS variables → change the look instantly without touching component code.
- **Modular & instantly adaptable** — swap themes, fonts, or entire styles in seconds by updating `:root` variables or class-based themes.
- **Tailwind-native** + dark mode built-in.
- **Not** a massive library — focused on useful low-level UI + high-value marketing blocks.
- Reuse/adapt mindtris-ui-style layouts easily by overriding tokens to match Deel direction.

### Core Features
- **Tokens-first**: colors, typography, spacing, radius, shadows via CSS variables
- **Fonts**: Token-driven (`--font-sans`, `--font-mono`); app loads fonts (e.g. next/font); base and theme presets set the variable so fonts can switch with the theme.
- **Theme customizer**: Supports [tweakcn.com](https://tweakcn.com/)-like workflow — built-in mindtris-* presets plus **Import**: paste custom CSS (`:root` and `.dark` blocks with variables) to apply themes from tweakcn or any shadcn-compatible source; optional Export.
- Tailwind CSS + dark mode built-in
- Selected reusable pieces:
  - Basic UI: Button, Card, Input, Badge, etc.
  - Marketing blocks: Hero, Pricing tables, Feature grids, Stats, Trust logos, strong CTAs
- Low bundle size — no heavy component bloat

### Theme naming
- Use **mindtris-** prefixed theme names only (e.g. `mindtris-ui`, `mindtris-default`, `mindtris-dark`, `mindtris-minimal`). Do not use other product names (Deel, Vercel, Linear) as theme identifiers.
- **Base theme**: The default is the current **mindtris-ui** look (existing template); we name it e.g. `mindtris-ui`.

### Quick Theme / Style Switching (The Power of Tokens)
Change the **entire visual language** in one place — no component rewrites needed.

Example: Switch between mindtris presets instantly:

```css
/* themes/mindtris-ui.css — base = current mindtris-ui */
:root {
  --primary-hsl: 239 68% 55%;
  --accent-hsl: 48 100% 67%;
  --font-sans: "Inter", system-ui, sans-serif;
  --radius-md: 0.875rem;
  --shadow-card: 0 10px 15px -3px rgba(0,0,0,0.1);
}

/* themes/mindtris-minimal.css */
:root {
  --primary-hsl: 0 0% 9%;
  --font-sans: "Inter", system-ui, sans-serif;
  --radius-md: 0.5rem;
}

```bash
mindtris-ui/
├── tokens/
│   ├── base/                    # Core, non-theme-specific defaults (semantic + primitives)
│   │   ├── colors.css           # Semantic: --primary, --accent, --success, --muted, --bg, etc. (hsl vars preferred for easy theming)
│   │   ├── typography.css       # --font-sans, --text-xs → --text-9xl, weights, line-heights (Inter or Bagoss-like slab fallback)
│   │   ├── spacing.css          # Custom --spacing-* if needed, or rely on Tailwind scale
│   │   ├── radii.css            # --radius-sm, --radius-md (~0.875rem–1rem for confident Deel feel), --radius-lg
│   │   ├── shadows.css          # --shadow-sm, --shadow-md (card elevation), --shadow-lg, --shadow-glass (subtle)
│   │   └── gradients.css        # Optional: --gradient-hero (yellow → blue → purple vibe)
│   ├── themes/                  # All names: mindtris-* (no other product names)
│   │   ├── mindtris-ui.css      # Base = current mindtris-ui (default template look)
│   │   ├── mindtris-dark.css    # Dark mode layer (combine with any theme)
│   │   ├── mindtris-minimal.css # Example alternate preset
│   │   └── mindtris-*.css       # Further presets as needed
│   └── index.css                # @import base/* + default theme (mindtris-ui); :root + .dark
├── components/
│   ├── ui/                      # Atomic/low-level (Shadcn-style, highly reusable)
│   │   ├── Button.tsx           # variants: primary (strong Deel blue-purple), accent (yellow), outline, ghost, etc.
│   │   ├── Card.tsx             # variants: default, elevated, bordered
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Table.tsx            # For data-heavy Deel-like dashboards
│   │   └── ...                  # Avatar, Dialog, Dropdown, etc. as needed
│   └── sections/                # Higher-level, copy-paste marketing/landing blocks (Deel-style: trust-focused, metric-heavy)
│       ├── Hero.tsx             # Bold headline + gradient/illustration bg + strong CTAs
│       ├── PricingGrid.tsx      # Comparison table/cards + popular badge
│       ├── FeaturesGrid.tsx     # Stats/icons + descriptions (global/trust vibe)
│       ├── StatsSection.tsx     # Counters (countries, users, etc.)
│       ├── TrustLogos.tsx       # Client logos grid/carousel
│       ├── CTASection.tsx       # Full-width optimistic CTA with accent color
│       └── ...                  # Testimonials, FAQ, Footer variants
├── lib/
│   └── utils.ts                 # cn() = clsx + tailwind-merge (essential for variants + theme classes)
├── tailwind/
│   └── tailwind.config.ts       # extend: colors (using var(--primary-hsl) etc.), fontFamily, borderRadius, boxShadow, backgroundImage (gradients)
├── public/                      # Optional: shared assets
│   └── illustrations/           # Future: chunky/abstract SVGs inspired by Deel 2025 refresh
└── README.md                    # (your doc we built earlier — installation, theme switching, tokens reference)

```

## Implementation plan

1. **Design system as package** — Build the design system inside `mindtris-template/pkg/design/` (tokens, themes, theme customizer, UI components). See **DESIGN-SYSTEM-NEXT-STEPS.md** for the full phased plan and migration path.
2. **Tokens first** — Create `tokens/base/` and `tokens/themes/`; wire in app CSS so all styling is token-driven.
3. **Theme customizer** — Port the reference customizer (shadcn-dashboard-landing-template) into the design-system package so themes can be viewed and switched live.
4. **Components** — Build UI primitives (Button, Card, Input, Badge, etc.) that use only token-based classes.
5. **Migration** — Integrate into simplifi-frontend via workspace package, npm package, or copy; one API, one standard. See DESIGN-SYSTEM-NEXT-STEPS.md §4 (Phase D).

---

SIMPLIFI FRONTEND UI IMPLEMENTATION PLAN
Production-Ready Plan and Theme Customizer Execution
====================================================

## OBJECTIVE

Deliver a stable `ui/` layer for app code, preserve existing `components/`
as the mindtris-ui base, and implement a theme customizer with live token editing
and presets.

---

## CURRENT REPO STRUCTURE (VERIFIED)

/
├── app/
│ ├── css/
│ │ ├── globals.css
│ │ └── (themes.css to add)
├── components/ # Existing mindtris-ui template components
├── contexts/
├── hooks/
├── lib/
├── public/
├── utils/

---

## TARGET STRUCTURE (PROD-READY)

/
├── app/
│ ├── css/
│ │ ├── globals.css
│ │ └── themes.css
├── components/ # mindtris-ui base (existing)
├── ui/
│ ├── components/
│ │ ├── Button.tsx
│ │ ├── Input.tsx
│ │ ├── Select.tsx
│ │ ├── Modal.tsx
│ │ ├── Badge.tsx
│ │ ├── Toast.tsx
│ │ ├── Tooltip.tsx
│ │ └── ThemeCustomizer.tsx
│ ├── layout/
│ │ ├── AppShell.tsx
│ │ └── PageHeader.tsx
│ ├── theme/
│ │ ├── presets.ts
│ │ └── apply-theme.ts
│ ├── tokens/
│ │ ├── colors.ts
│ │ ├── radius.ts
│ │ └── typography.ts
│ └── index.ts

RULE:

- `app/` imports must come from `ui/*`
- `components/` is internal and only imported by `ui/`

---

## POLICY: COMPONENTS/ LIFECYCLE

- Do not delete `components/` during migration.
- Keep it as the mindtris-ui base until all `app/` imports move to `ui/*`.
- Only remove or archive `components/` after shadcn (or another system)
  fully replaces the wrapper internals and no runtime usage remains.
- If we want to keep history, move it to `mindtris-ui-legacy/` instead of deleting.

---

## WRAPPER REFERENCES (HOW WE BUILD BUTTONS, INPUTS, ETC.)

We do not invent wrappers. We derive them from existing usage and styles:

1. Inventory current button styles in `app/` and `components/`.
2. Use `components/reference/` as the canonical design reference.
3. Identify the top 2-3 button variants already used in production UI.
4. Build `ui/components/Button.tsx` to match those variants exactly.
5. Validate by swapping one route to the wrapper and comparing visuals.

This ensures wrappers are correct and match real usage before expanding.

---

## IMPLEMENTATION PLAN (BASH STYLE)

### STEP 0: BASELINE AND ALIAS CHECK

Goal: ensure clean import path for `ui/*`.

```bash
# verify tsconfig paths (adjust if missing)
cat tsconfig.json
```

If `@/ui/*` alias is missing, add:

- `"@/ui/*": ["ui/*"]`

---

### STEP 1: CREATE UI LAYER FOLDERS

Goal: create the new structure without moving existing components.

```bash
mkdir -p ui/components ui/layout ui/theme ui/tokens
```

---

### STEP 2: WRAP CORE PRIMITIVES

Goal: create wrappers that hide mindtris-ui implementation details.

Create these wrappers (thin, stable APIs):

- `ui/components/Button.tsx`
- `ui/components/Input.tsx`
- `ui/components/Select.tsx`
- `ui/components/Modal.tsx`
- `ui/components/Badge.tsx`
- `ui/components/Toast.tsx`
- `ui/components/Tooltip.tsx`

Wrapper rule:

- The wrapper imports from `components/*`
- App imports only from `ui/*`

---

### STEP 2.5: INTERNAL COMPONENTS PREVIEW PAGE

Goal: visually validate wrappers (buttons, inputs, etc.) and apply themes in one place.

Create an internal route:

- `app/(internal)/ui/page.tsx`

Add sections for (layout similar to a component demo page):

- Buttons (all variants and sizes)
- Inputs (default, error, disabled)
- Badges, Toasts, Tooltips, Modals (basic states)

Use this page to compare `ui/*` wrappers against `components/reference/` and
to apply and preview theme changes during development only.

Access policy:

- Dev-only route, not exposed to end users.
- Gate behind environment checks or internal-only route group.

---

### STEP 3: THEME TOKENS

Goal: centralize theming with CSS variables.

```bash
# create theme tokens file
touch app/css/themes.css
```

Minimum tokens to define:

- `--color-primary`
- `--color-surface`
- `--color-text`
- `--radius-sm`
- `--radius-md`
- `--radius-lg`

Wire `themes.css` in:

- `app/css/globals.css` or `app/layout.tsx`

---

### STEP 4: THEME CUSTOMIZER (LIVE PREVIEW)

Goal: a UI that changes tokens and persists settings.

Create files:

```bash
touch ui/theme/presets.ts
touch ui/theme/apply-theme.ts
touch ui/components/ThemeCustomizer.tsx
```

Behavior:

- `presets.ts` defines named token sets
- `apply-theme.ts` writes CSS variables to `document.documentElement`
- `ThemeCustomizer.tsx` provides controls and persists to localStorage

Place customizer in a safe route:

- `app/(internal)/theme/page.tsx` or similar

---

### STEP 5: ENFORCEMENT

Goal: prevent bypassing the UI layer.

Add ESLint rule:

- Block `components/*` imports in `app/`

Add a short migration note in `CONTRIBUTING.md`

---

### STEP 6: MIGRATION AND CLEANUP

Goal: move app usage to `ui/*` without rework.

Process:

1. Update imports in `app/` to `ui/*`
2. Leave `components/` untouched
3. Only adjust wrappers when you change styles or swap to shadcn

---

## ACCEPTANCE CRITERIA

1. App routes import UI primitives only from `ui/*`
2. Theme tokens change UI without touching component code
3. Theme customizer updates theme live and persists selections
4. ESLint rule prevents direct `components/*` usage in app code

---

## NOTES ON SHADCN MIGRATION

When you switch to shadcn:

- Replace wrapper internals (not app imports)
- Keep the `ui/` API stable
- No duplicate UI usage in app code
