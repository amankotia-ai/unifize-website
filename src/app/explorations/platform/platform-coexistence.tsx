"use client";

/* ----------------------------------------------------------------------------
 * platform-coexistence.tsx - "Your systems stay", drawn.
 *
 * 22 Sep 2026: the two rows of tiles read as a spec sheet. Redrawn in the
 * language of the stack diagram below it (platform-stack-diagram.tsx: fine
 * linework, rounded-square isometric extrusions, editorial annotations), but
 * as three bands SIDE BY SIDE instead of stacked, so the two drawings are one
 * family without being the same picture twice:
 *
 *   left    systems of record, one module per system, they stay authoritative
 *   centre  Unifize, the governed layer between (the symbol on the chip)
 *   right   the everyday tools where work happens, they keep being used
 *
 * The flows are the concept map's, drawn as arrows between the plates:
 * context in, only what you agree flows back, decisions and artifacts
 * captured from the channels, the record linked into every message. The
 * three notes sit under their bands as annotations. Hovering a band or a
 * name lights the matching module. Light variant of the graphite palette so
 * the page does not run three dark sections in a row.
 * -------------------------------------------------------------------------- */
import { useState, type KeyboardEvent } from "react";
import { ISO_K as ISO, Plate } from "./platform-stack-diagram";
import "./platform-coexistence.css";

/* solid glyphs for the modules, 20-grid, one path each. Hand-drawn in the
 * Heroicons-mini idiom so no icon package is needed. (Also used by the gap
 * section's tool map.) */
export const TILE_ICONS: Record<string, string> = {
  /* systems of record */
  ERP: "M10 1.5 18 5.5v9l-8 4-8-4v-9l8-4Zm0 2.2L4.5 6.4 10 9.1l5.5-2.7L10 3.7ZM3.5 7.9v5.9l5.75 2.9V10.8L3.5 7.9Zm13 0-5.75 2.9v5.9l5.75-2.9V7.9Z",
  PLM: "M10 2 18 6.5 10 11 2 6.5 10 2Zm-6.2 7.4L10 13l6.2-3.6 1.8 1-8 4.5-8-4.5 1.8-1Zm0 3.6L10 16.6l6.2-3.6 1.8 1L10 18.5 2 14l1.8-1Z",
  eQMS: "M10 1.5 17 4v5c0 4.6-3 8.3-7 9.5-4-1.2-7-4.9-7-9.5V4l7-2.5Zm3.3 5.8-1.2-1.2L9 9.2 7.9 8.1 6.7 9.3 9 11.6l4.3-4.3Z",
  MES: "M2 17V8.5l4-2.5v2.5l4-2.5v2.5l4-2.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v13H2Zm3-4v2h2v-2H5Zm4 0v2h2v-2H9Zm4 0v2h2v-2h-2Z",
  LIMS: "M7 2h6v1.5h-1v4.2l4.6 7.4A2 2 0 0 1 14.9 18H5.1a2 2 0 0 1-1.7-3l4.6-7.3V3.5H7V2Z",
  /* where work happens today */
  Email: "M3 4a2 2 0 0 0-2 2v.6l9 5.1 9-5.1V6a2 2 0 0 0-2-2H3Zm16 4.9-9 5.1-9-5.1V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.9Z",
  Teams: "M10 2C5.03 2 1 5.36 1 9.5c0 2.2 1.14 4.18 2.96 5.55L3 18l4.2-1.53c.9.22 1.84.33 2.8.33 4.97 0 9-3.36 9-7.5S14.97 2 10 2Z",
  SharePoint: "M2 5a2 2 0 0 1 2-2h3.6a2 2 0 0 1 1.4.6L10.4 5H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Z",
  Excel: "M3 3h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 3v3h4V6H4Zm6 0v3h6V6h-6Zm-6 5v3h4v-3H4Zm6 0v3h6v-3h-6Z",
  /* aliases and extras for the Solutions pages' own rosters (23 Sep 2026) */
  CRM: "M10 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-7 15c0-3.3 3.1-6 7-6s7 2.7 7 6v1H3v-1Z",
  Meetings: "M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v1H2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1ZM2 9h16v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z",
};

/* the sibling Solutions pages' leak channels (23 Sep 2026) */
TILE_ICONS.Binders = "M4 2h11a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4V2Zm2 2.5v2h1.6v-2H6Zm0 4.5v2h1.6V9H6Zm0 4.5v2h1.6v-2H6ZM10 5v3h4V5h-4Z";
TILE_ICONS.Portal = "M2 3h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 4v8h14V7H3Zm1-2.6v1.2h1.2V4.4H4Zm2 0v1.2h1.2V4.4H6Z";
TILE_ICONS.Calls = "M5.2 2h2.6l1.4 4-1.9 1.3a9.3 9.3 0 0 0 5.4 5.4l1.3-1.9 4 1.4v2.6A2.2 2.2 0 0 1 15.8 17C8.7 17 3 11.3 3 4.2A2.2 2.2 0 0 1 5.2 2Z";
TILE_ICONS.Workbooks = "M5 1h11a1 1 0 0 1 1 1v12h-2V3H5V1Zm-2 4h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 3v2.5h3V8H4Zm4.5 0v2.5H12V8H8.5ZM4 12v2.5h3V12H4Zm4.5 0v2.5H12V12H8.5Z";

TILE_ICONS.QMS = TILE_ICONS.eQMS;
TILE_ICONS.Drives = TILE_ICONS.SharePoint;
TILE_ICONS.Chat = TILE_ICONS.Teams;
TILE_ICONS.Sheets = TILE_ICONS.Excel;

type Band = "records" | "unifize" | "tools";

export type CoexistenceBand = { id: Band; title: string; sub: string; names: string[]; link?: string; label: string; body: string };

/* the four flow labels, in drawing order: records -> Unifize, Unifize ->
 * records, tools -> Unifize, Unifize -> tools */
export type CoexistenceFlows = { contextIn: string; back: string; captured: string; linked: string };

const FLOWS: CoexistenceFlows = {
  contextIn: "CONTEXT IN",
  back: "ONLY WHAT YOU AGREE",
  captured: "DECISIONS CAPTURED",
  linked: "THE RECORD, LINKED",
};

const BANDS: CoexistenceBand[] = [
  {
    id: "records",
    title: "Systems of record",
    sub: "Stay authoritative",
    names: ["ERP", "PLM", "eQMS", "MES", "LIMS"],
    label: "What stays authoritative",
    body: "Your ERP, PLM, and eQMS keep their records. Unifize links to them; nothing is re-keyed, nothing is ripped out.",
  },
  {
    id: "unifize",
    title: "Unifize",
    sub: "The governed layer between",
    /* the three bands of the stack, closed here and exploded in the next
     * section; the chips link down to it */
    names: ["Outcomes + AI assist", "Product suite", "Workflow components"],
    link: "#stack",
    label: "What flows back",
    body: "Only what you explicitly agree: outcomes, statuses, references, each one an accountable, signed action on the record.",
  },
  {
    id: "tools",
    title: "Everyday tools",
    sub: "Keep being used",
    names: ["Email", "Teams", "SharePoint", "Excel", "Meetings"],
    label: "Where a product fits",
    body: "Run Unifize alongside the systems you keep. Where a process has no system, the Unifize product becomes its home, on this same layer.",
  },
];

/* the drawing: three plates in one row. Plates sit on the plan diagonal
 * x = -y, which projects to a horizontal line, so square isometric plates
 * line up side by side. */
const W = 1240;
const H = 336;
const CENTER = 168;
const PLATE = 84;
const NODE = 20;
const BAND_X = [W / 6, W / 2, (5 * W) / 6];
/* five modules per outer plate: a back row of three and a front row of two,
 * in plan coordinates, spaced so their rhombi clear each other on screen */
const NODE_POS: [number, number][] = [
  [-66, 26], [-22, -22], [26, -66],
  [-4, 40], [40, -4],
];
/* four modules: a diamond, same spacing as the five */
const NODE_POS_4: [number, number][] = [
  [-30, -30], [-30, 30], [30, -30], [30, 30],
];
const REACH = 2 * PLATE * ISO; /* half the plate's on-screen width */
const DETAIL_ID = "pf-cx-detail";
/* depth of each plate in the closed stack */
const STACK_D = 11;

function activate(event: KeyboardEvent<SVGGElement>, callback: () => void) {
  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); callback(); }
}

function Node({ x, y, name, lit }: { x: number; y: number; name: string; lit: boolean }) {
  return (
    /* placement is an attribute transform on the outer group; the lift is a
     * CSS transform on the inner one. A CSS transform REPLACES an attribute
     * transform on the same element, which snapped lit plates to the origin. */
    <g transform={`translate(${(x - y) * ISO} ${(x + y) * 0.5})`}>
      <g className="pf-cx__node" data-lit={lit}>
        <title>{name}</title>
        <Plate center={CENTER} size={NODE} depth={8} inset={false} />
        <g transform={`translate(260 ${CENTER}) matrix(${ISO} .5 -${ISO} .5 0 0)`}>
          <rect className="pf-cx__node-core" x={-NODE + 4} y={-NODE + 4} width={NODE * 2 - 8} height={NODE * 2 - 8} rx="3" />
          <g className="pf-cx__node-icon" transform="translate(-11 -11) scale(1.1)">
            <path fillRule="evenodd" d={TILE_ICONS[name] ?? TILE_ICONS.ERP} />
          </g>
        </g>
      </g>
    </g>
  );
}

/* a flow between two plates: a fine arrow with its label above */
function Flow({ x1, x2, y, label, reverse, dim }: { x1: number; x2: number; y: number; label: string; reverse?: boolean; dim: boolean }) {
  const [from, to] = reverse ? [x2, x1] : [x1, x2];
  const dir = reverse ? -1 : 1;
  return (
    <g className="pf-cx__flow" data-dim={dim}>
      <text x={(x1 + x2) / 2} y={y - 7} textAnchor="middle">{label}</text>
      <path d={`M${from},${y}H${to}`} />
      <path className="pf-cx__flow-head" d={`M${to - 5 * dir},${y - 3.5}L${to},${y}L${to - 5 * dir},${y + 3.5}`} />
    </g>
  );
}

export function PlatformCoexistence({
  bands: BANDS_IN = BANDS,
  flows = FLOWS,
  label = "Isometric drawing: systems of record on the left, Unifize as the governed layer in the centre, everyday tools on the right, with the flows between them",
}: {
  /* the Solutions pages bring their own rosters and copy (23 Sep 2026) */
  bands?: CoexistenceBand[];
  flows?: CoexistenceFlows;
  label?: string;
} = {}) {
  const BANDS = BANDS_IN;
  const [active, setActive] = useState<Band | null>(null);
  const [hover, setHover] = useState<Band | null>(null);
  const [name, setName] = useState<string | null>(null);
  const lit = (band: Band) => active === band || hover === band;
  const toggle = (band: Band) => setActive(active === band ? null : band);
  const current = BANDS.find((band) => band.id === active);

  const gapL = [BAND_X[0] + REACH, BAND_X[1] - REACH] as const;
  const gapR = [BAND_X[1] + REACH, BAND_X[2] - REACH] as const;

  return (
    <div className="pf-cx" data-reveal data-active={active}>
      {/* the instruction strip ("Three layers, side by side / Click a band
        * to see...") was removed on 22 Sep 2026 (Abhishek: "remove this
        * text"); the bands' own +/- affordance carries the interaction */}
      <div className="pf-cx__scene">
        <svg className="pf-cx__drawing" viewBox={`0 0 ${W} ${H}`} role="group" aria-label={label}>
          {/* guides: the baseline through the plate centres, one drop per band
              to its annotation */}
          <g className="pf-cx__guides" aria-hidden="true">
            <path d={`M24,${CENTER}H${W - 24}`} />
            {BAND_X.map((x) => <path key={x} d={`M${x},${CENTER + PLATE + 26}V${H}`} />)}
          </g>

          {/* the flows, in the concept map's vocabulary */}
          <Flow x1={gapL[0] + 10} x2={gapL[1] - 10} y={CENTER - 30} label={flows.contextIn} dim={active === "tools"} />
          <Flow x1={gapL[0] + 10} x2={gapL[1] - 10} y={CENTER + 30} label={flows.back} reverse dim={active === "tools"} />
          <Flow x1={gapR[0] + 10} x2={gapR[1] - 10} y={CENTER - 30} label={flows.captured} reverse dim={active === "records"} />
          <Flow x1={gapR[0] + 10} x2={gapR[1] - 10} y={CENTER + 30} label={flows.linked} dim={active === "records"} />

          {BANDS.map((band, index) => (
            <g key={band.id} transform={`translate(${BAND_X[index] - 260} 0)`}>
            <g
              className="pf-cx__band"
              data-band={band.id}
              data-lit={lit(band.id)}
              role="button"
              tabIndex={0}
              aria-label={`${band.title}: ${band.sub}`}
              aria-pressed={active === band.id}
              aria-controls={DETAIL_ID}
              onClick={() => toggle(band.id)}
              onKeyDown={(event) => activate(event, () => toggle(band.id))}
              onMouseEnter={() => setHover(band.id)}
              onMouseLeave={() => setHover(null)}
            >
              <title>{band.title}</title>
              {band.id === "unifize" ? (
                /* the stack, closed: workflow components, the product suite
                 * and outcomes sitting tight on each other, the symbol on
                 * top. The next section pulls them apart. */
                <>
                  <Plate center={CENTER + 2 * STACK_D} size={PLATE} depth={STACK_D} inset={false} />
                  <Plate center={CENTER + STACK_D} size={PLATE} depth={STACK_D} inset={false} />
                  <Plate center={CENTER} size={PLATE} depth={STACK_D} inset />
                  <g transform={`translate(260 ${CENTER}) matrix(${ISO} .5 -${ISO} .5 0 0)`} aria-hidden="true">
                    <image href="/unifize-symbol.svg" x="-33" y="-28" width="66" height="56" />
                  </g>
                </>
              ) : (
                <>
                <Plate center={CENTER} size={PLATE} depth={22} inset={false} />
                {band.names.slice(0, 5).map((n, i, all) => {
                  const pos = (all.length === 4 ? NODE_POS_4 : NODE_POS)[i];
                  return <Node key={n} x={pos[0]} y={pos[1]} name={n} lit={name === n} />;
                })}
                </>
              )}
            </g>
            </g>
          ))}
        </svg>
      </div>

      {/* the annotations: a strip of three titles, and ONE full-width detail
          panel under the strip for whichever band is open (22 Sep 2026: the
          always-on version read as an information dump; per-column reveals
          left two tall empty cells beside the open one) */}
      <div className="pf-cx__bands">
        <div className="pf-cx__strip">
          {BANDS.map((band) => {
            const open = active === band.id;
            return (
              <section
                key={band.id}
                className="pf-cx__annotation"
                data-lit={lit(band.id)}
                data-open={open}
                onMouseEnter={() => setHover(band.id)}
                onMouseLeave={() => setHover(null)}
              >
                <button
                  type="button"
                  className="pf-cx__annotation-button"
                  aria-expanded={open}
                  aria-controls={DETAIL_ID}
                  onClick={() => toggle(band.id)}
                >
                  <span className="pf-cx__title">
                    {band.title}
                    <small>{band.sub}</small>
                  </span>
                  <span className="pf-cx__index" aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
              </section>
            );
          })}
        </div>
        <div className="pf-cx__detail" id={DETAIL_ID} hidden={!current} data-band={current?.id}>
          {current ? (
            <>
              <div className="pf-cx__detail-names" onMouseLeave={() => setName(null)}>
                {current.link ? (
                  <ul className="pf-cx__names" aria-label={current.title}>
                    {current.names.map((n) => (
                      <li key={n}>
                        <a className="pf-cx__name pf-cx__name--link" href={current.link}>{n}<span aria-hidden="true"> ↓</span></a>
                      </li>
                    ))}
                  </ul>
                ) : current.names.length ? (
                  <ul className="pf-cx__names" aria-label={current.title}>
                    {current.names.map((n) => (
                      <li key={n}>
                        <button
                          type="button"
                          className="pf-cx__name"
                          data-lit={name === n}
                          onMouseEnter={() => setName(n)}
                          onFocus={() => setName(n)}
                          onBlur={() => setName(null)}
                        >
                          {n}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="pf-cx__names pf-cx__names--one">One governed layer · the products live here</p>
                )}
              </div>
              <p className="pf-cx__note">
                <span className="pf-cx__note-lab">{current.label}</span>
                {current.body}
              </p>
            </>
          ) : null}
        </div>
      </div>
      {/* the ground line ("Single sign-on · open APIs · webhooks ·
        * connectors...") was removed on 23 Sep 2026 (Abhishek: "remove
        * this") */}
    </div>
  );
}
