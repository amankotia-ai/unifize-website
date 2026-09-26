# Product film prompt system

How to make (and re-make) films like the v3 platform hero: a real-looking
Unifize app window, filmed square on, where each rail step is **performed**
in the UI (typed, clicked, dragged, signed, counted up) instead of lifted
off it, in one continuous take that loops with no cut.

Use this for any page that wants the same treatment (a product page's
hero, a solution page's journey, an industry story). Part A is the style
bible: the rules that make it look like this film. Part B is the prompts,
one per stage, to paste into a Claude Code session. Part C is the pipeline,
Part D the mistakes already made once, Part E the platform film as the
worked example.

In Claude Code this whole system is packaged as the **`product-film`
skill** (`.claude/skills/product-film/`): it asks for direction when a new
film starts, carries the film UI as a CSS kit with reference images, the
film motion as a JS kit with reference clips and a camera chart, and
bundles the render, check and encode helpers. This document stays the
human-readable version of the same rules.

The reference implementation lives in `scripts/platform-render/v3/`:
`film.html` (the scene), `frames.mjs`, `film_step.py`, `post_v3.py`,
`join.py`, `overview_blend.py`, `view_in_blender.py`. The shipped film is
`public/explorations/platform/hero-film-v3-hq.mp4`, wired through
`src/app/explorations/platform/hero-film-assets.ts` and
`platform-hero-film.tsx`.

---

## Part A. Style bible

### A1. The film

| Property | Value |
|---|---|
| Aspect | 20:9 (the hero film box). Render 2560 x 1152. |
| Frame rate | 30 fps |
| Length | 5 to 6.5 s per step. Six steps came to 34.6 s. |
| Ground | `#1f2126`, the hero charcoal, exact (unlit world, Standard view transform) |
| Window | Light-mode app window, 1360 x 660 window px, square outer corners |
| Take | One continuous take. Each step starts on the previous step's last frame. The last step ends on the first frame, so the loop has no cut. |
| Edges | The page masks the video into the charcoal (14% fade left/right, 15% top/bottom). Keep the action inside the middle 72% x 70% of the frame. |
| Finish | Soft glow from the window onto the charcoal only; fine film grain laid over the video in CSS (not baked in). |

### A2. Camera

- **Flat and square on.** No tilt, no orbit, no perspective tricks. The
  only moves are dolly (in and out) and pan. Zoom is the dolly, never a
  lens change.
- **Keys, not tweens.** Each step has 5 to 10 camera keys `{t, cx, cy, vw}`:
  `cx, cy` is the window point at frame centre, `vw` is how many window px
  span the frame width (2150 = the whole window with margin; 820 = very
  close). Interpolate with a monotone cubic through `cx`, `cy` and
  `log(vw)`, so moves never overshoot and zoom feels even.
- **Useful framings** (window 1360 x 660): whole window `vw 2150`; whole
  view read comfortably `vw 1700 to 1960`; a panel `vw 1100 to 1300`; a
  field or a row being worked `vw 820 to 1060`.
- **Rest on the step's key action.** The camera must be still (or barely
  creeping) while the step's main interaction happens: the drag, the
  typing, the click that matters, the reveal of a whole view. A move
  through the key moment blurs the one frame that carries the claim.
- **Give reveals 0.4 s or more.** When a new view appears (the whole
  conversation view, the builder), hold a wide framing long enough to read
  it before pushing in.
- **Each step ends at rest** on its last key, so a rail click seeks to a
  still frame and steps join invisibly.
- **Last step ends on step 1's first key**, for the loop.
- **Motion blur** is real camera blur (180 degree shutter). It is welcome
  on fast pushes between beats, never on the beat itself.

### A3. The window and its UI

The window is a stylized but product-true Unifize app. Everything in it is
real content: no skeleton lines, no lorem, no placeholder bars.

- **Type:** Inter for UI, IBM Plex Sans for titles, JetBrains Mono for IDs,
  counts, times and small labels. Load the repo's own woff2 files from
  `src/app/fonts/`.
- **Colour:** ink `#17191f`, muted `#646b78`, faint `#8b93a0`, hairlines
  `#e8ebf0` / `#dfe4ea`, blue `#005bb7` (hover `#004793`, tints
  `#f0f6ff`, `#deecff`, `#c5deff`). Status pills: blue (Open), amber (In
  review), violet (Awaiting approval), grey (Draft), green (Signed,
  Published, live). Blue is the product's action colour; do not decorate
  with it.
- **Shapes:** window square; cards and inputs 5 to 7 px radius; status
  chips are small pills; avatars are gradient circles with initials.
- **Sidebar (56 px, dark `#1d232d`):** U logo, Home, Inbox, Dashboards,
  Processes, People; settings and the signed-in avatar at the bottom. The
  active item is a blue tile. Moving between screens moves the active tile.
- **Screens used so far:** home (queues + overview chart + updates), record
  drawer, conversation view (inbox list | thread | checklist), Part 11
  signature dialog, process builder (field list + palette + field
  settings), dashboard (KPIs, month chart, stage bars, records table).
  Reuse them before inventing new ones.
- **One world.** Keep the fictional dataset consistent across a film (see
  A6). Records, people, times and counts must agree from step to step.

### A4. Interaction grammar

Every step is made of these moves. Durations are the ones that read well
at hero size; keep them.

| Move | How it behaves | Timing |
|---|---|---|
| Pointer | macOS arrow, 22 x 30 window px, black with white outline, soft drop shadow. Travels on a gentle arc (quadratic Bezier with 20 to 120 px lift), eased in and out. | 0.3 to 0.9 s per move |
| Hover | Every click is preceded by a visible hover: tint, ring, or a button appearing. | 0.15 to 0.25 s before the click |
| Click | Pointer scales to 0.9, the target darkens and gives 4%, optional thin ring ripple from the tip. | press 0.08 s, release 0.12 s |
| Leave after a click | If the next screen puts something under the pointer (e.g. a Publish button), flick away straight after the click with an ease-out. | starts 0.08 s after the click |
| Typing | Characters appear at a human, seeded rhythm: 13 to 33 ms per character, plus 10 to 12 ms at spaces and 50 to 60 ms at full stops. The pointer hides while typing and comes back when moved. Caret blinks at 2.2 Hz when idle, solid while typing. | 1.0 to 1.3 s for about 50 characters |
| Password | Dots at 35 to 65 ms each, 11 of them. | about 0.6 s |
| Menus and dropdowns | Fade and drop 4 px; the chosen option gets a hover tint, then a filled radio; the menu closes as the value appears. | open 0.16 s, close 0.12 s |
| Buttons with work behind them | Three states: idle, busy (spinner, "Signing" / "Publishing"), done (green, check, past tense). | busy 0.35 to 0.4 s |
| Checkbox tick | Box fills blue with a slight overshoot (scale up to 1.18 and back), then the check draws on. | 0.3 s |
| Counters | Numbers roll or count up from zero with ease-out. | 0.3 to 0.8 s |
| Bars and progress | Bars grow from the baseline one after another; progress bars widen when an item completes. | 0.55 s each, 70 to 80 ms stagger |
| A new row or message arrives | The list opens a slot first (height), then the row fades and settles 5 to 10 px; a soft highlight flashes and decays. Lists below slide down. Threads anchor to the bottom and scroll up. | slot 0.3 to 0.45 s, row 0.35 s, flash decays over 1 s |
| Someone else's work lands | A live update from a colleague: their avatar gets a coloured ring pulse, the row flashes, the tick and note land without the pointer. This is how "data lands as the work happens" reads. | 0.3 s, flash decays 1 to 1.5 s |
| Drag and drop | Source tile highlights; a ghost copy rides under the pointer, tilted 2 degrees, with a lifted shadow; a drop line with a dot appears; the list opens a slot; on release the ghost settles into the new row. | drag 0.6 to 0.7 s |
| Page change | Quick crossfade with a 10 to 12 px rise; the sidebar's active tile moves at the same time. | 0.25 s |
| Panel swap (same page) | Old panel fades out 14 px left, new one in from 14 px right. | 0.35 s |
| Drawer / dialog | Drawer slides in from the right over a light scrim; dialog fades in with scale 0.965 to 1 over a darker scrim. | 0.3 to 0.6 s |

### A5. Anatomy of a step

Each step is one claim from the page's rail copy, proved by doing it.

1. **Entry** (0 to 0.6 s). Starts on the previous step's last frame, pixel
   for pixel. Usually the pointer is already on the thing the step begins
   with (the hand-off from the step before) and clicks it.
2. **Change of place, if any** (0.2 to 1.3 s). A page change, a drawer
   growing into a full view, a dialog opening. Camera pulls out to show
   the new view whole and **rests** there.
3. **The work** (2 to 4 beats). Performed interactions from A4: type,
   choose, drag, tick, sign, count. The camera frames each one and holds
   still on the one that carries the claim.
4. **The proof** (0.5 to 1 s). The result lands where the viewer can see
   it matters: a count moves (2 of 9 to 3 of 9), a pill turns Signed, a
   version goes live, a row carries the new state.
5. **Hand-off** (0.6 to 1.2 s). The camera and pointer move to the
   element the **next** step starts with and come to rest there, hovering
   it. The last step hands off to the first frame of step 1 instead.

Budget 5 to 6.5 s. If a step needs more, cut a beat; do not speed the
beats up.

### A6. Story and data rules

- **One record through the whole film.** The platform film follows change
  control CC-2148 (torque spec update, housing assembly) raised from
  NC-204. Every step touches that record.
- **Carry state forward.** What happened in step N is visible in step N+1:
  the signature from step 4 is in the dashboard row in step 6; the thread
  keeps its earlier messages; counts only go one way.
- **The platform film's world:** company Engineering Industries; D. Fontaine
  (Quality, owner, signed-in user), S. Okafor (Engineering), M. Kerr
  (Production), R. Patel (Document control), A. Chen (Supplier quality);
  records CC-2148, CC-2141, CC-2139, CC-2135, CC-2130, NC-204, SOP-118,
  SOP-131, WI-0412, SCAR-31, DWG-2201; clock from 09:10 to 09:22.
- **Numbers come from the world, not invented claims.** Product-mock
  figures (11 d median closure, 9% waiting, 98% evidence complete) are
  the world's; do not add new outcome claims.
- **Copy:** plausible product copy, short. No em dashes. No features that
  are not shipped. Part 11 language only where it is true (meaning of
  signature, password, audit trail).
- **Platform-wide, not quality-only,** when the film sits on a platform
  surface: show several functions (production, document control, supplier
  quality) working on the one record.

### A7. Finish and delivery

- **Render:** Cycles, 48 samples, no denoiser, pixel filter Blackman-Harris
  0.9 (1.5 softens the type), motion blur 0.5 shutter centred, UI texture
  at 4x (5440 x 2640) so close-ups stay sharp.
- **Post:** glow = the bright UI blurred at two radii and screened only
  onto dark pixels (never haze the type). Grain in the video only for
  review cuts.
- **Grain on the page:** CSS overlay, soft 1-device-px noise tile, `mix-blend-mode:
  hard-light` at about 0.06 opacity, jittered at 12 fps. Overlay blend does
  nothing on white UI; hard-light marks it.
- **Encode:** H.264, x264 preset BEST. CRF 22 = about 15 MB for 34.6 s
  (the shipped hq cut); CRF 26 = about 9.6 MB. Keyframe every 30 frames
  so rail seeks land fast.
- **Poster:** the film's first frame (so play starts without a jump). The
  component shows each chapter's key frame when autoplay is blocked or
  motion is reduced.

---

## Part B. The prompts

Paste B0 at the start of a session, then run the stages in order. Fill the
`{braces}`. Each stage ends with something the next stage consumes, and
each has a stop point where you review before spending render time.

### B0. Master prompt (paste first)

```
You are making a product film for the Unifize website in the house style
documented in docs/product-films/prompt-system.md. Read that file first,
then read scripts/platform-render/v3/film.html as the reference scene.

The film: {page, e.g. /products/dms hero}, {N} steps, one per rail step:
{paste the rail titles and their one-line copy}.

Non-negotiables:
- Each step is PERFORMED in the UI (typed, clicked, dragged, ticked,
  signed, counted up), never lifted or highlighted off the window.
- Flat, square-on camera; dolly and pan only; camera keys per step with a
  monotone cubic through cx, cy, log(vw); each step ends at rest; the
  camera holds still on the step's key action and rests 0.4 s+ on any new
  view.
- One continuous take: step N+1 starts on step N's last frame, pixel for
  pixel; the last step ends on step 1's first frame so the loop has no cut.
- Real content everywhere (no skeleton bars), one consistent fictional
  world, one record followed through every step, state carried forward.
- Pointer, typing, clicks, menus, ticks, counters and arrivals follow the
  interaction grammar table (A4) and its timings.
- 20:9 frame, #1f2126 ground, light app window, action inside the middle
  72% x 70% of frame.
- No em dashes anywhere. No unshipped features. No new outcome numbers.

Work stage by stage (brief, spine, per-step storyboard, scene, frame
review, render, QA, ship). Stop after each storyboard and after each
frame review so I can look before anything renders in Blender.
```

### B1. Brief and story spine

```
Stage 1, story spine.

Page: {page}. Audience: {who lands here}. Rail steps and copy:
{1. title: one line}
{2. ...}

Propose:
1. The one record the film follows (type, ID, title, where it came from)
   and the people involved, reusing the platform world where it fits
   (A6). Say what each person's function is.
2. For each step: the claim (from the rail copy), the screen it happens
   on, the ONE interaction that proves it, the proof that lands, and the
   element it hands off to for the next step.
3. The state that carries forward between steps (counts, statuses,
   messages, signatures) as a short ledger, so nothing contradicts.
4. The screens needed that the scene does not have yet.

Keep each step to 5 to 6.5 s. Output a table, then stop.
```

### B2. Step storyboard (one step at a time)

```
Stage 2, storyboard for step {n}: "{rail title}: {rail copy}".

It starts on step {n-1}'s last frame: {describe it: screen, camera
framing, where the pointer rests and what it hovers}. It must end at rest
{hovering the element step {n+1} starts with / on step 1's first frame if
last}.

Give me:
1. A beat sheet on a timeline in seconds (step-local): entry, change of
   place if any, 2 to 4 work beats, proof, hand-off. For each beat: what
   the UI does, what the pointer does, exact copy typed or shown.
2. Camera keys {t, cx, cy, vw} in window px, marking which beat each key
   frames and where the camera rests. The key action must be under a
   still camera; any new view gets a 0.4 s+ rest.
3. The step length (5 to 6.5 s) and why.
4. What in the world changes (the ledger delta).

Then build it in the scene, render board frames at 12 to 16 moments
across the step into a contact sheet, show me, and stop.
```

### B3. Scene build (how to write it in film.html)

```
Stage 3, build step {n} into scripts/platform-render/v3/film.html (or a
copy for this film). Rules:

- Everything is a pure function of time. Add S{n} (step length), a
  CAM{n} key array, a render{n}(t) for step-local t, and a reset{n}() that
  returns every element step {n} touches to its state before the step.
- The dispatcher render(T) runs resets for later steps, then render1..
  render{n-1} at their ends, then render{n}(t). Earlier steps must not
  change when you add a later one.
- New markup for step {n} must be invisible before it runs AND must not
  change layout (opacity 0 / visibility hidden / zero-height slots with a
  compensating negative margin, absolute positioning for carets). New CSS
  classes get a step prefix (bd-, db-, ...) so nothing restyles earlier
  screens.
- Hide a covered page with visibility hidden AND opacity 0 (a child that
  sets its own visibility still shows under a hidden parent).
- Read targets from layout (offsetLeft/Top chains), not hard-coded
  pixels, and subtract any transform you applied (offsets ignore it).
- Seeded rhythms for typing (see A4), a hidden pointer while typing, a
  visible hover before every click, a press state on every click.
- After the build, pixel-diff: the last frame of step {n-1} rendered
  before and after the change (must be identical), and step {n-1}'s last
  frame against step {n}'s first (max difference 3, no pixel over 8).
  For the last step, also diff the final frame against T = 0.
```

### B4. Frame review

```
Stage 4, review step {n}'s board frames. Check each frame against:

- Does every beat read at hero size? Is the key action under a still
  camera and sharp?
- Is anything important in the edge fade (outer 14% / 15%)?
- Does the pointer cover text it should not? Does it sit on a control
  that appears under it on the next screen?
- Crossfades: is there a frame where two screens stack into nonsense?
- Hover before click, press on click, state change after?
- Typos, wrong labels, placeholder text, a word replaced by a bad
  find-and-replace (search the markup for the words you expect)?
- Counts, statuses, names and times agree with the ledger?
- Does the step end at rest on the hand-off element?

List what is wrong with the fix for each, apply the fixes, re-render only
the frames that show them, and show me again.
```

### B5. Render

```
Stage 5, render step {n}.

1. Textures: node scripts/platform-render/v3/frames.mjs film.html
   {scratch}/tex{n} flat seq:{start}:{end}:30 --scale=4
   (writes f0000.png... and camera.json sampled from the scene's spline)
2. Blender, in a resume loop (Cycles on Metal can die mid-sequence):
   film_step.py -- {scratch}/tex{n} {scratch}/render{n} --frames {a}:{b}
   --samples 48 ; restart from the first missing frame until all exist.
3. Post: python3 post_v3.py render{n} post{n}_0 --grain 0  (page cut)
   and without --grain 0 for a review cut.
4. Join: python3 join.py {out} post1_0 post2_0 ... (prints chapter starts)
5. Encode: Blender -b -P scripts/platform-render/encode.py -- {out}
   {file}.mp4 --fps 30 --crf 22 --preset BEST
6. Send me the review cut and a still of the step's key frame.

Only re-render frames that changed: diff the new textures and
camera.json against the previous run and render just those ranges.
```

### B6. QA gates (before shipping)

```
Stage 6, QA the joined film:

- Every join: last frame of step N vs first of N+1, rendered frames,
  max difference 3, no pixel over 8.
- The loop: film's last frame vs its first, same threshold.
- Sharpness: at 1:1, the key frame of each step (no motion blur on the
  key action, type crisp).
- Encode: decode 4 hard frames (a fast push, a still with small type, a
  drag, a pull-back) from each candidate encode and report PSNR vs the
  source frames with the file size; pick the best under the size budget.
- On the page: the rail follows every chapter (active step and progress),
  a click seeks to the chapter start, steps past the film are disabled,
  reduced motion shows each chapter's key frame.
```

### B7. Ship

```
Stage 7, ship the film to {page}.

- Copy the cut and a first-frame poster into public/ under a NEW version
  name (files are served immutable for a year; never overwrite a name).
- Update the assets file: version, chapterStarts (from join.py), keyBeats
  (the most telling still per chapter, step-local seconds).
- Update the video's aria description to say what the film shows.
- Keep the previous version's files until the new one is signed off.
- Check it on the dev server, then report sizes and what changed.
```

### B8. Turning feedback into fixes

| Feedback | Change |
|---|---|
| "It looks blurry here" | The camera is moving through a key moment. Add a key so it rests there; re-render only those frames. |
| "Too fast / crammed" | Cut a beat, do not shorten beat durations below A4. |
| "Where am I looking?" | Missing hover before a click, or the camera frames too wide on a small action. |
| "Looks fake / empty" | Replace skeletons with real rows; add the second and third functions to the thread; add a live update from a colleague. |
| "Jumps between steps" | Boundary diff failed: some element's state differs at the join. Find it with a diff bounding box. |
| "Loop blinks" | The last frame is not step 1's first: a hidden page shows through, a nav tile or the pointer differs. |
| "Needs more quality" | Lower CRF (22 at about 15 MB for 35 s; 20 at about 19 MB), keep preset BEST. |

---

## Part C. Pipeline reference

| File | Job |
|---|---|
| `scripts/platform-render/v3/film.html` | The scene. Window 1360 x 660, all screens, `seek(T)`, `camAt(T)`, `?mode=board` (camera + preview mask and grain) or `?mode=flat` (the window alone, for textures), `?play` to preview in real time. |
| `frames.mjs` | Renders exact frames over CDP with the cached chrome-headless-shell. `board` stills at 1600 x 720; `flat` textures at `--scale` 4 plus `camera.json`; `--geo=sel\|sel` prints element geometry in window px. |
| `film_step.py` | Blender 5.1, one step: emission plane with the texture sequence, square-on camera keyed per frame from `camera.json`, world `#1f2126`, Cycles 48 spp, filter 0.9, motion blur. `--frames a:b` to render a range, `--save FILE.blend` to write the scene instead. |
| `post_v3.py` | Glow onto darks; `--grain 0` for page cuts. Multiprocess. |
| `join.py` | Symlinks step folders into one sequence; prints chapter starts. |
| `scripts/platform-render/encode.py` | H.264 via Blender's FFmpeg: `--crf` preset name or a number, `--preset BEST`, `--gop`. |
| `overview_blend.py` / `view_in_blender.py` | The six screens in one Blender file; open any film .blend ready to watch. |
| Blender files | `~/Downloads/platform-film-v3-blender/` (step .blend files, textures, previews, overview, README). |

Time budget per step (M-series Mac): textures about 1.5 min; Blender 3 to 8
s a frame (about 15 to 25 min for 180 frames); post under 1 min; encode
about 1 min.

---

## Part D. Mistakes already made once

- **Camera through the key moment.** Step 2's wide reveal and step 5's drag
  were both blurred by a moving camera. Rest on key actions.
- **Still panning at the hand-off.** The first step 1 render smeared the
  record text on its last frame. Land 0.3 s or more before the step ends.
- **Blanket find-and-replace.** Replacing a placeholder `CHECK` also turned
  "CHECKLIST" into an icon plus "LIST". Use unique placeholders.
- **Class name collisions.** A `.sel` for a dropdown restyled the inbox's
  `.ib-row.sel`. Prefix new classes per step.
- **Hidden parent, visible child.** The builder's side panel set its own
  visibility and showed through the empty home at the loop. Hide with
  opacity too.
- **Pointer on the next screen's button.** "Edit process" sat exactly where
  the builder's Publish appears. Flick away right after the click.
- **Tooltips over values.** Keep popovers clear of the number they explain.
- **Baked grain.** 5 s of baked grain was 17.7 MB. Grain goes in CSS.
- **Overlay grain on white.** Overlay blend never marks white UI; use
  hard-light.
- **Blender dies silently.** Always render in a resume loop from the first
  missing frame; Metal can also crash compiling kernels mid-run.
- **Viewport settings from background mode do not stick.** Open .blend
  files with `view_in_blender.py`.
- **Python multiprocessing from stdin hangs on macOS.** Put it in a file
  with a `__main__` guard.
- **Hidden browser pane plays no media.** Check playback in a visible
  browser; verify loops at the frame level.
- **Disk.** A six-step film makes several GB of intermediates; clear
  superseded frame folders as you go.

---

## Part E. Worked example: the platform film (v3)

Rail: The home screen, The inbox, The checklist, The seal, The process
builder, The dashboard. Record: CC-2148. 34.6 s. Chapter starts 0, 5.0,
11.4, 16.6, 22.6, 29.0.

| Step | Length | Beats | Proof | Hand-off |
|---|---|---|---|---|
| 1 The home screen | 5.0 s | Home assembles; "Documents by state" bars grow with counting values; CC-2148 drops into Change controls with its NC-204 link and 2 attachments; pointer arcs in, hovers the row, Open record appears, click. | Count 4 to 5 open; inbox badge; update line lands. | Record drawer slides in; camera lands on it by 4.65 s. |
| 2 The inbox | 6.4 s | Click the message; drawer becomes the middle column of the conversation view (inbox left, checklist right, sidebar to Inbox); camera rests wide 0.45 s; peek at the inbox list (the CC-2148 row updates live); replies land from Production, Document control, Supplier quality; she clicks the composer, types "Thanks all. Filling in the impact assessment now." and sends. | Her message lands; every function in one thread. | Camera and pointer to the checklist's Impact assessment field (hover). |
| 3 The checklist | 5.2 s | Click the field, type "Torque spec only. No form or fit change; risk low.", tick the box; the value saves under its label. | 2 to 3 of 9; then M. Kerr's Production readiness lands live ("Line 2 briefed"), 4 of 9. | Hover Sign on Quality approval. |
| 4 The seal | 6.0 s | Sign opens the Part 11 dialog; choose meaning Approval; user ID prefilled; type password (dots); Sign, Signing, Signed; dialog closes. | Quality approval Signed pill with "Approval · 09:21"; signature card in the thread; 5 of 9. | "Edit process" appears on hover in the checklist header. |
| 5 The process builder | 6.4 s | Page to "Change control process"; drag an Approval tile from the palette (ghost, drop line, slot); name it "Regulatory approval" (order 3); settings panel swaps in; turn on "Remind the signer after 2 days". | Publish, Publishing, Published; "v7 · draft" to "v8 · live". | Hover Dashboards in the sidebar (tooltip). |
| 6 The dashboard | 5.6 s | Dashboard loads: KPIs count up (11 d, 9%, 98%, 24), month bars grow, stage bars, table; hover September (tooltip); hover the CC-2148 row carrying "Signed quality approval · 09:21". | The record's state is on the dashboard. | Click Home; window clears to step 1's first frame; camera on step 1's first key: the loop. |

Camera keys, for reference (step-local t, window px):

```
step 1  (0, 680,330,2150) (1.5, 666,322,2020) (2.9, 470,214,1130)
        (3.9, 520,196,960) (4.65, 1022,263,1380) (5.0, 1030,262,1350)
step 2  (0, 1030,262,1350) (0.55, 1022,284,1290) (1.3, 700,330,1960)
        (1.75, 672,328,1930) (2.3, 420,300,1100) (2.95, 626,420,1100)
        (3.75, 628,480,1030) (5.35, 650,490,1000) (6.4, 1010,300,1060)
step 3  (0, 1010,300,1060) (0.45, 1080,285,900) (1.75, 1100,272,820)
        (2.75, 1040,285,1250) (3.7, 1050,295,1210) (5.2, 1110,330,920)
step 4  (0, 1110,330,920) (0.55, 708,330,1250) (1.4, 708,305,1060)
        (2.4, 708,348,1060) (3.1, 708,345,1120) (3.9, 880,330,1420)
        (4.9, 930,318,1330) (6.0, 1130,150,1000)
step 5  (0, 1130,150,1000) (0.45, 1060,220,1250) (0.95, 700,330,1760)
        (1.3, 650,320,1320) (1.95, 620,360,1260) (2.75, 560,400,1120)
        (3.5, 900,380,1250) (4.4, 1000,220,1300) (5.2, 820,300,1560)
        (6.4, 480,260,1250)
step 6  (0, 480,260,1250) (0.85, 700,330,1720) (1.8, 470,300,1120)
        (3.0, 700,520,1250) (3.9, 720,500,1300) (5.0, 680,330,2150)
        (5.6, 680,330,2150)
```
