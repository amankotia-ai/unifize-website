/* ============================================================================
 * /explorations/resources/testimonials/[slug] - a single customer video,
 * structured like the live video item: a compact light masthead, the player
 * as anchor, chapters + quote beside the fact card, then related videos.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter, TagRow } from "../../_shared/resource-chrome";
import { VideoPlayer } from "../../_shared/resources-interactive";
import { VideoCard } from "../../_shared/resource-cards";
import { TESTIMONIALS, getTestimonial } from "../../_shared/resources-data";

export function generateStaticParams() {
  return TESTIMONIALS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTestimonial(slug);
  if (!t) return { title: "Customer story — Unifize" };
  return { title: `${t.company}: ${t.headline} — Unifize`, description: t.quote };
}

export default async function TestimonialItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTestimonial(slug);
  if (!t) notFound();

  const related = TESTIMONIALS.filter((o) => o.slug !== t.slug && (o.industry === t.industry || o.modules.some((m) => t.modules.includes(m))));
  const fill = TESTIMONIALS.filter((o) => o.slug !== t.slug && !related.includes(o));
  const relatedAll = [...related, ...fill].slice(0, 3);

  return (
    <ResourceShell>
      <ResourceMast
        trail={[{ label: "Videos", href: "/explorations/resources/testimonials" }, { label: t.company }]}
        title={t.headline}
        desc={`${t.person}, ${t.role} at ${t.company} · ${t.companyKind}`}
        compact
      >
        <TagRow modules={t.modules} industry={t.industry} />
      </ResourceMast>

      {/* player */}
      <section className="dms-section rs-block" style={{ paddingTop: 0 }}>
        <div className="dms-wrap">
          <div data-reveal><VideoPlayer t={t} /></div>
        </div>
      </section>

      {/* body */}
      <section className="dms-section rs-block dms-section--alt">
        <div className="dms-wrap rs-item-grid">
          <div data-reveal>
            <h2 className="rs-lab">In this video</h2>
            <ol className="rs-chapters">
              {t.chapters.map((c) => (
                <li className="rs-chapter" key={c.t}>
                  <span className="rs-chapter__t">{c.t}</span>
                  <span className="rs-chapter__label">{c.label}</span>
                </li>
              ))}
            </ol>
            <figure className="rs-pull">
              <blockquote className="rs-pull__q">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="rs-pull__cite">
                {t.poster ? <img className="rs-pull__ava" src={t.poster} alt="" /> : null}
                <span className="rs-pull__who">
                  <span className="rs-pull__name">{t.person}</span>
                  <span className="rs-pull__role">{t.role}, {t.company}</span>
                </span>
              </figcaption>
            </figure>
          </div>

          <aside data-reveal>
            <div className="rs-spec">
              <div className="rs-spec__row"><span className="rs-spec__lab">Company</span><span className="rs-spec__val">{t.company} · {t.companyKind}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Industry</span><span className="rs-spec__val">{t.industry}</span></div>
              <div className="rs-spec__row"><span className="rs-spec__lab">Modules in play</span><span className="rs-spec__val">{t.modules.join(", ")}</span></div>
              {t.metrics.map((m) => (
                <div className="rs-spec__row" key={m.label}><span className="rs-spec__lab">{m.label}</span><span className="rs-spec__stat">{m.value}</span></div>
              ))}
              <div className="rs-spec__row"><span className="rs-spec__lab">Read the full account</span><Link href="/explorations/resources/case-studies" className="rs-spec__val">Case studies &rarr;</Link></div>
            </div>
          </aside>
        </div>
      </section>

      {/* related */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <h2 className="rs-relhead">More videos</h2>
          <div className="rs-grid rs-grid--3" data-reveal>
            {relatedAll.map((o) => <VideoCard key={o.slug} t={o} />)}
          </div>
        </div>
      </section>

      <ResourceCTA
        heading="Your team has a story like this waiting to happen."
        sub="Book a demo and see connected collaboration on your own processes."
        ctaSecondary={{ label: "See the platform", href: "/explorations/platform" }}
      />
      <ResourceFooter />
    </ResourceShell>
  );
}
