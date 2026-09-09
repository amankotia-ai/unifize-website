"use client";

/* ----------------------------------------------------------------------------
 * glide-hero.tsx - the Glide-style hero, Unifize's way: stacked headline, then
 * a sticky segmented control of five industries that swaps a rendered cutaway
 * maquette of that industry's plant. ONE record is pinned to the room where it
 * happened; connectors run to the departments on it, drawn over the render
 * from the points Blender exported. Auto-cycles gently (progress bar under
 * the active tab), pauses on hover, stops for good once the visitor picks;
 * reduced motion never auto-advances.
 * -------------------------------------------------------------------------- */

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { BookDemoButton } from "@/components/organisms/book-demo";
import { MAQUETTES, RENDER_H, RENDER_W, type Maquette } from "./maquettes";

const CYCLE_MS = 8000;

function initials(label: string) {
  return label.split(/[\s.]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

/* the record's presence on the render: pin, connectors, role labels */
export function RecordOverlay({ m, animate = true }: { m: Maquette; animate?: boolean }) {
  const pin = m.points.pin;
  if (!pin) return null;
  const px = pin.x * RENDER_W;
  const py = pin.y * RENDER_H;
  return (
    <svg className={cn("hg-overlay", !animate && "hg-overlay--still")} viewBox={`0 0 ${RENDER_W} ${RENDER_H}`} aria-hidden="true">
      {m.points.links.map((l, i) => {
        const lx = l.x * RENDER_W;
        const ly = l.y * RENDER_H;
        const d = Math.abs(ly - py) < 6 ? `M${px} ${py} H${lx}` : `M${px} ${py} H${lx} V${ly}`;
        return (
          <g key={l.id} className="hg-link" style={{ animationDelay: `${0.35 + i * 0.14}s` }}>
            <path d={d} fill="none" stroke="#005bb7" strokeWidth={2.4} strokeDasharray="9 7" />
            <rect x={lx - 11} y={ly - 11} width={22} height={22} fill="#fff" stroke="#005bb7" strokeWidth={3} />
            <text x={lx + 24} y={ly + 9} className="hg-role">{l.role}</text>
          </g>
        );
      })}
      <g className="hg-pin" transform={`translate(${px} ${py})`}>
        <rect x={-34} y={-34} width={68} height={68} fill="#005bb7" opacity={0.14} className="hg-pin__ring" />
        <rect x={-18} y={-18} width={36} height={36} fill="#005bb7" />
        <path d="M-6.5 -8 h9.5 l4 4 v12 h-13.5z M-3.5 -1 h7 M-3.5 4 h7" fill="none" stroke="#fff" strokeWidth={2} strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function GlideHero({ initial }: { initial?: string }) {
  const start = Math.max(0, MAQUETTES.findIndex((s) => s.key === initial));
  const [active, setActive] = useState(start);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!auto || paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setActive((a) => (a + 1) % MAQUETTES.length);
      setRun((r) => r + 1);
    }, CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [auto, paused, active]);

  const m = MAQUETTES[active];
  const pin = m.points.pin ?? { x: 0.5, y: 0.5 };
  /* the card sits in the sky at the stage's far corner, the way a drawing
   * calls out a detail, so it never covers a room or a role label; an
   * L-shaped dashed leader runs from the card to the pin. The corner is the
   * one the pin is farther from. */
  const side = pin.x < 0.5 ? "right" : "left";
  const pinVars = { "--hg-px": `${pin.x * 100}%`, "--hg-py": `${pin.y * 100}%` } as CSSProperties;

  return (
    <section className="hg-hero" aria-label="Unifize">
      <div className="dms-wrap hg-hero__head">
        <h1 className="hg-h1">Turn scattered decisions into records that run your operation.</h1>
        <p className="hg-sub">
          Unifize connects the people, evidence, and approvals behind every CAPA, change order, batch release, and design
          review, so cross-functional work closes faster and closes proven.
        </p>
        <div className="hg-ctas">
          <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
          <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">Take the Coordination Tax assessment</Link>
        </div>
      </div>

      <div className="hg-tabs-wrap">
        <div className={cn("hg-tabs", paused && "is-paused")} role="tablist" aria-label="Industry" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {MAQUETTES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              id={`hg-tab-${s.key}`}
              aria-selected={i === active}
              aria-controls={`hg-scene-${s.key}`}
              className="hg-tab"
              onClick={() => { setActive(i); setAuto(false); }}
            >
              {s.name}
              {auto && i === active && <span key={`${run}-${i}`} className="hg-tab__bar is-running" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>

      <div className="hg-stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {MAQUETTES.map((s, i) => (
          <div key={s.key} id={`hg-scene-${s.key}`} role="tabpanel" aria-labelledby={`hg-tab-${s.key}`} className={cn("hg-stage__scene", i === active && "is-active")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={i === active ? s.caption : ""} width={RENDER_W} height={RENDER_H} className="hg-render" loading={i === start ? "eager" : "lazy"} decoding="async" />
            {i === active && <RecordOverlay key={`ov-${run}`} m={s} />}
          </div>
        ))}

        <span key={`lead-v-${m.key}`} className="hg-leader hg-leader--v" style={pinVars} aria-hidden="true" />
        <span key={`lead-h-${m.key}`} className={cn("hg-leader hg-leader--h", `hg-leader--${side}`)} style={pinVars} aria-hidden="true" />
        <article key={m.key} className={cn("hg-record", `hg-record--${side}`)} style={pinVars}>
          <div className="hg-record__eyebrow">
            <span>{m.record.kind}</span>
            <span className="hg-record__code">{m.record.code}</span>
          </div>
          <h2 className="hg-record__title">{m.record.title}</h2>
          <p className="hg-record__state">{m.record.state}</p>
          <div className="hg-record__people" aria-label="People on this record">
            {m.record.people.map((p) => (
              <span key={p} className="hg-chip"><span className="hg-chip__init" aria-hidden="true">{initials(p)}</span>{p}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
