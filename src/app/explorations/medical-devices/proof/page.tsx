/* Medical Devices — product-proof-led direction. Finished page. */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/home/site-header";
import { Button, Eyebrow } from "@/components/atoms";
import { ChatShell, DashboardShell } from "@/components/organisms";
import {
  AIReadStory,
  CoexistenceLayer,
  MoneyShot,
  type CoexistenceContext,
} from "@/components/workflow";
import { getWorkflow } from "@/lib/platform-data/workflows";
import { MD_STANDARDS } from "@/lib/platform-data/medical-devices-canonical";
import { ScreenFrame, SiteFooterX } from "../_shared";
import "../explorations.css";

export const metadata: Metadata = {
  title: "See it work · Medical Devices · Unifize",
  description:
    "Every decision, approval, and signature in one accountable thread — so proving the work is a link, not a three-week scramble. See it on a live CAPA.",
};

export default function ProofPage() {
  const capa = getWorkflow("capa")!;
  const coexistence: CoexistenceContext = {
    recordLabel: "CAPA", recordNoun: "corrective action", industryLabel: "medical-device",
    standards: ["ISO 13485", "21 CFR 820"], approval: "21 CFR Part 11 e-signature",
    systemsOfRecord: ["QMS", "ERP", "PLM", "LIMS"],
    evidence: ["Root-cause analysis", "Effectiveness check", "Training sign-off"],
    aiAssist: ["Pre-fills the investigation", "Flags missing evidence", "Surfaces what's blocking close-out"],
  };

  return (
    <main>
      <SiteHeader />

      <header className="mast surface dark hero detail-hero">
        <div className="mast-inner">
          <div className="ind-hero-grid">
            <div className="xpl-rise">
              <div className="detail-breadcrumb">
                <Link href="/platform#industries">Industries</Link>
                <span className="sep">/</span>
                <span>Medical Devices</span>
              </div>
              <Eyebrow dot>Medical Devices</Eyebrow>
              <h1>Proof, built as the work happens.</h1>
              <p className="sub">
                Every decision, approval, and signature captured in one accountable thread — so when
                an auditor says &ldquo;show me,&rdquo; the answer is a link, not a three-week
                scramble. Here&apos;s what that looks like.
              </p>
              <div className="hero-ctas">
                <Button arrow size="lg">Book a demo</Button>
                <Button variant="dark-ghost" size="lg">See the platform</Button>
              </div>
            </div>
            <div className="ind-hero-visual xpl-rise xpl-rise-2">
              <ScreenFrame dark id="CAPA-2148" title="Process deviation — lot 4471" statusLabel="In review" status="warn" />
            </div>
          </div>
        </div>
      </header>

      {/* CLAIM 1 — conversation */}
      <section className="section white">
        <div className="section-inner claim">
          <div className="claim-head">
            <h2>A process becomes a conversation.</h2>
            <p>The CAPA isn&apos;t a form to fill — it&apos;s a thread. The decision, the people, and the evidence live in one place, in the order they happened.</p>
          </div>
          <ChatShell variant="capa" />
          <div className="claim-steps">
            <div className="claim-step"><span className="n">01</span><p>Each decision is captured in the thread, with the person and timestamp attached.</p></div>
            <div className="claim-step"><span className="n">02</span><p>Evidence is added as the work happens — not reconstructed before an audit.</p></div>
            <div className="claim-step"><span className="n">03</span><p>Nothing leaves the record into email, so nothing has to be chased back.</p></div>
          </div>
        </div>
      </section>

      {/* CLAIM 2 — provable */}
      <section className="section alt">
        <div className="section-inner claim">
          <div className="claim-head">
            <h2>Every claim, provable on demand.</h2>
            <p>The decision trace and the evidence timeline are the record itself — replay who decided what, when, and on what evidence, against the standards that govern it.</p>
          </div>
          <ScreenFrame id="CAPA-2148 · trace" title="Decision trace & evidence timeline" statusLabel="Audit-ready" status="ok" />
          <div className="ind-vocab-chips" style={{ marginTop: 4 }}>
            {MD_STANDARDS.slice(0, 5).map((s) => <span key={s.id} className="ind-vocab-chip">{s.id}</span>)}
          </div>
        </div>
      </section>

      {/* CLAIM 3 — the wait, visible */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">See the wait</span>
            <h2 className="section-title">The AI reads the thread and shows you where the time went.</h2>
          </div>
        </div>
        <AIReadStory variant="capa" />
      </section>

      {/* CLAIM 4 — leadership view */}
      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">Across everything</span>
              <h2 className="section-title close-title">Leadership sees all of it.</h2>
              <p className="close-sub">What the AI reads on one record, it rolls up across the whole QMS: where time goes, which processes carry the most wait, and how much is recoverable.</p>
              <div className="close-ctas"><Button arrow size="lg">Book a demo</Button><Button variant="dark-ghost" size="lg">See the platform</Button></div>
            </div>
            <div className="close-visual">
              <div style={{ position: "relative", height: 600, width: 880, overflow: "hidden" }}>
                <DashboardShell style={{ position: "absolute", top: 0, left: 0, width: 1500, margin: 0, transform: "scale(0.6)", transformOrigin: "top left" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CoexistenceLayer workflow={capa} context={coexistence} />
      <MoneyShot unit="CAPA" />

      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">Medical Devices</span>
              <h2 className="section-title close-title">Watch it run on your workflow.</h2>
              <p className="close-sub">A 30-minute walkthrough on your CAPA, your change control, your audit — your standards, your stack.</p>
              <div className="close-ctas"><Button arrow size="lg">Book a demo</Button><Button variant="dark-ghost" size="lg">See the platform</Button></div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooterX />
    </main>
  );
}
