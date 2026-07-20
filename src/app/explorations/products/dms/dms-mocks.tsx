/* ----------------------------------------------------------------------------
 * dms-mocks.tsx - coded product prototypes for the DMS page.
 * Static, server-rendered, illustrative content. Each mock is a compact,
 * plausible slice of the product staged inside ShellFrame on a StagePanel.
 * Text restraint: only informative rows, one blue key marker per view.
 * -------------------------------------------------------------------------- */

import { MOCK_REGISTER, MOCK_CHANGE, MOCK_TRAINING, MOCK_TRAIL } from "./dms-data";

const stateClass = (s: string) => "is-" + s.toLowerCase().replace(/\s+/g, "-");

type ProductShellIcon = "home" | "chat" | "documents" | "dashboard" | "people" | "settings";

function ShellIcon({ name }: { name: ProductShellIcon }) {
  const marks: Record<ProductShellIcon, React.ReactNode> = {
    home: <path d="M2.5 7.4 8 3l5.5 4.4v5.1H9.8V9.2H6.2v3.3H2.5V7.4Z" />,
    chat: <path d="M2.2 3.4h11.6v7.2H7.1l-3.8 2.6v-2.6H2.2V3.4Z" />,
    documents: <path d="M4 1.8h5.4l2.7 2.7v9.7H4V1.8Zm5.2.4v2.7h2.6M6 8h4.3M6 10.5h3.1" />,
    dashboard: <path d="M2.3 2.3h4.8v4.8H2.3V2.3Zm6.6 0h4.8v4.8H8.9V2.3Zm-6.6 6.6h4.8v4.8H2.3V8.9Zm6.6 0h4.8v4.8H8.9V8.9Z" />,
    people: <path d="M8 3.1a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm-5 10.2c.6-2.5 2.4-3.9 5-3.9s4.4 1.4 5 3.9" />,
    settings: <path d="M8 5.4A2.6 2.6 0 1 1 8 10.6 2.6 2.6 0 0 1 8 5.4Zm0-3v1.3m0 8.6v1.3M3.7 8H2.4m11.2 0h-1.3M4.9 4.9 4 4m8 8-.9-.9m0-6.2L12 4m-8 8 .9-.9" />,
  };

  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">{marks[name]}</g>
    </svg>
  );
}

function ProductShell({
  active,
  area,
  children,
}: {
  active: ProductShellIcon;
  area: string;
  children: React.ReactNode;
}) {
  const navigation: { icon: ProductShellIcon; label: string }[] = [
    { icon: "home", label: "Home" },
    { icon: "chat", label: "Conversations" },
    { icon: "documents", label: "Documents" },
    { icon: "dashboard", label: "Dashboard" },
    { icon: "people", label: "People" },
  ];

  return (
    <div className="dms-productshell">
      <aside className="dms-productshell__nav">
        <span className="dms-productshell__logo">U</span>
        {navigation.map((item) => (
          <span
            className={`dms-productshell__nav-item${item.icon === active ? " is-active" : ""}`}
            key={item.icon}
            title={item.label}
          >
            <ShellIcon name={item.icon} />
          </span>
        ))}
        <span className="dms-productshell__nav-spacer" />
        <span className="dms-productshell__nav-item"><ShellIcon name="settings" /></span>
        <span className="dms-productshell__avatar">AM</span>
      </aside>
      <div className="dms-productshell__main">
        <div className="dms-productshell__topbar">
          <div className="dms-productshell__crumb">
            <span>Engineering Industries</span><i>/</i><strong>{area}</strong>
          </div>
          <div className="dms-productshell__top-search">
            <ShellIcon name="documents" />
            <span>Search records</span>
            <kbd>⌘K</kbd>
          </div>
          <span className="dms-productshell__new">+ New</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function WorkspaceHeader({
  eyebrow,
  title,
  meta,
  action,
}: {
  eyebrow: string;
  title: string;
  meta: string;
  action: string;
}) {
  return (
    <header className="dms-productview__head">
      <div>
        <span className="dms-productview__eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        <p>{meta}</p>
      </div>
      <span className="dms-productview__action">{action}</span>
    </header>
  );
}

function ProductTabs({ items }: { items: { label: string; count?: string; active?: boolean }[] }) {
  return (
    <div className="dms-producttabs">
      {items.map((item) => (
        <span className={item.active ? "is-active" : undefined} key={item.label}>
          {item.label}{item.count ? <small>{item.count}</small> : null}
        </span>
      ))}
    </div>
  );
}

function ProductToolbar({ filters, count }: { filters: string[]; count: string }) {
  return (
    <div className="dms-producttools">
      <span className="dms-producttools__search">⌕&nbsp; Search this view</span>
      {filters.map((filter) => <span className="dms-producttools__filter" key={filter}>{filter}⌄</span>)}
      <strong>{count}</strong>
    </div>
  );
}

export function MockDocRegister() {
  return (
    <div
      className="dms-mock"
      role="img"
      aria-label="Product prototype: document register with revision, state, and next review date for six controlled documents. SOP-118 revision D is in approval."
    >
      <div aria-hidden="true">
        <div className="dms-mock__grid dms-mock__head">
          <span>Doc</span>
          <span>Title</span>
          <span className="dms-mock__rev">Rev</span>
          <span>State</span>
          <span className="dms-mock__next">Next review</span>
        </div>
        {MOCK_REGISTER.map((r) => (
          <div key={r.no} className={"dms-mock__grid dms-mock__row" + (r.key ? " is-key" : "")}>
            <span className="dms-mock__mono">{r.no}</span>
            <span className="dms-mock__title">{r.title}</span>
            <span className="dms-mock__mono dms-mock__rev">{r.rev}</span>
            <span className={"dms-mock__state " + stateClass(r.state)}>{r.state}</span>
            <span className="dms-mock__mono dms-mock__next">{r.next}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockChangeOrder() {
  return (
    <div
      className="dms-mock"
      role="img"
      aria-label="Product prototype: change order CC-2148 routed for approval. QA and Engineering have signed with Part 11 meaning; Operations signature pending."
    >
      <div aria-hidden="true">
        <div className="dms-mockco__head">
          <span className="dms-mock__mono">{MOCK_CHANGE.id}</span>
          <span className="dms-mock__title dms-mockco__title">{MOCK_CHANGE.title}</span>
          <span className={"dms-mock__state " + stateClass(MOCK_CHANGE.state)}>{MOCK_CHANGE.state}</span>
        </div>
        {MOCK_CHANGE.route.map((s) => (
          <div key={s.who} className={"dms-mockco__row dms-mock__row" + (s.key ? " is-key" : "")}>
            <span className="dms-mockco__who">
              <span className="dms-mock__title">{s.who}</span>
              <span className="dms-mockco__role">{s.role}</span>
            </span>
            <span className="dms-mockco__meaning">{s.meaning}</span>
            <span className="dms-mock__mono">{s.date}</span>
          </div>
        ))}
        <div className="dms-mock__foot">{MOCK_CHANGE.impact}</div>
      </div>
    </div>
  );
}

export function MockTrainingMatrix() {
  return (
    <div
      className="dms-mock"
      role="img"
      aria-label="Product prototype: role-to-document training matrix. The new SOP-118 revision D has opened training assignments for every mapped role."
    >
      <div aria-hidden="true">
        <div className="dms-mocktm__grid dms-mock__head">
          <span>Role</span>
          {MOCK_TRAINING.docs.map((d, i) => (
            <span key={d} className={i === MOCK_TRAINING.keyDoc ? "dms-mocktm__key" : undefined}>{d}</span>
          ))}
        </div>
        {MOCK_TRAINING.rows.map((r) => (
          <div key={r.role} className="dms-mocktm__grid dms-mock__row">
            <span className="dms-mock__title">{r.role}</span>
            {r.cells.map((c, i) => (
              <span key={i} className={"dms-mocktm__dot is-" + c} />
            ))}
          </div>
        ))}
        <div className="dms-mock__foot">
          <span className="dms-mocktm__dot is-done" /> trained
          <span className="dms-mocktm__dot is-assigned" /> assigned on Rev D
        </div>
      </div>
    </div>
  );
}

export function MockRevisionTrail() {
  return (
    <div
      className="dms-mock"
      role="img"
      aria-label="Product prototype: revision history for SOP-118. Revision D effective with a Part 11 signature; revisions C and B retained read-only."
    >
      <div aria-hidden="true">
        <div className="dms-mocktr__grid dms-mock__head">
          <span>SOP-118</span><span>State</span><span>Record</span>
        </div>
        {MOCK_TRAIL.map((r) => (
          <div key={r.rev} className={"dms-mocktr__grid dms-mock__row" + (r.key ? " is-key" : "")}>
            <span className="dms-mock__mono">{r.rev}</span>
            <span className="dms-mock__title">{r.state}</span>
            <span className="dms-mockco__meaning">{r.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Detailed module views used in the bundled-product explorer. These borrow
 * the density and hierarchy of the supplied internal app shells while staying
 * static and legible at marketing-page scale. */
export function MockDocumentWorkspace() {
  const owners = ["RM", "SO", "JL", "AM", "PK"];

  return (
    <div
      className="dms-productmock"
      role="img"
      aria-label="Detailed Unifize document-control workspace showing navigation, controlled-document tabs, filters, lifecycle states, owners, review dates, and the selected record's revision history."
    >
      <div aria-hidden="true">
        <ProductShell active="documents" area="Document control">
          <WorkspaceHeader
            eyebrow="Quality systems · Controlled library"
            title="Documents"
            meta="118 controlled records · 6 reviews due this month"
            action="+ New document"
          />
          <ProductTabs items={[
            { label: "Controlled documents", count: "118", active: true },
            { label: "Templates", count: "24" },
            { label: "Review queue", count: "6" },
          ]} />
          <ProductToolbar filters={["State ", "Owner ", "Standard "]} count="118 records" />

          <div className="dms-producttable dms-producttable--docs">
            <div className="dms-producttable__head">
              <span>Document</span><span>Title</span><span>Rev</span><span>State</span><span>Owner</span><span>Next review</span>
            </div>
            {MOCK_REGISTER.slice(0, 5).map((record, index) => (
              <div className={`dms-producttable__row${record.key ? " is-selected" : ""}`} key={record.no}>
                <span className="is-mono">{record.no}</span>
                <strong>{record.title}</strong>
                <span className="is-mono">{record.rev}</span>
                <span className={`dms-productstatus ${stateClass(record.state)}`}>{record.state}</span>
                <span className="dms-productperson"><i>{owners[index]}</i>{["R. Mehta", "S. Okafor", "J. Lindqvist", "A. Morgan", "P. Kim"][index]}</span>
                <span className="is-mono">{record.next}</span>
              </div>
            ))}
          </div>

          <div className="dms-recorddetail">
            <div className="dms-recorddetail__title">
              <span>Selected record</span>
              <strong>SOP-118 · Cleaning validation</strong>
            </div>
            <div className="dms-recorddetail__trail">
              {MOCK_TRAIL.map((revision) => (
                <span className={revision.key ? "is-current" : undefined} key={revision.rev}>
                  <b>{revision.rev}</b><small>{revision.state}</small>
                </span>
              ))}
            </div>
            <span className="dms-recorddetail__evidence">11 linked records · audit trail sealed</span>
          </div>
        </ProductShell>
      </div>
    </div>
  );
}

export function MockChangeWorkspace() {
  const changes = [
    { id: "CC-2148", title: "Cleaning validation update", state: "In approval", meta: "Due Jul 02", active: true },
    { id: "CC-2145", title: "Packaging line clearance", state: "Impact review", meta: "Due Jul 06" },
    { id: "CC-2141", title: "Supplier monitoring cadence", state: "Draft", meta: "Updated today" },
  ];

  return (
    <div
      className="dms-productmock"
      role="img"
      aria-label="Detailed Unifize change-control workspace showing a change-order queue, impact assessment, linked records, and a Part 11 approval route."
    >
      <div aria-hidden="true">
        <ProductShell active="chat" area="Change control">
          <div className="dms-changeview">
            <aside className="dms-changeview__list">
              <div className="dms-changeview__list-head">
                <span>Change orders</span><strong>14 open</strong>
              </div>
              <span className="dms-changeview__search">⌕&nbsp; Search change orders</span>
              <div className="dms-changeview__filters"><span className="is-active">Mine 6</span><span>Due soon 3</span></div>
              {changes.map((change) => (
                <div className={`dms-changeview__item${change.active ? " is-active" : ""}`} key={change.id}>
                  <div><span className="is-mono">{change.id}</span><small>{change.meta}</small></div>
                  <strong>{change.title}</strong>
                  <span className="dms-productstatus">{change.state}</span>
                </div>
              ))}
            </aside>

            <section className="dms-changeview__record">
              <WorkspaceHeader
                eyebrow="CC-2148 · In approval"
                title="Update cleaning validation per new equipment"
                meta="Raised Jun 24 · Owner R. Mehta · Due Jul 02"
                action="Review change"
              />
              <div className="dms-changeview__facts">
                <span><small>Risk</small><strong>Medium</strong></span>
                <span><small>Affected sites</small><strong>02</strong></span>
                <span><small>Linked record</small><strong>SOP-118</strong></span>
                <span><small>Training</small><strong>Required</strong></span>
              </div>
              <div className="dms-changeview__impact">
                <div>
                  <span className="dms-productview__eyebrow">Impact assessment</span>
                  <strong>Equipment, validation protocol, and operator training</strong>
                </div>
                <span className="dms-productstatus is-in-approval">3 controls linked</span>
              </div>
              <div className="dms-changeview__route-head">
                <div><span className="dms-productview__eyebrow">Approval route</span><strong>2 of 3 signed</strong></div>
                <span className="dms-changeview__part11">21 CFR Part 11</span>
              </div>
              <div className="dms-changeview__route">
                {MOCK_CHANGE.route.map((step, index) => (
                  <div className={step.key ? "is-pending" : "is-complete"} key={step.who}>
                    <span className="dms-changeview__route-state">{step.key ? index + 1 : "✓"}</span>
                    <span className="dms-productperson"><i>{step.who.split(" ").map((part) => part[0]).join("")}</i><b>{step.who}<small>{step.role}</small></b></span>
                    <span>{step.meaning}</span>
                    <time>{step.date || "Awaiting"}</time>
                  </div>
                ))}
              </div>
              <div className="dms-changeview__cascade">
                <span>On final signature</span>
                <strong>Release SOP-118 Rev D</strong><i>→</i><strong>Assign 42 training obligations</strong>
              </div>
            </section>
          </div>
        </ProductShell>
      </div>
    </div>
  );
}

export function MockTrainingWorkspace() {
  const roles = [
    { initials: "LO", name: "Line Operator", people: "24", cells: ["assigned", "done", "done"], due: "Jul 09" },
    { initials: "QA", name: "QA Analyst", people: "08", cells: ["assigned", "done", "done"], due: "Jul 07" },
    { initials: "MT", name: "Maintenance", people: "06", cells: ["assigned", "assigned", "done"], due: "Jul 11" },
    { initials: "PL", name: "Packaging Lead", people: "04", cells: ["done", "done", "done"], due: "Current" },
  ];

  return (
    <div
      className="dms-productmock"
      role="img"
      aria-label="Detailed Unifize training-management workspace showing assignment KPIs, role filters, a role-to-document matrix, due dates, and revision-driven training status."
    >
      <div aria-hidden="true">
        <ProductShell active="people" area="Training management">
          <WorkspaceHeader
            eyebrow="Training · Revision-driven assignments"
            title="Training matrix"
            meta="42 people mapped to the documents used in their role"
            action="Assign training"
          />
          <div className="dms-trainingview__kpis">
            <span><small>Assigned</small><strong>42</strong><i>Rev D release</i></span>
            <span><small>Completed</small><strong>36</strong><i>86% current</i></span>
            <span><small>Due soon</small><strong>05</strong><i>Next 7 days</i></span>
            <span><small>Overdue</small><strong>01</strong><i>Owner notified</i></span>
          </div>
          <ProductTabs items={[
            { label: "Role matrix", count: "12", active: true },
            { label: "Assignments", count: "42" },
            { label: "Evidence", count: "36" },
          ]} />
          <ProductToolbar filters={["Role ", "Status ", "Site "]} count="12 roles" />
          <div className="dms-trainingview__matrix">
            <div className="dms-trainingview__matrix-head">
              <span>Role</span><span>People</span>
              {MOCK_TRAINING.docs.map((doc, index) => <span className={index === MOCK_TRAINING.keyDoc ? "is-key" : undefined} key={doc}>{doc}</span>)}
              <span>Due</span>
            </div>
            {roles.map((role) => (
              <div className="dms-trainingview__matrix-row" key={role.name}>
                <span className="dms-productperson"><i>{role.initials}</i><b>{role.name}</b></span>
                <span className="is-mono">{role.people}</span>
                {role.cells.map((cell, index) => (
                  <span className={`dms-trainingstate is-${cell}`} key={`${role.name}-${index}`}>
                    {cell === "done" ? "✓ Current" : "○ Assigned"}
                  </span>
                ))}
                <span className="is-mono">{role.due}</span>
              </div>
            ))}
          </div>
          <div className="dms-trainingview__footer">
            <span><i className="dms-trainingstate__dot is-assigned" />Assignments opened automatically from SOP-118 Rev D</span>
            <strong>Completion evidence is bound to the revision</strong>
          </div>
        </ProductShell>
      </div>
    </div>
  );
}
