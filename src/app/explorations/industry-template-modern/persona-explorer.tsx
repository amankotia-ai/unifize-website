"use client";

/* ============================================================================
 * Persona explorer (modern skin) — the PERSONA INGRESS (By your role), as an
 * editorial spread on ink rather than a boxed panel: a display-type role
 * index on hairlines (mono index, role at display scale, stake as mono
 * furniture) drives a detail built around the seat thesis as a large
 * pull-quote, with the seat's titles / cares / worries as three hairline
 * registers beneath it. No cards, no chips, no sub-page links.
 * ========================================================================== */

import { useState } from "react";
import { PERSONAS } from "./industry-data";

const pad = (n: number) => String(n).padStart(2, "0");

/* The canonical persona `tag` values (Primary buyer, Economic buyer, ...) are
 * INTERNAL sales-funnel classifications and must not surface on the site. We
 * show a customer-facing "stake" instead. Source data is untouched. */
const ROLE_STAKE: Record<string, string> = {
  quality: "Release confidence",
  operations: "Decision velocity",
  regulatory: "The regulatory clock",
  "compliance-validation": "Validated state",
  engineering: "Change velocity",
};
const stakeOf = (key: string, fallback: string) => ROLE_STAKE[key] ?? fallback;

/* Value-first: what Unifize does for each role. Drafted from the canonical
 * thesis (the decision trace, 21 CFR Part 11 e-signatures, "reconstructable at
 * audit") — benefit statements, no invented metrics. Pending founder sign-off. */
const ROLE_VALUE: Record<string, string> = {
  quality: "Every release decision stays reconstructable, so the trace is already there when the investigator walks in, not rebuilt under pressure.",
  operations: "Cross-functional decisions move on one accountable thread, so output stops being held hostage by email, meetings, and spreadsheets.",
  regulatory: "The submission and label trail stays current and traceable, so statutory clocks are met without a last-minute scramble.",
  "compliance-validation": "Approvals are captured as 21 CFR Part 11 e-signatures and the audit trail is the record itself, so it clears validation and stays audit-ready by default.",
  engineering: "Changes move fast with their rationale sealed to the record, so the reasoning survives the next revision and cut-ins stay disciplined.",
};

const split = (s: string) => s.split(" · ").filter(Boolean);

export function PersonaExplorer() {
  const [key, setKey] = useState(PERSONAS[0].key);
  const p = PERSONAS.find((x) => x.key === key) ?? PERSONAS[0];

  return (
    <div className="itm-pex">
      <div className="itm-pex__rail" role="tablist" aria-label="Choose a role" aria-orientation="vertical">
        {PERSONAS.map((x, i) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            aria-selected={x.key === key}
            className={"itm-pex__role" + (x.key === key ? " is-active" : "")}
            onClick={() => setKey(x.key)}
          >
            <span className="itm-pex__role-idx itm-data" aria-hidden="true">{pad(i + 1)}</span>
            <span className="itm-pex__role-body">
              <span className="itm-pex__role-name">{x.name}</span>
              <span className="itm-pex__role-tag">{stakeOf(x.key, x.tag)}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="itm-pex__detail" role="tabpanel" key={p.key}>
        <div className="itm-pex__seat">
          <span className="itm-pex__seat-lab">With Unifize</span>
          <p className="itm-pex__owns">{ROLE_VALUE[p.key] ?? p.owns}</p>
        </div>

        <div className="itm-pex__facts">
          <div className="itm-pex__fact">
            <span className="itm-pex__fact-lab">The seat</span>
            <ul className="itm-pex__list">
              {p.titles.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="itm-pex__fact">
            <span className="itm-pex__fact-lab">Cares about</span>
            <ul className="itm-pex__list">
              {split(p.cares).map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div className="itm-pex__fact">
            <span className="itm-pex__fact-lab">Worries about</span>
            <ul className="itm-pex__list itm-pex__list--worry">
              {split(p.worries).map((w) => <li key={w}>{w}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
