import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The industry drill: Medical Devices → Domains → Quality → NCR → Approvals",
  description:
    "The companion to the Domain drill, run from the other axis. Start at an Industry (Medical Devices), open the Domains a med-device customer engages, narrow to one (Quality), then drill to the same Module and Feature the Domain path lands on. Two paths, one product surface.",
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
  // ===================== LAYER 01 · INDUSTRY =====================
  {
    id: "medical-devices",
    num: "01",
    scope: "Industry",
    name: "Medical Devices",
    heroTitle: "Start at the industry, not the product.",
    heroLede: (
      <p>
        Medical Devices is a Phase 1 Listed industry at Advocacy proof
        maturity, the strongest claim Unifize can carry today. The
        recognisable shape is a Class II device OEM or CDMO under FDA 21 CFR
        820, ISO 13485, and EU MDR. The industry path starts here, with the
        buyer's world, and drills down into the product. It is the companion
        to the Domain drill, which starts at Quality and arrives at the same
        place from the other axis.
      </p>
    ),
    heroSrc: "/stack-fragments/buyer-card.html",
    heroFrameHeight: 380,
    pageIntent:
      "Industry-led entry. The vertical the recognition test anchors on. Highest proof maturity of the eight Active industries.",
    uniqueClaim:
      "The regulatory frame of the vertical is runtime context for every record, not a binder assembled at the end.",
    accent: "#0052FF",
    subs: [
      {
        id: "regs",
        num: "01.1",
        title: "The vertical's regulatory frame",
        lede: "FDA 21 CFR 820, ISO 13485, and EU MDR are the standards a med-device buyer recognises. In Unifize they sit inline on every NC, CAPA, and change record, not in a separate compliance binder.",
        src: "/stack-fragments/regulations.html",
        frameHeight: 240,
      },
    ],
  },

  // ===================== LAYER 02 · INDUSTRY × DOMAINS =====================
  {
    id: "domains",
    num: "02",
    scope: "Industry × Domains",
    name: "The Domains a med-device customer opens",
    heroTitle: "One industry, six Domains.",
    heroLede: (
      <p>
        A med-device advocacy customer engages Unifize across six of the
        fourteen active Domains: Quality, Product Development, Operations,
        Supplier Management, Document and Records Control, and Regulatory
        Affairs. The
        industry path shows breadth first, then narrows. There is no fixed
        entry hierarchy: which Domain opens the deal depends on the trigger
        event, but Quality is the most common door for this vertical.
      </p>
    ),
    heroSrc: "/stack-fragments/domain-breadth.html",
    heroFrameHeight: 230,
    pageIntent:
      "The breadth layer unique to the industry path. Where the industry intersects the Domain taxonomy before the drill narrows to one Domain.",
    uniqueClaim:
      "Same customer, multiple buyer doors. Land through one Domain, expand through the others on the same record graph.",
    accent: "#0052FF",
    subs: [
      {
        id: "which-domain",
        num: "02.1",
        title: "Narrowing to Quality",
        lede: "Quality is the most common entry for Medical Devices, but the buying committee is assembled by the account, not prescribed by Unifize. From here the drill follows Quality down to a single approval.",
        src: "/stack-fragments/quality-industries.html",
        frameHeight: 240,
      },
    ],
  },

  // ===================== LAYER 03 · INDUSTRY × DOMAIN =====================
  {
    id: "quality-for-med-devices",
    num: "03",
    scope: "Industry × Domain",
    name: "Quality for Medical Devices",
    heroTitle: "Your QMS captures the answer. Unifize captures the journey.",
    heroLede: (
      <p>
        This is the layer where the industry path and the Domain path meet.
        Quality teams run on systems of record (MasterControl, Veeva, ETQ,
        Qualio, Greenlight Guru, the mix varies by vertical) that own the
        closed CAPA and the resolved deviation. None of them capture the
        handoffs, approval cycles, and evidence items that produced the
        record. That gap is the coordination tax.
      </p>
    ),
    heroSrc: "/stack-fragments/quality-gap-visual.html",
    heroFrameHeight: 620,
    pageIntent:
      "The convergence layer. The same Industry × Domain surface the Domain drill reaches as its Layer 02, arrived at here from the industry axis.",
    uniqueClaim:
      "Unifize is the coordination layer between the QMS and the channels that work happens in.",
    accent: "#0052FF",
    subs: [
      {
        id: "modules",
        num: "03.1",
        title: "Modules inside the Quality Domain",
        lede: "Each row is a configurable Module (supply-side, builder vocabulary) that satisfies one or more Themes (demand-side, buyer vocabulary). NCR is the one we drill into for this slice.",
        src: "/stack-fragments/quality-modules.html",
        frameHeight: 320,
      },
    ],
  },

  // ===================== LAYER 04 · MODULE =====================
  {
    id: "ncr",
    num: "04",
    scope: "Module",
    name: "Non-conformances · NCR for Med Devices",
    heroTitle: "The NCR module, where the work and the record are the same surface.",
    heroLede: (
      <p>
        From either path you land on the same Module. An NCR in Unifize is
        not a form you fill in after the work. It is the conversation the
        work happens in, with the regulatory schema in the right rail and the
        decisions, evidence, and approvals bound to the chat as they happen.
        Below, one NC walked through the module across four moments in time:
        raised, contained, committed, closed. Same record, growing.
      </p>
    ),
    heroSrc: "/stack-fragments/ncr-surfaces.html",
    heroFrameHeight: 740,
    pageIntent:
      "The NCR module for Class II medical devices. Identical to the Domain drill's module layer. This is the proof that two entry paths converge on one product surface.",
    uniqueClaim:
      "The module is a conversation, not a form. The right-rail schema and the working chat are one surface.",
    accent: "#0052FF",
    subs: [
      {
        id: "opens",
        num: "04.1",
        title: "Day 1, 09:14 · Conversation opens",
        lede: "An inspector posts the failure into a fresh record. One message, one attachment, one classification waiting. The chat is the record, from the first second.",
        src: "/stack-fragments/chat-state-1-open.html",
        frameHeight: 540,
        callout:
          "How Unifize is unique · The record starts as a conversation, not as a form. The right rail is the schema for this record type (an NCR); a document or training would show a different rail. Same shell.",
      },
      {
        id: "grows",
        num: "04.2",
        title: "Day 1, 09:43 · Conversation grows",
        lede: "Twenty-nine minutes in. The QA Manager classifies and assigns from inside the chat. The mfg engineer posts containment with the hold-tag bound at the moment of the action. A system event records the supplier SCAR opening.",
        src: "/stack-fragments/chat-state-2-grow.html",
        frameHeight: 560,
        callout:
          "How Unifize is unique · The containment evidence is bound at the moment of action, not assembled retrospectively. The right rail fills in as the chat grows; no separate update step.",
      },
      {
        id: "commits",
        num: "04.3",
        title: "Day 1, 11:02 · Decision commits to the Thread",
        lede: "Two hours after the event, the disposition decision lands. The mfg engineer posts the rationale with the regulatory cite inline. The QA Manager approves in conversation. The Unifize Assistant emits the structured update as a card in the chat itself.",
        src: "/stack-fragments/chat-state-3-commit.html",
        frameHeight: 620,
        callout:
          "How Unifize is unique · The Assistant card is the commit point. The same conversation that produced the decision is the conversation that records it. ISO 13485 §8.3 cite (21 CFR 820 QMSR), evidence, approver, cross-record links, all on one card, all on the Thread.",
      },
      {
        id: "closes",
        num: "04.4",
        title: "Day 7, 16:18 · Closure is an outcome of the work",
        lede: "A week later. CAR-41 ran in its own chat, effectiveness verified, closed back to NC-25 by bidirectional binding. The Assistant emits the closure card. Five sections done on the right rail. The audit packet is one click, 1,284 records, because the conversation was the audit trail all along.",
        src: "/stack-fragments/chat-state-4-close.html",
        frameHeight: 560,
        callout:
          "How Unifize is unique · Closure is not a final form to fill in. It is the natural endpoint of a conversation that bound everything as it happened. The chat becomes the audit packet because the chat was the work.",
      },
    ],
  },

  // ===================== LAYER 05 · FEATURE =====================
  {
    id: "approvals",
    num: "05",
    scope: "Feature",
    name: "Approval workflows",
    heroTitle: "The approval is a commit point on a Thread, not a checkbox.",
    heroLede: (
      <p>
        The bottom of both drills. Inside the NCR module, an approval gate is
        the moment a decision is bound to the record. The screens below show
        how the gate captures rationale, evidence, decision authority, and
        cross-system references, and what happens when the channels (email,
        Slack, Teams, WhatsApp) feed into it.
      </p>
    ),
    heroSrc: "/stack-fragments/approval-modal.html",
    heroFrameHeight: 700,
    pageIntent:
      "Feature surface inside the NCR module. The deepest layer of the industry drill, identical to the Domain drill's feature layer.",
    uniqueClaim:
      "Decision authority, evidence, and rationale are bound at the moment of approval, not assembled at the end.",
    accent: "#0052FF",
    subs: [
      {
        id: "thread",
        num: "05.1",
        title: "The governed Thread is the durable trace",
        lede: "Channels (email, Slack, Teams, WhatsApp) feed into the Thread. The Thread is what FDA reads. Decisions, approvals, evidence, and links all live there: attributed, in order, recoverable.",
        src: "/chat.html",
        frameHeight: 720,
        callout:
          "How Unifize is unique · Six months later, the rationale for an approved disposition is discoverable on the Thread. A traditional QMS captures that the CAPA closed; Unifize captures how the decision was reached.",
      },
      {
        id: "cross-system",
        num: "05.2",
        title: "Cross-system / cross-org references are bound",
        lede: "The NCR touches the QMS, ERP (lot/batch), PLM (DHR), and a supplier portal. Unifize binds those references at the moment of decision, and pushes resolved payloads back to each system of record.",
        src: "/stack-fragments/approval-cross-system.html",
        frameHeight: 420,
        callout:
          "How Unifize is unique · Email-relay coordination between systems is replaced by a Thread that holds the references and pushes the resolved approval back. Context flows in, approved outcomes flow back.",
      },
    ],
  },
];

export default function TheStackMedicalDevicesPage() {
  return (
    <main className="stk-page">
      <header className="stk-intro">
        <div className="stk-intro-inner">
          <div className="stk-eyebrow">The industry drill</div>
          <h1 className="stk-h1">
            Medical Devices, down to one approval.<br />The other axis.
          </h1>
          <p className="stk-lede">
            The companion to the Domain drill. This one starts at an Industry
            (Medical Devices), opens the Domains a med-device customer engages,
            narrows to one (Quality), then drills to the same Module
            (Non-conformances) and Feature (Approval workflows) the Domain
            path lands on. Two paths, one product surface. The convergence is
            the point: a buyer who enters through their industry and a buyer
            who enters through their Domain arrive at the same screen.
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
          {/* Hero */}
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

          {/* Hero screen */}
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

          {/* Breakdown: each sub is a platform screen with a tight commentary */}
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
          <div className="stk-foot-eyebrow">End of drill</div>
          <p>
            Five layers, run from the industry axis. Medical Devices is the
            industry. The six Domains are the breadth. Quality is the Domain
            the drill narrows to. Non-conformance is the module. Approval
            workflows inside the NCR module is the feature. The Domain drill
            and this industry drill meet at the Module layer and stay merged
            to the bottom. The aggregate Dashboard layer is shared with the
            Domain drill. At every layer, the answer to <em>how is Unifize
            different here</em> is on the screen, not in the copy.
          </p>
        </div>
      </footer>
    </main>
  );
}
