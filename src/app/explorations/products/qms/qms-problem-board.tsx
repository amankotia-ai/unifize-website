/* ============================================================================
 * qms-problem-board.tsx - the QMS problem board's artifacts, drawn twice
 * (Today / With Unifize) so the board's switch reads as the same object
 * changing state.
 *
 * 24 Sep 2026 rework (Abhishek: "they all look so similar"): the first cut
 * was four white windows with the same title bar and rows. Now each loop is
 * a different KIND of object with its own silhouette:
 *
 *   retrieval - Finding ownership: a page of the audit report, finding 12
 *               marked up, and an owner field floating off it. Today the
 *               field is empty and ageing; on the record it holds a person
 *               and a due date.
 *   versions  - CAPA effectiveness: a month calendar. Today the check date
 *               passed, the days after it slip, the defect recurs on the
 *               12th; on the record a verification window spans the month
 *               and a close gate sits at its end.
 *   drift     - Supplier quality: a defect-rate chart per lot against the
 *               limit. Today the SCAR closes and the line climbs back over
 *               the limit; on the record the line drops and stays under.
 *   audit     - Audit evidence: loose files scattered round an empty slot;
 *               on the record, one bound packet with the chain listed.
 *
 * Presentational only (aria-hidden at the board). Status = icon + label
 * colour, never a coloured edge. Styles: _shared/problem-board.css (pbx).
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

function Clock() {
  return (
    <svg className="pbx-ico is-line" viewBox="0 0 14 14">
      <circle cx="7" cy="7" r="5.6" />
      <path d="M7 4.2V7l1.9 1.2" />
    </svg>
  );
}

/* ------------------------------------------------ finding ownership */
function AuditPage({ after }: { after?: boolean }) {
  return (
    <div className="pbx-scene pbx-scene--doc">
      <div className="pbx-doc">
        <div className="pbx-doc__head">
          <span>Internal audit report</span>
          <span>IA-2026-03 · p.4</span>
        </div>
        <i className="pbx-bar" />
        <i className="pbx-bar is-short" />
        <div className={"pbx-doc__finding" + (after ? " is-owned" : "")}>
          <b>Finding 12</b>
          <span>Line 2 training records missing.</span>
        </div>
        <i className="pbx-bar" />
        <i className="pbx-bar is-mid" />
        <i className="pbx-bar is-short" />
      </div>
      {after ? (
        <div className="pbx-float pbx-owner">
          <span className="pbx-float__lab">Owner</span>
          <span className="pbx-owner__who">
            <span className="pbx-av">MO</span>
            M. Osei
          </span>
          <span className="pbx-due"><Clock />Due Jul 14</span>
        </div>
      ) : (
        <div className="pbx-float pbx-owner is-empty">
          <span className="pbx-float__lab">Owner</span>
          <span className="pbx-owner__slot">Unassigned</span>
          <span className="pbx-due is-tax"><Alert />34 days open</span>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------- CAPA effectiveness */
function MonthCalendar({ after }: { after?: boolean }) {
  /* July 2026 opens on a Wednesday: two blanks, then 31 days */
  const days = Array.from({ length: 35 }, (_, i) => i - 1);
  const today = 24;
  const cls = (d: number) => {
    if (d < 1 || d > 31) return "is-blank";
    const c: string[] = [];
    if (after) {
      if (d >= 6 && d <= 27) c.push("in-window");
      if (d === 27) c.push("is-gate");
    } else {
      if (d === 3) c.push("is-target");
      if (d > 3 && d < today) c.push("is-slip");
      if (d === 12) c.push("is-recur");
    }
    if (d === today) c.push("is-today");
    return c.join(" ");
  };
  return (
    <div className="pbx-scene">
      <div className="pbx-cal">
        <div className="pbx-cal__head">
          <b>July 2026</b>
          <span>CAPA-2148</span>
        </div>
        <div className="pbx-cal__dow">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
        </div>
        <div className="pbx-cal__grid">
          {days.map((d, i) => (
            <span key={i} className={cls(d)}>{d >= 1 && d <= 31 ? d : ""}</span>
          ))}
        </div>
        <div className={"pbx-cal__foot" + (after ? "" : " is-tax")}>
          {after ? (
            <><Check />Window open · 0 recurrences</>
          ) : (
            <><Alert />Check due Jul 3 · recurred Jul 12</>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- supplier quality */
function DefectChart({ after }: { after?: boolean }) {
  /* defect rate per lot, 0..10 %, limit at 3 % */
  const pts = after ? [7.4, 6.8, 7.9, 2.4, 1.6, 1.2, 0.9] : [7.4, 6.8, 7.9, 2.4, 6.2, 7.1, 8.0];
  const X = (i: number) => 22 + i * 35;
  const Y = (v: number) => 130 - v * 11;
  const line = pts.map((v, i) => `${i ? "L" : "M"}${X(i)} ${Y(v)}`).join(" ");
  const markX = X(3) + 17;
  return (
    <div className="pbx-scene">
      <div className="pbx-chart">
        <div className="pbx-chart__head">
          <b>Acme Castings</b>
          <span>Defect rate by lot</span>
        </div>
        <svg viewBox="0 0 254 152" className="pbx-chart__svg">
          {[130, 97, 64, 31].map((y) => <path key={y} className="pbx-grid" d={`M8 ${y}H248`} />)}
          <path className="pbx-limit" d={`M8 ${Y(3)}H248`} />
          <text className="pbx-limit__lab" x={246} y={Y(3) - 5} textAnchor="end">LIMIT 3%</text>
          <path className="pbx-mark" d={`M${markX} 20V130`} />
          <rect className={"pbx-mark__tag" + (after ? " is-accent" : "")} x={markX - 44} y={4} width={88} height={16} />
          <text className={"pbx-mark__lab" + (after ? " is-accent" : "")} x={markX} y={15} textAnchor="middle">
            {after ? "CHANGE VERIFIED" : "SCAR CLOSED"}
          </text>
          <path className={"pbx-line" + (after ? " is-good" : "")} d={line} />
          {pts.map((v, i) => (
            <circle key={i} cx={X(i)} cy={Y(v)} r={3.6} className={v > 3 ? "pbx-pt is-bad" : "pbx-pt is-good"} />
          ))}
          {["4468", "4469", "4470", "4471", "4472", "4473", "4474"].map((n, i) => (
            <text key={n} className="pbx-axis" x={X(i)} y={146} textAnchor="middle">{n}</text>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- audit evidence */
function EvidencePile({ after }: { after?: boolean }) {
  if (!after) {
    return (
      <div className="pbx-scene pbx-scene--pile">
        <span className="pbx-slot">Effectiveness data?</span>
        <div className="pbx-tile" style={{ left: "0%", top: "4%", rotate: "-6deg" }}>
          <span className="pbx-tile__ico is-sheet">
            <svg viewBox="0 0 20 20"><rect x="2" y="3" width="16" height="14" /><path d="M2 8h16M2 12.5h16M8 3v14" /></svg>
          </span>
          NC-311_export.xlsx
        </div>
        <div className="pbx-tile" style={{ right: "0%", top: "0%", rotate: "5deg" }}>
          <span className="pbx-tile__ico is-mail">
            <svg viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" /><path d="m2 4 8 6.5L18 4" /></svg>
          </span>
          FW: FW: verification
        </div>
        <div className="pbx-tile is-shot" style={{ left: "2%", bottom: "4%", rotate: "4deg" }}>
          <span className="pbx-shot"><i /><i /><i /></span>
          screenshot_0412.png
        </div>
        <div className="pbx-tile" style={{ right: "2%", bottom: "0%", rotate: "-4deg" }}>
          <span className="pbx-tile__ico is-pdf">PDF</span>
          signoff_scan.pdf
        </div>
      </div>
    );
  }
  const chain = [
    ["NC-311", "Event raised"],
    ["CAPA-2148", "Root cause, action"],
    ["VR-88", "Effectiveness verified"],
    ["E-SIG", "Closed, Part 11 signed"],
  ];
  return (
    <div className="pbx-scene pbx-scene--packet">
      <div className="pbx-packet">
        <i className="pbx-packet__sheet is-3" />
        <i className="pbx-packet__sheet is-2" />
        <div className="pbx-packet__front">
          <div className="pbx-packet__head">
            <b>Audit packet</b>
            <span>CAPA-2148</span>
          </div>
          <ol>
            {chain.map(([id, what]) => (
              <li key={id}>
                <Check />
                <b>{id}</b>
                <span>{what}</span>
              </li>
            ))}
          </ol>
        </div>
        <span className="pbx-seal">
          <svg viewBox="0 0 24 24">
            <path d="M12 2.8 19 5.6v5.7c0 4.5-3 8.5-7 9.9-4-1.4-7-5.4-7-9.9V5.6L12 2.8Z" />
            <path className="pbx-seal__tick" d="m8.7 12 2.1 2.1 4.5-4.7" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export const QMS_BOARD_ARTIFACTS: ProblemBoardArtifacts = {
  retrieval: { before: <AuditPage />, after: <AuditPage after /> },
  versions: { before: <MonthCalendar />, after: <MonthCalendar after /> },
  drift: { before: <DefectChart />, after: <DefectChart after /> },
  audit: { before: <EvidencePile />, after: <EvidencePile after /> },
};
