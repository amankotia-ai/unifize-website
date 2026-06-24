"use client";

/* ------------------------------------------------------------
 * ValueStreamFlow — the value stream as a React Flow flowchart.
 *
 * Same engine/feel as the journey canvas, but the nodes are
 * Value Stream Steps: one node per step, laid out serpentine,
 * connected in sequence, with WAIT steps (the coordination tax)
 * styled red. Reads the real NC/CAPA figures.
 * ------------------------------------------------------------ */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  MarkerType,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
} from "@xyflow/react";
import { cn } from "@/lib/cn";
import { NC_CAPA_VALUE_STREAM, type ValueStream } from "@/lib/platform-data/value-stream";

const NW = 214; // node width
const NH = 88; // node height
const CELL_W = 242;
const ROW_STRIDE = 138;
const MARGIN = 24;

interface VSNodeData extends Record<string, unknown> {
  num: string;
  desc: string;
  min: number;
  wait: boolean;
  stage: string;
}

function VSStepNode({ data }: NodeProps) {
  const d = data as VSNodeData;
  return (
    <div className={cn("vsf-node", d.wait && "vsf-node--wait")} style={{ width: NW, height: NH }}>
      <Handle id="tL" type="target" position={Position.Left} className="vsf-h" />
      <Handle id="sR" type="source" position={Position.Right} className="vsf-h" />
      <Handle id="tT" type="target" position={Position.Top} className="vsf-h" />
      <Handle id="sT" type="source" position={Position.Top} className="vsf-h" />
      <Handle id="tB" type="target" position={Position.Bottom} className="vsf-h" />
      <Handle id="sB" type="source" position={Position.Bottom} className="vsf-h" />
      <Handle id="sL" type="source" position={Position.Left} className="vsf-h" />
      <Handle id="tR" type="target" position={Position.Right} className="vsf-h" />
      <span className="vsf-rail" />
      <div className="vsf-top">
        <span className="vsf-stage mono">{d.stage}</span>
        <span className="vsf-min mono">{d.min}m</span>
      </div>
      <div className="vsf-body">
        <span className="vsf-num mono">{d.num}</span>
        <span className="vsf-desc">{d.desc}</span>
      </div>
      {d.wait ? <span className="vsf-waitchip mono">WAIT</span> : null}
    </div>
  );
}

const nodeTypes = { vsstep: VSStepNode };

function pickHandles(a: { cx: number; cy: number }, b: { cx: number; cy: number }) {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0 ? { sourceHandle: "sR", targetHandle: "tL" } : { sourceHandle: "sL", targetHandle: "tR" };
  }
  return dy >= 0 ? { sourceHandle: "sB", targetHandle: "tT" } : { sourceHandle: "sT", targetHandle: "tB" };
}

function build(vs: ValueStream, cols: number): { nodes: Node[]; edges: Edge[]; height: number } {
  const flat = vs.stages.flatMap((st) => st.steps.map((s) => ({ ...s, stage: `${st.index} · ${st.name}` })));
  const pos = flat.map((_, i) => {
    const row = Math.floor(i / cols);
    const within = i % cols;
    const col = row % 2 === 0 ? within : cols - 1 - within; // snake
    const cx = MARGIN + col * CELL_W + CELL_W / 2;
    const cy = MARGIN + row * ROW_STRIDE + ROW_STRIDE / 2;
    return { cx, cy, x: cx - NW / 2, y: cy - NH / 2 };
  });
  const rows = Math.ceil(flat.length / cols);
  const nodes: Node[] = flat.map((s, i) => ({
    id: s.num,
    type: "vsstep",
    position: { x: pos[i].x, y: pos[i].y },
    data: { num: s.num, desc: s.desc, min: s.min, wait: !!s.wait, stage: s.stage },
    draggable: true,
  }));
  const edges: Edge[] = [];
  for (let i = 0; i < flat.length - 1; i++) {
    const h = pickHandles(pos[i], pos[i + 1]);
    const intoWait = flat[i + 1].wait;
    edges.push({
      id: `vse-${i}`,
      source: flat[i].num,
      target: flat[i + 1].num,
      ...h,
      type: "smoothstep",
      style: { stroke: intoWait ? "var(--s-err)" : "var(--n-300)", strokeWidth: 1.5, strokeDasharray: intoWait ? "5 4" : undefined },
      markerEnd: { type: MarkerType.ArrowClosed, width: 13, height: 13, color: intoWait ? "var(--s-err)" : "var(--n-400)" },
    });
  }
  const height = MARGIN * 2 + rows * ROW_STRIDE;
  return { nodes, edges, height };
}

export function ValueStreamFlow({ vs = NC_CAPA_VALUE_STREAM }: { vs?: ValueStream }) {
  const flowRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    setW(el.clientWidth);
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cols = useMemo(() => (w ? Math.max(3, Math.min(6, Math.floor((w - 40) / CELL_W))) : 5), [w]);
  const laid = useMemo(() => build(vs, cols), [vs, cols]);
  const [nodes, setNodes, onNodesChange] = useNodesState(laid.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(laid.edges);

  const rfRef = useRef<ReactFlowInstance | null>(null);
  const onInit = useCallback((i: ReactFlowInstance) => {
    rfRef.current = i;
  }, []);
  useEffect(() => {
    setNodes(laid.nodes);
    setEdges(laid.edges);
    const id = requestAnimationFrame(() => rfRef.current?.fitView({ padding: 0.08, maxZoom: 1, duration: 200 }));
    return () => cancelAnimationFrame(id);
  }, [laid, setNodes, setEdges]);

  const height = Math.min(Math.max(laid.height + 24, 360), 1400);

  return (
    <div className="vsf-board">
      <div className="vsf-flow" style={{ height }} ref={flowRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onInit={onInit}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.08, minZoom: 0.3, maxZoom: 1 }}
          minZoom={0.3}
          maxZoom={1.6}
          nodesConnectable={false}
          nodesDraggable
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          preventScrolling={false}
          zoomOnPinch
          panOnDrag
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="var(--n-150)" />
          <Controls showInteractive={false} position="bottom-right" />
        </ReactFlow>
      </div>
    </div>
  );
}
