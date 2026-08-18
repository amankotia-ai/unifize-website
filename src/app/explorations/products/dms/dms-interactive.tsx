"use client";

/* ----------------------------------------------------------------------------
 * dms-interactive.tsx - the interactive layer of the DMS product page.
 *   ModuleExplorer     - module accordion with a staged prototype per module.
 *   LifecycleExplorer  - node-rail lifecycle diagram with a detail panel.
 *   FaqAccordion       - one-open-at-a-time FAQ.
 * Design: wide, quiet, and systems-led, with staged product prototypes and
 * direct tab controls. All state is local and degrades
 * to a sensible default without JS (first module, Effective state, first
 * FAQ open).
 * -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { Tabs } from "@base-ui/react/tabs";
import { ChatShell } from "@/components/organisms";
import { cn } from "@/lib/cn";
import { MODULES, LIFECYCLE, FAQS, type DmsFlow } from "./dms-data";
import { Eyebrow, ShellFrame, StagePanel } from "./dms-primitives";
import { MockChangeWorkspace, MockDocumentWorkspace, MockTrainingWorkspace } from "./dms-mocks";
import { ArcadeStepScene, type ArcadeStepConfig } from "../_shared/arcade/arcade";

/* ============================================================ shared bits */

const pad = (n: number) => String(n).padStart(2, "0");

const MODULE_POINT_ICONS: Record<string, string[]> = {
  "document-control": ["template", "route", "distribute", "review"],
  "change-control": ["change", "matrix", "evidence", "training"],
  "training-management": ["roles", "assign", "assessment", "report"],
};

const POINT_GLYPHS: Record<string, React.ReactNode> = {
  template: (
    <>
      <path d="M3 1.5h6.5L13 5v9.5H3V1.5Z" />
      <path className="dms-modx__icon-cut" d="M9.25 1.75v3.5h3.5M5.4 8h5.2M5.4 10.5h4" />
    </>
  ),
  route: (
    <>
      <circle cx="4" cy="3" r="2" /><circle cx="4" cy="13" r="2" /><circle cx="12" cy="8" r="2" />
      <path d="M3.25 4.8h1.5v2.45h5.4v1.5h-5.4v2.45h-1.5V4.8Z" />
    </>
  ),
  distribute: <path d="M6.25 1.5h3.5v5H13L8 11.5 3 6.5h3.25v-5ZM2 12h12v2.5H2V12Z" />,
  review: (
    <>
      <circle cx="8" cy="8" r="6.5" />
      <path className="dms-modx__icon-cut" d="M8 4.2v4.1l2.8 1.7" />
    </>
  ),
  change: (
    <>
      <path d="M2.5 1.5h7.25L13 4.75V10l-4.5 4.5h-6V1.5Z" />
      <path d="m9.2 12.7 4.45-4.45 1.1 1.1-4.45 4.45-1.8.7.7-1.8Z" />
      <path className="dms-modx__icon-cut" d="M9.5 1.8V5h3.2" />
    </>
  ),
  matrix: (
    <>
      <rect x="1.5" y="1.5" width="5.5" height="5.5" /><rect x="9" y="1.5" width="5.5" height="5.5" />
      <rect x="1.5" y="9" width="5.5" height="5.5" /><rect x="9" y="9" width="5.5" height="5.5" />
    </>
  ),
  evidence: (
    <>
      <path d="M3 1.5h7l3 3v10H3v-13Z" />
      <path className="dms-modx__icon-cut" d="M9.7 1.8v3h3M5.5 8h5M5.5 10.5h3.5" />
      <circle cx="11.75" cy="12.25" r="2.25" />
    </>
  ),
  training: (
    <>
      <path d="m1 5 7-3.5L15 5 8 8.5 1 5Z" />
      <path d="M3.5 7.2 8 9.45l4.5-2.25v3.3c-2.7 2.2-6.3 2.2-9 0V7.2Z" />
      <rect x="13.5" y="5" width="1.3" height="5" />
    </>
  ),
  roles: (
    <>
      <circle cx="5" cy="5" r="3" /><circle cx="11.5" cy="5.5" r="2.3" />
      <path d="M.75 14.5c.2-4 1.8-6 4.25-6s4.05 2 4.25 6H.75ZM9 14.5c.1-3.1 1.2-4.8 3.1-4.8 1.85 0 2.9 1.7 3.15 4.8H9Z" />
    </>
  ),
  assign: <path d="M9.1.75 2.4 8.9h4.2l-.4 6.35 7.4-9h-4.3L9.1.75Z" />,
  assessment: (
    <>
      <circle cx="8" cy="8" r="6.5" />
      <path className="dms-modx__icon-cut" d="m4.6 8.2 2.2 2.2 4.7-4.8" />
    </>
  ),
  report: <path d="M1.5 12h2.75v2.5H1.5V12Zm3.75-5h2.75v7.5H5.25V7ZM9 9.5h2.75v5H9v-5ZM12.75 2h2.25v12.5h-2.25V2Z" />,
};

function ModulePointIcon({ name }: { name: string }) {
  return (
    <svg className="dms-modx__point-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {POINT_GLYPHS[name]}
    </svg>
  );
}

/* ============================================================ module story */

const MODULE_MOCKS: Record<string, React.ReactNode> = {
  "document-control": <MockDocumentWorkspace />,
  "change-control": <MockChangeWorkspace />,
  "training-management": <MockTrainingWorkspace />,
};

export type DmsModuleExplorerItem = {
  key: string;
  name: string;
  promise?: string;
  blurb: string;
  points?: string[];
  standards?: string[];
};

type ModuleExplorerProps = {
  modules?: DmsModuleExplorerItem[];
  mocks?: Record<string, React.ReactNode>;
  heading?: string;
  lede?: string;
  ariaLabel?: string;
  urlBase?: string;
  pointIcons?: Record<string, string[]>;
  /** false drops the browser ShellFrame so mocks stage as bare stylized
   * fragments on the brand field (the dms/stylized exploration). */
  frame?: boolean;
  /** one persistent arcade record scene keyed by module: the active module
   * swaps the config on the SAME scene instance, so tab changes PAN the
   * camera instead of crossfading between stacked cards. Overrides mocks. */
  arcadeConfigsByModule?: Record<string, ArcadeStepConfig>;
};

export function ModuleExplorer({
  modules = MODULES,
  mocks = MODULE_MOCKS,
  heading = "Three modules. One continuous record.",
  lede = "The change, the controlled revision, and the training obligation stay connected from the first decision to the final signature.",
  ariaLabel = "DMS modules",
  urlBase = "",
  pointIcons = MODULE_POINT_ICONS,
  frame = true,
  arcadeConfigsByModule,
}: ModuleExplorerProps = {}) {
  const [active, setActive] = useState(0);

  const m = modules[active];
  const activeArcadeConfig = arcadeConfigsByModule
    ? arcadeConfigsByModule[m.key] ?? Object.values(arcadeConfigsByModule)[0]
    : undefined;

  return (
    <div className="dms-wrap dms-modx">
      <div className="dms-modx__head">
        <Eyebrow n={2}>What is bundled</Eyebrow>
        <h2 className="dms-h2">{heading}</h2>
        <p className="dms-lede">{lede}</p>
      </div>
      <div className="dms-modx__layout">
        <div className="dms-modx__sidebar">
          <div className="dms-modx__row" role="group" aria-label={ariaLabel}>
            {modules.map((mod, i) => {
              const modIcons = pointIcons[mod.key] ?? ["evidence", "route", "review", "report"];
              const isActive = i === active;

              return (
                <div className={`dms-modx__item${isActive ? " is-active" : ""}`} key={mod.key}>
                  <button
                    type="button"
                    id={`dms-module-button-${i}`}
                    className={"dms-modx__it" + (isActive ? " is-active" : "")}
                    aria-pressed={isActive}
                    aria-expanded={isActive}
                    aria-controls={`dms-module-detail-${i} dms-module-panel`}
                    onClick={() => setActive(i)}
                  >
                    <span className="dms-modx__idx dms-data">{pad(i + 1)}</span>
                    <span className="dms-modx__name">{mod.name}</span>
                    <span className="dms-modx__blurb">{mod.promise ?? mod.blurb}</span>
                  </button>
                  <div
                    className="dms-modx__copy"
                    id={`dms-module-detail-${i}`}
                    role="region"
                    aria-labelledby={`dms-module-button-${i}`}
                    hidden={!isActive}
                  >
                    <div className="dms-modx__summary">
                      <span className="dms-modx__copy-label">What it does</span>
                      <p>{mod.blurb}</p>
                    </div>
                    {(mod.points ?? []).length ? (
                      <div className="dms-modx__controls">
                        <span className="dms-modx__copy-label">Included controls</span>
                        <ul>
                          {(mod.points ?? []).map((point, pointIndex) => (
                            <li key={point}>
                              <ModulePointIcon name={modIcons[pointIndex] ?? "evidence"} />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="dms-modx__panel" id="dms-module-panel" aria-live="polite">
          <StagePanel className={cn("dms-stage--brand dms-modx__stage", activeArcadeConfig && "dms-modx__stage--arcade")}>
            <div className="dms-modx__screens">
              {activeArcadeConfig ? (
                /* ONE scene, config swapped in place: the camera pans between
                 * module poses instead of crossfading stacked cards */
                <div className="dms-modx__card is-active">
                  <ArcadeStepScene config={activeArcadeConfig} />
                </div>
              ) : (
                modules.map((module, moduleIndex) => (
                  <div
                    className={`dms-modx__card${moduleIndex === active ? " is-active" : ""}`}
                    key={module.key}
                    aria-hidden={moduleIndex !== active}
                  >
                    {frame ? (
                      <ShellFrame panel url={`app.unifize.com / ${urlBase ? `${urlBase} / ` : ""}${module.key.replace(/-/g, " ")}`}>
                        {mocks[module.key]}
                      </ShellFrame>
                    ) : (
                      mocks[module.key]
                    )}
                  </div>
                ))
              )}
            </div>
            {m.standards?.length ? (
              <div className="dms-modx__standards" aria-label="Standards supported by this module">
                {m.standards.map((standard) => <span key={standard}>{standard}</span>)}
              </div>
            ) : null}
          </StagePanel>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ lifecycle
 * Shared selector by default; DMS can opt into the homepage-style scroll
 * story, where the live record stays pinned beside the lifecycle copy. */

/* Scrub points into the ChatShell timeline (0..1) per lifecycle state:
 * Draft → change raised; In Review → cross-functional review; In Approval →
 * Part 11 signature; Effective → record card lands; Superseded → "Rev D live,
 * Rev C retired" row ticks; Obsolete → audit trail sealed. */
const LIFE_PROGRESS = [0.17, 0.49, 0.72, 0.94, 0.97, 1];
type LifecycleExplorerProps = {
  steps?: { state: string; gate: string; detail: string; visual?: string }[];
  heading?: string;
  trailLabel?: string;
  ariaLabel?: string;
  liveLabel?: string;
  chatVariant?: "capa" | "change-control";
  progressPoints?: number[];
  /** one pre-rendered prototype per step, staged in the live panel instead of
   * the ChatShell (for products whose lifecycle has no chat script). */
  stageMocks?: React.ReactNode[];
  stageUrl?: string;
  /** false stages the mocks bare (no browser ShellFrame) for stylized
   * fragment scenes. */
  stageFrame?: boolean;
  /** index stageMocks by lifecycle station instead of story step, so one
   * mock per lifecycle state also serves flow mode (steps map to stations). */
  stageByStation?: boolean;
  /** Plain step data for flows whose product scene must persist while its
   * camera pans between poses instead of replacing a pre-rendered node. */
  arcadeConfigsByFlow?: Record<string, ArcadeStepConfig[]>;
  mobileLabel?: string;
  mobileId?: string;
  idPrefix?: string;
  layout?: "selector" | "sticky-visual";
  /** persona journeys blended into the lifecycle: a chip per flow swaps the
   * story rail to the flow's steps while the live mock scrubs along and the
   * station bar highlights the traversed states (sticky-visual only). */
  flows?: DmsFlow[];
  flowsLabel?: string;
  flowsLede?: string;
  /** false drops the built-in "The lifecycle" map chip (page-owned copy, not
   * a Notion-backed flow) so only flows render; the first flow becomes the
   * default journey. */
  mapChip?: boolean;
};

/* one rendered story row: a lifecycle state in map mode, a journey step in
 * flow mode */
type StoryItem = {
  key: string;
  label: string;
  heading: string;
  body: string;
  note?: string;
  outcome?: string;
};

export function LifecycleExplorer({
  steps = LIFECYCLE,
  heading = "Every state has a gate. Every gate has an owner.",
  trailLabel = "How a revision moves",
  ariaLabel = "Controlled document lifecycle",
  liveLabel = "Change-control thread CC-2148, updated by lifecycle state",
  chatVariant = "change-control",
  progressPoints = LIFE_PROGRESS,
  stageMocks,
  stageUrl = "app.unifize.com",
  stageFrame = true,
  stageByStation = false,
  arcadeConfigsByFlow,
  mobileLabel = "Change-control thread",
  mobileId = "CC-2148 · raise → review → Part 11 approval → effective → seal",
  idPrefix = "dms-life",
  layout = "selector",
  flows,
  flowsLabel = "Follow the work through the lifecycle",
  flowsLede = "",
  mapChip = true,
}: LifecycleExplorerProps = {}) {
  const [active, setActive] = useState(0);
  const [activeFlowId, setActiveFlowId] = useState<string | null>(
    mapChip ? null : flows?.[0]?.id ?? null,
  );
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const ratios = useRef<number[]>([]);
  const manualUntil = useRef(0);

  const activeFlow = flows?.find((flow) => flow.id === activeFlowId) ?? null;
  const storyItems: StoryItem[] = activeFlow
    ? activeFlow.steps.map((step, index) => ({
        key: `${activeFlow.id}-${index}`,
        label: step.role || activeFlow.actor,
        heading: step.name,
        body: step.what,
        note: step.decision || undefined,
        outcome: step.primitives.length > 0 ? `Tax removed: ${step.primitives.join(" · ")}` : undefined,
      }))
    : steps.map((step) => ({
        key: step.state,
        label: step.state,
        heading: step.gate,
        body: step.detail,
        outcome: step.visual,
      }));

  /* which lifecycle station the current story row sits at: the row itself in
   * map mode; in flow mode the flow's station span, walked proportionally */
  const flowStations = activeFlow?.stations ?? [];
  const stationForStep = (index: number) =>
    flowStations.length === 0
      ? -1
      : flowStations[Math.min(Math.floor((index / storyItems.length) * flowStations.length), flowStations.length - 1)];
  const activeStation = activeFlow ? stationForStep(active) : active;

  const progress = activeFlow
    ? (active + 1) / storyItems.length
    : progressPoints[active] ?? progressPoints[progressPoints.length - 1] ?? 1;

  const switchFlow = (flowId: string | null) => {
    manualUntil.current = Date.now() + 800;
    setActiveFlowId(flowId);
    setActive(0);
  };

  useEffect(() => {
    if (layout !== "sticky-visual") return;

    ratios.current = Array.from({ length: storyItems.length }, () => 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = stepRefs.current.indexOf(entry.target as HTMLButtonElement);
        if (index >= 0) ratios.current[index] = entry.intersectionRatio;
      });

      const best = ratios.current.reduce(
        (winner, ratio, index, all) => ratio > (all[winner] ?? 0) ? index : winner,
        0,
      );
      if (Date.now() > manualUntil.current && (ratios.current[best] ?? 0) > 0.08) {
        setActive(best);
      }
    }, { rootMargin: "-12% 0px -12% 0px", threshold: [0.08, 0.25, 0.5, 0.75] });

    stepRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [layout, storyItems.length, activeFlowId]);

  const select = (index: number) => {
    manualUntil.current = Date.now() + 1000;
    setActive(index);
  };

  /* the flow chip row + context line, shared by both layouts */
  const flowsHead = flows && flows.length > 0 ? (
    <Tabs.Root
      className="dms-lifex__flows"
      data-track="lifecycle-flows"
      onValueChange={(value) => {
        if (typeof value === "string") switchFlow(value === "map" ? null : value);
      }}
      orientation="horizontal"
      value={activeFlow?.id ?? "map"}
    >
      <span className="dms-lifex__flows-label">{flowsLabel}</span>
      <Tabs.List activateOnFocus className="dms-lifex__flowchips" aria-label={flowsLabel}>
        {mapChip ? (
          <Tabs.Tab
            className={cn("dms-lifex__flowchip", !activeFlow && "is-active")}
            data-track="lifecycle-flow-chip"
            data-flow-id="map"
            value="map"
          >
            <span className="dms-lifex__flowchip-actor">The record</span>
            <span className="dms-lifex__flowchip-title">The lifecycle</span>
          </Tabs.Tab>
        ) : null}
        {flows.map((flow) => (
          <Tabs.Tab
            className={cn("dms-lifex__flowchip", activeFlow?.id === flow.id && "is-active")}
            data-track="lifecycle-flow-chip"
            data-flow-id={flow.id}
            key={flow.id}
            value={flow.id}
          >
            <span className="dms-lifex__flowchip-actor">{flow.actor}</span>
            <span className="dms-lifex__flowchip-title">{flow.title}</span>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {flowsLede ? (
        <div className="dms-lifex__flowpanels">
          {mapChip ? (
            <Tabs.Panel className="dms-lifex__flows-lede" value="map">
              {flowsLede}
            </Tabs.Panel>
          ) : null}
          {flows.map((flow) => (
            <Tabs.Panel className="dms-lifex__flows-lede" key={flow.id} value={flow.id}>
              {flow.description}
            </Tabs.Panel>
          ))}
        </div>
      ) : null}
    </Tabs.Root>
  ) : null;

  /* the flow's closing value statement: the Platform Outcomes it moves.
   * These are measured quantities (all Goal Zero Pending), so the label says
   * "moves", never a claimed result. */
  const flowOutcomes = activeFlow && activeFlow.outcomes.length > 0 ? (
    <div className="dms-lifex__outmoves">
      <span className="dms-lifex__outmoves-label">Outcomes this flow moves</span>
      <ul className="dms-lifex__outmoves-list">
        {activeFlow.outcomes.map((outcome) => (
          <li key={outcome.name}>
            <i>{outcome.type}</i>
            {outcome.name}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

  const livePanel = (
    <div
      className="dms-lifex__live"
      id={`${idPrefix}-live`}
      aria-label={`${liveLabel}. Current state: ${steps[activeStation]?.state ?? ""}`}
    >
      {stageMocks || (activeFlow && arcadeConfigsByFlow?.[activeFlow.id]) ? (() => {
        const activeArcadeConfigs = activeFlow ? arcadeConfigsByFlow?.[activeFlow.id] : undefined;
        if (activeFlow && activeArcadeConfigs) {
          const stageIndex = Math.min(active, activeArcadeConfigs.length - 1);
          return (
            <div className="dms-lifex__stagemock" key={activeFlow.id}>
              <ArcadeStepScene config={activeArcadeConfigs[stageIndex]} />
            </div>
          );
        }
        const resolvedStageMocks = stageMocks ?? [];
        const stageIndex = Math.min(
          stageByStation ? Math.max(activeStation, 0) : active,
          resolvedStageMocks.length - 1,
        );
        return (
          <div className="dms-lifex__stagemock" key={activeFlow?.id ?? "map"}>
            {stageFrame ? (
              <ShellFrame panel url={stageUrl}>{resolvedStageMocks[stageIndex]}</ShellFrame>
            ) : (
              resolvedStageMocks[stageIndex]
            )}
          </div>
        );
      })() : (
        <ChatShell variant={chatVariant} progress={progress} />
      )}
    </div>
  );

  if (layout === "sticky-visual") {
    return (
      <div className="dms-lifex-scroll dms-lifex-scroll--story">
        <StagePanel className="dms-stage--brand dms-lifex__stage">
          <div className="dms-wrap dms-lifex-wrap">
            <div className="dms-lifex__head">
              <Eyebrow n={4}>The lifecycle</Eyebrow>
              <h2 className="dms-h2">{heading}</h2>
              {flowsHead}
            </div>

            <div className={cn("dms-lifex dms-lifex--story", activeFlow && "dms-lifex--flowmode")}>
              <div className="dms-lifex__visual">
                {livePanel}
              </div>

              <ol
                className="dms-lifex__story-steps"
                aria-label={activeFlow ? activeFlow.fullName : ariaLabel}
                key={activeFlow?.id ?? "map"}
              >
                {storyItems.map((item, index) => (
                  <li className="dms-lifex__story-item" data-step-index={index + 1} key={item.key}>
                    <button
                      ref={(node) => { stepRefs.current[index] = node; }}
                      type="button"
                      className={cn("dms-lifex__story-step", index === active && "is-active")}
                      aria-current={index === active ? "step" : undefined}
                      aria-controls={`${idPrefix}-live`}
                      onClick={() => select(index)}
                    >
                      <span className="dms-lifex__story-index dms-data">{pad(index + 1)}</span>
                      <span className="dms-lifex__story-copy">
                        <span className="dms-lifex__story-label">{item.label}</span>
                        <strong>{item.heading}</strong>
                        <span className="dms-lifex__story-body">{item.body}</span>
                        {item.note ? (
                          <span className="dms-lifex__story-note">
                            <b>The call</b>
                            {item.note}
                          </span>
                        ) : null}
                        {item.outcome ? (
                          <span className="dms-lifex__story-outcome">
                            <i aria-hidden="true">✓</i>
                            {item.outcome}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                ))}
                {flowOutcomes ? <li className="dms-lifex__story-item dms-lifex__story-item--outmoves">{flowOutcomes}</li> : null}
              </ol>
            </div>
          </div>
        </StagePanel>
      </div>
    );
  }

  return (
    <div className="dms-lifex-scroll">
      <StagePanel className="dms-stage--brand dms-lifex__stage">
        <div className="dms-wrap dms-lifex-wrap">
          <div className="dms-lifex__head">
            <Eyebrow n={4}>The lifecycle</Eyebrow>
            <h2 className="dms-h2">{heading}</h2>
            {flowsHead}
          </div>
          <div className={cn("dms-lifex", activeFlow && "dms-lifex--flowmode")}>
            <aside className="dms-lifex__trail">
              <span className="dms-lifex__lab">{activeFlow ? `${activeFlow.actor}'s journey` : trailLabel}</span>
              <ol
                className="dms-lifex__steps"
                aria-label={activeFlow ? activeFlow.fullName : ariaLabel}
                key={activeFlow?.id ?? "map"}
              >
                {storyItems.map((item, i) => (
                  <li
                    className={cn("dms-lifex__step", i === active && "is-active", i < active && "is-past")}
                    key={item.key}
                  >
                    <button
                      type="button"
                      id={`${idPrefix}-tab-${i}`}
                      aria-pressed={i === active}
                      aria-controls={`${idPrefix}-detail-${i}`}
                      className="dms-lifex__btn"
                      onClick={() => select(i)}
                    >
                      <span className="dms-lifex__node" aria-hidden="true" />
                      <span className="dms-lifex__t">{activeFlow ? item.heading : item.label}</span>
                      <span className="dms-lifex__meta">{activeFlow ? item.label : item.heading}</span>
                    </button>
                    <div className="dms-lifex__detail" id={`${idPrefix}-detail-${i}`} role="region" aria-labelledby={`${idPrefix}-tab-${i}`} aria-hidden={i !== active}>
                      <div className="dms-lifex__detail-inner">
                        <p>{item.body}</p>
                        {item.note ? (
                          <p className="dms-lifex__detail-note">
                            <b>The call</b>
                            {item.note}
                          </p>
                        ) : null}
                        {item.outcome ? (
                          <p className="dms-lifex__detail-note dms-lifex__detail-note--tax">
                            {item.outcome}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              {flowOutcomes}
            </aside>

            {livePanel}

            <div className="dms-lifex__mobile" aria-hidden="true">
              <span className="dms-lifex__mobile-lab">{mobileLabel}</span>
              <span className="dms-lifex__mobile-id">{mobileId}</span>
            </div>
          </div>
        </div>
      </StagePanel>
    </div>
  );
}

/* ============================================================ FAQ */

export function FaqAccordion({ faqs = FAQS, idPrefix = "dms-faq" }: { faqs?: { q: string; a: string }[]; idPrefix?: string } = {}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="dms-faq">
      {faqs.map((f, i) => (
        <div className={"dms-faq__item" + (open === i ? " is-open" : "")} key={f.q}>
          <h3 className="dms-faq__h">
            <button
              type="button"
              className="dms-faq__q"
              aria-expanded={open === i}
              aria-controls={`${idPrefix}-a-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{f.q}</span>
              <svg className="dms-faq__ic" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" clipRule="evenodd" />
              </svg>
            </button>
          </h3>
          <div className="dms-faq__a" id={`${idPrefix}-a-${i}`} role="region" aria-hidden={open !== i}>
            <div className="dms-faq__a-inner"><p>{f.a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}
