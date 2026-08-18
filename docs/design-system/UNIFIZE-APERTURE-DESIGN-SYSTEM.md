# Unifize Aperture design system

Status: directional proposal  
Scope: marketing website, beginning with the homepage and DMS product page  
Working principle: **one claim, one governed artifact, one measurable outcome**

## Outcome

Aperture is a light-first, product-led system for regulated-work storytelling.
It keeps the specificity and evidence density of the current Unifize pages while
replacing their centered dark heroes, gradient headlines, blue stages, tabbed
mockups, and repeated card grammar.

The visual idea is simple: every chapter brings one important piece of work into
sharp focus. Supporting chrome recedes. The product is shown as an authentic,
governed record rather than as decorative SaaS scenery.

## Research synthesis

The direction translates principles from current Apple and Linear experiences
without copying either brand.

| Reference | Transferable principle | Unifize translation |
| --- | --- | --- |
| [Apple homepage](https://www.apple.com/in/) | One product story per visual field, short copy, generous pacing, and a direct relationship between claim and product image | One workflow claim followed by one large governed-product aperture |
| [Apple Mac](https://www.apple.com/in/mac/) | Clear chaptering, concise benefit statements, and product line-up navigation that never competes with the product | Compact section opens and horizontal destination bands |
| [Linear homepage](https://linear.app/) | Real product UI carries the story; dense details remain legible because hierarchy is disciplined | Product records contain real owners, states, IDs, evidence, and timestamps |
| [Linear UI redesign](https://linear.app/now/how-we-redesigned-the-linear-ui) | Reduce visual noise, align controls precisely, and test one hierarchy across many product states | A small primitive set and one spacing/radius grammar across L1 and L2 pages |
| [Linear 2026 refresh](https://linear.app/now/behind-the-latest-design-refresh) | Supporting navigation should recede; structure should be felt rather than seen | Mineral canvas, quiet chrome, soft separators, and one dominant work surface |

The result should feel like Unifize: controlled, accountable, precise, and calm
under pressure.

## Current-state audit

| Before | After |
| --- | --- |
| Centered dark hero with gradient emphasis | Asymmetric mineral-light opening with solid ink type and a single cobalt punctuation mark |
| Hero copy, CTAs, selector, blue stage, and browser mockup compete within one viewport | Claim and actions lead into one dominant product aperture with a narrow outcome rail |
| Homepage hero switches between four isolated product views | One governed thread connects quality, change, holds, and documents in a single view |
| DMS hero leads with a document table inside a large blue frame | One controlled document and its Draft → Review → Approved → Effective lifecycle share an integrated surface |
| Rounded card groups repeat across sections | Horizontal destination bands and large story stages create hierarchy without card walls |
| Product screenshots are presented as browser windows | Product surfaces are cropped as direct evidence, with neutral outlines and minimal chrome |

## Visual character

Five adjectives govern the system:

- focused;
- quiet;
- exact;
- product-real;
- accountable.

The site should not feel futuristic, playful, ornamental, or cinematic for its
own sake. It should feel easier to understand the longer someone looks at it.

## Typography

### Families

| Before | After |
| --- | --- |
| Geist-like display voice | IBM Plex Sans for all display and heading roles |
| Mixed interface and body hierarchy | Inter for body, navigation, controls, metadata, tables, and captions |
| Monospace used as a visual-design motif | No required third family; Inter uses tabular numerals for changing data |

Only WOFF2 files should be served. Load the required weights explicitly and set
font-synthesis to none.

### Required weights

- IBM Plex Sans: 400, 500, 600.
- Inter: 400, 500, 600.

### Semantic scale

| Token | Desktop range | Role |
| --- | --- | --- |
| display-xl | 56–104 px | Homepage and flagship product outcome |
| display-lg | 44–76 px | Secondary page opening |
| heading-xl | 36–56 px | Major chapter |
| heading-lg | 28–40 px | Section outcome |
| heading-md | 24 px | Feature or mechanism title |
| heading-sm | 20 px | Compact sub-section |
| lede | 17–20 px | Opening support copy |
| body | 16 px | Reading and explanatory copy |
| body-sm | 14 px | Desktop UI and metadata |
| caption | 13 px | Evidence caption |
| label | 12 px | Short uppercase taxonomy only |

### Typesetting rules

- Display line-height: 0.98; section headings: 1.1; body: 1.55.
- Display tracking: -0.035em; heading tracking: -0.02em.
- Uppercase labels use 0.06em positive tracking.
- Headings use balanced wrapping; short descriptions use pretty wrapping.
- Body measure stays between 60 and 70 characters, with 65ch as the default.
- Use one h1, preserve sequential heading levels, and never size a lower heading
  above a higher one on the same page.
- Use tabular numerals on changing counts, dates, revisions, and metrics.

## Color

The system uses perceptually stable OKLCH values with sRGB fallbacks. Cobalt is
an interaction and state color, not a page-fill color.

| Before | After |
| --- | --- |
| Near-black page canvas | Mineral canvas: #F6F8FA / oklch(0.978 0.003 247.9) |
| Large cobalt stage | Cobalt limited to actions, active states, focus, and a single punctuation detail |
| Blue-gray text with inconsistent contrast | Ink and graphite roles with lightness gaps sized for readable body copy |
| Status communicated mainly through hue | Deep status color plus an explicit state label and icon |
| Decorative multi-color accents | One cobalt action hue, one effective green, and one critical red |

### Palette

| Role | Value | Use |
| --- | --- | --- |
| Mineral | #F6F8FA | Page canvas |
| White | #FFFFFF | Primary product and navigation surfaces |
| Ink | #0E1116 | Headings and primary text |
| Graphite | #4D5664 | Body and secondary text |
| Muted | #727B89 | Tertiary metadata only |
| Blue gray | #E5EAF1 | Dividers and quiet UI structure |
| Blue-gray soft | #F0F3F7 | Stage fields and selected rows |
| Cobalt | #1A5BFF | Primary action, active state, focus |
| Cobalt hover | #0F46D8 | Primary-action hover |
| Effective | #137333 | Effective/complete text and icons |
| Critical | #B3261E | Error and blocked states |

### Proportion

- 72% mineral canvas;
- 20% white product surface;
- 6% ink and graphite;
- no more than 2% cobalt and semantic state colors in a typical viewport.

### Contrast

- Body text on a light surface uses Ink or Graphite, never Muted.
- Muted is reserved for large or nonessential metadata.
- Small green status text uses the deep Effective token, not the brighter
  generated-board green.
- Cobalt buttons use white text.
- State is always represented by label, icon, or position in addition to color.

## Layout

### Grid

- Maximum canvas: 1440 px.
- Desktop: 12 columns.
- Tablet: 8 columns.
- Mobile: 4 columns.
- Grid gap: 16–24 px.
- Outer gutter: 24–56 px.
- Section spacing: 96–160 px.
- Reading measure: 65ch.

The grid governs alignment but should not become visible decoration.

### Page rhythm

Every major chapter follows:

1. claim;
2. governed artifact;
3. measurable outcome;
4. next destination.

This is a storytelling sequence, not a requirement to place four boxes in every
section.

## Geometry and depth

### Concentric radii

| Before | After |
| --- | --- |
| Similar radius repeated on nested surfaces | 24 px outer aperture, 16 px inner surface, 8 px inset |
| Pill controls used for most actions | 10 px control radius with 44 px minimum height |
| Border used to make every card visible | Layered neutral shadow for lifted surfaces; borders remain only for layout separation |
| Tinted image outlines | Pure black at 10% opacity in light mode |

The radius equation is: outer radius = inner radius + inset.

### Depth levels

1. Canvas: no shadow.
2. Product aperture: one neutral ring, a small local shadow, and a restrained
   ambient shadow.
3. Overlay: the only higher elevation.

Do not add depth to destination bands, section wrappers, or every product row.

## Core primitives

### Masthead

- 64 px desktop height; 56 px mobile.
- White surface on mineral canvas.
- Logo left, compact navigation center/right, one primary action.
- Navigation remains quieter than the current chapter.
- Mobile uses one 44 px menu target and no shrunken desktop navigation.

### Section open

- One IBM Plex Sans outcome.
- One Inter support sentence.
- Optional action pair.
- Optional three-part principle row: One claim / One artifact / One outcome.
- Never center the whole composition.

### Action pair

- Primary: cobalt fill, white label.
- Secondary: white or transparent surface with neutral ring.
- Minimum target: 44 × 44 px.
- Text-plus-arrow buttons use 2 px less padding on the icon side.
- Press state scales to 0.96.
- Transitions list exact properties; never use transition: all.

### Product aperture

The system-defining primitive.

- One dominant surface, usually 8–12 grid columns.
- 24 px outer radius, 16 px inner radius, 8 px inset.
- Product chrome is reduced to what helps someone orient.
- Product content uses real workflow nouns and realistic density.
- Every aperture must answer: what is this, who owns it, what state is it in,
  and what evidence proves completion?
- Product imagery receives a pure-black 10% inset outline.

### Proof rail

- A narrow vertical companion to a homepage aperture.
- Contains no more than four outcomes.
- Each outcome has a noun, number, unit, and short explanation.
- Numbers use tabular numerals.
- On mobile, it stacks after the product surface.

### Lifecycle rail

- A product-page variant of the proof rail.
- Shows a real state progression over time.
- DMS default: Draft → Review → Approved → Effective.
- Current state is expressed through position, label, and color.
- On mobile, it follows the document content in reading order.

### Destination band

- A horizontal routing primitive, not a card.
- One label, one direct description, one arrow.
- Bands share a surface and separate with quiet rules.
- On mobile, each band becomes a full-width row with a 44 px target.

### Proof quote

- One quote, one named role, one company, one relevant outcome.
- No carousel by default.
- Avoid oversized quotation decoration and logo walls.

## Homepage composition: L1

### Opening

Desktop:

- Masthead.
- Headline across seven columns.
- Lede and actions across four columns with one empty gutter column.
- Product aperture across ten columns.
- Proof rail across two columns.
- The next destination band is visible at the bottom of the first viewport.

The opening product surface shows one governed thread across quality, change
control, holds and release, and controlled documents. It replaces the current
four-tab selector.

### Homepage sequence

1. Cross-system claim and governed thread.
2. Start with what is slow: Solution / Product / Industry destination band.
3. The coordination mechanism: capture / coordinate / prove / write back.
4. Product family: one large active aperture with a compact product index.
5. Industry context: standards and high-stakes moments, expressed as rows.
6. Proof: attributed outcome and supporting metric.
7. Closing action.

Only one stage should dominate each chapter.

## DMS composition: L2

### Opening

Desktop:

- Product eyebrow and outcome across seven columns.
- Lede, actions, and current-state summary across four columns.
- One full-width document aperture.
- Document workspace occupies eight columns inside the aperture.
- Revision lifecycle occupies four columns inside the same surface.

The DMS opening does not repeat the homepage proof rail. Its right-hand rail is
temporal: Draft A → Review B → Approved C → Effective D, followed by training
completion.

### DMS sequence

1. Current document and lifecycle.
2. From draft to effective without losing the thread.
3. Change control beside the document, not in a separate system.
4. Training tied to the effective revision.
5. Review dates, ownership, and obsolete-state handling.
6. Audit proof from the same record.
7. Product-specific customer outcome and action.

## Responsive behavior

At less than 768 px:

- Four-column reading order.
- Heading → lede → actions → product aperture → proof/lifecycle rail.
- Product UI may simplify navigation chrome, but owner, state, evidence, date,
  and revision cannot be removed.
- Tables become stacked records.
- Proof rails become full-width sequences.
- Body remains at least 16 px.
- Form inputs remain at least 16 px to prevent iOS zoom.
- Interactive targets remain at least 44 × 44 px.
- Desktop asymmetry is not preserved if it damages reading order.

At 768–1023 px:

- Eight-column grid.
- The aperture spans all eight columns.
- The companion rail may sit below or use a 5/3 split when content remains
  legible at actual scale.

## Motion

- Interactive state: 150–180 ms.
- Chapter entrance: 320 ms maximum.
- Product-state story transition: 480 ms maximum.
- Easing: cubic-bezier(0.2, 0, 0, 1).
- Enter through opacity and no more than 12 px of vertical movement.
- Exit movement is smaller than enter movement.
- Do not animate on initial page load unless the entrance itself communicates
  the product story.
- Do not use parallax, floating screens, marquee text, ambient glow, or
  scroll-jacking.
- Reduced-motion mode sets movement and transition durations to zero.

## Content and product-image rules

- Headlines make one concrete claim.
- Support copy uses product nouns: record, revision, owner, approval, evidence,
  training, effective date, change, and completion.
- Every product aperture uses realistic IDs, states, owners, and timestamps.
- Every product image has a caption or surrounding copy that explains what it
  proves.
- Every metric includes a unit, timeframe, and source.
- Generated mockup copy is placeholder only. Production product surfaces must
  be rebuilt with real React components or approved captures.
- Avoid generic phrases such as seamless, unlock, reimagine, or powerful
  platform.

## What Aperture forbids

- centered hero composition;
- dark page-opening field;
- gradient headline text;
- full-cobalt product stage;
- browser traffic-light chrome;
- tabbed screenshot carousels in the first viewport;
- bento card walls;
- decorative dashboards;
- glass, glow, or 3D device perspective;
- floating document stacks;
- generic node clouds;
- stock 3D objects or stock photography;
- editorial ledger/newspaper styling;
- status shown by color alone.

## Accessibility checklist

- One h1 and sequential heading levels.
- Body text at least 16 px.
- Reading measure 60–70 characters.
- WCAG AA contrast for text and controls.
- 44 px mobile targets; at least 40 px desktop targets.
- Visible keyboard focus using cobalt and sufficient offset.
- State, error, and completion never rely on color alone.
- Reduced motion respected.
- Product records remain readable when zoomed to 200%.
- Logical inline properties are used for RTL resilience.

## Implementation order

1. Add IBM Plex Sans WOFF2 assets and map IBM Plex Sans / Inter with
   next/font/local.
2. Introduce the Aperture tokens behind a page-level theme class.
3. Build masthead, section open, action pair, product aperture, proof rail,
   lifecycle rail, destination band, and proof quote.
4. Recompose the homepage using the L1 structure while retaining approved copy.
5. Recompose DMS using the L2 document-and-lifecycle structure.
6. Replace generated product pixels with real React product surfaces.
7. Validate 390, 768, 1024, 1440, and 1728 px layouts.
8. Audit contrast, keyboard order, target sizes, zoom, and reduced motion.

## Artifacts

- [Aperture mood board](./aperture-moodboard/README.md)
- [Aperture tokens](./unifize-aperture.tokens.css)
