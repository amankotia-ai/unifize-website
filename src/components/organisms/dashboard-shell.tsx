import * as React from "react";
import "./dashboard-shell.css";

/* ============================================================
   DashboardShell — §05 org-level product visual (2026-06-02 call).
   Ben: "based on all of your records you have this much wastage, and this
   is where the wastage is, and this is how you can improve your process."
   Every panel is an AGGREGATE of a signal the §04 AI read gathers per
   record — the VA/wait tag, the timestamps (idle gaps), the ownership
   changes (handoffs) — rolled up across all 38 records. Real product
   titles; the dollar value is reserved for the money shot.
   ============================================================ */

const KPIS: {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  deltaUp?: boolean;
  spark: string;
  sparkTone: "primary" | "ok" | "neutral";
}[] = [
  { label: "Value-add ratio", value: "47", unit: "%", delta: "↑ 9 pts vs Q1", deltaUp: true, spark: "0,18 10,17 20,15 30,14 40,10 50,8 60,7 70,5", sparkTone: "primary" },
  { label: "Non-value-add time", value: "412", unit: "h", delta: "↓ 84 h vs Q1", deltaUp: true, spark: "0,6 10,8 20,9 30,12 40,13 50,16 60,17 70,19", sparkTone: "ok" },
  { label: "Records analyzed", value: "38", delta: "↑ 6 this quarter", deltaUp: true, spark: "0,20 10,19 20,17 30,13 40,12 50,10 60,8 70,6", sparkTone: "neutral" },
  { label: "Recoverable", value: "290", unit: "h", delta: "≈ 70% of wait", deltaUp: true, spark: "0,16 10,14 20,13 30,10 40,11 50,8 60,9 70,5", sparkTone: "primary" },
];

/* where the wastage is — value-add vs wait per process, worst first */
const PROCESSES: { label: string; va: number; nva: number; top?: boolean }[] = [
  { label: "Supplier SCAR", va: 34, nva: 66, top: true },
  { label: "Nonconformance", va: 41, nva: 59 },
  { label: "CAPA", va: 58, nva: 42 },
  { label: "Change control", va: 80, nva: 20 },
];

/* #1 — non-value-add by step (timestamps, located at the journey step) */
const STEPS: { label: string; va: number; nva: number; top?: boolean }[] = [
  { label: "Intake", va: 78, nva: 22 },
  { label: "Triage & review", va: 46, nva: 54 },
  { label: "Investigation", va: 61, nva: 39 },
  { label: "Approval / sign-off", va: 28, nva: 72, top: true },
  { label: "Closure", va: 70, nva: 30 },
];

/* #2 — wait by handoff (ownership changes — Ben's named signal) */
const HANDOFFS: { from: string; to: string; idle: number; records: number; top?: boolean }[] = [
  { from: "Supplier", to: "Quality", idle: 6.1, records: 11, top: true },
  { from: "Quality", to: "VP sign-off", idle: 4.2, records: 18 },
  { from: "Engineer", to: "Quality", idle: 3.4, records: 22 },
  { from: "Quality", to: "Production", idle: 1.8, records: 14 },
];
const HANDOFF_MAX = 6.1;

/* #3 — non-value-add by cause (the AI's per-wait reason, categorized) */
const CAUSES: { label: string; pct: number }[] = [
  { label: "Approver wait", pct: 41 },
  { label: "Supplier response", pct: 28 },
  { label: "Awaiting review", pct: 19 },
  { label: "Rework / clarification", pct: 12 },
];

/* #5 — recoverable by source (the removable wait, in hours) */
const RECOVER: { label: string; h: number }[] = [
  { label: "Approval sign-off", h: 118 },
  { label: "Supplier follow-up", h: 96 },
  { label: "Review queue", h: 44 },
  { label: "Rework", h: 32 },
];
const RECOVER_MAX = 118;

/* records sorted by non-value-add — CAPA-2148 (the §04 read) lands at 80/20 */
const RECORDS: {
  id: string;
  title: string;
  stage: string;
  stageKind: "info" | "warn" | "ok" | "err";
  owner: string;
  initials: string;
  va: number;
  nva: number;
  ageMark: string;
}[] = [
  { id: "SCAR-118", title: "Supplier corrective action · SC-104", stage: "Overdue", stageKind: "err", owner: "Leia Organa", initials: "LO", va: 31, nva: 69, ageMark: "var(--s-err)" },
  { id: "NC-22", title: "Incoming material out-of-tolerance", stage: "RCA", stageKind: "info", owner: "Rupa Kapoor", initials: "RK", va: 44, nva: 56, ageMark: "var(--u-primary)" },
  { id: "NC-19", title: "Calibration drift · torque tool", stage: "Verify", stageKind: "warn", owner: "Han Solo", initials: "HS", va: 52, nva: 48, ageMark: "var(--s-warn)" },
  { id: "CAPA-2148", title: "Decision trace · assembly defect", stage: "Closed", stageKind: "ok", owner: "Lisa Martin", initials: "LM", va: 80, nva: 20, ageMark: "var(--s-ok)" },
];

function SplitBars({ rows }: { rows: { label: string; va: number; nva: number; top?: boolean }[] }) {
  return (
    <div className="dshell-bars">
      {rows.map((r) => (
        <div className="dshell-bar-row" key={r.label}>
          <div className="dshell-bar-row-head">
            <span className="dshell-bar-row-label">
              {r.label}
              {r.top && <span className="dshell-flag">Biggest recoverable</span>}
            </span>
            <span className="dshell-bar-row-value is-wait">{r.nva}% wait</span>
          </div>
          <div className="dshell-split">
            <span className="dshell-split-va" style={{ width: r.va + "%" }} />
            <span className="dshell-split-nva" style={{ width: r.nva + "%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardShell({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="dshell" style={style} role="img" aria-label="Unifize dashboard, value-add vs non-value-add across records">
      <div className="dshell-top">
        <span className="dshell-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="dshell-frame-title">Value stream · Q2 2026 · Class II OEM</span>
        <span className="dshell-live">
          <span className="dshell-live-dot" />
          AI · live
        </span>
      </div>

      <div className="dshell-body">
        {/* Nav rail */}
        <aside className="dshell-nav">
          <span className="dshell-nav-logo">U</span>
          <span className="dshell-nav-item" title="Home">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 8L9 3.5 15 8v6.5a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="dshell-nav-item" title="Conversations">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 5a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H7l-4 3V5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="dshell-nav-item" title="Documents">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M5 2.5h5.5L14 6v8.5a1 1 0 01-1 1H5a1 1 0 01-1-1v-11a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M10 2.5V6h4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          <span className="dshell-nav-item is-on" title="Dashboard">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="3" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4" />
              <rect x="9.5" y="3" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4" />
              <rect x="3" y="9.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4" />
              <rect x="9.5" y="9.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          <span className="dshell-nav-item" title="People">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="7" r="2.8" stroke="currentColor" strokeWidth="1.4" />
              <path d="M3.5 15c1.2-2.8 3.4-3.9 5.5-3.9s4.3 1.1 5.5 3.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
        </aside>

        <main className="dshell-main">
          <div className="dshell-topbar">
            <div className="dshell-crumbs">
              <span>Class II OEM</span>
              <span className="dshell-crumbs-sep">/</span>
              <span>Quality</span>
              <span className="dshell-crumbs-sep">/</span>
              <span className="dshell-crumbs-current">Value stream</span>
            </div>
            <span className="dshell-search">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span>Search records, processes, owners…</span>
              <span className="dshell-kbd">⌘K</span>
            </span>
          </div>

          <header className="dshell-page-head">
            <div>
              <div className="dshell-eyebrow">
                <span className="dshell-eyebrow-dot" />
                AI analysis · last 18 months
              </div>
              <h3 className="dshell-page-title">Value-add analysis</h3>
              <p className="dshell-page-sub">
                38 records analyzed · 412 h non-value-add this quarter.
              </p>
            </div>
            <div className="dshell-seg">
              <button>90d</button>
              <button>YTD</button>
              <button className="is-on">18m</button>
            </div>
          </header>

          <div className="dshell-content">
            {/* KPIs */}
            <div className="dshell-kpi-grid">
              {KPIS.map((k) => (
                <div className="dshell-kpi" key={k.label}>
                  <div className="dshell-kpi-label">{k.label}</div>
                  <div className="dshell-kpi-value">
                    {k.value}
                    {k.unit && <span className="dshell-kpi-unit">{k.unit}</span>}
                  </div>
                  {k.delta && (
                    <div className={"dshell-kpi-delta " + (k.deltaUp ? "dshell-kpi-delta-up" : "dshell-kpi-delta-down")}>
                      {k.delta}
                    </div>
                  )}
                  <svg className={"dshell-kpi-spark dshell-kpi-spark-" + k.sparkTone} width="58" height="22" viewBox="0 0 70 24" fill="none">
                    <polyline points={k.spark} stroke="currentColor" strokeWidth="1.4" fill="none" />
                  </svg>
                </div>
              ))}
            </div>

            {/* AI recommendation — full width */}
            <div className="dshell-suggest">
              <span className="dshell-suggest-label">Recommended</span>
              <span className="dshell-suggest-text">
                <em>Supplier SCAR</em> is 66% wait, mostly approver sign-off.
                Standardize the step to recover ~180 h/yr.
              </span>
            </div>

            {/* Aggregate panels — each rolls up a signal from the AI read */}
            <div className="dshell-grid2">
              {/* by process */}
              <div className="dshell-card">
                <div className="dshell-card-head">
                  <div>
                    <h4 className="dshell-card-title">Non-value-add by process</h4>
                    <span className="dshell-card-meta">4 processes · 38 records</span>
                  </div>
                  <span className="dshell-badge dshell-badge-info">
                    <span className="dshell-pulse" />
                    AI · high confidence
                  </span>
                </div>
                <div className="dshell-card-body">
                  <SplitBars rows={PROCESSES} />
                </div>
              </div>

              {/* #1 by step */}
              <div className="dshell-card">
                <div className="dshell-card-head">
                  <div>
                    <h4 className="dshell-card-title">Non-value-add by step</h4>
                    <span className="dshell-card-meta">Across the record lifecycle</span>
                  </div>
                </div>
                <div className="dshell-card-body">
                  <SplitBars rows={STEPS} />
                </div>
              </div>

              {/* #2 wait by handoff */}
              <div className="dshell-card">
                <div className="dshell-card-head">
                  <div>
                    <h4 className="dshell-card-title">Wait by handoff</h4>
                    <span className="dshell-card-meta">Avg idle days on ownership change</span>
                  </div>
                </div>
                <div className="dshell-card-body">
                  <div className="dshell-bars">
                    {HANDOFFS.map((h) => (
                      <div className="dshell-bar-row" key={h.from + h.to}>
                        <div className="dshell-bar-row-head">
                          <span className="dshell-bar-row-label">
                            {h.from}
                            <span className="dshell-arrow">→</span>
                            {h.to}
                            {h.top && <span className="dshell-flag">Longest</span>}
                          </span>
                          <span className="dshell-bar-row-value is-wait">
                            {h.idle} d · {h.records} recs
                          </span>
                        </div>
                        <div className="dshell-bar-track">
                          <div className="dshell-bar-fill is-wait" style={{ width: (h.idle / HANDOFF_MAX) * 100 + "%" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* #3 by cause */}
              <div className="dshell-card">
                <div className="dshell-card-head">
                  <div>
                    <h4 className="dshell-card-title">Non-value-add by cause</h4>
                    <span className="dshell-card-meta">Share of total wait</span>
                  </div>
                </div>
                <div className="dshell-card-body">
                  <div className="dshell-bars">
                    {CAUSES.map((c) => (
                      <div className="dshell-bar-row" key={c.label}>
                        <div className="dshell-bar-row-head">
                          <span className="dshell-bar-row-label">{c.label}</span>
                          <span className="dshell-bar-row-value is-wait">{c.pct}%</span>
                        </div>
                        <div className="dshell-bar-track">
                          <div className="dshell-bar-fill is-wait" style={{ width: c.pct + "%" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* #4 cycle time trend */}
              <div className="dshell-card">
                <div className="dshell-card-head">
                  <div>
                    <h4 className="dshell-card-title">Cycle time</h4>
                    <span className="dshell-card-meta">Avg days to close · 6 mo</span>
                  </div>
                </div>
                <div className="dshell-card-body">
                  <svg className="dshell-trend" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <polygon className="dshell-trend-area" points="0,9 20,13.1 40,18 60,23.25 80,28.1 100,33.75 100,40 0,40" />
                    <polyline className="dshell-trend-line" points="0,9 20,13.1 40,18 60,23.25 80,28.1 100,33.75" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                  <div className="dshell-trend-cap">7.6 d avg · <b>↓ 46% since Jan</b></div>
                </div>
              </div>

              {/* #5 recoverable by source */}
              <div className="dshell-card">
                <div className="dshell-card-head">
                  <div>
                    <h4 className="dshell-card-title">Recoverable by source</h4>
                    <span className="dshell-card-meta">Est. hours / quarter</span>
                  </div>
                </div>
                <div className="dshell-card-body">
                  <div className="dshell-bars">
                    {RECOVER.map((r) => (
                      <div className="dshell-bar-row" key={r.label}>
                        <div className="dshell-bar-row-head">
                          <span className="dshell-bar-row-label">{r.label}</span>
                          <span className="dshell-bar-row-value">{r.h} h</span>
                        </div>
                        <div className="dshell-bar-track">
                          <div className="dshell-bar-fill is-primary" style={{ width: (r.h / RECOVER_MAX) * 100 + "%" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dshell-total">
                    <span>Total recoverable</span>
                    <span className="dshell-total-v">290 h / qtr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Records by non-value-add — full width */}
            <div className="dshell-card">
              <div className="dshell-card-head">
                <div>
                  <h4 className="dshell-card-title">Records by non-value-add</h4>
                  <span className="dshell-card-meta">38 records · Q2 2026</span>
                </div>
                <span className="dshell-card-link">View all →</span>
              </div>
              <table className="dshell-tbl">
                <thead>
                  <tr>
                    <th>Record</th>
                    <th>Stage</th>
                    <th>Owner</th>
                    <th>Value-add</th>
                  </tr>
                </thead>
                <tbody>
                  {RECORDS.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <div className="dshell-rec">
                          <span className="dshell-rec-mk" style={{ background: r.ageMark }} />
                          <span className="dshell-rec-title">{r.title}</span>
                          <span className="dshell-rec-id">{r.id}</span>
                        </div>
                      </td>
                      <td>
                        <span className={"dshell-badge dshell-badge-" + r.stageKind}>
                          <span className="dshell-pulse" />
                          {r.stage}
                        </span>
                      </td>
                      <td>
                        <span className="dshell-owner">
                          <span className="dshell-avatar">{r.initials}</span>
                          {r.owner}
                        </span>
                      </td>
                      <td>
                        <div className="dshell-vacell">
                          <span className="dshell-split dshell-split--sm">
                            <span className="dshell-split-va" style={{ width: r.va + "%" }} />
                            <span className="dshell-split-nva" style={{ width: r.nva + "%" }} />
                          </span>
                          <span className="dshell-tbl-mono">{r.va}/{r.nva}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
