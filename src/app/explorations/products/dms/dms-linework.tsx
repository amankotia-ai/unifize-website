/* ----------------------------------------------------------------------------
 * dms-linework.tsx - line-work data graphics for the DMS page.
 * Engineering-drawing language: hairlines, dashed stems, square markers,
 * mono annotations. Ink by default; brand blue only on the single key
 * marker per graphic. Server components, inline SVG.
 * -------------------------------------------------------------------------- */

export function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="dms-bigstat">
      <span className="dms-bigstat__v dms-data">{value}</span>
      <span className="dms-bigstat__l">{label}</span>
    </div>
  );
}

/* stepped growth: dashed stems to a hairline baseline, square markers,
 * display numerals with mono period labels. Last point is the key marker. */
export function SteppedGrowth({
  points,
  ariaLabel,
}: {
  points: { label: string; value: number; display: string }[];
  ariaLabel: string;
}) {
  const W = 720;
  const H = 248;
  const PADX = 16;
  const BASE = 200;
  const TOP = 56;
  const max = Math.max(...points.map((p) => p.value));
  const step = (W - PADX * 2) / points.length;

  return (
    <div className="dms-sg">
      <span className="dms-sg__tag" aria-hidden="true">Illustrative</span>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={ariaLabel} className="dms-sg__svg">
        {points.map((p, i) => {
          const x = PADX + step * i + step / 2;
          const y = BASE - (p.value / max) * (BASE - TOP);
          const isKey = i === points.length - 1;
          return (
            <g key={p.label} className={isKey ? "is-key" : undefined}>
              <line className="dms-sg__stem" x1={x} y1={BASE} x2={x} y2={y} />
              <rect className="dms-sg__pt" x={x - 4} y={y - 4} width="8" height="8" />
              <text className="dms-sg__num" x={isKey ? x - 14 : x + 14} y={y - 8} textAnchor={isKey ? "end" : "start"}>
                {p.display}
              </text>
              <text className="dms-sg__lab" x={isKey ? x - 14 : x + 14} y={y + 10} textAnchor={isKey ? "end" : "start"}>
                {p.label}
              </text>
            </g>
          );
        })}
        <line className="dms-sg__base" x1={PADX} y1={BASE} x2={W - PADX} y2={BASE} />
        <line className="dms-sg__ticks" x1={PADX} y1={BASE + 9} x2={W - PADX} y2={BASE + 9} />
      </svg>
    </div>
  );
}
