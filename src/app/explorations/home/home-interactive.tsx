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
 * rail, each posed in its own product's world. Worlds change wholesale
 * between products, so the scene remounts keyed instead of panning.
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
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
  return (
    <div className="hm-suite" ref={hostRef}>
      <div className="hm-suite__stage" id="hm-suite-stage" role="tabpanel" aria-live="polite">
        {/* keyed remount: each product poses in its own world */}
        <div key={item.code} className="hm-suite__scene">
          <ArcadeStepScene config={item.config} />
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
