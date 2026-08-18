"use client";

/* ------------------------------------------------------------
 * CtaxAssessment - the cold-read Coordination Tax Assessment.
 *
 * Content and logic from Ben's prototype (Aug 2026). Layout is
 * the DMS system at its most minimal: every section is one
 * rail-and-content grid (sticky eyebrow + headline + lede left,
 * the data right), hairline-ruled lists instead of boxes, one
 * accent, provenance as quiet dot-labels. The page shell
 * (DmsHeader / SiteFooter) is owned by page.tsx.
 * ------------------------------------------------------------ */

import { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "../explorations/products/dms/dms-primitives";
import {
  BenchTrack,
  Prov,
  ThemeBars,
  type Provenance,
} from "./cta-shared";

/* from Factors.ai / enrichment (mock); drives which question we lead with */
const EMPLOYEES = 1200;

const PERSONAS = [
  "Acme (company)",
  "Quality lead",
  "Procurement",
  "Operations",
  "Regulatory",
  "Leadership",
];

const PERSONA_LINES = [
  "The whole-company picture, across every function. Drop into the area you own, or open the leadership view for the business consequences.",
  "For the quality function: CAPA closure, audit readiness, recurrence, and the share of the team's week lost to coordinating rather than deciding.",
  "For procurement and supply chain: supplier qualification time, chasing corrective actions across the company boundary, and the continuity risk that follows.",
  "For operations: production holds waiting on cross-functional decisions, capacity lost to coordination, and the slow path from an approved change to the floor.",
  "For regulatory affairs: inspection and 483 exposure, submission timelines, and audit readiness when evidence is reconstructed under deadline.",
  "For the executive team, the consequences: a controllable $3.2M to $5.1M a year that never appears as a line item, slower time to market, compliance and brand risk, and margin lost to scaling coordination by hiring.",
];

type ScoreRow = {
  area: string;
  reading: string;
  prov: Provenance;
  sev: number; // 0-10 coordination intensity
  level: string;
  why: string;
};

/* Each persona sees its OWN areas at its OWN altitude. Leadership sees
   outcomes and consequences; operational roles see operational areas. */
const SCORE_BY_PERSONA: ScoreRow[][] = [
  [
    { area: "Total coordination tax", reading: "$3.2M to $5.1M a year, ~18-24% of operating cost", prov: "modelled", sev: 8, level: "High", why: "The whole-company figure. The breakdown below shows which functions carry it; the leadership tab reframes it as business consequences." },
    { area: "Quality and corrective action", reading: "the heaviest single area, typical", prov: "assumed", sev: 8, level: "High", why: "CAPA closure, audit readiness, and recurrence absorb the most coordination of any function." },
    { area: "Supplier and supply chain", reading: "a major share, typical", prov: "assumed", sev: 7, level: "Elevated", why: "Qualification, supplier corrective actions, and continuity chased across the company boundary." },
    { area: "Change and document control", reading: "a major share, typical", prov: "assumed", sev: 7, level: "Elevated", why: "Multi-function approvals and record-keeping run in sequence across engineering, quality, and manufacturing." },
    { area: "Operations and the floor", reading: "holds and lost capacity, typical", prov: "assumed", sev: 6, level: "Elevated", why: "Production waits on cross-functional decisions; supervisor time goes to chasing and status." },
    { area: "Regulatory and audit exposure", reading: "2 Form 483s on file", prov: "inferred", sev: 8, level: "High", why: "Reconstruction-based audit prep keeps inspection risk concentrated and recurring." },
  ],
  [
    { area: "CAPA and corrective action closure", reading: "60 to 90 days, typical", prov: "assumed", sev: 8, level: "High", why: "Evidence for a CAPA spans the QMS, ERP, email, and drives, so closing one is mostly assembly. Your two public 483s point to an elevated load." },
    { area: "Audit and inspection readiness", reading: "2 to 3 weeks of prep per cycle, typical", prov: "inferred", sev: 8, level: "High", why: "Proof is reconstructed from several systems each cycle; your 483 history usually raises audit frequency." },
    { area: "Share of quality time on coordination", reading: "55 to 65%, typical", prov: "assumed", sev: 8, level: "High", why: "Most of the team's week goes to coordinating rather than deciding; lost capacity usually absorbed by hiring." },
    { area: "Recurring nonconformances", reading: "20 to 30% recurrence, typical", prov: "assumed", sev: 7, level: "Elevated", why: "Corrective actions often do not propagate to the SOP, training, and supplier, so issues return." },
    { area: "Change control review load", reading: "4 to 6 weeks to approve, typical", prov: "assumed", sev: 6, level: "Elevated", why: "Multi-function approvals run in sequence across engineering, quality, and manufacturing." },
  ],
  [
    { area: "Supplier qualification and onboarding", reading: "8 to 12 weeks, typical", prov: "assumed", sev: 7, level: "Elevated", why: "Chasing documents and approvals across organizations with no shared system; a ~600-supplier base (modelled from your size) amplifies it." },
    { area: "Supplier corrective actions (SCAR)", reading: "weeks of chasing per SCAR, typical", prov: "assumed", sev: 7, level: "Elevated", why: "Follow-ups cross the company boundary with no shared thread, so status is reconstructed every time." },
    { area: "Supply continuity risk from quality holds", reading: "holds ripple into builds, typical", prov: "inferred", sev: 6, level: "Elevated", why: "Quality holds turn into expedite cost and missed build dates." },
    { area: "Incoming inspection and disposition", reading: "rework when specs misalign, typical", prov: "assumed", sev: 5, level: "Moderate", why: "Disposition waits on engineering and quality input held in email." },
    { area: "Spec, drawing and PO coordination", reading: "wrong revision rework, typical", prov: "assumed", sev: 5, level: "Moderate", why: "The wrong revision gets ordered when specs and approvals are not on one thread." },
  ],
  [
    { area: "Production holds from quality and CAPA", reading: "holds wait on decisions, typical", prov: "assumed", sev: 7, level: "Elevated", why: "Lines wait on cross-functional decisions sitting in approval queues." },
    { area: "Capacity lost to coordination and meetings", reading: "a large share of supervisor time, typical", prov: "assumed", sev: 7, level: "Elevated", why: "Status meetings and chasing eat into time that should be running the floor." },
    { area: "Change implementation to the floor", reading: "slow to land, typical", prov: "assumed", sev: 6, level: "Elevated", why: "Approved changes are slow to reach the line, so the floor runs on stale instructions." },
    { area: "Cross-site harmonization", reading: "3 sites run differently", prov: "inferred", sev: 6, level: "Elevated", why: "The same process runs differently per plant, so work and evidence do not transfer." },
    { area: "On-time delivery impact", reading: "slippage from upstream coordination, typical", prov: "assumed", sev: 6, level: "Elevated", why: "Coordination delay upstream surfaces as missed dates downstream." },
  ],
  [
    { area: "Inspection and 483 response exposure", reading: "2 on file", prov: "inferred", sev: 8, level: "High", why: "Responses are reconstructed under deadline; exposure stays high until evidence is connected as work happens." },
    { area: "Submission assembly and timelines", reading: "assembly from scattered evidence, typical", prov: "assumed", sev: 7, level: "Elevated", why: "Submissions are built from work that was done but never connected, so timelines slip." },
    { area: "Audit readiness", reading: "2 to 3 weeks of prep per cycle, typical", prov: "inferred", sev: 7, level: "Elevated", why: "Reconstruction-based prep; your 483 history usually raises frequency." },
    { area: "Registration and licensing upkeep", reading: "across multiple jurisdictions, typical", prov: "assumed", sev: 5, level: "Moderate", why: "Commitments are tracked in parallel across sites and registers." },
    { area: "Labeling and change reporting", reading: "reporting lag, typical", prov: "assumed", sev: 5, level: "Moderate", why: "Reportable changes are tracked outside the system of record." },
  ],
  [
    { area: "The cost itself", reading: "$3.2M to $5.1M a year, ~18-24% of operating cost", prov: "modelled", sev: 8, level: "High", why: "A controllable operating cost that never appears as a line item, and the largest one most leadership teams have never had a number for." },
    { area: "Time to market and revenue", reading: "weeks added to every change and release, typical", prov: "assumed", sev: 7, level: "Elevated", why: "Coordination delay pushes product, and the revenue behind it, later than it needs to be." },
    { area: "Compliance and brand risk", reading: "2 Form 483s on file", prov: "inferred", sev: 8, level: "High", why: "Inspection findings, holds, and the customer and brand exposure that follow when proof is reconstructed under pressure." },
    { area: "Scaling without losing margin", reading: "coordination grows faster than output, typical", prov: "assumed", sev: 7, level: "Elevated", why: "You hire to keep pace, so growth costs more than it should. You cannot hire your way out of coordination tax." },
    { area: "Talent and judgment capacity", reading: "most expert time spent coordinating, typical", prov: "assumed", sev: 6, level: "Elevated", why: "Retention risk, and the opportunity cost of expert judgment spent chasing rather than deciding." },
    { area: "Post-acquisition integration", reading: "two quality systems in parallel", prov: "inferred", sev: 6, level: "Elevated", why: "Integration cost and risk from the acquisition 18 months ago, until the systems converge." },
  ],
];

const ROLE_TO_PERSONA: Record<string, number> = {
  "Quality / RAQA": 1,
  "Procurement / Supply chain": 2,
  Operations: 3,
  Regulatory: 4,
  "Leadership / exec": 5,
  Other: 0,
};

const REPORT_CONTENTS: Array<[string, string]> = [
  ["Where you sit across every industry", "Medical devices against aerospace, pharma, automotive, and the rest."],
  ["How you compare to your peers", "Once your numbers are confirmed, against the median and top quartile."],
  ["Your tax from six angles", "By process, economic layer, waste type, team, site, and theme."],
  ["A deep dive into your domain", "Quality, supplier quality, change control, or your area, broken into stages."],
  ["How we assessed you", "Every signal we used, labelled confirmed, inferred, or assumed."],
  ["How Unifize removes it", "The mechanism for each kind of waste, plus a CFO one-pager."],
];

const sevTone = (sev: number) =>
  sev >= 7 ? "is-high" : sev >= 4 ? "is-elevated" : "is-moderate";

export function CtaxAssessment() {
  const [persona, setPersona] = useState(0);
  const [confirmMsg, setConfirmMsg] = useState<{
    text: string;
    tone: "ok" | "muted";
  } | null>(null);
  const [notMineOpen, setNotMineOpen] = useState(false);
  const [lookupUrl, setLookupUrl] = useState("");
  const [lookupMsg, setLookupMsg] = useState("");

  const rows = SCORE_BY_PERSONA[persona];

  return (
    <div className="ctax">
      {/* ============================ HERO ============================= */}
      <section className="dms-section dms-hero ctax-hero" aria-label="Coordination Tax Assessment">
        <div className="dms-wrap">
          <div className="ctax-hero__stack">
            <span className="dms-hero__product">
              <span className="dms-hero__product-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path className="dms-hero__product-sheet" d="M4 4.5h16v15H4v-15Z" />
                  <path className="dms-hero__product-detail" d="M7.5 15.5v-4.2M12 15.5V8.4m4.5 7.1v-2.6" />
                </svg>
              </span>
              <span>Coordination Tax Assessment</span>
            </span>
            <h1 className="dms-hero__title">
              <span className="dms-hero__line">Where coordination tax is likely</span>
              <span className="dms-hero__line dms-hero__turn">hurting Acme the most.</span>
            </h1>
            <p className="dms-lede dms-hero__sub">
              The cost of holding cross-functional work together when no
              system owns it end to end. Read cold from public data, every
              figure labelled by where it came from.
            </p>
            <p className="ctax-recogline">
              <span className="ctax-recog__dot" aria-hidden="true" />
              <span>
                <b>Acme Medical Devices</b> · recognized from your network via
                Factors.ai
              </span>
              <a href="#isyou">not you?</a>
            </p>
          </div>
        </div>
      </section>

      {/* ============================ IS THIS YOU ======================= */}
      <section className="dms-section ctax-sec" id="isyou">
        <div className="dms-wrap ctax-grid">
          <div className="ctax-rail">
            <Eyebrow>Is this you?</Eyebrow>
            <h2 className="dms-h2">Acme Medical Devices.</h2>
            <p className="dms-lede">
              Medical device manufacturer · ~1,200 employees · 3 sites · FDA
              &amp; ISO 13485 · 2 Form 483s on file. Pulled from public
              sources.
            </p>
          </div>
          <div className="ctax-content">
            <div className="ctax-block">
              <div className="ctax-ctarow">
                <button
                  type="button"
                  className="dms-btn"
                  onClick={() =>
                    setConfirmMsg({
                      text: "Confirmed. Thanks, that lifts the confidence of your read.",
                      tone: "ok",
                    })
                  }
                >
                  Yes, this is us
                </button>
                <button
                  type="button"
                  className="dms-btn dms-btn-ghost"
                  onClick={() => setNotMineOpen((v) => !v)}
                >
                  Not your company?
                </button>
              </div>
              {confirmMsg ? (
                <p className={`ctax-note ctax-confirm is-${confirmMsg.tone}`}>
                  {confirmMsg.text}
                </p>
              ) : null}
              {notMineOpen ? (
                <div className="ctax-lookup">
                  <label htmlFor="ctax-co">
                    Enter a website and we re-run the read for that company.
                  </label>
                  <div className="ctax-lookup__row">
                    <input
                      id="ctax-co"
                      type="text"
                      placeholder="yourcompany.com"
                      value={lookupUrl}
                      onChange={(e) => setLookupUrl(e.target.value)}
                    />
                    <button
                      type="button"
                      className="dms-btn"
                      onClick={() =>
                        setLookupMsg(
                          `Re-running the assessment for ${lookupUrl || "that company"} ... (in the live version this pulls fresh public data and rebuilds the page).`,
                        )
                      }
                    >
                      Look it up
                    </button>
                  </div>
                  {lookupMsg ? <p className="ctax-note">{lookupMsg}</p> : null}
                </div>
              ) : null}
            </div>

            <div className="ctax-block">
              <p className="ctax-note">
                <b className="ctax-ink">4 colleagues from Acme</b> have looked
                at this in the last 30 days. Coordination tax is a team
                problem; the more you tell us, the sharper and more personal
                this gets.
              </p>
              <div className="ctax-enrich">
                {EMPLOYEES >= 800 ? (
                  <div className="ctax-fld">
                    <label htmlFor="ctax-div">
                      Which site or division are you focused on?
                    </label>
                    <select
                      id="ctax-div"
                      defaultValue="All of Acme"
                      onChange={(e) =>
                        setConfirmMsg({
                          text:
                            e.target.value === "All of Acme"
                              ? "Showing the company-wide read."
                              : `We will focus the read on ${e.target.value}. In the live version this re-scopes the estimate to that division and its own public signals.`,
                          tone: "muted",
                        })
                      }
                    >
                      <option>All of Acme</option>
                      <option>Site A (HQ)</option>
                      <option>Site B</option>
                      <option>Site C (acquired)</option>
                      <option>A different division</option>
                    </select>
                  </div>
                ) : null}
                <div className="ctax-fld">
                  <label htmlFor="ctax-role">
                    Your role, so we can tailor the impact
                  </label>
                  <select
                    id="ctax-role"
                    defaultValue="Choose your role"
                    onChange={(e) => {
                      const p = ROLE_TO_PERSONA[e.target.value];
                      if (p !== undefined) setPersona(p);
                    }}
                  >
                    <option disabled>Choose your role</option>
                    <option>Quality / RAQA</option>
                    <option>Procurement / Supply chain</option>
                    <option>Operations</option>
                    <option>Regulatory</option>
                    <option>Leadership / exec</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <p className="ctax-note">
                Or jump to{" "}
                <Link href="/coordination-tax-calculator/report">
                  confirming your numbers in the full report
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 01 · SCORECARD ==================== */}
      <section className="dms-section dms-section--alt ctax-sec" id="assessment">
        <div className="dms-wrap ctax-grid">
          <div className="ctax-rail">
            <Eyebrow n={1}>The assessment</Eyebrow>
            <h2 className="dms-h2">Where it tends to hurt.</h2>
            <p className="dms-lede">
              Industry-typical readings for a manufacturer your size,
              sharpened where a public signal supports it. Every figure is{" "}
              <b>assumed until you confirm it</b>.
            </p>
            <dl className="ctax-legend">
              <div>
                <dt><Prov kind="confirmed" /></dt>
                <dd>you told us</dd>
              </div>
              <div>
                <dt><Prov kind="inferred" /></dt>
                <dd>derived from a public signal</dd>
              </div>
              <div>
                <dt><Prov kind="assumed" /></dt>
                <dd>industry-typical default</dd>
              </div>
              <div>
                <dt><Prov kind="modelled" /></dt>
                <dd>computed by our model</dd>
              </div>
            </dl>
          </div>

          <div className="ctax-content">
            <div className="ctax-lens" role="tablist" aria-label="Rate the impact for">
              {PERSONAS.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  role="tab"
                  aria-selected={persona === i}
                  className={`ctax-pbtn${persona === i ? " is-on" : ""}`}
                  onClick={() => setPersona(i)}
                >
                  {p}
                </button>
              ))}
            </div>
            <p className="ctax-personaline">{PERSONA_LINES[persona]}</p>

            <div className="ctax-sc">
              <div className="ctax-sc__hd" aria-hidden="true">
                <div>Where it hurts</div>
                <div>Typical reading</div>
                <div>Intensity</div>
                <div>Why, and what it could cost</div>
              </div>
              {rows.map((r) => (
                <div className="ctax-sc__row" key={r.area}>
                  <div className="ctax-sc__area">{r.area}</div>
                  <div className="ctax-sc__reading">
                    <span>{r.reading}</span>
                    <Prov kind={r.prov} />
                  </div>
                  <div className={`ctax-sc__sev ${sevTone(r.sev)}`}>
                    <span className="ctax-sev">
                      <span style={{ width: `${r.sev * 10}%` }} />
                    </span>
                    <span className="ctax-sevchip ctax-mono">
                      {r.sev}/10 {r.level}
                    </span>
                  </div>
                  <div className="ctax-sc__why">{r.why}</div>
                </div>
              ))}
            </div>

            <div className="ctax-foot">
              <p>
                <b>Read this honestly.</b> We have not measured Acme's
                systems. These are industry-typical assumptions for your size
                and regulatory profile, a starting hypothesis rather than a
                verdict. Tell us your actual numbers and each assumed figure
                is replaced with your own; only then do we benchmark you
                against peers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 02 · CONCENTRATION ================ */}
      <section className="dms-section ctax-sec" id="concentrates">
        <div className="dms-wrap ctax-grid">
          <div className="ctax-rail">
            <Eyebrow n={2}>Where it concentrates</Eyebrow>
            <h2 className="dms-h2">By theme, then domain.</h2>
            <p className="dms-lede">
              The modelled mix for your industry, grouped into comparable
              themes with the domains nested underneath. Your own mix is
              confirmed once you share your volumes.
            </p>
          </div>
          <div className="ctax-content">
            <ThemeBars />
          </div>
        </div>
      </section>

      {/* ============================ 03 · WHERE YOU SIT ================ */}
      <section className="dms-section dms-section--alt ctax-sec" id="benchmark">
        <div className="dms-wrap ctax-grid">
          <div className="ctax-rail">
            <Eyebrow n={3}>Where you sit</Eyebrow>
            <h2 className="dms-h2">18 to 24 percent of operating cost.</h2>
            <p className="dms-lede">
              Our model's range for medical device manufacturers your size{" "}
              <Prov kind="modelled" />. Until we have your numbers, your
              position inside it is an estimate, not a measurement.
            </p>
          </div>
          <div className="ctax-content">
            <BenchTrack
              band={[34, 76]}
              markers={[
                { at: 34, label: "industry 18%" },
                { at: 76, label: "24%" },
                { at: 55, label: "our estimate for you", tone: "ink" },
              ]}
            />
            <div className="ctax-range-row">
              <div>
                <div className="ctax-range ctax-mono">
                  $3.2M <span>to</span> $5.1M <span>/ year</span>
                </div>
                <p className="ctax-note">
                  Wide range because it is built from public data only.
                  Confirming your volumes narrows it.
                </p>
              </div>
              <Link
                href="/coordination-tax-calculator/report"
                className="dms-btn"
              >
                Confirm your numbers
              </Link>
            </div>
            <div className="ctax-foot">
              <p>
                <b>One root cause underneath all of it.</b> Your system of
                record stores what is officially true. The work that produces
                those records runs in email, meetings, and spreadsheets. The
                gap between the two is the tax, and it bites hardest around a
                trigger: an audit, a 483, a recall, a new quality leader, an
                acquisition.
              </p>
              <p>
                This range is Unifize's model for your industry and size, not
                a published statistic and not a measurement of Acme. The
                report replaces assumptions with your actuals and states the
                confidence at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 04 · PROOF ======================== */}
      <section className="dms-section dms-section--dark ctax-sec" id="proof">
        <div className="dms-wrap ctax-grid">
          <div className="ctax-rail">
            <Eyebrow n={4}>Proof</Eyebrow>
            <h2 className="dms-h2">Already being reduced.</h2>
          </div>
          <div className="ctax-content">
            <figure className="ctax-dquote">
              <blockquote>
                &ldquo;Tasks that have taken weeks or months are now completed
                in days.&rdquo;
              </blockquote>
              <figcaption>
                Tedd Carr, Director of Quality, The Will-Burt Company
              </figcaption>
              <p className="ctax-dquote__stats ctax-mono">
                75% faster issue closure in the first month · 5 quality
                systems consolidated into 1
              </p>
            </figure>
            <div className="ctax-dref">
              <p className="ctax-dref__k">In your industry</p>
              <p>
                <b>Recovery Force</b>, an FDA-regulated, ISO 13485 wearable
                device maker, runs CAPA, complaints, audits, and change
                control on Unifize through a 483 observation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 05 · THE FULL REPORT ============== */}
      <section className="dms-section ctax-sec" id="report">
        <div className="dms-wrap ctax-grid">
          <div className="ctax-rail">
            <Eyebrow n={5}>The full report</Eyebrow>
            <h2 className="dms-h2">The full picture, and what to do about it.</h2>
            <p className="dms-lede">
              This page is the cold read from public data. The full report
              confirms your numbers, then shows how you compare and how it
              gets reduced.
            </p>
            <div className="ctax-ctarow">
              <Link
                href="/coordination-tax-calculator/report#sample"
                className="dms-btn"
              >
                Sample report
              </Link>
              <Link
                href="/coordination-tax-calculator/report"
                className="dms-btn dms-btn-ghost"
              >
                My personalized report
              </Link>
            </div>
          </div>
          <ol className="ctax-ledger">
            {REPORT_CONTENTS.map(([t, d], i) => (
              <li key={t}>
                <span className="ctax-ledger__n ctax-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <b>{t}</b>
                  <span>{d}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ CLOSE ============================= */}
      <section className="dms-section dms-section--dark ctax-close" id="demo">
        <div className="dms-wrap">
          <div className="ctax-close__lead">
            <Eyebrow>Take it further</Eyebrow>
            <h2 className="ctax-close__h">
              Turn this read into a measured number.
            </h2>
            <p className="dms-lede">
              A short conversation replaces the assumptions with your actuals;
              a two-week Phase 0 measures it for real.
            </p>
            <div className="ctax-ctarow ctax-ctarow--center">
              <Link
                href="/coordination-tax-calculator/report"
                className="dms-btn"
              >
                Get the full report
              </Link>
              <button type="button" className="dms-btn dms-btn-ghost">
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
