/* ============================================================================
 * Cost of inaction, on the charcoal (23 Sep 2026). One takeaway, with its
 * evidence: the yearly coordination tax per device company (left cell), and
 * what it is made of, the three coordination events itemised on one bill
 * on the warm wash (right cell), the same surface the urgent board above
 * uses. Tax stays rust. Styles: md-rails.css (.md-tax).
 * ========================================================================== */

import { MD_WORKFLOW_VARIANTS, MD_ECONOMICS } from "@/lib/platform-data/medical-devices-canonical";

const usd = (n: number) => "$" + n.toLocaleString("en-US");
const usdM = (n: number) =>
  "$" + (n / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 }) + "M";

export function CostLedger() {
  const low = usdM(MD_ECONOMICS.annualTaxLow / MD_ECONOMICS.companies);
  const high = usdM(MD_ECONOMICS.annualTaxHigh / MD_ECONOMICS.companies);

  return (
    <div className="md-tax">
      <div className="md-tax__stat">
        <span className="md-tax__lab">Coordination tax, per device company per year</span>
        <p className="md-tax__val">
          <b>{low}</b>
          <span>to</span>
          <b>{high}</b>
        </p>
        <p className="md-tax__meta">
          Paid in chasing, handoffs and rework, one coordination event at a time. No budget line
          carries it, so nobody owns it.
        </p>
      </div>

      <div className="md-tax__wash">
        <div className="md-tax__bill">
          <header>
            <span>Per coordination event</span>
            <span>Cost per instance</span>
          </header>
          <ul>
            {MD_WORKFLOW_VARIANTS.map((v) => (
              <li key={v.key}>
                <span className="md-tax__ev">
                  <b>{v.name}</b>
                  <small>
                    {v.decisions} decisions · {v.cycle} at risk
                  </small>
                </span>
                <span className="md-tax__amt">
                  {usd(v.costLow)}&ndash;{usd(v.costHigh)}
                </span>
              </li>
            ))}
          </ul>
          <footer>Every instance, every team. None of it on a budget line.</footer>
        </div>
      </div>
    </div>
  );
}
