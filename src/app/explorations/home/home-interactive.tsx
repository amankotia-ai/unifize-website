"use client";

/* ----------------------------------------------------------------------------
 * home-interactive.tsx - the homepage's two product stages.
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
 *
 * ProductSuiteShowcase: section 04 in the platform journey's stage-and-rail
 * idiom - one product window on the blue stage, four governed records on the
 * rail, each posed in its own product's world.
 *
 * Both stages keep ONE arcade window mounted and let a config change PAN the
 * camera - arcade.css already transitions the transform, the panel
 * opacities, and the target highlight (2026-09-01; the old keyed remounts
 * hard-cut and replayed the entry animation on every tab, reading as a page
 * load). Worlds change wholesale between tabs - a different record,
 * different people - so the swap hides under a short interior dip
 * (usePannedConfig): the panels dim, the config swaps at the bottom of the
 * dip, and the pan carries the new record in. Reduced motion swaps
 * instantly, matching the disabled camera transition.
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArcadeStepScene, type ArcadeStepConfig } from "../products/_shared/arcade/arcade";
import { PlatformJourney, type PlatformJourneyStep } from "../platform/platform-interactive";

export type HeroArcadeView = {
  key: string;
  label: string;
  config: ArcadeStepConfig;
  /* the tab's exit: the L2 page that owns this record's world (2026-09-01
   * panel: a search-intent visitor should not need two scrolls to reach the
   * thing the tab names) */
  door?: { label: string; href: string };
};

/* the record-swap dip: dim-out finishes on the 160ms panel transition in
 * arcade.css before the new world lands */
const SWAP_DIP_MS = 170;

function usePannedConfig(target: ArcadeStepConfig) {
  const [shown, setShown] = useState(target);
  const [dipped, setDipped] = useState(false);
  useEffect(() => {
    if (shown === target) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    setDipped(true);
    const timer = window.setTimeout(() => {
      setShown(target);
      setDipped(false);
    }, SWAP_DIP_MS);
    return () => window.clearTimeout(timer);
  }, [target, shown]);
  return { shown, dipped };
}

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
  const scene = usePannedConfig(view.config);
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
      {/* the active tab's door: same 1040px column as the tabs */}
      {view.door ? (
        <div className="hm-heromock__doorrow">
          <Link className="hm-heromock__door" href={view.door.href}>
            {view.door.label} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      ) : null}
      {/* one persistent window: the camera pans between worlds, the interior
        * dips for the record swap */}
      <div className="hm-heromock__stage">
        <div className={cn("hm-heromock__scene", scene.dipped && "is-dipped")}>
          <ArcadeStepScene config={scene.shown} />
        </div>
      </div>
    </div>
  );
}

/* ================================================== MECHANISM RECORD TOGGLE
 * Section 03's journey, runnable on more than one record (2026-09-01 panel:
 * the mechanism shown only on NC-204 pattern-matched to "quality's tool").
 * The journey stays MOUNTED across a record switch: the same step index
 * re-poses on the other record's world, so switching proves the claim - one
 * mechanism, any record - with the camera pan instead of a reload. */

export type MechanismRecordJourney = {
  key: string;
  label: string;
  meta: string;
  steps: PlatformJourneyStep[];
  configs: ArcadeStepConfig[];
};

export function MechanismJourney({ records }: { records: MechanismRecordJourney[] }) {
  const [active, setActive] = useState(0);
  const record = records[active];
  return (
    <div className="hm-journeyrec">
      <div className="hm-journeyrec__bar" role="tablist" aria-label="Follow the mechanism on a record">
        <span className="hm-journeyrec__label">Follow it on</span>
        {records.map((r, index) => (
          <button
            key={r.key}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={cn("hm-journeyrec__pick", index === active && "is-active")}
            onClick={() => setActive(index)}
          >
            <span className="dms-data">{r.meta}</span>
            {r.label}
          </button>
        ))}
      </div>
      <PlatformJourney steps={record.steps} configs={record.configs} />
    </div>
  );
}

/* ===================================================== PRODUCT SUITE STAGE */

export type ProductSuiteItem = {
  code: string;
  name: string;
  body: string;
  outcome: string;
  href: string;
  config: ArcadeStepConfig;
};

const SUITE_ADVANCE_MS = 7200;

export function ProductSuiteShowcase({ items }: { items: ProductSuiteItem[] }) {
  const [active, setActive] = useState(0);
  /* auto-play stops for good the moment the visitor takes over */
  const [auto, setAuto] = useState(true);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const inView = useRef(false);
  const activeRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    if (!auto) return;
    if (typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      return;
    }
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => { inView.current = entry.isIntersecting; },
      { threshold: 0.35 },
    );
    observer.observe(host);

    const timer = window.setInterval(() => {
      if (inView.current && !document.hidden) {
        setActive((activeRef.current + 1) % items.length);
      }
    }, SUITE_ADVANCE_MS);

    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, [auto, items.length]);

  const select = (index: number) => {
    setAuto(false);
    setActive(index);
  };

  const item = items[Math.min(active, items.length - 1)];
  const scene = usePannedConfig(item.config);
  return (
    <div className="hm-suite" ref={hostRef}>
      <div className="hm-suite__stage" id="hm-suite-stage" role="tabpanel" aria-live="polite">
        {/* one persistent window: the camera pans between product worlds, the
          * interior dips for the record swap */}
        <div className={cn("hm-suite__scene", scene.dipped && "is-dipped")}>
          <ArcadeStepScene config={scene.shown} />
        </div>
      </div>

      <div className="hm-suite__rail" role="tablist" aria-label="The product suite">
        {items.map((product, index) => (
          <div className={cn("hm-suite__cell", index === active && "is-active")} key={product.code}>
            <button
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="hm-suite-stage"
              className="hm-suite__pick"
              onClick={() => select(index)}
            >
              <span className="hm-suite__code dms-data">{product.code}</span>
              <span className="hm-suite__name">{product.name}</span>
              <span className="hm-suite__body">{product.body}</span>
              <strong className="hm-suite__outcome">{product.outcome}</strong>
              {auto && index === active ? (
                <span className="hm-suite__timer" aria-hidden="true">
                  <i style={{ animationDuration: `${SUITE_ADVANCE_MS}ms` }} />
                </span>
              ) : null}
            </button>
            <Link className="hm-suite__link" href={product.href}>
              Explore {product.code} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
