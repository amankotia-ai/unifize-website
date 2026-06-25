/* Medical Devices — symptoms-led direction. Finished page. */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/home/site-header";
import { Button, Eyebrow } from "@/components/atoms";
import {
  ProcessStraighten,
  CompressionStoryV2,
  AIReadStory,
  MoneyShot,
  CoexistenceLayer,
  type CoexistenceContext,
} from "@/components/workflow";
import { getWorkflow } from "@/lib/platform-data/workflows";
import { MD_STANDARDS, MD_ROOT_CAUSE } from "@/lib/platform-data/medical-devices-canonical";
import { HeroGlyph, MED_CROSS_GLYPH, SiteFooterX } from "../_shared";
import "../explorations.css";

export const metadata: Metadata = {
  title: "Medical Devices · Unifize",
  description:
    "In a medical device company, the investigation is the easy part — proving it takes as long as the work. Unifize closes the gap between the work and the record.",
};

const SYMPTOMS = [
  { t: "Evidence chasing", b: "The investigation is done, but the proof lives in five systems and three email threads. Assembling it takes as long as the work." },
  { t: "Review rework", b: "A reviewer finds three items missing and sends it back. Two days to re-assemble — two or three times per CAPA." },
  { t: "Status meetings", b: "The weekly review exists to answer one question: where are we on this? No system answers it in real time." },
  { t: "Parallel trackers", b: "The Excel tracker runs beside the QMS, because the QMS holds the final record — not who owes what right now." },
  { t: "Audit scramble", b: "Three weeks before every audit, the team drops everything to rebuild evidence packets that should already exist." },
  { t: "Recurrence", b: "The same nonconformance returns, because the corrective action never reached the SOP, the training record, and the supplier." },
];

const OUTCOMES = [
  { t: "Audit-ready, always", b: "Evidence assembles itself as the work happens, so audit prep stops being a three-week fire drill." },
  { t: "CAPAs that actually close", b: "Investigations move from assignment to verified effectiveness without stalling in someone's inbox." },
  { t: "Issues that stay closed", b: "Corrective actions reach every affected record — SOP, training, supplier — so the same problem doesn't return." },
];

export default function SymptomsPage() {
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
              <h1>You spend more time proving the work than doing it.</h1>
              <p className="sub">
                In a device company, the investigation is the easy part. The evidence lives in five
                systems, three email threads, and a shared drive — and assembling it takes as long as
                the work. Unifize closes the gap between the work and the record.
              </p>
              <ul className="ind-frame" aria-label="Regulatory frame">
                {MD_STANDARDS.slice(0, 4).map((s) => <li key={s.id}>{s.id}</li>)}
              </ul>
              <div className="hero-ctas">
                <Button arrow size="lg">Book a demo</Button>
                <Button variant="dark-ghost" size="lg">See the platform</Button>
              </div>
            </div>
            <HeroGlyph cells={MED_CROSS_GLYPH} />
          </div>
        </div>
      </header>

      {/* STAKES */}
      <section className="section white">
        <div className="section-inner ind-stakes">
          <div className="ind-stakes-head">
            <span className="section-eyebrow"><span className="dot" /> What&apos;s at stake</span>
            <h2 className="ind-stakes-title">When the trail breaks, you answer for it.</h2>
          </div>
          <div className="ind-stakes-cards">
            <div className="ind-stakes-card primary">
              <span className="ind-stakes-tag">The finding</span>
              <p>An FDA Warning Letter or 483 citing a broken trail between design inputs and outputs — or CAPA effectiveness you can&apos;t evidence.</p>
            </div>
            <div className="ind-stakes-card">
              <span className="ind-stakes-tag">The recall</span>
              <p>A design change that never propagated to every affected record, surfacing months later as a recall you could have prevented.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="section alt">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Where your week goes</span>
            <h2 className="section-title">Sound familiar?</h2>
            <p className="wf-lede">None of this is a device problem. Each is a moment the work left the record — and had to be chased back.</p>
          </div>
          <div className="ind-surface-grid">
            {SYMPTOMS.map((s) => (
              <div key={s.t} className="ind-surface-cell">
                <span className="ind-surface-cell-mark" />
                <h3 className="ind-surface-cell-title">{s.t}</h3>
                <p className="ind-surface-cell-body">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAME IT */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">What&apos;s actually happening</span>
            <h2 className="section-title">It isn&apos;t a device problem. It&apos;s a coordination problem.</h2>
            <p className="wf-lede">One CAPA, start to finish. The named steps are the easy part — the cost lives in the chasing and waiting between them.</p>
          </div>
        </div>
        <ProcessStraighten workflow={capa} />
      </section>

      {/* THE GAP */}
      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside"><span className="section-eyebrow">Why your QMS can&apos;t see it</span></div>
          <div className="detail-body">
            <p className="detail-prose">Your QMS captures what is officially true: the approved CAPA, the released document, the signed record. The work that produces it happens in email, meetings, and Excel — a second system your QMS never sees.</p>
            <p className="detail-prose">{MD_ROOT_CAUSE.primary.body} Unifize turns each cross-functional event into an accountable thread, so the proof is generated as the work happens — not reconstructed under pressure.</p>
          </div>
        </div>
      </section>

      <CompressionStoryV2 workflow={capa} stepId="s3" chatVariant="capa" />
      <AIReadStory variant="capa" />
      <CoexistenceLayer workflow={capa} context={coexistence} />

      {/* OUTCOMES */}
      <section className="section alt">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">What changes</span>
            <h2 className="section-title">The work stops leaving the record.</h2>
          </div>
          <div className="ind-proof-grid">
            {OUTCOMES.map((o, i) => (
              <div key={o.t} className="ind-proof-card">
                <span className="ind-proof-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ind-proof-title">{o.t}</h3>
                <p className="ind-proof-body">{o.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MoneyShot unit="CAPA" />

      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">Medical Devices</span>
              <h2 className="section-title close-title">See Unifize wired for your stack.</h2>
              <p className="close-sub">A 30-minute walkthrough: your standards, your workflows, your existing systems.</p>
              <div className="close-ctas">
                <Button arrow size="lg">Book a demo</Button>
                <Button variant="dark-ghost" size="lg">See the platform</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooterX />
    </main>
  );
}
