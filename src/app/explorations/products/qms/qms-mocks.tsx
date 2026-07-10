/* ----------------------------------------------------------------------------
 * qms-mocks.tsx - coded product prototypes for the QMS page.
 * Static, server-rendered, illustrative slices of the product staged inside
 * ShellFrame on a StagePanel. Grounded in the real QMS modules (Quality
 * Events, CAPA, Supplier Quality) and their completion contracts from the
 * Unifize Products database; record IDs are illustrative. Reuses the shared
 * `.dms-mock*` atoms; per-view column templates are set inline.
 * -------------------------------------------------------------------------- */

const stateClass = (s: string) => "is-" + s.toLowerCase().replace(/\s+/g, "-");

/* register of quality events / non-conformances — intake, severity, state */
const EVENTS: { ref: string; type: string; sev: string; state: string; owner: string; key?: boolean }[] = [
  { ref: "QE-2210", type: "Non-conformance", sev: "Major", state: "Investigation", owner: "R. Mehta", key: true },
  { ref: "QE-2207", type: "Deviation", sev: "Minor", state: "Open", owner: "S. Okafor" },
  { ref: "CMP-118", type: "Complaint", sev: "Major", state: "Triage", owner: "J. Lindqvist" },
  { ref: "QE-2199", type: "Observation", sev: "Minor", state: "Closed", owner: "A. Duarte" },
  { ref: "QE-2184", type: "Non-conformance", sev: "Critical", state: "CAPA raised", owner: "R. Mehta" },
];

export function QmsQualityRegister() {
  const cols = "92px minmax(0,1fr) 74px 128px 96px";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: quality event register with type, severity, state, and owner. QE-2210 is in investigation.">
      <div aria-hidden="true">
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Ref</span><span>Type</span><span>Severity</span><span>State</span><span>Owner</span>
        </div>
        {EVENTS.map((r) => (
          <div key={r.ref} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__mono">{r.ref}</span>
            <span className="dms-mock__title">{r.type}</span>
            <span className={"pk-sev pk-sev--" + r.sev.toLowerCase()}>{r.sev}</span>
            <span className={"dms-mock__state " + stateClass(r.state)}>{r.state}</span>
            <span className="dms-mock__mono">{r.owner}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* CAPA record trace — RCA method, action plan, effectiveness gate.
 * Fields mirror the real CAPA completion contract (RCA method + approval,
 * per-item ownership, verification of effectiveness within the window). */
const CAPA = {
  id: "CAPA-2210",
  title: "Recurring torque non-conformance, Line 2",
  state: "Effectiveness",
  rca: "Fishbone · root cause approved by QA Manager",
  actions: [
    { label: "Update process control plan", owner: "Daniel", status: "Done" },
    { label: "Retrain Line 2 operators", owner: "Lisa", status: "Done" },
    { label: "Revise incoming inspection", owner: "Priya", status: "In progress", key: true },
  ],
  foot: "VOE window · 90 days (Major) · verifier sign-off pending",
};

export function QmsCapaTrace() {
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: CAPA-2210 corrective action record with root cause, action plan, and effectiveness check.">
      <div aria-hidden="true">
        <div className="dms-mockco__head">
          <span className="dms-mock__mono">{CAPA.id}</span>
          <span className="dms-mock__title dms-mockco__title">{CAPA.title}</span>
          <span className={"dms-mock__state " + stateClass(CAPA.state)}>{CAPA.state}</span>
        </div>
        <div className="pk-mock__note">{CAPA.rca}</div>
        {CAPA.actions.map((a) => (
          <div key={a.label} className={"dms-mock__grid dms-mock__row" + (a.key ? " is-key" : "")} style={{ gridTemplateColumns: "minmax(0,1fr) 92px 108px" }}>
            <span className="dms-mock__title">{a.label}</span>
            <span className="dms-mock__mono">{a.owner}</span>
            <span className={"dms-mock__state " + stateClass(a.status)}>{a.status}</span>
          </div>
        ))}
        <div className="dms-mock__foot">{CAPA.foot}</div>
      </div>
    </div>
  );
}

/* supplier scorecard + SCAR / PPAP state (Supplier Quality module) */
const SUPPLIERS: { name: string; score: string; scar: string; ppap: string; state: string; key?: boolean }[] = [
  { name: "Aveline Components", score: "96", scar: "—", ppap: "L3 approved", state: "Approved" },
  { name: "Steriva Materials", score: "82", scar: "SC-104 open", ppap: "L3 approved", state: "On watch", key: true },
  { name: "Corevance Plastics", score: "91", scar: "—", ppap: "L2 approved", state: "Approved" },
  { name: "Northmark Tooling", score: "74", scar: "SC-098 verify", ppap: "L4 pending", state: "Conditional" },
];

export function QmsSupplierScorecard() {
  const cols = "minmax(0,1fr) 52px 108px 108px 100px";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: approved supplier list with composite score, open SCAR, PPAP level, and status.">
      <div aria-hidden="true">
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Supplier</span><span>Score</span><span>SCAR</span><span>PPAP</span><span>Status</span>
        </div>
        {SUPPLIERS.map((r) => (
          <div key={r.name} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__title">{r.name}</span>
            <span className="dms-mock__mono">{r.score}</span>
            <span className="dms-mock__mono">{r.scar}</span>
            <span className="dms-mock__mono">{r.ppap}</span>
            <span className={"dms-mock__state " + stateClass(r.state)}>{r.state}</span>
          </div>
        ))}
        <div className="dms-mock__foot">Composite scorecard · SCAR effectiveness at 30/90 days</div>
      </div>
    </div>
  );
}

/* module key -> staged prototype. Several modules share a representative
 * view; the intake and closure records are the two flagship prototypes. */
export const QMS_MODULE_MOCKS: Record<string, React.ReactNode> = {
  "non-conformance": <QmsQualityRegister />,
  "capa": <QmsCapaTrace />,
  "complaint-handling": <QmsQualityRegister />,
  "audit-management": <QmsQualityRegister />,
  "supplier-quality": <QmsSupplierScorecard />,
  "quality-risk-management": <QmsQualityRegister />,
};
