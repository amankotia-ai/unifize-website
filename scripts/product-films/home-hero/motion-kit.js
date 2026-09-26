/* ============================================================================
 * motion-kit.js - the motion of the product films, as code.
 *
 * The easing, camera and pointer functions are VERBATIM from the v3 platform
 * film (scripts/platform-render/v3/film.html); the named motions below them
 * package the film's recurring moves with the exact timings it uses, so a
 * new film moves like the shipped one. The catalogue with the numbers and
 * the reference clips is references/motion-system.md.
 *
 * Load it in a scene before the scene's own script:
 *   <script src="motion-kit.js"></script>
 * Everything here is a pure function of time (seconds); nothing animates on
 * its own, so any frame renders exactly.
 * ========================================================================== */

/* ---------------------------------------------------------------- time */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t, a, b) => clamp((t - a) / (b - a));      // progress of t through [a, b], 0..1
const lerp = (a, b, x) => a + (b - a) * x;
const E = {
  outCubic: x => 1 - Math.pow(1 - x, 3),                // arrivals, fades, hovers
  outQuart: x => 1 - Math.pow(1 - x, 4),                // bars growing
  outQuint: x => 1 - Math.pow(1 - x, 5),                // drawers, big panels sliding in
  inOutCubic: x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,   // pointer moves, slots opening, layout changes
  inOutQuint: x => x < 0.5 ? 16 * Math.pow(x, 5) : 1 - Math.pow(-2 * x + 2, 5) / 2,
  inOutSine: x => -(Math.cos(Math.PI * x) - 1) / 2,     // highlight decays
  outBack: x => { const c1 = 1.4, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },  // badges, pills, order dots popping in (the only overshoot allowed)
};

/* ---------------------------------------------------------------- camera
 * Keys {t, cx, cy, vw}: cx, cy = the window point at frame centre (window
 * px); vw = window px across the frame width (2150 whole window with
 * margin, ~1000 a panel, ~820 a field). A monotone cubic through cx, cy
 * and log(vw): no overshoot, even-feeling zoom, zero speed at the first
 * and last key (so each step starts and ends at rest). */
function monotone(xs, ys) {
  const n = xs.length, d = [], m = new Array(n).fill(0);
  for (let i = 0; i < n - 1; i++) d.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (3 * (xs[i + 1] - xs[i - 1])) / ((2 * xs[i + 1] - xs[i] - xs[i - 1]) / d[i - 1] + (xs[i + 1] + xs[i] - 2 * xs[i - 1]) / d[i]);
  return x => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0; while (x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i], s = (x - xs[i]) / h;
    const h00 = 2 * s ** 3 - 3 * s ** 2 + 1, h10 = s ** 3 - 2 * s ** 2 + s, h01 = -2 * s ** 3 + 3 * s ** 2, h11 = s ** 3 - s ** 2;
    return h00 * ys[i] + h10 * h * m[i] + h01 * ys[i + 1] + h11 * h * m[i + 1];
  };
}
function camera(keys) {
  const ts = keys.map(k => k.t);
  const x = monotone(ts, keys.map(k => k.cx)), y = monotone(ts, keys.map(k => k.cy)), z = monotone(ts, keys.map(k => Math.log(k.vw)));
  return t => ({ cx: x(t), cy: y(t), vw: Math.exp(z(t)) });
}
/* how fast the camera moves at t, in frame widths per second (pan + zoom).
 * Under ~0.05 reads as still; the key action of a step should sit there. */
function cameraSpeed(cam, t, dt = 1 / 60) {
  const a = cam(t - dt), b = cam(t + dt);
  const pan = Math.hypot(b.cx - a.cx, b.cy - a.cy) / ((a.vw + b.vw) / 2);
  const zoom = Math.abs(Math.log(b.vw / a.vw));
  return (pan + zoom) / (2 * dt);
}

/* ---------------------------------------------------------------- pointer */
const mix = (a, b, k) => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) });
/* a gentle arc: quadratic Bezier lifted `lift` px above the midpoint
 * (20-40 short hops, 60-120 across the window) */
function arc(a, b, k, lift) { const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - lift }; return { x: (1 - k) ** 2 * a.x + 2 * (1 - k) * k * m.x + k * k * b.x, y: (1 - k) ** 2 * a.y + 2 * (1 - k) * k * m.y + k * k * b.y }; }
/* a move from a to b between t0 and t1, eased in and out (0.3-0.9 s) */
const move = (t, a, b, t0, t1, lift = 40) => arc(a, b, E.inOutCubic(seg(t, t0, t1)), lift);
/* straight after a click, when the next screen puts something under the
 * pointer: a flick that starts fast and eases in */
const flick = (t, a, b, t0, t1, lift = 60) => arc(a, b, E.outCubic(seg(t, t0, t1)), lift);
/* a click: press 0.08 s, release 0.12 s after 0.1 s, as 0..1 (pointer
 * scales to 0.9, the target darkens and gives 4%) */
const pressAt = (t, c) => seg(t, c, c + 0.08) * (1 - seg(t, c + 0.1, c + 0.22));
const pressAny = (t, clicks) => Math.max(0, ...clicks.map(c => pressAt(t, c)));
/* hide while typing (like the OS), back when the pointer moves */
const typingHide = (t, typeAt, typeEnd) => seg(t, typeAt + 0.02, typeAt + 0.14) * (1 - seg(t, typeEnd - 0.06, typeEnd + 0.04));
function setPointer(el, p, opacity, press) {
  el.style.opacity = opacity;
  el.style.transform = `translate(${p.x - 2}px, ${p.y - 2}px) scale(${1 - 0.1 * press})`;
}
/* where an element sits in window px (layout box: transforms ignored, so
 * subtract any translate you applied yourself) */
function at(el, root = document.querySelector("#cam")) { let x = 0, y = 0, e = el; while (e && e !== root) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; } return { x, y, w: el.offsetWidth, h: el.offsetHeight }; }

/* ---------------------------------------------------------------- typing */
/* a human rhythm, seeded so every render of the same t types the same
 * characters: 13-33 ms a character, +12 ms at spaces, +50 ms at . ; , */
function rhythm(text, seed = 7, base = 0.017, jitter = 0.016) {
  let x = 0, r = seed; const out = [];
  for (const ch of text) { r = (r * 9301 + 49297) % 233280; x += base + (r / 233280) * jitter + (ch === " " ? 0.012 : 0) + (".;,".includes(ch) ? 0.05 : 0); out.push(x); }
  return out;
}
const typedCount = (times, t, typeAt) => times.filter(ct => t >= typeAt + ct).length;
/* password dots: 35-65 ms each */
const dotRhythm = (n, seed = 5) => { let x = 0, r = seed; const out = []; for (let i = 0; i < n; i++) { r = (r * 9301 + 49297) % 233280; x += 0.035 + (r / 233280) * 0.03; out.push(x); } return out; };
/* caret: solid while typing, blinks at 2.2 Hz when idle */
const caretOn = (t, focusAt, typing) => typing || Math.floor((t - focusAt) * 2.2) % 2 === 0;
/* the focus ring on inputs, k 0..1 */
const focusRing = k => `inset 0 0 0 ${1 + 0.5 * k}px color-mix(in oklab, var(--blue) ${k * 100}%, var(--line2))${k > 0.01 ? `, 0 0 0 ${3 * k}px rgb(0 91 183 / 0.12)` : ""}`;

/* ---------------------------------------------------------------- UI motions (the film's timings) */
/* hover appears over 0.15-0.25 s, just before a click */
const hoverIn = (t, t0, dur = 0.2) => E.outCubic(seg(t, t0, t0 + dur));
/* something new arrives in a list or thread: the list opens a slot first
 * (0.28 s), the item fades in and rises 10 px (0.36 s from +0.06 s) */
function arrive(t, t0, { slot = 0.28, delay = 0.06, fade = 0.36, rise = 10 } = {}) {
  const k = E.outCubic(seg(t, t0 + delay, t0 + delay + fade));
  return { slot: E.inOutCubic(seg(t, t0, t0 + slot)), show: k, rise: (1 - k) * rise, scale: 0.975 + 0.025 * k };
}
/* a soft highlight: up in 0.25 s, holds, decays over ~1 s */
const flash = (t, t0, hold = 0.5, decay = 1.0) => E.outCubic(seg(t, t0 - 0.1, t0 + 0.15)) * (1 - E.inOutSine(seg(t, t0 + hold, t0 + hold + decay)));
/* a checkbox tick over 0.3 s: fill with a slight overshoot, then the check draws */
function tick(box, k) {
  const chk = box.querySelector(".chk");
  box.style.background = k > 0 ? `color-mix(in oklab, var(--blue) ${clamp(k * 2.5) * 100}%, #fff)` : "";
  box.style.boxShadow = k > 0 ? `inset 0 0 0 1.5px color-mix(in oklab, var(--blue) ${clamp(k * 2.5) * 100}%, #c3cad4)` : "";
  box.style.transform = `scale(${1 + 0.18 * Math.sin(Math.PI * clamp(k * 1.4))})`;
  if (chk) { chk.style.opacity = k > 0.15 ? 1 : 0; chk.style.strokeDashoffset = `${20 * (1 - E.outCubic(seg(k, 0.25, 1)))}`; }
}
/* a button with work behind it: idle -> busy (spinner, ~0.4 s) -> done */
const buttonState = (t, clickAt, busy = 0.4) => t < clickAt + 0.06 ? "idle" : t < clickAt + 0.06 + busy ? "busy" : "done";
/* a number counting up with ease-out */
const countUp = (t, t0, dur, to) => Math.round(to * E.outCubic(seg(t, t0, t0 + dur)));
/* bars growing one after another: 0.55 s each, 70-80 ms apart */
const barGrow = (t, i, t0 = 0.5, stagger = 0.08, dur = 0.55) => E.outQuart(seg(t, t0 + i * stagger, t0 + i * stagger + dur));
/* a page change: quick crossfade with a 10-12 px rise (0.26 s) */
const pageIn = (t, t0, dur = 0.26) => E.outCubic(seg(t, t0, t0 + dur));
/* a menu opening and closing (0.16 s / 0.12 s), dropping 4 px */
const menuOpen = (t, openAt, closeAt) => E.outCubic(seg(t, openAt + 0.04, openAt + 0.2)) * (1 - E.outCubic(seg(t, closeAt + 0.04, closeAt + 0.16)));
/* a dialog: fade and scale 0.965 -> 1 over ~0.37 s */
const dialogIn = (t, t0, outAt = Infinity) => E.outCubic(seg(t, t0 + 0.08, t0 + 0.45)) * (1 - E.inOutCubic(seg(t, outAt, outAt + 0.28)));
/* a drawer from the right, 0.64 s, outQuint */
const drawerIn = (t, t0) => E.outQuint(seg(t, t0, t0 + 0.64));
/* a panel swap on the same page (0.35 s): old out 14 px left, new in from 14 px right */
const panelSwap = (t, t0) => E.inOutCubic(seg(t, t0, t0 + 0.35));
/* a sidebar tile moving from one item to another (0.25 s) */
const navMove = (t, t0) => E.inOutCubic(seg(t, t0, t0 + 0.25));
/* a colleague's live update: avatar ring pulse + row flash, tick 0.3 s */
const liveRing = (t, t0) => flash(t, t0, 0.6, 0.9);
