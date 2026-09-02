/* ============================================================================
 * /explorations/resources/testimonials/[slug] - a single REAL customer video
 * in the customer-story grammar: a full-bleed cinematic hero where the film
 * itself plays (Wistia embed takes the stage on play), an About card with the
 * story summary and the video's facts, then more stories. Content comes from
 * customer-videos.ts, generated from the Notion Website Customer Videos DB.
 * ========================================================================== */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceShell } from "../../_shared/resource-shell";
import { Crumb, BandHead, ResourceCTA, ResourceFooter } from "../../_shared/resource-chrome";
import { CineMedia, TranscriptView } from "../../_shared/resources-interactive";
import { VideoCard } from "../../_shared/resource-cards";
import { CUSTOMER_VIDEOS, getVideo } from "../../_shared/customer-videos";
import { getTranscript } from "../../_shared/video-transcripts";
import { BookDemoButton } from "@/components/organisms/book-demo";

export function generateStaticParams() {
  return CUSTOMER_VIDEOS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) return { title: "Customer story — Unifize" };
  return { title: `${v.person} on Unifize: ${v.name}`, description: v.description };
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="rs-cine-fact">
      <span className="rs-cine-fact__lab">{label}</span>
      <span className="rs-cine-fact__val">{value}</span>
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
  const relatedAll = [...sameCompany, ...sameIndustry, ...fill].slice(0, 3);

  return (
    <ResourceShell>
      {/* cinematic hero - the film is the masthead; Wistia takes over on play */}
      <section className="dms-section dms-section--dark rs-cine">
        <CineMedia v={v} />
        <div className="dms-wrap rs-cine__frame">
          <Crumb trail={[{ label: "Customer stories", href: "/explorations/resources/testimonials" }, { label: v.person }]} dark />
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

      {/* body: about card + transcript */}
      <section className="dms-section dms-section--alt rs-block rs-cine-body">
        <div className="dms-wrap">
          <div className="rs-cine-about" data-reveal>
            <div className="rs-cine-about__grid">
              <div className="rs-cine-about__head">
                <span className="rs-cine-fact__lab">In this video</span>
                <h2 className="rs-cine-about__co">{v.company ?? v.person}</h2>
              </div>
              <p className="rs-cine-about__desc">{v.description}</p>
            </div>
            <div className="rs-cine-about__facts">
              <Fact label="Speaker" value={[v.person, v.role].filter(Boolean).join(", ")} />
              <Fact label="Industry" value={v.industry} />
              <Fact label="Processes in play" value={v.modules.length ? v.modules.join(", ") : undefined} />
              <Fact label="Runtime" value={v.duration} />
            </div>
          </div>

          {transcript.length ? (
            <div data-reveal>
              <TranscriptView cues={transcript} duration={v.duration} />
            </div>
          ) : null}
        </div>
      </section>

      {/* related */}
      <section className="dms-section rs-block">
        <div className="dms-wrap">
          <BandHead title="More customer stories" link={{ label: "View all", href: "/explorations/resources/testimonials" }} />
          <div className="rs-grid rs-grid--3" data-reveal>
            {relatedAll.map((o) => <VideoCard key={o.slug} v={o} />)}
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
