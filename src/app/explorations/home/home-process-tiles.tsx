/* ----------------------------------------------------------------------------
 * home-process-tiles.tsx - the close section's visual anchor.
 *
 * 2026-09-09: after the glideapps.com "start with an app template" reference
 * (a tapering pyramid of app-icon tiles above the CTA). Here the tiles are
 * the processes people actually bring to Unifize, taken from the Product
 * Flows mirror (src/content/notion/flows.json) and the Solutions roster, and
 * the pyramid tapers to the Unifize mark: every process converges on one
 * governed record, which is what the headline below asks for.
 *
 * Every tile is a door: each links to the solution or product page where
 * that process is worked end to end, so the grid routes as well as decorates.
 * Labels live in aria-label and a hover/focus tooltip; the glyphs alone are
 * not asked to carry the meaning.
 *
 * Tiles keep the site's square-corner rule (4px, not the reference's app
 * radius) and layer depth with an inner hairline rather than a shadow. They
 * stay on brand blue: a tonal scale per row that brightens toward the apex.
 * -------------------------------------------------------------------------- */
import Link from "next/link";
import type { ReactNode } from "react";

type Tile = {
  key: string;
  label: string;
  href: string;
  glyph: ReactNode;
};

const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* Row 1 (11), row 2 (7), row 3 (3), apex (Unifize). Tone per row lives in CSS. */
const ROWS: Tile[][] = [
  [
    {
      key: "nonconformance", label: "Non-conformances", href: "/solution/quality",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M8.2 3h7.6l5.2 5.2v7.6L15.8 21H8.2L3 15.8V8.2L8.2 3Z" /><path d="M12 8v5" /><path d="M12 16.5h.01" strokeWidth={2.6} /></svg>),
    },
    {
      key: "capa", label: "CAPA", href: "/solution/quality",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M19.5 12a7.5 7.5 0 0 1-12.9 5.2" /><path d="M4.5 12a7.5 7.5 0 0 1 12.9-5.2" /><path d="M17 3.5v3.3h-3.3" /><path d="M7 20.5v-3.3h3.3" /><path d="m9.6 12.2 1.7 1.7 3.2-3.4" /></svg>),
    },
    {
      key: "audits", label: "Audits", href: "/solution/compliance",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M8 4.5H6.5A1.5 1.5 0 0 0 5 6v13.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H16" /><path d="M8 3h8v3H8z" /><path d="m8.5 11 1.5 1.5 3-3" /><path d="m8.5 16.5 1.5 1.5 3-3" /><path d="M15 12h1.5M15 17.5h1.5" /></svg>),
    },
    {
      key: "change-control", label: "Change control", href: "/solution/change-control",
      glyph: (<svg viewBox="0 0 24 24" {...S}><circle cx="6.5" cy="5.5" r="2.3" /><circle cx="6.5" cy="18.5" r="2.3" /><circle cx="17.5" cy="8.5" r="2.3" /><path d="M6.5 7.8v8.4" /><path d="M17.5 10.8c0 3.6-3.4 4.4-6.6 5-2.4.4-4 1-4.4 2.2" /></svg>),
    },
    {
      key: "document-control", label: "Document control", href: "/products/dms",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M6 2.5h8L19 7.5v14H6z" /><path d="M14 2.5v5h5" /><path d="M9 12.5h6M9 16h6" /></svg>),
    },
    {
      key: "training", label: "Training", href: "/products/dms",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" /><path d="M6.5 10.8v4.7c0 1.5 2.6 3 5.5 3s5.5-1.5 5.5-3v-4.7" /><path d="M21.5 9v5" /></svg>),
    },
    {
      key: "complaints", label: "Complaints", href: "/solution/post-market-and-recall",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4h-.5A1.5 1.5 0 0 1 4 14.5v-9Z" /><path d="M12 7.5v3.5" /><path d="M12 13.5h.01" strokeWidth={2.6} /></svg>),
    },
    {
      key: "scar", label: "Supplier corrective actions", href: "/solution/supplier-management",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h14a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-11Z" /><path d="m3.5 7 8.5 6 8.5-6" /><path d="M14 15.5h4.5" /><path d="m16.5 13.5 2 2-2 2" /></svg>),
    },
    {
      key: "incoming-inspection", label: "Incoming inspection", href: "/solution/supplier-management",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M3.5 8 12 3.5 20.5 8v3.2" /><path d="M3.5 8v8l8.5 4.5 1.5-.8" /><path d="M12 12.5 3.5 8" /><path d="m12 12.5 8.5-4.5" /><path d="M12 12.5V21" /><circle cx="17.5" cy="16" r="2.8" /><path d="m19.6 18.1 1.9 1.9" /></svg>),
    },
    {
      key: "risk", label: "Risk management", href: "/products/qms",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M12 3.5 21.5 20h-19L12 3.5Z" /><path d="M12 10v4" /><path d="M12 17h.01" strokeWidth={2.6} /></svg>),
    },
    {
      key: "deviations", label: "Deviations", href: "/solution/quality",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M3 12h4.5" /><path d="M16.5 12H21" strokeDasharray="1.5 2.5" /><path d="M7.5 12c2.5 0 3-5 5.5-5s3 5 5.5 5" /><circle cx="13" cy="7" r="1.4" fill="currentColor" stroke="none" /></svg>),
    },
  ],
  [
    {
      key: "periodic-review", label: "Periodic review", href: "/products/dms",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12Z" /><path d="M4 10h16" /><path d="M8 3v4M16 3v4" /><path d="m9.5 15 1.7 1.7 3.5-3.7" /></svg>),
    },
    {
      key: "batch-records", label: "Batch records", href: "/products/mes",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M6 2.5h8L19 7.5V13" /><path d="M6 2.5V21h6" /><path d="M14 2.5v5h5" /><path d="M9 12h5M9 15.5h3" /><circle cx="17" cy="18" r="3.5" /><path d="m15.4 18 1.2 1.2 2-2.2" /></svg>),
    },
    {
      key: "work-orders", label: "Work orders", href: "/products/mes",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M4 5.5h4v4H4zM4 14.5h4v4H4z" /><path d="M11 7.5h9M11 16.5h9" /><path d="m4.9 7.2 1.1 1.1 1.7-1.9" /></svg>),
    },
    {
      key: "fai", label: "First article inspection", href: "/products/mes",
      glyph: (<svg viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="6.5" /><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" /><path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" /></svg>),
    },
    {
      key: "control-plans", label: "Control plans", href: "/products/plm",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M4 4h16v16H4z" /><path d="M4 9.5h16M4 15h16M9.5 4v16M15 4v16" /><path d="M9.5 9.5H15V15H9.5z" fill="currentColor" stroke="none" opacity=".9" /></svg>),
    },
    {
      key: "design-controls", label: "Design controls", href: "/products/plm",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M3.5 5h6v5h-6zM14.5 14h6v5h-6z" /><path d="M9.5 7.5H12v9h2.5" /><path d="m13 14.5 2 2-2 2" /></svg>),
    },
    {
      key: "specifications", label: "Specifications", href: "/products/plm",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M6 2.5h8L19 7.5v14H6z" /><path d="M14 2.5v5h5" /><path d="M9 11h7M9 14h4M9 17h6" /></svg>),
    },
  ],
  [
    {
      key: "recalls", label: "Recalls", href: "/solution/post-market-and-recall",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M8 7h8a5 5 0 0 1 0 10H6" /><path d="m9.5 3.5-4 3.5 4 3.5" /></svg>),
    },
    {
      key: "ehs", label: "Safety incidents", href: "/products/qms",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M5 15V12a7 7 0 0 1 14 0v3" /><path d="M3 15h18v3H3z" /><path d="M12 5v4" /></svg>),
    },
    {
      key: "supplier-qualification", label: "Supplier qualification", href: "/solution/supplier-management",
      glyph: (<svg viewBox="0 0 24 24" {...S}><path d="M3.5 20.5V10l5-3v3l5-3v3l5-3v13.5h-15Z" /><path d="M7 20.5v-4h3v4M14 20.5v-4h3v4" /></svg>),
    },
  ],
];

export function ProcessTiles() {
  let i = 0;
  return (
    <div className="hm-ptiles" role="presentation">
      <ul className="hm-ptiles__rows" aria-label="Processes you can bring to Unifize">
        {ROWS.map((row, r) => (
          <li key={r} className="hm-ptiles__row">
            <ul className="hm-ptiles__list">
              {row.map((t) => {
                const idx = i++;
                return (
                  <li key={t.key} className="hm-ptiles__item" style={{ "--i": idx, "--r": r } as React.CSSProperties}>
                    <Link href={t.href} className="hm-ptiles__tile" aria-label={t.label} data-label={t.label}>
                      <span className="hm-ptiles__glyph" aria-hidden="true">{t.glyph}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
        <li className="hm-ptiles__row hm-ptiles__row--apex">
          <ul className="hm-ptiles__list">
            <li className="hm-ptiles__item hm-ptiles__item--apex" style={{ "--i": 0, "--r": ROWS.length } as React.CSSProperties}>
              <span className="hm-ptiles__tile hm-ptiles__tile--apex" aria-hidden="true">
                <span className="hm-ptiles__glyph">
                  <svg viewBox="0 2.2 21 22" fill="currentColor">
                    <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                    <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
                  </svg>
                </span>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
