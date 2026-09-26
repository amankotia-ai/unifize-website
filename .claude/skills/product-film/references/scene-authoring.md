# Writing the scene

The scene is one HTML file that draws the app window at any moment of the
film: `window.seek(T)` puts every element in its state at time T. Nothing
animates by itself, so any frame renders exactly, the storyboard frames
are real frames, and a re-render of frame 412 matches the old one.

## Starting a film

```
mkdir -p scripts/product-films/<slug>
cp .claude/skills/product-film/assets/{scene-skeleton.html,ui-kit.css,motion-kit.js} scripts/product-films/<slug>/
mv scripts/product-films/<slug>/scene-skeleton.html scripts/product-films/<slug>/film.html
cp .claude/skills/product-film/assets/direction-template.md scripts/product-films/<slug>/direction.md
```

The film folder owns its copies of `ui-kit.css` and `motion-kit.js`, so a
later change to the kit can't silently change an already rendered film.
To extend the platform film itself, edit
`scripts/platform-render/v3/film.html` (it carries its kit inline).

## Structure

```
S1..Sn            step lengths (s)
CAM1..CAMn        camera keys per step, {t, cx, cy, vw}, step-local t
render1..rendern  render<n>(t): set every element step n touches, for step-local t
reset1..resetn    reset<n>(): put back every element step n touches, as before step n
render(T)         the dispatcher (below)
camAt(T)          step camera for film time T (frames.mjs samples it into camera.json)
window.seek, window.camAt, window.STEPS
```

The dispatcher, for a film of three steps:

```js
function render(T) {
  T = clamp(T, 0, DUR);
  if (T < S1)       { reset3(); reset2(); reset1(); render1(T); }
  else if (T < S12) { reset3(); render1(S1); render2(T - S1); }
  else              { render1(S1); render2(S2); render3(T - S12); }
}
```

Later steps reset first, then earlier steps render at their end state,
then the current step renders on top. That is what keeps step n+1's first
frame identical to step n's last.

## Adding a step without breaking earlier ones

- **New markup is invisible and takes no room** until its step: opacity
  0, visibility hidden, a zero-height slot with a compensating negative
  margin (`.pop`), carets with a net-zero advance. Otherwise the earlier
  frames change.
- **Prefix new classes** per step (`bd-`, `db-`, `sig-`...). A generic
  `.sel` for a dropdown once restyled the inbox's selected rows.
- **Never blanket find-and-replace** in markup. Replacing a `CHECK`
  placeholder turned "CHECKLIST" into an icon plus "LIST". Use unique
  placeholders (`__CHK__`) or build the markup in code.
- **Hide covered pages with opacity as well as visibility.** A child that
  sets its own visibility shows through a hidden parent.
- **Reset what you set.** Every property render<n> sets on a shared
  element must be cleared by a later step's reset or re-set by its render.
- **Measure, don't guess.** Pointer targets come from `at(el)` (layout
  box in window px); subtract any translate you applied, offsets ignore
  transforms. `frames.mjs ... --geo=".a|.b"` prints geometry for camera keys.
- **Run the boundary check after every edit** (see qa.md). It caught two
  of the bugs above before any render time was spent.

## Recipes (with motion-kit.js)

Hover then click a button:
```js
const hv = hoverIn(t, 2.95);                    // tint builds 0.2 s before the click at 3.2
const pr = pressAt(t, 3.2);
btn.style.background = `color-mix(in oklab, var(--blue50) ${hv * 100}%, #fff)`;
btn.style.transform = `scale(${1 - 0.04 * pr})`;
```

Type into a field:
```js
const T_TXT = rhythm(TEXT, 11, 0.013, 0.012);   // seed, base, jitter
const n = typedCount(T_TXT, t, TYPE_AT);
typed.textContent = TEXT.slice(0, n);
placeholder.style.display = n > 0 ? "none" : "";
field.style.boxShadow = focusRing(E.outCubic(seg(t, CLICK + 0.03, CLICK + 0.16)));
caret.style.opacity = caretOn(t, CLICK, n > 0 && n < TEXT.length) ? 1 : 0;
```

A message arrives in a thread (bottom-anchored):
```js
const a = arrive(t, 2.4);
pop.style.height = `${pop.firstElementChild.offsetHeight * a.slot}px`;
pop.firstElementChild.style.opacity = a.show;
pop.firstElementChild.style.transform = `translateY(${a.rise}px) scale(${a.scale})`;
scroller.style.transform = `translateY(${-Math.max(0, scroller.offsetHeight - (thread.clientHeight - 32))}px)`;
```

A button with work behind it:
```js
const st = buttonState(t, CLICK_SIGN, 0.4);     // "idle" | "busy" | "done"
if (btn.dataset.s !== st) { btn.innerHTML = HTML[st]; btn.dataset.s = st; }
```

The pointer:
```js
const p = t < 2.2 ? move(t, pIn, pField, 0.1, 0.7, 60) : move(t, pField, pSave, 2.25, 2.7, 30);
setPointer(cursor, p, 1 - typingHide(t, TYPE_AT, 2.25), pressAny(t, [CLICK, CLICK_SAVE]));
```

The full versions of each (drawer growing into a view, drag and drop,
live updates, dialogs, page changes, the loop back to the start) are in
`scripts/platform-render/v3/film.html`, render2 to render6.

## Previewing

- In a browser: `film.html?play` (real time) or `?play=12.5` (from 12.5 s),
  `?t=3.2` (a still), `?mode=flat` (the window alone).
- Board frames and a contact sheet:
  `node scripts/platform-render/v3/frames.mjs film.html OUT board 0.4,1.6,2.7 --dsf=1`
  then `python3 .claude/skills/product-film/scripts/contact_sheet.py OUT OUT/sheet.jpg`.
- An animatic: `frames.mjs ... board seq:A:B:30 --dsf=1`, then encode
  (render-pipeline.md). Send it while Blender renders.
