/* ----------------------------------------------------------------------------
 * dms-mocks.tsx - coded product prototypes for the DMS page.
 * Static, server-rendered, illustrative content. Each mock is a compact,
 * plausible slice of the product staged inside ShellFrame on a StagePanel.
 * Text restraint: only informative rows, one blue key marker per view.
 * -------------------------------------------------------------------------- */

import { MOCK_REGISTER, MOCK_CHANGE, MOCK_TRAINING, MOCK_TRAIL } from "./dms-data";

const stateClass = (s: string) => "is-" + s.toLowerCase().replace(/\s+/g, "-");

export function MockDocRegister() {
  return (
    <div
      className="dms-mock"
      role="img"
      aria-label="Product prototype: document register with revision, state, and next review date for six controlled documents. SOP-118 revision D is in approval."
    >
      <div aria-hidden="true">
        <div className="dms-mock__grid dms-mock__head">
          <span>Doc</span>
          <span>Title</span>
          <span className="dms-mock__rev">Rev</span>
          <span>State</span>
          <span className="dms-mock__next">Next review</span>
        </div>
        {MOCK_REGISTER.map((r) => (
          <div key={r.no} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")}>
            <span className="dms-mock__mono">{r.no}</span>
            <span className="dms-mock__title">{r.title}</span>
            <span className="dms-mock__mono dms-mock__rev">{r.rev}</span>
            <span className={"dms-mock__state " + stateClass(r.state)}>{r.state}</span>
            <span className="dms-mock__mono dms-mock__next">{r.next}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockChangeOrder() {
  return (
    <div
      className="dms-mock"
      role="img"
      aria-label="Product prototype: change order CC-2148 routed for approval. QA and Engineering have signed with Part 11 meaning; Operations signature pending."
    >
      <div aria-hidden="true">
        <div className="dms-mockco__head">
          <span className="dms-mock__mono">{MOCK_CHANGE.id}</span>
          <span className="dms-mock__title dms-mockco__title">{MOCK_CHANGE.title}</span>
          <span className={"dms-mock__state " + stateClass(MOCK_CHANGE.state)}>{MOCK_CHANGE.state}</span>
        </div>
        {MOCK_CHANGE.route.map((s) => (
          <div key={s.who} className={"dms-mockco__row dms-mock__row" + (s.key ? " is-key" : "")}>
            <span className="dms-mockco__who">
              <span className="dms-mock__title">{s.who}</span>
              <span className="dms-mockco__role">{s.role}</span>
            </span>
            <span className="dms-mockco__meaning">{s.meaning}</span>
            <span className="dms-mock__mono">{s.date}</span>
          </div>
        ))}
        <div className="dms-mock__foot">{MOCK_CHANGE.impact}</div>
      </div>
    </div>
  );
}

export function MockTrainingMatrix() {
  return (
    <div
      className="dms-mock"
      role="img"
      aria-label="Product prototype: role-to-document training matrix. The new SOP-118 revision D has opened training assignments for every mapped role."
    >
      <div aria-hidden="true">
        <div className="dms-mocktm__grid dms-mock__head">
          <span>Role</span>
          {MOCK_TRAINING.docs.map((d, i) => (
            <span key={d} className={i === MOCK_TRAINING.keyDoc ? "dms-mocktm__key" : undefined}>{d}</span>
          ))}
        </div>
        {MOCK_TRAINING.rows.map((r) => (
          <div key={r.role} className="dms-mocktm__grid dms-mock__row">
            <span className="dms-mock__title">{r.role}</span>
            {r.cells.map((c, i) => (
              <span key={i} className={"dms-mocktm__dot is-" + c} />
            ))}
          </div>
        ))}
        <div className="dms-mock__foot">
          <span className="dms-mocktm__dot is-done" /> trained
          <span className="dms-mocktm__dot is-assigned" /> assigned on Rev D
        </div>
      </div>
    </div>
  );
}

export function MockRevisionTrail() {
  return (
    <div
      className="dms-mock"
      role="img"
      aria-label="Product prototype: revision history for SOP-118. Revision D effective with a Part 11 signature; revisions C and B retained read-only."
    >
      <div aria-hidden="true">
        <div className="dms-mocktr__grid dms-mock__head">
          <span>SOP-118</span><span>State</span><span>Record</span>
        </div>
        {MOCK_TRAIL.map((r) => (
          <div key={r.rev} className={"dms-mocktr__grid dms-mock__row" + (r.key ? " is-key" : "")}>
            <span className="dms-mock__mono">{r.rev}</span>
            <span className="dms-mock__title">{r.state}</span>
            <span className="dms-mockco__meaning">{r.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
