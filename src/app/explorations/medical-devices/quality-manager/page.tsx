/* Medical Devices × Quality Manager — persona page. Finished. */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/home/site-header";
import { Button, Eyebrow } from "@/components/atoms";
import { CompressionStoryV2 } from "@/components/workflow";
import { getWorkflow } from "@/lib/platform-data/workflows";
import { MD_STANDARDS, MD_PERSONA, MD_ROOT_CAUSE } from "@/lib/platform-data/medical-devices-canonical";
import { HeroGlyph, QM_CHECK_GLYPH, SiteFooterX } from "../_shared";
import "../explorations.css";

export const metadata: Metadata = {
  title: "For the Quality Manager · Medical Devices · Unifize",
  description:
    "You own the QMS, the CAPA process, and release authority — but the coordination that produces those outcomes runs where you can't see it. Unifize closes the gap.",
};

const WORRIES = [
  { t: "Missing evidence", b: "The proof exists, somewhere. Assembling it for a CAPA or an audit takes as long as the work did." },
  { t: "Unclear approvals", b: "Who signed off, on what version, with what attached? The answer lives in an inbox, not the record." },
  { t: "Repeat issues", b: "The same nonconformance returns, because the fix never reached the SOP, training, and supplier." },
  { t: "Audit findings", b: "Three weeks of evidence assembly before every audit — for work that was already done." },
  { t: "Release risk", b: "You hold release authority on decisions whose full context you can't see in one place." },
];

const QM_WORKFLOWS = [
  { mod: "Change control", name: "Change control", blurb: "One change through review, Part 11 sign-off, and the training cascade it triggers — every affected record updated.", href: "/industries/medical-devices/change-control" },
  { mod: "Quality", name: "CAPA", blurb: "From nonconformance to verified effectiveness, in one accountable thread instead of email and meetings." },
  { mod: "Quality", name: "Audit", blurb: "Evidence surfaces in clicks; findings route into CAPA with ownership attached." },
  { mod: "Documents", name: "SOP revision", blurb: "Draft to effective: review, e-signature, publish, and the training obligations that follow." },
];

export default function QualityManagerPage() {
  const capa = getWorkflow("capa")!;
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
                <Link href="/explorations/medical-devices/symptoms">Medical Devices</Link>
                <span className="sep">/</span>
                <span>Quality Manager</span>
              </div>
              <Eyebrow dot>For the Quality Manager</Eyebrow>
              <h1>Accountable for the outcome. Not in control of the work.</h1>
              <p className="sub">
                You own the QMS, the CAPA process, audit readiness, and release authority. The
                coordination that produces those outcomes runs through email, meetings, and trackers
                you don&apos;t control. That gap has a name, and a number.
              </p>
              <div className="hero-ctas">
                <Button arrow size="lg">Book a demo</Button>
                <Link href="/coordination-tax-calculator" className="btn btn-dark-ghost btn-lg">See your number</Link>
              </div>
            </div>
            <HeroGlyph cells={QM_CHECK_GLYPH} />
          </div>
        </div>
      </header>

      {/* THE FRAME */}
      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside">
            <span className="section-eyebrow">The frame you answer to</span>
            <p className="detail-aside-blurb">Each demands proof of how the work happened — built as the work happens, not reconstructed in the three weeks before an audit.</p>
          </div>
          <div className="detail-body">
            <div className="ind-std-grid">
              {MD_STANDARDS.map((s) => (
                <div key={s.id} className="ind-std-card">
                  <span className="iss">{s.issuer}</span>
                  <span className="id">{s.id}</span>
                  <p className="note">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Where your week goes</span>
            <h2 className="section-title">Sound familiar?</h2>
            <p className="wf-lede">&ldquo;{MD_PERSONA.caseload}&rdquo;</p>
          </div>
          <div className="ind-surface-grid">
            {WORRIES.map((w) => (
              <div key={w.t} className="ind-surface-cell">
                <span className="ind-surface-cell-mark" />
                <h3 className="ind-surface-cell-title">{w.t}</h3>
                <p className="ind-surface-cell-body">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE TWO CLOCKS */}
      <section className="section alt">
        <div className="section-inner detail-inner">
          <div className="detail-aside"><span className="section-eyebrow">Why the QMS can&apos;t see it</span></div>
          <div className="detail-body">
            <p className="detail-prose">Your QMS captures what is officially true: the approved CAPA, the released document, the signed record. The work that produces it happens in email, meetings, and Excel. {MD_ROOT_CAUSE.primary.body}</p>
            <p className="detail-prose">Unifize closes the gap by turning each cross-functional event into an accountable thread, so proof is generated as the work happens. Your QMS stays the system of record; Unifize coexists with it and captures the execution around it.</p>
          </div>
        </div>
      </section>

      <CompressionStoryV2 workflow={capa} stepId="s3" chatVariant="capa" />

      {/* WORKFLOWS */}
      <section className="section white">
        <div className="section-inner">
          <div className="section-head stack">
            <span className="section-eyebrow">Your workflows</span>
            <h2 className="section-title">The work your team runs every week.</h2>
            <p className="wf-lede">Walk change control first: one change, every affected record, the decision trace intact.</p>
          </div>
          <div className="ind-wf-grid">
            {QM_WORKFLOWS.map((w) => {
              const body = (
                <>
                  <span className="mod">{w.mod}</span>
                  <h3 className="name">{w.name}</h3>
                  <p className="sum">{w.blurb}</p>
                  <span className="cta">{w.href ? "Walk the journey →" : "Coming next"}</span>
                </>
              );
              return w.href ? (
                <Link key={w.name} href={w.href} className="ind-wf-card">{body}</Link>
              ) : (
                <div key={w.name} className="ind-wf-card ghost">{body}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">The number</span>
              <h2 className="section-title close-title">A number you can take to your CFO.</h2>
              <p className="close-sub">Without the number you can describe the pain. With it, you can get budget. The coordination-tax estimate turns a busy quality team into dollars per year.</p>
              <div className="close-ctas">
                <Button arrow size="lg">Book a demo</Button>
                <Link href="/coordination-tax-calculator" className="btn btn-dark-ghost btn-lg">See your number</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooterX />
    </main>
  );
}
