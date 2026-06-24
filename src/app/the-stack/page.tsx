import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality → Medical Devices → Non-conformance → Approvals → Dashboard",
  description:
    "Five layers, from a Quality Domain down to a single approval inside the Non-conformance module. Each layer leads with a screen from the product and one claim about what Unifize does differently.",
};

type Sub = {
  id: string;
  num: string;
  title: string;
  lede: string;
  src: string;
  frameHeight: number;
  callout?: string;
};

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
};

function Screen({ src, title, height }: { src: string; title: string; height: number }) {
  return (
    <figure className="stk-screen">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{ height: `${height}px` }}
      />
    </figure>
  );
}

function Breaker() {
  // Five parallel hairlines that each ride a low baseline on the left,
  // smoothly S-curve up in a cascaded zone (~x 600-1200), then settle on
  // a higher baseline on the right. Pills mark the three named stages
  // where lines arrive at their new baseline.
  // Five parallel lines that each rise the same vertical distance (~100u)
  // but begin their rise at slightly cascaded x positions, producing the
  // ribbon-wave feel.
  const lines = [
    { yStart: 210, yEnd: 110, xRise: 520, xLand: 980,  opacity: 0.65 },
    { yStart: 195, yEnd: 95,  xRise: 560, xLand: 1020, opacity: 0.58 },
    { yStart: 180, yEnd: 80,  xRise: 600, xLand: 1060, opacity: 0.52 },
    { yStart: 165, yEnd: 65,  xRise: 640, xLand: 1100, opacity: 0.46 },
    { yStart: 150, yEnd: 50,  xRise: 680, xLand: 1140, opacity: 0.4 },
  ];

  const pillsAt = [
    { id: "domain", x: 1060, y: 80, label: "DOMAIN" },
    { id: "module", x: 1100, y: 65, label: "MODULE" },
    { id: "record", x: 1140, y: 50, label: "RECORD" },
  ];

  return (
    <div className="stk-breaker" aria-hidden>
      <svg
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        className="stk-breaker-svg"
      >
        {lines.map((l, i) => {
          // Smooth S-curve: ordered control points spaced 40% in from each
          // anchor, with the first staying on the start baseline and the
          // second arriving on the end baseline. Long horizontal runs on
          // both sides emphasize the flow.
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
            <rect x="-42" y="-48" width="84" height="18" className="stk-pill" />
            <text x="0" y="-35" textAnchor="middle" className="stk-pill-text">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
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

function RegulatoryMap() {
  const rows: { code: string; section: string; names: string }[] = [
    { code: "FDA 21 CFR 820", section: "§ 820.90",  names: "Nonconforming product" },
    { code: "ISO 13485:2016", section: "§ 8.5.2",   names: "Corrective action effectiveness" },
    { code: "EU MDR",         section: "Article 83", names: "Post-market feedback into design" },
  ];
  return (
    <ChartFrame
      id="02.A"
      label="Regulatory Frame · Where 483s Land"
      aside="Class II device OEM / CDMO"
    >
      <ul className="stk-reg">
        {rows.map((r) => (
          <li key={r.code} className="stk-reg-row">
            <span className="stk-reg-code">{r.code}</span>
            <span className="stk-reg-section">{r.section}</span>
            <span className="stk-reg-names">{r.names}</span>
          </li>
        ))}
      </ul>
    </ChartFrame>
  );
}

function NcrSteps() {
  const steps = [
    { num: "01", name: "Start",        caption: "Quick Start panel" },
    { num: "02", name: "Raise",        caption: "Classify & assign" },
    { num: "03", name: "Contain",      caption: "Stop the spread" },
    { num: "04", name: "Disposition",  caption: "Bind rationale" },
    { num: "05", name: "Link CAR",     caption: "Close with CAR" },
  ];
  return (
    <ChartFrame
      id="03.A"
      label="Non-Conformance Flow · Five Steps, One Record"
      aside="Working surface = record"
    >
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
  const cols: { id: string; title: string; items: string[] }[] = [
    {
      id: "who",
      title: "Who approves",
      items: ["Specific users", "Roles", "Participants", "Pulled from a field"],
    },
    {
      id: "locks",
      title: "What locks",
      items: ["Fields", "Sections", "Checklist on request / approval / rejection"],
    },
    {
      id: "fires",
      title: "What fires on approve",
      items: ["Change status", "Add participants", "Move to next stage", "Cancel downstream"],
    },
  ];
  return (
    <ChartFrame
      id="04.A"
      label="Approval Field · Configuration Surface"
      aside="One field, three knobs"
    >
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

function GapVisual() {
  const systems = [
    { name: "MasterControl", tag: "Enterprise QMS" },
    { name: "Veeva Vault",   tag: "Life Sciences" },
    { name: "ETQ Reliance",  tag: "Discrete + Process" },
    { name: "Qualio",        tag: "Cloud QMS" },
    { name: "Greenlight Guru", tag: "21 CFR 820" },
    { name: "TrackWise",     tag: "Pharma QMS" },
  ];
  const channels = [
    { name: "Outlook · Gmail",      tag: "Email" },
    { name: "Microsoft Teams",      tag: "Chat" },
    { name: "Slack · WhatsApp",     tag: "Chat" },
    { name: "Excel · Sheets",       tag: "Sheet" },
    { name: "SharePoint · Drive",   tag: "Doc" },
    { name: "PDFs · Photos · Attachments", tag: "Evidence" },
  ];
  const tax: { count: number; label: string }[] = [
    { count: 8,  label: "Handoffs" },
    { count: 6,  label: "Approval cycles" },
    { count: 3,  label: "Meetings" },
    { count: 10, label: "Evidence items" },
  ];

  return (
    <section className="stk-gap" aria-label="The coordination gap">
      <div className="stk-gap-cols">
        <div className="stk-gap-side">
          <div className="stk-gap-eyebrow">
            <span className="stk-gap-eyebrow-num">01.A</span>
            <span>Systems of Record</span>
          </div>
          <h4 className="stk-gap-title">What the QMS captures</h4>
          <p className="stk-gap-sub">
            Sophisticated, validated, mature. Owns the closed CAPA, the
            resolved deviation, the completed audit finding.
          </p>
          <ul className="stk-gap-list">
            {systems.map((s) => (
              <li key={s.name} className="stk-gap-item">
                <span className="stk-gap-name">{s.name}</span>
                <span className="stk-gap-tag">{s.tag}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="stk-gap-side">
          <div className="stk-gap-eyebrow">
            <span className="stk-gap-eyebrow-num">01.B</span>
            <span>Channels Work Happens In</span>
          </div>
          <h4 className="stk-gap-title">Where the journey actually happens</h4>
          <p className="stk-gap-sub">
            Channels. Conversation. Effective, but ungoverned. The record
            assembled retrospectively, if at all.
          </p>
          <ul className="stk-gap-list">
            {channels.map((c) => (
              <li key={c.name} className="stk-gap-item">
                <span className="stk-gap-name">{c.name}</span>
                <span className="stk-gap-tag">{c.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="stk-gap-tax">
        <div className="stk-gap-tax-head">
          <span className="stk-gap-eyebrow">
            <span className="stk-gap-eyebrow-num">01.C</span>
            <span>Coordination Tax · Per Record</span>
          </span>
          <span className="stk-gap-tax-aside">
            Invisible to the QMS. Invisible to management.
          </span>
        </div>
        <div className="stk-gap-tax-rows">
          {tax.map((t) => (
            <div key={t.label} className="stk-gap-tax-row">
              <span className="stk-gap-tax-count">
                {String(t.count).padStart(2, "0")}
              </span>
              <span className="stk-gap-tax-label">{t.label}</span>
              <span className="stk-gap-tax-cells" aria-hidden>
                {Array.from({ length: t.count }).map((_, i) => (
                  <span key={i} className="stk-gap-tax-cell" />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="stk-gap-resolve">
        <span className="stk-mark">Unifize</span> sits between them.
        Coordination on top, the governed record below.
      </p>
    </section>
  );
}

const LAYERS: Layer[] = [
  // ===================== LAYER 01 =====================
  {
    id: "quality",
    num: "01",
    scope: "Domain",
    name: "Quality Management",
    heroTitle: "Your QMS captures what happened. Nobody captures how it happened, or what it cost.",
    heroLede: (
      <p>
        Quality teams run on sophisticated systems of record (MasterControl,
        Veeva, ETQ, Qualio, Greenlight Guru) that own the closed CAPA, the
        resolved deviation, the completed audit finding. None of them capture
        the eight handoffs, six approval cycles, three meetings, and ten
        evidence items that produced the record. The gap in the middle has a
        name and a number: coordination tax.
      </p>
    ),
    heroSrc: "",
    heroFrameHeight: 0,
    uniqueClaim:
      "Unifize is the coordination layer between the QMS and the channels that work happens in.",
    subs: [],
    extra: <GapVisual />,
  },

  // ===================== LAYER 02 =====================
  {
    id: "medical-devices",
    num: "02",
    scope: "Industry × Domain",
    name: "Quality for Medical Devices",
    heroTitle: "FDA scrutiny lands here first.",
    heroLede: (
      <p>
        VP Quality is the most common entry, but there is no fixed entry
        hierarchy: Leader, Chief AI Officer, or Quality Systems can be the
        door depending on the trigger event. The recognisable shape is a
        Class II device OEM or CDMO under FDA 21 CFR 820 (820.90 names
        nonconforming product), ISO 13485:2016 (Section 8.5.2 names
        corrective action effectiveness), and EU MDR (Article 83 names
        post-market feedback into design and manufacturing). Overdue CAPAs
        and NCs are a common 483 observation. The thesis is that this is
        a <em>coordination failure, not a quality failure</em>.
      </p>
    ),
    heroSrc: "/stack-fragments/buyer-card.html",
    heroFrameHeight: 380,
    uniqueClaim:
      "Regulatory frame as runtime context, not as a checklist you assemble at the end.",
    subs: [],
    extra: <RegulatoryMap />,
  },

  // ===================== LAYER 03 =====================
  {
    id: "ncr",
    num: "03",
    scope: "Module",
    name: "Non-conformance for Medical Devices",
    heroTitle: "The Non-conformance module, where the work and the record are the same surface.",
    heroLede: (
      <p>
        A non-conformance in Unifize is a record, not a form filled in
        after the work. The right rail names the sections (BASIC INFO,
        Disposition Action(s), Corrective Action Request, NC Completion
        Approval) and the working conversation fills them in. Five steps,
        one record: start, raise, contain, disposition, link CAR.
      </p>
    ),
    heroSrc: "/stack-fragments/ncr-surfaces.html",
    heroFrameHeight: 740,
    uniqueClaim:
      "A record, not a form. Right-rail sections fill in as the work happens, not in an end-of-process scramble.",
    extra: <NcrSteps />,
    subs: [
      {
        id: "start",
        num: "03.0",
        title: "Start: from the home screen",
        lede: "The home screen Quick Start panel opens a new Non-Conformance record in one click. Document, Non-Conformance, Change Control, and CAR are the four most-raised record types in a Quality module; the panel is the entry point for any of them.",
        src: "/stack-fragments/quick-start.html",
        frameHeight: 320,
        callout:
          "Two clicks from the floor to a filed NC. The Quick Start panel is the only fixture between detection and a structured record.",
      },
      {
        id: "raise",
        num: "03.1",
        title: "Raise: classify and assign",
        lede: "A failed inspection, a production floor defect, or a customer complaint opens an NC. Severity is set immediately (Critical, Major, or Minor) and the investigation owner is named on the record from the first moment, not the coordinator's inbox.",
        src: "/stack-fragments/chat-state-1-open.html",
        frameHeight: 540,
        callout:
          "Severity classification and named ownership are on the record before the investigation begins. The investigation task does not sit in the coordinator's inbox waiting to be assigned.",
      },
      {
        id: "contain",
        num: "03.2",
        title: "Contain: stop the spread before investigation",
        lede: "The containment action is recorded on the NC before investigation begins: quarantine, line stop, hold tag, or supplier notification. Stopping nonconforming material from spreading is on the record, not added retrospectively after the investigation report is written.",
        src: "/stack-fragments/chat-state-2-grow.html",
        frameHeight: 560,
        callout:
          "Containment is bound at the moment of action. The record carries what was done to contain the issue, when, and by whom, before any of the investigation work begins.",
      },
      {
        id: "disposition",
        num: "03.3",
        title: "Disposition: decide and bind the rationale",
        lede: "Once the investigation completes, the disposition is recorded on the NC: use-as-is, rework, scrap, or return to supplier. The Disposition Action(s) section in the right rail captures the decision, the action, the owner, and the due date. The rationale lands on the record, not in an email.",
        src: "/stack-fragments/chat-state-3-commit.html",
        frameHeight: 620,
        callout:
          "The disposition rationale is the first question an auditor asks. Six months later, that decision needs to be retrievable in under five minutes, not five days.",
      },
      {
        id: "close",
        num: "03.4",
        title: "Link the corrective action",
        lede: "The NC drives a Corrective Action record directly. The Corrective Action Request section on the right rail carries the link; a CAR record like #732 (a Failed Process Inspections SCAR) is bound to the NC here. The link is bidirectional: when the CAR validates and closes, the NC closes with it.",
        src: "/stack-fragments/chat-state-4-close.html",
        frameHeight: 560,
        callout:
          "The NC, the disposition rationale, and the corrective action that followed are one chain of records. An auditor sees all three on the same record, not three reconstructed email threads.",
      },
    ],
  },

  // ===================== LAYER 04 =====================
  {
    id: "approvals",
    num: "04",
    scope: "Feature",
    name: "Approval workflows",
    heroTitle: "The approval is where the decision binds to the record, not a checkbox.",
    heroLede: (
      <p>
        Approval workflows are a generic Unifize capability: the Approval
        Field is configurable in any process template. Inside the
        Non-conformance module, it powers the Disposition Action
        verification and the NC Completion Approval. The two sub-sections
        below show what the field configures, and what the signed approval
        looks like in action on a disposition action.
      </p>
    ),
    heroSrc: "/stack-fragments/approval-modal.html",
    heroFrameHeight: 700,
    uniqueClaim:
      "Decision authority, evidence, and rationale are bound at the moment of approval, not assembled at the end.",
    extra: <ApprovalMatrix />,
    subs: [
      {
        id: "approval-field",
        num: "04.1",
        title: "The Approval Field: configurable approvers, contingent stages, automation on approve",
        lede: "The Approval Field sits in any process template. Approvers can be specific users, roles, participants, or pulled from a field (Owner, Reviewer). The requester can be prevented from approving. Multi-stage sign-offs are configured as contingent approvals: Stage 2 waits for Stage 1. Fields, sections, or the whole checklist can be locked on Request, Approval, or Rejection. Automations fire on each event: change status, add participants, update fields, move to the next stage, cancel downstream approvals.",
        src: "/stack-fragments/approval-config.html",
        frameHeight: 520,
        callout:
          "An approval in Unifize is not a single button. It is a configurable gate with named approvers, comment requirements, locking behavior, and downstream automations. The same field powers a SOP review, a CAPA closure, and an NC disposition verification; what differs is who approves what and what fires when they do.",
      },
      {
        id: "disposition-approval",
        num: "04.2",
        title: "The NC disposition approval, in action",
        lede: "On a Non-Conformance record, the Disposition Action(s) section carries the verification approval. After investigation, the disposition action is filed (for example: #143: Action 2, PENDING, owner, due date). The Verification Approval is requested. The approver signs off: Verified by, Verified on, Approved with date and time. The signature is recorded with a unique signature ID. The Unifize Assistant logs every step in the conversation. The associated CAR record is bound to the NC at the same moment.",
        src: "/stack-fragments/approval-modal.html",
        frameHeight: 720,
        callout:
          "The signature, the timestamp, the signature ID, the conversation entry, and the CAR linkage are all bound at the moment of approval, on the record itself. Six months later, every part of the decision is retrievable in one place.",
      },
    ],
  },

  // ===================== LAYER 05 · DASHBOARD LAYER =====================
  {
    id: "dashboards",
    num: "05",
    scope: "Dashboard layer",
    name: "Quality Manager: open NCs, live",
    heroTitle: "Management's view stops being a report someone built.",
    heroLede: (
      <p>
        Every customer described the same management problem: open NCs,
        severity distribution, cycle time, and supplier performance,
        assembled manually, usually monthly, always stale. Unifize
        replaces the report with a live view, built from the same records
        that produced the work.
      </p>
    ),
    heroSrc: "/dashboard.html",
    heroFrameHeight: 740,
    uniqueClaim:
      "The dashboard is the records, not a report on them. Open the row, land on the live record.",
    subs: [
      {
        id: "qm-dash",
        num: "05.1",
        title: "Open NCs by severity, by owner, by age",
        lede: "Critical, Major, and Minor NCs in a single prioritised view. Each NC shows its associated supplier, disposition status, and whether a corrective action has been created, without opening the record. Pending non-conformances by owner and severity, as a stacked bar chart, is the workload and escalation view.",
        src: "/stack-fragments/dash-quality-manager.html",
        frameHeight: 740,
        callout:
          "No filter-building, no report assembly. The home screen is the prioritised queue. Click a row, land on the live record with the work already in it.",
      },
    ],
  },
];

export default function TheStackPage() {
  return (
    <main className="stk-page">
      <section className="stk-hero">
      <div className="stk-intro">
        <div className="stk-intro-grid">
          <div className="stk-doc-mark">
            <span className="stk-doc-mark-name">Unifize / The Stack</span>
            <span className="stk-doc-mark-addr">
              A walk-through, five layers.
              <br />
              From Quality Domain to a single approval.
            </span>
          </div>

          <h1 className="stk-intro-title">
            Non-conformance in{" "}
            <span className="stk-mark">Unifize, for medical device companies</span>{" "}
            under FDA 21 CFR 820.
          </h1>

          <p className="stk-intro-lede">
            One NC walked through the platform from raise to close: classified,
            contained, dispositioned, and linked to its corrective action. Set
            inside the Quality Domain, with a live dashboard reading above it.
            Every section below is a screen from the product.
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
              <Screen
                src={layer.heroSrc}
                title={`${layer.name} hero`}
                height={layer.heroFrameHeight}
              />
            )}

            {layer.subs.length > 0 && (
              <div className="stk-breakdown">
                {layer.subs.map((sub) => (
                  <article
                    key={sub.id}
                    id={`${layer.id}-${sub.id}`}
                    className="stk-sub"
                  >
                    <span className="stk-sub-num">{sub.num}</span>
                    <h3
                      className="stk-sub-title"
                      dangerouslySetInnerHTML={{ __html: sub.title }}
                    />
                    <p
                      className="stk-sub-lede"
                      dangerouslySetInnerHTML={{ __html: sub.lede }}
                    />
                    {sub.callout && (
                      <aside className="stk-callout">
                        <span className="stk-callout-label">
                          How Unifize is unique
                        </span>
                        <p
                          className="stk-callout-text"
                          dangerouslySetInnerHTML={{ __html: sub.callout }}
                        />
                      </aside>
                    )}
                    <Screen src={sub.src} title={sub.title} height={sub.frameHeight} />
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
