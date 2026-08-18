/* ============================================================================
 * mes-ctax.tsx - the MES page's coordination-tax ledger content: four drawn
 * before/after scene pairs plus the section's copy, fed into the shared
 * StylizedCoordinationTax treatment from the stylized DMS page. Stage rows
 * (category, metric, tax, outcome) come from MES_PROBLEMS, which traces to
 * the Pain Points DB (PP-13 parallel batch records, PP-14 inspection
 * binding, PP-55 lot traceability, PP-12 shift handoff); the after-notes
 * state what the record does instead, grounded in the MES modules' Notion
 * promises (eTravellers "the record builds itself", Inspections "checks
 * where the work is", Electronic Batch/Lot Records "traceable by lot").
 * Copy is Notion-editable through mesCopy (Copy Fields keys "mes/ctax.*").
 * ========================================================================== */
import {
  Badge,
  Card,
  Person,
  Tile,
  type CtaxCopy,
  type CtaxScenes,
} from "../dms/stylized/stylized-ctax";
import { mesCopy } from "./mes-copy";

/* the results-sheet tile face, reused across scenes */
function SheetFace() {
  return (
    <>
      <rect className="sctx-glyph-fill is-sheet" height="20" rx="2" width="20" />
      <path className="sctx-glyph is-onfill" d="M3.5 7h13M3.5 11h13M3.5 15h13M8.5 3.5v15" />
    </>
  );
}

/* a genealogy node: a small card with two record lines */
function NodeFace() {
  return <path className="sctx-cardline" d="M7 9h26M7 17h18" />;
}

/* ------------------------------------------------------------- the scenes */

/* Batch record assembly: one lot scattered across paper, MES, ERP, and QMS;
 * then one record, built at the operation. */
function SceneRetrievalBefore() {
  return (
    <>
      {/* the paper traveller */}
      <Card h={50} rotate={-5} tone="stale" w={40} x={16} y={14}>
        <path className="sctx-fold" d="M28 0h12v12z" />
        <path className="sctx-cardline" d="M8 16h20M8 24h24M8 32h16" />
      </Card>
      {/* the MES terminal */}
      <Tile rotate={3} x={112} y={16}>
        <path className="sctx-glyph" d="M0 2.5h20v12.5H0zM7 19h6M10 15v4" />
      </Tile>
      {/* the ERP consumption sheet */}
      <Tile rotate={4} x={18} y={112}>
        <SheetFace />
      </Tile>
      {/* the QMS inspection clipboard */}
      <Tile rotate={-3} x={110} y={110}>
        <path className="sctx-glyph" d="M5 3h10v15.5H5zM8 3V1.5h4V3M8 8.5h4M8 12.5h4" />
      </Tile>
      {/* the lot they all claim to describe */}
      <Card h={28} w={52} x={58} y={70}>
        <text className="sctx-tag is-warn" x={6} y={18.5}>L-4471</text>
      </Card>
      <path className="sctx-scatter" d="M52 60 62 70M116 56 104 70M54 112 64 98M114 108 104 98" />
      <Badge kind="err" x={110} y={70} />
    </>
  );
}

function SceneRetrievalAfter() {
  return (
    <>
      {/* the operator, building the record at the operation */}
      <Person scale={1.05} x={36} y={58} />
      <path className="sctx-arc" d="M56 66c10-4 18-4 28-3" />
      <Card h={70} tone="key" w={58} x={84} y={36}>
        <rect className="sctx-spine" height={70} width={5} />
        <text className="sctx-tag" x={11} y={17}>L-4471</text>
        <path className="sctx-check" d="m14 29 3 3 5.6-6.4M14 44.5l3 3 5.6-6.4" />
        <path className="sctx-cardline" d="M32 30.5h18M32 46h18M12 60h38" />
      </Card>
      <Badge kind="clip" x={142} y={106} />
    </>
  );
}

/* Inspection binding: two checklist revisions, joined to the order only by
 * operator memory; then the checklist arrives bound at the right revision. */
function SceneVersionsBefore() {
  return (
    <>
      <Card h={56} w={44} x={20} y={30}>
        <text className="sctx-tag" x={8} y={16}>WO-88</text>
        <path className="sctx-cardline" d="M8 26h28M8 34h28M8 42h16" />
      </Card>
      {/* two checklists, competing revisions */}
      <Card h={52} rotate={4} tone="stale" w={52} x={92} y={16}>
        <text className="sctx-vnum" x={7} y={20}>Rev B</text>
        <path className="sctx-cardline" d="M7 30h36M7 38h36" />
      </Card>
      <Card h={52} rotate={-3} w={52} x={100} y={82}>
        <text className="sctx-vnum is-warn" x={7} y={20}>Rev C</text>
        <path className="sctx-cardline" d="M7 30h36M7 38h36" />
      </Card>
      {/* operator memory, the only join */}
      <Person tone="quiet" x={56} y={124} />
      <path className="sctx-scatter" d="M66 112c12-12 18-26 24-40M68 118c10-2 18-6 26-12" />
      <Badge kind="err" x={100} y={84} />
    </>
  );
}

function SceneVersionsAfter() {
  return (
    <>
      <Card h={58} w={44} x={24} y={44}>
        <text className="sctx-tag" x={8} y={16}>WO-88</text>
        <path className="sctx-cardline" d="M8 26h28M8 34h28M8 42h16" />
      </Card>
      <path className="sctx-arc" d="M68 73h18" />
      {/* the one checklist, at the effective revision */}
      <Card h={68} tone="accent" w={56} x={86} y={38}>
        <text className="sctx-vnum is-oncolor" x={9} y={22}>Rev C</text>
        <path className="sctx-cardline" d="M9 32h38M9 41h38" />
        <g className="sctx-pill is-inverse" transform="translate(9 52)">
          <rect height="13" rx="2" width="38" />
          <text x={19} y={9.2}>BOUND</text>
        </g>
      </Card>
      <Badge kind="clip" x={77} y={73} />
    </>
  );
}

/* Lot traceability: the genealogy tree breaks at the supplier handoff;
 * then every branch is already linked. */
function SceneDriftBefore() {
  return (
    <>
      <Card h={26} w={52} x={58} y={14}>
        <text className="sctx-tag is-warn" x={6} y={17}>L-4471</text>
      </Card>
      <path className="sctx-scatter" d="M72 42 48 62M96 42l26 20" />
      <Card h={26} tone="stale" w={40} x={26} y={64}>
        <NodeFace />
      </Card>
      <Card h={26} tone="stale" w={40} x={102} y={64}>
        <NodeFace />
      </Card>
      <path className="sctx-scatter" d="M44 90v22M124 90c0 10-2 18-8 26" />
      <Card h={26} tone="stale" w={40} x={24} y={112}>
        <NodeFace />
      </Card>
      {/* the supplier handoff, where the trail ends */}
      <Badge kind="err" x={112} y={124} />
    </>
  );
}

function SceneDriftAfter() {
  return (
    <>
      <Card h={28} tone="accent" w={48} x={60} y={12}>
        <g className="sctx-pill is-inverse" transform="translate(6 8)">
          <rect height="13" rx="2" width="36" />
          <text x={18} y={9.2}>L-4471</text>
        </g>
      </Card>
      <path className="sctx-arc" d="M76 40 52 62M92 40l24 22" />
      <Card h={26} w={40} x={26} y={62}>
        <NodeFace />
      </Card>
      <Card h={26} w={40} x={102} y={62}>
        <NodeFace />
      </Card>
      <path className="sctx-arc" d="M46 88v22M122 88v22" />
      <Card h={26} w={40} x={26} y={110}>
        <NodeFace />
      </Card>
      <Card h={26} w={40} x={102} y={110}>
        <NodeFace />
      </Card>
      <Badge kind="clip" x={108} y={26} />
    </>
  );
}

/* Shift handoff: the decision falls out of the conversation between shifts;
 * then the rationale is signed onto the batch. */
function SceneAuditBefore() {
  return (
    <>
      <Person scale={1.05} x={44} y={46} />
      <Person tone="quiet" x={124} y={46} />
      <path className="sctx-arc is-broken" d="M58 40c18-10 34-10 52 0" />
      {/* the decision, falling out of the handoff */}
      <Card h={48} rotate={-7} tone="stale" w={40} x={64} y={80}>
        <path className="sctx-cardline" d="M8 12h24M8 20h24M8 28h12" />
      </Card>
      <Badge kind="err" x={104} y={80} />
    </>
  );
}

function SceneAuditAfter() {
  return (
    <>
      <Person scale={1.05} x={44} y={44} />
      <Person scale={1.05} x={124} y={44} />
      <path className="sctx-arc" d="M58 38c18-10 34-10 52 0" />
      {/* the rationale, signed onto the batch */}
      <Card h={62} tone="key" w={52} x={58} y={72}>
        <rect className="sctx-spine" height={62} width={5} />
        <path className="sctx-cardline" d="M12 14h32M12 23h32M12 32h20" />
        <g className="sctx-pill" transform="translate(12 42)">
          <rect height="13" rx="2" width="34" />
          <text x={17} y={9.2}>SIGNED</text>
        </g>
      </Card>
      <Badge kind="ok" x={110} y={134} />
    </>
  );
}

export const MES_CTAX_SCENES: CtaxScenes = {
  retrieval: { before: <SceneRetrievalBefore />, after: <SceneRetrievalAfter /> },
  versions: { before: <SceneVersionsBefore />, after: <SceneVersionsAfter /> },
  drift: { before: <SceneDriftBefore />, after: <SceneDriftAfter /> },
  audit: { before: <SceneAuditBefore />, after: <SceneAuditAfter /> },
};

/* what the record does instead, per stage - the AFTER caption */
export const MES_CTAX_AFTER_NOTES: Record<string, string> = {
  retrieval: mesCopy("ctax.stage1.note", "Steps, consumption, and checks land as they happen."),
  versions: mesCopy("ctax.stage2.note", "The right revision arrives with the order. No memory required."),
  drift: mesCopy("ctax.stage3.note", "Inputs, parameters, and dispositions linked as the lot moves."),
  audit: mesCopy("ctax.stage4.note", "Who decided what, and why, signed onto the batch."),
};

export const MES_CTAX_COPY: Partial<CtaxCopy> = {
  eyebrow: mesCopy("ctax.eyebrow", "The cost of fragmentation"),
  heading: mesCopy("ctax.heading", "The coordination tax sits between the floor and the record."),
  lede: mesCopy("ctax.lede", "Lots move faster, deviations surface during the run, and the batch record is already audit-ready."),
  srSummary: mesCopy(
    "ctax.sr",
    "Four handoffs of production work, each compared side by side. Today each handoff is separated " +
      "from the record by coordination work: one batch lives in four parallel records, matching the " +
      "right checklist revision to the work order is operator memory, recall genealogy is assembled by " +
      "hand in spreadsheets, and decision rationale leaves with the shift. On one governed record the " +
      "same four handoffs stay connected: the record builds itself at the operation, the checklist " +
      "arrives bound to the order at the right revision, genealogy is already linked as the lot moves, " +
      "and the rationale is signed onto the batch. The metrics keep their original units and are not " +
      "plotted on a shared scale.",
  ),
  stageColumn: mesCopy("ctax.stagecol", "The same four handoffs, paid for twice"),
  beforeNote: mesCopy("ctax.before.note", "Production work is fragmented by the reconciling needed to match paper, systems, and memory."),
  afterNote: mesCopy("ctax.after.note", "Every operation, decision, and deviation stays attached to the same record."),
  codaStrong: mesCopy("ctax.coda.strong", "The production work stays."),
  codaRest: mesCopy("ctax.coda.rest", "The reconciling does not."),
  recordLeft: mesCopy("ctax.record.left", "One governed record"),
  recordRight: mesCopy("ctax.record.right", "Every lot carries its history"),
};
