/* ============================================================================
 * /explorations/resources/blog - the writing, in the customer-story grammar:
 * a flat two-tone display mast with a muted standfirst right, the topic
 * toolbar over the post grid, then the dark customer-proof band.
 * Items at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import { ResourceShell } from "../_shared/resource-shell";
import { CollectionMast, QuoteBand, ResourceCTA, ResourceFooter } from "../_shared/resource-chrome";
import { BlogLibrary } from "../_shared/resources-interactive";
import { POSTS, BLOG_CATEGORIES } from "../_shared/resources-data";

export const metadata: Metadata = {
  title: "Blog — Unifize",
  description: "Practical insights and real-world advice on improving quality and collaboration: CAPA, 21 CFR Part 11, review-by-exception, design controls, and surviving an FDA 483.",
};

export default function BlogPage() {
  return (
    <ResourceShell>
      <CollectionMast
        trail={[{ label: "Blog" }]}
        title="Latest writing,"
        dim="from the practice."
        desc="Practical insights and real-world advice on improving quality and collaboration: CAPA, Part 11, design controls, and surviving an FDA 483."
      />

      <section className="dms-section rs-libsection">
        <BlogLibrary posts={POSTS} categories={BLOG_CATEGORIES} />
      </section>

      <QuoteBand heading="The teams behind the lessons." />
      <ResourceCTA
        heading="Writing worth your inbox."
        sub="Subscribe and get new posts at the cadence of when we have something to say."
        ctaPrimary="Subscribe"
        ctaSecondary={{ label: "Read the case studies", href: "/explorations/resources/case-studies" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
