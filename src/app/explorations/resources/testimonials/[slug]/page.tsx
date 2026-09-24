/* ============================================================================
 * /explorations/resources/testimonials/[slug] - one customer story.
 *
 * The film is still the masthead: a full-bleed cinematic hero where the
 * Wistia embed takes the stage on play. 22 Sep 2026, the rails wave:
 * everything under it moved onto the grammar the collection now runs on
 * (_shared/page-rails.css + ../_shared/stories-rails.css) - railed sections
 * with hatched bands between, blue-square eyebrows, split heads, the related
 * stories as a rail-to-rail cell ledger, and the page closing on the same
 * charcoal as every other page in the wave.
 *
 * Content comes from customer-videos.ts, generated from the Notion Website
 * Customer Videos DB.
 * ========================================================================== */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DmsHeader } from "../../../products/dms/dms-header";
import { SiteFooter } from "../../../_shared/site-footer";
import { Eyebrow } from "../../../products/dms/dms-primitives";
import { HatchBand } from "../../../_shared/page-rails";
import { Crumb } from "../../_shared/resource-chrome";
import { CineMedia, TranscriptView } from "../../_shared/resources-interactive";
import { StoryCell } from "../../_shared/resource-cards";
import { CUSTOMER_VIDEOS, getVideo } from "../../_shared/customer-videos";
import { getTranscript } from "../../_shared/video-transcripts";
import { RESOURCE_FOOTER } from "../../_shared/resources-data";
import { BookDemoButton } from "@/components/organisms/book-demo";
import "../../../products/dms/dms.css";
import "../../../products/dms/dms-redesign.css";
import "../../_shared/resources-kit.css";
import "../../../_shared/page-rails.css";
import "../../_shared/stories-rails.css";
import { pageMetadata } from "@/app/explorations/_shared/seo";

export function generateStaticParams() {
  return CUSTOMER_VIDEOS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(`/resources/testimonials/${slug}`);
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="cs-fact">
      <span className="cs-fact__lab">{label}</span>
      <span className="cs-fact__val">{value}</span>
    </div>
  );
}

export default async function VideoItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) notFound();

  const transcript = getTranscript(v.slug);
  const sub = [v.person, v.role, v.company].filter(Boolean).join(" · ");
  const sameCompany = CUSTOMER_VIDEOS.filter((o) => o.slug !== v.slug && o.company && o.company === v.company);
  const sameIndustry = CUSTOMER_VIDEOS.filter((o) => o.slug !== v.slug && !sameCompany.includes(o) && o.industry && o.industry === v.industry);
  const fill = CUSTOMER_VIDEOS.filter((o) => o.slug !== v.slug && !sameCompany.includes(o) && !sameIndustry.includes(o));
  const related = [...sameCompany, ...sameIndustry, ...fill].slice(0, 4);

  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--rails rs cs-page cs-story">
      <DmsHeader />

      {/* ---------------------------------------------------------- the film
        * The masthead is the film: the still fills the stage until play, then
        * Wistia takes it. Full bleed, so no rails run through it. */}
      <section className="dms-section dms-section--dark rs-cine" aria-label={v.name}>
        <CineMedia v={v} />
        <div className="dms-wrap rs-cine__frame">
          <Crumb trail={[{ label: "Customer stories", href: "/resources/testimonials" }, { label: v.person }]} dark />
          <div className="rs-cine__foot">
            <div className="rs-cine__head">
              <span className="rs-cine__co">{v.company ?? v.person}</span>
              <h1 className="rs-cine__title">{v.name}</h1>
              {sub !== (v.company ?? v.person) ? <p className="rs-cine__sub">{sub}</p> : null}
            </div>
            <div className="rs-cine__cta">
              <BookDemoButton className="dms-btn" source="video-hero">Book a demo</BookDemoButton>
            </div>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ---------------------------------------------------- what is in it
        * The split head the rails grammar gives every section, then the facts
        * as a hairline ledger drawn rail to rail. */}
      <section className="dms-section cs-about hm-railed" aria-labelledby="cs-about-h">
        <div className="dms-wrap">
          <header className="cs-head" data-reveal>
            <div className="cs-head__lead">
              <Eyebrow>In this story</Eyebrow>
              <h2 className="dms-h2" id="cs-about-h">{v.company ?? v.person}</h2>
            </div>
            <p className="dms-lede cs-head__lede">{v.description}</p>
          </header>
        </div>

        <div className="dms-wrap hm-bleed">
          <div className="cs-facts">
            <Fact label="Speaker" value={[v.person, v.role].filter(Boolean).join(", ")} />
            <Fact label="Industry" value={v.industry} />
            <Fact label="Processes in play" value={v.modules.length ? v.modules.join(", ") : undefined} />
            <Fact label="Runtime" value={v.duration} />
          </div>
        </div>
      </section>

      {transcript.length ? (
        <>
          <HatchBand className="hm-hatch--alt" />
          <section className="dms-section dms-section--alt cs-transcript-section hm-railed" aria-label="Transcript">
            <div className="dms-wrap" data-reveal>
              <TranscriptView cues={transcript} duration={v.duration} />
            </div>
          </section>
        </>
      ) : null}

      <HatchBand />

      {/* -------------------------------------------------------- what next */}
      <section className="dms-section cs-lib cs-related hm-railed" aria-labelledby="cs-rel-h">
        <div className="dms-wrap">
          <header className="cs-head" data-reveal>
            <div className="cs-head__lead">
              <Eyebrow>Keep watching</Eyebrow>
              <h2 className="dms-h2" id="cs-rel-h">More from the same world.</h2>
            </div>
            <p className="dms-lede cs-head__lede">
              The nearest stories first: the same company, then the same industry.{" "}
              <Link href="/resources/testimonials">Browse them all</Link>.
            </p>
          </header>
        </div>

        <div className="dms-wrap hm-bleed">
          <ul className="cs-ledger">
            {related.map((o) => (
              <li className="cs-ledger__cell" key={o.slug}>
                <StoryCell v={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HatchBand />

      {/* ------------------------------------------------------------ close */}
      <section
        className="dms-section dms-section--dark dms-close hm-close--rails cs-close hm-railed"
        id="demo"
        aria-labelledby="cs-close-h"
      >
        <div className="dms-wrap">
          <div className="dms-close__grid">
            <div className="dms-close__convergence" aria-hidden="true">
              <div className="dms-close__mark">
                <svg viewBox="0 2.2 21 22" fill="none">
                  <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                  <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
                </svg>
              </div>
            </div>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">Ready when you are</span>
              <h2 className="dms-close__h" id="cs-close-h">Your team has a story like this waiting.</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">
                Bring the process that hurts most. We will run it on Unifize, live, on your own work.
              </p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
                <Link href="/platform" className="dms-btn dms-btn-ghost">See the platform</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline={RESOURCE_FOOTER.tagline} note={RESOURCE_FOOTER.baseRight} />
    </main>
  );
}
