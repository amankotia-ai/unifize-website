# Unifize Open Ledger

**Status:** Directional design system and implementation brief  
**Scope:** Homepage (L1), product / solution / industry pages (L2), with the DMS page as the first L2 reference  
**Decision:** This direction supersedes the earlier “Quiet Authority” exploration. That board remains in the repository as history, not as an implementation reference.

## The change in one sentence

Unifize becomes a light-first editorial record of connected work: warm paper, black ink, thin rules, asymmetric typography, and real product evidence.

This is a re-foundation, not a refinement of the current visual language.

## Before / after

| Current pattern | Open Ledger pattern | Why it changes |
| --- | --- | --- |
| Dark or high-contrast hero bookend | Warm paper from masthead through footer | Creates one calm reading surface instead of theatrical bands |
| Centered display headline | Left-aligned IBM Plex Sans on an asymmetric grid | Feels engineered and specific, not like a generic SaaS landing page |
| Product UI floating on a cobalt stage | Flat product “evidence plate” embedded in the page grid | Makes the product the proof, not decoration |
| Pill-shaped calls to action | Square black primary action and underlined text action | Establishes decisive hierarchy with less visual furniture |
| Rounded card grids | Unboxed indexes, ledgers, lists, and ruled records | Matches the way Unifize structures operational knowledge |
| Dark/light section alternation | Continuous publication flow separated by whitespace, rules, and folios | Makes the page feel like one system |
| Large color fields and gradients | Approximately 88% paper/white, 9% ink/graphite, 3% cobalt | Keeps brand color meaningful and product content legible |
| One type treatment everywhere | IBM Plex Sans for headings; Inter for body and interface; IBM Plex Mono for evidence | Separates statement, explanation, and record at a glance |
| 16-column display composition | Mobile-first 12-column publication grid | Creates simpler L1/L2 templates and clearer reading order |

## Design premise

The metaphor is an **open ledger**: every decision, revision, owner, and outcome can be seen in context. The visual language borrows from standards manuals, archival registers, technical publications, and high-quality editorial design—not from dashboard marketing sites.

Five principles govern every page:

1. **Evidence before atmosphere.** Product UI, records, and outcomes carry the visual weight.
2. **One surface, many chapters.** Hierarchy comes from scale, rhythm, and rules rather than background-color changes.
3. **Indexes create ingress.** L1 introduces the world; L2 proves one path through it.
4. **Cobalt means action or active state.** It is never a decorative wash.
5. **Every object aligns to the ledger.** Text, product crops, captions, and rules share the same 12-column geometry.

## Information architecture

### Page roles

| Level | Page role | Visitor question | Required outcome |
| --- | --- | --- | --- |
| L1 | Homepage | “What is Unifize, and where should I enter?” | Establish the system-level proposition, show the product, and route to a relevant L2 page |
| L2 | Product | “How does this product change my work?” | Explain the workflow, show the interface, prove the result, and invite evaluation |
| L2 | Solution | “How does Unifize solve this operational problem?” | Connect the problem to cross-product capabilities and proof |
| L2 | Industry | “Does Unifize understand my operating context?” | Prove relevance through industry-specific workflows, controls, and customer evidence |

L1 should orient and route. L2 should deepen and prove. L1 does not contain compressed versions of every L2 page, and L2 does not repeat the corporate homepage.

### Homepage (L1) canonical flow

| Folio | Section | Job | Primary ingress |
| --- | --- | --- | --- |
| 00 | Masthead | Make the full site model visible without a mega-menu wall | Platform, Products, Solutions, Industries, Resources |
| 01 | Hero + live product plate | State the existing core proposition and immediately prove it with a substantial product screen | Book a demo; secondary assessment / platform link |
| 02 | Ingress index | Let visitors self-select by what they need, not by scrolling through cards | Product, solution, and industry L2 pages |
| 03 | The connected-work thesis | Explain why work falls between systems and how Unifize closes the gap | Platform L2 |
| 04 | Product evidence register | Show DMS, QMS, PLM, and MES as connected records with one concrete outcome each | Individual product L2 pages |
| 05 | Operational paths | Route by problem: quality, compliance, change, collaboration, traceability | Solution L2 pages |
| 06 | Industry proof index | Show where the operating model has already worked | Industry L2 pages and case studies |
| 07 | Customer proof | Pair one specific outcome with one concise, attributable quote | Relevant case study |
| 08 | Field notes | Offer useful next steps without turning the page into a content feed | Selected resource pages |
| 09 | Action + footer | Close with one decisive next step and a complete sitemap | Book a demo; all L2 destinations |

The hero keeps the current product-screen paradigm, but changes its treatment. It is neither a decorative screenshot nor a floating browser mockup. It is a flat, captioned, legible evidence plate occupying roughly five of twelve columns at desktop and appearing immediately after the proposition on mobile.

### DMS product page (L2) canonical flow

| Folio | Section | Job | L1 relationship |
| --- | --- | --- | --- |
| DMS/01 | Product opening | Name the product outcome and show a live document register | Fulfils the DMS promise introduced on L1 |
| DMS/02 | Failure mode | Make version drift, approvals, and disconnected evidence concrete | Deepens the homepage connected-work thesis |
| DMS/03 | Operating model | Show author → review → approval → training → effective use as one record | Demonstrates the platform model inside DMS |
| DMS/04 | Evidence trail | Show timestamps, revision IDs, owners, links, and state transitions | Proves traceability rather than claiming it |
| DMS/05 | Capability ledger | Present authoring, control, review, training, search, and audit without card clutter | Supplies evaluation detail |
| DMS/06 | Connected systems | Explain ingress from and egress to existing tools | Returns to the system-level platform story |
| DMS/07 | Customer result | Pair an operational metric with a named customer story | Provides category-specific proof |
| DMS/08 | Related paths | Route to QMS, compliance, change control, and the relevant industry page | Reconnects the L2 page to the wider architecture |
| DMS/09 | Evaluation action | Offer the demo and one useful technical resource | Converts without adding a second CTA hierarchy |

Solution and industry pages use the same chapter grammar but replace the capability ledger with problem or operating-context evidence. Folio labels make the family resemblance explicit without making every page identical.

## Layout system

### Grid

- Use a mobile-first 12-column grid.
- Maximum canvas: `1480px`.
- Outer gutters: `20px` mobile, `32px` tablet, `48px` desktop, `64px` wide desktop.
- Column gaps: `20px` mobile/tablet and `24px` desktop.
- Long-form copy measure: `58–68ch`; never exceed `75ch`.
- Hero at ≥1024px: proposition columns 1–7, product plate columns 8–12.
- A vertical key line may mark the start of columns 4, 8, or 10 when it clarifies a chapter. Never draw the entire grid.

The grid is structural, not decorative. Break it only for intentional full-bleed evidence such as a product register or documentary image.

### Spacing

Open Ledger uses a 5/10 rhythm rather than the current 8-point cadence:

`5, 10, 15, 20, 30, 40, 50, 60, 80, 100, 120, 160px`

- Page chapter padding: `100–160px` desktop, `60–80px` mobile.
- Headline to support copy: `30–40px`.
- Support copy to action: `30px`.
- Rule to first content: `20–30px`.
- Dense evidence rows: `10–15px` vertical padding.

### Geometry

- Default radius: `0`.
- Product plate and media radius: `2px` maximum.
- Rules: `1px`; use `--ol-rule` on paper and `--ol-ink` for decisive divisions.
- Shadows: none by default. A product overlay may use the single defined lift shadow when it must sit above content.
- Avoid nested borders. One rule should explain one relationship.

## Typography

| Role | Family | Treatment |
| --- | --- | --- |
| Heading and display | IBM Plex Sans Variable | Large sentence-case headlines, proof quotes, chapter statements |
| Body and interface | Inter Variable | Navigation, body copy, buttons, product labels |
| Evidence | IBM Plex Mono | Folios, record IDs, revisions, timestamps, captions, data labels |

All three families are open-source. Self-host WOFF2 files and subset to the scripts the production site needs. Keep heading weights between 400 and 600; IBM Plex Sans should feel precise and editorial through scale and composition, not through excessive weight.

### Type scale

| Token | Desktop | Mobile | Line height | Use |
| --- | --- | --- | --- | --- |
| `display-01` | `clamp(4.5rem, 7.6vw, 7rem)` | fluid | `0.94` | Homepage proposition only |
| `display-02` | `clamp(3.25rem, 5.4vw, 5rem)` | fluid | `0.98` | L2 product opening |
| `heading-01` | `clamp(2.5rem, 4vw, 4rem)` | fluid | `1.02` | Chapter statement |
| `heading-02` | `clamp(1.75rem, 2.4vw, 2.5rem)` | fluid | `1.08` | Subchapter / proof quote |
| `body-lg` | `1.25rem` | `1.125rem` | `1.5` | Hero support and opening copy |
| `body` | `1rem` | `1rem` | `1.6` | Reading copy |
| `label` | `0.75rem` | `0.75rem` | `1.35` | Mono folios and evidence metadata |

Headlines use IBM Plex Sans, balanced wrapping, and slightly tightened tracking (`-0.035em` at display scale and `-0.02em` below it). Body text uses Inter and remains left-aligned. Do not center paragraphs. Do not use all caps outside short mono labels.

## Color system

The final implementation should use OKLCH tokens. Hex values are provided as fallbacks and handoff references.

| Token | Hex | OKLCH | Purpose | Contrast on paper |
| --- | --- | --- | --- | --- |
| Paper | `#FBF8F3` | `oklch(0.980 0.007 80.7)` | Default page surface | — |
| Paper inset | `#F4EFE7` | `oklch(0.954 0.012 79.8)` | Selected rows and quiet grouping | — |
| White | `#FFFFFF` | `oklch(1 0 0)` | Product canvas and reverse text | — |
| Ink | `#0F1115` | `oklch(0.177 0.009 264.3)` | Primary text and CTA | `17.84:1` |
| Ink secondary | `#5C6069` | `oklch(0.489 0.015 266.6)` | Supporting copy | `5.95:1` |
| Graphite | `#8A8F98` | `oklch(0.649 0.015 262.4)` | Disabled UI and non-text marks only | `3.07:1` |
| Rule | `#D7D1C7` | `oklch(0.863 0.015 80.7)` | Dividers and grid keys | non-text only |
| Cobalt | `#1E5BFF` | `oklch(0.547 0.250 264)` | Links, active states, folios | `4.96:1` |
| Success | `#137333` | `oklch(0.488 0.130 149)` | Approved / effective states | `5.62:1` |
| Critical | `#B3261E` | `oklch(0.501 0.178 28.7)` | Errors and blocked states | `6.17:1` |

Use cobalt for no more than roughly 3% of a typical page. Graphite is not permitted for normal-sized text. White on cobalt is `5.26:1`; white on ink is `18.90:1`.

## Canonical components

### Masthead

A 72–84px paper masthead with the logo left, the primary IA centered or right-aligned, and one black rectangular action. A single bottom rule anchors it. On mobile, expose the current section and a plain menu trigger; do not turn the navigation into pills.

### Section open

Each major chapter begins with a cobalt mono label, a folio number, a large IBM Plex Sans statement, and optional one-line context. The folio sits on the grid edge rather than floating above the headline.

### Ingress index

An unboxed set of ruled rows. Every row has an index, a destination name, one sentence of intent, and an arrow. The full row is interactive. Hover changes the rule and arrow to cobalt and shifts the arrow by `4px`; the row itself does not lift.

### Product plate

The product screen is a real, legible crop at a useful density. It includes:

- a plate number and product name;
- one active state in cobalt;
- a caption stating what the visitor should notice;
- optional record metadata below in mono;
- no fake browser chrome, perspective, glow, or blue backdrop.

On L1 the plate proves breadth. On L2 it must prove the specific workflow described in the surrounding chapter.

### Evidence trail

A chronological ruled list of events. Each event shows time, event ID, action, actor, and linked record. It should be possible to understand the audit trail without animation.

### Proof

Use one large, regular-weight IBM Plex Sans quotation or outcome, then a small mono attribution. Logos are secondary. Avoid carousels; one strong case is more credible than a moving wall of marks.

### Actions

- Primary: black rectangle, white label, right arrow; minimum `48px` height.
- Secondary: ink text with a 1px underline and right arrow.
- Tertiary: cobalt text link with a visible underline on hover/focus.
- Focus: `2px` cobalt outline with `3px` offset.
- Never place more than one primary action in a chapter.

## Motion

Motion explains state, not personality.

- Fast interaction: `160ms`.
- Chapter reveal: `280ms` maximum.
- Standard easing: `cubic-bezier(0.2, 0, 0, 1)`.
- Hover movement: `4px` maximum.
- Product-screen state changes may crossfade or reveal along an existing rule.
- No parallax, floating screens, marquee text, continuous ambient movement, or scroll-jacking.
- Respect `prefers-reduced-motion` by reducing all durations to zero.

## Responsive behavior

- At less than `768px`, all content becomes a four-column reading layout.
- The hero reads proposition → actions → product plate; the screen is never hidden.
- Evidence tables may become stacked records, but IDs, state, and owner remain visible.
- Folios move above their chapter; key lines become horizontal rules.
- Minimum body size is `16px`; minimum target size is `44 × 44px`.
- Do not preserve desktop asymmetry at the cost of reading order.

## Content rules

- Headlines make one claim and end before they become paragraphs.
- Every product image has a caption telling the reader what it proves.
- Every metric names its unit, timeframe, and source.
- Every index label describes a destination rather than a theme.
- Prefer nouns from the product: document, revision, approval, evidence, owner, change, training, effective date.
- Avoid generic language such as “unlock,” “seamless,” “reimagine,” and “powerful platform.”

## What this system forbids

- dark hero or black page regions;
- centered hero copy;
- gradient text or large cobalt surfaces;
- pill buttons and rounded card walls;
- decorative dashboard tiles;
- glass, glow, 3D product perspective, or stock 3D objects;
- generic node clouds and ornamental workflow diagrams;
- text over photography;
- visual treatments copied from the current homepage or DMS page.

## Research basis

The grid and reading rules adapt the mobile-first, content-led discipline in the [GOV.UK layout guidance](https://design-system.service.gov.uk/styles/layout/) and the 12-column approach documented by the [U.S. Web Design System](https://designsystem.digital.gov/utilities/layout-grid/). The type hierarchy follows the principle of a limited, purposeful scale described in the [GOV.UK type scale](https://design-system.service.gov.uk/styles/type-scale/) and the left-aligned readability guidance in [USWDS typography](https://designsystem.digital.gov/components/typography/). [IBM Plex](https://github.com/IBM/plex) supplies the heading and evidence voices; Inter remains the neutral reading and interface family.

These are structural references, not visual templates. The Open Ledger metaphor, component grammar, color proportions, and L1/L2 architecture are specific to Unifize.

## Implementation order

1. Add the three font families and the Open Ledger token layer behind a page-level class.
2. Build the masthead, section open, ingress index, product plate, evidence trail, proof, and action primitives.
3. Recompose the homepage using the L1 flow while preserving the approved hero message and product-screen requirement.
4. Recompose DMS using the L2 flow and real product data.
5. Validate at 375, 768, 1024, 1440, and 1728px; audit focus, contrast, keyboard order, and reduced motion.
6. Extend the L2 chapter grammar to the remaining product, solution, and industry pages.
