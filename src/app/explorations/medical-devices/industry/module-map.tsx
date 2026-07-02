"use client";

/* ============================================================================
 * The Domains × Modules map — section C centerpiece of the industry page.
 *
 * Two-pane explorer: pick a Domain on the left, see the Modules (the doors) on
 * the right. Each module is a door that funnels DOWN to a module page. This is
 * the breadth layer that distinguishes the industry page from a module page —
 * no ProcessStraighten / dramatized flow lives here.
 * ========================================================================== */
import { useState } from "react";
import Link from "next/link";
import { MD_DOMAIN_MAP, type MapDomain } from "@/lib/platform-data/md-module-map";

const PRIMARY = MD_DOMAIN_MAP.filter((d) => d.tier === "Primary");
const SECONDARY = MD_DOMAIN_MAP.filter((d) => d.tier === "Secondary");

function DomainButton({
  d,
  active,
  onSelect,
}: {
  d: MapDomain;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      className={"imap-domain" + (active ? " active" : "")}
      aria-pressed={active}
      onClick={() => onSelect(d.slug)}
    >
      <span className="imap-domain-name">{d.name}</span>
      <span className="imap-domain-meta">{d.modules.length}</span>
    </button>
  );
}

export function IndustryModuleMap() {
  const [slug, setSlug] = useState<string>(MD_DOMAIN_MAP[0].slug);
  const domain = MD_DOMAIN_MAP.find((d) => d.slug === slug) ?? MD_DOMAIN_MAP[0];

  return (
    <div className="imap">
      {/* LEFT — domain selector */}
      <aside className="imap-rail" aria-label="Coordination domains">
        <span className="imap-rail-lab">Pillars</span>
        <div className="imap-rail-group">
          {PRIMARY.map((d) => (
            <DomainButton key={d.slug} d={d} active={d.slug === slug} onSelect={setSlug} />
          ))}
        </div>
        <span className="imap-rail-lab">Adjacent doors</span>
        <div className="imap-rail-group">
          {SECONDARY.map((d) => (
            <DomainButton key={d.slug} d={d} active={d.slug === slug} onSelect={setSlug} />
          ))}
        </div>
      </aside>

      {/* RIGHT — modules for the selected domain */}
      <div className="imap-panel" key={domain.slug}>
        <div className="imap-panel-head">
          <div className="imap-panel-headrow">
            <span className={"imap-tier " + domain.tier.toLowerCase()}>{domain.tier} domain</span>
            <span className="imap-owner">{domain.owner}</span>
          </div>
          <h3 className="imap-panel-title">{domain.name}</h3>
          <p className="imap-panel-promise">{domain.promise}</p>
        </div>

        <div className="ph imap-viz" role="img" aria-label="Domain value-stream preview placeholder">
          <span className="ph-label">{domain.name} · value-stream preview</span>
        </div>

        <div className="imap-mods">
          {domain.modules.map((m) => {
            const inner = (
              <>
                <span className="imap-mod-tag">Module</span>
                <span className="imap-mod-name">{m.name}</span>
                <span className="imap-mod-blurb">{m.blurb}</span>
                <span className="imap-mod-foot">
                  {m.standards?.length ? (
                    <span className="imap-mod-chips">
                      {m.standards.map((s) => (
                        <span key={s} className="imap-mod-chip">{s}</span>
                      ))}
                    </span>
                  ) : <span />}
                  {m.href ? <span className="imap-mod-go">Open the page →</span> : <span className="imap-mod-soon">Module page →</span>}
                </span>
              </>
            );
            return m.href ? (
              <Link key={m.name} href={m.href} className="imap-mod live">{inner}</Link>
            ) : (
              <div key={m.name} className="imap-mod">{inner}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
