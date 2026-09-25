"use client";

/* ============================================================================
 * arcade.tsx - the shared stylized-arcade system: ONE persistent app window
 * (rail, inbox, conversation, checklist, home, reports) and a camera that
 * moves between poses. A journey = an ArcadeFlowWorld + one ArcadeStepConfig
 * per step. Lifted from dms/stylized on 2026-08-06 so every product page
 * (DMS, QMS, MES, PLM) journeys through the same primitives; the CSS travels
 * with the component via ./arcade.css scoped under .stx-root.
 * ========================================================================== */
import "./arcade.css";
import "./arcade-screens.css";

export type ArcadeFocus =
  | "search"
  | "queue"
  | "record"
  | "viewer"
  | "print"
  | "issue"
  | "diff"
  | "comment"
  | "signature"
  | "training"
  | "review"
  | "tasks"
  | "history"
  | "trace"
  | "dashboard"
  | "builder"
  | "checklist"
  | "assist"
  /* 26 Sep 2026, from the Sep 16 product recordings: the chart drill-down
   * report, the saved-dashboards page, a record opened as a quick-view modal
   * over whatever page is behind it, the start-new-record dialog over home,
   * and the composer with the @mention list open */
  | "report"
  | "dashboards"
  | "modal"
  | "start"
  | "mention";

/* Chart colours as the app draws them: one indigo for a single series, the
 * stacked palette for series and donut slices. */
export type ArcadeTone = "indigo" | "violet" | "teal" | "amber" | "rose" | "lilac" | "green" | "sky";

/* One chart, drawn the way the app draws it on a home tile, a dashboard card
 * and the report page: value labels over the bars, a dashed tick grid, a
 * legend under the plot. One series = plain indigo bars with a unit legend
 * ("Days open"); several = stacked bottom up in `series` order; `donut`
 * draws `slices` with their percentage call-outs. */
export type ArcadeChart = {
  title: string;
  kind?: "bars" | "donut";
  series?: { label: string; tone: ArcadeTone }[];
  unit?: string;
  bars?: { label: string; values: number[] }[];
  slices?: { label: string; value: number; tone: ArcadeTone }[];
  max?: number;
  ticks?: number[];
};

/* A thread line in the record modal (and the record thread): date pills,
 * the "View N updates" rule, system events ("You removed Charlie Johnson"),
 * field-update cards, and messages (a person's, or the Unifize Assistant's
 * reminder with its "Turn off reminders" link). */
export type ArcadeThreadItem =
  | { kind: "date"; text: string }
  | { kind: "updates"; count: number; open?: boolean }
  | { kind: "event"; who: string; text: string; strong?: string }
  | { kind: "field"; who: string; field: string; value: string }
  | { kind: "message"; who: string; text: string; mention?: string; link?: string; time?: string; assistant?: boolean };

/* The composer mid-typing: the text after an @mention, and the mention list
 * above it (groups, or people with their email line) with one row hovered. */
export type ArcadeComposer = {
  mention?: string;
  text?: string;
  picker?: { all?: boolean; rows: { name: string; note: string }[]; active?: number };
};

/* A checklist item is not just a check mark (Ben, Aug 5): plain rows carry
 * facts, `field` rows carry data entry (an input with its entered value),
 * `approval` rows carry a signature state, `revision` rows carry an
 * old-to-new revision, `ask` rows carry the AI button the product puts IN
 * the checklist (value = the button's label, note = its maturity tag, e.g.
 * "Beta"). Kinds change rendering only, never counts, so the
 * sections-never-change-mid-journey rule holds. */
export type ArcadeChecklistItem = {
  label: string;
  note?: string;
  /* signature: the product's "+ Add Signature 1" slot until it is signed;
   * records: embedded records as the app lists them under a field (title
   * link, state chip, owner, date, "View all fields") */
  kind?: "field" | "approval" | "revision" | "linked" | "ask" | "signature" | "records";
  /* field: the entered value shown inside the input */
  value?: string;
  /* field: the input type, drawn as the app draws it: text (default),
   * number, select (a picklist value with its caret), date (calendar mark),
   * rich (rich text; see `lines`), file ("name · size"), user (a person
   * with their avatar) */
  input?: "text" | "number" | "select" | "date" | "rich" | "file" | "user";
  /* field: the empty field's affordance when it differs from the type's
   * default ("+ Add Why (Level 1)") */
  placeholder?: string;
  /* field (rich): rich text as the app renders it; a line starting "# " is
   * a bold heading ("Summary", "What happened") */
  lines?: string[];
  /* records: the embedded records the field holds */
  records?: ArcadeRecordRow[];
  /* linked: the record ids the linked field holds at rest (a step's
   * checklistLinks can grow the list, e.g. when Unifize AI links records) */
  links?: string[];
  /* approval: who signs, and the sealed state ("Signed", "Granted") */
  signer?: string;
  state?: string;
  /* revision: the change the row carries */
  from?: string;
  to?: string;
};
export type ArcadeChecklistSection = { title: string; items: ArcadeChecklistItem[] };

/* An embedded record row (Training Record(s), Impacted document records,
 * Risk Analysis, CAPAs Identification): the "#id: title" link, then its
 * state chip (bell = reminders on), owner, date, and "View all fields". */
export type ArcadeRecordRow = {
  id: string;
  title: string;
  state?: string;
  tone?: "done" | "pending" | "late" | "active" | "review";
  reminder?: boolean;
  owner?: string;
  due?: string;
  late?: boolean;
};

/* Everything that persists for the length of one journey: the workspace, the
 * record's owner, the neighbouring inbox rows, the thread message that
 * precedes the journey's live step, and the record's FULL checklist. Sections
 * and their items never change mid-journey; steps only open/collapse sections
 * and advance completion, the way a live record actually behaves. */
export type ArcadeFlowWorld = {
  team: string;
  /* short record noun for the inbox chip + composer ("Document", "Change Control") */
  recordNoun: string;
  owner: string;
  ownerInitials: string;
  participants: string[];
  participantsLabel: string;
  /* ALL-CAPS kicker on the record-focus status row */
  recordKicker: string;
  /* inbox result line while the search pose is active */
  searchResult?: string;
  /* the logged-in persona when it differs from the record owner (rail avatar,
   * "You" initials, sign dialog); falls back to the owner */
  viewer?: string;
  viewerInitials?: string;
  /* home-screen tiles; their presence mounts the home strip left of the
   * workspace sheet, where queue poses pan */
  homeTiles?: { label: string; count: number; rows?: string[] }[];
  /* the home page's right column as this world's own overview panels
   * (25 Sep 2026, the Quality Manager's home). Absent, the column keeps its
   * generic set dressing (documents by state, updates since you were gone).
   * `bars` draws a small chart under the title; `rows` lists real lines. */
  homeSide?: { title: string; kind: "bars" | "rows"; rows?: string[]; action?: string; tone?: "blue" | "rose" | "green" }[];
  /* reports page; its presence mounts the dashboard page the "dashboard"
   * pose navigates to (same one-window page-change idiom as home) */
  reports?: {
    title: string;
    kpis: { label: string; value: string; note?: string }[];
    panels: { label: string; kind: "bars" | "donut" | "lines" }[];
  };
  /* a record dashboard (25 Sep 2026, modelled on the app's own dashboards:
   * a record type's list with its live meta line, a stacked bar chart by
   * owner, the results toolbar, the applied filters and the table). Its
   * presence replaces the generic reports page on "dashboard" steps. Chart
   * bars stack `values` in `series` order, bottom up; a row's `links` are
   * the cells drawn as links, `target` rings the row the step is about. */
  dashboard?: {
    title: string;
    meta: string[];
    chart: {
      title: string;
      series: { label: string; tone: "violet" | "teal" | "amber" }[];
      bars: { label: string; values: number[] }[];
      max: number;
      ticks: number[];
    };
    results: string;
    primary: string;
    actions: string[];
    filters: string[];
    columns: string[];
    rows: { cells: string[]; links?: number[]; status?: { label: string; tone: "ok" | "due" | "late" }; target?: boolean }[];
  };
  /* the persona's home as the app draws it (Sep 16 recordings: the
   * document controller's and the quality manager's): a section of chart
   * tiles on the left (blue card link, "6 minutes ago" with refresh, export
   * and expand), and on the right Quick Start's "Start New" buttons, the
   * lists that need you ("+ 66 more", "Show All") and shortcut cards. Its
   * presence replaces the homeTiles home. */
  home?: {
    section: string;
    cards: { link: string; updated: string; chart: ArcadeChart }[];
    quickStart?: { title: string; buttons: string[] }[];
    lists?: { title: string; rows: string[]; more?: string }[];
    shortcuts?: { title: string; button: string }[];
  };
  /* the report page a chart drills into: the chart large with the clicked
   * column highlighted, the chart and results toolbars, the filters
   * applied (the clicked bar lands as a filter), the records, and the
   * "Back to Report" footer. A step can carry its own (config.report). */
  report?: ArcadeReport;
  /* the saved dashboards page: the list on the left (named by seat, e.g.
   * "[Quality Manager] Non-Conformances and CARs", with who made it) and
   * the open dashboard's chart cards in a grid */
  dashboards?: {
    list: { name: string; by: string }[];
    active: string;
    by: string;
    cards: ArcadeChart[];
  };
  /* the inbox narrowed to one record type ("Document (1)"), as a drill
   * through "View in Inbox" leaves it */
  inboxFilter?: string;
  /* process-builder page; its presence mounts the settings page the
   * "builder" pose navigates to (same one-window page-change idiom as
   * home/reports): the process's typed field list plus the add-field
   * palette that makes the no-code point. Tones name the chip colors. */
  builder?: {
    title: string;
    note: string;
    tabs: string[];
    fields: { kind: string; tone: string; label: string }[];
    palette: { label: string; note: string; tone: string }[];
  };
  context: { initials: string; name: string; time: string; message: string; detail: string };
  inboxNeighbors: { title: string; time: string; detail: string; kind: string }[];
  /* checklist panel title + the record's stable section list */
  checklistTitle: string;
  checklistSections: ArcadeChecklistSection[];
};

export type ArcadeReport = {
  chart: ArcadeChart;
  updated: string;
  results: string;
  create: string;
  filters: string[];
  columns: string[];
  rows: {
    cells: string[];
    /* the cell index drawn as the record link (default 1) */
    link?: number;
    status?: { label: string; tone: "done" | "pending" | "late" | "review"; reminder?: boolean };
    /* a date cell index drawn red (overdue) */
    late?: number;
    target?: boolean;
  }[];
};

/* The record opened as a quick-view modal over the page behind it: the
 * header (record type and title, state chip, owner, participants, due
 * date, "View in Inbox"), its thread, and the composer. */
export type ArcadeModal = {
  over: "report" | "dashboards" | "record" | "home";
  noun: string;
  id: string;
  title: string;
  state: string;
  tone?: "done" | "pending" | "late" | "review";
  reminder?: boolean;
  owner: string;
  participants: number;
  due: string;
  late?: boolean;
  thread: ArcadeThreadItem[];
  composer?: ArcadeComposer;
};

export type ArcadeStepConfig = {
  source: string;
  ghost: string;
  type: string;
  id: string;
  title: string;
  status: string;
  actor: "automator" | "Unifize Assistant" | "You";
  event: string;
  eventDetail: string;
  checklist: string;
  checklistItems: string[];
  focus: ArcadeFocus;
  focusTitle: string;
  focusRows: string[];
  focusAction?: string;
  ownershipNote?: string;
  /* journey world; falls back to the PF-29 document world */
  world?: ArcadeFlowWorld;
  /* disambiguates consecutive steps that share a focus so the camera still moves */
  poseVariant?: string;
  /* title of the world checklist section expanded this step (others collapse;
   * omit to collapse all) */
  checklistOpen?: string;
  /* done count per section title at this step (missing section = fully done) */
  checklistProgress?: Record<string, number>;
  checklistFootnote?: string;
  /* count badge on the related-records section (default 1) */
  related?: number;
  /* home tile a queue pose lands on (label must match a world homeTile) */
  queueTile?: string;
  /* sealed approvals posted into the thread as signature chat items (they
   * replace the plain context message, which has scrolled away by then) */
  signedItems?: { name: string; initials: string; role: string; approvalId: string; time: string }[];
  /* secondary actions on the review decision card (platform-accurate per
   * moment: a review board can return/reject, a periodic review cannot) */
  focusAlts?: string[];
  /* document name on the viewer attachment when it differs from the record
   * title (e.g. a review record attaching the document under review) */
  docTitle?: string;
  /* ALL-CAPS caption on the focus card (route, training, diff, history);
   * falls back to the DMS-era captions so existing journeys render unchanged */
  focusKicker?: string;
  /* ALL-CAPS kicker on the e-signature dialog; defaults to 21 CFR PART 11
   * (an IATF or AS9100 shop signs under its own frame, not Part 11) */
  signKicker?: string;
  /* the thread so far: earlier steps' messages, oldest first, posted above
   * this step's event so the conversation builds along a journey instead of
   * every pose showing one message (older ones scroll off the top) */
  /* "Person" (25 Sep 2026): a colleague's earlier message, shown under
   * their name with a neutral avatar, like the thread's opening message.
   * `kind: "event"` renders the app's grey system pill instead ("Anush
   * Kumar assigned Rachel John as the owner"); `link` is the message's
   * inline action ("Turn off reminders"). */
  history?: {
    actor: ArcadeStepConfig["actor"] | "Person";
    name: string;
    time: string;
    message: string;
    detail: string;
    kind?: "event";
    link?: string;
  }[];
  /* this step's inline action under the event ("Turn off reminders") */
  eventLink?: string;
  /* home v2: the chart card the queue step works (by its link title), and
   * the hovered column with its tooltip lines (home, report, dashboards) */
  homeCard?: string;
  chartHover?: { bar: string; lines: string[]; card?: string };
  /* this step's report page when a world drills into more than one chart */
  report?: ArcadeReport;
  /* the record quick-view modal (focus "modal") */
  modal?: ArcadeModal;
  /* the start-new-record dialog over home (focus "start") */
  startNew?: { noun: string; title: string; owner: string; participants: string[] };
  /* the record composer mid-typing, mention list open (focus "mention") */
  composer?: ArcadeComposer;
  /* a field's dropdown open this step, the way a person fills it: a
   * picklist's options ("Yes", "No"), or a linked field's search with the
   * typed query, matching records and "+ Create" */
  checklistPick?: { section: string; item: string; query?: string; options: string[]; active?: number; create?: string };
  /* checklist fields written this step (by AI or Add to Checklist): washed
   * as fresh, never ringed */
  checklistFilled?: { section: string; items: string[] };
  /* the checklist panel scrolled this far (px) so the field being worked
   * sits in view, as a person scrolls the real panel to it */
  checklistScroll?: number;
  /* records created this step, landing at the top of the inbox as their
   * own conversations ("Why (Level 1) #1 · No Owner · Pending") */
  inboxNew?: { title: string; detail: string; kind: string; owner?: string; state?: string }[];
  /* the record's state chip carries the reminder bell */
  reminder?: boolean;
  /* the checklist field being ENTERED this step (checklist pose): the named
   * item renders as a focused input with a live caret and the target ring */
  checklistEntry?: { section: string; item: string };
  /* the linked field this step rewrites: ids beyond the world's resting
   * list render as freshly linked */
  checklistLinks?: {
    section: string;
    item: string;
    links: string[];
    /* detail for the freshly linked ids: with it they render as embedded
     * record rows, not chips, because what lands is a record */
    records?: ArcadeRecordRow[];
  };
  /* the checklist AI button pressed this step (an `ask` item) */
  checklistAsk?: { section: string; item: string };
  /* the AI suggestion message (assist pose) */
  assist?: ArcadeAssist;
};

/* The AI suggestion exactly as the product posts it (re-read frame by frame
 * 26 Sep 2026 from the Sep 16 recordings of "What else does this change
 * affect? (Beta)", "Generate Why 1 (Beta)" and "Build with AI (Beta)"):
 * the person who pressed the checklist button owns the message ("Anusha
 * Setti asked AI suggestion for Assess impacted documents"), the body is a
 * table of Field label / Suggested Value with a box per row, and the one
 * action is "Add to Checklist", greyed until a box is ticked. A "choose
 * only one" field carries its options inside the value cell, each with its
 * own box; a record-type field (Risk, CAPAs Identification) carries each
 * suggested record with an Embedded field / Suggested Value sub-table.
 * Nothing lands on the record until a person adds it. */
export type ArcadeAssist = {
  /* who pressed the button; defaults to the world's viewer */
  asker?: string;
  /* the checklist field the button sits under ("Assess impacted documents") */
  field: string;
  rows: {
    label: string;
    value?: string;
    /* a numbered-list value ("1.Supplier Performance Monitoring ...") */
    list?: string[];
    /* choose only one: each option with its own box */
    options?: { text: string; picked?: boolean }[];
    /* a record-type field: each suggested record's embedded fields */
    records?: { title: string; fields: { label: string; value: string }[] }[];
    picked?: boolean;
  }[];
  /* the "Add to Checklist" click */
  pressed?: boolean;
};

/* PF-29's document world (the pre-world fallback) lives in ./document-world,
 * outside this file's "use client" boundary, so server-component mocks files
 * can extend it as plain data. Re-exported for existing client-side imports. */
import { DOCUMENT_WORLD } from "./document-world";
export { DOCUMENT_WORLD };

/* ------------------------------------------------------------------ icons
 * The window chrome used to lean on unicode glyphs (⌂ ▢ ▤ ⌕ ••• × › ✓ ◔),
 * which arrive at a different weight, size and baseline in every fallback
 * font - the one thing in the frame that never looked drawn. Same marks,
 * as inline SVG on a 24 box with a 1.7 stroke in currentColor, so they scale
 * with the camera and inherit every existing color rule. */
type IconName =
  | "home" | "records" | "reports" | "grid" | "people" | "settings"
  | "search" | "kebab" | "close" | "chevron" | "plus"
  | "check" | "checks" | "half" | "arrow" | "spark"
  | "wand" | "bell" | "star" | "refresh" | "export" | "expand" | "calendar"
  | "caret" | "back" | "send" | "person" | "flag" | "tree" | "chart";

const ICON_PATHS: Record<IconName, string> = {
  home: "M4.2 10.4 12 4.2l7.8 6.2V19.8h-5.3v-5.2H9.5v5.2H4.2V10.4Z",
  records: "M4.4 5.2h15.2v10.4H9.6l-5.2 4V5.2ZM8 9.2h8M8 12.2h5",
  reports: "M4.5 19.5h15M7 19.5v-6.2M11.7 19.5V6.4M16.4 19.5v-9",
  grid: "M4.6 4.6h6v6h-6ZM13.4 4.6h6v6h-6ZM4.6 13.4h6v6h-6ZM13.4 13.4h6v6h-6Z",
  people: "M9.4 11.3a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6ZM3.6 19.4c0-2.8 2.6-4.7 5.8-4.7s5.8 1.9 5.8 4.7M16.4 10.6a2.6 2.6 0 1 0 0-5.2M17 14.9c2.2.4 3.6 1.9 3.6 4",
  /* settings reads as sliders, not a 12-tooth gear: at 18px on a scaled-down
   * window a gear silhouette turns to noise, a three-track control does not */
  settings: "M5 7.4h14M5 12h14M5 16.6h14M9.4 5.6v3.6M15.2 10.2v3.6M8 14.8v3.6",
  search: "M11 4.6a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8ZM19.8 19.8l-4.2-4.2",
  kebab: "M12 6.6h.01M12 12h.01M12 17.4h.01",
  close: "m7 7 10 10M17 7 7 17",
  chevron: "m9.8 5.6 6.4 6.4-6.4 6.4",
  plus: "M12 5.4v13.2M5.4 12h13.2",
  check: "m4.8 12.4 4.8 4.8L19.2 7.4",
  checks: "m3 12.6 4 4 7.4-8.2M11.4 16.2l.9.9 7.8-8.4",
  half: "M12 4.6a7.4 7.4 0 1 0 0 14.8 7.4 7.4 0 0 0 0-14.8ZM12 7.6a4.4 4.4 0 0 1 0 8.8Z",
  arrow: "M7.6 16.4 16.4 7.6M9.4 7.6h7v7",
  /* the Unifize AI mark: a four-point star, stroked like every other icon */
  spark: "M12 3.4l2.2 6.4 6.4 2.2-6.4 2.2L12 20.6l-2.2-6.4L3.4 12l6.4-2.2L12 3.4Z",
  /* the product's AI button mark: a wand with a glint */
  wand: "M4.6 19.4 15.2 8.8M13.4 7l3.6 3.6M17.6 3.6v3M16.1 5.1h3M19.8 9.6v2.2M18.7 10.7h2.2",
  /* reminders on: the bell inside a state chip */
  bell: "M7.2 16.4V11a4.8 4.8 0 0 1 9.6 0v5.4l1.4 1.6H5.8l1.4-1.6ZM10.4 19.6h3.2",
  star: "m12 4.6 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.9l5-.7L12 4.6Z",
  refresh: "M18.6 12a6.6 6.6 0 1 1-2-4.7M18.8 4.8v3.6h-3.6",
  export: "M12 15.2V4.8M8.2 8.4 12 4.6l3.8 3.8M5.4 14.6v4.6h13.2v-4.6",
  expand: "M4.8 9.4V4.8h4.6M14.6 4.8h4.6v4.6M19.2 14.6v4.6h-4.6M9.4 19.2H4.8v-4.6",
  calendar: "M5.2 7h13.6v12.2H5.2V7ZM5.2 10.6h13.6M9 4.8v3.4M15 4.8v3.4",
  caret: "m7.4 10 4.6 4.6 4.6-4.6",
  back: "M19 12H5.4M10.6 6.8 5.4 12l5.2 5.2",
  send: "M5 12.2 19.4 5.2 15.6 19.2l-3.8-5.4L5 12.2ZM11.8 13.8l7.6-8.6",
  person: "M12 11.6a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM5.2 19.8c0-3.3 3-5.4 6.8-5.4s6.8 2.1 6.8 5.4",
  flag: "M6.6 20V4.8M6.6 5.4h10.6l-2 3.6 2 3.6H6.6",
  tree: "M6 5.4v13.2M6 9.2h5.6M6 16h5.6M11.6 7.4h6.8v3.6h-6.8ZM11.6 14.2h6.8v3.6h-6.8Z",
  chart: "M5.4 19.2V11M10.4 19.2V6M15.4 19.2v-6M4.2 19.4h15.6",
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg className={"stx-i is-" + name} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const initialsOf = (name: string) =>
  name.split(/[\s.·&]+/).filter(Boolean).map((part) => part[0]).join("").toUpperCase().slice(0, 2);
const stateClass = (state: string) => "is-" + state.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const poseClass = (config: ArcadeStepConfig) =>
  `is-focus-${config.focus}` + (config.poseVariant ? ` is-pose-${config.poseVariant}` : "");
const viewerName = (world: ArcadeFlowWorld) => world.viewer ?? world.owner;
const viewerInitials = (world: ArcadeFlowWorld) => world.viewerInitials ?? world.ownerInitials;
/* queue steps land on the home strip unless a variant restages them in-thread */
const isHomeQueue = (config: ArcadeStepConfig) => config.focus === "queue" && config.poseVariant !== "route";
/* the home page is up: a home queue step, the start-new dialog over it, or
 * a record modal opened from it */
const isHomePage = (config: ArcadeStepConfig) =>
  isHomeQueue(config) || config.focus === "start" || (config.focus === "modal" && config.modal?.over === "home");

function StateChip({ state, bell }: { state: string; bell?: boolean }) {
  return <span className={"stx-state " + stateClass(state)}><i aria-hidden="true" />{state}{bell ? <Icon name="bell" /> : null}</span>;
}

function Avatar({ initials }: { initials: string }) {
  return <span className="stx-av">{initials}</span>;
}

function DocumentGlyph({ complete = false }: { complete?: boolean }) {
  return (
    <span className={"stx-ed-docglyph" + (complete ? " is-complete" : "")} aria-hidden="true">
      <svg viewBox="0 0 48 56">
        <path d="M8 2h21l11 11v41H8V2Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M29 2v12h11M16 25h16M16 34h16M16 43h11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {complete ? <i>✓</i> : null}
    </span>
  );
}

function Sheet({ mark, tone }: { mark: string; tone: string }) {
  return (
    <span className="stx-sheet" aria-hidden="true">
      <i className="stx-sheet__title" /><i /><i /><i />
      <span className="stx-sheet__table"><i /><i /><i /></span>
      <b className={"is-" + tone}>{mark}</b>
    </span>
  );
}

/* The field behind the camera: structural blue with quiet geometry (an
 * outline square and circle cropping off the edges, two small solid marks).
 * No text overlay; the record sheet is the only thing that speaks. */
function Scene({ config, children }: { config: ArcadeStepConfig; children: React.ReactNode }) {
  return (
    <div className={`sty-scene sty-scene--life is-arcade is-${config.focus}`} role="img" aria-label={`Unifize product scene: ${config.focusTitle}.`}>
      <div aria-hidden="true" className="sty-scene__inner">
        <span className="stx-arc-field"><i /><i /><i /><i /></span>
        <div className="stx-stage">{children}</div>
      </div>
    </div>
  );
}

function ArcadeRail({ world, active = "records" }: { world: ArcadeFlowWorld; active?: "home" | "records" | "reports" | "dashboards" | "settings" }) {
  return (
    <nav className="stx-arc__rail" aria-label="Product navigation">
      <span className="stx-arc__rail-logo">U</span>
      <span className={active === "home" ? "is-active" : ""} aria-hidden="true"><Icon name="home" /></span>
      <span className={active === "records" ? "is-active" : ""} aria-hidden="true"><Icon name="records" /></span>
      <span className={active === "reports" ? "is-active" : ""} aria-hidden="true"><Icon name="reports" /></span>
      <span className={active === "dashboards" ? "is-active" : ""} aria-hidden="true"><Icon name="grid" /></span><span aria-hidden="true"><Icon name="people" /></span><i />
      <span className={active === "settings" ? "is-active" : ""} aria-hidden="true"><Icon name="settings" /></span><span className="stx-arc__rail-avatar">{viewerInitials(world)}</span>
    </nav>
  );
}

/* The home screen as a full PAGE inside the one app window: it overlays the
 * content area (the rail stays, exactly like the real app) and crossfades in
 * when a queue step is active. One window at a time; navigating between home
 * and the conversation is a page change, and the row being opened carries a
 * click ring so the next step's page reads as the result of that click.
 * Layout mirrors the real app.unifize.com/home, stripped: the step's queue
 * panel carries real rows; everything else is skeletonised set dressing. */
function ArcadeHome({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  if (world.home) return <ArcadeHomeCharts config={config} world={world} />;
  if (!world.homeTiles) return null;
  const queued = isHomePage(config);
  return (
    <aside className="stx-arc__home" aria-hidden={!queued}>
      <div className="stx-arc__home-body">
        <header>
          <small>Home</small>
          <b>Welcome back, {viewerName(world)}.</b>
          <span>Here&rsquo;s what&rsquo;s going on at {world.team}.</span>
        </header>
        <div className="stx-arc__home-grid">
          <div className="stx-arc__home-main">
            {world.homeTiles.map((tile) => {
              const active = queued && tile.label === config.queueTile;
              return (
                <section className={active ? "is-target" : ""} key={tile.label}>
                  <header><b>{tile.label}</b><small>{tile.count} open</small></header>
                  {active ? (
                    <>
                      <div className="stx-arc__home-rows">
                        {config.focusRows.map((row, index) => (
                          <p key={row}>
                            <i aria-hidden="true" /><span>{row}</span>
                            {index === 0 ? <em className="stx-arc__click" aria-hidden="true" /> : null}
                          </p>
                        ))}
                      </div>
                      <footer><b>{config.focusAction}</b></footer>
                    </>
                  ) : tile.rows?.length ? (
                    /* a world that names this tile's rows shows them, quieter
                     * than the tile the step is working */
                    <div className="stx-arc__home-rows is-quiet">
                      {tile.rows.map((row) => (
                        <p key={row}><i aria-hidden="true" /><span>{row}</span></p>
                      ))}
                    </div>
                  ) : (
                    <div className="stx-arc__home-skeleton" aria-hidden="true"><i /><i /></div>
                  )}
                </section>
              );
            })}
          </div>
          <div className="stx-arc__home-side" aria-hidden="true">
            <small>Overview</small>
            {world.homeSide ? (
              world.homeSide.map((panel) => (
                <section className={(panel.kind === "bars" ? "is-chart" : "is-list") + " is-" + (panel.tone ?? "blue")} key={panel.title}>
                  <b>{panel.title}</b>
                  {panel.kind === "bars" ? (
                    <span className="stx-arc__home-bars"><i /><i /><i /><i /><i /><i /></span>
                  ) : (
                    <span className="stx-arc__home-list">
                      {(panel.rows ?? []).map((row) => <span key={row}>{row}</span>)}
                    </span>
                  )}
                  {panel.action ? <em>{panel.action}</em> : null}
                </section>
              ))
            ) : (
              <>
                <section className="is-chart">
                  <b>Documents by state</b>
                  <span className="stx-arc__home-bars"><i /><i /><i /><i /><i /><i /></span>
                </section>
                <section className="is-updates">
                  <b>Updates since you were gone</b>
                  <span className="stx-arc__home-lines"><i /><i /><i /></span>
                  <em>Take me there</em>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* A record dashboard as a full PAGE in the one app window, same idiom as
 * home and reports: it overlays the content area (the rail stays) and
 * crossfades in on dashboard steps. Laid out like the app's own dashboards:
 * the record type and its live meta line, a stacked bar chart by owner with
 * its legend, the results toolbar, the filters applied, then the records. */
function ArcadeDashboard({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  const dash = world.dashboard;
  if (!dash) return null;
  const live = config.focus === "dashboard";
  const statusCol = dash.rows.some((row) => row.status);
  return (
    <aside className="stx-arc__dash" aria-hidden={!live}>
      <header className="stx-arc__dash-head">
        <b>{dash.title}</b>
        <small>{dash.meta.join(" · ")}</small>
      </header>
      <section className="stx-arc__dash-chart">
        <b>{dash.chart.title}</b>
        <div className="stx-arc__dash-plot">
          <span className="stx-arc__dash-axis" aria-hidden="true">
            {dash.chart.ticks.map((tick) => (
              <i key={tick} style={{ top: `calc((100% - 17px) * ${1 - tick / dash.chart.max})` }}>{tick}</i>
            ))}
          </span>
          <div className="stx-arc__dash-bars">
            {/* one dashed rule per tick, the zero line solid */}
            {dash.chart.ticks.map((tick) => (
              <i
                key={tick}
                className={"stx-arc__dash-grid" + (tick === 0 ? " is-base" : "")}
                style={{ top: `calc((100% - 17px) * ${1 - tick / dash.chart.max})` }}
                aria-hidden="true"
              />
            ))}
            {dash.chart.bars.map((bar) => {
              const total = bar.values.reduce((a, b) => a + b, 0);
              return (
                <div className="stx-arc__dash-bar" key={bar.label}>
                  <span className="stx-arc__dash-stack" style={{ height: `${(total / dash.chart.max) * 100}%` }}>
                    <em>{total}</em>
                    {bar.values.map((value, i) =>
                      value ? <i key={dash.chart.series[i].label} className={"is-" + dash.chart.series[i].tone} style={{ flexGrow: value }} /> : null,
                    )}
                  </span>
                  <small>{bar.label}</small>
                </div>
              );
            })}
          </div>
        </div>
        <span className="stx-arc__dash-legend">
          {dash.chart.series.map((series) => <span key={series.label}><i className={"is-" + series.tone} />{series.label}</span>)}
        </span>
      </section>
      <div className="stx-arc__dash-toolbar">
        <small>{dash.results}</small>
        <span><b>{dash.primary}</b>{dash.actions.map((action) => <em key={action}>{action}</em>)}</span>
      </div>
      <div className="stx-arc__dash-filters">
        <small>Filters applied</small>
        {dash.filters.map((filter) => <span key={filter}>{filter}<i aria-hidden="true">×</i></span>)}
        <em>Clear all</em>
      </div>
      <table className="stx-arc__dash-table">
        <thead>
          <tr>
            {dash.columns.map((column) => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {dash.rows.map((row) => (
            <tr key={row.cells[0]} className={live && row.target ? "is-target" : undefined}>
              {row.cells.map((cell, c) => (
                <td key={c} className={row.links?.includes(c) ? "is-link" : undefined}>
                  {c === 1 ? <i aria-hidden="true">›</i> : null}
                  {cell}
                </td>
              ))}
              {statusCol ? (
                <td>{row.status ? <span className={"stx-arc__dash-status is-" + row.status.tone}>{row.status.label}</span> : null}</td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}

/* The reports page as a full PAGE inside the one app window, mirroring the
 * home-page idiom: it overlays the content area (the rail stays), crossfades
 * in when a dashboard step is active. A KPI row on top, chart panels below;
 * the step's focusTitle names the highlighted panel, its focusRows become
 * that panel's legend, and focusAction is the drill-through. Charts are
 * skeletonised set dressing - only the target panel carries real text. */
function ArcadeReports({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  if (!world.reports || world.dashboard) return null;
  const live = config.focus === "dashboard";
  return (
    <aside className="stx-arc__reports" aria-hidden={!live}>
      <div className="stx-arc__reports-body">
        <header>
          <small>Reports</small>
          <b>{world.reports.title}</b>
          <span>Live from every record at {world.team}. No export, no reconciliation.</span>
        </header>
        <div className="stx-arc__reports-kpis">
          {world.reports.kpis.map((kpi) => (
            <section key={kpi.label}>
              <small>{kpi.label}</small>
              <b>{kpi.value}</b>
              {kpi.note ? <span>{kpi.note}</span> : null}
            </section>
          ))}
        </div>
        <div className="stx-arc__reports-grid">
          {world.reports.panels.map((panel) => {
            const target = live && panel.label === config.focusTitle;
            return (
              <section className={(target ? "is-target" : "") + " is-" + panel.kind} key={panel.label}>
                <header><b>{panel.label}</b></header>
                <span className={"stx-arc__reports-chart is-" + panel.kind} aria-hidden="true">
                  {panel.kind === "donut" ? <i /> : <><i /><i /><i /><i /><i /><i /></>}
                </span>
                {target ? (
                  <>
                    <div className="stx-arc__reports-legend">
                      {config.focusRows.map((row) => <p key={row}><i aria-hidden="true" /><span>{row}</span></p>)}
                    </div>
                    {config.focusAction ? <footer><b>{config.focusAction}</b></footer> : null}
                  </>
                ) : (
                  <div className="stx-arc__reports-skeleton" aria-hidden="true"><i /><i /></div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

/* The process builder as a full PAGE inside the one app window, mirroring
 * the home/reports idiom: it overlays the content area (the rail stays),
 * crossfades in when a builder step is active. Left: the process's typed
 * field list (drag grips, tone chips, field-name inputs). Right: the
 * add-field palette that makes the no-code point. The step's focusTitle
 * names the field row whose settings expand, its focusRows become that
 * row's routing summary, and focusAction labels the palette footer. */
function ArcadeBuilder({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  if (!world.builder) return null;
  const live = config.focus === "builder";
  return (
    <aside className="stx-arc__builder" aria-hidden={!live}>
      <div className="stx-arc__builder-body">
        <header>
          <small>Process builder</small>
          <b>{world.builder.title}</b>
          <span>{world.builder.note}</span>
        </header>
        <nav className="stx-arc__builder-tabs" aria-hidden="true">
          {world.builder.tabs.map((tab, index) => (
            <span className={index === 0 ? "is-active" : ""} key={tab}>{tab}</span>
          ))}
        </nav>
        <div className="stx-arc__builder-grid">
          <div className="stx-arc__builder-fields">
            {world.builder.fields.map((field) => {
              const target = live && field.label === config.focusTitle;
              return (
                <div className={"stx-arc__builder-field" + (target ? " is-target" : "")} key={field.label}>
                  <p>
                    <i className="stx-arc__builder-grip" aria-hidden="true" />
                    <em className={"stx-arc__builder-kind is-" + field.tone}>{field.kind}</em>
                    <span>{field.label}</span>
                    <b aria-hidden="true"><Icon name="settings" /></b>
                  </p>
                  {target ? (
                    <div className="stx-arc__builder-settings">
                      {config.focusRows.map((row) => (
                        <p key={row}><i aria-hidden="true"><Icon name="check" /></i><span>{row}</span></p>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="stx-arc__builder-palette">
            <header><b>Add a field</b><small>No code</small></header>
            <div className="stx-arc__builder-tiles">
              {world.builder.palette.map((tile) => (
                <p key={tile.label}><i className={"is-" + tile.tone} aria-hidden="true" /><b>{tile.label}</b><small>{tile.note}</small></p>
              ))}
            </div>
            {config.focusAction ? <footer><b>{config.focusAction}</b></footer> : null}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* A2 s5-6 grounded, stripped: the Part 11 dialog floating over the whole
 * workspace. Type choice, credential fields (skeletonised, never real
 * values), the system-generated script signature, and the confirm footer. */
function ArcadeSignDialog({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  return (
    <div className="stx-arc__signwrap">
      <div className="stx-arc__signdialog is-target">
        <header><span><small>{config.signKicker ?? "21 CFR PART 11"}</small><b>{config.focusTitle}</b></span><i aria-hidden="true"><Icon name="close" /></i></header>
        <div className="stx-arc__sign-type"><span>Type</span><b><i aria-hidden="true" />Approval</b><em>Rejection</em></div>
        <div className="stx-arc__sign-field"><span>Email id</span><i>{viewerName(world).toLowerCase().replace(/[^a-z]/g, "")}@engineering.example</i></div>
        <div className="stx-arc__sign-field"><span>Password</span><i>••••••••••</i></div>
        <div className="stx-arc__sign-signature"><span>System generated signature</span><b>{viewerName(world)}</b></div>
        <footer><b>{config.focusAction}</b><span>Cancel</span></footer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ charts
 * One chart renderer for the home tiles, the dashboard cards and the report
 * page, drawn the way the app draws them: value labels over the bars, a
 * dashed grid on the ticks, a legend under the plot, and the clicked or
 * hovered column in a grey band with its tooltip. */
const niceMax = (value: number) => {
  if (value <= 5) return 5;
  if (value <= 10) return 10;
  const step = value <= 30 ? 5 : value <= 100 ? 20 : 50;
  return Math.ceil(value / step) * step;
};
const fmt = (value: number) => (Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0$/, ""));

function ArcadeChartView({ chart, hover, tooltip }: { chart: ArcadeChart; hover?: string; tooltip?: string[] }) {
  if (chart.kind === "donut") {
    const slices = chart.slices ?? [];
    const total = slices.reduce((n, slice) => n + slice.value, 0) || 1;
    let at = 0;
    const stops = slices
      .map((slice) => {
        const from = (at / total) * 100;
        at += slice.value;
        return `var(--stx-tone-${slice.tone}) ${from}% ${(at / total) * 100}%`;
      })
      .join(", ");
    return (
      <div className="stx-arc__chart is-donut">
        <span className="stx-arc__donut" style={{ background: `conic-gradient(${stops})` }} aria-hidden="true">
          <i />
          {hover && tooltip ? <span className="stx-arc__chart-tip is-donut">{tooltip.map((line) => <span key={line}>{line}</span>)}</span> : null}
        </span>
        <span className="stx-arc__chart-legend is-grid">
          {slices.map((slice) => (
            <span className={slice.label === hover ? "is-hover" : undefined} key={slice.label}>
              <i className={"is-" + slice.tone} />
              {Math.round((slice.value / total) * 100)}% {slice.label}
            </span>
          ))}
        </span>
      </div>
    );
  }
  const bars = chart.bars ?? [];
  const series = chart.series?.length ? chart.series : [{ label: chart.unit ?? "", tone: "indigo" as ArcadeTone }];
  const max = chart.max ?? niceMax(Math.max(1, ...bars.map((bar) => bar.values.reduce((a, b) => a + b, 0))));
  const ticks = chart.ticks ?? Array.from({ length: 6 }, (_, i) => Math.round((max / 5) * i * 100) / 100);
  return (
    <div className="stx-arc__chart">
      <div className="stx-arc__chart-plot">
        <span className="stx-arc__chart-axis" aria-hidden="true">
          {ticks.map((tick) => <i key={tick} style={{ bottom: `${(tick / max) * 100}%` }}>{fmt(tick)}</i>)}
        </span>
        <div className="stx-arc__chart-bars" style={{ "--stx-bars": bars.length } as React.CSSProperties}>
          {ticks.map((tick) => (
            <i className={"stx-arc__chart-grid" + (tick === 0 ? " is-base" : "")} key={tick} style={{ bottom: `${(tick / max) * 100}%` }} aria-hidden="true" />
          ))}
          {bars.map((bar) => {
            const total = bar.values.reduce((a, b) => a + b, 0);
            const hovered = bar.label === hover;
            return (
              <div className={"stx-arc__chart-col" + (hovered ? " is-hover" : "")} key={bar.label}>
                <span className="stx-arc__chart-stack" style={{ height: `${(total / max) * 100}%` }}>
                  <em>{fmt(total)}</em>
                  {bar.values.map((value, i) =>
                    value ? <i key={series[i]?.label ?? i} className={"is-" + (series[i]?.tone ?? "indigo")} style={{ flexGrow: value }} /> : null,
                  )}
                </span>
                <small>{bar.label}</small>
                {hovered && tooltip ? (
                  <span className="stx-arc__chart-tip">
                    {tooltip.map((line, i) => (
                      <span key={line}><i className={"is-" + (series.find((item) => item.label && line.startsWith(item.label))?.tone ?? (tooltip.length === series.length ? series[i].tone : series[0].tone))} />{line}</span>
                    ))}
                    <em className="stx-arc__click" aria-hidden="true" />
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <span className="stx-arc__chart-legend">
        {series.map((item) => (item.label ? <span key={item.label}><i className={"is-" + item.tone} />{item.label}</span> : null))}
      </span>
    </div>
  );
}

/* the chart card's live line: "6 minutes ago" with refresh, export, expand */
function CardTools({ updated }: { updated: string }) {
  return (
    <small className="stx-arc__cardtools">
      {updated}
      <Icon name="refresh" /><Icon name="export" /><Icon name="expand" />
    </small>
  );
}

/* The persona home as the app draws it (the document controller's and the
 * quality manager's, Sep 16 recordings): "Welcome back!", the section of
 * chart tiles, and the right column's Quick Start, lists and shortcuts. */
function ArcadeHomeCharts({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  const home = world.home;
  if (!home) return null;
  const live = isHomePage(config);
  return (
    <aside className="stx-arc__home is-charts" aria-hidden={!live}>
      <div className="stx-arc__hv">
        <header>
          <b>Welcome back! {viewerName(world)}</b>
          <small>Here&rsquo;s what&rsquo;s going on at {world.team}</small>
        </header>
        <div className="stx-arc__hv-grid">
          <div className="stx-arc__hv-main">
            <h4>{home.section}</h4>
            {home.cards.map((card) => {
              const active = live && card.link === config.homeCard;
              return (
                <section className={"stx-arc__hv-card" + (active ? " is-target" : "")} key={card.link}>
                  <header><b>{card.link}</b><CardTools updated={card.updated} /></header>
                  <p>{card.chart.title}</p>
                  <ArcadeChartView chart={card.chart} hover={active ? config.chartHover?.bar : undefined} tooltip={active ? config.chartHover?.lines : undefined} />
                </section>
              );
            })}
          </div>
          <div className="stx-arc__hv-side">
            {home.quickStart?.length ? <h4>Quick Start</h4> : null}
            {home.quickStart?.map((group, g) => (
              <section className="stx-arc__hv-panel" key={group.title + g}>
                <b>{group.title}</b>
                <span className="stx-arc__hv-buttons">
                  {group.buttons.map((button) => (
                    <em className={config.focus === "start" && button === config.startNew?.noun ? "is-target" : undefined} key={button}>{button}</em>
                  ))}
                </span>
              </section>
            ))}
            {home.lists?.map((list) => (
              <section className="stx-arc__hv-panel is-list" key={list.title}>
                <b>{list.title}</b>
                <ul>{list.rows.map((row) => <li key={row}>{row}</li>)}</ul>
                {list.more ? <small>{list.more}</small> : null}
                <em>Show All</em>
              </section>
            ))}
            {home.shortcuts?.map((shortcut) => (
              <section className="stx-arc__hv-panel" key={shortcut.title}>
                <b>{shortcut.title}</b>
                <span className="stx-arc__hv-buttons is-one"><em>{shortcut.button}</em></span>
              </section>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* A table cell by its column: status pills (with the reminder bell), the
 * owner with an avatar, dates with the calendar mark (red when overdue),
 * the record link with its disclosure caret. */
function ReportCell({ column, value, row, index }: { column: string; value: string; row: ArcadeReport["rows"][number]; index: number }) {
  const key = column.toLowerCase();
  if (key === "status" && row.status) {
    return <td><em className={"stx-arc__pill is-" + row.status.tone}>{row.status.label}{row.status.reminder ? <Icon name="bell" /> : null}</em></td>;
  }
  if (key === "owner") return <td className="is-owner"><span><Avatar initials={initialsOf(value)} />{value}</span></td>;
  if (key.includes("due")) return <td className={"is-date" + (row.late === index ? " is-late" : "")}><span><Icon name="calendar" />{value}</span></td>;
  if (index === (row.link ?? 1)) return <td className="is-link"><i aria-hidden="true">›</i>{value}</td>;
  return <td>{value}</td>;
}

/* The report page a chart drills into, as the app lays it out: the chart
 * large (the clicked column in its grey band, tooltip up), the chart
 * toolbar, the results bar, "Filters applied" (the clicked bar is now a
 * filter), the records, and "Back to Report" / "Create Another Chart". */
function ArcadeReportPage({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  const report = config.report ?? world.report;
  if (!report) return null;
  const live = config.focus === "report" || (config.focus === "modal" && config.modal?.over === "report");
  return (
    <aside className="stx-arc__rep" aria-hidden={!live}>
      <header className="stx-arc__rep-head">
        <small className="is-live">{report.updated}<Icon name="refresh" /></small>
        <span aria-hidden="true"><Icon name="arrow" /><Icon name="export" /><Icon name="settings" /></span>
      </header>
      <b className="stx-arc__rep-title">{report.chart.title}</b>
      <ArcadeChartView chart={report.chart} hover={config.chartHover?.bar} tooltip={config.focus === "report" ? config.chartHover?.lines : undefined} />
      <div className="stx-arc__rep-tools">
        <span className="stx-arc__rep-search">Search</span>
        <span><em><Icon name="chart" />CHART<Icon name="caret" /></em><em>SAVE AS</em><em>SAVE CHANGES</em></span>
      </div>
      <div className="stx-arc__rep-results">
        <b>{report.results}</b>
        <span className="stx-arc__rep-toggle"><i aria-hidden="true" />Show all revisions</span>
        <span className="stx-arc__rep-actions">
          <em>Upload CSV</em><em><Icon name="plus" />{report.create}</em><em>Customize View</em><em><Icon name="refresh" />Refresh</em><em>Download</em><em>Share</em>
        </span>
      </div>
      <div className="stx-arc__rep-filters">
        <small>Filters applied:</small>
        {report.filters.map((filter) => <span key={filter}>{filter}<i aria-hidden="true">×</i></span>)}
        <em>Clear All</em>
      </div>
      <table className="stx-arc__rep-table">
        <thead>
          <tr><th aria-hidden="true"><i /></th>{report.columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {report.rows.map((row) => (
            <tr className={live && row.target ? "is-target" : undefined} key={row.cells[0] + row.cells[1]}>
              <td aria-hidden="true"><i /></td>
              {row.cells.map((cell, index) => <ReportCell column={report.columns[index] ?? ""} value={cell} row={row} index={index} key={index} />)}
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="stx-arc__rep-foot"><em>Back to Report</em><b>Create Another Chart</b></footer>
    </aside>
  );
}

/* The saved dashboards page: the list by seat on the left, the open
 * dashboard's chart cards in a two-by-two grid; the card being read carries
 * the blue ring and its live line, the hovered mark its tooltip. */
function ArcadeDashboardsPage({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  const board = world.dashboards;
  if (!board) return null;
  const live = config.focus === "dashboards" || (config.focus === "modal" && config.modal?.over === "dashboards");
  return (
    <aside className="stx-arc__dbs" aria-hidden={!live}>
      <nav>
        <b>Dashboard</b>
        {board.list.map((item) => (
          <span className={item.name === board.active ? "is-active" : undefined} key={item.name}><b>{item.name}</b><small>{item.by}</small></span>
        ))}
        <em>+ Create New</em>
      </nav>
      <div className="stx-arc__dbs-main">
        <header><span><b>{board.active}</b><small>Created by: {board.by}</small></span><i aria-hidden="true"><Icon name="kebab" /></i></header>
        <div className="stx-arc__dbs-grid">
          {board.cards.map((chart) => {
            const active = live && chart.title === config.chartHover?.card;
            return (
              <section className={active ? "is-target" : undefined} key={chart.title}>
                <header><b>{chart.title}</b>{active ? <CardTools updated="a few seconds ago" /> : null}</header>
                <ArcadeChartView chart={chart} hover={active ? config.chartHover?.bar : undefined} tooltip={active ? config.chartHover?.lines : undefined} />
              </section>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

/* A line of a record thread, as the modal (and the drill) shows it */
function ThreadLine({ item, you }: { item: ArcadeThreadItem; you: string }) {
  const initials = (who: string) => (who === "You" ? you : initialsOf(who));
  if (item.kind === "date") return <span className="stx-arc__tl-date">{item.text}</span>;
  if (item.kind === "updates") {
    return <p className="stx-arc__tl-updates"><span><Icon name="caret" />{item.open ? "Viewing" : "View"} {item.count} updates</span></p>;
  }
  if (item.kind === "event") {
    return <p className="stx-arc__tl-event"><b>{item.who}</b> {item.text}{item.strong ? <em> {item.strong}</em> : null}</p>;
  }
  if (item.kind === "field") {
    return (
      <article className="stx-arc__tl-msg">
        <span className="stx-av">{initials(item.who)}</span>
        <div><header><b>{item.who}</b> updated {item.field}</header><p className="stx-arc__tl-fieldcard"><b>{item.field}</b><span>{item.value}</span></p></div>
      </article>
    );
  }
  return (
    <article className={"stx-arc__tl-msg" + (item.assistant ? " is-assistant" : "")}>
      <span className="stx-av">{item.assistant ? <Icon name="person" /> : initials(item.who)}</span>
      <div>
        <header><b>{item.who}</b>{item.time ? <time>{item.time}</time> : null}</header>
        <p>{item.mention ? <em>@{item.mention}</em> : null}{item.mention ? " " : ""}{item.text}</p>
        {item.link ? <span className="stx-arc__message-action">{item.link}</span> : null}
      </div>
    </article>
  );
}

/* The record opened as a quick-view modal over the page behind it (a
 * chart's result row, an embedded training record): the header with its
 * state chip, owner, participants, due date and "View in Inbox", the
 * thread, and the composer ("Send a response from here"). */
function ArcadeModal({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  const modal = config.modal;
  if (!modal || config.focus !== "modal") return null;
  return (
    <div className={"stx-arc__modalwrap is-over-" + modal.over}>
      <div className="stx-arc__modal is-target">
        <header>
          <span><Icon name="records" /><b>{modal.noun} {modal.id}: {modal.title}</b><Icon name="star" /></span>
          <i aria-hidden="true"><Icon name="close" /></i>
        </header>
        <div className="stx-arc__modal-meta">
          <em className={"stx-arc__pill is-" + (modal.tone ?? "pending")}>{modal.state}{modal.reminder ? <Icon name="bell" /> : null}</em>
          <i><Avatar initials={initialsOf(modal.owner)} />{modal.owner}</i>
          <i><Icon name="people" />{modal.participants}</i>
          <i className={modal.late ? "is-late" : undefined}><Icon name="calendar" />{modal.due}</i>
          <i><Icon name="flag" /></i>
          <span>View in Inbox<Icon name="arrow" /></span>
        </div>
        <div className="stx-arc__modal-thread">
          {modal.thread.map((item, index) => <ThreadLine item={item} you={viewerInitials(world)} key={index} />)}
        </div>
        <footer className={"stx-arc__modal-cmp" + (modal.composer ? " is-typing" : "")}>
          <MentionPicker composer={modal.composer} />
          <i aria-hidden="true"><Icon name="plus" /></i>
          <ComposerLine composer={modal.composer} placeholder="Send a response from here" />
          <b aria-hidden="true"><Icon name="send" /></b>
        </footer>
      </div>
    </div>
  );
}

/* "Start new <record>" over home: Title (typed), Owner, Participants, the
 * external-invite hint, and Create. */
function ArcadeStartDialog({ config }: { config: ArcadeStepConfig }) {
  const start = config.startNew;
  if (!start || config.focus !== "start") return null;
  return (
    <div className="stx-arc__modalwrap is-start">
      <div className="stx-arc__startdlg is-target">
        <header><b>Start new {start.noun}</b><i aria-hidden="true"><Icon name="close" /></i></header>
        <label>Title</label>
        <span className="stx-arc__startdlg-input is-focus">{start.title}<em className="stx-arc__check-caret" aria-hidden="true" /></span>
        <label>Owner</label>
        <span className="stx-arc__startdlg-input"><Avatar initials={initialsOf(start.owner)} />{start.owner}<Icon name="caret" /></span>
        <label>Participants</label>
        <span className="stx-arc__startdlg-input is-tags">
          {start.participants.map((person) => <em key={person}><Avatar initials={initialsOf(person)} />{person}<i aria-hidden="true">×</i></em>)}
          <small>Search People or Groups</small>
        </span>
        <small className="stx-arc__startdlg-hint">To invite someone externally, please use their email address.</small>
        <footer><b>Create<i className="stx-arc__click" aria-hidden="true" /></b></footer>
      </div>
    </div>
  );
}

function ArcadeInbox({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  const searching = config.focus === "search";
  return (
    <aside className={"stx-arc__inbox" + (world.inboxFilter ? " is-filtered" : "")}>
      <header className="stx-arc__inbox-head"><small>{world.team}</small>{world.inboxFilter ? <b className="is-filter"><Icon name="back" />{world.inboxFilter}</b> : <b>My Conversations <i>24</i></b>}</header>
      <div className={"stx-arc__inbox-search" + (searching ? " is-target" : "")}><span aria-hidden="true"><Icon name="search" /></span><b>{searching || world.inboxFilter ? config.title : "Search conversations"}</b><kbd>⌘K</kbd></div>
      {world.inboxFilter ? null : <div className="stx-arc__inbox-filters"><b>All <i>24</i></b><span>Unread 6</span><span>Mine 12</span></div>}
      <div className="stx-arc__inbox-list">
        {config.inboxNew?.map((row, index) => (
          <article className="is-new" key={row.title} style={{ "--stx-row": index } as React.CSSProperties}>
            <header><b>{row.title}</b><time>Now</time></header><p>{row.detail}</p>
            <footer><span>{row.kind}</span>{row.owner ? <i className="stx-arc__inbox-owner">{row.owner}</i> : null}{row.state ? <StateChip state={row.state} /> : null}</footer>
          </article>
        ))}
        <article className={"is-active" + (searching ? " is-target" : "")}>
          <header><b>{config.title}</b><time>Now</time></header><p>{searching ? world.searchResult : `${config.actor}: ${config.event}`}</p>
          <footer><span>{world.recordNoun}</span><StateChip state={config.status} /></footer>
        </article>
        {(world.inboxFilter ? [] : world.inboxNeighbors).map((row) => (
          <article key={row.title}><header><b>{row.title}</b><time>{row.time}</time></header><p>{row.detail}</p><footer><span>{row.kind}</span></footer></article>
        ))}
      </div>
    </aside>
  );
}

function ArcadeDocumentAttachment({ config }: { config: ArcadeStepConfig }) {
  const doc = config.docTitle ?? config.title;
  return (
    <div className="stx-arc__document-card is-target">
      <header><span><DocumentGlyph complete /></span><p><b>{doc}</b><small>SOP-118 · Revision D · Effective</small></p><StateChip state="Effective" /></header>
      <div className="stx-arc__document-preview"><Sheet mark="EFFECTIVE" tone="effective" /><span><b>{doc}</b><i /><i /><i /><small>Document Classification</small><i /><i /></span></div>
      <footer><span>Signed document · 4 pages</span><b>Open live record</b></footer>
    </div>
  );
}

/* A sealed approval as it actually lands in the conversation (A2 s7): a
 * green signature block with the approval ID, the script signature, and the
 * meaning, posted by the signer. */
function ArcadeSignedItem({ item }: { item: NonNullable<ArcadeStepConfig["signedItems"]>[number] }) {
  return (
    <article className="stx-arc__signeditem">
      <span className="stx-arc__actor" aria-hidden="true">{item.initials}</span>
      <div className="stx-arc__message">
        <header><b>{item.name}</b><time>{item.time}</time></header>
        <div className="stx-arc__signedblock">
          <small>APPROVAL ID · {item.approvalId}</small>
          <b>{item.name}</b>
          <span>{item.role} · Approved<em aria-hidden="true"><Icon name="checks" /></em></span>
        </div>
      </div>
    </article>
  );
}

/* A tick box as the app draws it in the AI suggestion table */
function Box({ on }: { on?: boolean }) {
  return <i className={"stx-arc__assist-box" + (on ? " is-on" : "")} aria-hidden="true">{on ? <Icon name="check" /> : null}</i>;
}

/* The AI suggestion as the product posts it: the asker's message ("asked AI
 * suggestion for <field>"), the Field label / Suggested Value table with a
 * box per row (options inside a "choose only one" cell, embedded-field
 * sub-tables under a record-type field), and "Add to Checklist", greyed
 * until something is ticked. */
function ArcadeAssistMessage({ assist, world }: { assist: ArcadeAssist; world: ArcadeFlowWorld }) {
  const asker = assist.asker ?? viewerName(world);
  const rowOn = (row: ArcadeAssist["rows"][number]) => Boolean(row.picked || row.options?.some((option) => option.picked));
  const picked = assist.rows.some(rowOn);
  const all = assist.rows.every(rowOn);
  return (
    <article className="stx-arc__aimsg">
      <span className="stx-arc__actor is-you" aria-hidden="true">{initialsOf(asker)}</span>
      <div className={"stx-arc__assist is-target" + (picked ? " is-picked" : " is-suggesting") + (assist.pressed ? " is-pressed" : "")}>
        <header><p><b>{asker}</b> asked AI suggestion for <em>{assist.field}</em></p><time>Now</time></header>
        <div className="stx-arc__assist-table">
          <p className="is-head"><Box on={all} /><span>Field label</span><span>Suggested Value</span></p>
          {assist.rows.map((row, index) => (
            <div className={"stx-arc__assist-row" + (rowOn(row) ? " is-picked" : "")} key={row.label} style={{ "--stx-row": index } as React.CSSProperties}>
              <Box on={rowOn(row)} />
              <span className="stx-arc__assist-label">{row.label}</span>
              <div className="stx-arc__assist-value">
                {row.value ? <p>{row.value}</p> : null}
                {row.list ? <p>{row.list.map((line, i) => `${i + 1}.${line}`).join(" ")}</p> : null}
                {row.options?.map((option) => (
                  <p className={"stx-arc__assist-opt" + (option.picked ? " is-picked" : "")} key={option.text}><Box on={option.picked} /><span>{option.text}</span></p>
                ))}
                {row.records?.map((record) => (
                  <div className="stx-arc__assist-rec" key={record.title}>
                    <p className="stx-arc__assist-opt"><Box on={row.picked} /><span>{record.title}</span></p>
                    <div className="stx-arc__assist-sub">
                      <p className="is-head"><span>Embedded field</span><span>Suggested Value</span></p>
                      {record.fields.map((field) => (
                        <p key={field.label}><span><Box on={row.picked} />{field.label}</span><span>{field.value}</span></p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <footer><b>Add to Checklist{assist.pressed ? <i className="stx-arc__click" aria-hidden="true" /> : null}</b></footer>
      </div>
    </article>
  );
}

/* the record composer: the typed @mention and text, and the mention list
 * above it (groups with "All", or people with their email line) */
function ComposerLine({ composer, placeholder }: { composer?: ArcadeComposer; placeholder: string }) {
  if (!composer) return <span className="is-placeholder">{placeholder}</span>;
  return (
    <span className="stx-arc__cmp-text">
      {composer.mention ? <em>@{composer.mention}</em> : null}
      {composer.text ? ` ${composer.text}` : null}
      <i className="stx-arc__check-caret" aria-hidden="true" />
    </span>
  );
}

function MentionPicker({ composer }: { composer?: ArcadeComposer }) {
  if (!composer?.picker) return null;
  const { picker } = composer;
  return (
    <div className="stx-arc__mention" aria-hidden="true">
      {picker.all ? <p className="is-all"><b>All</b><small>(every participant of the conversation)</small></p> : null}
      {picker.rows.map((row, index) => (
        <p className={index === picker.active ? "is-active" : undefined} key={row.name}>
          <Avatar initials={initialsOf(row.name.replace(/^\d+\.\s*/, ""))} />
          <span><b>{row.name}</b><small>{row.note}</small></span>
          {index === picker.active ? <em className="stx-arc__click" aria-hidden="true" /> : null}
        </p>
      ))}
    </div>
  );
}

function ArcadeConversation({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  const isRecord = config.focus === "record";
  const isViewer = config.focus === "viewer";
  const isIssue = config.focus === "issue";
  const isReview = config.focus === "review";
  const isTasksRun = config.focus === "tasks" && config.poseVariant !== "plan";
  const isTrace = config.focus === "trace";
  const isDiff = config.focus === "diff";
  const isComment = config.focus === "comment";
  const isHistory = config.focus === "history";
  const isTraining = config.focus === "training";
  const isRoute = config.focus === "queue" && config.poseVariant === "route";
  const isAssist = config.focus === "assist";
  const recordComplete = !["Draft", "In Review", "Needs Approval"].includes(config.status);
  const runDone = config.checklistOpen
    ? Math.min(config.checklistProgress?.[config.checklistOpen] ?? config.focusRows.length, config.focusRows.length)
    : config.focusRows.length;
  return (
    <main className="stx-arc__conversation">
      <header className="stx-arc__bar"><span><StateChip state={config.status} bell={config.reminder} /><i>{config.id.startsWith(config.type) ? config.id : `${config.type} ${config.id}`}</i></span><b>{config.title}</b><em aria-hidden="true"><Icon name="kebab" /></em></header>
      <div className="stx-arc__ownership">
        <span className="stx-arc__meta-label">Owner</span><Avatar initials={world.ownerInitials} /><b>{world.owner}</b><span className="stx-arc__meta-label">Participants</span>
        <span className="stx-arc__participants" aria-label={world.participantsLabel}>{world.participants.map((chip) => <i key={chip}>{chip}</i>)}</span><span className="stx-arc__ownership-note">{config.ownershipNote}</span>
      </div>
      <section className="stx-arc__thread">
        <span className="stx-arc__today">Today</span>
        {config.signedItems?.length ? null : (
          <article className="stx-arc__thread-context"><span className="stx-arc__actor" aria-hidden="true">{world.context.initials}</span><div className="stx-arc__message"><header><b>{world.context.name}</b><time>{world.context.time}</time></header><p>{world.context.message}</p><small>{world.context.detail}</small></div></article>
        )}
        {config.history?.map((h) => {
          const person = h.actor === "Person";
          if (h.kind === "event") {
            return <p className="stx-arc__thread-event" key={h.time + h.message}><b>{h.actor === "You" || person ? h.name : h.actor}</b> {h.message}<time>{h.time}</time></p>;
          }
          return (
            <article className="stx-arc__thread-past" key={h.time + h.message}>
              <span className={"stx-arc__actor" + (person ? "" : " " + stateClass(h.actor))} aria-hidden="true">{h.actor === "automator" ? "A" : h.actor === "Unifize Assistant" ? <Icon name="person" /> : initialsOf(h.name)}</span>
              <div className="stx-arc__message"><header><b>{h.actor === "You" || person ? h.name : h.actor}</b><time>{h.time}</time></header><p>{h.message}</p>{h.detail ? <small>{h.detail}</small> : null}{h.link ? <span className="stx-arc__message-action">{h.link}</span> : null}</div>
            </article>
          );
        })}
        {config.signedItems?.map((item) => <ArcadeSignedItem item={item} key={item.approvalId} />)}
        {isAssist && config.assist ? <ArcadeAssistMessage assist={config.assist} world={world} /> : null}
        <article hidden={isAssist && Boolean(config.assist)}>
          <span className={"stx-arc__actor " + stateClass(config.actor)} aria-hidden="true">{config.actor === "You" ? viewerInitials(world) : config.actor === "automator" ? "A" : <Icon name="person" />}</span>
          <div className={"stx-arc__message" + (isComment ? " is-target" : "")}><header><b>{config.actor}</b><time>Now</time></header><p>{config.event}</p><small>{config.eventDetail}</small>
            {config.eventLink ? <span className="stx-arc__message-action">{config.eventLink}</span> : null}
            {isComment ? <span className="stx-arc__message-link"><Icon name="arrow" />{config.focusRows[0]}</span> : null}
            {isRecord ? <div className="stx-arc__status-row is-target"><DocumentGlyph complete={recordComplete} /><span><small>{world.recordKicker}</small><b>{config.focusRows[0]}</b><em>{config.focusRows[1]}</em></span><StateChip state={config.status} /></div> : null}
            {isViewer ? <ArcadeDocumentAttachment config={config} /> : null}
            {isReview ? (
              <div className="stx-arc__decision is-target">
                <header><small>{config.focusTitle}</small><StateChip state={config.status} /></header>
                <div>
                  {config.focusRows.map((row) => {
                    const [label, ...rest] = row.split(" · ");
                    return <p key={row}><span>{label}</span><b>{rest.join(" · ")}</b></p>;
                  })}
                </div>
                <footer><b>{config.focusAction}</b>{(config.focusAlts ?? []).map((alt) => <span key={alt}>{alt}</span>)}</footer>
              </div>
            ) : null}
            {isTasksRun ? (
              <div className="stx-arc__taskrun is-target">
                <header><small>{config.focusTitle}</small><b>{runDone} of {config.focusRows.length} complete</b></header>
                {config.focusRows.map((row, index) => {
                  const [task, owner] = row.split(" · ");
                  return (
                    <p className={index < runDone ? "is-done" : "is-progress"} key={row}>
                      <i aria-hidden="true">{index < runDone ? <Icon name="check" /> : <Icon name="half" />}</i>
                      <span><small>Task #{69 + index}{owner ? ` · ${owner}` : ""}</small><b>{task}</b></span>
                      <em>{index < runDone ? "Completed" : "In progress"}</em>
                    </p>
                  );
                })}
              </div>
            ) : null}
            {isTrace ? (
              <div className="stx-arc__trace is-target">
                <header><b>{config.focusTitle}</b><StateChip state={config.status} /></header>
                <div>
                  {config.checklistItems.map((item) => <p key={item}><i aria-hidden="true"><Icon name="check" /></i><span>{item}</span></p>)}
                </div>
                <footer><span>{config.focusRows[0]}</span><b>{config.focusRows[1]}</b></footer>
              </div>
            ) : null}
            {isDiff ? (
              <div className="stx-arc__diffcard is-target">
                <header><small>{config.focusKicker ?? "REVISION"}</small><b>{config.focusAction}</b><StateChip state={config.status} /></header>
                <p className="is-old"><i aria-hidden="true">−</i><span>{config.focusRows[0]}</span></p>
                <p className="is-new"><i aria-hidden="true">+</i><span>{config.focusRows[1]}</span></p>
                <footer>{config.focusRows[2]}</footer>
              </div>
            ) : null}
            {isHistory ? (
              <div className="stx-arc__historycard is-target">
                <header><small>{config.focusKicker ?? "REVISION HISTORY"}</small><b>{config.focusTitle}</b></header>
                <div>
                  {config.focusRows.map((row, index) => (
                    <p className={index === 0 ? "is-current" : ""} key={row}><i aria-hidden="true" /><span>{row}</span></p>
                  ))}
                </div>
              </div>
            ) : null}
            {isTraining ? (
              <div className="stx-arc__traincard is-target">
                <header><small>{config.focusKicker ?? "TRAINING RECORD(S)"}</small><b>{config.focusAction}</b></header>
                {config.focusRows.map((row) => {
                  const [person, role] = row.split(" · ");
                  return (
                    <p key={row}>
                      <i aria-hidden="true">{person.split(/[\s.]+/).filter(Boolean).map((part) => part[0]).join("").toUpperCase().slice(0, 2)}</i>
                      <span><b>{person}</b><small>{role ?? ""}</small></span>
                      <em>Assigned</em>
                    </p>
                  );
                })}
                <footer>{config.eventDetail}</footer>
              </div>
            ) : null}
            {isRoute ? (
              <div className="stx-arc__routecard is-target">
                <header><small>{config.focusKicker ?? "APPROVAL MATRIX"}</small><b>{config.focusTitle}</b></header>
                {config.focusRows.map((row) => {
                  const [person, ...rest] = row.split(" · ");
                  return (
                    <p key={row}>
                      <i aria-hidden="true">{person.split(/[\s.]+/).filter(Boolean).map((part) => part[0]).join("").toUpperCase().slice(0, 2)}</i>
                      <span><b>{person}</b><small>{rest.join(" · ")}</small></span>
                    </p>
                  );
                })}
                <footer><b>{config.focusAction}</b></footer>
              </div>
            ) : null}
          </div>
        </article>
        {isIssue ? <article><span className="stx-arc__actor is-you" aria-hidden="true">{world.ownerInitials}</span><div className="stx-arc__message is-target"><header><b>You</b><time>Now</time></header><p>Section 4.2 does not match the rinse conductivity check on line 2.</p><small>Raised from SOP-118 · document owner notified · revision candidate</small><span className="stx-arc__message-link"><Icon name="arrow" />Related record · SOP-118 Rev D</span></div></article> : null}
      </section>
      <footer className={"stx-arc__composer" + (isIssue || config.focus === "mention" ? " is-target" : "") + (config.composer ? " is-typing" : "")}>
        <MentionPicker composer={config.composer} />
        {config.composer ? (
          <ComposerLine composer={config.composer} placeholder="" />
        ) : (
          <span>{isIssue ? "Add more context…" : `Reply to ${config.id.startsWith(world.recordNoun) ? config.id : `${world.recordNoun} ${config.id}`}…`}</span>
        )}
        <i aria-hidden="true"><Icon name="plus" /></i><b>Send</b>
      </footer>
    </main>
  );
}

/* Embedded record rows as the app lists them under a field: the "#id: title"
 * link, a line of state chip (bell = reminders on), owner and date, and the
 * "View all fields" disclosure. */
function RecordRows({ rows, fresh }: { rows: ArcadeRecordRow[]; fresh?: boolean }) {
  return (
    <>
      {rows.map((row, index) => (
        <span className={"stx-arc__check-rec" + (fresh ? " is-new" : "")} key={row.id} style={{ "--stx-row": index } as React.CSSProperties}>
          <b>{row.id}: {row.title}</b>
          {row.state || row.owner || row.due ? (
            <span>
              {row.state ? <em className={"stx-arc__pill is-" + (row.tone ?? "pending")}>{row.state}{row.reminder ? <Icon name="bell" /> : null}</em> : null}
              {row.owner ? (
                <i className={"stx-arc__check-owner" + (row.owner === "No Owner" ? " is-none" : "")}>
                  {row.owner === "No Owner" ? <span className="stx-av"><Icon name="person" /></span> : <Avatar initials={initialsOf(row.owner)} />}
                  {row.owner}
                </i>
              ) : null}
              {row.due ? <i className={"stx-arc__check-due" + (row.late ? " is-late" : "")}><Icon name="calendar" />{row.due}</i> : null}
            </span>
          ) : null}
          <small>View all fields<Icon name="caret" /></small>
        </span>
      ))}
    </>
  );
}

/* a field's open dropdown: a picklist's options, or a linked field's search
 * results with "+ Create" */
function FieldPick({ pick }: { pick: NonNullable<ArcadeStepConfig["checklistPick"]> }) {
  return (
    <span className="stx-arc__check-pick">
      {pick.options.map((option, index) => (
        <span className={index === pick.active ? "is-active" : undefined} key={option}>
          {option}
          {index === pick.active ? <em className="stx-arc__click" aria-hidden="true" /> : null}
        </span>
      ))}
      {pick.create ? <b>+ Create {pick.create}</b> : null}
    </span>
  );
}

/* A field's control by its input type, as the app draws that type: text
 * and number carry the value; a picklist its choice and caret; a date the
 * calendar mark; rich text its paragraphs (a "# " line is a bold heading);
 * a file its name and size; a person their avatar. Empty, the control shows
 * the app's own affordance ("+ Add Text", "Select", "+ Add Date"). */
const EMPTY_INPUT: Record<NonNullable<ArcadeChecklistItem["input"]>, string> = {
  text: "+ Add Text",
  number: "+ Add Number",
  select: "Select",
  date: "+ Add Date",
  rich: "+ Add Rich Text",
  file: "+ Attach File",
  user: "Select",
};

function FieldControl({ item, entering, pick }: { item: ArcadeChecklistItem; entering: boolean; pick?: NonNullable<ArcadeStepConfig["checklistPick"]> }) {
  const input = item.input ?? "text";
  const value = pick ? pick.query ?? "" : item.value ?? "";
  const caret = entering || pick ? <em className="stx-arc__check-caret" aria-hidden="true" /> : null;
  const empty = !value && !item.lines?.length && !caret;
  const cls = "stx-arc__check-input is-" + input + (empty ? " is-empty" : "") + (pick ? " is-open" : "") + (item.lines?.length ? " is-long" : "");
  if (empty) return <span className={cls}>{item.placeholder ?? EMPTY_INPUT[input]}{input === "select" || input === "user" ? <Icon name="caret" /> : null}</span>;
  if (input === "select") return <span className={cls}><span>{value}{caret}</span><Icon name="caret" /></span>;
  if (input === "date") return <span className={cls}><Icon name="calendar" />{value}{caret}</span>;
  if (input === "user") return <span className={cls}><Avatar initials={initialsOf(value)} />{value}{caret}</span>;
  if (input === "file") {
    const [name, size] = value.split(" · ");
    return <span className={cls}><DocumentGlyph /><span><b>{name}</b>{size ? <small>{size}</small> : null}</span></span>;
  }
  if (input === "rich" && item.lines?.length) {
    return (
      <span className={cls}>
        {item.lines.map((line) => (line.startsWith("# ") ? <b key={line}>{line.slice(2)}</b> : <span key={line}>{line}</span>))}
      </span>
    );
  }
  return <span className={cls}>{value}{caret}</span>;
}

/* One checklist row, by kind: fact (check + note), field (an input of its
 * real type carrying entered data, with a live caret while this step types
 * it and its dropdown when a person is picking), approval (who signed and
 * the sealed state), signature (the app's "+ Add Signature 1" slot until
 * signed), revision (old value to new value), linked (record chips, or
 * freshly linked records), records (embedded records with state, owner and
 * date), ask (the app's AI button, where it sits in the checklist). This is
 * the checklist as the product has it - data entry, approvals, and revisions
 * live IN the checklist, not beside it. */
function ArcadeChecklistRow({
  item,
  done,
  entering,
  links,
  linkRecords,
  asked,
  fresh,
  pick,
}: {
  item: ArcadeChecklistItem;
  done: boolean;
  entering: boolean;
  /* linked rows: detail for freshly linked ids (they render as record rows) */
  linkRecords?: ArcadeRecordRow[];
  /* ask rows: the button is pressed this step */
  asked?: boolean;
  /* linked rows: this step's list when it rewrites the field (ids beyond
   * the world's resting list render as freshly linked) */
  links?: string[];
  /* written this step (by AI, or by Add to Checklist) */
  fresh?: boolean;
  /* this field's dropdown is open this step */
  pick?: NonNullable<ArcadeStepConfig["checklistPick"]>;
}) {
  const freshClass = fresh ? " is-fresh" : "";
  if (item.kind === "linked") {
    const resting = item.links ?? [];
    const shown = links ?? resting;
    const rewritten = Boolean(links) || Boolean(pick);
    return (
      <p className={"stx-arc__check-linkeditem" + (rewritten ? " is-target" : "") + freshClass}>
        <i>{done ? <Icon name="check" /> : null}</i>
        <span>
          <b>{item.label}</b>
          <span className="stx-arc__check-links">
            {shown.filter((id) => resting.includes(id) || !linkRecords?.some((row) => row.id === id)).map((id) => (
              <em className={resting.includes(id) ? "" : "is-new"} key={id}>{id}</em>
            ))}
          </span>
          <RecordRows rows={linkRecords?.filter((row) => shown.includes(row.id) && !resting.includes(row.id)) ?? []} fresh />
          {pick ? <><span className="stx-arc__check-input is-open">{pick.query ?? ""}<em className="stx-arc__check-caret" aria-hidden="true" /></span><FieldPick pick={pick} /></> : null}
          {!shown.length && !pick ? <span className="stx-arc__check-input is-empty">{item.placeholder ?? "+ Add"}</span> : null}
          {item.note ? <small>{item.note}</small> : null}
        </span>
      </p>
    );
  }
  if (item.kind === "records") {
    return (
      <p className={"stx-arc__check-recitem" + freshClass}>
        <i>{done ? <Icon name="check" /> : null}</i>
        <span>
          <b>{item.label}</b>
          {item.records?.length ? <RecordRows rows={item.records} /> : <span className="stx-arc__check-input is-empty">{item.placeholder ?? "+ Add"}</span>}
          {item.note ? <small>{item.note}</small> : null}
        </span>
      </p>
    );
  }
  if (item.kind === "ask") {
    return (
      <p className={"stx-arc__check-askitem" + (asked ? " is-target" : "")}>
        <i>{done ? <Icon name="check" /> : null}</i>
        <span>
          <b>{item.label}</b>
          <span className={"stx-arc__check-ask" + (asked ? " is-pressed" : "")}>
            <Icon name="wand" />
            <span>{item.value ?? ""}{item.note ? ` (${item.note})` : ""}</span>
            {asked ? <i className="stx-arc__click" aria-hidden="true" /> : null}
          </span>
        </span>
      </p>
    );
  }
  if (item.kind === "field") {
    return (
      <p className={"stx-arc__check-fielditem" + (entering || pick ? " is-entering is-target" : "") + freshClass}>
        <i>{!entering && !pick && done ? <Icon name="check" /> : null}</i>
        <span>
          <b>{item.label}</b>
          <FieldControl item={item} entering={entering} pick={pick} />
          {pick ? <FieldPick pick={pick} /> : null}
          {item.note ? <small>{item.note}</small> : null}
        </span>
      </p>
    );
  }
  if (item.kind === "signature") {
    return (
      <p className="stx-arc__check-signitem">
        <i>{done ? <Icon name="check" /> : null}</i>
        <span>
          <b>{item.label}</b>
          {done ? (
            <span className="stx-arc__check-signed"><b>{item.signer ?? ""}</b><small>{item.state ?? "Signed"}<Icon name="checks" /></small></span>
          ) : (
            <span className="stx-arc__check-sign">+ Add Signature 1</span>
          )}
          {item.note ? <small>{item.note}</small> : null}
        </span>
      </p>
    );
  }
  if (item.kind === "approval") {
    const initials = (item.signer ?? "").split(/[\s.]+/).filter(Boolean).map((part) => part[0]).join("").toUpperCase().slice(0, 2);
    return (
      <p className="stx-arc__check-approvalitem">
        <i className="stx-arc__check-signer" aria-hidden="true">{initials}</i>
        <span><b>{item.label}</b><small>{item.signer ?? ""}</small></span>
        <em className={done ? "is-signed" : ""}>{done ? item.state ?? "Signed" : "Pending"}</em>
      </p>
    );
  }
  if (item.kind === "revision") {
    return (
      <p className="stx-arc__check-revitem">
        <i>{done ? <Icon name="check" /> : null}</i>
        <span>
          <b>{item.label}</b>
          <span className="stx-arc__check-rev">
            <s>{item.from ?? ""}</s>
            <i aria-hidden="true">→</i>
            <b>{item.to ?? ""}</b>
          </span>
          {item.note ? <small>{item.note}</small> : null}
        </span>
      </p>
    );
  }
  return (
    <p>
      <i>{done ? <Icon name="check" /> : null}</i>
      <span><b>{item.label}</b><small>{item.note ?? ""}</small></span>
    </p>
  );
}

function ArcadeChecklist({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  /* Sections and items are world-owned and mounted for the whole journey;
   * each step only opens one section and advances done counts, so the panel
   * reads as one live record instead of a re-dressed prop. */
  const doneOf = (section: ArcadeChecklistSection) =>
    Math.min(config.checklistProgress?.[section.title] ?? section.items.length, section.items.length);
  const open = world.checklistSections.find((section) => section.title === config.checklistOpen);
  const targeted =
    config.focus === "print" ||
    config.focus === "checklist" ||
    (config.focus === "tasks" && config.poseVariant === "plan");
  const barDone = open ? doneOf(open) : world.checklistSections.reduce((n, s) => n + doneOf(s), 0);
  const barTotal = open ? open.items.length : world.checklistSections.reduce((n, s) => n + s.items.length, 0);
  const on = (ref: { section: string; item: string } | undefined, section: ArcadeChecklistSection, item: ArcadeChecklistItem) =>
    ref?.section === section.title && ref.item === item.label;
  return (
    <aside
      className="stx-arc__checklist"
      style={config.checklistScroll ? ({ "--stx-check-scroll": `${config.checklistScroll}px` } as React.CSSProperties) : undefined}
    >
      <header><span><small>CHECKLIST</small><b>{world.checklistTitle}</b></span><i aria-hidden="true"><Icon name="close" /></i></header>
      <div className="stx-arc__check-progress"><span>Completion</span><b>{barDone} / {barTotal}</b><i><em style={{ width: `${Math.round((barDone / Math.max(barTotal, 1)) * 100)}%` }} /></i></div>
      {world.checklistSections.map((section) => {
        const done = doneOf(section);
        const isOpen = section === open;
        const entryHere = [config.checklistEntry, config.checklistAsk, config.checklistPick].some((ref) => ref?.section === section.title);
        return (
          <section className={(isOpen ? "is-open" : "") + (isOpen && targeted && !entryHere ? " is-target" : "")} key={section.title}>
            <header><span className={done === section.items.length ? "is-done" : done > 0 ? "is-progress" : ""} /><b>{section.title}</b><em>{done}/{section.items.length}</em><i aria-hidden="true"><Icon name="chevron" /></i></header>
            <div className="stx-arc__check-items">
              <div>
                {section.items.map((item, index) => (
                  <ArcadeChecklistRow
                    done={index < done}
                    entering={on(config.checklistEntry, section, item)}
                    links={on(config.checklistLinks, section, item) ? config.checklistLinks?.links : undefined}
                    linkRecords={on(config.checklistLinks, section, item) ? config.checklistLinks?.records : undefined}
                    asked={on(config.checklistAsk, section, item)}
                    fresh={config.checklistFilled?.section === section.title && config.checklistFilled.items.includes(item.label)}
                    pick={on(config.checklistPick, section, item) ? config.checklistPick : undefined}
                    item={item}
                    key={item.label}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <section><header><span /><b>Related record(s)</b><em>{config.related ?? 1}</em><i aria-hidden="true"><Icon name="chevron" /></i></header></section>
      {config.checklistFootnote ? <footer><span>{config.checklistFootnote}</span><b>{config.focusAction}</b></footer> : null}
    </aside>
  );
}

/* which page of the one window is up this step */
function pageOf(config: ArcadeStepConfig): string {
  if (isHomePage(config)) return " is-page-home";
  if (config.focus === "dashboard") return " is-page-dashboard";
  if (config.focus === "builder") return " is-page-builder";
  const over = config.focus === "modal" ? config.modal?.over : undefined;
  if (config.focus === "report" || over === "report") return " is-page-report";
  if (config.focus === "dashboards" || over === "dashboards") return " is-page-dashboards";
  return "";
}

export function ArcadeStepScene({ config }: { config: ArcadeStepConfig }) {
  const world = config.world ?? DOCUMENT_WORLD;
  const pageClass = pageOf(config) + (config.focus === "modal" ? " is-modal-open" : "");
  const railActive = pageClass.includes("is-page-home")
    ? "home"
    : /is-page-(dashboard|report)/.test(pageClass)
      ? "reports"
      : pageClass.includes("is-page-dashboards")
        ? "dashboards"
        : pageClass.includes("is-page-builder")
          ? "settings"
          : "records";
  return (
    <div className="stx-root">
      <Scene config={config}>
        <div className={`stx-arc ${poseClass(config)}${pageClass}`} data-arcade-source={config.source}>
          <div className={`stx-arc__camera ${poseClass(config)}${pageClass}`}>
            <ArcadeRail world={world} active={railActive} />
            <ArcadeInbox config={config} world={world} /><ArcadeConversation config={config} world={world} /><ArcadeChecklist config={config} world={world} />
            <ArcadeHome config={config} world={world} />
            <ArcadeReports config={config} world={world} />
            <ArcadeDashboard config={config} world={world} />
            <ArcadeBuilder config={config} world={world} />
            <ArcadeReportPage config={config} world={world} />
            <ArcadeDashboardsPage config={config} world={world} />
            {config.focus === "signature" ? <ArcadeSignDialog config={config} world={world} /> : null}
            <ArcadeModal config={config} world={world} />
            <ArcadeStartDialog config={config} />
          </div>
        </div>
      </Scene>
    </div>
  );
}
