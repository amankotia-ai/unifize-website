/* ============================================================================
 * /explorations/resources/testimonials - the video library, structured like
 * unifize.com/videos: a split hero (icon badge, title, standfirst, CTA beside
 * a rotating featured-quote card), then "All videos" with one "Filter by"
 * toolbar over a uniform card grid. Items at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { ResourceShell } from "../_shared/resource-shell";
import { ResourceCTA, ResourceFooter, IconBadge, SectionHead } from "../_shared/resource-chrome";
import { TestimonialLibrary, QuoteCarousel } from "../_shared/resources-interactive";
import { TESTIMONIALS } from "../_shared/resources-data";

export const metadata: Metadata = {
  title: "Video library — Unifize",
  description: "Customer stories and product walkthroughs from teams running quality, documents, product, and manufacturing on Unifize.",
};

const featured = TESTIMONIALS.filter((t) => t.featured);
const carousel = featured.length >= 2 ? featured : TESTIMONIALS.slice(0, 3);

export default function TestimonialsPage() {
  return (
    <ResourceShell>
      {/* split hero: intro left, featured quotes right */}
      <section className="dms-section rs-hero">
        <div className="dms-wrap rs-hero__inner">
          <div className="rs-hero__left">
            <nav className="rs-crumb" aria-label="Breadcrumb">
              <Link href="/explorations/resources">Resources</Link>
              <span className="rs-crumb__seg"><span aria-hidden="true">/</span><span>Videos</span></span>
            </nav>
            <IconBadge kind="video" />
            <h1 className="rs-hero__title">Video library</h1>
            <p className="rs-hero__desc">
              Watch customer stories and product walkthroughs to learn how teams
              run quality, documents, product, and manufacturing on Unifize.
            </p>
            <a href="#all-videos" className="dms-btn rs-hero__cta">Watch videos</a>
          </div>
          <QuoteCarousel items={carousel} />
        </div>
      </section>

      {/* the library: section head + filter bar + grid */}
      <section className="dms-section rs-libsection">
        <div className="dms-wrap">
          <SectionHead
            id="all-videos"
            title="All videos"
            desc="Teams share how they cleared backlogs, released batches faster, and turned audits into non-events. Filter by industry or module."
          />
        </div>
        <TestimonialLibrary testimonials={TESTIMONIALS} />
      </section>

      <ResourceCTA
        heading="Ready to see it in action?"
        sub="Every one of these stories started with a backlog. Book a demo and see what Unifize would do with yours."
        ctaSecondary={{ label: "Read the case studies", href: "/explorations/resources/case-studies" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
