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
 *   PlatformStack - the canonical four-band platform stack (PLT-2) as a
 *     touchable object: pick a band, the stack explodes around it and the
 *     detail panel reads it out.
 *
 * Both are self-contained client components, keyboard-operable, styled by
 * platform-kit.css (pf-journey / pf-stack namespaces).
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
 * The four bands, verbatim from the concept map: Outcomes + AI Assist on
 * top, Core Platform underneath everything. */

type StackBand = {
  key: string;
  name: string;
  tag: string;
  body: string;
  chips?: string[];
  chipsLabel?: string;
  products?: { code: string; name: string; href: string }[];
  note?: string;
};

const BANDS: StackBand[] = [
  {
    key: "outcomes",
    name: "Outcomes + AI Assist",
    tag: "What you feel",
    body:
      "Work closes faster and arrives provable: less waiting, fewer reopens, evidence complete at sign-off. AI drafts, chases, and summarizes inside the work; your people approve and stay accountable.",
    chipsLabel: "AI assists with",
    chips: ["Assisted capture", "Execution assist", "Measurement assist"],
  },
  {
    key: "products",
    name: "Product Suite",
    tag: "What you buy",
    body:
      "Products your team and your auditors already understand, ready for your industry on day one. Start with one; add the next on the same foundation when you are ready.",
    products: [
      { code: "QMS", name: "Quality management", href: "/explorations/products/qms" },
      { code: "DMS", name: "Document management", href: "/explorations/products/dms" },
      { code: "PLM", name: "Product lifecycle", href: "/explorations/products/plm" },
      { code: "MES", name: "Manufacturing execution", href: "/explorations/products/mes" },
    ],
  },
  {
    key: "components",
    name: "Workflow Components",
    tag: "What it runs on",
    body:
      "Every product above is assembled from the same no-code blocks, so the platform shapes itself to your process, not the other way around.",
    chipsLabel: "The blocks",
    chips: ["Stages", "Gates", "Roles", "Approvals", "Evidence requirements", "Forms", "Automations", "Templates"],
  },
  {
    key: "core",
    name: "Core Platform",
    tag: "What holds it",
    body:
      "One governed layer under everything: accountable threads, structured data, and an audit trail that writes itself as the work happens. Your systems of record stay authoritative.",
    chipsLabel: "Always on",
    chips: ["Accountable threads", "Structured data", "Audit trail", "Part 11 e-signatures", "Permissions", "API & connectors"],
  },
];

export function PlatformStack() {
  const [active, setActive] = useState(1); /* land on the products band */
  const band = BANDS[active];

  return (
    <div className="pf-stack">
      {/* the object: four touchable bands that explode around the pick */}
      <div className="pf-stack__object" role="tablist" aria-label="The four bands of the platform">
        {BANDS.map((item, index) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="pf-stack-detail"
            className={cn(
              "pf-stack__band",
              index === active && "is-active",
              index < active && "is-above",
              index > active && "is-below",
            )}
            onClick={() => setActive(index)}
          >
            <span className="pf-stack__band-idx dms-data" aria-hidden="true">{pad(index + 1)}</span>
            <span className="pf-stack__band-name">{item.name}</span>
            <span className="pf-stack__band-tag">{item.tag}</span>
          </button>
        ))}
        <span className="pf-stack__ground" aria-hidden="true">Your systems of record · your tools · unchanged</span>
      </div>

      {/* the active band, read out */}
      <div className="pf-stack__detail" id="pf-stack-detail" role="tabpanel" aria-label={band.name}>
        <div className="pf-stack__detail-inner" key={band.key}>
          <span className="pf-stack__detail-tag">{band.tag}</span>
          <h3 className="pf-stack__detail-name">{band.name}</h3>
          <p className="pf-stack__detail-body">{band.body}</p>

          {band.products ? (
            <ul className="pf-stack__products">
              {band.products.map((product) => (
                <li key={product.code}>
                  <Link className="pf-stack__product" href={product.href}>
                    <span className="pf-stack__product-code">{product.code}</span>
                    <span className="pf-stack__product-name">{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          {band.chips ? (
            <div className="pf-stack__chips-row">
              {band.chipsLabel ? <span className="pf-stack__chips-lab">{band.chipsLabel}</span> : null}
              <ul className="pf-stack__chips">
                {band.chips.map((chip) => (
                  <li key={chip} className="pf-stack__chip">{chip}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {band.note ? <p className="pf-stack__detail-note">{band.note}</p> : null}
        </div>
      </div>
    </div>
  );
}
