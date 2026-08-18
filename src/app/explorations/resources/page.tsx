/* ============================================================================
 * /explorations/resources - the catalog hub. Light centered masthead + three
 * destinations (videos, case studies, blog), mirroring the live site's
 * Resources menu in the DMS design language. Each destination card previews
 * its own content: video thumbnails, headline results, latest post titles.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { ResourceShell } from "./_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter, IconBadge } from "./_shared/resource-chrome";
import { PlayGlyph, initialsOf } from "./_shared/resource-cards";
import { TESTIMONIALS, CASE_STUDIES, POSTS } from "./_shared/resources-data";

export const metadata: Metadata = {
  title: "Resources — Unifize",
  description: "Customer videos, case studies, and writing on running quality in regulated manufacturing.",
};

const films = TESTIMONIALS.slice(0, 3);
const results = CASE_STUDIES.slice(0, 3).map((c) => c.metrics[0]);
const latest = POSTS.slice(0, 2);

export default function ResourcesHubPage() {
  return (
    <ResourceShell>
      <ResourceMast
        trail={[{ label: "Overview" }]}
        title="Resources"
        desc="Customer videos, deep-dive case studies, and writing on the practice of quality in regulated manufacturing, all grounded in real work on Unifize."
      />

      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <div className="rs-hubgrid">
            <Link href="/explorations/resources/testimonials" className="rs-hubcard" data-reveal>
              <IconBadge kind="video" />
              <h2 className="rs-hubcard__title">Videos</h2>
              <p className="rs-hubcard__body">Product walkthroughs and customer stories from the teams that run quality, documents, product, and manufacturing on Unifize.</p>
              <div className="rs-hubprev rs-hubprev--films" aria-hidden="true">
                {films.map((t) => (
                  <span className="rs-hubfilm" key={t.slug}>
                    {t.poster
                      ? <img className="rs-hubfilm__img" src={t.poster} alt="" loading="lazy" />
                      : <i className="rs-hubfilm__ghost">{initialsOf(t.company)}</i>}
                    <PlayGlyph className="rs-hubfilm__play" />
                  </span>
                ))}
              </div>
              <span className="rs-hubcard__go">Browse {TESTIMONIALS.length} videos &rarr;</span>
            </Link>

            <Link href="/explorations/resources/case-studies" className="rs-hubcard" data-reveal>
              <IconBadge kind="chart" />
              <h2 className="rs-hubcard__title">Case studies</h2>
              <p className="rs-hubcard__body">How leading teams simplified their processes and drove measurable results: the situation, the change, and the numbers.</p>
              <div className="rs-hubprev rs-hubprev--stats" aria-hidden="true">
                {results.map((m) => (
                  <span className="rs-hubstat" key={m.label}><b>{m.value}</b> {m.label}</span>
                ))}
              </div>
              <span className="rs-hubcard__go">Browse {CASE_STUDIES.length} studies &rarr;</span>
            </Link>

            <Link href="/explorations/resources/blog" className="rs-hubcard" data-reveal>
              <IconBadge kind="pen" />
              <h2 className="rs-hubcard__title">Blog</h2>
              <p className="rs-hubcard__body">Practical insights and real-world advice on CAPA, Part 11, design controls, and improving quality and collaboration.</p>
              <div className="rs-hubprev rs-hubprev--posts" aria-hidden="true">
                {latest.map((p) => (
                  <span className="rs-hubpost" key={p.slug}>
                    <i className="rs-hubpost__cat">{p.category}</i>
                    <span className="rs-hubpost__t">{p.title}</span>
                  </span>
                ))}
              </div>
              <span className="rs-hubcard__go">Browse {POSTS.length} posts &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <ResourceCTA
        heading="Ready to see it in action?"
        sub="Book a demo and see how connected collaboration drives real results on your own processes."
        ctaSecondary={{ label: "See the platform", href: "/explorations/platform" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
