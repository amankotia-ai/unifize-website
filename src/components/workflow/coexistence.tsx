/* ------------------------------------------------------------
 * CoexistenceLayer — the §02.5 "Where Unifize sits" beat, built as a
 * REUSABLE template so the canonical Unifize Concept Map (PLT-2) scales
 * across every generated page (any module · feature · industry).
 *
 * Two halves, kept strictly separate:
 *
 *   1. CANONICAL scaffold (the constants below) — verbatim from PLT-2.
 *      The structure is identical on every page: the placement statement,
 *      the four side zones and their "what it should communicate" captions,
 *      the fixed arrow labels, the four-band stack names, the §6 AI Assist
 *      areas, and the §9 source-of-truth callout. Do NOT contextualize these.
 *
 *   2. CONTEXTUAL slots (CoexistenceContext) — supplied per page and slotted
 *      into the scaffold: the record type, the systems of record for that
 *      industry, the module, standards, approval, and evidence. Stage count
 *      and module name are DERIVED from the page's Workflow, so a new page is
 *      mostly automatic: pass `workflow` + a small `context`.
 *
 * So a CAPA-for-pharma page or an audit page renders the same concept-map
 * structure, contextualized to its own record — no copy is reinvented, and
 * nothing drifts from PLT-2.
 * ------------------------------------------------------------ */

import type { Workflow } from "@/lib/platform-data/workflows";
import "./coexistence.css";

/* ===== CANONICAL — verbatim PLT-2, identical on every page ===== */

const PLACEMENT = {
  eyebrow: "Coexistence", // §2 "three-way coexistence model"
  // §1 placement statement ("the customer's" → "your" for the customer surface)
  title:
    "Unifize coexists with your systems of record, repositories, and collaboration channels.",
  lede: "It reduces coordination tax by creating a shared operational source of truth for cross-functional work, where decisions, approvals, evidence, ownership, and completion stay connected.",
};

// §3 layout table — verbatim "what it should communicate" captions. Systems of
// record is page-supplied (industry-specific); the other three default to the
// doc's §3 example lists and may be overridden per page.
const SOR_CAPTION = "These remain authoritative for their domain records.";
const CONNECTORS_ZONE = {
  label: "Connectors",
  note: "Integrations are additive; they are not a prerequisite for value.",
  items: ["API", "Webhook", "SSO", "CSV"],
};
const HORIZONTAL_ZONE = {
  label: "Horizontal tools",
  note: "Repositories and trackers, not governed closure by default.",
  items: ["SharePoint", "Excel"],
};
const COLLAB_ZONE = {
  label: "Collaboration channels",
  note: "Coordination paths, not the place where work is proven complete.",
  items: ["Email", "Teams"],
};

// §4 band names (+ §9 "top band is always Outcomes + AI Assist", Core Platform
// hidden) and §6 AI Assist areas. Names canonical; band content composed below.
const BAND_OUTCOMES = "Outcomes + AI Assist";
const BAND_PRODUCT = "Product Suite";
const BAND_COMPONENTS = "Workflow Components";
// §6 AI Assist areas — the canonical fallback when a page doesn't supply its own
// concrete actions via context.aiAssist.
const AI_ASSIST = ["Assisted capture", "Execution assist", "Measurement assist"];

// §9 callout — use verbatim.
const CALLOUT_LABEL = "Shared operational source of truth";
const CALLOUT_BODY =
  "the set of threads, consistently captured and discoverable, so status and completion proof are trusted without reconstruction.";

/* ===== CONTEXTUAL — supplied per page, slotted into the scaffold ===== */

export interface CoexistenceContext {
  /** record type, e.g. "change control" → center title "The change control record". */
  recordLabel: string;
  /** singular noun for the outcomes line, e.g. "change". Defaults to recordLabel. */
  recordNoun?: string;
  /** industry adjective for the product line, e.g. "medical-device". */
  industryLabel: string;
  /** standards the template aligns to, e.g. ["ISO 13485", "21 CFR 820"]. */
  standards: string[];
  /** approval mechanism, e.g. "21 CFR Part 11 e-signature". */
  approval: string;
  /** systems of record for this industry/workflow (left zone). */
  systemsOfRecord: string[];
  /** evidence types this record captures (Workflow Components band). */
  evidence: string[];
  /** concrete AI Assist actions on this record (Outcomes band). Each should map
   *  to a PLT-2 §6 area — assisted capture / execution assist / measurement
   *  assist. Defaults to the bare §6 area names. */
  aiAssist?: string[];
  /** optional overrides for the otherwise-canonical supporting zones. */
  connectors?: string[];
  horizontalTools?: string[];
  collaborationChannels?: string[];
}

export interface CoexistenceLayerProps {
  /** the page's workflow — stage count + module name are derived from it. */
  workflow: Workflow;
  context: CoexistenceContext;
  className?: string;
}

function ZoneBox({
  label,
  note,
  items,
}: {
  label: string;
  note: string;
  items: string[];
}) {
  return (
    <div className="cx-zone">
      <span className="cx-zone-lab mono">{label}</span>
      <span className="cx-zone-note">{note}</span>
      <div className="cx-chips">
        {items.map((id) => (
          <span key={id} className="cx-chip mono">
            {id}
          </span>
        ))}
      </div>
    </div>
  );
}

/* One labelled flow arrow between a side box and the centre. `into` is where the
 * arrowhead points: "centre-right"/"centre-left" toward Unifize, "out-left" back
 * to the box (write-back). */
function Flow({
  label,
  into,
  dashed,
}: {
  label: string;
  into: "centre-right" | "centre-left" | "out-left";
  dashed?: boolean;
}) {
  const head = into === "centre-right" ? "cx-arrow--right" : "cx-arrow--left";
  return (
    <div className={`cx-arrow ${head}${dashed ? " cx-arrow--dashed" : ""}`}>
      <span className="cx-arrow-lab mono">{label}</span>
      <span className="cx-arrow-line" />
    </div>
  );
}

export function CoexistenceLayer({
  workflow,
  context,
  className,
}: CoexistenceLayerProps) {
  // Derived from the page's workflow, so a new page is mostly automatic.
  const stageCount = workflow.nodes.filter((n) => n.kind === "step").length;
  const moduleName = workflow.module.split(" · ")[0]; // "DMS Module · …" → "DMS Module"
  const recordNoun = context.recordNoun ?? context.recordLabel;

  // Band CONTENT — canonical sentence structure, contextual values slotted in.
  const bands = [
    {
      name: BAND_OUTCOMES,
      line: `Faster closure and fewer reopens on this ${recordNoun}, measured cycle by cycle.`,
      chipsLabel: "AI Assist",
      chips: context.aiAssist ?? AI_ASSIST,
      lead: true,
    },
    {
      name: BAND_PRODUCT,
      line: `Runs on the ${moduleName} — a pre-validated ${context.industryLabel} template, aligned to ${context.standards.join(" and ")}.`,
      chips: undefined as string[] | undefined,
      chipsLabel: undefined as string | undefined,
      lead: false,
    },
    {
      name: BAND_COMPONENTS,
      line: `${stageCount} stages, role-based approval with a ${context.approval}.`,
      chipsLabel: "Evidence",
      chips: context.evidence,
      lead: false,
    },
  ];

  return (
    <section
      className={["section alt cx-section", className].filter(Boolean).join(" ")}
    >
      <div className="section-inner">
        <div className="section-head stack">
          <span className="section-eyebrow">{PLACEMENT.eyebrow}</span>
          <h2 className="section-title">{PLACEMENT.title}</h2>
          <p className="wf-lede">{PLACEMENT.lede}</p>
        </div>

        <div className="cx-stage">
          {/* LEFT — systems of record + connectors, each flowing into the centre
              at its own height (PLT-2 §3 / §5) */}
          <div className="cx-side cx-side--left">
            <div className="cx-cell">
              <ZoneBox
                label="Systems of record"
                note={SOR_CAPTION}
                items={context.systemsOfRecord}
              />
              <div className="cx-conn" aria-hidden="true">
                <Flow label="context" into="centre-right" />
                <Flow label="write-back" into="out-left" dashed />
              </div>
            </div>
            <div className="cx-cell">
              <ZoneBox
                label={CONNECTORS_ZONE.label}
                note={CONNECTORS_ZONE.note}
                items={context.connectors ?? CONNECTORS_ZONE.items}
              />
              <div className="cx-conn" aria-hidden="true">
                <Flow label="context" into="centre-right" />
              </div>
            </div>
          </div>

          {/* CENTER — the record on Unifize, across the §4 stack */}
          <div className="cx-center">
            <span className="cx-center-rail" />
            <div className="cx-center-head">
              <span className="cx-center-kicker mono">Unifize</span>
              <span className="cx-center-title">
                The {context.recordLabel} record
              </span>
            </div>
            <div className="cx-bands">
              {bands.map((b) => (
                <div
                  key={b.name}
                  className={b.lead ? "cx-band cx-band--lead" : "cx-band"}
                >
                  <span className="cx-band-name mono">{b.name}</span>
                  <span className="cx-band-line">{b.line}</span>
                  {b.chips ? (
                    <div className="cx-band-chips">
                      {b.chipsLabel ? (
                        <span className="cx-band-chips-lab mono">
                          {b.chipsLabel}
                        </span>
                      ) : null}
                      {b.chips.map((c) => (
                        <span key={c} className="cx-band-chip mono">
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — horizontal tools + collaboration channels, each flowing into
              the centre at its own height (PLT-2 §3 / §5) */}
          <div className="cx-side cx-side--right">
            <div className="cx-cell cx-cell--right">
              <div className="cx-conn" aria-hidden="true">
                <Flow label="artifacts" into="centre-left" />
              </div>
              <ZoneBox
                label={HORIZONTAL_ZONE.label}
                note={HORIZONTAL_ZONE.note}
                items={context.horizontalTools ?? HORIZONTAL_ZONE.items}
              />
            </div>
            <div className="cx-cell cx-cell--right">
              <div className="cx-conn" aria-hidden="true">
                <Flow label="decisions" into="centre-left" />
              </div>
              <ZoneBox
                label={COLLAB_ZONE.label}
                note={COLLAB_ZONE.note}
                items={context.collaborationChannels ?? COLLAB_ZONE.items}
              />
            </div>
          </div>
        </div>

        {/* PLT-2 §9 callout — verbatim. */}
        <p className="cx-callout">
          <span className="cx-callout-k mono">{CALLOUT_LABEL}</span>
          {CALLOUT_BODY}
        </p>
      </div>
    </section>
  );
}
