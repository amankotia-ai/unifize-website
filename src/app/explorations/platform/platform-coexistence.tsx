/* ----------------------------------------------------------------------------
 * platform-coexistence.tsx - the three-zone placement diagram, per the
 * Story Architecture: systems of record on the left (they stay
 * authoritative), the tools and channels where work happens today on the
 * right (they keep being used), Unifize as the governed layer between.
 * Five labeled flows, exact arrow vocabulary from the concept map:
 * Context in (from records and connectors), Write-back out (only what is
 * agreed), Decisions and Artifacts captured in from the channels.
 * Built in the page's linework idiom: hairline tiles, mono labels, one
 * accent, square everything. Server component, no state.
 * -------------------------------------------------------------------------- */

/* solid glyphs for the tiles, 20-grid, one path each, filled in the accent.
 * Hand-drawn in the Heroicons-mini idiom so no icon package is needed. */
const TILE_ICONS: Record<string, string> = {
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
  Meetings: "M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v1H2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1ZM2 9h16v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z",
};

const RECORD_SYSTEMS = ["ERP", "PLM", "eQMS", "MES", "LIMS"];
const WORK_CHANNELS = ["Email", "Teams", "SharePoint", "Excel", "Meetings"];

function Tile({ name }: { name: string }) {
  return (
    <li className="pf-coex__tile">
      <svg className="pf-coex__tile-icon" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d={TILE_ICONS[name]} />
      </svg>
      {name}
    </li>
  );
}

const CORE_ROWS = [
  "Accountable threads",
  "Structured data",
  "Audit trail, written live",
  "Part 11 e-signatures",
];

const NOTES = [
  {
    label: "What stays authoritative",
    body: "Your ERP, PLM, and eQMS keep their records. Unifize links to them; nothing is re-keyed, nothing is ripped out.",
  },
  {
    label: "What writes back",
    body: "Only what you explicitly agree: outcomes, statuses, references, each one an accountable, signed action.",
  },
  {
    label: "Where a product fits",
    body: "Run Unifize alongside the systems you keep. Where a process has no system, the Unifize product becomes its home, on this same layer.",
  },
];

function Flow({
  dir,
  label,
  note,
}: {
  dir: "in" | "out";
  label: string;
  note: string;
}) {
  return (
    <div className="pf-coex__flow" data-dir={dir}>
      <span className="pf-coex__flow-lab">{label}</span>
      <span className="pf-coex__arrow" aria-hidden="true" />
      <span className="pf-coex__flow-note">{note}</span>
    </div>
  );
}

export function PlatformCoexistence() {
  return (
    <div className="pf-coex" data-reveal>
      {/* the diagram sits on the same brand-blue field the product arcades
       * use: accent gradient, four pieces of quiet geometry cropping off
       * the edge (square ring, circle ring, solid mark, bar) */}
      <div className="pf-coex__field">
        <span className="pf-coex__field-geo" aria-hidden="true"><i /><i /><i /><i /></span>
        <div className="pf-coex__diagram">
          {/* left zone: the systems of record, unchanged */}
          <div className="pf-coex__zone">
            <span className="pf-coex__zone-lab">Systems of record</span>
            <ul className="pf-coex__tiles">
              {RECORD_SYSTEMS.map((system) => (
                <Tile name={system} key={system} />
              ))}
            </ul>
            <span className="pf-coex__zone-note">Stay authoritative</span>
          </div>

          {/* the left flows: context in, write-back out */}
          <div className="pf-coex__flows" data-side="left">
            <Flow dir="in" label="Context" note="links · IDs · attachments" />
            <Flow dir="out" label="Write-back" note="only what you agree" />
          </div>

          {/* centre: the governed layer */}
          <div className="pf-coex__core">
            {/* the header band: the product surface's own chrome */}
            <div className="pf-coex__core-head">
              <img className="pf-coex__core-logo" src="/logo_dark.svg" alt="Unifize" width="658" height="152" />
              <span className="pf-coex__core-name">The governed coordination layer</span>
            </div>
            <div className="pf-coex__core-body">
              <ul className="pf-coex__core-rows">
                {CORE_ROWS.map((row) => (
                  <li className="pf-coex__core-row" key={row}>{row}</li>
                ))}
              </ul>
              <p className="pf-coex__core-ai">
                AI assist drafts, chases, and summarizes. Your people approve and stay accountable.
              </p>
            </div>
          </div>

          {/* the right flows: decisions and artifacts captured in */}
          <div className="pf-coex__flows" data-side="right">
            <Flow dir="in" label="Decisions" note="approvals captured to the thread" />
            <Flow dir="in" label="Artifacts" note="files and trackers attached" />
          </div>

          {/* right zone: where the work happens today */}
          <div className="pf-coex__zone">
            <span className="pf-coex__zone-lab">Where work happens today</span>
            <ul className="pf-coex__tiles">
              {WORK_CHANNELS.map((channel) => (
                <Tile name={channel} key={channel} />
              ))}
            </ul>
            <span className="pf-coex__zone-note">Keep being used</span>
          </div>
        </div>

        {/* the field's footer: how the layer plugs into the stack */}
        <p className="pf-coex__ground">
          Single sign-on · open APIs · webhooks · connectors into the stack you already run
        </p>
      </div>

      <ul className="pf-coex__notes">
        {NOTES.map((note) => (
          <li className="pf-coex__note" key={note.label}>
            <span className="pf-coex__note-lab">{note.label}</span>
            <p className="pf-coex__note-body">{note.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
