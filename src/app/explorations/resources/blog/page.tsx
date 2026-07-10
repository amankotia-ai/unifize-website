/* ============================================================================
 * /explorations/resources/blog - the writing. Editorial masthead, a featured
 * lead on a paper plate, then a category + search toolbar over numbered
 * paper-plate post cards. Items at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { ResourceShell } from "../_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter } from "../_shared/resource-chrome";
import { BlogLibrary } from "../_shared/resources-interactive";
import { POSTS, BLOG_CATEGORIES } from "../_shared/resources-data";

export const metadata: Metadata = {
  title: "Blog — Unifize",
  description: "Field notes on running quality in regulated manufacturing: CAPA, 21 CFR Part 11, review-by-exception, design controls, and surviving an FDA 483.",
};

const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
const rest = POSTS.filter((p) => p.slug !== featured.slug);

export default function BlogPage() {
  return (
    <ResourceShell>
      <ResourceMast
        trail={[{ label: "Blog" }]}
        kicker="Field notes"
        title="On practice."
        desc="Writing on CAPA, Part 11, review-by-exception, design controls, and the moments that test a quality system - from the people who build Unifize."
        bignum={{ value: String(POSTS.length).padStart(2, "0"), label: "Posts" }}
        facets={[
          { n: String(POSTS.length), label: "posts" },
          { n: String(BLOG_CATEGORIES.length), label: "topics" },
        ]}
      />

      {/* featured lead */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <Link href={`/explorations/resources/blog/${featured.slug}`} className="rs-lead" data-reveal>
            <div className="rs-plate rs-plate--paper rs-lead__plate">
              <span className="rs-plate__no">01</span>
              <span className="rs-plate__kind dms-data">{featured.readMins} min</span>
              <span className="rs-plate__word">{featured.category}</span>
            </div>
            <div className="rs-lead__body">
              <span className="rs-lead__kicker">Featured · {featured.dateLabel}</span>
              <h2 className="rs-lead__title">{featured.title}</h2>
              <p className="rs-lead__dek">{featured.dek}</p>
              <span className="rs-lead__who">{featured.author.name} — {featured.author.role} · {featured.readMins} min read</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="dms-section rs-libsection">
        <BlogLibrary posts={rest} categories={BLOG_CATEGORIES} />
      </section>

      <ResourceCTA heading="Writing worth your inbox, at the cadence of when we have something to say." ctaPrimary="Subscribe" ctaSecondary={{ label: "Read the case studies", href: "/explorations/resources/case-studies" }} />
      <ResourceFooter />
    </ResourceShell>
  );
}
