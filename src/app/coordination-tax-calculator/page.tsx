/* ------------------------------------------------------------
 * /coordination-tax-calculator - the Coordination Tax Assessment.
 *
 * Reworked Aug 2026 to Ben's prototype pair (assessment + full
 * report HTMLs): a cold read built from public data with every
 * figure labelled by source, a persona lens, the modelled theme
 * mix, the benchmark band, and the path into the full report at
 * ./report. Runs on the rails grammar the other pages share
 * (page-rails.css, platform-rails.css for the split head and the
 * close grid; this page is a pf-page too), page-local rules in
 * cta-rails.css. Linked from every "Take the assessment" CTA.
 * ------------------------------------------------------------ */
import type { Metadata } from "next";
import { DmsHeader } from "../explorations/products/dms/dms-header";
import { SiteFooter } from "../explorations/_shared/site-footer";
import { DmsMotion } from "../explorations/products/dms/dms-motion";
import { CtaxAssessment } from "./assessment";
import "../explorations/products/dms/dms.css";
import "../explorations/products/_shared/product-kit.css";
import "../explorations/platform/platform-kit.css";
import "../explorations/products/dms/dms-redesign.css";
import "../explorations/_shared/page-rails.css";
import "../explorations/platform/platform-rails.css";
import "./cta-assessment.css";
import "./cta-rails.css";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export const metadata: Metadata = pageMetadata("/coordination-tax-calculator");

export default function CoordinationTaxAssessmentPage() {
  return (
    <main className="dms dms--redesign pf-page dms--rails dms--ctax">
      <DmsHeader />
      <DmsMotion />
      <CtaxAssessment />
      <SiteFooter
        tagline="The number behind the coordination you can feel."
        note="Coordination Tax Assessment · figures labelled by source"
      />
    </main>
  );
}
