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

/** A trigger on a Solutions page. The industries TriggerRow stops at High;
 *  the rails urgent board never prints severity, so a Solutions page can
 *  carry a Medium moment (24 Sep 2026, procurement: three of its five
 *  triggers are Medium). The non-rails board still lists Urgent and High
 *  only. */
export type SolutionTriggerRow = Omit<TriggerRow, "severity"> & { severity: TriggerRow["severity"] | "Medium" };

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
  /** The rails cell's artifact (SolutionPage `rails`): one small product
   *  surface of this cluster's own record on a wash, with a named cursor on
   *  the step the visitor would touch (the homepage way-in grammar).
   *  Illustrative furniture from the page's arcade world, not a claim. */
  viz?: WorkViz;
}

/** The rails journey rail's solid icons. The first five are quality's
 *  CAPA; the rest give every sibling page its own verbs (23 Sep 2026: no
 *  two pages share a rail, only the closing seal repeats). */
export type JourneyIcon =
  | "escalate" | "cause" | "actions" | "verify" | "seal"
  | "finding" | "impact" | "lock" | "clipcheck"
  | "tray" | "globe" | "link" | "submit"
  | "reject" | "weigh" | "sendout" | "accept"
  | "complaint" | "clock" | "scope" | "tracks"
  | "request" | "ripple" | "board" | "sign" | "golive"
  | "draft" | "comments" | "approve" | "publish" | "retire"
  | "cascade" | "assign" | "ack" | "observe" | "matrix"
  | "hold" | "gather" | "decide" | "release" | "handover"
  | "short" | "options" | "allocate" | "commit" | "notify"
  | "rfq" | "compare" | "score" | "award" | "onboard";

/** A named multiplayer cursor on the step the visitor would touch. */
export interface VizCursor { name: string; tone: string }

type VizWash = "sky" | "blue" | "warm" | "paper";

/** The rails "work inside" cell artifact. `record` (the default, quality's
 *  four cells) is a record card with its steps; every other kind is its own
 *  precise mini-UI, one per cluster, so no two cells on the sibling pages
 *  draw the same widget (23 Sep 2026). Illustrative furniture from each
 *  page's arcade world, never a claim. Rendered by solution-work-viz.tsx. */
export type WorkViz =
  | { kind?: "record"; wash: VizWash; cursor: VizCursor; kicker: string; state: string; title: string; rows: { label: string; meta: string; open?: boolean }[] }
  /** systems down, checks across: the validated estate at a glance */
  | { kind: "matrix"; wash: VizWash; cursor?: VizCursor; kicker: string; cols: string[]; rows: { name: string; cells: ("ok" | "due" | "gap")[] }[] }
  /** one source (a rule) fanning out to what it touches */
  | { kind: "impact"; wash: VizWash; cursor?: VizCursor; source: { kicker: string; title: string }; items: { id: string; label: string; open?: boolean }[] }
  /** a report form being filled on the floor */
  | { kind: "form"; wash: VizWash; cursor?: VizCursor; kicker: string; title: string; fields: { label: string; value: string; select?: boolean; focus?: boolean }[] }
  /** a signature block across two organisations */
  | { kind: "signoff"; wash: VizWash; cursor?: VizCursor; kicker: string; title: string; signers: { org: string; name: string; meaning: string; time?: string }[] }
  /** a submission as a fanned stack of sheets, its citation checked live */
  | { kind: "dossier"; wash: VizWash; cursor?: VizCursor; kicker: string; title: string; cite: string; state: string }
  /** a statutory clock as one day axis, today and the deadlines marked */
  | { kind: "clock"; wash: VizWash; cursor?: VizCursor; kicker: string; title: string; day: number; span: number; marks: { day: number; label: string }[] }
  /** a product label with its UDI, and where the approved change has landed */
  | { kind: "label"; wash: VizWash; cursor?: VizCursor; product: string; lines: string[]; version: string; endpoints: { name: string; done: boolean }[] }
  /** a regulatory-intelligence feed, the binding item routed */
  | { kind: "feed"; wash: VizWash; cursor?: VizCursor; kicker: string; items: { source: string; title: string; tag: string; hot?: boolean }[] }
  /** a supplier scorecard with its approval status */
  | { kind: "scorecard"; wash: VizWash; cursor?: VizCursor; name: string; status: string; metrics: { label: string; value: number }[] }
  /** the part-approval package as a grid of elements */
  | { kind: "tiles"; wash: VizWash; cursor?: VizCursor; kicker: string; title: string; total: number; open: number[]; foot: string }
  /** the hold tag on the lot at the dock */
  | { kind: "tag"; wash: VizWash; cursor?: VizCursor; stamp: string; lines: { k: string; v: string }[]; note: string }
  /** one thread, two companies */
  | { kind: "thread"; wash: VizWash; cursor?: VizCursor; kicker: string; messages: { org: string; text: string; ext?: boolean }[] }
  /** complaints per week, the spike flagged */
  | { kind: "signal"; wash: VizWash; cursor?: VizCursor; kicker: string; title: string; weeks: number[]; spike: number; note: string }
  /** the reportability decision, question by question */
  | { kind: "decision"; wash: VizWash; cursor?: VizCursor; kicker: string; steps: { q: string; a: string }[]; outcome: string }
  /** four tracks running in parallel against one record */
  | { kind: "lanes"; wash: VizWash; cursor?: VizCursor; kicker: string; lanes: { name: string; owner: string; pct: number }[] }
  /** one installed unit and its service history */
  | { kind: "asset"; wash: VizWash; cursor?: VizCursor; serial: string; model: string; visits: { label: string; when: string; now?: boolean }[] }
  /* change control (24 Sep 2026) */
  /** a document redline, one line struck and one inserted, the approvers under it */
  | { kind: "redline"; wash: VizWash; cursor?: VizCursor; doc: string; from: string; to: string; lines: { text: string; mark?: "del" | "ins" }[]; approvers: { name: string; done: boolean }[] }
  /** a bill of materials, the revised line bumped and what has to follow it */
  | { kind: "bom"; wash: VizWash; cursor?: VizCursor; kicker: string; title: string; rows: { part: string; name: string; rev: string; next?: string; depth: 0 | 1 | 2 }[]; foot: string }
  /** a component's lifecycle as stages, the one it is in marked, the buy window under it */
  /* document & records control (24 Sep 2026) */
  /** a controlled document page, its state watermarked across it, the title block under it */
  | { kind: "watermark"; wash: VizWash; cursor?: VizCursor; doc: string; title: string; version: string; mark: string; meta: { k: string; v: string }[] }
  /** an artwork proof with numbered markup pins and its language tabs */
  | { kind: "artwork"; wash: VizWash; cursor?: VizCursor; file: string; langs: string[]; lang: number; pins: { n: number; note: string; open?: boolean }[] }
  /** a periodic access review: who holds which role, one to revoke */
  | { kind: "access"; wash: VizWash; cursor?: VizCursor; kicker: string; system: string; users: { name: string; role: string; flag?: string }[] }
  /* training & competency (24 Sep 2026) */
  /** a revision's sections, the changed ones marked, and the delta-retrain choice */
  | { kind: "delta"; wash: VizWash; cursor?: VizCursor; doc: string; from: string; to: string; sections: { name: string; changed?: boolean }[]; choice: string }
  /** a new hire's ramp plan by week, today's step open */
  | { kind: "onboard"; wash: VizWash; cursor?: VizCursor; name: string; role: string; weeks: { wk: string; step: string; state: "done" | "now" | "next" }[] }
  /** one person's qualification: level pips per competency, one awaiting sign-off */
  | { kind: "levels"; wash: VizWash; cursor?: VizCursor; name: string; role: string; skills: { name: string; level: number; pending?: string }[] }
  /* operations (24 Sep 2026) */
  /** the material review board: held lots by column, one aging */
  | { kind: "mrb"; wash: VizWash; cursor?: VizCursor; kicker: string; cols: { name: string; lots: { id: string; note: string; aging?: boolean }[] }[] }
  /** an electronic traveller as its route of operations, the current one open with its entry */
  | { kind: "route"; wash: VizWash; cursor?: VizCursor; kicker: string; title: string; ops: { op: string; name: string; state: "done" | "now" | "next" }[]; entry: { label: string; value: string } }
  /** one instrument: its reading inside the tolerance band, calibration due */
  | { kind: "instrument"; wash: VizWash; cursor?: VizCursor; id: string; name: string; low: string; high: string; at: number; due: string; owner: string }
  /** customer orders, promised against projected */
  | { kind: "promise"; wash: VizWash; cursor?: VizCursor; kicker: string; orders: { id: string; promised: string; projected: string; state: "ok" | "risk" | "recommit" }[] }
  /* supply chain & planning (24 Sep 2026) */
  /** one part's coverage by week: demand against supply, the short week marked */
  | { kind: "coverage"; wash: VizWash; cursor?: VizCursor; part: string; name: string; weeks: { wk: string; demand: number; supply: number }[] }
  /** a purchase order revision, its changed terms, and the two approvals it waits on */
  | { kind: "po"; wash: VizWash; cursor?: VizCursor; po: string; supplier: string; rev: string; changes: { field: string; from: string; to: string }[]; lanes: { name: string; done: boolean }[] }
  /** a last-time buy worked out to the end of support */
  | { kind: "ltb"; wash: VizWash; cursor?: VizCursor; part: string; name: string; rows: { k: string; v: string; total?: boolean }[]; by: string }
  /* procurement & sourcing (24 Sep 2026) */
  /** a bid evaluation: suppliers side by side, the award on total cost, not price */
  | { kind: "bids"; wash: VizWash; cursor?: VizCursor; kicker: string; rows: string[]; suppliers: { name: string; cells: string[]; pick?: boolean; flag?: number }[] }
  /** a first article check sheet: ballooned characteristics against the drawing */
  | { kind: "fai"; wash: VizWash; cursor?: VizCursor; part: string; drawing: string; rows: { n: number; char: string; nominal: string; actual: string; ok: boolean }[] }
  /** a PO release gate: the supplier's standing checked before the order goes out */
  | { kind: "gate"; wash: VizWash; cursor?: VizCursor; po: string; supplier: string; checks: { label: string; ok: boolean; note: string }[]; verdict: string }
  | { kind: "eol"; wash: VizWash; cursor?: VizCursor; part: string; name: string; stages: string[]; at: number; note: string; alt: { name: string; state: string } };

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
  /** The rails visual (SolutionPage `rails`): the old world as an inbox,
   *  the homepage symptom-card widget none of the page's other visuals use
   *  (Abhishek, 23 Sep 2026: the card read like every other visual, a chart
   *  was the wrong style). The float arrives on top as the audit request. */
  inbox?: {
    label: string;
    meta: string;
    rows: { subject: string; from: string; age: string; unread?: boolean; warn?: boolean }[];
  };
  /** The sibling pages' old worlds (23 Sep 2026), one widget each so no two
   *  Solutions pages stage the leak the same way. Compliance: the
   *  validation folder nobody has opened since the last audit. */
  files?: {
    path: string[];
    rows: { name: string; kind: "pdf" | "doc" | "sheet" | "folder"; meta: string; warn?: boolean }[];
  };
  /** Regulatory affairs: the filed submission, its citation stale against
   *  the register (the page's worst-rated pain). */
  citation?: {
    doc: string;
    section: string;
    before: string;
    cited: string;
    after: string;
    lines: number;
    register: { label: string; value: string };
  };
  /** Supplier management: the SCAR tracker, gone quiet. */
  sheet?: {
    file: string;
    meta: string;
    cols: string[];
    rows: { cells: string[]; warn?: number }[];
    active: string;
  };
  /** Post-market: the recall run from a chat channel, four trackers
   *  arguing about which list is current. */
  /** Change control: the work instruction at the station, still on the
   *  superseded revision, its title block saying so to nobody. */
  printout?: {
    doc: string;
    title: string;
    rev: string;
    effective: string;
    station: string;
    steps: string[];
    /** the step the approved change rewrote (index into steps) */
    changed: number;
  };
  /** Procurement & sourcing: the award slide, price on it, the cost of
   *  quality not. */
  slide?: {
    deck: string;
    title: string;
    bars: { name: string; value: number; label: string; pick?: boolean }[];
    callout: string;
    page: string;
  };
  /** Supply chain & planning: the stand-up notes where the allocation was
   *  decided, the planning system never told why. */
  minutes?: {
    title: string;
    date: string;
    attendees: string;
    bullets: { text: string; faint?: boolean; mark?: boolean }[];
  };
  /** Operations: the escalation call where the hold was released, no
   *  notes, nobody recording. */
  call?: {
    title: string;
    time: string;
    people: { initials: string; name: string; tone: string; speaking?: boolean }[];
    notes: string;
  };
  /** Training & competency: the classroom sign-in sheet, signed, still
   *  not in the matrix. Blank signature = not there. */
  signin?: {
    title: string;
    doc: string;
    date: string;
    rows: { name: string; signed: boolean }[];
    foot: string;
  };
  /** Document & records control: the same procedure in three places at
   *  three versions, the one in front of the operator the oldest. */
  copies?: {
    doc: string;
    items: { where: string; version: string; note: string; state: "current" | "stale" | "used" }[];
  };
  chat?: {
    channel: string;
    meta: string;
    messages: { who: string; initials: string; tone: string; text: string; time: string; file?: string }[];
  };
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
  /** The rails list's one line under the failure named (SolutionPage
   *  `rails`), condensed from the body; the body renders off the rails. */
  short?: string;
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

  /** @deprecated page SEO lives in explorations/_shared/seo.ts */
  meta?: { title: string; description: string };

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
    /** `tail` finishes the rails cost line after the value (default: "That
     *  waiting is the coordination tax."), so each page names its own cost */
    tax: { label: string; value: string; meta: string; tail?: string } | null;
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
    /** The rails journey rail (SolutionPage `rails`): per step a short
     *  title, one ~10-word line grounded in the arcade pose it drives, and a
     *  solid icon in place of the number. Falls back to the trail. */
    steps?: { title: string; body: string; icon: JourneyIcon }[];
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

  /** 07 · The moments it turns urgent. `featured` (names, in order) picks
   *  the three the compact rails board shows; without it the board takes
   *  the first rows, Urgent before High. */
  triggers: { heading: string; lede: string; rows: SolutionTriggerRow[]; featured?: string[] };

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
    /** The rails section (SolutionPage `rails`): the platform page's three
     *  bands, flat. Systems of record left, Unifize between, the channels
     *  where decisions leaked right; one lede and one note, no selector. */
    bands?: {
      lede: string;
      /** vendors named under the systems-of-record band */
      vendors?: string[];
      /** the no-system case, one line under the bands */
      note: string;
      /** the page's own right-hand band (23 Sep 2026): where decisions leak
       *  for THIS work (the supplier side, escalation calls, binders), so
       *  the drawing tells the page's boundary story, not quality's */
      tools?: { title: string; sub: string; names: string[]; label: string; body: string };
      /** the four arrow labels, in drawing order: records -> Unifize,
       *  Unifize -> records, tools -> Unifize, Unifize -> tools */
      flows?: { contextIn: string; back: string; captured: string; linked: string };
      /** what flows back, the centre band's note */
      back?: string;
    };
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
    /** The rails reel (SolutionPage `rails`): a curated roster of customer
     *  stills by Wistia id, each with the one thing that customer attests,
     *  taken from the film's own title. Films outside governance drop out
     *  in the adapter; without a roster the reel falls back to filmTags with
     *  each film's title as its fact. */
    stills?: { wistia: string; fact: string }[];
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
