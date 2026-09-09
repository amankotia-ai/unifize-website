"use client";

/* ============================================================================
 * ribbon-field.tsx - the shared container field for the product visual
 * engine (task E1, replacing the blue plate). Ribbons of brand blue, pale
 * blue and beige converge to a vanishing point on brand navy, with a slight
 * bloom at the silhouette, a soft darkening behind the record, a vignette
 * and fine grain. Picked by Abhishek on 9 Sep 2026 from the container lab
 * (explorations/containers); this is the static version he asked for on
 * the homepage: nothing moves.
 *
 * Usage: give the stage element the classes `rf rf--<composition>` and
 * mount <RibbonField composition="<composition>" /> as its first child; the
 * live ArcadeStepScene follows. ribbon-field.css neutralises the engine's
 * own plate under .rf and rounds the mock once.
 *
 * Compositions: fan (wide left, vanishing right), beam (vanishing above,
 * wide below), twin (two fans meeting behind the record), diagonal, burst,
 * curtain, bend, arch.
 * ========================================================================== */
import { useEffect, useId, useState } from "react";
import "./ribbon-field.css";

export type RibbonComposition = "fan" | "beam" | "twin" | "diagonal" | "burst" | "curtain" | "bend" | "arch";

/* ------------------------------------------------------------ the palette
 * Brand tokens only (globals.css): the --u-blue scale for the blues, the
 * --n-beige family for the warm band. Each ribbon is a gradient along its
 * length: tint at the wide end, base in the middle, deeper at the vanishing
 * end. Nothing is pure white, so the product visual stays the brightest
 * object in the container. */
type Kind = "blue" | "blue2" | "pale" | "warm" | "light";
const STOPS: Record<Kind, [number, string][]> = {
  /* blue-600 → blue-700 (primary) → blue-800 */
  blue: [[0, "#1c72d6"], [0.5, "#005bb7"], [1, "#004793"]],
  /* blue-500 → blue-600 → blue-700 */
  blue2: [[0, "#4690f0"], [0.6, "#1c72d6"], [1, "#005bb7"]],
  /* blue-300 → blue-400 → blue-500 */
  pale: [[0, "#a3caff"], [0.6, "#70aeff"], [1, "#4690f0"]],
  /* beige-2 → beige → blue-200 */
  warm: [[0, "#faf8f2"], [0.55, "#f2f0ea"], [1, "#c5deff"]],
  /* blue-100 → blue-200 → blue-300 */
  light: [[0, "#deecff"], [0.6, "#c5deff"], [1, "#a3caff"]],
};
const SEQ: Kind[] = ["blue", "pale", "blue2", "warm", "blue", "light", "blue2", "warm", "pale", "blue", "warm", "blue2", "light", "blue"];

const W = 1400;
const H = 720;
type Pt = [number, number];
const f = (n: number) => n.toFixed(1);
const P = (p: Pt) => `${f(p[0])} ${f(p[1])}`;

type Ribbon = { d: string; from: Pt; to: Pt; kind: Kind };

/* one long edge from a wide end to a narrow end: hold the wide-end height
 * for the first half, then dive toward the vanishing point */
function funnelEdge(a: Pt, b: Pt, map: (p: Pt) => Pt) {
  const c1: Pt = [a[0] + (b[0] - a[0]) * 0.46, a[1]];
  const c2: Pt = [a[0] + (b[0] - a[0]) * 0.84, b[1]];
  return { a: map(a), c1: map(c1), c2: map(c2), b: map(b) };
}

/* a fan in local space (wide edge at x=0 spanning y 0..H, narrow end at
 * (length, cy) with total spread `pinch`); `map` places it in the viewBox */
function fan(map: (p: Pt) => Pt, opts: { length?: number; cy?: number; pinch?: number; seq?: Kind[] } = {}): Ribbon[] {
  const length = opts.length ?? W + 60;
  const cy = opts.cy ?? H / 2;
  const pinch = opts.pinch ?? 44;
  const seq = opts.seq ?? SEQ;
  const n = SEQ.length;
  const out: Ribbon[] = [];
  for (let i = 0; i < n; i++) {
    const y0 = (i / n) * H, y1 = ((i + 1) / n) * H;
    const ny0 = cy - pinch / 2 + (i / n) * pinch, ny1 = cy - pinch / 2 + ((i + 1) / n) * pinch;
    const top = funnelEdge([0, y0], [length, ny0], map);
    const bot = funnelEdge([0, y1], [length, ny1], map);
    const d = `M${P(top.a)} C${P(top.c1)} ${P(top.c2)} ${P(top.b)} L${P(bot.b)} C${P(bot.c2)} ${P(bot.c1)} ${P(bot.a)} Z`;
    out.push({ d, from: map([0, (y0 + y1) / 2]), to: map([length, cy]), kind: seq[i % seq.length] });
  }
  return out;
}

/* a bundle along a centreline cubic, bands offset along `dir`, tapering at
 * the far end */
function bundle(c: [Pt, Pt, Pt, Pt], dir: Pt, spread: number, taper: number): Ribbon[] {
  const n = SEQ.length;
  const out: Ribbon[] = [];
  const sh = (p: Pt, o: number): Pt => [p[0] + dir[0] * o, p[1] + dir[1] * o];
  for (let i = 0; i < n; i++) {
    const o0 = (i / n - 0.5) * spread, o1 = ((i + 1) / n - 0.5) * spread;
    const e = (o: number) => [sh(c[0], o), sh(c[1], o), sh(c[2], o * taper), sh(c[3], o * taper)] as [Pt, Pt, Pt, Pt];
    const t = e(o0), b = e(o1);
    const d = `M${P(t[0])} C${P(t[1])} ${P(t[2])} ${P(t[3])} L${P(b[3])} C${P(b[2])} ${P(b[1])} ${P(b[0])} Z`;
    out.push({ d, from: sh(c[0], (o0 + o1) / 2), to: sh(c[3], ((o0 + o1) / 2) * taper), kind: SEQ[i % SEQ.length] });
  }
  return out;
}

function burst(cx: number, cy: number, rays = 26, r = 1500): Ribbon[] {
  const out: Ribbon[] = [];
  for (let k = 0; k < rays; k++) {
    const a = (k / rays) * Math.PI * 2 - Math.PI / 2;
    const half = (Math.PI / rays) * 0.62;
    const p1: Pt = [cx + Math.cos(a - half) * r, cy + Math.sin(a - half) * r];
    const p2: Pt = [cx + Math.cos(a + half) * r, cy + Math.sin(a + half) * r];
    out.push({
      d: `M${f(cx)} ${f(cy)} L${P(p1)} L${P(p2)} Z`,
      from: [cx + Math.cos(a) * r * 0.9, cy + Math.sin(a) * r * 0.9],
      to: [cx, cy],
      kind: SEQ[k % SEQ.length],
    });
  }
  return out;
}

function curtain(n = 16, amp = 46): Ribbon[] {
  const out: Ribbon[] = [];
  const edge = (x: number, phase: number) => {
    const pts: Pt[] = [];
    for (let s = 0; s <= 18; s++) {
      const y = (s / 18) * H;
      pts.push([x + Math.sin((y / H) * Math.PI * 1.3 + phase) * amp, y]);
    }
    return pts;
  };
  for (let i = 0; i < n; i++) {
    const l = edge((i / n) * W - 30, i * 0.42), r = edge(((i + 1) / n) * W - 30, (i + 1) * 0.42);
    out.push({
      d: `M${l.map(P).join(" L")} L${r.slice().reverse().map(P).join(" L")} Z`,
      from: [((i + 0.5) / n) * W, H],
      to: [((i + 0.5) / n) * W, 0],
      kind: SEQ[i % SEQ.length],
    });
  }
  return out;
}

const id: (p: Pt) => Pt = (p) => p;
const COMPOSITIONS: Record<RibbonComposition, () => Ribbon[]> = {
  fan: () => fan(id, { length: W + 80 }),
  beam: () => fan((p) => [(p[1] / H) * W, H - p[0]], { length: H + 80, pinch: 60 }),
  twin: () => [
    ...fan(id, { length: W * 0.5 + 20, pinch: 36 }),
    ...fan((p) => [W - p[0], p[1]], { length: W * 0.5 + 20, pinch: 36, seq: [...SEQ].reverse() }),
  ],
  diagonal: () =>
    fan((p) => {
      const a = -0.5, s = 1.55;
      const x = (p[0] - W / 2) * s, y = (p[1] - H / 2) * s;
      return [W / 2 + x * Math.cos(a) - y * Math.sin(a), H / 2 + x * Math.sin(a) + y * Math.cos(a)];
    }, { length: W + 80, pinch: 40 }),
  burst: () => burst(W / 2, H / 2),
  curtain: () => curtain(),
  bend: () => bundle([[-60, H * 0.42], [W * 0.5, H * 0.42], [W * 0.78, H * 0.55], [W + 80, H + 80]], [0, 1], H * 1.1, 0.34),
  arch: () => bundle([[-120, H + 120], [W * 0.28, -H * 0.55], [W * 0.72, -H * 0.55], [W + 120, H + 120]], [0, 1], H * 0.95, 1),
};

export function RibbonField({ composition = "fan" }: { composition?: RibbonComposition }) {
  /* the SVG is thousands of numeric attributes; it mounts after hydration */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gid = (i: number) => `rf${uid}-${composition}-${i}`;
  const ribbons = mounted ? COMPOSITIONS[composition]() : [];
  return (
    <div className="rf__field" aria-hidden="true">
      {mounted ? (
        <svg className="rf__ribbons" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            {ribbons.map((r, i) => (
              <linearGradient key={i} id={gid(i)} gradientUnits="userSpaceOnUse" x1={f(r.from[0])} y1={f(r.from[1])} x2={f(r.to[0])} y2={f(r.to[1])}>
                {STOPS[r.kind].map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
              </linearGradient>
            ))}
            <filter id={`rf${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>
          <g filter={`url(#rf${uid}-glow)`} opacity="0.5">
            {ribbons.map((r, i) => <path key={i} d={r.d} fill={`url(#${gid(i)})`} />)}
          </g>
          <g shapeRendering="geometricPrecision">
            {ribbons.map((r, i) => <path key={i} d={r.d} fill={`url(#${gid(i)})`} />)}
          </g>
        </svg>
      ) : null}
      <i className="rf__scrim" />
      <i className="rf__vignette" />
      <i className="rf__grain" />
    </div>
  );
}
