/* ----------------------------------------------------------------------------
 * home-entry-viz.tsx - the artifact in each way-in card's wash panel
 * (22 Sep 2026, replacing the isometric drawings Abhishek rejected: "I
 * don't like these"). The reference grammar (Respan) is a precise piece of
 * product UI floating on the wash with a "You" cursor on the thing the
 * visitor would touch. Same call as the symptom cards: mini-UI, not drawn
 * scenes. One coherent surface per card:
 *
 *   solution - a change order's step tracker: two steps closed, the cursor
 *              on the one the visitor owns (improving a process)
 *   product  - the four-module picker, QMS selected (evaluating a system)
 *   industry - an audit-trail card for a medical-device complaint: the
 *              standards it is audited under and the timeline to the filing
 *              (my regulated world)
 *
 * Everything is presentational (aria-hidden at the call site). Status is
 * carried by glyph + label colour, never a coloured edge. Styles live in
 * home-rails.css under the hm-ev namespace. Server module.
 * -------------------------------------------------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import { NavGlyph } from "../_shared/nav-data";

function Done() {
  return (
    <svg className="hm-ev__ico is-done" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6.4" />
      <path d="m4.4 7.2 1.9 1.9 3.4-4" />
    </svg>
  );
}

function Open() {
  return (
    <svg className="hm-ev__ico is-open" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6.4" />
      <circle cx="7" cy="7" r="2.2" className="hm-ev__dot" />
    </svg>
  );
}

/* the reference's cursor, made multiplayer (22 Sep: "assign names and
 * colors to the cursor elements"): each card's cursor is a named person
 * from the arcade world, arrow and pill in that person's colour. The
 * colours sit off the brand blue on purpose (blue is Unifize's). */
function Cursor({ name, tone, className }: { name: string; tone: string; className?: string }) {
  return (
    <span
      className={"hm-ev__you" + (className ? " " + className : "")}
      style={{ "--cursor": tone } as CSSProperties}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 3.5 19 11.2l-6.1 1.5-3.4 5.4z" />
      </svg>
      <b>{name}</b>
    </span>
  );
}

function SolutionViz() {
  return (
    <div className="hm-ev hm-ev--solution">
      <div className="hm-ev__card">
        <header className="hm-ev__head">
          <span className="hm-ev__kicker">Change order · CC-2148</span>
          <span className="hm-ev__state">In progress</span>
        </header>
        <p className="hm-ev__title">Torque spec update · housing assembly</p>
        <ul className="hm-ev__steps">
          <li>
            <Done />
            <span>Impact assessed</span>
            <small>Day 1</small>
          </li>
          <li>
            <Done />
            <span>Documents updated</span>
            <small>Day 2</small>
          </li>
          <li className="is-target">
            <Open />
            <span>Approval</span>
            <small>Today</small>
          </li>
        </ul>
      </div>
      <Cursor name="J. Rivera" tone="#7c3aed" className="hm-ev__you--solution" />
    </div>
  );
}

function ProductViz() {
  const modules = [
    { code: "QMS", name: "Quality", icon: "qms" as const, on: true },
    { code: "DMS", name: "Documents", icon: "dms" as const },
    { code: "MES", name: "Manufacturing", icon: "mes" as const },
    { code: "PLM", name: "Product", icon: "plm" as const },
  ];
  return (
    <div className="hm-ev hm-ev--product">
      <div className="hm-ev__card">
        <header className="hm-ev__head">
          <span className="hm-ev__kicker">Start with</span>
          <span className="hm-ev__meta">One platform</span>
        </header>
        <ul className="hm-ev__modules">
          {modules.map((m) => (
            <li key={m.code} className={m.on ? "is-on" : undefined}>
              <span className="hm-ev__glyph"><NavGlyph name={m.icon} /></span>
              <span className="hm-ev__code">{m.code}</span>
              <span className="hm-ev__name">{m.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <Cursor name="D. Fontaine" tone="#0f8f7e" className="hm-ev__you--product" />
    </div>
  );
}

function IndustryViz() {
  return (
    <div className="hm-ev hm-ev--industry">
      <div className="hm-ev__card">
        <header className="hm-ev__head">
          <span className="hm-ev__kicker">Medical devices</span>
          <span className="hm-ev__meta">Complaint CMP-341</span>
        </header>
        <div className="hm-ev__chips">
          <i>21 CFR 820</i>
          <i>ISO 13485</i>
          <i>21 CFR 803</i>
        </div>
        <ol className="hm-ev__trail">
          <li>
            <Done />
            <span>Complaint logged</span>
            <small>09:12</small>
          </li>
          <li>
            <Done />
            <span>Reportability assessed</span>
            <small>09:40</small>
          </li>
          <li className="is-target">
            <Open />
            <span>MDR filed</span>
            <small>Day 3</small>
          </li>
        </ol>
      </div>
      <Cursor name="M. Osei" tone="#d97706" className="hm-ev__you--industry" />
    </div>
  );
}

export const ENTRY_VIZ: Record<"solution" | "product" | "industry", ReactNode> = {
  solution: <SolutionViz />,
  product: <ProductViz />,
  industry: <IndustryViz />,
};
