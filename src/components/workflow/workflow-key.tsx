/* ------------------------------------------------------------
 * WorkflowKey — one shared key for the whole process language.
 *
 * Rendered once above the journeys so every mark is decodable:
 * node types, edge types, delivery surfaces (Mediums), Goal Zero
 * status, and the coordination-tax primitives. Keeping a single
 * key (rather than repeating per canvas) is the IA win — it frames
 * the three journeys as one language.
 * ------------------------------------------------------------ */

import type { Medium, CTPrimitive, GoalZero, VSClassification } from "@/lib/platform-data/workflows";
import { MEDIUM_VAR, MEDIUM_LABEL, CT_VAR, CT_LABEL, GOALZERO_VAR, VSCLASS_VAR, VSCLASS_LABEL } from "./theme";

const MEDIUMS: Medium[] = ["web", "mobile", "notification", "email", "voice"];
const GOALZEROS: GoalZero[] = ["Pass", "Pending", "Fail", "Phase 0 only"];
const CTS: CTPrimitive[] = ["RC", "SC", "DR", "TR", "ER", "MT"];
const VSCLASSES: VSClassification[] = ["VA-irreducible", "VA-reducible", "NVA", "WAIT"];

export function WorkflowKey() {
  return (
    <div className="wf-key">
      <div className="wf-key-group">
        <span className="wf-key-h mono">Marks</span>
        <div className="wf-key-items">
          <span className="wf-key-item"><span className="wf-key-node" />Step</span>
          <span className="wf-key-item"><span className="wf-key-dia" />Decision (fork)</span>
          <span className="wf-key-item"><span className="wf-key-term" />Start / close</span>
          <span className="wf-key-item"><span className="wf-key-ho" />Hands off to module</span>
        </div>
      </div>

      <div className="wf-key-group">
        <span className="wf-key-h mono">Lines</span>
        <div className="wf-key-items">
          <span className="wf-key-item"><i className="wf-key-line" />Flow</span>
          <span className="wf-key-item"><i className="wf-key-line wf-key-line--rework" />Rework loop</span>
          <span className="wf-key-item"><i className="wf-key-line wf-key-line--handoff" />Handoff</span>
        </div>
      </div>

      <div className="wf-key-group">
        <span className="wf-key-h mono">Surfaces</span>
        <div className="wf-key-items">
          {MEDIUMS.map((m) => (
            <span key={m} className="wf-key-item">
              <span className="wf-key-dot" style={{ background: MEDIUM_VAR[m] }} />
              {MEDIUM_LABEL[m]}
            </span>
          ))}
        </div>
      </div>

      <div className="wf-key-group">
        <span className="wf-key-h mono">Goal Zero</span>
        <div className="wf-key-items">
          {GOALZEROS.map((g) => (
            <span key={g} className="wf-key-item">
              <span className="wf-key-dot" style={{ background: GOALZERO_VAR[g] }} />
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="wf-key-group">
        <span className="wf-key-h mono">Coordination tax</span>
        <div className="wf-key-items">
          {CTS.map((c) => (
            <span key={c} className="wf-key-item">
              <b className="wf-key-ct mono" style={{ color: CT_VAR[c], borderColor: CT_VAR[c] }}>{c}</b>
              {CT_LABEL[c]}
            </span>
          ))}
        </div>
      </div>

      <div className="wf-key-group">
        <span className="wf-key-h mono">Work layer</span>
        <div className="wf-key-items">
          {VSCLASSES.map((v) => (
            <span key={v} className="wf-key-item">
              <span className="wf-key-dot" style={{ background: VSCLASS_VAR[v], borderRadius: 2 }} />
              {VSCLASS_LABEL[v]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
