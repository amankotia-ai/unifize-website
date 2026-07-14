"use client";

/* ============================================================================
 * Interactive pieces for the domain (Solutions) template.
 *
 * DomainIngressNav — the sticky ingress sub-nav, generalised from the
 * industries kit's IngressNav to take its tabs as props: the domain page's
 * ink block has FOUR ways in (by industry / by module / by role / by moment)
 * where the industry page has three. Presentation and class names are the
 * itm-subnav family, unchanged.
 *
 * LeakRegister — the severity-filterable pain register (section 02): a
 * horizontal severity filter bar (the ModuleIndex "Audited against" pattern)
 * over a card grid. Severity is encoded by shape AND colour (Critical = red
 * octagon, High = amber triangle, Medium = muted diamond), never a one-sided
 * coloured border. No count readouts — the cards themselves are the answer.
 *
 * The other interactive sections (PersonaExplorer, ModuleIndex) are reused
 * directly from ../../industries/_shared/industry-interactive — same
 * precedent as the persona/trigger kits importing from the product kit.
 * ========================================================================== */

import { useEffect, useState } from "react";
import type { PainRow, PainSeverity } from "./types";

/* ------------------------------------------------------------ IngressNav */
export interface IngressTab {
  id: string;
  label: string;
}

export function DomainIngressNav({
  domainName,
  label,
  tabs,
}: {
  domainName: string;
  label: string;
  tabs: IngressTab[];
}) {
  const [active, setActive] = useState<string>(tabs[0].id);

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
    <div className="itm-subnav">
      <div className="itm-wrap itm-wrap--wide itm-subnav__inner">
        <span className="itm-subnav__lab">{label}</span>
        <nav className="itm-subnav__tabs" aria-label={`Explore Unifize for ${domainName.toLowerCase()}`}>
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              onClick={(e) => go(e, t.id)}
              className={"itm-subnav__tab" + (active === t.id ? " is-active" : "")}
              aria-current={active === t.id ? "true" : undefined}
            >
              <span className="itm-subnav__tab-l">{t.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ PainSeverityIcon */
/* Extends the trigger board's shape family: Critical shares the red octagon,
 * High the amber triangle, Medium a muted diamond (colour hooks live in
 * domain-kit.css). */
const PAIN_SHAPE: Record<PainSeverity, React.ReactNode> = {
  Critical: <path d="M7.6 2h8.8L22 7.6v8.8L16.4 22H7.6L2 16.4V7.6L7.6 2Z" />,
  High: <path d="M12 2.6 22 20.4a1.4 1.4 0 0 1-1.2 2.1H3.2A1.4 1.4 0 0 1 2 20.4L12 2.6Z" />,
  Medium: <path d="M12 2l10 10-10 10L2 12 12 2Z" />,
};
const PAIN_MARK: Record<PainSeverity, React.ReactNode> = {
  Critical: <><rect x="10.8" y="7" width="2.4" height="7" rx="1.2" /><circle cx="12" cy="17.4" r="1.4" /></>,
  High: <><rect x="10.8" y="9" width="2.4" height="6" rx="1.2" /><circle cx="12" cy="18" r="1.3" /></>,
  Medium: <><rect x="10.8" y="7.5" width="2.4" height="6.5" rx="1.2" /><circle cx="12" cy="16.8" r="1.3" /></>,
};

export function PainSeverityIcon({ severity }: { severity: PainSeverity }) {
  return (
    <svg className={"itm-sev itm-sev--" + severity.toLowerCase()} viewBox="0 0 24 24" aria-hidden="true">
      <g className="itm-sev__shape">{PAIN_SHAPE[severity]}</g>
      <g fill="#fff">{PAIN_MARK[severity]}</g>
    </svg>
  );
}

/* ---------------------------------------------------------- LeakRegister */
const SEVERITIES: PainSeverity[] = ["Critical", "High", "Medium"];

export function LeakRegister({ pains, note }: { pains: PainRow[]; note: string }) {
  const [sev, setSev] = useState<PainSeverity | null>(null);
  const shown = sev ? pains.filter((p) => p.severity === sev) : pains;

  return (
    <div className="dk-lk">
      <div className="dk-lk__bar" role="group" aria-label="Filter failure modes by severity">
        <span className="dk-lk__bar-lab">Severity</span>
        <div className="dk-lk__chips">
          <button
            type="button"
            aria-pressed={sev === null}
            className={"dk-lk__chip" + (sev === null ? " is-active" : "")}
            onClick={() => setSev(null)}
          >
            All severities
          </button>
          {SEVERITIES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={sev === s}
              className={"dk-lk__chip" + (sev === s ? " is-active" : "")}
              onClick={() => setSev((cur) => (cur === s ? null : s))}
            >
              <span className="dk-lk__chip-ic" aria-hidden="true"><PainSeverityIcon severity={s} /></span>
              {s}
            </button>
          ))}
        </div>
      </div>

      <ul className="dk-lk__cards" key={sev ?? "all"}>
        {shown.map((p) => (
          <li key={p.name} className={"dk-leak dk-leak--" + p.severity.toLowerCase()}>
            <div className="dk-leak__head">
              <span className="dk-leak__ic" aria-hidden="true"><PainSeverityIcon severity={p.severity} /></span>
              <span className="dk-leak__sev">{p.severity}</span>
              <span className="dk-leak__surface">{p.surface}</span>
            </div>
            <h3 className="dk-leak__name">{p.name}</h3>
            <p className="dk-leak__body">{p.body}</p>
          </li>
        ))}
      </ul>

      <p className="dk-lk__note"><span className="itm-dot" aria-hidden="true" />{note}</p>
    </div>
  );
}
