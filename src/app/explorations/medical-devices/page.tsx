/* Medical Devices — directions index (clean chooser). */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/home/site-header";
import { Eyebrow } from "@/components/atoms";
import { SiteFooterX } from "./_shared";
import "./explorations.css";

export const metadata: Metadata = {
  title: "Medical Devices — directions · Unifize",
  description: "The Medical Devices industry page, at industry altitude — plus three earlier directions.",
};

const DIRECTIONS = [
  { tag: "The day", h: "You spend more time proving the work than doing it.", p: "Opens on the quality team's daily reality, then names the coordination problem underneath it.", href: "/explorations/medical-devices/symptoms" },
  { tag: "The cost", h: "What coordination really costs you.", p: "Leads with the dollar cost of every CAPA, change, and audit — and what it adds up to across the segment.", href: "/explorations/medical-devices/cost" },
  { tag: "The product", h: "Proof, built as the work happens.", p: "Lets the product carry the page: the thread, the trace, the AI read, the leadership dashboard.", href: "/explorations/medical-devices/proof" },
];

export default function DirectionsIndex() {
  return (
    <main>
      <SiteHeader />

      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <Eyebrow dot>Medical Devices</Eyebrow>
          <h1>The industry page, at the right altitude.</h1>
          <p className="sub" style={{ maxWidth: "62ch" }}>
            The lead direction sits at industry altitude: opportunity first, then a map of nine
            coordination domains where every door is a module that funnels to its own page. The three
            earlier directions sit below for comparison — each told one process, which is why they
            read like the change-control page.
          </p>
        </div>
      </header>

      <section className="section white">
        <div className="section-inner">
          <Link href="/explorations/medical-devices/industry" className="xpl-index-card" style={{ marginBottom: 16, borderColor: "var(--u-primary-border)", background: "var(--u-primary-tint)" }}>
            <span className="tag">The map · industry altitude · recommended</span>
            <h2>Nine coordination domains. Every door is a module.</h2>
            <p>Opportunity-led, then the interactive Domains × Modules map that funnels down to each module page. Built from the canonical Industries, Domains, and Personas tables.</p>
            <span className="go">Open →</span>
          </Link>
          <div className="xpl-index-grid">
            {DIRECTIONS.map((d) => (
              <Link key={d.href} href={d.href} className="xpl-index-card">
                <span className="tag">{d.tag}</span>
                <h2>{d.h}</h2>
                <p>{d.p}</p>
                <span className="go">Open →</span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/explorations/medical-devices/quality-manager" className="xpl-index-card">
              <span className="tag">Persona · one level deeper</span>
              <h2>For the Quality Manager at a medical device company</h2>
              <p>The buyer page, built in the same shell — accountable for the outcome, not in control of the work.</p>
              <span className="go">Open →</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooterX />
    </main>
  );
}
