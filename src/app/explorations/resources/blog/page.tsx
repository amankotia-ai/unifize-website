/* ============================================================================
 * /explorations/resources/blog - the writing, structured like unifize.com/blog:
 * a light centered masthead straight into the post grid, with a quiet topic
 * filter. Items at ./[slug].
 * ========================================================================== */
import type { Metadata } from "next";
import { ResourceShell } from "../_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter } from "../_shared/resource-chrome";
import { BlogLibrary } from "../_shared/resources-interactive";
import { POSTS, BLOG_CATEGORIES } from "../_shared/resources-data";

export const metadata: Metadata = {
  title: "Blog — Unifize",
  description: "Practical insights and real-world advice on improving quality and collaboration: CAPA, 21 CFR Part 11, review-by-exception, design controls, and surviving an FDA 483.",
};

export default function BlogPage() {
  return (
    <ResourceShell>
      <ResourceMast
        trail={[{ label: "Blog" }]}
        title="Blog"
        desc="Practical insights, expert perspectives, and real-world advice on improving quality and collaboration. From deep dives to quick tips, ideas that help teams work smarter, faster, and more aligned."
      />

      <section className="dms-section rs-libsection">
        <BlogLibrary posts={POSTS} categories={BLOG_CATEGORIES} />
      </section>

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
