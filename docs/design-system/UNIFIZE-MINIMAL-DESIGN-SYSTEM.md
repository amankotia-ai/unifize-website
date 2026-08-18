# Unifize Minimal Design System

Status: proposed north star  
Scope: marketing website, beginning with `/explorations/home` (L1) and
`/explorations/products/dms` (L2)  
Working name: **Quiet authority**

This document is a design reference. It does not change the live website.

## Executive direction

Unifize should feel calm, exact, and credible under scrutiny. Minimal does not
mean removing product detail. It means giving each viewport one dominant idea,
making relationships legible through space, and allowing the real product to
carry the proof.

The visual system combines:

- dark editorial bookends for thesis and conversion;
- porcelain working surfaces for explanation and evidence;
- one cobalt action color used sparingly;
- expressive display typography for the marketing story;
- productive body, UI, and mono typography for governed work;
- product screens, ledgers, records, and decision trails instead of decorative
  illustrations.

The result should be recognizably Unifize—not an imitation of another company’s
website.

## Research synthesis

Four current systems are especially relevant:

1. Apple’s Human Interface Guidelines describe hierarchy, harmony, and
   consistency as foundational principles. The useful lesson for Unifize is to
   establish one unmistakable hierarchy and make controls support the content
   beneath them. [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines?lang=en)
2. Vercel’s Geist system defines typography by semantic use and treats color as
   role-based layers: component backgrounds, borders, high-contrast surfaces,
   and text. The useful lesson is that minimalism depends on disciplined roles,
   not a tiny palette alone. [Geist typography](https://vercel.com/geist/typography),
   [Geist colors](https://examples.vercel.com/geist/colors)
3. IBM Carbon uses an 8-pixel mini unit, a 16-column grid, and spacing tokens to
   create rhythm. It explicitly recommends negative space and asymmetry for
   contrast, and separates expressive marketing typography from productive UI
   typography. [Carbon 2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/),
   [Carbon spacing](https://carbondesignsystem.com/elements/spacing/overview/),
   [Carbon typography strategies](https://carbondesignsystem.com/elements/typography/style-strategies/)
4. Linear’s UI redesign focused on reducing visual noise while improving
   alignment, hierarchy, and navigation density. Its later refresh also dims
   navigation so the main content can lead. The useful lesson is to reduce the
   prominence of persistent chrome without reducing information quality.
   [Linear UI redesign](https://linear.app/now/how-we-redesigned-the-linear-ui),
   [Linear 2026 UI refresh](https://linear.app/changelog/2026-03-12-ui-refresh)

### What this means for Unifize

- Minimalism is hierarchy plus rhythm—not empty decoration.
- Expressive marketing type and productive product type should coexist, but
  never compete in the same region.
- Product detail belongs inside one bounded product object; the page around it
  stays quiet.
- Space should group content before rules, fills, or cards are introduced.
- Marketing and product pages share one visual grammar; their information
  architecture creates the difference between L1 and L2.

## Reference-page audit

The homepage and DMS page already establish the strongest parts of the system:

- Geist for display, Inter for body, and JetBrains Mono for evidence metadata;
- near-black heroes, light content sections, and cobalt interaction states;
- large balanced headlines with restrained supporting copy;
- a real product screen immediately after the hero statement;
- square ledgers, numbered chapters, hairlines, and traceable records.

The opportunity is consolidation.

### Composition and surface changes

| Before | After |
| --- | --- |
| Several components compete for equal attention within a viewport | One dominant object per viewport; supporting elements are visibly subordinate |
| Large cobalt stage competes with the product screen | Product screen sits on the page surface with a thin cobalt active edge; cobalt stays below roughly 10% of the canvas |
| Wide selector, screen chrome, and page chrome all have similar weight | Compact selector; dim navigation; product content carries the strongest contrast |
| Card, dashed-divider, ledger, diagram, and filled-panel languages can appear together | Select one content model per section: open editorial, ledger, product stage, proof, or CTA |
| Repeated boxes create section boundaries | Use spacing first, hairline rules second, and surface changes only for major narrative transitions |
| Similar nested radii are applied inconsistently across component types | `0px` sections, `4px` controls, `8px` product frames; pills only for status or a deliberately soft CTA |
| Product UI is sometimes treated as background decoration | Product UI is a legible proof object with a clear task, owner, state, and evidence trail |
| Multiple hover treatments add lift, translation, border, and color together | Change one or two properties only; prefer ink, background, or shadow changes over motion-heavy lift |
| Long pages accumulate repeated reveal effects | Motion marks state changes and narrative progression; static content does not animate simply because it entered the viewport |

## Design principles

### 1. One idea per viewport

Each viewport gets one primary message or one primary product object. A section
may contain rich information, but its hierarchy must be understood in one
glance.

### 2. Product is proof

Use the actual Unifize product shell and representative workflows. Do not use
AI-generated interface images in production. Product screens must be large
enough to read the task, owner, state, and outcome.

### 3. Space creates the grouping

Related elements use tighter spacing. Important elements receive more space.
Avoid adding a card, line, or colored surface when a spacing change can express
the relationship.

### 4. Evidence shapes the visual language

The system should look native to governed work: documents, IDs, revisions,
owners, approvals, timestamps, and lifecycle states. Decorative abstraction is
secondary.

### 5. Expressive outside, productive inside

Marketing statements use editorial scale and generous rhythm. Product screens,
labels, and evidence use compact productive typography. Never make product UI
perform like a marketing headline.

### 6. Restraint is measurable

- No more than one dominant product screen per section.
- No more than one primary CTA per action group.
- No more than three visible navigation choices in an ingress group without a
  clear hierarchy.
- Cobalt occupies less than roughly 10% of a typical marketing viewport.
- A section uses no more than two surface levels at once.

## Foundations

### Color

The existing palette is sound. The proposal normalizes the remaining hex
neutrals to OKLCH and assigns semantic roles. These are documentation aliases;
the live tokens have not been changed.

| Before | After |
| --- | --- |
| `--n-0: #ffffff` | `--ds-surface: oklch(1 0 0)` |
| `--n-25: #fbfbfc` | `--ds-canvas: oklch(0.988 0.001 286.4)` |
| `--n-50: #f6f7f8` | `--ds-surface-subtle: oklch(0.976 0.002 247.8)` |
| `--n-150: #e4e7eb` | `--ds-rule: oklch(0.927 0.006 255.5)` |
| `--n-200: #d8dce1` | `--ds-rule-strong: oklch(0.893 0.008 253.9)` |
| `--n-500: #646b78` | `--ds-ink-tertiary: oklch(0.526 0.022 262.9)` |
| `--n-600: #454b56` | `--ds-ink-secondary: oklch(0.412 0.02 262.6)` |
| `--n-800: #181b22` | `--ds-ink: oklch(0.222 0.014 266.9)` |
| `--d-bg: #0a0b0f` | `--ds-dark-canvas: oklch(0.15 0.009 274.3)` |
| `--d-bg-2: #101218` | `--ds-dark-surface: oklch(0.183 0.013 270.6)` |
| `--d-bg-3: #181b22` | `--ds-dark-surface-raised: oklch(0.222 0.014 266.9)` |
| `--d-text: #f4f4f6` | `--ds-dark-ink: oklch(0.968 0.003 286.4)` |
| `--d-text-2: #a8adb8` | `--ds-dark-ink-secondary: oklch(0.747 0.017 266.2)` |
| `--u-primary: oklch(0.528 0.263 262.9)` | Keep as `--ds-accent`; use only for actions, active state, focus, and selected evidence |

Recommended color proportions:

- 70–80% neutral canvas and open space;
- 15–25% type, rules, and contained product UI;
- 5–10% cobalt and status colors combined.

WCAG 2 contrast checks for core pairs:

- ink on porcelain: `16.66:1`;
- secondary ink on porcelain: `8.48:1`;
- light ink on dark canvas: `17.91:1`;
- secondary light ink on dark canvas: `8.74:1`;
- white on the existing cobalt (`#0052ff` equivalent): approximately `5.75:1`.

Status colors must always be paired with a text label, shape, or icon.

### Typography

Keep the current families; they already provide the necessary contrast.

| Role | Family | Size | Weight | Line height | Usage |
| --- | --- | --- | --- | --- | --- |
| Display XL | Geist | `56–96px` fluid | `500` | `1.02–1.06` | Homepage and product hero only |
| Display L | Geist | `44–72px` fluid | `500` | `1.06` | Major editorial statement |
| Heading L | Geist | `32–48px` fluid | `500` | `1.1` | Section heading |
| Heading M | Geist | `24–32px` fluid | `550–600` | `1.15` | Subsection heading |
| Heading S | Geist | `20px` | `600` | `1.2` | Component title |
| Lede | Inter | `17–20px` fluid | `400` | `1.55` | Marketing support copy |
| Body | Inter | `16px` | `400` | `1.6` | Reading text |
| UI | Inter | `14px` | `500` | `1.4` | Navigation, controls, product UI |
| Caption | Inter | `13px` | `400–500` | `1.4` | Secondary context |
| Data | JetBrains Mono | `12px` | `500` | `1.35` | IDs, timestamps, states, evidence |

Rules:

- `font-synthesis: none` at the root;
- headings use `text-wrap: balance` and slight negative tracking;
- descriptions use `text-wrap: pretty` and stay under `62ch`;
- body copy never falls below `16px`;
- changing numbers use `font-variant-numeric: tabular-nums`;
- mono is metadata, never body copy;
- use a single `h1` and a sequential heading outline.

### Grid and spacing

- 16-column editorial grid at desktop; collapse to 8 and 4 columns.
- Maximum content width: `1440px`.
- Desktop gutter: `48px`; tablet: `32px`; mobile: `24px`.
- Base geometry: `8px`; `4px` is reserved for micro-adjustments.
- Standard section padding: `96–160px` fluid.
- Canonical spacing steps: `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96,
  128, 160px`.
- Use asymmetry intentionally: a `6/10`, `7/9`, or `5/11` split can create
  hierarchy without adding decoration.
- Align type, dividers, product frames, and proof blocks to the same key lines.

### Geometry, depth, and imagery

- Sections and ledgers: square.
- Controls: `4px` radius.
- Product frames: `8px` maximum radius.
- Pills: status, filters, and one deliberately soft CTA style only.
- Use hairline dividers for layout separation.
- Use low-opacity layered shadows for depth; use pure black or white image
  outlines at `10%` opacity.
- Use product imagery at native perspective. Avoid tilted 3D browser windows.
- Photography, when introduced, should be documentary and specific to regulated
  work—not generic teams around a laptop.
- Diagrams should use real objects and evidence relationships, not decorative
  node clouds.

### Motion

| Token | Value | Use |
| --- | --- | --- |
| Fast | `150ms` | press, icon, small hover |
| UI | `180ms` | tabs, selectors, button state |
| Enter | `400ms` | one-time grouped entrance |
| Story | `600ms` | lifecycle or product-stage progression |
| UI easing | `cubic-bezier(0.2, 0, 0, 1)` | interruptible interaction |
| Enter easing | `cubic-bezier(0.22, 1, 0.36, 1)` | restrained one-time reveal |

Rules:

- never use `transition: all`;
- interactive state changes use interruptible transitions;
- stagger semantic groups by approximately `80–100ms`, not every child;
- exit movement is subtle and shorter than enter movement;
- button press may use `scale: 0.96` unless motion would distract;
- respect `prefers-reduced-motion` and do not autoplay meaningful product
  changes for those users.

## Canonical page patterns

### L1 homepage

The homepage helps a visitor recognize their problem, understand the platform,
and choose the right L2 route.

1. Hero thesis + primary action + one product proof screen.
2. Three ingress routes: by solution, product, and industry.
3. Solution recognition: four problems maximum.
4. Platform mechanism: one governed lifecycle story.
5. Product suite: QMS, DMS, MES, PLM.
6. Industry routing: grouped, not tiled into a card wall.
7. Customer proof + resource bridge.
8. Closing CTA.

Each section should answer one question and expose one next step.

### L2 product and solution pages

L2 pages prove fit and explain how the system works for a specific job.

1. Product identity + outcome + one representative product screen.
2. Problem recognition for the target buyer.
3. Mechanism and module story.
4. Capabilities as a ledger, not a grid of interchangeable cards.
5. Governed lifecycle with states, owners, and evidence.
6. Integrations and systems of record.
7. Roles and operating context.
8. Customer outcome and compliance proof.
9. Closing CTA.

Homepage and L2 heroes share the same visual skeleton. The homepage offers a
multi-workflow selector; an L2 page shows one product-specific workflow.

## Canonical components

1. **Header:** persistent, quiet, one visible primary action.
2. **Hero statement:** one eyebrow at most, balanced display headline, support
   copy under `62ch`, one primary and one supporting action.
3. **Workflow selector:** compact text rail; active state uses cobalt and a
   hairline indicator.
4. **Product frame:** authentic application shell, native perspective, readable
   state and ownership.
5. **Section intro:** optional mono index, expressive heading, restrained lede.
6. **Ingress ledger:** text-first routes separated by rhythm and hairlines.
7. **Evidence ledger:** record, owner, state, date, outcome.
8. **Proof block:** one quotation, one result, one source.
9. **Lifecycle story:** one active step and one product view at a time.
10. **Closing CTA:** a clear statement and two actions; no extra proof grid.

## Use / avoid

| Use | Avoid |
| --- | --- |
| One real product screen | Multiple fake dashboards |
| Open editorial composition | Equal-weight card mosaics |
| Text routes and ledgers | A pill for every link |
| Hairlines and spacing | Heavy borders around every object |
| Cobalt for action and state | Full blue backgrounds behind every screenshot |
| Mono for evidence metadata | Mono paragraphs or decorative code styling |
| Dark bookends and light working surfaces | Arbitrary theme changes section by section |
| One proof statistic with context | Rows of unsupported metrics |
| Documentary product evidence | Abstract 3D objects and node clouds |

## Artifacts

- Reference tokens: [`unifize-minimal.tokens.css`](./unifize-minimal.tokens.css)
- Mood board: [`moodboard/README.md`](./moodboard/README.md)
- Existing reference screenshots:
  [`homepage-current.jpg`](./moodboard/references/homepage-current.jpg) and
  [`dms-current.jpg`](./moodboard/references/dms-current.jpg)
