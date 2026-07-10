/* ----------------------------------------------------------------------------
 * dms-integrations.tsx - "Integrations" section that sits after the lifecycle.
 * The lifecycle shows a governed record moving through its states inside
 * Unifize; this beat shows the record does not stop at Unifize's edge.
 *
 * Composition (mirrors the classic integrations layout, in this page's flat /
 * square / mono idiom): a left copy column - heading, lede, a 2x2 value-prop
 * grid, and a CTA - beside a right RADIAL HUB. The hub draws Unifize at the
 * centre with the systems of record orbiting it on a dashed ring, each wired
 * back through a blue connector node. A bottom strip carries three platform
 * facts. The one pop of brand blue is the hub's connector nodes and centre
 * bloom - the section's single data graphic.
 *
 * Runs on ink (near-black), continuing the dark block the lifecycle ends on.
 * Product-specific (from data): heading, lede, the `record` it keeps in sync,
 * and the `hubSystems` that orbit. The value props, facts, and CTA are
 * platform-level and shared across all four product pages. Used by the
 * standalone DMS page and the data-driven ProductPage.
 *
 * NOTE: the orbiting systems are REPRESENTATIVE of the stack Unifize coexists
 * with (grounded in the industry coexistence copy), not a certified connector
 * list, and are shown as names (no third-party logos). Verify against the real
 * connector catalogue before shipping. Server component, no state.
 * -------------------------------------------------------------------------- */
import { Eyebrow } from "./dms-primitives";
import { Glyph } from "./dms-linework";

export type IntegrationData = {
  heading: string;
  lede: string;
  /** the thing Unifize keeps in sync with the stack, named in this product's
   * world (e.g. "the controlled document"). Shown on the hub caption. */
  record: string;
  /** the systems of record that orbit the hub. Kept short (single tokens) so
   * the tiles read cleanly; 6-8 is the comfortable range. */
  hubSystems: string[];
};

/* the 2x2 value props - platform-level and true of every Unifize product, so
 * they are shared here (the product-specific story is in the heading/lede and
 * the orbiting systems). */
const FEATURES: { glyph: string; title: string; body: string }[] = [
  { glyph: "sync", title: "Two-way sync", body: "Master data and records move in both directions, so Unifize and your systems of record never drift apart." },
  { glyph: "trace", title: "No rip-and-replace", body: "Unifize sits over the stack you already run and lands value without displacing your ERP, PLM, or MES." },
  { glyph: "signature", title: "Governed by design", body: "Every synced change keeps its owner and e-signature, 21 CFR Part 11 where the record requires it." },
  { glyph: "access", title: "Open and extensible", body: "A documented REST API and webhooks let any system act on a state change the moment it happens." },
];

/* the bottom strip - three platform facts. Deliberately non-numeric: the page
 * cut fabricated metrics elsewhere, so these stay qualitative. */
const FACTS: { glyph: string; stat: string; sub: string }[] = [
  { glyph: "access", stat: "Open REST API", sub: "Build the connection you need." },
  { glyph: "shield", stat: "Enterprise identity", sub: "SSO and SCIM, encrypted in transit." },
  { glyph: "versions", stat: "Always current", sub: "One record, every system in step." },
];

/* hub geometry - a single inline SVG so it scales with its container (mirrors
 * WithDmsOrbit). All radii are in the 0..HUB_VIEW user space. */
const HUB_VIEW = 580;
const HUB_C = HUB_VIEW / 2;
const R_RING = 214;   // dashed ring the tiles sit on
const R_NODE = 120;   // blue connector nodes (inner ring)
const R_CORE = 66;    // centre disc
const R_WIRE_OUT = 172;

function hubGeometry(systems: string[]) {
  const n = systems.length;
  return systems.map((name, i) => {
    const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const w = Math.max(66, name.length * 9 + 26); // tile width fits the name
    return {
      name,
      tx: HUB_C + R_RING * c,
      ty: HUB_C + R_RING * s,
      w,
      x1: HUB_C + R_CORE * c,
      y1: HUB_C + R_CORE * s,
      x2: HUB_C + R_WIRE_OUT * c,
      y2: HUB_C + R_WIRE_OUT * s,
      nx: HUB_C + R_NODE * c,
      ny: HUB_C + R_NODE * s,
    };
  });
}

function IntegrationHub({ systems, record }: { systems: string[]; record: string }) {
  const tiles = hubGeometry(systems);
  return (
    <div className="dms-intg__hub" data-reveal>
      <svg
        className="dms-intg__hub-svg"
        viewBox={`0 0 ${HUB_VIEW} ${HUB_VIEW}`}
        role="img"
        aria-label={`Unifize at the centre, syncing ${record} both ways with ${systems.join(", ")}.`}
      >
        <defs>
          <radialGradient id="dmsIntgBloom" cx="50%" cy="50%" r="50%">
            <stop className="dms-intg__bloom-0" offset="0%" />
            <stop className="dms-intg__bloom-1" offset="100%" />
          </radialGradient>
        </defs>

        {/* the brand bloom behind the centre - the one soft pop of blue */}
        <circle className="dms-intg__bloom" cx={HUB_C} cy={HUB_C} r={150} fill="url(#dmsIntgBloom)" />

        {/* dashed ring the systems dock onto */}
        <circle className="dms-intg__ring" cx={HUB_C} cy={HUB_C} r={R_RING} />

        {/* connectors + blue nodes, drawn under the tiles */}
        {tiles.map((t) => (
          <line key={`w-${t.name}`} className="dms-intg__wire" x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
        ))}
        {tiles.map((t) => (
          <rect key={`n-${t.name}`} className="dms-intg__node" x={t.nx - 3} y={t.ny - 3} width={6} height={6} />
        ))}

        {/* the centre disc + Unifize wordmark */}
        <circle className="dms-intg__core" cx={HUB_C} cy={HUB_C} r={R_CORE} />
        <image href="/logo_light.svg" x={HUB_C - 54} y={HUB_C - 12.4} width={108} height={24.8} />

        {/* the system tiles */}
        {tiles.map((t) => (
          <g key={`t-${t.name}`}>
            <rect className="dms-intg__tile-box" x={t.tx - t.w / 2} y={t.ty - 21} width={t.w} height={42} rx={4} />
            <text className="dms-intg__tile-tx" x={t.tx} y={t.ty} textAnchor="middle" dominantBaseline="central">
              {t.name}
            </text>
          </g>
        ))}
      </svg>

      <p className="dms-intg__hub-cap">
        Two-way sync. Unifize keeps {record} and your systems of record in step.
      </p>
    </div>
  );
}

export function IntegrationLayer({ data }: { data: IntegrationData }) {
  return (
    <section className="dms-section dms-section--dark dms-intg" id="integrations" aria-label="Integrations">
      <div className="dms-wrap">
        <div className="dms-intg__top">
          {/* left - copy, value-prop grid, CTA */}
          <div className="dms-intg__copy">
            <div className="dms-head" data-reveal>
              <Eyebrow>Integrations</Eyebrow>
              <h2 className="dms-h2">{data.heading}</h2>
              <p className="dms-lede">{data.lede}</p>
            </div>

            <ul className="dms-intg__feats" data-reveal>
              {FEATURES.map((f) => (
                <li className="dms-intg__feat" key={f.title}>
                  <span className="dms-intg__feat-ico">
                    <Glyph name={f.glyph} className="dms-intg__feat-glyph" />
                  </span>
                  <div className="dms-intg__feat-body">
                    <h3 className="dms-intg__feat-title">{f.title}</h3>
                    <p className="dms-intg__feat-text">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="dms-intg__cta" data-reveal>
              <button type="button" className="dms-btn dms-btn-ghost">See it connect to your stack &rarr;</button>
            </div>
          </div>

          {/* right - the radial hub */}
          <IntegrationHub systems={data.hubSystems} record={data.record} />
        </div>

        {/* bottom - platform facts */}
        <ul className="dms-intg__stats" data-reveal>
          {FACTS.map((s) => (
            <li className="dms-intg__stat" key={s.stat}>
              <Glyph name={s.glyph} className="dms-intg__stat-glyph" />
              <span className="dms-intg__stat-main">
                <span className="dms-intg__stat-v">{s.stat}</span>
                <span className="dms-intg__stat-sub">{s.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
