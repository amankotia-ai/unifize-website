# The film motion: camera and UI

How things move is as much the house style as how they look. The numbers
here are the ones the shipped film uses; they are packaged as functions in
`assets/motion-kit.js`, and each has a reference clip in
`assets/motion-reference/` cut from the film scene (with the camera move,
the page's edge mask and preview grain). Watch the clip before building a
move, match the timing, then compare.

`assets/motion-reference/camera-paths.png` charts the whole film's camera:
zoom and pan over time, the keys, and where the camera is still (green)
or slow (dim green). Regenerate it for any film with
`scripts/camera_chart.py SCENE.html OUT.png --titles "A|B|..."`.

## Camera

| Rule | Value | Why |
|---|---|---|
| Moves | Dolly (vw) and pan (cx, cy) only; square on, no tilt or orbit | Reads as the real product, not a 3D promo |
| Interpolation | Monotone cubic through cx, cy and log(vw) (`camera(keys)`) | No overshoot, even-feeling zoom |
| Keys per step | 5 to 10 | Fewer reads calmer; more reads busy |
| Framings | whole window vw 2150; whole view readable 1700 to 1960; a panel 1000 to 1300; a field or row 820 to 1060 | Type stays legible at hero size |
| Still (under 0.05 frame widths a second) | during the step's key action and 0.4 s+ on any new view | A moving camera blurs the one frame that carries the claim |
| Slow (under 0.15) | acceptable under secondary actions | |
| Between beats | pushes and pulls of 0.6 to 1.3 s; zoom changes up to 2x | Motion blur on these moves is welcome |
| Step ends | at rest on its last key, on the element the next step starts with | Invisible joins, rail seeks land on a still frame |
| Film ends | on step 1's first key | The loop has no cut |

Clips: `m01-camera-push-and-rest` (push from wide to the queue, rest on
the click), `m04-drawer-grows-into-view` (pull to the whole view, rest,
peek), `m14-loop-seam` (the end turning into the start).

## Pointer

| Move | Value | Function |
|---|---|---|
| Travel | quadratic arc, lifted 20 to 40 px for short hops, 60 to 120 px across the window; 0.3 to 0.9 s; inOutCubic | `move(t, a, b, t0, t1, lift)` |
| After a click, when the next screen puts a control under it | flick away starting 0.08 s after the click, outCubic | `flick(...)` |
| Hover before every click | 0.15 to 0.25 s | `hoverIn(t, t0)` |
| Click | press 0.08 s, release 0.12 s; pointer scales to 0.9; target darkens and gives 4% | `pressAt`, `pressAny` |
| While typing | hidden (like the OS), back when it moves | `typingHide` |
| Resting | clear of text and of the next thing that will appear | |

Clips: `m03-pointer-hover-click-drawer`, `m10-page-change-flick`.

## UI motion

| Motion | Timing and easing | Function | Clip |
|---|---|---|---|
| Typing | 13 to 33 ms a character, +12 ms at spaces, +50 ms at . ; , (seeded); caret solid while typing, blinking 2.2 Hz idle | `rhythm`, `typedCount`, `caretOn` | m06 |
| Password | dots 35 to 65 ms each | `dotRhythm` | m08 |
| Focus | ring 1.5 px blue + 3 px halo over 0.13 s | `focusRing` | m06, m08 |
| Something arrives in a list or thread | slot opens 0.28 s (inOutCubic), item fades in 0.36 s from +0.06 s, rises 10 px, scale 0.975 to 1; threads anchor to the bottom and scroll | `arrive` | m02, m05 |
| Highlight flash | up in 0.25 s, holds ~0.5 s, decays over ~1 s (inOutSine) | `flash` | m02 |
| Counter | rolls or counts up, outCubic, 0.3 to 0.8 s | `countUp` | m02, m13 |
| Bars | grow from the baseline, 0.55 s each, 70 to 80 ms apart, outQuart | `barGrow` | m13 |
| Checkbox tick | 0.3 s: fill with a slight overshoot (to 1.18), then the check draws | `tick` | m07 |
| A colleague's live update | avatar ring pulse + row flash, tick lands without the pointer | `liveRing`, `tick` | m07 |
| Menu / dropdown | opens 0.16 s dropping 4 px, closes 0.12 s as the value appears | `menuOpen` | m08 |
| Button with work behind it | Idle, Busy (spinner, ~0.4 s), Done (green, check, past tense) | `buttonState` | m09, m12 |
| Dialog | fades in with scale 0.965 to 1 over ~0.37 s on a darker scrim; closes 0.28 s | `dialogIn` | m08, m09 |
| Drawer | slides in from the right, 0.64 s, outQuint, over a light scrim | `drawerIn` | m03 |
| A view grows into another | shared element moves (inOutCubic ~0.6 s) while new columns slide in and the old page fades | (see film.html step 2) | m04 |
| Page change | 0.25 s crossfade with a 10 to 12 px rise; sidebar tile moves at the same time | `pageIn`, `navMove` | m10 |
| Panel swap on one page | old out 14 px left, new in from 14 px right, 0.35 s | `panelSwap` | m11, m12 |
| Drag and drop | source tile tints; ghost rides under the pointer tilted 2 degrees with a lifted shadow; drop line with a dot; list opens a slot; ghost settles into the new row over 0.14 s | (see film.html step 5) | m11 |
| Toggle | knob slides 12 px and the track fills blue over 0.17 s | (see film.html step 5) | m12 |
| Pop-in (badges, pills, order dots) | outBack, the only overshoot allowed | `E.outBack` | m02, m11 |

## What not to do

- No spins, bounces beyond `outBack`, parallax layers, 3D tilts, glows or
  sheens on UI elements.
- No two moves of the same element at once (a row can't slide while it
  fades a different way).
- No UI motion shorter than 0.12 s (it pops) or longer than 0.8 s (it
  drags), except camera moves.
- Don't speed beats up to fit a step; cut a beat.
