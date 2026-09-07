"use client";

/* ============================================================================
 * solution-interactive.tsx - the client pieces of the Solutions template on
 * the DMS design system (see SolutionPage.tsx).
 *
 *   SolutionSubnav   - the sticky "On this page" bar: anchor tabs that track
 *                      the section in view, plus the one CTA the page was
 *                      missing between hero and close (the 2026-09-01
 *                      critique's CTA-desert finding). The CTA arrives as a
 *                      server-rendered node so BookDemoButton stays wherever
 *                      it lives.
 *   SolutionCoexist  - the three-path replace-vs-coexist answer (have a
 *                      system / have none / have one with gaps) behind a
 *                      "where is yours today?" selector, drawn on the
 *                      platform page's brand-blue field so the picture reads
 *                      as the same diagram family as /explorations/platform.
 *
 * The hero product shot and the journey stage are the shared arcade mounts
 * (products/_shared/arcade/hero-arcade, platform/platform-interactive) and
 * need nothing from this file.
 * ========================================================================== */

import { useEffect, useState, type ReactNode } from "react";
import type { CoexistPath } from "./types";

/* ------------------------------------------------------------- Subnav */
export interface SubnavTab {
  id: string;
  label: string;
}

export function SolutionSubnav({
  domainName,
  tabs,
  cta,
}: {
  domainName: string;
  tabs: SubnavTab[];
  cta?: ReactNode;
}) {
  const [active, setActive] = useState<string>(tabs[0]?.id ?? "");

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el != null);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setActive(id);
  };

  return (
    <div className="sk-subnav">
      <div className="dms-wrap sk-subnav__inner">
        <span className="sk-subnav__lab">On this page</span>
        <nav className="sk-subnav__tabs" aria-label={`Explore Unifize for ${domainName.toLowerCase()}`}>
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              onClick={(e) => go(e, t.id)}
              className={"sk-subnav__tab" + (active === t.id ? " is-active" : "")}
              aria-current={active === t.id ? "true" : undefined}
            >
              {t.label}
            </a>
          ))}
        </nav>
        {cta ? <div className="sk-subnav__cta">{cta}</div> : null}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- Coexistence */
const DOWN_ARROW = (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v15M5.5 13l6.5 6.5L18.5 13" /></svg>
);

export function CoexistDiagram({
  role,
  chips,
  boxes,
  caption,
  ariaLabel,
}: {
  role: string;
  chips: string[];
  boxes: { name: string; note: string; kind: "sor" | "unifize" | "gap" }[];
  caption: string;
  ariaLabel: string;
}) {
  return (
    <div
      className="sk-cx__field"
      role="img"
      aria-label={ariaLabel}
      style={{ "--sk-boxes": boxes.length } as React.CSSProperties}
    >
      <span className="sk-cx__geo" aria-hidden="true"><i /><i /><i /><i /></span>
      <div className="sk-cx__core" aria-hidden="true">
        <div className="sk-cx__core-head">
          <img src="/logo_dark.svg" alt="" width="658" height="152" />
          <span className="sk-cx__role">{role}</span>
        </div>
        <ul className="sk-cx__core-rows">
          {chips.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>
      <div className="sk-cx__flow" aria-hidden="true">
        {DOWN_ARROW}
        <span>Approved outcome · 21 CFR Part 11 e-signature</span>
      </div>
      <div className="sk-cx__wires" aria-hidden="true">
        {boxes.map((b) => <i key={b.name} />)}
      </div>
      <div className="sk-cx__boxes" aria-hidden="true">
        {boxes.map((b) => (
          <div key={b.name} className={"sk-cx__box" + (b.kind === "unifize" ? " is-unifize" : b.kind === "gap" ? " is-gap" : "")}>
            <b>{b.name}</b>
            <span>{b.note}</span>
          </div>
        ))}
      </div>
      <p className="sk-cx__cap">{caption}</p>
    </div>
  );
}

export function SolutionCoexist({
  selectorLabel,
  paths,
}: {
  selectorLabel: string;
  paths: CoexistPath[];
}) {
  const [active, setActive] = useState(paths[0].id);
  const path = paths.find((p) => p.id === active) ?? paths[0];

  return (
    <div className="sk-cx">
      <div className="sk-cx__bar" role="group" aria-label={selectorLabel}>
        <span className="sk-cx__bar-lab">{selectorLabel}</span>
        <div className="sk-cx__chips">
          {paths.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === active}
              className={"sk-cx__chip" + (p.id === active ? " is-active" : "")}
              onClick={() => setActive(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sk-cx__path" key={path.id}>
        <div className="sk-cx__copy">
          <h3 className="sk-cx__h">{path.heading}</h3>
          <p className="sk-cx__body">{path.body}</p>
          {path.vendors?.length ? (
            <p className="sk-cx__vendors">
              <span>{path.vendors.join(" · ")}</span>, and they all stay.
            </p>
          ) : null}
        </div>
        <CoexistDiagram
          role={path.diagram.role}
          chips={path.diagram.chips}
          boxes={path.diagram.boxes}
          caption={path.diagram.caption}
          ariaLabel={`Diagram: Unifize as the ${path.diagram.role.toLowerCase()} over ${path.diagram.boxes
            .map((b) => b.name + (b.kind === "sor" ? " (kept as a system of record)" : " (runs in Unifize)"))
            .join(", ")}. Approved outcomes carry a 21 CFR Part 11 e-signature.`}
        />
      </div>
    </div>
  );
}
