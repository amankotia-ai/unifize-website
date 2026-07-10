/* ============================================================================
 * /explorations/resources/case-studies - the full accounts. Editorial masthead,
 * then an industry/module + search toolbar over numbered metric-hero case cards.
 * Items at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import { ResourceShell } from "../_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter } from "../_shared/resource-chrome";
import { CaseLibrary } from "../_shared/resources-interactive";
import { CASE_STUDIES, INDUSTRIES, MODULES } from "../_shared/resources-data";

export const metadata: Metadata = {
  title: "Case studies — Unifize",
  description: "The full account: the backlog, the change, and the numbers. Case studies across medical devices, pharma, aerospace, automotive, food, and contract manufacturing.",
};

export default function CaseStudiesPage() {
  return (
    <ResourceShell>
      <ResourceMast
        trail={[{ label: "Case studies" }]}
        kicker="The full account"
        title="Case studies."
        desc="What a team was up against, what they changed, and what the metrics did. Filter by industry and by the modules they put to work."
        bignum={{ value: String(CASE_STUDIES.length).padStart(2, "0"), label: "Studies" }}
        facets={[
          { n: String(CASE_STUDIES.length), label: "studies" },
          { n: String(INDUSTRIES.length), label: "industries" },
          { n: String(MODULES.length), label: "modules" },
        ]}
      />

      <section className="dms-section rs-libsection">
        <CaseLibrary studies={CASE_STUDIES} />
      </section>

      <ResourceCTA heading="These numbers started as somebody's backlog. Scope what Unifize would change for you." ctaSecondary={{ label: "Watch customer stories", href: "/explorations/resources/testimonials" }} />
      <ResourceFooter />
    </ResourceShell>
  );
}
