/* ------------------------------------------------------------
 * CompressionMoneyShot — §02, the CEO dollar read.
 *
 * 2026-06-01 (second call): the compression VISUAL now lives on the §01
 * canvas — the nodes convert to slabs, the coordination tax fills the
 * gaps, and the whole value stream compresses to the Unifize bar there
 * ("section two can come on section one"). So §02 is now just the
 * punchline in words + the cost cascade: what that compression is worth.
 *
 * Shared arithmetic with §01 and the drill: ~7,410 min (123h) → ~2,600
 * min (43h), −65%, almost all of it the NVA between the steps.
 * Static; safe to render in a server component.
 * ------------------------------------------------------------ */

import type { Workflow } from "@/lib/platform-data/workflows";

const fmtUsd = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;

const mono = "var(--u-mono, ui-monospace, monospace)";

const isNva = (c: string) => c === "WAIT" || c === "NVA";

function aggregate(wf: Workflow) {
  let cur = 0,
    uni = 0,
    nva = 0;
  for (const n of wf.nodes) {
    if (n.kind !== "step" || !n.valueStream) continue;
    for (const v of n.valueStream) {
      cur += v.currentMin;
      uni += v.unifizeMin;
      if (isNva(v.classification)) nva += v.currentMin;
    }
  }
  return { cur, uni, nva };
}

export interface CompressionMoneyShotProps {
  workflow: Workflow;
  ratePerHour?: number;
  instancesPerYear?: number;
  annualScaleSavedUsd?: number;
}

export function CompressionMoneyShot({
  workflow,
  ratePerHour = 60,
  instancesPerYear = 100,
  annualScaleSavedUsd = 3_100_000,
}: CompressionMoneyShotProps) {
  const a = aggregate(workflow);
  const curH = Math.floor(a.cur / 60);
  const uniH = Math.floor(a.uni / 60);
  const pct = a.cur ? Math.round((1 - a.uni / a.cur) * 100) : 0;
  const nvaPct = a.cur ? Math.round((a.nva / a.cur) * 100) : 0;
  const curUsd = Math.round((a.cur / 60) * ratePerHour);
  const uniUsd = Math.round((a.uni / 60) * ratePerHour);
  const savedYr = (curUsd - uniUsd) * instancesPerYear;

  return (
    <section className="section alt">
      <div className="section-inner">
        <div style={{ display: "grid", gap: 30 }}>
          {/* headline — the CEO punchline, now that the canvas has shown it */}
          <div style={{ display: "grid", gap: 14, maxWidth: 820 }}>
            <span className="section-eyebrow">02 · What it&apos;s worth</span>
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
              That&apos;s <span style={{ fontStyle: "italic" }}>{curH} hours</span> of work compressed into{" "}
              <span style={{ fontStyle: "italic", color: "var(--u-primary)" }}>{uniH}</span> — a{" "}
              <span style={{ color: "var(--u-primary)" }}>{pct}%</span> cut.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--n-600)", maxWidth: "56ch", margin: 0 }}>
              The journey didn&apos;t change. The work around it did. Nearly all of the{" "}
              <b style={{ color: "var(--n-900)" }}>{nvaPct}%</b> non-value-addition you just watched fall away was the
              coordination tax — the wait and reconciliation piled up between the steps, that nobody ever signs off on.
            </p>
          </div>

          {/* cost cascade — the CEO read, scaling out from one cycle */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 26px",
              alignItems: "baseline",
              fontFamily: mono,
              fontSize: 13,
              color: "var(--n-500)",
              paddingTop: 20,
              borderTop: "1px solid var(--n-150)",
            }}
          >
            <span>
              <b
                style={{
                  fontFamily: "var(--u-display)",
                  fontSize: 18,
                  color: "var(--n-500)",
                  textDecoration: "line-through",
                }}
              >
                {fmtUsd(curUsd)}
              </b>{" "}
              <span aria-hidden>→</span>{" "}
              <b style={{ fontFamily: "var(--u-display)", fontSize: 18, color: "var(--s-ok)" }}>{fmtUsd(uniUsd)}</b> / cycle
            </span>
            <span>
              ×{instancesPerYear} cycles a year ·{" "}
              <b style={{ fontFamily: "var(--u-display)", fontSize: 15, color: "var(--n-900)" }}>{fmtUsd(savedYr)}</b> saved on
              this workflow
            </span>
            <span>
              up to{" "}
              <b style={{ fontFamily: "var(--u-display)", fontSize: 15, color: "var(--n-900)" }}>
                {fmtUsd(annualScaleSavedUsd)}
              </b>{" "}
              a year across the QMS at scale
            </span>
          </div>

          {/* bridge into the drill */}
          <p style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.04em", color: "var(--n-500)", margin: 0 }}>
            See how it works, in one step. <span aria-hidden>↓</span>
          </p>
        </div>
      </div>
    </section>
  );
}
