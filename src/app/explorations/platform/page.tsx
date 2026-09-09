/* ============================================================================
 * PLATFORM - revised flow (2026-09-01 panel audit, then the 2026-09-02 sync
 * with Raj). The coordination tax is still the protagonist, but the page
 * earns the name before it uses it, and the product now opens the page:
 * "you come to the platform, you see how it functions, and you scroll down
 * and see all the other value" (Raj). Composition:
 *   hero      - the claim + the platform journey, live: six screens in the
 *                demo order (home built for the persona, inbox thread,
 *                checklist, Part 11 seal, process builder, dashboard) on the
 *                persistent arcade camera, with a step rail under the stage
 *   01 problem - the gap and the tax in one breath, three sourced numbers
 *                on small linework charts (the evidence band)
 *   02 coexistence - the three-zone placement diagram: systems of record,
 *                Unifize, the tools where work happens; five labeled flows
 *   03 stack   - the three customer-facing bands, touchable
 *   04 ai      - Unifize AI on the same persistent camera (Raj, 7 Sep 2026):
 *                what it reads today (this record), what vectorisation lets
 *                it read next (every record and document, by meaning), and
 *                the finding auto-linked on the checklist; a person approves.
 *                Roadmap steps are tagged so nothing reads as shipped early.
 *   05 measured - the fall vs your own baseline (linework, in ink) + a
 *                customer-attested number on film
 *   06 proof   - the customer film rail (real films, real people)
 *   07 compliance - posture statements, then the standards strip
 *   close     - one ask + the product doors
 * Anchors preserved for inbound links: #platform (now the hero), #stack,
 * #ai, #compliance. Design system: shared Product-page redesign tokens + pf-*
 * compositions.
 * ========================================================================== */
import type { Metadata } from "next";
import Link from "next/link";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { Eyebrow } from "../products/dms/dms-primitives";
import { DmsMotion } from "../products/dms/dms-motion";
import { PlatformJourney, PlatformStack } from "./platform-interactive";
import { PlatformCoexistence } from "./platform-coexistence";
import { PlatformEvidence } from "./platform-evidence";
import { PlatformProofFilms } from "./platform-proof";
import { PlatformMeasured } from "./platform-measured";
import { filmByWistia } from "../products/_shared/customer-films";
import { PLATFORM_JOURNEY_CONFIGS, PLATFORM_AI_CONFIGS } from "./platform-arcade";
import "../products/dms/dms.css";
import "../products/dms/dms-redesign.css";
import "./platform-kit.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export const metadata: Metadata = {
  title: "The Platform",
  description:
    "Unifize makes the cross-functional work behind every CAPA, change order, and approval visible, measurable, and faster, without replacing the systems you run.",
};

/* hero - the journey rail: six screens in the demo order, one claim per
 * pose, the scene proves it. Screens per Raj (2 Sep 2026): home built for
 * the persona, the inbox where the work is done, the checklist up close, the
 * seal, the process builder, and dashboards to close. Seal moved ahead of
 * the builder on the 7 Sep 2026 sync. */
const JOURNEY_STEPS = [
  { title: "The home screen", body: "Built for the role. A quality manager and a document approver land on different work." },
  { title: "The inbox", body: "The work is done in the thread: one owner, every function, decisions and evidence in one place." },
  { title: "The checklist", body: "Up close, the record is a checklist. Data lands on it as the work happens, not after." },
  { title: "The seal", body: "Sign-off is a Part 11 signature with its meaning attached." },
  { title: "The process builder", body: "The process is configured, not coded: fields, approval order, and reminders, changed by your team." },
  { title: "The dashboard", body: "Every number reads straight off the records: median closure, time waiting, evidence complete." },
];

/* 04 - Unifize AI: three moments on one change. The first is live product;
 * the second and third are the vectorisation roadmap Raj described on the
 * 7 Sep 2026 sync ("our AI can read across all records and find the ones
 * impacted by a change"); the section lede carries the "next on the
 * roadmap" framing so the rail stays clean. */
const AI_STEPS = [
  {
    title: "Reads the record",
    body: "Drafts the impact assessment from the checklist, the thread, and the linked drawing. You edit or accept it, on the record.",
  },
  {
    title: "Reads across records",
    body: "One click, and it reads every document and record you hold by meaning: the work instructions that cite this value, the change that moved it last time.",
  },
  {
    title: "Links the work",
    body: "Names what the change touches in plain words and links those records to it. Revision control is one click away, and a person takes it.",
  },
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

      {/* ============================ HERO =============================
       * #platform lives here now: the journey is the hero object, so every
       * "watch one change close" link lands on it. */}
      <section className="dms-section dms-hero" id="platform" aria-label="The Unifize platform">
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
                <a href="#coexistence" className="dms-btn dms-btn-ghost">See where it sits in your stack</a>
              </div>
            </div>
          </div>

          {/* the hero object: the platform, end to end. ONE app window on
            * the persistent camera; the rail under it names the six screens
            * and lets the reader take the wheel. */}
          <div className="dms-hero__frame dms-hero__product-demo">
            <PlatformJourney
              steps={JOURNEY_STEPS}
              configs={PLATFORM_JOURNEY_CONFIGS}
              label="The platform, screen by screen"
            />
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

      {/* ============================ 02 · COEXISTENCE ================== */}
      <section className="dms-section pf-coex-section" id="coexistence" aria-labelledby="pf-coex-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={2}>Coexistence</Eyebrow>
            <h2 className="dms-h2" id="pf-coex-title">Your systems stay. The gap between them closes.</h2>
            <p className="dms-lede">
              Your systems of record stay authoritative and your team keeps its tools. Unifize is the
              governed layer between them: context flows in, only what you agree flows back.
            </p>
          </header>
          <PlatformCoexistence />
        </div>
      </section>

      {/* ============================ 03 · THE STACK ==================== */}
      <section className="dms-section dms-section--alt pf-stack-section" id="stack" aria-labelledby="pf-stack-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={3}>The stack</Eyebrow>
            <h2 className="dms-h2" id="pf-stack-title">You come for a product. The platform comes with it.</h2>
            <p className="dms-lede">
              Three bands on one governed foundation. Start with any product and the rest of the platform
              arrives on day one.
            </p>
          </header>
          <PlatformStack />
        </div>
      </section>

      {/* ============================ 04 · UNIFIZE AI ===================
       * The same app window the hero journeys on. Three moments on the
       * change: the assistant drafts from this record (live), reads across
       * every record by meaning (roadmap), links what it found (roadmap). */}
      <section className="dms-section dms-section--dark pf-ai-section" id="ai" aria-labelledby="pf-ai-title">
        <div className="dms-wrap">
          <header className="pf-centered-head">
            <Eyebrow n={4}>Unifize AI</Eyebrow>
            <h2 className="dms-h2" id="pf-ai-title">AI that reads the record. Next, every record.</h2>
            <p className="dms-lede">
              Today Unifize AI works inside the record in front of you: it drafts, extracts, and suggests
              from the checklist and the thread. Next on the roadmap, it reads across every document and
              record you hold by meaning, finds what a change touches, and links the work. Your people approve.
            </p>
          </header>
          {/* the journey: one app window, three numbered moments on one line */}
          <div className="pf-journey-host pf-ai-journey" data-reveal>
            <PlatformJourney
              steps={AI_STEPS}
              configs={PLATFORM_AI_CONFIGS}
              label="Unifize AI, moment by moment"
            />
          </div>
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
