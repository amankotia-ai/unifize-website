/* ============================================================================
 * mes-problem-board.tsx - the MES problem board's artifacts (24 Sep 2026),
 * drawn twice (Today / With Unifize). pbx grammar, one KIND of object per
 * loop so no two cards share a silhouette (and none repeats QMS/DMS/PLM):
 *
 *   retrieval - Batch record assembly: four systems, four counts of one lot
 *               (traveller, MES, ERP, QMS) in a 2x2; on the record one batch
 *               record built at the operation, every source landed.
 *   versions  - Inspection binding: the printed form at Rev D while
 *               the work order calls for Rev F; on the record the right
 *               revision arrives bound to the order.
 *   drift     - Lot traceability: the recall spreadsheet, hour 6, broken
 *               references; on the record the genealogy tree from supplier
 *               lot to every shipment.
 *   audit     - Shift handoff: the sticky note left for the next shift; on
 *               the record the decision, the reason and the signature.
 *
 * Presentational only (aria-hidden at the board). Styles:
 * _shared/problem-board.css (pbx).
 * ========================================================================== */
import { Fragment } from "react";
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

/* ------------------------------------------- batch record assembly */
function FourCounts({ after }: { after?: boolean }) {
  if (!after) {
    const tiles = [
      { sys: "Paper traveller", n: "500", paper: true },
      { sys: "MES", n: "498" },
      { sys: "ERP", n: "500" },
      { sys: "QMS", n: "496" },
    ];
    return (
      <div className="pbx-scene">
        <div className="pbx-quad">
          {tiles.map((t) => (
            <div key={t.sys} className={"pbx-quad__t" + (t.paper ? " is-paper" : "")}>
              <small>{t.sys}</small>
              <span>Lot B-2210</span>
              <b>{t.n}</b>
              <em>units good</em>
            </div>
          ))}
          <span className="pbx-quad__q"><Alert />4 counts, 1 lot</span>
        </div>
      </div>
    );
  }
  const src = ["Steps", "Consumption", "Checks", "Inspection"];
  return (
    <div className="pbx-scene">
      <div className="pbx-batch">
        <small>Batch record · Lot B-2210</small>
        <div className="pbx-batch__n">
          <b>498</b>
          <span>good<br />2 scrap, dispositioned</span>
        </div>
        <ul>
          {src.map((s) => (
            <li key={s}><Check />{s}</li>
          ))}
        </ul>
        <div className="pbx-batch__foot">Built at the operation, 14:02</div>
      </div>
    </div>
  );
}

/* ---------------------------------------------- inspection binding */
/* a printed controlled form (header table: form, rev, page) with the work
 * order's barcode label pinned over its corner. Today the form's Rev D
 * does not match the Rev F the order calls for; on the record they match
 * and the label reads bound. (24 Sep: replaced a wood clipboard that read
 * as clip-art next to the other cards.) */
function Barcode() {
  const bars = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2];
  let x = 0;
  return (
    <svg className="pbx-wo__bc" viewBox="0 0 66 18" preserveAspectRatio="none">
      {bars.map((w, i) => {
        const r = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={18} /> : null;
        x += w + 0.6;
        return r;
      })}
    </svg>
  );
}

function InspectionForm({ after }: { after?: boolean }) {
  const checks = ["Visual, no burrs", "Bore Ø36 gauge", after ? "Leak test, max 0.1 ml" : "Leak test, max 0.5 ml"];
  return (
    <div className="pbx-scene">
      <div className="pbx-form">
        <div className="pbx-form__hdr">
          <span className="pbx-form__title"><small>Controlled form</small>Final inspection</span>
          <span><small>Form</small>F-12</span>
          <span className={after ? "is-accent" : "is-tax"}><small>Rev</small>{after ? "F" : "D"}</span>
          <span><small>Page</small>1/1</span>
        </div>
        <ul>
          {checks.map((c, i) => (
            <li key={c} className={!after && i === 2 ? "is-hot" : undefined}>
              <span className={"pbx-form__box" + (i < 2 ? " is-on" : "")} />
              {c}
            </li>
          ))}
        </ul>
        <div className="pbx-form__sig"><span>Inspector</span><i /></div>
      </div>
      <div className={"pbx-wo" + (after ? " is-ok" : "")}>
        <Barcode />
        <b>WO-4471</b>
        <span>Needs F-12 <em>Rev F</em></span>
        <strong>{after ? <><Check />Bound, rev matches</> : <><Alert />Rev mismatch</>}</strong>
      </div>
    </div>
  );
}

/* ------------------------------------------------ lot traceability */
function RecallTrace({ after }: { after?: boolean }) {
  if (!after) {
    const rows = [
      ["B-2210", "Acme Med", "RM-88"],
      ["B-2211", "#REF!", "RM-88"],
      ["B-2214", "Northwell", "?"],
      ["B-2215", "#REF!", "RM-91"],
    ];
    return (
      <div className="pbx-scene">
        <div className="pbx-sheetx">
          <div className="pbx-win__bar"><span>recall_RM-88_v4 (2).xlsx</span></div>
          <div className="pbx-sheetx__grid">
            <span className="is-h" /><span className="is-h">A</span><span className="is-h">B</span><span className="is-h">C</span>
            <span className="is-h">1</span><span className="is-b">Lot</span><span className="is-b">Shipped to</span><span className="is-b">Input</span>
            {rows.map((r, i) => (
              <Fragment key={r[0]}>
                <span className="is-h">{i + 2}</span>
                {r.map((c, j) => (
                  <span key={i + "-" + j} className={c === "#REF!" || c === "?" ? "is-hot" : undefined}>{c}</span>
                ))}
              </Fragment>
            ))}
          </div>
          <div className="pbx-sheetx__tabs"><span className="is-on">Sheet1</span><span>ERP export</span><span>emails</span></div>
        </div>
        <span className="pbx-tag is-tax"><Alert />Recall, hour 6</span>
      </div>
    );
  }
  return (
    <div className="pbx-scene">
      <div className="pbx-gen">
        <span className="pbx-gen__node is-root"><small>Supplier lot</small>RM-88</span>
        <span className="pbx-gen__node is-mid"><small>Batch</small>B-2210</span>
        <span className="pbx-gen__node is-mid2"><small>Batch</small>B-2211</span>
        <span className="pbx-gen__node is-leaf1">Acme Med</span>
        <span className="pbx-gen__node is-leaf2">Northwell</span>
        <span className="pbx-gen__node is-leaf3">Stock, held</span>
        <svg className="pbx-gen__lines" viewBox="0 0 240 200" preserveAspectRatio="none">
          <path d="M120 40v22M120 62H62v18M120 62h58v18M62 112v26M62 138H36v12M62 138h52v12M178 112v38" />
        </svg>
        <span className="pbx-gen__foot"><Check />Scope in 18 min</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------- shift handoff */
function ShiftNote({ after }: { after?: boolean }) {
  if (!after) {
    return (
      <div className="pbx-scene">
        <div className="pbx-sticky">
          <span className="pbx-sticky__tape" />
          <p>Line 2 night: ran barrel at 182°, not 180. Lead said ok??</p>
          <span>~ K.</span>
        </div>
        <span className="pbx-tag is-tax"><Alert />Who approved it, and why?</span>
      </div>
    );
  }
  return (
    <div className="pbx-scene">
      <div className="pbx-entry">
        <div className="pbx-entry__head">
          <small>Lot B-2214 · Line 2 · Night</small>
          <b>Barrel temp 180 → 182 °C</b>
        </div>
        <dl>
          <div><dt>Reason</dt><dd>Resin lot viscosity high</dd></div>
          <div><dt>Approved</dt><dd>D. Fontaine, Process Eng.</dd></div>
          <div><dt>Limit</dt><dd>Within validated 176 to 186</dd></div>
        </dl>
        <div className="pbx-entry__sig"><Check />E-signed 02:14, on the batch</div>
      </div>
    </div>
  );
}

export const MES_BOARD_ARTIFACTS: ProblemBoardArtifacts = {
  retrieval: { before: <FourCounts />, after: <FourCounts after /> },
  versions: { before: <InspectionForm />, after: <InspectionForm after /> },
  drift: { before: <RecallTrace />, after: <RecallTrace after /> },
  audit: { before: <ShiftNote />, after: <ShiftNote after /> },
};
