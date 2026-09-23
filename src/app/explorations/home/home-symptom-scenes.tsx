/* ============================================================================
 * home-symptom-scenes.tsx - the recognition grid's symptom visuals: one
 * stylized artifact of the OLD world per solution door, built as precise
 * mini-UI in the DMS system (square corners, hairlines, layered depth) so
 * the finish matches the arcade windows above and below this section. Each
 * card is one coherent surface, never a fragment collage:
 *
 *   cycle    - Quality: the CAPA's sign-off tracker. The investigation rows
 *              closed in week one; the closure rows sit waiting while the
 *              day counter runs.
 *   wip      - Operations: the inbox where dispositions age. Unread rows,
 *              escalation prefixes, and a hold-queue chip layered on top.
 *   handoffs - Supplier: the RE: RE: FW: thread carrying PPAP evidence
 *              across the organisational boundary, replies collapsed.
 *   versions - Document & Records Control: the shared-drive folder listing,
 *              three files for one SOP, the laminated copy the line runs.
 *   trace    - Product Development: the DHF section drafted after the fact,
 *              with a hole where the decision record should be and a
 *              reviewer comment asking where it went.
 *
 * Behind "See more solutions" (2026-09-02 sync, H6), same grammar:
 *
 *   approval - Change Control: the scanned approval form. Three wet
 *              signatures, three dates, and "see email" where the
 *              attachments reviewed should be listed.
 *   deadline - Regulatory Affairs: the five-day reporting clock as a
 *              timeline, today on day 4, and the evidence still owed
 *              clustered against the deadline.
 *   tracks   - Post-Market & Recall: a swimlane chart, four tracks under
 *              four owners on staggered clocks, and the scope decision
 *              floating off every lane because it was taken on a call.
 *   matrix   - Compliance: the local-copy spreadsheet, column letters and
 *              sheet tabs included, one evidence cell already a broken
 *              reference.
 *
 * Nine cards, nine different surfaces (tracker, file listing, inbox, thread,
 * document, form, timeline, swimlanes, sheet): a visitor scanning the grid
 * should never see the same widget twice.
 *
 * All furniture is presentational (aria-hidden at the call site); status is
 * carried by icon + label color, never a colored edge. Styles: home-kit.css,
 * hm-viz namespace.
 * ========================================================================== */

function IconDone() {
  return (
    <svg className="hm-viz__ico is-done" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6.4" />
      <path d="m4.4 7.2 1.9 1.9 3.4-4" />
    </svg>
  );
}

function IconWait() {
  return (
    <svg className="hm-viz__ico is-wait" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6.4" />
      <path d="M7 4v3.4l2.2 1.4" />
    </svg>
  );
}

function IconIdle() {
  return <svg className="hm-viz__ico is-idle" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="5.9" /></svg>;
}

function IconFile() {
  return (
    <svg className="hm-viz__ico is-file" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3.2 1.4h5L11 4.2v8.4H3.2zM8 1.6v2.8h2.8" />
    </svg>
  );
}

/* Quality: the CAPA closure tracker. Work done in week one; day 90 belongs
 * to the sign-off rows. */
function VizCapa() {
  return (
    <div className="hm-viz">
      <div className="hm-viz__bar">
        <span className="hm-viz__kicker">CAPA-0091</span>
        <span className="hm-viz__chip is-warn">Day 90</span>
      </div>
      <div className="hm-viz__title">Closure sign-offs</div>
      <ul className="hm-viz__rows">
        <li>
          <IconDone />
          <span className="hm-viz__cell">Investigation complete</span>
          <span className="hm-viz__age">Day 5</span>
        </li>
        <li>
          <IconDone />
          <span className="hm-viz__cell">Containment verified</span>
          <span className="hm-viz__age">Day 9</span>
        </li>
        <li>
          <IconWait />
          <span className="hm-viz__cell">QA director sign-off</span>
          <span className="hm-viz__age is-warn">18d waiting</span>
        </li>
        <li className="is-idle">
          <IconIdle />
          <span className="hm-viz__cell">Effectiveness review</span>
          <span className="hm-viz__age">Queued</span>
        </li>
      </ul>
    </div>
  );
}

/* Operations: the inbox the disposition is buried in, hold queue layered on. */
function VizInbox() {
  return (
    <div className="hm-viz">
      <div className="hm-viz__bar">
        <span className="hm-viz__kicker">Inbox</span>
        <span className="hm-viz__meta">47 unread</span>
      </div>
      <ul className="hm-viz__rows hm-viz__rows--mail">
        <li className="is-unread">
          <span className="hm-viz__cell">
            <span className="hm-viz__subj">Disposition needed: Batch 220-B</span>
            <span className="hm-viz__from">J. Rivera · Quality</span>
          </span>
          <span className="hm-viz__age is-warn">2d</span>
        </li>
        <li className="is-unread">
          <span className="hm-viz__cell">
            <span className="hm-viz__subj">RE: Line 2 containment hold</span>
            <span className="hm-viz__from">M. Osei · Engineering</span>
          </span>
          <span className="hm-viz__age">1d</span>
        </li>
        <li>
          <span className="hm-viz__cell">
            <span className="hm-viz__subj">FW: Incoming lot 5541</span>
            <span className="hm-viz__from">Receiving</span>
          </span>
          <span className="hm-viz__age">6h</span>
        </li>
      </ul>
      <div className="hm-viz__float hm-viz__float--queue">
        <span className="hm-viz__kicker">Hold queue</span>
        <span>3 lots aging</span>
      </div>
    </div>
  );
}

/* Supplier: the thread that carries the qualification, replies collapsed. */
function VizThread() {
  return (
    <div className="hm-viz">
      <div className="hm-viz__bar">
        <span className="hm-viz__kicker">Thread</span>
        <span className="hm-viz__meta">External</span>
      </div>
      <div className="hm-viz__subject">RE: RE: FW: PPAP evidence · PRT-4412</div>
      <div className="hm-viz__collapsed">
        <i /><i />
        <span>12 earlier replies</span>
      </div>
      <div className="hm-viz__msg">
        <span className="hm-viz__avatar">SU</span>
        <span className="hm-viz__msgbody">
          <span className="hm-viz__from">quality@supplier.com</span>
          <i className="hm-viz__line" />
          <i className="hm-viz__line is-short" />
        </span>
      </div>
      <div className="hm-viz__files">
        <span className="hm-viz__file"><IconFile />PPAP_rev3.pdf</span>
        <span className="hm-viz__file"><IconFile />dim_report.xlsx</span>
      </div>
    </div>
  );
}

/* Product Development: the DHF section written after the fact, with a hole
 * where the decision record should be. */
/* Document & Records Control: the shared drive where the SOP really lives.
 * Three files for one procedure, a FINAL in the name, and the copy the line
 * actually follows is the one nobody controls. */
function VizFiles() {
  return (
    <div className="hm-viz hm-viz--files">
      <div className="hm-viz__bar">
        <span className="hm-viz__kicker">Shared drive · SOPs</span>
        <span className="hm-viz__meta">3 items</span>
      </div>
      <ul className="hm-viz__rows hm-viz__rows--files">
        <li><IconFile /><span className="hm-viz__cell">SOP-118 Cleaning validation v3.2.docx</span><span className="hm-viz__age">Mon</span></li>
        <li><IconFile /><span className="hm-viz__cell">SOP-118 Cleaning validation v3.1 FINAL.docx</span><span className="hm-viz__age">Jun</span></li>
        <li><IconFile /><span className="hm-viz__cell">SOP-118 v2.8 (laminated copy).pdf</span><span className="hm-viz__age is-warn">Line 2</span></li>
      </ul>
      <div className="hm-viz__float hm-viz__float--comment">
        <span className="hm-viz__avatar">OP</span>
        <span>Which one do I follow?</span>
      </div>
    </div>
  );
}

function VizDhf() {
  return (
    <div className="hm-viz">
      <div className="hm-viz__bar">
        <span className="hm-viz__kicker">DHF · Section 4.2</span>
        <span className="hm-viz__meta">Draft</span>
      </div>
      <div className="hm-viz__doc">
        <i className="hm-viz__line is-head" />
        <i className="hm-viz__line" />
        <i className="hm-viz__line" />
        <span className="hm-viz__gap">Decision record missing</span>
        <i className="hm-viz__line" />
        <i className="hm-viz__line is-short" />
      </div>
      <div className="hm-viz__float hm-viz__float--comment">
        <span className="hm-viz__avatar">QA</span>
        <span>Where was this approved?</span>
      </div>
    </div>
  );
}

/* Change Control: the scanned approval form. Everyone signed; nothing that
 * was signed against is on the page. */
const SIGNATURES = [
  { role: "Engineering", date: "12 Mar", d: "M2 12c4-9 7-6 9 1s5 2 8-4 4 3 9 1 6-6 10-3" },
  { role: "Quality", date: "14 Mar", d: "M2 10c3-6 6 2 8-2s4-6 6 0 2 8 6 2 5-7 9-1c2 3 5 1 7-3" },
  { role: "Production", date: "14 Mar", d: "M2 12c2-8 5 0 7-5s3 6 6 4 2-7 6-1 6 5 9 0 4-4 8-1" },
];

function VizForm() {
  return (
    <div className="hm-viz hm-viz--form">
      <div className="hm-viz__bar">
        <span className="hm-viz__kicker">Form QA-07</span>
        <span className="hm-viz__meta">Scanned · p.3 of 3</span>
      </div>
      <div className="hm-viz__formhead">
        <b>Change approval</b>
        <span>ECO-2148 · Torque spec update</span>
      </div>
      <ul className="hm-viz__sigs">
        {SIGNATURES.map((sig) => (
          <li key={sig.role}>
            <span className="hm-viz__sigline">
              <svg viewBox="0 0 48 16" aria-hidden="true"><path d={sig.d} /></svg>
            </span>
            <span className="hm-viz__siglabel">
              <b>{sig.role}</b>
              <small>{sig.date}</small>
            </span>
          </li>
        ))}
      </ul>
      <div className="hm-viz__formfoot">
        <span>Attachments reviewed</span>
        <b className="is-warn">&ldquo;see email&rdquo;</b>
      </div>
    </div>
  );
}

/* Regulatory Affairs: the reporting clock as a timeline. Day 4 of 5, and
 * the evidence the decision needs is still owed. */
function VizTimeline() {
  return (
    <div className="hm-viz hm-viz--timeline">
      <div className="hm-viz__bar">
        <span className="hm-viz__kicker">MDR-0931</span>
        <span className="hm-viz__chip is-warn">Day 4 of 5</span>
      </div>
      <div className="hm-viz__clock">
        <span className="hm-viz__clock-label">Reportability decision</span>
        <ol className="hm-viz__days">
          <li className="is-past"><i /><span>D1</span></li>
          <li className="is-past"><i /><span>D2</span></li>
          <li className="is-past"><i /><span>D3</span></li>
          <li className="is-today"><i /><span>Today</span></li>
          <li className="is-due"><i /><span>Due</span></li>
        </ol>
      </div>
      <div className="hm-viz__owed">
        <span className="hm-viz__owed-label">Still owed</span>
        <span className="hm-viz__owed-chip is-wait"><IconWait />Device history · R&amp;D</span>
        <span className="hm-viz__owed-chip is-wait"><IconWait />Risk assessment</span>
        <span className="hm-viz__owed-chip"><IconIdle />Decision memo</span>
      </div>
    </div>
  );
}

/* Post-Market & Recall: the swimlane view. Four tracks, four owners, four
 * clocks; the decision that joins them belongs to no lane. */
const LANES = [
  { label: "Mfg hold", owner: "OP", start: 0, width: 38, warn: false },
  { label: "Notify", owner: "SA", start: 14, width: 70, warn: true },
  { label: "Returns", owner: "LG", start: 26, width: 44, warn: false },
  { label: "Submit", owner: "RA", start: 32, width: 54, warn: false },
];

function VizLanes() {
  return (
    <div className="hm-viz hm-viz--lanes">
      <div className="hm-viz__bar">
        <span className="hm-viz__kicker">Recall RC-17</span>
        <span className="hm-viz__meta">Day 5</span>
      </div>
      <div className="hm-viz__lanes">
        {LANES.map((lane) => (
          <div className="hm-viz__lane" key={lane.label}>
            <span className="hm-viz__lane-label">{lane.label}</span>
            <span className="hm-viz__lane-track">
              <i className={"hm-viz__lane-bar" + (lane.warn ? " is-warn" : "")} style={{ left: `${lane.start}%`, width: `${lane.width}%` }}>
                <b>{lane.owner}</b>
              </i>
            </span>
          </div>
        ))}
        <span className="hm-viz__lane-today" aria-hidden="true" />
      </div>
      <div className="hm-viz__lane-foot">
        <i aria-hidden="true" />
        <span><b>Scope decision</b> · on a call, not recorded</span>
      </div>
    </div>
  );
}

/* Compliance: the local-copy spreadsheet. Column letters, sheet tabs, and
 * an evidence cell that already points nowhere. */
function VizSheet() {
  return (
    <div className="hm-viz hm-viz--sheet">
      <div className="hm-viz__bar">
        <span className="hm-viz__kicker">Part11_matrix_v14.xlsx</span>
        <span className="hm-viz__meta">Local copy</span>
      </div>
      <table className="hm-viz__grid">
        <thead>
          <tr><th /><th>A</th><th>B</th><th>C</th></tr>
        </thead>
        <tbody>
          <tr className="is-head"><th>1</th><td>Requirement</td><td>Evidence</td><td>Date</td></tr>
          <tr><th>2</th><td>Audit trail review</td><td className="is-link">\\qa-share\val\…</td><td>Mar</td></tr>
          <tr><th>3</th><td>Access review Q3</td><td>email from IT</td><td className="is-warn">Stale</td></tr>
          <tr><th>4</th><td>E-signature SOP</td><td className="is-warn">#REF!</td><td>Jan</td></tr>
        </tbody>
      </table>
      <div className="hm-viz__tabs">
        <span className="is-active">v14</span>
        <span>v13</span>
        <span>v11_final</span>
        <span>+</span>
      </div>
    </div>
  );
}

const SCENES: Record<string, React.ReactNode> = {
  cycle: <VizCapa />,
  wip: <VizInbox />,
  handoffs: <VizThread />,
  versions: <VizFiles />,
  trace: <VizDhf />,
  approval: <VizForm />,
  deadline: <VizTimeline />,
  tracks: <VizLanes />,
  matrix: <VizSheet />,
};

export function SymptomVisual({ type }: { type: string }) {
  return (
    <div className="hm-cardviz hm-cardviz--ui" data-viz={type} aria-hidden="true">
      {SCENES[type]}
    </div>
  );
}
