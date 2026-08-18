/* ============================================================================
 * /explorations/resources/case-studies - structured like
 * unifize.com/case-studies: a light centered masthead straight into the card
 * grid, with an industry/module filter. Items at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import { ResourceShell } from "../_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter } from "../_shared/resource-chrome";
import { CaseLibrary } from "../_shared/resources-interactive";
import { CASE_STUDIES } from "../_shared/resources-data";

export const metadata: Metadata = {
  title: "Case studies — Unifize",
  description: "How leading teams simplify their processes and drive measurable results with Unifize, across medical devices, pharma, aerospace, automotive, food, and contract manufacturing.",
};

export default function CaseStudiesPage() {
  return (
    <ResourceShell>
      <ResourceMast
        trail={[{ label: "Case studies" }]}
        title="Case studies"
        desc="Learn how leading teams are simplifying their processes and driving meaningful results with Unifize. Each case study shows the situation, the change, and the numbers."
      />

      <section className="dms-section rs-libsection">
        <CaseLibrary studies={CASE_STUDIES} />
      </section>

      <ResourceCTA
        heading="Ready to see transformation in action?"
        sub="These numbers started as somebody's backlog. Book a demo and scope what Unifize would change for you."
        ctaSecondary={{ label: "Watch customer videos", href: "/explorations/resources/testimonials" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
