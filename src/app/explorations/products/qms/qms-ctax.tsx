/* ============================================================================
 * qms-ctax.tsx - the QMS page's coordination-tax ledger content: four drawn
 * before/after scene pairs plus the section's copy, fed into the shared
 * StylizedCoordinationTax treatment from the stylized DMS page. Stage rows
 * (category, metric, tax, outcome) come from QMS_PROBLEMS, which traces to
 * the Pain Points DB (PP-8, PP-6, PP-27, PP-5); the after-notes state what
 * the record does instead, grounded in the QMS modules' Notion completion
 * contracts (named owner and due date, effectiveness window with automatic
 * reopen, SCAR closure on verified change, disposition evidence bound in).
 * Copy is Notion-editable through qmsCopy (Copy Fields keys "qms/ctax.*").
 *
 * Scenes follow the ledger's graphic language: white furniture, one accent
 * per frame, badges anchored to the thing they judge; BEFORE breaks the
 * chain (dashed links, warn badges), AFTER closes it (solid links, sealed
 * marks).
 * ========================================================================== */
import {
  Badge,
  Card,
  Person,
  Tile,
  type CtaxCopy,
  type CtaxScenes,
} from "../dms/stylized/stylized-ctax";
import { qmsCopy } from "./qms-copy";

/* a small factory mark for the supplier tiles */
function SupplierGlyph() {
  return <path className="sctx-glyph" d="M2.5 17.5v-8.5l5.5 4v-4l5.5 4v-4h4v8.5z" />;
}

/* a parts delivery: a parcel with a lid seam and an address label */
function DeliveryFace() {
  return (
    <>
      <path className="sctx-cardline" d="M8 11h22M19 4v7" />
      <rect className="sctx-cardline" fill="none" height={7} width={10} x={20} y={17} />
    </>
  );
}

/* ------------------------------------------------------------- the scenes */

/* Finding ownership: the audit finding fans out to nobody; then it lands on
 * one owner with a clock. */
function SceneRetrievalBefore() {
  return (
    <>
      <Card h={56} tone="stale" w={46} x={61} y={18}>
        <text className="sctx-tag is-warn" x={8} y={18}>F-12</text>
        <path className="sctx-cardline" d="M8 28h30M8 36h30M8 44h18" />
      </Card>
      <path className="sctx-scatter" d="M74 80 50 104M84 80v26M94 80l24 24" />
      <Person tone="quiet" x={42} y={124} />
      <Person tone="quiet" x={84} y={130} />
      <Person tone="quiet" x={126} y={124} />
      <Badge kind="err" x={84} y={80} />
    </>
  );
}

function SceneRetrievalAfter() {
  return (
    <>
      <Card h={62} tone="key" w={48} x={30} y={40}>
        <text className="sctx-tag" x={8} y={18}>F-12</text>
        <path className="sctx-cardline" d="M8 28h32M8 37h32M8 46h20" />
      </Card>
      <path className="sctx-arc" d="M78 71c14 0 22 4 30 10" />
      <Person scale={1.05} x={122} y={72} />
      {/* the clock the owner now carries */}
      <g className="sctx-pill" transform="translate(96 98)">
        <rect height="14" rx="2" width="58" />
        <text x={29} y={9.8}>DUE JUL 14</text>
      </g>
      <Badge kind="ok" x={78} y={102} />
    </>
  );
}

/* CAPA effectiveness: closed on paper, the problem circles back; then the
 * verification window gates the closure. */
function SceneVersionsBefore() {
  return (
    <>
      <Card h={58} w={52} x={30} y={26}>
        <text className="sctx-tag is-warn" x={8} y={18}>CLOSED</text>
        <path className="sctx-cardline" d="M8 28h36M8 36h36M8 44h20" />
      </Card>
      {/* the verification date, never fixed */}
      <g className="sctx-cal" transform="translate(110 26)">
        <rect height="30" rx="4" width="34" />
        <path d="M0 10.5h34M9 0v6.5M25 0v6.5" />
        <text x={17} y={25}>?</text>
      </g>
      {/* the loop back: closed on paper, the same problem returns */}
      <path className="sctx-scatter" d="M82 52c30 2 42 22 34 38-6 10-16 14-30 14" />
      <Card h={48} rotate={5} tone="stale" w={40} x={56} y={104}>
        <path className="sctx-cardline" d="M8 12h24M8 20h24M8 28h14" />
      </Card>
      <Badge kind="err" x={118} y={82} />
    </>
  );
}

function SceneVersionsAfter() {
  return (
    <>
      <Card h={68} tone="key" w={54} x={38} y={34}>
        <rect className="sctx-spine" height={68} width={5} />
        <path className="sctx-check" d="m14 18 3 3 5.6-6.4M14 34.5l3 3 5.6-6.4" />
        <path className="sctx-cardline" d="M30 19.5h16M30 36h16M12 52h34" />
      </Card>
      <path className="sctx-arc" d="M92 70c14 2 22 10 26 22" />
      {/* the effectiveness window, on a real date */}
      <g className="sctx-cal" transform="translate(100 96)">
        <rect height="30" rx="4" width="34" />
        <path d="M0 10.5h34M9 0v6.5M25 0v6.5" />
      </g>
      <Badge kind="ok" x={134} y={126} />
    </>
  );
}

/* Supplier quality: the SCAR closes on paperwork while deliveries keep
 * failing; then closure waits for verified change. */
function SceneDriftBefore() {
  return (
    <>
      <Tile rotate={-3} x={24} y={22}>
        <SupplierGlyph />
      </Tile>
      <Card h={54} rotate={3} w={46} x={96} y={20}>
        <text className="sctx-tag is-warn" x={8} y={18}>SCAR</text>
        <path className="sctx-cardline" d="M8 28h30M8 36h30M8 44h18" />
      </Card>
      <path className="sctx-scatter" d="M46 66c8 14 8 26 0 40M110 78c-2 14-10 24-22 32" />
      {/* the next two deliveries, failing the same way */}
      <Card h={30} tone="stale" w={38} x={26} y={112}>
        <DeliveryFace />
      </Card>
      <Card h={30} tone="stale" w={38} x={76} y={122}>
        <DeliveryFace />
      </Card>
      <Badge kind="err" x={66} y={112} />
      <Badge kind="err" x={116} y={122} />
    </>
  );
}

function SceneDriftAfter() {
  return (
    <>
      <Tile x={22} y={30}>
        <SupplierGlyph />
      </Tile>
      <path className="sctx-arc" d="M62 52c14 2 22 8 28 16" />
      {/* the change, verified on the record */}
      <Card h={66} tone="key" w={52} x={84} y={56}>
        <rect className="sctx-spine" height={66} width={5} />
        <path className="sctx-check" d="m14 18 3 3 5.6-6.4M14 33l3 3 5.6-6.4" />
        <path className="sctx-cardline" d="M30 19.5h14M30 34.5h14M12 50h32" />
      </Card>
      {/* the next delivery, cleared against the verified change */}
      <path className="sctx-arc" d="M84 112c-8 3-14 3-20 2" />
      <Card h={30} w={38} x={26} y={104}>
        <DeliveryFace />
      </Card>
      <Badge kind="ok" x={66} y={104} />
    </>
  );
}

/* Audit evidence: the response is stitched from sources; then the closure
 * chain is already bound, event to CAPA to verification. */
function SceneAuditBefore() {
  return (
    <>
      <Tile rotate={-4} x={18} y={20}>
        <path className="sctx-glyph" d="M0 3.5h20v13.5H0zM0 3.5 10 11l10-7.5" />
      </Tile>
      <Tile rotate={3} x={112} y={24}>
        <rect className="sctx-glyph-fill is-sheet" height="20" rx="2" width="20" />
        <path className="sctx-glyph is-onfill" d="M3.5 7h13M3.5 11h13M3.5 15h13M8.5 3.5v15" />
      </Tile>
      <Tile rotate={4} x={20} y={106}>
        <path className="sctx-glyph" d="M0 2.5h20v12.5H4l-4 4.5zM5 8.75h.01M9.5 8.75h.01M14 8.75h.01" />
      </Tile>
      <path className="sctx-scatter" d="M56 46 70 60M114 52 98 62M58 116 72 102" />
      <Card h={60} tone="stale" w={48} x={66} y={58}>
        <text className="sctx-tag is-warn" x={8} y={18}>AUDIT</text>
        <path className="sctx-cardline" d="M8 28h32M8 36h32M8 44h20" />
      </Card>
      <Badge kind="err" x={114} y={118} />
    </>
  );
}

function SceneAuditAfter() {
  return (
    <>
      {/* the closure chain: event, CAPA, verification, linked as it happened */}
      <Card h={46} tone="stale" w={38} x={14} y={104}>
        <path className="sctx-cardline" d="M8 12h22M8 20h22M8 28h13" />
      </Card>
      <path className="sctx-arc" d="M46 108c7-6 11-11 17-16" />
      <Card h={46} w={38} x={65} y={74}>
        <path className="sctx-cardline" d="M8 12h22M8 20h22M8 28h13" />
      </Card>
      <path className="sctx-arc" d="M99 78c6-5 9-9 13-14" />
      <Card h={56} tone="key" w={44} x={114} y={40}>
        <text className="sctx-tag" x={8} y={16}>CAPA</text>
        <path className="sctx-check" d="m8 26 3 3 5.6-6.4" />
        <path className="sctx-cardline" d="M8 40h28M8 48h28" />
      </Card>
      <Badge kind="clip" x={114} y={96} />
    </>
  );
}

export const QMS_CTAX_SCENES: CtaxScenes = {
  retrieval: { before: <SceneRetrievalBefore />, after: <SceneRetrievalAfter /> },
  versions: { before: <SceneVersionsBefore />, after: <SceneVersionsAfter /> },
  drift: { before: <SceneDriftBefore />, after: <SceneDriftAfter /> },
  audit: { before: <SceneAuditBefore />, after: <SceneAuditAfter /> },
};

/* what the record does instead, per stage - the AFTER caption */
export const QMS_CTAX_AFTER_NOTES: Record<string, string> = {
  retrieval: qmsCopy("ctax.stage1.note", "Every finding converts to an owned action on a clock."),
  versions: qmsCopy("ctax.stage2.note", "Verified in a set window. Reopens if ineffective."),
  drift: qmsCopy("ctax.stage3.note", "The SCAR stays open until the change is verified."),
  audit: qmsCopy("ctax.stage4.note", "Disposition evidence bound as the work happens."),
};

export const QMS_CTAX_COPY: Partial<CtaxCopy> = {
  eyebrow: qmsCopy("ctax.eyebrow", "The cost of fragmentation"),
  heading: qmsCopy("ctax.heading", "The coordination tax sits between the finding and the fix."),
  lede: qmsCopy("ctax.lede", "Events close faster, ownership stays visible, and the closure evidence is already audit-ready."),
  srSummary: qmsCopy(
    "ctax.sr",
    "Four loops of quality work, each compared side by side. Today each loop is separated from closure " +
      "by coordination work: audit findings stall unowned, CAPAs close before effectiveness is proven, " +
      "supplier corrective actions close on paperwork while the same failure returns, and passing an " +
      "audit costs days of evidence rebuild. On one governed record the same four loops stay connected: " +
      "every finding converts to an owned action on a clock, the effectiveness window gates closure, " +
      "supplier closure waits for verified change, and the closure evidence is already bound. The " +
      "metrics keep their original units and are not plotted on a shared scale.",
  ),
  stageColumn: qmsCopy("ctax.stagecol", "The same four loops, paid for twice"),
  beforeNote: qmsCopy("ctax.before.note", "Useful quality work is fragmented by the chasing needed to own, verify, and close it."),
  afterNote: qmsCopy("ctax.after.note", "Every event, owner, decision, and piece of evidence stays attached to the same record."),
  codaStrong: qmsCopy("ctax.coda.strong", "The quality work stays."),
  codaRest: qmsCopy("ctax.coda.rest", "The chasing does not."),
  recordLeft: qmsCopy("ctax.record.left", "One governed record"),
  recordRight: qmsCopy("ctax.record.right", "Every closure carries its proof"),
};
