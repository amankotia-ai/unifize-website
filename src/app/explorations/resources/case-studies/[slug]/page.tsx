/* ============================================================================
 * /explorations/resources/case-studies/[slug] - a single case study,
 * structured like the live item: a banner plate with the title, a fact card
 * (company, industry, size, modules, standards), the headline results, the
 * narrative, a customer quote, then related studies.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { ResourceCTA, ResourceFooter, TagRow } from "../../_shared/resource-chrome";
import { CaseCard } from "../../_shared/resource-cards";
import { CASE_STUDIES, getCaseStudy, TESTIMONIALS } from "../../_shared/resources-data";
import { BookDemoButton } from "@/components/organisms/book-demo";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return { title: "Case study — Unifize" };
  return { title: `${c.company} — Unifize case study`, description: c.summary };
}

const NARR: { key: "challenge" | "approach" | "result"; label: string }[] = [
  { key: "challenge", label: "The challenge" },
  { key: "approach", label: "The approach" },
  { key: "result", label: "The result" },
];

export default async function CaseStudyItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const video = TESTIMONIALS.find((t) => t.company === c.company);
  const related = CASE_STUDIES.filter((o) => o.slug !== c.slug && o.industry === c.industry);
  const fill = CASE_STUDIES.filter((o) => o.slug !== c.slug && !related.includes(o));
  const relatedAll = [...related, ...fill].slice(0, 3);

  return (
    <ResourceShell>
      {/* banner */}
      <section className="dms-section rs-bannerwrap">
        <div className="dms-wrap">
          <div className="rs-banner">
            <nav className="rs-crumb" aria-label="Breadcrumb">
              <Link href="/explorations/resources">Resources</Link>
              <span className="rs-crumb__seg"><span aria-hidden="true">/</span><Link href="/explorations/resources/case-studies">Case studies</Link></span>
            </nav>
            <h1 className="rs-banner__title">{c.headline}</h1>
            <p className="rs-banner__desc">{c.summary}</p>
            <div className="rs-banner__actions">
              {video ? (
                <Link href={`/explorations/resources/testimonials/${video.slug}`} className="dms-btn">Watch the story · {video.duration}</Link>
              ) : (
                <BookDemoButton className="dms-btn" source="case-study">Book a demo</BookDemoButton>
              )}
            </div>
          </div>
          <div className="rs-metarow">
            <TagRow modules={c.modules} industry={c.industry} />
          </div>
        </div>
      </section>

      {/* results + fact card */}
      <section className="dms-section rs-block">
        <div className="dms-wrap rs-item-grid">
          <div data-reveal>
            <h2 className="rs-lab">The results</h2>
            <div className="rs-statband">
              {c.metrics.map((m) => (
                <div className="rs-statband__it" key={m.label}>
                  <span className="rs-statband__v">{m.value}</span>
                  <span className="rs-statband__l">{m.label}</span>
                </div>
              ))}
            </div>
            <figure className="rs-pull" data-reveal>
              <blockquote className="rs-pull__q">&ldquo;{c.quote.text}&rdquo;</blockquote>
              <figcaption className="rs-pull__cite">
                {c.quote.img ? <img className="rs-pull__ava" src={c.quote.img} alt="" /> : null}
                <span className="rs-pull__who">
                  <span className="rs-pull__name">{c.quote.person}</span>
                  <span className="rs-pull__role">{c.quote.role}</span>
                </span>
              </figcaption>
            </figure>
          </div>

          <aside data-reveal>
            <div className="rs-spec">
              <div className="rs-spec__row"><span className="rs-spec__lab">Company</span><span className="rs-spec__val">{c.company} · {c.companyKind}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Industry</span><span className="rs-spec__val">{c.industry}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Size</span><span className="rs-spec__val">{c.size}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Modules</span><span className="rs-spec__val">{c.modules.join(", ")}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Compliance frame</span><span className="rs-spec__val">{c.standards.join(" · ")}</span></div>
              {video ? (
                <div className="rs-spec__row"><span className="rs-spec__lab">Watch the story</span><Link href={`/explorations/resources/testimonials/${video.slug}`} className="rs-spec__val">{video.duration} video &rarr;</Link></div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {/* narrative */}
      <section className="dms-section rs-block dms-section--alt">
        <div className="dms-wrap">
          <div className="rs-narr">
            {NARR.map((block) => (
              <div className={"rs-narr__block rs-narr__block--" + block.key} key={block.key} data-reveal>
                <h2 className="rs-narr__h">{block.label}</h2>
                <ul className="rs-narr__list">
                  {c[block.key].map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* related */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <h2 className="rs-relhead">More case studies</h2>
          <div className="rs-grid rs-grid--3" data-reveal>
            {relatedAll.map((o) => <CaseCard key={o.slug} c={o} />)}
          </div>
        </div>
      </section>

      <ResourceCTA
        heading="Ready to see transformation in action?"
        sub={`Book a demo and run the play ${c.company} ran, on your own quality processes.`}
        ctaSecondary={{ label: "See the platform", href: "/explorations/platform" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
