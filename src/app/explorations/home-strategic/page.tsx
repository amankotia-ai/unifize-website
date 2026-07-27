import type { Metadata } from "next";
import Link from "next/link";
import { MockOpsHolds } from "../home/home-mocks";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../products/dms/dms-redesign.css";
import "../home/home-kit.css";
import "./strategic-home.css";

export const metadata: Metadata = {
  title: "AI infrastructure for strategic decision-making",
  description:
    "A decision-grade AI platform for regulated leaders operating across complex, high-stakes environments.",
};

const CUSTOMERS = [
  { name: "Loopback", mark: "∞" },
  { name: "Metricbooks", mark: "◢" },
  { name: "Webstone", mark: "w" },
  { name: "Replicate", mark: "▤" },
  { name: "Kearney", mark: "" },
  { name: "Claude", mark: "✺" },
];

const LAYER_CAPABILITIES = [
  {
    index: "01",
    label: "Context",
    title: "Every signal in one decision record.",
    body: "Bring records, conversations, evidence, and owners together without replacing the systems that created them.",
    visual: ["QMS", "ERP", "PLM"],
  },
  {
    index: "02",
    label: "Coordination",
    title: "Every handoff has an owner.",
    body: "Turn cross-functional work into an accountable sequence of decisions, actions, approvals, and due dates.",
    visual: ["Assign", "Review", "Approve"],
  },
  {
    index: "03",
    label: "Intelligence",
    title: "AI grounded in operational truth.",
    body: "Summarize context, surface risk, and recommend the next move from the governed history of the work.",
    visual: ["Ask", "Reason", "Act"],
  },
];

const WORKFLOWS = [
  {
    code: "QLT",
    title: "Quality decisions",
    body: "Investigations, CAPAs, deviations, and supplier events move from signal to approved outcome.",
    href: "/explorations/domains/quality",
  },
  {
    code: "OPS",
    title: "Operational decisions",
    body: "Holds, dispositions, release decisions, and escalations stay visible across every team involved.",
    href: "/explorations/products/mes",
  },
  {
    code: "PDV",
    title: "Product decisions",
    body: "Design reviews and change orders retain the rationale, evidence, and approvals behind every revision.",
    href: "/explorations/products/plm",
  },
];

const GOVERNANCE_PILLARS = [
  {
    title: "Human accountable",
    body: "AI supports the decision. Named people remain responsible for the outcome.",
  },
  {
    title: "Evidence bound",
    body: "Every conclusion links back to the records, conversations, and approvals that support it.",
  },
  {
    title: "System connected",
    body: "Approved outcomes write back to your authoritative systems with the full decision trail intact.",
  },
];

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="1.25" />
      <path d="M3.5 9h17M7 15h4" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7.5 10 10 7.5 12.5 10M10 7.8v6.4M5.5 5.5h9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export default function StrategicHomePage() {
  return (
    <main className="sv-home">
      <div className="sv-frame">
        <header className="sv-header">
          <Link className="sv-brand" href="/explorations/home" aria-label="Unifize home">
            <img src="/logo_dark.svg" alt="Unifize" width="124" height="29" />
          </Link>

          <nav className="sv-nav" aria-label="Primary navigation">
            <Link href="/explorations/platform">
              Platform <span aria-hidden="true">+</span>
            </Link>
            <Link href="/explorations/products/dms">
              Products <span aria-hidden="true">+</span>
            </Link>
            <Link href="/explorations/industry-template-modern">
              Industries <span aria-hidden="true">+</span>
            </Link>
            <Link href="/explorations/resources">Resources</Link>
            <Link href="/coordination-tax-calculator">Pricing</Link>
          </nav>

          <div className="sv-actions">
            <Link className="sv-signin" href="/chat-anatomy">
              Sign in
            </Link>
            <Link className="sv-button sv-button--primary sv-button--small" href="#book-a-demo">
              Get started
            </Link>
          </div>
        </header>

        <div className="sv-hatch" aria-hidden="true" />

        <section className="sv-hero" aria-labelledby="strategic-home-title">
          <div className="sv-eyebrow">
            <span>Unified intelligence layer</span>
          </div>
          <h1 id="strategic-home-title">AI infrastructure for strategic decision-making</h1>
          <p>
            A decision-grade AI platform for regulated leaders operating across complex,
            high-stakes environments.
          </p>
          <div className="sv-hero__actions" id="book-a-demo">
            <Link className="sv-button sv-button--primary" href="/chat-anatomy">
              Book a demo
            </Link>
            <Link className="sv-button sv-button--secondary" href="/explorations/platform">
              View platform
            </Link>
          </div>
          <span className="sv-reassurance">
            <CardIcon />
            No credit card required
          </span>
        </section>

        <section className="sv-product" aria-label="Unifize product preview">
          <div className="sv-product__dots" aria-hidden="true" />
          <div className="sv-product-window">
            <div className="sv-product-window__bar">
              <span className="sv-product-window__brand">
                <img src="/logo_dark.svg" alt="" width="78" height="18" aria-hidden="true" />
              </span>
              <span className="sv-product-window__crumb">
                Analytics <i>/</i> <strong>Coordination intelligence</strong>
              </span>
              <span className="sv-product-window__tools" aria-hidden="true">
                <span>
                  <ShareIcon />
                  Share
                </span>
                <b>☆</b>
                <b>↗</b>
                <b>•••</b>
              </span>
            </div>
            <div className="sv-product-window__body">
              <MockOpsHolds />
            </div>
          </div>
        </section>

        <section className="sv-customers" aria-label="Customer companies">
          <p>
            Trusted by teams
            <br />
            in regulated industries
          </p>
          <div className="sv-customer-list" role="list">
            {CUSTOMERS.map((customer) => (
              <span className="sv-customer" role="listitem" key={customer.name}>
                {customer.mark ? <i aria-hidden="true">{customer.mark}</i> : null}
                {customer.name}
              </span>
            ))}
          </div>
        </section>

        <div className="sv-hatch sv-hatch--divider" aria-hidden="true" />

        <section className="sv-section sv-problem" aria-labelledby="sv-problem-title">
          <div className="sv-section__index">
            <span>01</span>
            <p>The decision gap</p>
          </div>
          <div className="sv-problem__content">
            <div className="sv-section__intro">
              <h2 id="sv-problem-title">Your systems store the facts. They do not run the decision.</h2>
              <p>
                High-stakes decisions still move through meetings, inboxes, spreadsheets, and
                disconnected records. Context fragments exactly where judgment matters most.
              </p>
            </div>

            <div
              className="sv-decision-map"
              role="img"
              aria-label="Records, conversations, and evidence converge into one governed decision with a clear owner, rationale, approval, and outcome."
            >
              <div className="sv-decision-map__bar">
                <span>Live decision view</span>
                <span>Risk review · CHG-1187</span>
                <strong>In review</strong>
              </div>
              <div className="sv-decision-map__canvas" aria-hidden="true">
                <div className="sv-decision-map__sources">
                  <span>
                    <i>01</i>
                    <b>Records</b>
                    <small>QMS · ERP · PLM</small>
                  </span>
                  <span>
                    <i>02</i>
                    <b>Conversation</b>
                    <small>Teams · Email · Meetings</small>
                  </span>
                  <span>
                    <i>03</i>
                    <b>Evidence</b>
                    <small>Files · Tests · History</small>
                  </span>
                </div>
                <div className="sv-decision-map__connector">
                  <i />
                  <span>Context reconciled</span>
                  <i />
                </div>
                <div className="sv-decision-map__decision">
                  <span className="sv-decision-map__mark">AI</span>
                  <div>
                    <small>Governed decision</small>
                    <b>Approve revision C for controlled release</b>
                    <p>Risk reviewed against affected records and production readiness.</p>
                  </div>
                  <em>Ready</em>
                </div>
                <dl className="sv-decision-map__outcomes">
                  <div>
                    <dt>Owner</dt>
                    <dd>Maya Ito</dd>
                  </div>
                  <div>
                    <dt>Rationale</dt>
                    <dd>Captured</dd>
                  </div>
                  <div>
                    <dt>Approvals</dt>
                    <dd>3 of 3</dd>
                  </div>
                  <div>
                    <dt>Write-back</dt>
                    <dd>Queued</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="sv-section sv-layer" aria-labelledby="sv-layer-title">
          <div className="sv-section__header">
            <span className="sv-section__kicker">02 · The unified layer</span>
            <div>
              <h2 id="sv-layer-title">One operating layer between signals and outcomes.</h2>
              <p>
                Unifize connects the information you already have to the cross-functional work
                required to make a defensible decision.
              </p>
            </div>
          </div>

          <div className="sv-layer__grid">
            {LAYER_CAPABILITIES.map((capability) => (
              <article className="sv-layer-card" key={capability.index}>
                <div className="sv-layer-card__top">
                  <span>{capability.index}</span>
                  <small>{capability.label}</small>
                </div>
                <div className="sv-layer-card__visual" aria-hidden="true">
                  {capability.visual.map((item, index) => (
                    <span key={item}>
                      <i>{String(index + 1).padStart(2, "0")}</i>
                      {item}
                    </span>
                  ))}
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sv-section sv-workflows" aria-labelledby="sv-workflows-title">
          <div className="sv-workflows__intro">
            <span className="sv-section__kicker">03 · Decision workflows</span>
            <h2 id="sv-workflows-title">Start with the decisions that cannot afford ambiguity.</h2>
            <p>
              Use one governed model across quality, operations, and product development while
              keeping each team&apos;s work specific to its domain.
            </p>
            <Link className="sv-button sv-button--light" href="/explorations/platform">
              Explore the platform
            </Link>
          </div>

          <div className="sv-workflow-list">
            {WORKFLOWS.map((workflow, index) => (
              <Link className="sv-workflow-row" href={workflow.href} key={workflow.code}>
                <span className="sv-workflow-row__code">{workflow.code}</span>
                <span className="sv-workflow-row__copy">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{workflow.title}</strong>
                  <p>{workflow.body}</p>
                </span>
                <span className="sv-workflow-row__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="sv-section sv-governance" aria-labelledby="sv-governance-title">
          <div className="sv-section__header">
            <span className="sv-section__kicker">04 · Decision-grade by design</span>
            <div>
              <h2 id="sv-governance-title">Intelligence leaders can inspect, trust, and govern.</h2>
              <p>
                Built for environments where the reasoning matters as much as the answer—and
                every consequential action needs a trail.
              </p>
            </div>
          </div>

          <div className="sv-governance__grid">
            {GOVERNANCE_PILLARS.map((pillar, index) => (
              <article key={pillar.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>

          <blockquote className="sv-quote">
            <p>
              “The value is not another dashboard. It is knowing that the decision, the evidence,
              and the accountable people are finally in the same place.”
            </p>
            <footer>
              <span>VP, Quality &amp; Operations</span>
              <span>Global regulated manufacturer</span>
            </footer>
          </blockquote>
        </section>

        <section className="sv-closing" aria-labelledby="sv-closing-title">
          <span className="sv-section__kicker">Make the next decision visible</span>
          <h2 id="sv-closing-title">Build strategic intelligence on operational truth.</h2>
          <p>
            See how Unifize turns fragmented cross-functional work into decisions your teams can
            act on—and your organization can defend.
          </p>
          <div>
            <Link className="sv-button sv-button--light" href="/chat-anatomy">
              Book a demo
            </Link>
            <Link className="sv-button sv-button--blue-ghost" href="/explorations/platform">
              Explore the platform
            </Link>
          </div>
        </section>

        <footer className="sv-footer">
          <div className="sv-footer__brand">
            <img src="/logo_dark.svg" alt="Unifize" width="108" height="25" />
            <p>Decision infrastructure for regulated work.</p>
          </div>
          <nav aria-label="Footer navigation">
            <div>
              <span>Platform</span>
              <Link href="/explorations/platform">Overview</Link>
              <Link href="/explorations/products/qms">Quality</Link>
              <Link href="/explorations/products/plm">Product lifecycle</Link>
            </div>
            <div>
              <span>Company</span>
              <Link href="/explorations/resources">Resources</Link>
              <Link href="/explorations/resources/case-studies">Case studies</Link>
              <Link href="/coordination-tax-calculator">Assessment</Link>
            </div>
          </nav>
          <div className="sv-footer__legal">
            <span>© 2026 Unifize</span>
            <span>Privacy · Terms · Security</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
