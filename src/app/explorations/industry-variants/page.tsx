/* ============================================================================
 * Industry page template bake-off - gallery index.
 * Six directions on the same canonical Medical Devices data, each a re-shape of
 * /explorations/industry-template sharing its .it design tokens. The Decision
 * Trace (05) is the live template; the other five are built here as siblings.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { VARIANTS } from "./_shared";
import "./_shared.css";

export const metadata: Metadata = {
  title: "Industry page directions · Unifize",
  description:
    "Six structural directions for the industry page template, instanced on Medical Devices: the Coordination Tax Ledger, the Regulatory War Room, the Coverage Atlas, the Mirror, the Decision Trace, and the Two Doors.",
};

/* per-direction accent swatch - the spine of each fresh visual language */
const SWATCH: Record<string, string[]> = {
  "coordination-tax-ledger": ["#3a7d44", "#1f6f3a", "#14171d"],
  "regulatory-war-room": ["#e08a1e", "#3f88c5", "#14171d"],
  "coverage-atlas": ["#1f7a8c", "#0b3c49", "#f4f6f7"],
  "the-mirror": ["#3a3f4b", "#9a6a3a", "#f7f6f3"],
  "decision-trace": ["#2f5bff", "#c98a1e", "#0b0d11"],
  "two-doors": ["#b08968", "#6b8aa8", "#14171d"],
};

export default function IndustryVariantsIndex() {
  return (
    <main className="iv-index">
      <div className="iv-index-wrap">
        <span className="iv-index-eyebrow">Industry template · bake-off</span>
        <h1 className="iv-index-title">Six ways to route a device buyer.</h1>
        <p className="iv-index-sub">
          The same canonical Medical Devices facts, shaped six ways. Every direction is a routing
          hub: it makes the buyer feel seen at breadth, then hands them to a module or a persona.
          Each shares the template design tokens and tunes its own visual language on top.
        </p>

        <div className="iv-index-grid">
          {VARIANTS.map((v) => (
            <Link key={v.slug} href={v.href} className="iv-card">
              <div className="iv-card-top">
                <span className="iv-card-num">{v.num}</span>
                {v.slug === "decision-trace" ? <span className="iv-card-live">Live template</span> : null}
              </div>
              <span className="iv-card-name">{v.title}</span>
              <p className="iv-card-tag">{v.tagline}</p>
              <div className="iv-card-swatch" aria-hidden="true">
                {(SWATCH[v.slug] ?? []).map((c, i) => <span key={i} style={{ background: c }} />)}
              </div>
              <span className="iv-card-go">View the page →</span>
            </Link>
          ))}
        </div>

        <p className="iv-index-foot">
          Build target: these sibling routes leave the production /industries/[slug] pages and the
          /explorations/industry-template champion untouched. All values trace to
          medical-devices-canonical.ts and md-module-map.ts. Where a product screen does not exist
          yet it is shown as a labeled placeholder, never a faked UI.
        </p>
      </div>
    </main>
  );
}
