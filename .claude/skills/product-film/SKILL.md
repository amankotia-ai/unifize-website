---
name: product-film
description: Make, extend, fix or re-encode Unifize product films in the house style of the v3 platform hero, where a real-looking Unifize app window is filmed square on and each rail step is performed in the UI (typed, clicked, dragged, ticked, signed, counted up) in one continuous take that loops with no cut. The pipeline runs from an HTML timeline scene through Blender (Cycles, a camera that dollies, motion blur) to an MP4 on the page. Use this whenever the user wants a hero video, product film, product video, platform video, Blender video, animatic or storyboard for a Unifize page, wants the UI "in motion" or "Linear-style", wants to add or redo a step of an existing film, fix a blurry or jumpy moment, re-render or re-encode one, change its quality or file size, put a film on a page, or open the film's Blender files, even if they don't say "film".
---

# Product film

Films where the product proves the page's claims by doing the work: a
Unifize app window, filmed flat, the pointer clicking and typing, records
landing, checklists ticking, signatures sealing, numbers counting up. One
record is followed through every step, each step starts on the previous
step's last frame, and the last step ends on the first frame so the loop
has no cut. The reference is the platform hero (six steps, 34.6 s):
`public/explorations/platform/hero-film-v3-hq.mp4`, scene
`scripts/platform-render/v3/film.html`.

The look, the motion and the craft are fixed so every film matches:

- **UI**: `assets/ui-kit.css` (verbatim from the shipped scene), markup
  in `film.html`, images of every screen and component in
  `assets/ui-reference/`. Read `references/ui-design-system.md`.
- **Motion**: `assets/motion-kit.js` (the film's easing, camera and
  pointer code and its recurring moves with their timings), reference
  clips in `assets/motion-reference/`, the camera chart
  `camera-paths.png`. Read `references/motion-system.md`.
- **Style bible and prompts**: `docs/product-films/prompt-system.md`
  (Part A for the rules, Part E for the worked example).

The person decides what the film says and how it should feel; you decide
the craft. Ask for direction where their knowledge or taste decides the
outcome, with a recommended option, and default everything else
(`references/direction-intake.md`).

## What kind of job is this?

| The person wants | Do |
|---|---|
| A new film for a page | The full workflow below, starting with direction intake |
| Another step for an existing film | Read its `direction.md`; storyboard the step (stage 3) onward |
| A fix to a step ("blurry here", "jumps", "move the pointer", new copy) | Edit the scene, run the continuity checks, re-render only changed frames (`references/render-pipeline.md`), re-join, re-encode |
| Higher quality or a smaller file | Re-encode from the finished frames at another CRF; compare with `quality_compare.py`; no re-render |
| The Blender files, or to see the screens in Blender | `film_step.py --save`, `make_previews.py`, `overview_blend.py`, open with `view_in_blender.py` in a new Blender instance |
| The film on a page | `references/ship.md` |
| A film with no camera (the window stays put, only the UI moves) | The same workflow, but frames go straight from the scene to the encoder: `references/render-pipeline.md`, "Still-frame films" |

## Workflow for a new film

Stop points (marked ■) are where the person looks before you spend
render time. If they've already said "go with your recommendations" or
"render it", don't stop to ask; show and continue.

**1. Direction intake.** Find what you can first (the page's rail copy in
its `page.tsx`, the memory index, earlier films). Then ask round 1 (where
it lives, whose story, pace, review cadence) and round 2 (the steps, the
pointer, the ending, the file budget) with `AskUserQuestion`, a
recommended option first. Create the film folder and `direction.md`
(`references/scene-authoring.md`, "Starting a film") and log every answer.

**2. Story spine.** One record through every step. For each step: the
claim (rail copy), the screen, the one interaction that proves it, the
proof that lands, and the element it hands off to. A ledger of state that
carries forward (counts, statuses, messages, signatures). ■ Show the table.

**3. Storyboard a step.** Beat sheet on a step-local timeline (entry,
change of place, 2 to 4 performed beats, proof, hand-off), exact copy,
camera keys `{t, cx, cy, vw}`, length 5 to 6.5 s. The camera rests on the
key action and 0.4 s+ on any new view, and comes to rest on the hand-off.

**4. Build it in the scene.** Pure function of time; `S<n>`, `CAM<n>`,
`render<n>`, `reset<n>`; kit CSS and motion functions, not new styles or
new timings; class prefixes per step. Run the continuity checks
(`references/qa.md`) before looking at anything else.

**5. Board frames.** 12 to 16 moments across the step into a contact
sheet (`scripts/contact_sheet.py`); review against the checklist in
`references/qa.md` and against the UI reference images and motion clips.
Fix, re-board. ■ Show the sheet and the beats; ask "render as boarded /
adjust beats / camera / copy".

**6. Render** (`references/render-pipeline.md`). Textures, then Blender in
the background with `scripts/render_step.sh` (it resumes if Blender
dies), then post. While it renders, storyboard and build the next step
and send an animatic of what's built so far. Durable work folder, never
the session scratchpad.

**7. Join, check, encode.** Join the steps, check the joins and the loop
on the rendered frames, pick the encode by measurement. ■ Send the review
cut (grain baked) with what changed and the file size.

**8. Ship** when the person wants it on the page (`references/ship.md`):
new versioned files, assets file (chapter starts, key beats), description,
verify on the dev server.

## Taking direction mid-flight

People direct in plain words ("more cinematic", "calmer", "I can't read
that", "show that production signs"). Translate with the table in
`references/direction-intake.md`, apply it, log it in `direction.md` as a
rule if it should hold for later steps, re-board the affected frames, and
re-render only what changed. If an instruction is ambiguous and a wrong
guess would cost a render, ask one question with your best guess first.

## Non-negotiables, and why

- **Performed, not lifted.** The claim is proved by the product doing it;
  a highlighted card floating off the window proves nothing.
- **Square-on camera, dolly and pan only.** It reads as the real product.
- **Still camera on the key action.** Motion blur on the one frame that
  carries the claim was the most repeated fix on the platform film.
- **Pixel-identical joins and a pixel-identical loop.** Any difference
  shows as a jump on the page; the check is cheap, the re-render isn't.
- **Real content and one consistent world.** Skeleton bars and invented
  numbers read as fake; counts and statuses must agree across steps.
- **The kit's look and motion.** Restyling or retiming a component in one
  film makes the films disagree about what the product looks like.
- **Copy:** plausible product copy, no em dashes, no unshipped features,
  no new outcome numbers.

## Communicating while it runs

Renders take 15 to 25 minutes a step. Say what's running and what's next
in a line or two when you check in; send the animatic early; never claim
playback you couldn't see (a hidden browser pane plays no media). Open
Blender files in a new Blender instance, not in one the person has open.

## Files

```
assets/
  scene-skeleton.html      start of a new scene (links ui-kit.css + motion-kit.js)
  ui-kit.css               the film UI, verbatim from the shipped scene
  motion-kit.js            the film motion as functions
  ui-reference/            56 images (screens 01-29, components 30-56) + spec.json
  motion-reference/        14 clips (m01-m14) + camera-paths.png
  direction-template.md    the per-film direction log
references/
  direction-intake.md      what to ask, when, with which defaults; phrase-to-change table
  ui-design-system.md      tokens, window, screens and components, with image numbers
  motion-system.md         camera, pointer and UI motion with timings, functions, clips
  scene-authoring.md       scene structure, adding steps safely, recipes, previewing
  render-pipeline.md       folders, commands, partial re-renders, quality settings, Blender files
  qa.md                    continuity checks, frame review, encode choice, mistakes made once
  ship.md                  putting a film on a page and verifying it
scripts/
  render_step.sh           Blender render of a step or range, resuming until done
  boundary_check.py        do these frames match? (joins, loop, unchanged frames)
  contact_sheet.py         board frames into one sheet
  storyboard.py            the captioned storyboard the person approves (frames + beats.json)
  changed_frames.py        which frames need re-rendering after an edit
  camera_chart.py          the camera path of a scene, with still and slow spans
  decode_frame.py          one frame of an MP4 to PNG (Blender's FFmpeg)
  quality_compare.py       PSNR and size of candidate encodes
  ui_reference.mjs         regenerate the UI reference images from a scene
  make_previews.py         quarter-size texture previews for the Blender overview
```

The pipeline itself lives in `scripts/platform-render/v3/` (`frames.mjs`,
`film_step.py`, `post_v3.py`, `join.py`, `overview_blend.py`,
`view_in_blender.py`) and `scripts/platform-render/encode.py`.
