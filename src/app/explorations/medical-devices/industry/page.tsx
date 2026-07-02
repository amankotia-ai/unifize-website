/* Medical Devices — INDUSTRY-altitude page (the corrected flow).
 * A opportunity hero · B compressed problem band · C Domains×Modules map
 * (centerpiece, funnels to module pages) · D proof · E personas+jobs ·
 * F competitive · G close. Copy is deliberately spare — visuals carry the page;
 * every section has a placeholder slot (.ph) where an image/diagram plugs in.
 * Module-depth (ProcessStraighten etc.) lives one level down, never here. */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/home/site-header";
import { Button, Eyebrow } from "@/components/atoms";
import {
  MD_ECONOMICS,
  MD_STANDARDS,
  MD_COMPETITORS,
  MD_PERSONA,
  MD_PROOF,
} from "@/lib/platform-data/medical-devices-canonical";
import { MD_PERSONA_JOBS } from "@/lib/platform-data/md-module-map";
import { TrustStrip, SiteFooterX } from "../_shared";
import { IndustryModuleMap } from "./module-map";
import "../explorations.css";

export const metadata: Metadata = {
  title: "Medical Devices · Unifize",
  description:
    "The highest-density regulatory coordination environment Unifize is built for — covered across nine coordination domains.",
};

const usdM = (n: number) => "$" + (n / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 }) + "M";
const usd = (n: number) => "$" + n.toLocaleString("en-US");

const STAGES = ["Trigger", "Work leaves the record", "Root cause", "Compounding cost"];

const ADJACENT_PERSONAS = [
  { title: "Operations leadership", titles: "VP Operations · Plant Manager" },
  { title: "Regulatory affairs", titles: "Head of Regulatory Affairs" },
];

export default function IndustryPage() {
  return (
    <main>
      <SiteHeader />

      {/* ============================ A · OPPORTUNITY HERO ===================== */}
      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <div className="ind-hero-grid">
            <div className="xpl-rise">
              <div className="detail-breadcrumb">
                <Link href="/platform#industries">Industries</Link>
                <span className="sep">/</span>
                <span>Medical Devices</span>
              </div>
              <Eyebrow dot>Medical Devices · Life Sciences</Eyebrow>
              <h1>The most coordination-dense industry we&apos;re built for.</h1>
              <p className="sub">
                Class II and III makers run DHF, CAPA, change control, and recall at once. Unifize
                covers nine of those domains — without displacing your ERP or PLM.
              </p>
              <p className="ind-hero-anchor">At stake: an FDA 483 or recall on a broken design-to-record trail.</p>
              <ul className="ind-frame" aria-label="Regulatory frame">
                {MD_STANDARDS.slice(0, 5).map((s) => <li key={s.id}>{s.id}</li>)}
              </ul>
              <div className="hero-ctas">
                <Button arrow size="lg">Book a demo</Button>
                <Button variant="dark-ghost" size="lg">See the platform</Button>
              </div>
            </div>
            <div className="ph ph-43 dark ind-hero-ph" role="img" aria-label="Hero visual placeholder">
              <span className="ph-label">Hero visual</span>
            </div>
          </div>
        </div>
      </header>

      <TrustStrip />

      {/* ============================ B · THE SITUATION TODAY ================== */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">The situation today</span>
            <h2 className="section-title">Every regulated workflow leaks at the same seam.</h2>
          </div>
          <div className="sit-stages">
            {STAGES.map((s) => <span key={s}>{s}</span>)}
          </div>
          <div className="eng">
            <div className="ph ph-wide" role="img" aria-label="Before-state diagram placeholder">
              <span className="ph-label">Before-state diagram · where the trail breaks</span>
            </div>
            <aside className="eng-cost">
              <span className="eng-cost-lab">Est. annual coordination tax — segment</span>
              <span className="eng-cost-val">{usdM(MD_ECONOMICS.annualTaxLow)}<small>–{usdM(MD_ECONOMICS.annualTaxHigh)}</small></span>
              <div className="eng-cost-meta">
                <span>{MD_ECONOMICS.companies} companies</span>
                <span>{(MD_ECONOMICS.employees / 1_000_000).toFixed(2)}M employees</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================ C · THE MODULE MAP (CENTERPIECE) ========= */}
      <section className="section alt">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Where Unifize comes in</span>
            <h2 className="section-title">Nine domains. Every door is a module.</h2>
            <p className="wf-lede">Pick a domain to see its modules — each opens its own page.</p>
          </div>
          <IndustryModuleMap />
        </div>
      </section>

      {/* ============================ D · PROOF =============================== */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Proof</span>
            <h2 className="section-title">From a device company in your regulatory class.</h2>
          </div>
          <div className="pf">
            <div className="pf-stat">
              <span className="pf-v">{MD_PROOF.stat.pct}%</span>
              <p className="pf-c">lower {MD_PROOF.stat.metric} — <b>{usd(MD_PROOF.stat.recovered)} recovered</b> in year one, against a signed {usd(MD_PROOF.stat.baseline)} baseline.</p>
              <span className="pf-a">{MD_PROOF.stat.attribution}</span>
              <div className="pf-names">
                {MD_PROOF.customers.map((c) => <span key={c.name}>{c.name}</span>)}
              </div>
            </div>
            <div className="ph ph-43" role="img" aria-label="Product dashboard placeholder">
              <span className="ph-label">Product / dashboard screenshot</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ E · WHO IT'S FOR (personas + jobs) ======= */}
      <section className="section alt">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Who it&apos;s for</span>
            <h2 className="section-title">The people who own the work.</h2>
          </div>
          <div className="iper">
            <Link href="/explorations/medical-devices/quality-manager" className="iper-lead">
              <div className="ph ph-169 iper-portrait" role="img" aria-label="Persona portrait placeholder">
                <span className="ph-label">Persona portrait</span>
              </div>
              <span className="iper-tag">Primary buyer</span>
              <h3 className="iper-name">Quality leadership</h3>
              <p className="iper-titles">{MD_PERSONA.titles.slice(0, 5).join(" · ")}</p>
              <div className="iper-jobs">
                <span className="iper-jobs-lab">The jobs they own</span>
                <ul>
                  {MD_PERSONA_JOBS.map((j) => <li key={j}>{j}</li>)}
                </ul>
              </div>
              <span className="iper-go">See the Quality Manager page →</span>
            </Link>
            <div className="iper-side">
              {ADJACENT_PERSONAS.map((p) => (
                <div key={p.title} className="iper-card">
                  <div className="ph ph-ava" role="img" aria-label="Avatar placeholder"><span className="ph-label">IMG</span></div>
                  <h4 className="iper-name sm">{p.title}</h4>
                  <p className="iper-titles">{p.titles}</p>
                  <span className="iper-tag">Adjacent door</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ F · WHY UNIFIZE ========================= */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Why Unifize</span>
            <h2 className="section-title">Incumbents track documents. Unifize reconstructs the decision.</h2>
          </div>
          <div className="icomp">
            <div className="ph ph-43" role="img" aria-label="Positioning visual placeholder">
              <span className="ph-label">Positioning · Unifize vs. incumbents</span>
            </div>
            <div className="icomp-diff">
              <span className="icomp-diff-lab">The difference</span>
              <p className="icomp-diff-body">{MD_COMPETITORS.differentiator}</p>
              <div className="icomp-list">
                {MD_COMPETITORS.incumbents.map((c) => <span key={c.name}>{c.name}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ G · CLOSE =============================== */}
      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">Medical Devices</span>
              <h2 className="section-title close-title">See Unifize wired for your stack.</h2>
              <p className="close-sub">A 30-minute walkthrough: your standards, your workflows, your systems.</p>
              <div className="close-ctas">
                <Button arrow size="lg">Book a demo</Button>
                <Button variant="dark-ghost" size="lg">See the platform</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooterX />
    </main>
  );
}
