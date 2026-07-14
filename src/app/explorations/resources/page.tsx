/* ============================================================================
 * /explorations/resources - the catalog hub. Editorial masthead + three
 * destinations (customer films, case studies, blog).
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { ResourceShell } from "./_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter } from "./_shared/resource-chrome";
import { TESTIMONIALS, CASE_STUDIES, POSTS } from "./_shared/resources-data";

export const metadata: Metadata = {
  title: "Resources — Unifize",
  description: "Customer video stories, case studies, and writing on running quality in regulated manufacturing.",
};

const HUB = [
  { n: "01", title: "Customer stories", body: "Short film from the teams that run quality, documents, product, and manufacturing on Unifize. Browse by company, industry, or module.", href: "/explorations/resources/testimonials", count: `${TESTIMONIALS.length} films` },
  { n: "02", title: "Case studies", body: "The full account: the backlog, the change, and the numbers. Filter by industry and by the modules a team put to work.", href: "/explorations/resources/case-studies", count: `${CASE_STUDIES.length} studies` },
  { n: "03", title: "Blog", body: "Field notes on CAPA, Part 11, review-by-exception, design controls, and surviving a 483 - from the people who build the system.", href: "/explorations/resources/blog", count: `${POSTS.length} posts` },
];

export default function ResourcesHubPage() {
  return (
    <ResourceShell>
      <ResourceMast
        trail={[{ label: "Overview" }]}
        kicker="The record"
        title="Proof, in their words."
        desc="Video stories, deep-dive case studies, and writing on the practice of quality in regulated manufacturing - all grounded in real work on Unifize."
        bignum={{ value: String(TESTIMONIALS.length + CASE_STUDIES.length + POSTS.length).padStart(2, "0"), label: "Exhibits" }}
      />

      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <div className="rs-hubgrid">
            {HUB.map((h) => (
              <Link key={h.title} href={h.href} className="rs-hubcard" data-reveal>
                <span className="rs-hubcard__n">{h.n} · {h.count}</span>
                <h2 className="rs-hubcard__title">{h.title}</h2>
                <p className="rs-hubcard__body">{h.body}</p>
                <span className="rs-hubcard__go">Browse &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ResourceCTA heading="See it run on your own processes." ctaSecondary={{ label: "See the platform", href: "/explorations/platform" }} />
      <ResourceFooter />
    </ResourceShell>
  );
}
