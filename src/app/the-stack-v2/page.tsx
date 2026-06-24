import type { Metadata } from "next";
import NcrScrolly from "./NcrScrolly";

export const metadata: Metadata = {
  title: "Between the steps — where the work, and the cost, actually lives",
  description:
    "One non-conformance, walked from the inside out. A handful of named steps hides the real swarm of messages, handoffs, and waiting. Unifize captures that swarm on the record — then compresses it.",
};

/* ============================================================
   Shared primitives (reused from the-stack)
   ============================================================ */

function Screen({ src, title, height }: { src: string; title: string; height: number }) {
  return (
    <figure className="stk-screen">
      <iframe src={src} title={title} loading="lazy" style={{ height: `${height}px` }} />
    </figure>
  );
}

function ChartFrame({
  id,
  label,
  aside,
  children,
}: {
  id: string;
  label: string;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="stk-chart" aria-label={label}>
      <header className="stk-chart-head">
        <span className="stk-chart-eyebrow">
          <span className="stk-chart-eyebrow-num">{id}</span>
          <span>{label}</span>
        </span>
        {aside && <span className="stk-chart-aside">{aside}</span>}
      </header>
      <div className="stk-chart-body">{children}</div>
    </section>
  );
}

// Same header as ChartFrame, but no card box — for content that reads better unboxed.
function Block({
  id,
  label,
  aside,
  children,
}: {
  id: string;
  label: string;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="stk-block" aria-label={label}>
      <header className="stk-block-head">
        <span className="stk-chart-eyebrow">
          <span className="stk-chart-eyebrow-num">{id}</span>
          <span>{label}</span>
        </span>
        {aside && <span className="stk-chart-aside">{aside}</span>}
      </header>
      <div>{children}</div>
    </section>
  );
}

function Breaker() {
  const lines = [
    { yStart: 210, yEnd: 110, xRise: 520, xLand: 980, opacity: 0.65 },
    { yStart: 195, yEnd: 95, xRise: 560, xLand: 1020, opacity: 0.58 },
    { yStart: 180, yEnd: 80, xRise: 600, xLand: 1060, opacity: 0.52 },
    { yStart: 165, yEnd: 65, xRise: 640, xLand: 1100, opacity: 0.46 },
    { yStart: 150, yEnd: 50, xRise: 680, xLand: 1140, opacity: 0.4 },
  ];
  const pillsAt = [
    { id: "step", x: 1060, y: 80, label: "STEP" },
    { id: "between", x: 1100, y: 65, label: "BETWEEN" },
    { id: "record", x: 1140, y: 50, label: "RECORD" },
  ];
  return (
    <div className="stk-breaker" aria-hidden>
      <svg viewBox="0 0 1440 240" preserveAspectRatio="none" className="stk-breaker-svg">
        {lines.map((l, i) => {
          const span = l.xLand - l.xRise;
          const cp1x = l.xRise + span * 0.4;
          const cp2x = l.xLand - span * 0.4;
          const d =
            `M 0 ${l.yStart} ` +
            `L ${l.xRise} ${l.yStart} ` +
            `C ${cp1x} ${l.yStart}, ${cp2x} ${l.yEnd}, ${l.xLand} ${l.yEnd} ` +
            `L 1440 ${l.yEnd}`;
          return <path key={i} d={d} className="stk-line" opacity={l.opacity} />;
        })}
        {pillsAt.map((p) => (
          <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
            <circle r="3" className="stk-node" />
            <line x1="0" y1="0" x2="0" y2="-26" className="stk-line" opacity="0.5" />
            <rect x="-48" y="-48" width="96" height="18" className="stk-pill" />
            <text x="0" y="-35" textAnchor="middle" className="stk-pill-text">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ============================================================
   New primitives — the between-the-steps story
   ============================================================ */

// 01.A — On paper (named steps) vs in reality (the swarm)
function StepsVsSwarm() {
  const steps = ["Detect", "Raise", "Contain", "Disposition", "Corrective action", "Close"];
  // Mostly waiting (faded), some real work (ink), a rare sprinkle of value-adding (primary).
  const dots = Array.from({ length: 720 }, (_, i) =>
    i % 17 === 0 ? "is-active" : i % 3 === 0 ? "is-ink" : "is-wait"
  );
  return (
    <div className="stk-steps">
      <div className="stk-steps-side">
        <span className="stk-gap-eyebrow">
          <span className="stk-gap-eyebrow-num">ON PAPER</span>
          <span>The QMS record</span>
        </span>
        <ol className="stk-steps-list">
          {steps.map((s, i) => (
            <li key={s} className="stk-steps-row">
              <span className="stk-steps-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="stk-steps-name">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="stk-steps-side stk-swarm">
        <span className="stk-gap-eyebrow">
          <span className="stk-gap-eyebrow-num">IN REALITY</span>
          <span>What it actually took</span>
        </span>
        <div className="stk-swarm-field" aria-hidden>
          {dots.map((c, i) => (
            <span key={i} className={`stk-swarm-dot ${c}`} />
          ))}
        </div>
        <div className="stk-swarm-tags">
          <span className="stk-swarm-tag">Messages</span>
          <span className="stk-swarm-tag">Handoffs</span>
          <span className="stk-swarm-tag">Meetings</span>
          <span className="stk-swarm-tag">Waiting</span>
          <span className="stk-swarm-tag is-active">Value-adding work</span>
        </div>
      </div>
    </div>
  );
}

// 01.B — Active vs wait. Proportions illustrative; no committed figure.
function WaitBar() {
  return (
    <div className="stk-wait">
      <div className="stk-wait-track" aria-hidden>
        <div className="stk-wait-active" style={{ flexBasis: "32%" }} />
        <div className="stk-wait-idle" />
      </div>
      <div className="stk-wait-legend">
        <span className="stk-wait-key">
          <i className="active" />
          Active work
        </span>
        <span className="stk-wait-key">
          <i className="idle" />
          Waiting on a handoff or response
        </span>
      </div>
    </div>
  );
}

// 03.B — Zoom into one step: the single line in the QMS vs the real sub-actions.
function StepZoom() {
  const dots = Array.from({ length: 180 }, (_, i) =>
    i % 13 === 0 ? "is-active" : i % 3 === 0 ? "is-ink" : "is-wait"
  );
  return (
    <div className="stk-steps">
      <div className="stk-steps-side">
        <span className="stk-gap-eyebrow">
          <span className="stk-gap-eyebrow-num">THE STEP</span>
          <span>As the QMS sees it</span>
        </span>
        <ol className="stk-steps-list">
          <li className="stk-steps-row">
            <span className="stk-steps-n">03.3</span>
            <span className="stk-steps-name">Disposition recorded</span>
          </li>
        </ol>
      </div>
      <div className="stk-steps-side stk-swarm">
        <span className="stk-gap-eyebrow">
          <span className="stk-gap-eyebrow-num">THE BETWEEN</span>
          <span>What it actually took</span>
        </span>
        <div className="stk-swarm-field" aria-hidden>
          {dots.map((c, i) => (
            <span key={i} className={`stk-swarm-dot ${c}`} />
          ))}
        </div>
        <div className="stk-swarm-tags">
          <span className="stk-swarm-tag">Investigation thread</span>
          <span className="stk-swarm-tag">Sign-offs</span>
          <span className="stk-swarm-tag">Waiting</span>
          <span className="stk-swarm-tag is-active">The decision that mattered</span>
        </div>
      </div>
    </div>
  );
}

// 06.A — Compression: the same cycle, before and after.
function CompressBar() {
  return (
    <div className="stk-compress">
      <div className="stk-compress-row">
        <span className="stk-compress-tag">Before</span>
        <div
          aria-hidden
          style={{
            display: "flex",
            gap: 0,
            height: 30,
            border: "1px solid var(--stk-rule)",
            background: "var(--stk-paper)",
            padding: 3,
          }}
        >
          {[
            { w: 7, c: "#b9573f" },
            { w: 6, c: null },
            { w: 5, c: "#c2992f" },
            { w: 9, c: null },
            { w: 10, c: "#6f8a6a" },
            { w: 5, c: null },
            { w: 4, c: "#8a6f97" },
            { w: 11, c: null },
            { w: 8, c: "#b9573f" },
            { w: 4, c: null },
            { w: 6, c: "#8d949e" },
            { w: 6, c: null },
            { w: 9, c: "#c2992f" },
          ].map((s, i) => (
            <span key={i} style={{ flex: `0 0 ${s.w}%`, background: s.c ?? "transparent" }} />
          ))}
        </div>
      </div>
      <div className="stk-compress-row">
        <span className="stk-compress-tag">With Unifize</span>
        <div
          aria-hidden
          style={{
            height: 30,
            border: "1px solid var(--stk-rule)",
            background: "var(--stk-paper)",
            padding: 3,
          }}
        >
          <span style={{ display: "block", height: "100%", width: "32%", background: "var(--u-primary)" }} />
        </div>
      </div>
      <p className="stk-wait-cap">
        Active time stays where people add value — reviewing, deciding, signing
        off. The waiting between the steps is what disappears: collaboration on
        the record removes it today, and AI compresses what is left over time.
      </p>
    </div>
  );
}

// 06.B — One real customer. Will-Burt (deck p.8 / published case study).
function ProofBlock() {
  const stats = [
    { v: "4–5 wks → 7.2 days", l: "NCR closure, supplier and internal in one workflow" },
    { v: "4+ wks → 11.4 days", l: "Customer complaint closure, linked to root cause and CAPA" },
    { v: "5 tools → 1 platform", l: "Spreadsheets, Access, shared folders, email — replaced" },
    { v: "90–95%", l: "Audits run remotely, auditors reviewing records directly" },
  ];
  return (
    <div className="stk-proof">
      <div className="stk-proof-headline">
        <span className="stk-gap-eyebrow">
          <span className="stk-gap-eyebrow-num">PROOF</span>
          <span>Will-Burt</span>
        </span>
        <span className="stk-proof-metric">
          75<span className="stk-mark">%</span>
        </span>
        <p className="stk-proof-cap">
          Reduction in NCR cycle time, across nearly 1,000 suppliers and 20+
          product lines.
        </p>
      </div>
      <div>
        <div className="stk-proof-stats">
          {stats.map((s) => (
            <div key={s.v} className="stk-proof-stat">
              <span className="stk-proof-stat-v">{s.v}</span>
              <span className="stk-proof-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
        <p className="stk-proof-src" style={{ marginTop: 12 }}>
          Source · Will-Burt customer case study
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   In-layer charts reused from the-stack
   ============================================================ */

// The buying group — quality is never one person. Illustrative roster;
// reconcile against the canonical Personas DB before publish.
function PersonaRoster() {
  const people = [
    { role: "VP / Director of Quality", resp: "Owns CAPA effectiveness, audit posture, and the overdue-NC number leadership sees.", tag: "Primary buyer", primary: true },
    { role: "Quality Engineer / Quality Systems", resp: "Runs NCs, CAPAs, and change controls day to day — lives in the records.", tag: "Daily user" },
    { role: "Manufacturing / Operations", resp: "Detects nonconformities on the floor; owns containment and lot release.", tag: "Contributor" },
    { role: "Supplier Quality", resp: "Manages supplier NCs, SCARs, and scorecards across the supply base.", tag: "Contributor" },
    { role: "Regulatory Affairs", resp: "Answers to the notified body; owns submissions and EU MDR post-market.", tag: "Approver" },
    { role: "Executive · CEO / COO / Chief AI Officer", resp: "Enters when an audit, a recall, or a system go-live makes quality the bottleneck.", tag: "Entry on trigger" },
  ];
  return (
    <Block id="02.A" label="The Buying Group · Who Carries Quality" aside="One org, several roles">
      <ul className="stk-persona">
        {people.map((p) => (
          <li key={p.role} className="stk-persona-row">
            <span className="stk-persona-role">{p.role}</span>
            <span className="stk-persona-resp">{p.resp}</span>
            <span className={`stk-persona-tag${p.primary ? " is-primary" : ""}`}>{p.tag}</span>
          </li>
        ))}
      </ul>
    </Block>
  );
}

function RegFrame() {
  const rows = [
    { code: "FDA 21 CFR 820", section: "§ 820.90", names: "Nonconforming product" },
    { code: "ISO 13485:2016", section: "§ 8.5.2", names: "Corrective action effectiveness" },
    { code: "EU MDR", section: "Article 83", names: "Post-market feedback into design" },
  ];
  return (
    <Block id="02.B" label="Regulatory Frame · Where 483s Land" aside="Class II device OEM / CDMO">
      <ul className="stk-reg">
        {rows.map((r) => (
          <li key={r.code} className="stk-reg-row">
            <span className="stk-reg-code">{r.code}</span>
            <span className="stk-reg-section">{r.section}</span>
            <span className="stk-reg-names">{r.names}</span>
          </li>
        ))}
      </ul>
    </Block>
  );
}

function NcrSteps() {
  const steps = [
    { num: "01", name: "Start", caption: "Quick Start panel" },
    { num: "02", name: "Raise", caption: "Classify & assign" },
    { num: "03", name: "Contain", caption: "Stop the spread" },
    { num: "04", name: "Disposition", caption: "Bind rationale" },
    { num: "05", name: "Link CAR", caption: "Close with CAR" },
  ];
  return (
    <ChartFrame id="03.A" label="Non-Conformance Flow · Five Steps, One Record" aside="Working surface = record">
      <ol className="stk-flow">
        {steps.map((s, i) => (
          <li key={s.num} className="stk-flow-step">
            <span className="stk-flow-marker">
              <span className="stk-flow-node" />
              {i < steps.length - 1 && <span className="stk-flow-line" />}
            </span>
            <span className="stk-flow-num">{s.num}</span>
            <span className="stk-flow-name">{s.name}</span>
            <span className="stk-flow-caption">{s.caption}</span>
          </li>
        ))}
      </ol>
    </ChartFrame>
  );
}

function ApprovalMatrix() {
  const cols = [
    { id: "who", title: "Who approves", items: ["Specific users", "Roles", "Participants", "Pulled from a field"] },
    { id: "locks", title: "What locks", items: ["Fields", "Sections", "Checklist on request / approval / rejection"] },
    { id: "fires", title: "What fires on approve", items: ["Change status", "Add participants", "Move to next stage", "Cancel downstream"] },
  ];
  return (
    <ChartFrame id="04.A" label="Approval Field · Configuration Surface" aside="One field, three knobs">
      <div className="stk-amx">
        {cols.map((c) => (
          <div key={c.id} className="stk-amx-col">
            <span className="stk-amx-col-title">{c.title}</span>
            <ul className="stk-amx-list">
              {c.items.map((it) => (
                <li key={it} className="stk-amx-item">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

/* ============================================================
   Layers
   ============================================================ */

type Sub = { id: string; num: string; title: string; lede: string; src: string; frameHeight: number };

type Layer = {
  id: string;
  num: string;
  scope: string;
  name: string;
  heroTitle: string;
  heroLede: React.ReactNode;
  heroSrc: string;
  heroFrameHeight: number;
  uniqueClaim: string;
  subs: Sub[];
  extra?: React.ReactNode;
  after?: React.ReactNode;
};

const LAYERS: Layer[] = [
  // ===================== LAYER 01 — the gap, grounded and counted =====
  {
    id: "quality",
    num: "01",
    scope: "Domain",
    name: "Quality Management",
    heroTitle: "Your QMS captures what happened. Nobody captures how it happened — or what it cost.",
    heroLede: (
      <p>
        Start at the bottom, with one real workflow. A non-conformance closes in
        a handful of named steps the QMS can show you. But the work that produced
        those steps — the messages, the handoffs, the meetings, the waiting —
        happens in email, chat, and spreadsheets, and never lands on the record.
        That space between the steps is where the time and the cost actually live.
      </p>
    ),
    heroSrc: "",
    heroFrameHeight: 0,
    uniqueClaim: "The named steps are not the work. The work is everything between them.",
    extra: (
      <div className="stk-extra">
        <ChartFrame id="01.A" label="On Paper vs In Reality" aside="One non-conformance">
          <StepsVsSwarm />
        </ChartFrame>
        <ChartFrame id="01.B" label="Where the Time Goes" aside="Active vs wait">
          <WaitBar />
        </ChartFrame>
        <p className="stk-gap-resolve">
          <span className="stk-mark">Unifize</span> sits between the two — the
          coordination on top, the governed record below.
        </p>
      </div>
    ),
    subs: [],
  },

  // ===================== LAYER 02 — the buyer, contextualized =========
  {
    id: "medical-devices",
    num: "02",
    scope: "Industry × Domain",
    name: "Quality for Medical Devices",
    heroTitle: "FDA scrutiny lands here first.",
    heroLede: (
      <p>
        This walk is configured for one company shape, deliberately — a Class II
        device OEM or CDMO under FDA 21 CFR 820, ISO 13485:2016, and EU MDR, where
        overdue CAPAs and NCs are a common 483 observation. But quality is never
        one person: a group across the org carries the work, and any of them can
        be the entry point depending on the trigger. The thesis: this is a{" "}
        <em>coordination failure, not a quality failure</em>.
      </p>
    ),
    heroSrc: "",
    heroFrameHeight: 0,
    uniqueClaim: "Regulatory frame as runtime context the record carries, not a checklist assembled at the end.",
    extra: (
      <div className="stk-extra">
        <span className="stk-chip">
          Configured for · <b>Class II device OEM · 21 CFR 820</b>
        </span>
        <PersonaRoster />
        <RegFrame />
      </div>
    ),
    subs: [],
  },

  // ===================== LAYER 03 — the module, with the zoom ==========
  {
    id: "ncr",
    num: "03",
    scope: "Module",
    name: "Non-conformance for Medical Devices",
    heroTitle: "The Non-conformance module, where the work and the record are the same surface.",
    heroLede: (
      <p>
        A non-conformance in Unifize is a record, not a form filled in after the
        work. The right rail names the sections (BASIC INFO, Disposition
        Action(s), Corrective Action Request, NC Completion Approval) and the
        working conversation fills them in. Below: how you start, then the same
        record walked from raise to close — one surface, growing as the work
        happens.
      </p>
    ),
    heroSrc: "",
    heroFrameHeight: 0,
    uniqueClaim: "A record, not a form — the right-rail sections fill in as the work happens.",
    extra: (
      <div className="stk-extra">
        <NcrSteps />
        <ChartFrame id="03.B" label="Inside a Single Step" aside="The between, made visible">
          <StepZoom />
        </ChartFrame>
      </div>
    ),
    subs: [
      {
        id: "start",
        num: "03.0",
        title: "Start: from the home screen",
        lede: "The home screen Quick Start panel opens a new Non-Conformance record in one click. Two clicks from the floor to a filed NC.",
        src: "/stack-fragments/quick-start.html",
        frameHeight: 320,
      },
    ],
    after: (
      <div className="stk-extra">
        <Block id="03.C" label="Inside the Record · One Surface, Growing" aside="Raise → Disposition → CAR">
          <p className="stk-wait-cap" style={{ marginBottom: "clamp(20px, 2.4vw, 32px)" }}>
            It is one record. As the work happens, the conversation and the
            right-rail checklist fill in — scroll to watch the same surface grow
            from raise to close.
          </p>
          <NcrScrolly />
        </Block>
      </div>
    ),
  },

  // ===================== LAYER 04 — the feature, as a commit point =====
  {
    id: "approvals",
    num: "04",
    scope: "Feature",
    name: "Approval workflows",
    heroTitle: "The approval is the commit point — where a decision binds to the record.",
    heroLede: (
      <p>
        Approval workflows are a generic Unifize capability: the Approval Field is
        configurable in any process template. Inside the Non-conformance module it
        powers the Disposition verification and the NC Completion Approval. Each
        sign-off is a commit point: a decision, its evidence, and its author bound
        together at the moment it happens.
      </p>
    ),
    heroSrc: "/stack-fragments/approval-modal.html",
    heroFrameHeight: 700,
    uniqueClaim: "Decision authority, evidence, and rationale are bound at the moment of approval — not assembled at the end.",
    extra: <ApprovalMatrix />,
    subs: [
      {
        id: "approval-field",
        num: "04.1",
        title: "The Approval Field: configurable approvers, contingent stages, automation on approve",
        lede: "Approvers can be specific users, roles, participants, or pulled from a field. The requester can be blocked from approving. Multi-stage sign-offs are contingent. Fields, sections, or the whole checklist can lock on request, approval, or rejection. Automations fire on each event.",
        src: "/stack-fragments/approval-config.html",
        frameHeight: 520,
      },
      {
        id: "disposition-approval",
        num: "04.2",
        title: "The NC disposition approval, in action",
        lede: "After investigation, the disposition action is filed and its Verification Approval requested. The approver signs off — verified by, verified on, with a unique signature ID — and the associated CAR is bound to the NC at the same moment. Six months later, every part of the decision is retrievable in one place.",
        src: "/stack-fragments/approval-modal.html",
        frameHeight: 720,
      },
    ],
  },

  // ===================== LAYER 05 — the dashboard, recast ==============
  {
    id: "dashboards",
    num: "05",
    scope: "Dashboard layer",
    name: "Quality Manager: open NCs, live",
    heroTitle: "Management stops watching a report. It watches the time between the steps shrink.",
    heroLede: (
      <p>
        Every customer described the same management problem: open NCs, severity,
        cycle time, supplier performance — assembled by hand, monthly, always
        stale. Unifize replaces the report with a live view built from the same
        records that produced the work, so the wait that used to hide between the
        steps is now something management can see and act on.
      </p>
    ),
    heroSrc: "/stack-fragments/dash-quality-manager.html",
    heroFrameHeight: 740,
    uniqueClaim: "The dashboard is the records, not a report on them. Open the row, land on the live record.",
    subs: [],
  },

  // ===================== LAYER 06 — the payoff (inverse + proof) =======
  {
    id: "outcome",
    num: "06",
    scope: "Outcome",
    name: "The work stays, the waiting goes",
    heroTitle: "The work stays. The waiting goes.",
    heroLede: (
      <p>
        Return to the cycle you started with. The named steps are unchanged — the
        same people still review, decide, and sign off. What collapses is the
        swarm between them: the status-chasing, the handoff waits, the
        end-of-process scramble. That is the compression, and it is measurable.
      </p>
    ),
    heroSrc: "",
    heroFrameHeight: 0,
    uniqueClaim: "Other tools digitize the process you have. Unifize compresses the process itself.",
    extra: (
      <div className="stk-extra">
        <ChartFrame id="06.A" label="The Same Cycle, Compressed" aside="Before / after">
          <CompressBar />
        </ChartFrame>
        <ChartFrame id="06.B" label="Proof · Real Before and After" aside="Five years of customer data">
          <ProofBlock />
        </ChartFrame>
      </div>
    ),
    subs: [],
  },
];

export default function TheStackV2Page() {
  return (
    <main className="stk-page">
      <section className="stk-hero">
        <div className="stk-intro">
          <div className="stk-intro-grid">
            <div className="stk-doc-mark">
              <span className="stk-doc-mark-name">Unifize / The Stack</span>
              <span className="stk-doc-mark-addr">
                One workflow, walked from the inside out.
                <br />
                Bottom-up, six layers.
              </span>
            </div>

            <h1 className="stk-intro-title">
              Other tools digitize your process.{" "}
              <span className="stk-mark">Unifize compresses it.</span>
            </h1>

            <p className="stk-intro-lede">
              One non-conformance, walked from the record outward. A handful of
              named steps hides the real swarm of messages, handoffs, and waiting
              — the coordination tax. This page shows that swarm, then compresses
              it. Every product section below is a screen from the platform.
            </p>

            <nav className="stk-toc" aria-label="On this page">
              {LAYERS.map((l, i) => (
                <a key={l.id} href={`#${l.id}`} className="stk-toc-row">
                  <span className="stk-toc-num">{l.num}</span>
                  <span className="stk-toc-name">{l.name}</span>
                  <span className="stk-toc-scope">{l.scope}</span>
                  <span className="stk-toc-page">p.{String(i + 1).padStart(2, "0")}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
        <Breaker />
      </section>

      {LAYERS.map((layer) => (
        <section key={layer.id} id={layer.id} className="stk-layer">
          <div className="stk-layer-grid">
            <header className="stk-layer-band">
              <span className="stk-layer-num">{layer.num}</span>
              <span className="stk-layer-scope">{layer.scope}</span>
              <span className="stk-layer-name">{layer.name}</span>
            </header>

            <h2 className="stk-hero-title">{layer.heroTitle}</h2>
            <div className="stk-hero-lede">{layer.heroLede}</div>
            <p className="stk-claim">{layer.uniqueClaim}</p>

            {layer.extra}

            {layer.heroSrc && (
              <Screen src={layer.heroSrc} title={`${layer.name} hero`} height={layer.heroFrameHeight} />
            )}

            {layer.subs.length > 0 && (
              <div className="stk-breakdown">
                {layer.subs.map((sub) => (
                  <article key={sub.id} id={`${layer.id}-${sub.id}`} className="stk-sub">
                    <span className="stk-sub-num">{sub.num}</span>
                    <h3 className="stk-sub-title">{sub.title}</h3>
                    <p className="stk-sub-lede">{sub.lede}</p>
                    <Screen src={sub.src} title={sub.title} height={sub.frameHeight} />
                  </article>
                ))}
              </div>
            )}

            {layer.after}
          </div>
        </section>
      ))}
    </main>
  );
}
