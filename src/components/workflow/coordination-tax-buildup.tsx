/* ------------------------------------------------------------
 * CoordinationTaxBuildup — §02, the build-up (2026-06-01).
 *
 * Ben (2026-05-28): "what about the cumulative thing though? The key is
 * aggregating this across the whole, all of those steps." And the money
 * shot only lands after it: "it takes something THIS LONG and reduces it
 * down" — "this long" means nothing until the tax has been stacked up.
 *
 * This is the missing, problem-led beat: the invisible per-conversation
 * cost compounds — conversation → step → cycle → year → whole QMS →
 * scale — until it's millions. Same Change Control data as §01 / §03 /
 * the drill, so the arithmetic is shared. Static, server-safe.
 * ------------------------------------------------------------ */

import type { Workflow } from "@/lib/platform-data/workflows";

const fmtUsd = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;

const mono = "var(--u-mono, ui-monospace, monospace)";

function stepMinutes(wf: Workflow, stepId: string) {
  const s = wf.nodes.find((n) => n.kind === "step" && n.id === stepId);
  if (!s || s.kind !== "step" || !s.valueStream) return 0;
  return s.valueStream.reduce((a, v) => a + v.currentMin, 0);
}
function cycleMinutes(wf: Workflow) {
  let m = 0;
  for (const n of wf.nodes) {
    if (n.kind !== "step" || !n.valueStream) continue;
    for (const v of n.valueStream) m += v.currentMin;
  }
  return m;
}

export interface CoordinationTaxBuildupProps {
  workflow: Workflow;
  heroStepId?: string;
  ratePerHour?: number;
  instancesPerYear?: number;
  annualTodayUsd?: number;
  annualScaleUsd?: number;
}

export function CoordinationTaxBuildup({
  workflow,
  heroStepId = "s3",
  ratePerHour = 60,
  instancesPerYear = 100,
  annualTodayUsd = 2_000_000,
  annualScaleUsd = 6_400_000,
}: CoordinationTaxBuildupProps) {
  const stepMin = stepMinutes(workflow, heroStepId);
  const cycleMin = cycleMinutes(workflow);
  const usd = (min: number) => Math.round((min / 60) * ratePerHour);

  const tiers = [
    { k: "One conversation", note: "a Teams thread to chase a reviewer — never logged", usd: usd(stepMin / 12), mult: "the unit" },
    { k: "One step", note: "the swarm around a cross-functional review", usd: usd(stepMin), mult: "≈ 12 conversations" },
    { k: "One cycle", note: "all eight steps of one change control", usd: usd(cycleMin), mult: "× 8 steps" },
    { k: "A year of this workflow", note: `${instancesPerYear} cycles`, usd: usd(cycleMin) * instancesPerYear, mult: `× ${instancesPerYear} cycles` },
    { k: "The whole QMS, today", note: "every governed process", usd: annualTodayUsd, mult: "× every process" },
    { k: "At commercial scale", note: "as you grow", usd: annualScaleUsd, mult: "× growth" },
  ];
  const maxUsd = Math.max(...tiers.map((t) => t.usd), 1);

  return (
    <section className="section white">
      <div className="section-inner">
        <div style={{ display: "grid", gap: 40 }}>
          {/* framing */}
          <div style={{ display: "grid", gap: 14, maxWidth: 760 }}>
            <span className="section-eyebrow">02 · The coordination tax</span>
            <h2
              style={{
                fontFamily: "var(--u-display)",
                fontSize: "clamp(34px, 4.6vw, 60px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 500,
                color: "var(--n-900)",
                margin: 0,
              }}
            >
              That wait has a price — and nobody ever signs off on it.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--n-600)", maxWidth: "54ch", margin: 0 }}>
              Every conversation between the steps costs something to coordinate, and none of it lands on a line item.
              Multiply it by the steps, the cycles, the year, the whole QMS — and the invisible becomes the biggest
              number you have.
            </p>
          </div>

          {/* the build-up — the per-unit cost compounds into millions */}
          <div style={{ display: "grid", maxWidth: 920 }}>
            {tiers.map((t, i) => {
              const w = Math.max(3, Math.sqrt(t.usd / maxUsd) * 100);
              const last = i === tiers.length - 1;
              return (
                <div
                  key={t.k}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "248px 1fr 150px",
                    alignItems: "center",
                    gap: 22,
                    padding: "16px 0",
                    borderTop: i ? "1px solid var(--n-100)" : "none",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: last ? "var(--s-err)" : "var(--n-800)",
                        fontWeight: last ? 700 : 600,
                      }}
                    >
                      {t.k}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--n-500)", marginTop: 3 }}>{t.note}</div>
                  </div>
                  <div style={{ height: 18, borderRadius: 4, background: "var(--n-100)", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${w}%`,
                        height: "100%",
                        borderRadius: 4,
                        background: "var(--s-err)",
                        opacity: 0.28 + (i / (tiers.length - 1)) * 0.72,
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "var(--u-display)",
                        fontSize: last ? 32 : 23,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        color: last ? "var(--s-err)" : "var(--n-900)",
                        fontFeatureSettings: '"tnum" 1',
                      }}
                    >
                      {fmtUsd(t.usd)}
                    </div>
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: "var(--n-400)", marginTop: 2 }}>{t.mult}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* land it, then hand to the compression */}
          <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.5, color: "var(--n-500)", margin: 0, maxWidth: "60ch" }}>
            <b style={{ fontFamily: "var(--u-display)", fontSize: 16, color: "var(--s-err)" }}>{fmtUsd(annualScaleUsd)} a year</b>{" "}
            of coordination tax — and not one line of it on an invoice. So what if most of it simply went away?{" "}
            <span aria-hidden>↓</span>
          </p>
        </div>
      </div>
    </section>
  );
}
