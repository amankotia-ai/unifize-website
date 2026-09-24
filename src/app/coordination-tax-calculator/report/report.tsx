"use client";

/* ------------------------------------------------------------
 * CtaxReport - the Coordination Tax Assessment full report.
 *
 * Ported from Ben's prototype (full-report HTML, Aug 2026): a
 * role-aware intake, then the stage 2 report. 24 Sep 2026: moved
 * onto the rails grammar with the assessment page (cta-rails.css):
 * charcoal two-pane hero (the intake form, or the CFO one-pager, on
 * the wash), then one section per point with a split head, cells
 * rail to rail and hatch bands between, the six lenses behind text
 * tabs, proof as the dark island, the shared RailsClose. Mechanics
 * unchanged: the intake's role picks the deep-dive domain, #sample
 * skips the intake, the domain tabs switch, the report prints.
 * ------------------------------------------------------------ */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "../../explorations/products/dms/dms-primitives";
import { HatchBand } from "../../explorations/_shared/page-rails";
import { RailsClose } from "../../explorations/_shared/rails-close";
import {
  Bars,
  BenchTrack,
  MID,
  Prov,
  REPORT_CONTENTS,
  ThemeStack,
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

const LAYERS: Array<{ label: string; pct: number; note: string }> = [
  { label: "Layer 1 · labour", pct: 40, note: "Time spent coordinating" },
  { label: "Layer 2 · cycle time", pct: 43, note: "Slower throughput, holds, delayed release" },
  { label: "Layer 3 · decision quality", pct: 17, note: "Escapes, recurrence, rework from missed evidence" },
];

const WASTE: Array<{ label: string; pct: number; color: string }> = [
  { label: "Waiting / approval queues", pct: 28, color: "var(--dms-tax)" },
  { label: "Rework / review loops", pct: 22, color: "color-mix(in oklab, var(--dms-tax) 78%, white)" },
  { label: "Overprocessing / duplicate entry", pct: 18, color: "color-mix(in oklab, var(--dms-tax) 58%, white)" },
  { label: "Defects / escapes", pct: 12, color: "color-mix(in oklab, var(--dms-tax) 40%, white)" },
  { label: "Motion / system switching", pct: 10, color: "color-mix(in oklab, var(--dms-tax) 25%, white)" },
  { label: "Overproduction / audience inflation", pct: 6, color: "#9aa1ac" },
  { label: "Transport / handoffs", pct: 4, color: "#c9ced6" },
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

const LFT: Array<{ label: string; value: number }> = [
  { label: "Total load", value: 5_600_000 },
  { label: "Irreducible floor", value: 1_400_000 },
  { label: "Reducible tax", value: 4_200_000 },
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

/* the hero's contents line: the report's chapters */
const CONTENTS: Array<[string, string]> = [
  ["#thesis", "The problem"],
  ["#number", "Your number"],
  ["#lenses", "Where it lives"],
  ["#deep", "Your domain"],
  ["#solution", "How it is removed"],
  ["#roi", "What you get back"],
];

const LENSES = [
  { key: "theme", label: "Theme", title: "By theme, then domain", note: "The 15 coordination domains we measure are not all the same size; some sit inside others. So we group them into comparable themes. Compare theme to theme; the domains nest underneath as members, not rivals." },
  { key: "workflow", label: "Workflow", title: "By workflow", note: "The processes where the coordination actually accumulates, with typical cycle time." },
  { key: "layer", label: "Economic layer", title: "By economic layer", note: "Direct labour is the visible part. The larger cost is slower cycle time and worse decisions. Most leaders only ever count layer 1." },
  { key: "waste", label: "Type of waste", title: "By type of waste", note: "What kind of coordination friction this is, mapped to the lean wastes. This is what tells you which mechanism removes it." },
  { key: "team", label: "Team", title: "By team", note: "Where the burden falls. Quality owns the outcome but carries only part of the coordination; much of it sits in engineering and supply chain." },
  { key: "site", label: "Site", title: "By site", note: "Multi-site adds a harmonization tax: the same process runs differently in each plant, so evidence and decisions do not transfer." },
] as const;

const LEVELS: Array<[string, string, string]> = [
  ["Level 1 · Execution", "Capture work in governed threads", "Each cross-functional event becomes one accountable thread. Decisions, approvals, evidence, and ownership stay connected, so proof is generated as the work happens rather than reconstructed under pressure."],
  ["Level 2 · Understanding", "AI sees how work really flows", "The model reads the threads and learns how your processes actually run versus how they are documented, where work waits, who it waits on, and what evidence is missing before a reviewer ever opens it."],
  ["Level 3 · Transformation", "Continuous, measured reduction", "AI drafts summaries, flags missing evidence before review, and chases the next step, so the coordination tax falls and you can watch it fall on a live number."],
];

const AGGREGATE: Array<[string, string]> = [
  ["$4.2M \u2192 $2.9M", "org-wide coordination tax, without vs with Unifize"],
  ["31%", "reduced in year one, on measured data"],
  ["90 \u2192 34 days", "CAPA cycle time"],
  ["3 wks \u2192 2 days", "audit prep, with risk down not up"],
];

/* ------------------------------------------------------ component */

function IntakeField({ q }: { q: Q }) {
  const id = `ctax-q-${q.label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return (
    <div className="cx-fld">
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

/* a section's split head: eyebrow + claim left, lede right */
function Head({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="pf-split-head" data-reveal>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="dms-h2" id={id}>{title}</h2>
      </div>
      {children ? <div className="cx-head-right">{children}</div> : null}
    </header>
  );
}

export function CtaxReport() {
  const [view, setView] = useState<"intake" | "report">("intake");
  const [role, setRole] = useState<string>(ROLES[0]);
  const [domIdx, setDomIdx] = useState(0);
  const [openedFromRole, setOpenedFromRole] = useState(false);
  const [lens, setLens] = useState(0);

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

  if (view === "intake") {
    return (
      <div className="ctax cx-report">
        {/* ------------------------------------------------ intake hero
          * the ask left, the six-field form itself on the wash right */}
        <section className="dms-section dms-hero dms-hero--rails hm-railed cx-hero" aria-label="Build your report">
          <div className="dms-wrap dms-hero__inner">
            <div className="cx-hero__grid">
              <div className="cx-hero__copy">
                <Eyebrow>Coordination Tax Assessment · Full report</Eyebrow>
                <h1 className="dms-hero__title">
                  <span className="dms-hero__line">A few details, and we</span>
                  <span className="dms-hero__line dms-hero__turn">build your report.</span>
                </h1>
                <p className="dms-lede dms-hero__sub">
                  We already estimated your coordination tax from public data.
                  Answer these and we move you from a public-data estimate
                  (stage 1) to a sharpened estimate (stage 2), and email you
                  the full report. About a minute.
                </p>
                <p className="cx-recog">
                  <span className="cx-recog__dot" aria-hidden="true" />
                  <span>
                    <b>Acme Medical Devices</b>, medical device manufacturer,
                    ~1,200 employees, 3 sites
                  </span>
                </p>
                <div className="dms-hero__ctas">
                  <a href="#sample" className="dms-btn dms-btn-ghost" onClick={() => setView("report")}>
                    Skip to the sample report
                  </a>
                </div>
              </div>
              <div className="cx-hero__stage">
                <form
                  className="cx-read cx-intake"
                  onSubmit={(e) => {
                    e.preventDefault();
                    generate();
                  }}
                >
                  <div className="cx-read__head">
                    <span className="cx-read__title">Build your report</span>
                    <span className="cx-read__chip">Stage 1 to 2</span>
                  </div>
                  <div className="cx-intake__prog" aria-hidden="true">
                    <span style={{ width: "42%" }} />
                  </div>
                  <div className="cx-intake__body">
                    <div className="cx-intake__grid">
                      <div className="cx-fld cx-fld--full">
                        <label htmlFor="ctax-email">Work email</label>
                        <input id="ctax-email" type="email" placeholder="you@acme.com" />
                      </div>
                      <div className="cx-fld cx-fld--full">
                        <label htmlFor="ctax-rolesel">
                          Your role, so the questions match what you know
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
                      {UNIVERSAL_QS.concat(ROLE_QS[role] ?? []).map((q) => (
                        <IntakeField key={q.label} q={q} />
                      ))}
                      <div className="cx-fld cx-fld--full">
                        <label htmlFor="ctax-pain">Biggest pain right now</label>
                        <select id="ctax-pain">
                          {["Audit readiness", "Cycle time", "Recurring issues", "Supplier quality", "New product speed", "Cost and headcount"].map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="cx-note">
                      Not sure on a number? Leave it blank. We fall back to
                      public data and tell you the confidence honestly.
                    </p>
                    <button type="submit" className="dms-btn cx-intake__go">
                      Generate my report
                    </button>
                  </div>
                  <p className="cx-read__foot">
                    Everything here writes to your account so a specialist can
                    pick up the conversation.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <HatchBand />

        {/* ------------------------------------------ what the report holds */}
        <section className="dms-section cx-sec hm-railed" aria-labelledby="cx-holds-h">
          <div className="dms-wrap">
            <Head id="cx-holds-h" eyebrow="What you get" title="The full picture, and what to do about it.">
              <p className="dms-lede">
                The cold read sized it from public data. The report confirms
                your numbers, then shows how you compare and how it gets
                reduced.
              </p>
            </Head>
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

        <RailsClose
          id="cx-close-h"
          eyebrow="Rather talk it through?"
          heading="Bring your numbers to a 30-minute call."
          lede="A discovery call confirms your real volumes and moves the estimate to stage 3."
          primaryLabel="Book the discovery call"
          secondary={{ label: "Back to the assessment", href: "/coordination-tax-calculator" }}
          source="ctax-report-intake"
        />
      </div>
    );
  }

  const lensNow = LENSES[lens];

  return (
    <div className="ctax cx-report">
      {/* ---------------------------------------------------------- hero
        * the finding left, the CFO one-pager on the wash right */}
      <section className="dms-section dms-hero dms-hero--rails hm-railed cx-hero" aria-label="Coordination Tax Assessment, full report">
        <div className="dms-wrap dms-hero__inner">
          <div className="cx-hero__grid">
            <div className="cx-hero__copy">
              <Eyebrow>Full report · Acme Medical Devices</Eyebrow>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">Coordination tax: about</span>
                <span className="dms-hero__line dms-hero__turn">21% of operating cost.</span>
              </h1>
              <p className="dms-lede dms-hero__sub">
                Medical device manufacturer · ~1,200 employees · 3 sites · FDA
                &amp; ISO 13485 · Class II/III · prepared 22 June 2026.
              </p>
              <p className="cx-stage">
                <span>Stage 2 estimate</span>
                <span>Medium confidence (62%)</span>
              </p>
              <div className="dms-hero__ctas">
                <button type="button" className="dms-btn" onClick={() => window.print()}>
                  Download / print
                </button>
                <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
                  Back to the assessment
                </Link>
              </div>
              <nav className="cx-toc" aria-label="Report contents">
                {CONTENTS.map(([href, label]) => (
                  <a key={href} href={href}>{label}</a>
                ))}
              </nav>
            </div>
            <div className="cx-hero__stage">
              <figure className="cx-read cx-cfo">
                <div className="cx-read__head">
                  <span className="cx-read__title">The one-page version</span>
                  <span className="cx-read__chip">For your CFO</span>
                </div>
                <div className="cx-read__sum">
                  <p className="cx-label">
                    Estimated annual coordination tax <Prov kind="modelled" />
                  </p>
                  <p className="cx-read__fig">
                    $3.8M <span>to</span> $4.6M <span>per year</span>
                  </p>
                  <p className="cx-cfo__line">
                    The structural cost of holding cross-functional work
                    together across quality, engineering, supply chain, and
                    operations.
                  </p>
                </div>
                <dl className="cx-cfo__kpis">
                  <div>
                    <dt>~21%</dt>
                    <dd>of operating cost, vs a 13% top-quartile peer</dd>
                  </div>
                  <div>
                    <dt>$0.9M to $1.3M</dt>
                    <dd>conservatively recoverable in year one</dd>
                  </div>
                  <div>
                    <dt>62%</dt>
                    <dd>confidence, sharpened by the inputs you gave us</dd>
                  </div>
                </dl>
                <figcaption className="cx-read__foot">
                  Forward this page to your CFO and your operations lead.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ---------------------------------------------------- the problem
        * the gap as three cells: record, the tax between, coordination */}
      <section className="dms-section cx-sec hm-railed" id="thesis" aria-labelledby="cr-thesis-h">
        <div className="dms-wrap">
          <Head id="cr-thesis-h" eyebrow="The problem" title="Coordination tax, and why it has stayed invisible.">
            <p className="dms-lede">
              Most cross-functional work, an investigation, a change, a
              supplier issue, a release, does not happen inside one system. It
              happens across email, meetings, and spreadsheets that wrap
              around the QMS, the ERP, and the PLM.
            </p>
          </Head>
          <div className="cx-cells cx-gap" data-reveal>
            <div className="cx-cell">
              <p className="cx-label">System of record</p>
              <p className="cx-gap__body">
                Your QMS, ERP, and PLM capture what is officially true: the
                approved CAPA, the released document. They store the result.
              </p>
            </div>
            <div className="cx-cell cx-gap__tax">
              <p className="cx-gap__k">The gap is the tax</p>
            </div>
            <div className="cx-cell">
              <p className="cx-label">System of coordination</p>
              <p className="cx-gap__body">
                The work that produces those records, chasing evidence,
                re-reviewing, status meetings, runs in email and Excel. Nobody
                owns it, so nobody measures it.
              </p>
            </div>
          </div>
          <div className="cx-foot cx-foot--cause">
            <p>
              <b>Why it stays invisible.</b>{" "}You cannot reduce what you cannot
              see, and until now nothing could see across that fragmented work
              and measure it. It does not show up as a line item. It shows up
              as headcount that never feels like enough, audits that consume
              weeks, and the same issue coming back.
            </p>
            <p>
              It runs 15 to 30 percent of white-collar operational cost in
              regulated manufacturing, and it is the single largest
              controllable cost most quality and operations leaders have never
              had a number for. This report gives you that number, from several
              angles, and shows what is now possible.
            </p>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ---------------------------------------------- across industries */}
      <section className="dms-section dms-section--alt cx-sec hm-railed" id="industries" aria-labelledby="cr-ind-h">
        <div className="dms-wrap">
          <Head id="cr-ind-h" eyebrow="Across industries" title="Medical devices sits in the heavier third.">
            <p className="dms-lede">
              It is heaviest where work is regulated, multi-party, and
              evidence-bound, because every decision has to be coordinated and
              then proven. Roughly where each sector lands as a share of
              operating cost, on Unifize&rsquo;s model.
            </p>
          </Head>
          <div className="cx-cells cx-cells--lead" data-reveal>
            <div className="cx-cell cx-stat">
              <p className="cx-label">
                Medical devices <Prov kind="modelled" />
              </p>
              <p className="cx-stat__fig">21%</p>
              <p className="cx-stat__line">
                Each design change and supplier action carries documentation
                and review intensity lighter industries never touch; the bar is
                simply higher for everyone in your category.
              </p>
            </div>
            <div className="cx-cell cx-bars">
              <Bars
                rows={INDUSTRIES.map(([label, v]) => ({
                  label: label === "Medical devices" ? `${label} · you` : label,
                  value: v,
                  display: `${v}%`,
                  strong: label === "Medical devices",
                  dim: label !== "Medical devices",
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* --------------------------------------------------- your number */}
      <section className="dms-section cx-sec hm-railed" id="number" aria-labelledby="cr-num-h">
        <div className="dms-wrap">
          <Head id="cr-num-h" eyebrow="Your number" title="About two points above your industry median.">
            <p className="dms-lede">
              A stage 2 estimate at 62 percent confidence: Unifize&rsquo;s model
              for medical device manufacturing, sharpened by the volumes you
              shared. A discovery call moves it to stage 3; a two-week Phase 0
              measures it for real at stage 4.
            </p>
          </Head>
          <div className="cx-cells cx-cells--2" data-reveal>
            <div className="cx-cell cx-range">
              <p className="cx-label">
                Your sharpened estimate <Prov kind="modelled" />
              </p>
              <p className="cx-range__fig">
                $3.8M <span>to</span> $4.6M
              </p>
              <p className="cx-range__unit">a year, about $4.2M at the midpoint</p>
            </div>
            <div className="cx-cell cx-bench">
              <p className="cx-label">Share of operating cost, medical device manufacturing</p>
              <BenchTrack
                band={[34, 76]}
                markers={[
                  { at: 42, label: "median 19%" },
                  { at: 22, label: "top quartile 13%", tone: "ok" },
                  { at: 58, label: "you ~21%", tone: "ink" },
                ]}
              />
            </div>
          </div>
          <div className="cx-foot">
            <p>
              <b>Where the benchmark comes from.</b>{" "}Unifize&rsquo;s coordination
              tax model for your industry, built from structural reasoning and
              expert judgment and refined with measured customer data. It is
              not a published third-party statistic. We say so plainly because
              the number only helps you if you trust where it comes from.
            </p>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ----------------------------------------------- how you compare */}
      <section className="dms-section dms-section--alt cx-sec hm-railed" id="compare" aria-labelledby="cr-cmp-h">
        <div className="dms-wrap">
          <Head id="cr-cmp-h" eyebrow="How you compare" title="You against your industry.">
            <p className="dms-lede">
              Peer figures are our model&rsquo;s reference points for
              manufacturers your size, not published data and not a named
              competitor. Where your reading is not yet measured we say so, and
              claim no gap.
            </p>
          </Head>
          <div className="cx-rows cx-rows--cmp" role="table" aria-label="You against your industry" data-reveal>
            <div className="cx-rows__hd" role="row">
              <span role="columnheader">Measure</span>
              <span role="columnheader">Industry median</span>
              <span role="columnheader">Top quartile</span>
              <span role="columnheader">Your reading</span>
            </div>
            {CMP.map(([measure, median, top, you, prov]) => (
              <div className="cx-rows__row" role="row" key={measure}>
                <span role="cell" className="cx-rows__k">{measure}</span>
                <span role="cell" className="cx-rows__num" data-k="Median">{median}</span>
                <span role="cell" className="cx-rows__num is-good" data-k="Top quartile">{top}</span>
                <span role="cell" className="cx-rows__you">
                  {you ? <b>{you}</b> : <span className="cx-rows__dim">not yet measured</span>}
                  <Prov kind={prov} />
                </span>
              </div>
            ))}
          </div>
          <div className="cx-foot">
            <p>
              Only the two figures we model from your firmographics carry a
              value for you, labelled modelled. The operational metrics stay
              assumed industry-typical until you confirm them in the intake or
              a discovery call.
            </p>
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ------------------------------------------------------- symptoms */}
      <section className="dms-section cx-sec hm-railed" id="symptoms" aria-labelledby="cr-sym-h">
        <div className="dms-wrap">
          <Head id="cr-sym-h" eyebrow="Symptoms and cause" title="What you feel, why it happens, what it costs.">
            <p className="dms-lede">
              The volumes are the ones you gave us (140 CAPAs, 320 change
              orders, 600 suppliers a year, confirmed); the durations and rates
              are assumed industry-typical until you confirm them.
            </p>
          </Head>
          <div className="cx-rows cx-rows--sym" role="table" aria-label="Symptoms, causes and costs" data-reveal>
            <div className="cx-rows__hd" role="row">
              <span role="columnheader">What you feel</span>
              <span role="columnheader">Why it happens</span>
              <span role="columnheader">What it costs</span>
            </div>
            {SYMPTOMS.map(([feel, why, cost]) => (
              <div className="cx-rows__row" role="row" key={feel}>
                <span role="cell" className="cx-rows__k">
                  {feel} <Prov kind="assumed" />
                </span>
                <span role="cell" className="cx-rows__txt">{why}</span>
                <span role="cell" className="cx-rows__txt">{cost}</span>
              </div>
            ))}
          </div>
          <div className="cx-foot">
            <p>
              <b>One root cause underneath all of them.</b>{" "}Your system of
              record stores what is officially true. The work that produces
              those records runs in a separate system of coordination: email,
              meetings, and spreadsheets. Every symptom above is the gap
              between the two, which is why they cannot be fixed one at a time,
              and why fixing the gap fixes them together.
            </p>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* -------------------------------------------------------- lenses
        * one angle at a time behind text tabs */}
      <section className="dms-section dms-section--alt cx-sec hm-railed" id="lenses" aria-labelledby="cr-lens-h">
        <div className="dms-wrap">
          <Head id="cr-lens-h" eyebrow="Where it lives" title="Your coordination tax from six angles.">
            <p className="dms-lede">
              A single total hides where the cost actually lives. The same
              $4.2M looks different depending on how you cut it, and each cut
              points at a different fix.
            </p>
          </Head>
          <div className="cx-lens" data-reveal>
            <span className="cx-lens__k" id="cr-lens-k">Cut it by</span>
            <div className="cx-lens__tabs" role="tablist" aria-labelledby="cr-lens-k">
              {LENSES.map((l, i) => (
                <button
                  key={l.key}
                  type="button"
                  role="tab"
                  aria-selected={lens === i}
                  className={`cx-tab${lens === i ? " is-on" : ""}`}
                  onClick={() => setLens(i)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="cx-cells cx-cells--lead cx-lenspane" role="tabpanel" aria-label={lensNow.title}>
            <div className="cx-cell cx-cell--quiet">
              <p className="cx-label">Lens {lens + 1} of 6</p>
              <h3 className="cx-lenspane__h">{lensNow.title}</h3>
              <p className="cx-note">{lensNow.note}</p>
            </div>
            <div className="cx-cell cx-bars">
              {lensNow.key === "theme" ? <ThemeStack withMoney /> : null}
              {lensNow.key === "workflow" ? (
                <Bars
                  rows={WORKFLOWS.map(([label, v, note], i) => ({
                    label: `${label} (${note})`,
                    value: v,
                    display: `$${v.toFixed(1)}M`,
                    strong: i === 0,
                  }))}
                />
              ) : null}
              {lensNow.key === "layer" ? (
                <div className="cx-layers">
                  <div className="cx-layers__bar" aria-hidden="true">
                    {LAYERS.map((l, i) => (
                      <span key={l.label} className={`is-${i}`} style={{ width: `${l.pct}%` }}>
                        {l.pct}%
                      </span>
                    ))}
                  </div>
                  <ul className="cx-legendrows">
                    {LAYERS.map((l, i) => (
                      <li key={l.label}>
                        <i className={`is-${i}`} aria-hidden="true" />
                        <b>{l.label}</b>
                        <span>{l.note}</span>
                        <em>{money((MID * l.pct) / 100)}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {lensNow.key === "waste" ? (
                <div className="cx-donutwrap">
                  <div
                    className="cx-donut"
                    role="img"
                    aria-label="Coordination tax by type of waste"
                    style={{
                      background: `conic-gradient(${wasteStops})`,
                      WebkitMask: "radial-gradient(circle 52px at center, transparent 98%, #000 100%)",
                      mask: "radial-gradient(circle 52px at center, transparent 98%, #000 100%)",
                    }}
                  />
                  <ul className="cx-legendrows">
                    {WASTE.map((w) => (
                      <li key={w.label}>
                        <i style={{ background: w.color }} aria-hidden="true" />
                        <b>{w.label}</b>
                        <em>{w.pct}%</em>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {lensNow.key === "team" ? (
                <Bars
                  rows={TEAMS.map(([label, v], i) => ({
                    label,
                    value: v,
                    display: `${v}% · ${money((MID * v) / 100)}`,
                    strong: i === 0,
                  }))}
                />
              ) : null}
              {lensNow.key === "site" ? (
                <Bars
                  rows={SITES.map(([label, v], i) => ({
                    label,
                    value: v,
                    display: `${v}% · ${money((MID * v) / 100)}`,
                    strong: i === 0,
                  }))}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ------------------------------------------------ domain deep dive */}
      <section className="dms-section cx-sec hm-railed" id="deep" aria-labelledby="cr-deep-h">
        <div className="dms-wrap">
          <Head id="cr-deep-h" eyebrow="Your domain" title="Go deep into one domain.">
            <p className="dms-lede">
              {openedFromRole
                ? `Based on your role we opened ${dom.name}. Switch tabs to explore any domain.`
                : "We have defaulted to Quality, the most common entry point and the domain that touches every other. Switch to the area you own to go deep there."}
            </p>
          </Head>
          <div className="cx-lens" data-reveal>
            <span className="cx-lens__k" id="cr-dom-k">Domain</span>
            <div className="cx-lens__tabs" role="tablist" aria-labelledby="cr-dom-k">
              {DEEP.map((d, i) => (
                <button
                  key={d.name}
                  type="button"
                  role="tab"
                  aria-selected={i === domIdx}
                  className={`cx-tab${i === domIdx ? " is-on" : ""}`}
                  onClick={() => setDomIdx(i)}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
          <div className="cx-cells cx-cells--lead cx-lenspane" role="tabpanel" aria-label={dom.name}>
            <div className="cx-cell cx-cell--quiet cx-stat">
              <p className="cx-label">Share of your coordination tax</p>
              <p className="cx-stat__fig">{dom.share}%</p>
              <p className="cx-stat__line">
                <b>{money((MID * dom.share) / 100)}</b>{" "}a year sits in {dom.name}.
              </p>
              <p className="cx-note">{dom.peer}</p>
            </div>
            <div className="cx-cell cx-bars">
              <p className="cx-deep__blurb">{dom.blurb}</p>
              <p className="cx-label">Where it accumulates inside {dom.name}</p>
              <Bars
                rows={dom.sub.map(([label, v], i) => ({
                  label,
                  value: v,
                  display: `${v}%`,
                  strong: i === 0,
                }))}
              />
            </div>
          </div>
          <div className="cx-cells cx-cells--2 cx-deep__pair">
            <div className="cx-cell">
              <p className="cx-label">The dominant waste</p>
              <p className="cx-deep__waste">{dom.waste}</p>
            </div>
            <div className="cx-cell cx-cell--answer">
              <p className="cx-label">How Unifize reduces it</p>
              <ul className="cx-checks">
                {dom.fix.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ------------------------------------------------------- signals */}
      <section className="dms-section dms-section--alt cx-sec hm-railed" id="signals" aria-labelledby="cr-sig-h">
        <div className="dms-wrap">
          <Head id="cr-sig-h" eyebrow="How we assessed you" title="The signals behind this estimate.">
            <p className="dms-lede">
              Before you told us anything, we built a picture from publicly
              available data. Exactly what we used, what each signal implies,
              and where it came from. Nothing here is hidden.
            </p>
          </Head>
          <div className="cx-rows cx-rows--sig" role="table" aria-label="Signals behind the estimate" data-reveal>
            <div className="cx-rows__hd" role="row">
              <span role="columnheader">Signal</span>
              <span role="columnheader">Source</span>
              <span role="columnheader">What it implies</span>
            </div>
            {SIGNALS.map(([signal, source, implies]) => (
              <div className="cx-rows__row" role="row" key={signal}>
                <span role="cell" className="cx-rows__k">{signal}</span>
                <span role="cell"><Prov kind={source} /></span>
                <span role="cell" className="cx-rows__txt">{implies}</span>
              </div>
            ))}
          </div>
          <div className="cx-foot">
            <p>
              <b>One engine, one number.</b>{" "}Produced by the controlled
              Coordination Tax methodology, the same engine sales uses, so this
              number and the number in a conversation are one and the same.
              Analyzing your real workflows directly is offered in discovery,
              with consent; it is not part of this report.
            </p>
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* -------------------------------------------------------- sharpen */}
      <section className="dms-section cx-sec hm-railed" id="sharpen" aria-labelledby="cr-sharp-h">
        <div className="dms-wrap">
          <Head id="cr-sharp-h" eyebrow="Sharpen it" title="What would make this more accurate.">
            <p className="dms-lede">
              Each of these tightens the range and raises confidence. The
              figure is how much each one typically narrows the estimate.
            </p>
          </Head>
          <ol className="cx-cells cx-sharp" data-reveal>
            {SHARPEN.map(([label, lift], i) => (
              <li key={label} className={`cx-cell${i === SHARPEN.length - 1 ? " cx-cell--answer" : ""}`}>
                <span className="cx-sharp__lift">{lift}</span>
                <span className="cx-sharp__k">{label}</span>
              </li>
            ))}
          </ol>
          <div className="cx-foot">
            <p>
              <b>The most accurate picture comes from a two-week Phase 0</b>,
              where we measure your actual coordination directly in one
              workflow family. Most of the inputs above are confirmed for real
              at that point, and confidence moves past 90 percent.
            </p>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ------------------------------------------------------- solution */}
      <section className="dms-section dms-section--alt cx-sec hm-railed" id="solution" aria-labelledby="cr-sol-h">
        <div className="dms-wrap">
          <Head id="cr-sol-h" eyebrow="Why it is now solvable" title="The problem is old. The solution is new.">
            <p className="dms-lede">
              It can finally be seen, measured, and removed, because AI can now
              read the work as it happens and accelerate it, while keeping
              every approval human and auditable.
            </p>
          </Head>
          <ol className="cx-cells cx-cells--3 cx-contents" data-reveal>
            {LEVELS.map(([n, h, body]) => (
              <li key={n} className="cx-cell">
                <span className="cx-contents__n">{n}</span>
                <h3>{h}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <p className="cx-subhead">How each kind of waste gets removed</p>
          <div className="cx-rows cx-rows--sym" role="table" aria-label="How each kind of waste gets removed">
            <div className="cx-rows__hd" role="row">
              <span role="columnheader">Where the tax is</span>
              <span role="columnheader">Why it happens</span>
              <span role="columnheader">How Unifize removes it</span>
            </div>
            {MECH.map(([where, why, how]) => (
              <div className="cx-rows__row" role="row" key={where}>
                <span role="cell" className="cx-rows__k">{where}</span>
                <span role="cell" className="cx-rows__txt">{why}</span>
                <span role="cell" className="cx-rows__txt cx-rows__how">{how}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* -------------------------------------------------------- journey */}
      <section className="dms-section cx-sec hm-railed" id="journey" aria-labelledby="cr-jr-h">
        <div className="dms-wrap">
          <Head id="cr-jr-h" eyebrow="How you reduce it" title="From this assessment to a measured reduction.">
            <p className="dms-lede">
              Take your highest-tax processes, decompose them into steps, cut
              the wasted time with structure and AI, and measure the before and
              after, one process at a time.
            </p>
          </Head>
          <ol className="cx-journey" data-reveal>
            {JOURNEY.map(([head, body], i) => (
              <li key={head} className={i === JOURNEY.length - 1 ? "is-done" : undefined}>
                <span className="cx-journey__n">{String(i + 1).padStart(2, "0")}</span>
                <b>{head}</b>
                <span>{body}</span>
              </li>
            ))}
          </ol>
          <div className="cx-cells cx-cells--2 cx-journey__after">
            <div className="cx-cell">
              <p className="cx-label">One process, the CAPA workflow</p>
              <div className="cx-ba">
                <div className="cx-ba__row">
                  <span>Without Unifize</span>
                  <span className="cx-ba__rail"><span className="is-before" style={{ width: "100%" }} /></span>
                  <em>90 days · $1.18M</em>
                </div>
                <div className="cx-ba__row">
                  <span>With Unifize</span>
                  <span className="cx-ba__rail"><span className="is-after" style={{ width: "38%" }} /></span>
                  <em>34 days · $0.52M</em>
                </div>
              </div>
              <p className="cx-note">The same steps, measured before and after.</p>
            </div>
            <div className="cx-cell cx-cell--quiet">
              <p className="cx-label">Then it aggregates</p>
              <dl className="cx-agg">
                {AGGREGATE.map(([n, d]) => (
                  <div key={d}>
                    <dt>{n}</dt>
                    <dd>{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <HatchBand />

      {/* ------------------------------------------ load, floor, recoverable */}
      <section className="dms-section dms-section--alt cx-sec hm-railed" id="roi" aria-labelledby="cr-roi-h">
        <div className="dms-wrap">
          <Head id="cr-roi-h" eyebrow="What you get back" title="Recovered from the tax, never the floor.">
            <p className="dms-lede">
              Not all coordination is waste. Some is the irreducible minimum
              for running a regulated process. The tax is everything above that
              floor, and it is the only part we count as recoverable.
            </p>
          </Head>
          <div className="cx-cells cx-cells--3 cx-lft" data-reveal>
            {LFT.map((l, i) => (
              <div key={l.label} className={`cx-cell${i === 2 ? " cx-cell--tax" : ""}`}>
                <p className="cx-label">{l.label}</p>
                <p className="cx-lft__fig">{money(l.value)}</p>
                <span className="cx-lft__bar" aria-hidden="true">
                  <span style={{ width: `${Math.round((l.value / LFT[0].value) * 100)}%` }} />
                </span>
              </div>
            ))}
          </div>
          <p className="cx-subhead">What you could get back, at each level of the roadmap</p>
          <div className="cx-tiers">
            {TIERS.map(([label, pct, dollars]) => (
              <div key={label} className="cx-tier">
                <span>{label}</span>
                <span className="cx-tier__rail"><span style={{ width: `${pct}%` }} /></span>
                <em>{pct}% · {dollars}</em>
              </div>
            ))}
          </div>
          <div className="cx-foot">
            <p>
              <b>How we price.</b>{" "}Unifize ties pricing to measured reduction.
              The conservative year-one figure on the one-pager ($0.9M to
              $1.3M) is what the first level alone, with no AI, recovers. The
              question stops being &ldquo;what does the software cost&rdquo; and
              becomes &ldquo;how confident are you in the reduction&rdquo;, which
              is exactly what the live measurement answers.
            </p>
          </div>
        </div>
      </section>

      <HatchBand className="hm-hatch--alt" />

      {/* ---------------------------------------------------------- proof */}
      <section className="dms-section dms-section--dark cx-sec cx-proof hm-railed" id="proof" aria-labelledby="cr-proof-h">
        <div className="dms-wrap">
          <header className="cx-proof__head" data-reveal>
            <Eyebrow>Proof from regulated manufacturers</Eyebrow>
            <h2 className="dms-h2" id="cr-proof-h">Teams with your problem, after Unifize.</h2>
          </header>
          <div className="cx-cells cx-cells--proof" data-reveal>
            <figure className="cx-cell cx-quote">
              <blockquote>
                &ldquo;Tasks that have taken weeks or months are now completed
                in days. We have had conversations that launched and then
                closed all in the same day.&rdquo;
              </blockquote>
              <figcaption>
                <b>Tedd Carr</b>, Director of Quality, The Will-Burt Company
                <a
                  href="https://www.unifize.com/content/how-a-quality-veteran-from-the-will-burt-company-replaced-multiple-quality-support-systems-with-unifize-and-boosted-issue-closure-time-by-75-within-the-first-month"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the story &rarr;
                </a>
              </figcaption>
            </figure>
            <div className="cx-cell cx-fact">
              <p className="cx-fact__fig">75%</p>
              <p>faster issue closure within the first month</p>
            </div>
            <div className="cx-cell cx-fact">
              <p className="cx-fact__fig">5 &rarr; 1</p>
              <p>disconnected quality systems consolidated into Unifize</p>
            </div>
          </div>
          <p className="cx-proof__ref">
            <span className="cx-label">In your industry</span>
            <span>
              <b>Recovery Force</b>, a wearable medical device manufacturer,
              FDA-regulated and ISO 13485, working through a 483 observation,
              runs CAPA, complaints, audits, change control, document control,
              and training on Unifize. Their QA manager is a reference
              customer.
            </span>
          </p>
        </div>
      </section>

      <HatchBand className="hm-hatch--dark" />

      <RailsClose
        id="cx-close-h"
        eyebrow="Take it further"
        heading="Sharpen it, then measure it."
        lede="A 30-minute discovery call confirms your real volumes and moves this to stage 3. A two-week Phase 0 in one workflow family measures it for real, with no rip-and-replace."
        primaryLabel="Book the discovery call"
        secondary={{ label: "Back to the assessment", href: "/coordination-tax-calculator" }}
        source="ctax-report-close"
      />
    </div>
  );
}
