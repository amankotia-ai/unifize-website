/* ============================================================================
 * PLATFORM - reworked minimal. The coordination tax is still the protagonist,
 * but the page now SHOWS instead of arguing: one claim per chapter, one
 * proof per claim, and the proof is the product (the shared stylized-arcade
 * system the product pages journey on). Composition, Apple-style:
 *   hero      - the claim + the product, live
 *   01 problem - the gap and the tax in one breath, three sourced numbers
 *   02 platform - one change control followed end to end (arcade journey)
 *   03 stack   - the canonical four-band stack, touchable (PLT-2 bands)
 *   04 measured - the reports page as the product renders it
 *   05 compliance - the standards strip
 *   close     - one ask
 * Anchors preserved for inbound links: #platform, #stack, #compliance.
 * Design system: shared Product-page redesign tokens + pf-* compositions.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { Eyebrow } from "../products/dms/dms-primitives";
import { BigStat } from "../products/dms/dms-linework";
import { ArcadeStepScene } from "../products/_shared/arcade/arcade";
import { PlatformJourney, PlatformStack } from "./platform-interactive";
import {
  PLATFORM_HERO_CONFIG,
  PLATFORM_JOURNEY_CONFIGS,
  PLATFORM_DASHBOARD_CONFIG,
} from "./platform-arcade";
import "../products/dms/dms.css";
import "../products/dms/dms-redesign.css";
import "./platform-kit.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: "The Platform",
  description:
    "Unifize connects the decisions, evidence, and completion your teams scatter across email, meetings, and spreadsheets, and measures the time it gives you back, on every CAPA, change order, and approval.",
};

/* 02 - the journey rail: one claim per pose, the scene proves it */
const JOURNEY_STEPS = [
  { title: "The queue", body: "Work arrives with its context attached. Triage from the record, not the inbox." },
  { title: "The thread", body: "One accountable thread: owner, functions, decisions, and evidence in one place." },
  { title: "The evidence", body: "Data lands on the record as the work happens, not after it." },
  { title: "The route", body: "Approvals run in an order everyone can see, on a clock someone owns." },
  { title: "The seal", body: "Sign-off is a Part 11 signature with its meaning attached." },
];

/* 05 - the standards strip: the names carry the credibility */
const STANDARDS = [
  { name: "21 CFR Part 11", geo: "FDA · US" },
  { name: "EU Annex 11", geo: "EC · EU" },
  { name: "ISO 9001", geo: "ISO · Global" },
  { name: "ISO 13485", geo: "ISO · Global" },
  { name: "21 CFR Part 820", geo: "FDA · US" },
  { name: "EU GMP", geo: "EC · EU" },
  { name: "IATF 16949", geo: "IATF · Global" },
  { name: "AS9100", geo: "IAQG · Global" },
  { name: "ISO/IEC 17025", geo: "ISO · Global" },
  { name: "FSMA", geo: "FDA · US" },
];

export default function PlatformPage() {
  return (
    <main className="dms dms--redesign pf-page">
      <DmsHeader />

      {/* ============================ HERO ============================= */}
      <section className="dms-section dms-hero" aria-label="The Unifize platform">
        <div className="dms-wrap dms-hero__inner">
          <div className="dms-hero__grid">
            <div className="dms-hero__left">
              <Link className="dms-hero__product" href="/explorations/home">
                <span className="dms-hero__product-mark pf-hero__mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect className="dms-hero__product-sheet" x="3.25" y="3.25" width="7.5" height="7.5" />
                    <rect className="dms-hero__product-sheet" x="13.25" y="3.25" width="7.5" height="7.5" />
                    <rect className="dms-hero__product-sheet" x="8.25" y="13.25" width="7.5" height="7.5" />
                  </svg>
                </span>
                <span>The Unifize platform</span>
              </Link>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">Your work crosses teams.</span>
                <span className="dms-hero__line dms-hero__turn">Your systems don&rsquo;t.</span>
              </h1>
            </div>
            <div className="dms-hero__right">
              <p className="dms-lede dms-hero__sub">
                The hidden cost of holding cross-functional work together is the coordination tax. Unifize is the
                platform that makes it visible, measurable, and smaller every week, without replacing the systems
                you already run.
              </p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
                <a href="#platform" className="dms-btn dms-btn-ghost">Watch one change close</a>
              </div>
            </div>
          </div>

          {/* the hero object: one accountable thread, mid-flight */}
          <div className="dms-hero__frame dms-hero__product-demo">
            <div className="pf-hero-scene">
              <ArcadeStepScene config={PLATFORM_HERO_CONFIG} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 01 · THE PROBLEM ==================
       * The gap and the tax in one breath, then three sourced numbers. */}
      <section className="dms-section pf-tax-section" id="tax" aria-labelledby="pf-tax-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={1}>The problem</Eyebrow>
            <h2 className="dms-h2" id="pf-tax-title">Your systems hold the outcome. Not the work.</h2>
            <p className="dms-lede">
              The decisions, handoffs, and evidence that produce every record live in email, meetings, and
              spreadsheets, and vanish when the record closes. That cost has a name, the coordination tax, and
              nothing on your stack measures it.
            </p>
          </header>
          <div className="pf-stats">
            <BigStat value="30%" label="of R&D spend leaks into duplication and rework" />
            <BigStat value="3,200" label="US product recalls a year, at up to $10M per event" />
            <BigStat value="$1.5T" label="lost annually to stalled production and operational bottlenecks" />
          </div>
          <p className="pf-stats__src">
            European Commission · Harvard Business Review · Sedgwick · Institute for Supply Management
          </p>
        </div>
      </section>

      {/* ============================ 02 · THE PLATFORM =================
       * The argument, shown: one change control followed end to end on
       * the persistent camera. */}
      <section className="dms-section dms-section--dark pf-journey-section" id="platform" aria-labelledby="pf-journey-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={2}>The platform</Eyebrow>
            <h2 className="dms-h2" id="pf-journey-title">One change, followed end to end.</h2>
            <p className="dms-lede">
              Unifize turns every cross-functional event into an accountable thread. Watch one change control
              cross quality, engineering, and production without ever leaving the record.
            </p>
          </header>
          <PlatformJourney steps={JOURNEY_STEPS} configs={PLATFORM_JOURNEY_CONFIGS} />
        </div>
      </section>

      {/* ============================ 03 · THE STACK ==================== */}
      <section className="dms-section pf-stack-section" id="stack" aria-labelledby="pf-stack-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={3}>The stack</Eyebrow>
            <h2 className="dms-h2" id="pf-stack-title">You come for a product. The platform comes with it.</h2>
            <p className="dms-lede">
              Four bands, one foundation. Whichever product you start with, the rest of the stack arrives on day
              one, not as a future add-on.
            </p>
          </header>
          <PlatformStack />
        </div>
      </section>

      {/* ============================ 04 · MEASURED =====================
       * The reports page, as the product renders it. */}
      <section className="dms-section dms-section--dark pf-measured-section" id="measured" aria-labelledby="pf-measured-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={4}>Measured</Eyebrow>
            <h2 className="dms-h2" id="pf-measured-title">You watch the tax fall, week by week.</h2>
            <p className="dms-lede">
              Every thread carries its own clock: how long it has been open, how long it spent waiting, how
              complete its evidence is. This is the view your Monday morning starts with.
            </p>
          </header>
          <div className="pf-measured-scene">
            <ArcadeStepScene config={PLATFORM_DASHBOARD_CONFIG} />
          </div>
          <div className="pf-proofsteps">
            <div className="pf-proofstep">
              <span className="pf-proofstep__lab">First</span>
              <span className="pf-proofstep__name">You get your hours back.</span>
              <p className="pf-proofstep__note">
                Less waiting, fewer chases, faster closure, measured on your own work against your own baseline.
              </p>
            </div>
            <div className="pf-proofstep">
              <span className="pf-proofstep__lab">Then</span>
              <span className="pf-proofstep__name">The savings show up in money.</span>
              <p className="pf-proofstep__note">
                Less scrap, less rework, less premium freight. Every dollar claim is tied to work you can point
                at; if it cannot be traced, we do not claim it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 05 · COMPLIANCE =================== */}
      <section className="dms-section dms-section--alt pf-compliance-section" id="compliance" aria-labelledby="pf-compliance-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={5}>Compliance</Eyebrow>
            <h2 className="dms-h2" id="pf-compliance-title">Audit-ready, whichever standard governs you.</h2>
            <p className="dms-lede">
              Every thread carries e-signatures with meaning, a complete audit trail, and its own evidence. The
              record you show an auditor is the record the work created, under any of these.
            </p>
          </header>
          <ul className="pf-stds" aria-label="Standards the platform is run under">
            {STANDARDS.map((standard) => (
              <li className="pf-std" key={standard.name}>
                <span className="pf-std__name">{standard.name}</span>
                <span className="pf-std__geo">{standard.geo}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark dms-close" aria-labelledby="pf-close-h">
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
              <h2 className="dms-close__h" id="pf-close-h">Bring the process that hurts. Watch the tax fall.</h2>
              <p className="dms-lede">
                We will run it end to end on one thread, live, and show you where your time is going.
              </p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
                <a href="#platform" className="dms-btn dms-btn-ghost">Watch one change close</a>
              </div>
              <div className="pf-close-links">
                <Link href="/explorations/industry-template-modern">See it in your industry &rarr;</Link>
                <Link href="/explorations/domains">Explore solutions &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter note="The Unifize Platform" />
    </main>
  );
}
