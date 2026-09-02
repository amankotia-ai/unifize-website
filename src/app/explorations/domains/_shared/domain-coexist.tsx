"use client";

/* ============================================================================
 * domain-coexist.tsx — section 08's three-path coexistence answer, from the
 * Website Page Spec (Quality reference slice, Section 5): "Unifize works with
 * the QMS you already have. Or it can be your QMS."
 *
 * The panel's top finding was the page answering replace-vs-coexist BOTH
 * ways (05 sells modules, 08 swears off replacement). The spec's answer is
 * that both are true per situation, so the selector asks the buyer which
 * situation is theirs and the copy + diagram commit to that one path. The
 * selector is the ModuleIndex/LeakRegister chip-bar pattern; the diagram is
 * the dk-flowmap grammar with box variants (kept system of record / lane
 * Unifize provides / the gap it fills) and a labeled write-back line, so the
 * picture finally draws what the aria-label claims.
 * ========================================================================== */

import { useState } from "react";
import type { CoexistPath } from "./types";

export function DomainCoexist({
  selectorLabel,
  paths,
}: {
  selectorLabel: string;
  paths: CoexistPath[];
}) {
  const [active, setActive] = useState(paths[0].id);
  const path = paths.find((p) => p.id === active) ?? paths[0];

  return (
    <div className="dk-cx">
      <div className="dk-cx__bar" role="group" aria-label={selectorLabel}>
        <span className="dk-cx__bar-lab">{selectorLabel}</span>
        <div className="dk-cx__chips">
          {paths.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === active}
              className={"dk-cx__chip" + (p.id === active ? " is-active" : "")}
              onClick={() => setActive(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dk-cx__path" key={path.id}>
        <h3 className="dk-cx__h">{path.heading}</h3>
        <p className="itm-body dk-cx__body">{path.body}</p>
        {path.vendors?.length ? (
          <p className="dk-cx__vendors">
            {path.vendors.join(" · ")} <span>— they all stay.</span>
          </p>
        ) : null}

        <div
          className="dk-flowmap"
          role="img"
          aria-label={`Diagram: Unifize as the ${path.diagram.role.toLowerCase()} over ${path.diagram.boxes
            .map((b) => b.name + (b.kind === "sor" ? " (kept as a system of record)" : " (runs in Unifize)"))
            .join(", ")}. Approved outcomes carry a 21 CFR Part 11 e-signature.`}
          style={{ "--dk-sors": path.diagram.boxes.length } as React.CSSProperties}
        >
          <div className="dk-flowmap__layer" aria-hidden="true">
            <div className="dk-flowmap__brand">
              <b>Unifize</b>
              <span>{path.diagram.role}</span>
            </div>
            <div className="dk-flowmap__chips">
              {path.diagram.chips.map((c) => <i key={c}>{c}</i>)}
            </div>
          </div>
          {/* the write-back line the old diagram claimed but never drew */}
          <div className="dk-flowmap__flow" aria-hidden="true">
            <span className="dk-flowmap__flow-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v15M5.5 13l6.5 6.5L18.5 13" /></svg>
            </span>
            <span className="dk-flowmap__flow-lab">Approved outcome · Part 11 e-signature</span>
          </div>
          <div className="dk-flowmap__wires" aria-hidden="true">
            {path.diagram.boxes.map((b) => <i key={b.name} />)}
          </div>
          <div className="dk-flowmap__sors" aria-hidden="true">
            {path.diagram.boxes.map((b) => (
              <div key={b.name} className={"dk-flowmap__sor" + (b.kind !== "sor" ? " is-unifize" : "")}>
                <b>{b.name}</b>
                <span>{b.note}</span>
              </div>
            ))}
          </div>
          <p className="dk-flowmap__cap">{path.diagram.caption}</p>
        </div>
      </div>
    </div>
  );
}
