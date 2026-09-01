/* ============================================================================
 * /explorations/resources/testimonials/[slug] - a single customer video in the
 * customer-story grammar: a full-bleed cinematic video hero (the film IS the
 * masthead), an About card with the company facts and the video's chapters,
 * a centered challenge -> solution -> impact narrative with the outcome
 * metrics, the spoken quote as a centerpiece, then more stories. Structure
 * follows the classic customer-story page; the language stays DMS: square
 * corners, hairlines, IBM Plex display, Unifize blue used sparingly.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { ResourceCTA, ResourceFooter } from "../../_shared/resource-chrome";
import { CineMedia } from "../../_shared/resources-interactive";
import { VideoCard } from "../../_shared/resource-cards";
import { TESTIMONIALS, getTestimonial, type StoryBlock } from "../../_shared/resources-data";
import { BookDemoButton } from "@/components/organisms/book-demo";

export function generateStaticParams() {
  return TESTIMONIALS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTestimonial(slug);
  if (!t) return { title: "Customer story — Unifize" };
  return { title: `${t.company}: ${t.headline} — Unifize`, description: t.quote };
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rs-cine-fact">
      <span className="rs-cine-fact__lab">{label}</span>
      <span className="rs-cine-fact__val">{value}</span>
    </div>
  );
}

function Block({ eyebrow, block, children }: { eyebrow: string; block: StoryBlock; children?: React.ReactNode }) {
  return (
    <article className="rs-story__block" data-reveal>
      <span className="dms-eyebrow">{eyebrow}</span>
      <h2 className="rs-story__h">{block.heading}</h2>
      {block.body.map((p) => <p className="rs-story__p" key={p.slice(0, 24)}>{p}</p>)}
      {block.points ? (
        <ul className="rs-story__points">
          {block.points.map((pt) => (
            <li key={pt.lead}><b>{pt.lead}</b> {pt.text}</li>
          ))}
        </ul>
      ) : null}
      {children}
    </article>
  );
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
      {/* cinematic hero - the video is the masthead */}
      <section className="dms-section dms-section--dark rs-cine">
        <CineMedia t={t} />
        <div className="dms-wrap rs-cine__frame">
          <nav className="rs-crumb rs-crumb--dark" aria-label="Breadcrumb">
            <Link href="/explorations/resources">Resources</Link>
            <span className="rs-crumb__seg"><span aria-hidden="true">/</span><Link href="/explorations/resources/testimonials">Videos</Link></span>
            <span className="rs-crumb__seg"><span aria-hidden="true">/</span><span>{t.company}</span></span>
          </nav>
          <div className="rs-cine__foot">
            <div className="rs-cine__head">
              <span className="rs-cine__co">{t.company}</span>
              <h1 className="rs-cine__title">{t.headline}</h1>
              <p className="rs-cine__sub">{t.person}, {t.role} · {t.companyKind}</p>
            </div>
            <div className="rs-cine__cta">
              <BookDemoButton className="dms-btn" source="video-hero">Book a demo</BookDemoButton>
            </div>
          </div>
        </div>
      </section>

      {/* body: about card + story column + quote */}
      <section className="dms-section dms-section--alt rs-block rs-cine-body">
        <div className="dms-wrap">
          <div className="rs-cine-about" data-reveal>
            <div className="rs-cine-about__grid">
              <div className="rs-cine-about__head">
                <span className="rs-cine-fact__lab">About</span>
                <h2 className="rs-cine-about__co">{t.company}</h2>
              </div>
              <p className="rs-cine-about__desc">{t.about}</p>
            </div>
            <div className="rs-cine-about__facts">
              <Fact label="Industry" value={t.industry} />
              <Fact label="Company size" value={t.size} />
              <Fact label="Compliance frame" value={t.standards.join(" · ")} />
              <Fact label="Modules in play" value={t.modules.join(", ")} />
            </div>
            <div className="rs-cine-about__ch">
              <span className="rs-cine-fact__lab">In this video</span>
              <ol className="rs-cine-chlist">
                {t.chapters.map((c) => (
                  <li className="rs-cine-chit" key={c.t}>
                    <span className="rs-cine-chit__t">{c.t}</span>
                    <span className="rs-cine-chit__l">{c.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="rs-story">
            <Block eyebrow="Challenge" block={t.story.challenge} />
            <Block eyebrow="Solution" block={t.story.solution} />
            <Block eyebrow="Impact" block={t.story.impact}>
              <div className="rs-statband rs-statband--duo">
                {t.metrics.map((m) => (
                  <div className="rs-statband__it" key={m.label}>
                    <span className="rs-statband__v">{m.value}</span>
                    <span className="rs-statband__l">{m.label}</span>
                  </div>
                ))}
              </div>
            </Block>
          </div>

          <figure className="rs-cine-quote" data-reveal>
            <blockquote className="rs-cine-quote__q">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="rs-cine-quote__cite">
              {t.poster ? <img className="rs-cine-quote__ava" src={t.poster} alt="" /> : null}
              <span className="rs-cine-quote__who">
                <span className="rs-cine-quote__name">{t.person}</span>
                <span className="rs-cine-quote__role">{t.role}, {t.company}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* related */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <div className="rs-relrow">
            <h2 className="rs-relhead">More customer stories</h2>
            <Link className="rs-relall" href="/explorations/resources/testimonials">View all &rarr;</Link>
          </div>
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
