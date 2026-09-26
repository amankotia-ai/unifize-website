# Checks

Run these before spending Blender time and again before shipping. The
continuity checks are cheap and have caught every join bug so far.

## Continuity (after every scene edit)

Export the frames that must match and compare them with
`scripts/boundary_check.py` (pass: max difference 3, no pixel over 8):

```
node scripts/platform-render/v3/frames.mjs <scene> /tmp/chk flat <T_a>,<T_b>,... --scale=4
python3 .claude/skills/product-film/scripts/boundary_check.py \
  <old tex>/f0149.png:/tmp/chk/f0000.png   (a rendered step's last frame, unchanged by the edit)
  /tmp/chk/f0001.png:/tmp/chk/f0002.png    (step n's last frame vs step n+1's first)
  /tmp/chk/f0003.png:/tmp/chk/f0004.png    (the film's last frame vs T = 0)
  --label=unchanged,join,loop
```

A step's last frame is at `start + S - 1/30`; the next step's first at
`start + S`. On a failure the script prints where the difference is:
look there for a hover state, a border width, a nav tile, the pointer, a
hidden page showing through.

## Frame review (each step's contact sheet)

- Does every beat read at hero size? Is the key action sharp, under a
  still or slow camera?
- Is anything that matters in the edge fade (outer 14% left and right,
  15% top and bottom)?
- Does the pointer cover text it shouldn't, or sit on a control that
  appears under it on the next screen?
- Any frame where two screens stack into nonsense during a crossfade?
- Hover before each click, press on it, a state change after it?
- Typos, placeholder text, a label mangled by an edit? Search the markup
  for the words you expect to see.
- Counts, statuses, names and times agree with the ledger in direction.md?
- Does it match the UI reference images (spacing, sizes, colours)?
- Does the motion match the reference clips (durations, easing)?
- Does the step end at rest on the hand-off element?

## Rendered frames

- Sample the key frame of each step at 1:1: type crisp, no motion blur on
  the key action.
- The rendered loop: the film's last finished frame vs its first, same
  threshold (encoders add a little noise, so compare the PNGs, not the MP4).
- `camera_chart.py` on the scene: every key action inside a green band.

## Encode choice

```
python3 .claude/skills/product-film/scripts/quality_compare.py <joined frames> 211,281,729,906 a.mp4 b.mp4 c.mp4
```

Pick frames that stress the encoder: a fast push, a still with small
type, a drag, a pull-back. Choose the best PSNR under the size budget.
On the platform film CRF 22 gave +2 to 3 dB over CRF 26 for 5.5 MB more;
beyond that returns shrink (CRF 20: +0.5 to 1 dB for 4 MB more).

## Mistakes already made once

| Mistake | What it looked like | The rule now |
|---|---|---|
| Camera moving through the key moment | The whole-view reveal and the drag were blurred | Rest the camera on key actions; check with camera_chart.py |
| Still panning at the hand-off | The last frame's text smeared | Land 0.3 s+ before the step ends |
| Blanket find-and-replace | "CHECKLIST" became an icon plus "LIST" | Unique placeholders only |
| Class collision | A dropdown's `.sel` restyled the inbox's selected rows | Prefix classes per step |
| Hidden parent, visible child | The builder's panel showed at the loop point | Hide with opacity too |
| Pointer on the next screen's button | Looked like it was clicking Publish | Flick away right after the click |
| Tooltip over the value | Covered the bar's "11d" | Keep popovers clear of what they explain |
| Baked grain | 5 s = 17.7 MB | Grain in CSS on the page |
| Overlay grain on white | No grain on the UI | hard-light |
| Session scratchpad for renders | Wiped overnight | Durable work folder |
| Blender died silently | Job ended at frame 43 | render_step.sh resume loop |
| Python multiprocessing from stdin | Hung for 10 minutes | Script file with a `__main__` guard |
| Hidden browser pane | Video never played | Check playback in a visible browser; loops at frame level |
| A film of one moment | The homepage quality film stopped at containment: "incomplete, no real story" | Tell the record type's whole arc (raised to closed); let the film run longer |
| A signature that lands on its own | "Approval workflow is not accurate" | Perform it: the checklist's Sign button, the Part 11 dialog (meaning, user ID, password, Signing, Signed), then Signed and the seal card |
| Guessed weekday in a thread | "Sat, Sep 27" was a Sunday in 2026 | Check dates with a calendar before they go in a thread |
| Hidden pane, video to verify | Pane's document is hidden, media never plays | chrome-headless-shell over CDP does play H.264 in real time: sample currentTime and capture frames there |
