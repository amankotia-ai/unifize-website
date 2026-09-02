"use client";

/* ============================================================================
 * domain-arcade.tsx — the domain (Solutions) template's live product layer,
 * mounted on the shared stylized-arcade engine (products/_shared/arcade):
 * ONE persistent app window and a camera that moves between poses.
 *
 * Generalised from the Medical Devices page's itm-arcade so every domain page
 * journeys through its OWN record — the CAPA, the finding, the SCAR, the
 * field action, the change — instead of a shared demo. The journey is data:
 * each domain data file carries one ArcadeStepConfig per `flow.trail` row
 * (see _shared/types.ts, DomainArcadeJourney), so the trail copy and the
 * camera always tell the same story with the same facts.
 *
 * Two mounts, same idiom as the industry flagship:
 *   DomainHeroArcade  — the hero product shot, cycling poses on a timer.
 *   DomainTraceArcade — section 03: the decision trail drives the camera
 *                       (pinned scroll story on desktop, auto-advance when
 *                       stacked, buttons always work).
 * All state degrades: without JS each mount renders its first pose, and
 * prefers-reduced-motion holds it. CSS comes with itm.css (.itm-arcade token
 * bridge, .itm-hero__arcade, .itm-tracepin) — the domain kit adds nothing.
 * ========================================================================== */

import { useEffect, useRef, useState } from "react";
import {
  ArcadeStepScene,
  type ArcadeStepConfig,
} from "../../products/_shared/arcade/arcade";

/* the shared token-bridge wrapper: aliases the page's --itm tokens onto the
 * --dms names the arcade engine styles against (bridge lives in itm.css) */
function DomainArcadeScene({ config }: { config: ArcadeStepConfig }) {
  return (
    <div className="itm-arcade">
      <ArcadeStepScene config={config} />
    </div>
  );
}

/* respects reduced motion + only runs while the mount is on screen */
function useAutoAdvance(
  ref: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  periodMs: number,
  advance: () => void,
) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(advance, periodMs);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [ref, enabled, periodMs, advance]);
}

/* HERO — the product shot is the arcade itself, quietly walking the domain's
 * journey. `order` starts on the strongest establishing frame, then loops the
 * story. Decorative: the hero stage is aria-hidden. */
const HERO_ORDER_DEFAULT = [1, 2, 3, 4, 0];

export function DomainHeroArcade({
  steps,
  order = HERO_ORDER_DEFAULT,
}: {
  steps: ArcadeStepConfig[];
  order?: number[];
}) {
  const [frame, setFrame] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const cycle = order.filter((i) => i >= 0 && i < steps.length);

  useAutoAdvance(ref, cycle.length > 1, 4600, () =>
    setFrame((f) => (f + 1) % cycle.length),
  );

  if (!cycle.length) return null;
  return (
    <div ref={ref} className="itm-hero__arcade">
      <DomainArcadeScene config={steps[cycle[frame]]} />
    </div>
  );
}

/* SECTION 03 — a pinned scroll story with a TIGHT trail: the whole block
 * (trail + arcade) pins while an invisible runway below it carries the
 * scroll; scroll progress maps directly to the active step, so the timeline
 * keeps its natural spacing and the camera still walks every pose. Clicking
 * a step scrolls to its stretch of the runway. On stacked layouts (≤1024px)
 * there is no pin; the scene quietly auto-advances until the reader takes
 * over. */
const DESKTOP_PIN = "(min-width: 1025px)";

export function DomainTraceArcade({
  trailLabel,
  trail,
  trailFoot,
  steps,
}: {
  trailLabel: string;
  trail: { t: string; who: string; when: string }[];
  trailFoot: string;
  steps: ArcadeStepConfig[];
}) {
  const count = Math.min(trail.length, steps.length);
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* mobile/stacked fallback only: the desktop pin is scroll-driven */
  useAutoAdvance(wrapRef, !engaged, 5200, () => {
    if (window.matchMedia?.(DESKTOP_PIN).matches) return;
    setActive((a) => (a + 1) % count);
  });

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap || !window.matchMedia?.(DESKTOP_PIN).matches) return;
      const inner = wrap.firstElementChild as HTMLElement | null;
      if (!inner) return;
      const runway = wrap.offsetHeight - inner.offsetHeight;
      if (runway <= 0) return;
      const stickyTop = inner.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (wrap.getBoundingClientRect().top - stickyTop) / -runway));
      setActive(Math.min(count - 1, Math.floor(progress * count)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  const select = (index: number) => {
    setEngaged(true);
    const wrap = wrapRef.current;
    const inner = wrap?.firstElementChild as HTMLElement | null;
    if (wrap && inner && window.matchMedia?.(DESKTOP_PIN).matches) {
      const runway = wrap.offsetHeight - inner.offsetHeight;
      if (runway > 0) {
        /* land in the middle of the step's stretch of the runway; the scroll
         * handler pans the camera through the steps on the way there */
        const stickyTop = parseFloat(getComputedStyle(inner).top) || 100;
        const wrapTopDoc = wrap.getBoundingClientRect().top + window.scrollY;
        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
          top: wrapTopDoc - stickyTop + (runway * (index + 0.5)) / count,
          behavior: reduce ? "auto" : "smooth",
        });
        return;
      }
    }
    setActive(index);
  };

  return (
    <div ref={wrapRef} className="itm-tracepin">
      <div className="itm-tracepin__inner">
        <div className="itm-diff__grid itm-diff__grid--arcade">
          <aside className="itm-trail itm-trail--live" aria-label={trailLabel}>
            <span className="itm-trail__lab">{trailLabel}</span>
            <ol className="itm-trail__steps">
              {trail.slice(0, count).map((step, i) => (
                <li
                  className={
                    "itm-trail__step" +
                    (i === active ? " is-active" : "") +
                    (i < active ? " is-past" : "") +
                    (i === count - 1 ? " is-sealed" : "")
                  }
                  key={step.t}
                >
                  <button
                    type="button"
                    className="itm-trail__btn"
                    aria-pressed={i === active}
                    aria-controls="dk-trace-stage"
                    onClick={() => select(i)}
                  >
                    <span className="itm-trail__node" aria-hidden="true" />
                    <span className="itm-trail__t">{step.t}</span>
                    <span className="itm-trail__meta">
                      {step.who} <span className="itm-data">· {step.when}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="itm-trail__foot">{trailFoot}</p>
          </aside>

          <div className="itm-arcstage itm-arcstage--sticky" id="dk-trace-stage" aria-live="polite">
            <DomainArcadeScene config={steps[active]} />
          </div>
        </div>
      </div>
    </div>
  );
}
