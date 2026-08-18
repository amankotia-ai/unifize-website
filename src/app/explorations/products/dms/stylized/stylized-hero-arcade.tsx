"use client";

/* ============================================================================
 * stylized-hero-arcade.tsx - the hero product shot for /products/dms/stylized.
 * Replaces the single static register mock with the shared stylized-arcade
 * engine (products/_shared/arcade): ONE persistent app window and a camera
 * that walks five key moments of SOP-118 (find, trust, compare, sign,
 * release). The step rail under the stage names each moment and lets the
 * reader take the wheel; taking the wheel stops the timer for good, so the
 * camera never yanks away mid-read.
 *
 * Motion rules, same as every other arcade mount on the site: the timer only
 * runs while the stage is on screen, and prefers-reduced-motion holds the
 * first pose (the rail still works). Without JS the first pose renders.
 * ========================================================================== */

import { useEffect, useRef, useState } from "react";
import { ArcadeStepScene } from "../../_shared/arcade/arcade";
import type { StylizedHeroStep } from "./stylized-mocks";

const DWELL_MS = 5200;

export function StylizedHeroArcade({ steps }: { steps: StylizedHeroStep[] }) {
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

  return (
    <div className="dms-heroarc">
      <div className="dms-heroarc__stage" id="dms-heroarc-stage" ref={stageRef}>
        <ArcadeStepScene config={step.config} />
      </div>

      <div className="dms-heroarc__rail">
        <ol className="dms-heroarc__steps">
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
                <span className="dms-heroarc__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
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
    </div>
  );
}
