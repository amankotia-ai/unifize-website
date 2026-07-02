"use client";

/* ============================================================================
 * Cost section (modern skin) — interactive. A segmented toggle between two
 * views:
 *   "Per coordination event"  -> the quantified per-instance unit costs
 *   "What it compounds into"   -> the qualitative consequence types (no $)
 * The segment scale + stakes anchor stay pinned below both views. Logic / usd /
 * usdM / the &ndash; entity are identical to the champion. Changes are skin +
 * two a11y/anti-slop fixes:
 *   - consequence card titles are <h3> (not <h4>): no skipped heading level.
 *   - the stakes figure sets ONLY the two numbers in mono; the "to" connective
 *     is sans, so mono stays reserved for tabular data, never a word.
 * ========================================================================== */

import { useState } from "react";
import {
  MD_WORKFLOW_VARIANTS,
  MD_CONSEQUENCES,
  MD_ECONOMICS,
} from "@/lib/platform-data/medical-devices-canonical";

const usd = (n: number) => "$" + n.toLocaleString("en-US");
const usdM = (n: number) =>
  "$" + (n / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 }) + "M";

export function CostLedger() {
  const [view, setView] = useState<"events" | "consequences">("events");

  return (
    <div className="itm-cost">
      <div className="itm-seg" role="group" aria-label="Cost view">
        <button
          type="button"
          aria-pressed={view === "events"}
          className={"itm-seg__btn" + (view === "events" ? " is-active" : "")}
          onClick={() => setView("events")}
        >
          Per coordination event
        </button>
        <button
          type="button"
          aria-pressed={view === "consequences"}
          className={"itm-seg__btn" + (view === "consequences" ? " is-active" : "")}
          onClick={() => setView("consequences")}
        >
          What it compounds into
        </button>
      </div>

      {view === "events" ? (
        <div className="itm-ledger" key="events">
          <div className="itm-ledger__head">
            <span>Coordination event</span>
            <span>Owned by</span>
            <span className="itm-num">Per-instance cost</span>
          </div>
          {MD_WORKFLOW_VARIANTS.map((v) => (
            <div key={v.key} className="itm-ledger__row">
              <span className="itm-ledger__ev">{v.name}<em>{v.cycle} at risk, {v.decisions} decisions</em></span>
              <span className="itm-ledger__own">Cross-functional</span>
              <span className="itm-num itm-ledger__amt"><span className="itm-data">{usd(v.costLow)}&ndash;{usd(v.costHigh)}</span></span>
            </div>
          ))}
        </div>
      ) : (
        <div className="itm-conseq" key="consequences">
          {MD_CONSEQUENCES.map((c) => (
            <div key={c.type} className="itm-conseq__card">
              <h3>{c.type}</h3>
              <ul>
                {c.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <span className="itm-conseq__tag">
                <span className="itm-dot" aria-hidden="true" />
                No one owns it
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="itm-stakes">
        <div className="itm-stakes__text">
          <span className="itm-stakes__lab">Estimated coordination tax, per company per year</span>
          <span className="itm-stakes__meta">Modeled across {MD_ECONOMICS.companies} companies and {(MD_ECONOMICS.employees / 1_000_000).toFixed(2)}M employees in the segment</span>
        </div>
        <span className="itm-stakes__val">
          <span className="itm-data">{usdM(MD_ECONOMICS.annualTaxLow / MD_ECONOMICS.companies)}</span>
          <span className="itm-stakes__to">to</span>
          <span className="itm-data">{usdM(MD_ECONOMICS.annualTaxHigh / MD_ECONOMICS.companies)}</span>
        </span>
      </div>
    </div>
  );
}
