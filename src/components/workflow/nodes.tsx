"use client";

/* ------------------------------------------------------------
 * Reusable canvas elements — the building blocks of the process
 * visual language. Each is a React Flow custom node:
 *   StepNode      a unit of user interaction (+ opt-in CT layer)
 *   DecisionNode  a branch point (diamond)
 *   TerminalNode  start / governed-close cap
 *   HandoffNode   routes out to another module
 *
 * Compose these into any workflow; they carry their own handles
 * so edges attach consistently (flow l→r, loops over the top,
 * handoffs below). Reusable anywhere a canvas is embedded.
 * ------------------------------------------------------------ */

import { createContext, useContext } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/cn";
import type {
  StepNodeData,
  DecisionNodeData,
  TerminalNodeData,
  HandoffNodeData,
} from "@/lib/platform-data/workflows";
import { NODE_SIZE, STEP_W, STEP_H_FULL, STEP_H_COMPACT, VS_STRIP_H, H } from "./layout";
import { MODULE_VAR, MEDIUM_VAR, MEDIUM_LABEL, SYSTEM_LABEL, CT_VAR, CT_LABEL, GOALZERO_VAR, VSCLASS_VAR, VSCLASS_LABEL } from "./theme";

/** Toggles the coordination-tax overlay without re-laying-out. */
export const CTLayerContext = createContext(false);

/** Whether step cards show the text layer (What Happens + decides). */
export const TextLayerContext = createContext(true);

/** Whether step cards show the value-stream work strip. */
export const WorkLayerContext = createContext(false);

/** minutes → short human duration. */
function dur(m: number): string {
  if (m < 60) return `${Math.round(m)}m`;
  if (m < 1440) return `${(m / 60).toFixed(m % 60 ? 1 : 0)}h`;
  return `${(m / 1440).toFixed(1)}d`;
}

type WithAccent<T> = T & { accentVar: string };

/**
 * Source + target handle on every side. The layout picks which side
 * each edge uses from geometry, so edges stay clean whether the flow
 * runs horizontally, wraps (serpentine), or stacks vertically.
 */
function NodeHandles() {
  return (
    <>
      <Handle id={H.tL} type="target" position={Position.Left} className="wf-h" />
      <Handle id={H.sL} type="source" position={Position.Left} className="wf-h" />
      <Handle id={H.tR} type="target" position={Position.Right} className="wf-h" />
      <Handle id={H.sR} type="source" position={Position.Right} className="wf-h" />
      <Handle id={H.tT} type="target" position={Position.Top} className="wf-h" />
      <Handle id={H.sT} type="source" position={Position.Top} className="wf-h" />
      <Handle id={H.tB} type="target" position={Position.Bottom} className="wf-h" />
      <Handle id={H.sB} type="source" position={Position.Bottom} className="wf-h" />
    </>
  );
}

export function StepNode({ data }: NodeProps) {
  const d = data as unknown as WithAccent<StepNodeData>;
  const showCT = useContext(CTLayerContext);
  const showText = useContext(TextLayerContext);
  const showWork = useContext(WorkLayerContext);
  const height = (showText ? STEP_H_FULL : STEP_H_COMPACT) + (showWork ? VS_STRIP_H : 0);

  const vs = d.valueStream ?? [];
  const curTotal = vs.reduce((s, v) => s + v.currentMin, 0);
  const uniTotal = vs.reduce((s, v) => s + v.unifizeMin, 0);
  const aiTotal = vs.reduce((s, v) => s + (v.aiMin ?? 0), 0);
  const idleMin = vs.filter((v) => v.classification === "WAIT" || v.classification === "NVA").reduce((s, v) => s + v.currentMin, 0);
  const idlePct = curTotal ? Math.round((idleMin / curTotal) * 100) : 0;

  return (
    <div
      className={cn("wf-node wf-step", !showText && "wf-step--compact")}
      style={{ width: STEP_W, height }}
    >
      <NodeHandles />
      <span className="wf-step-rail" style={{ background: d.accentVar }} />
      <div className="wf-step-head">
        <span className="wf-idx mono" style={{ color: d.accentVar }}>
          {String(d.index).padStart(2, "0")}
        </span>
        <span className="wf-step-name">{d.name}</span>
        <span
          className="wf-gz"
          style={{ background: GOALZERO_VAR[d.goalZero] }}
          title={`Goal Zero: ${d.goalZero}`}
        />
      </div>
      {showText ? (
        <>
          <p className="wf-what">{d.whatHappens}</p>
          <div className="wf-decides">
            <span className="wf-decides-k mono">decides</span>
            <span className="wf-decides-v">{d.userDecision}</span>
          </div>
        </>
      ) : null}
      <div className="wf-step-meta">
        <span className="wf-role mono">{d.role}</span>
        <span className="wf-surf">
          {d.mediums.map((m) => (
            <span key={m} className="wf-surf-dot" style={{ background: MEDIUM_VAR[m] }} title={MEDIUM_LABEL[m]} />
          ))}
        </span>
        {d.systems?.length ? (
          <span className="wf-sys">
            {d.systems.map((s) => (
              <span key={s} className="wf-sys-chip mono" title={SYSTEM_LABEL[s]}>
                {s}
              </span>
            ))}
          </span>
        ) : null}
        {showCT && d.ct?.length ? (
          <span className="wf-ct">
            {d.ct.map((c) => (
              <b key={c} className="mono" style={{ color: CT_VAR[c] }} title={CT_LABEL[c]}>
                {c}
              </b>
            ))}
          </span>
        ) : null}
      </div>
      {showWork ? (
        <div className="wf-vs">
          {vs.length ? (
            <>
              <div className="wf-vs-bar" title={`${dur(curTotal)} elapsed · ${idlePct}% non-value / wait`}>
                {vs.map((v, i) => (
                  <span
                    key={i}
                    className="wf-vs-seg"
                    style={{ flexGrow: Math.max(v.currentMin, 1), background: VSCLASS_VAR[v.classification] }}
                    title={`${v.name} — ${VSCLASS_LABEL[v.classification]} · ${dur(v.currentMin)}`}
                  />
                ))}
              </div>
              <div className="wf-vs-meta mono">
                <span className="wf-vs-time">{dur(curTotal)} elapsed</span>
                <span className="wf-vs-wait">{idlePct}% wait/NVA</span>
                <span className="wf-vs-comp">
                  → {dur(uniTotal)} Unifize{aiTotal ? ` · ${dur(aiTotal)} AI` : ""}
                </span>
              </div>
            </>
          ) : (
            <span className="wf-vs-empty mono">value stream not yet wired</span>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function DecisionNode({ data }: NodeProps) {
  const d = data as unknown as WithAccent<DecisionNodeData>;
  const size = NODE_SIZE.decision;
  return (
    <div className="wf-node wf-decision" style={{ width: size.w, height: size.h }}>
      <NodeHandles />
      <span className="wf-diamond" />
      <span className="wf-diamond-q mono">?</span>
      <span className="wf-decision-label mono">{d.question}</span>
    </div>
  );
}

export function TerminalNode({ data }: NodeProps) {
  const d = data as unknown as WithAccent<TerminalNodeData>;
  const size = NODE_SIZE.terminal;
  return (
    <div
      className={cn("wf-node wf-terminal mono", d.end && "wf-terminal--end")}
      style={{ width: size.w, height: size.h }}
    >
      <NodeHandles />
      {d.label}
    </div>
  );
}

export function HandoffNode({ data }: NodeProps) {
  const d = data as unknown as WithAccent<HandoffNodeData>;
  const size = NODE_SIZE.handoff;
  return (
    <div className="wf-node wf-handoff" style={{ width: size.w, height: size.h }}>
      <NodeHandles />
      <span className="wf-handoff-kicker mono">hands off to</span>
      <span className="wf-handoff-name">
        <span className="wf-handoff-dot" style={{ background: MODULE_VAR[d.module] }} />
        {d.label}
      </span>
    </div>
  );
}

/** Map passed to <ReactFlow nodeTypes=…>. Keys match WorkflowNode.kind. */
export const nodeTypes = {
  step: StepNode,
  decision: DecisionNode,
  terminal: TerminalNode,
  handoff: HandoffNode,
};
