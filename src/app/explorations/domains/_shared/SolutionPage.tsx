/* ============================================================================
 * SolutionPage - the Solutions (domain) template, rebuilt on the shared DMS
 * design system as a blend of the homepage, the platform page and the
 * product pages. Rendered from the same `DomainPageData` object the ITM
 * template (DomainPage.tsx) consumed, so every domain data file works
 * unchanged.
 *
 * What is borrowed from where:
 *   homepage  - the centered dark hero over one arcade window, the attested
 *               trust strip, split section heads, raised registry cards,
 *               section tails with one exit, the convergence-mark close.
 *   platform  - centered heads on dark sections, the persistent-camera
 *               journey (PlatformJourney), the brand-blue field diagram for
 *               coexistence, the hairline dark ledger for the trigger board.
 *   products  - the hero step rail (HeroArcade), the trust-strip industries,
 *               the numbered pain register (dms-pain), the shared customer
 *               film rail (ProofFilmRail), the owners register, the close.
 *
 * Flow (and the 2026-09-01 critique findings it answers):
 *   hero        problem-led title, the work-inside chips, ONE proof line
 *               above the fold (P1: proof arrived at 84% depth)
 *   trust       where this solution runs, as live industry links
 *   subnav      sticky, from the top of the page, with its own CTA
 *               (P1: 17-screen CTA desert; sub-nav appeared at 40% depth)
 *   01 work     the workstreams, clustered (the parity beat)
 *   02 leak     the old world staged + the pain register + the honest cost;
 *               the coordination tax named here, once
 *   03 journey  the domain's own record followed end to end, with an
 *               inline CTA at the conviction peak
 *   04 modules  the ledger by product (single catalog: 01 is the work, 04 is
 *               the software that runs it; nothing listed twice)
 *   05 coexist  the three-path answer, early (P1: replace-vs-coexist read
 *               both ways; now answered per situation before the proof)
 *   06 proof    the shared film rail (named references render only in the
 *               no-film fallback; the growth chain was cut 2026-09-02)
 *   07 industry the L1 fan-out
 *   08 roles    the owners register (P0: the ITM persona explorer shipped
 *               with no CSS; this one is styled in the DMS kit)
 *   09 urgent   the trigger board
 *   close
 *
 * Distill pass (2026-09-02, /impeccable distill + layout): the page ran to
 * 17 screens at 1440 with four text-heavy registers. Cut, not hidden: the
 * per-workstream lines in 01 (names only; the cluster line carries them),
 * the display-size pain rows in 02 (a compact ledger), the module blurbs
 * in 04 (the product pages own them), the industry one-liners in 07, and
 * the titles / cares / worries rows in 08. The sub-nav lists six stops.
 *
 * Rails (23 Sep 2026, `rails` prop, quality first): the page opts into the
 * rails grammar the homepage, platform and DMS pages share (_shared/page-
 * rails.css): hairline rails down the content column, a hatch band between
 * every section, blue-square eyebrows, split heads, every grid drawn as
 * cells rail to rail, product windows on soft washes with the frosted plate,
 * charcoal bookends (hero + trust, the journey, the proof reel, the urgent
 * board, close + footer). solution-rails.css holds
 * what this template composes differently. Off by default, so the sibling
 * domain pages render exactly as before until they opt in.
 * ========================================================================== */

import Link from "next/link";
import { ChatShell } from "@/components/organisms";
import { DmsHeader } from "../../products/dms/dms-header";
import { SiteFooter } from "../../_shared/site-footer";
import { DmsMotion } from "../../products/dms/dms-motion";
import { Eyebrow, ShellFrame, pad } from "../../products/dms/dms-primitives";
import { SeverityIcon } from "../../products/dms/dms-linework";
import { HeroArcade } from "../../products/_shared/arcade/hero-arcade";
import { PlatformCoexistence } from "../../platform/platform-coexistence";
import { UrgentBoard } from "../../_shared/urgent-board";
import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { ArcadeStepConfig } from "../../products/_shared/arcade/arcade";
import { PlatformJourney } from "../../platform/platform-interactive";
import { ProofFilmRail } from "../../products/_shared/proof-films";
import { filmsForModules } from "../../products/_shared/customer-films";
import { filmByWistia } from "../../products/_shared/customer-films";
import { HomeProofReel, type ProofStill } from "../../home/home-proof-reel";
import { HatchBand } from "../../_shared/page-rails";
import { SolutionSubnav, SolutionCoexist, CoexistDiagram } from "./solution-interactive";
import { WorkArtifact } from "./solution-work-viz";
import { LeakOldWorld, hasOldWorld } from "./solution-leak-viz";
import { NavGlyph } from "../../_shared/nav-data";
import { IndustryIcon } from "./industry-icons";
import type { DomainPageData, JourneyIcon, LeakScene, WorkGlyph } from "./types";
import "../../products/dms/dms.css";
import "../../products/dms/dms-redesign.css";
import "../../platform/platform-kit.css";
import "./solution-kit.css";
import "../../_shared/page-rails.css";
import "./solution-rails.css";
import "./solution-viz.css";
import { BookDemoButton } from "@/components/organisms/book-demo";

/* Outline glyphs for the workstream clusters (heroicons-style, 1.5 stroke),
 * the same family the homepage's entry cards draw. */
const WORK_ICONS: Record<WorkGlyph, React.ReactNode> = {
  loop: <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />,
  pulse: <path d="M2.75 12h3.5l2.5-5.5 4.5 11 2.5-5.5h5.5" />,
  box: <path d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />,
  doc: <path d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />,
  chat: <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />,
  scale: <path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />,
};

/* Solid 20-grid icons for the journey rail on the rails (one filled path
 * each, detail carved with evenodd), the platform page's rail idiom. */
const JOURNEY_ICONS: Record<JourneyIcon, string> = {
  /* a flag raised */
  escalate: "M4 2h1.8v16H4V2Zm3 1h9.5l-2.4 3.6L16.5 10H7V3Z",
  /* a target: ring, gap, bullseye */
  cause: "M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 2.6a5.4 5.4 0 1 0 0 10.8 5.4 5.4 0 0 0 0-10.8Zm0 2.6a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Z",
  /* a checklist sheet */
  actions: "M5 2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1.5 4.5v2h2v-2h-2Zm3.5.5v1h4V7h-4Zm-3.5 4v2h2v-2h-2Zm3.5.5v1h4v-1h-4Z",
  /* three bars rising: the window of data */
  verify: "M3 11h3.5v6H3v-6Zm5.25-5h3.5v11h-3.5V6Zm5.25-3H17v14h-3.5V3Z",
  /* a shield, the check carved out */
  seal: "M10 1.5 3 4.2v5c0 4.3 3 7.9 7 9.3 4-1.4 7-5 7-9.3v-5L10 1.5Zm-1.2 11.6L5.7 10l1.4-1.4 1.7 1.7 4.1-4.1 1.4 1.4-5.5 5.5Z",
  /* the sibling pages' verbs (23 Sep 2026), one rail per page */
  /* compliance: a lens on the finding */
  finding: "M8.5 2a6.5 6.5 0 0 1 5.2 10.4l4.2 4.2-1.4 1.4-4.2-4.2A6.5 6.5 0 1 1 8.5 2Zm0 2.2a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6Z",
  /* one node branching to two: the impact */
  impact: "M2 8h5v4H2V8Zm11-6h5v5h-5V2Zm0 11h5v5h-5v-5ZM9.5 3.75H13v1.5h-2v9.5h2v1.5H9.5V3.75ZM7 9.25h2.5v1.5H7v-1.5Z",
  /* a padlock: access narrowed */
  lock: "M10 2a4 4 0 0 1 4 4v2h1.5A1.5 1.5 0 0 1 17 9.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-7A1.5 1.5 0 0 1 4.5 8H6V6a4 4 0 0 1 4-4Zm0 1.8A2.2 2.2 0 0 0 7.8 6v2h4.4V6A2.2 2.2 0 0 0 10 3.8Zm0 7.2a1.5 1.5 0 0 0-.75 2.8V15h1.5v-1.2A1.5 1.5 0 0 0 10 11Z",
  /* a clipboard, checked: revalidated */
  clipcheck: "M7 2h6v2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2Zm1.5 1.5v2h3v-2h-3Zm4.8 6.2-1.3-1.3-3 3-1.4-1.4-1.3 1.3 2.7 2.7 4.3-4.3Z",
  /* regulatory: the intake tray */
  tray: "M4 3h12l2 8v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5l2-8Zm1.4 1.8L3.9 10.5h3.6l1 2h3l1-2h3.6l-1.5-5.7H5.4Z",
  /* a globe: every market's rule */
  globe: "M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1.2 2.3a5.9 5.9 0 0 0-4.5 4.8h2.9c.2-1.8.7-3.5 1.6-4.8Zm2.4 0c.9 1.3 1.4 3 1.6 4.8h2.9a5.9 5.9 0 0 0-4.5-4.8ZM10 4.6c-.8 1.1-1.3 2.7-1.5 4.5h3c-.2-1.8-.7-3.4-1.5-4.5Zm-5.7 6.3a5.9 5.9 0 0 0 4.5 4.8c-.9-1.3-1.4-3-1.6-4.8H4.3Zm4.2 0c.2 1.8.7 3.4 1.5 4.5.8-1.1 1.3-2.7 1.5-4.5h-3Zm4.8 0c-.2 1.8-.7 3.5-1.6 4.8a5.9 5.9 0 0 0 4.5-4.8h-2.9Z",
  /* a link: the evidence joined to the case */
  link: "M8.6 5.7 10.4 3.9a4 4 0 0 1 5.7 5.7l-1.8 1.8-1.4-1.4 1.8-1.8a2 2 0 0 0-2.9-2.9L10 7.1 8.6 5.7Zm2.8 8.6-1.8 1.8a4 4 0 0 1-5.7-5.7l1.8-1.8 1.4 1.4-1.8 1.8a2 2 0 0 0 2.9 2.9l1.8-1.8 1.4 1.4Zm-4.2-2.9 4.2-4.2 1.4 1.4-4.2 4.2-1.4-1.4Z",
  /* a paper plane: submitted */
  submit: "M18 2 2 8.8l6 2.4L18 2Zm0 0-8.6 10.2.4 5.8 3-3.6L16 17 18 2Z",
  /* supplier: the lot rejected */
  reject: "M3 3h14v14H3V3Zm4.2 3L6 7.2 8.8 10 6 12.8 7.2 14 10 11.2l2.8 2.8 1.2-1.2L11.2 10 14 7.2 12.8 6 10 8.8 7.2 6Z",
  /* a balance: the disposition weighed */
  weigh: "M9.2 2h1.6v2.1l5.4 1.4 2.3 6.3a3 3 0 0 1-5.6 0l2-5.4-4.1-1.1V16H14v2H6v-2h3.2V5.3L5.1 6.4l2 5.4a3 3 0 0 1-5.6 0l2.3-6.3 5.4-1.4V2Zm-4.9 6.1-1.4 3.9h2.8L4.3 8.1Zm11.4 0L14.3 12h2.8l-1.4-3.9Z",
  /* an envelope going out: the request */
  sendout: "M2 5h11v2H4.4L8 9.6l3.2-2.3 1.2 1.6L8 12 4 9.1V15h10v-3h2v5H2V5Zm13-3 4 4-4 4V7.5h-3v-3h3V2Z",
  /* a check in a circle: accepted */
  accept: "M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm3.6 5-4.5 4.6-2.1-2.1-1.3 1.3 3.4 3.4 5.8-5.9L13.6 7Z",
  /* post-market: the complaint, a speech bubble */
  complaint: "M3 3h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H8l-4 3.5V14H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 4v1.6h8V7H6Zm0 3v1.6h5V10H6Z",
  /* a clock: the reporting clock */
  clock: "M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-.9 3.5v5.3l3.8 2.3.9-1.5-3-1.8V5.5H9.1Z",
  /* a crosshair: the scope */
  scope: "M9.2 1.5h1.6v2.6a6 6 0 0 1 5.1 5.1h2.6v1.6h-2.6a6 6 0 0 1-5.1 5.1v2.6H9.2v-2.6a6 6 0 0 1-5.1-5.1H1.5V9.2h2.6a6 6 0 0 1 5.1-5.1V1.5Zm.8 4.3a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm0 2.4a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z",
  /* four bars: four tracks at once */
  tracks: "M2 3h16v2.4H2V3Zm0 4.2h11v2.4H2V7.2Zm0 4.2h14v2.4H2v-2.4Zm0 4.2h8V18H2v-2.4Z",
};

const ARROW = (
  <svg className="sk-arrow" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h15M13 6.5l5.5 5.5-5.5 5.5" />
  </svg>
);

/* the old-world artifact's row states (homepage symptom-scene grammar) */
const SCENE_ICONS: Record<LeakScene["rows"][number]["state"], React.ReactNode> = {
  done: <svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" /><path d="m4.4 7.2 1.9 1.9 3.4-4" /></svg>,
  wait: <svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" /><path d="M7 4v3.4l2.2 1.4" /></svg>,
  idle: <svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="5.6" /></svg>,
};

function LeakSceneCard({ scene }: { scene: LeakScene }) {
  return (
    <figure className="sk-scene">
      <div className="sk-scene__ui" aria-hidden="true">
        <div className="sk-scene__bar">
          <span className="sk-scene__kicker">{scene.kicker}</span>
          <span className="sk-scene__chip">{scene.chip}</span>
        </div>
        <div className="sk-scene__title">{scene.title}</div>
        <ul className="sk-scene__rows">
          {scene.rows.map((row) => (
            <li key={row.label} className={"is-" + row.state}>
              <span className="sk-scene__ico">{SCENE_ICONS[row.state]}</span>
              <span>{row.label}</span>
              <span className={"sk-scene__age" + (row.warn ? " is-warn" : "")}>{row.age}</span>
            </li>
          ))}
        </ul>
        {scene.float ? (
          <div className="sk-scene__float">
            <span className="sk-scene__kicker">{scene.float.kicker}</span>
            <span>{scene.float.note}</span>
          </div>
        ) : null}
      </div>
      <figcaption className="sk-scene__cap">
        <span className="dms-dot dms-dot--accent" aria-hidden="true" />
        {scene.caption}
      </figcaption>
    </figure>
  );
}

/* Section 02 on the rails: the old world as an inbox (the homepage
 * symptom-card grammar), the one widget no other visual on this page uses.
 * The sign-off request has aged unread for weeks; the audit request lands
 * on top of it. */
function LeakInbox({ scene }: { scene: LeakScene }) {
  const box = scene.inbox!;
  return (
    <figure className="sk-ib" aria-label={`${box.label}: ${box.rows[0]?.subject}, ${box.rows[0]?.age} unanswered. ${scene.caption}`}>
      <div className="sk-ib__stage" aria-hidden="true">
        <div className="sk-ib__win">
          <div className="sk-ib__bar">
            <span className="sk-ib__kicker">{box.label}</span>
            <span className="sk-ib__meta">{box.meta}</span>
          </div>
          <ul className="sk-ib__rows">
            {box.rows.map((row) => (
              <li key={row.subject} className={(row.unread ? "is-unread" : "") + (row.warn ? " is-warn" : "")}>
                <span className="sk-ib__cell">
                  <span className="sk-ib__subj">{row.subject}</span>
                  <span className="sk-ib__from">{row.from}</span>
                </span>
                <span className="sk-ib__age">{row.age}</span>
              </li>
            ))}
          </ul>
        </div>
        {scene.float ? (
          <div className="sk-ib__float">
            <span className="sk-ib__kicker">{scene.float.kicker}</span>
            <span>{scene.float.note}</span>
          </div>
        ) : null}
      </div>
      <figcaption className="sk-ib__cap">{scene.caption}</figcaption>
    </figure>
  );
}

/* the hero rail wants a one-word label per pose; the arcade steps carry one
 * as `ghost`, the trail title is the fallback */
function heroSteps(trail: { t: string }[], steps: ArcadeStepConfig[]) {
  const n = Math.min(trail.length, steps.length);
  return Array.from({ length: n }, (_, i) => ({
    label: (steps[i] as { ghost?: string }).ghost ?? trail[i].t,
    config: steps[i],
  }));
}

/* compact (23 Sep 2026, quality first): the trimmed page. The roles and
 * industries registers are cut (the trust strip under the hero already
 * carries the industry links; the role pages are linked from the nav), the
 * pain register shows its first four with the rest behind a disclosure,
 * in-development products fold to one line, and the urgent board shows one
 * row. Nothing is deleted from the data. */
const COMPACT_PAINS = 4;
const COMPACT_TRIGGERS = 3;

export function SolutionPage({
  data,
  rails = false,
  compact = false,
}: {
  data: DomainPageData;
  rails?: boolean;
  compact?: boolean;
}) {
  const d = data;
  /* the rails grammar, per section: a class on the section, a band between */
  const railed = rails ? " hm-railed" : "";
  const band = (tone?: "alt" | "dark") =>
    rails ? <HatchBand className={tone ? `hm-hatch--${tone}` : undefined} /> : null;
  const arcade = d.flow.arcade;
  const trailCount = arcade ? Math.min(d.flow.trail.length, arcade.steps.length) : d.flow.trail.length;

  /* real customer films whose Notion Module tags intersect the domain's;
   * governance (Live + Web Use Approved) is enforced in the adapter */
  const proofFilms = d.proof?.filmTags ? filmsForModules(d.proof.filmTags, { limit: 8 }) : [];
  const proofLead = d.proof
    ? {
        label: d.proof.attested.label,
        stat: d.proof.attested.stat,
        statLabel: d.proof.attested.statLabel,
        body: d.proof.attested.body,
        footnote: d.proof.attested.note,
      }
    : null;
  /* the reel captions the lead in the stills' grammar (23 Sep 2026: the
   * long body beside a four-line right-aligned note read as two competing
   * paragraphs): who, the figure in one line, a short provenance */
  const reelLead = proofLead
    ? {
        ...proofLead,
        who: "Medical-device manufacturer",
        body: `$${MD_PROOF.stat.recovered.toLocaleString("en-US")} a year recovered against a signed $${MD_PROOF.stat.baseline.toLocaleString("en-US")} baseline`,
        footnote: "Signed baseline, anonymized",
      }
    : null;

  /* six stops, not nine: the reader picks a beat, not a table of contents */
  const subnavTabs = [
    { id: "work", label: "The work" },
    { id: "leaks", label: "The leak" },
    { id: "journey", label: "The journey" },
    { id: "modules", label: "Modules" },
    ...(d.proof ? [{ id: "proof", label: "Proof" }] : []),
    ...(compact ? [] : [{ id: "by-industry", label: "Industries" }]),
  ];

  const urgentLevels = ["Urgent", "High"] as const;

  const painRow = (p: DomainPageData["leaks"]["pains"][number], i: number) => (
    <li className="sk-pain" key={p.name}>
      <span className="sk-pain__idx dms-data" aria-hidden="true">{pad(i + 1)}</span>
      <div className="sk-pain__sig">
        <span className="sk-pain__sev"><SeverityIcon severity={p.severity} />{p.severity}</span>
        <span className="sk-pain__surface">{p.surface}</span>
      </div>
      <h3 className="sk-pain__title">{p.name}</h3>
      <p className="sk-pain__body">{p.body}</p>
    </li>
  );

  /* the rails proof reel: the curated roster (or every tagged film, titled),
   * led by the one signed figure */
  const reelStills: ProofStill[] = [];
  if (rails && d.proof) {
    if (d.proof.stills?.length) {
      for (const still of d.proof.stills) {
        const film = filmByWistia(still.wistia);
        if (film) reelStills.push({ ...film, fact: still.fact });
      }
    } else {
      for (const film of proofFilms) reelStills.push({ ...film, fact: film.title });
    }
  }

  /* the hero's product shot, off the rails (the rails hero draws its own
   * two-pane frame below) */
  const heroFrame = arcade ? (
    <div className="dms-hero__frame dms-hero__product-demo dms-hero__product-demo--arcade">
      <HeroArcade steps={heroSteps(d.flow.trail, arcade.steps)} />
    </div>
  ) : (
    <div className="dms-hero__frame dms-hero__product-demo sk-hero__static">
      <div className="dms-hero__stage">
        <ShellFrame url={d.flow.shellUrl}>
          <ChatShell variant={d.flow.chatVariant} />
        </ShellFrame>
      </div>
    </div>
  );

  /* 04 on the rails: the one product and its modules. Nothing unshipped is
   * named (Abhishek, 23 Sep 2026: "we do not mention in development") */
  /* the site never names unshipped work: modules still in development,
   * and products with nothing shipped, are left out of every module list */
  const shipped = (m: { href?: string; soon?: string }) => Boolean(m.href) || !m.soon;
  const shippedGroups = d.coverage.groups
    .map((g) => ({ ...g, modules: g.modules.filter(shipped) }))
    .filter((g) => g.modules.length > 0);

  const modulesOnRails = () => {
    /* The sibling pages (23 Sep 2026): their work spans two or three live
     * products. Each product is a column (its wash, glyph, promise and live
     * modules), and a rail under the columns ties them into the one record
     * they all write to. One product keeps quality's single cell. */
    const live = shippedGroups.filter((g) => g.modules.some((m) => m.href));
    if (live.length > 1) {
      const glyph = (slug: string) => (["qms", "dms", "mes", "plm"].includes(slug) ? slug : "qms") as Parameters<typeof NavGlyph>[0]["name"];
      const washes = ["blue", "sky", "paper"];
      return (
        <div className="sk-qm" style={{ "--sk-qm-n": live.length } as React.CSSProperties} data-reveal>
          <ul className="sk-qm__grid">
            {live.map((g, i) => {
              const door = g.modules.find((m) => m.href)?.href;
              return (
                <li className="sk-qm__cell" key={g.slug}>
                  <div className={"sk-qm__head sk-qm__head--" + washes[i % washes.length]}>
                    <span className="sk-qp__glyph" aria-hidden="true"><NavGlyph name={glyph(g.slug)} /></span>
                    <h3 className="sk-qm__name">{g.name}</h3>
                    <p className="sk-qm__promise">{g.promise}</p>
                  </div>
                  <ul className="sk-qm__mods">
                    {g.modules.filter((m) => m.href).map((m) => (
                      <li key={m.name}>
                        <Link href={m.href!}>
                          <span>{m.name}</span>
                          {ARROW}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {door ? <Link className="sk-qm__go" href={door}>Explore the product &rarr;</Link> : null}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    const primary = d.coverage.groups.find((g) => g.tier === "Primary") ?? d.coverage.groups[0];
    if (!primary) return null;
    const door = primary.modules.find((m) => m.href)?.href;
    return (
      <div className="sk-qp" data-reveal>
        <div className="sk-qp__grid">
          <div className="sk-qp__product">
            <span className="sk-qp__glyph" aria-hidden="true"><NavGlyph name="qms" /></span>
            <span className="sk-qp__tier">Runs in</span>
            <h3 className="sk-qp__name">{primary.name}</h3>
            <p className="sk-qp__promise">{primary.promise}</p>
            {door ? (
              <Link className="dms-btn sk-qp__go" href={door}>Explore the product &rarr;</Link>
            ) : null}
          </div>
          <ul className="sk-qp__mods">
            {primary.modules.filter(shipped).map((m) => (
              <li key={m.name}>
                {m.href ? (
                  <Link href={m.href}>
                    <span>{m.name}</span>
                    {ARROW}
                  </Link>
                ) : (
                  <span className="sk-qp__plain">{m.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  /* a section head: the split (eyebrow + claim left, lede right) on the
   * rails everywhere; off the rails the dark sections keep the centred head */
  const head = (n: number | undefined, eyebrow: React.ReactNode, id: string, heading: string, lede?: React.ReactNode, centred = false) =>
    centred && !rails ? (
      <header className="pf-centered-head" data-reveal>
        <Eyebrow n={n}>{eyebrow}</Eyebrow>
        <h2 className="dms-h2" id={id}>{heading}</h2>
        {lede ? <p className="dms-lede">{lede}</p> : null}
      </header>
    ) : (
      <div className={"sk-split" + (lede ? "" : " sk-split--solo")} data-reveal>
        <div>
          <Eyebrow n={n}>{eyebrow}</Eyebrow>
          <h2 className="dms-h2" id={id}>{heading}</h2>
        </div>
        {lede ? <p className="dms-lede">{lede}</p> : null}
      </div>
    );

  return (
    <main className={"dms dms--redesign dms--consistent-eyebrows pf-page sk-page" + (rails ? " dms--rails" : "")}>
      <DmsHeader />
      <DmsMotion />

      {/* ============================ HERO =============================
       * Problem-led, on the shared dark hero: title, lede, CTAs, then the
       * work-inside chips and the one signed figure. The product shot is the
       * arcade walking the domain's own record, with the product page's
       * step rail under it. */}
      {rails ? (
        /* On the rails: two panes between the rails. The copy on the
         * charcoal left, the product window on the wash right, running the
         * full height of the hero. The step rail is hidden, so the window
         * loops through the record's moments on its own. */
        <section className="dms-section dms-hero dms-hero--rails hm-railed sk-hero--split" aria-label={d.name}>
          <div className="dms-wrap hm-bleed sk-hero2">
            {/* minimal (Abhishek, 23 Sep: "too many things on the hero"):
              * the eyebrow, the claim, one line of context, two actions. The signed figure
              * leads the proof reel instead. */}
            <div className="sk-hero2__copy">
              <Eyebrow>Solutions · {d.hero.crumb}</Eyebrow>
              <h1 className="dms-hero__title">
                <span className="dms-hero__line">{d.hero.titleLead}</span>
                <span className="dms-hero__line dms-hero__turn">{d.hero.titleTurn}</span>
              </h1>
              <p className="dms-lede dms-hero__sub">{d.hero.sub}</p>
              <div className="dms-hero__ctas">
                <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
                <a href="#journey" className="dms-btn dms-btn-ghost">Watch the record close</a>
              </div>
            </div>
            {arcade ? (
              <div className="sk-hero2__visual dms-hero__product-demo dms-hero__product-demo--arcade">
                <HeroArcade steps={heroSteps(d.flow.trail, arcade.steps)} />
              </div>
            ) : (
              <div className="sk-hero2__visual dms-hero__product-demo sk-hero__static">
                <div className="dms-hero__stage">
                  <ShellFrame url={d.flow.shellUrl}>
                    <ChatShell variant={d.flow.chatVariant} />
                  </ShellFrame>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="dms-section dms-hero" aria-label={d.name}>
          <div className="dms-wrap dms-hero__inner">
            <div className="dms-hero__grid">
              <div className="dms-hero__left">
                <Link className="dms-hero__product" href="/home#solutions">
                  <span className="dms-hero__product-mark" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path className="sk-hero__glyph" d="M3.5 5.5h5M3.5 12h5.5M3.5 18.5h5M8.5 5.5c4.5 0 3.5 6.5 8 6.5M8.5 18.5c4.5 0 3.5-6.5 8-6.5M14 12h6.5M17.5 9l3 3-3 3" />
                    </svg>
                  </span>
                  <span>Solutions · {d.hero.crumb}</span>
                </Link>
                <h1 className="dms-hero__title">
                  <span className="dms-hero__line">{d.hero.titleLead}</span>
                  <span className="dms-hero__line dms-hero__turn">{d.hero.titleTurn}</span>
                </h1>
              </div>
              <div className="dms-hero__right">
                <p className="dms-lede dms-hero__sub">{d.hero.sub}</p>
                <div className="dms-hero__ctas">
                  <BookDemoButton className="dms-btn" source="hero">Book a demo &rarr;</BookDemoButton>
                  <a href="#journey" className="dms-btn dms-btn-ghost">Watch the record close</a>
                </div>
              </div>
            </div>

            {/* two quiet lines under the CTAs: the work inside, as one mono
              * line; the one signed figure, as one sentence with the number
              * carrying the weight */}
            <div className="sk-hero__meta">
              <p className="sk-hero__chips" aria-label="The work inside">
                {d.hero.chips.map((c, i) => (
                  <span key={c}>
                    {i > 0 ? <i aria-hidden="true">·</i> : null}
                    {c}
                  </span>
                ))}
              </p>
              {d.proof ? (
                <a className="sk-hero__proof" href="#proof">
                  <b>{d.proof.attested.stat}</b> {d.proof.attested.statLabel}, {d.proof.attested.label.toLowerCase()}
                  <span aria-hidden="true">&darr;</span>
                </a>
              ) : null}
            </div>

            {heroFrame}
          </div>
        </section>
      )}

      {/* ============================ TRUST STRIP =======================
       * Buyer-meaningful: the industries this solution runs in, as live
       * links, in the product page's industries-strip idiom. */}
      <section className={"dms-section dms-section--dark dms-trust" + (rails ? " hm-trust--rails hm-railed" : "")} aria-label="Industries this solution runs in">
        <div className="dms-wrap dms-trust__inner">
          <p className="dms-trust__label">{d.hero.runsIn.label}</p>
          <ul className="dms-trust__logos">
            {d.hero.runsIn.links.map((c) => (
              <li key={c.name}>
                <Link href={c.href} className="dms-trust__mark">
                  <span className="dms-trust__icon" aria-hidden="true"><IndustryIcon name={c.name} /></span>
                  <span>{c.name}</span>
                </Link>
              </li>
            ))}
            {/* compact pages cut the industries fan-out, so its anchor
              * would land nowhere */}
            {compact ? null : (
              <li>
                <a href={d.hero.runsIn.more.href} className="sk-trust__more">{d.hero.runsIn.more.label}</a>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* ============================ SUB-NAV ========================== */}
      {/* no "On this page" bar on the rails (Abhishek, 23 Sep 2026: "let's
        * get rid of the on this page subnavbar"); the page is short enough
        * to read straight down, and the header is the one bar up top */}
      {rails ? null : (
        <SolutionSubnav
          domainName={d.name}
          tabs={subnavTabs}
          cta={<BookDemoButton className="dms-btn dms-btn-sm" source="subnav">Book a demo</BookDemoButton>}
        />
      )}

      {/* the first hatched divider: the dark-to-light break */}
      {band()}

      {/* ============================ 01 · THE WORK INSIDE =============
       * The parity beat as the homepage's entry cards: one card per buyer-
       * vocabulary cluster, its workstreams listed, one exit per card. */}
      <section className={"dms-section sk-work-section" + railed} id="work" aria-labelledby="sk-work-title">
        <div className="dms-wrap">
          {head(1, "The work inside", "sk-work-title", d.work.heading, d.work.lede)}

          {rails ? (
            /* On the rails: the homepage way-in cells. Each cluster leads
             * with a wash panel holding its own record as a small product
             * surface (solution-work-viz.tsx), then the claim, the
             * workstreams on dashed rules, and one exit. */
            <div className="sk-wk" style={{ "--sk-work-n": Math.min(4, d.work.groups.length) } as React.CSSProperties} data-reveal>
              {d.work.groups.map((g) => (
                <article className="sk-wk__cell" key={g.name}>
                  <div className={"sk-wk__wash sk-wk__wash--" + (g.viz?.wash ?? "sky")} aria-hidden="true">
                    {g.viz ? (
                      <WorkArtifact viz={g.viz} />
                    ) : (
                      <svg className="sk-wk__glyph" viewBox="0 0 24 24">{WORK_ICONS[g.glyph]}</svg>
                    )}
                  </div>
                  <div className="sk-wk__intro">
                    <h3>{g.name}</h3>
                    <p>{g.line}</p>
                  </div>
                  <ul className="sk-wk__items">
                    {g.items.map((w) => (
                      <li key={w.name}>
                        {w.href ? (
                          <Link href={w.href}>
                            <span>{w.name}</span>
                            <i aria-hidden="true">&rarr;</i>
                          </Link>
                        ) : (
                          <span>{w.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {g.runsIn ? (
                    <Link className="sk-wk__go" href={g.runsIn.href}>{g.runsIn.label}</Link>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="sk-work" style={{ "--sk-work-n": Math.min(4, d.work.groups.length) } as React.CSSProperties} data-reveal>
              {d.work.groups.map((g, gi) => (
                <article className="sk-work__card" key={g.name}>
                  <div className="sk-work__intro">
                    <svg className="sk-work__glyph" viewBox="0 0 24 24" aria-hidden="true">{WORK_ICONS[g.glyph]}</svg>
                    <span className="sk-work__idx dms-data">{pad(gi + 1)}</span>
                    <h3 className="sk-work__name">{g.name}</h3>
                    <p className="sk-work__line">{g.line}</p>
                  </div>
                  {/* names only: the cluster line says what they share, the
                    * module ledger and the product pages carry the detail */}
                  <ul className="sk-work__items">
                    {g.items.map((w) => (
                      <li className="sk-work__item" key={w.name}>
                        {w.href ? (
                          <Link href={w.href} className="sk-work__item-name">{w.name}</Link>
                        ) : (
                          <span className="sk-work__item-name">{w.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {g.runsIn ? (
                    <Link className="sk-work__go" href={g.runsIn.href}>{g.runsIn.label}</Link>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {band()}

      {/* ============================ 02 · WHERE IT LEAKS ==============
       * The head shares its row with the old world, staged; then the
       * product page's pain register; then the honest cost band. The
       * coordination tax is named here, once, in the buyer's words. */}
      <section className={"dms-section sk-leaks-section" + (rails ? railed : " dms-section--alt")} id="leaks" aria-labelledby="sk-leaks-title">
        <div className="dms-wrap">
          <div className={"sk-lk" + (d.leaks.scene ? "" : " sk-lk--solo")} data-reveal>
            <div className="dms-head">
              <Eyebrow n={2}>Where it leaks</Eyebrow>
              <h2 className="dms-h2" id="sk-leaks-title">
                {/* on the rails each sentence holds its own line, so the
                  * wider measure never breaks after a stray first word */}
                {rails
                  ? d.leaks.heading.split(/(?<=[.!?])\s+/).map((line) => (
                      <span className="sk-h2-line" key={line}>{line} </span>
                    ))
                  : d.leaks.heading}
              </h2>
              <p className="dms-lede">{d.leaks.lede}</p>
              {/* rails (23 Sep 2026, Abhishek: "the information is dense,
                * we're trying to convey too many things in the same
                * section"): one message. The failure modes are a plain list
                * under the lede, the day-90 CAPA carries the story on the
                * right, and the cost is one line in the tail. */}
              {rails ? (
                <ol className="sk-lkx">
                  {d.leaks.pains.slice(0, COMPACT_PAINS).map((p) => (
                    <li key={p.name}>
                      <b>{p.name}</b>
                      {p.short ? <span>{p.short}</span> : null}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
            {d.leaks.scene ? (
              rails && d.leaks.scene.inbox ? (
                <LeakInbox scene={d.leaks.scene} />
              ) : rails && hasOldWorld(d.leaks.scene) ? (
                <LeakOldWorld scene={d.leaks.scene} />
              ) : (
                <LeakSceneCard scene={d.leaks.scene} />
              )
            ) : null}
          </div>

          {rails ? (
            <div className="sk-tail sk-tail--tax" data-reveal>
              <p>
                {d.leaks.tax ? <b>{d.leaks.tax.value}</b> : null} {d.leaks.tax?.tail ?? "That waiting is the coordination tax."}
              </p>
              <Link href="/coordination-tax-calculator">Measure your coordination tax &rarr;</Link>
            </div>
          ) : (
            <>
              {/* the register as a compact ledger: severity, where it leaks, the
                * failure named, the body at reading size; one screen for all */}
              <ol className="sk-pains" data-reveal>
                {(compact ? d.leaks.pains.slice(0, COMPACT_PAINS) : d.leaks.pains).map((p, i) => painRow(p, i))}
              </ol>
              {compact && d.leaks.pains.length > COMPACT_PAINS ? (
                <details className="sk-pains__more">
                  <summary>
                    <span>See all {d.leaks.pains.length} failure modes</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9.5l6 6 6-6" /></svg>
                  </summary>
                  <ol className="sk-pains sk-pains--rest" start={COMPACT_PAINS + 1}>
                    {d.leaks.pains.slice(COMPACT_PAINS).map((p, i) => painRow(p, i + COMPACT_PAINS))}
                  </ol>
                </details>
              ) : null}

              {d.leaks.tax ? (
                <p className="sk-tax" data-reveal>
                  <span className="sk-tax__lab">{d.leaks.tax.label}</span>
                  <span className="sk-tax__val">{d.leaks.tax.value}</span>
                </p>
              ) : null}

              <div className="sk-tail" data-reveal>
                <p>That waiting is the coordination tax. Put a number on yours before the walkthrough.</p>
                <Link href="/coordination-tax-calculator">Measure your coordination tax &rarr;</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {band()}

      {/* ============================ 03 · THE JOURNEY =================
       * The platform page's persistent camera, on the domain's own record:
       * the trail is the rail, the arcade proves each step. One CTA at the
       * conviction peak. */}
      <section className={"dms-section sk-journey-section" + (rails ? railed : " dms-section--dark")} id="journey" aria-labelledby="sk-journey-title">
        <div className="dms-wrap">
          {head(3, "The difference", "sk-journey-title", d.flow.heading, d.flow.lede, true)}

          {arcade ? (
            <div style={{ "--sk-steps": trailCount } as React.CSSProperties} data-reveal>
              <PlatformJourney
                steps={
                  rails && d.flow.steps?.length
                    ? d.flow.steps.slice(0, trailCount).map((st) => ({ title: st.title, body: st.body, icon: JOURNEY_ICONS[st.icon] }))
                    : d.flow.trail.slice(0, trailCount).map((s) => ({ title: s.t, body: `${s.who} · ${s.when}` }))
                }
                configs={arcade.steps.slice(0, trailCount)}
              />
            </div>
          ) : (
            <div className="sk-journey__static" data-reveal>
              <aside aria-label={d.flow.trailLabel}>
                <span className="sk-trail__lab">{d.flow.trailLabel}</span>
                <ol className="sk-trail">
                  {d.flow.trail.map((s) => (
                    <li className="sk-trail__step" key={s.t}>
                      <span className="sk-trail__t">{s.t}</span>
                      <span className="sk-trail__meta">{s.who} · {s.when}</span>
                    </li>
                  ))}
                </ol>
              </aside>
              <ShellFrame url={d.flow.shellUrl}>
                <ChatShell variant={d.flow.chatVariant} />
              </ShellFrame>
            </div>
          )}

          {/* the tail line and its two buttons are off on the rails
            * (Abhishek, 23 Sep 2026: "remove these elements") */}
          {rails ? null : (
            <div className="sk-journey__tail" data-reveal>
              <p>{d.flow.trailFoot}</p>
              <div className="sk-journey__ctas">
                <BookDemoButton className="dms-btn" source="journey">Run it on your record &rarr;</BookDemoButton>
                <a href="#modules" className="dms-btn dms-btn-ghost">See the modules</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {band()}

      {/* ============================ 04 · THE MODULES =================
       * One ledger, grouped by the product that ships each module. */}
      <section className={"dms-section sk-mods-section" + railed} id="modules" aria-labelledby="sk-modules-title">
        <div className="dms-wrap">
          {head(4, "The modules", "sk-modules-title", d.coverage.heading, d.coverage.lede)}

          {rails ? (
            /* On the rails (23 Sep 2026, Abhishek: "rethink this section
             * completely ... focus on one key thing"): quality runs in ONE
             * product. The product as a cell on the blue wash, its live
             * modules as plain rows beside it, and whatever is still in
             * development folded into one line under them. */
            modulesOnRails()
          ) : (
            <>
              {/* one band per product: the product on the left, its modules as a
                * grid of cells on the right (name + the standards it evidences,
                * as plain mono text). A product still in development says so
                * once, in its head, instead of a badge on every cell. */}
              <div className="sk-mods" data-reveal>
                {shippedGroups.map((g) => {
                  const door = g.modules.find((m) => m.href)?.href;
                  const allSoon = g.modules.every((m) => !m.href && m.soon);
                  const status = allSoon ? g.modules[0]?.soon : null;
                  return (
                    <section className={"sk-mods__group" + (allSoon ? " is-soon" : "")} key={g.slug} aria-label={g.name}>
                      <header className="sk-mods__head">
                        <span className="sk-mods__tier">{g.tier === "Primary" ? "Anchored here" : "Reaches into"}</span>
                        <h3 className="sk-mods__product">{g.name}</h3>
                        <p className="sk-mods__promise">{g.promise}</p>
                        {door ? (
                          <Link className="sk-mods__go" href={door}>Explore the product &rarr;</Link>
                        ) : status ? (
                          <span className="sk-mods__status">{status}</span>
                        ) : null}
                        {/* compact: a product still in development folds to its
                          * head, its modules named in one line */}
                        {compact && allSoon ? (
                          <p className="sk-mods__names">{g.modules.map((m) => m.name).join(" · ")}</p>
                        ) : null}
                      </header>
                      {compact && allSoon ? null : (
                      <ul className="sk-mods__cells">
                        {g.modules.map((m) => {
                          const soon = !m.href && m.soon && !allSoon ? m.soon : null;
                          const inner = (
                            <>
                              <span className="sk-mods__name">{m.name}</span>
                              {(m.standards ?? []).length ? (
                                <span className="sk-mods__stds" aria-label="Standards evidenced">{(m.standards ?? []).join(" · ")}</span>
                              ) : null}
                              {soon ? <span className="sk-mods__stds">{soon}</span> : null}
                              {m.href ? ARROW : null}
                            </>
                          );
                          return (
                            <li key={m.name}>
                              {m.href ? (
                                <Link href={m.href} className="sk-mods__cell" aria-label={`${m.name}: open the product page`}>{inner}</Link>
                              ) : (
                                <div className="sk-mods__cell">{inner}</div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      )}
                    </section>
                  );
                })}
              </div>

              <div className="sk-tail" data-reveal>
                <p>Every module runs on the same governed record, next to the systems you already trust.</p>
                <Link href="/platform#stack">How the platform is put together &rarr;</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {band(d.coexistence ? "alt" : undefined)}

      {/* ============================ 05 · COEXISTENCE =================
       * With `paths`: the three-path answer behind the "where is yours
       * today?" selector. Without: the single-story diagram on the field. */}
      {d.coexistence ? (
        <section className={"dms-section dms-section--alt sk-coex-section" + railed} id="coexistence" aria-labelledby="sk-coex-title">
          <div className="dms-wrap">
            {head(
              5,
              "Coexistence",
              "sk-coex-title",
              d.coexistence.heading,
              rails && d.coexistence.bands ? d.coexistence.bands.lede : d.coexistence.paths?.length ? null : d.coexistence.body,
              true,
            )}

            {rails && d.coexistence.bands ? (
              /* On the rails (23 Sep 2026): the platform page's three bands,
               * flat and simpler. Systems of record keep the record, Unifize
               * sits between, and the channels where decisions leaked stop
               * being the record; the flows are labelled on the arrows. The
               * three-path selector gives way to one line for the no-eQMS
               * case, which points back to the modules above. */
              <div className="sk-cb sk-cb--iso">
                <PlatformCoexistence
                  label={`Isometric drawing: your ${d.coexistence.systemsOfRecord.join(", ")} stay the systems of record; Unifize runs between them and ${
                    d.coexistence.bands.tools ? d.coexistence.bands.tools.names.join(", ").toLowerCase() : "the email, chat, spreadsheets and meetings"
                  } where decisions used to be made, capturing those decisions and sending the approved outcome back with a Part 11 signature.`}
                  flows={
                    d.coexistence.bands.flows ?? {
                      contextIn: "CONTEXT IN",
                      back: "PART 11 SIGNED",
                      captured: "DECISIONS CAPTURED",
                      linked: "THE RECORD, LINKED",
                    }
                  }
                  bands={[
                    {
                      id: "records",
                      title: "Your systems of record",
                      sub: "Stay authoritative",
                      names: d.coexistence.systemsOfRecord.slice(0, 5),
                      label: "What stays authoritative",
                      body: d.coexistence.bands.vendors?.length
                        ? `${d.coexistence.bands.vendors.join(", ")}: they keep the approved records. Unifize links to them; nothing is re-keyed, nothing is ripped out.`
                        : "Your systems keep the approved records. Unifize links to them; nothing is re-keyed, nothing is ripped out.",
                    },
                    {
                      id: "unifize",
                      title: "Unifize",
                      sub: "The governed layer between",
                      names: [],
                      label: "What flows back",
                      body:
                        d.coexistence.bands.back ??
                        "One thread per record, evidence bound, and only the approved outcome goes back, with a 21 CFR Part 11 signature.",
                    },
                    {
                      id: "tools",
                      /* each page names where ITS decisions leak (23 Sep
                       * 2026); quality keeps the everyday channels */
                      ...(d.coexistence.bands.tools ?? {
                        title: "Everyday channels",
                        sub: "Stop being the record",
                        names: ["Email", "Chat", "Sheets", "Meetings"],
                        label: "Where decisions used to go missing",
                        body: "The discussion, the evidence gathering and the sign-off chasing move off email, chat, spreadsheets and meetings and onto the record.",
                      }),
                    },
                  ]}
                />
              </div>
            ) : d.coexistence.paths?.length ? (
              <div data-reveal>
                <SolutionCoexist
                  selectorLabel={d.coexistence.selectorLabel ?? "Where is your system today?"}
                  paths={d.coexistence.paths}
                />
              </div>
            ) : (
              <div className="sk-cx" data-reveal>
                <CoexistDiagram
                  role="Coordination layer"
                  chips={["One governed thread", "Evidence bound to decisions", "Attributable e-signatures"]}
                  boxes={d.coexistence.systemsOfRecord.map((s) => ({ name: s, note: "System of record", kind: "sor" as const }))}
                  caption={d.coexistence.diagramCaption}
                  ariaLabel={`Diagram: Unifize sits as a coordination layer over your ${d.coexistence.systemsOfRecord.join(", ")}, which stay in place as your systems of record.`}
                />
              </div>
            )}
          </div>
        </section>
      ) : null}

      {d.coexistence ? band("alt") : null}

      {/* ============================ 06 · PROOF =======================
       * The shared customer film rail (the product and home pages' proof),
       * led by the one signed figure; the named references follow. */}
      {d.proof && rails && reelStills.length ? (
        <HomeProofReel
          eyebrowN={6}
          heading={d.proof.heading}
          lede={d.proof.lede}
          stills={reelStills}
          lead={reelLead}
          allHref={d.proof.foot.href}
        />
      ) : d.proof ? (
        proofFilms.length ? (
          <ProofFilmRail
            idPrefix="sk"
            eyebrowN={6}
            heading={d.proof.heading}
            lede={d.proof.lede}
            countNoun="customer films"
            films={proofFilms}
            lead={proofLead}
          />
        ) : (
          <section className={"dms-section" + railed} id="proof" aria-labelledby="sk-proof-title">
            <div className="dms-wrap">
              {head(6, "Customer proof", "sk-proof-title", d.proof.heading, d.proof.lede)}
              <div className="sk-refs" style={{ marginTop: "clamp(44px, 5vw, 68px)" }} data-reveal>
                <div className="sk-att">
                  <span className="sk-att__lab">{d.proof.attested.label}</span>
                  <span className="sk-att__stat dms-data">{d.proof.attested.stat}</span>
                  <span className="sk-att__statlab">{d.proof.attested.statLabel}</span>
                  <p className="sk-att__body">{d.proof.attested.body}</p>
                  <span className="sk-att__note">{d.proof.attested.note}</span>
                </div>
                {d.proof.references.map((c) => (
                  <article className="sk-ref" key={c.name}>
                    <span className="sk-ref__tag">{c.tag}</span>
                    <h3 className="sk-ref__name">{c.name}</h3>
                    <p className="sk-ref__desc">{c.desc}</p>
                    {c.link ? <Link href={c.link.href} className="sk-ref__go">{c.link.label}</Link> : null}
                  </article>
                ))}
              </div>
              <div className="sk-tail" data-reveal>
                <p>Every story on the record, by company, industry and module.</p>
                <Link href={d.proof.foot.href}>{d.proof.foot.label} &rarr;</Link>
              </div>
            </div>
          </section>
        )
      ) : null}

      {d.proof ? band(compact ? "dark" : undefined) : null}

      {compact ? null : (
        <>
          {/* ============================ 07 · FOR YOUR INDUSTRY ===========
           * The L1 fan-out in the homepage's industry-registry grammar. */}
          <section className={"dms-section sk-inds-section" + (rails ? railed : " dms-section--alt")} id="by-industry" aria-labelledby="sk-inds-title">
            <div className="dms-wrap">
              {head(7, "For your industry", "sk-inds-title", d.industries.heading, d.industries.lede)}
              <ul className="sk-inds" data-reveal>
                {d.industries.rows.map((row) => (
                  <li key={row.name}>
                    <Link href={row.href} className="sk-ind" aria-label={`${d.name} for ${row.name}: ${row.line}`}>
                      <span className="sk-ind__tile" aria-hidden="true"><IndustryIcon name={row.name} /></span>
                      <span className="sk-ind__name">{row.name}</span>
                      {ARROW}
                      <span className="sk-ind__chips" aria-label="Regulatory frame">
                        {row.chips.map((c) => <span key={c} className="sk-ind__chip">{c}</span>)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {band()}

          {/* ============================ 08 · BY YOUR ROLE ================
           * The product page's owners register, one raised card per seat. */}
          <section className={"dms-section sk-roles-section" + railed} id="by-role" aria-labelledby="sk-roles-title">
            <div className="dms-wrap">
              {head(8, "By your role", "sk-roles-title", d.personas.heading, d.personas.lede)}
              <div className="sk-roles" data-reveal>
                {d.personas.cards.map((p) => (
                  <article className={"sk-role" + (p.primary ? " is-primary" : "")} key={p.key}>
                    <span className="sk-role__stake">
                      {p.primary && rails ? <span className="sk-role__lead">Leads here</span> : null}
                      {p.stake}
                    </span>
                    <h3 className="sk-role__name">{p.name}</h3>
                    <p className="sk-role__value">{p.value}</p>
                    {p.href ? <Link href={p.href} className="sk-role__go">See the role page &rarr;</Link> : null}
                  </article>
                ))}
              </div>
            </div>
          </section>

          {band()}
        </>
      )}

      {/* ============================ 09 · WHEN IT'S URGENT ============
       * The trigger board on the platform's dark ledger: severity by shape
       * and label, the clock in mono, the module and owner it routes to. */}
      <section className={"dms-section dms-section--dark sk-urgent-section" + railed} id="urgent" aria-labelledby="sk-urgent-title">
        <div className="dms-wrap">
          {head(9, <>When it&rsquo;s urgent</>, "sk-urgent-title", d.triggers.heading, d.triggers.lede, true)}
          {rails ? (
            /* On the rails (23 Sep 2026, redone): the homepage way-in cells.
             * Each moment is a cell rail to rail: a warm wash panel holding
             * the record's clock card (the clock in the tax rust, the
             * governed workflow it routes to in blue), then the moment, its
             * owner, and the trigger page when one exists. The per-cell
             * "Urgent" badge is gone; the eyebrow already says it. */
            <UrgentBoard
              rows={
                compact && d.triggers.featured?.length
                  ? d.triggers.featured
                      .map((name) => d.triggers.rows.find((t) => t.name === name))
                      .filter((t): t is DomainPageData["triggers"]["rows"][number] => Boolean(t))
                  : d.triggers.rows
                      .filter((t) => t.severity === "Urgent")
                      .concat(d.triggers.rows.filter((t) => t.severity === "High"))
                      .slice(0, compact ? COMPACT_TRIGGERS : undefined)
              }
            />
          ) : (
          <div className="sk-trigs" data-reveal>
            {urgentLevels.flatMap((level) =>
              d.triggers.rows
                .filter((t) => t.severity === level)
                .map((t) => {
                  const inner = (
                    <>
                      <span className="sk-trig__sig">
                        <SeverityIcon severity={level === "Urgent" ? "Critical" : "High"} />
                        {level}
                      </span>
                      <h3 className="sk-trig__name">{t.name}</h3>
                      <span className="sk-trig__clock">{t.clock}</span>
                      <div className="sk-trig__foot">
                        <span className="sk-trig__mod">Routes to {t.routesTo}</span>
                        <span className="sk-trig__owner">{t.owner}</span>
                        {t.href ? <span className="sk-trig__go">Open the trigger page →</span> : null}
                      </div>
                    </>
                  );
                  return t.href ? (
                    <Link key={t.name} href={t.href} className="sk-trig" aria-label={`Open the page for: ${t.name}`}>{inner}</Link>
                  ) : (
                    <div key={t.name} className="sk-trig">{inner}</div>
                  );
                }),
            ).slice(0, compact ? COMPACT_TRIGGERS : undefined)}
          </div>
          )}
        </div>
      </section>

      {d.trust || d.caseKit ? band() : band("dark")}

      {/* ============ COMPLIANCE & TRUST (fact-gated; see types.ts) ====== */}
      {d.trust ? (
        <section className={"dms-section" + railed} id="trust" aria-labelledby="sk-trust-title">
          <div className="dms-wrap">
            <div className="sk-split" data-reveal>
              <div>
                <Eyebrow>Compliance &amp; trust</Eyebrow>
                <h2 className="dms-h2" id="sk-trust-title">{d.trust.heading}</h2>
              </div>
              <p className="dms-lede">{d.trust.lede}</p>
            </div>
            <ul className="sk-pts" data-reveal>
              {d.trust.points.map((p) => (
                <li className="sk-pt" key={p.title}>
                  <h3 className="sk-pt__t">{p.title}</h3>
                  <p className="sk-pt__b">{p.body}</p>
                </li>
              ))}
            </ul>
            {d.trust.foot ? <p className="sk-note"><span className="dms-dot" aria-hidden="true" />{d.trust.foot}</p> : null}
          </div>
        </section>
      ) : null}

      {d.trust ? band(d.caseKit ? "alt" : undefined) : null}

      {/* ============ BUILD THE CASE (fact-gated; see types.ts) ========== */}
      {d.caseKit ? (
        <section className={"dms-section dms-section--alt" + railed} id="case" aria-labelledby="sk-case-title">
          <div className="dms-wrap">
            <div className="sk-split" data-reveal>
              <div>
                <Eyebrow>Build the case</Eyebrow>
                <h2 className="dms-h2" id="sk-case-title">{d.caseKit.heading}</h2>
              </div>
              <p className="dms-lede">{d.caseKit.lede}</p>
            </div>
            <ul className="sk-pts" data-reveal>
              {d.caseKit.items.map((it) => (
                <li className="sk-pt" key={it.title}>
                  <h3 className="sk-pt__t">{it.title}</h3>
                  <p className="sk-pt__b">{it.body}</p>
                  {it.href ? <Link href={it.href} className="sk-pt__go">{it.cta ?? "Open →"}</Link> : null}
                </li>
              ))}
            </ul>
            {d.caseKit.note ? <p className="sk-note"><span className="dms-dot" aria-hidden="true" />{d.caseKit.note}</p> : null}
          </div>
        </section>
      ) : null}

      {d.caseKit ? band("alt") : null}

      {/* ============================ CLOSE ============================ */}
      <section className={"dms-section dms-section--dark dms-close" + (rails ? " hm-close--rails hm-railed" : "")} id="demo" aria-labelledby="sk-close-h">
        <div className="dms-wrap">
          <div className="dms-close__grid" data-reveal>
            <div className="dms-close__convergence" aria-hidden="true">
              <div className="dms-close__mark">
                <svg viewBox="0 2.2 21 22" fill="none">
                  <path d="M1.55 5.78A1.54 1.54 0 0 0 0 7.32v7.22a7.45 7.45 0 0 0 14.93 0v-2.6a1.55 1.55 0 0 0-3.09 0v2.6a4.38 4.38 0 0 1-8.75 0V8.59h.76a1.41 1.41 0 1 0 0-2.81h-2.3Z" />
                  <path d="M8.08 6.61a7.47 7.47 0 0 0-2.19 5.29v2.62a1.55 1.55 0 0 0 3.09 0V11.9a4.38 4.38 0 0 1 8.75 0v5.98h-.76a1.42 1.42 0 1 0 0 2.83h2.3c.86 0 1.55-.69 1.55-1.55V11.9a7.47 7.47 0 0 0-12.74-5.29Z" />
                </svg>
              </div>
            </div>
            <div className="dms-close__lead">
              <span className="dms-close__eyebrow">{d.close.eyebrow}</span>
              <h2 className="dms-close__h" id="sk-close-h">{d.close.heading}</h2>
            </div>
            <div className="dms-close__side">
              <p className="dms-lede">{d.close.lede}</p>
              <div className="dms-close__cta">
                <BookDemoButton className="dms-btn" source="close">Book a 30-minute walkthrough</BookDemoButton>
                <Link href="/platform" className="dms-btn dms-btn-ghost">See the platform</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <SiteFooter tagline="The decision trace for regulated operations." />
    </main>
  );
}
