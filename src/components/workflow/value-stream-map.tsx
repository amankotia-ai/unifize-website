/* ------------------------------------------------------------
 * ValueStreamMap — the work-side view (the "correct format").
 *
 * A value-stream map of the NC/CAPA process: 8 stages left→right,
 * each step with its Unifize-baseline minutes, WAIT steps marked,
 * a per-stage active-vs-wait ladder, then the Current→Unifize
 * reduction and the seven-layer AI roadmap. Where the journey
 * canvas shows what the persona does, this shows what the work
 * demands — and where the coordination tax (WAIT) still lives.
 *
 * Static; safe to render in a server component.
 * ------------------------------------------------------------ */

import { type CSSProperties } from "react";
import { NC_CAPA_VALUE_STREAM, type ValueStream } from "@/lib/platform-data/value-stream";

const usd = (n: number) => (n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`);

/* Inline style tokens — kept here so the timeline renders independent of globals.css. */
const S: Record<string, CSSProperties> = {
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
    padding: "18px 20px",
    border: "1px solid var(--n-150)",
    borderRadius: 8,
    background: "var(--n-0)",
    boxShadow: "var(--shadow-sm)",
  },
  stageIdx: {
    fontSize: 9,
    fontWeight: 600,
    color: "var(--u-primary)",
    background: "var(--u-primary-tint)",
    borderRadius: 3,
    padding: "1px 5px",
    flex: "none",
  },
  lg: { display: "inline-flex", alignItems: "center", gap: 6 },
  sw: { width: 11, height: 11, borderRadius: 2, display: "inline-block", flex: "none" },
  cmpRow: { display: "flex", alignItems: "center", gap: 12 },
  cmpLab: { fontSize: 10, color: "var(--n-500)", width: 56, flex: "none", textAlign: "right", textTransform: "uppercase", letterSpacing: "0.04em" },
  cmpVal: { fontSize: 10, color: "var(--n-600)", flex: "none", width: 110 },
};

export function ValueStreamMap({ vs = NC_CAPA_VALUE_STREAM }: { vs?: ValueStream }) {
  const reductionPct = Math.round((1 - vs.unifizeMin / vs.currentMin) * 100);
  const waitPct = Math.round((vs.waitMinUnifize / vs.unifizeMin) * 100);
  const aiDefined = vs.aiLayers.reduce((s, l) => s + l.defined, 0);

  // timeline maths — proportional to the published (Unifize-baseline) minutes.
  const stageMin = (st: ValueStream["stages"][number]) => st.steps.reduce((s, x) => s + x.min, 0);
  const shownTotal = vs.stages.reduce((s, st) => s + stageMin(st), 0);

  return (
    <div className="vs">
      <div className="vs-macro">
        <div className="vs-stat">
          <span className="vs-stat-n mono">{vs.currentMin.toLocaleString()}</span>
          <span className="vs-stat-l">min / NCR today</span>
        </div>
        <span className="vs-macro-arrow">→</span>
        <div className="vs-stat">
          <span className="vs-stat-n mono vs-stat-n--good">{vs.unifizeMin.toLocaleString()}</span>
          <span className="vs-stat-l">with Unifize · −{reductionPct}%</span>
        </div>
        <div className="vs-stat">
          <span className="vs-stat-n mono">{usd(vs.unifizeAnnual)}</span>
          <span className="vs-stat-l">/ yr saved @ {vs.ncrPerYear} NCRs</span>
        </div>
      </div>

      {/* Time-proportional timeline: width = minutes, red = wait.
          Styled inline so it renders independent of globals.css. */}
      <div style={S.card}>
        <div style={{ display: "flex", gap: 4 }}>
          {vs.stages.map((st) => (
            <div key={st.index} style={{ flexGrow: stageMin(st), flexBasis: 0, display: "flex", alignItems: "center", gap: 5, minWidth: 0, overflow: "hidden" }}>
              <span className="mono" style={S.stageIdx}>{st.index}</span>
              <span style={{ fontSize: 10, color: "var(--n-500)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{st.name}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 5, height: 44 }}>
          {vs.stages.map((st) => (
            <div key={st.index} style={{ flexGrow: stageMin(st), flexBasis: 0, display: "flex", gap: 2, minWidth: 8 }}>
              {st.steps.map((s) => (
                <span
                  key={s.num}
                  title={`${s.num} ${s.desc} — ${s.min}m${s.wait ? " (wait)" : ""}`}
                  style={{ flexGrow: s.min, flexBasis: 0, minWidth: 2, borderRadius: 2, background: s.wait ? "var(--s-err)" : "var(--u-primary)", opacity: s.wait ? 1 : 0.82 }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--n-400)" }}>
          <span>0</span>
          <span>{shownTotal} min / NCR · published steps at Unifize baseline</span>
        </div>
        <div className="mono" style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 10, color: "var(--n-500)", flexWrap: "wrap", paddingTop: 8, borderTop: "1px solid var(--n-100)" }}>
          <span style={S.lg}><i style={{ ...S.sw, background: "var(--u-primary)" }} />value addition (VA)</span>
          <span style={S.lg}><i style={{ ...S.sw, background: "var(--s-err)" }} />non-value addition (NVA · wait)</span>
          <span style={{ marginLeft: "auto", color: "var(--n-400)", fontStyle: "italic" }}>hover a segment for the step</span>
        </div>
      </div>

      {/* Current vs Unifize, drawn to the same scale. */}
      <div style={{ ...S.card, gap: 10 }}>
        <div style={S.cmpRow}>
          <span className="mono" style={S.cmpLab}>Current</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ width: "100%", height: 22, borderRadius: 3, background: "var(--n-300)" }} />
          </div>
          <span className="mono" style={S.cmpVal}>{vs.currentMin.toLocaleString()}m</span>
        </div>
        <div style={S.cmpRow}>
          <span className="mono" style={S.cmpLab}>Unifize</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ width: `${(vs.unifizeMin / vs.currentMin) * 100}%`, height: 22, borderRadius: 3, background: "var(--u-primary)", minWidth: 40 }} />
          </div>
          <span className="mono" style={S.cmpVal}>{vs.unifizeMin.toLocaleString()}m · −{reductionPct}%</span>
        </div>
        <div className="mono" style={{ fontSize: 9.5, color: "var(--n-500)", paddingLeft: 68 }}>
          Same NC/CAPA process, structurally compressed — before any AI layer.
        </div>
      </div>

      <p className="vs-wait-note">
        Even on Unifize, <b>~{vs.waitMinUnifize} min/NCR ({waitPct}%) is still WAIT</b> — the gap
        between steps the persona experiences as one thread. That idle time is the next frontier:
        Autonomous Coordination, the single biggest AI opportunity at {usd(vs.aiLayers.find((l) => l.code === "ACoord")!.potential[0])}–{usd(vs.aiLayers.find((l) => l.code === "ACoord")!.potential[1])}/yr.
      </p>

      <div className="vs-waterfall">
        <div className="vs-wf-head mono">AI reduction roadmap · per customer / yr</div>
        <div className="vs-layers">
          {vs.aiLayers.map((l) => (
            <div className={`vs-layer${l.status === "Defined" ? " is-defined" : ""}`} key={l.code}>
              <span className="vs-layer-code mono">{l.code}</span>
              <span className="vs-layer-name">{l.name}</span>
              <span className="vs-layer-defined mono">{l.defined > 0 ? `${usd(l.defined)} defined` : "undefined"}</span>
              <span className="vs-layer-pot mono">+{usd(l.potential[0])}–{usd(l.potential[1])} potential</span>
              <span className="vs-layer-cx">{l.complexity}</span>
            </div>
          ))}
        </div>
        <div className="vs-wf-total mono">
          All AI layers · {usd(aiDefined)} defined today · up to {usd(vs.fullPotential[0])}–{usd(vs.fullPotential[1])}/yr combined with Unifize
        </div>
      </div>

      {vs.sample ? (
        <div className="wf-samplenote mono">
          ⚠ Figures are verbatim from the NC/CAPA value-stream roadmap in Notion. Showing the steps
          published there (full inventory is 75); per-step VA/NVA classification isn&apos;t published, so
          only WAIT is marked. Not yet wired to the journey above.
        </div>
      ) : null}
    </div>
  );
}
