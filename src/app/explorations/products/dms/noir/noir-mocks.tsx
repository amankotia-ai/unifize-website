/* Product mocks in the Ledger noir idiom: the app abstracted into hairline
 * registers and signature ledgers rather than screenshots. Pure markup;
 * status is encoded in label color and marks, never in colored edges.
 * Content: the SOP-118 / CC-2148 fiction from ../dms-data. */

import { MOCK_REGISTER, MOCK_CHANGE, MOCK_TRAIL, MOCK_TRAINING } from "../dms-data";

const ATTENTION = new Set(["In Approval", "Review Due"]);
const QUIET = new Set(["Draft", "Obsolete"]);

function stateClass(state: string) {
  if (ATTENTION.has(state)) return "is-attention";
  if (QUIET.has(state)) return "is-quiet";
  return "";
}

/* the hero readout: the document register as a live instrument */
export function RegisterMock() {
  return (
    <table className="dn-register">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Controlled document</th>
          <th scope="col">Rev</th>
          <th scope="col">State</th>
          <th scope="col">Next review</th>
        </tr>
      </thead>
      <tbody>
        {MOCK_REGISTER.map((r) => (
          <tr key={r.no} className={r.key ? "is-key" : undefined}>
            <td className="dn-register__no">{r.no}</td>
            <td className="dn-register__title">{r.title}</td>
            <td className="dn-register__rev">{r.rev}</td>
            <td className={`dn-register__state ${stateClass(r.state)}`}>
              <span className="dn-register__mark" aria-hidden="true" />
              {r.state}
            </td>
            <td className="dn-register__next">{r.next}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* document control: the revision trail for SOP-118 */
export function TrailMock() {
  return (
    <div className="dn-mock" aria-label="Revision history for SOP-118">
      <p className="dn-mock__head">SOP-118 · Cleaning validation of process equipment</p>
      <ul className="dn-trail">
        {MOCK_TRAIL.map((t) => (
          <li key={t.rev} className={t.key ? "is-key" : undefined}>
            <strong>{t.rev}</strong>
            <span>{t.state}</span>
            <span className="dn-dim">{t.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* change control: the CC-2148 approval route as a signature ledger */
export function ChangeMock() {
  return (
    <div className="dn-mock" aria-label="Approval route for change order CC-2148">
      <p className="dn-mock__head">
        {MOCK_CHANGE.id} · {MOCK_CHANGE.title}
      </p>
      <ul className="dn-route">
        {MOCK_CHANGE.route.map((r) => (
          <li key={r.who} className={r.key ? "is-key" : undefined}>
            <strong>{r.who}</strong>
            <span>{r.role}</span>
            <span className={r.key ? "dn-route__pending" : "dn-dim"}>{r.meaning}</span>
            <span className="dn-dim">{r.date || "——"}</span>
          </li>
        ))}
      </ul>
      <p className="dn-mock__foot dn-dim">{MOCK_CHANGE.impact}</p>
    </div>
  );
}

/* training: the role-to-document matrix; done = filled, assigned = hollow */
export function TrainingMock() {
  return (
    <div className="dn-mock" aria-label="Training matrix by role and revision">
      <p className="dn-mock__head">Training obligations · SOP-118 Rev D release</p>
      <table className="dn-matrix">
        <thead>
          <tr>
            <th scope="col">Role</th>
            {MOCK_TRAINING.docs.map((d, i) => (
              <th scope="col" key={d} className={i === MOCK_TRAINING.keyDoc ? "is-key" : undefined}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MOCK_TRAINING.rows.map((row) => (
            <tr key={row.role}>
              <th scope="row">{row.role}</th>
              {row.cells.map((cell, i) => (
                <td key={i}>
                  <span className={`dn-cell dn-cell--${cell}`} aria-hidden="true" />
                  <span className="dn-visually-hidden">{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="dn-mock__foot dn-dim">Filled: trained on current revision · Hollow: assigned from Rev D</p>
    </div>
  );
}
