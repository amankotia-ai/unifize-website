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
 *   trace    - Product Development: the DHF section drafted after the fact,
 *              with a hole where the decision record should be and a
 *              reviewer comment asking where it went.
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

const SCENES: Record<string, React.ReactNode> = {
  cycle: <VizCapa />,
  wip: <VizInbox />,
  handoffs: <VizThread />,
  trace: <VizDhf />,
};

export function SymptomVisual({ type }: { type: string }) {
  return (
    <div className="hm-cardviz hm-cardviz--ui" aria-hidden="true">
      {SCENES[type]}
    </div>
  );
}
