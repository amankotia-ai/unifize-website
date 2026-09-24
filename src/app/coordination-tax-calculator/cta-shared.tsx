"use client";

/* ------------------------------------------------------------
 * Shared pieces for the Coordination Tax Assessment pair:
 *   /coordination-tax-calculator          - the cold read from public data
 *   /coordination-tax-calculator/report   - intake, then the full report
 *
 * Content and logic ported from Ben's Aug 2026 prototypes
 * (Coordination Tax Assessment + full report HTMLs). Both pages run on
 * the rails grammar (cta-rails.css); these are the data components
 * they share.
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

/* The modelled theme mix, largest first: one stacked rust bar per theme
   with its domains as segments, the domains listed underneath. Shared
   by the assessment (where it concentrates) and the report (lens 1). */
export const THEME_ROWS = THEMES.map(([name, doms]) => ({
  name,
  total: doms.reduce((a, [, v]) => a + v, 0),
  doms: [...doms].sort((a, b) => b[1] - a[1]),
})).sort((a, b) => b.total - a.total);
const THEME_MAX = THEME_ROWS[0].total;
const THEME_ALL = THEME_ROWS.reduce((a, t) => a + t.total, 0);
export const TOP_TWO = Math.round(((THEME_ROWS[0].total + THEME_ROWS[1].total) / THEME_ALL) * 100);

export function ThemeStack({ withMoney = false }: { withMoney?: boolean }) {
  return (
    <ol className="cx-themes">
      {THEME_ROWS.map((t) => (
        <li key={t.name} className="cx-theme">
          <div className="cx-theme__head">
            <span className="cx-theme__name">{t.name}</span>
            <span className="cx-theme__val">
              {t.total}%{withMoney ? ` · ${money((MID * t.total) / 100)}` : ""}
            </span>
          </div>
          <span className="cx-theme__bar" aria-hidden="true">
            {t.doms.map(([d, v], j) => (
              <span
                key={d}
                className={`is-${Math.min(j, 2)}`}
                style={{ width: `${(v / THEME_MAX) * 100}%` }}
              />
            ))}
          </span>
          <ul className="cx-theme__doms">
            {t.doms.map(([d, v], j) => (
              <li key={d}>
                <i className={`is-${Math.min(j, 2)}`} aria-hidden="true" />
                {d} <span>{v}%</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

/* What the full report holds: the assessment's step 4 and the intake. */
export const REPORT_CONTENTS: Array<[string, string]> = [
  ["Where you sit across every industry", "Medical devices against aerospace, pharma, automotive, and the rest."],
  ["How you compare to your peers", "Once your numbers are confirmed, against the median and top quartile."],
  ["Your tax from six angles", "By process, economic layer, waste type, team, site, and theme."],
  ["A deep dive into your domain", "Quality, supplier quality, change control, or your area, broken into stages."],
  ["How we assessed you", "Every signal we used, labelled confirmed, inferred, or assumed."],
  ["How Unifize removes it", "The mechanism for each kind of waste, plus a CFO one-pager."],
];

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
