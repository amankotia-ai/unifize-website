"use client";

/* ----------------------------------------------------------------------------
 * platform-interactive.tsx - the Platform page's two interactive scenes.
 *
 *   PlatformJourney - one change control followed end to end on the arcade's
 *     persistent camera. The scene stays mounted; picking a step swaps the
 *     config so the camera PANS between poses. Auto-advances while in view
 *     (Apple product-page idiom) until the visitor takes over; respects
 *     prefers-reduced-motion.
 *
 *   PlatformStack - a connected, three-band diagram. Product selection
 *     traces a change through outcomes and shared workflow components.
 *     Focused examples explain each node; the trust strip stays below.
 *
 * Both are self-contained client components, keyboard-operable, styled by
 * platform-kit.css (pf-journey / pf-stack namespaces).
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PlatformStackDiagram } from "./platform-stack-diagram";
import { cn } from "@/lib/cn";
import { ArcadeStepScene, type ArcadeStepConfig } from "../products/_shared/arcade/arcade";
import { RibbonField, type RibbonComposition } from "../products/_shared/arcade/ribbon-field";

const pad = (n: number) => String(n).padStart(2, "0");

/* ========================================================== PLATFORM JOURNEY */

export type PlatformJourneyStep = {
  title: string;
  body: string;
  /* optional stroke glyph (a 24-grid SVG path set) drawn in a tile above the index */
  glyph?: ReactNode;
  /* optional SOLID icon (one 20-grid path, filled) that REPLACES the index
   * in the head row (the AI rail, 22 Sep 2026: no numbers, solid icons) */
  icon?: string;
  /* optional status chip beside the index ("Live today", "On the roadmap"):
   * the AI journey dates its claims so nothing reads as shipped that is not */
  tag?: { label: string; tone: "live" | "next" };
};

const AUTO_ADVANCE_MS = 5600;

export function PlatformJourney({
  steps,
  configs,
  label = "One change, followed end to end",
  stageClassName,
  stageField,
  ribbon,
  layout = "rail",
  cut = false,
}: {
  /* side layout only: cut the in-app nav rail and conversation list away
   * (the first 324px of the engine's 1150 grid) so the 826-wide record and
   * checklist fill the column, the way the hero and gap stages frame it
   * (22 Sep 2026); the CSS clip lives in platform-rails.css */
  cut?: boolean;
  /* rail (default): the stage full width, the steps in a row under it.
   * side: one frame, the steps as a vertical list on the left and the
   * stage on the right (the AI section, 22 Sep 2026) */
  layout?: "rail" | "side";
  /* mount the shared ribbon container on the stage (the platform page passes
   * this from a server component, where handing over a ready-made element
   * trips React's key check; the homepage still uses stageField) */
  ribbon?: RibbonComposition;
  steps: PlatformJourneyStep[];
  configs: ArcadeStepConfig[];
  /* an optional field painted behind the scene, and the class that styles
   * the stage for it (the homepage mounts the ribbon container this way) */
  stageClassName?: string;
  stageField?: ReactNode;
  /* the rail's accessible name; the platform hero names its own journey */
  label?: string;
}) {
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
        setActive((activeRef.current + 1) % steps.length);
      }
    }, AUTO_ADVANCE_MS);

    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, [auto, steps.length]);

  /* side layout: the stage is a column, not the page width, so the camera
   * factor is measured off the stage (the widest pose is .96 of the engine's
   * 1150px window; keep 36px of margin each side) instead of guessed per
   * viewport band */
  const stageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (layout !== "side" || !stage) return;
    const fit = () => {
      const visible = cut ? 826 : 1150;
      const k = (stage.clientWidth - 72) / (visible * 0.96);
      stage.style.setProperty("--pf-cam-k", Math.max(0.5, Math.min(cut ? 1 : 0.88, k)).toFixed(3));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => { observer.disconnect(); stage.style.removeProperty("--pf-cam-k"); };
  }, [layout, cut]);

  const select = (index: number) => {
    setAuto(false);
    setActive(index);
  };

  return (
    <div className={cn("pf-journey", layout === "side" && "pf-journey--side", cut && "pf-journey--cut")} ref={hostRef}>
      {/* ONE scene, config swapped in place: the camera pans between poses */}
      <div
        className={cn("pf-journey__stage", stageClassName, ribbon && `rf rf--${ribbon}`)}
        id="pf-journey-stage"
        role="tabpanel"
        aria-live="polite"
        ref={stageRef}
      >
        {ribbon ? <RibbonField composition={ribbon} /> : stageField}
        <ArcadeStepScene config={configs[Math.min(active, configs.length - 1)]} />
      </div>

      {/* one column per step: five on the home page, six on the platform hero */}
      <div
        className="pf-journey__rail"
        role="tablist"
        aria-label={label}
        style={{ "--pf-journey-count": steps.length } as React.CSSProperties}
      >
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="pf-journey-stage"
            className={cn("pf-journey__step", index === active && "is-active")}
            onClick={() => select(index)}
          >
            {step.glyph ? (
              <span className="pf-journey__glyph" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  {step.glyph}
                </svg>
              </span>
            ) : null}
            <span className="pf-journey__head">
              {step.icon ? (
                <span className="pf-journey__icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20"><path fillRule="evenodd" d={step.icon} /></svg>
                </span>
              ) : (
                <span className="pf-journey__idx dms-data" aria-hidden="true">{pad(index + 1)}</span>
              )}
              {step.tag ? <span className="pf-journey__tag" data-tone={step.tag.tone}>{step.tag.label}</span> : null}
            </span>
            <span className="pf-journey__name">{step.title}</span>
            <span className="pf-journey__body">{step.body}</span>
            {auto && index === active ? (
              <span className="pf-journey__timer" aria-hidden="true">
                <i style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }} />
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ PLATFORM STACK
 * The three customer-facing bands, per the Story Architecture: Outcomes +
 * AI Assist on top, Products, Workflow Components. The Core Platform band
 * is internal infrastructure and stays off the page; its customer-relevant
 * facts live in the Coexistence and Compliance sections instead. */

/* the trust strip: the same badge set the home page carries */
const TRUST_BADGES: { label: string; glyph: ReactNode }[] = [
  { label: "SOC 2 Type II", glyph: <path d="M22 13l-6 2.6v4.6c0 3.7 2.6 6.6 6 7.6 3.4-1 6-3.9 6-7.6v-4.6L22 13zm-2.6 8.2l1.9 1.9 3.6-3.6" /> },
  { label: "GDPR ready", glyph: <path d="M16.5 20.5h11v8h-11zM19.5 20.5v-2.5a2.5 2.5 0 0 1 5 0v2.5" /> },
  { label: "Zero data training", glyph: <path d="M22 15.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM22 18v4l2.5 1.6" /> },
];

export function PlatformStack() {
  return (
    <div className="pf-stack">
      <PlatformStackDiagram />

      {/* the trust strip, tucked under the sheet */}
      <div className="pf-stack__trust">
        <p className="pf-stack__trust-lead">
          Engineered with security and privacy at its core.
        </p>
        <ul className="pf-stack__badges" aria-label="Security and privacy">
          {TRUST_BADGES.map((badge) => (
            <li className="pf-stack__badge" key={badge.label}>
              <span className="pf-stack__badge-seal" aria-hidden="true">
                <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="22" cy="22" r="19" />
                  <circle cx="22" cy="22" r="15.5" strokeDasharray="2.2 3" />
                  {badge.glyph}
                </svg>
              </span>
              {badge.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
