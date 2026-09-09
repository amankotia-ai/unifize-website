"use client";

/* ============================================================================
 * container-lab.tsx - container BACKGROUNDS for the product visual engine in
 * one visual language: ribbons of blue, blush and white converging to a
 * vanishing point on deep navy, soft glow, fine grain (Abhishek's reference,
 * 9 Sep 2026). The mock is untouched (the engine's own window, one radius,
 * one shadow); only the field behind it changes, and each field is a
 * different composition of the same ribbons:
 *
 *   01 fan        ribbons enter full height on the left, converge right
 *   02 beam       ribbons converge to a point at the top, spread below
 *   03 twin       two fans meet behind the record
 *   04 diagonal   one fan swept corner to corner
 *   05 burst      ribbons radiate from behind the record
 *   06 curtain    vertical ribbons, a slow wave, no convergence
 *   07 bend       a bundle enters left and bends out bottom right
 *   08 arch       a bundle arcs over the record
 *
 * Every ribbon is an SVG path with its own gradient along its length, drawn
 * twice: blurred underneath for glow, crisp on top. A slow breathe is the
 * only motion, and it stops under prefers-reduced-motion.
 * ========================================================================== */
import { useEffect, useState } from "react";
import { ArcadeStepScene, type ArcadeStepConfig } from "../products/_shared/arcade/arcade";
import { Eyebrow } from "../products/dms/dms-primitives";
import { HOME_HERO_QUALITY_CONFIG, HOME_HERO_DOCUMENT_CONFIG } from "../home/home-arcade";
import { PLATFORM_DASHBOARD_CONFIG } from "../platform/platform-arcade";

type SceneKey = "quality" | "document" | "dashboard";

const SCENES: { key: SceneKey; label: string; config: ArcadeStepConfig }[] = [
  { key: "quality", label: "Quality event", config: HOME_HERO_QUALITY_CONFIG },
  { key: "document", label: "Controlled document", config: HOME_HERO_DOCUMENT_CONFIG },
  { key: "dashboard", label: "Dashboard", config: PLATFORM_DASHBOARD_CONFIG },
];

/* generated SVG mounts after hydration */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* ------------------------------------------------------------ the palette
 * Brand tokens only (globals.css): the --u-blue scale for the blues, the
 * --n-beige family where the reference had blush. Each ribbon kind is a
 * gradient along its length: tint at the wide end, base in the middle,
 * deeper at the vanishing end. Nothing here is pure white, so the product
 * visual stays the brightest object in the container. */
type Kind = "blue" | "blue2" | "pale" | "blush" | "white";
const STOPS: Record<Kind, [number, string][]> = {
  /* blue-600 → blue-700 (primary) → blue-800 */
  blue: [[0, "#1c72d6"], [0.5, "#005bb7"], [1, "#004793"]],
  /* blue-500 → blue-600 → blue-700 */
  blue2: [[0, "#4690f0"], [0.6, "#1c72d6"], [1, "#005bb7"]],
  /* blue-300 → blue-400 → blue-500 */
  pale: [[0, "#a3caff"], [0.6, "#70aeff"], [1, "#4690f0"]],
  /* beige-2 → beige → blue-200: the warm band */
  blush: [[0, "#faf8f2"], [0.55, "#f2f0ea"], [1, "#c5deff"]],
  /* blue-100 → blue-200 → blue-300: the light band, kept below white */
  white: [[0, "#deecff"], [0.6, "#c5deff"], [1, "#a3caff"]],
};
const SEQ: Kind[] = ["blue", "pale", "blue2", "blush", "blue", "white", "blue2", "blush", "pale", "blue", "blush", "blue2", "white", "blue"];

const W = 1400;
const H = 720;
type Pt = [number, number];
const f = (n: number) => n.toFixed(1);
const P = (p: Pt) => `${f(p[0])} ${f(p[1])}`;

/* A ribbon: two long edges from a wide end (a1..a2) to a narrow end (b1..b2),
 * each edge a cubic whose controls make the funnel curve of the reference. */
type Ribbon = { d: string; from: Pt; to: Pt; kind: Kind };

function funnelEdge(a: Pt, b: Pt, map: (p: Pt) => Pt) {
  /* controls in local space: hold the wide-end height for the first half,
   * then dive toward the narrow end */
  const c1: Pt = [a[0] + (b[0] - a[0]) * 0.46, a[1]];
  const c2: Pt = [a[0] + (b[0] - a[0]) * 0.84, b[1]];
  return { a: map(a), c1: map(c1), c2: map(c2), b: map(b) };
}

/* a fan in local space: wide edge at x=0 spanning y 0..H, narrow end at
 * (L, cy) with total spread `pinch`; `map` places it in the viewBox */
function fan(map: (p: Pt) => Pt, opts: { length?: number; cy?: number; pinch?: number; bands?: number; seq?: Kind[] } = {}): Ribbon[] {
  const length = opts.length ?? W + 60;
  const cy = opts.cy ?? H / 2;
  const pinch = opts.pinch ?? 44;
  const n = opts.bands ?? SEQ.length;
  const seq = opts.seq ?? SEQ;
  const out: Ribbon[] = [];
  for (let i = 0; i < n; i++) {
    const y0 = (i / n) * H, y1 = ((i + 1) / n) * H;
    const ny0 = cy - pinch / 2 + (i / n) * pinch, ny1 = cy - pinch / 2 + ((i + 1) / n) * pinch;
    const top = funnelEdge([0, y0], [length, ny0], map);
    const bot = funnelEdge([0, y1], [length, ny1], map);
    const d =
      `M${P(top.a)} C${P(top.c1)} ${P(top.c2)} ${P(top.b)} ` +
      `L${P(bot.b)} C${P(bot.c2)} ${P(bot.c1)} ${P(bot.a)} Z`;
    out.push({ d, from: map([0, (y0 + y1) / 2]), to: map([length, cy]), kind: seq[i % seq.length] });
  }
  return out;
}

/* a bundle along a centreline cubic, bands offset along `dir`, tapering at
 * the far end so the exit reads as a pinch */
function bundle(c: [Pt, Pt, Pt, Pt], dir: Pt, spread: number, taper: number, n = SEQ.length): Ribbon[] {
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

/* wedges around a centre */
function burst(cx: number, cy: number, rays = 26, r = 1500): Ribbon[] {
  const out: Ribbon[] = [];
  for (let k = 0; k < rays; k++) {
    const a = (k / rays) * Math.PI * 2 - Math.PI / 2;
    const half = (Math.PI / rays) * 0.62;
    const p1: Pt = [cx + Math.cos(a - half) * r, cy + Math.sin(a - half) * r];
    const p2: Pt = [cx + Math.cos(a + half) * r, cy + Math.sin(a + half) * r];
    const d = `M${f(cx)} ${f(cy)} L${P(p1)} L${P(p2)} Z`;
    out.push({ d, from: [cx + Math.cos(a) * r * 0.9, cy + Math.sin(a) * r * 0.9], to: [cx, cy], kind: SEQ[k % SEQ.length] });
  }
  return out;
}

/* vertical bands with a slow wave, no convergence */
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
    const d = `M${l.map(P).join(" L")} L${r.slice().reverse().map(P).join(" L")} Z`;
    out.push({ d, from: [((i + 0.5) / n) * W, H], to: [((i + 0.5) / n) * W, 0], kind: SEQ[i % SEQ.length] });
  }
  return out;
}

/* -------------------------------------------------------- compositions */
const id: (p: Pt) => Pt = (p) => p;
const COMPOSITIONS: Record<string, () => Ribbon[]> = {
  /* 01 wide on the left, vanishing just past the right edge */
  fan: () => fan(id, { length: W + 80 }),
  /* 02 wide along the bottom, vanishing just above the top edge */
  beam: () => fan((p) => [p[1] / H * W, H - (p[0] / (H + 80)) * (H + 80)], { length: H + 80, pinch: 60 }),
  /* 03 two fans, narrow ends meeting behind the record */
  twin: () => [
    ...fan(id, { length: W * 0.5 + 20, pinch: 36 }),
    ...fan((p) => [W - p[0], p[1]], { length: W * 0.5 + 20, pinch: 36, seq: [...SEQ].reverse() }),
  ],
  /* 04 a fan rotated about the centre, scaled to cover the corners */
  diagonal: () =>
    fan((p) => {
      const a = -0.5, s = 1.55;
      const x = (p[0] - W / 2) * s, y = (p[1] - H / 2) * s;
      return [W / 2 + x * Math.cos(a) - y * Math.sin(a), H / 2 + x * Math.sin(a) + y * Math.cos(a)];
    }, { length: W + 80, pinch: 40 }),
  /* 05 rays from behind the record */
  burst: () => burst(W / 2, H / 2),
  /* 06 vertical ribbons with a wave */
  curtain: () => curtain(),
  /* 07 enters at left middle, bends out through the bottom right */
  bend: () => bundle([[-60, H * 0.42], [W * 0.5, H * 0.42], [W * 0.78, H * 0.55], [W + 80, H + 80]], [0, 1], H * 1.1, 0.34),
  /* 08 arcs over the record, wide at both feet */
  arch: () => bundle([[-120, H + 120], [W * 0.28, -H * 0.55], [W * 0.72, -H * 0.55], [W + 120, H + 120]], [0, 1], H * 0.95, 1),
};

function RibbonField({ k }: { k: string }) {
  const mounted = useMounted();
  if (!mounted) return null;
  const ribbons = COMPOSITIONS[k]();
  const gid = (i: number) => `cx-${k}-${i}`;
  return (
    <svg className="cx-fill cx-ribbons" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        {ribbons.map((r, i) => (
          <linearGradient key={i} id={gid(i)} gradientUnits="userSpaceOnUse" x1={f(r.from[0])} y1={f(r.from[1])} x2={f(r.to[0])} y2={f(r.to[1])}>
            {STOPS[r.kind].map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
          </linearGradient>
        ))}
        <filter id={`cx-${k}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <g className={`cx-ribbons__set cx-ribbons__set--${k}`}>
        <g filter={`url(#cx-${k}-glow)`} opacity="0.5">
          {ribbons.map((r, i) => <path key={i} d={r.d} fill={`url(#${gid(i)})`} />)}
        </g>
        <g shapeRendering="geometricPrecision">
          {ribbons.map((r, i) => <path key={i} d={r.d} fill={`url(#${gid(i)})`} />)}
        </g>
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------- the roster */
type Variant = { key: string; name: string; idea: string };
const VARIANTS: Variant[] = [
  { key: "fan", name: "Fan", idea: "Ribbons enter full height on the left and converge to a point past the right edge. The record sits on the widest part." },
  { key: "beam", name: "Beam", idea: "Ribbons converge to a point above the top edge and spread to the full width below, like the second reference." },
  { key: "twin", name: "Twin", idea: "Two fans, one from each side, meeting behind the record. Both flares stay visible around it." },
  { key: "diagonal", name: "Diagonal", idea: "One fan swept corner to corner, so the ribbons cross under the record on a slant." },
  { key: "burst", name: "Burst", idea: "Ribbons radiate from behind the record in every direction." },
  { key: "curtain", name: "Curtain", idea: "The ribbons before they converge: vertical, full height, with a slow wave." },
  { key: "bend", name: "Bend", idea: "A bundle enters at the left, runs behind the record, and bends out through the bottom right corner." },
  { key: "arch", name: "Arch", idea: "A bundle arcs over the record, wide at both feet, thinnest at the top." },
];

/* ------------------------------------------------------------------ the lab */
export function ContainerLab() {
  const [scene, setScene] = useState<SceneKey>("quality");
  const config = SCENES.find((s) => s.key === scene)!.config;

  return (
    <>
      <section className="dms-section cx-head" aria-label="Container lab">
        <div className="dms-wrap">
          <Eyebrow>Product visual engine · container lab</Eyebrow>
          <h1 className="dms-h2 cx-head__title">Light ribbons, eight compositions.</h1>
          <p className="dms-lede cx-head__lede">
            One language from the reference: blue, blush and white ribbons converging on deep navy, soft glow, fine
            grain. The mock is untouched. Each field composes the ribbons differently around it.
          </p>
          <div className="cx-seg" role="tablist" aria-label="Scene">
            {SCENES.map((s) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={scene === s.key}
                className={`cx-seg__btn${scene === s.key ? " is-active" : ""}`}
                onClick={() => setScene(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {VARIANTS.map((v, i) => (
        <section key={v.key} className="cx-row" id={v.key} aria-label={`${v.name} container`}>
          <div className="dms-wrap">
            <p className="cx-row__label">
              <span className="dms-data">{String(i + 1).padStart(2, "0")}</span>
              <b>{v.name}</b>
              <span>{v.idea}</span>
            </p>
            <div className={`cx-vis cx-vis--${v.key}`}>
              <div className="cx-field" aria-hidden="true">
                <RibbonField k={v.key} />
                <i className="cx-scrim" />
                <i className="cx-vignette" />
                <i className="cx-grain" />
              </div>
              <div className="cx-mock">
                <ArcadeStepScene config={config} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
