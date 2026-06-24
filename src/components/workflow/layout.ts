/* ------------------------------------------------------------
 * Auto-layout for the process canvas — serpentine (snake) grid.
 *
 * A linear journey laid out on one axis is ~3000px wide, so
 * fitView has to shrink it until the cards are unreadable. Instead
 * we wrap the flow across BOTH axes: read left→right, drop down,
 * read right→left, drop down… The journey packs into a compact
 * block that fitView shows at ~1.0 zoom — every node visible and
 * legible on load. Column count adapts to the container width.
 *
 * Edge handles are picked from geometry (which side faces the
 * target), so the same data renders cleanly whether the flow runs
 * horizontally, wraps, or stacks vertically.
 * ------------------------------------------------------------ */

import { MarkerType, type Edge, type Node } from "@xyflow/react";
import type { Workflow, WorkflowNode, EdgeKind } from "@/lib/platform-data/workflows";

/** Step card dimensions. Height depends on whether the text layer is shown. */
export const STEP_W = 256;
export const STEP_H_FULL = 172; // name + What Happens + decides + meta
export const STEP_H_COMPACT = 92; // name + meta only
export const VS_STRIP_H = 64; // extra height for the value-stream work strip

/** Fixed node footprints — must match the node CSS in globals.css. */
export const NODE_SIZE: Record<WorkflowNode["kind"], { w: number; h: number }> = {
  step: { w: STEP_W, h: STEP_H_FULL },
  decision: { w: 68, h: 68 },
  terminal: { w: 168, h: 44 },
  handoff: { w: 188, h: 62 },
};

/** Source + target handle on every side, so edges attach by geometry. */
export const H = {
  sL: "sL", tL: "tL",
  sR: "sR", tR: "tR",
  sT: "sT", tT: "tT",
  sB: "sB", tB: "tB",
} as const;

/** Grid geometry. */
const CELL_W = 300; // step width (256) + horizontal gap
const ROW_GAP = 42; // vertical gap between rows (for labels/edges)
const MARGIN_X = 28;
const MARGIN_Y = 34;
const HANDOFF_GAP = 40;

export interface LaidOut {
  nodes: Node[];
  edges: Edge[];
  width: number;
  height: number;
  rows: number;
  cols: number;
}

interface Placed {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
}

const edgeStyle = (kind: EdgeKind, accentVar: string) => {
  switch (kind) {
    case "rework":
      return { stroke: "var(--s-err)", strokeWidth: 1.4, strokeDasharray: "5 4" };
    case "handoff":
      return { stroke: "var(--n-400)", strokeWidth: 1.4, strokeDasharray: "3 4" };
    case "branch":
      return { stroke: accentVar, strokeWidth: 1.5 };
    case "flow":
    default:
      return { stroke: "var(--n-300)", strokeWidth: 1.5 };
  }
};

const markerColor = (kind: EdgeKind, accentVar: string) =>
  kind === "rework" ? "var(--s-err)"
    : kind === "handoff" ? "var(--n-400)"
      : kind === "branch" ? accentVar
        : "var(--n-400)";

/** Which side of each node the edge leaves / enters, from their centres. */
function pickHandles(a: Placed, b: Placed): { sourceHandle: string; targetHandle: string } {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0
      ? { sourceHandle: H.sR, targetHandle: H.tL }
      : { sourceHandle: H.sL, targetHandle: H.tR };
  }
  return dy >= 0
    ? { sourceHandle: H.sB, targetHandle: H.tT }
    : { sourceHandle: H.sT, targetHandle: H.tB };
}

/**
 * @param cols number of columns to wrap at (responsive — passed by the canvas).
 * @param showText whether step cards show the text layer (drives step height).
 * @param showWork whether the value-stream work strip is shown (adds height).
 */
export function layoutWorkflow(
  wf: Workflow,
  accentVar: string,
  cols = 5,
  showText = true,
  showWork = false,
): LaidOut {
  const COLS = Math.max(2, cols);
  const stepH = (showText ? STEP_H_FULL : STEP_H_COMPACT) + (showWork ? VS_STRIP_H : 0);
  const rowStride = stepH + ROW_GAP;
  const sizeOf = (kind: WorkflowNode["kind"]) =>
    kind === "step" ? { w: STEP_W, h: stepH } : NODE_SIZE[kind];

  const byId = new Map(wf.nodes.map((n) => [n.id, n]));
  const spine = wf.nodes.filter((n) => n.kind !== "handoff");
  const handoffs = wf.nodes.filter((n) => n.kind === "handoff");

  const pos = new Map<string, Placed>();
  let maxRow = 0;

  // 1) lay the spine out as a serpentine grid (cells centred).
  spine.forEach((n, i) => {
    const row = Math.floor(i / COLS);
    const within = i % COLS;
    const col = row % 2 === 0 ? within : COLS - 1 - within; // snake
    const s = sizeOf(n.kind);
    const cellCx = MARGIN_X + col * CELL_W + CELL_W / 2;
    const cellCy = MARGIN_Y + row * rowStride + rowStride / 2;
    pos.set(n.id, { x: cellCx - s.w / 2, y: cellCy - s.h / 2, w: s.w, h: s.h, cx: cellCx, cy: cellCy });
    maxRow = Math.max(maxRow, row);
  });

  const gridBottom = MARGIN_Y + (maxRow + 1) * rowStride;

  // 2) hang handoffs in a strip below the grid, aligned under their source.
  let stripBottom = gridBottom;
  handoffs.forEach((ho) => {
    const inEdge = wf.edges.find((e) => e.to === ho.id && e.kind === "handoff");
    const src = inEdge ? pos.get(inEdge.from) : undefined;
    const s = NODE_SIZE.handoff;
    const cx = src ? src.cx : MARGIN_X + s.w / 2;
    const y = gridBottom + HANDOFF_GAP;
    pos.set(ho.id, { x: cx - s.w / 2, y, w: s.w, h: s.h, cx, cy: y + s.h / 2 });
    stripBottom = Math.max(stripBottom, y + s.h);
  });

  const width = MARGIN_X * 2 + COLS * CELL_W;
  const height = (handoffs.length ? stripBottom : gridBottom) + MARGIN_Y;

  // 3) React Flow nodes.
  const nodes: Node[] = wf.nodes.map((n) => ({
    id: n.id,
    type: n.kind,
    position: { x: pos.get(n.id)!.x, y: pos.get(n.id)!.y },
    data: { ...n, accentVar },
    draggable: true,
  }));

  // 4) React Flow edges — handles from geometry.
  const edges: Edge[] = wf.edges.map((e, i) => {
    const a = pos.get(e.from)!;
    const b = pos.get(e.to)!;
    const { sourceHandle, targetHandle } = pickHandles(a, b);
    return {
      id: `${wf.id}-e${i}`,
      source: e.from,
      target: e.to,
      sourceHandle,
      targetHandle,
      type: "smoothstep",
      label: e.label,
      labelShowBg: true,
      style: edgeStyle(e.kind, accentVar),
      markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: markerColor(e.kind, accentVar) },
      className: `wf-edge wf-edge--${e.kind}`,
      data: { kind: e.kind },
    } satisfies Edge;
  });

  void byId; // reserved for future validation
  return { nodes, edges, width, height, rows: maxRow + 1, cols: COLS };
}
