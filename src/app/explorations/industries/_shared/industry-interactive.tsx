"use client";

/* ============================================================================
 * Interactive pieces for the industry template, generalised from the Medical
 * Devices instance (industry-template-modern) to be prop-driven so every
 * industry data file reuses them unchanged:
 *   IngressNav       — sticky "three ways in" sub-nav + scroll-spy
 *   PersonaExplorer  — role rail → role detail (by your role)
 *   ModuleIndex      — indexed domain ledger, standard-filtered (coverage)
 *   CostLedger       — segmented cost view (events / consequences) + stakes
 * Presentation + class names are identical to the reference page; only the data
 * source changed from hard-wired imports to props.
 * ========================================================================== */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type {
  MapDomain,
  PersonaCard,
  PersonaIcon,
  CoordinationEvent,
  ConsequenceGroup,
} from "./types";

/* ----------------------------------------------------------------- IngressNav */
export function IngressNav({
  industryName,
  hints,
}: {
  industryName: string;
  hints: { role: string; modules: string; breaking: string };
}) {
  const TABS = [
    { id: "by-role", label: "By your role", hint: hints.role },
    { id: "modules", label: "What we cover", hint: hints.modules },
    { id: "whats-breaking", label: "What's breaking", hint: hints.breaking },
  ] as const;

  const [active, setActive] = useState<string>(TABS[0].id);

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(
      (el): el is HTMLElement => el != null,
    );
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
        <span className="itm-subnav__lab">Three ways in</span>
        <nav className="itm-subnav__tabs" aria-label={`Explore Unifize for ${industryName.toLowerCase()}`}>
          {TABS.map((t) => (
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

/* ------------------------------------------------------------ PersonaExplorer */
/* One solid role glyph per seat — a stable visual identity keyed by iconKey. */
const ROLE_ICON: Record<PersonaIcon, React.ReactNode> = {
  quality: <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.718-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />,
  operations: <path d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" />,
  regulatory: <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />,
  "compliance-validation": <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />,
  engineering: <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />,
};

const split = (s: string) => s.split(" · ").filter(Boolean);

export function PersonaExplorer({ personas }: { personas: PersonaCard[] }) {
  const [key, setKey] = useState(personas[0].key);
  const p = personas.find((x) => x.key === key) ?? personas[0];

  return (
    <div className="itm-pex">
      <div className="itm-pex__rail" role="tablist" aria-label="Choose a role" aria-orientation="vertical">
        {personas.map((x) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            aria-selected={x.key === key}
            className={"itm-pex__role" + (x.key === key ? " is-active" : "")}
            onClick={() => setKey(x.key)}
          >
            <span className="itm-pex__role-name">{x.name}</span>
            <span className={"itm-pex__role-tag" + (x.primary ? " is-primary" : "")}>{x.stake}</span>
          </button>
        ))}
      </div>

      <div className="itm-pex__detail" role="tabpanel" key={p.key}>
        <div className="itm-pex__head">
          <span className="itm-pex__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">{ROLE_ICON[p.iconKey]}</svg>
          </span>
          <div className="itm-pex__head-text">
            <h3 className="itm-pex__name">{p.name}</h3>
            <p className="itm-pex__titles">{p.titles.join(" · ")}</p>
          </div>
        </div>

        <div className="itm-pex__seat">
          <span className="itm-pex__seat-lab">With Unifize</span>
          <p className="itm-pex__owns">{p.value}</p>
        </div>

        <div className="itm-pex__cw">
          <div>
            <span className="itm-pex__cw-lab">Cares about</span>
            <div className="itm-pex__chips">
              {split(p.cares).map((c) => <span key={c} className="itm-pex__chip">{c}</span>)}
            </div>
          </div>
          <div>
            <span className="itm-pex__cw-lab">Worries about</span>
            <div className="itm-pex__chips itm-pex__chips--worry">
              {split(p.worries).map((w) => <span key={w} className="itm-pex__chip">{w}</span>)}
            </div>
          </div>
        </div>

        <div className="itm-pex__cta">
          {p.href ? (
            <Link href={p.href} className="itm-btn">Open the {p.name} page →</Link>
          ) : p.anchor ? (
            <a href={p.anchor} className="itm-btn itm-btn-ghost">See how this is answered ↓</a>
          ) : (
            <button type="button" className="itm-btn itm-btn-ghost">Talk to us about {p.name.toLowerCase()}</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- ModuleIndex */
const pad = (n: number) => String(n).padStart(2, "0");

export function ModuleIndex({
  domains: domainMap,
  standardFilters,
}: {
  domains: MapDomain[];
  standardFilters: string[];
}) {
  const [standard, setStandard] = useState<string | null>(null);
  const [open, setOpen] = useState<string>(domainMap[0].slug);

  const domains = useMemo(
    () =>
      domainMap.map((d) => ({
        ...d,
        filtered: standard ? d.modules.filter((m) => (m.standards ?? []).includes(standard)) : d.modules,
      })),
    [standard, domainMap],
  );

  return (
    <div className="itm-cov">
      <span id="itm-cov-empty" className="itm-sr-only">No modules evidence the selected standard</span>

      <div className="itm-cov__filter" role="group" aria-label="Filter modules by standard">
        <span className="itm-cov__filter-lab">Audited against</span>
        <div className="itm-cov__chips">
          <button
            type="button"
            aria-pressed={standard === null}
            className={"itm-cov__chip" + (standard === null ? " is-active" : "")}
            onClick={() => setStandard(null)}
          >
            All standards
          </button>
          {standardFilters.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={standard === s}
              className={"itm-cov__chip" + (standard === s ? " is-active" : "")}
              onClick={() => setStandard((cur) => (cur === s ? null : s))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <ol className="itm-cov__ledger">
        {domains.map((d, i) => {
          const empty = d.filtered.length === 0;
          const isOpen = open === d.slug && !empty;
          return (
            <li key={d.slug} className={"itm-cov__row" + (isOpen ? " is-open" : "") + (empty ? " is-empty" : "")}>
              <button
                type="button"
                className="itm-cov__head"
                aria-expanded={isOpen}
                aria-disabled={empty || undefined}
                aria-describedby={empty ? "itm-cov-empty" : undefined}
                onClick={() => { if (!empty) setOpen((cur) => (cur === d.slug ? "" : d.slug)); }}
              >
                <span className="itm-cov__idx itm-data" aria-hidden="true">{pad(i + 1)}</span>
                <span className="itm-cov__name">{d.name}</span>
                <span className="itm-cov__promise">{d.promise}</span>
                <span className="itm-cov__count">
                  <span className="itm-data">{d.filtered.length}</span>
                  <span className="itm-cov__count-lab">{d.filtered.length === 1 ? "module" : "modules"}</span>
                </span>
                <span className="itm-cov__chev" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>

              <div className="itm-cov__panel">
                <div className="itm-cov__panel-inner">
                  <div className="itm-cov__mods">
                    {d.filtered.map((m) => {
                      const live = Boolean(m.href);
                      const inner = (
                        <>
                          <div className="itm-cov__mod-top">
                            <span className="itm-cov__mod-name">{m.name}</span>
                            {live ? (
                              <span className="itm-cov__mod-badge"><span className="itm-dot" aria-hidden="true" />Live</span>
                            ) : null}
                          </div>
                          <p className="itm-cov__mod-blurb">{m.blurb}</p>
                          {m.standards && m.standards.length > 0 ? (
                            <div className="itm-cov__mod-std">
                              {m.standards.map((s) => (
                                <span key={s} className={"itm-cov__tag" + (standard === s ? " is-hit" : "")}>{s}</span>
                              ))}
                            </div>
                          ) : null}
                          {live ? <span className="itm-cov__mod-go">Open module →</span> : null}
                        </>
                      );
                      return live ? (
                        <Link key={m.name} href={m.href!} className="itm-cov__mod is-live">{inner}</Link>
                      ) : (
                        <div key={m.name} className="itm-cov__mod is-soon">{inner}</div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ CostLedger */
const usdM = (n: number) =>
  "$" + (n / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 }) + "M";

export function CostLedger({
  events,
  consequences,
  economics,
  stakesMeta,
}: {
  events: CoordinationEvent[];
  consequences: ConsequenceGroup[];
  economics: { companies: number; employees: number | null; annualTaxLow: number | null; annualTaxHigh: number | null };
  stakesMeta: string;
}) {
  const [view, setView] = useState<"events" | "consequences">("events");
  const hasTax = economics.annualTaxLow != null && economics.annualTaxHigh != null;

  return (
    <div className="itm-cost">
      <div className="itm-seg" role="group" aria-label="Cost view">
        <button
          type="button"
          aria-pressed={view === "events"}
          className={"itm-seg__btn" + (view === "events" ? " is-active" : "")}
          onClick={() => setView("events")}
        >
          Where the tax accrues
        </button>
        <button
          type="button"
          aria-pressed={view === "consequences"}
          className={"itm-seg__btn" + (view === "consequences" ? " is-active" : "")}
          onClick={() => setView("consequences")}
        >
          What it compounds into
        </button>
      </div>

      {view === "events" ? (
        <div className="itm-ledger" key="events">
          <div className="itm-ledger__head">
            <span>Coordination event</span>
            <span>Owned by</span>
            <span>What&rsquo;s at risk</span>
          </div>
          {events.map((v) => (
            <div key={v.name} className="itm-ledger__row">
              <span className="itm-ledger__ev">{v.name}<em>{v.coordination}</em></span>
              <span className="itm-ledger__own">{v.owner}</span>
              <span className="itm-ledger__risk">{v.atRisk}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="itm-conseq" key="consequences">
          {consequences.map((c) => (
            <div key={c.type} className="itm-conseq__card">
              <h3>{c.type}</h3>
              <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
              <span className="itm-conseq__tag"><span className="itm-dot" aria-hidden="true" />No one owns it</span>
            </div>
          ))}
        </div>
      )}

      {hasTax ? (
        <div className="itm-stakes">
          <div className="itm-stakes__text">
            <span className="itm-stakes__lab">Estimated coordination tax, per company per year</span>
            <span className="itm-stakes__meta">{stakesMeta}</span>
          </div>
          <span className="itm-stakes__val">
            <span className="itm-data">{usdM(economics.annualTaxLow! / economics.companies)}</span>
            <span className="itm-stakes__to">to</span>
            <span className="itm-data">{usdM(economics.annualTaxHigh! / economics.companies)}</span>
          </span>
        </div>
      ) : null}
    </div>
  );
}
