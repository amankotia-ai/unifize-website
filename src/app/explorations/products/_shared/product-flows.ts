/* ============================================================================
 * product-flows.ts - shared adapter from the Product Flows + Flow Steps
 * mirrors (Ben's DBs, read-only) to a product page's flow explorer.
 * A flow renders when its Module(s) intersect the page's modules, it is not
 * Deprecated, and its steps exist; anything else is held back with a GAP
 * warning. Chip titles, short descriptions, actor labels, and lifecycle
 * station spans are page-owned presentation, keyed by flow id.
 * ========================================================================== */
import personasMirror from "@/content/notion/personas.json";
import flowsMirror from "@/content/notion/flows.json";
import flowStepsMirror from "@/content/notion/flow-steps.json";
import outcomesMirror from "@/content/notion/outcomes.json";

export type ProductFlowStep = {
  index: number;
  name: string;
  what: string;
  decision: string;
  /* Role-in-the-moment: the hat the persona wears at this step */
  role: string;
  primitives: string[];
};

export type ProductFlowOutcome = {
  name: string;
  /* CT Reduction | Trust | Compliance | Revenue */
  type: string;
};

export type ProductFlow = {
  id: string;
  actor: string;
  title: string;
  fullName: string;
  description: string;
  /* indices into the page's lifecycle states for the stations this flow
   * traverses (sticky-visual layout only; selector layout ignores it) */
  stations: number[];
  steps: ProductFlowStep[];
  /* the Platform Outcomes this flow moves, resolved from the outcomes
   * mirror. All Goal Zero Pending today: present as what gets measured,
   * never as achieved results. */
  outcomes: ProductFlowOutcome[];
};

export type FlowPresentation = Record<string, {
  order: number;
  title: string;
  actor?: string;
  description: string;
  stations: number[];
}>;

export function buildProductFlows({
  page,
  moduleIds,
  presentation,
  /* true: only flows named in the presentation map render (curated pages
   * with many candidate flows); false: unmapped flows render with defaults */
  curate = false,
}: {
  page: string;
  moduleIds: string[];
  presentation: FlowPresentation;
  curate?: boolean;
}): ProductFlow[] {
  const stepsByJourney = new Map<string, ProductFlowStep[]>();
  for (const step of flowStepsMirror) {
    for (const journeyId of step.journey ?? []) {
      const list = stepsByJourney.get(journeyId) ?? [];
      list.push({
        index: step.index ?? 0,
        name: step.name,
        what: step.what,
        decision: step.decision,
        role: step.role ?? "",
        primitives: step.primitives ?? [],
      });
      stepsByJourney.set(journeyId, list);
    }
  }

  const flows: ProductFlow[] = [];
  const uncurated: string[] = [];
  for (const flow of flowsMirror) {
    const touchesPage = (flow.modules ?? []).some((m) => moduleIds.includes(m));
    if (!touchesPage || flow.status === "Deprecated") continue;
    const steps = (stepsByJourney.get(flow.pageId) ?? []).sort((a, b) => a.index - b.index);
    if (steps.length === 0) {
      console.warn(`GAP    ${page} flows: PF-${flow.id} "${flow.name}" has no steps in the mirror. Held back.`);
      continue;
    }
    const pres = presentation[flow.id];
    if (curate && !pres) {
      uncurated.push(`PF-${flow.id}`);
      continue;
    }
    const personaName = personasMirror.find((p) => p.pageId === (flow.persona ?? [])[0])?.name;
    const outcomes = (flow.outcomes ?? [])
      .map((outcomeId) => outcomesMirror.find((o) => o.pageId === outcomeId))
      .filter((o): o is (typeof outcomesMirror)[number] => Boolean(o?.name))
      .map((o) => ({ name: o.name, type: o.type }));
    flows.push({
      id: flow.id,
      actor: pres?.actor ?? personaName ?? "",
      title: pres?.title ?? flow.name,
      fullName: flow.name,
      description: pres?.description ?? "Follow this role from first action to final handoff.",
      stations: pres?.stations ?? [],
      steps,
      outcomes,
    });
  }
  if (uncurated.length > 0) {
    console.warn(`GAP    ${page} flows: ${uncurated.join(", ")} have steps but no presentation entry. Held back until curated.`);
  }
  return flows.sort((a, b) =>
    (presentation[a.id]?.order ?? 100 + Number(a.id)) - (presentation[b.id]?.order ?? 100 + Number(b.id)),
  );
}
