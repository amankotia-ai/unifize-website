"use client";

/* ============================================================================
 * Module index — the MODULE INGRESS (Coverage section), now an interactive
 * domain explorer: a vertical tab list of the 9 domains + a panel showing the
 * selected domain's modules. Cross-filterable "by standard". Collapses a long
 * stack into one screen. Live modules link out; the rest are badged honestly.
 * ========================================================================== */

import { useMemo, useState } from "react";
import Link from "next/link";
import { MD_DOMAIN_MAP } from "@/lib/platform-data/md-module-map";
import { STANDARD_FILTERS } from "./industry-data";

export function ModuleIndex() {
  const [standard, setStandard] = useState<string | null>(null);
  const [slug, setSlug] = useState(MD_DOMAIN_MAP[0].slug);

  const domains = useMemo(
    () =>
      MD_DOMAIN_MAP.map((d) => ({
        ...d,
        filtered: standard ? d.modules.filter((m) => (m.standards ?? []).includes(standard)) : d.modules,
      })),
    [standard],
  );

  const available = domains.filter((d) => d.filtered.length > 0);
  // keep selection valid as the filter narrows the set
  const activeSlug = available.some((d) => d.slug === slug) ? slug : (available[0]?.slug ?? slug);
  const active = domains.find((d) => d.slug === activeSlug) ?? domains[0];

  return (
    <div className="it-mi">
      <div className="it-mi-bar">
        <div className="it-mi-filters" role="group" aria-label="Filter modules by standard">
          <button
            type="button"
            aria-pressed={standard === null}
            className={"it-mi-filter" + (standard === null ? " is-active" : "")}
            onClick={() => setStandard(null)}
          >
            All standards
          </button>
          {STANDARD_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={standard === s}
              className={"it-mi-filter" + (standard === s ? " is-active" : "")}
              onClick={() => setStandard((cur) => (cur === s ? null : s))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="it-explorer">
        <div className="it-explorer-tabs" role="group" aria-label="Coordination domains">
          {domains.map((d) => {
            const disabled = d.filtered.length === 0;
            const isActive = d.slug === active.slug;
            return (
              <button
                key={d.slug}
                type="button"
                aria-pressed={isActive}
                aria-disabled={disabled}
                title={disabled ? "No modules evidence the selected standard" : undefined}
                className={"it-tab" + (isActive ? " is-active" : "") + (disabled ? " is-disabled" : "")}
                onClick={() => { if (!disabled) setSlug(d.slug); }}
              >
                <span className="it-tab-name">{d.name}</span>
                <span className="it-tab-meta">
                  <span className="it-tab-count">{d.filtered.length}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="it-explorer-panel" role="tabpanel" key={active.slug}>
          <div className="it-panel-head">
            <h3>{active.name}</h3>
            <p className="it-panel-promise">{active.promise}</p>
          </div>
          <div className="it-panel-mods">
            {active.filtered.map((m) => {
              const live = Boolean(m.href);
              const inner = (
                <>
                  <div className="it-mod-top">
                    <span className="it-mod-name">{m.name}</span>
                    {live ? <span className="it-mod-badge is-live">Live</span> : null}
                  </div>
                  <p className="it-mod-blurb">{m.blurb}</p>
                  {m.standards && m.standards.length > 0 ? (
                    <div className="it-mod-std">
                      {m.standards.map((s) => (
                        <span key={s} className={"it-chip" + (standard === s ? " is-hit" : "")}>{s}</span>
                      ))}
                    </div>
                  ) : null}
                  {live ? <span className="it-mod-go">Open module →</span> : null}
                </>
              );
              return live ? (
                <Link key={m.name} href={m.href!} className="it-mod is-live">{inner}</Link>
              ) : (
                <div key={m.name} className="it-mod is-soon">{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
