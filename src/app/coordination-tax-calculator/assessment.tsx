"use client";

/* ------------------------------------------------------------
 * CtaxAssessment - the cold-read Coordination Tax Assessment.
 *
 * Content and logic from Ben's prototype (Aug 2026). 24 Sep 2026:
 * moved onto the rails grammar the other pages share (charcoal
 * hero and close, split heads, cells rail to rail, hatch bands
 * between sections) and re-paced as a guided read: the hero floor
 * names the four steps, and each step is one section with one
 * point. The mechanics are unchanged: confirm / look up, division
 * and role selects driving the persona lens, the scorecard, the
 * theme mix, the benchmark band and the way into ./report.
 * The page shell (DmsHeader / SiteFooter) is owned by page.tsx.
 * ------------------------------------------------------------ */

import { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "../explorations/products/dms/dms-primitives";
import { HatchBand } from "../explorations/_shared/page-rails";
import { RailsClose } from "../explorations/_shared/rails-close";
import {
  BenchTrack,
  Prov,
  REPORT_CONTENTS,
  THEME_ROWS,
  ThemeStack,
  TOP_TWO,
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


const PROFILE: Array<[string, string]> = [
  ["Industry", "Medical device manufacturer"],
  ["Size", "~1,200 employees"],
  ["Sites", "3"],
  ["Regulation", "FDA & ISO 13485"],
  ["On file", "2 Form 483s"],
];

const LEGEND: Array<[Provenance, string]> = [
  ["confirmed", "you told us"],
  ["inferred", "derived from a public signal"],
  ["assumed", "industry-typical default"],
  ["modelled", "computed by our model"],
];

const sevTone = (sev: number) =>
  sev >= 7 ? "is-high" : sev >= 4 ? "is-elevated" : "is-moderate";


/* the hero visual: the cold read as one stylized record, built only from
   the figures below it (the company view's range, band and heaviest areas) */
const HERO_ROWS = [...SCORE_BY_PERSONA[0].slice(1)]
  .sort((a, b) => b.sev - a.sev)
  .slice(0, 4);

function HeroRead() {
  return (
    <figure className="cx-read" aria-label="Acme Medical Devices, coordination tax cold read">
      <div className="cx-read__head">
        <span className="cx-read__title">Acme Medical Devices</span>
        <span className="cx-read__chip">Cold read</span>
      </div>
      <div className="cx-read__sum">
        <p className="cx-label">
          Estimated coordination tax <Prov kind="modelled" />
        </p>
        <p className="cx-read__fig">
          $3.2M <span>to</span> $5.1M <span>a year</span>
        </p>
        <div className="cx-read__band" aria-hidden="true">
          <span className="cx-read__range" />
          <span className="cx-read__you" />
        </div>
        <p className="cx-read__scale" aria-hidden="true">
          <span>8%</span>
          <span>18 to 24% of operating cost</span>
          <span>32%</span>
        </p>
      </div>
      <ol className="cx-read__rows">
        {HERO_ROWS.map((r) => (
          <li key={r.area} className={sevTone(r.sev)}>
            <span className="cx-read__area">{r.area}</span>
            <Prov kind={r.prov} />
            <span className="cx-read__meter" aria-hidden="true">
              <span style={{ width: `${r.sev * 10}%` }} />
            </span>
            <span className="cx-read__sev">{r.sev}/10</span>
          </li>
        ))}
      </ol>
      <figcaption className="cx-read__foot">
        Built from public data only. Confirm your numbers to narrow it.
      </figcaption>
    </figure>
  );
}

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
      {/* ------------------------------------------------------------ hero
        * charcoal bookend: the claim, lede, recognition and asks stacked
        * left; the read itself as a stylized card on the wash right */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed cx-hero" aria-label="Coordination Tax Assessment">
        <div className="dms-wrap dms-hero__inner">
          <div className="cx-hero__grid">
            <div className="cx-hero__copy">
              <Eyebrow>Coordination Tax Assessment</Eyebrow>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">Where coordination tax is likely</span>
                <span className="dms-hero__line dms-hero__turn">hurting Acme the most.</span>
              </h1>
              <p className="dms-lede dms-hero__sub">
                The cost of holding cross-functional work together when no
                system owns it end to end. Read cold from public data, every
                figure labelled by where it came from.
              </p>
              <div className="dms-hero__ctas">
                <a href="#isyou" className="dms-btn">Start the read</a>
                <Link href="/coordination-tax-calculator/report#sample" className="dms-btn dms-btn-ghost">
                  See a sample report
                </Link>
              </div>
              <p className="cx-recog">
                <span className="cx-recog__dot" aria-hidden="true" />
                <span>
                  <b>Acme Medical Devices</b>, recognized via Factors.ai
                </span>
                <a href="#isyou">Not you?</a>
              </p>
            </div>
            <div className="cx-hero__stage">
              <HeroRead />
            </div>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ---------------------------------------------------- 1 · confirm
        * what we found as a record, and the two questions that tailor it */}
      <section className="dms-section cx-sec hm-railed" id="isyou" aria-labelledby="cx-isyou-h">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>Step 1 · Confirm</Eyebrow>
              <h2 className="dms-h2" id="cx-isyou-h">Is this Acme Medical Devices?</h2>
            </div>
            <p className="dms-lede">
              We pulled this from public sources. Confirm it, or point us at
              the right company, then tell us where you sit.
            </p>
          </header>

          <div className="cx-cells cx-cells--2" data-reveal>
            <div className="cx-cell">
              <p className="cx-label">
                What we found <Prov kind="public" />
              </p>
              <dl className="cx-profile">
                {PROFILE.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="cx-actions">
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
                  aria-expanded={notMineOpen}
                  onClick={() => setNotMineOpen((v) => !v)}
                >
                  Not your company?
                </button>
              </div>
              {confirmMsg?.tone === "ok" ? (
                <p className="cx-msg is-ok" role="status">{confirmMsg.text}</p>
              ) : null}
              {notMineOpen ? (
                <div className="cx-lookup">
                  <label htmlFor="ctax-co">
                    Enter a website and we re-run the read for that company.
                  </label>
                  <div className="cx-lookup__row">
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
                  {lookupMsg ? <p className="cx-msg" role="status">{lookupMsg}</p> : null}
                </div>
              ) : null}
            </div>

            <div className="cx-cell cx-cell--quiet">
              <p className="cx-label">Tailor the read</p>
              <div className="cx-fields">
                {EMPLOYEES >= 800 ? (
                  <div className="cx-fld">
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
                <div className="cx-fld">
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
              {confirmMsg?.tone === "muted" ? (
                <p className="cx-msg" role="status">{confirmMsg.text}</p>
              ) : null}
              <p className="cx-note">
                <b>4 colleagues from Acme</b>{" "}have looked at this in the last
                30 days. Coordination tax is a team problem; the more you tell
                us, the sharper this gets.
              </p>
              <p className="cx-note">
                Already know your numbers?{" "}
                <Link href="/coordination-tax-calculator/report">
                  Confirm them in the full report
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ----------------------------------------------- 2 · where it hurts
        * the persona lens as text tabs, one row per area as a cell */}
      <section className="dms-section dms-section--alt cx-sec hm-railed" id="assessment" aria-labelledby="cx-assess-h">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>Step 2 · Where it hurts</Eyebrow>
              <h2 className="dms-h2" id="cx-assess-h">Where coordination tends to hurt.</h2>
            </div>
            <p className="dms-lede">
              Industry-typical readings for a manufacturer your size,
              sharpened where a public signal supports it. Every figure is
              assumed until you confirm it.
            </p>
          </header>

          <div className="cx-lens" data-reveal>
            <span className="cx-lens__k" id="cx-lens-k">Read it as</span>
            <div className="cx-lens__tabs" role="tablist" aria-labelledby="cx-lens-k">
              {PERSONAS.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  role="tab"
                  aria-selected={persona === i}
                  className={`cx-tab${persona === i ? " is-on" : ""}`}
                  onClick={() => setPersona(i)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <p className="cx-personaline">{PERSONA_LINES[persona]}</p>

          <div className="cx-sc" role="table" aria-label="Where it hurts">
            <div className="cx-sc__hd" role="row">
              <span role="columnheader">Where it hurts</span>
              <span role="columnheader">Intensity</span>
              <span role="columnheader">Why, and what it could cost</span>
            </div>
            {rows.map((r) => (
              <div className="cx-sc__row" role="row" key={r.area}>
                <div className="cx-sc__area" role="cell">
                  <h3>{r.area}</h3>
                  <p>
                    <span>{r.reading}</span>
                    <Prov kind={r.prov} />
                  </p>
                </div>
                <div className={`cx-sc__sev ${sevTone(r.sev)}`} role="cell">
                  <span className="cx-sev__num">
                    {r.sev}<small>/10</small>
                  </span>
                  <span className="cx-sev__lvl">{r.level}</span>
                  <span className="cx-sev" aria-hidden="true">
                    <span style={{ width: `${r.sev * 10}%` }} />
                  </span>
                </div>
                <p className="cx-sc__why" role="cell">{r.why}</p>
              </div>
            ))}
          </div>

          <div className="cx-foot">
            <p>
              <b>Read this honestly.</b>{" "}
              We have not measured Acme&rsquo;s
              systems. These are industry-typical assumptions for your size
              and regulatory profile, a starting hypothesis rather than a
              verdict. Tell us your actual numbers and each assumed figure is
              replaced with your own; only then do we benchmark you against
              peers.
            </p>
            <dl className="cx-legend">
              {LEGEND.map(([k, d]) => (
                <div key={k}>
                  <dt><Prov kind={k} /></dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ------------------------------------------- where it concentrates
        * one takeaway (the top two themes' share), then the six themes as
        * stacked bars with their domains inside */}
      <section className="dms-section cx-sec hm-railed" id="concentrates" aria-labelledby="cx-conc-h">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>Where it concentrates</Eyebrow>
              <h2 className="dms-h2" id="cx-conc-h">Two themes carry half of it.</h2>
            </div>
            <p className="dms-lede">
              The modelled mix for your industry, grouped into comparable
              themes with the domains inside each. Your own mix is confirmed
              once you share your volumes.
            </p>
          </header>

          <div className="cx-cells cx-cells--lead" data-reveal>
            <div className="cx-cell cx-cell--quiet cx-stat">
              <p className="cx-label">
                Modelled mix · medical devices <Prov kind="modelled" />
              </p>
              <p className="cx-stat__fig">{TOP_TWO}%</p>
              <p className="cx-stat__line">
                of the modelled tax sits in two themes:{" "}
                <b>{THEME_ROWS[0].name}</b>, and <b>{THEME_ROWS[1].name}</b>.
              </p>
            </div>
            <div className="cx-cell">
              <ThemeStack />
            </div>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ------------------------------------------------ 3 · what it costs
        * the range is the moment; the band beside it; the cause under both */}
      <section className="dms-section dms-section--alt cx-sec hm-railed" id="benchmark" aria-labelledby="cx-bench-h">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>Step 3 · What it costs</Eyebrow>
              <h2 className="dms-h2" id="cx-bench-h">18 to 24 percent of operating cost.</h2>
            </div>
            <p className="dms-lede">
              Our model&rsquo;s range for medical device manufacturers your
              size. Until we have your numbers, your position inside it is an
              estimate, not a measurement.
            </p>
          </header>

          <div className="cx-cells cx-cells--2" data-reveal>
            <div className="cx-cell cx-range">
              <p className="cx-label">
                Our estimate for Acme <Prov kind="modelled" />
              </p>
              <p className="cx-range__fig">
                $3.2M <span>to</span> $5.1M
              </p>
              <p className="cx-range__unit">a year</p>
              <p className="cx-note">
                Wide range because it is built from public data only.
                Confirming your volumes narrows it.
              </p>
              <Link href="/coordination-tax-calculator/report" className="dms-btn">
                Confirm your numbers
              </Link>
            </div>
            <div className="cx-cell cx-bench">
              <p className="cx-label">Where you sit in the band</p>
              <BenchTrack
                band={[34, 76]}
                markers={[
                  { at: 34, label: "industry 18%" },
                  { at: 76, label: "24%" },
                  { at: 55, label: "our estimate for you", tone: "ink" },
                ]}
              />
              <p className="cx-note">
                Share of operating cost spent holding cross-functional work
                together, medical device manufacturers your size.
              </p>
            </div>
          </div>

          <div className="cx-foot cx-foot--cause">
            <p>
              <b>One root cause underneath all of it.</b>{" "}Your system of
              record stores what is officially true. The work that produces
              those records runs in email, meetings, and spreadsheets. The gap
              between the two is the tax, and it bites hardest around a
              trigger: an audit, a 483, a recall, a new quality leader, an
              acquisition.
            </p>
            <p>
              This range is Unifize&rsquo;s model for your industry and size,
              not a published statistic and not a measurement of Acme. The
              report replaces assumptions with your actuals and states the
              confidence at every step.
            </p>
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ------------------------------------------------------------ proof
        * the one dark island: the quote left, its two facts right */}
      <section className="dms-section dms-section--dark cx-sec cx-proof hm-railed" id="proof" aria-labelledby="cx-proof-h">
        <div className="dms-wrap">
          <header className="cx-proof__head" data-reveal>
            <Eyebrow>Proof</Eyebrow>
            <h2 className="dms-h2" id="cx-proof-h">Already being reduced.</h2>
          </header>
          <div className="cx-cells cx-cells--proof" data-reveal>
            <figure className="cx-cell cx-quote">
              <blockquote>
                &ldquo;Tasks that have taken weeks or months are now completed
                in days.&rdquo;
              </blockquote>
              <figcaption>
                <b>Tedd Carr</b>, Director of Quality, The Will-Burt Company
              </figcaption>
            </figure>
            <div className="cx-cell cx-fact">
              <p className="cx-fact__fig">75%</p>
              <p>faster issue closure in the first month</p>
            </div>
            <div className="cx-cell cx-fact">
              <p className="cx-fact__fig">5 &rarr; 1</p>
              <p>quality systems consolidated into one</p>
            </div>
          </div>
          <p className="cx-proof__ref">
            <span className="cx-label">In your industry</span>
            <span>
              <b>Recovery Force</b>, an FDA-regulated, ISO 13485 wearable
              device maker, runs CAPA, complaints, audits, and change control
              on Unifize through a 483 observation.
            </span>
          </p>
        </div>
      </section>

      <HatchBand />

      {/* ----------------------------------------------- 4 · the full report
        * what is in it as cells; the two ways in sit with the head */}
      <section className="dms-section cx-sec hm-railed" id="report" aria-labelledby="cx-report-h">
        <div className="dms-wrap">
          <header className="pf-split-head" data-reveal>
            <div>
              <Eyebrow>Step 4 · The full report</Eyebrow>
              <h2 className="dms-h2" id="cx-report-h">The full picture, and what to do about it.</h2>
            </div>
            <div className="cx-head-right">
              <p className="dms-lede">
                This page is the cold read from public data. The full report
                confirms your numbers, then shows how you compare and how it
                gets reduced.
              </p>
              <div className="cx-actions">
                <Link href="/coordination-tax-calculator/report" className="dms-btn">
                  My personalized report
                </Link>
                <Link href="/coordination-tax-calculator/report#sample" className="dms-btn dms-btn-ghost">
                  Sample report
                </Link>
              </div>
            </div>
          </header>
          <ol className="cx-cells cx-cells--3 cx-contents" data-reveal>
            {REPORT_CONTENTS.map(([t, d], i) => (
              <li key={t} className="cx-cell">
                <span className="cx-contents__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <HatchBand />

      {/* ------------------------------------------------------------ close
        * the one closing CTA every railed page ends on */}
      <RailsClose
        id="cx-close-h"
        eyebrow="Take it further"
        heading="Turn this read into a measured number."
        lede="A short conversation replaces the assumptions with your actuals; a two-week Phase 0 measures it for real."
        secondary={{ label: "Get the full report", href: "/coordination-tax-calculator/report" }}
        source="ctax-close"
      />
    </div>
  );
}
