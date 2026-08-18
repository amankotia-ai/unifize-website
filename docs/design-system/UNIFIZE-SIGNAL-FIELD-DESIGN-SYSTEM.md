# Unifize Signal Field design system

Status: directional proposal  
Scope: marketing homepage and product pages  
Typography: IBM Plex Sans headings, Inter body and interface  
Core idea: **scattered signals resolve into governed proof**

## Direction

Signal Field replaces the earlier generic SaaS grammar with a campaign-led
system built from three elements:

1. one dominant typographic statement;
2. one atmospheric color field;
3. one grounded product surface.

The page should feel designed before it feels populated.

## Reference synthesis

| Reference | Principle carried into Signal Field |
| --- | --- |
| [Interfere](https://interfere.com/) | Near-black field, extreme type scale, one expressive typographic disruption, and color concentrated at the horizon |
| [Mixpanel](https://mixpanel.com/home/) | Simple headline composition and broad architectural color bands |
| [Teamwork Graph](https://teamworkgraph.com/) | Brand idea embedded directly into lettering instead of explained through cards |
| [Ona](https://ona.com/) | Atmospheric field, editorial hero, and one product capture grounded into the bottom edge |

These are structural and art-direction references. Signal Field must not copy
their marks, layouts, typefaces, illustrations, or color recipes.

## What changed

| Before | After |
| --- | --- |
| Generic light split hero | Full-field campaign composition |
| Detached product card | Product surface grounded into the lower edge |
| Empty whitespace with no visual tension | Atmospheric color provides depth and direction |
| Small headline plus many explanatory elements | One oversized statement does most of the work |
| Multiple metric, status, and proof components | One representative product story |
| Design-system labels visible inside mood boards | The page itself demonstrates the system |
| Cobalt used as button and card decoration | Cobalt behaves as signal, focus, and horizon light |

## Typography

### Families

- IBM Plex Sans: every marketing headline and section heading.
- Inter: navigation, body, actions, captions, and product UI.
- No required third typeface.

### Display behavior

- Homepage display: 88–144 px desktop, 52–72 px mobile.
- Product display: 72–112 px desktop, 48–64 px mobile.
- Display line-height: 0.92–0.98.
- Display tracking: -0.045em to -0.025em.
- Body: 16–20 px with 1.5–1.6 line-height.
- Maximum support-copy measure: 58ch.

### Expressive type

One phrase per flagship page may use a signal-resolution treatment:

- start with the same IBM Plex Sans glyphs;
- disrupt through scanlines, dots, or horizontal sampling;
- resolve back to a crisp outline;
- preserve full legibility;
- never apply the effect to more than 35% of a headline;
- do not combine it with gradient-filled text.

This is a brand device, not a heading style for every page.

## Field modes

### Signal Black

Used for the homepage and high-level platform storytelling.

- Near-black full-bleed canvas.
- Warm-white headline.
- Cobalt-to-violet signal concentrated below the copy.
- A small oxide glow may balance the far edge.
- Product surface is dark and enters from the bottom.

### Signal Paper

Used for DMS and detail-oriented product stories.

- Warm mineral-white full-bleed canvas.
- Near-black headline.
- Broad translucent bands of ice blue, pale cobalt, muted violet, and light
  rose begin behind the product stage.
- Product surface is white and enters from the bottom.

The two modes share typography, spatial rules, navigation, and product framing.

## Color roles

| Role | Direction |
| --- | --- |
| Signal black | Near-black neutral, not blue-black |
| Signal paper | Warm mineral white with very light grain |
| Primary ink | Warm white on black; near-black on paper |
| Cobalt | Brand signal, primary link, active state |
| Violet | Atmospheric transition only |
| Oxide | Small balancing horizon accent |
| Ice blue | Light-field depth |
| Rose | Light-field warmth |
| Effective green | Product status only |

Atmospheric colors must never reduce text contrast. They sit behind the product
stage or in empty space, not behind reading copy.

## Layout

### Desktop

- 12-column grid.
- Maximum content width: 1520 px.
- Outer margin: 64–96 px.
- Navigation height: 88–104 px.
- Hero headline spans 9–12 columns.
- Product stage spans 10–11 columns and is centered.
- Product stage begins in the lower third and is cropped by the viewport.

### Mobile

- Four-column grid.
- Outer margin: 20–24 px.
- Headline occupies the full width.
- Atmospheric field starts below the headline.
- Product stage begins after the actions and remains full-width.
- Do not shrink a desktop product screenshot until it becomes unreadable;
  recompose it around the one workflow being shown.

## Masthead

- Transparent within the field.
- Logo left.
- Four navigation destinations maximum.
- One text action at the right.
- No pill container around the masthead.
- No visible rule unless the page has scrolled.
- Link contrast stays quiet relative to the headline.

## Hero composition

The required sequence is:

1. masthead;
2. headline;
3. one support sentence;
4. one primary text action and one secondary text action;
5. one grounded product stage.

Do not add badges, review scores, tab switchers, trust logos, metrics, principle
rows, or route cards to the first viewport.

## Product stage

The product stage is an edge, not a floating card.

- It enters from or is cropped by the bottom of the viewport.
- It spans most of the page width.
- It may use a 12–18 px radius, but the lower corners can remain outside the
  frame.
- It has no browser traffic lights.
- It has no perspective transform.
- Surrounding atmosphere visually connects the stage to the page.
- One workflow is legible without zooming.
- Product navigation is reduced to the minimum required for orientation.

### Homepage stage

Show one cross-system thread:

- event;
- decision;
- approval;
- proven outcome.

The stage may name owners, but it should not display a dashboard of unrelated
metrics.

### DMS stage

Show one controlled document:

- document title and ID;
- current revision;
- concise revision path;
- document content;
- effective state.

Avoid a table-first hero, side-navigation-heavy app, or detached lifecycle card.

## Section rhythm

Below the first viewport, alternate:

1. large typographic claim;
2. full-width product crop or atmospheric illustration;
3. concise explanation and text link.

Do not repeat the same card grid in every section. A page may use one dense
product section only when the content genuinely requires it.

## Density limits

- One headline per viewport.
- One product visual per viewport.
- No more than two actions beside a headline.
- No more than 55 marketing words above the product stage.
- No more than five visible product states in a marketing crop.
- No standalone metric rail.
- No component should exist solely to fill whitespace.

## Surfaces

- Field canvas: no border or shadow.
- Product stage: one subtle neutral ring and one broad soft shadow.
- Overlays: allowed only for real interaction.
- Marketing cards: exceptional, not default.
- Images use a pure-black 10% inset outline in light mode and pure-white 10% in
  dark mode.

## Motion

- Atmospheric field may drift no more than 2% over 12–18 seconds.
- Headline resolution effect runs once and settles within 700 ms.
- Product stage enters by 16 px and opacity, maximum 500 ms.
- Interactive transitions use 160–200 ms.
- No parallax, cursor-following glow, perpetual text distortion, or
  scroll-jacking.
- Reduced-motion mode removes drift and resolves text immediately.

## Content

- Headlines are direct and short.
- The visual treatment carries mood; copy carries meaning.
- Use product nouns: event, decision, owner, revision, approval, effective,
  evidence, proof.
- Avoid generic SaaS claims and abstract AI language.
- Generated product copy is placeholder only; live implementation uses real
  product components or approved captures.

## Forbidden patterns

- white split hero with a floating card;
- generic centered SaaS dashboard;
- bento feature grid in the opening;
- tabbed screenshot carousel;
- pill navigation container;
- multiple floating UI fragments;
- gradient-filled headline text;
- glassmorphism;
- decorative node network;
- 3D device perspective;
- stock 3D objects;
- atmospheric glow behind body copy;
- mixing serif or pixel fonts into the required IBM Plex Sans heading system.

## Mood board

- [Signal Field homepage and DMS boards](./signal-field-moodboard/README.md)
