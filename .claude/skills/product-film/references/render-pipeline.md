# Rendering

Scene frames become textures, Blender films them with a real camera, a
post pass adds the glow, and the steps are joined and encoded.

## Folders

Keep film work out of the session scratchpad: it is wiped between
sessions, and a six-step film's renders took a day to make. Use a durable
work folder per film, outside the repo:

```
~/Downloads/product-films/<slug>/
  tex/step1 ... stepN       textures (5440 x 2640 PNG) + camera.json
  render/step1 ... stepN    Blender frames (2560 x 1152)
  post/step1_0 ...          finished frames, no grain (page cut)
  post/step1_g ...          finished frames, grain baked (review cut)
  cuts/                     joined folders + MP4s
  blender/                  .blend files per step + overview (see below)
```

Check free disk first (`df -h ~`). Textures are ~0.6 MB a frame; renders
and post ~0.5 MB a frame each. Delete superseded folders as you replace them.

## Commands

Paths relative to the repo root. `SK=.claude/skills/product-film/scripts`,
`V3=scripts/platform-render/v3`, `B=/Applications/Blender.app/Contents/MacOS/Blender`.

1. **Textures for a step** (about 1.5 min):
   ```
   node $V3/frames.mjs <scene> <work>/tex/step<n> flat seq:<start>:<end>:30 --scale=4
   ```
   start and end are film seconds (step n's start and start + S<n>).
2. **Blender render** (3 to 8 s a frame; run in the background, it resumes itself):
   ```
   $SK/render_step.sh <work>/tex/step<n> <work>/render/step<n> [from:to] [samples]
   ```
3. **Post** (under a minute):
   ```
   python3 $V3/post_v3.py <work>/render/step<n> <work>/post/step<n>_0 --grain 0
   python3 $V3/post_v3.py <work>/render/step<n> <work>/post/step<n>_g
   ```
4. **Join** (prints the chapter starts for the page):
   ```
   python3 $V3/join.py <work>/cuts/all_0 <work>/post/step1_0 ... <work>/post/step<n>_0
   ```
5. **Encode** (about a minute):
   ```
   $B -b -P scripts/platform-render/encode.py -- <work>/cuts/all_0 <work>/cuts/film.mp4 --fps 30 --crf 22 --preset BEST
   ```
   CRF 22 is about 15 MB for 35 s; CRF 26 about 9.6 MB; CRF 20 about 19 MB.
   The review cut (grain baked) goes from the `_g` folders.

## Only render what changed

After a scene edit, re-export the step's textures to a new folder and
compare:

```
python3 $SK/changed_frames.py <old tex> <new tex>     # prints ranges like 15:83
$SK/render_step.sh <new tex> <work>/render/step<n> 15:83
```

Frames that did not change keep their old renders. When a change only
shows in part of the window (a label), work out which frames have that
area in camera view from camera.json and render only those.

## Working rhythm

- Render in the background and keep working: storyboard and build step
  n+1 while step n renders; send the animatic meanwhile.
- One Blender job at a time on the GPU; queue the next one behind it
  (wait for the previous job's done line, then start).
- Blender can die mid-sequence (Metal kernel compile crashes, silent
  exits). `render_step.sh` resumes from the first missing frame; check
  its last line.
- Tell the person where things stand in one line when you check in.

## Quality settings (why they are what they are)

| Setting | Value | Why |
|---|---|---|
| Texture scale | 4x (5440 x 2640) | The closest framing (vw ~820) still has more than one texel per output pixel |
| Samples | 48, no denoiser | Enough for anti-aliasing and motion blur; a denoiser smears type |
| Pixel filter | Blackman-Harris 0.9 | 1.5 visibly softened the type |
| Motion blur | shutter 0.5, centred | Real camera blur on pushes; none when the camera rests |
| View transform | Standard | The UI's whites and blue come out exactly as drawn |
| Ground | world `#1f2126`, unlit | Exactly the hero's charcoal; no box around the film |

## Blender files

To give the person .blend files they can open:

```
$B -b -P $V3/film_step.py -- <tex dir> <render dir> --samples 48 --save <blender>/step<n>-<slug>/step<n>-<slug>.blend
python3 $SK/make_previews.py <blender>              # quarter-size jpgs of each tex/ into preview/
$B -b -P $V3/overview_blend.py -- <blender> --name <slug>-overview --titles "A|B|..."
open -n -a Blender --args <file.blend> --python $V3/view_in_blender.py
```

Put the textures inside each step folder (`tex/`) so the relative paths
hold. `view_in_blender.py` opens a file looking through the camera with
the UI showing and playback on (viewport settings saved from background
mode don't stick). Open files in a NEW Blender instance (`open -n`), never
in one the person already has open.

## Still-frame films (no camera)

When the person rules out camera moves (the homepage hero films, 26 Sep
2026: "the frame stays in the same place, just UI interactions"), Blender
adds nothing: the scene's flat frame IS the finished frame. Export the
window at the page's largest display size times 2 and encode it directly:

```
node $V3/frames.mjs <scene> <work>/frames/s<n> flat seq:0:<S>:30 --win=1070x560 --scale=2.4 --query=step=<n>
$B -b -P scripts/platform-render/encode.py -- <work>/frames/s<n> <work>/cuts/s<n>.mp4 --fps 30 --crf 22 --preset BEST
```

`--win` is the scene's window size, `--vp` the board viewport, `--query`
extra URL parameters (one scene can hold several films, `?step=N`). A
still frame compresses far better than a dollied one: 20.5 s of UI at
2568 x 1344 is 3.8 MB at CRF 22. The video then covers only the window's
rectangle on the page, and the page keeps its own background around it
(see ship.md). Frame widths must be even for x264 (1496 x 1.5, not 1494).
Worked example: `scripts/product-films/home-hero/` (direction.md there).
