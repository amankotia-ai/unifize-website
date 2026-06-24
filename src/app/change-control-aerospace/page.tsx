import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The five-layer drill — Change Control → Aerospace → ECO → CCB → Dashboards",
  description:
    "Five layers of Change Control for Aerospace, shown on the Unifize platform. From the PLM-vs-channels gap down to a closed ECO with Boeing concurrence and zero mixed-revision risk.",
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
  pageIntent: string;
  uniqueClaim: string;
  accent: string;
  subs: Sub[];
};

const LAYERS: Layer[] = [
  // ===================== LAYER 01 =====================
  {
    id: "change-control",
    num: "01",
    scope: "Domain",
    name: "Change Control",
    heroTitle: "PLM captures the revision. Unifize captures the review.",
    heroLede: (
      <p>
        Engineering change orders enter a review loop that spans Quality,
        Engineering, Regulatory, and Manufacturing. Three to six weeks of
        bouncing comments between email, Teams, and shared drives. PLM sees
        the approved revision when it lands — it never sees the work that
        produced it. That gap is the change-control coordination tax.
      </p>
    ),
    heroSrc: "/cc-aero-fragments/cc-gap-visual.html",
    heroFrameHeight: 620,
    pageIntent:
      "Thesis-led Change Control landing — the routing layer of the buyer journey slice.",
    uniqueClaim:
      "Unifize is the coordination layer between the PLM and the cross-functional review that produces the approved revision.",
    accent: "#0052FF",
    subs: [
      {
        id: "modules",
        num: "01.1",
        title: "Seven change types inside Change Control",
        lede: "Each one is a module surface in the product. ECO is the one Ben asked us to anchor on for aerospace — it&apos;s the deepest because everything else (ECN, DCN, MCO) is downstream propagation.",
        src: "/cc-aero-fragments/cc-modules.html",
        frameHeight: 280,
      },
      {
        id: "industries",
        num: "01.2",
        title: "Four industries intersect Change Control",
        lede: "Aerospace is the anchor ICP — configuration management is the #1 audit-finding source and NADCAP special-process changes carry a 90-day re-qualification clock.",
        src: "/cc-aero-fragments/cc-industries.html",
        frameHeight: 240,
      },
    ],
  },

  // ===================== LAYER 02 =====================
  {
    id: "aerospace",
    num: "02",
    scope: "Industry × Domain",
    name: "Change Control for Aerospace",
    heroTitle: "AS9100 §8.5.6 + FAA Part 21. The auditors lean in here.",
    heroLede: (
      <p>
        VP Engineering or Director of Configuration Management at a Tier-1
        aerospace supplier or OEM. AS9100D §8.5.6 requires <em>documented
        evaluation, approval, and traceability</em> for every change. NADCAP
        special-process changes can revoke accreditation in 90 days. Prime
        customer concurrence (Boeing, Lockheed, Airbus) is its own gate
        outside your control.
      </p>
    ),
    heroSrc: "/cc-aero-fragments/aero-buyer-card.html",
    heroFrameHeight: 460,
    pageIntent:
      "Anchor ICP page for Aerospace. The recognition test for VP Engineering and Configuration Manager.",
    uniqueClaim:
      "Regulatory frame + customer queue + supplier portal — all bound to the change at the moment of decision, not assembled at the end.",
    accent: "#0052FF",
    subs: [
      {
        id: "regs",
        num: "02.1",
        title: "Regulatory frame as runtime context",
        lede: "AS9100 §8.5.6, NADCAP, FAA Part 21, EASA Part 21. Each cite appears next to the gate it governs — not in a separate compliance binder.",
        src: "/cc-aero-fragments/aero-regulations.html",
        frameHeight: 270,
      },
      {
        id: "breadth",
        num: "02.2",
        title: "Six of fifteen domains — same aerospace customer",
        lede: "Aerospace customers engage Unifize across Change Control, Configuration Management, Quality, Supplier Quality, Doc &amp; Records, and NPI / Design.",
        src: "/cc-aero-fragments/aero-domain-breadth.html",
        frameHeight: 260,
      },
    ],
  },

  // ===================== LAYER 03 =====================
  {
    id: "eco",
    num: "03",
    scope: "Module",
    name: "Engineering Change Order · ECO",
    heroTitle: "Change velocity with control. Cut-in discipline. No mixed-revision escapes.",
    heroLede: (
      <p>
        The Engineering Program Manager's working surface. Open ECOs
        prioritised by classification (Class I / II / III). Customer queues,
        FAA notification status, supplier impact, NADCAP scope — all on the
        row, without opening the record. The four screens below walk the
        ECO from raised to bound in the platform.
      </p>
    ),
    heroSrc: "/cc-aero-fragments/eco-home.html",
    heroFrameHeight: 760,
    pageIntent:
      "The Engineering Program Manager's primary workspace. Anchor module for aerospace change control.",
    uniqueClaim:
      "End-to-end visibility across the cross-functional review — not just the engineering scope.",
    accent: "#0052FF",
    subs: [
      {
        id: "step-1",
        num: "03.1",
        title: "Step 1 — Identify &amp; classify",
        lede: "Class I / II / III set immediately. Source records (NC, CAR, supplier SCN) bound to the ECO at creation. Unifize pre-computes the downstream propagation list before the operator clicks save.",
        src: "/cc-aero-fragments/eco-classify.html",
        frameHeight: 740,
        callout:
          "How Unifize is unique · The classification, the source records, and the propagation list are bound at minute one. No coordinator triage between functions.",
      },
      {
        id: "step-2",
        num: "03.2",
        title: "Step 2 — Evaluate impact",
        lede: "Form / Fit / Function evaluated by each function&apos;s owner. Propagation auto-tracked across PLM / ERP / LMS / Doc Control / Supplier. Regulatory pathway (FAA Part 21.95) computed inline.",
        src: "/cc-aero-fragments/eco-evaluate.html",
        frameHeight: 740,
        callout:
          "How Unifize is unique · Every dependent record — drawing, BoM, work instruction, training, supplier spec — is identified and its propagation tracked. Mixed-revision risk surfaces before the change is approved, not after the escape.",
      },
      {
        id: "step-3",
        num: "03.3",
        title: "Step 3 — CCB review &amp; approve",
        lede: "The Change Control Board votes inline. Each vote — approve, approve-with-conditions, reject — is bound to the Thread with rationale and the evidence reviewed. AS9100 §8.5.6 trace is the vote itself.",
        src: "/cc-aero-fragments/eco-ccb-review.html",
        frameHeight: 740,
        callout:
          "How Unifize is unique · CCB minutes ARE the Thread. The 'design review without durable records' failure mode disappears — six months later, the rationale of every vote is discoverable on the record.",
      },
      {
        id: "step-4",
        num: "03.4",
        title: "Step 4 — Cut-in &amp; verify",
        lede: "Effective date, first effective lot, in-flight WIP hold — all locked at CCB. Cut-over is gated on every dependent record reaching the new state. Boeing concurrence and FAI both bound to the closure.",
        src: "/cc-aero-fragments/eco-cutin-verify.html",
        frameHeight: 740,
        callout:
          "How Unifize is unique · Mixed-revision risk = zero. Cut-over only fires when every dependent record (drawing, work instruction, training, supplier, FAI) has reached the new state. The audit packet is auto-assembled.",
      },
    ],
  },

  // ===================== LAYER 04 =====================
  {
    id: "ccb",
    num: "04",
    scope: "Feature",
    name: "CCB approval workflows",
    heroTitle: "Each CCB vote is a commit point — not a checkbox.",
    heroLede: (
      <p>
        Inside the ECO module, the Change Control Board gate is where the
        cross-functional review becomes a decision. Five voters, each with
        a domain — Engineering, Quality, Manufacturing, Supply Chain, plus
        the chair. The screens below show the gate captured as a commit
        point on the Thread, with evidence, rationale, and prime customer
        concurrence all bound at that moment.
      </p>
    ),
    heroSrc: "/cc-aero-fragments/ccb-approval-modal.html",
    heroFrameHeight: 760,
    pageIntent:
      "Feature surface inside ECO. The cross-functional decision gate that produces the approved revision.",
    uniqueClaim:
      "Each voter commits decision authority, rationale, and conditions to the Thread. That commit is the AS9100 §8.5.6 trace.",
    accent: "#0052FF",
    subs: [
      {
        id: "thread",
        num: "04.1",
        title: "The governed Thread is the durable trace",
        lede: "Channels (email, Teams, Webex, customer portal) feed into the Thread. The Thread holds the decision moment — every CCB vote, every condition, every piece of evidence reviewed.",
        src: "/chat.html",
        frameHeight: 720,
        callout:
          "How Unifize is unique · The DHF (Design History File) gap at audit disappears — the design review IS the Thread. Reconstructing the decision trail six months later is one click, not a project.",
      },
      {
        id: "cross-system",
        num: "04.2",
        title: "Five systems · one approved revision",
        lede: "The ECO touches PLM (Windchill), ERP (SAP S/4), the customer portal (Boeing), and the supplier portal (Atlas). Unifize binds those references at the moment of CCB approval — and pushes the resolved revision back.",
        src: "/cc-aero-fragments/ccb-cross-system.html",
        frameHeight: 440,
        callout:
          "How Unifize is unique · Email-relay between PLM / ERP / customer portal / supplier portal is replaced by a Thread that holds the references and pushes the resolved revision back to each system of record.",
      },
    ],
  },

  // ===================== LAYER 05 =====================
  {
    id: "dashboards",
    num: "05",
    scope: "Dashboard layer",
    name: "Live posture — Config, VP, Audit",
    heroTitle: "Management's view is a live record, not a Monday slide.",
    heroLede: (
      <p>
        Open ECOs by program, class, owner, customer queue, mixed-revision
        risk — assembled manually today, usually monthly, always stale.
        Unifize replaces the report with a live posture surface. Three
        role-shaped dashboards below, all running on the same record graph
        that produced the change.
      </p>
    ),
    heroSrc: "/cc-aero-fragments/dash-config-manager.html",
    heroFrameHeight: 760,
    pageIntent:
      "Dashboard layer · the aggregate view of everything the four lower layers produce — for the Configuration Manager, VP Engineering, and the audit-readiness owner.",
    uniqueClaim:
      "The dashboard IS the records. Click a row, land on the Thread. No exporting; no slide builds.",
    accent: "#0B8A5C",
    subs: [
      {
        id: "config-dash",
        num: "05.1",
        title: "Configuration Manager · open ECOs across all programs",
        lede: "Heatmap of program × class. Stage funnel showing exactly where ECOs sit. Mixed-revision risk monitored live with in-flight WIP audit.",
        src: "/cc-aero-fragments/dash-config-manager.html",
        frameHeight: 760,
        callout:
          "How Unifize is unique · Baseline integrity is a live signal. Holds-missing on in-flight WIP is the early warning for a mixed-revision escape — surfaced before it happens, not after.",
      },
      {
        id: "vp-dash",
        num: "05.2",
        title: "VP Engineering · six-domain posture",
        lede: "Change Control, Configuration Mgmt, Quality, Supplier Quality, Doc &amp; Records, NPI — all six in one view. Customer queues (Boeing, Lockheed, Airbus) visible with average dwell time.",
        src: "/cc-aero-fragments/dash-vp-engineering.html",
        frameHeight: 760,
        callout:
          "How Unifize is unique · Customer-portal dwell time stops being invisible. The VP sees where ECOs sit outside Unifize control — and can drive the cross-functional readiness that closes the gap.",
      },
      {
        id: "audit-dash",
        num: "05.3",
        title: "AS9100 / NADCAP / FAA · audit-readiness today",
        lede: "AS9100 §8.5.6 clause coverage. NADCAP special-process re-qualification clock (the 90-day risk). Open gaps as a next-step list with owners.",
        src: "/cc-aero-fragments/dash-as9100-audit.html",
        frameHeight: 760,
        callout:
          "How Unifize is unique · The 90-day NADCAP clock starts the moment a special process changes — and the dashboard knows. Audit posture isn&apos;t a periodic project; it&apos;s the resting state of the system.",
      },
    ],
  },
];

export default function ChangeControlAerospacePage() {
  return (
    <main className="stk-page">
      <header className="stk-intro">
        <div className="stk-intro-inner">
          <div className="stk-eyebrow">The five-layer drill · Aerospace edition</div>
          <h1 className="stk-h1">
            Change Control, down to one ECO.<br />Shown on the platform.
          </h1>
          <p className="stk-lede">
            A Domain (Change Control) opens onto an Industry × Domain
            (Aerospace), which opens onto a Module (Engineering Change
            Order), which opens onto a Feature (CCB approval workflows),
            which lands on the aggregate Dashboard layer. Five layers —
            every layer is a live screen from the product.
          </p>
          <nav className="stk-toc" aria-label="On this page">
            {LAYERS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="stk-toc-item">
                <span className="stk-toc-num">{l.num}</span>
                <span className="stk-toc-scope">{l.scope}</span>
                <span className="stk-toc-name">{l.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {LAYERS.map((layer) => (
        <section
          key={layer.id}
          id={layer.id}
          className="stk-layer"
          style={{ ["--layer-accent" as string]: layer.accent }}
        >
          <div className="stk-hero">
            <div className="stk-hero-spine">
              <div className="stk-layer-num">{layer.num}</div>
              <div className="stk-layer-meta">
                <div className="stk-layer-scope">Layer {layer.num} · {layer.scope}</div>
                <h2 className="stk-layer-name">{layer.name}</h2>
                <div className="stk-page-intent">
                  <div className="stk-page-intent-label">Page intent</div>
                  <div className="stk-page-intent-text">{layer.pageIntent}</div>
                </div>
                <div className="stk-unique">
                  <div className="stk-unique-label">What's unique here</div>
                  <div className="stk-unique-text">{layer.uniqueClaim}</div>
                </div>
              </div>
            </div>
            <div className="stk-hero-copy">
              <h3 className="stk-hero-title">{layer.heroTitle}</h3>
              <div className="stk-hero-lede">{layer.heroLede}</div>
            </div>
          </div>

          <div className="stk-screen">
            <div className="stk-screen-chrome">
              <span className="stk-screen-dots">
                <span /><span /><span />
              </span>
              <span className="stk-screen-title">
                unifize · layer-{layer.num.toLowerCase()} · {layer.name.toLowerCase()}
              </span>
              <span className="stk-screen-live">
                <span className="stk-screen-live-dot" />Live
              </span>
            </div>
            <iframe
              src={layer.heroSrc}
              title={`${layer.name} hero`}
              className="stk-screen-frame"
              style={{ height: `${layer.heroFrameHeight}px` }}
              loading="lazy"
            />
          </div>

          {layer.subs.length > 0 && (
            <div className="stk-breakdown">
              {layer.subs.map((sub) => (
                <article
                  key={sub.id}
                  id={`${layer.id}-${sub.id}`}
                  className="stk-sub"
                >
                  <header className="stk-sub-head">
                    <span className="stk-sub-num">{sub.num}</span>
                    <div>
                      <h4
                        className="stk-sub-title"
                        dangerouslySetInnerHTML={{ __html: sub.title }}
                      />
                      <p
                        className="stk-sub-lede"
                        dangerouslySetInnerHTML={{ __html: sub.lede }}
                      />
                    </div>
                  </header>
                  <div className="stk-sub-screen">
                    <div className="stk-screen-chrome stk-screen-chrome-sm">
                      <span className="stk-screen-dots">
                        <span /><span /><span />
                      </span>
                      <span className="stk-screen-title">
                        unifize · {sub.num.toLowerCase()}
                      </span>
                    </div>
                    <iframe
                      src={sub.src}
                      title={sub.title}
                      loading="lazy"
                      style={{ height: `${sub.frameHeight}px` }}
                    />
                  </div>
                  {sub.callout && (
                    <div
                      className="stk-callout"
                      dangerouslySetInnerHTML={{ __html: sub.callout }}
                    />
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      ))}

      <footer className="stk-foot">
        <div className="stk-foot-inner">
          <div className="stk-foot-eyebrow">End of drill · Aerospace edition</div>
          <p>
            Five layers. One drill. Change Control is the domain. Aerospace
            is the industry. ECO is the module. The Change Control Board is
            the feature. The Dashboard layer is the aggregate read. At
            every layer, the answer to <em>how is Unifize different here</em>{" "}
            is on the screen — not in the copy.
          </p>
        </div>
      </footer>
    </main>
  );
}
