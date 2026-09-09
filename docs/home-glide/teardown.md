# Glide homepage teardown (glideapps.com, captured 2026-09-08)

Purpose: source material for a Unifize homepage exploration "in the style of Glide, with our content".
Measured from the live DOM at 1440px. Imagery reviewed from the page's own asset URLs.

## 1. The system underneath the page

| Facet | Glide | Notes for us |
|---|---|---|
| Display type | "Booton" grotesk, weight 575, tracking -2%, line-height 1.0. H1 60px, H2 48px | We use IBM Plex Sans display / Geist per current tokens. Keep the 575-ish weight and -2% tracking; those carry the look more than the face |
| Quote type | "Affairs" serif, 400, 27px in cards, 36px pull quote | Serif only for human voices. Good rule to adopt |
| Body | 16px / 1.4, secondary text = 64% black | Same ratio works on DMS warm grey |
| Colour | Monochrome chrome. White, warm off-whites (#F1F0EA, #FBFBFB), dark bands (#0D0D0D, #1A1A1A). No brand colour anywhere in UI | All colour comes from photography (safety orange, hi-vis yellow, warm wood). Unifize blue would play the role of safety orange: one accent, mostly in imagery and the primary button |
| Shape | Everything is a pill (buttons 40px, chips 38px, tabs). Cards rounded-lg / 2xl | Conflicts with our locked square-corner rule. Translate: square cards, pill only for the sticky tab control if at all |
| Container | max 1536, inner columns 1200 and 1336 | Wider than our DMS container. The full-bleed stages need it |
| Rhythm | Sections py 80 / 96 / 128 across breakpoints. Split headers: H2 left (max 520px), paragraph + pill CTA right | Do NOT adopt. Split headers are banned in our design system (rejected outright in the DMS pilot). Stack instead: chip, headline, lede |
| Nav | 64px, transparent, 5 links, "Contact sales" white pill + "Get started" black pill | Same structure as ours. Two-CTA nav is fine |

Motion vocabulary: sticky segmented control that stays pinned under the nav while the hero scrolls; auto-cycling scenes with a progress ring on the active tab; auto-advancing accordion steps with a thin progress bar; drag carousels with duplicated items for looping; crossfading photographs; mono-to-colour logo swap on hover; in-view reveals. Nothing scroll-scrubbed, nothing 3D in the browser. All the "3D" is pre-rendered AVIF plus short AV1 clips.

## 2. Section by section

### 2.1 Hero (1498px tall)
- Centred H1 (2 lines) + one-sentence sub. No eyebrow.
- A floating prompt box ("Describe what you want to build…", "Upload spreadsheet", arrow submit) sits OVER the scene, not above it.
- The scene: a 3200px-wide pre-rendered cutaway elevation of a building on white. Tilt-shift render, small human figures in hi-vis, warm interior lights. One building per use case (construction site, warehouse with offices, event venue, etc.).
- Sticky segmented pill (Field Operations / Inventory / Events / Customer Portals / Internal Operations) with blur backdrop. Each tab swaps the building AND a dark product "panel" (row of app icons, then widgets: map, deliveries list, data tables, workflows, chats). Auto-cycles.
- Takeaway: Glide sells the physical business first and the software second. The product is a small crisp overlay on a world you recognise. Exactly the arcade-engine pattern we already run, but with a far stronger stage.

### 2.2 Logo band
- Mono logos, 64px tall, marquee. Each logo has a stacked colour twin that fades in on hover.
- We already have the live-site marquee. Add the hover swap.

### 2.3 "All your apps working together" (6-card drag rail)
- Split header + "Explore product" pill.
- Cards are tall (550:574), 35% of width, photo background from an industrial setting, ONE crisp UI artifact composited on top (avatar ring with lock badges; "Ask Glide" prompt; a notification toast; a template card; a stack of pills). Title + one sentence.
- This is our "homepage symptom visuals" rule (one precise mini-UI per card, no two alike) with photo texture behind it and a horizontal rail instead of a grid.

### 2.4 "From spreadsheet to apps you can trust" (auto stepper + stage)
- Left: three accordion steps (max 460px), each with a thin grey progress bar that fills then advances. Open step shows its paragraph, closed steps collapse (grid-rows 0fr/1fr trick).
- Right: a warm-grey rounded stage (#F1F0EA, 5:4) playing an AV1 clip per step with a WebP poster. The clips are the real builder (chat pane + spreadsheet).
- Maps to our mechanism section. Three steps driven by arcade poses instead of video.

### 2.5 "Apps in the office and in the field"
- Split header, then a full-bleed 1672:785 stage on #FBFBFB that lazy-loads a device composition (did not load in the hidden pane).
- Maps to shop floor + audit room: mobile record view beside desktop.

### 2.6 Integrations
- Centred H2, white pill chips with logos (Google Sheets, Excel, Airtable, QuickBooks, Salesforce, PostgreSQL, Snowflake, Slack, Notion, Asana) + "Explore Integrations".
- For us this is the coexistence story the quality-page panel said we lose. Only list systems we actually integrate with (verify in Notion Products DB before writing).

### 2.7 Security band (dark, 392px)
- #0D0D0D, white H2 left, four 173px badges (CCPA, SOC 2, GDPR, AES-256), "Explore Security" pill.
- Short dark interlude. Ours would be 21 CFR Part 11 / ISO 13485 / SOC 2 / GDPR, but only the ones we hold.

### 2.8 Templates fan
- Centred H2, staggered rows of 116px app icons (11 / 7 / 3 …) as a fanned marquee, "Explore the App Store".
- The template card artifact shows "+3K uses". We must not do that (no inventory counts rule).

### 2.9 Testimonials (photo cards)
- Split header with round prev/next buttons. Square 420px cards (active 520), photograph background with 25% black overlay, serif white quote, name + role. Drag rail, items duplicated for looping.
- Strong fit with our 50 real customer videos: video still as background, serif quote, click to play in the Wistia modal.

### 2.10 CEO pull quote
- Serif 36px centred, max 967px, 68px avatar, name + role. Needs a real founder quote or it is cut.

### 2.11 Pre-footer
- Full-bleed 1672:900 dark stage with four crossfading industrial photographs (construction, table, warehouse, textile). One giant line at 56px/575 split left/right on lg: "Drop your first spreadsheet" … "today." with the logo glyph inline.
- A zero-height sticky bottom-0 z-50 div suggests a sticky CTA dock that appears on scroll.
- Our close ("Bring the process that hurts most.") over crossfading regulated-industry photography.

### 2.12 Footer
- Rendered outside main and not captured. Not needed for the exploration.

## 3. What we take, what we leave

Take:
1. The cutaway facility hero with a sticky segmented control. One scene per industry (pharma fill-finish suite, medical-device cleanroom, chemical plant, cosmetics line, QC lab), product panel from the arcade engine.
2. Stacked section heads with Glide's restraint (no eyebrow noise, one sentence of lede).
3. Photo-textured artifact cards in a drag rail for the recognition section.
4. Auto-advancing stepper with progress bars for the mechanism.
5. Photo testimonial cards fed by the Website Customer Videos DB.
6. Crossfading photographic close with one giant line.
7. Monochrome chrome, colour only from imagery and one accent.
8. Serif reserved for human quotes.

Leave:
0. Split headers (banned in our system).
1. Pill everything (square corners are locked).
2. Usage counts ("+3K uses").
3. The AI-prompt hero input, unless it is honestly wired to the demo intake. It implies a builder we do not sell.
4. The template store fan (we have four governed records, not a marketplace).
5. Fabricated founder quote.

## 4. Open items before building
- Cutaway scenes: Glide's are custom 3D renders. Options: generated renders in the same white-background elevation look, or Blender (MCP available). Five scenes minimum.
- Integration roster: verify in Notion before listing.
- Security badges: verify which certifications Unifize holds.
- Founder quote: ask Raj or Ben for a real one.

Reference imagery downloaded for review lives in the session scratchpad, not the repo (Glide's assets are theirs).

## 5. Hero visuals: how the maquettes are made (Sep 8, round three)

Two code-drawn attempts (SVG cutaway elevations, then SVG site plans) were rejected on quality. Glide's hero works because it is rendered, so the world is now a real 3D cutaway maquette rendered headless in Blender 5.1 with Cycles on the Metal GPU:

```bash
/Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/facility-render/build.py -- pharma out.png --preview
```

- Scenes are data in `build.py` (blocks of floors of rooms plus props). A kit builds the equipment: racks, tablet press, fluid bed, coating pan, conveyors, tanks, reactors, benches, fume hoods, biosafety cabinets, stability chambers, moulding machines, laminar hoods, sterilisers, AHUs, silos, stair tower, docks, pallets, fence.
- People are 1.7 m figures in gowns, lab coats, hi-vis, coveralls or suits. Lit rooms carry a warm or cool area light plus an emissive ceiling panel. Glass fronts on offices. Corrugated cladding via a wave bump.
- Camera is a long lens from the street, slightly above, on a transparent film with a shadow catcher, AgX medium-high contrast. The page composites on white.
- Each render writes a sidecar JSON with the projected pin and department anchors (0..1). `maquettes.ts` imports them and `RecordOverlay` draws the connectors over the render.
- Preview: 1600x500 at 48 samples (about 90 s). Final: 2400x750 at 112 samples.
