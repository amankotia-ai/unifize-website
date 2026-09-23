/* ============================================================================
 * ways-in.tsx - the three ways in, rebuilt on the quality Solutions page's
 * grammar (23 Sep 2026, second pass; Abhishek: "see how we've built
 * sections on the quality solution's page... understand the overall page
 * setup and what the focus should be on here").
 *
 * The page's job is ingress: a device-company visitor finds their seat,
 * their work, or their moment, recognises it in a precise artifact from
 * the device world, and leaves by one door to the page that goes deeper.
 * So each section is the homepage way-in grammar the quality page uses
 * (cells rail to rail, a wash panel holding one small product surface with
 * a named cursor, the claim, one exit), and each section keeps one point:
 *
 *   RoleCells      02 - five seats, each shown the record it answers for
 *                  (CC-2148's world: the change record, the ECO's reach,
 *                  the 510(k) dossier, the validated estate, the hold tag).
 *   SolutionCells  03 - the device work, grouped as the four Solutions it
 *                  runs in, each with its device modules and a door to
 *                  that Solutions page. No counts of our own inventory.
 *   04 reuses the shared urgent board (_shared/urgent-board.tsx).
 *
 * Artifacts render through the Solutions pages' WorkArtifact (one widget
 * kind per cell, none repeated on the page); illustrative furniture from
 * the page's own arcade world, never a claim.
 * ========================================================================== */

import Link from "next/link";
import type { CSSProperties } from "react";
import { WorkArtifact } from "../domains/_shared/solution-work-viz";
import type { WorkViz } from "../domains/_shared/types";

type Cell = {
  name: string;
  line: string;
  viz: WorkViz;
  items?: string[];
  go?: { label: string; href: string };
};

/* the cursors: the CC-2148 cast, one tone each */
const MARTIN = { name: "L. Martin", tone: "#0f8f7e" };
const KAPOOR = { name: "R. Kapoor", tone: "#7c3aed" };
const RAMESH = { name: "P. Ramesh", tone: "#d97706" };
const OSEI = { name: "M. Osei", tone: "#2563eb" };
const CHEN = { name: "M. Chen", tone: "#db2777" };

/* ------------------------------------------------------------ 02 · roles
 * Each seat's line is the canonical "owns" from the Personas DB. */
const ROLES: Cell[] = [
  {
    name: "Quality leadership",
    line: "Owns release confidence, and answers for the trace when the investigator is in the room.",
    viz: {
      wash: "sky",
      kicker: "CC-2148",
      state: "In review",
      title: "Sterilization SOP change",
      rows: [
        { label: "Impact assessment bound", meta: "R. Kapoor" },
        { label: "Risk file updated", meta: "ISO 14971" },
        { label: "Release approval", meta: "Today", open: true },
      ],
      cursor: RAMESH,
    },
    go: { label: "For quality leaders →", href: "/explorations/personas/quality-manager" },
  },
  {
    name: "Engineering & NPI",
    line: "Owns change velocity, and the rationale that has to survive the next revision.",
    viz: {
      kind: "impact",
      wash: "blue",
      source: { kicker: "ECO-441", title: "SOP-118 Rev C → D" },
      items: [
        { id: "DHF-07", label: "Design history file" },
        { id: "RMF-12", label: "Risk management file", open: true },
        { id: "TRN-31", label: "Training cascade" },
      ],
      cursor: MARTIN,
    },
    go: { label: "Change control, end to end →", href: "/explorations/domains/change-control" },
  },
  {
    name: "Regulatory Affairs",
    line: "Owns the submission and label trail, under deadlines someone else sets.",
    viz: {
      kind: "dossier",
      wash: "warm",
      kicker: "Special 510(k)",
      title: "Sterilization change, SOP-118 Rev D",
      cite: "21 CFR 807.81(a)(3)",
      state: "Drafting",
      cursor: KAPOOR,
    },
    go: { label: "Regulatory affairs →", href: "/explorations/domains/regulatory-affairs" },
  },
  {
    name: "Compliance & Validation",
    line: "Decides whether a system clears validation before it ever touches an audit.",
    viz: {
      kind: "matrix",
      wash: "paper",
      kicker: "Validated state",
      cols: ["IQ", "OQ", "PQ", "Part 11"],
      rows: [
        { name: "Unifize", cells: ["ok", "ok", "ok", "ok"] },
        { name: "ERP", cells: ["ok", "ok", "due", "ok"] },
        { name: "LIMS", cells: ["ok", "ok", "ok", "gap"] },
      ],
    },
    go: { label: "How it stays validated ↓", href: "#validated" },
  },
  {
    name: "Operations",
    line: "Owns whether decisions move at all, and signs for the cost when they don't.",
    viz: {
      kind: "tag",
      wash: "sky",
      stamp: "HOLD",
      lines: [
        { k: "Lot", v: "22-114" },
        { k: "Line", v: "2 · sterilization" },
        { k: "Waiting on", v: "CC-2148" },
      ],
      note: "Released the hour CC-2148 closes",
      cursor: OSEI,
    },
    go: { label: "Holds and dispositions →", href: "/explorations/domains/quality" },
  },
];

/* --------------------------------------------------------- 03 · coverage
 * The device modules per Solution, from the MD domain map. */
const SOLUTIONS: Cell[] = [
  {
    name: "Quality events & CAPA",
    line: "From the first complaint on line 2 to an effectiveness check that holds.",
    viz: {
      kind: "signal",
      wash: "sky",
      kicker: "Complaints · line 2",
      title: "Seal failures per week",
      weeks: [2, 1, 3, 2, 2, 6, 3],
      spike: 5,
      note: "CAPA-1284 opened on the spike",
      cursor: CHEN,
    },
    items: ["CAPA & Effectiveness", "Nonconformance / NCR", "MRB Disposition", "Internal Audit"],
    go: { label: "See the quality solution →", href: "/explorations/domains/quality" },
  },
  {
    name: "Change control",
    line: "One change carried to every document, approval and training record it touches.",
    viz: {
      kind: "lanes",
      wash: "blue",
      kicker: "ECO-441 · implementation",
      lanes: [
        { name: "Documents", owner: "L. Martin", pct: 100 },
        { name: "Training", owner: "HR", pct: 60 },
        { name: "Validation", owner: "P. Ramesh", pct: 40 },
        { name: "Suppliers", owner: "Supplier Quality", pct: 80 },
      ],
    },
    items: ["Engineering Change (ECO/ECR)", "Design Controls / DHF", "Risk Management File", "Controlled Distribution"],
    go: { label: "See the change control solution →", href: "/explorations/domains/change-control" },
  },
  {
    name: "Supplier quality",
    line: "Qualification and supplier CAPAs worked across the boundary, not through an inbox.",
    viz: {
      kind: "tiles",
      wash: "paper",
      kicker: "PPAP · Level 3",
      title: "Tubing, part 7731",
      total: 18,
      open: [4, 11, 15],
      foot: "Supplier uploads land on the record",
      cursor: KAPOOR,
    },
    items: ["Supplier Qualification / PPAP", "SCAR / Supplier CAPA", "Incoming Inspection / MRB", "Quality Agreements"],
    go: { label: "See the supplier solution →", href: "/explorations/domains/supplier-management" },
  },
  {
    name: "Complaints & recall",
    line: "Awareness date to filed report, with the reportability reasoning kept.",
    viz: {
      kind: "decision",
      wash: "warm",
      kicker: "CMP-0419 · reportability",
      steps: [
        { q: "Death or serious injury?", a: "No" },
        { q: "Could a recurrence cause one?", a: "Yes" },
      ],
      outcome: "Reportable · MDR within 30 days",
      cursor: MARTIN,
    },
    items: ["Complaint / MDR Reporting", "Recall Execution", "Label Governance"],
    go: { label: "See the post-market solution →", href: "/explorations/domains/post-market-and-recall" },
  },
];

function Cells({ cells, compact }: { cells: Cell[]; compact?: boolean }) {
  return (
    <div
      className={"sk-wk md-wk" + (compact ? " md-wk--roles" : "")}
      style={{ "--sk-work-n": cells.length } as CSSProperties}
      data-reveal
    >
      {cells.map((c) => (
        <article className="sk-wk__cell" key={c.name}>
          <div className={"sk-wk__wash sk-wk__wash--" + c.viz.wash} aria-hidden="true">
            <WorkArtifact viz={c.viz} />
          </div>
          <div className="sk-wk__intro">
            <h3>{c.name}</h3>
            <p>{c.line}</p>
          </div>
          {c.items ? (
            <ul className="sk-wk__items">
              {c.items.map((it) => (
                <li key={it}><span>{it}</span></li>
              ))}
            </ul>
          ) : null}
          {c.go ? (
            <Link className="sk-wk__go" href={c.go.href}>{c.go.label}</Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function RoleCells() {
  return <Cells cells={ROLES} compact />;
}

export function SolutionCells() {
  return <Cells cells={SOLUTIONS} />;
}
