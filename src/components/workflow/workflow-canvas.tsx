"use client";

/* ------------------------------------------------------------
 * WorkflowCanvas — the embeddable process canvas.
 *
 * Give it a Workflow; it auto-lays-out (dagre, left→right) and
 * renders a React Flow board that fits the page-width column
 * (fitView) instead of forcing horizontal scroll. Pan + zoom for
 * detail; the spine, branches and rework loops read at a glance.
 *
 * Reusable anywhere — domain pages now, proposals / paid sections
 * later. The coordination-tax (CT) layer is an opt-in toggle,
 * off by default so the website stays recognition-led.
 * ------------------------------------------------------------ */

/* React Flow base styles are imported globally in src/app/globals.css
 * (@import "@xyflow/react/dist/style.css") so they load in the correct
 * cascade order and survive Turbopack HMR. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type ReactFlowInstance,
} from "@xyflow/react";
import { cn } from "@/lib/cn";
import type { Workflow } from "@/lib/platform-data/workflows";
import { layoutWorkflow } from "./layout";
import { CTLayerContext, TextLayerContext, WorkLayerContext, nodeTypes } from "./nodes";
import { MODULE_VAR } from "./theme";

export interface WorkflowCanvasProps {
  workflow: Workflow;
  /** Override the auto board height (px). By default it's derived from the layout. */
  height?: number;
  /** Cap the serpentine column count. Default 6. */
  maxColumns?: number;
  /** Start with the coordination-tax overlay on. Default false. */
  showCTByDefault?: boolean;
  /** Show the CT layer toggle in the toolbar. Default true. */
  enableCTToggle?: boolean;
  /** Start with the step text layer shown. Default true. */
  showTextByDefault?: boolean;
  /** Render the module / title / summary block above the board. Default true. */
  showHeader?: boolean;
  /** Show the per-canvas legend in the toolbar. Default true. Off when a shared key is present. */
  showLegend?: boolean;
  className?: string;
}

/** Width one serpentine column occupies (must track CELL_W in layout.ts). */
const COL_WIDTH = 300;

export function WorkflowCanvas({
  workflow,
  height,
  maxColumns = 6,
  showCTByDefault = false,
  enableCTToggle = true,
  showTextByDefault = true,
  showHeader = true,
  showLegend = true,
  className,
}: WorkflowCanvasProps) {
  const accentVar = MODULE_VAR[workflow.accent];
  const counts = useMemo(() => {
    const n = workflow.nodes;
    return {
      steps: n.filter((x) => x.kind === "step").length,
      forks: n.filter((x) => x.kind === "decision").length,
      handoffs: n.filter((x) => x.kind === "handoff").length,
    };
  }, [workflow]);
  const [showCT, setShowCT] = useState(showCTByDefault);
  const [showText, setShowText] = useState(showTextByDefault);
  const [showWork, setShowWork] = useState(false);
  const hasValueStream = useMemo(
    () => workflow.nodes.some((n) => n.kind === "step" && (n.valueStream?.length ?? 0) > 0),
    [workflow],
  );

  // measure the board so the serpentine wraps to fit the page-width column.
  const flowRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(0);
  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    setBoardWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => setBoardWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // columns: as many as fit the width, capped, never more than the node count.
  const spineCount = useMemo(
    () => workflow.nodes.filter((n) => n.kind !== "handoff").length,
    [workflow],
  );
  const cols = useMemo(() => {
    const fit = boardWidth ? Math.floor((boardWidth - 40) / COL_WIDTH) : 5;
    return Math.max(2, Math.min(maxColumns, fit, spineCount));
  }, [boardWidth, maxColumns, spineCount]);

  const laid = useMemo(
    () => layoutWorkflow(workflow, accentVar, cols, showText, showWork),
    [workflow, accentVar, cols, showText, showWork],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(laid.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(laid.edges);

  const rfRef = useRef<ReactFlowInstance | null>(null);
  const onInit = useCallback((inst: ReactFlowInstance) => {
    rfRef.current = inst;
  }, []);

  // re-seed + re-fit whenever the layout changes (workflow or column count).
  useEffect(() => {
    setNodes(laid.nodes);
    setEdges(laid.edges);
    const id = requestAnimationFrame(() =>
      rfRef.current?.fitView({ padding: 0.08, maxZoom: 1, duration: 200 }),
    );
    return () => cancelAnimationFrame(id);
  }, [laid, setNodes, setEdges]);

  // board grows with the layout so every card stays at ~1.0 zoom and all
  // nodes are visible on load — the section gets tall and the page scrolls,
  // rather than shrinking cards to fit a fixed height.
  const boardHeight = height ?? Math.min(Math.max(laid.height + 24, 340), 1600);

  return (
    <div className={cn("wf-canvas", className)}>
      {showHeader ? (
        <div className="wf-head">
          <div className="wf-eyebrow mono">
            <span className="wf-eyebrow-dot" style={{ background: accentVar }} />
            {workflow.id} · {workflow.module}
            {workflow.status ? <span className="wf-pass"> · ● {workflow.status}</span> : null}
          </div>
          <h3 className="wf-title">{workflow.title}</h3>
          <p className="wf-summary">{workflow.summary}</p>
          <div className="wf-badges mono">
            {workflow.complexity ? (
              <span className="wf-badge wf-badge--tier" style={{ color: accentVar, borderColor: accentVar }}>
                {workflow.complexity}
              </span>
            ) : null}
            <span className="wf-badge">{counts.steps} steps</span>
            {counts.forks ? <span className="wf-badge">{counts.forks} forks</span> : null}
            {counts.handoffs ? <span className="wf-badge">{counts.handoffs} handoff{counts.handoffs > 1 ? "s" : ""}</span> : null}
          </div>
        </div>
      ) : null}

      <div className="wf-board">
        <div className="wf-toolbar">
          {showLegend ? (
            <div className="wf-legend mono">
              <span className="wf-lg"><i className="wf-lg-line" />flow</span>
              <span className="wf-lg"><i className="wf-lg-dia" />decision</span>
              <span className="wf-lg"><i className="wf-lg-line wf-lg-line--rework" />rework loop</span>
              <span className="wf-lg"><i className="wf-lg-line wf-lg-line--handoff" />handoff</span>
            </div>
          ) : <span className="wf-toolbar-spacer" />}
          <div className="wf-toggles">
            <button
              type="button"
              role="switch"
              aria-checked={showText}
              className={cn("wf-cttoggle mono", showText && "is-on")}
              onClick={() => setShowText((v) => !v)}
            >
              <span className="wf-cttoggle-track" />
              Step detail
            </button>
            {hasValueStream ? (
              <button
                type="button"
                role="switch"
                aria-checked={showWork}
                className={cn("wf-cttoggle mono", showWork && "is-on")}
                onClick={() => setShowWork((v) => !v)}
              >
                <span className="wf-cttoggle-track" />
                Work layer
              </button>
            ) : null}
            {enableCTToggle ? (
              <button
                type="button"
                role="switch"
                aria-checked={showCT}
                className={cn("wf-cttoggle mono", showCT && "is-on")}
                onClick={() => setShowCT((v) => !v)}
              >
                <span className="wf-cttoggle-track" />
                Coordination-tax layer
              </button>
            ) : null}
          </div>
        </div>

        {showWork && workflow.valueStreamSample ? (
          <div className="wf-samplenote mono">
            ⚠ Sample value-stream data (agency-authored) — pending real wiring in Notion. Timings illustrative.
          </div>
        ) : null}

        <CTLayerContext.Provider value={showCT}>
          <TextLayerContext.Provider value={showText}>
          <WorkLayerContext.Provider value={showWork}>
          <div className="wf-flow" style={{ height: boardHeight }} ref={flowRef}>
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
          </WorkLayerContext.Provider>
          </TextLayerContext.Provider>
        </CTLayerContext.Provider>
      </div>
    </div>
  );
}
