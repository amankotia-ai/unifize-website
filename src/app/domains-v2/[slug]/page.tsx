/* ------------------------------------------------------------
 * DomainPage v2 — implements the 2026-05-28 call deltas.
 *
 * Original page at src/app/domains/[slug]/page.tsx is preserved.
 * This route lives at /domains-v2/<slug> for side-by-side review.
 *
 * Sequence (2026-06-01 call with Ben — simplify to the core spine):
 *
 *   §01+02 Familiar→Worth — ONE sticky canvas. The Change Control map
 *                        straightens, converts to slabs of real work, the red
 *                        coordination tax fills the gaps, the stream compresses
 *                        to the Unifize bar — then, in the same scroll, the
 *                        canvas RESOLVES into the before/after ledger: hours
 *                        saved and what it's worth (the old §02 money read).
 *   §03  Drill        — sticky scroll on one step: journey timeline on the
 *                        left, Unifize product evolving on the right, scrubbed
 *   §04  Zoom-out      — whole-QMS compounding, read off the DashboardShell
 *
 * Cut on 2026-06-01: the standalone Coordination-Tax build-up ("it's not
 * connecting"), the drill's Reality/Cost beats, and the artefact clutter.
 * Merged on 2026-06-01 (quality pass): §02 was a separate band restating §01's
 * final state — folded into §01 as the climactic ledger beat so the read and
 * the visual are one. Component files CoordinationTaxBuildup and
 * CompressionMoneyShot are preserved, just not mounted.
 * ------------------------------------------------------------ */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "../../home/site-header";
import { Button, Eyebrow } from "@/components/atoms";
import {
  JourneySteps,
  CompressionStoryV2,
  AIReadStory,
  MoneyShot,
  ProcessStraighten,
} from "@/components/workflow";
import { DashboardShell } from "@/components/organisms";
import { getDomain, listDomainSlugs } from "@/lib/platform-data/domains";
import { WORKFLOWS } from "@/lib/platform-data/workflows";

export function generateStaticParams() {
  return listDomainSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const domain = getDomain(slug);
  if (!domain) return { title: "Domain not found" };
  return {
    title: `${domain.title} · Unifize (v2)`,
    description: domain.promise,
  };
}

export default async function DomainPageV2({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const domain = getDomain(slug);
  if (!domain) notFound();

  const changeControl = WORKFLOWS["change-control"]!;

  return (
    <main>
      <SiteHeader />

      {/* HERO — unchanged from v1 */}
      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <div className="detail-breadcrumb">
            <Link href="/platform">Platform</Link>
            <span className="sep">/</span>
            <span>By domain</span>
          </div>
          <Eyebrow dot>{domain.tier} tier · {domain.owner}</Eyebrow>
          <h1>{domain.title}</h1>
          <p className="sub">{domain.promise}</p>
          <div className="hero-ctas">
            <Button arrow size="lg">
              Book a demo
            </Button>
            <Button variant="dark-ghost" size="lg">
              See the platform
            </Button>
          </div>
        </div>
      </header>

      {/* §01+§02 · Familiar → Worth — ONE sticky canvas (Change Control).
          The map straightens, converts to slabs of real work, the red
          coordination tax fills the gaps, the whole stream compresses to the
          Unifize bar — and then, in the SAME scroll, the canvas resolves into
          the before/after ledger: hours saved and what that's worth. §02 used
          to be a separate band restating this final state; it's now the climax
          of this one section (the standalone CompressionMoneyShot is unmounted,
          file preserved per convention). */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">01 · Familiar</span>
            <h2 className="section-title">
              How the work actually moves through your company.
            </h2>
            <p className="wf-lede">
              One Change Control journey from initiation to close, drawn from the
              Journey Steps source of truth. Scroll: the map straightens into where
              the time actually goes, and what compressing it is worth.
            </p>
          </div>
          <JourneySteps workflow={changeControl} />
        </div>
        <ProcessStraighten workflow={changeControl} />
      </section>

      {/* §03 · DRILL — sticky scroll on one step: the journey timeline runs down
          the left while the Unifize product evolves on the right, scrubbed to
          scroll (Ben 2026-06-01: "this is what's going to be key"). */}
      <CompressionStoryV2 workflow={changeControl} stepId="s3" />

      {/* §04 · THE AI READ — the same governed thread, replayed and tagged by
          AI: each message/timestamp/ownership change scored value-add or wait,
          landing on "this record · 80% value-add / 20% non-value-add" (Ben
          2026-06-02: "the whole AI piece … is so important"). Product on the
          left, AI verdict rail on the right; stays at record level — the
          org-level roll-up is the §05 zoom-out. Feature isn't built: this is a
          product visual that tells the story. */}
      <AIReadStory />

      {/* §05 · ZOOM-OUT CLOSE — the same compression across the whole QMS,
          compounding on AI, read off a live dashboard. */}
      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">05 · Zoom out</span>
              <h2 className="section-title close-title">
                The same read, across every record you run.
              </h2>
              <p className="close-sub">
                What the AI just did on one record, it does on all of them: tagging
                value-add against wait across the whole QMS. Leadership sees where the
                time goes, which processes carry the most wait, and how much of it is
                recoverable.
              </p>
              <div className="close-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Button variant="dark-ghost" size="lg">
                  See the platform
                </Button>
              </div>
            </div>
            <div className="close-visual">
              {/* Crop the dashboard into a fixed-height viewport: it's sized
                  wider than the column so the right edge bleeds off and is cut
                  off, anchored top-left so the header stays visible, and the
                  frame is vertically centered against the copy. Inline so it
                  hot-reloads (overrides the base scale in globals .dshell). */}
              <div style={{ position: "relative", height: 600, width: 880, overflow: "hidden" }}>
                <DashboardShell
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 1500,
                    margin: 0,
                    transform: "scale(0.6)",
                    transformOrigin: "top left",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §06 · MONEY SHOT — the dashboard's recovered time costed out to one
          figure. Ben 2026-06-02: "a final screen which is a money shot …
          how much is this worth to your organization? … this is how we sell it." */}
      <MoneyShot />

      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer surface dark">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <strong>Unifize</strong>
          <span>People. Process. AI. Outcomes.</span>
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="lab">Explore</span>
            <Link href="/platform#industries">By industry</Link>
            <Link href="/platform#domains">By domain</Link>
            <Link href="/platform#buyer">By buyer</Link>
          </div>
          <div>
            <span className="lab">Problem</span>
            <Link href="/#thesis">Coordination tax</Link>
            <Link href="/#seam">The seam</Link>
            <Link href="/#how">The governed layer</Link>
          </div>
        </div>
      </div>
      <div className="site-footer-rule" />
      <div className="site-footer-base">
        <span>© Unifize 2026 · domains v2</span>
      </div>
    </footer>
  );
}
