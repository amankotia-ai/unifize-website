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
  | "checklist";

/* A checklist item is not just a check mark (Ben, Aug 5): plain rows carry
 * facts, `field` rows carry data entry (an input with its entered value),
 * `approval` rows carry a signature state, `revision` rows carry an
 * old-to-new revision. Kinds change rendering only, never counts, so the
 * sections-never-change-mid-journey rule holds. */
export type ArcadeChecklistItem = {
  label: string;
  note?: string;
  kind?: "field" | "approval" | "revision";
  /* field: the entered value shown inside the input */
  value?: string;
  /* approval: who signs, and the sealed state ("Signed", "Granted") */
  signer?: string;
  state?: string;
  /* revision: the change the row carries */
  from?: string;
  to?: string;
};
export type ArcadeChecklistSection = { title: string; items: ArcadeChecklistItem[] };

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
  homeTiles?: { label: string; count: number }[];
  /* reports page; its presence mounts the dashboard page the "dashboard"
   * pose navigates to (same one-window page-change idiom as home) */
  reports?: {
    title: string;
    kpis: { label: string; value: string; note?: string }[];
    panels: { label: string; kind: "bars" | "donut" | "lines" }[];
  };
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
  /* the checklist field being ENTERED this step (checklist pose): the named
   * item renders as a focused input with a live caret and the target ring */
  checklistEntry?: { section: string; item: string };
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
  | "check" | "checks" | "half" | "arrow";

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
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg className={"stx-i is-" + name} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const stateClass = (state: string) => "is-" + state.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const poseClass = (config: ArcadeStepConfig) =>
  `is-focus-${config.focus}` + (config.poseVariant ? ` is-pose-${config.poseVariant}` : "");
const viewerName = (world: ArcadeFlowWorld) => world.viewer ?? world.owner;
const viewerInitials = (world: ArcadeFlowWorld) => world.viewerInitials ?? world.ownerInitials;
/* queue steps land on the home strip unless a variant restages them in-thread */
const isHomeQueue = (config: ArcadeStepConfig) => config.focus === "queue" && config.poseVariant !== "route";

function StateChip({ state }: { state: string }) {
  return <span className={"stx-state " + stateClass(state)}><i aria-hidden="true" />{state}</span>;
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

function ArcadeRail({ world, active = "records" }: { world: ArcadeFlowWorld; active?: "home" | "records" | "reports" | "settings" }) {
  return (
    <nav className="stx-arc__rail" aria-label="Product navigation">
      <span className="stx-arc__rail-logo">U</span>
      <span className={active === "home" ? "is-active" : ""} aria-hidden="true"><Icon name="home" /></span>
      <span className={active === "records" ? "is-active" : ""} aria-hidden="true"><Icon name="records" /></span>
      <span className={active === "reports" ? "is-active" : ""} aria-hidden="true"><Icon name="reports" /></span>
      <span aria-hidden="true"><Icon name="grid" /></span><span aria-hidden="true"><Icon name="people" /></span><i />
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
  if (!world.homeTiles) return null;
  const queued = isHomeQueue(config);
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
                  ) : (
                    <div className="stx-arc__home-skeleton" aria-hidden="true"><i /><i /></div>
                  )}
                </section>
              );
            })}
          </div>
          <div className="stx-arc__home-side" aria-hidden="true">
            <small>Overview</small>
            <section className="is-chart">
              <b>Documents by state</b>
              <span className="stx-arc__home-bars"><i /><i /><i /><i /><i /><i /></span>
            </section>
            <section className="is-updates">
              <b>Updates since you were gone</b>
              <span className="stx-arc__home-lines"><i /><i /><i /></span>
              <em>Take me there</em>
            </section>
          </div>
        </div>
      </div>
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
  if (!world.reports) return null;
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
        <header><span><small>21 CFR PART 11</small><b>{config.focusTitle}</b></span><i aria-hidden="true"><Icon name="close" /></i></header>
        <div className="stx-arc__sign-type"><span>Type</span><b><i aria-hidden="true" />Approval</b><em>Rejection</em></div>
        <div className="stx-arc__sign-field"><span>Email id</span><i>{viewerName(world).toLowerCase().replace(/[^a-z]/g, "")}@engineering.example</i></div>
        <div className="stx-arc__sign-field"><span>Password</span><i>••••••••••</i></div>
        <div className="stx-arc__sign-signature"><span>System generated signature</span><b>{viewerName(world)}</b></div>
        <footer><b>{config.focusAction}</b><span>Cancel</span></footer>
      </div>
    </div>
  );
}

function ArcadeInbox({ config, world }: { config: ArcadeStepConfig; world: ArcadeFlowWorld }) {
  const searching = config.focus === "search";
  return (
    <aside className="stx-arc__inbox">
      <header className="stx-arc__inbox-head"><small>{world.team}</small><b>My Conversations <i>24</i></b></header>
      <div className={"stx-arc__inbox-search" + (searching ? " is-target" : "")}><span aria-hidden="true"><Icon name="search" /></span><b>{searching ? config.title : "Search conversations"}</b><kbd>⌘K</kbd></div>
      <div className="stx-arc__inbox-filters"><b>All <i>24</i></b><span>Unread 6</span><span>Mine 12</span></div>
      <div className="stx-arc__inbox-list">
        <article className={"is-active" + (searching ? " is-target" : "")}>
          <header><b>{config.title}</b><time>Now</time></header><p>{searching ? world.searchResult : `${config.actor}: ${config.event}`}</p>
          <footer><span>{world.recordNoun}</span><StateChip state={config.status} /></footer>
        </article>
        {world.inboxNeighbors.map((row) => (
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
  const recordComplete = !["Draft", "In Review", "Needs Approval"].includes(config.status);
  const runDone = config.checklistOpen
    ? Math.min(config.checklistProgress?.[config.checklistOpen] ?? config.focusRows.length, config.focusRows.length)
    : config.focusRows.length;
  return (
    <main className="stx-arc__conversation">
      <header className="stx-arc__bar"><span><StateChip state={config.status} /><i>{config.id.startsWith(config.type) ? config.id : `${config.type} ${config.id}`}</i></span><b>{config.title}</b><em aria-hidden="true"><Icon name="kebab" /></em></header>
      <div className="stx-arc__ownership">
        <span className="stx-arc__meta-label">Owner</span><Avatar initials={world.ownerInitials} /><b>{world.owner}</b><span className="stx-arc__meta-label">Participants</span>
        <span className="stx-arc__participants" aria-label={world.participantsLabel}>{world.participants.map((chip) => <i key={chip}>{chip}</i>)}</span><span className="stx-arc__ownership-note">{config.ownershipNote}</span>
      </div>
      <section className="stx-arc__thread">
        <span className="stx-arc__today">Today</span>
        {config.signedItems?.length ? null : (
          <article className="stx-arc__thread-context"><span className="stx-arc__actor" aria-hidden="true">{world.context.initials}</span><div className="stx-arc__message"><header><b>{world.context.name}</b><time>{world.context.time}</time></header><p>{world.context.message}</p><small>{world.context.detail}</small></div></article>
        )}
        {config.signedItems?.map((item) => <ArcadeSignedItem item={item} key={item.approvalId} />)}
        <article>
          <span className={"stx-arc__actor is-" + stateClass(config.actor)} aria-hidden="true">{config.actor === "You" ? viewerInitials(world) : config.actor === "automator" ? "A" : "U"}</span>
          <div className={"stx-arc__message" + (isComment ? " is-target" : "")}><header><b>{config.actor}</b><time>Now</time></header><p>{config.event}</p><small>{config.eventDetail}</small>
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
      <footer className={"stx-arc__composer" + (isIssue ? " is-target" : "")}><span>{isIssue ? "Add more context…" : `Reply to ${config.id.startsWith(world.recordNoun) ? config.id : `${world.recordNoun} ${config.id}`}…`}</span><i aria-hidden="true"><Icon name="plus" /></i><b>Send</b></footer>
    </main>
  );
}

/* One checklist row, by kind: fact (check + note), field (an input carrying
 * entered data, with a live caret while this step types it), approval (who
 * signed and the sealed state), revision (old value to new value). This is
 * the checklist as the product has it - data entry, approvals, and revisions
 * live IN the checklist, not beside it. */
function ArcadeChecklistRow({
  item,
  done,
  entering,
}: {
  item: ArcadeChecklistItem;
  done: boolean;
  entering: boolean;
}) {
  if (item.kind === "field") {
    return (
      <p className={"stx-arc__check-fielditem" + (entering ? " is-entering is-target" : "")}>
        <i>{!entering && done ? <Icon name="check" /> : null}</i>
        <span>
          <b>{item.label}</b>
          <span className="stx-arc__check-input">
            {item.value ?? ""}
            {entering ? <em className="stx-arc__check-caret" aria-hidden="true" /> : null}
          </span>
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
  return (
    <aside className="stx-arc__checklist">
      <header><span><small>CHECKLIST</small><b>{world.checklistTitle}</b></span><i aria-hidden="true"><Icon name="close" /></i></header>
      <div className="stx-arc__check-progress"><span>Completion</span><b>{barDone} / {barTotal}</b><i><em style={{ width: `${Math.round((barDone / Math.max(barTotal, 1)) * 100)}%` }} /></i></div>
      {world.checklistSections.map((section) => {
        const done = doneOf(section);
        const isOpen = section === open;
        const entryHere = config.checklistEntry?.section === section.title;
        return (
          <section className={(isOpen ? "is-open" : "") + (isOpen && targeted && !entryHere ? " is-target" : "")} key={section.title}>
            <header><span className={done === section.items.length ? "is-done" : done > 0 ? "is-progress" : ""} /><b>{section.title}</b><em>{done}/{section.items.length}</em><i aria-hidden="true"><Icon name="chevron" /></i></header>
            <div className="stx-arc__check-items">
              <div>
                {section.items.map((item, index) => (
                  <ArcadeChecklistRow
                    done={index < done}
                    entering={entryHere && config.checklistEntry?.item === item.label}
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

export function ArcadeStepScene({ config }: { config: ArcadeStepConfig }) {
  const world = config.world ?? DOCUMENT_WORLD;
  const isDashboard = config.focus === "dashboard";
  const isBuilder = config.focus === "builder";
  const pageClass = isHomeQueue(config) ? " is-page-home" : isDashboard ? " is-page-dashboard" : isBuilder ? " is-page-builder" : "";
  const railActive = isHomeQueue(config) ? "home" : isDashboard ? "reports" : isBuilder ? "settings" : "records";
  return (
    <div className="stx-root">
      <Scene config={config}>
        <div className={`stx-arc ${poseClass(config)}${pageClass}`} data-arcade-source={config.source}>
          <div className={`stx-arc__camera ${poseClass(config)}${pageClass}`}>
            <ArcadeRail world={world} active={railActive} />
            <ArcadeInbox config={config} world={world} /><ArcadeConversation config={config} world={world} /><ArcadeChecklist config={config} world={world} />
            <ArcadeHome config={config} world={world} />
            <ArcadeReports config={config} world={world} />
            <ArcadeBuilder config={config} world={world} />
            {config.focus === "signature" ? <ArcadeSignDialog config={config} world={world} /> : null}
          </div>
        </div>
      </Scene>
    </div>
  );
}
