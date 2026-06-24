import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical device quality, from non-conformance to an audit-ready close | Unifize",
  description:
    "For Class II and III medical device manufacturers under FDA 21 CFR 820, ISO 13485, and EU MDR. Follow one non-conformance from your industry down to the approval that closes it, and see how Unifize captures the decision trace your QMS leaves in email, for the CAPA Investigator, Quality Manager, Document Approver, and Audit Lead.",
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

const LAYERS: Layer[] = [
  // ===================== 01 · YOUR INDUSTRY =====================
  {
    id: "medical-devices",
    num: "01",
    scope: "Your industry",
    name: "Medical Devices",
    heroTitle: "Your auditor will not ask what you decided. They will ask how.",
    heroLede: (
      <p>
        You build Class II and III devices under FDA 21 CFR 820, ISO 13485, and
        EU MDR. The risk that sets the tone for everything is a Warning Letter
        or a 483 that cites a broken trace: a CAPA closed without effectiveness
        evidence, a design change that never reached the device history record.
        Your QMS can show an investigator the answer. What it rarely shows is
        how that answer was reached, across the people and functions who reached
        it. When an investigator asks how, the reasoning is usually in inboxes
        and hallway conversations, not in the record that gets audited.
      </p>
    ),
    heroSrc: "/stack-fragments/buyer-card.html",
    heroFrameHeight: 380,
    uniqueClaim:
      "Unifize keeps the regulatory frame inline on every record, so the standard you are audited against is context for the work, not a binder assembled at the end.",
    subs: [
      {
        id: "regs",
        num: "01.1",
        title: "The standards you are measured against, on every record",
        lede: "FDA 21 CFR 820, ISO 13485, and EU MDR are not a separate compliance binder in Unifize. They sit inline on every non-conformance, CAPA, and change record, so the clause that governs a decision is in front of you at the moment you make it.",
        src: "/stack-fragments/regulations.html",
        frameHeight: 240,
      },
    ],
  },

  // ===================== 02 · WHERE YOU RUN IT =====================
  {
    id: "domains",
    num: "02",
    scope: "Where you run it",
    name: "The work a med-device quality team runs",
    heroTitle: "Quality is the front door. It is rarely the only room.",
    heroLede: (
      <p>
        Most medical device teams meet Unifize through Quality, but the same
        records run the work next door. A typical Class II manufacturer engages
        it across six areas: Quality, Change Control, Supplier Quality, Document
        and Records, New Product Introduction, and Regulatory Affairs. There is
        no fixed order. The trigger event decides which door you come through,
        and for most teams that trigger is a non-conformance, so the rest of
        this page follows Quality down to a single approval. The catch is that
        coordination does not respect the org chart: one NC pulls in suppliers,
        manufacturing, and document control, and every handoff is where the
        trace breaks.
      </p>
    ),
    heroSrc: "/stack-fragments/domain-breadth.html",
    heroFrameHeight: 230,
    uniqueClaim:
      "Land through one area and expand across the rest on the same records, with no second system to reconcile and no re-implementation.",
    subs: [
      {
        id: "which-domain",
        num: "02.1",
        title: "Most teams start with Quality",
        lede: "Quality is the most common entry for medical devices, because that is where audit pressure lands first. From here the story follows one workflow, a non-conformance, down to the approval that closes it.",
        src: "/stack-fragments/quality-industries.html",
        frameHeight: 240,
      },
    ],
  },

  // ===================== 03 · YOUR QUALITY WORKFLOW =====================
  {
    id: "quality-for-med-devices",
    num: "03",
    scope: "Your quality workflow",
    name: "Quality, where your QMS stops short",
    heroTitle: "Your QMS captures the answer. The journey to it lives in email.",
    heroLede: (
      <p>
        Your QMS, whether MasterControl, Veeva, ETQ, or Greenlight Guru, owns
        the closed CAPA and the resolved deviation. It does not own the week of
        work that produced them. That week is where your Quality Manager carries
        dozens of open decisions, your CAPA Investigator chases status across
        five inboxes, your Document Approver is asked to sign without the full
        picture, and your Audit Lead later cannot reconstruct who agreed to
        what. The disposition lands in the system; the reasoning, the
        alternatives, and the approver chain land in email. The same defect then
        closes again three months later under a new CAPA number, because the
        pattern across cases never surfaced. That gap is the coordination tax.
      </p>
    ),
    heroSrc: "/stack-fragments/quality-gap-visual.html",
    heroFrameHeight: 620,
    uniqueClaim:
      "Unifize sits as the coordination layer between your QMS and the channels the work happens in, so the reasoning is captured as part of the work instead of reconstructed after it.",
    subs: [
      {
        id: "modules",
        num: "03.1",
        title: "The work your Quality team runs every day",
        lede: "Non-conformance, CAPA, audit management, supplier quality: the modules a regulated manufacturer lives in. We follow the non-conformance, the one that touches the most people and loses the most context on the way to a close.",
        src: "/stack-fragments/quality-modules.html",
        frameHeight: 320,
      },
    ],
  },

  // ===================== 04 · INSIDE ONE NCR =====================
  {
    id: "ncr",
    num: "04",
    scope: "Inside one NCR",
    name: "One non-conformance, start to close",
    heroTitle: "The non-conformance and its record are the same conversation.",
    heroLede: (
      <p>
        Here is one non-conformance, lived end to end. In Unifize an NCR is not
        a form you fill in afterwards, it is the conversation the work happens
        in, with the 21 CFR 820 and ISO 13485 schema in the right rail and every
        decision, evidence item, and approval bound to the thread as it happens.
        Watch it across four moments: raised, contained, committed, and closed.
        The Quality Engineer, the QA Manager, and the manufacturing engineer all
        work in the same record, so the production-hold rationale and the
        disposition reasoning are captured live, not days later when a hold has
        already moved parts and the call can no longer be reconstructed.
      </p>
    ),
    heroSrc: "/stack-fragments/ncr-surfaces.html",
    heroFrameHeight: 740,
    uniqueClaim:
      "The record starts as a conversation, so the trace is complete the moment the work is done. There is nothing to reassemble.",
    subs: [
      {
        id: "opens",
        num: "04.1",
        title: "Day 1, 09:14 · The conversation opens",
        lede: "A Quality Engineer posts the failure into a fresh record. One message, one attachment, one classification waiting. The chat is the record, from the first second.",
        src: "/stack-fragments/chat-state-1-open.html",
        frameHeight: 540,
        callout:
          "The record starts as a conversation, not as a form. The right rail is the schema for this record type (an NCR); a document or training record would show a different rail. Same shell.",
      },
      {
        id: "grows",
        num: "04.2",
        title: "Day 1, 09:43 · The conversation grows",
        lede: "Twenty-nine minutes in. The QA Manager classifies and assigns from inside the chat. The manufacturing engineer posts containment with the hold tag bound at the moment of the action. A system event records the supplier SCAR opening.",
        src: "/stack-fragments/chat-state-2-grow.html",
        frameHeight: 560,
        callout:
          "This is the production-hold rationale that normally catches up days later, or never. Here the containment evidence is bound at the moment of action, not assembled retrospectively.",
      },
      {
        id: "commits",
        num: "04.3",
        title: "Day 1, 11:02 · The decision commits to the thread",
        lede: "Two hours after the event, the disposition lands. The manufacturing engineer posts the rationale with the regulatory cite inline. The QA Manager approves in conversation. The Unifize Assistant emits the structured update as a card in the chat itself.",
        src: "/stack-fragments/chat-state-3-commit.html",
        frameHeight: 620,
        callout:
          "This is the disposition reasoning that usually lives in a floor walk or an email, now on the record. The ISO 13485 §8.3 cite, the evidence, the approver, and the cross-record links are all on one card, on the thread, at the moment the decision is made.",
      },
      {
        id: "closes",
        num: "04.4",
        title: "Day 7, 16:18 · Closure is an outcome of the work",
        lede: "A week later. CAR-41 ran in its own chat, effectiveness verified, closed back to NC-25 by bidirectional binding. The Assistant emits the closure card. Five sections done on the right rail. The audit packet is one click because the conversation was the audit trail all along.",
        src: "/stack-fragments/chat-state-4-close.html",
        frameHeight: 560,
        callout:
          "Closure is not a final form to fill in. It is the natural endpoint of a conversation that bound everything as it happened, so the same defect does not quietly reopen under a new CAPA number three months later.",
      },
    ],
  },

  // ===================== 05 · THE APPROVAL GATE =====================
  {
    id: "approvals",
    num: "05",
    scope: "The approval gate",
    name: "Approvals that hold up under audit",
    heroTitle: "An approval is a decision you can defend, not a box you tick.",
    heroLede: (
      <p>
        An approval gate is the moment a decision becomes defensible. Inside the
        NCR, the approver sees the rationale, the bound evidence, the decision
        authority, and the cross-system references in one place, and approves in
        the same conversation where the work happened. For a Document Approver,
        that means signing with the full picture in front of them, an engaged
        approval that holds up under audit instead of a rubber stamp on a PDF.
      </p>
    ),
    heroSrc: "/stack-fragments/approval-modal.html",
    heroFrameHeight: 700,
    uniqueClaim:
      "Unifize binds decision authority, evidence, and rationale at the moment of approval, on the same thread, so the approval and its justification are one record.",
    subs: [
      {
        id: "thread",
        num: "05.1",
        title: "The thread is what your auditor reads",
        lede: "Channels, email, Slack, Teams, WhatsApp, feed into the thread, and the thread is the record. Decisions, approvals, evidence, and links live there: attributed, in order, recoverable. When an Audit Lead arrives, the evidence is where they look, with nothing to obstruct them.",
        src: "/chat.html",
        frameHeight: 720,
        callout:
          "Six months later, the rationale for an approved disposition is still discoverable on the thread. A traditional QMS records that the CAPA closed; Unifize records how the decision was reached.",
      },
      {
        id: "cross-system",
        num: "05.2",
        title: "Cross-system and cross-org references are bound",
        lede: "The NCR touches the QMS, ERP (lot and batch), PLM (the device history record), and a supplier portal. Unifize binds those references at the moment of decision, and pushes the resolved payloads back to each system of record.",
        src: "/stack-fragments/approval-cross-system.html",
        frameHeight: 420,
        callout:
          "Email-relay coordination between systems is replaced by a thread that holds the references and pushes the resolved approval back. Context flows in, approved outcomes flow back.",
      },
    ],
  },

  // ===================== 06 · WHAT YOUR TEAM GETS =====================
  {
    id: "benefit",
    num: "06",
    scope: "What your team gets",
    name: "Audit-ready, by the time you need it",
    heroTitle: "The audit trail builds itself, so the dashboard is always true.",
    heroLede: (
      <p>
        Because the journey was captured as the work happened, the numbers your
        team runs on are computed from the records themselves, never
        reassembled. The Quality Manager opens a live view of every pending
        non-conformance by owner and severity. Nothing was exported, nothing was
        chased. The handoffs, gates, and weeks at risk of a single NC collapse
        into a record that is already true. The payoff is different for each
        role, and every role gets it from the same surface.
      </p>
    ),
    heroSrc: "/stack-fragments/dash-quality-manager.html",
    heroFrameHeight: 680,
    uniqueClaim:
      "The benefit is not a claim on a slide. It is a dashboard computed from the records, audit-ready by construction, because the conversation was the audit trail.",
    subs: [
      {
        id: "capa-investigator",
        num: "06.1",
        title: "The CAPA Investigator closes a defensible record, not a status chase",
        lede: "For the Quality Engineer or CAPA Investigator, the payoff is the disappearance of status-chasing and reconciliation. Every clause is auto-checked against FDA 21 CFR 820 and ISO 13485, evidence is bound at the moment of decision, and the audit packet is one click. When the Audit Lead arrives, the same view is what they verify against.",
        src: "/stack-fragments/dash-audit-readiness.html",
        frameHeight: 660,
        callout:
          "Audit-readiness is a live posture, not a project. Because every decision was bound to the thread as it happened, clause coverage and the evidence inventory are already complete, and the repeat-defect pattern that used to close under a new CAPA number is now visible across cases.",
      },
      {
        id: "quality-leadership",
        num: "06.2",
        title: "The Quality Manager and VP see every decision, across every domain",
        lede: "Up a level, the same captured trace rolls into the views leadership runs on. The Quality Manager sees every pending decision across CAPAs, change controls, and deviations. The VP of Quality sees all six domains the team engages, Quality, Change Control, Supplier Quality, Document and Records, NPI, and Regulatory Affairs, on one surface at audit-ready posture, with no exporting to slides. Land through one domain, expand across the rest.",
        src: "/stack-fragments/dash-vp-cross-domain.html",
        frameHeight: 780,
        callout:
          "The roll-up is not a separate reporting tool, it is the same records aggregated. Cross-domain posture is live because each domain's work happened on a governed thread.",
      },
    ],
  },
];

export default function TheStackMedicalDevicesPage() {
  return (
    <main className="stk-page">
      <section className="stk-hero">
        <div className="stk-intro">
          <div className="stk-intro-grid">
            <div className="stk-doc-mark">
              <span className="stk-doc-mark-name">Unifize / Medical Devices</span>
              <span className="stk-doc-mark-addr">
                A walk-through, six layers.
                <br />
                From your industry to an audit-ready close.
              </span>
            </div>

            <h1 className="stk-intro-title">
              Your QMS proves what you decided.{" "}
              <span className="stk-mark">Unifize proves how you got there.</span>
            </h1>

            <p className="stk-intro-lede">
              Built for Class II and III manufacturers under FDA 21 CFR 820, ISO
              13485, and EU MDR. Follow one workflow, a non-conformance, from the
              industry you operate in down to the single approval that closes it,
              and see how the decision trace, the part your QMS leaves in email,
              gets captured as the work happens. The people who live this every
              day, the CAPA Investigator, the Quality Manager, the Document
              Approver, and the Audit Lead, each walk away with a record they can
              defend.
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
