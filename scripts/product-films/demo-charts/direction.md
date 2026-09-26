# Direction: Book-a-demo chart films

Scene: `scripts/product-films/demo-charts/film.py` (Blender, Cycles) on `kit.py`;
`post.py` joins the two passes, `wash.py` composites boards/review cuts over the
modal's wash. Beats: `beats/storyboard.json`.
Work folder: `~/Downloads/product-films/demo-charts/` (fonts, boards, animatic, frames, cuts)
Page: the Book-a-demo modal's left pane (`src/components/organisms/book-demo.tsx`,
`.uzd__viz`), replacing the arcade record window.

## The film

| Decision | Choice | Source | Date |
|---|---|---|---|
| Where it lives | Book-a-demo modal, left pane, in place of the product UI (ArcadeStepScene). The pane's wash (gradient + hatch bands + grain) stays live CSS | person | 2026-09-27 |
| What it is | Three 8 s chart animations that reveal and morph, one Unifize benefit each, played one after another | person | 2026-09-27 |
| Tool | Blender: marks are real geometry a few mm proud of the ground, soft contact shadows, square-on orthographic camera | person ("use blender") | 2026-09-27 |
| Stats | Three published customer results, one per promise in Positioning Strategy v3.11 ("shorter cycle times, cleaner audits, proof as a byproduct"; "outcomes are measured, not claimed"): Will-Burt NCR closure 4 to 5 weeks -> 7.2 days (75% faster); Applechem approvals 3 to 8 months -> about 2 weeks; ATS Scientific internal audit prep weeks -> under 30 minutes. All from the unifize.com case studies (`src/content/webflow/export/case-studies.json`) | person picked the recommended option | 2026-09-27 |
| Look | Flat marks, square on, transparent background so the charts sit on the gradient (no card, no plate). Frosted tracks = white at 62%; rust = before (tax); rust tint = the "up to" part of a range; blue = with Unifize | person ("Flat but with transparent bg so it sits on the gradient bg") | 2026-09-27 |
| Sequence | One 24 s loop: 1 -> 2 -> 3 -> 1, each chart morphing into the next (35 pieces: calendar of days -> strip of weeks -> bent into a one-hour clock -> back to the calendar); frame 24.0 = frame 0.0 | person picked the recommended option | 2026-09-27 |
| Attribution | One small source line per chart: "<Company> · published case study" | person picked the recommended option | 2026-09-27 |
| Frame | 720 x 600 design px, rendered at 2x (1440 x 1200), transparent | default | 2026-09-27 |
| Camera | None (still, orthographic): the video's edges are invisible on the wash, so a push would clip content at an invisible edge | default | 2026-09-27 |
| Delivery | Alpha video: VP9 WebM (Chrome, Firefox, Edge) + HEVC with alpha .mov (Safari), picked in JS; both tested compositing over the gradient (27 Sep) | default | 2026-09-27 |
| Review cadence | Storyboard first (captioned sheet + low-res animatic), then the final render | person | 2026-09-27 |

## Story (global time)

| # | Chapter | Chart | Before (rust) | After (blue) | Morph out |
|---|---|---|---|---|---|
| 1 | 0 to 8 s, NCR closure time | 7 x 5 calendar, 1 square = 1 day, week labels | 28 days solid + week 5 in tint: "4 to 5 weeks" | drains back to week 1 + a fifth of day 8: "7.2 days", "75% faster" counts up | squares stream into one row |
| 2 | 8 to 16 s, Approval cycle time | 35-week strip under a 0 to 8 months axis | 13 weeks solid + tint to 8 months: "3 to 8 months" | drains to the first 2 weeks: "About 2 weeks" | strip stays |
| 3 | 16 to 24 s, Internal audit prep | same strip, then bent into a one-hour clock (1 lap = 1 hour) | 2 weeks solid fading into tint: "Weeks" (no fixed end, the source gives none) | rust fades, blue arc sweeps from 12 to just short of 30: "Under 30 minutes" | arc retracts, ring breaks into the calendar |

## Rules from feedback and craft

- 2026-09-27: a result turns blue by a blue fill wiping over the rust, never by mixing colours (rust to blue passes through a muddy purple).
- 2026-09-27: the "up to" part of a range is an opaque tint (#f7b587), not rust at low opacity (translucent rust over its own shadow went brown).
- 2026-09-27: translucent tracks render in their own pass without the shadow catcher (a translucent surface over a catcher renders as shadow) and one face thick (a slab stacks two faces); post.py lays marks over tracks.
- 2026-09-27: shadows stay subtle (lift 1.6 mm, world 0.9 + sun 0.1): 3 mm read as a dark halo on the wash (no glow, no heavy drop shadows).
- Never invent a number: "weeks" (ATS) has no end on the chart; "under 30 minutes" stops short of the 30 tick; "about 2 weeks" = 2 squares.

## Render log

| Version | What | Notes |
|---|---|---|
| boards v1 | 16 frames at 1x | grey tracks (catcher), black ring piece (coplanar with catcher): fixed |
| storyboard v2 | 15 frames at 2x, 96 samples adaptive | `boards/storyboard-v2.jpg`; about 5 s a frame (marks 4.5 s, tracks 0.4 s) |
| animatic v1 | 24 s at 30 fps, 1x, 32 samples, on the wash | `cuts/animatic-v1.mp4` |

## 27 Sep, later: film parked, live static charts shipped

The person stopped the video ("let's not make a video") and asked for three
static frames. After two colour passes ("hate the colors", "hard to
understand", then "the mix of colors is killing me, looks like a child is
doing the work"):

- Form: before vs after horizontal bars, one form for all three frames
  (person picked). The calendar / week strip / clock metaphors were too hard
  to read.
- Colour: ONE accent. Before = neutral slate #9aa3b2 (range end striped in
  the same slate), with Unifize = brand blue #0052ff, the gain phrase in the
  same blue. Orange + blue + green together was rejected outright.
- Built as live markup, not renders: `src/components/organisms/book-demo-charts.tsx`
  + the `.uzd-ch` block in `book-demo.css`; frames crossfade, 5 s each,
  tops aligned; reduced motion holds frame 1.
- The Blender scene here (film.py, kit.py, post.py, wash.py) is parked; its
  palette was switched to vibrant orange/green/blue mid-pass and never used.
- Then "the worst charts I have seen": dataviz skill loaded, three spec-built
  directions mocked (`mocks.html`, rendered with `shot.mjs`); the person
  picked B (one bar = the before at its low end, brand-blue fill = with
  Unifize, bracket over the removed time, hero figure, white card on the
  wash). Blue = the brand token `--u-primary` (#005bb7), not #0052ff.
- "More personality": three card treatments mocked (`mocks2.html`); the
  person picked the drafted engineering sheet (crosshair corners, mono head
  and foot on dashed rules, big numeral, hatched removed time, ruler, square
  markers, customer logo). Checked in the modal headlessly with
  `modal_shot.mjs` (Browser pane hidden).
