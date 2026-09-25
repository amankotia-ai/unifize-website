/* ============================================================================
 * persona-source.ts - the persona pages' adapter over the Notion mirrors
 * (src/content/notion/*.json, written by scripts/notion/sync-sources.mjs).
 *
 * Same contract as the product adapters (product-audience.ts,
 * product-flows.ts): Notion decides membership, the page decides
 * presentation. A persona page names the pains, roles and flows it wants to
 * show by Notion id; each one renders only while the mirror still relates it
 * to the persona. Anything Notion no longer backs is held back with a GAP
 * warning at build time, never rendered from stale page copy.
 *
 *   personas.json     who the persona is: name, titles, tier
 *   pain-points.json  Pain Points DB, related by "Product Personas Affected"
 *   roles.json        Product Roles DB, related by "Personas Typically
 *                     Holding This Role"
 *   flows.json + flow-steps.json   Product Flows, related by "Primary
 *                     Persona", with their Flow Steps
 * ========================================================================== */
import personasMirror from "@/content/notion/personas.json";
import painPointsMirror from "@/content/notion/pain-points.json";
import rolesMirror from "@/content/notion/roles.json";
import flowsMirror from "@/content/notion/flows.json";
import flowStepsMirror from "@/content/notion/flow-steps.json";

type PersonaRow = (typeof personasMirror)[number];

export type PersonaFacts = {
  pageId: string;
  id: string;
  name: string;
  tier: string;
  /* the customer-facing titles for the same seat */
  titles: string[];
};

export type PersonaPain = {
  id: string;
  /* the Notion name, and the page's shorter handle for it */
  name: string;
  title: string;
  short: string;
  severity: string;
};

export type PersonaRole = {
  id: string;
  name: string;
  permissions: string;
};

export type PersonaFlowStep = {
  index: number;
  name: string;
  what: string;
};

export type PersonaFlow = {
  id: string;
  name: string;
  steps: PersonaFlowStep[];
};

const splitList = (text: string) =>
  text
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

/* Title Variants when Notion has them. The Quality Manager row keeps its
 * titles in the Description instead ("Common titles: A, B, C."), so that
 * sentence is the fallback: still Notion's words, never the page's. */
function titlesOf(row: PersonaRow): string[] {
  if (row.titles) return splitList(row.titles);
  const common = row.description.match(/Common titles:\s*([^.]+)\./);
  return common ? splitList(common[1]) : [];
}

export function personaFacts(id: string): PersonaFacts {
  const row = personasMirror.find((p) => p.id === id);
  if (!row) {
    throw new Error(`persona-source: ${id} is not in src/content/notion/personas.json. Sync or seed it before building its page.`);
  }
  return { pageId: row.pageId, id: row.id, name: row.name, tier: row.tier, titles: titlesOf(row) };
}

/* The pains a page picks, in the page's order. Each renders only while the
 * Pain Points DB still names this persona as affected. */
export function personaPains(
  persona: PersonaFacts,
  picks: { id: string; title?: string; short: string }[],
): PersonaPain[] {
  return picks.flatMap((pick) => {
    const row = painPointsMirror.find((p) => p.id === pick.id);
    if (!row || !row.personas.includes(persona.pageId)) {
      console.warn(`GAP    persona ${persona.id}: pain ${pick.id} is ${row ? "no longer related to this persona" : "not in the pain-points mirror"}. Held back.`);
      return [];
    }
    return [{ id: row.id, name: row.name, title: pick.title ?? row.name, short: pick.short, severity: row.severity }];
  });
}

/* Every Product Role this persona holds, in Notion id order. Roles are read
 * by name: the DB carries one role twice (Disposition Approver, PRL-6 and
 * PRL-7), and the page should show it once. */
export function personaRoles(persona: PersonaFacts): Map<string, PersonaRole> {
  const held = new Map<string, PersonaRole>();
  for (const row of rolesMirror) {
    if (!row.personas.includes(persona.pageId) || held.has(row.name)) continue;
    held.set(row.name, { id: row.id, name: row.name, permissions: row.permissions });
  }
  return held;
}

/* One Product Flow this persona is the primary persona on, with its steps
 * in order. Held back (null) if the flow moved to another persona, was
 * deprecated, or has no steps. Flow ids are the mirror's (PF-2 is "2"). */
export function personaFlow(persona: PersonaFacts, flowId: string): PersonaFlow | null {
  const flow = flowsMirror.find((f) => f.id === flowId);
  if (!flow || flow.status === "Deprecated" || !(flow.persona ?? []).includes(persona.pageId)) {
    console.warn(`GAP    persona ${persona.id}: PF-${flowId} is ${flow ? "not this persona's live flow" : "not in the flows mirror"}. Held back.`);
    return null;
  }
  const steps = flowStepsMirror
    .filter((step) => (step.journey ?? []).includes(flow.pageId))
    .map((step) => ({ index: step.index ?? 0, name: step.name, what: step.what }))
    .sort((a, b) => a.index - b.index);
  if (steps.length === 0) {
    console.warn(`GAP    persona ${persona.id}: PF-${flowId} has no steps in the mirror. Held back.`);
    return null;
  }
  return { id: flow.id, name: flow.name, steps };
}
