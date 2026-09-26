# Direction: coordination tax cell film

Scene: `scripts/product-films/ctax-cell/film.html` (one film, no product UI)
Work folder: `~/Downloads/product-films/ctax-cell/` (boards, frames, cuts)
Page: `/platform` 01, the tax cell (`.pf-taxlead__fig` in
`src/app/explorations/platform/platform-evidence.tsx`), the grey cell that
holds the 75-step waffle today

## The film

| Decision | Choice | Source | Date |
|---|---|---|---|
| Where it lives | In the tax cell on /platform 01, in place of the static waffle. Its first and last frame IS today's figure (head, 15 x 5 grid, legend), so the page looks unchanged at rest | person | 2026-09-27 |
| Length | 10 s max | person | 2026-09-27 |
| Product UI | None. Only the figure's own vocabulary: square cells, grey = the work, tax orange (`--u-tax`) = the coordination tax, the head label and the legend | person | 2026-09-27 |
| On-screen text | Numbers and labels only (head label, legend, kind labels with counts); no step names, no captions | person | 2026-09-27 |
| Ending | Problem only: resolve on 54 of 75; no blue, no answer (section 02 answers it). Was a loop; since v2 it plays ONCE (first time in view) and a small replay button appears under the bottom-right square | person | 2026-09-27 |
| Frame rate | 60 fps (v2, "make sure the animations are smoother") | person | 2026-09-27 |
| On the page | Tax cell on /platform 01 from 1200px with motion allowed (below that the film's type drops under 10px); tablets, phones and reduced motion keep the static figure. The video is the content box (620 x 300, head + grid + legend), the cell's padding stays page CSS. `tax-cell-film.tsx`, CSS in platform-rails.css, files `public/explorations/platform/tax-film-v<N>.mp4` + poster (immutable cache, next.config.ts) | default (person asked to ship) | 2026-09-27 |
| Camera | None; the frame is the cell. Flat frames go straight to the encoder (still-frame pipeline) | default | 2026-09-27 |
| Frame | 706 x 380 CSS px, the cell at a 1440 viewport (padding 40 / 43.2, cells 35.7 on a 6 px gap, Inter with cv11 ss01 ss03, colours computed off the live page) | default (measured) | 2026-09-27 |
| Review cadence | Captioned storyboard first, then the video | person | 2026-09-27 |

## Source (Notion)

- The Problem / Coordination Tax (PBD-1, Ben Merton, v2.1): the tax is the
  coordination labour around the work (status chasing, scheduling, summaries,
  re-keying between systems, evidence moving, reopen handling) plus the queue
  time it induces; execution labour (investigate, contain, decide, verify) is
  not tax.
- The Value Model / Reference Value Streams / VS-2 "Non-Conformance,
  Detection to CAPA Closure" (Draft, modelled): 75 steps in 8 stages, 21 VA
  and 54 NVA in the step table, each NVA step tagged with primitives.
- Kinds are grouped from each NVA step's primitive tags (first tag), folded
  into the section lede's words:
  - Chasing and waiting (L latency + G gates): 13
  - Meetings, rebuilding context (M + C): 13
  - Notifying, handing off (H): 11
  - Writing it up, redoing it (E evidence + Re rework): 10
  - Re-keying between systems (Sys + T tracker): 7
  The grouping is ours, not a Notion field; the counts are exact from the
  VS-2 step table. Notion flags a one-step drift (53/22 on the step rows vs
  54/21 on the summary); the step table in the page body gives 21/54 and
  matches the site.

## Story (one takeaway per beat)

| # | Beat | Time | What moves | What lands |
|---|---|---|---|---|
| 1 | The figure | 0.0 to 0.8 | nothing (poster) | today's 54 of 75 |
| 2 | In order | 0.8 to 3.4 (held 1.4 s) | every cell flips where it stands, in a wave from the first step to the last, and shows its real step's colour in VS-2's sequence | the work is scattered through the tax; head "The same 75 steps, in the order they happen" |
| 3 | By kind | 3.4 to 8.5 (held 3.4 s with every label in) | the work steps fade; the 54 tax cells regroup into five rows | five labels with counts: 13, 13, 11, 10, 7; head "The 54 coordination steps, by kind" |
| 4 | 54 of 75 | 8.5 to 10.0 (settled 9.85) | the rows pour back into the grid, the work returns to the front | today's figure; the video ends on it and the replay button appears |

## Rules from feedback

- 2026-09-27: the in-order beat is a flip wave (each cell turns over where it stands), not a shuffle: moving 75 cells to new slots crossed paths and read as a pile-up on the board.
- 2026-09-27: kind labels and counts land only once their row is full, so no cell flies over text.
- 2026-09-27 (person): do not loop; play once, then a small replay button under the rightmost bottom square.
- 2026-09-27 (person): higher frame rate and a little more time in each state; the dead end hold of the loop went into the states, total stays 10 s.
- 2026-09-27: on the way back the bottom row pours first and the tax stays above the work, so rows never cross and the work fades in clean.

## Render log

| Version | Frames | Encoded | Notes |
|---|---|---|---|
| v1 | 300 frames at 3x (2118 x 1140), 10.0 s, storyboard approved as boarded (27 Sep) | CRF 22: 0.63 MB (CRF 18: 0.77 MB, +0.1 dB only). PSNR 34 to 37 dB: the loss is 4:2:0 chroma on hard orange/grey edges (about 1% of pixels), not quantisation; flat colours decode exact (tax 243 111 11) | `~/Downloads/product-films/ctax-cell/cuts/ctax-cell-v1.mp4` (cell with padding, never shipped). Page cut `tax-film-v1.mp4` (620 x 300 content box at 3x, 0.61 MB) shipped to /platform, then superseded |
| v2 | 600 frames at 60 fps, 3x content box (1860 x 900), 10.0 s, retimed holds | CRF 22: 0.73 MB, 33 to 39 dB (same edge-chroma limit as v1) | `public/explorations/platform/tax-film-v2.mp4` + poster, live on /platform (dev), plays once + replay; v1 files kept until sign-off |
