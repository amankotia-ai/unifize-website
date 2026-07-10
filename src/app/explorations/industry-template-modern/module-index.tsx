"use client";

/* ============================================================================
 * Coverage (Unifize enterprise design system, ink treatment) — the MODULE
 * INGRESS, redesigned as an indexed domain ledger. The nine coordination
 * domains read as a spec sheet: mono index 01–09, domain name, its promise,
 * and a live count of the modules that evidence the selected standard. Opening
 * a domain reveals those modules inline (accordion), so the whole surface is a
 * single scannable register rather than a tabbed panel. Logic + data
 * (MD_DOMAIN_MAP, STANDARD_FILTERS) are unchanged; only the presentation and
 * the cross-filter are reworked.
 * ========================================================================== */

import { useMemo, useState } from "react";
import Link from "next/link";
import { MD_DOMAIN_MAP } from "@/lib/platform-data/md-module-map";
import { STANDARD_FILTERS } from "./industry-data";

const pad = (n: number) => String(n).padStart(2, "0");

export function ModuleIndex() {
  const [standard, setStandard] = useState<string | null>(null);
  const [open, setOpen] = useState<string>(MD_DOMAIN_MAP[0].slug);

  const domains = useMemo(
    () =>
      MD_DOMAIN_MAP.map((d) => ({
        ...d,
        filtered: standard ? d.modules.filter((m) => (m.standards ?? []).includes(standard)) : d.modules,
      })),
    [standard],
  );

  return (
    <div className="itm-cov">
      <span id="itm-cov-empty" className="itm-sr-only">
        No modules evidence the selected standard
      </span>

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
          {STANDARD_FILTERS.map((s) => (
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
                              <span className="itm-cov__mod-badge">
                                <span className="itm-dot" aria-hidden="true" />
                                Live
                              </span>
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
