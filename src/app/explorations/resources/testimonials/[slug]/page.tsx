/* ============================================================================
 * /explorations/resources/testimonials/[slug] - a single customer film. Compact
 * masthead, the cinematic player as anchor, a chapter tracklist + pull quote
 * beside an exhibit spec, and a related-films grid.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { ResourceMast, ResourceCTA, ResourceFooter, TagRow, pad2 } from "../../_shared/resource-chrome";
import { VideoPlayer, VideoPoster } from "../../_shared/resources-interactive";
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
        trail={[{ label: "Customer stories", href: "/explorations/resources/testimonials" }, { label: t.company }]}
        kicker={`Film · ${t.company}`}
        title={<>&ldquo;{t.headline}&rdquo;</>}
        desc={`${t.person}, ${t.role} at ${t.company} — a ${t.companyKind.toLowerCase()}.`}
        compact
      >
        <TagRow modules={t.modules} industry={t.industry} />
      </ResourceMast>

      {/* player */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <div data-reveal><VideoPlayer t={t} /></div>
        </div>
      </section>

      {/* body */}
      <section className="dms-section rs-block dms-section--alt">
        <div className="dms-wrap rs-item-grid">
          <div data-reveal>
            <h2 className="rs-h3--mono">In this film</h2>
            <ol className="rs-chapters">
              {t.chapters.map((c) => (
                <li className="rs-chapter" key={c.t}>
                  <span className="rs-chapter__t dms-data">{c.t}</span>
                  <span className="rs-chapter__label">{c.label}</span>
                </li>
              ))}
            </ol>
            <figure className="rs-pull">
              <span className="rs-pull__mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="rs-pull__q">{t.quote}</blockquote>
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
              <div className="rs-spec__row"><span className="rs-spec__lab">Company</span><span className="rs-spec__val">{t.company} — {t.companyKind}</span></div>
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
          <div className="rs-blocklabel"><span className="rs-blocklabel__t">More films</span></div>
          <div className="rs-vgrid" data-reveal>
            {relatedAll.map((o, i) => <VideoPoster key={o.slug} t={o} no={i + 1} />)}
          </div>
        </div>
      </section>

      <ResourceCTA heading="Your team has a story like this waiting to happen." ctaSecondary={{ label: "See the platform", href: "/explorations/platform" }} />
      <ResourceFooter />
    </ResourceShell>
  );
}
