/* ============================================================================
 * plm-ctax.tsx - the PLM page's coordination-tax ledger content: four drawn
 * before/after scene pairs plus the section's copy, fed into the shared
 * StylizedCoordinationTax treatment from the stylized DMS page. Stage rows
 * (category, metric, tax, outcome) come from PLM_PROBLEMS, which traces to
 * the Pain Points DB (PP-24 spec lock, PP-20 FMEA rebuild, plus the
 * traceability and V&V failure modes); the after-notes state what the record
 * does instead, grounded in the PLM modules' Notion promises (Design
 * Controls & Traceability "requirement to result, no gaps", Product
 * Specifications "the definition is never in doubt", FMEA & Control Plan
 * "the riskiest mode is the most controlled"). Copy is Notion-editable
 * through plmCopy (Copy Fields keys "plm/ctax.*").
 * ========================================================================== */
import {
  Badge,
  Card,
  Person,
  Tile,
  type CtaxCopy,
  type CtaxScenes,
} from "../dms/stylized/stylized-ctax";
import { plmCopy } from "./plm-copy";

/* a padlock, drawn in the card's local coordinates about (0,0) */
function LockGlyph({ x, y, onFill }: { x: number; y: number; onFill?: boolean }) {
  return (
    <path
      className={"sctx-glyph" + (onFill ? " is-onfill" : "")}
      d="M-5 2v-4a5 5 0 0 1 10 0v4M-8 2h16v11h-16z"
      transform={`translate(${x} ${y})`}
    />
  );
}

/* the requirements-matrix face: rows crossed by columns */
function MatrixFace() {
  return <path className="sctx-cardline" d="M8 24h32M8 33h32M8 42h32M19 20v28M30 20v28" />;
}

/* ------------------------------------------------------------- the scenes */

/* Design traceability: requirements and results in separate tools, joined
 * only by a drifting spreadsheet; then input linked to result, one chain. */
function SceneRetrievalBefore() {
  return (
    <>
      <Tile rotate={-3} x={22} y={22}>
        <path className="sctx-glyph" d="M2.5 0h10L17.5 5v15h-15zM12.5 0v5h5M6 10h8M6 14h6" />
      </Tile>
      <Tile rotate={3} x={106} y={22}>
        <rect className="sctx-glyph-fill is-sheet" height="20" rx="2" width="20" />
        <path className="sctx-glyph is-onfill" d="M3.5 7h13M3.5 11h13M3.5 15h13M8.5 3.5v15" />
      </Tile>
      <path className="sctx-scatter" d="M44 64c4 10 4 18 0 28M124 64c-4 10-4 18 0 28" />
      {/* the matrix that was supposed to hold the chain */}
      <Card h={52} tone="stale" w={60} x={54} y={96}>
        <text className="sctx-tag is-warn" x={9} y={16}>MATRIX</text>
        <path className="sctx-cardline" d="M9 24h42M9 33h42M9 42h42M25 20v28M40 20v28" />
      </Card>
      <Badge kind="err" x={84} y={82} />
    </>
  );
}

function SceneRetrievalAfter() {
  return (
    <>
      <Card h={58} tone="key" w={54} x={20} y={46}>
        <text className="sctx-tag" x={8} y={16}>REQ-41</text>
        <path className="sctx-cardline" d="M8 26h38M8 34h38M8 42h20" />
      </Card>
      <path className="sctx-arc" d="M74 75h30" />
      {/* the result that closes it */}
      <Card h={58} w={44} x={104} y={46}>
        <path className="sctx-check" d="m10 16 3 3 5.6-6.4" />
        <path className="sctx-cardline" d="M10 30h24M10 38h24M10 46h14" />
      </Card>
      <Badge kind="clip" x={89} y={75} />
    </>
  );
}

/* Specification management: the spec locks before the supplier is asked;
 * then capability is verified before the gate. */
function SceneVersionsBefore() {
  return (
    <>
      <Card h={62} w={54} x={38} y={20}>
        <text className="sctx-tag is-warn" x={8} y={14}>LOCKED</text>
        <LockGlyph x={27} y={26} />
        <path className="sctx-cardline" d="M10 46h34M10 54h34" />
      </Card>
      {/* the supplier, never asked */}
      <path className="sctx-scatter" d="M92 54c14 2 22 8 28 14" />
      <Person tone="quiet" x={132} y={82} />
      {/* the parts, failing incoming */}
      <Card h={30} tone="stale" w={38} x={40} y={112}>
        <path className="sctx-cardline" d="M8 11h22M19 4v7" />
        <rect className="sctx-cardline" fill="none" height={7} width={10} x={20} y={17} />
      </Card>
      <Badge kind="err" x={80} y={112} />
    </>
  );
}

function SceneVersionsAfter() {
  return (
    <>
      {/* capability verified first */}
      <Person scale={1.05} x={36} y={50} />
      <Badge kind="ok" x={46} y={68} />
      <path className="sctx-arc" d="M60 56c12-6 20-8 30-7" />
      {/* then the lock */}
      <Card h={66} tone="accent" w={52} x={92} y={36}>
        <LockGlyph onFill x={26} y={22} />
        <g className="sctx-pill is-inverse" transform="translate(7 46)">
          <rect height="13" rx="2" width="38" />
          <text x={19} y={9.2}>LOCKED</text>
        </g>
      </Card>
    </>
  );
}

/* Verification and validation: the requirement's checkbox stays empty while
 * the archive is searched; then the result is linked and the box closes. */
function SceneDriftBefore() {
  return (
    <>
      <Card h={56} w={54} x={54} y={16}>
        <text className="sctx-tag" x={8} y={16}>REQ-77</text>
        <path className="sctx-cardline" d="M8 26h38M8 34h38" />
        {/* the verification checkbox, empty */}
        <rect className="sctx-cardline" fill="none" height={9} width={9} x={8} y={42} />
      </Card>
      {/* the archive search that finds nothing */}
      <path className="sctx-scatter" d="M66 72 46 100M81 72v36M96 72l20 28" />
      <Tile rotate={-4} x={22} y={104}>
        <rect className="sctx-glyph-fill is-sheet" height="20" rx="2" width="20" />
        <path className="sctx-glyph is-onfill" d="M3.5 7h13M3.5 11h13M3.5 15h13M8.5 3.5v15" />
      </Tile>
      <Tile rotate={3} x={64} y={112}>
        <path className="sctx-glyph" d="M2.5 0h10L17.5 5v15h-15zM12.5 0v5h5M6 10h8M6 14h6" />
      </Tile>
      <Tile rotate={-2} x={106} y={104}>
        <rect className="sctx-glyph-fill is-sheet" height="20" rx="2" width="20" />
        <path className="sctx-glyph is-onfill" d="M3.5 7h13M3.5 11h13M3.5 15h13M8.5 3.5v15" />
      </Tile>
      <Badge kind="err" x={108} y={72} />
    </>
  );
}

function SceneDriftAfter() {
  return (
    <>
      <Card h={58} tone="key" w={54} x={30} y={30}>
        <text className="sctx-tag" x={8} y={16}>REQ-77</text>
        <path className="sctx-cardline" d="M8 26h38M8 34h38" />
        <path className="sctx-check" d="m10 48 3 3 5.6-6.4" />
      </Card>
      <path className="sctx-arc" d="M84 74c12 4 20 12 26 24" />
      {/* the one test that closed it */}
      <Tile x={100} y={100}>
        <rect className="sctx-glyph-fill is-sheet" height="20" rx="2" width="20" />
        <path className="sctx-glyph is-onfill" d="M3.5 7h13M3.5 11h13M3.5 15h13M8.5 3.5v15" />
      </Tile>
      <Badge kind="ok" x={140} y={100} />
    </>
  );
}

/* FMEA and control plan: each programme rebuilds the matrix; then the
 * catalogue carries failure modes into the next programme. */
function SceneAuditBefore() {
  return (
    <>
      <Card h={56} tone="stale" w={48} x={22} y={22}>
        <text className="sctx-tag" x={8} y={16}>PGM A</text>
        <MatrixFace />
      </Card>
      <Card h={56} w={48} x={98} y={88}>
        <text className="sctx-tag is-warn" x={8} y={16}>PGM B</text>
        <MatrixFace />
      </Card>
      <path className="sctx-scatter" d="M72 66c12 8 18 14 24 24" />
      <Badge kind="err" x={86} y={80} />
    </>
  );
}

function SceneAuditAfter() {
  return (
    <>
      {/* the catalogue every programme draws from */}
      <Card h={68} tone="key" w={52} x={22} y={36}>
        <rect className="sctx-spine" height={68} width={5} />
        <path className="sctx-cardline" d="M12 16h32M12 27h32M12 38h32M12 49h32" />
      </Card>
      <path className="sctx-arc" d="M74 70c14 0 22 2 32 8" />
      <Card h={54} w={44} x={104} y={54}>
        <path className="sctx-check" d="m9 14 2.6 2.6 4.8-5.4" />
        <path className="sctx-cardline" d="M8 24h28M8 33h28M8 42h28M19 20v26M30 20v26" />
      </Card>
      <Badge kind="ok" x={104} y={108} />
    </>
  );
}

export const PLM_CTAX_SCENES: CtaxScenes = {
  retrieval: { before: <SceneRetrievalBefore />, after: <SceneRetrievalAfter /> },
  versions: { before: <SceneVersionsBefore />, after: <SceneVersionsAfter /> },
  drift: { before: <SceneDriftBefore />, after: <SceneDriftAfter /> },
  audit: { before: <SceneAuditBefore />, after: <SceneAuditAfter /> },
};

/* what the record does instead, per stage - the AFTER caption */
export const PLM_CTAX_AFTER_NOTES: Record<string, string> = {
  retrieval: plmCopy("ctax.stage1.note", "Requirements, results, and verification stay one chain."),
  versions: plmCopy("ctax.stage2.note", "Supplier capability verified before the gate, on the record."),
  drift: plmCopy("ctax.stage3.note", "A requirement cannot close without its linked result."),
  audit: plmCopy("ctax.stage4.note", "Catalogued modes and controls flow to the next programme."),
};

export const PLM_CTAX_COPY: Partial<CtaxCopy> = {
  eyebrow: plmCopy("ctax.eyebrow", "The cost of fragmentation"),
  heading: plmCopy("ctax.heading", "The coordination tax sits between the design and its proof."),
  lede: plmCopy("ctax.lede", "Gates close on evidence, traceability holds, and the design history is already audit-ready."),
  srSummary: plmCopy(
    "ctax.sr",
    "Four gates of design work, each compared side by side. Today each gate is separated from its " +
      "proof by coordination work: the requirement-to-result trace breaks between tools, specifications " +
      "lock before supplier capability is verified, requirements pass review with no linked result, and " +
      "every programme rebuilds its FMEA from scratch. On one governed record the same four gates stay " +
      "connected: every input links to its result, capability is checked before the spec locks, a " +
      "requirement cannot close without its verification, and catalogued failure modes carry into the " +
      "next programme. The metrics keep their original units and are not plotted on a shared scale.",
  ),
  stageColumn: plmCopy("ctax.stagecol", "The same four gates, paid for twice"),
  beforeNote: plmCopy("ctax.before.note", "Design work is fragmented by the rebuilding needed to trace, verify, and prove it."),
  afterNote: plmCopy("ctax.after.note", "Every requirement, decision, and result stays attached to the same record."),
  codaStrong: plmCopy("ctax.coda.strong", "The design work stays."),
  codaRest: plmCopy("ctax.coda.rest", "The rebuilding does not."),
  recordLeft: plmCopy("ctax.record.left", "One governed record"),
  recordRight: plmCopy("ctax.record.right", "Every requirement carries its result"),
};
