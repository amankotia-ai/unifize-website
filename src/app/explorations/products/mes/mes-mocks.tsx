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

export const MES_MODULE_MOCKS: Record<string, React.ReactNode> = {
  "work-order-management": <MesWorkOrder />,
  "etravellers": <MesTraveller />,
  "fai-control-plan-execution": <MesTraveller />,
  "inspections-forms-checklists": <MesTraveller />,
  "electronic-batch-lot-records": <MesBatchRecord />,
};
