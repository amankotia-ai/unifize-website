/* ============================================================================
 * Shared building blocks for the Medical Devices pages. Presentational, server
 * components. Finished page chrome only — no provenance/meta on the page.
 * ========================================================================== */
import Link from "next/link";
import { MatrixGrid, type CellState } from "@/components/atoms";
import { MD_TRIGGERS, MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";

const usd = (n: number) => "$" + n.toLocaleString("en-US");

/* --- glyphs (homepage pixel language, 13×17) ------------------------------ */
export const MED_CROSS_GLYPH: CellState[] = (() => {
  const g: CellState[] = Array<CellState>(13 * 17).fill("off");
  for (let r = 3; r <= 13; r++) for (let c = 5; c <= 7; c++) g[r * 13 + c] = "on"; // vertical bar
  for (let r = 7; r <= 9; r++) for (let c = 1; c <= 11; c++) g[r * 13 + c] = "on"; // arms
  return g;
})();

export const QM_CHECK_GLYPH: CellState[] = (() => {
  const g: CellState[] = Array<CellState>(13 * 17).fill("off");
  const stroke: [number, number][] = [
    [2, 8], [3, 9], [4, 10], [5, 11], [6, 10], [7, 9], [8, 8], [9, 7], [10, 6], [11, 5],
  ];
  for (const [c, r] of stroke) g[(r + 1) * 13 + c] = "low";
  for (const [c, r] of stroke) g[r * 13 + c] = "on";
  return g;
})();

export function HeroGlyph({ cells }: { cells: CellState[] }) {
  return (
    <div className="ind-hero-visual" aria-hidden="true">
      <MatrixGrid cols={13} rows={17} cells={cells} />
    </div>
  );
}

/* --- Clean product screenshot frame (placeholder support screen) ----------
 * Reads as a real Unifize record; no labels about being a placeholder. */
export function ScreenFrame({
  id = "CAPA-2148",
  title = "Process deviation — lot 4471",
  status = "ok",
  statusLabel = "In review",
  dark = false,
}: {
  id?: string;
  title?: string;
  status?: "ok" | "warn";
  statusLabel?: string;
  dark?: boolean;
}) {
  return (
    <div className={"screen" + (dark ? " dark" : "")}>
      <div className="screen-bar">
        <span className="screen-dots"><i /><i /><i /></span>
        <span className="screen-name">Unifize — {id}</span>
        <span className="screen-live"><i />live</span>
      </div>
      <div className="screen-body">
        <div className="scr-head">
          <span className="scr-id">{id}</span>
          <span className="scr-title">{title}</span>
          <span className={"scr-chip " + status}>{statusLabel}</span>
        </div>
        <div className="scr-rows">
          <div className="scr-row"><span className="scr-av" /><div className="scr-grow"><div className="scr-line w30" /><div className="scr-line w75" /></div></div>
          <div className="scr-row"><span className="scr-av" /><div className="scr-grow"><div className="scr-line w40" /><div className="scr-line w60" /></div></div>
          <div className="scr-row"><span className="scr-av" /><div className="scr-grow"><div className="scr-line w30" /><div className="scr-line scr-accent w75" /></div></div>
        </div>
      </div>
    </div>
  );
}

/* --- Why-now trigger band (clean, canonical Trigger Events) ---------------- */
export function WhyNow({
  surface = "alt",
  title = "The week a device company starts looking.",
  lede = "These are the moments quality leaders reach for a better way to coordinate. Unifize is built for all of them.",
  count = 8,
}: {
  surface?: "alt" | "white";
  title?: string;
  lede?: string;
  count?: number;
}) {
  return (
    <section className={"section " + surface}>
      <div className="section-inner">
        <div className="section-head stack">
          <span className="section-eyebrow">Why now</span>
          <h2 className="section-title">{title}</h2>
          {lede ? <p className="wf-lede">{lede}</p> : null}
        </div>
        <div className="xpl-trig-grid">
          {MD_TRIGGERS.slice(0, count).map((t) => (
            <div key={t} className="xpl-trig"><span className="dot" /><p>{t}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Trust strip (thin band under hero) ----------------------------------- */
export function TrustStrip() {
  return (
    <section className="section white">
      <div className="section-inner tight">
        <div className="xpl-trust">
          <span className="lab">Trusted by regulated device &amp; life-science teams</span>
          {MD_PROOF.customers.map((c, i) => (
            <span key={c.name} style={{ display: "inline-flex", alignItems: "center", gap: 22 }}>
              {i > 0 ? <span className="sep">·</span> : null}
              <span className="nm">{c.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Proof block: the real customer-attested result + named references ----- */
export function ProofBlock({ surface = "white" }: { surface?: "alt" | "white" }) {
  const s = MD_PROOF.stat;
  return (
    <section className={"section " + surface}>
      <div className="section-inner">
        <div className="section-head stack">
          <span className="section-eyebrow">Proof</span>
          <h2 className="section-title">From a device company in your regulatory class.</h2>
          <p className="wf-lede">Medical-device buyers don&apos;t accept a logo — they want a quantified result from a company like theirs. Here is one.</p>
        </div>
        <div className="xpl-proofblock">
          <div className="xpl-bigstat">
            <div className="val">{s.pct}%</div>
            <p className="ctx">lower {s.metric} — <b>{usd(s.recovered)} recovered</b> in year one, against a signed {usd(s.baseline)} baseline.</p>
            <span className="attr">{s.attribution}</span>
          </div>
          <div className="xpl-cust-list">
            {MD_PROOF.customers.map((c) => (
              <div key={c.name} className="xpl-cust">
                <span className="tag">Medical devices</span>
                <span className="nm">{c.name}</span>
                <p className="ds">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Real site footer ----------------------------------------------------- */
export function SiteFooterX() {
  return (
    <footer className="site-footer surface dark">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <strong>Unifize</strong>
          <span>People. Process. AI. Outcomes.</span>
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="lab">Industries</span>
            <Link href="/industries/medical-devices">Medical devices</Link>
            <Link href="/industries/medical-devices">Pharmaceuticals</Link>
            <Link href="/industries/medical-devices">Aerospace</Link>
          </div>
          <div>
            <span className="lab">Platform</span>
            <Link href="/industries/medical-devices/change-control">Change control</Link>
            <Link href="/industries/medical-devices/quality-manager">CAPA</Link>
            <Link href="/platform">The platform</Link>
          </div>
        </div>
      </div>
      <div className="site-footer-rule" />
      <div className="site-footer-base"><span>© Unifize 2026</span></div>
    </footer>
  );
}
