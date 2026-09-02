/* ============================================================================
 * /explorations/resources/case-studies/[slug] - a single case study in the
 * customer-story grammar, matching the video item pages: a full-bleed dark
 * hero (portrait or ghost monogram; a play link into the company's video when
 * one exists), the About card with company facts, a centered challenge ->
 * approach -> result narrative with the three headline metrics, the customer
 * quote as a centerpiece, then more studies.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { Crumb, BandHead, ResourceCTA, ResourceFooter } from "../../_shared/resource-chrome";
import { CaseCard, PlayGlyph, initialsOf } from "../../_shared/resource-cards";
import { CASE_STUDIES, getCaseStudy } from "../../_shared/resources-data";
import { CUSTOMER_VIDEOS } from "../../_shared/customer-videos";
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

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rs-cine-fact">
      <span className="rs-cine-fact__lab">{label}</span>
      <span className="rs-cine-fact__val">{value}</span>
    </div>
  );
}

const NARR: { key: "challenge" | "approach" | "result"; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "approach", label: "Approach" },
  { key: "result", label: "Result" },
];

export default async function CaseStudyItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const video = CUSTOMER_VIDEOS.find((o) => o.company === c.company);
  const related = CASE_STUDIES.filter((o) => o.slug !== c.slug && o.industry === c.industry);
  const fill = CASE_STUDIES.filter((o) => o.slug !== c.slug && !related.includes(o));
  const relatedAll = [...related, ...fill].slice(0, 3);

  return (
    <ResourceShell>
      {/* cinematic hero - still media; the play link opens the company's video */}
      <section className="dms-section dms-section--dark rs-cine">
        <div className="rs-cine__media">
          {c.quote.img
            ? <img className="rs-cine__img" src={c.quote.img} alt="" />
            : <span className="rs-cine__ghost" aria-hidden="true">{initialsOf(c.company)}</span>}
          <span className="rs-cine__scrim" aria-hidden="true" />
          <span className="rs-cine__sample">Sample</span>
          {video ? (
            <Link href={`/explorations/resources/testimonials/${video.slug}`} className="rs-cine__play" aria-label={`Watch ${c.company}'s story`}>
              <PlayGlyph />
              <span className="rs-cine__runtime">Watch · {video.duration}</span>
            </Link>
          ) : null}
        </div>
        <div className="dms-wrap rs-cine__frame">
          <Crumb trail={[{ label: "Case studies", href: "/explorations/resources/case-studies" }, { label: c.company }]} dark />
          <div className="rs-cine__foot">
            <div className="rs-cine__head">
              <span className="rs-cine__co">{c.company}</span>
              <h1 className="rs-cine__title">{c.headline}</h1>
              <p className="rs-cine__sub">{c.summary}</p>
            </div>
            <div className="rs-cine__cta">
              <BookDemoButton className="dms-btn" source="case-hero">Book a demo</BookDemoButton>
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
                <h2 className="rs-cine-about__co">{c.company}</h2>
              </div>
              <p className="rs-cine-about__desc">{c.about}</p>
            </div>
            <div className="rs-cine-about__facts">
              <Fact label="Industry" value={c.industry} />
              <Fact label="Company size" value={c.size} />
              <Fact label="Compliance frame" value={c.standards.join(" · ")} />
              <Fact label="Modules in play" value={c.modules.join(", ")} />
            </div>
          </div>

          <div className="rs-story">
            {NARR.map(({ key, label }) => (
              <article className="rs-story__block" data-reveal key={key}>
                <span className="dms-eyebrow">{label}</span>
                <h2 className="rs-story__h">{c.storyHeads[key]}</h2>
                <ul className="rs-story__points">
                  {c[key].map((line) => <li key={line}>{line}</li>)}
                </ul>
                {key === "result" ? (
                  <div className="rs-statband rs-statband--trio">
                    {c.metrics.map((m) => (
                      <div className="rs-statband__it" key={m.label}>
                        <span className="rs-statband__v">{m.value}</span>
                        <span className="rs-statband__l">{m.label}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <figure className="rs-cine-quote" data-reveal>
            <blockquote className="rs-cine-quote__q">&ldquo;{c.quote.text}&rdquo;</blockquote>
            <figcaption className="rs-cine-quote__cite">
              {c.quote.img ? <img className="rs-cine-quote__ava" src={c.quote.img} alt="" /> : null}
              <span className="rs-cine-quote__who">
                <span className="rs-cine-quote__name">{c.quote.person}</span>
                <span className="rs-cine-quote__role">{c.quote.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* related */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <BandHead title="More case studies" link={{ label: "View all", href: "/explorations/resources/case-studies" }} />
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
