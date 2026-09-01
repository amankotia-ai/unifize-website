/* ============================================================================
 * /explorations/resources - the catalog hub in the customer-story grammar:
 * a big display statement mast, then one band per collection (customer
 * stories, case studies, blog), each a heading + explore link over a row of
 * that collection's real cards, closed by the dark customer-proof band.
 * ========================================================================== */
import type { Metadata } from "next";
import { ResourceShell } from "./_shared/resource-shell";
import { CollectionMast, BandHead, QuoteBand, ResourceCTA, ResourceFooter } from "./_shared/resource-chrome";
import { VideoCard, PostCard, CaseCard } from "./_shared/resource-cards";
import { TESTIMONIALS, CASE_STUDIES, POSTS } from "./_shared/resources-data";

export const metadata: Metadata = {
  title: "Resources — Unifize",
  description: "Customer videos, case studies, and writing on running quality in regulated manufacturing.",
};

const films = TESTIMONIALS.slice(0, 3);
const studies = CASE_STUDIES.slice(0, 3);
const latest = POSTS.slice(0, 3);

export default function ResourcesHubPage() {
  return (
    <ResourceShell>
      <CollectionMast
        trail={[{ label: "Overview" }]}
        title="Everything you need"
        dim="to evaluate Unifize."
        desc="Customer videos, deep-dive case studies, and writing on the practice of quality in regulated manufacturing, all grounded in real work."
      />

      <section className="dms-section rs-block rs-hubband">
        <div className="dms-wrap">
          <BandHead title="Customer stories" link={{ label: `All ${TESTIMONIALS.length} videos`, href: "/explorations/resources/testimonials" }} />
          <div className="rs-grid rs-grid--3" data-reveal>
            {films.map((t) => <VideoCard key={t.slug} t={t} />)}
          </div>
        </div>
      </section>

      <section className="dms-section rs-block rs-hubband dms-section--alt">
        <div className="dms-wrap">
          <BandHead title="Case studies" link={{ label: `All ${CASE_STUDIES.length} studies`, href: "/explorations/resources/case-studies" }} />
          <div className="rs-grid rs-grid--3" data-reveal>
            {studies.map((c) => <CaseCard key={c.slug} c={c} />)}
          </div>
        </div>
      </section>

      <section className="dms-section rs-block rs-hubband">
        <div className="dms-wrap">
          <BandHead title="From the blog" link={{ label: `All ${POSTS.length} posts`, href: "/explorations/resources/blog" }} />
          <div className="rs-grid rs-grid--3" data-reveal>
            {latest.map((p) => <PostCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <QuoteBand />
      <ResourceCTA
        heading="Ready to see it in action?"
        sub="Book a demo and see how connected collaboration drives real results on your own processes."
        ctaSecondary={{ label: "See the platform", href: "/explorations/platform" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
