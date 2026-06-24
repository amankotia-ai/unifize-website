import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TraceNodeProps {
  ts: ReactNode;
  lab: ReactNode;
  actor: ReactNode;
  /** Commit nodes mark where coordination becomes record. Filled brand blue. */
  commit?: boolean;
  className?: string;
}

/**
 * M.07 — Trace node. A single event in a decision trace.
 * Default reads as an open coordination event;
 * commit reads as a permanent record point.
 */
export function TraceNode({
  ts,
  lab,
  actor,
  commit,
  className,
}: TraceNodeProps) {
  return (
    <div className={cn("trace-node", commit && "commit", className)}>
      <div className="dot" />
      <div className="ts">{ts}</div>
      <div className="lab">{lab}</div>
      <div className="actor">{actor}</div>
    </div>
  );
}
