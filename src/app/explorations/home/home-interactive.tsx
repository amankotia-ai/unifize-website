"use client";

/* ----------------------------------------------------------------------------
 * home-interactive.tsx - the homepage hero's product switcher.
 *
 * HeroArcadeSwitcher: one arcade app window, four worlds. Round 1 of the
 * panel test showed a single quality-events mock polarizes by role; round 2
 * showed three quality-side artifacts still read as "quality's tool" to ops
 * and engineering. The four views keep that finding - one artifact per
 * audience - but the visual is now the shared stylized-arcade system the
 * product and platform pages journey on (2026-08-09 port): quality event,
 * change order, holds & release, controlled document, each a different pose
 * of the same app window. Auto-advances gently until the visitor interacts
 * (click stops it for good, hovering pauses it); honors
 * prefers-reduced-motion by not auto-advancing. The mechanism journey in 03
 * reuses the platform page's PlatformJourney directly.
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { ArcadeStepScene, type ArcadeStepConfig } from "../products/_shared/arcade/arcade";

export type HeroArcadeView = { key: string; label: string; config: ArcadeStepConfig };

const ADVANCE_MS = 6400;

export function HeroArcadeSwitcher({ views }: { views: HeroArcadeView[] }) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  /* auto-advance only when motion is welcome, and only until first interaction */
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setAutoplay(true);
  }, []);

  useEffect(() => {
    if (!autoplay || paused) return;
    timer.current = window.setTimeout(() => setActive((i) => (i + 1) % views.length), ADVANCE_MS);
    return () => { if (timer.current !== null) window.clearTimeout(timer.current); };
  }, [autoplay, paused, active, views.length]);

  const pick = (i: number) => {
    setAutoplay(false);
    setActive(i);
  };

  const view = views[active];
  return (
    <div
      className="hm-heromock"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hm-heromock__tabs" role="tablist" aria-label="See the product">
        {views.map((v, i) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={"hm-heromock__tab" + (i === active ? " is-active" : "")}
            onClick={() => pick(i)}
          >
            {v.label}
            {autoplay && !paused && i === active ? (
              <span
                className="hm-heromock__timer"
                style={{ animationDuration: `${ADVANCE_MS}ms` }}
                aria-hidden="true"
              />
            ) : null}
          </button>
        ))}
      </div>
      {/* keyed remount: worlds change wholesale between tabs, so the scene
        * swaps clean instead of morphing the camera across records */}
      <div key={view.key} className="hm-heromock__stage">
        <div className="hm-heromock__scene">
          <ArcadeStepScene config={view.config} />
        </div>
      </div>
    </div>
  );
}
