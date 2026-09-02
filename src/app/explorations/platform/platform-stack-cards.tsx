/* ----------------------------------------------------------------------------
 * platform-stack-cards.tsx - the cards inside the stack panel (04 · The
 * stack). Same paradigm as a product-page teaser (a short stack of small
 * UI slices on a tinted field), but every slice is a piece of Unifize as
 * the customer would meet it, drawn from the CC-2148 story the rest of the
 * page tells:
 *
 *   OutcomesCards - the record thread, the AI draft waiting for a person to
 *                   approve it, and the closure with its clock.
 *   SuiteCards    - the four products as a 2x2 grid: one live today, the
 *                   rest dashed and waiting, all on one drawn foundation.
 *   BlocksCards   - the eight blocks, all of them, grouped by what they
 *                   shape, under one assembled example.
 *
 * Pure presentational, styled by platform-kit.css (pf-mini namespace).
 * -------------------------------------------------------------------------- */

import type { ReactNode } from "react";

/* 16-grid line icons, one stroke weight, one path each */
const ICONS = {
  record: <path d="M3.5 2.5h9v11h-9zM6 6h4M6 8.5h4M6 11h2.5" />,
  spark: <path d="M8 1.5l1.6 4.4L14 7.5l-4.4 1.6L8 13.5 6.4 9.1 2 7.5l4.4-1.6L8 1.5z" />,
  check: <path d="M2.5 3.5h11v9h-11zM5.5 8l2 2 3.5-3.5" />,
  template: <path d="M3 3h10v10H3z" strokeDasharray="2 1.6" />,
  stage: <path d="M2.5 5h4v6h-4zM9.5 5h4v6h-4zM6.5 8h3" />,
  gate: <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" />,
  bolt: <path d="M9 2 4 9h4l-1 5 5-7H8l1-5z" />,
  form: <path d="M3 4h10M3 8h10M3 12h6" />,
  role: <path d="M8 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 13.5c0-2.6 2.2-4 5-4s5 1.4 5 4" />,
  evidence: <path d="M10.5 6.5l-4 4a1.8 1.8 0 0 1-2.5-2.5l5-5a2.8 2.8 0 0 1 4 4l-5 5" />,
  pen: <path d="M3 13h10M4 10.5 10.5 4l1.5 1.5L5.5 12l-2 .5.5-2z" />,
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <span className="pf-mini__icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
        {ICONS[name]}
      </svg>
    </span>
  );
}

/* the card chrome every slice shares: a grey header row, a white body */
function Mini({
  icon,
  kicker,
  name,
  aside,
  children,
}: {
  icon: keyof typeof ICONS;
  kicker: string;
  name: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="pf-mini">
      <div className="pf-mini__head">
        <Icon name={icon} />
        <span className="pf-mini__kicker">{kicker}</span>
        <span className="pf-mini__name">{name}</span>
        {aside ? <span className="pf-mini__aside">{aside}</span> : null}
      </div>
      <div className="pf-mini__body">{children}</div>
    </div>
  );
}

const Chip = ({ tone, children }: { tone?: "accent" | "ok"; children: ReactNode }) => (
  <span className="pf-mini__chip" data-tone={tone}>{children}</span>
);

/* ============================================================ 01 · outcomes */
export function OutcomesCards() {
  return (
    <>
      <Mini icon="record" kicker="Change control" name="CC-2148" aside={<Chip>In review</Chip>}>
        <div className="pf-mini__msg">
          <span className="pf-mini__avatar" aria-hidden="true">SO</span>
          <div className="pf-mini__msg-text">
            <span className="pf-mini__msg-meta">S. Okafor · 09:12</span>
            <span>Torque spec change is ready for cross-functional review.</span>
          </div>
        </div>
      </Mini>

      <Mini icon="spark" kicker="AI assist" name="Drafted the impact assessment" aside={<span className="pf-mini__src">from NC-204 · DWG-2201</span>}>
        <p className="pf-mini__draft">
          No form or fit change. Torque spec only; risk low. Affected: SOP-118, DWG-2201.
        </p>
        <div className="pf-mini__actions">
          <span className="pf-mini__btn is-primary">Approve</span>
          <span className="pf-mini__btn">Edit</span>
          <span className="pf-mini__actions-note">Your call, on the record</span>
        </div>
      </Mini>

      <Mini icon="check" kicker="Closed" name="Signed by D. Fontaine" aside={<Chip tone="ok">Part 11</Chip>}>
        <ul className="pf-mini__stats">
          <li><b>11 days</b><span>to close · was 34</span></li>
          <li><b>9%</b><span>of that spent waiting</span></li>
          <li><b>98%</b><span>evidence complete at sign-off</span></li>
        </ul>
      </Mini>
    </>
  );
}

/* ============================================================ 02 · suite
 * Solid 20-grid glyphs in the coexistence tiles' idiom (one path each). */
const PRODUCT_GLYPHS: Record<string, string> = {
  QMS: "M10 1.5 17 4v5c0 4.6-3 8.3-7 9.5-4-1.2-7-4.9-7-9.5V4l7-2.5Zm3.3 5.8-1.2-1.2L9 9.2 7.9 8.1 6.7 9.3 9 11.6l4.3-4.3Z",
  DMS: "M5 2h7l4 4v12H5V2Zm6.5 1.5V7H15L11.5 3.5ZM7 10h6v1.5H7V10Zm0 3h6v1.5H7V13Z",
  PLM: "M10 2 18 6.5 10 11 2 6.5 10 2Zm-6.2 7.4L10 13l6.2-3.6 1.8 1-8 4.5-8-4.5 1.8-1Zm0 3.6L10 16.6l6.2-3.6 1.8 1L10 18.5 2 14l1.8-1Z",
  MES: "M2 17V8.5l4-2.5v2.5l4-2.5v2.5l4-2.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v13H2Zm3-4v2h2v-2H5Zm4 0v2h2v-2H9Zm4 0v2h2v-2h-2Z",
};

type Product = {
  code: string;
  name: string;
  live?: string;
  records: string[];
};

const PRODUCTS: Product[] = [
  { code: "QMS", name: "Quality management", live: "24 open threads · 3 pending approvals", records: ["CAPA", "NC", "Audit"] },
  { code: "DMS", name: "Document management", records: ["SOP", "Revision", "Training"] },
  { code: "PLM", name: "Product lifecycle", records: ["ECO", "BOM", "DHF"] },
  { code: "MES", name: "Manufacturing execution", records: ["Batch", "Hold", "Readiness"] },
];

const FOUNDATION = ["Accountable threads", "Structured data", "Audit trail", "Part 11 signatures"];

export function SuiteCards() {
  return (
    <div className="pf-suite">
      <ul className="pf-suite__grid">
        {PRODUCTS.map((product) => (
          <li className="pf-suite__card" data-state={product.live ? "live" : "add"} key={product.code}>
            <span className="pf-suite__top">
              <span className="pf-suite__glyph" aria-hidden="true">
                <svg viewBox="0 0 20 20"><path fillRule="evenodd" d={PRODUCT_GLYPHS[product.code]} /></svg>
              </span>
              <span className="pf-suite__code">{product.code}</span>
              <span className="pf-suite__state">{product.live ? "Live" : "Add when ready"}</span>
            </span>
            <span className="pf-suite__name">{product.name}</span>
            {product.live ? (
              <span className="pf-suite__live">{product.live}</span>
            ) : (
              <span className="pf-suite__records">
                {product.records.map((record) => (
                  <span className="pf-suite__record" key={record}>{record}</span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* the foundation they all stand on, drawn: two drops, one bar */}
      <div className="pf-suite__drops" aria-hidden="true"><i /><i /></div>
      <div className="pf-suite__base">
        <span className="pf-suite__base-lab">One foundation</span>
        <ul className="pf-suite__base-rows">
          {FOUNDATION.map((row) => (
            <li key={row}>{row}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================ 03 · blocks */
type Block = { icon: keyof typeof ICONS; name: string; line: string };

const BLOCK_GROUPS: { label: string; blocks: Block[] }[] = [
  {
    label: "Shape the process",
    blocks: [
      { icon: "template", name: "Templates", line: "Start from change control, CAPA, or NC" },
      { icon: "stage", name: "Stages", line: "The steps a record moves through" },
      { icon: "gate", name: "Gates", line: "What must be true before it moves on" },
      { icon: "bolt", name: "Automations", line: "Chase, escalate, and assign on a rule" },
    ],
  },
  {
    label: "Shape the record",
    blocks: [
      { icon: "form", name: "Forms", line: "The fields captured on the record" },
      { icon: "role", name: "Roles", line: "Who can act at each step" },
      { icon: "evidence", name: "Evidence requirements", line: "What must be attached before sign-off" },
      { icon: "pen", name: "Approvals", line: "Who signs, in what order, Part 11 ready" },
    ],
  },
];

const EXAMPLE_STAGES = ["Raise", "Assess", "Approve"];

export function BlocksCards() {
  return (
    <div className="pf-blocks">
      {/* one assembled example: three stages, two gates, from the blocks below */}
      <div className="pf-blocks__example">
        <span className="pf-blocks__example-lab">Assembled · change control</span>
        <ol className="pf-blocks__rail">
          {EXAMPLE_STAGES.map((stage, index) => (
            <li className="pf-blocks__step" key={stage}>
              <span className="pf-blocks__pill">
                <span className="pf-blocks__pill-name">{stage}</span>
                <span className="pf-blocks__pill-kind">Stage</span>
              </span>
              {index < EXAMPLE_STAGES.length - 1 ? (
                <span className="pf-blocks__link" aria-hidden="true">
                  <i className="pf-blocks__diamond" />
                  <span className="pf-blocks__link-kind">Gate</span>
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="pf-blocks__groups">
        {BLOCK_GROUPS.map((group) => (
          <div className="pf-blocks__group" key={group.label}>
            <span className="pf-blocks__group-lab">{group.label}</span>
            <ul className="pf-blocks__list">
              {group.blocks.map((block) => (
                <li className="pf-blocks__card" key={block.name}>
                  <span className="pf-blocks__glyph" aria-hidden="true">
                    <Icon name={block.icon} />
                  </span>
                  <span className="pf-blocks__text">
                    <span className="pf-blocks__name">{block.name}</span>
                    <span className="pf-blocks__line">{block.line}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
