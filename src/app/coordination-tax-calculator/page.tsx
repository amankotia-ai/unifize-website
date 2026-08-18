/* ------------------------------------------------------------
 * /coordination-tax-calculator - the Coordination Tax Assessment.
 *
 * Reworked Aug 2026 to Ben's prototype pair (assessment + full
 * report HTMLs): a cold read built from public data with every
 * figure labelled by source, a persona lens, the modelled theme
 * mix, the benchmark band, and the path into the full report at
 * ./report. Runs in the DMS page shell (DmsHeader, dms-section
 * system, SiteFooter) so it reads as the current site. Linked
 * from the DMS pages' "Take Coordination Tax Assessment" CTA.
 * ------------------------------------------------------------ */
import type { Metadata } from "next";
import { DmsHeader } from "../explorations/products/dms/dms-header";
import { SiteFooter } from "../explorations/_shared/site-footer";
import { CtaxAssessment } from "./assessment";
import "../explorations/industry-template-modern/itm.css";
import "../explorations/products/dms/dms.css";
import "../explorations/products/dms/dms-redesign.css";
import "./cta-assessment.css";

export const metadata: Metadata = {
  title: "Coordination Tax Assessment · Unifize",
  description:
    "Where coordination tax is likely hurting you the most: a cold read from public data, every figure labelled by source, sharpened as you confirm your numbers.",
};

export default function CoordinationTaxAssessmentPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows">
      <DmsHeader />
      <CtaxAssessment />
      <SiteFooter
        tagline="The number behind the coordination you can feel."
        note="Coordination Tax Assessment · figures labelled by source"
      />
    </main>
  );
}
