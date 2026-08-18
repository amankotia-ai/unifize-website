"use client";

/* ------------------------------------------------------------
 * Shared pieces for the Coordination Tax Assessment pair:
 *   /coordination-tax-calculator          - the cold read from public data
 *   /coordination-tax-calculator/report   - intake, then the full report
 *
 * Content and logic ported from Ben's Aug 2026 prototypes
 * (Coordination Tax Assessment + full report HTMLs). Both pages run
 * inside the DMS page shell (DmsHeader / dms-section / SiteFooter);
 * these are the assessment-specific data components.
 * ------------------------------------------------------------ */

export type Provenance =
  | "confirmed"
  | "inferred"
  | "assumed"
  | "modelled"
  | "public";

export const MID = 4_200_000;

export const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}K`;

/* Every figure on both pages is labelled by where it came from.
   Quiet dot-label, no chip background. */
export function Prov({ kind }: { kind: Provenance }) {
  return (
    <span className={`ctax-prov is-${kind}`}>
      <i aria-hidden="true" />
      {kind}
    </span>
  );
}

/* The 15 coordination domains grouped into comparable themes; the
   modelled mix for a medical device manufacturer this size. */
export const THEMES: Array<[string, Array<[string, number]>]> = [
  [
    "Quality events & corrective action",
    [
      ["Nonconformance & CAPA", 19],
      ["Post-market & recall", 5],
      ["Compliance", 1],
    ],
  ],
  [
    "Controlled change & records",
    [
      ["Change control", 15],
      ["Document & records control", 9],
      ["Periodic review & data governance", 3],
    ],
  ],
  [
    "Supplier & supply chain",
    [
      ["Supplier quality", 13],
      ["Supply chain & planning", 4],
      ["Procurement & sourcing", 2],
    ],
  ],
  [
    "Regulatory & customer",
    [
      ["Regulatory affairs", 8],
      ["Customer management", 3],
    ],
  ],
  [
    "People & operations",
    [
      ["Operations", 6],
      ["Training & competency", 4],
    ],
  ],
  [
    "Product & systems",
    [
      ["New product development", 7],
      ["System & data integration governance", 1],
    ],
  ],
];

/* Theme bars: theme totals compared to each other, domains nested
   underneath as members, not rivals. */
export function ThemeBars({ withMoney = false }: { withMoney?: boolean }) {
  const sums = THEMES.map(([, doms]) => doms.reduce((a, [, v]) => a + v, 0));
  const max = Math.max(...sums);
  const order = THEMES.map((_, i) => i).sort((a, b) => sums[b] - sums[a]);
  return (
    <div className="ctax-bars">
      {order.map((i) => {
        const [name, doms] = THEMES[i];
        const total = sums[i];
        return (
          <div key={name} className="ctax-theme">
            <div className="ctax-br ctax-br--head">
              <span>{name}</span>
              <span className="ctax-br__rail">
                <span
                  className="ctax-br__bar"
                  style={{ width: `${Math.round((total / max) * 100)}%` }}
                />
              </span>
              <span className="ctax-br__val ctax-mono">
                {total}%{withMoney ? ` · ${money((MID * total) / 100)}` : ""}
              </span>
            </div>
            {[...doms]
              .sort((a, b) => b[1] - a[1])
              .map(([d, v]) => (
                <div key={d} className="ctax-br ctax-br--sub">
                  <span>{d}</span>
                  <span className="ctax-br__rail">
                    <span
                      className="ctax-br__bar"
                      style={{ width: `${Math.round((v / max) * 100)}%` }}
                    />
                  </span>
                  <span className="ctax-br__val ctax-mono">{v}%</span>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}

export type BarRow = {
  label: string;
  value: number;
  display: string;
  /** full-strength emphasis (first row / "you") */
  strong?: boolean;
  /** override the fill color (a CSS color or var()) */
  color?: string;
  /** dim the fill (peer rows behind a highlighted one) */
  dim?: boolean;
};

export function Bars({ rows }: { rows: BarRow[] }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div className="ctax-bars">
      {rows.map((r) => (
        <div key={r.label} className="ctax-br">
          <span className={r.strong ? "ctax-br__lab is-strong" : "ctax-br__lab"}>
            {r.label}
          </span>
          <span className="ctax-br__rail">
            <span
              className="ctax-br__bar"
              style={{
                width: `${Math.round((r.value / max) * 100)}%`,
                background: r.color,
                opacity: r.dim ? 0.5 : r.strong ? 1 : 0.8,
              }}
            />
          </span>
          <span className="ctax-br__val ctax-mono">{r.display}</span>
        </div>
      ))}
    </div>
  );
}

/* Benchmark track: the industry band with labelled markers. */
export type TrackMarker = {
  at: number; // percent from left
  label: string;
  tone?: "neutral" | "ink" | "ok";
};

export function BenchTrack({
  band,
  markers,
}: {
  band: [number, number]; // [left%, right%] of the shaded industry band
  markers: TrackMarker[];
}) {
  return (
    <div>
      <div className="ctax-track">
        <span
          className="ctax-track__band"
          style={{ left: `${band[0]}%`, right: `${100 - band[1]}%` }}
        />
        {markers.map((m) => (
          <span
            key={m.label}
            className={`ctax-track__mk is-${m.tone ?? "neutral"}`}
            style={{ left: `${m.at}%` }}
          >
            <small>{m.label}</small>
          </span>
        ))}
      </div>
      <div className="ctax-track__scale ctax-mono">
        <span>8%</span>
        <span>16%</span>
        <span>24%</span>
        <span>32%</span>
      </div>
    </div>
  );
}
