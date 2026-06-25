/* Medical Devices — directions index (clean chooser). */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/home/site-header";
import { Eyebrow } from "@/components/atoms";
import { SiteFooterX } from "./_shared";
import "./explorations.css";

export const metadata: Metadata = {
  title: "Medical Devices — directions · Unifize",
  description: "Three finished directions for the Medical Devices page.",
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
          <h1>Three ways to tell the story.</h1>
          <p className="sub" style={{ maxWidth: "60ch" }}>
            One industry page, three finished directions — each leading with a different idea, on the
            same shell. Open each to compare, plus the Quality Manager page one level deeper.
          </p>
        </div>
      </header>

      <section className="section white">
        <div className="section-inner">
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
