/* ============================================================================
 * /explorations/resources/testimonials - the customer film library. Editorial
 * masthead, a featured exhibit, then the browsable gallery (group by company /
 * industry / module + search) of numbered film cards. Items at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { ResourceShell } from "../_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter, PlayGlyph, initials } from "../_shared/resource-chrome";
import { TestimonialLibrary } from "../_shared/resources-interactive";
import { TESTIMONIALS, INDUSTRIES, MODULES } from "../_shared/resources-data";

export const metadata: Metadata = {
  title: "Customer stories — Unifize",
  description: "Video stories from teams running quality, documents, product and manufacturing on Unifize. Browse by company, industry, or module.",
};

const featured = TESTIMONIALS.find((t) => t.featured) ?? TESTIMONIALS[0];

export default function TestimonialsPage() {
  return (
    <ResourceShell>
      <ResourceMast
        trail={[{ label: "Customer stories" }]}
        kicker="Customer evidence"
        title="On the record."
        desc="Short, unscripted film from quality, manufacturing, and product leaders. Watch the backlog clear, the batch release, the audit turn into a non-event."
        bignum={{ value: String(TESTIMONIALS.length).padStart(2, "0"), label: "Films" }}
        facets={[
          { n: String(TESTIMONIALS.length), label: "films" },
          { n: String(INDUSTRIES.length), label: "industries" },
          { n: String(MODULES.length), label: "modules" },
        ]}
      />

      {/* featured exhibit */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <Link href={`/explorations/resources/testimonials/${featured.slug}`} className="rs-lead" data-reveal>
            <div className="rs-plate rs-lead__plate">
              {featured.poster ? <img className="rs-plate__img" src={featured.poster} alt="" /> : <span className="rs-plate__ghost" aria-hidden="true">{initials(featured.company)}</span>}
              <span className="rs-plate__scrim" aria-hidden="true" />
              <span className="rs-plate__no">01</span>
              <PlayGlyph className="rs-plate__play" />
              <span className="rs-plate__dur dms-data">{featured.duration}</span>
              <span className="rs-plate__sample">Sample</span>
            </div>
            <div className="rs-lead__body">
              <span className="rs-lead__kicker">Featured · {featured.industry}</span>
              <h2 className="rs-lead__title">&ldquo;{featured.quote}&rdquo;</h2>
              <span className="rs-lead__who">{featured.person} — {featured.role}, {featured.company}</span>
              <span className="rs-lead__watch">Watch film · {featured.duration} &rarr;</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="dms-section rs-libsection">
        <TestimonialLibrary testimonials={TESTIMONIALS} />
      </section>

      <ResourceCTA heading="Every one of these started with a backlog. See what Unifize would do with yours." ctaSecondary={{ label: "Read the case studies", href: "/explorations/resources/case-studies" }} />
      <ResourceFooter />
    </ResourceShell>
  );
}
