/* ============================================================================
 * INDUSTRY PAGE: Medical Devices (the reference industry instance).
 *
 * 23 Sep 2026, the rails wave: the page moved onto the design standard the
 * homepage, platform and DMS pages now share (_shared/page-rails.css):
 * two hairline rails down the content column, hatched divider bands between
 * sections, blue-square eyebrows, split heads, cell grids drawn rail to
 * rail, and every product artifact on a soft wash with the frosted plate.
 * The page opens and closes on one charcoal (hero + trust, proof, close +
 * footer); the middle goes light, including the three ways in, which used
 * to run on an ink block.
 *
 * The shell is the DMS page's (`dms dms--redesign dms--rails dms-page` on
 * <main>, DmsHeader, the shared hero arcade with its glyph step rail, the
 * reel proof, the convergence close), so the hero, trust strip, bands and
 * close come from dms-rails.css unchanged. `itm` stays on <main> so the
 * page's own interactive pieces (decision trail, persona explorer,
 * coverage ledger, cost ledger) keep their tokens; md-rails.css loads last
 * and restates them in the rails grammar. Section order, copy and data are
 * the page's own and are unchanged; both ingress sets stay.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import { TRIGGERS, VALIDATED } from "./industry-data";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { HatchBand } from "../_shared/page-rails";
import { Eyebrow } from "../products/dms/dms-primitives";
import { CostLedger } from "./cost-ledger";
import { MdProofReel } from "./md-proof";
import { RoleCells, SolutionCells } from "./ways-in";
import { UrgentBoard } from "../_shared/urgent-board";
import "../domains/_shared/solution-rails.css";
import "../domains/_shared/solution-viz.css";
import { DecisionTraceArcade } from "./itm-arcade";
import { MdHeroTrace } from "./md-hero-trace";
import "./itm.css";
import "../products/dms/dms.css";
import "../products/dms/dms-redesign.css";
import "../_shared/page-rails.css";
import "../products/dms/dms-rails.css";
import "./md-rails.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: "Medical Devices · Unifize",
  description:
    "Your QMS records that a document was approved. It cannot reconstruct why. Unifize rebuilds the decision trace across every function it touched, for Class II and III device OEMs and CDMOs.",
};


/* Restrained OUTLINE icons for the validation answer cells, keyed by
 * VALIDATED.points[].icon. Heroicons outline paths, inline. */
const VAL_ICONS: Record<string, React.ReactNode> = {
  stack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
  ),
};

/* the split head every railed section opens with: eyebrow + claim left,
 * lede right on the same baseline */
function SplitHead({
  n,
  eyebrow,
  title,
  lede,
  id,
}: {
  n: number;
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <header className="md-head">
      <div className="md-head__lead">
        <Eyebrow n={n}>{eyebrow}</Eyebrow>
        <h2 className="dms-h2" id={id}>{title}</h2>
      </div>
      {lede ? <p className="dms-lede">{lede}</p> : null}
    </header>
  );
}

/* the urgent board: the moments that carry a drawn surface, in order */
const LEAD_TRIGGERS = TRIGGERS.filter((t) => t.viz).slice(0, 3);

export default function MedicalDevicesIndustryPage() {
  return (
    <main className="itm dms dms--redesign dms--consistent-eyebrows dms--rails dms-page md-page">
      <DmsHeader />

      {/* ============================ HERO =============================
        * Charcoal ground, the centred head the DMS page carries, the
        * regulatory frame as quiet pills, then the arcade window on the
        * moving wash walking CC-2148 (raise, assess, review, sign, seal)
        * with the glyph step rail above it. */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed md-hero--split" aria-label="Medical devices">
        {/* 23 Sep 2026, the quality Solutions page's hero: two panes between
          * the rails. The copy on the charcoal left (eyebrow, claim, one
          * line, two actions; the regulatory pills went with "too many
          * things on the hero"), the record-only window on the wash right,
          * looping through CC-2148 with the step rail hidden. */}
        <div className="dms-wrap hm-bleed md-hero2">
          <div className="md-hero2__copy">
            <Eyebrow>Industries · Medical devices</Eyebrow>
            <h1 className="dms-hero__title">
              <span className="dms-hero__line">Your QMS remembers that it was approved.</span>
              <span className="dms-hero__line dms-hero__turn">Not why.</span>
            </h1>
            <p className="dms-lede dms-hero__sub">
              Built for Class II &amp; III device OEMs and CDMOs, where every change, every CAPA, and
              every complaint has to stay traceable across functions.
            </p>
            <div className="dms-hero__ctas">
              <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
              <Link href="/platform" className="dms-btn dms-btn-ghost">See the platform</Link>
            </div>
          </div>
          {/* 23 Sep 2026, after luthor.ai: one animated record (CC-2148
            * binding every record it touches, then signed and released) with
            * four use-case chips around it, on the same moving wash */}
          <div className="md-hero2__visual">
            <MdHeroTrace />
          </div>
        </div>
      </section>

      {/* ============================ TRUST STRIP =======================
        * Same charcoal, inside the rails: the device teams on the record. */}
      <section className="dms-section dms-section--dark dms-trust hm-trust--rails hm-railed" aria-label="Customers">
        <div className="dms-wrap dms-trust__inner">
          <p className="dms-trust__label">Trusted by FDA-regulated device teams</p>
          <ul className="dms-trust__logos md-trust__names" aria-label="Medical device customers">
            {MD_PROOF.customers.map((c) => (
              <li key={c.name} className="dms-trust__mark">{c.name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* the first hatched divider: the dark-to-light break */}
      <HatchBand />

      {/* ============================ 01 · THE DIFFERENCE ===============
        * The decision trail drives the arcade camera over one persistent
        * CC-2148 record; the stage sits on the sky wash with the plate. */}
      <section className="dms-section md-sec md-diff hm-railed" id="thesis">
        <div className="dms-wrap">
          <SplitHead
            n={1}
            eyebrow="The difference"
            title="The decision lives in the thread, not the status field."
            lede="Incumbents track document status. Unifize reconstructs the decision trace across every function a change touched."
          />
          <DecisionTraceArcade />
        </div>
      </section>

      <HatchBand />

      {/* ============ THE THREE WAYS IN ====================================
        * 23 Sep 2026, rebuilt on the quality Solutions page's grammar (no
        * sticky sub-nav). The page is ingress: find your seat (02), your
        * work (03) or your moment (04), recognise it in one precise artifact
        * from the device world, leave by one door. ways-in.tsx +
        * _shared/urgent-board.tsx. */}

      {/* 02 · BY YOUR ROLE: five seats, each with the record it answers for */}
      <section className="dms-section md-sec md-roles hm-railed" id="by-role">
        <div className="dms-wrap">
          <SplitHead
            n={2}
            eyebrow="By your role"
            title="When the investigator is in the room, someone reconstructs it."
            lede="The reconstruction always lands on someone. Find your seat, and the record you answer for."
          />
          <RoleCells />
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* 03 · COVERAGE: the device work, by the Solution it runs in */}
      <section className="dms-section dms-section--alt md-sec md-cov hm-railed" id="modules">
        <div className="dms-wrap">
          <SplitHead
            n={3}
            eyebrow="Coverage"
            title="Change, CAPA, suppliers, complaints. One decision trace."
            lede="Each runs as a Unifize solution with the device regulations built in. Start with the one that costs you most."
          />
          <SolutionCells />
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ============================ 04 · VALIDATED STATE ==============
        * Moved above what's breaking (Abhishek, 23 Sep) */}
      <section className="dms-section md-sec md-val hm-railed" id="validated">
        <div className="dms-wrap">
          <SplitHead n={4} eyebrow={VALIDATED.eyebrow} title={VALIDATED.headline} />
          <ul className="md-val__grid">
            {VALIDATED.points.map((pt) => (
              <li key={pt.label} className="md-val__cell">
                <span className="md-val__icon" aria-hidden="true">{VAL_ICONS[pt.icon]}</span>
                <h3>{pt.label}</h3>
                <p>{pt.body}</p>
              </li>
            ))}
          </ul>
          <div className="md-val__cta">
            <BookDemoButton className="md-textlink" source="validated">{VALIDATED.cta} &rarr;</BookDemoButton>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* 05 · WHAT'S BREAKING: the quality page's urgent board, on the
        * charcoal, the three sharpest clocks with one surface each */}
      <section className="dms-section dms-section--dark md-sec md-trigs md-trigs--dark hm-railed" id="whats-breaking">
        <div className="dms-wrap">
          <SplitHead
            n={5}
            eyebrow="What's breaking"
            title="The moments that start a clock you don't control."
            lede="Statutory deadlines, not customer outcomes. Each one routes to the process that answers it and the team that owns the response."
          />
          <UrgentBoard rows={LEAD_TRIGGERS} />
        </div>
      </section>

      <HatchBand className="hm-hatch--dark" />

      {/* ============================ 06 · COST OF INACTION ============= */}
      <section className="dms-section dms-section--dark md-sec md-cost md-cost--dark hm-railed" id="cost">
        <div className="dms-wrap">
          <SplitHead
            n={6}
            eyebrow="Cost of inaction"
            title="The cost is real. It just never lands on a line you can see."
          />
          <CostLedger />
        </div>
      </section>

      <HatchBand className="hm-hatch--dark" />

      {/* ============================ 07 · PROOF ========================
        * The homepage reel of customer stills on the bookends' charcoal,
        * with the medical-device roster (md-proof.tsx). */}
      <MdProofReel />

      <HatchBand className="hm-hatch--dark" />

      {/* ============================ CLOSE =============================
        * On the hero's charcoal so the page opens and closes on the same
        * ground; the rails run through it and on through the footer. */}
      <section className="dms-section dms-section--dark dms-close hm-close--rails hm-railed" id="demo" aria-labelledby="md-close-h">
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
              <Eyebrow>Ready when you are</Eyebrow>
              <h2 className="dms-close__h" id="md-close-h">Incumbents track documents. Unifize reconstructs the decision.</h2>
              <p className="dms-lede">Pick a decision you could not replay at the last audit. We will reconstruct it live.</p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline="The decision trace for regulated operations." note="Industries · Medical Devices" />
    </main>
  );
}
