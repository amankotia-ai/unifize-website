/* ----------------------------------------------------------------------------
 * dms-integrations-iso.tsx - the "iso" Integrations variant (DMS pilot).
 * A tilted field of square tiles; the Unifize tile sits raised at the centre
 * on a short stack, and the connector logos lie on the tiles around it. No
 * CTA; the field closes the section. Takes the minimal variant's strings, so
 * any product page switches by passing variant="iso" to IntegrationLayer.
 *
 * The plane is one CSS grid transformed rotateX(58deg) rotateZ(45deg); the
 * logos turn with it, square to their tiles. Tile positions are (col, row)
 * on a 10x10 grid whose centre 2x2 is the hub; an SVG in plane units draws
 * the connector route from the hub to each tile. Server component.
 * -------------------------------------------------------------------------- */
import "./dms-intg-iso.css";
import { Eyebrow } from "./dms-primitives";
import type { IntegrationLogo } from "../_shared/integrations-catalog";

/* logo slots around the hub, ordered so the first seven read balanced
 * left/right; 1-based grid lines on the 10x10 plane (hub = 5-6 x 5-6). */
const LOGO_SLOTS: [number, number][] = [
  [3, 5], // top left
  [5, 3], // top right
  [3, 7], // far left
  [7, 3], // far right
  [5, 8], // lower left
  [8, 5], // lower right
  [7, 8], // bottom
  [8, 7], // bottom right
];

/* quiet shaded tiles, decoration only */
const SHADED: [number, number][] = [
  [4, 4], [2, 6], [6, 2], [7, 6], [4, 9], [9, 4], [2, 3], [9, 8], [3, 9],
];

const N = 10;

/* connector routes in plane units: a 1000-unit square over the 10x10 grid
 * (cell 1, gap 0.12). Each route leaves the hub on the side facing its tile,
 * runs along a row or column centre, and turns once if it has to. */
const GAP = 0.12;
const U = 1000 / (N + (N - 1) * GAP);
const P = (1 + GAP) * U; // pitch
const CELL = U;
const mid = (i: number) => (i - 1) * P + CELL / 2; // centre of track i
const lo = (i: number) => (i - 1) * P; // leading edge of track i
const hi = (i: number) => (i - 1) * P + CELL; // trailing edge of track i

function route(c: number, r: number): string {
  const f = (n: number) => n.toFixed(1);
  if (r >= 5 && r <= 6) {
    return c < 5 ? `M${f(lo(5))} ${f(mid(r))}H${f(hi(c))}` : `M${f(hi(6))} ${f(mid(r))}H${f(lo(c))}`;
  }
  if (c >= 5 && c <= 6) {
    return r < 5 ? `M${f(mid(c))} ${f(lo(5))}V${f(hi(r))}` : `M${f(mid(c))} ${f(hi(6))}V${f(lo(r))}`;
  }
  const row = r < 5 ? 5 : 6;
  const x0 = c < 5 ? lo(5) : hi(6);
  const y1 = r < 5 ? hi(r) : lo(r);
  return `M${f(x0)} ${f(mid(row))}H${f(mid(c))}V${f(y1)}`;
}

export function IntegrationIso({
  eyebrow,
  heading,
  lede,
  logos,
  className,
}: {
  eyebrow?: React.ReactNode;
  heading: string;
  lede: string;
  logos: IntegrationLogo[];
  className?: string;
}) {
  const placed = logos.slice(0, LOGO_SLOTS.length);
  const taken = new Set(
    [...placed.map((_, i) => LOGO_SLOTS[i]), ...SHADED].map(([c, r]) => `${c}:${r}`),
  );
  const blanks: [number, number][] = [];
  for (let r = 1; r <= N; r++) {
    for (let c = 1; c <= N; c++) {
      const hub = c >= 5 && c <= 6 && r >= 5 && r <= 6;
      if (!hub && !taken.has(`${c}:${r}`)) blanks.push([c, r]);
    }
  }

  return (
    <section
      className={"dms-section dms-intg dms-intg--minimal dms-intg--light dms-intg--iso" + (className ? " " + className : "")}
      id="integrations"
      aria-labelledby="dms-integrations-title"
    >
      <div className="dms-wrap">
        <header className="dms-intg__minimal-head" data-reveal>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="dms-h2" id="dms-integrations-title">{heading}</h2>
          <p className="dms-lede">{lede}</p>
        </header>

        <div className="iso-stage" data-reveal>
          <ul className="iso-sr">
            {logos.map((l) => <li key={l.name}>{l.name}</li>)}
          </ul>
          <div className="iso-plane" aria-hidden="true">
            {blanks.map(([c, r]) => (
              <span className="iso-tile" key={`b${c}-${r}`} style={{ gridColumn: c, gridRow: r }} />
            ))}
            {SHADED.map(([c, r]) => (
              <span className="iso-tile iso-tile--shade" key={`s${c}-${r}`} style={{ gridColumn: c, gridRow: r }} />
            ))}
            {placed.map((l, i) => {
              const [c, r] = LOGO_SLOTS[i];
              return (
                <span className="iso-tile iso-tile--logo" key={l.name} style={{ gridColumn: c, gridRow: r }} title={l.name}>
                  <img src={l.logo} alt="" />
                </span>
              );
            })}
            <svg className="iso-wires" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              {placed.map((l, i) => {
                const d = route(...LOGO_SLOTS[i]);
                return (
                  <g key={l.name} style={{ "--i": i } as React.CSSProperties}>
                    <path className="iso-wire" d={d} pathLength={100} />
                    <path className="iso-pulse" d={d} pathLength={100} />
                  </g>
                );
              })}
            </svg>
            <span className="iso-hub" style={{ gridColumn: "5 / span 2", gridRow: "5 / span 2" }}>
              <span className="iso-hub__layer" style={{ "--z": "0px" } as React.CSSProperties} />
              <span className="iso-hub__layer" style={{ "--z": "14px" } as React.CSSProperties} />
              <span className="iso-hub__layer" style={{ "--z": "28px" } as React.CSSProperties} />
              <span className="iso-hub__top">
                <img src="/unifize-symbol.svg" alt="" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
