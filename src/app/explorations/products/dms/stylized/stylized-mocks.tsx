/* ----------------------------------------------------------------------------
 * stylized-mocks.tsx - stylized product visuals for the dms/stylized page.
 * Staging recipe (Asana idiom, checked against asana.com/product Jul 27):
 * each scene = ONE primary product component, cropped off the field edge,
 * with only load-bearing rows in real text (the rest skeletonized), plus
 * EXACTLY ONE overlapping mini-card popover that makes the section's point.
 * An oversized ghost word anchors the field so every scene reads as a
 * composed poster, not UI floating in a void.
 *
 * Components are arcade-grounded (docs/dms-product-visuals/): the register,
 * version history, the change record's state rail and implementation tasks,
 * per-person training records with scores, the AI quiz, the automator as a
 * named actor, and the Apply-your-signature Part 11 dialog. Content is the
 * page's fictional pharma dataset (SOP-118 / change #77).
 * Server components, no state.
 * -------------------------------------------------------------------------- */

import {
  type ArcadeFlowWorld,
  type ArcadeStepConfig,
} from "../../_shared/arcade/arcade";

const stateClass = (s: string) => "is-" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/* ============================================================ primitives */

function StateChip({ state }: { state: string }) {
  return (
    <span className={"stx-state " + stateClass(state)}>
      <i aria-hidden="true" />
      {state}
    </span>
  );
}

function Avatar({ initials, hue }: { initials: string; hue?: "green" | "amber" | "violet" }) {
  return <span className={"stx-av" + (hue ? " is-" + hue : "")}>{initials}</span>;
}

/* record-type tile: the product's colored record-type tags, as an icon tile */
function TypeTile({ kind }: { kind: "sop" | "wi" | "frm" }) {
  return (
    <span className={"stx-tile is-" + kind} aria-hidden="true">
      <svg viewBox="0 0 14 14">
        <path d="M3.5 1.5h5L11 4v8.5H3.5V1.5Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M8.5 1.5V4H11M5.5 7h3M5.5 9.5h2.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* skeletonized copy: text that is not the point */
function Skel({ w }: { w: number }) {
  return <span className="stx-skel" style={{ width: w + "%" }} />;
}

/* the ONE primary panel per module scene */
function Panel({
  glyph,
  title,
  meta,
  chip,
  children,
}: {
  glyph: React.ReactNode;
  title: string;
  meta?: string;
  chip?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="stx-panel">
      <header className="stx-panel__head">
        <span className="stx-panel__glyph" aria-hidden="true">{glyph}</span>
        <div className="stx-panel__id">
          <b>{title}</b>
          {meta ? <small>{meta}</small> : null}
        </div>
        {chip}
      </header>
      {children}
    </div>
  );
}

/* the ONE overlapping mini-card per scene */
function Pop({
  className,
  label,
  labelIcon,
  children,
}: {
  className?: string;
  label?: string;
  labelIcon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={"stx-pop" + (className ? " " + className : "")}>
      {label ? (
        <p className="stx-pop__label">
          {labelIcon}
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/* glyphs */
const GLYPH_AI = (
  <svg viewBox="0 0 12 12"><path d="M6 .8 7.2 4 10.4 5.2 7.2 6.4 6 9.6 4.8 6.4 1.6 5.2 4.8 4 6 .8Z" fill="currentColor" /><path d="M10 8.2l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4Z" fill="currentColor" opacity=".65" /></svg>
);

/* automator identity chip */
function AutoWho() {
  return (
    <p className="stx-pop__who">
      <span className="stx-automark" aria-hidden="true">A</span>
      <b>automator</b>
    </p>
  );
}

/* the scene canvas: field + ghost word + composition */
function Scene({
  variant,
  ghost,
  label,
  children,
}: {
  variant: string;
  ghost: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={"sty-scene sty-scene--" + variant} role="img" aria-label={label}>
      <div aria-hidden="true" className="sty-scene__inner">
        <span className="stx-ghost">{ghost}</span>
        <div className="stx-stage">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================ module scenes */

function ModDocumentIcon({ tone = "blue" }: { tone?: "blue" | "green" }) {
  return (
    <span className={`stx-modvis__docicon is-${tone}`} aria-hidden="true">
      <svg viewBox="0 0 48 56">
        <path d="M8 3h22l10 10v40H8V3Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M29 3v11h11M16 27h16M16 35h16M16 43h11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <i>✓</i>
    </span>
  );
}

function ModCalendarIcon() {
  return (
    <svg className="stx-modvis__calendar" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3v3M19 3v3M4 8h16M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ModQr() {
  return (
    <svg className="stx-modvis__qr" viewBox="0 0 42 42" aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M1 1h13v13H1V1Zm3 3v7h7V4H4Zm24-3h13v13H28V1Zm3 3v7h7V4h-7ZM1 28h13v13H1V28Zm3 3v7h7v-7H4Zm15-30h4v4h-4V1Zm0 7h4v8h-4V8Zm6 9h4v4h-4v-4Zm-7 1h4v4h-4v-4Zm-2 7h5v4h-5v-4Zm8-2h4v8h-4v-8Zm7-6h4v4h-4v-4Zm6 0h4v7h-4v-7Zm-6 8h4v4h-4v-4Zm6 2h4v6h-4v-6Zm-19 6h4v9h-4v-9Zm7 2h4v4h-4v-4Zm6-3h4v4h-4v-4Zm0 7h4v4h-4v-4Zm7-3h4v7h-4v-7Z" />
    </svg>
  );
}

function ModAutomatorMark() {
  return (
    <span className="stx-modvis__automark" aria-hidden="true">
      <svg viewBox="0 0 28 28">
        <rect x="6" y="8" width="16" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 4v4M10 13h.1M18 13h.1M10 17h8M4 12v5M24 12v5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="3.5" r="1.5" fill="currentColor" />
      </svg>
    </span>
  );
}

function ModConnector({ className = "" }: { className?: string }) {
  return (
    <svg className={`stx-modvis__connector ${className}`} viewBox="0 0 220 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 8h64c18 0 24 9 24 25v40c0 16 8 24 24 24h88" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m194 88 12 9-12 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ModuleVisual({
  variant,
  label,
  children,
}: {
  variant: "document" | "change" | "training";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`stx-modvis is-${variant}`} role="img" aria-label={label}>
      <div className="stx-modvis__geometry" aria-hidden="true" />
      <div className="stx-modvis__composition" aria-hidden="true">{children}</div>
    </div>
  );
}

export function StyDocControl() {
  return (
    <ModuleVisual
      variant="document"
      label="Document Control visual: SOP-118 revision D is the current effective document, linked to its retained version history and next periodic review."
    >
      <section className="stx-modvis__doccard">
        <header>
          <ModDocumentIcon tone="green" />
          <div>
            <small>Controlled document</small>
            <h3>SOP-118 · Rev D</h3>
            <span className="stx-modvis__status is-effective">Effective</span>
          </div>
        </header>
        <div className="stx-modvis__rule" />
        <p className="stx-modvis__document-title">Cleaning validation of process equipment</p>
        <footer>
          <span><ModCalendarIcon /> Next review 01 Mar 2027</span>
          <ModQr />
        </footer>
      </section>

      <ModConnector className="is-document" />

      <section className="stx-modvis__history">
        <header>
          <small>SOP-118</small>
          <h3>Version history</h3>
        </header>
        <div className="stx-modvis__history-row is-current">
          <b>Rev D</b><span>Effective</span><em>Current</em>
        </div>
        <div className="stx-modvis__history-row">
          <b>Rev C</b><span>Superseded</span><small>Read-only</small>
        </div>
        <div className="stx-modvis__history-row">
          <b>Rev B</b><span>Superseded</span><small>Retained</small>
        </div>
      </section>
    </ModuleVisual>
  );
}

export function StyChangeControl() {
  return (
    <ModuleVisual
      variant="change"
      label="Change Control visual: change 77 is in implementation, with two completed tasks, retraining in progress, and a directly linked SOP-118 revision D."
    >
      <section className="stx-modvis__change-card">
        <header>
          <h3>Change #77</h3>
          <span className="stx-modvis__status is-implementation">Implementation</span>
        </header>
        <div className="stx-modvis__change-row is-done">
          <i>✓</i><b>Assess product impact</b><span>Completed</span>
        </div>
        <div className="stx-modvis__change-row is-done">
          <i>✓</i><b>Update SOP-118 to Rev D</b><span>Completed</span>
        </div>
        <div className="stx-modvis__change-row is-progress">
          <i /> <b>Conduct retraining</b><span>In progress</span>
        </div>
      </section>

      <section className="stx-modvis__affected">
        <ModDocumentIcon />
        <div><small>Affected document · SOP-118</small><b>Revision D</b></div>
      </section>

      <span className="stx-modvis__linkdot" aria-hidden="true">↗</span>
      <section className="stx-modvis__automator-strip">
        <span className="stx-modvis__spark" aria-hidden="true">✦</span>
        <b>automator</b><i /> <span>Tasks created from approved change</span>
      </section>
    </ModuleVisual>
  );
}

export function StyTraining() {
  return (
    <ModuleVisual
      variant="training"
      label="Training Management visual: publishing SOP-118 revision D triggers the automator to create 42 linked training records for Quality Assurance and Production."
    >
      <section className="stx-modvis__release-card">
        <header>
          <ModDocumentIcon tone="green" />
          <div><h3>SOP-118 · Rev D</h3><span className="stx-modvis__status is-effective">Effective</span></div>
        </header>
        <div className="stx-modvis__rule" />
        <footer><span><ModCalendarIcon /> Effective 02 Jul 2026</span><ModQr /></footer>
      </section>

      <ModConnector className="is-training" />

      <section className="stx-modvis__training-card">
        <header><ModAutomatorMark /><b>automator</b></header>
        <h3><strong>42</strong> training records created</h3>
        <div className="stx-modvis__training-row">
          <span className="stx-modvis__people" aria-hidden="true">♙</span>
          <b>Quality Assurance · 18</b>
          <span><ModCalendarIcon /> Due in 5 days</span>
        </div>
        <div className="stx-modvis__training-row">
          <span className="stx-modvis__people" aria-hidden="true">♙</span>
          <b>Production · 24</b>
          <span><ModCalendarIcon /> Due in 5 days</span>
        </div>
      </section>
    </ModuleVisual>
  );
}

/* ===================================================== modules as camera work
 * The modules-lab treatment promoted to the page (Ben walkthrough Aug 6):
 * one persistent SOP-118 record; each module tab is a camera pose. Document
 * Control lands on the record's status row, Change Control on the revision
 * chain carrying change #77, Training on the release cascade. The checklist
 * carries the live surfaces (approval row, revision row) per Ben's
 * not-just-a-checklist rule. The lab page consumes these same configs. */
const MODULE_ARCADE_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Document",
  owner: "R. Mehta",
  ownerInitials: "RM",
  participants: ["RM", "QA", "+2"],
  participantsLabel: "R. Mehta, Quality Assurance, and two others",
  recordKicker: "STANDARD OPERATING PROCEDURE",
  context: {
    initials: "RM",
    name: "R. Mehta",
    time: "09:14",
    message: "Released revision D to point of use.",
    detail: "Quality approved · effective since 02 Jul 2026",
  },
  inboxNeighbors: [
    { title: "Cleaning validation update", time: "10:20", detail: "Change Control #77 · Verified & Approved", kind: "Change Control" },
    { title: "Line clearance", time: "09:40", detail: "WI-092 · Rev B effective", kind: "Document" },
    { title: "Water system review", time: "Yesterday", detail: "Periodic review due Friday", kind: "Review" },
  ],
  checklistTitle: "Document Control",
  checklistSections: [
    {
      title: "SIGNED DOCUMENT",
      items: [
        { label: "Document-118-Cleaning_Validation.pdf", note: "Current render · 4 pages" },
        { label: "Quality approval", kind: "approval", signer: "N. Varga", state: "Signed" },
        { label: "Effective date", note: "02 Jul 2026" },
      ],
    },
    {
      title: "REVISION",
      items: [
        { label: "Prior revision · C", note: "Superseded · retained" },
        { label: "Current revision", kind: "revision", from: "Rev C · superseded", to: "Rev D · effective" },
        { label: "Change control", note: "#77 · linked" },
      ],
    },
    {
      title: "TRAINING RECORD(S)",
      items: [
        { label: "Quality Assurance · 18", note: "Complete" },
        { label: "Production · 24", note: "Complete" },
        { label: "Next assignment", note: "On the next revision" },
      ],
    },
  ],
};

/* one config per module: same record, same status, different pose; each tab
 * opens ITS checklist section so the walkthrough happens in place */
export const STYLIZED_MODULE_ARCADE_CONFIGS: Record<string, ArcadeStepConfig> = {
  "document-control": {
    source: "A1 s58-62 · record anatomy",
    ghost: "Control",
    type: "Document",
    id: "#118",
    title: "Cleaning validation",
    status: "Effective",
    actor: "Unifize Assistant",
    event: "Confirmed this is the effective revision",
    eventDetail: "One current version · signed render · periodic review scheduled",
    checklist: "SIGNED DOCUMENT",
    checklistItems: ["Current render", "Quality approval", "Effective date"],
    focus: "record",
    focusTitle: "One controlled document",
    focusRows: ["Revision D · Effective", "Approved by Quality Assurance", "Next review · 01 Mar 2027"],
    focusAction: "Open signed render",
    ownershipNote: "One true copy",
    world: MODULE_ARCADE_WORLD,
    checklistOpen: "SIGNED DOCUMENT",
  },
  "change-control": {
    source: "A5 s23-30 · revision chain",
    ghost: "Change",
    type: "Document",
    id: "#118",
    title: "Cleaning validation",
    status: "Effective",
    actor: "automator",
    event: "Carried change #77 through to revision D",
    eventDetail: "Impact assessed · approvals routed · revision sealed with its evidence",
    checklist: "REVISION",
    checklistItems: ["Prior revision · C", "Current revision · D", "Change control · #77"],
    focus: "history",
    focusTitle: "One continuous chain",
    focusRows: ["Rev D · Effective · current", "Change Control #77 · Verified & Approved", "Rev C · Superseded · retained"],
    focusAction: "Open change record",
    ownershipNote: "Evidence stays on the record",
    world: MODULE_ARCADE_WORLD,
    checklistOpen: "REVISION",
    related: 3,
  },
  "training-management": {
    source: "A3 s33 · A6 s9-12 · cascade",
    ghost: "Train",
    type: "Document",
    id: "#118",
    title: "Cleaning validation",
    status: "Effective",
    actor: "automator",
    event: "Created 42 training records from the release",
    eventDetail: "42 people · due in 5 days · linked to revision D",
    checklist: "TRAINING RECORD(S)",
    checklistItems: ["Quality Assurance · 18", "Production · 24", "Next assignment"],
    focus: "training",
    focusTitle: "Release cascade",
    focusRows: ["M. Chen · QA Analyst", "L. Okafor · Line Operator", "A. Baptiste · Line Operator"],
    focusAction: "42 training records created",
    ownershipNote: "Training follows the revision",
    world: MODULE_ARCADE_WORLD,
    checklistOpen: "TRAINING RECORD(S)",
    related: 2,
  },
};


/* ========================================================= lifecycle scenes
 * One component per lifecycle station, indexed by station so persona flows
 * land on the right scene too. Each is the state's ONE telling artifact,
 * anchored by the state's ghost word on the paper field. */

/* the render preview: where the watermark actually lives */
function Sheet({ mark, tone }: { mark: string; tone: string }) {
  return (
    <span className="stx-sheet" aria-hidden="true">
      <i className="stx-sheet__title" />
      <i /><i /><i />
      <span className="stx-sheet__table"><i /><i /><i /></span>
      <b className={"is-" + tone}>{mark}</b>
    </span>
  );
}

/* the document card, used by Draft, Effective, and Obsolete */
function DocCard({
  mark,
  tone,
  state,
  title,
  meta,
}: {
  mark: string;
  tone: string;
  state: string;
  title: string;
  meta: string;
}) {
  return (
    <div className="stx-doccard">
      <Sheet mark={mark} tone={tone} />
      <div className="stx-doccard__fields">
        <p className="stx-doccard__id">
          <b className="stx-mono">SOP-118</b>
          <StateChip state={state} />
        </p>
        <b className="stx-doccard__title">{title}</b>
        <small>{meta}</small>
        <span className="stx-doccard__facts">
          <span><Avatar initials="RM" />R. Mehta</span>
          <span className="stx-mono">Rev D</span>
        </span>
      </div>
    </div>
  );
}

function StyLifeDraft() {
  return (
    <Scene
      variant="life is-draft"
      ghost="Draft"
      label="Stylized component: SOP-118 in Draft with the DRAFT watermark on its render, and the automator's mini-card assembling the record - number assigned, type set, approvers routed from the department."
    >
      <DocCard
        mark="DRAFT"
        tone="draft"
        state="Draft"
        title="Cleaning validation of process equipment"
        meta="Authored from template QT-04 · nothing distributes from Draft"
      />
      <Pop className="stx-pop--life">
        <AutoWho />
        <div className="stx-vrow"><span>Number assigned</span><b className="stx-mono">SOP-118</b></div>
        <div className="stx-vrow"><span>Type</span><small>Standard Operating Procedure</small></div>
        <div className="stx-vrow"><span>Approvers from department</span><small>Quality Assurance</small></div>
      </Pop>
    </Scene>
  );
}

function StyLifeReview() {
  return (
    <Scene
      variant="life is-review"
      ghost="Review"
      label="Stylized component: a reviewer's redline living on the record - the old rinse spec struck through, the tightened one in its place - with the Unifize Assistant's mini-card surfacing the two documents the change touches."
    >
      <div className="stx-comment">
        <p className="stx-comment__who">
          <Avatar initials="SO" hue="green" />
          <b>S. Okafor</b>
          <small>Process Engineering</small>
        </p>
        <p className="stx-comment__text">
          Tightened the rinse spec in section 4.2. The redline stays on the
          record, not in an email thread.
        </p>
        <div className="stx-redline">
          <span className="stx-redline__tag">4.2</span>
          <span className="stx-redline__old"><Skel w={72} /></span>
          <span className="stx-redline__new">Final rinse conductivity ≤ 1.3 µS/cm</span>
        </div>
      </div>
      <Pop
        className="stx-pop--life"
        label="Unifize Assistant"
        labelIcon={<span className="stx-aimark" aria-hidden="true">{GLYPH_AI}</span>}
      >
        <p className="stx-pop__line">Section 4.2 is referenced by:</p>
        <div className="stx-vrow"><b className="stx-mono">WI-092</b><small>Line clearance, packaging</small></div>
        <div className="stx-vrow"><b className="stx-mono">FRM-201</b><small>Training record form</small></div>
      </Pop>
    </Scene>
  );
}

function StyLifeApproval() {
  return (
    <Scene
      variant="life is-approval"
      ghost="Sign"
      label="Stylized component: the Apply-your-signature dialog - approval selected, credentials re-entered, the system-generated signature, Confirm and sign - 21 CFR Part 11, sealed to revision D."
    >
      <div className="stx-signcard">
        <div className="stx-signcard__top">
          <b>Apply your signature</b>
          <span className="stx-part11">21 CFR Part 11</span>
        </div>
        <div className="stx-signcard__radios">
          <span className="is-on"><i aria-hidden="true">✓</i> Approval</span>
          <span><i aria-hidden="true" /> Rejection</span>
        </div>
        <div className="stx-signcard__field">
          <span>Email id</span>
          <span className="stx-mono">r.mehta@steriva.com</span>
        </div>
        <div className="stx-signcard__field">
          <span>Password</span>
          <span className="stx-mono">••••••••••</span>
        </div>
        <div className="stx-signcard__script">
          <span>Signature</span>
          <b>R. Mehta</b>
        </div>
        <div className="stx-signcard__actions">
          <span className="stx-btn">Confirm and sign</span>
          <small>Signer, meaning, and time seal to Rev D</small>
        </div>
      </div>
    </Scene>
  );
}

function StyLifeEffective() {
  return (
    <Scene
      variant="life is-effective"
      ghost="Effective"
      label="Stylized component: the signed, watermarked render of SOP-118 revision D with its QR to the live record, and the automator's mini-card opening 42 training assignments on release."
    >
      <DocCard
        mark="EFFECTIVE"
        tone="effective"
        state="Effective"
        title="Document-118-Cleaning_Validation.pdf"
        meta="Watermarked render · QR to this record · effective since 2026-07-02"
      />
      <Pop className="stx-pop--life">
        <AutoWho />
        <p className="stx-pop__line"><b>42 training assignments</b> opened on release</p>
        <div className="stx-vrow"><span>Quality Assurance</span><small>18 people · due in 5 days</small></div>
        <div className="stx-vrow"><span>Production</span><small>24 people · due in 5 days</small></div>
      </Pop>
    </Scene>
  );
}

function StyLifeSuperseded() {
  return (
    <Scene
      variant="life is-superseded"
      ghost="Rev D"
      label="Stylized component: SOP-118's revision timeline - revision D current and effective, revision C retained read-only, revision B retained - every edition retrievable for the auditor."
    >
      <div className="stx-timeline">
        <p className="stx-timeline__head">
          <b>Revision history</b>
          <small><span className="stx-mono">SOP-118</span> · retained under the edition it shipped</small>
        </p>
        <div className="stx-trow is-key">
          <span className="stx-trow__dot" aria-hidden="true" />
          <span className="stx-trow__main">
            Rev D
            <small>effective since 2026-07-02</small>
          </span>
          <StateChip state="Effective" />
        </div>
        <div className="stx-trow">
          <span className="stx-trow__dot" aria-hidden="true" />
          <span className="stx-trow__main">
            Rev C
            <small>retained read-only</small>
          </span>
          <StateChip state="Superseded" />
        </div>
        <div className="stx-trow">
          <span className="stx-trow__dot" aria-hidden="true" />
          <span className="stx-trow__main">
            Rev B
            <small>retained</small>
          </span>
          <StateChip state="Superseded" />
        </div>
      </div>
      <Pop className="stx-pop--life">
        <AutoWho />
        <p className="stx-pop__line">Every historical version answers the auditor, under the edition it shipped.</p>
      </Pop>
    </Scene>
  );
}

function StyLifeObsolete() {
  return (
    <Scene
      variant="life is-obsolete"
      ghost="Obsolete"
      label="Stylized component: SOP-118 obsoleted with the OBSOLETE watermark on its render, and the automator's end-of-life mini-card - copies retrieved, record archived, audit trail retrievable."
    >
      <DocCard
        mark="OBSOLETE"
        tone="obsolete"
        state="Obsolete"
        title="Cleaning validation of process equipment"
        meta="Archived per retention policy · watermark flipped on every render"
      />
      <Pop className="stx-pop--life">
        <AutoWho />
        <div className="stx-vrow"><span>Distributed copies retrieved</span><b className="stx-mono">12 / 12</b></div>
        <div className="stx-vrow"><span>Record archived</span><small>per retention policy</small></div>
        <div className="stx-vrow"><span>Audit trail</span><small>retrievable</small></div>
      </Pop>
    </Scene>
  );
}

export const STYLIZED_LIFECYCLE_MOCKS: React.ReactNode[] = [
  <StyLifeDraft key="draft" />,
  <StyLifeReview key="review" />,
  <StyLifeApproval key="approval" />,
  <StyLifeEffective key="effective" />,
  <StyLifeSuperseded key="superseded" />,
  <StyLifeObsolete key="obsolete" />,
];

/* ===================================================== flow-step scenes
 * The lifecycle explorer has five persona journeys and 32 individual story
 * steps. The six station scenes above are useful for the record lifecycle,
 * but they are too coarse for those journeys. These scenes use the real
 * Arcade record anatomy at every step: inbox at left, conversation/automator
 * activity in the centre, checklist/linked records at right, and one enlarged
 * product moment. `source` is kept as a data attribute for review provenance;
 * it is intentionally not rendered into the marketing visual.
 * ArcadeFocus / ArcadeStepConfig / ArcadeFlowWorld live in products/_shared/arcade/arcade
 * next to the persistent-camera scene that renders them. */

/* PF-28's world: change control #77 on the same fictional dataset. The change
 * sponsor owns the record; the affected document (SOP-118, PF-29's record)
 * sits one row below in the inbox, and its owner appears in the thread. */
const CHANGE_CONTROL_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Change Control",
  owner: "A. Chen",
  ownerInitials: "AC",
  participants: ["AC", "QA", "+3"],
  participantsLabel: "A. Chen, Quality Assurance, and three others",
  recordKicker: "CHANGE REQUEST",
  context: {
    initials: "RM",
    name: "R. Mehta",
    time: "10:12",
    message: "Looped in as owner of the affected document.",
    detail: "SOP-118 linked · impact review to follow",
  },
  inboxNeighbors: [
    { title: "Cleaning validation", time: "11:02", detail: "SOP-118 · affected document", kind: "Document" },
    { title: "Supplier corrective action", time: "09:31", detail: "Evidence requested", kind: "Quality event" },
    { title: "Deviation triage", time: "Yesterday", detail: "Disposition pending", kind: "Quality event" },
  ],
  checklistTitle: "Document Change Control",
  checklistSections: [
    {
      title: "CHANGE REQUEST SUBMITTER",
      items: [
        { label: "Reason for change", note: "Raised from SOP-118 issue" },
        {
          label: "Full change description",
          kind: "field",
          value: "Update §4.2 rinse conductivity check to validated limits",
          note: "Entered on the request",
        },
        { label: "Desired effect · Update", note: "New controlled revision" },
      ],
    },
    {
      title: "INITIAL RISK ANALYSIS",
      items: [
        { label: "Risk analysis", note: "Major · reversible" },
        { label: "Affected document", note: "SOP-118 · revision linked" },
        { label: "Decision", kind: "approval", signer: "A. Chen", state: "Routed" },
      ],
    },
    {
      title: "DOCUMENT CHANGE CHECKLIST",
      items: [
        { label: "Assess product impact", note: "Owner · Quality" },
        { label: "Update controlled document", note: "Owner · R. Mehta" },
        { label: "Conduct retraining", note: "Owner · Training" },
      ],
    },
  ],
};

/* PF-4's world: SOP-118's revision D as the QA approver (N. Varga) sees it,
 * from the pending-approval home panel through the Part 11 signature. */
const APPROVER_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Document",
  owner: "R. Mehta",
  ownerInitials: "RM",
  viewer: "N. Varga",
  viewerInitials: "NV",
  participants: ["RM", "NV", "+2"],
  participantsLabel: "R. Mehta, N. Varga, and two others",
  recordKicker: "STANDARD OPERATING PROCEDURE",
  context: {
    initials: "RM",
    name: "R. Mehta",
    time: "08:47",
    message: "Routed revision D for approval.",
    detail: "Change summary and revision diff attached",
  },
  inboxNeighbors: [
    { title: "Line clearance", time: "11:12", detail: "WI-092 Rev B · pending your approval", kind: "Document" },
    { title: "Training record form", time: "09:03", detail: "FRM-201 Rev C · pending your approval", kind: "Document" },
    { title: "Water system review", time: "Yesterday", detail: "Periodic review · observer", kind: "Review" },
  ],
  homeTiles: [
    { label: "My pending documents", count: 4 },
    { label: "Documents pending approval", count: 3 },
    { label: "My trainings", count: 2 },
  ],
  checklistTitle: "Document Control",
  checklistSections: [
    {
      title: "SIGNATURE(S)",
      items: [
        { label: "Process Engineering", kind: "approval", signer: "S. Okafor", state: "Signed" },
        { label: "Quality Assurance", kind: "approval", signer: "N. Varga", state: "Signed" },
        { label: "System signature", note: "Sealed on approval" },
      ],
    },
    {
      title: "REVISION",
      items: [
        { label: "Released revision · C", note: "Effective" },
        { label: "Draft revision", kind: "revision", from: "Rev C · released", to: "Rev D · under approval" },
        { label: "Reason for change", kind: "field", value: "Validated equipment limits · §4.2 rinse check updated", note: "Carried from change #77" },
      ],
    },
    {
      title: "TRAINING RECORD(S)",
      items: [
        { label: "Quality Assurance · 18", note: "Assigned on release" },
        { label: "Production · 24", note: "Assigned on release" },
        { label: "Due date", note: "5 days from release" },
      ],
    },
  ],
};

/* PF-30's world: the periodic-review record run by the Quality Manager. */
const REVIEW_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Review",
  owner: "R. Mehta",
  ownerInitials: "RM",
  participants: ["RM", "QA", "+1"],
  participantsLabel: "R. Mehta, Quality Assurance, and one other",
  recordKicker: "PERIODIC REVIEW",
  context: {
    initials: "A",
    name: "automator",
    time: "08:02",
    message: "Scheduled this review from the effective date.",
    detail: "Annual frequency · escalation rule active",
  },
  inboxNeighbors: [
    { title: "Cleaning validation", time: "10:44", detail: "SOP-118 · document under review", kind: "Document" },
    { title: "SOP-093 periodic review", time: "09:12", detail: "14 days overdue · escalated", kind: "Review" },
    { title: "Batch record exception", time: "Yesterday", detail: "Disposition approved", kind: "Quality event" },
  ],
  homeTiles: [
    { label: "Document reviews due", count: 4 },
    { label: "My pending documents", count: 2 },
    { label: "Documents pending approval", count: 1 },
  ],
  checklistTitle: "Document Review",
  checklistSections: [
    {
      title: "DOCUMENT REVIEW(S)",
      items: [
        { label: "Document being reviewed", note: "SOP-118 · Rev D" },
        { label: "Review frequency", note: "Annual · from effective date" },
        { label: "Reviewer and due date", note: "R. Mehta · 07 Aug 2026" },
      ],
    },
    {
      title: "REVIEWER OUTCOME",
      items: [
        { label: "Current signed render", note: "Rev D" },
        {
          label: "Reviewer observations",
          kind: "field",
          value: "Rinse limits verified against equipment logs · no drift",
          note: "Recorded in the review",
        },
        { label: "Outcome", kind: "approval", signer: "R. Mehta", state: "Confirmed current" },
      ],
    },
  ],
};

/* PF-18 crosses two records: the approved change and the document being
 * revised. Each step carries the world of the record it is standing on, so
 * the persistent scene reads as the controller navigating between them. */
const CONTROLLER_TILES = [
  { label: "Documents pending approval", count: 2 },
  { label: "My pending documents", count: 6 },
  { label: "Document reviews due", count: 4 },
];

const CONTROLLER_CHANGE_WORLD: ArcadeFlowWorld = {
  ...CHANGE_CONTROL_WORLD,
  viewer: "T. Ibarra",
  viewerInitials: "TI",
  homeTiles: CONTROLLER_TILES,
};

const CONTROLLER_DOC_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Document",
  owner: "R. Mehta",
  ownerInitials: "RM",
  viewer: "T. Ibarra",
  viewerInitials: "TI",
  participants: ["RM", "TI", "+3"],
  participantsLabel: "R. Mehta, T. Ibarra, and three others",
  recordKicker: "STANDARD OPERATING PROCEDURE",
  context: {
    initials: "AC",
    name: "A. Chen",
    time: "09:58",
    message: "Change #77 approved. Revision required on SOP-118.",
    detail: "Rationale and scope carried from the change record",
  },
  inboxNeighbors: [
    { title: "Cleaning validation update", time: "10:20", detail: "Change Control #77 · approved", kind: "Change Control" },
    { title: "Line clearance", time: "09:40", detail: "WI-092 · in scope check", kind: "Document" },
    { title: "Training record form", time: "Yesterday", detail: "FRM-201 · scope check", kind: "Document" },
  ],
  homeTiles: CONTROLLER_TILES,
  checklistTitle: "Document Control",
  checklistSections: [
    {
      title: "REVISION",
      items: [
        { label: "Prior revision · C", note: "Effective · superseded on release" },
        { label: "New revision", kind: "revision", from: "Rev C · effective", to: "Rev D · draft branch" },
        { label: "Change control", note: "#77 · linked" },
      ],
    },
    {
      title: "FILE(S)",
      items: [
        { label: "Editable source", note: "Rev D working copy" },
        { label: "Controlled render", note: "Generated on approval" },
        {
          label: "Revision rationale",
          kind: "field",
          value: "Validated equipment limit · carried from change #77",
          note: "Entered on the revision",
        },
      ],
    },
    {
      title: "SIGNATURE(S)",
      items: [
        { label: "Process Engineering", kind: "approval", signer: "S. Okafor", state: "Signed" },
        { label: "Quality Assurance", kind: "approval", signer: "R. Mehta", state: "Signed" },
        { label: "System signature", note: "Sealed on approval" },
      ],
    },
  ],
};

const FLOW_STEP_SCENES: Record<string, ArcadeStepConfig[]> = {
  /* PF-29 · Shop Floor Operator. The Arcades prove the signed render, QR and
   * live record anatomy; the search, controlled-print and flag actions use
   * that anatomy with the Product Flow's page-owned step truth. */
  "29": [
    {
      source: "A2 s1 · A4 s2",
      ghost: "Find",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "Effective",
      actor: "automator",
      event: "Returned the current controlled record",
      eventDetail: "One result · effective revision D · no duplicate copies",
      checklist: "SIGNED DOCUMENT",
      checklistItems: ["Current render", "Document classification", "Revision history"],
      focus: "search",
      focusTitle: "Search documents",
      focusRows: ["SOP-118 · Cleaning validation", "Rev D · Effective 2026-07-02", "Owner · R. Mehta"],
      focusAction: "Open current version",
      ownershipNote: "Shared terminal · Packaging line 2",
      checklistOpen: "SIGNED DOCUMENT",
      checklistProgress: { "CONTROLLED COPY": 0 },
    },
    {
      source: "A1 s58–62",
      ghost: "Current",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "Effective",
      actor: "Unifize Assistant",
      event: "Confirmed this is the effective revision",
      eventDetail: "Approved · effective date and revision live on the record",
      checklist: "DOCUMENT CLASSIFICATION",
      checklistItems: ["Effective revision", "Approval signature", "Signed document"],
      focus: "record",
      focusTitle: "Current by construction",
      focusRows: ["Revision D · Effective", "Approved by Quality Assurance", "Effective since 2026-07-02"],
      focusAction: "View signed render",
      ownershipNote: "No second copy to reconcile",
      checklistOpen: "DOCUMENT CLASSIFICATION",
      checklistProgress: { "CONTROLLED COPY": 0 },
    },
    {
      source: "A4 s5–7",
      ghost: "Use",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "Effective",
      actor: "You",
      event: "Opened the controlled document at point of use",
      eventDetail: "The screen shows the master record, not a downloaded copy",
      checklist: "SIGNED DOCUMENT",
      checklistItems: ["Document-118-Cleaning_Validation.pdf", "Revision D", "Effective date"],
      focus: "viewer",
      focusTitle: "Controlled document",
      focusRows: ["SOP-118 · Rev D · Effective"],
      focusAction: "Live record",
      ownershipNote: "Point of use · Packaging line 2",
      checklistOpen: "SIGNED DOCUMENT",
      checklistProgress: { "CONTROLLED COPY": 0 },
    },
    {
      source: "A1 s62 · signed-render pattern",
      ghost: "Print",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "Effective",
      actor: "automator",
      event: "Logged a controlled print against revision D",
      eventDetail: "Copy 03 · expires 2026-08-07 · recall stays attached",
      checklist: "CONTROLLED COPY",
      checklistItems: ["Reason for print", "Copy owner", "Expiry and recall"],
      focus: "print",
      focusTitle: "Controlled print",
      focusRows: ["Copy 03 · Packaging line 2", "Stamped for controlled use", "Recall linked to SOP-118 Rev D"],
      focusAction: "Issue controlled copy",
      ownershipNote: "Exception path · copy recall logged",
      checklistOpen: "CONTROLLED COPY",
      checklistEntry: { section: "CONTROLLED COPY", item: "Reason for print" },
      checklistProgress: { "CONTROLLED COPY": 0 },
      checklistFootnote: "Recall stays linked to Rev D",
    },
    {
      source: "A1 s6–12 · record anatomy",
      ghost: "Flag",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "Effective",
      actor: "You",
      event: "Flagged a procedure mismatch from the record",
      eventDetail: "Section 4.2 does not match the rinse check on line 2",
      checklist: "RELATED RECORD(S)",
      checklistItems: ["Issue raised from SOP-118", "Document owner notified", "Revision candidate"],
      focus: "issue",
      focusTitle: "Problem attached to the document",
      focusRows: ["Section 4.2 · rinse conductivity", "Owner · R. Mehta", "Context carried into the revision flow"],
      focusAction: "Raise controlled issue",
      ownershipNote: "Owner notified · revision candidate",
      checklistProgress: { "CONTROLLED COPY": 2 },
      related: 3,
    },
  ],

  /* PF-4 · Document Approver. A2 is the direct home-to-signature flow; A1
   * supplies the signed render and training cascade after approval. */
  "4": [
    {
      source: "A2 s1",
      ghost: "Pending",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "Needs Approval",
      actor: "automator",
      event: "Added this revision to your approval queue",
      eventDetail: "Rev D · originator R. Mehta · change summary attached",
      checklist: "SIGNATURE(S)",
      checklistItems: ["Department approval", "Quality approval", "Signed document"],
      focus: "queue",
      focusTitle: "Documents pending approval",
      focusRows: ["SOP-118 Rev D · Cleaning validation", "WI-092 Rev B · Line clearance", "FRM-201 Rev C · Training record"],
      focusAction: "Review SOP-118",
      ownershipNote: "Approval queue · 3 pending",
      world: APPROVER_WORLD,
      queueTile: "Documents pending approval",
      checklistOpen: "SIGNATURE(S)",
      checklistProgress: { "SIGNATURE(S)": 1, "TRAINING RECORD(S)": 0 },
    },
    {
      source: "A2 s2–3",
      ghost: "Review",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "Needs Approval",
      actor: "Unifize Assistant",
      event: "Opened the revision with prior approvals visible",
      eventDetail: "One approver complete · Quality Assurance pending",
      checklist: "SIGNATURE(S)",
      checklistItems: ["Process Engineering · approved", "Quality Assurance · pending", "Approval meaning"],
      focus: "record",
      focusTitle: "Revision ready for review",
      focusRows: ["Document owner · R. Mehta", "Revision C → D", "Risk class · Major"],
      focusAction: "Open revision",
      ownershipNote: "One approval already sealed",
      world: APPROVER_WORLD,
      checklistOpen: "SIGNATURE(S)",
      checklistProgress: { "SIGNATURE(S)": 1, "TRAINING RECORD(S)": 0 },
    },
    {
      source: "A1 s59–62 · revision-history pattern",
      ghost: "Diff",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "In Review",
      actor: "Unifize Assistant",
      event: "Assembled the change against the prior revision",
      eventDetail: "Only changed passages are expanded for review",
      checklist: "REVISION",
      checklistItems: ["Released revision · C", "Draft revision · D", "Reason for change"],
      focus: "diff",
      focusTitle: "Compare with approved revision",
      focusRows: ["Final rinse conductivity ≤ 1.5 µS/cm", "Final rinse conductivity ≤ 1.3 µS/cm", "Rationale · align with validated equipment limits"],
      focusAction: "Rev C → D",
      ownershipNote: "Only changed passages expanded",
      world: APPROVER_WORLD,
      checklistOpen: "REVISION",
      checklistProgress: { "SIGNATURE(S)": 1, "TRAINING RECORD(S)": 0 },
    },
    {
      source: "A1 s6–47 · conversation pattern",
      ghost: "Comment",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "In Review",
      actor: "You",
      event: "Added an inline change request on section 4.2",
      eventDetail: "The comment stays with revision D and returns to the author",
      checklist: "REVISION",
      checklistItems: ["Inline comments · 1 open", "Author response", "Approval request"],
      focus: "comment",
      focusTitle: "Review comment on the record",
      focusRows: ["Section 4.2 · define the instrument tolerance", "Assigned to · R. Mehta", "Status · author response required"],
      focusAction: "Return with comment",
      ownershipNote: "Comment stays with revision D",
      world: APPROVER_WORLD,
      checklistOpen: "REVISION",
      checklistProgress: { "SIGNATURE(S)": 1, "TRAINING RECORD(S)": 0 },
    },
    {
      source: "A2 s5–6 · A1 s51–52",
      ghost: "Sign",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "Needs Approval",
      actor: "You",
      event: "Re-authenticated for regulated approval",
      eventDetail: "Identity, meaning and timestamp will seal to revision D",
      checklist: "SIGNATURE(S)",
      checklistItems: ["Quality Assurance approval", "Approval meaning", "System-generated signature"],
      focus: "signature",
      focusTitle: "Apply your signature",
      focusRows: [],
      focusAction: "Confirm and sign",
      ownershipNote: "Identity re-verified for Part 11",
      world: APPROVER_WORLD,
      checklistOpen: "SIGNATURE(S)",
      checklistProgress: { "SIGNATURE(S)": 1, "TRAINING RECORD(S)": 0 },
      signedItems: [
        { name: "S. Okafor", initials: "SO", role: "Process Engineering", approvalId: "9F42A118C704", time: "Yesterday" },
      ],
    },
    {
      source: "A1 s58–62 · A3 s33",
      ghost: "Release",
      type: "Document",
      id: "#118",
      title: "Cleaning validation",
      status: "Approved",
      actor: "automator",
      event: "Published revision D and opened retraining",
      eventDetail: "Prior revision superseded · 42 linked people assigned",
      checklist: "TRAINING RECORD(S)",
      checklistItems: ["Quality Assurance · 18", "Production · 24", "Due date · 5 days"],
      focus: "training",
      focusTitle: "Release cascade",
      focusRows: ["M. Chen · QA Analyst", "L. Okafor · Line Operator", "A. Baptiste · Line Operator"],
      focusAction: "42 training records created",
      ownershipNote: "Release ran without a handoff",
      world: APPROVER_WORLD,
      checklistOpen: "TRAINING RECORD(S)",
      related: 3,
      signedItems: [
        { name: "N. Varga", initials: "NV", role: "Quality Assurance", approvalId: "B7D1A118E552", time: "Now" },
      ],
    },
  ],

  /* PF-30 · Quality Manager. The Arcade proves periodic-review configuration
   * and the controlled record surfaces; execution remains presented through
   * those real surfaces and the flow's authored business rules. */
  "30": [
    {
      source: "A1 s29–35 · A2 s1 queue pattern",
      ghost: "Due",
      type: "Document Review",
      id: "#44",
      title: "SOP-118 periodic review",
      status: "Review Due",
      actor: "automator",
      event: "Opened the periodic-review task",
      eventDetail: "Owner · R. Mehta · due 2026-08-07 · escalation rule active",
      checklist: "DOCUMENT REVIEW(S)",
      checklistItems: ["Document being reviewed", "Review frequency", "Reviewer and due date"],
      focus: "review",
      focusTitle: "Periodic review due",
      focusRows: ["SOP-118 Rev D", "Annual review · due in 7 days", "Recent history already attached"],
      focusAction: "Start review",
      ownershipNote: "Opened by rule, not by memory",
      world: REVIEW_WORLD,
      checklistOpen: "DOCUMENT REVIEW(S)",
      checklistProgress: { "REVIEWER OUTCOME": 0 },
    },
    {
      source: "A1 s6–47 · A5 s23–25",
      ghost: "Context",
      type: "Document Review",
      id: "#44",
      title: "SOP-118 periodic review",
      status: "In Review",
      actor: "Unifize Assistant",
      event: "Assembled everything since the last review",
      eventDetail: "2 revisions · 1 linked change · training state current",
      checklist: "RELATED RECORD(S)",
      checklistItems: ["Revisions since last review", "Linked change controls", "Training completion"],
      focus: "trace",
      focusTitle: "Review context",
      focusRows: ["CC-2148 · equipment update", "Rev C → Rev D · signed", "42 / 42 people trained"],
      focusAction: "Open evidence chain",
      ownershipNote: "Context assembled, not hunted",
      world: REVIEW_WORLD,
      checklistProgress: { "REVIEWER OUTCOME": 0 },
      related: 3,
    },
    {
      source: "A4 s5–7",
      ghost: "Judge",
      type: "Document Review",
      id: "#44",
      title: "SOP-118 periodic review",
      status: "In Review",
      actor: "You",
      event: "Opened the current signed procedure",
      eventDetail: "Reading the procedure against the process as it runs today",
      checklist: "DOCUMENT REVIEW(S)",
      checklistItems: ["Current signed render", "Reviewer observations", "Outcome"],
      focus: "viewer",
      focusTitle: "SOP-118 · current procedure",
      focusRows: ["Reviewing Rev D against current practice"],
      focusAction: "Effective",
      ownershipNote: "Master record, not a copy",
      world: REVIEW_WORLD,
      checklistOpen: "REVIEWER OUTCOME",
      checklistProgress: { "REVIEWER OUTCOME": 1 },
      docTitle: "Cleaning validation",
    },
    {
      source: "A1 s29–35 · review-rule pattern",
      ghost: "Confirm",
      type: "Document Review",
      id: "#44",
      title: "SOP-118 periodic review",
      status: "Completed",
      actor: "You",
      event: "Confirmed the document remains current",
      eventDetail: "Justification recorded · next review set automatically",
      checklist: "DOCUMENT REVIEW(S)",
      checklistItems: ["Outcome · confirmed current", "Reviewer justification", "Next review date"],
      focus: "review",
      focusTitle: "Review outcome",
      focusRows: ["Matches current validated practice", "Confirmed by · R. Mehta", "Next review · 2027-08-07"],
      focusAction: "Complete review",
      ownershipNote: "Next cycle set automatically",
      world: REVIEW_WORLD,
      checklistOpen: "REVIEWER OUTCOME",
      focusAlts: ["Request revision"],
    },
    {
      source: "A5 s16–23",
      ghost: "Revise",
      type: "Document Review",
      id: "#44",
      title: "SOP-118 periodic review",
      status: "Change Needed",
      actor: "automator",
      event: "Created a linked revision from the review finding",
      eventDetail: "Finding, rationale and affected document carried forward",
      checklist: "RELATED RECORD(S)",
      checklistItems: ["Review #44 · complete", "Change control · draft", "SOP-118 Rev E · draft"],
      focus: "history",
      focusTitle: "Review-to-revision trace",
      focusRows: ["Review #44 · finding captured", "CC-2192 · created", "SOP-118 Rev E · draft branch"],
      focusAction: "Open change control",
      ownershipNote: "Finding carried forward intact",
      world: REVIEW_WORLD,
      related: 3,
    },
    {
      source: "A2 s1 · home-queue pattern",
      ghost: "Escalate",
      type: "Document Review",
      id: "#39",
      title: "SOP-093 periodic review",
      status: "Overdue",
      actor: "automator",
      event: "Escalated the overdue review",
      eventDetail: "Owner reminded · Document Controller queue updated",
      checklist: "DOCUMENT REVIEW(S)",
      checklistItems: ["Owner reminder · sent", "Controller escalation · visible", "Deferral history"],
      focus: "queue",
      focusTitle: "Overdue review queue",
      focusRows: ["SOP-093 · 14 days overdue", "WI-071 · 6 days overdue", "SOP-126 · due today"],
      focusAction: "Open oldest review",
      ownershipNote: "Escalation ran on schedule",
      world: REVIEW_WORLD,
      queueTile: "Document reviews due",
    },
  ],

  /* PF-18 · Document Controller. A5 supplies the linked change, affected
   * document and implementation records; A1/A2 supply authoring, routing,
   * signature, signed render and release. */
  "18": [
    {
      source: "A5 s23–25",
      ghost: "Open",
      type: "Document Change Control",
      id: "#77",
      title: "Cleaning validation update",
      status: "Change Approved",
      actor: "automator",
      event: "Linked the approved change to SOP-118",
      eventDetail: "Rationale and impact assessment are already on the record",
      checklist: "AFFECTED DOCUMENT",
      checklistItems: ["SOP-118 Rev C", "Reason for change", "Initial risk analysis"],
      focus: "record",
      focusTitle: "Approved change request",
      focusRows: ["Affected document · SOP-118", "Risk · Major", "Decision · update required"],
      focusAction: "Start revision",
      ownershipNote: "Controller picks up the change",
      world: CONTROLLER_CHANGE_WORLD,
      checklistOpen: "INITIAL RISK ANALYSIS",
    },
    {
      source: "A5 s23 · A1 s6",
      ghost: "Branch",
      type: "Document",
      id: "#118/2",
      title: "Cleaning validation",
      status: "Draft",
      actor: "automator",
      event: "Created revision D from the effective revision",
      eventDetail: "Branch point · Rev C · change control #77 linked",
      checklist: "REVISION",
      checklistItems: ["Prior revision · C", "New revision · D", "Change control · #77"],
      focus: "history",
      focusTitle: "New controlled version",
      focusRows: ["Rev D · Draft", "Rev C · Effective", "Document Change Control #77"],
      focusAction: "Edit Rev D",
      ownershipNote: "Branch cut from the effective revision",
      world: CONTROLLER_DOC_WORLD,
      checklistOpen: "REVISION",
      checklistProgress: { "FILE(S)": 1, "SIGNATURE(S)": 0 },
    },
    {
      source: "A5 s14–20",
      ghost: "Scope",
      type: "Document Change Control",
      id: "#77",
      title: "Cleaning validation update",
      status: "In Review",
      actor: "Unifize Assistant",
      event: "Surfaced records that reference SOP-118",
      eventDetail: "Two documents and one training group may be affected",
      checklist: "AFFECTED DOCUMENT",
      checklistItems: ["WI-092 · line clearance", "FRM-201 · training form", "Production · training group"],
      focus: "trace",
      focusTitle: "Where-used scope",
      focusRows: ["WI-092 · references section 4.2", "FRM-201 · training evidence", "Production · 24 people"],
      focusAction: "Add to change scope",
      ownershipNote: "Scope surfaced, not remembered",
      world: CONTROLLER_CHANGE_WORLD,
      related: 3,
    },
    {
      source: "A1 s6–28",
      ghost: "Author",
      type: "Document",
      id: "#118/2",
      title: "Cleaning validation",
      status: "Draft",
      actor: "You",
      event: "Updated the controlled draft in place",
      eventDetail: "All edits and checklist changes accumulate on revision D",
      checklist: "FILE(S)",
      checklistItems: ["Editable source", "Controlled render", "Revision rationale"],
      focus: "record",
      focusTitle: "Revision D authoring record",
      focusRows: ["Section 4.2 · rinse limit updated", "Document owner · R. Mehta", "Change control #77 · linked"],
      focusAction: "Save controlled draft",
      ownershipNote: "Edits accumulate on the record",
      world: CONTROLLER_DOC_WORLD,
      checklistOpen: "FILE(S)",
      checklistProgress: { "FILE(S)": 2, "SIGNATURE(S)": 0 },
    },
    {
      source: "A1 s59–62 · revision-history pattern",
      ghost: "Rationale",
      type: "Document",
      id: "#118/2",
      title: "Cleaning validation",
      status: "In Review",
      actor: "Unifize Assistant",
      event: "Assembled the revision diff",
      eventDetail: "The controller checks the generated changes against approved scope",
      checklist: "REVISION",
      checklistItems: ["What changed", "Why it changed", "Approved scope"],
      focus: "diff",
      focusTitle: "Assembled revision diff",
      focusRows: ["Final rinse conductivity ≤ 1.5 µS/cm", "Final rinse conductivity ≤ 1.3 µS/cm", "Reason · validated equipment limit"],
      focusAction: "Rev C → Rev D",
      ownershipNote: "Diff checked against approved scope",
      world: CONTROLLER_DOC_WORLD,
      checklistOpen: "REVISION",
      checklistProgress: { "SIGNATURE(S)": 0 },
    },
    {
      source: "A1 s50 · A5 s21–22",
      ghost: "Route",
      type: "Document",
      id: "#118/2",
      title: "Cleaning validation",
      status: "Needs Approval",
      actor: "automator",
      event: "Applied the approval matrix",
      eventDetail: "Reviewers and approvers assigned with due dates",
      checklist: "SIGNATURE(S)",
      checklistItems: ["Process Engineering · pending", "Quality Assurance · pending", "Document Controller · owner"],
      focus: "queue",
      focusTitle: "Approval route",
      focusRows: ["S. Okafor · reviewer · due Aug 04", "R. Mehta · approver · due Aug 05", "J. Lindqvist · operations · due Aug 05"],
      focusAction: "Request approval",
      ownershipNote: "Matrix assigns the route",
      world: CONTROLLER_DOC_WORLD,
      poseVariant: "route",
      checklistOpen: "SIGNATURE(S)",
      checklistProgress: { "SIGNATURE(S)": 0 },
      checklistFootnote: "Route applied from the approval matrix",
    },
    {
      source: "A2 s1–4",
      ghost: "Monitor",
      type: "Document",
      id: "#118/2",
      title: "Cleaning validation",
      status: "Needs Approval",
      actor: "automator",
      event: "Updated the live approval queue",
      eventDetail: "One approved · one pending · reminders run automatically",
      checklist: "SIGNATURE(S)",
      checklistItems: ["S. Okafor · approved", "R. Mehta · pending", "Reminder · scheduled"],
      focus: "queue",
      focusTitle: "Approval progress",
      focusRows: ["Process Engineering · approved", "Quality Assurance · pending", "Operations · not required"],
      focusAction: "Open pending approval",
      ownershipNote: "Reminders run without chasing",
      world: CONTROLLER_DOC_WORLD,
      poseVariant: "monitor",
      queueTile: "Documents pending approval",
      checklistOpen: "SIGNATURE(S)",
      checklistProgress: { "SIGNATURE(S)": 1 },
    },
    {
      source: "A1 s58–62",
      ghost: "Release",
      type: "Document",
      id: "#118/2",
      title: "Cleaning validation",
      status: "Approved",
      actor: "automator",
      event: "Released revision D and superseded revision C",
      eventDetail: "Effective date, signed render and revision history written",
      checklist: "SIGNED DOCUMENT",
      checklistItems: ["Signed render · Rev D", "Revision C · superseded", "Effective date · 2026-07-02"],
      focus: "viewer",
      focusTitle: "Signed document cover",
      focusRows: ["SOP-118 · Rev D · Approved"],
      focusAction: "Effective",
      ownershipNote: "Render generated on approval",
      world: CONTROLLER_DOC_WORLD,
      checklistOpen: "SIGNATURE(S)",
      signedItems: [
        { name: "R. Mehta", initials: "RM", role: "Quality Assurance", approvalId: "C93AA11877F0", time: "Now" },
      ],
    },
    {
      source: "A3 s33 · A6 s9–12",
      ghost: "Cascade",
      type: "Document",
      id: "#118/2",
      title: "Cleaning validation",
      status: "Effective",
      actor: "automator",
      event: "Created retraining records from the training group",
      eventDetail: "42 people · due in 5 days · linked to revision D",
      checklist: "TRAINING RECORD(S)",
      checklistItems: ["Quality Assurance · 18", "Production · 24", "Exceptions · 0"],
      focus: "training",
      focusTitle: "Retraining cascade",
      focusRows: ["M. Chen · QA Analyst", "L. Okafor · Line Operator", "A. Baptiste · Line Operator"],
      focusAction: "42 records created",
      ownershipNote: "Cascade ran from the training group",
      world: CONTROLLER_DOC_WORLD,
      related: 2,
    },
    {
      source: "A1 s62 · A5 s29–30",
      ghost: "Trace",
      type: "Document",
      id: "#118/2",
      title: "Cleaning validation",
      status: "Effective",
      actor: "Unifize Assistant",
      event: "Resolved the complete revision trace",
      eventDetail: "Change, versions, signatures and training are queryable together",
      checklist: "RELATED RECORD(S)",
      checklistItems: ["Change control #77", "Revision C → D", "42 training records"],
      focus: "trace",
      focusTitle: "Audit-ready evidence chain",
      focusRows: ["Change rationale · sealed", "Signature IDs · attached", "Training obligations · linked"],
      focusAction: "Open full audit trail",
      ownershipNote: "One query answers the audit",
      world: CONTROLLER_DOC_WORLD,
      related: 3,
    },
  ],

  /* PF-28 · Change Sponsor. This journey follows A5 almost one-to-one. */
  "28": [
    {
      source: "A5 s2–10",
      ghost: "Initiate",
      type: "Document Change Control",
      id: "#77",
      title: "Cleaning validation update",
      status: "Draft",
      actor: "You",
      event: "Opened the change request",
      eventDetail: "Title, reason, category and affected document captured",
      checklist: "CHANGE REQUEST SUBMITTER",
      checklistItems: ["Reason for change", "Full change description", "Desired effect · Update"],
      focus: "record",
      focusTitle: "Change request",
      focusRows: ["Category · document update", "Risk · Major", "Affected document · SOP-118"],
      focusAction: "Submit for review",
      ownershipNote: "Sponsor-owned · SOP-118 linked",
      world: CHANGE_CONTROL_WORLD,
      checklistOpen: "CHANGE REQUEST SUBMITTER",
      checklistProgress: { "INITIAL RISK ANALYSIS": 0, "DOCUMENT CHANGE CHECKLIST": 0 },
    },
    {
      source: "A5 s14–22",
      ghost: "Assess",
      type: "Document Change Control",
      id: "#77",
      title: "Cleaning validation update",
      status: "In Review",
      actor: "Unifize Assistant",
      event: "Presented risk, impact and affected records",
      eventDetail: "The review board can route, return or reject from one record",
      checklist: "INITIAL RISK ANALYSIS",
      checklistItems: ["Risk analysis", "Affected document", "Decision"],
      focus: "review",
      focusTitle: "Review board decision",
      focusRows: ["Scope · controlled document", "Risk · Major / reversible", "Stage 1 approval · required"],
      focusAction: "Approve and route",
      ownershipNote: "Review board · stage 1",
      world: CHANGE_CONTROL_WORLD,
      checklistOpen: "INITIAL RISK ANALYSIS",
      checklistProgress: { "INITIAL RISK ANALYSIS": 2, "DOCUMENT CHANGE CHECKLIST": 0 },
      focusAlts: ["Return", "Reject"],
    },
    {
      source: "A5 s19–25",
      ghost: "Plan",
      type: "Document Change Control",
      id: "#77",
      title: "Cleaning validation update",
      status: "Change Approved",
      actor: "You",
      event: "Defined the implementation plan",
      eventDetail: "Owners, tasks and completion evidence attached before execution",
      checklist: "DOCUMENT CHANGE CHECKLIST",
      checklistItems: ["Assess product impact", "Update controlled document", "Conduct retraining"],
      focus: "tasks",
      focusTitle: "Implementation plan",
      focusRows: ["Assess product impact", "Update SOP-118 to revision D", "Conduct training on the update"],
      focusAction: "Start implementation",
      ownershipNote: "Owners set before execution",
      world: CHANGE_CONTROL_WORLD,
      poseVariant: "plan",
      checklistOpen: "DOCUMENT CHANGE CHECKLIST",
      checklistProgress: { "DOCUMENT CHANGE CHECKLIST": 0 },
      checklistFootnote: "Evidence required on every task",
    },
    {
      source: "A5 s24–25",
      ghost: "Implement",
      type: "Document Change Control",
      id: "#77",
      title: "Cleaning validation update",
      status: "Implementation",
      actor: "automator",
      event: "Tracked the generated implementation tasks",
      eventDetail: "Each task carries owner, due date, status and evidence",
      checklist: "IMPLEMENTATION",
      checklistItems: ["Affected revision · #118/2", "Implementation tasks · 3", "Completion evidence"],
      focus: "tasks",
      focusTitle: "Implementation Task(s)",
      focusRows: ["Assess product impact · Quality", "Notify affected teams · A. Chen", "Conduct training on Rev D · Training"],
      focusAction: "All tasks complete",
      ownershipNote: "automator tracks each task",
      world: CHANGE_CONTROL_WORLD,
      poseVariant: "run",
      checklistOpen: "DOCUMENT CHANGE CHECKLIST",
      checklistProgress: { "DOCUMENT CHANGE CHECKLIST": 2 },
    },
    {
      source: "A5 s26–30",
      ghost: "Verify",
      type: "Document Change Control",
      id: "#77",
      title: "Cleaning validation update",
      status: "Verified & Approved",
      actor: "automator",
      event: "Verified implementation and closed the change",
      eventDetail: "Approval signature, related revision and tasks remain linked",
      checklist: "RELATED RECORD(S)",
      checklistItems: ["SOP-118 Rev D · approved", "Implementation tasks · completed", "Verification signature"],
      focus: "trace",
      focusTitle: "Verified change record",
      focusRows: ["Implementation matches approved plan", "Verified by · R. Mehta", "Resolution notes · sealed"],
      focusAction: "Verified & Approved",
      ownershipNote: "Sealed · links retained",
      world: CHANGE_CONTROL_WORLD,
      related: 3,
      signedItems: [
        { name: "R. Mehta", initials: "RM", role: "Verification", approvalId: "D410CC7719B3", time: "Now" },
      ],
    },
  ],
};

export const STYLIZED_ARCADE_FLOW_CONFIGS: Record<string, ArcadeStepConfig[]> = {
  "29": FLOW_STEP_SCENES["29"],
  "4": FLOW_STEP_SCENES["4"],
  "30": FLOW_STEP_SCENES["30"],
  "18": FLOW_STEP_SCENES["18"],
  "28": FLOW_STEP_SCENES["28"],
};

/* ===================================================== hero journey (arcade)
 * The hero product shot is the arcade itself: five poses of ONE document,
 * SOP-118, carrying the headline's claim (one current version, everywhere).
 * Steps are lifted straight from the page's own flows so the hero and the
 * lifecycle section tell the same story with the same facts:
 *   PF-29 · find and confirm the current revision (shop floor)
 *   PF-4  · compare, sign under Part 11, release the training cascade
 * Labels are the reader's handle on the step. Rendered by
 * StylizedHeroArcade (stylized-hero-arcade.tsx). */
export type StylizedHeroStep = {
  label: string;
  config: ArcadeStepConfig;
};

export const STYLIZED_HERO_STEPS: StylizedHeroStep[] = [
  {
    label: "Find it",
    config: FLOW_STEP_SCENES["29"][0],
  },
  {
    label: "Trust it",
    config: FLOW_STEP_SCENES["29"][1],
  },
  {
    label: "Compare it",
    config: FLOW_STEP_SCENES["4"][2],
  },
  {
    label: "Sign it",
    config: FLOW_STEP_SCENES["4"][4],
  },
  {
    label: "Release it",
    config: FLOW_STEP_SCENES["4"][5],
  },
];
