# HDL Design System — Redesign Summary

A comprehensive UI/UX pass that transforms Healthscreen Diagnostic Lab from a
functional CRUD interface into a cohesive, enterprise-grade SaaS product. The
work is **token-driven**: nearly all visual change flows through a single set of
design tokens, the Tailwind theme, and a small layer of shared primitives — so
every page in the app inherits the new look without page-by-page rewrites.

No new dependencies were added. All existing functionality is preserved.

---

## 1. Design Foundation

### Color system (`src/index.css`)
A professional, WCAG-minded palette built on the brand's raspberry-pink primary
and a trustworthy medical slate-blue secondary. Every value is an HSL channel
triplet, so it composes with Tailwind opacity modifiers (`bg-primary/10`).

| Group | Tokens |
|---|---|
| **Surfaces** | `background`, `surface`, `subtle`, `card`, `popover` |
| **Text ramp** | `foreground`, `muted-foreground` (AA on white) |
| **Lines** | `border`, `border-strong`, `input`, `ring` |
| **Brand** | `primary` (+`primary-hover`), `secondary` (+`secondary-hover`), `accent` |
| **Semantic** | `success`, `warning`, `destructive`, `info` — each with `-subtle` (tint background) and `-emphasis` (accessible text) variants |
| **Sidebar** | dedicated `sidebar*` tokens for the admin shell |

- **Full dark-mode token set** is defined (`.dark`) so the system is ready to
  ship dark mode — only a theme toggle needs wiring.
- Semantic statuses now use a **subtle-background + emphasis-text** pairing
  (e.g. `bg-success-subtle text-success-emphasis`) for stronger contrast than
  the previous low-opacity fills.

### Typography (`src/index.css` + `tailwind.config.js`)
- A tuned `fontSize` scale with paired line-heights and negative letter-spacing
  on large sizes for a crisp, modern headline feel; added a `2xs` step.
- Semantic typographic utilities: `.text-display`, `.text-h1/2/3`,
  `.text-subheading`, `.text-body`, `.text-label`, `.text-helper`,
  `.text-caption`, `.text-overline`, `.text-eyebrow`.
- Enabled OpenType features and **tabular figures** for tables/metrics so
  numeric columns align.

### Spacing, radius, elevation
- Radius standardized to `0.625rem` with `sm`→`2xl` steps derived from it.
- A layered, low-contrast **shadow scale** (`xs`→`xl`) exposed as both CSS vars
  and Tailwind `boxShadow` utilities — replaces ad-hoc `shadow-sm/md`.
- Page content is centered with a consistent `max-w-7xl` gutter system in the
  admin shell.

### Global polish
- Refined custom scrollbars (desktop only), accessible text selection color,
  and a `prefers-reduced-motion` guard that neutralizes animations.

---

## 2. Reusable UI Components (`src/components/ui/`)

| Component | What changed |
|---|---|
| **Button** | New `subtle` variant; `xs`/`lg`/`xl` + `icon-sm`/`icon-xs` sizes; built-in **`loading`** state (spinner, `aria-busy`, auto-disable); refined focus ring, hover, and active press. |
| **Input / Textarea** | Surface background, soft hover border, 2px brand focus ring, and an **error state** wired to `aria-[invalid]`. |
| **Select** | Trigger matches inputs; larger radius, `shadow-lg` popover, checked-item weighting. |
| **Card** | `xl` radius; optional **`interactive`** prop (lift + shadow + border on hover); responsive padding; semantic `h3`/`p` title & description. |
| **Badge** | Full semantic variant set: `success`, `warning`, `info`, `destructive`, `muted`, `outline` — using the subtle/emphasis tokens. |
| **Table** | Denser rows, uppercase **sticky headers** with blur, cell-level borders, refined hover & selected states, tabular numerics. |
| **Dialog** | Blurred overlay, `xl` radius + shadow, larger spacing, redesigned close button, consistent footer gap. |
| **Tabs** | Bordered segmented control with elevated active pill. |
| **Skeleton** | Animated **shimmer sweep** instead of a flat pulse. |
| **Form** | Helper text and error messages restyled; error messages get an inline alert icon. |
| **Checkbox / Radio** *(new)* | Accessible, dependency-free controls built on native inputs with styled indicators, labels, and descriptions. |

---

## 3. Shared App Components (`src/components/custom/`)

- **PageHeader** — adds **breadcrumbs** and an eyebrow line; cleaner responsive
  title/description/action layout. Exports a reusable `Breadcrumbs`.
- **DataTable** — now renders **skeleton rows** while loading, a polished
  icon-driven empty state, optional toolbar & footer (pagination) slots,
  column alignment, and **keyboard-navigable rows** (focusable, Enter to open).
- **StatusBadge** — maps domain statuses to semantic badge variants with a
  colored **status dot**.
- **EmptyState** — icon chip, clearer hierarchy, optional action.
- **SearchInput** — clear button, search affordance.
- **StatCard** *(new)* — KPI card with tone-colored icon chip (primary/success/
  warning/info/destructive).
- **ConfirmDialog** — icon treatment, destructive-aware styling, uses the
  Button loading state.
- **MobileBottomNav** — active item rendered as an accent pill.
- **BrandMark** — gradient logo mark with inset ring.

---

## 4. Navigation & Layouts (`src/layouts/`)

- **AdminLayout** — sidebar rebuilt on dedicated sidebar tokens: grouped nav
  with an **active accent rail**, primary-colored active icons, and a proper
  **avatar + dropdown user menu** (replacing the inline sign-out link). Mobile
  top bar and content max-width tuned.
- **PublicLayout** — sticky blurred header, active-pill nav, clearer sign-in /
  CTA hierarchy.
- **CustomerPortalLayout** — avatar identity chip + refined header.

---

## 5. Pages Showcased

- **Dashboard** — `StatCard` KPI grid with tones, skeleton loading throughout,
  and a redesigned "Needs Attention" activity list with hover affordances and
  an encouraging empty state.
- **Login** — semantic, iconographic error/info banners and a button loading
  state.
- **Marketing** — Hero gets a pill eyebrow and a layered radial background;
  Service/Report cards use the new interactive Card with focus rings and group
  hover. Contact/Send-Reports success & error banners normalized to semantic
  tokens.

All other admin/portal pages (Customers, Worklist, Reports, detail pages, etc.)
inherit the redesign automatically because they compose the shared
`PageHeader` / `DataTable` / `Card` / `Badge` / `Button` primitives.

---

## 6. Accessibility & Responsiveness

- Visible 2px focus rings on all interactive elements; keyboard-operable table
  rows; `aria-invalid`-driven error styling; `aria-busy` on loading buttons;
  semantic breadcrumb (`nav` + `aria-current`).
- Contrast: muted text and semantic `-emphasis` tokens chosen to meet WCAG AA on
  their intended backgrounds.
- `prefers-reduced-motion` disables non-essential animation.
- Layouts are mobile-first (bottom nav, stacked headers, responsive paddings and
  type scale).

---

## 7. Notes on Deliverables

- **Before/after screenshots** could not be auto-captured in this environment
  (no headless browser available, and the app runs on mock data only). To view
  the result: `cd hdl-frontend && npm run dev`. Key screens: `/` (marketing),
  `/login`, `/admin` (dashboard), `/admin/customers`, `/admin/worklist`,
  `/portal/reports`.
- Verified: `npm run build` succeeds and `npm run lint` passes with no warnings.

## Files Touched

**Foundation:** `src/index.css`, `tailwind.config.js`
**Primitives:** `button`, `input`, `textarea`, `card`, `badge`, `table`,
`dialog`, `select`, `tabs`, `skeleton`, `form` (+ new `checkbox`, `radio-group`)
**Custom:** `PageHeader`, `DataTable`, `StatusBadge`, `EmptyState`,
`SearchInput`, `ConfirmDialog`, `MobileBottomNav`, `BrandMark` (+ new `StatCard`)
**Layouts:** `AdminLayout`, `PublicLayout`, `CustomerPortalLayout`
**Pages/Features:** `DashboardPage`, `LoginPage`, `Hero`, `ServiceCard`,
`PortalReportCard`, `ContactForm`, `SendReportsWidget`
