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

  /* filtering should show its result: if the open row survives the filter it
   * stays; otherwise the first domain with a match opens */
  const applyStandard = (next: string | null) => {
    setStandard(next);
    const matches = (d: (typeof MD_DOMAIN_MAP)[number]) =>
      next ? d.modules.some((m) => (m.standards ?? []).includes(next)) : true;
    if (!MD_DOMAIN_MAP.some((d) => d.slug === open && matches(d))) {
      setOpen(MD_DOMAIN_MAP.find(matches)?.slug ?? "");
    }
  };

  /* per-standard module tallies: the filter bar tells you what each standard
   * is worth before you commit to it */
  const tally = useMemo(() => {
    const perStandard = new Map<string, number>();
    let total = 0;
    for (const d of MD_DOMAIN_MAP) {
      for (const m of d.modules) {
        total += 1;
        for (const s of m.standards ?? []) perStandard.set(s, (perStandard.get(s) ?? 0) + 1);
      }
    }
    return { perStandard, total };
  }, []);

  const shownModules = domains.reduce((n, d) => n + d.filtered.length, 0);
  const shownDomains = domains.filter((d) => d.filtered.length > 0).length;

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
            onClick={() => applyStandard(null)}
          >
            All standards
            <span className="itm-cov__chip-n itm-data">{tally.total}</span>
          </button>
          {STANDARD_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={standard === s}
              className={"itm-cov__chip" + (standard === s ? " is-active" : "")}
              onClick={() => applyStandard(standard === s ? null : s)}
            >
              {s}
              <span className="itm-cov__chip-n itm-data">{tally.perStandard.get(s) ?? 0}</span>
            </button>
          ))}
        </div>
        <span className="itm-cov__readout" aria-live="polite">
          <b className="itm-data">{shownModules}</b> {shownModules === 1 ? "module" : "modules"} ·{" "}
          <b className="itm-data">{shownDomains}</b> {shownDomains === 1 ? "domain" : "domains"}
        </span>
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
                <span className="itm-cov__id">
                  <span className="itm-cov__name">{d.name}</span>
                  <span className="itm-cov__promise">{d.promise}</span>
                </span>
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
                      return (
                        <div key={m.name} className={"itm-cov__mod " + (live ? "is-live" : "is-soon")}>
                          <div className="itm-cov__mod-top">
                            <span className="itm-cov__mod-name">{m.name}</span>
                          </div>
                          <p className="itm-cov__mod-blurb">{m.blurb}</p>
                          {m.standards && m.standards.length > 0 ? (
                            <div className="itm-cov__mod-std">
                              {m.standards.map((s) => (
                                <span key={s} className={"itm-cov__tag" + (standard === s ? " is-hit" : "")}>{s}</span>
                              ))}
                            </div>
                          ) : null}
                        </div>
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
