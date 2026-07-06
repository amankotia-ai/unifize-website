/* ----------------------------------------------------------------------------
 * dms-mocks.tsx - coded product prototypes for the DMS page.
 * Static, server-rendered, illustrative content. Each mock is a compact,
 * plausible slice of the product staged inside ShellFrame on a StagePanel.
 * Text restraint: only informative rows, one blue key marker per view.
 * -------------------------------------------------------------------------- */

import { MOCK_REGISTER } from "./dms-data";

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
