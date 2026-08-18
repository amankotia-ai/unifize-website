/* ------------------------------------------------------------
 * /coordination-tax-calculator/report - the full report.
 *
 * Ben's full-report prototype: a six-field role-aware intake,
 * then the stage 2 report (CFO one-pager, your number, honest
 * peer compare, six lenses, domain deep dive, load/floor/tax,
 * signals, the reduction journey, recoverable value). #sample
 * skips the intake and opens the sample report directly. Runs
 * in the DMS page shell so it reads as the current site.
 * ------------------------------------------------------------ */
import type { Metadata } from "next";
import { DmsHeader } from "../../explorations/products/dms/dms-header";
import { SiteFooter } from "../../explorations/_shared/site-footer";
import { CtaxReport } from "./report";
import "../../explorations/industry-template-modern/itm.css";
import "../../explorations/products/dms/dms.css";
import "../../explorations/products/dms/dms-redesign.css";
import "../cta-assessment.css";

export const metadata: Metadata = {
  title: "Coordination Tax Assessment · Full report · Unifize",
  description:
    "Your coordination tax from six angles: confirmed volumes, honest peer benchmarks, and the journey from estimate to measured reduction.",
};

export default function CoordinationTaxReportPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows">
      <DmsHeader />
      <CtaxReport />
      <SiteFooter
        tagline="The number behind the coordination you can feel."
        note="Coordination Tax Assessment · full report"
      />
    </main>
  );
}
