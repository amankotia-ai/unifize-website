"use client";

/* ============================================================================
 * Persona explorer (modern skin) — the PERSONA INGRESS (By your role).
 * One panel, two-tone: a role RAIL (active role lifts to a white row) drives a
 * rich DETAIL — role icon + name, the "seat on the trace" thesis as a tinted
 * pull-quote, and what they care/worry about as chips. Logic + PERSONAS data
 * match the champion.
 * ========================================================================== */

import { useState } from "react";
import Link from "next/link";
import { PERSONAS } from "./industry-data";

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

/* One solid role glyph per persona — a visual identity for each seat. */
const ROLE_ICON: Record<string, React.ReactNode> = {
  quality: <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.718-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />,
  operations: <path d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" />,
  regulatory: <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />,
  "compliance-validation": <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />,
  engineering: <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />,
};

const split = (s: string) => s.split(" · ").filter(Boolean);

export function PersonaExplorer() {
  const [key, setKey] = useState(PERSONAS[0].key);
  const p = PERSONAS.find((x) => x.key === key) ?? PERSONAS[0];

  return (
    <div className="itm-pex">
      <div className="itm-pex__rail" role="tablist" aria-label="Choose a role" aria-orientation="vertical">
        {PERSONAS.map((x) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            aria-selected={x.key === key}
            className={"itm-pex__role" + (x.key === key ? " is-active" : "")}
            onClick={() => setKey(x.key)}
          >
            <span className="itm-pex__role-name">{x.name}</span>
            <span className={"itm-pex__role-tag" + (x.primary ? " is-primary" : "")}>{stakeOf(x.key, x.tag)}</span>
          </button>
        ))}
      </div>

      <div className="itm-pex__detail" role="tabpanel" key={p.key}>
        <div className="itm-pex__head">
          <span className="itm-pex__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">{ROLE_ICON[p.key]}</svg>
          </span>
          <div className="itm-pex__head-text">
            <h3 className="itm-pex__name">{p.name}</h3>
            <p className="itm-pex__titles">{p.titles.join(" · ")}</p>
          </div>
        </div>

        <div className="itm-pex__seat">
          <span className="itm-pex__seat-lab">With Unifize</span>
          <p className="itm-pex__owns">{ROLE_VALUE[p.key] ?? p.owns}</p>
        </div>

        <div className="itm-pex__cw">
          <div>
            <span className="itm-pex__cw-lab">Cares about</span>
            <div className="itm-pex__chips">
              {split(p.cares).map((c) => <span key={c} className="itm-pex__chip">{c}</span>)}
            </div>
          </div>
          <div>
            <span className="itm-pex__cw-lab">Worries about</span>
            <div className="itm-pex__chips itm-pex__chips--worry">
              {split(p.worries).map((w) => <span key={w} className="itm-pex__chip">{w}</span>)}
            </div>
          </div>
        </div>

        <div className="itm-pex__cta">
          {p.href ? (
            <Link href={p.href} className="itm-btn">Open the {p.name} page →</Link>
          ) : p.anchor ? (
            <a href={p.anchor} className="itm-btn itm-btn-ghost">See how this is answered ↓</a>
          ) : (
            <button type="button" className="itm-btn itm-btn-ghost">Talk to us about {p.name.toLowerCase()}</button>
          )}
        </div>
      </div>
    </div>
  );
}
