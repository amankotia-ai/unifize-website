---
name: Unifize marketing site
description: The live kit on its dark ground. Hairlines, square markers, one cobalt, IBM Plex Sans over Inter, mono only for measurement.
colors:
  cobalt: "#005bb7"
  cobalt-deep: "#004793"
  cobalt-tint: "#f0f6ff"
  cobalt-lifted: "#7f96eb"
  cobalt-focus: "#6f8cff"
  hero-turn: "oklch(0.76 0.05 270)"
  graphite: "#17191f"
  graphite-2: "#1c1f26"
  graphite-3: "#242832"
  footer-ground: "#101218"
  dark-hairline: "#30343d"
  dark-hairline-2: "#3a3f49"
  dark-ink: "#f7f8fa"
  dark-ink-2: "#b9bec8"
  dark-ink-3: "#8b929f"
  porcelain: "#ffffff"
  porcelain-alt: "#f5f6f8"
  porcelain-quiet: "#fafbfc"
  porcelain-sunk: "#eceef2"
  ink-2: "#3f4550"
  muted: "#606773"
  faint: "#69717d"
  hairline: "#dfe2e7"
  line-strong: "#cfd4dc"
typography:
  display:
    fontFamily: "IBM Plex Sans, Inter, system-ui, sans-serif"
    fontSize: "clamp(3rem, 5vw, 4.5rem)"
    fontWeight: 520
    lineHeight: 1
    letterSpacing: "-0.065em"
  headline:
    fontFamily: "IBM Plex Sans, Inter, system-ui, sans-serif"
    fontSize: "46px"
    fontWeight: 520
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "IBM Plex Sans, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.2rem + 1.3vw, 2.3rem)"
    fontWeight: 520
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  lede:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  button:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  none: "0"
  pill: "999px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "20px"
  s-6: "24px"
  s-8: "32px"
  s-10: "40px"
  s-12: "48px"
  s-16: "64px"
  s-20: "80px"
  gutter: "clamp(20px, 3.3vw, 56px)"
  section: "clamp(88px, 7.5vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.porcelain}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "11px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "11px 20px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.porcelain-alt}"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.dark-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "11px 20px"
    height: "44px"
  button-ghost-dark-hover:
    backgroundColor: "{colors.graphite-3}"
  button-sm:
    padding: "9px 17px"
    height: "38px"
  header:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.dark-ink}"
    height: "72px"
  list-row:
    backgroundColor: "transparent"
    textColor: "{colors.dark-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "13px 0"
  list-row-hover:
    textColor: "{colors.cobalt-lifted}"
  atlas-marker-plant:
    backgroundColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    size: "14px"
  atlas-marker-hub:
    backgroundColor: "{colors.cobalt}"
    rounded: "{rounded.none}"
    size: "16px"
  footer:
    backgroundColor: "{colors.footer-ground}"
    textColor: "{colors.dark-ink}"
    padding: "64px 0 32px"
---

# Design System: Unifize marketing site

## Overview

**Creative North Star: "The Site Survey"**

The marketing site is drawn, not decorated. Its surfaces read like a survey plate: a graphite ground, hairline graticules, square markers set to coordinate, place names in the same face as the copy, and the measurement itself (a latitude, a time zone, a column key) in monospace. One cobalt does all the pointing. The kit's dark bookends (hero, close, footer) frame porcelain working sections on every page, the About page included.

Density is editorial and wide: a 1560px container, a generous section rhythm (88 to 128px), headlines held to 18ch, copy held to 52 to 62ch, and one figure per surface that stays put while the story scrolls past it. Nothing floats. There are no glows, no blurs, no lifted cards, and a single popover shadow. State is shown by opacity, never by a change of colour.

The redesign layer supersedes the kit's first pass: the earlier Geist display face and 4px control radius are pinned out by the live layer (Inter and IBM Plex Sans with !important, pill controls) and are not part of this system.

**Key Characteristics:**
- Graphite bookends with porcelain working sections; a surface carried by one figure may run dark throughout
- IBM Plex Sans display at weight 520 with tight negative tracking; Inter body with tracking reset to normal
- JetBrains Mono only for measurement and metadata: coordinates, zone codes, footer column keys
- One cobalt (#005bb7) that speaks as its lifted tint (#7f96eb) on the dark ground for lines and hovers
- 1px hairlines do the structural work: section rules, list rows, graticules, header border
- Square frames and markers, pill controls, no radius in between
- Flat: tonal steps and hairlines for depth, opacity for state, one popover shadow in the whole system
- Motion is either a short 160ms ease-out or a slow 600ms settle on cubic-bezier(0.22, 1, 0.36, 1), and honours reduced motion

## Colors

A graphite ground with porcelain working surfaces and one cobalt; every other colour is a step of grey.

### Primary
- **Cobalt** (#005bb7): the primary button fill and the key marker in a figure (the lit hub squares and the hub-to-hub line on the plot). Solid cobalt appears on at most a button and a marker per screen; its rarity is what makes it point.
- **Cobalt deep** (#004793): the primary button's hover fill and nothing else.
- **Cobalt tint** (#f0f6ff): the soft field wash behind figures on porcelain sections (the platform page's field panels).
- **Cobalt lifted** (#7f96eb): cobalt's voice on the dark ground. Dashed coordination lines between the founders' plants, the time-zone code beside each hub, and the hover colour of hairline list rows. It is a lightened cobalt, not a second hue.
- **Cobalt focus** (#6f8cff): the 2px focus outline on every interactive element, offset 3px, on both grounds.
- **Hero turn** (oklch(0.76 0.05 270)): the second line of every hero headline. A desaturated lavender grey that turns the sentence without spending the accent.

The shipped kit resolves its primary to the Alloy 2026 blue/700 (#005bb7, `--u-primary` in globals.css). PRODUCT.md records the brand primary as #0052FF. This file records the build; reconcile in globals.css if the brand value is meant to win.

### Neutral
Dark ground:
- **Graphite** (#17191f): the ground of the hero, the close and every dark section. The same value is the ink on porcelain surfaces, so light and dark sections share one black.
- **Graphite 2** (#1c1f26): the first raised step on the dark ground (panels, sheets).
- **Graphite 3** (#242832): the second step; the ghost button's hover fill on dark.
- **Footer ground** (#101218): the shared footer, one step deeper than the kit's dark sections, so the page closes rather than continues.
- **Dark hairline** (#30343d): section rules, list rows, graticule meridians and parallels, the header's border once scrolled, the rule above a beat.
- **Dark hairline 2** (#3a3f49): the stronger rule. The equator on the plot and the ghost button's border on dark.
- **Dark ink** (#f7f8fa): headlines, place names, list rows, ghost button text on dark.
- **Dark ink 2** (#b9bec8): running copy and ledes on dark, the attribution under each plant, address lines.
- **Dark ink 3** (#8b929f): captions and coordinate labels; the quietest grey that still reads on graphite.

Porcelain surfaces:
- **Porcelain** (#ffffff): the working sections' ground and the primary button's text.
- **Porcelain alt** (#f5f6f8): alternating sections, the ghost button's hover fill on light, popover row hover.
- **Porcelain quiet** (#fafbfc): panel interiors.
- **Porcelain sunk** (#eceef2): recessed wells inside panels.
- **Ink 2** (#3f4550): running copy on light.
- **Muted** (#606773): ledes and secondary text on light.
- **Faint** (#69717d): the quietest text on light and the ghost button's hover border.
- **Hairline** (#dfe2e7): rules, borders and the header's border on light sections.
- **Line strong** (#cfd4dc): the ghost button's resting border on light.

### Named Rules
**The One Cobalt Rule.** One accent, two voices. Solid cobalt (#005bb7) fills the primary button and lights the key marker in a figure; on the dark ground cobalt speaks as its lifted tint (#7f96eb) for lines, zone codes and hover. No second hue, no gradient, no glow, and no status colour on a marketing surface.

**The Bookends Rule.** Hero, close and footer sit on graphite; the working sections between them are porcelain. A surface may run dark end to end only when one figure carries it; no current page does.

## Typography

**Display Font:** IBM Plex Sans (with Inter, system-ui)
**Body Font:** Inter (with ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

All three are self-hosted variable fonts wired through next/font/local (src/app/fonts), so the kit's intermediate weights (520, 650) are real instances, not synthesised.

**Character:** Plex Sans at 520 with tight negative tracking gives headlines an engineered, set-in-metal edge. Inter beneath it, with tracking reset to normal, reads as plain instruction. Mono appears only where something has been measured or filed, which is why it carries authority when it does.

### Hierarchy
- **Display** (520, clamp(3rem, 5vw, 4.5rem), 1): the hero headline. Centred, two lines, the second line in hero turn, tracking -0.065em, held to 1120px.
- **Headline** (520, 46px, 1.1): section headings (the kit's h2). Tracking -0.04em, held to 18ch (14ch in the close), text-wrap balance.
- **Title** (520, clamp(1.6rem, 1.2rem + 1.3vw, 2.3rem), 1.12): story beats and sub-section heads ("Where a failed audit has consequences."). Tracking -0.04em, held to 16ch, text-wrap balance. Headings at h3 and below take -0.025em.
- **Lede** (400, 15px in sections, clamp(1rem, 1.2vw, 1.18rem) in the hero, 1.6 to 1.65): the sentence under a heading. 62ch in sections, 48ch in the hero, 44ch in the close, text-wrap pretty.
- **Body** (400, 1rem, 1.65): running copy in dark ink 2 or ink 2, held to 52ch, text-wrap pretty, 14px between paragraphs.
- **Label** (520 to 600, 0.82 to 0.95rem): header links (0.86rem, 520), office city names (0.95rem, 600), place names on the plot (17 plot units, 600) with their attribution beneath (14 units, 500), captions (0.82rem, 400, dark ink 3).
- **Mono** (400, 13 plot units with 0.04em, or 0.6875rem uppercase with 0.08em in the footer): coordinates and zone codes on the plot, column keys in the footer.

### Named Rules
**The Measurement Mono Rule.** JetBrains Mono appears only where a value is measured or filed: graticule coordinates, time-zone codes, footer column keys. Never a heading, never running copy, never a label set above a headline.

**The Reset Tracking Rule.** The kit resets letter-spacing to normal on everything and reopens it only on headings (-0.04em; hero -0.065em; h3 and below -0.025em) and on mono (+0.04em on the plot, +0.08em in the footer). Body and labels are never tracked.

**The Sentence Case Rule.** Every heading, button and label is sentence case (binding, PRODUCT.md). Uppercase exists in one place: the footer's mono column keys.

**The No Em Dash Rule.** No em dashes anywhere in rendered copy (binding, PRODUCT.md). Turn a sentence with a period or a colon, and separate attributions with a middle dot (·), as the plot does with "Ben · Lakshman".

## Layout

The container is 1560px wide with a fluid gutter (clamp(20px, 3.3vw, 56px)); the shared footer keeps the older 1440px container with a 24 / 32 / 48px gutter stepping at 768px and 1280px. Sections carry clamp(88px, 7.5vw, 128px) of block padding and no minimum height. The hero adds clamp(148px, 10vw, 172px) above to clear the 72px sticky header and closes at clamp(64px, 5vw, 80px). Section boundaries are 1px hairlines, not bands of colour.

Composition is asymmetric two-column grids: figure at 1.45fr beside story at 0.55fr (gap clamp(40px, 6vw, 112px)); a statement at 0.9fr beside a list at 1.1fr; close copy at 1.2fr beside its actions at 0.8fr, aligned to the bottom edge. Lists (offices, industries) run in two equal columns 32px apart.

Spacing is on a 4px base (the kit's scale runs 4 through 80). The redesign layer writes literal values and allows 2px half steps inside components (10, 14, 18, 22px) for optical fit. The hero stack is 16px inside the headline group, 24px to the lede group, 18px from lede to actions, 10px between buttons.

The sticky figure: the plot sticks at header height plus 20px while the beats (min-height 72vh, 40px block padding, a hairline between them) scroll past and drive its state from the viewport's middle band (an IntersectionObserver with rootMargin -45% top and bottom). Above the first beat the figure rests in its first state.

Responsive steps, as observed: 1280px the footer gutter widens; 1100px the figure grid narrows to 1fr / 0.9fr with a 32px gap; 900px everything goes single column, the figure goes static above its story, and beat heights release; 820px the header nav collapses to a pill menu; 768px the footer gutter steps; 640px the plot goes compact (marker, stroke and label units grow so their on-screen size holds at the plot's ~0.37 scale, attributions and caption drop) and lists go single column.

**The Sticky Figure Rule.** One figure per surface. On desktop it stays put beside the story that drives it; under 900px it goes static above the story rather than covering it.

## Elevation & Depth

Flat. Depth is tonal on the dark ground (graphite, then graphite 2, then graphite 3) and hairline on both grounds; nothing is lifted. Buttons carry no shadow and no hover transform. The header has no backdrop blur; once scrolled it paints itself opaque in its section's ground with a hairline beneath. State is opacity, not colour: unlit hubs sit at 0.18, dimmed plants and links at 0.3, a beat outside the viewport band at 0.45.

### Shadow Vocabulary
- **Popover** (`box-shadow: 0 24px 60px rgba(23, 25, 31, 0.14)`): the header dropdown only, so it separates from the porcelain section beneath it. Nothing else in the system casts a shadow.

### Named Rules
**The Hairline Not Shadow Rule.** Structure is a 1px hairline (#30343d on dark, #dfe2e7 on light). The only shadow in the system belongs to the header popover.

**The Unlit Rule.** An inactive element keeps its colour and loses opacity (0.18 unlit, 0.3 dimmed, 0.45 resting). Never swap it to a grey, never remove it.

## Shapes

Square frames, pill controls, hairline lines. Panels, popovers, cards, header rows and the plot's markers are square (radius 0); buttons, the header's menu button and the mobile sheet's controls are fully rounded (999px). Nothing sits between those two.

On the plot, observed places are outline squares (14px, 1.75px dark ink stroke, graphite fill) and the hubs are filled cobalt squares (16px). Lines are 1px hairlines for the graticule, 1.25px dashed (3 on, 6 off) cobalt lifted for the coordination between plants, and 1.25px dashed (2 on, 6 off) cobalt between the hubs. Under 640px strokes double and dashes lengthen so they hold at the compact scale. Focus is a 2px cobalt focus outline offset 3px, never a ring shadow.

**The Square Frame, Pill Control Rule.** Anything that contains is square; anything you press is a pill.

## Components

### Buttons
A pill that does not move.
- **Shape:** fully rounded (999px), min height 44px, padding 11px 20px; the small variant is 38px, 9px 17px, 0.84rem.
- **Primary:** cobalt fill (#005bb7), porcelain text, Inter 600 at 0.92rem, line-height 1, a 1px transparent border so it aligns with the ghost.
- **Hover / Focus:** fill to cobalt deep (#004793); background, border and colour transition 160ms ease-out; no transform, no shadow. Focus is the 2px cobalt focus outline offset 3px.
- **Ghost:** transparent with a 1px line strong border and graphite text; hover fills porcelain alt and moves the border to faint. On the dark ground the border is dark hairline 2 and the text dark ink; hover fills graphite 3.
- **Pairing:** primary then ghost, 10px apart, wrapping on narrow screens.

### Navigation
- Sticky at the top, 72px tall, z-index 50. Transparent with a transparent hairline at the top of the page; once frosted it paints its section's ground (graphite with dark hairline on dark, porcelain with hairline on light) with no blur.
- Links in Inter 520 at 0.86rem, gap clamp(16px, 1.8vw, 28px). Dropdown popover is square with a hairline border and the system's one shadow; rows are square with a porcelain alt hover. Under 820px the nav collapses to a pill menu button.

### Hero
- A centred stack on graphite: the two-line display headline (second line in hero turn), the lede at 48ch, then the pill pair, at 16 / 24 / 18 / 10px. The kit's hero clips overflow.

### Hairline list rows
- **Style:** a 1px dark hairline above each row and a closing hairline under the last row of each column, 13px block padding, Inter 500 at 1rem in dark ink, no underline.
- **State:** hover to cobalt lifted over 180ms. Two columns 32px apart; single column under 640px with the closing rule moved to the last row.

### Story beats
- A column of sections, min-height 72vh, 40px block padding, a hairline between beats and none above the first; 18px from title to body, 14px between paragraphs. The beat in the viewport band is full opacity, the rest 0.45, settling over 500ms.
- Inside a beat a two-column definition list (the offices) opens with its own hairline and 18px top padding: the city in Inter 600 at 0.95rem dark ink, the address lines in dark ink 2 at 0.86rem, 20px between columns.

### Footer
- Footer ground (#101218), hairline top, 64px above and 32px below, five columns (1.3fr 1fr 2fr 1fr 1fr) 40px apart. Logo 26px, tagline 0.9375rem in dark ink 2 at 26ch, column keys in mono 0.6875rem uppercase 0.08em dark ink 3, links 10px apart.

### The atlas plot
The kit's signature figure: an equirectangular latitude and longitude plot (viewBox 1040 by 530; 150°W to 150°E, 65°N to the equator) drawn in the kit's linework. Dark hairline meridians every 30° and parallels at 60°, 30° and the equator (dark hairline 2); coordinates in mono at 13 units with 0.04em, dark ink 3, at the left edge. Observed places are outline squares labelled in Inter 600 at 17 units with an attribution beneath in Inter 500 at 14 units dark ink 2; hubs are filled cobalt squares labelled the same way with a zone code in cobalt lifted mono. Two data states drive opacity, "seen" (hubs at 0.18) and "built" (plants and links at 0.3), settling over 600ms on cubic-bezier(0.22, 1, 0.36, 1); reduced motion keeps the states and drops the transition. A caption in 0.82rem dark ink 3 sits under the plot and is hidden under 640px, where labels move above or below their markers and attributions drop. Every coordinate is a real place.

## Do's and Don'ts

### Do:
- **Do** open every section with the headline itself; the About page carries no label above any heading and its hierarchy holds.
- **Do** set headings in IBM Plex Sans at 520 with the kit's negative tracking (-0.04em; hero -0.065em) and keep body tracking at normal.
- **Do** use one cobalt: #005bb7 for the primary button and the key marker, #7f96eb for lines and hovers on the dark ground.
- **Do** structure with 1px hairlines (#30343d on dark, #dfe2e7 on light) and tonal steps; keep buttons shadowless and still.
- **Do** keep measures tight: headlines to 18ch, ledes to 62ch, body to 52ch, text-wrap balance on headings and pretty on copy.
- **Do** draw figures as linework in the kit's grammar (square markers, hairline grids, mono coordinates) and keep one figure per surface, sticky beside its story.
- **Do** show inactive state with opacity (0.18, 0.3, 0.45), settle it over 600ms on cubic-bezier(0.22, 1, 0.36, 1), and honour prefers-reduced-motion.
- **Do** write sentence case everywhere and turn a line with a period, a colon or a middle dot.

### Don't:
- **Don't** use an em dash anywhere: copy, labels, alt text, or code comments.
- **Don't** set headings, buttons or labels in title case or uppercase; the footer's mono column keys are the one uppercase register.
- **Don't** put JetBrains Mono on anything that is not a measurement or a filing key.
- **Don't** add a second hue, a gradient, a glow or a status colour to a marketing surface.
- **Don't** round a card, panel, popover or marker; only controls are pills.
- **Don't** lift on hover (translateY), blur the header, or add a shadow beyond the popover's.
- **Don't** reintroduce the superseded Geist display or the first pass's 4px control radius; the redesign layer replaces both.
- **Don't** stand in stock or generated photography for the founders, team or offices; none exists, and the kit draws places instead.
