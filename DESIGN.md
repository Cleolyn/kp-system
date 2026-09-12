# KP-System Design System (DESIGN.md)

## Overview

KP-System's commerce and civic management surfaces (homepage, case registry, blotter detail, hearing configurator, resolution page) read as a confident hardware and legal-tech merchandiser. The brand voice is photography-first: large, full-bleed product and civic imagery dominates above-the-fold real estate, with white space and tight typographic hierarchy carrying the rest. The system has a recognizable dual-CTA pattern — a black pill-shaped primary on marketing and landing surfaces shifting to a saturated cobalt blue ({colors.primary}) inside the action/resolution flows, paired with an outlined ghost button for secondary navigation.

Optimistic VF / Inter geometric display face anchors the entire system, ranging from a 64px hero display down to a 12px caption. Below 768px the system collapses cleanly: hero stacks, pill nav becomes a drawer/modal, three-up feature grids flatten to a single column, and case detail layouts drop their right-rail summary into a sticky bottom bar.

**Key Characteristics:**
- Stark white canvas ({colors.canvas}) carrying full-bleed photography with `{rounded.xxxl}` (32px) corner softening on showcase tiles
- Two-tier primary button system: general/marketing CTAs use {colors.ink-button} pills; action/resolution CTAs use {colors.primary} cobalt pills inside action panels
- Pill-shaped buttons ({rounded.full}) and `{rounded.xxxl}`/`{rounded.feature}` cards as the dominant geometric signature
- Saturated promotional/statutory banners (yellow {colors.warning}, dark {colors.ink-deep}) used for time-bound legal notice periods
- Photographic feature cards with no card chrome (no heavy border, no dropshadow) — the imagery IS the surface treatment

---

## Colors

### Brand & Accent
- **Cobalt Primary** (`{colors.primary}`: `#0064e0`): The action CTA color. Used on every "Add Case", "Schedule Hearing", "Generate KP Form", "Settle Dispute" button inside the resolution flow and the right-rail panel.
- **Deep Cobalt** (`{colors.primary-deep}`: `#0047ab`): Pressed-state and dark-surface variant of the cobalt primary; also the active link color.
- **Soft Cobalt** (`{colors.primary-soft}`: `rgba(0, 100, 224, 0.12)`): Translucent background tint for informational callouts.
- **KP Accent Blue** (`{colors.fb-blue}`: `#1877f2`): Selected radio/checkbox state and inline form-control activation color.
- **KP Link Blue** (`{colors.meta-link}`: `#0064e0`): Navigation and footer link affordances.
- **Civic Purple** (`{colors.oculus-purple}`: `#7038f8`): Dispute resolution and special arbitration category accent.

### Surface
- **Canvas White** (`{colors.canvas}`: `#ffffff`): Page background and primary card surface.
- **Soft Cloud** (`{colors.surface-soft}`: `#f5f6f8`): Subtle case-thumbnail, badge, and warranty/certificate background; also the search-pill rest state.
- **Hairline Gray** (`{colors.hairline}`: `#e4e6eb`): 1px input border and form-control divider.
- **Hairline Soft** (`{colors.hairline-soft}`: `#f0f2f5`): Quieter divider used on cards, footer separators, and section breaks.

### Text
- **Deep Ink** (`{colors.ink-deep}`: `#0a1317` / `#14161a`): Primary headline and body text on light surfaces.
- **Ink** (`{colors.ink}`: `#1c2b33`): Standard body and secondary headline text.
- **Charcoal** (`{colors.charcoal}`: `#465a65`): Tertiary body text and form-button labels.
- **Slate** (`{colors.slate}`: `#657786`): Section-header copy and supporting microcopy.
- **Steel** (`{colors.steel}`: `#8899a6`): Quieter caption text and footer link hierarchy.
- **Stone** (`{colors.stone}`: `#aab8c2`): Disabled or de-emphasized labels.

### Semantic
- **Success** (`{colors.success}`: `#00875a`): "Settled", "In good standing", "Compliant" affirmations.
- **Attention** (`{colors.attention}`: `#f59e0b`): "Mediation in progress", "Conciliation scheduled".
- **Warning** (`{colors.warning}`: `#ffd700` / `#f59e0b`): Statutory 15-day deadline banners and limited-time notice tags.
- **Critical** (`{colors.critical}`: `#e02424`): Validation errors, "Arbitration", "Court certification pending".
- **Critical Strong** (`{colors.critical-strong}`: `#b91c1c`): Form-input error border and inline error labels.

---

## Typography

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 64px | 600 | 1.16 | -0.02em | Landing hero headline |
| `{typography.display-lg}` | 48px | 600 | 1.17 | -0.02em | Section-opener display |
| `{typography.heading-lg}` | 36px | 600 | 1.28 | -0.01em | Subsection headlines |
| `{typography.heading-md}` | 28px | 300 | 1.21 | 0 | Editorial subheads in lighter weight |
| `{typography.heading-sm}` | 24px | 600 | 1.25 | 0 | Card titles, feature-tile headers |
| `{typography.subtitle-lg}` | 18px | 700 | 1.44 | 0 | Bold callouts, case titles |
| `{typography.subtitle-md}` | 18px | 400 | 1.44 | 0 | Body lead and longer-line subtitles |
| `{typography.body-md}` | 16px | 400 | 1.50 | -0.16px | Primary body text |
| `{typography.body-md-bold}` | 16px | 700 | 1.50 | -0.16px | Body emphasis and links |
| `{typography.body-sm}` | 14px | 400 | 1.43 | -0.14px | Secondary body, helper text |
| `{typography.body-sm-bold}` | 14px | 700 | 1.43 | -0.14px | Pill tab labels, table headers |
| `{typography.caption-bold}` | 12px | 700 | 1.33 | 0 | Badge labels, timestamps |
| `{typography.caption}` | 12px | 400 | 1.33 | 0 | Footer fine print, legal microcopy |
| `{typography.button-md}` | 14px | 700 | 1.43 | -0.14px | Pill button labels |
| `{typography.link-md}` | 16px | 700 | 1.50 | -0.16px | Inline navigation links |

---

## Shapes & Border Radius

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 2px | Inline marks |
| `{rounded.sm}` | 4px | Small tags |
| `{rounded.md}` | 6px | Small thumbnails |
| `{rounded.lg}` | 8px | Form inputs, select dropdowns |
| `{rounded.xl}` | 16px | Standard cards, data tables, accordion items |
| `{rounded.xxl}` | 24px | Secondary action tiles, hearing badges |
| `{rounded.xxxl}` | 32px | Showcase cards, big promo strips, PDP containers |
| `{rounded.feature}` | 40px | Hero panels, main blotter showcase |
| `{rounded.full}` | 9999px | Pill buttons, tab chips, badges, search pills |
| `{rounded.circle}` | 50% | Avatars, circular icon buttons |

---

## Components

### Buttons
- **`button-primary`**: Black pill (`bg-[#14161a] text-white hover:bg-[#2d3748] rounded-full px-7 py-3 text-sm font-bold shadow-sm`)
- **`button-buy-cta`**: Cobalt pill (`bg-[#0064e0] text-white hover:bg-[#004fc4] rounded-full px-7 py-3 text-sm font-bold shadow-md`)
- **`button-secondary`**: Outlined ghost pill (`border-2 border-[#14161a] text-[#14161a] hover:bg-[#14161a]/5 rounded-full px-6 py-2.5 text-sm font-bold`)
- **`button-ghost`**: Subdued outline pill (`border-2 border-black/10 text-[#14161a] hover:bg-black/5 rounded-full px-5 py-2 text-sm font-bold`)
- **`button-pill-tab`**: Category navigation pills:
  - Inactive: `bg-white text-[#1c2b33] border border-[#e4e6eb] rounded-full px-4 py-2 text-sm font-bold hover:bg-[#f5f6f8]`
  - Active: `bg-[#14161a] text-white border-transparent rounded-full px-4 py-2 text-sm font-bold`
- **`button-icon-circular`**: 40×40px circular buttons (`rounded-full bg-white border border-[#e4e6eb] hover:bg-[#f5f6f8] flex items-center justify-center`)

### Cards & Containers
- **`card-product-feature`**: White card with 32px rounding (`rounded-[32px] bg-white border border-[#f0f2f5] p-8`)
- **`card-feature-photo`**: Edge-to-edge photographic tile with 32px rounding, no chrome, text overlaid on bottom gradient.
- **`card-promo-strip`**: Dark full-width strip (`rounded-[32px] bg-[#0a1317] text-white p-10 md:p-14`)
- **`card-icon-feature`**: Reassurance tile (`rounded-2xl bg-white border border-[#f0f2f5] p-6`)
- **`card-checkout-summary`**: Sticky right-rail summary card (`rounded-2xl bg-white border border-[#f0f2f5] p-6 shadow-[0_1px_4px_rgba(20,22,26,0.1)]`)
- **`why-buy-tile`**: 4-up reassurance grid (`rounded-2xl bg-white border border-[#f0f2f5] p-6`)

### Navigation & Banner
- **`promo-banner`**: Full-width strip above nav (`bg-[#ffd700] text-[#0a1317]` or `bg-[#0a1317] text-white` with `text-xs md:text-sm font-bold py-2.5 px-4 text-center`)
- **Top Navigation**: Sticky white bar (height ~64px), Meta wordmark/KP System crest, pill-tab nav, search pill, circular utility buttons, Clerk UserButton.

---

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` (cobalt) for action CTAs (Schedule, Settle, Save, Generate).
- Use `{colors.ink-button}` (black) for landing/general navigation primary CTAs.
- Apply `{rounded.full}` to every button, tab chip, and badge — buttons are NEVER squared.
- Apply `{rounded.xxxl}` (32px) to major showcase cards and `{rounded.xl}` (16px) to feature tiles.
- Use 44px touch targets on form inputs and primary buttons.

### Don't
- Don't use cobalt for marketing/landing primary buttons — keep it reserved for critical action panels.
- Don't introduce arbitrary bright colors outside cobalt, warning yellow, and semantic status colors.
- Don't soften pill buttons below `{rounded.full}`.
- Don't use heavy box-shadows on marketing cards; rely on photography, whitespace, and 32px corner rounding.
