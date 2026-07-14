/* ----------------------------------------------------------------------------
 * platform-visuals.tsx - the two platform-level data graphics.
 *
 *   ThreeZoneDiagram - the canonical placement model from the Story
 *     Architecture (Notion, Section 2): systems of record on the left,
 *     the tools and channels where coordination happens today on the right,
 *     Unifize as the governed layer in the centre. Five labelled arrows,
 *     exact labels per the arrow rules: Context, Write-back, Artifacts,
 *     Decisions. The centre thread is the platform's atom, the accountable
 *     thread; its sealed terminal node is the one blue key marker.
 *     `compact` renders the homepage variant: fewer chips, tighter scale.
 *
 *   CompoundLoop - the compound effect, as a four-node cycle: more governed
 *     threads, more structured data, more effective AI, less coordination
 *     tax. The closing node is the key marker; a return wire closes the loop.
 *
 * Both live on dark sections and are line-work only. Server components.
 * -------------------------------------------------------------------------- */

const RECORD_SYSTEMS = ["QMS", "ERP", "PLM", "MES", "LIMS", "CMMS"];
const RECORD_SYSTEMS_COMPACT = ["QMS", "ERP", "PLM", "MES"];
const CHANNELS = ["Email", "Teams", "Meetings", "Spreadsheets", "SharePoint", "Drives"];
const CHANNELS_COMPACT = ["Email", "Teams", "Meetings", "Spreadsheets"];

const THREAD = [
  { name: "One record", note: "The event, the owners, and the conversation in one place." },
  { name: "Decided in the open", note: "The call and its reason captured where the work happens." },
  { name: "Proven, then sealed", note: "Evidence bound to the thread; the trail closes itself." },
];

/* a labelled horizontal wire with a square-capped arrowhead */
function Wire({ label, dir, sub }: { label: string; dir: "in" | "out"; sub?: string }) {
  return (
    <div className={"pf-wire pf-wire--" + dir}>
      <span className="pf-wire__lab">{label}</span>
      <svg className="pf-wire__line" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
        <line x1={dir === "in" ? 0 : 8} y1="4" x2={dir === "in" ? 92 : 100} y2="4" />
      </svg>
      <svg className="pf-wire__head" viewBox="0 0 8 10" aria-hidden="true">
        <path d="M1 1l6 4-6 4" />
      </svg>
      {sub ? <span className="pf-wire__sub">{sub}</span> : null}
    </div>
  );
}

export function ThreeZoneDiagram({ compact = false }: { compact?: boolean }) {
  const records = compact ? RECORD_SYSTEMS_COMPACT : RECORD_SYSTEMS;
  const channels = compact ? CHANNELS_COMPACT : CHANNELS;
  return (
    <div
      className={"pf-zones" + (compact ? " pf-zones--compact" : "")}
      role="img"
      aria-label="Placement diagram: Unifize sits between your systems of record and the tools where coordination happens today. Context flows in from both sides; write-back to systems of record only where agreed; decisions and artifacts are captured onto governed threads."
    >
      {/* left zone - systems of record, kept authoritative */}
      <div className="pf-zone" aria-hidden="true">
        <span className="pf-zone__lab">Systems of record</span>
        <ul className="pf-zone__chips">
          {records.map((s) => <li key={s} className="pf-zone__chip">{s}</li>)}
        </ul>
        <p className="pf-zone__note">Stay authoritative. Nothing is ripped out.</p>
      </div>

      {/* left wires - context in, write-back out */}
      <div className="pf-zones__wires" aria-hidden="true">
        <Wire label="Context" dir="in" sub="links · IDs · attachments" />
        <Wire label="Write-back" dir="out" sub="only what you agree" />
      </div>

      {/* centre - the governed layer, one accountable thread */}
      <div className="pf-zones__core" aria-hidden="true">
        <span className="pf-core__lab">Unifize · the governed layer</span>
        <ol className="pf-core__thread">
          {THREAD.map((nd, i) => (
            <li key={nd.name} className={"pf-core__node" + (i === THREAD.length - 1 ? " is-key" : "")}>
              <span className="pf-core__mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="square" aria-hidden="true">
                  <path d="M5 12.5 10 17.5 19 7" />
                </svg>
              </span>
              <span className="pf-core__tx">
                <span className="pf-core__name">{nd.name}</span>
                {!compact && <span className="pf-core__note">{nd.note}</span>}
              </span>
            </li>
          ))}
        </ol>
        <span className="pf-core__foot">Every cross-functional event, one accountable thread.</span>
      </div>

      {/* right wires - artifacts and decisions captured in */}
      <div className="pf-zones__wires pf-zones__wires--r" aria-hidden="true">
        <Wire label="Artifacts" dir="out" sub="files stay with the work" />
        <Wire label="Decisions" dir="out" sub="captured on the thread" />
      </div>

      {/* right zone - where coordination happens today */}
      <div className="pf-zone" aria-hidden="true">
        <span className="pf-zone__lab">Tools &amp; channels</span>
        <ul className="pf-zone__chips">
          {channels.map((s) => <li key={s} className="pf-zone__chip">{s}</li>)}
        </ul>
        <p className="pf-zone__note">Where the work happens today. It keeps happening there.</p>
      </div>
    </div>
  );
}

/* the compound effect: threads, data, AI, tax, and back around */
const LOOP = [
  { name: "More governed threads", note: "Every event runs on the platform" },
  { name: "More structured data", note: "Decisions and evidence, attributable" },
  { name: "More effective AI", note: "Proposes and drafts; people approve" },
  { name: "Less coordination tax", note: "Measured per thread, weekly", key: true },
];

export function CompoundLoop() {
  return (
    <div
      className="pf-loop"
      role="img"
      aria-label="The compound effect: more governed threads produce more structured data, which makes AI more effective, which reduces the coordination tax, which brings more work onto governed threads."
    >
      <ol className="pf-loop__row" aria-hidden="true">
        {LOOP.map((nd, i) => (
          <li key={nd.name} className={"pf-loop__node" + (nd.key ? " is-key" : "")}>
            <span className="pf-loop__idx dms-data">{String(i + 1).padStart(2, "0")}</span>
            <span className="pf-loop__name">{nd.name}</span>
            <span className="pf-loop__note">{nd.note}</span>
            {i < LOOP.length - 1 && (
              <svg className="pf-loop__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden="true">
                <path d="M3 12h16M14 6.5 19.5 12 14 17.5" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <div className="pf-loop__return" aria-hidden="true">
        <svg viewBox="0 0 100 22" preserveAspectRatio="none">
          <path d="M99 1v10a4 4 0 0 1-4 4H5" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M10 10l-6 5 6 5" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="pf-loop__return-lab">and the loop compounds</span>
      </div>
    </div>
  );
}
