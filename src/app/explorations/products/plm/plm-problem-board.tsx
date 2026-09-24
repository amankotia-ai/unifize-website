/* ============================================================================
 * plm-problem-board.tsx - the PLM problem board's artifacts (24 Sep 2026),
 * drawn twice (Today / With Unifize). pbx grammar, one KIND of object per
 * loop so no two cards share a silhouette (and none repeats QMS or DMS):
 *
 *   retrieval - Design traceability: the requirements spreadsheet and the
 *               test tool as two windows with the link between them broken;
 *               on the record one chain, requirement to output to test to
 *               result.
 *   versions  - Specification management: the part drawing with a tolerance
 *               locked at the gate and the supplier's capability stamped
 *               after the parts fail; on the record capability is verified
 *               before the lock.
 *   drift     - Verification & validation: a coverage ring with the
 *               requirements that have no linked test; on the record every
 *               requirement closes on its result.
 *   audit     - FMEA & control plan: the new programme's FMEA, blank, and a
 *               failure mode rediscovered that the last programme already
 *               solved; on the record catalogued modes and controls carried in.
 *
 * Presentational only (aria-hidden at the board). Styles:
 * _shared/problem-board.css (pbx).
 * ========================================================================== */
import type { ProblemBoardArtifacts } from "../_shared/problem-board";

function Check() {
  return (
    <svg className="pbx-ico is-ok" viewBox="0 0 14 14">
      <circle cx="7" cy="7" r="6.4" />
      <path d="m4.4 7.2 1.9 1.9 3.4-4" />
    </svg>
  );
}

function Alert() {
  return (
    <svg className="pbx-ico is-tax" viewBox="0 0 14 14">
      <circle cx="7" cy="7" r="6.4" />
      <path d="M7 3.8v3.8M7 10h.01" />
    </svg>
  );
}

function Lock() {
  return (
    <svg className="pbx-ico is-line" viewBox="0 0 14 14">
      <rect x="3" y="6.2" width="8" height="6" />
      <path d="M4.8 6.2V4.6a2.2 2.2 0 0 1 4.4 0v1.6" />
    </svg>
  );
}

/* ---------------------------------------------- design traceability */
function TraceSplit({ after }: { after?: boolean }) {
  if (!after) {
    return (
      <div className="pbx-scene pbx-split">
        <div className="pbx-win is-sheet">
          <div className="pbx-win__bar"><span>requirements_v7.xlsx</span></div>
          <div className="pbx-xl">
            <span className="is-h" /><span className="is-h">A</span><span className="is-h">B</span>
            <span className="is-h">4</span><span>REQ-041</span><span>Seal holds 2 bar</span>
            <span className="is-h">5</span><span className="is-hot">REQ-042</span><span className="is-hot">Leak &lt; 0.1 ml</span>
            <span className="is-h">6</span><span>REQ-043</span><span>IP67 rated</span>
          </div>
        </div>
        <div className="pbx-win is-test">
          <div className="pbx-win__bar"><span>Test results</span></div>
          <ul>
            <li><b>TR-88</b><span>Pressure, 2 bar</span><em>Pass</em></li>
            <li><b>TR-91</b><span>Leak, rev B unit</span><em>Pass</em></li>
          </ul>
        </div>
        <span className="pbx-break"><Alert />Which test closed REQ-042?</span>
      </div>
    );
  }
  const chain = [
    ["REQ-042", "Leak < 0.1 ml"],
    ["DO-17", "Seal geometry rev C"],
    ["TP-91", "Leak test, rev C"],
    ["TR-91", "Pass, 0.04 ml"],
  ];
  return (
    <div className="pbx-scene">
      <ol className="pbx-chain">
        {chain.map(([id, what], i) => (
          <li key={id} className={i === chain.length - 1 ? "is-end" : undefined}>
            <b>{id}</b>
            <span>{what}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ----------------------------------------- specification management */
function PartDrawing({ after }: { after?: boolean }) {
  return (
    <div className="pbx-scene">
      <div className="pbx-dwg">
        <svg viewBox="0 0 220 128" className="pbx-dwg__svg">
          {/* the flange in section: outer ring, bore, bolt holes */}
          <circle className="pbx-dwg__part" cx="74" cy="66" r="42" />
          <circle className="pbx-dwg__part" cx="74" cy="66" r="18" />
          {[0, 90, 180, 270].map((a) => (
            <circle
              key={a}
              className="pbx-dwg__part"
              cx={74 + 30 * Math.cos((a * Math.PI) / 180)}
              cy={66 + 30 * Math.sin((a * Math.PI) / 180)}
              r="4"
            />
          ))}
          <path className="pbx-dwg__cl" d="M26 66h96M74 18v96" />
          {/* the bore callout */}
          <path className="pbx-dwg__lead" d="M87 53 132 30h74" />
          <text className={"pbx-dwg__dim" + (after ? " is-accent" : " is-tax")} x={136} y={25}>
            {after ? "Ø36.00 ±0.05" : "Ø36.00 ±0.01"}
          </text>
        </svg>
        <div className="pbx-dwg__block">
          <span><b>P/N 2210</b> Flange, cast</span>
          <span className="pbx-dwg__lock"><Lock />Locked at Gate 3</span>
        </div>
      </div>
      {after ? (
        <span className="pbx-tag is-ok"><Check />Supplier Cpk 1.67, verified before lock</span>
      ) : (
        <span className="pbx-tag is-tax"><Alert />Supplier Cpk 0.8, 6 of 20 parts fail</span>
      )}
    </div>
  );
}

/* ------------------------------------------ verification & validation */
function CoverageRing({ after }: { after?: boolean }) {
  const pct = after ? 100 : 87;
  const C = 2 * Math.PI * 34;
  return (
    <div className="pbx-scene">
      <div className="pbx-cov">
        <div className="pbx-cov__top">
          <svg viewBox="0 0 84 84" className="pbx-cov__ring">
            <circle className="pbx-cov__track" cx="42" cy="42" r="34" />
            <circle
              className={"pbx-cov__arc" + (after ? " is-accent" : "")}
              cx="42"
              cy="42"
              r="34"
              strokeDasharray={`${(C * pct) / 100} ${C}`}
            />
            <text x="42" y="46" textAnchor="middle" className="pbx-cov__pct">{pct}%</text>
          </svg>
          <span className="pbx-cov__lab">
            <small>Design verification</small>
            <b>{after ? "All requirements closed" : "14 requirements open"}</b>
            <span>Pump housing · rev C</span>
          </span>
        </div>
        <ul>
          {(after
            ? [["REQ-118", "TR-204 Pass"], ["REQ-203", "TR-211 Pass"]]
            : [["REQ-118", "No linked test"], ["REQ-203", "No linked test"]]
          ).map(([id, st]) => (
            <li key={id}>
              {after ? <Check /> : <Alert />}
              <b>{id}</b>
              <span className={after ? "is-accent" : "is-tax"}>{st}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------ FMEA & control plan */
function FmeaTable({ after }: { after?: boolean }) {
  const rows = after
    ? [
        { mode: "Seal leak", ctl: "Leak test 100%", rpn: 48, lib: true },
        { mode: "Bore oversize", ctl: "Cpk gate", rpn: 36, lib: true },
        { mode: "Thread strip", ctl: "Torque audit", rpn: 24, lib: true },
      ]
    : [
        { mode: "Seal leak", ctl: "", rpn: 210, lib: false },
        { mode: "Bore oversize", ctl: "", rpn: 168, lib: false },
        { mode: "", ctl: "", rpn: 0, lib: false },
      ];
  const heat = (r: number) => (r >= 150 ? "is-hi" : r >= 60 ? "is-mid" : r > 0 ? "is-lo" : "");
  return (
    <div className="pbx-scene">
      <div className="pbx-fmea">
        <div className="pbx-fmea__head">
          <b>Programme C · DFMEA</b>
          <span>{after ? "12 modes from library" : "Started from blank"}</span>
        </div>
        <div className="pbx-fmea__row is-h">
          <span>Failure mode</span>
          <span>Control</span>
          <span>RPN</span>
        </div>
        {rows.map((r, i) => (
          <div className="pbx-fmea__row" key={i}>
            <span className={r.mode ? "" : "is-blank"}>
              {r.mode}
              {r.lib ? <em>Library</em> : null}
            </span>
            <span className={r.ctl ? "" : "is-blank"}>{r.ctl}</span>
            <span className={"pbx-fmea__rpn " + heat(r.rpn)}>{r.rpn || ""}</span>
          </div>
        ))}
        <div className={"pbx-fmea__foot" + (after ? "" : " is-tax")}>
          {after ? <><Check />Controls carried from Programme A</> : <><Alert />Solved on Programme A, 2024</>}
        </div>
      </div>
    </div>
  );
}

export const PLM_BOARD_ARTIFACTS: ProblemBoardArtifacts = {
  retrieval: { before: <TraceSplit />, after: <TraceSplit after /> },
  versions: { before: <PartDrawing />, after: <PartDrawing after /> },
  drift: { before: <CoverageRing />, after: <CoverageRing after /> },
  audit: { before: <FmeaTable />, after: <FmeaTable after /> },
};
