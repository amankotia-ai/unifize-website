/* ----------------------------------------------------------------------------
 * dms-linework.tsx - line-work data graphics for the DMS page.
 * Engineering-drawing language: hairlines, dashed stems, square markers,
 * mono annotations. Ink by default; brand blue only on the single key
 * marker per graphic. Server components, inline SVG.
 * -------------------------------------------------------------------------- */

/* line-work pictograms for the capabilities ledger: hairline strokes,
 * square caps, currentColor. */
const GLYPHS: Record<string, React.ReactNode> = {
  versions: (
    <>
      <path d="M3 10.5h10.5V21H3z" />
      <path d="M6.75 6.75h10.5v10.5" />
      <path d="M10.5 3H21v10.5" />
    </>
  ),
  review: (
    <>
      <path d="M20.2 13.5a8.25 8.25 0 1 1-1.9-7.1" />
      <path d="M20.5 2.5V7H16" />
    </>
  ),
  watermark: (
    <>
      <rect x="4.5" y="3" width="15" height="18" />
      <path d="M7.5 18.75 18 8.25M7.5 13.5l6-6M13.5 18.75l4.5-4.5" />
    </>
  ),
  signature: (
    <>
      <path d="M3 16.5c2.2-4.5 4.2-6.3 5.2-4.3s-1.2 5.3 1 5.3 3-6.3 5-4.3 0 5.3 3.3 3.3" />
      <path d="M3 21h18" />
    </>
  ),
  trace: (
    <>
      <circle cx="12" cy="5.5" r="2.5" />
      <circle cx="4.5" cy="18.5" r="2" />
      <circle cx="12" cy="18.5" r="2" />
      <circle cx="19.5" cy="18.5" r="2" />
      <path d="M12 8v4m0 0-6 4.8M12 12v4.5m0-4.5 6 4.8" />
    </>
  ),
  access: (
    <>
      <path d="M2.5 12S6.5 5.8 12 5.8 21.5 12 21.5 12 17.5 18.2 12 18.2 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.3v6c0 4.8 3.2 8 7.5 9.7 4.3-1.7 7.5-4.9 7.5-9.7v-6L12 2.5Z" />
      <path d="m8.6 11.8 2.4 2.4 4.4-4.7" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20.5 20.5-5.4-5.4" />
    </>
  ),
  sync: (
    <>
      <path d="M4.2 9.6a8 8 0 0 1 13.3-3.2l2.3 2.1" />
      <path d="M20 3.4v5h-5" />
      <path d="M19.8 14.4a8 8 0 0 1-13.3 3.2l-2.3-2.1" />
      <path d="M4 20.6v-5h5" />
    </>
  ),
};

export function CapGlyph({ name }: { name: string }) {
  return <Glyph name={name} className="dms-cap__glyph" />;
}

/* generic hairline pictogram - same line-work language, any class/size. */
export function Glyph({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="square"
      aria-hidden="true"
    >
      {GLYPHS[name]}
    </svg>
  );
}

/* solid (filled) counterparts, for contexts that want weight to match the
 * orbit renders - e.g. the problem payoff register. Base shapes fill with
 * currentColor; a mark knocks out white, a hole knocks out the surface. */
const SOLID_GLYPHS: Record<string, React.ReactNode> = {
  shield: (
    <>
      <path d="M12 2.4 4.6 5.1V11c0 4.7 3.1 7.9 7.4 9.6 4.3-1.7 7.4-4.9 7.4-9.6V5.1L12 2.4Z" />
      <path className="dms-glyph-mark" d="m8.7 11.7 2.3 2.3 4.4-4.7" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="7.4" />
      <circle className="dms-glyph-hole" cx="10.5" cy="10.5" r="3.7" />
      <rect x="15" y="15.4" width="7" height="2.8" rx="1.4" transform="rotate(45 15 16.8)" />
    </>
  ),
  sync: (
    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
  ),
};

export function SolidGlyph({ name, className }: { name: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {SOLID_GLYPHS[name]}
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * WithDmsOrbit - one effective revision expressed as a controlled distribution
 * map. The previous orbit was visually expressive but made the governance
 * model harder to scan. This version behaves like an operational record: one
 * source at the top, four explicit downstream surfaces, one verification state. */

const GOVERNED_OUTPUTS = [
  { surface: "Point of use", state: "Verified render" },
  { surface: "Training", state: "Current assignment" },
  { surface: "Audit access", state: "Scoped copy" },
  { surface: "Archive", state: "Prior revisions retained" },
];

export function WithDmsOrbit() {
  return (
    <div
      className="dms-governance-map"
      role="img"
      aria-label="Revision 3.2 is the single effective record. Verified renders flow to point of use, training, audit access, and the archive."
    >
      <div className="dms-governance-map__record">
        <span className="dms-governance-map__version dms-data">v3.2</span>
        <span className="dms-governance-map__record-copy">
          <strong>Effective revision</strong>
          <span>Approved · controlled · current</span>
        </span>
        <span className="dms-governance-map__status">Live</span>
      </div>
      <div className="dms-governance-map__connector" aria-hidden="true" />
      <ul className="dms-governance-map__outputs">
        {GOVERNED_OUTPUTS.map((output) => (
          <li key={output.surface}>
            <span className="dms-governance-map__check" aria-hidden="true">✓</span>
            <span>
              <strong>{output.surface}</strong>
              <span>{output.state}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="dms-governance-map__seal">
        <span>Distribution status</span>
        <strong>4 of 4 verified</strong>
      </div>
    </div>
  );
}

/* severity icon: shape + color both encode the level (never color alone).
 * Critical = red octagon, High = amber triangle, Medium = gray circle;
 * a knocked-out exclamation keeps them one family. */
const SEV_SHAPE: Record<string, React.ReactNode> = {
  Critical: <path d="M7.6 2h8.8L22 7.6v8.8L16.4 22H7.6L2 16.4V7.6L7.6 2Z" />,
  High: <path d="M12 2.6 22 20.4a1.4 1.4 0 0 1-1.2 2.1H3.2A1.4 1.4 0 0 1 2 20.4L12 2.6Z" />,
  Medium: <circle cx="12" cy="12" r="10" />,
};
const SEV_MARK: Record<string, React.ReactNode> = {
  Critical: <><rect x="10.8" y="7" width="2.4" height="7" rx="1.2" /><circle cx="12" cy="17.4" r="1.4" /></>,
  High: <><rect x="10.8" y="9" width="2.4" height="6" rx="1.2" /><circle cx="12" cy="18" r="1.3" /></>,
  Medium: <><rect x="10.8" y="7" width="2.4" height="7" rx="1.2" /><circle cx="12" cy="17.4" r="1.4" /></>,
};

export function SeverityIcon({ severity }: { severity: string }) {
  return (
    <svg className={"dms-sev dms-sev--" + severity.toLowerCase()} viewBox="0 0 24 24" aria-hidden="true">
      <g className="dms-sev__shape">{SEV_SHAPE[severity]}</g>
      <g className="dms-sev__mark" fill="#fff">{SEV_MARK[severity]}</g>
    </svg>
  );
}

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
