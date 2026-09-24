/* ------------------------------------------------------------
 * /coordination-tax-calculator/report - the full report.
 *
 * Ben's full-report prototype: a six-field role-aware intake,
 * then the stage 2 report (CFO one-pager, your number, honest
 * peer compare, six lenses, domain deep dive, load/floor/tax,
 * signals, the reduction journey, recoverable value). #sample
 * skips the intake and opens the sample report directly. Runs
 * on the rails grammar with the assessment page: the same css
 * stack and scope (dms--ctax), page rules in ../cta-rails.css.
 * ------------------------------------------------------------ */
import type { Metadata } from "next";
import { DmsHeader } from "../../explorations/products/dms/dms-header";
import { SiteFooter } from "../../explorations/_shared/site-footer";
import { DmsMotion } from "../../explorations/products/dms/dms-motion";
import { CtaxReport } from "./report";
import "../../explorations/products/dms/dms.css";
import "../../explorations/products/_shared/product-kit.css";
import "../../explorations/platform/platform-kit.css";
import "../../explorations/products/dms/dms-redesign.css";
import "../../explorations/_shared/page-rails.css";
import "../../explorations/platform/platform-rails.css";
import "../cta-assessment.css";
import "../cta-rails.css";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/coordination-tax-calculator/report");

export default function CoordinationTaxReportPage() {
  return (
    <main className="dms dms--redesign pf-page dms--rails dms--ctax">
      <DmsHeader />
      <DmsMotion />
      <CtaxReport />
      <SiteFooter
        tagline="The number behind the coordination you can feel."
        note="Coordination Tax Assessment · full report"
      />
    </main>
  );
}
