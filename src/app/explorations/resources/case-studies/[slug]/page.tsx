/* ============================================================================
 * /explorations/resources/case-studies/[slug] - a single case study. Compact
 * masthead, a headline result band in huge numerals, a customer pull-quote
 * beside an exhibit spec, the Challenge / Approach / Result narrative, related.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter, TagRow, pad2 } from "../../_shared/resource-chrome";
import { CASE_STUDIES, getCaseStudy, TESTIMONIALS } from "../../_shared/resources-data";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return { title: "Case study — Unifize" };
  return { title: `${c.company} — Unifize case study`, description: c.summary };
}

const NARR: { key: "challenge" | "approach" | "result"; n: string; label: string }[] = [
  { key: "challenge", n: "01", label: "The challenge" },
  { key: "approach", n: "02", label: "The approach" },
  { key: "result", n: "03", label: "The result" },
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
      <ResourceMast
        trail={[{ label: "Case studies", href: "/explorations/resources/case-studies" }, { label: c.company }]}
        kicker={`Case study · ${c.company}`}
        title={c.headline}
        desc={c.summary}
        compact
      >
        <TagRow modules={c.modules} industry={c.industry} />
      </ResourceMast>

      {/* result band */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <div className="rs-statband" data-reveal>
            {c.metrics.map((m, i) => (
              <div className="rs-statband__it" key={m.label}>
                <span className="rs-statband__n">R{pad2(i + 1)}</span>
                <span className="rs-statband__v">{m.value}</span>
                <span className="rs-statband__l">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* quote + spec */}
      <section className="dms-section rs-block dms-section--alt">
        <div className="dms-wrap rs-item-grid">
          <figure className="rs-pull" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }} data-reveal>
            <span className="rs-pull__mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="rs-pull__q">{c.quote.text}</blockquote>
            <figcaption className="rs-pull__cite">
              {c.quote.img ? <img className="rs-pull__ava" src={c.quote.img} alt="" /> : null}
              <span className="rs-pull__who">
                <span className="rs-pull__name">{c.quote.person}</span>
                <span className="rs-pull__role">{c.quote.role}</span>
              </span>
            </figcaption>
          </figure>

          <aside data-reveal>
            <div className="rs-spec">
              <div className="rs-spec__row"><span className="rs-spec__lab">Company</span><span className="rs-spec__val">{c.company} — {c.companyKind}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Industry</span><span className="rs-spec__val">{c.industry}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Size</span><span className="rs-spec__val">{c.size}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Modules</span><span className="rs-spec__val">{c.modules.join(", ")}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Compliance frame</span><span className="rs-spec__val">{c.standards.join(" · ")}</span></div>
              {video ? (
                <div className="rs-spec__row"><span className="rs-spec__lab">Watch the film</span><Link href={`/explorations/resources/testimonials/${video.slug}`} className="rs-spec__val">{video.duration} film &rarr;</Link></div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {/* narrative */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <div className="rs-narr">
            {NARR.map((block) => (
              <div className={"rs-narr__block rs-narr__block--" + block.key} key={block.key} data-reveal>
                <div className="rs-narr__side">
                  <span className="rs-narr__n">{block.n}</span>
                  <h2 className="rs-narr__h">{block.label}</h2>
                </div>
                <ul className="rs-narr__list">
                  {c[block.key].map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* related */}
      <section className="dms-section rs-block dms-section--alt">
        <div className="dms-wrap">
          <div className="rs-blocklabel"><span className="rs-blocklabel__t">More case studies</span></div>
          <ol className="rs-related" data-reveal>
            {relatedAll.map((o, i) => (
              <li className="rs-related__row" key={o.slug}>
                <Link href={`/explorations/resources/case-studies/${o.slug}`} className="rs-related__link">
                  <span className="rs-related__idx dms-data">{pad2(i + 1)}</span>
                  <h3 className="rs-related__title">{o.company}: {o.headline}</h3>
                  <span className="rs-related__meta">{o.industry} · {o.modules.join(" · ")}</span>
                  <svg className="rs-related__arrow" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true"><path strokeLinecap="square" d="m8 4 6 6-6 6" /></svg>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ResourceCTA heading={`Run the play ${c.company} ran, on your own quality processes.`} ctaSecondary={{ label: "See the platform", href: "/platform" }} />
      <ResourceFooter />
    </ResourceShell>
  );
}
