import Link from "next/link";
import { PRODUCT } from "./dms-data";
import { dmsCopy } from "./dms-copy";
import "./dms-hero-visuals.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

export type DmsHeroVisualVariant = "governed-record" | "record-satellites" | "lifecycle-ribbon";

function DocumentGlyph({ complete = false }: { complete?: boolean }) {
  return (
    <span className={`dms-hv__doc-glyph${complete ? " is-complete" : ""}`}>
      <svg viewBox="0 0 48 56">
        <path d="M8 2h21l11 11v41H8V2Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M29 2v12h11M16 25h16M16 34h16M16 43h11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {complete ? <i>✓</i> : null}
    </span>
  );
}

function AutomatorMark() {
  return (
    <span className="dms-hv__automator-mark">
      <svg viewBox="0 0 24 24">
        <path d="M8 8h8a4 4 0 0 1 4 4v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5a4 4 0 0 1 4-4Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 4v4M9 14h.01M15 14h.01M9 17h6M2 13h2M20 13h2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function QrMark() {
  return (
    <svg className="dms-hv__qr" viewBox="0 0 54 54">
      <path d="M2 2h15v15H2zM37 2h15v15H37zM2 37h15v15H2zM6 6h7v7H6zM41 6h7v7h-7zM6 41h7v7H6zM22 2h5v5h-5zM29 2h5v10h-5zM20 10h6v6h-6zM29 15h5v5h-5zM20 22h7v5h-7zM30 22h6v6h-6zM39 21h5v5h-5zM47 21h5v10h-5zM20 30h5v6h-5zM28 31h5v5h-5zM36 30h8v6h-8zM20 39h6v6h-6zM28 39h5v13h-5zM36 39h5v5h-5zM44 37h8v6h-8zM36 47h6v5h-6zM46 46h6v6h-6z" fill="currentColor" />
    </svg>
  );
}

function StateChip({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "green" | "quiet" }) {
  return <span className={`dms-hv__state is-${tone}`}>{children}</span>;
}

function RecordCard({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`dms-hv__card dms-hv__record${compact ? " is-compact" : ""}`}>
      <header className="dms-hv__record-head">
        <DocumentGlyph />
        <p><small>Controlled document · SOP-118</small><b>Cleaning validation</b></p>
        <StateChip>Draft</StateChip>
      </header>
      <div className="dms-hv__record-body">
        <div className="dms-hv__activity">
          <AutomatorMark />
          <p><small>automator</small><b>Filled the document checklist</b><span>Owner and approvers assigned from Quality Assurance.</span></p>
        </div>
        <div className="dms-hv__checklist">
          <p><span>Document classification</span><i>✓</i></p>
          <p><span>Document settings</span><i>4</i></p>
          <p><span>Signatures</span><i>2</i></p>
        </div>
      </div>
    </section>
  );
}

function SignatureCard({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`dms-hv__card dms-hv__signature${compact ? " is-compact" : ""}`}>
      <header><h3>Apply your signature</h3><span>21 CFR Part 11</span></header>
      <div className="dms-hv__signature-choice"><span className="is-selected"><i>✓</i>Approval</span><span><i />Rejection</span></div>
      {!compact ? <div className="dms-hv__signature-field"><small>Email id</small><b>r.mehta@steriva.com</b></div> : null}
      <div className="dms-hv__signature-script"><small>Signature</small><b>R. Mehta</b></div>
      <strong className="dms-hv__primary">Confirm and sign</strong>
    </section>
  );
}

function EffectiveCard({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`dms-hv__card dms-hv__effective${compact ? " is-compact" : ""}`}>
      <header><DocumentGlyph complete /><div><small>Controlled document</small><h3>SOP-118 · Rev D</h3><StateChip tone="green">Effective</StateChip></div></header>
      {!compact ? <p>Cleaning validation of process equipment</p> : null}
      <footer><span>Effective 02 Jul 2026</span><QrMark /></footer>
    </section>
  );
}

function TrainingCard({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`dms-hv__card dms-hv__training${compact ? " is-compact" : ""}`}>
      <header><AutomatorMark /><b>automator</b></header>
      <h3><strong>42</strong> training records created</h3>
      <div><span>Quality Assurance · 18</span><em>Due in 5 days</em></div>
      {!compact ? <div><span>Production · 24</span><em>Due in 5 days</em></div> : null}
    </section>
  );
}

function HeroCopy() {
  return (
    <div className="dms-hv__copy">
      <div className="dms-hero__grid">
        <div className="dms-hero__left">
          <Link className="dms-hero__product" href="/explorations/platform">
            <span className="dms-hero__product-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path className="dms-hero__product-sheet" d="M7 3.75h7.4L18 7.35v12.9H7V3.75Z" />
                <path className="dms-hero__product-detail" d="M14 3.75v4h4M9.75 12h5.5M9.75 15.5h5.5" />
              </svg>
            </span>
            <span>Document Management System</span>
          </Link>
          <h1 className="dms-hero__title">
            <span className="dms-hero__line">{dmsCopy("hero.line1", "One current version.")}</span>
            <span className="dms-hero__line dms-hero__turn">{dmsCopy("hero.line2", "Everywhere you look.")}</span>
          </h1>
        </div>
        <div className="dms-hero__right">
          <p className="dms-lede dms-hero__sub">{dmsCopy("hero.sub", PRODUCT.description)}</p>
          <div className="dms-hero__ctas">
            <BookDemoButton className="dms-btn" source="hero">{dmsCopy("hero.cta1", "Book a demo")} &rarr;</BookDemoButton>
            <Link href="/coordination-tax-calculator" className="dms-btn dms-btn-ghost">
              {dmsCopy("hero.cta2", "Take Coordination Tax Assessment")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldConnectors({ variant }: { variant: DmsHeroVisualVariant }) {
  if (variant === "record-satellites") {
    return (
      <svg className="dms-hv__connectors" viewBox="0 0 1200 480" preserveAspectRatio="none">
        <defs>
          <marker id="dms-hv-arrow-sat" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1l7 4-7 4" />
          </marker>
        </defs>
        <path className="dms-hv__connector-halo" d="M318 138h82c28 0 42 14 42 42v24" />
        <path d="M318 138h82c28 0 42 14 42 42v24" markerEnd="url(#dms-hv-arrow-sat)" />
        <path className="dms-hv__connector-halo" d="M760 204v-26c0-28 14-42 42-42h80" />
        <path d="M760 204v-26c0-28 14-42 42-42h80" markerEnd="url(#dms-hv-arrow-sat)" />
        <path className="dms-hv__connector-halo" d="M760 296v54c0 28 14 42 42 42h66" />
        <path d="M760 296v54c0 28 14 42 42 42h66" markerEnd="url(#dms-hv-arrow-sat)" />
      </svg>
    );
  }

  if (variant === "lifecycle-ribbon") {
    return (
      <svg className="dms-hv__connectors" viewBox="0 0 1200 420" preserveAspectRatio="none">
        <defs>
          <marker id="dms-hv-arrow-ribbon" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1l7 4-7 4" />
          </marker>
        </defs>
        <path d="M70 228H1130" markerEnd="url(#dms-hv-arrow-ribbon)" />
      </svg>
    );
  }

  return (
    <svg className="dms-hv__connectors" viewBox="0 0 1200 480" preserveAspectRatio="none">
      <defs>
        <marker id="dms-hv-arrow-main" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M1 1l7 4-7 4" />
        </marker>
      </defs>
      <path className="dms-hv__connector-halo" d="M568 166h112c28 0 42-14 42-42v-10h128" />
      <path d="M568 166h112c28 0 42-14 42-42v-10h128" markerEnd="url(#dms-hv-arrow-main)" />
      <path className="dms-hv__connector-halo" d="M1006 196v66c0 28-14 42-42 42h-8" />
      <path d="M1006 196v66c0 28-14 42-42 42h-8" markerEnd="url(#dms-hv-arrow-main)" />
      <path className="dms-hv__connector-halo" d="M912 382H786" />
      <path d="M912 382H786" markerEnd="url(#dms-hv-arrow-main)" />
    </svg>
  );
}

function GovernedRecordVisual() {
  return (
    <div className="dms-hv__art" aria-hidden="true">
      <span className="dms-hv__field-kicker">One governed record · Draft to training</span>
      <span className="dms-hv__field-ghost">ONE RECORD</span>
      <FieldConnectors variant="governed-record" />
      <div className="dms-hv__node dms-hv__node--record"><RecordCard /></div>
      <div className="dms-hv__node dms-hv__node--signature"><SignatureCard compact /></div>
      <div className="dms-hv__node dms-hv__node--effective"><EffectiveCard compact /></div>
      <div className="dms-hv__node dms-hv__node--training"><TrainingCard compact /></div>
    </div>
  );
}

function RecordSatellitesVisual() {
  return (
    <div className="dms-hv__art" aria-hidden="true">
      <span className="dms-hv__field-kicker">The record is the system of work</span>
      <span className="dms-hv__field-ghost">CONNECTED</span>
      <FieldConnectors variant="record-satellites" />
      <div className="dms-hv__node dms-hv__node--record-main"><RecordCard /></div>
      <div className="dms-hv__node dms-hv__node--signature-satellite"><SignatureCard compact /></div>
      <div className="dms-hv__node dms-hv__node--effective-satellite"><EffectiveCard compact /></div>
      <div className="dms-hv__node dms-hv__node--training-satellite"><TrainingCard compact /></div>
    </div>
  );
}

function LifecycleRibbonVisual() {
  return (
    <div className="dms-hv__art" aria-hidden="true">
      <span className="dms-hv__field-kicker">Controlled document lifecycle</span>
      <span className="dms-hv__field-ghost">DRAFT → RELEASE</span>
      <FieldConnectors variant="lifecycle-ribbon" />
      <div className="dms-hv__ribbon-stage is-draft"><span>01 · Draft</span><RecordCard compact /></div>
      <div className="dms-hv__ribbon-stage is-approval"><span>02 · Approval</span><SignatureCard compact /></div>
      <div className="dms-hv__ribbon-stage is-effective"><span>03 · Effective</span><EffectiveCard compact /></div>
      <div className="dms-hv__ribbon-stage is-training"><span>04 · Training</span><TrainingCard compact /></div>
    </div>
  );
}

const VISUAL_LABELS: Record<DmsHeroVisualVariant, string> = {
  "governed-record": "One governed document moving from draft and Part 11 approval to an effective revision and automatically created training records.",
  "record-satellites": "A Unifize controlled-document record connected to Part 11 approval, an effective signed revision, and an automated training cascade.",
  "lifecycle-ribbon": "The controlled-document lifecycle from draft through approval and release to automatically assigned training.",
};

export function DmsHeroVisual({ variant }: { variant: DmsHeroVisualVariant }) {
  return (
    <div className={`dms-hv dms-hv--${variant}`}>
      <HeroCopy />
      <span className="dms-hv__visual-description">{VISUAL_LABELS[variant]}</span>
      {variant === "governed-record" ? <GovernedRecordVisual /> : null}
      {variant === "record-satellites" ? <RecordSatellitesVisual /> : null}
      {variant === "lifecycle-ribbon" ? <LifecycleRibbonVisual /> : null}
    </div>
  );
}

export function DmsHeroSection({ variant }: { variant: DmsHeroVisualVariant }) {
  return (
    <section className="dms-section dms-hero dms-hero--arcade" aria-label="Document Management System">
      <div className="dms-wrap dms-hero__inner dms-hero__inner--arcade">
        <DmsHeroVisual variant={variant} />
      </div>
    </section>
  );
}
