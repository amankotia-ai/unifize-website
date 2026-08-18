"use client";

/* ------------------------------------------------------------
 * CtaxReport - the Coordination Tax Assessment full report.
 *
 * Ported from Ben's prototype (full-report HTML, Aug 2026):
 * a six-field role-aware intake, then the stage 2 report - CFO
 * one-pager, thesis, cross-industry backdrop, your number, honest
 * peer compare, symptoms/root cause, six lenses, domain deep dive,
 * load/floor/tax, assessment signals, sharpeners, the solution
 * levels, the reduction journey, recoverable value, proof, next
 * steps. Opening with #sample skips the intake (the sample report).
 * ------------------------------------------------------------ */

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bars,
  BenchTrack,
  MID,
  Prov,
  ThemeBars,
  money,
  type Provenance,
} from "../cta-shared";

/* ------------------------------------------------------ intake data */

type Q = { label: string; kind: "num" | "sel"; ph?: string; options?: string[]; def?: string };

const num = (label: string, ph: string): Q => ({ label, kind: "num", ph });
const sel = (label: string, options: string[], def?: string): Q => ({ label, kind: "sel", options, def });

const UNIVERSAL_QS: Q[] = [
  { label: "Operating sites", kind: "num", def: "3" },
  sel("Approx. employees", ["Under 100", "100 to 500", "500 to 2,000", "2,000+"], "500 to 2,000"),
  sel("Acquisition in last 24 months", ["No", "Yes"]),
  sel("Separate systems your processes run across", ["1 to 2", "3 to 5", "6 to 10", "More than 10"]),
];

const ROLE_QS: Record<string, Q[]> = {
  "Quality / RAQA": [
    num("CAPAs / deviations per year", "e.g. 140"),
    num("Audits per year", "e.g. 6"),
    sel("Primary QMS today", ["Legacy on-prem", "Paper / hybrid", "Homegrown", "Modern cloud QMS"]),
    sel("Recurring-issue rate", ["Low", "Moderate", "High", "Not sure"]),
  ],
  "Engineering / R&D": [
    num("Change orders (ECOs) per year", "e.g. 320"),
    num("Products in active development", "e.g. 12"),
    sel("PLM in place", ["Yes", "No", "Not sure"]),
    num("Design gates per program", "e.g. 5"),
  ],
  "Procurement / Supply chain": [
    num("Active suppliers", "e.g. 600"),
    num("Avg supplier onboarding (weeks)", "e.g. 11"),
    num("Spec / drawing changes per year", "e.g. 250"),
    sel("Sourcing / ERP systems in use", ["1", "2", "3 or more", "Not sure"]),
  ],
  "Regulatory Affairs": [
    num("Regulatory submissions per year", "e.g. 20"),
    num("Jurisdictions / registrations", "e.g. 8"),
    num("483s or findings, last 3 years", "e.g. 2"),
    num("Labeling changes per year", "e.g. 40"),
  ],
  Operations: [
    num("On-time delivery %", "e.g. 92"),
    num("Production holds per month", "e.g. 14"),
    sel("Shifts", ["1", "2", "3"]),
    sel("Primary QMS today", ["Legacy on-prem", "Paper / hybrid", "Homegrown", "Modern cloud QMS"]),
  ],
  "Finance / C-level": [
    sel("Revenue band", ["Under $50M", "$50M to $250M", "$250M to $1B", "Over $1B"]),
    sel("Share of staff in quality, regulatory, supply chain", ["Under 10%", "10 to 20%", "20 to 35%", "Not sure"]),
    sel("Leadership hours per week in status meetings", ["Under 5", "5 to 10", "More than 10", "Not sure"]),
    sel("Recent restructuring or integration", ["No", "Yes, one", "Yes, several"]),
  ],
  Other: [],
};

const ROLES = Object.keys(ROLE_QS);

/* ------------------------------------------------------ report data */

const CMP: Array<[string, string, string, string, Provenance]> = [
  ["Coordination tax, % of operating cost", "19%", "13%", "~21%", "modelled"],
  ["Coordination tax per employee", "$3,100", "$1,900", "~$3,500", "modelled"],
  ["CAPA closure time", "60 to 90 days", "30 to 40 days", "", "assumed"],
  ["Audit prep per cycle", "2 to 3 weeks", "under 1 week", "", "assumed"],
  ["Share of quality time on coordination", "55 to 65%", "~35%", "", "assumed"],
  ["Recurring nonconformance rate", "20 to 30%", "~10%", "", "assumed"],
];

const SYMPTOMS: Array<[string, string, string]> = [
  ["CAPAs commonly run 60 to 90 days", "The investigation is quick, but its evidence lives in five systems; closing the CAPA means re-assembling proof by hand.", "Slower release decisions and an estimated $0.8M a year of quality-team time spent assembling, not judging."],
  ["Audit prep commonly eats 2 to 3 weeks", "Proof is reconstructed after the fact, because it was never bound to the work as it happened.", "Three weeks of team throughput lost per cycle, plus exposure wherever a reconstructed trail has gaps."],
  ["Nonconformances commonly recur, 20 to 30%", "A corrective action lands in one place but never propagates to the SOP, the training record, and the supplier.", "Repeat findings, rework, and 483 risk; trust erodes with customers and auditors."],
  ["Supplier qualification commonly drags 8 to 12 weeks", "Documents and qualification status are chased across organizations that share no thread.", "Delayed builds, expedite costs, and risk from gaps in supplier evidence."],
];

const INDUSTRIES: Array<[string, number]> = [
  ["Aerospace & defense", 26],
  ["Pharmaceuticals & biotech", 24],
  ["Medical devices", 21],
  ["Specialty chemicals", 19],
  ["Automotive & mobility", 18],
  ["Industrial equipment", 16],
  ["Food & beverage", 14],
  ["Consumer electronics", 13],
  ["Software & tech", 11],
];

const WORKFLOWS: Array<[string, number, string]> = [
  ["CAPA / deviations", 1.18, "90-day cycle"],
  ["Engineering change control", 0.92, "6 wk approval"],
  ["Supplier qualification", 0.71, "11 wk onboard"],
  ["Audit & inspection prep", 0.55, "3 wk scramble"],
  ["New product introduction", 0.46, "per gate"],
  ["Complaint handling", 0.38, "32-day cycle"],
];

const LAYERS: Array<{ label: string; pct: number; color: string; note: string }> = [
  { label: "Layer 1 · labour", pct: 40, color: "var(--ctax-viz-1)", note: "Time spent coordinating" },
  { label: "Layer 2 · cycle time", pct: 43, color: "var(--ctax-viz-2)", note: "Slower throughput, holds, delayed release" },
  { label: "Layer 3 · decision quality", pct: 17, color: "var(--ctax-viz-3)", note: "Escapes, recurrence, rework from missed evidence" },
];

const WASTE: Array<{ label: string; pct: number; color: string }> = [
  { label: "Waiting / approval queues", pct: 28, color: "var(--ctax-viz-1)" },
  { label: "Rework / review loops", pct: 22, color: "var(--ctax-viz-2)" },
  { label: "Overprocessing / duplicate entry", pct: 18, color: "var(--ctax-viz-3)" },
  { label: "Defects / escapes", pct: 12, color: "var(--ctax-err)" },
  { label: "Motion / system switching", pct: 10, color: "var(--ctax-warn)" },
  { label: "Overproduction / audience inflation", pct: 6, color: "var(--ctax-ok)" },
  { label: "Transport / handoffs", pct: 4, color: "var(--ctax-neutral)" },
];

const TEAMS: Array<[string, number]> = [
  ["Quality / RAQA", 38],
  ["Engineering / NPD", 22],
  ["Supply chain", 18],
  ["Operations", 12],
  ["Regulatory", 10],
];

const SITES: Array<[string, number]> = [
  ["Site A (HQ)", 45],
  ["Site B", 32],
  ["Site C (acquired)", 23],
];

const LFT: Array<{ label: string; value: number; color: string }> = [
  { label: "Total load", value: 5_600_000, color: "var(--ctax-d-bg)" },
  { label: "Irreducible floor", value: 1_400_000, color: "var(--ctax-neutral)" },
  { label: "Reducible tax", value: 4_200_000, color: "var(--ctax-viz-1)" },
];

const SIGNALS: Array<[string, Provenance, string]> = [
  ["3 FDA-registered establishments", "public", "Multi-site quality coordination; evidence and decisions must transfer across plants"],
  ["2 Form 483 observations, last 3 years", "public", "Remediation overhead and heightened audit-prep burden"],
  ["14 open quality / regulatory roles", "public", "Team is scaling to absorb coordination load rather than reduce it"],
  ["Acquisition 18 months ago", "public", "Two quality systems running in parallel; harmonization tax"],
  ["Legacy on-prem QMS", "inferred", "Captures records but not execution state, so trackers run alongside"],
  ["~1,200 employees, 3 sites", "public", "Sets the headcount base the model scales coordination from"],
  ["Class II / III devices", "public", "Higher documentation and review intensity per change"],
  ["140 CAPAs, 320 ECOs, 600 suppliers", "confirmed", "Replaces proxied volumes; this is what moved you to stage 2"],
];

const SHARPEN: Array<[string, string]> = [
  ["Time your team spends in status meetings each week", "+9% accuracy"],
  ["Number of separate systems a CAPA touches", "+7%"],
  ["Average review rounds before a change is approved", "+8%"],
  ["Whether corrective actions are tracked to closure across sites", "+6%"],
  ["Hours spent assembling the last audit", "+5%"],
  ["Run a two-week Phase 0 measurement", "+30%"],
];

const MECH: Array<[string, string, string]> = [
  ["Waiting / approval queues", "A 4-day wait for a 4-minute decision, invisible until someone chases", "Context-attached approvals and escalation timers; the decision goes to the approver with everything attached"],
  ["Rework / review loops", "Packages bounce back 2-3 times for missing items", "Completion contracts: evidence is bound before review, and AI flags gaps before a reviewer opens it"],
  ["Duplicate entry", "The same data is keyed into the QMS, the tracker, and email", "One accountable thread is the source; records are generated from it, not re-typed"],
  ["Recurrence", "A corrective action never reaches the SOP, training, and supplier", "Propagation is tracked across every place the action must land, across sites"],
  ["Audit scramble", "Three weeks reconstructing proof from five systems", "Evidence is generated as the work happens, so audit prep becomes a query, not a project"],
];

const TIERS: Array<[string, number, string]> = [
  ["Unifize, no AI", 25, "$1.05M"],
  ["+ near-term AI", 40, "$1.68M"],
  ["+ full AI roadmap", 55, "$2.31M"],
  ["Theoretical maximum", 65, "$2.73M"],
];

const JOURNEY: Array<[string, string]> = [
  ["Find the worst processes.", "You just saw them: Quality, Change Control, and Supplier Quality carry the most. We start where the tax is highest."],
  ["Decompose into value stream steps.", "Unifize maps how the process actually runs, step by step, not how the SOP says it runs."],
  ["See the wasted time.", "Every step is captured in one accountable thread; AI reads it and flags where time is lost to waiting, rework, and duplicate entry."],
  ["Cut it, while staying compliant.", "Structure (completion contracts, propagation, context-attached approvals) and AI (drafting, gap-flagging, chasing) remove the wasted time. Approvals stay human and auditable, so risk falls rather than rises."],
  ["Measure before and after.", "The platform measures the same steps pre and post, so the reduction is observed, not claimed."],
  ["Aggregate to the dashboard.", "Process reductions roll up to one coordination tax view, org-wide and by site and team, showing the cost without Unifize against the cost with it."],
  ["The root cause is gone.", "Your system of record and your system of coordination become one connected surface. That is why the reduction holds instead of drifting back."],
];

type DeepDomain = {
  name: string;
  share: number;
  blurb: string;
  sub: Array<[string, number]>;
  waste: string;
  peer: string;
  fix: string[];
};

const DEEP: DeepDomain[] = [
  {
    name: "Quality",
    share: 19,
    blurb: "Quality owns the outcome of work that happens everywhere else, so it absorbs coordination from every other domain. Most of its tax is in closing CAPAs and proving the work was done.",
    sub: [["CAPA & deviation management", 34], ["Audit & inspection prep", 22], ["Complaint handling", 15], ["Nonconformance disposition", 13], ["Internal audit", 9], ["Management review", 7]],
    waste: "Waiting on approvals and rework loops on CAPA packages, with evidence scattered across five systems.",
    peer: "Your quality team spends an estimated 64% of its time on coordination, against 35% in a top-quartile peer.",
    fix: [
      "Completion contracts on every CAPA: evidence is bound before review, so packages stop bouncing back",
      "Corrective actions propagate automatically to the SOP, the training record, and the supplier",
      "Audit prep becomes a query against threads, not a three-week reconstruction",
    ],
  },
  {
    name: "Change Control",
    share: 15,
    blurb: "Change control is where engineering, quality, and manufacturing must agree in sequence. The tax is the wait between approvals and the rework when a change arrives incomplete.",
    sub: [["Multi-function approval", 30], ["Impact assessment routing", 26], ["Change request intake & triage", 20], ["Implementation verification", 14], ["Effectivity & rollout", 10]],
    waste: "Approval queues and serial review: a six-week approval that holds four minutes of actual decision.",
    peer: "Your change orders take an estimated 6 weeks to approve, against under 2 weeks in a top-quartile peer.",
    fix: [
      "Context-attached approvals with escalation timers move decisions in parallel where the standard allows",
      "AI pre-checks completeness before routing, so changes stop bouncing",
      "Every approval is captured and auditable without a separate record",
    ],
  },
  {
    name: "Supplier Quality",
    share: 13,
    blurb: "Supplier quality runs across your walls and theirs. The tax is chasing documents, qualification status, and corrective actions across organizations that do not share a system.",
    sub: [["Supplier qualification & onboarding", 30], ["Supplier corrective actions (SCAR)", 26], ["Incoming inspection & disposition", 22], ["Requalification & monitoring", 12], ["Supplier change notifications", 10]],
    waste: "Document chasing and status reconstruction across a 600-supplier base with no shared thread.",
    peer: "Supplier onboarding takes an estimated 11 weeks, against 5 in a top-quartile peer.",
    fix: [
      "A shared accountable thread per supplier action, so chasing is replaced by live status",
      "SCARs propagate and are tracked to closure across sites",
      "AI flags missing qualification evidence before it blocks a build",
    ],
  },
  {
    name: "Procurement & Sourcing",
    share: 2,
    blurb: "Procurement coordination tax hides in the back-and-forth between sourcing, quality, and engineering on specs, approvals, and supplier changes. Small as a share, but a frequent source of delay and rework.",
    sub: [["Sourcing & RFQ coordination", 28], ["Spec & drawing alignment", 24], ["Purchase approval routing", 22], ["Supplier change handling", 16], ["Contract & compliance checks", 10]],
    waste: "Spec misalignment and approval routing, with rework when the wrong revision is ordered.",
    peer: "An estimated 1 in 6 purchase actions needs rework from a spec or approval mismatch, against 1 in 20 in a top-quartile peer.",
    fix: [
      "Specs and approvals live on one thread, so the revision in hand is always the right one",
      "Supplier changes route to quality and engineering automatically",
      "Purchase approvals carry their justification, removing the chase",
    ],
  },
  {
    name: "Regulatory Affairs",
    share: 8,
    blurb: "Regulatory work is evidence assembly under deadline. The tax is reconstructing submissions and responses from work that was done but never connected.",
    sub: [["Submission assembly", 30], ["483 / inspection response", 24], ["Registration & licensing upkeep", 18], ["Labeling & change reporting", 16], ["Standards & intelligence tracking", 12]],
    waste: "Reconstruction of evidence under deadline, with commitments tracked in parallel across sites.",
    peer: "Assembling a submission takes an estimated 40% longer than a top-quartile peer with connected evidence.",
    fix: [
      "Evidence is connected to decisions as work happens, so submissions assemble from the record",
      "Commitments and responses are tracked to closure across sites",
      "AI drafts the narrative from the thread, with human approval",
    ],
  },
  {
    name: "New Product Development",
    share: 7,
    blurb: "NPD coordination tax is the handoff cost between R&D, quality, manufacturing, and suppliers across design gates. The tax is waiting and re-aligning at each gate.",
    sub: [["Gate reviews & sign-off", 28], ["Design control & DHF upkeep", 26], ["Design transfer to manufacturing", 22], ["Verification & validation evidence", 14], ["Supplier & component qualification", 10]],
    waste: "Gate waits and re-alignment, with the design history reconstructed for review.",
    peer: "Each design gate carries an estimated 2 to 3 extra weeks of coordination versus a top-quartile peer.",
    fix: [
      "The design history file builds itself from the work, not at gate time",
      "Gate reviews run against a live, complete thread",
      "Cross-functional and supplier sign-offs are coordinated in parallel",
    ],
  },
];

const CONTENTS: Array<[string, string]> = [
  ["#thesis", "The problem"],
  ["#industries", "Across industries"],
  ["#number", "Your number"],
  ["#compare", "How you compare"],
  ["#symptoms", "Symptoms & cause"],
  ["#lenses", "Six lenses"],
  ["#deep", "Domain deep dive"],
  ["#floor", "What is recoverable"],
  ["#signals", "How we assessed you"],
  ["#sharpen", "Sharpen it"],
  ["#solution", "Why it is now solvable"],
  ["#journey", "How you reduce it"],
  ["#roi", "Recoverable value"],
  ["#next", "Next steps"],
];

/* ------------------------------------------------------ component */

function IntakeField({ q }: { q: Q }) {
  const id = `ctax-q-${q.label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return (
    <div className="ctax-fld">
      <label htmlFor={id}>{q.label}</label>
      {q.kind === "num" ? (
        <input id={id} type="number" placeholder={q.ph} defaultValue={q.def} />
      ) : (
        <select id={id} defaultValue={q.def ?? q.options?.[0]}>
          {q.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export function CtaxReport() {
  const [view, setView] = useState<"intake" | "report">("intake");
  const [role, setRole] = useState<string>(ROLES[0]);
  const [domIdx, setDomIdx] = useState(0);
  const [openedFromRole, setOpenedFromRole] = useState(false);

  /* #sample skips the intake: the free sample report */
  useEffect(() => {
    if (window.location.hash === "#sample") setView("report");
  }, []);

  const generate = () => {
    let d = 0;
    if (/procure/i.test(role)) d = 3;
    else if (/regulat/i.test(role)) d = 4;
    else if (/engineer/i.test(role)) d = 5;
    setDomIdx(d);
    setOpenedFromRole(d !== 0);
    setView("report");
    window.scrollTo({ top: 0 });
  };

  const dom = DEEP[domIdx];
  let wasteAcc = 0;
  const wasteStops = WASTE.map((w) => {
    const from = wasteAcc;
    wasteAcc += w.pct;
    return `${w.color} ${from}% ${wasteAcc}%`;
  }).join(",");

  return (
    <div className="ctax">
      {view === "intake" ? (
        /* ============================== INTAKE ============================ */
        <section className="dms-section dms-section--alt ctax-reportsec">
          <div className="dms-wrap">
            <div className="ctax-intake">
              <div className="ctax-card ctax-intake__card">
            <div className="ctax-recog ctax-recog--card">
              <span className="ctax-recog__dot" aria-hidden="true" />
              <span>
                <b>Acme Medical Devices</b> recognized · medical device
                manufacturer · ~1,200 employees · 3 sites
              </span>
              <span className="ctax-recog__src">via Factors.ai</span>
            </div>
            <span className="ctax-eyebrow">Build your report</span>
            <h1 className="ctax-h1 ctax-h1--intake">
              A few details and we will build your coordination tax report
            </h1>
            <p className="ctax-note">
              We already estimated your coordination tax from public data.
              Answer these and we move you from a public-data estimate (stage
              1) to a sharpened estimate (stage 2), and we email you the full
              report. Six fields, about a minute.
            </p>
            <div className="ctax-prog" aria-hidden="true">
              <span style={{ width: "42%" }} />
            </div>
            <div className="ctax-qgrid">
              <div className="ctax-fld ctax-fld--full">
                <label htmlFor="ctax-email">Work email</label>
                <input id="ctax-email" type="email" placeholder="you@acme.com" />
              </div>
              <div className="ctax-fld ctax-fld--full">
                <label htmlFor="ctax-rolesel">
                  Your role (this tailors the questions and the report to what
                  you actually know)
                </label>
                <select
                  id="ctax-rolesel"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="ctax-qgrid">
              {UNIVERSAL_QS.concat(ROLE_QS[role] ?? []).map((q) => (
                <IntakeField key={q.label} q={q} />
              ))}
              <div className="ctax-fld ctax-fld--full">
                <label htmlFor="ctax-pain">Biggest pain right now</label>
                <select id="ctax-pain">
                  {["Audit readiness", "Cycle time", "Recurring issues", "Supplier quality", "New product speed", "Cost and headcount"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="ctax-note">
              Not sure on a number? Leave it blank. We fall back to public data
              and tell you the confidence honestly, then sharpen it later.
            </p>
            <button type="button" className="dms-btn ctax-btn-full" onClick={generate}>
              Generate my report
            </button>
            <p className="ctax-note ctax-center">
              The more you tell us, the tighter the estimate. Everything here
              writes to your account so a specialist can pick up the
              conversation.
            </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ============================== REPORT ============================ */
        <section className="dms-section dms-section--alt ctax-reportsec">
          <div className="dms-wrap">
            <div className="ctax-pagewrap">
          <div className="ctax-page">
            {/* mast */}
            <div className="ctax-mast">
              <div className="ctax-mast__toprow">
                <span className="ctax-logo ctax-logo--dark">
                  <span className="ctax-logo__u" aria-hidden="true">U</span>
                  <span className="ctax-logo__name">unifize</span>
                </span>
                <div className="ctax-mast__stage">
                  <button
                    type="button"
                    className="dms-btn dms-btn-ghost ctax-btn-sm ctax-btn-ghostdark"
                    onClick={() => window.print()}
                  >
                    Download / print
                  </button>
                  <div>
                    Stage 2 estimate
                    <br />
                    Medium confidence (62%)
                  </div>
                </div>
              </div>
              <span className="ctax-eyebrow ctax-eyebrow--dark">
                Coordination Tax Assessment · Full report
              </span>
              <h1 className="ctax-h1 ctax-h1--mast">Acme Medical Devices</h1>
              <p className="ctax-mast__meta">
                Medical device manufacturer · ~1,200 employees · 3 sites · FDA
                &amp; ISO 13485 · Class II/III · prepared 22 June 2026
              </p>
              <nav className="ctax-contents" aria-label="Report contents">
                {CONTENTS.map(([href, label]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* CFO one-pager */}
            <div className="ctax-cfo">
              <div className="ctax-cfo__h">
                <span>The one-page version</span>
                <span>Forward this to your CFO</span>
              </div>
              <div className="ctax-cfo__b">
                <div className="ctax-cfo__big ctax-mono">
                  $3.8M <span>to</span> $4.6M <span>per year</span>
                </div>
                <p className="ctax-note">
                  Estimated annual coordination tax: the structural cost of
                  holding cross-functional work together across quality,
                  engineering, supply chain, and operations.
                </p>
                <div className="ctax-cfo__row">
                  <div className="ctax-kpi">
                    <b className="ctax-mono">~21%</b>
                    <span>of operating cost, vs a 13% top-quartile peer</span>
                  </div>
                  <div className="ctax-kpi">
                    <b className="ctax-mono">$0.9M - $1.3M</b>
                    <span>conservatively recoverable in year one</span>
                  </div>
                  <div className="ctax-kpi">
                    <b className="ctax-mono">62%</b>
                    <span>confidence, sharpened by the 6 inputs you gave us</span>
                  </div>
                </div>
              </div>
            </div>

            {/* thesis */}
            <section id="thesis" className="ctax-pad">
              <span className="ctax-eyebrow">The problem</span>
              <h2 className="ctax-h2">
                Coordination tax, and why it has stayed invisible
              </h2>
              <p className="ctax-lead">
                In a regulated manufacturer, most cross-functional work, an
                investigation, a change, a supplier issue, a release, does not
                happen inside one system. It happens across email, meetings,
                and spreadsheets that wrap around the QMS, the ERP, and the
                PLM. The structural cost of holding that work together, when no
                system owns it end to end, is what we call coordination tax.
              </p>
              <div className="ctax-gap">
                <div className="ctax-gap__box">
                  <h3>System of record</h3>
                  <p>
                    Your QMS, ERP, and PLM capture what is officially true: the
                    approved CAPA, the released document. They store the
                    result.
                  </p>
                </div>
                <div className="ctax-gap__vs">
                  the gap
                  <br />
                  is the tax
                </div>
                <div className="ctax-gap__box ctax-gap__box--tax">
                  <h3>System of coordination</h3>
                  <p>
                    The work that produces those records, chasing evidence,
                    re-reviewing, status meetings, runs in email and Excel.
                    Nobody owns it, so nobody measures it.
                  </p>
                </div>
              </div>
              <p>
                It has stayed invisible for one reason: you cannot reduce what
                you cannot see, and until now nothing could see across that
                fragmented work and measure it. It does not show up as a line
                item. It shows up as headcount that never feels like enough,
                audits that consume weeks, and the same issue coming back. It
                runs 15 to 30 percent of white-collar operational cost in
                regulated manufacturing, and it is the single largest
                controllable cost most quality and operations leaders have
                never had a number for. This report gives you that number, from
                several angles, and shows what is now possible.
              </p>
            </section>

            {/* industries */}
            <section id="industries" className="ctax-pad">
              <span className="ctax-eyebrow">Across industries</span>
              <h2 className="ctax-h2">
                How heavy is coordination tax, and where does your industry sit
              </h2>
              <p>
                Coordination tax is not unique to you, and it is not spread
                evenly. It is heaviest where work is regulated, multi-party,
                and evidence-bound, because every decision has to be
                coordinated and then proven. Here is roughly where each sector
                lands as a share of operating cost, on Unifize's model.
              </p>
              <Bars
                rows={INDUSTRIES.map(([label, v]) => ({
                  label: label === "Medical devices" ? `${label} · you` : label,
                  value: v,
                  display: `${v}%`,
                  strong: label === "Medical devices",
                  color:
                    label === "Medical devices"
                      ? "var(--ctax-d-bg)"
                      : undefined,
                  dim: label !== "Medical devices",
                }))}
              />
              <p className="ctax-note">
                Medical devices sits in the heavier third. Each design change
                and supplier action carries documentation and review intensity
                that lighter industries never touch, so even a top-quartile
                medical device manufacturer carries more coordination tax than
                a typical consumer electronics firm; the bar is simply higher
                for everyone in your category. That is the backdrop for your
                own number below.
              </p>
            </section>

            {/* the number */}
            <section id="number" className="ctax-pad">
              <span className="ctax-eyebrow">Your number</span>
              <h2 className="ctax-h2">
                About 21 percent of your operating cost is coordination tax
              </h2>
              <p>
                Your sharpened estimate is <b>$3.8M to $4.6M per year</b>,
                midpoint about $4.2M. That is a stage 2 estimate at 62 percent
                confidence: built from Unifize's model for medical device
                manufacturing and sharpened by the volumes you shared. A
                discovery call moves it to stage 3; a two-week Phase 0 measures
                it for real at stage 4.
              </p>
              <p className="ctax-note">
                Coordination tax as a share of operating cost, medical device
                manufacturing
              </p>
              <BenchTrack
                band={[34, 76]}
                markers={[
                  { at: 42, label: "median 19%" },
                  { at: 22, label: "top quartile 13%", tone: "ok" },
                  { at: 58, label: "you ~21%", tone: "ink" },
                ]}
              />
              <p className="ctax-note">
                The benchmark is Unifize's coordination tax model for your
                industry, built from structural reasoning and expert judgment
                and refined with measured customer data. It is not a published
                third-party statistic. We say so plainly because the number
                only helps you if you trust where it comes from.
              </p>
            </section>

            {/* compare */}
            <section id="compare" className="ctax-pad">
              <span className="ctax-eyebrow">How you compare</span>
              <h2 className="ctax-h2">You against your industry</h2>
              <p className="ctax-note">
                Peer figures are our model's reference points for medical
                device manufacturers your size, not published data and not a
                named competitor. We have not measured Acme's operational
                metrics, so where your reading is not yet measured we say so
                and make no claim that you are above or below peers. Confirm a
                number and we benchmark it properly.
              </p>
              <table className="ctax-table">
                <thead>
                  <tr>
                    <th>Measure</th>
                    <th className="is-num">Industry median</th>
                    <th className="is-num">Top quartile</th>
                    <th>Your reading</th>
                  </tr>
                </thead>
                <tbody>
                  {CMP.map(([measure, median, top, you, prov]) => (
                    <tr key={measure}>
                      <td>{measure}</td>
                      <td className="is-num ctax-mono ctax-dim">{median}</td>
                      <td className="is-num ctax-mono is-good">{top}</td>
                      <td>
                        {you ? (
                          <>
                            <span className="ctax-mono ctax-you">{you}</span>{" "}
                            <Prov kind={prov} />
                          </>
                        ) : (
                          <>
                            <span className="ctax-dim">not yet measured</span>{" "}
                            <Prov kind={prov} />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="ctax-note">
                Only the two figures we model from your firmographics
                (coordination tax as a share of operating cost, and per
                employee) carry a value for you, labelled modelled. The
                operational metrics stay assumed industry-typical until you
                confirm them in the intake or a discovery call; we do not
                assert a gap on a number we have not measured.
              </p>
            </section>

            {/* symptoms */}
            <section id="symptoms" className="ctax-pad">
              <span className="ctax-eyebrow">Symptoms, root cause, consequences</span>
              <h2 className="ctax-h2">
                What you feel, why it happens, and what it costs
              </h2>
              <p>
                These are the industry-typical manifestations for a medical
                device manufacturer your size. The volumes are the ones you
                gave us (140 CAPAs, 320 change orders, 600 suppliers a year,
                confirmed); the durations and rates below are assumed
                industry-typical until you confirm them, not measurements of
                Acme. The root cause is structural; the consequence is what it
                costs in money, time, and risk.
              </p>
              <table className="ctax-table">
                <thead>
                  <tr>
                    <th>What you feel</th>
                    <th>Why it happens</th>
                    <th>What it costs</th>
                  </tr>
                </thead>
                <tbody>
                  {SYMPTOMS.map(([feel, why, cost]) => (
                    <tr key={feel}>
                      <td>
                        <b>{feel}</b> <Prov kind="assumed" />
                      </td>
                      <td className="ctax-dim">{why}</td>
                      <td className="ctax-dim">{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="ctax-callout">
                <b>One root cause underneath all of them.</b> Your system of
                record (QMS, ERP, PLM) stores what is officially true. The
                work that produces those records runs in a separate system of
                coordination: email, meetings, and spreadsheets. Every symptom
                above is the gap between the two. That is why they cannot be
                fixed one at a time, and why fixing the gap fixes them
                together. The rest of this report is how.
              </div>
            </section>

            {/* six lenses */}
            <section id="lenses" className="ctax-pad">
              <span className="ctax-eyebrow">Six lenses</span>
              <h2 className="ctax-h2">Your coordination tax from six angles</h2>
              <p className="ctax-note">
                A single total hides where the cost actually lives. The same
                $4.2M looks different depending on how you cut it, and each cut
                points at a different fix.
              </p>

              <h3 className="ctax-h3">1 · By theme, then domain</h3>
              <p className="ctax-note">
                The 15 coordination domains we measure are not all the same
                size; some sit inside others. So we group them into comparable
                themes. Compare theme to theme; the domains nest underneath as
                members, not rivals.
              </p>
              <ThemeBars withMoney />

              <h3 className="ctax-h3">2 · By workflow</h3>
              <p className="ctax-note">
                The processes where the coordination actually accumulates, with
                typical cycle time.
              </p>
              <Bars
                rows={WORKFLOWS.map(([label, v, note], i) => ({
                  label: `${label} (${note})`,
                  value: v,
                  display: `$${v.toFixed(1)}M`,
                  strong: i === 0,
                }))}
              />

              <h3 className="ctax-h3">3 · By economic layer</h3>
              <p className="ctax-note">
                Direct labour is the visible part. The larger cost is slower
                cycle time and worse decisions. Most leaders only ever count
                layer 1.
              </p>
              <div className="ctax-stack">
                {LAYERS.map((l) => (
                  <div
                    key={l.label}
                    style={{ width: `${l.pct}%`, background: l.color }}
                  >
                    {l.pct}%
                  </div>
                ))}
              </div>
              <div className="ctax-vizlegend">
                {LAYERS.map((l) => (
                  <span key={l.label}>
                    <i style={{ background: l.color }} aria-hidden="true" />
                    {l.label} · {money((MID * l.pct) / 100)} · {l.note}
                  </span>
                ))}
              </div>

              <h3 className="ctax-h3">4 · By type of waste</h3>
              <p className="ctax-note">
                What kind of coordination friction this is, mapped to the lean
                wastes. This is what tells you which mechanism removes it.
              </p>
              <div className="ctax-donutwrap">
                <div
                  className="ctax-donut"
                  role="img"
                  aria-label="Coordination tax by type of waste"
                  style={{
                    background: `conic-gradient(${wasteStops})`,
                    WebkitMask:
                      "radial-gradient(circle 44px at center, transparent 98%, #000 100%)",
                    mask: "radial-gradient(circle 44px at center, transparent 98%, #000 100%)",
                  }}
                />
                <div className="ctax-dlegend">
                  {WASTE.map((w) => (
                    <div key={w.label}>
                      <i style={{ background: w.color }} aria-hidden="true" />
                      <span>{w.label}</span>
                      <b className="ctax-mono">{w.pct}%</b>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="ctax-h3">5 · By team</h3>
              <p className="ctax-note">
                Where the burden falls. Quality owns the outcome but carries
                only part of the coordination; much of it sits in engineering
                and supply chain.
              </p>
              <Bars
                rows={TEAMS.map(([label, v], i) => ({
                  label,
                  value: v,
                  display: `${v}% · ${money((MID * v) / 100)}`,
                  strong: i === 0,
                }))}
              />

              <h3 className="ctax-h3">6 · By site</h3>
              <p className="ctax-note">
                Multi-site adds a harmonization tax: the same process runs
                differently in each plant, so evidence and decisions do not
                transfer.
              </p>
              <Bars
                rows={SITES.map(([label, v], i) => ({
                  label,
                  value: v,
                  display: `${v}% · ${money((MID * v) / 100)}`,
                  strong: i === 0,
                }))}
              />
            </section>

            {/* domain deep dive */}
            <section id="deep" className="ctax-pad">
              <span className="ctax-eyebrow">Domain deep dive</span>
              <h2 className="ctax-h2">Go deep into one domain</h2>
              <p className="ctax-note">
                {openedFromRole
                  ? `Based on your role we opened ${dom.name}. Switch tabs to explore any domain.`
                  : "We have defaulted to Quality, the most common entry point and the domain that touches every other. Switch to the area you own to go deep there."}
              </p>
              <div className="ctax-domtabs" role="tablist" aria-label="Domains">
                {DEEP.map((d, i) => (
                  <button
                    key={d.name}
                    type="button"
                    role="tab"
                    aria-selected={i === domIdx}
                    className={`ctax-pbtn${i === domIdx ? " is-on" : ""}`}
                    onClick={() => setDomIdx(i)}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
              <div className="ctax-cards">
                <div className="ctax-ca">
                  <div className="ctax-ca__num ctax-mono">
                    {dom.share}% · {money((MID * dom.share) / 100)}
                  </div>
                  <div className="ctax-note">
                    of your coordination tax sits in {dom.name}
                  </div>
                </div>
                <div className="ctax-ca">
                  <div className="ctax-ca__k">How you compare</div>
                  <div className="ctax-note">{dom.peer}</div>
                </div>
              </div>
              <p>{dom.blurb}</p>
              <h3 className="ctax-h3">Where it accumulates inside {dom.name}</h3>
              <Bars
                rows={dom.sub.map(([label, v], i) => ({
                  label,
                  value: v,
                  display: `${v}%`,
                  strong: i === 0,
                }))}
              />
              <h3 className="ctax-h3">The dominant waste</h3>
              <p className="ctax-note">{dom.waste}</p>
              <h3 className="ctax-h3">
                How Unifize reduces {dom.name} coordination tax
              </h3>
              <ul className="ctax-list">
                {dom.fix.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            {/* load / floor / tax */}
            <section id="floor" className="ctax-pad">
              <span className="ctax-eyebrow">What is actually recoverable</span>
              <h2 className="ctax-h2">Load, floor, and tax</h2>
              <p>
                Not all coordination is waste. Some is the irreducible minimum
                for running a regulated process, the floor. The tax is
                everything above the floor: the part that exists only because
                the work is fragmented. Separating the two is how we avoid
                promising you can delete coordination that you legally cannot.
              </p>
              <div className="ctax-lft">
                {LFT.map((s) => (
                  <div key={s.label} className="ctax-lft__seg">
                    <span>{s.label}</span>
                    <span className="ctax-lft__rail">
                      <span
                        className="ctax-lft__bar ctax-mono"
                        style={{
                          width: `${Math.round((s.value / LFT[0].value) * 100)}%`,
                          background: s.color,
                        }}
                      >
                        {money(s.value)}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="ctax-note">
                Total coordination load $5.6M. Irreducible floor $1.4M (about
                25%). Reducible coordination tax $4.2M. The recoverable value
                section below works only against the tax, never the floor.
              </p>
            </section>

            {/* signals */}
            <section id="signals" className="ctax-pad">
              <span className="ctax-eyebrow">How we assessed you</span>
              <h2 className="ctax-h2">The signals behind this estimate</h2>
              <p className="ctax-note">
                Before you told us anything, we built a picture from publicly
                available data. Here is exactly what we used, what each signal
                implies for coordination tax, and how confident it makes us.
                Nothing here is hidden.
              </p>
              <table className="ctax-table">
                <thead>
                  <tr>
                    <th>Signal</th>
                    <th>Source</th>
                    <th>What it implies</th>
                  </tr>
                </thead>
                <tbody>
                  {SIGNALS.map(([signal, source, implies]) => (
                    <tr key={signal}>
                      <td>
                        <b>{signal}</b>
                      </td>
                      <td>
                        <Prov kind={source} />
                      </td>
                      <td className="ctax-dim">{implies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="ctax-note">
                <Prov kind="public" /> scraped from open sources.{" "}
                <Prov kind="inferred" /> derived, not confirmed.{" "}
                <Prov kind="confirmed" /> you told us directly in the intake.
              </p>
            </section>

            {/* sharpen */}
            <section id="sharpen" className="ctax-pad">
              <span className="ctax-eyebrow">Sharpen it</span>
              <h2 className="ctax-h2">What would make this more accurate</h2>
              <p>
                This is a stage 2 estimate. Each of the following would tighten
                the range and raise confidence. The percentage is how much each
                one typically narrows the estimate.
              </p>
              <div className="ctax-sharp">
                {SHARPEN.map(([label, lift]) => (
                  <div key={label} className="ctax-sharp__row">
                    <span>{label}</span>
                    <span className="ctax-sharp__lift ctax-mono">{lift}</span>
                  </div>
                ))}
              </div>
              <div className="ctax-callout">
                The most accurate picture comes from a two-week Phase 0, where
                we measure your actual coordination directly in one workflow
                family. Most of the inputs above are confirmed for real at that
                point, and confidence moves past 90 percent.
              </div>
            </section>

            {/* solution */}
            <section id="solution" className="ctax-pad">
              <span className="ctax-eyebrow">Why it is now solvable</span>
              <h2 className="ctax-h2">The problem is old. The solution is new.</h2>
              <p className="ctax-lead">
                Coordination tax has existed for as long as cross-functional
                work has. What is new is that it can finally be seen, measured,
                and removed, because AI can now read the work as it happens,
                understand it, and accelerate it, while keeping every approval
                human and auditable. That was not possible five years ago.
              </p>
              <div className="ctax-levels">
                {[
                  ["Level 1 · Execution", "Capture work in governed threads", "Each cross-functional event becomes one accountable thread. Decisions, approvals, evidence, and ownership stay connected, so proof is generated as the work happens rather than reconstructed under pressure."],
                  ["Level 2 · Understanding", "AI sees how work really flows", "The model reads the threads and learns how your processes actually run versus how they are documented, where work waits, who it waits on, and what evidence is missing before a reviewer ever opens it."],
                  ["Level 3 · Transformation", "Continuous, measured reduction", "AI drafts summaries, flags missing evidence before review, and chases the next step, so the coordination tax falls and you can watch it fall on a live number."],
                ].map(([n, h, body]) => (
                  <div key={n} className="ctax-lvl">
                    <span className="ctax-lvl__n">{n}</span>
                    <h3>{h}</h3>
                    <p className="ctax-note">{body}</p>
                  </div>
                ))}
              </div>
              <h3 className="ctax-h3">How each kind of waste gets removed</h3>
              <table className="ctax-table">
                <thead>
                  <tr>
                    <th>Where the tax is</th>
                    <th>Why it happens</th>
                    <th>How Unifize removes it</th>
                  </tr>
                </thead>
                <tbody>
                  {MECH.map(([where, why, how]) => (
                    <tr key={where}>
                      <td>
                        <b>{where}</b>
                      </td>
                      <td className="ctax-dim">{why}</td>
                      <td>{how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* journey */}
            <section id="journey" className="ctax-pad">
              <span className="ctax-eyebrow">How you reduce it</span>
              <h2 className="ctax-h2">
                From this assessment to a measured reduction
              </h2>
              <p className="ctax-lead">
                This assessment found and sized the problem. Reducing it is a
                repeatable journey: take your highest-tax processes, decompose
                them into steps, cut the wasted time with structure and AI, and
                measure the before and after, one process at a time, until the
                whole organization's coordination tax is falling on a dashboard
                you can watch.
              </p>
              <div className="ctax-steps">
                {JOURNEY.map(([head, body], i) => (
                  <div
                    key={head}
                    className={`ctax-step${i === JOURNEY.length - 1 ? " is-done" : ""}`}
                  >
                    <span className="ctax-step__n ctax-mono" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <b>{head}</b>{" "}
                      <span className="ctax-dim">{body}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="ctax-h3">What it looks like at the process level</h3>
              <p className="ctax-note">
                One process, the CAPA workflow, without Unifize and with it.
                The same steps, measured.
              </p>
              <div className="ctax-ba">
                <div className="ctax-ba__row">
                  <span>Without Unifize</span>
                  <span className="ctax-ba__rail">
                    <span
                      className="ctax-ba__bar is-before"
                      style={{ width: "100%" }}
                    />
                  </span>
                  <span className="ctax-mono">90 days · $1.18M</span>
                </div>
                <div className="ctax-ba__row">
                  <span>With Unifize</span>
                  <span className="ctax-ba__rail">
                    <span
                      className="ctax-ba__bar is-after"
                      style={{ width: "38%" }}
                    />
                  </span>
                  <span className="ctax-mono">34 days · $0.52M</span>
                </div>
              </div>

              <h3 className="ctax-h3">Then it aggregates</h3>
              <p className="ctax-note">
                Process reductions roll up to your coordination tax dashboard.
                Audit readiness and compliance improve as the tax falls,
                because evidence is now generated as the work happens.
              </p>
              <div className="ctax-cards">
                {[
                  ["$4.2M → $2.9M", "org-wide coordination tax, without vs with Unifize"],
                  ["31%", "reduced in year one, on measured data"],
                  ["90 → 34 days", "CAPA cycle time"],
                  ["3 wks → 2 days", "audit prep, with risk down not up"],
                ].map(([n, d]) => (
                  <div key={d} className="ctax-ca">
                    <div className="ctax-ca__num ctax-mono">{n}</div>
                    <div className="ctax-note">{d}</div>
                  </div>
                ))}
              </div>

              <div className="ctax-callout">
                <b>This is the rest of the value journey.</b> The assessment is
                step zero: it finds and sizes the tax. Everything above is how
                Unifize then removes it, process by process, with the before
                and after measured each time and aggregated so you can watch
                the organization's coordination tax fall while staying
                compliant.
              </div>
            </section>

            {/* roi */}
            <section id="roi" className="ctax-pad">
              <span className="ctax-eyebrow">Recoverable value</span>
              <h2 className="ctax-h2">What you could get back</h2>
              <p className="ctax-note">
                Applied only to the reducible tax ($4.2M), never the floor.
                Figures are the midpoint of your range at each level of the
                roadmap.
              </p>
              <div className="ctax-tiers">
                {TIERS.map(([label, pct, dollars]) => (
                  <div key={label} className="ctax-tier">
                    <span>{label}</span>
                    <span className="ctax-tier__rail">
                      <span
                        className="ctax-tier__bar"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="ctax-mono">
                      {pct}% · {dollars}
                    </span>
                  </div>
                ))}
              </div>
              <div className="ctax-callout">
                <b>How we price.</b> Unifize ties pricing to measured
                reduction. The conservative year-one figure on the CFO summary
                ($0.9M to $1.3M) is what the first level alone, with no AI,
                recovers. The question stops being &ldquo;what does the
                software cost&rdquo; and becomes &ldquo;how confident are you
                in the reduction&rdquo;, which is exactly what the live
                measurement answers.
              </div>
            </section>

            {/* proof */}
            <section className="ctax-pad">
              <span className="ctax-eyebrow">Proof from regulated manufacturers</span>
              <h2 className="ctax-h2">Teams with your problem, after Unifize</h2>
              <p className="ctax-note">
                Real Unifize customers in regulated, multi-requirement
                manufacturing. The pattern they describe, disconnected systems
                that could not tie issues together, is the same root cause this
                report found in your operation.
              </p>

              <figure className="ctax-quote">
                <blockquote>
                  &ldquo;Tasks that have taken weeks or months are now
                  completed in days. We have had conversations that launched
                  and then closed all in the same day. For us, that is just
                  unheard of.&rdquo;
                </blockquote>
                <figcaption className="ctax-note">
                  <b>Tedd Carr</b>, Director of Quality, The Will-Burt Company
                  · 40 years in quality · aerospace, military, and commercial
                  construction
                </figcaption>
                <div className="ctax-cards">
                  <div className="ctax-ca">
                    <div className="ctax-ca__num ctax-mono">75%</div>
                    <div className="ctax-note">
                      faster issue closure within the first month
                    </div>
                  </div>
                  <div className="ctax-ca">
                    <div className="ctax-ca__num ctax-mono">5 → 1</div>
                    <div className="ctax-note">
                      disconnected quality systems consolidated into Unifize
                    </div>
                  </div>
                </div>
                <a
                  className="ctax-quote__link"
                  href="https://www.unifize.com/content/how-a-quality-veteran-from-the-will-burt-company-replaced-multiple-quality-support-systems-with-unifize-and-boosted-issue-closure-time-by-75-within-the-first-month"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the full Will-Burt story →
                </a>
              </figure>

              <div className="ctax-card ctax-refcard">
                <span className="ctax-eyebrow ctax-eyebrow--ok">Your industry</span>
                <h3>Recovery Force, a wearable medical device manufacturer</h3>
                <p className="ctax-note">
                  FDA-regulated, ISO 13485, working through a 483 observation.
                  Recovery Force runs CAPA, complaints, audits, change
                  control, document control, and training on Unifize, the
                  exact domains carrying your coordination tax, in a regulated
                  environment like yours. Their QA manager is a reference
                  customer.
                </p>
              </div>
              <p className="ctax-note">
                Both replaced disconnected systems and spreadsheets with one
                coordinated source of truth. That is the root cause this report
                identified in your operation, and it is what makes the
                reduction hold rather than drift back.
              </p>
            </section>

            {/* next */}
            <section id="next" className="ctax-pad">
              <span className="ctax-eyebrow">Next steps</span>
              <h2 className="ctax-h2">Three ways to take this further</h2>
              <ol className="ctax-nextsteps">
                <li>
                  <b>Sharpen it.</b> A 30-minute discovery call confirms your
                  real volumes and moves this to a stage 3 estimate.
                </li>
                <li>
                  <b>Measure it.</b> A bounded two-week Phase 0 in one workflow
                  family measures your actual coordination tax, with no
                  rip-and-replace.
                </li>
                <li>
                  <b>Share it.</b> Forward the one-page summary at the top to
                  your CFO and your operations lead.
                </li>
              </ol>
              <div className="ctax-next__ctas">
                <button type="button" className="dms-btn">
                  Book the discovery call
                </button>
                <button
                  type="button"
                  className="dms-btn dms-btn-ghost"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Back to top
                </button>
              </div>
            </section>

            <footer className="ctax-page__footer">
              Coordination Tax Engine (internal name for the machine) ·
              Coordination Tax Assessment (customer-facing). Produced by the
              controlled Coordination Tax methodology; the same engine sales
              uses, so this number and the number in a conversation are one and
              the same. Confidence is stated honestly at every stage. The
              probe, analyzing your real workflows directly, is offered in
              discovery with consent; it is not part of this report.
            </footer>
          </div>

              <p className="ctax-backlink">
                <Link href="/coordination-tax-calculator">
                  ← Back to the assessment
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
