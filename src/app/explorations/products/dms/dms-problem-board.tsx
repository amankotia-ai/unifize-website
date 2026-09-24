/* ============================================================================
 * dms-problem-board.tsx - the DMS problem board's artifacts (24 Sep 2026),
 * drawn twice (Today / With Unifize). Same pbx grammar as the QMS set, and
 * the same rule: each loop is a different KIND of object, so no two cards
 * share a silhouette.
 *
 *   audit     - Evidence assembly: the shared-drive folder tree for one SOP,
 *               renamed exports and forwarded mail, day 3 of the hunt; on
 *               the record, the SOP's evidence already attached, one export.
 *   versions  - Version control: three copies of SOP-118 fanned out, each
 *               claiming to be current; on the record one effective version
 *               stamped, the strays superseded behind it.
 *   change    - Change effectivity: the tablet at the line station still on
 *               Rev B while Rev C was approved in March, a rejected part
 *               tagged; on the record Rev C is live on the station.
 *   training  - Training cascade: the training matrix, people by procedure,
 *               the new revision's column mostly empty and overdue; on the
 *               record every row assigned on release.
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

function Folder({ open }: { open?: boolean }) {
  return (
    <svg className="pbx-tree__ico is-folder" viewBox="0 0 14 14">
      <path d={open ? "M1.5 3.5h4l1.2 1.4h5.8v6.6h-11z" : "M1.5 3h4l1.2 1.4h5.8V11h-11z"} />
    </svg>
  );
}

function Doc() {
  return (
    <svg className="pbx-tree__ico" viewBox="0 0 14 14">
      <path d="M3.4 1.6h4.6L10.6 4.2v8.2H3.4zM7.8 1.8v2.6h2.6" />
    </svg>
  );
}

/* ------------------------------------------------ evidence assembly */
function DriveTree({ after }: { after?: boolean }) {
  if (!after) {
    return (
      <div className="pbx-scene">
        <div className="pbx-tree">
          <div className="pbx-tree__search">
            <svg viewBox="0 0 14 14"><circle cx="6" cy="6" r="4" /><path d="m9 9 3.4 3.4" /></svg>
            <span>SOP-118 signed approval</span>
            <em>0 results</em>
          </div>
          <ul>
            <li className="is-dir"><Folder />Audit 2026</li>
            <li className="is-dir is-in1"><Folder open />SOP-118</li>
            <li className="is-in2"><Doc />exports_FINAL_v2.xlsx</li>
            <li className="is-in2"><Doc />approval_scan (2).pdf</li>
            <li className="is-in2"><Doc />RE: RE: training recs.msg</li>
            <li className="is-in2"><Doc />screenshot 14-03.png</li>
            <li className="is-dir is-in1"><Folder />SOP-118 (old)</li>
          </ul>
          <div className="pbx-tree__foot"><Alert />Day 3 · 9 of 14 items found</div>
        </div>
      </div>
    );
  }
  const rows = [
    ["Approvals", "3 e-signatures"],
    ["Training", "24 of 24"],
    ["Linked change", "CC-2148"],
    ["Revision history", "v1.0 to v3.2"],
  ];
  return (
    <div className="pbx-scene">
      <div className="pbx-rec">
        <div className="pbx-rec__head">
          <span>
            <b>SOP-118</b>
            Cleaning validation
          </span>
          <em>v3.2 Effective</em>
        </div>
        <ul>
          {rows.map(([k, v]) => (
            <li key={k}>
              <Check />
              <span>{k}</span>
              <small>{v}</small>
            </li>
          ))}
        </ul>
        <div className="pbx-rec__btn">Export audit trail</div>
      </div>
    </div>
  );
}

/* --------------------------------------------------- version control */
function FannedCopies({ after }: { after?: boolean }) {
  const sheets = [
    { v: "v2.8", where: "Laminated" },
    { v: "v3.1", where: "Shared drive" },
    { v: "v3.2", where: "Controlled system" },
  ];
  return (
    <div className={"pbx-scene pbx-fan" + (after ? " is-after" : "")}>
      {sheets.map((s, i) => (
        <div key={s.v} className={"pbx-sheet is-" + i}>
          <div className="pbx-sheet__top">
            <b className="pbx-sheet__v">{s.v}</b>
            <span className="pbx-sheet__where">{after && i < 2 ? "Superseded" : s.where}</span>
          </div>
          <span className="pbx-sheet__id">SOP-118 Cleaning validation</span>
          <i className="pbx-bar" />
          <i className="pbx-bar is-mid" />
          <i className="pbx-bar is-short" />
          {after && i === 2 ? <span className="pbx-stamp">Effective</span> : null}
        </div>
      ))}
      {!after ? <span className="pbx-fan__q"><Alert />Which one is current?</span> : null}
    </div>
  );
}

/* ------------------------------------------------ change effectivity */
function StationTablet({ after }: { after?: boolean }) {
  return (
    <div className="pbx-scene">
      <div className="pbx-tab">
        <div className="pbx-tab__screen">
          <div className="pbx-tab__top">
            <span>Line 3 · Station 4</span>
            <span>07:42</span>
          </div>
          <div className="pbx-tab__title">
            <b>WI-204 Torque sequence</b>
            <em className={after ? "is-accent" : "is-tax"}>{after ? "Rev C" : "Rev B"}</em>
          </div>
          <div className={"pbx-tab__banner" + (after ? " is-accent" : " is-tax")}>
            {after ? <><Check />Effective today, pushed on release</> : <><Alert />Rev C approved Mar 12, not here</>}
          </div>
          <ol className="pbx-tab__steps">
            <li><span>1</span><i className="pbx-bar" /></li>
            <li><span>2</span><i className="pbx-bar is-mid" /></li>
            <li><span>3</span><i className="pbx-bar is-short" /></li>
          </ol>
        </div>
      </div>
      {after ? (
        <span className="pbx-tag is-ok"><Check />Operator acknowledged</span>
      ) : (
        <span className="pbx-tag is-tax"><Alert />Part rejected, old torque</span>
      )}
    </div>
  );
}

/* ------------------------------------------------- training cascade */
function TrainingMatrix({ after }: { after?: boolean }) {
  const people = [
    { n: "J. Rivera", av: "JR", s: "done" },
    { n: "M. Osei", av: "MO", s: "late" },
    { n: "D. Fontaine", av: "DF", s: "none" },
    { n: "A. Khan", av: "AK", s: "late" },
    { n: "L. Chen", av: "LC", s: "none" },
  ];
  return (
    <div className="pbx-scene">
      <div className="pbx-mx">
        <div className="pbx-mx__row pbx-mx__head">
          <span>Operator</span>
          <span>SOP-122</span>
          <span>WI-204</span>
          <span className={after ? "is-accent" : "is-tax"}>SOP-118 v3.2</span>
        </div>
        {people.map((p) => (
          <div className="pbx-mx__row" key={p.n}>
            <span className="pbx-mx__who"><span className="pbx-mx__av">{p.av}</span>{p.n}</span>
            <span className="pbx-mx__c is-old">✓</span>
            <span className="pbx-mx__c is-old">✓</span>
            {after ? (
              <span className="pbx-mx__c is-ok">{p.s === "done" ? "✓" : "Assigned"}</span>
            ) : p.s === "done" ? (
              <span className="pbx-mx__c is-old">✓</span>
            ) : p.s === "late" ? (
              <span className="pbx-mx__c is-late">21d late</span>
            ) : (
              <span className="pbx-mx__c is-none" />
            )}
          </div>
        ))}
        <div className={"pbx-mx__foot" + (after ? "" : " is-tax")}>
          {after ? <><Check />Assigned on release · Mar 12</> : <><Alert />Released Mar 12 · 1 of 5 trained</>}
        </div>
      </div>
    </div>
  );
}

export const DMS_BOARD_ARTIFACTS: ProblemBoardArtifacts = {
  audit: { before: <DriveTree />, after: <DriveTree after /> },
  versions: { before: <FannedCopies />, after: <FannedCopies after /> },
  change: { before: <StationTablet />, after: <StationTablet after /> },
  training: { before: <TrainingMatrix />, after: <TrainingMatrix after /> },
};

/* the AFTER line per loop (was the ctax ledger's after-notes) */
export const DMS_BOARD_AFTER_NOTES: Record<string, string> = {
  audit: "All evidence captured and attached in one place.",
  versions: "Always one source of truth.",
  change: "Automatically notified. Effective everywhere.",
  training: "Automatically assigned. Automatically tracked.",
};
