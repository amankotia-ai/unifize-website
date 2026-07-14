"use client";

/* ----------------------------------------------------------------------------
 * platform-interactive.tsx - the platform page's two interactive scenes.
 *
 *   GapExplorer - pick one of your systems and see the same event twice: the
 *     record it keeps (filled rows) and the work it never saw (blank form
 *     lines). The blank lines ARE the argument; nothing is explained that
 *     the panels don't show. Tab pattern mirrors FlowExplorer's a11y.
 *
 *   StackExplorer - the platform as three touchable layers (outcomes,
 *     products, building blocks). Click a layer, read its detail. Replaces
 *     a static three-row ledger; same content, now one layer at a time.
 *
 * Both are self-contained client components, keyboard-operable, styled by
 * platform-kit.css (pf-gapx / pf-stackx namespaces).
 * -------------------------------------------------------------------------- */

import { useState } from "react";
import Link from "next/link";

/* ============================================================ GAP EXPLORER */

type GapSystem = {
  key: string;
  label: string;
  record: { ref: string; title: string; rows: [string, string][] };
  missing: string[];
};

const GAP_SYSTEMS: GapSystem[] = [
  {
    key: "qms",
    label: "Your QMS",
    record: {
      ref: "CAPA-2210",
      title: "Recurring torque non-conformance",
      rows: [
        ["State", "Closed · effectiveness verified"],
        ["Root cause", "Approved by QA manager"],
        ["Sign-off", "Complete · Part 11"],
      ],
    },
    missing: [
      "The sixty emails that found the root cause",
      "Why containment took three weeks",
      "Who was waiting on whom, and for how long",
    ],
  },
  {
    key: "erp",
    label: "Your ERP",
    record: {
      ref: "PO-8841",
      title: "Machined housings, expedite",
      rows: [
        ["State", "Received · complete"],
        ["Freight", "Premium · approved"],
        ["Quantity", "4,000 units"],
      ],
    },
    missing: [
      "The shortage call that forced the expedite",
      "Which orders were traded off, and why",
      "Who approved the premium, on what grounds",
    ],
  },
  {
    key: "plm",
    label: "Your PLM",
    record: {
      ref: "BOM · Rev D",
      title: "Drive assembly",
      rows: [
        ["State", "Released"],
        ["Change order", "Closed"],
        ["Effectivity", "2026-07-01"],
      ],
    },
    missing: [
      "The design review that forced Rev D",
      "The objection raised, and how it was resolved",
      "Which suppliers were still building to Rev C",
    ],
  },
  {
    key: "lims",
    label: "Your LIMS",
    record: {
      ref: "SMP-4471",
      title: "Assay, lot 220-B",
      rows: [
        ["Result", "Out of spec · confirmed"],
        ["Retest", "Authorized"],
        ["Analyst", "Sign-off complete"],
      ],
    },
    missing: [
      "The disposition debate the result triggered",
      "Who authorized the retest, and why",
      "When production actually found out",
    ],
  },
];

export function GapExplorer() {
  const [active, setActive] = useState(0);
  const sys = GAP_SYSTEMS[active];

  return (
    <div className="pf-gapx">
      {/* the system picker */}
      <div className="pf-gapx__rail" role="tablist" aria-label="Pick one of your systems">
        <span className="pf-gapx__rail-lab">Pick a system you run today</span>
        {GAP_SYSTEMS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            id={`pf-gaptab-${s.key}`}
            aria-selected={i === active}
            aria-controls="pf-gap-panels"
            className={"pf-gapx__tab" + (i === active ? " is-active" : "")}
            onClick={() => setActive(i)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* the same event, twice */}
      <div className="pf-gapx__panels" id="pf-gap-panels" role="tabpanel" aria-labelledby={`pf-gaptab-${sys.key}`}>
        <article className="pf-gapx__card" key={sys.key + "-has"}>
          <span className="pf-gapx__card-lab">What it shows</span>
          <div className="pf-gapx__doc">
            <div className="pf-gapx__doc-head">
              <span className="pf-gapx__ref dms-data">{sys.record.ref}</span>
              <span className="pf-gapx__title">{sys.record.title}</span>
            </div>
            <dl className="pf-gapx__rows">
              {sys.record.rows.map(([k, v]) => (
                <div className="pf-gapx__row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="pf-gapx__verdict pf-gapx__verdict--ok">The outcome, filed. This part works.</p>
        </article>

        <article className="pf-gapx__card pf-gapx__card--gap" key={sys.key + "-missing"}>
          <span className="pf-gapx__card-lab">What it cannot show</span>
          <div className="pf-gapx__doc">
            <div className="pf-gapx__doc-head">
              <span className="pf-gapx__ref dms-data">{sys.record.ref}</span>
              <span className="pf-gapx__title">The work that produced it</span>
            </div>
            <dl className="pf-gapx__rows">
              {sys.missing.map((m) => (
                <div className="pf-gapx__row pf-gapx__row--blank" key={m}>
                  <dt>{m}</dt>
                  <dd aria-label="No record exists"><span className="pf-gapx__blank" /></dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="pf-gapx__verdict">No record exists. It happened in inboxes and meetings.</p>
        </article>
      </div>
    </div>
  );
}

/* =========================================================== STACK EXPLORER */

type StackLayer = {
  key: string;
  label: string;
  tag: string;
  body: string;
  chips?: string[];
  products?: { code: string; name: string; href: string }[];
  note?: string;
};

const LAYERS: StackLayer[] = [
  {
    key: "outcomes",
    label: "The outcomes",
    tag: "What you feel",
    body:
      "Work closes faster and arrives provable: less time waiting, fewer things reopened, evidence complete at sign-off. AI drafts, chases, and summarizes inside the work; your people approve and stay accountable.",
    chips: ["Faster closure", "Less waiting", "Fewer reopens", "Evidence complete"],
  },
  {
    key: "products",
    label: "The products",
    tag: "What you buy",
    body:
      "Products your team and your auditors already understand, ready for your industry on day one.",
    products: [
      { code: "QMS", name: "Quality management", href: "/explorations/products/qms" },
      { code: "DMS", name: "Document management", href: "/explorations/products/dms" },
      { code: "PLM", name: "Product lifecycle", href: "/explorations/products/plm" },
      { code: "MES", name: "Manufacturing execution", href: "/explorations/products/mes" },
    ],
    note: "Start with one. Add the next on the same foundation when you are ready.",
  },
  {
    key: "components",
    label: "The building blocks",
    tag: "What it runs on",
    body:
      "Every product above is assembled from the same no-code blocks, so the platform shapes itself to your process, not the other way around.",
    chips: ["Stages", "Gates", "Roles", "Approvals", "Evidence requirements", "Forms", "Automations", "Templates"],
  },
];

export function StackExplorer() {
  const [active, setActive] = useState(1); /* land on the products layer */
  const layer = LAYERS[active];

  return (
    <div className="pf-stackx">
      {/* the stack itself - three touchable layers */}
      <div className="pf-stackx__stack" role="tablist" aria-label="The three layers of the platform" aria-orientation="vertical">
        {LAYERS.map((l, i) => (
          <button
            key={l.key}
            type="button"
            role="tab"
            id={`pf-stacktab-${l.key}`}
            aria-selected={i === active}
            aria-controls="pf-stackx-detail"
            className={"pf-stackx__layer" + (i === active ? " is-active" : "")}
            onClick={() => setActive(i)}
          >
            <span className="pf-stackx__layer-tag">{l.tag}</span>
            <span className="pf-stackx__layer-name">{l.label}</span>
            <svg className="pf-stackx__layer-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" aria-hidden="true">
              <path d="M4 10h11M11 5.5l4.5 4.5-4.5 4.5" />
            </svg>
          </button>
        ))}
      </div>

      {/* the active layer, in detail */}
      <div className="pf-stackx__detail" id="pf-stackx-detail" role="tabpanel" aria-labelledby={`pf-stacktab-${layer.key}`}>
        <span className="pf-stackx__detail-tag">{layer.tag}</span>
        <h3 className="pf-stackx__detail-name">{layer.label}</h3>
        <p className="pf-stackx__detail-body">{layer.body}</p>

        {layer.products ? (
          <ul className="pf-band__products">
            {layer.products.map((p) => (
              <li key={p.code}>
                <Link className="pf-band__product" href={p.href}>
                  <span className="pf-band__product-code">{p.code}</span>
                  <span className="pf-band__product-name">{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {layer.chips ? (
          <ul className="pf-band__chips">
            {layer.chips.map((c) => (
              <li key={c} className="pf-band__chip">{c}</li>
            ))}
          </ul>
        ) : null}

        {layer.note ? <p className="pf-stackx__detail-note">{layer.note}</p> : null}
      </div>
    </div>
  );
}
