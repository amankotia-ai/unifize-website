/* Product-faithful hero prototypes, composed from the supplied Unifize
 * screenshots. These are intentionally denser than the compact product-page
 * registers: the homepage needs to show the relationship between the queue,
 * the governed conversation, and the record detail at a glance. */

type Status = "open" | "review" | "done" | "hold";

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

function Avatar({ name, tone = 0 }: { name: string; tone?: number }) {
  return <span className={`hm-app__avatar hm-app__avatar--${tone % 5}`} aria-hidden="true">{initials(name)}</span>;
}

function StatusPill({ children, state = "open" }: { children: React.ReactNode; state?: Status }) {
  return <span className={`hm-app__status is-${state}`}>{children}</span>;
}

const QUEUE = [
  { ref: "QE-2210", title: "Torque drift on Line 2", note: "Investigation updated by Priya", owner: "Priya M.", status: "INVESTIGATION", state: "review" as Status },
  { ref: "ECO-1187", title: "Drive housing, rev B → C", note: "Production signature outstanding", owner: "M. Ito", status: "IN APPROVAL", state: "open" as Status },
  { ref: "HLD-341", title: "Batch 220-B disposition", note: "OOS retest attached 18m ago", owner: "QA team", status: "ON HOLD", state: "hold" as Status },
  { ref: "SOP-118", title: "Line clearance procedure", note: "Revision D ready for approval", owner: "A. Duarte", status: "REVIEW", state: "review" as Status },
  { ref: "SCAR-104", title: "Supplier dimensional escape", note: "Response received from Aveline", owner: "L. Chen", status: "OPEN", state: "open" as Status },
];

function Rail() {
  return (
    <aside className="hm-app__rail" aria-hidden="true">
      <span className="hm-app__mark">u</span>
      <span className="hm-app__railicon is-active">◇</span>
      <span className="hm-app__railicon">□</span>
      <span className="hm-app__railicon">≡</span>
      <span className="hm-app__railicon">⌁</span>
      <Avatar name="Priya Mehta" tone={2} />
    </aside>
  );
}

function Queue({ active }: { active: string }) {
  return (
    <aside className="hm-app__queue">
      <div className="hm-app__queuehead">
        <span><b>My work</b><small>12 open</small></span>
        <button type="button" tabIndex={-1}>+ New</button>
      </div>
      <div className="hm-app__search">⌕&nbsp;&nbsp;Search records</div>
      <div className="hm-app__queueitems">
        {QUEUE.map((item, index) => (
          <div className={`hm-app__queueitem${item.ref === active ? " is-active" : ""}`} key={item.ref}>
            <div className="hm-app__queuetop"><span>{item.title}</span><time>{index + 1}h</time></div>
            <p>{item.note}</p>
            <div className="hm-app__queuemeta">
              <span className="hm-app__ref">{item.ref}</span>
              <span className="hm-app__owner"><Avatar name={item.owner} tone={index} />{item.owner}</span>
              <StatusPill state={item.state}>{item.status}</StatusPill>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function AppTopbar({ refNo, title, status, state = "review", owner = "Priya Mehta" }: { refNo: string; title: string; status: string; state?: Status; owner?: string }) {
  return (
    <header className="hm-app__topbar">
      <div className="hm-app__title"><span>{refNo}</span><b>{title}</b></div>
      <div className="hm-app__tools">
        <StatusPill state={state}>{status}</StatusPill>
        <span className="hm-app__person"><Avatar name={owner} tone={2} />{owner}</span>
        <span>♙ 5</span><span>□ Due 18 Jul</span><span>•••</span>
      </div>
    </header>
  );
}

function Bubble({ name, tone, children, time, accent = false }: { name: string; tone: number; children: React.ReactNode; time: string; accent?: boolean }) {
  return (
    <div className="hm-app__message">
      <Avatar name={name} tone={tone} />
      <div className="hm-app__bubble">
        <b className={accent ? "is-accent" : ""}>{name}</b>
        <div>{children}</div>
        <time>✓ {time}</time>
      </div>
    </div>
  );
}

function Composer() {
  return <div className="hm-app__composer"><span>＋</span><p>Send a response from here</p><b>↗</b></div>;
}

export function MockQualityConversation() {
  return (
    <div className="hm-app" role="img" aria-label="Unifize quality event workspace with work queue, governed conversation, investigation checklist, evidence, and completion status.">
      <Rail />
      <Queue active="QE-2210" />
      <main className="hm-app__workspace">
        <AppTopbar refNo="Quality event QE-2210" title="Torque drift on Line 2" status="INVESTIGATION" />
        <div className="hm-app__body">
          <section className="hm-app__thread">
            <Bubble name="Priya Mehta" tone={2} time="09:42" accent>
              The last three readings are outside the control band. I have contained Line 2 and attached the inspection log.
              <div className="hm-app__attachment"><span>PDF</span><b>In-process inspection log</b><small>18 readings · 284 KB</small></div>
            </Bubble>
            <Bubble name="Daniel Cho" tone={1} time="09:51">Confirmed fixture drift at station 4. Root-cause review is ready for Quality.</Bubble>
            <Bubble name="Priya Mehta" tone={2} time="10:03" accent><span className="hm-app__mention">@Maya Ito</span> can you sign the containment disposition before the 14:00 release window?</Bubble>
            <Composer />
          </section>
          <aside className="hm-app__detail">
            <div className="hm-app__detailhead"><b>Event record</b><span>Complete 68%</span></div>
            <div className="hm-app__progress"><i /></div>
            <dl className="hm-app__facts"><div><dt>Severity</dt><dd>Major</dd></div><div><dt>Owner</dt><dd>Priya Mehta</dd></div><div><dt>Lot</dt><dd>LOT-271</dd></div></dl>
            <h4>Investigation checklist</h4>
            <ul className="hm-app__checklist"><li className="is-done">Contain affected WIP</li><li className="is-done">Attach inspection data</li><li>Approve root cause</li><li>Sign disposition</li></ul>
          </aside>
        </div>
      </main>
    </div>
  );
}

export function MockEcoThread() {
  return (
    <div className="hm-app" role="img" aria-label="Unifize engineering change order workspace showing the change conversation, affected records, and joint electronic approval route.">
      <Rail />
      <Queue active="ECO-1187" />
      <main className="hm-app__workspace">
        <AppTopbar refNo="Change order ECO-1187" title="Drive housing, rev B → C" status="IN APPROVAL" owner="Daniel Cho" />
        <div className="hm-app__body">
          <section className="hm-app__thread">
            <Bubble name="Daniel Cho" tone={1} time="11:18" accent>
              Rev C incorporates the supplier DFM feedback. Effectivity is set for 01 Aug after existing rev B stock is consumed.
              <div className="hm-app__filegrid"><span><b>DWG</b><small>Housing_C.step</small></span><span><b>BOM</b><small>2 assemblies affected</small></span></div>
            </Bubble>
            <Bubble name="Priya Mehta" tone={2} time="11:31">Risk review complete. No validation impact; inspection plan updated for the new datum.</Bubble>
            <Bubble name="Maya Ito" tone={3} time="11:47"><span className="hm-app__mention">@Daniel</span> production can cut in after the supplier acknowledgement lands.</Bubble>
            <Composer />
          </section>
          <aside className="hm-app__detail">
            <div className="hm-app__detailhead"><b>Approval route</b><span>2 of 3 signed</span></div>
            <div className="hm-app__approval"><Avatar name="Daniel Cho" tone={1} /><span><b>Engineering</b><small>Signed · 08 Jul, 14:22</small></span><em>✓</em></div>
            <div className="hm-app__approval"><Avatar name="Priya Mehta" tone={2} /><span><b>Quality</b><small>Signed · 09 Jul, 09:06</small></span><em>✓</em></div>
            <div className="hm-app__approval is-pending"><Avatar name="Maya Ito" tone={3} /><span><b>Production</b><small>Signature requested</small></span><em>→</em></div>
            <h4>Affected records</h4>
            <ul className="hm-app__links"><li>Drive housing drawing <b>Rev C</b></li><li>Top-level BOM <b>2 assemblies</b></li><li>Supplier notice <b>Queued</b></li></ul>
          </aside>
        </div>
      </main>
    </div>
  );
}

const HOLDS = [
  { ref: "HLD-341", item: "Batch 220-B · OOS retest", area: "Line 2", age: "2d 4h", owner: "QA decision", state: "hold" as Status },
  { ref: "HLD-338", item: "Torque NC containment", area: "Cell 4", age: "4h", owner: "Engineering", state: "review" as Status },
  { ref: "REL-197", item: "Batch 219-A release review", area: "Suite 1", age: "6h", owner: "Final signature", state: "open" as Status },
  { ref: "HLD-329", item: "Incoming lot 5541 deviation", area: "Stores", age: "1d", owner: "Supplier reply", state: "open" as Status },
  { ref: "REL-191", item: "Packaging line clearance", area: "Line 5", age: "38m", owner: "QA verification", state: "review" as Status },
];

export function MockOpsHolds() {
  return (
    <div className="hm-app hm-app--dashboard" role="img" aria-label="Unifize operations dashboard showing hold aging, release timing, work-in-progress value, and the live disposition queue.">
      <Rail />
      <main className="hm-app__dash">
        <AppTopbar refNo="Operations" title="Holds and release control" status="LIVE" state="done" owner="Maya Ito" />
        <div className="hm-app__dashbody">
          <div className="hm-app__kpis"><article><small>WIP on hold</small><b>$184k</b><span>↓ 12% this week</span></article><article><small>Median disposition</small><b>7.4h</b><span>Target 8h</span></article><article><small>Waiting past SLA</small><b>3</b><span>1 critical</span></article><article><small>Released today</small><b>11</b><span>4 before noon</span></article></div>
          <div className="hm-app__chartrow">
            <article className="hm-app__chart"><div className="hm-app__charthead"><span><b>Hold aging</b><small>Last 7 days</small></span><em>Hours</em></div><div className="hm-app__bars">{[38,52,45,72,61,84,58,44,67,49].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div><div className="hm-app__axis"><span>Mon</span><span>Wed</span><span>Fri</span><span>Today</span></div></article>
            <article className="hm-app__donut"><div className="hm-app__charthead"><span><b>Waiting on</b><small>15 open holds</small></span></div><div><i /><ul><li><b>6</b> Quality</li><li><b>4</b> Engineering</li><li><b>3</b> Supplier</li><li><b>2</b> Production</li></ul></div></article>
          </div>
          <section className="hm-app__table"><div className="hm-app__tablehead"><b>Disposition queue</b><button type="button" tabIndex={-1}>Filter: Open</button></div><div className="hm-app__tablerow is-head"><span>Ref</span><span>Material / event</span><span>Area</span><span>Age</span><span>Waiting on</span></div>{HOLDS.map((h)=><div className={`hm-app__tablerow${h.ref === "HLD-341" ? " is-key" : ""}`} key={h.ref}><span className="hm-app__ref">{h.ref}</span><b>{h.item}</b><span>{h.area}</span><time>{h.age}</time><StatusPill state={h.state}>{h.owner}</StatusPill></div>)}</section>
        </div>
      </main>
    </div>
  );
}

const DOCS = [
  { ref: "SOP-118", title: "Line clearance procedure", rev: "D", owner: "A. Duarte", state: "In approval", review: "18 Jul" },
  { ref: "WI-204", title: "Torque verification work instruction", rev: "F", owner: "D. Cho", state: "Effective", review: "03 Oct" },
  { ref: "POL-014", title: "Document and records control", rev: "C", owner: "P. Mehta", state: "Effective", review: "12 Dec" },
  { ref: "FRM-071", title: "Equipment release checklist", rev: "B", owner: "M. Ito", state: "Draft", review: "—" },
  { ref: "SOP-063", title: "Supplier deviation handling", rev: "E", owner: "L. Chen", state: "Review due", review: "Today" },
];

export function MockDocumentWorkspace() {
  return (
    <div className="hm-app hm-app--docs" role="img" aria-label="Unifize controlled document workspace with document library, selected revision, approval route, and training impact.">
      <Rail />
      <aside className="hm-app__docnav"><b>Documents</b><button type="button" tabIndex={-1}>+ New document</button><div className="hm-app__search">⌕&nbsp;&nbsp;Search documents</div><nav><span className="is-active">All documents <b>247</b></span><span>My approvals <b>4</b></span><span>Review due <b>7</b></span><span>Drafts <b>12</b></span><span>Obsolete <b>31</b></span></nav><h4>Collections</h4><nav><span>Policies</span><span>Procedures</span><span>Work instructions</span><span>Forms & templates</span></nav></aside>
      <main className="hm-app__docmain">
        <AppTopbar refNo="Controlled documents" title="Document register" status="247 RECORDS" state="done" owner="Ava Duarte" />
        <div className="hm-app__docbody">
          <section className="hm-app__doctable"><div className="hm-app__docfilters"><span>All types⌄</span><span>All states⌄</span><button type="button" tabIndex={-1}>Customize view</button></div><div className="hm-app__docrow is-head"><span>Document</span><span>Rev</span><span>Owner</span><span>State</span><span>Next review</span></div>{DOCS.map((d, i)=><div className={`hm-app__docrow${i===0?" is-key":""}`} key={d.ref}><span><b>{d.title}</b><small>{d.ref}</small></span><b>{d.rev}</b><span className="hm-app__owner"><Avatar name={d.owner} tone={i}/>{d.owner}</span><StatusPill state={d.state === "Effective" ? "done" : d.state === "Draft" ? "open" : "review"}>{d.state}</StatusPill><time>{d.review}</time></div>)}</section>
          <aside className="hm-app__docdetail"><div className="hm-app__pdf"><span>PDF</span><i>Controlled copy</i></div><span className="hm-app__ref">SOP-118 · REV D</span><h3>Line clearance procedure</h3><p>Owner Ava Duarte · Quality Systems</p><div className="hm-app__revision"><span>Revision D</span><StatusPill state="review">In approval</StatusPill></div><dl><div><dt>Effective date</dt><dd>On final approval</dd></div><div><dt>Training impact</dt><dd>42 people</dd></div><div><dt>Replaces</dt><dd>Revision C</dd></div></dl><h4>Approval route</h4><div className="hm-app__signers"><span><Avatar name="Priya Mehta" tone={2}/>✓</span><span><Avatar name="Daniel Cho" tone={1}/>✓</span><span className="is-pending"><Avatar name="Maya Ito" tone={3}/>→</span></div></aside>
        </div>
      </main>
    </div>
  );
}

const TAX_TREND = [
  { week: "W19", total: 82, wait: 58 },
  { week: "W20", total: 74, wait: 52 },
  { week: "W21", total: 78, wait: 50 },
  { week: "W22", total: 66, wait: 43 },
  { week: "W23", total: 62, wait: 39 },
  { week: "W24", total: 57, wait: 34 },
  { week: "W25", total: 51, wait: 29 },
  { week: "W26", total: 46, wait: 24 },
];

const TAX_DRIVERS = [
  { label: "Approval latency", value: 36 },
  { label: "Evidence chasing", value: 28 },
  { label: "External response", value: 21 },
  { label: "Unclear ownership", value: 15 },
];

const TAX_THREADS = [
  { ref: "CAPA-2210", title: "Recurring torque non-conformance", point: "Quality approval", owner: "Priya Mehta", age: "3d 4h", tax: "18.2h", state: "Escalated" },
  { ref: "ECO-1187", title: "Drive housing, rev B → C", point: "Production sign-off", owner: "Maya Ito", age: "1d 7h", tax: "11.6h", state: "Nudged" },
  { ref: "SCAR-104", title: "Supplier dimensional escape", point: "Supplier response", owner: "Lena Chen", age: "2d 2h", tax: "9.4h", state: "Waiting" },
  { ref: "SOP-118", title: "Line clearance procedure", point: "Document approval", owner: "Ava Duarte", age: "18h", tax: "6.8h", state: "Nudged" },
];

export function CoordinationTaxDashboard() {
  return (
    <div
      className="hm-taxdash"
      role="img"
      aria-label="Coordination tax dashboard showing 612 hours of tax this month, a declining weekly trend, approval latency as the largest tax driver, and four high-cost threads requiring attention."
    >
      <div aria-hidden="true">
        <header className="hm-taxdash__head">
          <div><span className="hm-taxdash__mark">CT</span><span><b>Coordination tax</b><small>Cross-functional work · All processes</small></span></div>
          <div className="hm-taxdash__filters"><span>Last 30 days⌄</span><span>All teams⌄</span><em>Updated 4m ago</em></div>
        </header>

        <div className="hm-taxdash__kpis">
          <article><small>Total coordination tax</small><b>612h</b><span className="is-good">↓ 18% vs. last month</span></article>
          <article><small>Share of cycle time waiting</small><b>38%</b><span>Active work: 62%</span></article>
          <article><small>Overdue handoffs</small><b>14</b><span>Across 9 open threads</span></article>
          <article><small>Hours returned to teams</small><b>184h</b><span className="is-good">↑ 46h this month</span></article>
        </div>

        <div className="hm-taxdash__main">
          <article className="hm-taxdash__panel hm-taxdash__trend">
            <div className="hm-taxdash__panelhead"><span><b>Coordination tax trend</b><small>Tax hours per week</small></span><span className="hm-taxdash__legend"><i /> Waiting <i /> Active coordination</span></div>
            <div className="hm-taxdash__plot">
              <div className="hm-taxdash__scale"><span>80h</span><span>40h</span><span>0h</span></div>
              <div className="hm-taxdash__bars">
                {TAX_TREND.map((item) => (
                  <div key={item.week}>
                    <span className="hm-taxdash__bar" style={{ height: `${item.total}%` }}>
                      <i style={{ height: `${item.wait}%` }} />
                    </span>
                    <small>{item.week}</small>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="hm-taxdash__panel hm-taxdash__drivers">
            <div className="hm-taxdash__panelhead"><span><b>Where tax accumulates</b><small>Share of measured waiting</small></span></div>
            <div className="hm-taxdash__driverlist">
              {TAX_DRIVERS.map((item) => (
                <div key={item.label}>
                  <span><b>{item.label}</b><em>{item.value}%</em></span>
                  <i><span style={{ width: `${item.value}%` }} /></i>
                </div>
              ))}
            </div>
            <p><b>Approval latency</b> is the largest recoverable source this month.</p>
          </article>
        </div>

        <section className="hm-taxdash__threads">
          <div className="hm-taxdash__threadhead"><span><b>Highest-cost handoffs</b><small>Ranked by recoverable hours</small></span><span>View all 27 →</span></div>
          <div className="hm-taxdash__row is-head"><span>Thread</span><span>Current commit point</span><span>Waiting on</span><span>Age</span><span>Tax</span><span>Action</span></div>
          {TAX_THREADS.map((thread, index) => (
            <div className={`hm-taxdash__row${index === 0 ? " is-key" : ""}`} key={thread.ref}>
              <span><b>{thread.title}</b><small>{thread.ref}</small></span>
              <span>{thread.point}</span>
              <span className="hm-taxdash__owner"><Avatar name={thread.owner} tone={index + 1} />{thread.owner}</span>
              <time>{thread.age}</time>
              <strong>{thread.tax}</strong>
              <em>{thread.state}</em>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
