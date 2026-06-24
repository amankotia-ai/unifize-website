import type { Metadata } from "next";
import { SiteHeader } from "./site-header";
import { DomainDrift } from "./domain-drift";
import {
  Button,
  Eyebrow,
  MatrixGrid,
  type CellState,
} from "@/components/atoms";
import { Placeholder } from "@/components/molecules";
import {
  ChatShell,
  DashboardShell,
  TestimonialCarousel,
} from "@/components/organisms";

/* ------------------------------------------------------------
 * Matrix glyphs — 14 cols × 7 rows pixel-art icons.
 * Each pattern reads as a recognizable icon for the concept.
 * ------------------------------------------------------------ */

// Two-person silhouette — Meetings
const MATRIX_FRAG_MEET: CellState[] = [
  "off","off","off","on","on","off","off","off","off","off","on","on","off","off",
  "off","off","on","on","on","on","off","off","off","on","on","on","on","off",
  "off","off","on","on","on","on","off","off","off","on","on","on","on","off",
  "off","off","off","on","on","off","off","off","off","off","on","on","off","off",
  "off","on","on","on","on","on","on","off","on","on","on","on","on","off",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
];

// Spreadsheet grid — Spreadsheets
const MATRIX_FRAG_SHEETS: CellState[] = [
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
  "on","off","off","off","on","off","off","off","on","off","off","off","on","on",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
  "on","off","off","off","on","off","off","off","on","off","off","off","on","on",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
  "on","off","off","off","on","off","off","off","on","off","off","off","on","on",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
];

// Envelope — Email
const MATRIX_FRAG_EMAIL: CellState[] = [
  "off","on","on","on","on","on","on","on","on","on","on","on","on","off",
  "off","on","on","off","off","off","off","off","off","off","off","on","on","off",
  "off","on","off","on","off","off","off","off","off","off","on","off","on","off",
  "off","on","off","off","on","off","off","off","off","on","off","off","on","off",
  "off","on","off","off","off","on","off","off","on","off","off","off","on","off",
  "off","on","off","off","off","off","on","on","off","off","off","off","on","off",
  "off","on","on","on","on","on","on","on","on","on","on","on","on","off",
];

// Folder with tab — Shared folders
const MATRIX_FRAG_FOLDERS: CellState[] = [
  "off","off","on","on","on","on","on","off","off","off","off","off","off","off",
  "off","on","off","off","off","off","off","on","on","on","on","on","on","off",
  "off","on","off","off","off","off","off","off","off","off","off","off","on","off",
  "off","on","on","on","on","on","on","on","on","on","on","on","on","off",
  "off","on","off","off","off","off","off","off","off","off","off","off","on","off",
  "off","on","off","off","off","off","off","off","off","off","off","off","on","off",
  "off","on","on","on","on","on","on","on","on","on","on","on","on","off",
];

// Bar chart — ERP (transaction volumes)
const MATRIX_RECORD_ERP: CellState[] = [
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
  "off","off","off","off","off","off","off","off","off","off","off","on","off","off",
  "off","off","off","off","off","off","off","on","off","off","off","on","off","off",
  "off","off","off","on","off","off","off","on","off","off","off","on","off","off",
  "off","off","off","on","off","off","off","on","off","on","off","on","off","off",
  "off","on","off","on","off","on","off","on","off","on","off","on","off","on",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
];

// Checkmark in box — QMS (quality stamp)
const MATRIX_RECORD_QMS: CellState[] = [
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
  "on","off","off","off","off","off","off","off","off","off","off","on","off","on",
  "on","off","off","off","off","off","off","off","off","off","on","off","off","on",
  "on","off","on","off","off","off","off","off","off","on","off","off","off","on",
  "on","off","on","on","off","off","off","off","on","off","off","off","off","on",
  "on","off","off","on","on","on","on","on","off","off","off","off","off","on",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
];

// Document with spec lines — PLM (product definitions)
const MATRIX_RECORD_PLM: CellState[] = [
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
  "on","off","off","off","off","off","off","off","off","off","off","off","off","on",
  "on","off","on","on","on","off","off","on","on","off","off","off","off","on",
  "on","off","off","off","off","off","off","off","off","off","off","off","off","on",
  "on","off","on","on","on","on","on","on","off","off","off","off","off","on",
  "on","off","off","off","off","off","off","off","off","off","off","off","off","on",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
];

// Timestamped ticks on a baseline — Audit trail
const MATRIX_BENEFIT_TRACE: CellState[] = [
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
  "off","off","on","off","off","on","off","off","on","off","off","on","off","off",
  "off","off","on","off","off","on","off","off","on","off","off","on","off","off",
  "off","off","on","off","off","on","off","off","on","off","off","on","off","off",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
];

// Two linked rings — Records bound
const MATRIX_BENEFIT_BIND: CellState[] = [
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
  "off","off","on","on","off","off","off","off","off","off","on","on","off","off",
  "off","on","off","off","on","off","off","off","off","on","off","off","on","off",
  "off","on","off","off","on","on","on","on","on","on","off","off","on","off",
  "off","on","off","off","on","on","on","on","on","on","off","off","on","off",
  "off","off","on","on","off","off","off","off","off","off","on","on","off","off",
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
];

// Four-node network — Cross-functional
const MATRIX_BENEFIT_CROSS: CellState[] = [
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
  "off","on","on","off","off","off","off","off","off","off","off","on","on","off",
  "off","on","on","off","on","on","on","on","on","on","off","on","on","off",
  "off","off","off","off","on","off","off","off","off","on","off","off","off","off",
  "off","on","on","off","on","on","on","on","on","on","off","on","on","off",
  "off","on","on","off","off","off","off","off","off","off","off","on","on","off",
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
];

export const metadata: Metadata = {
  title: "Unifize — Coordination tax, visible, measurable, reducible",
  description:
    "Your systems of record and your systems of coordination are disconnected. Unifize closes the gap for regulated processes.",
};

export default function Home() {
  return (
    <main>
      <SiteHeader />

      {/* 01 · HERO ───────────────────────────────────────────── */}
      <header className="mast surface dark hero">
        <div className="mast-inner">
          <Eyebrow dot>
            People · Process · AI · Outcomes
          </Eyebrow>
          <h1>
            Records live in systems.
            <br />
            <em>Work lives between them.</em>
          </h1>
          <p className="sub">
            Records live in your QMS, ERP, and PLM. The work that
            produces them runs through email. That gap is{" "}
            <strong>coordination tax</strong>.
          </p>
          <div className="hero-ctas">
            <Button arrow size="lg">
              Book a demo
            </Button>
            <Button variant="dark-ghost" size="lg">
              See how it works
            </Button>
          </div>
        </div>
      </header>

      {/* 02 · TWO SYSTEMS — diagnosis (white) ────────────────── */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Two systems</span>
            <h2 className="section-title">Two systems. One gap.</h2>
            <p className="section-sub">
              One side is well served. The other has no system of its
              own. The gap is structural.
            </p>
          </div>

          <Placeholder aspect="16/8">
            Two-systems visual · placeholder
          </Placeholder>
        </div>
      </section>

      {/* 03 · HIDDEN OPERATING MODEL (alt) ───────────────────── */}
      <section className="section alt">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">The hidden operating model</span>
            <h2 className="section-title">
              Meetings make truth. Email makes decisions.
            </h2>
            <p className="section-sub">
              Every regulated organisation runs a parallel operating
              model held together by tools that were never designed to
              govern it.
            </p>
          </div>

          <div className="fmcard-grid">
            <FMCard
              title="Meetings"
              meta="9 weekly · zero captured"
              pattern={MATRIX_FRAG_MEET}
            >
              The place truth is created.
            </FMCard>
            <FMCard
              title="Spreadsheets"
              meta="14 versions · one owner"
              pattern={MATRIX_FRAG_SHEETS}
            >
              The tracking layer of last resort.
            </FMCard>
            <FMCard
              title="Email"
              meta="42 threads · 14 owners"
              pattern={MATRIX_FRAG_EMAIL}
            >
              Where decisions actually happen.
            </FMCard>
            <FMCard
              title="Shared folders"
              meta="217 files · zero trace"
              pattern={MATRIX_FRAG_FOLDERS}
            >
              The dumping ground for evidence.
            </FMCard>
          </div>
        </div>
      </section>

      {/* 04 · DOMAINS — sticky-scroll drift ──────────────────── */}
      <DomainDrift />

      {/* 05 · WHY EXISTING TOOLS — light ────────────────────── */}
      <section className="section white" id="seam">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">The seam</span>
            <h2 className="section-title">
              ERP. QMS. PLM. None own the work between them.
            </h2>
            <p className="section-sub">
              Each does exactly what it was designed to do. None were
              designed to govern the cross-functional work that produces
              the record.
            </p>
          </div>

          <div className="versus">
            <div className="versus-col">
              <div className="versus-matrix">
                <MatrixGrid cols={14} rows={7} cells={MATRIX_RECORD_ERP} />
              </div>
              <h3>ERP records material transactions.</h3>
              <p>
                Material flow, financial commits, scheduled execution.
                Not the investigation behind a hold or the decision
                behind a disposition.
              </p>
            </div>
            <div className="versus-col">
              <div className="versus-matrix">
                <MatrixGrid cols={14} rows={7} cells={MATRIX_RECORD_QMS} />
              </div>
              <h3>QMS records compliance states.</h3>
              <p>
                Approved, closed, effective. What an auditor sees, not
                the CAPA investigation or the cross-functional review
                behind it.
              </p>
            </div>
            <div className="versus-col">
              <div className="versus-matrix">
                <MatrixGrid cols={14} rows={7} cells={MATRIX_RECORD_PLM} />
              </div>
              <h3>PLM records product definitions.</h3>
              <p>
                BOMs, drawings, revisions, configurations. Not the
                engineering change conversation or the design-transfer
                handoff behind them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · WHAT UNIFIZE DOES — dark, centered product visual ─ */}
      <section className="section dark" id="how">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">The governed layer</span>
            <h2 className="section-title">
              Every decision leaves a trace. Every trace anchors a record.
            </h2>
            <p className="section-sub">
              Unifize is the governed layer between your systems of
              record and the conversations that move work forward.
            </p>
          </div>

          <div className="how-product-centered">
            <ChatShell />
          </div>
        </div>
      </section>

      {/* 06.5 · CORE BENEFITS — dark, three-column ─────────── */}
      <section className="section dark" id="benefits">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">What changes</span>
            <h2 className="section-title">
              Three things change once the layer is in place.
            </h2>
          </div>

          <div className="versus">
            <div className="versus-col">
              <div className="versus-matrix">
                <MatrixGrid cols={14} rows={7} cells={MATRIX_BENEFIT_TRACE} />
              </div>
              <h3>Audit-ready by default.</h3>
              <p>
                Every decision is timestamped where it&apos;s made. Every
                evidence is attached at the moment of disposition. The
                audit trail is the conversation — defensible on a Tuesday.
              </p>
            </div>
            <div className="versus-col">
              <div className="versus-matrix">
                <MatrixGrid cols={14} rows={7} cells={MATRIX_BENEFIT_BIND} />
              </div>
              <h3>Records stay bound.</h3>
              <p>
                QMS, ERP, and PLM update at the point of decision — not
                reconstructed two weeks later from inboxes. The trace and
                the record are inseparable.
              </p>
            </div>
            <div className="versus-col">
              <div className="versus-matrix">
                <MatrixGrid cols={14} rows={7} cells={MATRIX_BENEFIT_CROSS} />
              </div>
              <h3>Cross-functional by design.</h3>
              <p>
                Quality, operations, suppliers, RA on one thread. One
                owner, one truth, one closure — instead of fifteen
                handoffs across five tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 · PROOF (dark surface, dark testimonial card) ────── */}
      <section className="section dark" id="proof">
        <div className="section-inner">
          <TestimonialCarousel
            tone="dark"
            eyebrow="Customer truth · Medical Devices"
            title="Eight weeks. Three audits. No scramble."
            slides={[
              {
                brand: "M E D E X · ⌁",
                quote:
                  "We stopped reconstructing what happened from inboxes. The CAPA thread is the audit trail — the disposition lives where the conversation lived.",
                name: "Priya Ramesh",
                role: "VP Quality · Class II device manufacturer",
                photoLabel: "Customer portrait · 4:5",
              },
            ]}
          />
        </div>
      </section>

      {/* 08 · AI + CTA (dark, combined) ──────────────────────── */}
      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">The compounding</span>
              <h2 className="section-title close-title">
                Decision traces. Then AI compounds.
              </h2>
              <p className="close-sub">
                AI on top of email is faster conversation, not faster
                closure. Decision traces are the precondition for AI that
                becomes a decision-support layer with audit trails that
                hold up.
              </p>
              <div className="close-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Button variant="dark-ghost" size="lg">
                  Read the thesis
                </Button>
              </div>
            </div>
            <div className="close-visual">
              <DashboardShell />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

/* ============================================================
   FMCard — feature card with matrix illustration header
   ============================================================ */

function FMCard({
  pattern,
  title,
  meta,
  children,
}: {
  pattern: CellState[];
  title: React.ReactNode;
  meta: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="fmcard">
      <div className="fmcard-illust">
        <MatrixGrid cols={14} rows={7} cells={pattern} />
      </div>
      <div className="fmcard-body">
        <h3 className="fmcard-title">{title}</h3>
        <p className="fmcard-desc">{children}</p>
        <span className="fmcard-meta">{meta}</span>
      </div>
    </article>
  );
}

/* ============================================================
   Header + Footer
   ============================================================ */

function SiteFooter() {
  return (
    <footer className="site-footer surface dark">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <strong>Unifize</strong>
          <span>People. Process. AI. Outcomes.</span>
          <span className="site-footer-desc">
            The governed layer for regulated processes.
          </span>
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="lab">Problem</span>
            <a href="#">Coordination tax</a>
            <a href="#">The 15 domains</a>
            <a href="#">The governed layer</a>
          </div>
          <div>
            <span className="lab">Your world</span>
            <a href="#">Quality</a>
            <a href="#">Document control</a>
            <a href="#">Change control</a>
            <a href="#">Operations</a>
          </div>
          <div>
            <span className="lab">By industry</span>
            <a href="#">Medical Devices</a>
            <a href="#">Aerospace</a>
            <a href="#">Laboratories</a>
            <a href="#">Pharmaceuticals</a>
          </div>
          <div>
            <span className="lab">How it works</span>
            <a href="#">Overview</a>
            <a href="#">QMS</a>
            <a href="#">DMS</a>
            <a href="#">PLM</a>
            <a href="#">MES</a>
          </div>
        </div>
      </div>
      <div className="site-footer-rule" />
      <div className="site-footer-base">
        <span>© Unifize 2026</span>
        <span>v0.7 · Problem-led strategy</span>
      </div>
    </footer>
  );
}
