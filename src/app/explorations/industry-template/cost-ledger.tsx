"use client";

/* ============================================================================
 * Cost section — interactive. A segmented toggle between two views:
 *   "Per coordination event"  -> the quantified per-instance unit costs
 *   "What it compounds into"   -> the qualitative consequence types (no $)
 * The segment scale + fear anchor stay pinned below both views.
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
    <div className="it-cost">
      <div className="it-seg" role="group" aria-label="Cost view">
        <button
          type="button"
          aria-pressed={view === "events"}
          className={"it-seg-btn" + (view === "events" ? " is-active" : "")}
          onClick={() => setView("events")}
        >
          Per coordination event
        </button>
        <button
          type="button"
          aria-pressed={view === "consequences"}
          className={"it-seg-btn" + (view === "consequences" ? " is-active" : "")}
          onClick={() => setView("consequences")}
        >
          What it compounds into
        </button>
      </div>

      {view === "events" ? (
        <div className="it-ledger" key="events">
          <div className="it-ledger-head">
            <span>Coordination event</span>
            <span>Owned by</span>
            <span className="it-num">Per-instance cost</span>
          </div>
          {MD_WORKFLOW_VARIANTS.map((v) => (
            <div key={v.key} className="it-ledger-row">
              <span className="it-ledger-ev">{v.name}<em>{v.cycle} at risk, {v.decisions} decisions</em></span>
              <span className="it-ledger-own">Cross-functional</span>
              <span className="it-num it-ledger-amt">{usd(v.costLow)}&ndash;{usd(v.costHigh)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="it-conseq" key="consequences">
          {MD_CONSEQUENCES.map((c) => (
            <div key={c.type} className="it-conseq-card">
              <h4>{c.type}</h4>
              <ul>
                {c.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <span className="it-conseq-tag">No one owns it</span>
            </div>
          ))}
        </div>
      )}

      <div className="it-stakes">
        <div className="it-stakes-scale">
          <span className="it-stakes-lab">Estimated coordination tax, per company per year</span>
          <span className="it-stakes-val">{usdM(MD_ECONOMICS.annualTaxLow / MD_ECONOMICS.companies)}<small> to {usdM(MD_ECONOMICS.annualTaxHigh / MD_ECONOMICS.companies)}</small></span>
          <span className="it-stakes-meta">Modeled across {MD_ECONOMICS.companies} companies and {(MD_ECONOMICS.employees / 1_000_000).toFixed(2)}M employees in the segment</span>
        </div>
      </div>
    </div>
  );
}
