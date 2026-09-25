/* ============================================================================
 * types.ts - the persona page on the rails (PersonaRailsPage).
 *
 * A page brings its Notion ids (persona, pains, roles, flows) and the
 * presentation around them; persona-source.ts resolves the ids against the
 * mirrors, so membership stays Notion's. Framing and headlines are authored;
 * every fact on the page traces to a Notion row or a real customer film.
 * ========================================================================== */
import type { ArcadeStepConfig } from "../../products/_shared/arcade/arcade";
import type { JourneyIcon, WorkViz } from "../../domains/_shared/types";
import type { IconName } from "../../_shared/nav-data";

/** One tab of the hero (the homepage's tabs over the window): its label,
 *  its nav glyph, and the window's pose while it is the active tab. */
export interface PersonaHeroStep {
  label: string;
  icon: IconName;
  config: ArcadeStepConfig;
}

/** 02's old-world artifact: the legacy system's search for one defect,
 *  every past case closed on its own. Same frame as the Solutions leak
 *  widgets (sk-ib), its own window (pn-hist, persona-rails.css). */
export interface HistoryScene {
  kicker: string;
  meta: string;
  query: string;
  rows: {
    id: string;
    when: string;
    title: string;
    capa: string;
    state: string;
    /** the line that should worry the reader (effectiveness never shown) */
    note: string;
    warn?: boolean;
  }[];
  float?: { kicker: string; note: string };
  caption: string;
}

export interface PersonaRailsData {
  /** Product Personas ID, e.g. "PPS-2" */
  personaId: string;
  /** the page's public path, for its share card and canonical */
  path: string;

  hero: {
    titleLead: string;
    titleTurn: string;
    sub: string;
    secondary: { label: string; href: string };
    /** the Product Flow the hero walks, checked against the persona; the
     *  first step opens on the persona's home screen */
    flowId: string;
    steps: PersonaHeroStep[];
  };

  /** the trust strip: the persona's titles, from Notion */
  titlesLabel: string;

  /** 01 · the roles this persona holds on the record (Product Roles) */
  seat: {
    heading: string;
    lede: string;
    groups: {
      name: string;
      line: string;
      viz: WorkViz;
      /** Product Role names; a role the persona no longer holds drops out */
      roles: string[];
    }[];
    /** where each role's work lives on the site */
    links: Record<string, { module: string; product: string; href: string }>;
  };

  /** 02 · where it breaks (Pain Points) */
  breaks: {
    heading: string;
    lede: string;
    picks: { id: string; title?: string; short: string }[];
    scene: HistoryScene;
    tail: string;
  };

  /** 03 · the difference: one of the persona's Product Flows, walked */
  journey: {
    heading: string;
    lede: string;
    flowId: string;
    /** one entry per shown step, by the flow's step index */
    steps: { index: number; title: string; body: string; icon: JourneyIcon }[];
    /** the arcade pose for each flow step, keyed by step index */
    configs: Record<number, ArcadeStepConfig>;
  };

  /** 04 · peers on film (Website Customer Videos, governance applied) */
  proof: {
    heading: string;
    lede: string;
    lead?: { wistia: string; stat: string; statLabel: string };
    stills: { wistia: string; fact: string }[];
  };

  close: {
    eyebrow: string;
    heading: string;
    lede: string;
    secondary: { label: string; href: string };
  };

  footer: { tagline: string; note: string };
}
