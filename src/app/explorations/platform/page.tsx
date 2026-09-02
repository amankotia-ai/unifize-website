/* ============================================================================
 * PLATFORM - revised flow (2026-09-01 panel audit). The coordination tax is
 * still the protagonist, but the page earns the name before it uses it:
 * symptoms first, the tax named after the nod, and the strongest proof (the
 * product itself, then customers on film) pulled up the scroll. Composition:
 *   hero      - the claim + the product, live (symptom language, no jargon)
 *   01 problem - the gap and the tax in one breath, three sourced numbers
 *                on small linework charts (the evidence band)
 *   02 platform - one change control followed end to end (arcade journey)
 *   03 coexistence - the three-zone placement diagram: systems of record,
 *                Unifize, the tools where work happens; five labeled flows
 *   04 stack   - the three customer-facing bands, touchable
 *   05 measured - the fall vs your own baseline (linework, in ink) + a
 *                customer-attested number on film
 *   06 proof   - the customer film rail (real films, real people)
 *   07 compliance - posture statements, then the standards strip
 *   close     - one ask + the product doors
 * Anchors preserved for inbound links: #platform, #stack, #compliance.
 * Design system: shared Product-page redesign tokens + pf-* compositions.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { Eyebrow } from "../products/dms/dms-primitives";
import { DmsMotion } from "../products/dms/dms-motion";
import { ArcadeStepScene } from "../products/_shared/arcade/arcade";
import { PlatformJourney, PlatformStack } from "./platform-interactive";
import { PlatformCoexistence } from "./platform-coexistence";
import { PlatformEvidence } from "./platform-evidence";
import { PlatformProofFilms } from "./platform-proof";
import { PlatformMeasured } from "./platform-measured";
import { filmByWistia } from "../products/_shared/customer-films";
import {
  PLATFORM_HERO_CONFIG,
  PLATFORM_JOURNEY_CONFIGS,
} from "./platform-arcade";
import "../products/dms/dms.css";
import "../products/dms/dms-redesign.css";
import "./platform-kit.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: "The Platform",
  description:
    "Unifize makes the cross-functional work behind every CAPA, change order, and approval visible, measurable, and faster, without replacing the systems you run.",
};

/* 02 - the journey rail: one claim per pose, the scene proves it */
const JOURNEY_STEPS = [
  { title: "The queue", body: "Work arrives with its context attached. Triage from the record, not the inbox." },
  { title: "The thread", body: "One accountable thread: owner, functions, decisions, and evidence in one place." },
  { title: "The evidence", body: "Data lands on the record as the work happens, not after it." },
  { title: "The route", body: "Approvals run in an order everyone can see, on a clock someone owns." },
  { title: "The seal", body: "Sign-off is a Part 11 signature with its meaning attached." },
];

/* 07 - the standards strip: the names carry the credibility */
/* Every standard an industry in the nav dropdown is governed by, grouped the
 * way the dropdown groups the industries. Keep this in step with nav-data. */
const STANDARD_GROUPS = [
  {
    label: "Electronic records and quality systems",
    industries: "Every industry we serve",
    items: [
      { name: "21 CFR Part 11", geo: "FDA · US" },
      { name: "EU Annex 11", geo: "EC · EU" },
      { name: "GAMP 5", geo: "ISPE · Global" },
      { name: "ISO 9001", geo: "ISO · Global" },
      { name: "ISO 14001", geo: "ISO · Global" },
      { name: "ISO 45001", geo: "ISO · Global" },
    ],
  },
  {
    label: "Life sciences",
    industries: "Medical devices · Pharmaceuticals · Contract research · Laboratories",
    items: [
      { name: "ISO 13485", geo: "ISO · Global" },
      { name: "21 CFR Part 820 (QMSR)", geo: "FDA · US" },
      { name: "EU MDR 2017/745", geo: "EC · EU" },
      { name: "EU IVDR 2017/746", geo: "EC · EU" },
      { name: "ISO 14971", geo: "ISO · Global" },
      { name: "21 CFR Parts 210 & 211", geo: "FDA · US" },
      { name: "EU GMP", geo: "EC · EU" },
      { name: "ICH Q7", geo: "ICH · Global" },
      { name: "ICH Q10", geo: "ICH · Global" },
      { name: "ICH E6 (GCP)", geo: "ICH · Global" },
      { name: "21 CFR Part 58 (GLP)", geo: "FDA · US" },
      { name: "ISO/IEC 17025", geo: "ISO · Global" },
      { name: "ISO 15189", geo: "ISO · Global" },
      { name: "CLIA", geo: "CMS · US" },
    ],
  },
  {
    label: "Process and consumer",
    industries: "Chemicals · Cosmetics · Food processing · Nutritional supplements",
    items: [
      { name: "REACH", geo: "ECHA · EU" },
      { name: "GHS", geo: "UN · Global" },
      { name: "OSHA PSM", geo: "OSHA · US" },
      { name: "MoCRA", geo: "FDA · US" },
      { name: "ISO 22716", geo: "ISO · Global" },
      { name: "EU Cosmetics Reg. 1223/2009", geo: "EC · EU" },
      { name: "FSMA", geo: "FDA · US" },
      { name: "HACCP", geo: "Codex · Global" },
      { name: "ISO 22000", geo: "ISO · Global" },
      { name: "FSSC 22000", geo: "GFSI · Global" },
      { name: "BRCGS", geo: "GFSI · Global" },
      { name: "SQF", geo: "GFSI · Global" },
      { name: "21 CFR Part 111", geo: "FDA · US" },
      { name: "NSF/ANSI 173", geo: "NSF · US" },
    ],
  },
  {
    label: "Discrete manufacturing",
    industries: "Automotive · Aerospace · Industrial machinery",
    items: [
      { name: "IATF 16949", geo: "IATF · Global" },
      { name: "VDA 6.3", geo: "VDA · EU" },
      { name: "APQP / PPAP", geo: "AIAG · Global" },
      { name: "AS9100", geo: "IAQG · Global" },
      { name: "AS9110", geo: "IAQG · Global" },
      { name: "AS9120", geo: "IAQG · Global" },
      { name: "NADCAP", geo: "PRI · Global" },
      { name: "CE marking · Machinery Reg. 2023/1230", geo: "EC · EU" },
      { name: "ISO 12100", geo: "ISO · Global" },
    ],
  },
];

export default function PlatformPage() {
  /* customer-attested figures; each card disappears if its film is ever
   * unapproved or unpublished in Notion (governance lives in the adapter) */
  const measuredFilm = filmByWistia("qp7129voyy"); /* Tedd Carr · Will-Burt · NC closure down 75% */

  return (
    <main className="dms dms--redesign pf-page">
      <DmsHeader />
      <DmsMotion />

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
                Approvals, changes, and investigations close in email and meetings your systems never see.
                Unifize makes that work visible, measurable, and faster.
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
       * The gap and the tax in one breath, then three sourced numbers -
       * each carried by a small linework chart of its own evidence. */}
      <section className="dms-section pf-tax-section" id="tax" aria-labelledby="pf-tax-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={1}>The problem</Eyebrow>
            <h2 className="dms-h2" id="pf-tax-title">Your systems hold the outcome. Not the work.</h2>
            <p className="dms-lede">
              The decisions and evidence behind every record live in email and meetings, then vanish at
              closure. That is the coordination tax, and nothing on your stack measures it.
            </p>
          </header>
          <PlatformEvidence />
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
              Every cross-functional event becomes one accountable thread. Watch a change control cross
              quality, engineering, and production without leaving the record.
            </p>
          </header>
          <PlatformJourney steps={JOURNEY_STEPS} configs={PLATFORM_JOURNEY_CONFIGS} />
        </div>
      </section>

      {/* ============================ 03 · COEXISTENCE ================== */}
      <section className="dms-section pf-coex-section" id="coexistence" aria-labelledby="pf-coex-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={3}>Coexistence</Eyebrow>
            <h2 className="dms-h2" id="pf-coex-title">Your systems stay. The gap between them closes.</h2>
            <p className="dms-lede">
              Your systems of record stay authoritative and your team keeps its tools. Unifize is the
              governed layer between them: context flows in, only what you agree flows back.
            </p>
          </header>
          <PlatformCoexistence />
        </div>
      </section>

      {/* ============================ 04 · THE STACK ==================== */}
      <section className="dms-section dms-section--alt pf-stack-section" id="stack" aria-labelledby="pf-stack-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={4}>The stack</Eyebrow>
            <h2 className="dms-h2" id="pf-stack-title">You come for a product. The platform comes with it.</h2>
            <p className="dms-lede">
              Three bands on one governed foundation. Start with any product and the rest of the platform
              arrives on day one.
            </p>
          </header>
          <PlatformStack />
        </div>
      </section>

      {/* ============================ 05 · MEASURED =====================
       * The comparison, drawn: closure time falling away from your own
       * baseline, week by week, in the linework idiom turned to ink -
       * then the first number on the page a customer states on film. */}
      <section className="dms-section dms-section--dark pf-measured-section" id="measured" aria-labelledby="pf-measured-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={5}>Measured</Eyebrow>
            <h2 className="dms-h2" id="pf-measured-title">You watch the tax fall, week by week.</h2>
            <p className="dms-lede">
              Every thread carries its own clock: time open, time waiting, evidence complete. This is what
              your first quarter looks like.
            </p>
          </header>
          <PlatformMeasured />
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
                Less scrap, rework, and premium freight. Every dollar claim is tied to work you can point at,
                or we do not claim it.
              </p>
            </div>
            {measuredFilm ? (
              <a className="pf-proofstep pf-proofstep--film" href={measuredFilm.url} target="_blank" rel="noreferrer">
                <span className="pf-proofstep__lab">On film</span>
                <span className="pf-proofstep__name">&ldquo;Closure time down 75% in the first month.&rdquo;</span>
                <p className="pf-proofstep__note">
                  Non-conformance closure, said on camera by {measuredFilm.person}, {measuredFilm.role},{" "}
                  {measuredFilm.company}.
                </p>
                <span className="pf-proofstep__go">Watch the customer say it
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" /></svg>
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* ============================ 06 · CUSTOMER PROOF =============== */}
      <PlatformProofFilms />

      {/* ============================ 07 · COMPLIANCE =================== */}
      <section className="dms-section dms-section--alt pf-compliance-section" id="compliance" aria-labelledby="pf-compliance-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={7}>Compliance</Eyebrow>
            <h2 className="dms-h2" id="pf-compliance-title">Audit-ready, whichever standard governs you.</h2>
            <p className="dms-lede">
              The record you show an auditor is the record the work created.
            </p>
          </header>

          <div className="pf-stds-ledger" data-reveal>
            {STANDARD_GROUPS.map((group) => (
              <section className="pf-stds-group" key={group.label} aria-label={`${group.label} standards`}>
                <header className="pf-stds-group__head">
                  <h3 className="pf-stds-group__lab">{group.label}</h3>
                  <p className="pf-stds-group__ind">{group.industries}</p>
                </header>
                <ul className="pf-stds">
                  {group.items.map((standard) => (
                    <li className="pf-std" key={standard.name}>
                      <span className="pf-std__name">{standard.name}</span>
                      <span className="pf-std__geo">{standard.geo}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
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
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter note="The Unifize Platform" />
    </main>
  );
}
