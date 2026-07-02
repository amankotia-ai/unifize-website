/* Medical Devices — cost / P&L-led direction. Finished page. */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/home/site-header";
import { Button, Eyebrow } from "@/components/atoms";
import { MoneyShot } from "@/components/workflow";
import { DashboardShell } from "@/components/organisms";
import {
  MD_ECONOMICS,
  MD_WORKFLOW_VARIANTS,
  MD_CONSEQUENCES,
  MD_COMPETITORS,
  MD_PRODUCTS,
} from "@/lib/platform-data/medical-devices-canonical";
import { WhyNow, TrustStrip, ProofBlock, SiteFooterX } from "../_shared";
import "../explorations.css";

export const metadata: Metadata = {
  title: "What coordination costs you · Medical Devices · Unifize",
  description:
    "Before a single part changes, every CAPA, engineering change, and audit spends days of coordination. Unifize puts a number on it — and recovers it.",
};

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export default function CostPage() {
  const taxLowM = Math.round(MD_ECONOMICS.annualTaxLow / 1e6);
  const taxHighM = Math.round(MD_ECONOMICS.annualTaxHigh / 1e6);
  const tamB = (MD_ECONOMICS.tamLow / 1e9).toFixed(1);
  const ec = MD_WORKFLOW_VARIANTS.find((v) => v.key === "change-control")!;

  return (
    <main>
      <SiteHeader />

      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <div className="ind-hero-grid">
            <div className="xpl-rise">
              <div className="detail-breadcrumb">
                <Link href="/platform#industries">Industries</Link>
                <span className="sep">/</span>
                <span>Medical Devices</span>
              </div>
              <Eyebrow dot>Medical Devices</Eyebrow>
              <h1>What coordination really costs you.</h1>
              <p className="sub">
                Before a single part changes, every CAPA, engineering change, and audit spends days
                of chasing, waiting, and reconciling across functions. It&apos;s real money, it
                recurs, and today it&apos;s buried in headcount and cycle time. Here&apos;s the number.
              </p>
              <div className="hero-ctas">
                <Button arrow size="lg">Estimate your number</Button>
                <Button variant="dark-ghost" size="lg">Book a demo</Button>
              </div>
            </div>
            <div className="ind-hero-visual xpl-rise xpl-rise-2">
              <div className="xpl-herostat">
                <div className="val">{fmt(ec.costLow)}–{fmt(ec.costHigh)}</div>
                <span className="lab">coordination cost · per engineering change</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <TrustStrip />

      {/* PER-INSTANCE COST */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">What it costs, per instance</span>
            <h2 className="section-title">Three workflows you run every week.</h2>
            <p className="wf-lede">Each figure is the coordination cost of a single instance — the work around the record, not the record itself. Multiply by your volume.</p>
          </div>
          <div className="ind-proof-grid">
            {MD_WORKFLOW_VARIANTS.map((v) => (
              <div key={v.key} className="xpl-stat">
                <span className="lab">{v.name}</span>
                <div className="val">{fmt(v.costLow)}–{fmt(v.costHigh)} <small>/ instance</small></div>
                <div className="meta">
                  <span>Cycle: {v.cycle}</span>
                  <span>{v.decisions} decisions</span>
                  <span>{v.touchpoints} touchpoints</span>
                </div>
                <p className="note">{v.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY INVISIBLE */}
      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside"><span className="section-eyebrow">Why it never shows up</span></div>
          <div className="detail-body">
            <p className="detail-prose">No line item says &ldquo;coordination.&rdquo; The cost spreads across handoffs, meetings, emails, and re-work — {ec.touchpoints} separate touchpoints for a single engineering change — so it lands in headcount and cycle time instead of a number anyone owns.</p>
            <p className="detail-prose">It surfaces as the consequences you already feel: longer cycles, delayed launches, overdue controls, and the recall scope that widens when a change doesn&apos;t propagate. Unifize makes the coordination visible, then takes it off your plate.</p>
          </div>
        </div>
      </section>

      {/* WHERE IT LANDS */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Where it lands</span>
            <h2 className="section-title">Five lines on the P&amp;L.</h2>
          </div>
          <div className="ind-surface-grid">
            {MD_CONSEQUENCES.map((c) => (
              <div key={c.type} className="ind-surface-cell">
                <span className="ind-surface-cell-mark" />
                <h3 className="ind-surface-cell-title">{c.type}</h3>
                <p className="ind-surface-cell-body">{c.items.join(". ")}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyNow surface="alt" title="The events that set off the spend." lede="Each is a real trigger — a deadline, a finding, a hold — that detonates a burst of coordination across your functions." />

      {/* ORG VIEW */}
      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">At the org level</span>
              <h2 className="section-title close-title">The same read, across every record you run.</h2>
              <p className="close-sub">What the cost is on one workflow, leadership sees across the whole QMS: where time goes, which processes carry the most wait, and how much is recoverable.</p>
              <div className="close-ctas"><Button arrow size="lg">Book a demo</Button><Button variant="dark-ghost" size="lg">See the platform</Button></div>
            </div>
            <div className="close-visual">
              <div style={{ position: "relative", height: 600, width: 880, overflow: "hidden" }}>
                <DashboardShell style={{ position: "absolute", top: 0, left: 0, width: 1500, margin: 0, transform: "scale(0.6)", transformOrigin: "top left" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGMENT SIZE */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">The size of it</span>
            <h2 className="section-title">${taxLowM}M–${taxHighM}M a year, across the segment.</h2>
            <p className="wf-lede">The estimated annual coordination tax carried by the medical-device segment Unifize serves. Your share of it is the calculator&apos;s job.</p>
          </div>
          <div className="ind-proof-grid">
            <div className="xpl-stat"><span className="lab">Annual coordination tax</span><div className="val">${taxLowM}M–${taxHighM}M</div><p className="note">Across the segment, every year.</p></div>
            <div className="xpl-stat"><span className="lab">Serviceable market</span><div className="val">${tamB}B</div><p className="note">{MD_ECONOMICS.companies} companies · {(MD_ECONOMICS.employees / 1e6).toFixed(2)}M employees.</p></div>
            <div className="xpl-stat"><span className="lab">Loaded cost of the people doing it</span><div className="val">${MD_ECONOMICS.wageLow}–${MD_ECONOMICS.wageHigh}<small>/ hr</small></div><p className="note">The wage band coordination is burning.</p></div>
          </div>
        </div>
      </section>

      <MoneyShot unit="change order" />

      <ProofBlock surface="alt" />

      {/* CONTRAST */}
      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside">
            <span className="section-eyebrow">Versus your QMS</span>
            <p className="detail-aside-blurb">The incumbents track document status. The cost lives in the coordination between documents — which is what Unifize captures.</p>
          </div>
          <div className="detail-body">
            <div className="ind-surface-grid">
              {MD_COMPETITORS.incumbents.map((c) => (
                <div key={c.name} className="ind-surface-cell emerging">
                  <span className="ind-surface-cell-mark" />
                  <h3 className="ind-surface-cell-title">{c.name}</h3>
                  <p className="ind-surface-cell-body">{c.note}</p>
                </div>
              ))}
            </div>
            <p className="detail-prose" style={{ marginTop: 20 }}><b>{MD_COMPETITORS.differentiator}</b></p>
          </div>
        </div>
      </section>

      {/* PACKAGING */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Packaging</span>
            <h2 className="section-title">Priced per organization, not per seat.</h2>
            <p className="wf-lede">So the people who create the coordination cost aren&apos;t the people you pay to put on the platform.</p>
          </div>
          <div className="ind-proof-grid">
            {MD_PRODUCTS.map((p, i) => (
              <div key={p.name} className="ind-proof-card">
                <span className="ind-proof-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ind-proof-title">{p.name}</h3>
                <p className="ind-proof-body">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">Medical Devices</span>
              <h2 className="section-title close-title">Put a number on it.</h2>
              <p className="close-sub">A 30-minute walkthrough plus your coordination-tax estimate — the figure you take to the CFO.</p>
              <div className="close-ctas"><Button arrow size="lg">Estimate your number</Button><Button variant="dark-ghost" size="lg">Book a demo</Button></div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooterX />
    </main>
  );
}
