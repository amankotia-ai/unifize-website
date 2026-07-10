/* ----------------------------------------------------------------------------
 * plm-mocks.tsx - coded product prototypes for the PLM page.
 * Static, illustrative slices grounded in the real PLM modules (Product
 * Specifications, Design Controls & Traceability, FMEA & Control Plan
 * Definition) from the Unifize Products database; record IDs are illustrative.
 * Reuses the shared `.dms-mock*` atoms; per-view column templates set inline.
 * -------------------------------------------------------------------------- */

const stateClass = (s: string) => "is-" + s.toLowerCase().replace(/\s+/g, "-");

/* product specification record — controlled characteristics + approval */
const SPEC = {
  id: "SPEC-4471",
  title: "Housing, moulded · finished good",
  rev: "C",
  state: "Effective",
  rows: [
    { char: "Wall thickness", nominal: "2.40 mm", tol: "±0.10", method: "CMM", key: true },
    { char: "Durometer", nominal: "72 A", tol: "±3", method: "Shore gauge" },
    { char: "Tensile strength", nominal: "28 MPa", tol: "min", method: "Instron" },
    { char: "Colour ΔE", nominal: "1.0", tol: "max 2.0", method: "Spectro" },
  ],
  foot: "Rev C effective · approval routed to Design + Quality · version history retained",
};

export function PlmSpecRecord() {
  const cols = "minmax(0,1fr) 84px 78px 96px";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: product specification SPEC-4471, revision C effective, with controlled characteristics and inspection methods.">
      <div aria-hidden="true">
        <div className="dms-mockco__head">
          <span className="dms-mock__mono">{SPEC.id}</span>
          <span className="dms-mock__title dms-mockco__title">{SPEC.title}</span>
          <span className={"dms-mock__state " + stateClass(SPEC.state)}>Rev {SPEC.rev} · {SPEC.state}</span>
        </div>
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Characteristic</span><span>Nominal</span><span>Tol</span><span>Method</span>
        </div>
        {SPEC.rows.map((r) => (
          <div key={r.char} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__title">{r.char}</span>
            <span className="dms-mock__mono">{r.nominal}</span>
            <span className="dms-mock__mono">{r.tol}</span>
            <span className="dms-mock__mono">{r.method}</span>
          </div>
        ))}
        <div className="dms-mock__foot">{SPEC.foot}</div>
      </div>
    </div>
  );
}

/* design controls traceability — requirement to verification to validation */
const TRACE: { req: string; output: string; verif: string; state: string; key?: boolean }[] = [
  { req: "UN-04 · Seal integrity", output: "DO-11 · Gasket geometry", verif: "VT-21 · Leak test", state: "Verified" },
  { req: "UN-07 · Grip force", output: "DO-14 · Rib pattern", verif: "VT-24 · Force rig", state: "Verified", key: true },
  { req: "UN-09 · Sterilisable", output: "DO-16 · Material grade", verif: "VT-27 · Autoclave", state: "In test" },
  { req: "UN-12 · Legibility", output: "DO-19 · Label spec", verif: "VAL-06 · Human factors", state: "Planned" },
];

export function PlmTraceMatrix() {
  const cols = "minmax(0,1fr) minmax(0,1fr) minmax(0,0.9fr) 96px";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: design controls traceability matrix linking user needs to design outputs, verification, and validation.">
      <div aria-hidden="true">
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Requirement</span><span>Design output</span><span>Verification</span><span>State</span>
        </div>
        {TRACE.map((r) => (
          <div key={r.req} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__title">{r.req}</span>
            <span className="dms-mockco__meaning">{r.output}</span>
            <span className="dms-mockco__meaning">{r.verif}</span>
            <span className={"dms-mock__state " + stateClass(r.state)}>{r.state}</span>
          </div>
        ))}
        <div className="dms-mock__foot">Requirement → output → verification → validation · trace closed at release</div>
      </div>
    </div>
  );
}

/* FMEA + control plan — failure mode, S/O/D, RPN, control */
const FMEA: { mode: string; s: number; o: number; d: number; rpn: number; control: string; key?: boolean }[] = [
  { mode: "Incomplete seal", s: 8, o: 3, d: 4, rpn: 96, control: "100% leak test" },
  { mode: "Flash at parting line", s: 4, o: 5, d: 3, rpn: 60, control: "Visual AQL" },
  { mode: "Short shot", s: 7, o: 4, d: 5, rpn: 140, control: "Cavity pressure", key: true },
  { mode: "Colour drift", s: 3, o: 4, d: 2, rpn: 24, control: "First-off ΔE" },
];

export function PlmFmea() {
  const cols = "minmax(0,1fr) 30px 30px 30px 56px minmax(0,0.9fr)";
  return (
    <div className="dms-mock" role="img" aria-label="Product prototype: process FMEA with severity, occurrence, detection, RPN, and the control plan reference for each failure mode.">
      <div aria-hidden="true">
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Failure mode</span><span>S</span><span>O</span><span>D</span><span>RPN</span><span>Control</span>
        </div>
        {FMEA.map((r) => (
          <div key={r.mode} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__title">{r.mode}</span>
            <span className="dms-mock__mono">{r.s}</span>
            <span className="dms-mock__mono">{r.o}</span>
            <span className="dms-mock__mono">{r.d}</span>
            <span className={"dms-mock__mono" + (r.key ? " pk-rpn-hi" : "")}>{r.rpn}</span>
            <span className="dms-mockco__meaning">{r.control}</span>
          </div>
        ))}
        <div className="dms-mock__foot">dFMEA + pFMEA · RPN drives control plan · high RPN escalates to design review</div>
      </div>
    </div>
  );
}

export const PLM_MODULE_MOCKS: Record<string, React.ReactNode> = {
  "product-specifications": <PlmSpecRecord />,
  "product-risk-management": <PlmFmea />,
  "design-controls-traceability": <PlmTraceMatrix />,
  "inspection-process-parameters": <PlmSpecRecord />,
  "fmea-control-plan": <PlmFmea />,
};
