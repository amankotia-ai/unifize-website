/* ============================================================================
 * /explorations/resources/case-studies - the numbers, in the customer-story
 * grammar: a flat two-tone display mast with a muted standfirst right, the
 * industry/module toolbar over the case grid, then the dark customer-proof
 * band. Items at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import { ResourceShell } from "../_shared/resource-shell";
import { CollectionMast, QuoteBand, ResourceCTA, ResourceFooter } from "../_shared/resource-chrome";
import { CaseLibrary } from "../_shared/resources-interactive";
import { CASE_STUDIES } from "../_shared/resources-data";

export const metadata: Metadata = {
  title: "Case studies — Unifize",
  description: "How leading teams simplify their processes and drive measurable results with Unifize, across medical devices, pharma, aerospace, automotive, food, and contract manufacturing.",
};

export default function CaseStudiesPage() {
  return (
    <ResourceShell>
      <CollectionMast
        trail={[{ label: "Case studies" }]}
        title="The numbers,"
        dim="and the work behind them."
        desc="The situation, the change, and the measured result: how teams across regulated manufacturing run on Unifize."
      />

      <section className="dms-section rs-libsection">
        <CaseLibrary studies={CASE_STUDIES} />
      </section>

      <QuoteBand heading="The people behind the numbers." />
      <ResourceCTA
        heading="Ready to see transformation in action?"
        sub="These numbers started as somebody's backlog. Book a demo and scope what Unifize would change for you."
        ctaSecondary={{ label: "Watch customer stories", href: "/explorations/resources/testimonials" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
