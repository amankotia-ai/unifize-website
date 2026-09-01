/* ============================================================================
 * /explorations/resources/testimonials - the customer stories collection in
 * the customer-story grammar: a flat two-tone display mast with a muted
 * standfirst right, one "Filter by" toolbar over the uniform card grid, then
 * the dark customer-proof band. Items at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import { ResourceShell } from "../_shared/resource-shell";
import { CollectionMast, QuoteBand, ResourceCTA, ResourceFooter } from "../_shared/resource-chrome";
import { TestimonialLibrary } from "../_shared/resources-interactive";
import { TESTIMONIALS } from "../_shared/resources-data";

export const metadata: Metadata = {
  title: "Customer stories — Unifize",
  description: "Customer stories and product walkthroughs from teams running quality, documents, product, and manufacturing on Unifize.",
};

export default function TestimonialsPage() {
  return (
    <ResourceShell>
      <CollectionMast
        trail={[{ label: "Customer stories" }]}
        title="Customer stories,"
        dim="told by the teams."
        desc="How teams cleared backlogs, released batches faster, and turned audits into non-events on Unifize. Filter by industry or module."
      />

      <section className="dms-section rs-libsection">
        <TestimonialLibrary testimonials={TESTIMONIALS} />
      </section>

      <QuoteBand heading="Hear it in their own words." />
      <ResourceCTA
        heading="Ready to see it in action?"
        sub="Every one of these stories started with a backlog. Book a demo and see what Unifize would do with yours."
        ctaSecondary={{ label: "Read the case studies", href: "/explorations/resources/case-studies" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
