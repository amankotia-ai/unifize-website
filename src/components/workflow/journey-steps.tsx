/* ------------------------------------------------------------
 * JourneySteps — §01 lead-in (2026-06-02 call follow-up).
 *
 * Replaces the technical WorkflowKey with the journey itself: the named
 * steps, listed down and designed, drawn from the SAME workflow that drives
 * the ProcessStraighten map below — so it reads as "what the process looks
 * like on paper" and flows straight into the map (Ben 2026-06-02: "a set of
 * steps listed down that's designed well, that flows into this … that's
 * probably more like the headline").
 *
 * Source of truth: the workflow's Journey Steps (Notion: Name /
 * Role-in-the-moment / What Happens / User Decision). CT primitives and Goal
 * Zero are deliberately omitted — that legend clutter is exactly what Ben
 * wanted gone here.
 *
 * Co-located CSS (imported below) so the styles ship with the component chunk
 * and dodge Turbopack's stale global-CSS HMR — same pattern as AIReadStory.
 * Tokens come from globals.css :root.
 * ------------------------------------------------------------ */

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { Workflow, StepNodeData } from "@/lib/platform-data/workflows";
import { MODULE_VAR } from "./theme";
import "./journey-steps.css";

export interface JourneyStepsProps {
  workflow: Workflow;
  className?: string;
}

export function JourneySteps({ workflow, className }: JourneyStepsProps) {
  const steps = workflow.nodes.filter(
    (n): n is StepNodeData => n.kind === "step",
  );
  const accentStyle = {
    "--js-accent": MODULE_VAR[workflow.accent],
  } as CSSProperties;

  return (
    <div className={cn("js", className)} style={accentStyle}>
      <div className="js-head">
        <span className="js-kicker mono">What the process looks like on paper</span>
        <p className="js-intro">
          The {steps.length} named steps, initiation to close.
        </p>
      </div>

      <ol className="js-steps">
        {steps.map((s) => (
          <li className="js-step" key={s.id}>
            <span className="js-step-num mono">
              {String(s.index).padStart(2, "0")}
            </span>
            <div className="js-step-body">
              <div className="js-step-top">
                <h3 className="js-step-name">{s.name}</h3>
                <span className="js-step-role mono">{s.role}</span>
              </div>
              <p className="js-step-what">{s.whatHappens}</p>
              {s.userDecision ? (
                <p className="js-step-decide">
                  <span className="js-step-decide-lab mono">Decides</span>
                  <span>{s.userDecision}</span>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="js-into" aria-hidden>
        <span className="js-into-cap mono">…but where does the time actually go?</span>
      </div>
    </div>
  );
}
