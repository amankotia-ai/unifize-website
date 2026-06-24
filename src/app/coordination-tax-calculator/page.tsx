/* ------------------------------------------------------------
 * /coordination-tax-calculator — the "See your numbers" page.
 *
 * Ben 2026-06-03 (action item): "Create a 'coordination tax
 * calculator' dashboard including demo booking options and customer
 * success stories to provide social proof and substantiate claims."
 * Linked from the §06 money shot's "See your numbers" CTA.
 *
 * Model grounding: the internal CT estimation method (Notion,
 * Account Coordination Tax Scoring v1.6) reduced to its Stage 3
 * customer-facing form: confirmed volumes × waiting per record,
 * through the page's dictated story (80% of NVA is CT, Unifize
 * reduces CT by 65%).
 * ------------------------------------------------------------ */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../home/site-header";
import { CTCalculator } from "./ct-calculator";

export const metadata: Metadata = {
  title: "Coordination tax calculator · Unifize",
  description:
    "Your volumes, your rates: what the waiting in your processes costs every year, and what Unifize gives back.",
};

export default function CoordinationTaxCalculatorPage() {
  return (
    <main>
      <SiteHeader />
      <CTCalculator />
      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer surface dark">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <strong>Unifize</strong>
          <span>People. Process. AI. Outcomes.</span>
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="lab">Explore</span>
            <Link href="/platform#industries">By industry</Link>
            <Link href="/platform#domains">By domain</Link>
            <Link href="/platform#buyer">By buyer</Link>
          </div>
          <div>
            <span className="lab">Problem</span>
            <Link href="/#thesis">Coordination tax</Link>
            <Link href="/#seam">The seam</Link>
            <Link href="/#how">The governed layer</Link>
          </div>
        </div>
      </div>
      <div className="site-footer-rule" />
      <div className="site-footer-base">
        <span>© Unifize 2026</span>
      </div>
    </footer>
  );
}
