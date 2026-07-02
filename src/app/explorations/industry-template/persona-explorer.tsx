"use client";

/* ============================================================================
 * Persona explorer — the PERSONA INGRESS (By your role). A role selector:
 * tap a role to reveal its detail panel (what they own, cares, worries, and
 * the route to their page). One role at a time keeps it from being a tall
 * stack of five cards, and lets each role carry more depth.
 * ========================================================================== */

import { useState } from "react";
import Link from "next/link";
import { PERSONAS } from "./industry-data";

export function PersonaExplorer() {
  const [key, setKey] = useState(PERSONAS[0].key);
  const p = PERSONAS.find((x) => x.key === key) ?? PERSONAS[0];

  return (
    <div className="it-pex">
      <div className="it-pex-tabs" role="group" aria-label="Choose a role">
        {PERSONAS.map((x) => (
          <button
            key={x.key}
            type="button"
            aria-pressed={x.key === key}
            className={"it-pex-tab" + (x.key === key ? " is-active" : "")}
            onClick={() => setKey(x.key)}
          >
            <span className="it-pex-tab-name">{x.name}</span>
          </button>
        ))}
      </div>

      <div className="it-pex-panel" role="tabpanel" key={p.key}>
        <div className="it-pex-main">
          <h3 className="it-pex-name">{p.name}</h3>
          <p className="it-pex-titles">{p.titles.join(" · ")}</p>
          <div className="it-pex-cw">
            <div>
              <span className="it-pex-lab">Cares about</span>
              <p>{p.cares}</p>
            </div>
            <div>
              <span className="it-pex-lab">Worries about</span>
              <p>{p.worries}</p>
            </div>
          </div>
        </div>

        <aside className="it-pex-own">
          <span className="it-pex-own-lab">
            <span className="it-pex-own-dot" aria-hidden="true" />
            Your seat on the trace
          </span>
          <p className="it-pex-own-body">{p.owns}</p>
          {p.href ? (
            <Link href={p.href} className="it-btn it-btn-sm it-pex-cta">Open the {p.name} page →</Link>
          ) : p.anchor ? (
            <a href={p.anchor} className="it-btn it-btn-ghost it-btn-sm it-pex-cta">See how this is answered ↓</a>
          ) : (
            <button type="button" className="it-btn it-btn-ghost it-btn-sm it-pex-cta">Talk to us about {p.name.toLowerCase()}</button>
          )}
        </aside>
      </div>
    </div>
  );
}
