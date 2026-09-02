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
 *   PlatformStack - the three customer-facing bands as one white sheet: a
 *     tab list on the left (the pick opens to its line and its link) and a
 *     tinted panel on the right holding three plain cards that show, not
 *     tell, what the band is. A trust strip sits under the sheet.
 *
 * Both are self-contained client components, keyboard-operable, styled by
 * platform-kit.css (pf-journey / pf-stack namespaces).
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { OutcomesCards, SuiteCards, BlocksCards } from "./platform-stack-cards";
import { cn } from "@/lib/cn";
import { ArcadeStepScene, type ArcadeStepConfig } from "../products/_shared/arcade/arcade";

const pad = (n: number) => String(n).padStart(2, "0");

/* ========================================================== PLATFORM JOURNEY */

export type PlatformJourneyStep = {
  title: string;
  body: string;
};

const AUTO_ADVANCE_MS = 5600;

export function PlatformJourney({
  steps,
  configs,
}: {
  steps: PlatformJourneyStep[];
  configs: ArcadeStepConfig[];
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

  const select = (index: number) => {
    setAuto(false);
    setActive(index);
  };

  return (
    <div className="pf-journey" ref={hostRef}>
      {/* ONE scene, config swapped in place: the camera pans between poses */}
      <div className="pf-journey__stage" id="pf-journey-stage" role="tabpanel" aria-live="polite">
        <ArcadeStepScene config={configs[Math.min(active, configs.length - 1)]} />
      </div>

      <div className="pf-journey__rail" role="tablist" aria-label="One change, followed end to end">
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
            <span className="pf-journey__idx dms-data" aria-hidden="true">{pad(index + 1)}</span>
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

type StackBand = {
  key: string;
  name: string;
  tag: string;
  desc: string;
  link: { label: string; href: string };
  /* an optional mono caption above the cards (the frame they sit in) */
  caption?: string;
  cards: () => ReactNode;
};

const BANDS: StackBand[] = [
  {
    key: "outcomes",
    name: "Outcomes + AI Assist",
    tag: "What you feel",
    desc: "Work closes faster and arrives provable. AI drafts, chases, and summarizes inside the work; your people approve.",
    link: { label: "See it measured", href: "#measured" },
    caption: "One change control, as your team meets it",
    cards: OutcomesCards,
  },
  {
    key: "products",
    name: "Product Suite",
    tag: "What you buy",
    desc: "Products your team and your auditors already understand. Start with one; add the next on the same foundation.",
    link: { label: "Explore the products", href: "/explorations/products/qms" },
    caption: "Start with one · add the rest when you are ready",
    cards: SuiteCards,
  },
  {
    key: "components",
    name: "Workflow Components",
    tag: "What it runs on",
    desc: "Every product is assembled from the same no-code blocks, so the platform shapes itself to your process.",
    link: { label: "Watch one change close", href: "#platform" },
    caption: "Eight blocks · every product is built from them",
    cards: BlocksCards,
  },
];

/* the trust strip: the same badge set the home page carries */
const TRUST_BADGES: { label: string; glyph: ReactNode }[] = [
  { label: "SOC 2 Type II", glyph: <path d="M22 13l-6 2.6v4.6c0 3.7 2.6 6.6 6 7.6 3.4-1 6-3.9 6-7.6v-4.6L22 13zm-2.6 8.2l1.9 1.9 3.6-3.6" /> },
  { label: "GDPR ready", glyph: <path d="M16.5 20.5h11v8h-11zM19.5 20.5v-2.5a2.5 2.5 0 0 1 5 0v2.5" /> },
  { label: "Zero data training", glyph: <path d="M22 15.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM22 18v4l2.5 1.6" /> },
];

const Chevron = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 2.5L8 6l-3.5 3.5" />
  </svg>
);

export function PlatformStack() {
  const [active, setActive] = useState(0);

  return (
    <div className="pf-stack">
      <div className="pf-stack__card">
        {/* the tab list: the pick opens to its line and its link. Every
         * tab's open block stays mounted so the reveal is a measured
         * height transition, not a jump. */}
        <div className="pf-stack__tabs" role="tablist" aria-label="The three bands of the platform">
          {BANDS.map((item, index) => {
            const isActive = index === active;
            return (
              <div key={item.key} className={cn("pf-stack__tab", isActive && "is-active")}>
                <button
                  type="button"
                  role="tab"
                  id={`pf-stack-tab-${item.key}`}
                  aria-selected={isActive}
                  aria-controls={`pf-stack-panel-${item.key}`}
                  className="pf-stack__tab-btn"
                  onClick={() => setActive(index)}
                >
                  {item.name}
                </button>
                <div className="pf-stack__tab-open" aria-hidden={!isActive}>
                  <div className="pf-stack__tab-open-inner">
                    <p className="pf-stack__tab-desc">{item.desc}</p>
                    <Link className="pf-stack__tab-link" href={item.link.href} tabIndex={isActive ? 0 : -1}>
                      {item.link.label}
                      <Chevron />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* the panel: every band's cards stacked in one grid cell, so the
         * sheet is always as tall as its tallest state */}
        <div className="pf-stack__panel">
          <div className="pf-stack__panels">
            {BANDS.map((item, index) => {
              const isActive = index === active;
              return (
                <div
                  key={item.key}
                  className="pf-stack__cards"
                  id={`pf-stack-panel-${item.key}`}
                  role="tabpanel"
                  aria-labelledby={`pf-stack-tab-${item.key}`}
                  aria-hidden={!isActive}
                  data-active={isActive}
                >
                  {item.caption ? <span className="pf-stack__cap">{item.caption}</span> : null}
                  <item.cards />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* the trust strip, tucked under the sheet */}
      <div className="pf-stack__trust">
        <p className="pf-stack__trust-lead">
          Engineered with security and privacy at its core.
          <a className="pf-stack__trust-link" href="#compliance">
            Compliance
            <Chevron />
          </a>
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
