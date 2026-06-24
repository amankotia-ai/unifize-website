/* ------------------------------------------------------------
 * JourneyConstellation — the hero-right visual (2026-06-04).
 *
 * A quiet, non-interactive mini-map of a Workflow: the journey as
 * the buyer would sketch it on a whiteboard. Geometry only — no
 * text. Dim dots and thin lines; decision diamonds; tight rework
 * bows; the training handoff fanning out; a green end terminal.
 * A slow pulse walks the spine — each rework bow flashes as the
 * pulse passes its decision. §01 below then takes this exact map
 * and straightens it into the time story (setup → payoff).
 *
 * Polish pass (2026-06-04): labels removed, rework edges drawn as
 * SHORTHAND loops (diamond → its previous node) rather than the
 * literal long-range edge — the true topology is §01's job; the
 * hero only needs "this process loops back on itself" at a glance.
 * Two-row serpentine so the handoff fan gets open space.
 *
 * Fully data-driven from Workflow nodes/edges. Server-safe: pure
 * render, CSS animations only, honors prefers-reduced-motion.
 * ------------------------------------------------------------ */
import type { Workflow, WorkflowNode } from "@/lib/platform-data/workflows";
import "./journey-constellation.css";

export interface JourneyConstellationProps {
  workflow: Workflow;
  /** Spine nodes per serpentine row. Default 6 (two quiet rows for 12-node journeys). */
  perRow?: number;
  className?: string;
}

const DX = 64; // column pitch
const DY = 96; // row pitch
const STEP_S = 0.55; // pulse seconds per spine node

interface Pt {
  x: number;
  y: number;
}

/** Follow `flow` edges from the start to order the spine. */
function spineOrder(wf: Workflow): WorkflowNode[] {
  const byId = new Map(wf.nodes.map((n) => [n.id, n]));
  const hasIncomingFlow = new Set(
    wf.edges.filter((e) => e.kind === "flow").map((e) => e.to),
  );
  const start =
    wf.nodes.find((n) => n.kind === "terminal" && !hasIncomingFlow.has(n.id)) ??
    wf.nodes[0]!;
  const out: WorkflowNode[] = [];
  const seen = new Set<string>();
  let cur: WorkflowNode | undefined = start;
  while (cur && !seen.has(cur.id)) {
    out.push(cur);
    seen.add(cur.id);
    const next = wf.edges.find((e) => e.kind === "flow" && e.from === cur!.id);
    cur = next ? byId.get(next.to) : undefined;
  }
  return out;
}

/** Boustrophedon placement: rows alternate direction, row-breaks share a column. */
function place(spine: WorkflowNode[], perRow: number): Map<string, Pt> {
  const pos = new Map<string, Pt>();
  spine.forEach((n, i) => {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const x = (row % 2 === 0 ? col : perRow - 1 - col) * DX;
    pos.set(n.id, { x, y: row * DY });
  });
  return pos;
}

/** Tight quadratic bow between two (usually adjacent) nodes, bulging outward:
 *  up for horizontal pairs, right for vertical pairs. */
function bow(a: Pt, b: Pt): { d: string; apex: Pt } {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const k = 30;
  let cx = mx + (-dy / len) * k;
  let cy = my + (dx / len) * k;
  if (cy > my || (cy === my && cx < mx)) {
    cx = mx + (dy / len) * k;
    cy = my + (-dx / len) * k;
  }
  return {
    d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`,
    apex: { x: (a.x + 2 * cx + b.x) / 4, y: (a.y + 2 * cy + b.y) / 4 },
  };
}

export function JourneyConstellation({
  workflow,
  perRow = 6,
  className,
}: JourneyConstellationProps) {
  const spine = spineOrder(workflow);
  const pos = place(spine, perRow);
  const spineIndex = new Map(spine.map((n, i) => [n.id, i]));
  const T = spine.length * STEP_S;

  /* Rework, as shorthand: a tight loop from the decision back to the node
     just before it on the spine. Legible at hero scale; §01 carries the
     literal topology. */
  const reworks = workflow.edges
    .filter((e) => e.kind === "rework")
    .map((e) => {
      const i = spineIndex.get(e.from);
      if (i === undefined || i < 1) return null;
      const a = pos.get(e.from)!;
      const b = pos.get(spine[i - 1]!.id)!;
      return { key: `${e.from}-${e.to}`, fromIndex: i, ...bow(a, b) };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  /* Handoff fan: three short rays into open space below the source. */
  const handoffs = workflow.edges
    .filter((e) => e.kind === "handoff" && pos.has(e.from))
    .map((e) => {
      const a = pos.get(e.from)!;
      return {
        key: `${e.from}-${e.to}`,
        from: a,
        tips: [
          { x: a.x - 44, y: a.y + 38 },
          { x: a.x - 50, y: a.y + 56 },
          { x: a.x - 32, y: a.y + 70 },
        ],
      };
    });

  /* viewBox from everything drawn, plus quiet margins (pulse ring needs ~16). */
  const pts: Pt[] = [
    ...pos.values(),
    ...reworks.map((r) => r.apex),
    ...handoffs.flatMap((h) => h.tips),
  ];
  const minX = Math.min(...pts.map((p) => p.x)) - 30;
  const maxX = Math.max(...pts.map((p) => p.x)) + 30;
  const minY = Math.min(...pts.map((p) => p.y)) - 28;
  const maxY = Math.max(...pts.map((p) => p.y)) + 28;

  return (
    <svg
      className={["jc", className].filter(Boolean).join(" ")}
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      role="img"
      aria-label={`${workflow.title} — journey map`}
    >
      {/* spine connectors (nodes are painted over the line ends) */}
      {spine.slice(0, -1).map((n, i) => {
        const a = pos.get(n.id)!;
        const b = pos.get(spine[i + 1]!.id)!;
        return (
          <line
            key={`f-${n.id}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            className="jc-edge"
          />
        );
      })}

      {/* rework loops — flash as the pulse hits their decision */}
      {reworks.map((r) => (
        <path
          key={`r-${r.key}`}
          d={r.d}
          className="jc-rework"
          style={{
            animationDuration: `${T}s`,
            animationDelay: `${r.fromIndex * STEP_S}s`,
          }}
        />
      ))}

      {/* handoff fan-outs */}
      {handoffs.map((h) => (
        <g key={`h-${h.key}`}>
          {h.tips.map((t, i) => (
            <line
              key={i}
              x1={h.from.x}
              y1={h.from.y}
              x2={t.x}
              y2={t.y}
              className="jc-edge jc-edge--dashed"
            />
          ))}
          {h.tips.map((t, i) => (
            <circle key={`d-${i}`} cx={t.x} cy={t.y} r="2.5" className="jc-minor" />
          ))}
        </g>
      ))}

      {/* nodes (drawn over edges so line ends tuck underneath) */}
      {spine.map((n) => {
        const p = pos.get(n.id)!;
        if (n.kind === "decision") {
          return (
            <path
              key={n.id}
              d={`M ${p.x} ${p.y - 7} L ${p.x + 7} ${p.y} L ${p.x} ${p.y + 7} L ${p.x - 7} ${p.y} Z`}
              className="jc-decision"
            />
          );
        }
        if (n.kind === "terminal") {
          const end = n.end === true;
          return (
            <g key={n.id} className={end ? "jc-term jc-term--end" : "jc-term"}>
              <circle cx={p.x} cy={p.y} r="6.5" className="jc-term-ring" />
              <circle cx={p.x} cy={p.y} r="2.5" className="jc-term-dot" />
            </g>
          );
        }
        return <circle key={n.id} cx={p.x} cy={p.y} r="4.5" className="jc-step" />;
      })}

      {/* the traveling pulse — one ring per spine node, staggered */}
      {spine.map((n, i) => {
        const p = pos.get(n.id)!;
        return (
          <circle
            key={`p-${n.id}`}
            cx={p.x}
            cy={p.y}
            r="5"
            className="jc-pulse"
            style={{
              animationDuration: `${T}s`,
              animationDelay: `${i * STEP_S}s`,
            }}
          />
        );
      })}
    </svg>
  );
}
