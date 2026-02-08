# CONTRIBUTING.md
**Design system – Technical guidelines**

## 1. Purpose

This document specifies rules and guidelines for contributing to the **`pkg/design/`** package. The package contains **shared, reusable UI foundations and components** intended for use across multiple applications.

The package **must not** contain business logic or domain-specific implementations.

---

## 2. Scope

This package is limited to:

- Design tokens (colors, spacing, typography, motion)
- Primitive components (Box, Stack, Text)
- Reusable UI components (Button, Input, Dialog, Drawer, Table)
- Generic layout primitives (Page, AppShell)
- Visual states (loading, empty, error)
- Animation and motion primitives
- UI-only hooks (e.g., `useDisclosure`)

All components must be **business-agnostic** and composable.

**Documentation:** Prefer a **minimal Storybook** for component docs and variants (see §9). Avoid building a full in-app demo (e.g. a `/theme`-style page) as the only way to document components.

**Package structure:**
- **`theme/`** — Theme engine only: presets, apply-theme, hooks, types, constants. No React components or JSX.
- **`components/theme-customizer/`** — UI that uses the theme engine (Colors/Typography/Others panels, import modal). Stays under `components/` because it is React UI; `theme/` remains logic-only.

This package **must not** include:

- API calls or data fetching
- Feature-specific components
- Domain terminology (Invoice, User, KYC, Employee, Transaction)
- Application navigation or permission logic
- Workflow logic
- Application-specific copy

---

## 3. Component Inclusion Rule

**2-App Rule**: A component **must only be included** if it can be used by **at least two different applications** without renaming or modification of its meaning.

- Components that reference domain concepts **must not** be added.
- Components that implement visual primitives only are acceptable.

---

## 4. Component Design Principles

1. **Composition over configuration**  
   Components must expose composable APIs and slots instead of large prop surfaces.

2. **Defaults over options**  
   Components must provide sensible defaults and minimize optional variants.

3. **Structure over business assumptions**  
   Components must expose structure, not enforce business-specific decisions.

---

## 5. Styling Rules

- All styling must reference **design tokens**.  
- Hardcoded values for colors, spacing, typography, or motion are prohibited.  
- Animations must use predefined motion tokens.  
- Application-specific CSS overrides are not allowed.
- **Labels and UI copy:** Use sentence case (capitalize only the first letter), e.g. "Full name" not "Full Name". Exceptions: proper nouns, acronyms (e.g. "API key", "URL").

---

## 5a. Alignment with app guidelines (e.g. simplifi-frontend CONTRIBUTING)

When apps consume **pkg/design**, they should still follow their own CONTRIBUTING for API integration, backend-driven logic, and app-specific rules. For **pkg/design** itself and for UI built with it, adopt these from app-level guidelines where they apply:

- **Code style:** No emojis in code, comments, or UI strings. Use plain text.
- **Component usage:** Apps should use pkg/design components first (Button, Input, ErrorBoundary, Skeleton, etc.) before building custom UI; check design-system exports and Storybook.
- **Edge cases:** Always handle loading (use LoadingSpinner/Skeleton), empty (use EmptyState primitive), and error (use ErrorBoundary/ErrorFallback); see §8.
- **Error boundaries:** Use design-system ErrorBoundary for component isolation; do not let one component error crash the app.
- **Heavy components:** Apps may lazy-load heavy design-system components (e.g. ThemeCustomizer) via dynamic import when appropriate.

---

## 5b. File creation policy (keep the package maintainable)

Goal: prevent a “too many files” mess without creating “god files”.

- **Default**: Before creating a new file, check if an existing file already owns the concern (same domain/pattern) and extend it.
- **Create a new file only when**:
  - It introduces a **new reusable unit** (component/hook/utility) that will be referenced from multiple places, or
  - An existing file is becoming **too large or mixed-responsibility** (split by responsibility, not by whim), or
  - It is a **public API surface** that should be independently imported (e.g. `hooks/use-*.ts`, `lib/*-utils.ts`).
- **Avoid**:
  - One-off helpers as new files (keep local until reused).
  - Near-duplicate files (prefer a single shared implementation).
  - Micro-files that only re-export one function.
  - Bundling unrelated components/utilities into a single file just to reduce file count.

---

## 5c. Documentation policy (single file)

Goal: avoid doc sprawl and keep guidance current.

- **Single source**: Keep design-system docs in **`pkg/design/README.md`** (concise, “bash-style” cheat sheet).
- **Do not add** additional `*.md` files under `pkg/design/` for standards/patterns/how-tos.
- **If you need to document something**: add a short section to `README.md` and keep it actionable (commands + rules-of-thumb).

---

## 6. Contribution Process

Before submitting a pull request:

- [ ] Component names contain no business terminology.  
- [ ] Component is reusable across multiple applications.  
- [ ] Component contains no API calls or domain logic.  
- [ ] Component uses design tokens exclusively.  
- [ ] Component is composable using slots or children.  
- [ ] Component is exported from the root `index.ts`.  
- [ ] Component has a Storybook story (when Storybook is set up; see §9).  

All contributions require **review by a frontend engineer** and **approval from the design system owner**.

---

## 6a. Design system audit checklist

Use this checklist as a **final pre-PR audit** for any change to **`pkg/design/`**.

### 1. Scope & content
- [ ] Only design tokens, primitives, reusable UI components, layouts, visual states, and motion hooks exist
- [ ] No API calls, feature-specific components, or app logic
- [ ] No domain-specific terminology (Invoice, User, KYC, etc.)
- [ ] No app navigation, permissions, or workflow logic
- [ ] All components are composable and reusable

### 2. Component inclusion rule
- [ ] Every component can be used in at least two different applications without renaming or modification

### 3. Component design principles
- [ ] Composition is prioritized over large prop configurations
- [ ] Sensible defaults are provided, minimizing optional variants
- [ ] Components expose structure, not business assumptions

### 4. Styling rules
- [ ] All styling uses design tokens
- [ ] No hardcoded colors, spacing, typography, or motion values
- [ ] Animations use shared motion tokens
- [ ] No app-specific CSS overrides

### 5. Contribution process
- [ ] All components exported from the root `index.ts`
- [ ] Component names contain no business terminology
- [ ] No API calls or domain logic in components
- [ ] Components are composable using slots or children

### 6. Governance
- [ ] Review process exists with frontend engineer and design system owner approval
- [ ] Decisions affecting consistency are documented

### 7. Theming
- [ ] Themes (light, solar, forest, etc.) are defined as objects with colors, spacing, typography, and motion tokens
- [ ] Components read styling exclusively from ThemeProvider or context
- [ ] No hardcoded colors or spacing outside the theme
- [ ] ThemeProvider can be used in both Storybook and production apps
- [ ] New themes are validated in Storybook across all components

### 8. Documentation & preview
- [ ] Storybook (or equivalent playground) exists for previewing components
- [ ] Components can be viewed in isolation without touching app code
- [ ] Theme switching works in Storybook
- [ ] Visual regression checks (optional) are in place

---

## 7. Decision Guidelines

- For any uncertainty, contributors must ask:  
  > Is this a UI decision or a business decision?  
  If it is a business decision, it **does not belong** in this package.

- Any design decision that affects consistency or component inclusion must be documented.

---

## 8. Visual states, layouts, and errors (what belongs in pkg/design)

- **Skeleton / loading**
  - **In pkg/design:** Primitives: `LoadingSpinner`, `Skeleton`, `CardSkeleton`, `TableSkeleton`. Token-only, no copy.
  - **In the app:** Where to show them, which data is loading, retry logic.

- **App layouts**
  - **In pkg/design:** Generic layout primitives: `Page`, `AppShell`, sidebar/chrome components that accept slots. No routes or nav items.
  - **In the app:** Route structure, navigation items, permissions, feature flags.

- **Empty states**
  - **In pkg/design:** A generic **EmptyState** (or similar) component: icon slot, title, description, optional action slot. Token-only; no domain copy.
  - **In the app:** Copy (“No invoices yet”), illustration, primary action (e.g. “Create invoice”).

- **Errors (e.g. 404)**
  - **In pkg/design:** Error boundary and error fallback components (`ErrorBoundary`, `ErrorFallback`). Optional generic **NotFound** or **ErrorPage** presentation: title, message, action slot (e.g. “Go home”). Token-only; no app-specific URLs or copy.
  - **In the app:** Routing (which route is 404), copy (“Page not found”), “Go home” link target, logging.

**Rule:** **pkg/design** provides structure and tokens; **apps** provide copy, routing, and behavior. If a component needs domain words (Invoice, Dashboard, User) or app URLs, it stays in the app; pkg/design exports a primitive that accepts `title`, `message`, `action` (or children) so the app can fill them in.

---

## 9. Storybook (minimal approach)

- **Use Storybook** as the primary way to document and preview components. This avoids relying on a full in-app demo (e.g. `/theme` page) for every primitive.
- **Minimal setup:** Point Storybook at the design-system package and its token CSS. One story per component (or per variant). No app routes, no business logic, no feature-specific data.
- **Stories:** Co-locate (e.g. `Button.stories.tsx`) or use a single `stories/` directory; keep stories thin (props, variants, states). Document props and usage in the story description or MDX.
- **Theming:** Import design-system tokens in Storybook so stories render with the same theme as the consuming app. Optionally add a theme switcher (e.g. light/dark) in the toolbar.
- **Scope:** Storybook is for **pkg/design** components only. App-specific screens or flows do not belong in design-system Storybook.

---

## 10. Governance

The design system owner is responsible for:

- Enforcing boundaries between UI primitives and business logic.  
- Maintaining consistency across components.  
- Ensuring adherence to design tokens and styling rules.  
- Approving component inclusion in accordance with the 2-App Rule.

---

This RFC-style document establishes **mandatory rules** to maintain a consistent, reusable, and business-agnostic design system. All contributors are required to follow this document when adding or modifying components.
