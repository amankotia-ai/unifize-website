"use client";

/* ============================================================================
 * hero-arcade.tsx - the hero product shot shared by every product page.
 * Lifted from dms/stylized (stylized-hero-arcade.tsx) on 2026-08-19 so DMS,
 * QMS, PLM, and MES all open on the same treatment: the shared stylized-
 * arcade engine (./arcade) as the establishing shot - ONE persistent app
 * window and a camera that walks a handful of key moments of one record.
 * Each page brings its own journey (a HeroArcadeStep[] lifted from that
 * page's own flows, so the hero and the lifecycle section tell the same
 * story with the same facts); the step rail under the stage names each
 * moment and lets the reader take the wheel. Taking the wheel stops the
 * timer for good, so the camera never yanks away mid-read.
 *
 * Motion rules, same as every other arcade mount on the site: the timer only
 * runs while the stage is on screen, and prefers-reduced-motion holds the
 * first pose (the rail still works). Without JS the first pose renders.
 * ========================================================================== */

import { useEffect, useRef, useState } from "react";
import { ArcadeStepScene, type ArcadeStepConfig } from "./arcade";
import "./hero-arcade.css";

/* solid step glyphs (24-grid, filled geometry, detail carved out so every
 * mark stays one currentColor): the moments a product journey is made of.
 * 22 Sep 2026: the DMS rail swapped its 01..06 counters for these
 * (Abhishek: "solid icons instead of numbers"); a step without an icon
 * still shows its number. */
export type HeroStepIcon = "build" | "find" | "trust" | "sign" | "release" | "measure" | "compare" | "route" | "assist" | "capture" | "contain" | "cause";

const STEP_ICONS: Record<HeroStepIcon, React.ReactNode> = {
  /* three blocks, one lifted into place */
  build: (<path d="M3 13h8v8H3z M13 13h8v8h-8z M8 3h8v8H8z" />),
  /* magnifier: ring carved out, solid handle */
  find: (<path fillRule="evenodd" d="M10 2.8a7.2 7.2 0 1 1 0 14.4 7.2 7.2 0 0 1 0-14.4zm0 3.1a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2z M15.35 16.9l1.55-1.55 4.5 4.5-1.55 1.55z" />),
  /* shield, check carved out */
  trust: (<path fillRule="evenodd" d="M12 2.6l7.4 2.8v5.1c0 4.7-3.1 8.1-7.4 9.7-4.3-1.6-7.4-5-7.4-9.7V5.4L12 2.6zM9.25 10.65l1.45 1.45 4.05-4.2 1.6 1.5-5.65 5.8-2.95-3.05z" />),
  /* pen over the signature line */
  sign: (<path d="M15.2 3.2l5.6 5.6-9.9 9.9H5.3v-5.6z M3 20.2h18v1.8H3z" />),
  /* paper plane, the fold carved out */
  release: (<path fillRule="evenodd" d="M2.6 11.6L21.4 3.4l-3.2 17.2-5.8-3.9-3 3.5-.3-5.4zM10.8 14.6l6.2-6.4-8.4 5z" />),
  /* three bars rising */
  measure: (<path d="M3 13h4.2v8H3z M9.9 8h4.2v13H9.9z M16.8 3H21v18h-4.2z" />),
  /* two sheets side by side, the second one lifted */
  compare: (<path d="M3 4h8v14H3z M13 6h8v14h-8z" />),
  /* a route: three stations on one line */
  route: (<path d="M2.5 11h19v2h-19z M8 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M22 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />),
  /* a flag planted: the event raised */
  capture: (<path d="M4.5 2.5h2.2v19H4.5z M7.8 3.5h12.4l-3 4.6 3 4.6H7.8z" />),
  /* padlock, keyhole carved out: the hold */
  contain: (<path fillRule="evenodd" d="M12 2.5a5 5 0 0 1 5 5V10h1.8v11.5H5.2V10H7V7.5a5 5 0 0 1 5-5zm0 2.3a2.7 2.7 0 0 0-2.7 2.7V10h5.4V7.5A2.7 2.7 0 0 0 12 4.8zm-1.1 9.2v3.8h2.2V14z" />),
  /* one cause under three effects: a root */
  cause: (<path d="M2.5 3h5v5h-5z M9.5 3h5v5h-5z M16.5 3h5v5h-5z M4 8h2v3.5h12V8h2v5.5h-7V16h-2v-2.5H4z M8.5 16h7v5.5h-7z" />),
  /* four-point spark */
  assist: (<path d="M12 2.4c.6 4.9 2.7 7 7.6 7.6-4.9.6-7 2.7-7.6 7.6-.6-4.9-2.7-7-7.6-7.6 4.9-.6 7-2.7 7.6-7.6z M18.6 14.6c.3 2.3 1.3 3.3 3.6 3.6-2.3.3-3.3 1.3-3.6 3.6-.3-2.3-1.3-3.3-3.6-3.6 2.3-.3 3.3-1.3 3.6-3.6z" />),
};

export function HeroStepGlyph({ name }: { name: HeroStepIcon }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {STEP_ICONS[name]}
    </svg>
  );
}

export type HeroArcadeStep = {
  label: string;
  config: ArcadeStepConfig;
  /* a solid glyph in place of the step number */
  icon?: HeroStepIcon;
};

const DWELL_MS = 5200;

export function HeroArcade({
  steps,
  rail = "bottom",
}: {
  steps: HeroArcadeStep[];
  /* where the step rail sits: under the stage (default) or above it, the
   * homepage's tabs-over-the-window idiom */
  rail?: "top" | "bottom";
}) {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (engaged) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const node = stageRef.current;
    if (!node) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (!timer) timer = setInterval(() => setActive((i) => (i + 1) % steps.length), DWELL_MS);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      stop();
    };
  }, [engaged, steps.length]);

  const step = steps[active];

  const stage = (
    <div className="dms-heroarc__stage" id="dms-heroarc-stage" ref={stageRef}>
      <ArcadeStepScene config={step.config} />
    </div>
  );

  return (
    <div className={"dms-heroarc" + (rail === "top" ? " dms-heroarc--rail-top" : "")}>
      {rail === "bottom" ? stage : null}

      <div className={"dms-heroarc__rail" + (rail === "top" ? " dms-heroarc__rail--top" : "")}>
        <ol
          className="dms-heroarc__steps"
          style={{ "--heroarc-count": steps.length } as React.CSSProperties}
        >
          {steps.map((s, i) => (
            <li
              className={
                "dms-heroarc__step" +
                (i === active ? " is-active" : "") +
                (i < active ? " is-past" : "")
              }
              key={s.label}
            >
              <button
                type="button"
                className="dms-heroarc__btn"
                aria-pressed={i === active}
                aria-controls="dms-heroarc-stage"
                onClick={() => {
                  setEngaged(true);
                  setActive(i);
                }}
              >
                {s.icon ? (
                  <span className="dms-heroarc__ico" aria-hidden="true">
                    <HeroStepGlyph name={s.icon} />
                  </span>
                ) : (
                  <span className="dms-heroarc__n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <span className="dms-heroarc__label">{s.label}</span>
                {i === active && !engaged ? (
                  <span
                    className="dms-heroarc__tick"
                    aria-hidden="true"
                    key={active}
                    style={{ animationDuration: `${DWELL_MS}ms` }}
                  />
                ) : null}
              </button>
            </li>
          ))}
        </ol>

      </div>

      {rail === "top" ? stage : null}
    </div>
  );
}
