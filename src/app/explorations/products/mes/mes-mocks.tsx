/* ----------------------------------------------------------------------------
 * mes-mocks.tsx - coded product prototypes for the MES page.
 * Static, illustrative slices grounded in the real MES modules (Work Order
 * Management, eTravellers, FAI & Control Plan Execution, Electronic Batch/Lot
 * Records with QR Codes) from the Unifize Products database; record IDs are
 * illustrative. Reuses the shared `.dms-mock*` atoms.
 * -------------------------------------------------------------------------- */

const stateClass = (s: string) => "is-" + s.toLowerCase().replace(/\s+/g, "-");

/* work order — operations, station, status */
const WO = {
  id: "WO-3391",
  title: "Housing assembly · lot L-2271",
  qty: "240 units",
  state: "In process",
  ops: [
    { op: "10 · Mould", station: "Press 2", status: "Complete" },
    { op: "20 · Deflash", station: "Cell B", status: "Complete" },
    { op: "30 · Assemble", station: "Line 2", status: "Running", key: true },
    { op: "40 · Leak test", station: "QA rig", status: "Queued" },
    { op: "50 · Pack", station: "Pack 1", status: "Queued" },
  ],
};

export function MesWorkOrder() {
  const cols = "128px minmax(0,1fr) 108px";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: work order WO-3391 in process, with operations, stations, and status.">
      <div aria-hidden="true">
        <div className="dms-mockco__head">
          <span className="dms-mock__mono">{WO.id}</span>
          <span className="dms-mock__title dms-mockco__title">{WO.title}</span>
          <span className={"dms-mock__state " + stateClass(WO.state)}>{WO.state}</span>
        </div>
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Operation</span><span>Station</span><span>Status</span>
        </div>
        {WO.ops.map((r) => (
          <div key={r.op} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__mono">{r.op}</span>
            <span className="dms-mock__title">{r.station}</span>
            <span className={"dms-mock__state " + stateClass(r.status)}>{r.status}</span>
          </div>
        ))}
        <div className="dms-mock__foot">{WO.qty} · scheduled → executed → closed on the floor</div>
      </div>
    </div>
  );
}

/* electronic traveller — step, operator, signature, evidence */
const TRAVELLER: { step: string; operator: string; signed: string; evidence: string; key?: boolean }[] = [
  { step: "10 · Mould", operator: "K. Adeyemi", signed: "Signed", evidence: "Params ✓" },
  { step: "20 · Deflash", operator: "M. Rossi", signed: "Signed", evidence: "Photo ✓" },
  { step: "30 · Assemble", operator: "L. Chen", signed: "In progress", evidence: "Torque log", key: true },
  { step: "40 · Leak test", operator: "—", signed: "Pending", evidence: "—" },
];

export function MesTraveller() {
  const cols = "128px minmax(0,1fr) 96px 96px";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: electronic traveller capturing step completion, operator signature, and evidence at each operation.">
      <div aria-hidden="true">
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Step</span><span>Operator</span><span>Signature</span><span>Evidence</span>
        </div>
        {TRAVELLER.map((r) => (
          <div key={r.step} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__mono">{r.step}</span>
            <span className="dms-mock__title">{r.operator}</span>
            <span className={"dms-mock__state " + stateClass(r.signed)}>{r.signed}</span>
            <span className="dms-mock__mono">{r.evidence}</span>
          </div>
        ))}
        <div className="dms-mock__foot">Step-level completion, evidence, and signature captured at each operation</div>
      </div>
    </div>
  );
}

/* electronic batch/lot record — sealed record with QR traceability */
const EBR = {
  id: "eBR · L-2271",
  title: "Housing assembly · batch record",
  state: "Sealed",
  rows: [
    { rec: "Line clearance", detail: "WI-092 B · signed", qr: "QR-2271-01" },
    { rec: "In-process checks", detail: "12/12 within spec", qr: "QR-2271-02", key: true },
    { rec: "FAI result", detail: "Passed · control plan", qr: "QR-2271-03" },
    { rec: "Reconciliation", detail: "240/240 accounted", qr: "QR-2271-04" },
  ],
};

export function MesBatchRecord() {
  const cols = "minmax(0,0.9fr) minmax(0,1fr) 110px";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: electronic batch record for lot L-2271, sealed, with QR codes for traceability.">
      <div aria-hidden="true">
        <div className="dms-mockco__head">
          <span className="dms-mock__mono">{EBR.id}</span>
          <span className="dms-mock__title dms-mockco__title">{EBR.title}</span>
          <span className={"dms-mock__state " + stateClass(EBR.state)}>{EBR.state}</span>
        </div>
        {EBR.rows.map((r) => (
          <div key={r.rec} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__title">{r.rec}</span>
            <span className="dms-mockco__meaning">{r.detail}</span>
            <span className="dms-mock__mono">{r.qr}</span>
          </div>
        ))}
        <div className="dms-mock__foot">Batch record sealed · QR codes carry lot traceability downstream</div>
      </div>
    </div>
  );
}

/* in-process inspection checklist — a failed check holds the line in real time */
const INSPECTION = {
  id: "INS-0876",
  title: "In-process inspection · op 40 leak test",
  state: "On hold",
  rows: [
    { check: "Fixture verified", spec: "WI-114 A", result: "Pass" },
    { check: "Pressure decay", spec: "≤ 0.4 kPa/min", result: "Pass" },
    { check: "Leak rate, unit 128", spec: "≤ 2.0 sccm", result: "Fail", key: true },
    { check: "Sample per AQL 1.0", spec: "n = 13", result: "Paused" },
  ],
};

export function MesInspection() {
  const cols = "minmax(0,1fr) 128px 88px";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: in-process inspection with a failed check raising a hold on the line.">
      <div aria-hidden="true">
        <div className="dms-mockco__head">
          <span className="dms-mock__mono">{INSPECTION.id}</span>
          <span className="dms-mock__title dms-mockco__title">{INSPECTION.title}</span>
          <span className={"dms-mock__state " + stateClass(INSPECTION.state)}>{INSPECTION.state}</span>
        </div>
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Check</span><span>Spec</span><span>Result</span>
        </div>
        {INSPECTION.rows.map((r) => (
          <div key={r.check} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__title">{r.check}</span>
            <span className="dms-mock__mono">{r.spec}</span>
            <span className={"dms-mock__state " + stateClass(r.result)}>{r.result}</span>
          </div>
        ))}
        <div className="dms-mock__foot">Failed check → hold raised on the line · deviation opened at the operation</div>
      </div>
    </div>
  );
}

/* FAI / control-plan execution — characteristic results with disposition */
const FAI = {
  id: "FAI-0412",
  title: "First article · housing rev D",
  state: "Disposition",
  rows: [
    { char: "CH-01 · Bore Ø 12.10", spec: "±0.05", result: "12.08 · Pass" },
    { char: "CH-02 · Flatness", spec: "0.02 max", result: "0.015 · Pass" },
    { char: "CH-03 · Torque, insert", spec: "2.2–2.6 N·m", result: "2.05 · Fail", key: true },
    { char: "CH-04 · Surface finish", spec: "Ra 1.6", result: "1.4 · Pass" },
  ],
};

export function MesControlPlan() {
  const cols = "minmax(0,1fr) 104px 132px";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: first article inspection results with a failed characteristic escalated for disposition.">
      <div aria-hidden="true">
        <div className="dms-mockco__head">
          <span className="dms-mock__mono">{FAI.id}</span>
          <span className="dms-mock__title dms-mockco__title">{FAI.title}</span>
          <span className={"dms-mock__state " + stateClass(FAI.state)}>{FAI.state}</span>
        </div>
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Characteristic</span><span>Spec</span><span>Result</span>
        </div>
        {FAI.rows.map((r) => (
          <div key={r.char} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__title">{r.char}</span>
            <span className="dms-mock__mono">{r.spec}</span>
            <span className="dms-mock__mono">{r.result}</span>
          </div>
        ))}
        <div className="dms-mock__foot">Results captured on the floor · failed characteristic escalated with disposition</div>
      </div>
    </div>
  );
}

export const MES_MODULE_MOCKS: Record<string, React.ReactNode> = {
  "work-order-management": <MesWorkOrder />,
  "etravellers": <MesTraveller />,
  "fai-control-plan-execution": <MesControlPlan />,
  "inspections-forms-checklists": <MesInspection />,
  "electronic-batch-lot-records": <MesBatchRecord />,
};
