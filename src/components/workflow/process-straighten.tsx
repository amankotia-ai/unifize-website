"use client";

/* ------------------------------------------------------------
 * ProcessStraighten — the §01+§02 single-canvas story (2026-06-01,
 * second call). Ben: "section two can come on section one — we're
 * transforming the nodes into the stacked bar chart. Convert the
 * nodes into slabs of work, fill the gaps with the coordination tax,
 * then show the compression on the same canvas."
 *
 * One sticky canvas, scrubbed by scroll, in five beats:
 *   1. MAP        the familiar serpentine process map (scaled up).
 *   2. STRAIGHTEN the cards reorganise onto a single time axis.
 *   3. SLAB       each card CONVERTS into a slab of value-add work —
 *                 its content fades while the card shrinks to a solid
 *                 slab sized to that step's real work (not a cross-fade).
 *   4. TAX        the coordination tax (red) fills the gaps between the
 *                 slabs — the wait nobody signs off on (the big share).
 *   5. COMPRESS   the red flops out, the slabs pack together and
 *                 recolour to brand blue — the Unifize bar. The whole
 *                 value-stream compression happens on this one canvas.
 *
 * Slab widths are proportional to value-add minutes and the gaps to
 * non-value-add minutes, so the bar reads like the §02 value stream
 * (~72% red). Nodes morph via per-frame node DATA, not a cross-fade.
 * ------------------------------------------------------------ */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Handle,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type NodeProps,
  type ReactFlowInstance,
} from "@xyflow/react";
import { cn } from "@/lib/cn";
import type { Workflow, System, StepNodeData } from "@/lib/platform-data/workflows";
import { H, layoutWorkflow, NODE_SIZE, STEP_W, STEP_H_FULL } from "./layout";
import {
  CTLayerContext,
  TextLayerContext,
  WorkLayerContext,
  nodeTypes,
} from "./nodes";
import { MODULE_VAR, SYSTEM_LABEL } from "./theme";
import "./process-straighten.css";

export interface ProcessStraightenProps {
  workflow: Workflow;
  className?: string;
  ratePerHour?: number;
  instancesPerYear?: number;
  annualScaleSavedUsd?: number;
}

const fmtUsd = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;

const CARD_H = STEP_H_FULL;
const SLAB_H = 150; // chunky slab / red tax-band height (one continuous bar)
const SLAB_Y = (CARD_H - SLAB_H) / 2; // vertical centre on the card row

/* Value-stream geometry — minutes → canvas px (slabs AND gaps share a scale,
 * so the bar's VA/NVA proportions are honest: ~72% of it is red wait). The
 * scale is tuned so the whole bar fills the board width at READ_ZOOM — a big,
 * chunky bar, not a thin strip floating in empty canvas. */
const VS_SCALE = 0.23;
const MIN_SLAB = 30; // floor so a tiny value-add step is still a visible slab
const COMPACT_GAP = 92; // gap between the straightened cards (before they slab)
const SLAB_GAP = 5; // gap between slabs once packed into the compressed bar

/* Scroll choreography — reworked 2026-06-02 (Ben call) so the compression
 * reads as a BEFORE/AFTER compare, not an in-place collapse:
 *   STRAIGHTEN  serpentine map → one straight line of cards
 *   SLAB        cards convert to gray value-add slabs on the value axis
 *   TAX         the red coordination tax fills the gaps  → the "Today" row
 *   DROP        the gray work blocks DUPLICATE and drop to a second row
 *   COMPRESS    the duplicates slide LEFT (gaps close) and recolour to Unifize
 *               blue — the "Today" row stays put above for contrast
 *   READ        per-row hour read-outs + saved bracket + the $ money line in
 * Ben: "this line stays — it doesn't change because this is the total time."
 * The saved span on the right == the coordination tax Unifize removes. */
const STRAIGHTEN_END = 0.16;
const SLAB_END = 0.32;
const TAX_END = 0.46;
const DROP_END = 0.62; // gray blocks duplicate + drop to the lower row
const COMPRESS_END = 0.82; // duplicates slide left + recolour to Unifize blue
const READ_START = 0.7; // hour read-outs / $ money line bloom in
const READ_ZOOM = 0.66;
const PAD = 40;
/* Vertical camera anchor — share of the board's free space ABOVE the
 * content. 0.5 (dead-centre) opened a gap under the narration once the
 * board flexed tall; 0.18 pinned everything to the top. With the board
 * now snug (≤62vh) and the stage centring the cluster, 0.38 keeps a
 * modest breath under the captions without bottom-heavy dead space. */
const CAM_TOP = 0.38;

/* Two-row compare geometry. */
const ROW_DROP = CARD_H + 70; // vertical drop from "Today" to the "Unifize" row
const LABEL_W = 128; // left gutter for the Today / Unifize row labels
const TIME_W = 104; // right gutter for the per-row hour read-outs
const ROW_MID = SLAB_Y + SLAB_H / 2 - 12; // centre an annotation on the slab band

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const isNva = (c: string) => c === "WAIT" || c === "NVA";

/* Cross-system re-key markers — built and ready, hidden for now (2026-06-09).
 * Flip to true to surface the between-the-steps tax on the map connectors. */
const SHOW_REKEY_MARKERS = false;

function sizeOf(kind: string): { w: number; h: number } {
  if (kind === "step") return { w: STEP_W, h: CARD_H };
  const ns = (NODE_SIZE as Record<string, { w: number; h: number }>)[kind];
  return ns ?? { w: 120, h: 60 };
}

interface MorphData {
  index: number;
  name: string;
  whatHappens: string;
  role: string;
  systems?: System[]; // existing systems of record (chips on the map card)
  accentVar: string;
  slabW: number; // target slab width (∝ value-add minutes)
  slab: number; // 0 = card, 1 = slab of work
  compress: number; // 0 = slate VA slab, 1 = brand-blue Unifize
  lastIndex: number; // highest step index (to edge-anchor the end name tags)
}

/* The step CONVERTS into a slab: the card shrinks to its work-width while its
 * content fades, then the slab recolours to brand blue on compress. */
function MorphStepNode({ data }: NodeProps) {
  const d = data as unknown as MorphData;
  const slab = d.slab ?? 0;
  const compress = d.compress ?? 0;
  const w = lerp(STEP_W, d.slabW ?? STEP_W, slab);
  const cardOpacity = 1 - clamp01(slab * 1.4);
  const slabBg = `color-mix(in srgb, var(--u-primary) ${Math.round(compress * 100)}%, var(--n-500))`;
  // Step-name tag above the slab — readable through the slab + tax beats, then
  // fading as the bar compresses (the tags would collide once slabs pack).
  const nameOpacity = clamp01(slab) * clamp01(1 - compress * 1.6);
  const nameRow = d.index % 2 ? "hi" : "lo";
  const nameEdge = d.index === 1 ? "L" : d.index === d.lastIndex ? "R" : undefined;
  return (
    <div className="ps-mstep" style={{ width: w, height: CARD_H }}>
      {/* edge handles (all sides) so the map's connectors render in beat 1 */}
      <Handle id={H.tL} type="target" position={Position.Left} className="wf-h" />
      <Handle id={H.sL} type="source" position={Position.Left} className="wf-h" />
      <Handle id={H.tR} type="target" position={Position.Right} className="wf-h" />
      <Handle id={H.sR} type="source" position={Position.Right} className="wf-h" />
      <Handle id={H.tT} type="target" position={Position.Top} className="wf-h" />
      <Handle id={H.sT} type="source" position={Position.Top} className="wf-h" />
      <Handle id={H.tB} type="target" position={Position.Bottom} className="wf-h" />
      <Handle id={H.sB} type="source" position={Position.Bottom} className="wf-h" />
      <div className="ps-mstep-card" style={{ opacity: cardOpacity }}>
        <span className="ps-mstep-rail" style={{ background: d.accentVar }} />
        <div className="ps-mstep-head">
          <span className="ps-mstep-num mono" style={{ color: d.accentVar }}>
            {String(d.index).padStart(2, "0")}
          </span>
          <span className="ps-mstep-name">{d.name}</span>
        </div>
        <p className="ps-mstep-what">{d.whatHappens}</p>
        <span className="ps-mstep-role mono">{d.role}</span>
        {d.systems?.length ? (
          <div className="ps-mstep-sys">
            {d.systems.map((s) => (
              <span key={s} className="ps-mstep-sys-chip mono" title={SYSTEM_LABEL[s]}>
                {s}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div
        className="ps-mstep-slab"
        style={{ opacity: slab, background: slabBg, top: SLAB_Y, height: SLAB_H }}
        aria-hidden
      >
        <span className="ps-mstep-slabnum mono">{String(d.index).padStart(2, "0")}</span>
      </div>
      <span className="ps-mstep-leader" data-row={nameRow} style={{ opacity: nameOpacity }} aria-hidden />
      <span
        className="ps-mstep-name-tag"
        data-row={nameRow}
        data-edge={nameEdge}
        style={{ opacity: nameOpacity }}
      >
        {d.name}
      </span>
    </div>
  );
}

/* The red coordination-tax band filling a gap = the wait between two slabs.
 * Grows from the left as `fill` rises, then flops out as `compress` rises. */
function WaitStreamNode({ data }: NodeProps) {
  const d = data as { w: number; fill?: number; compress?: number };
  const reveal = Math.max(0, (d.fill ?? 0) * (1 - (d.compress ?? 0)));
  return (
    <div
      aria-hidden
      style={
        {
          width: d.w,
          height: SLAB_H,
          background: "var(--s-err)",
          borderRadius: 3,
          transformOrigin: "left center",
          opacity: reveal,
          transform: `scaleX(${reveal})`,
          pointerEvents: "none",
        } as React.CSSProperties
      }
    />
  );
}

/* A duplicated value-add block: spawns under its "Today" slab, drops to the
 * lower row, then slides left into the packed Unifize bar — recolouring from
 * the gray work-tone to brand blue as it goes (the "after" Ben asked for). */
function DupSlabNode({ data }: NodeProps) {
  const d = data as unknown as {
    slabW: number; name: string; index: number; drop?: number; compress?: number;
  };
  const drop = d.drop ?? 0;
  const compress = d.compress ?? 0;
  const bg = `color-mix(in srgb, var(--u-primary) ${Math.round(22 + compress * 78)}%, var(--n-500))`;
  // 2026-06-05: no step-name tags on the Unifize row — once packed they
  // overlapped into noise; the step numbers carry the mapping to "Today".
  return (
    <div className="ps-dup" style={{ width: d.slabW, height: CARD_H, opacity: clamp01(drop * 1.25) }}>
      <div className="ps-dup-slab" style={{ top: SLAB_Y, height: SLAB_H, background: bg }}>
        <span className="ps-dup-num mono">{String(d.index).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

/* Row labels (Today / Unifize), per-row hour read-outs and the saved-time
 * bracket — rendered in canvas space so they track the bars under the zoom. */
function PsAnnotNode({ data }: NodeProps) {
  const d = data as unknown as {
    variant: string; text: string; sub?: string; tone: string; opacity?: number; w?: number;
  };
  const opacity = clamp01(d.opacity ?? 0);
  if (d.variant === "saved") {
    return (
      <div className="ps-annot-saved" style={{ width: Math.max(0, d.w ?? 0), opacity }} aria-hidden>
        <span className="ps-annot-saved-lab mono">
          {d.text}
          {d.sub ? <i>{d.sub}</i> : null}
        </span>
      </div>
    );
  }
  return (
    <div className={cn("ps-annot", `ps-annot--${d.variant}`, `ps-annot--${d.tone}`)} style={{ opacity }} aria-hidden>
      {d.variant === "time" ? <span className="ps-annot-arrow">→</span> : null}
      <span className="ps-annot-t mono">{d.text}</span>
    </div>
  );
}

/* A cross-system re-key marker — sits on the connector between two steps whose
 * systems are disjoint (work jumps tools), labelled with the system transition
 * and the destination step's reconcile cost. The between-the-steps tax that the
 * node lozenges only hint at. */
function RekeyNode({ data }: NodeProps) {
  const d = data as unknown as { label: string; cost: number };
  return (
    <div className="ps-rekey" aria-hidden>
      <span className="ps-rekey-dot" />
      <span className="ps-rekey-lab mono">
        re-key · {d.label}
        {d.cost ? ` · ${d.cost}m` : ""}
      </span>
    </div>
  );
}

const psNodeTypes = {
  ...nodeTypes,
  step: MorphStepNode,
  waitstream: WaitStreamNode,
  dupslab: DupSlabNode,
  psannot: PsAnnotNode,
  rekey: RekeyNode,
};

export function ProcessStraighten({
  workflow,
  className,
  ratePerHour = 60,
  instancesPerYear = 100,
  annualScaleSavedUsd = 3_100_000,
}: ProcessStraightenProps) {
  const accentVar = MODULE_VAR[workflow.accent];

  // Compression read-out numbers (shared arithmetic with the drill) plus the
  // payoff "ledger" figures — what the compression is worth (the old §02).
  const totals = useMemo(() => {
    let cur = 0;
    let uni = 0;
    let nva = 0;
    for (const n of workflow.nodes) {
      if (n.kind !== "step" || !n.valueStream) continue;
      for (const v of n.valueStream) {
        cur += v.currentMin;
        uni += v.unifizeMin;
        if (isNva(v.classification)) nva += v.currentMin;
      }
    }
    const curH = Math.floor(cur / 60);
    const uniH = Math.floor(uni / 60);
    const nvaPct = cur ? Math.round((nva / cur) * 100) : 0;
    const curUsd = Math.round((cur / 60) * ratePerHour);
    const uniUsd = Math.round((uni / 60) * ratePerHour);
    return {
      curH,
      uniH,
      pct: cur ? Math.round((1 - uni / cur) * 100) : 0,
      nvaPct,
      vaPct: 100 - nvaPct,
      uniWidthPct: cur ? Math.round((uni / cur) * 100) : 0,
      hoursBack: curH - uniH,
      curUsd,
      uniUsd,
      savedYr: (curUsd - uniUsd) * instancesPerYear,
    };
  }, [workflow, ratePerHour, instancesPerYear]);

  // Serpentine source layout — full text cards.
  const laid = useMemo(
    () => layoutWorkflow(workflow, accentVar, 4, /* showText */ true, /* showWork */ false),
    [workflow, accentVar],
  );

  const serpPos = useMemo(
    () => new Map(laid.nodes.map((n) => [n.id, n.position])),
    [laid],
  );

  // Value-stream geometry: each step → a slab sized to its VA minutes, the gap
  // after → a red band sized to its NVA (wait) minutes. Honest proportions.
  const vs = useMemo(() => {
    const steps = workflow.nodes.filter((n) => n.kind === "step");
    const stepX = new Map<string, number>();
    const slabW = new Map<string, number>();
    const streams: { id: string; src: string; x: number; w: number }[] = [];
    let x = 0;
    steps.forEach((n, i) => {
      const vstream = n.kind === "step" ? n.valueStream ?? [] : [];
      const vaMin = vstream.filter((v) => !isNva(v.classification)).reduce((a, v) => a + v.currentMin, 0);
      const nvaMin = vstream.filter((v) => isNva(v.classification)).reduce((a, v) => a + v.currentMin, 0);
      const w = Math.max(MIN_SLAB, Math.round(vaMin * VS_SCALE));
      const gapW = Math.round(nvaMin * VS_SCALE);
      stepX.set(n.id, x);
      slabW.set(n.id, w);
      if (i < steps.length - 1) {
        if (gapW > 2) streams.push({ id: `wait-${n.id}`, src: n.id, x: x + w, w: gapW });
        x += w + Math.max(SLAB_GAP, gapW);
      } else {
        x += w;
      }
    });
    return { stepX, slabW, streams, totalW: x };
  }, [workflow]);

  // Compact straight (phase-2 target): cards at uniform spacing, no gaps.
  const compact = useMemo(() => {
    const m = new Map<string, number>();
    let x = 0;
    for (const n of workflow.nodes) {
      if (n.kind !== "step") continue;
      m.set(n.id, x);
      x += STEP_W + COMPACT_GAP;
    }
    return { map: m, totalW: Math.max(0, x - COMPACT_GAP) };
  }, [workflow]);

  // Compressed (phase-5 target): slabs packed adjacent, gaps gone.
  const compressed = useMemo(() => {
    const m = new Map<string, number>();
    let x = 0;
    for (const n of workflow.nodes) {
      if (n.kind !== "step") continue;
      m.set(n.id, x);
      x += (vs.slabW.get(n.id) ?? MIN_SLAB) + SLAB_GAP;
    }
    return { map: m, totalW: Math.max(0, x - SLAB_GAP) };
  }, [workflow, vs]);

  // Build a position map (steps + folded non-steps + red streams) for a phase.
  const buildTargets = useCallback(
    (stepX: Map<string, number>, streamX: (s: { src: string }) => number, streamY: number) => {
      const positions = new Map<string, { x: number; y: number }>();
      let lastX = 0;
      for (const n of workflow.nodes) {
        const sx = stepX.get(n.id);
        if (sx != null) {
          positions.set(n.id, { x: sx, y: 0 });
          lastX = sx;
        } else {
          positions.set(n.id, { x: lastX + STEP_W * 0.5, y: 0 });
        }
      }
      for (const s of vs.streams) positions.set(s.id, { x: streamX(s), y: streamY });
      return positions;
    },
    [workflow, vs],
  );

  const serpAll = useMemo(() => {
    const m = new Map<string, { x: number; y: number }>(serpPos);
    for (const s of vs.streams) m.set(s.id, serpPos.get(s.src) ?? { x: 0, y: 0 });
    return m;
  }, [serpPos, vs]);

  const compactAll = useMemo(
    () => buildTargets(compact.map, (s) => (compact.map.get(s.src) ?? 0) + STEP_W + COMPACT_GAP / 2, SLAB_Y),
    [buildTargets, compact],
  );
  const vsAll = useMemo(
    () => buildTargets(vs.stepX, (s) => vs.streams.find((x) => x.id === `wait-${s.src}`)?.x ?? (vs.stepX.get(s.src) ?? 0), SLAB_Y),
    [buildTargets, vs],
  );

  const lastStepIndex = useMemo(
    () => workflow.nodes.reduce((m, n) => (n.kind === "step" ? Math.max(m, n.index) : m), 0),
    [workflow],
  );

  // Cross-system re-key markers: one sits between two consecutive steps whose
  // systems are DISJOINT (work jumps tools → it has to be re-keyed). The cost is
  // the destination step's NVA reconcile work — the between-the-steps tax.
  const rekeyMarkers = useMemo(() => {
    if (!SHOW_REKEY_MARKERS) return [];
    const steps = workflow.nodes.filter(
      (n): n is StepNodeData => n.kind === "step",
    );
    const out: { id: string; from: string; to: string; label: string; cost: number }[] = [];
    for (let i = 0; i < steps.length - 1; i++) {
      const a = steps[i];
      const b = steps[i + 1];
      const aSys = a.systems ?? [];
      const bSys = b.systems ?? [];
      if (!aSys.length || !bSys.length) continue;
      if (aSys.some((s) => bSys.includes(s))) continue; // shares a system → no jump
      const cost = (b.valueStream ?? [])
        .filter((v) => v.classification === "NVA")
        .reduce((sum, v) => sum + v.currentMin, 0);
      out.push({
        id: `rekey-${a.id}-${b.id}`,
        from: a.id,
        to: b.id,
        label: `${aSys[0]} → ${bSys[0]}`,
        cost,
      });
    }
    return out;
  }, [workflow]);

  // Real nodes (steps carry their slab width) + synthetic red tax-band nodes +
  // the duplicated "Unifize" row + the compare annotations (labels / times).
  const baseNodes = useMemo(() => {
    const dupNodes = workflow.nodes
      .filter((n) => n.kind === "step")
      .map((n) => ({
        id: `dup-${n.id}`,
        type: "dupslab",
        position: { x: vs.stepX.get(n.id) ?? 0, y: 0 },
        data: {
          slabW: vs.slabW.get(n.id) ?? MIN_SLAB,
          name: n.kind === "step" ? n.name : "",
          index: n.kind === "step" ? n.index : 0,
          drop: 0,
          compress: 0,
        },
        draggable: false,
        selectable: false,
      }));

    const annot = (id: string, variant: string, text: string, tone: string, sub?: string) => ({
      id,
      type: "psannot",
      position: { x: 0, y: 0 },
      data: { variant, text, tone, sub, opacity: 0, w: 0 },
      draggable: false,
      selectable: false,
    });
    const annotNodes = [
      annot("an-row-today", "rowlab", "Today", "today"),
      annot("an-row-uni", "rowlab", "Unifize", "uni"),
      annot("an-time-today", "time", `${totals.curH} h`, "today"),
      annot("an-time-uni", "time", `${totals.uniH} h`, "uni"),
      annot("an-saved", "saved", `−${totals.hoursBack} h`, "saved", `−${totals.pct}%`),
    ];

    // Re-key markers, parked at the serpentine midpoint of their step pair (the
    // live position is recomputed per frame in applyProgress so they track the
    // moving cards, then fade as the map straightens).
    const rekeyNodes = rekeyMarkers.map((m) => {
      const a = serpPos.get(m.from) ?? { x: 0, y: 0 };
      const b = serpPos.get(m.to) ?? { x: 0, y: 0 };
      return {
        id: m.id,
        type: "rekey",
        position: { x: (a.x + b.x) / 2 + STEP_W / 2, y: (a.y + b.y) / 2 + CARD_H / 2 },
        data: { from: m.from, to: m.to, label: m.label, cost: m.cost },
        draggable: false,
        selectable: false,
      };
    });

    return [
      ...laid.nodes.map((n) =>
        n.type === "step"
          ? { ...n, data: { ...n.data, slabW: vs.slabW.get(n.id) ?? STEP_W, lastIndex: lastStepIndex } }
          : n,
      ),
      ...vs.streams.map((s) => ({
        id: s.id,
        type: "waitstream",
        position: serpPos.get(s.src) ?? { x: 0, y: 0 },
        data: { w: s.w, fill: 0, compress: 0 },
        draggable: false,
        selectable: false,
      })),
      ...dupNodes,
      ...rekeyNodes,
      ...annotNodes,
    ];
  }, [laid, vs, serpPos, lastStepIndex, workflow, totals, rekeyMarkers]);

  const serpBounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of laid.nodes) {
      const p = n.position;
      const s = sizeOf(String(n.type));
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x + s.w > maxX) maxX = p.x + s.w;
      if (p.y + s.h > maxY) maxY = p.y + s.h;
    }
    return { minX, minY, maxX, maxY };
  }, [laid]);

  const [nodes, setNodes, onNodesChange] = useNodesState(baseNodes);
  const [edges, , onEdgesChange] = useEdgesState(laid.edges);

  const rfRef = useRef<ReactFlowInstance | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const progRef = useRef(0);
  const reducedRef = useRef(false);
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const set = () => setBoardSize({ w: el.clientWidth, h: el.clientHeight });
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setNodes(baseNodes);
  }, [baseNodes, setNodes]);

  const applyProgress = useCallback(
    (p: number) => {
      const clamped = clamp01(p);
      const sStraight = easeInOut(clamp01(clamped / STRAIGHTEN_END));
      const sSlab = easeInOut(clamp01((clamped - STRAIGHTEN_END) / (SLAB_END - STRAIGHTEN_END)));
      const sFill = easeInOut(clamp01((clamped - SLAB_END) / (TAX_END - SLAB_END)));
      const sDrop = easeInOut(clamp01((clamped - TAX_END) / (DROP_END - TAX_END)));
      const sComp = easeInOut(clamp01((clamped - DROP_END) / (COMPRESS_END - DROP_END)));
      const sRead = easeInOut(clamp01((clamped - READ_START) / (1 - READ_START)));

      // Top "Today" row: serpentine → compact → value-stream, then FROZEN. It
      // never compresses — it stays as the total-time reference (Ben).
      const posTop = (id: string) => {
        const a = serpAll.get(id) ?? { x: 0, y: 0 };
        const b = compactAll.get(id) ?? a;
        const c = vsAll.get(id) ?? b;
        const p1x = lerp(a.x, b.x, sStraight), p1y = lerp(a.y, b.y, sStraight);
        return { x: lerp(p1x, c.x, sSlab), y: lerp(p1y, c.y, sSlab) };
      };

      // Geometry shared by the lower row and the annotations.
      const botY = ROW_DROP * sDrop;
      const topRight = sSlab < 1 ? lerp(compact.totalW, vs.totalW, sSlab) : vs.totalW;
      const botRight = lerp(vs.totalW, compressed.totalW, sComp);
      const annotAt = (id: string): { x: number; y: number; w?: number; opacity: number } => {
        switch (id) {
          case "an-row-today": return { x: -LABEL_W, y: ROW_MID, opacity: sDrop };
          case "an-row-uni": return { x: -LABEL_W, y: botY + ROW_MID, opacity: sDrop };
          case "an-time-today": return { x: topRight + 14, y: ROW_MID, opacity: sDrop };
          case "an-time-uni": return { x: botRight + 14, y: botY + ROW_MID, opacity: sDrop };
          case "an-saved":
            return { x: botRight, y: botY + ROW_MID + 12, w: Math.max(0, topRight - botRight), opacity: clamp01((sComp - 0.1) * 1.4) };
          default: return { x: 0, y: 0, opacity: 0 };
        }
      };

      const next = baseNodes.map((n) => {
        if (n.type === "dupslab") {
          const sid = n.id.slice(4); // strip "dup-"
          const x = lerp(vs.stepX.get(sid) ?? 0, compressed.map.get(sid) ?? 0, sComp);
          return { ...n, draggable: false, position: { x, y: botY }, data: { ...n.data, drop: sDrop, compress: sComp } };
        }
        if (n.type === "psannot") {
          const a = annotAt(n.id);
          return {
            ...n,
            draggable: false,
            position: { x: a.x, y: a.y },
            data: { ...n.data, opacity: a.opacity, ...(a.w != null ? { w: a.w } : {}) },
          };
        }
        if (n.type === "rekey") {
          const d = n.data as { from: string; to: string };
          const a = posTop(d.from);
          const b = posTop(d.to);
          // sit on the connector midpoint; fade out as the map straightens.
          return {
            ...n,
            draggable: false,
            position: { x: (a.x + b.x) / 2 + STEP_W / 2, y: (a.y + b.y) / 2 + CARD_H / 2 },
            style: { ...(n as { style?: object }).style, opacity: 1 - sStraight },
          };
        }
        const pos = posTop(n.id);
        if (n.type === "step") {
          // compress: 0 — the Today row stays gray and keeps its tags.
          return { ...n, draggable: false, position: pos, data: { ...n.data, slab: sSlab, compress: 0 } };
        }
        if (n.type === "waitstream") {
          // The red tax stays on the Today row (no flop-out anymore).
          return { ...n, draggable: false, position: pos, data: { ...n.data, fill: sFill, compress: 0 } };
        }
        return {
          ...n,
          draggable: false,
          position: pos,
          style: { ...(n as { style?: object }).style, opacity: 1 - sStraight },
        };
      });
      setNodes(next);

      const rf = rfRef.current;
      const w = boardRef.current?.clientWidth ?? 0;
      const h = boardRef.current?.clientHeight ?? 0;
      if (rf && w > 0 && h > 0) {
        if (clamped <= STRAIGHTEN_END) {
          const yRow = (h - CARD_H * READ_ZOOM) * CAM_TOP;
          const b = serpBounds;
          const boxW = Math.max(1, b.maxX - b.minX);
          const boxH = Math.max(1, b.maxY - b.minY);
          const zf = Math.max(0.08, Math.min(1.25, (w - PAD * 2) / boxW, (h - PAD * 2) / boxH));
          const xf = (w - boxW * zf) / 2 - b.minX * zf;
          const yf = Math.max(PAD, (h - boxH * zf) * CAM_TOP) - b.minY * zf;
          rf.setViewport({
            x: lerp(xf, PAD, sStraight),
            y: lerp(yf, yRow, sStraight),
            zoom: lerp(zf, READ_ZOOM, sStraight),
          });
        } else {
          // Frame the compare: top row (always vs.totalW wide) + the lower row
          // as it drops in, plus the label / read-out gutters — easing open
          // with sDrop so the camera pulls back to reveal the second row.
          const gutterL = LABEL_W * sDrop;
          const gutterR = TIME_W * sDrop;
          const contentW = gutterL + topRight + gutterR;
          const tagTop = 58; // name-tag space above the Today row
          const contentH = tagTop + botY + CARD_H + 30 * sDrop;
          const zoom = Math.max(
            0.08,
            Math.min(READ_ZOOM, (w - PAD * 2) / Math.max(1, contentW), (h - PAD * 2) / Math.max(1, contentH)),
          );
          const x = (w - contentW * zoom) / 2 + gutterL * zoom;
          const y = (h - contentH * zoom) * CAM_TOP + tagTop * zoom;
          rf.setViewport({ x, y, zoom });
          // Board-relative screen Y of the Unifize row's lower edge, so the
          // money line can sit right under the compressed chart (not the board
          // floor). Stable through the READ beat (drop/zoom are settled).
          const uniBottom = y + (botY + SLAB_Y + SLAB_H) * zoom;
          boardRef.current?.style.setProperty("--ps-uni-bottom", `${Math.round(uniBottom)}px`);
        }
      }
      const sec = sectionRef.current;
      if (sec) {
        sec.style.setProperty("--straighten", String(sStraight));
        sec.style.setProperty("--slab", String(sSlab));
        sec.style.setProperty("--fill", String(sFill));
        sec.style.setProperty("--drop", String(sDrop));
        sec.style.setProperty("--compress", String(sComp));
        sec.style.setProperty("--read", String(sRead));
      }
    },
    [baseNodes, serpAll, compactAll, vsAll, serpBounds, vs, compact, compressed, setNodes],
  );

  const onInit = useCallback((inst: ReactFlowInstance) => {
    rfRef.current = inst;
  }, []);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    applyProgress(progRef.current);
  }, [applyProgress, boardSize]);

  useEffect(() => {
    if (reducedRef.current) {
      applyProgress(1);
      return;
    }
    let raf = 0;
    let last = 0;
    const update = () => {
      raf = 0;
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = clamp01(total > 0 ? -rect.top / total : 0);
      if (p !== progRef.current) {
        progRef.current = p;
        applyProgress(p);
      }
    };
    const onScroll = () => {
      const now = performance.now();
      if (raf || now - last < 12) return;
      last = now;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [applyProgress]);

  return (
    <div className={cn("ps", className)} ref={sectionRef}>
      <div
        className="ps-stage"
        style={{
          maxWidth: "var(--maxw)",
          width: "100%",
          margin: "0 auto",
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
        }}
      >
        <div className="ps-head">
          {/* 2026-06-05: decorative beat kickers removed — the §01 section
              head carries the framing; empty spacer keeps the readout right. */}
          <span className="ps-kickers" aria-hidden="true" />
          <span className="ps-readout mono">
            {totals.curH} h <span aria-hidden>→</span> <b>{totals.uniH} h</b> · −{totals.pct}%
          </span>
        </div>

        {/* Beat narration — sits in flow ABOVE the canvas (2026-06-05: the
            floating card overlapped the chart), cross-fading per scroll var. */}
        <div className="ps-narrate" aria-hidden>
          <p className="ps-cap ps-cap--map">
            <b>What you think your process looks like.</b>
            <span>A tidy flowchart, neat boxes and arrows.</span>
          </p>
          <p className="ps-cap ps-cap--straight">
            <b>But it&apos;s really one timeline.</b>
            <span>The same steps, in the order the work actually flows.</span>
          </p>
          {/* Beats 3–5 dictated verbatim by Ben (call 2026-06-03): timeline
              contains VA + NVA → up to 80% of NVA is coordination tax →
              Unifize reduces CT by 65%. Not "gaps = CT": coordination also
              lives within steps, not just between them. */}
          <p className="ps-cap ps-cap--slab">
            <b>This timeline contains value addition work and non-value addition work.</b>
            <span>Each step contains slabs of value addition work, mixed with non-value addition time.</span>
          </p>
          <p className="ps-cap ps-cap--tax">
            <b>Up to 80% of non-value addition time is what we call coordination tax.</b>
            <span>The waiting, chasing and reconciliation — within steps and between them. Nobody signs off on it.</span>
          </p>
          <p className="ps-cap ps-cap--compress">
            <b>Unifize reduces coordination tax by 65%.</b>
            <span>
              The same value addition blocks, packed together as the coordination
              tax falls away. {totals.curH} h → {totals.uniH} h.
            </span>
          </p>
        </div>

        <div
          className="ps-board"
          ref={boardRef}
          style={{
            // Seamless on the page — no box (Ben 2026-06-02: "make it seamless …
            // so it just looks like it's on the page as a process flow").
            // Sizing lives in process-straighten.css (beat-aware height:
            // tall for the serpentine map, snug for the timeline beats).
            overflow: "hidden",
          }}
        >
          <CTLayerContext.Provider value={false}>
            <TextLayerContext.Provider value={true}>
              <WorkLayerContext.Provider value={false}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={psNodeTypes}
                  onInit={onInit}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  minZoom={0.08}
                  maxZoom={1.4}
                  nodesConnectable={false}
                  nodesDraggable={false}
                  nodesFocusable={false}
                  edgesFocusable={false}
                  elementsSelectable={false}
                  panOnDrag={false}
                  panOnScroll={false}
                  zoomOnScroll={false}
                  zoomOnPinch={false}
                  zoomOnDoubleClick={false}
                  preventScrolling={false}
                  proOptions={{ hideAttribution: true }}
                />{/* no dot-grid backdrop — the canvas reads as part of the page */}
              </WorkLayerContext.Provider>
            </TextLayerContext.Provider>
          </CTLayerContext.Provider>

          <div
            className="ps-legend mono"
            aria-hidden
            style={{
              // Centred under the bars, tracking the Unifize row like the money
              // line. Inline so it overrides any stale .ps-legend in globals.css
              // and stays co-located with the JS that sets --ps-uni-bottom.
              position: "absolute",
              left: 0,
              right: 0,
              top: "calc(var(--ps-uni-bottom, 62%) + 12px)",
              bottom: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              fontSize: 11,
              color: "var(--n-500)",
              opacity:
                "clamp(0, calc((var(--slab, 0) - 0.2) * 1.6 - var(--read, 0) * 3), 1)",
              pointerEvents: "none",
              transition: "opacity 100ms linear",
            }}
          >
            {/* Legend labels per Ben (call 2026-06-03): "value added time /
                non value added time" — CT is introduced in the captions, not
                assumed as a recognized term here. */}
            <span className="ps-legend-i"><i className="ps-sw ps-sw--va" /> value-added time</span>
            <span className="ps-legend-i"><i className="ps-sw ps-sw--nva" /> non-value-added time</span>
          </div>

          {/* MONEY LINE — the $ read the dropped ledger used to carry, folded
              under the on-canvas before/after and revealed as the compare
              settles (--read). The hours before/after now lives on the canvas. */}
          <div className="ps-moneyline mono" aria-hidden>
            <span className="ps-casc">
              <b className="ps-casc-strike">${totals.curUsd.toLocaleString("en-US")}</b>
              <span className="ps-casc-arrow">→</span>
              <b className="ps-casc-now">${totals.uniUsd.toLocaleString("en-US")}</b>
              <span className="ps-casc-unit">/ cycle</span>
            </span>
            <span className="ps-casc-sep">·</span>
            <span className="ps-casc">
              <span className="ps-casc-unit">×{instancesPerYear}/yr</span>
              <b className="ps-casc-big">{fmtUsd(totals.savedYr)}</b>
              <span className="ps-casc-unit">returned</span>
            </span>
            <span className="ps-casc-sep">·</span>
            <span className="ps-casc">
              <span className="ps-casc-unit">up to</span>
              <b className="ps-casc-big">{fmtUsd(annualScaleSavedUsd)}</b>
              <span className="ps-casc-unit">/yr across the QMS</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
