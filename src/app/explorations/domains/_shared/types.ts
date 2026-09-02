/* ============================================================================
 * Domain (Solutions) page template — data contract.
 *
 * "Domains" is the internal name (the Notion Domains DB under The Problem
 * Architecture); externally the nav packages these pages as SOLUTIONS. One
 * `DomainPageData` object drives the whole page; `_shared/DomainPage` renders
 * it in the ITM design system (same language as the industry template).
 *
 * The arc, per the 2026-07-09 Website Rebuild call (Ben / Lakshman / Abhishek):
 * problem-led hero -> parity ("the work inside", from Themes) -> the leak
 * (Pain Points, severity-graded) -> differentiation (decision-trace flow) ->
 * the L1 ingress block: by industry / by module / by role / by moment ->
 * proof -> close. Products lead with the solution; these pages lead with the
 * problem.
 *
 * PROVENANCE RULE (unchanged from the industries kit): every value a page
 * surfaces must trace to a canonical Notion database. Each domain data file
 * carries `// source:` comments back to the Domains DB row and its relations
 * (Themes, Pain Points, Customer JTBDs, Modules, Products, Product Personas,
 * Trigger Events). Where Notion has no canonical figure (per-domain dollar
 * costs), the page carries the qualitative cost from the pain map rather than
 * an invented number — `leaks.tax` is nullable for domains with nothing honest
 * to say. The hero stats are honest COUNTS of canonical rows, never invented
 * metrics.
 * ========================================================================== */

import type { ReactNode } from "react";
import type { MapDomain, PersonaCard, TriggerRow } from "../../industries/_shared/types";
import type { ArcadeStepConfig } from "../../products/_shared/arcade/arcade";

/** The live product layer (see _shared/domain-arcade.tsx): one
 *  ArcadeStepConfig per `flow.trail` row, in the same order, walking the
 *  domain's OWN record (the CAPA, the finding, the SCAR, the field action,
 *  the change) through the shared stylized-arcade engine. The hero cycles
 *  the same journey (`heroOrder` indexes into `steps`; defaults to
 *  [1, 2, 3, 4, 0] — open on the strongest establishing frame, then loop).
 *  Facts inside the journey follow the page's provenance rule: record
 *  vocabulary, actors and clocks come from the domain's canonical trail and
 *  pain map, never invented metrics. */
export interface DomainArcadeJourney {
  steps: ArcadeStepConfig[];
  heroOrder?: number[];
}

/** Pain Points DB severity scale (Critical / High / Medium; Low unused on page). */
export type PainSeverity = "Critical" | "High" | "Medium";

/** The six flagship workstream glyphs (outline, one per hero-chip theme). */
export type WorkGlyph = "loop" | "pulse" | "box" | "doc" | "chat" | "scale";

/** One workstream from the Themes DB. */
export interface WorkItem {
  name: string;
  /** One line distilled from the Theme's Description field. */
  line: string;
  /** Where this workstream actually runs, when a live page exists. */
  href?: string;
  hrefLabel?: string;
}

/** A buyer-vocabulary cluster of workstreams — section 01 renders groups, not
 *  a flat wall, so 18 themes stay consumable. Copy rule for the whole section:
 *  buyer vocabulary only — internal system words (canonical, pain map,
 *  register, taxonomy) never reach the page. */
export interface WorkGroup {
  name: string;
  /** One line saying what this cluster is, in the buyer's words. */
  line: string;
  glyph: WorkGlyph;
  items: WorkItem[];
  /** The journey ingress: where this cluster runs today (live page only). */
  runsIn?: { label: string; href: string };
}

/** One row of the section-02 "old world" artifact (see LeakScene). */
export interface LeakSceneRow {
  state: "done" | "wait" | "idle";
  label: string;
  age: string;
  /** the age carries the warn tone (the clock that is actually running) */
  warn?: boolean;
}

/** Section 02's stylized evidence artifact — ONE coherent surface of the old
 *  world (a tracker, an inbox, a binder) staged in the same mini-UI grammar
 *  as the homepage's symptom scenes: square corners, hairlines, status by
 *  icon + label color, never a colored edge, never a fragment collage. The
 *  rows dramatize the domain's own pain map; the caption says what it is. */
export interface LeakScene {
  /** title-bar kicker (the artifact's name: "CAPA-0091", "SCAR tracker.xlsx") */
  kicker: string;
  /** title-bar right chip (the clock that hurts: "Day 90", "47 unread") */
  chip: string;
  title: string;
  rows: LeakSceneRow[];
  /** the layered interruption chip (a question arriving from outside) */
  float?: { kicker: string; note: string };
  /** one line under the artifact naming the failure it stages */
  caption: string;
}

/** One failure mode from the Pain Points DB. */
export interface PainRow {
  name: string;
  body: string;
  severity: PainSeverity;
  /** Where the decision leaks to — the DMS coordination-tax "surface" tag
   *  (Email, Spreadsheets, Floor walks, Audit day…), condensed from the
   *  pain's Description. */
  surface: string;
}

/** One row of the by-industry fan-out (the L1 ingress Ben described:
 *  "quality for medical devices"). Links to the live industry pages. */
export interface IndustryRow {
  name: string;
  /** The domain instanced in that industry's own workstream vocabulary. */
  line: string;
  /** The regulatory frame as mono tags (from the industry's canonical chips). */
  chips: string[];
  href: string;
}

/** One path of the coexistence answer (the page spec's Path A / B / C).
 *  Copy rule: every capability named must be canonical (live modules, the
 *  Part 11 e-signature claim); never author integration mechanics that
 *  engineering hasn't stated. */
export interface CoexistPath {
  id: "have" | "none" | "weak";
  /** Selector option, in the buyer's words ("We run a dedicated eQMS"). */
  label: string;
  /** Vendor names the buyer recognizes (shown as a quiet reassurance line). */
  vendors?: string[];
  heading: string;
  body: ReactNode;
  diagram: {
    /** The Unifize band's role line for this path. */
    role: string;
    /** Capability chips inside the band. */
    chips: string[];
    /** Boxes under the band: kept systems of record, lanes Unifize
     *  provides, or the gap Unifize fills. */
    boxes: { name: string; note: string; kind: "sor" | "unifize" | "gap" }[];
    caption: string;
  };
}

/** A named customer reference (real, verifiable — never placeholder people). */
export interface ProofReference {
  tag: string;
  name: string;
  desc: string;
  /** Optional ingress when the reference's workstreams have a live page
   *  elsewhere (e.g. document control & training → the DMS product). */
  link?: { label: string; href: string };
}

export interface DomainPageData {
  /** Route slug under /explorations/domains/ (matches the nav dropdown). */
  slug: string;
  name: string;
  /** Domains DB Tier — Primary domains carry the full arc. */
  tier: "Primary" | "Secondary";

  meta: { title: string; description: string };

  hero: {
    crumb: string;
    /** Problem-led split title; the second clause takes the muted turn. */
    titleLead: string;
    titleTurn: string;
    sub: ReactNode;
    /** Parity chips — the work inside, from Themes (not standards). */
    chips: string[];
    /** Floating evidence cards over the hero stage (glass, decorative). */
    floats?: { kind: "seal" | "clock"; title: string; meta: string }[];
    /** The trust-strip slot, made buyer-meaningful: the industries this
     *  domain runs in, as live links, with a "+N more" into the fan-out. */
    runsIn: {
      label: string;
      links: { name: string; href: string }[];
      more: { label: string; href: string };
    };
  };

  /** 01 · Parity beat: the Themes map, clustered into buyer-vocabulary
   *  groups with journey ingress links into the live products. */
  work: { heading: string; lede: string; groups: WorkGroup[] };

  /** 02 · The leak: severity-filterable pain register + the honest cost band.
   *  `scene` stages the old world as one stylized artifact beside the head. */
  leaks: {
    heading: string;
    lede: string;
    scene?: LeakScene;
    pains: PainRow[];
    /** Provenance note under the card grid. */
    note: string;
    /** Qualitative cost from the pain map; null when nothing canonical. */
    tax: { label: string; value: string; meta: string } | null;
  };

  /** 03 · Differentiation: the decision-trace flow (same shape as the
   *  industry template's difference section). When `arcade` is present the
   *  section renders as the live pinned scroll story — the trail drives the
   *  camera — and the hero swaps its static shot for the same journey;
   *  without it, the static ChatShell mock renders (the pre-arcade look). */
  flow: {
    heading: string;
    lede: string;
    trailLabel: string;
    trail: { t: string; who: string; when: string }[];
    trailFoot: string;
    chatVariant: "capa" | "change-control";
    shellUrl: string;
    mobileLabel: string;
    mobileId: string;
    arcade?: DomainArcadeJourney;
  };

  /** 04 · L1 fan-out by industry. */
  industries: { heading: string; lede: string; rows: IndustryRow[]; foot: string };

  /** 05 · The modules that run it, grouped by Product (QMS / LIMS / CI ...).
   *  Reuses the industries kit's ModuleIndex, so groups are MapDomain-shaped. */
  coverage: { heading: string; lede: string; standardFilters: string[]; groups: MapDomain[] };

  /** 06 · Who owns it. */
  personas: { heading: string; lede: string; cards: PersonaCard[] };

  /** 07 · The moments it turns urgent. */
  triggers: { heading: string; lede: string; rows: TriggerRow[] };

  /** 08 · Coexistence — Unifize as the coordination layer over the systems of
   *  record already in place (same section as the industry template; panel
   *  finding: the integration story was missing from the domain page).
   *  `paths` adds the page spec's three-path answer (have a system / have
   *  none / have one with gaps) with the "where is yours today?" selector —
   *  the panel's top finding was the page answering replace-vs-coexist both
   *  ways, so the paths make BOTH true, explicitly, per situation. Without
   *  `paths` the section renders the single-story fallback. */
  coexistence: {
    heading: string;
    systemsOfRecord: string[];
    body: ReactNode;
    diagramCaption: string;
    /** Selector label, e.g. "Where is your QMS today?" */
    selectorLabel?: string;
    paths?: CoexistPath[];
  } | null;

  /** 09 · Proof — REAL evidence only: the customer-attested signed baseline
   *  plus named, verifiable references (source: MD_PROOF canonical data).
   *  Panel finding: placeholder people/stats poison every number on the page.
   *  Null hides the section for domains with nothing honest to show. */
  proof: {
    heading: string;
    lede: string;
    attested: { label: string; stat: string; statLabel: string; body: string; note: string };
    /** Module tags into the Website Customer Videos mirror (Notion-governed;
     *  see products/_shared/customer-films.ts). When present, the section
     *  renders the real customer-film rail: the attested stat leads, films
     *  whose tags intersect follow. Governance stays in the adapter — an
     *  unapproved film simply never renders. */
    filmTags?: string[];
    references: ProofReference[];
    foot: { label: string; href: string };
  } | null;

  /** Compliance & trust block — RENDER-READY SCAFFOLD, REAL FACTS ONLY.
   *  Part 11 / Annex 11 posture, audit-trail integrity properties,
   *  e-signature manifestation, certifications (SOC 2 / ISO 27001), vendor
   *  validation package, SaaS release/change-control policy. The panel's
   *  validation persona called the absence demo-blocking; it must be filled
   *  from engineering/compliance facts, never authored as marketing copy.
   *  Keep null until those facts are supplied. */
  trust: {
    heading: string;
    lede: string;
    points: { title: string; body: string }[];
    foot?: string;
  } | null;

  /** "Build the internal case" champion kit — artifacts a forwarding champion
   *  carries into the budget argument (pilot structure with exit criteria,
   *  implementation footprint, per-trigger one-pagers, ROI inputs, plus the
   *  auditor's-eye sample sealed trace). Panel finding: 4/5 personas forward
   *  this page rather than book; the page must arm the forwarder. Keep null
   *  until the artifacts are real. */
  caseKit: {
    heading: string;
    lede: string;
    items: { title: string; body: string; href?: string; cta?: string }[];
    note?: string;
  } | null;

  /** The land-and-expand journey: where teams go after this domain, with
   *  live-page ingress links where they exist and honest "coming" notes where
   *  they don't. Carries the "grows with your org" close of the story. */
  growth: {
    heading: string;
    lede: string;
    steps: { name: string; note: string; href?: string }[];
  } | null;

  close: { eyebrow: string; heading: string; lede: string };
}
