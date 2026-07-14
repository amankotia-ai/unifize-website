/* ============================================================================
 * Industry page template — data contract.
 *
 * The Medical Devices instance at /explorations/industry-template-modern is the
 * reference implementation of this template. This kit generalises that page so
 * every other industry is a data file, not a copy. One `IndustryData` object
 * drives the whole page; the `_shared/IndustryPage` server component renders it.
 *
 * PROVENANCE RULE (from the 2026-06-24 call with Ben): every value a page
 * surfaces must trace to a canonical Notion database. Each industry data file
 * carries `// source:` comments back to the Industries DB row and the linked
 * databases (Trigger Events, Domains, External Standards). Where Notion has no
 * canonical value (per-event dollar costs, named customer stories for pre-proof
 * segments), the page states the evidence standard rather than inventing facts.
 * ========================================================================== */

import type { ReactNode } from "react";

/** One module — a door into the platform, grouped under a coordination domain. */
export interface MapModule {
  name: string;
  blurb: string;
  /** Standards this module helps evidence (subset, for the filter chips). */
  standards?: string[];
  /** Live module page, if one exists yet. None do for these industries today. */
  href?: string;
  /** Honest status label for modules with no live page (e.g. "In development").
   *  Unlabelled unlinked cards read as roadmap dressed as product. */
  soon?: string;
}

/** A coordination domain — the grouping the coverage ledger reads by. */
export interface MapDomain {
  slug: string;
  name: string;
  tier: "Primary" | "Secondary";
  /** One line on why this domain carries coordination tax in this industry. */
  promise: string;
  modules: MapModule[];
}

/** A statutory / operational moment that starts a clock, for the trigger board. */
export interface TriggerRow {
  name: string;
  /** The clock, condensed from the trigger's Regulatory Framework field. */
  clock: string;
  severity: "Urgent" | "High";
  /** The module this routes into. */
  routesTo: string;
  /** The role that owns the response. */
  owner: string;
  /** Live destination, if one exists. */
  href?: string;
}

/** The five first-class buyer roles (the "by your role" ingress). Keys are
 *  stable across industries so the explorer can keep one icon + interaction
 *  model; the copy is tuned per industry from its canonical vocabulary. */
export type PersonaIcon =
  | "quality"
  | "operations"
  | "regulatory"
  | "compliance-validation"
  | "engineering";

export interface PersonaCard {
  key: string;
  /** Which of the five role glyphs to show. */
  iconKey: PersonaIcon;
  name: string;
  /** Customer-facing stake (never the internal sales-funnel tag). */
  stake: string;
  titles: string[];
  /** "With Unifize" value statement — benefit, no invented metrics. */
  value: string;
  /** " · "-separated chips. */
  cares: string;
  worries: string;
  href?: string;
  anchor?: string;
  primary?: boolean;
}

/** A named coordination event for the cost ledger. No per-event dollar figure:
 *  Notion has none for these segments, so the canonical per-company tax below
 *  carries the number and each event carries its qualitative load instead. */
export interface CoordinationEvent {
  name: string;
  /** The cross-functional coordination it demands (shown under the name). */
  coordination: string;
  owner: string;
  /** What is at risk while it stalls (cycle / deadline framing). */
  atRisk: string;
}

export interface ConsequenceGroup {
  type: string;
  items: string[];
}

export interface ValidatedPoint {
  icon: "stack" | "shield" | "chat";
  label: string;
  body: string;
}

export interface IndustryData {
  /** Route slug under /explorations/industries/. */
  slug: string;
  name: string;

  meta: { title: string; description: string };

  hero: {
    crumb: string;
    /** Title split so the second clause can take the accent turn. */
    titleLead: string;
    titleTurn: string;
    sub: ReactNode;
    /** Regulatory-frame chips (top standards from Regulatory Vocabulary). */
    chips: string[];
    trustLabel: string;
  };

  difference: {
    heading: string;
    lede: string;
    trailLabel: string;
    trail: { t: string; who: string; when: string }[];
    trailFoot: string;
    chatVariant: "capa" | "change-control";
    shellUrl: string;
    mobileLabel: string;
    mobileId: string;
  };

  ingress: { role: string; modules: string; breaking: string };

  personas: { heading: string; lede: string; cards: PersonaCard[] };

  coverage: {
    heading: string;
    lede: string;
    standardFilters: string[];
    domains: MapDomain[];
  };

  triggers: { heading: string; lede: string; rows: TriggerRow[] };

  coexistence: {
    heading: string;
    systemsOfRecord: string[];
    approval: string;
    body: ReactNode;
    diagramCaption: string;
  };

  cost: {
    heading: string;
    events: CoordinationEvent[];
    consequences: ConsequenceGroup[];
    economics: {
      companies: number;
      employees: number | null;
      /** Null where Notion has no segment tax figure; the stakes figure is then
       *  omitted rather than invented (e.g. Nutritional Supplements). */
      annualTaxLow: number | null;
      annualTaxHigh: number | null;
    };
    stakesMeta: string;
  };

  validated: {
    eyebrow: string;
    headline: string;
    points: ValidatedPoint[];
    cta: string;
  };

  /** The proof section, stated to the evidence standard the buyer demands —
   *  the honest treatment for segments with no shippable named references yet. */
  proof: {
    heading: string;
    lede: string;
    /** What proof looks like in this segment (from the Proof Requirement field). */
    points: string[];
    /** Honest maturity note (Proof Maturity field). */
    maturityNote: string;
  };

  close: { eyebrow: string; heading: string; lede: string };
}
