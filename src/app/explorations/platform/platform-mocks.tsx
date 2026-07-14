/* ----------------------------------------------------------------------------
 * platform-mocks.tsx - coded product prototype for the platform page.
 * MockThreadMetrics: the measurement view, as the product renders it - a
 * register of live threads with time open, time waiting, and evidence
 * completeness per thread, plus the week's aggregates on top. Sample data;
 * reuses the shared .dms-mock atoms, per-view columns inline.
 * Server component, no state.
 * -------------------------------------------------------------------------- */

const AGGREGATES = [
  { k: "Median closure", v: "28 days", d: "was 90" },
  { k: "Time spent waiting", v: "-41%", d: "vs. last quarter" },
  { k: "Evidence complete at sign-off", v: "100%", d: "148 of 148 threads" },
];

const THREADS = [
  { ref: "CAPA-2210", title: "Recurring torque non-conformance", open: "26d", waiting: "2d", evidence: 100, key: true },
  { ref: "CC-2148", title: "Update cleaning validation per new equipment", open: "11d", waiting: "6h · nudged", evidence: 80 },
  { ref: "NC-1092", title: "Incoming inspection failure, lot 220-B", open: "4d", waiting: "1d", evidence: 60 },
  { ref: "SUP-0233", title: "Supplier corrective action, machined housings", open: "19d", waiting: "3d · escalated", evidence: 90 },
];

export function MockThreadMetrics() {
  const cols = "92px minmax(0,1fr) 64px 72px 140px";
  return (
    <div
      className="dms-mock"
      role="img"
      aria-label="Product prototype: the measurement view. Aggregates for the week, then a register of open threads with time open, time waiting, and evidence completeness per thread."
    >
      <div aria-hidden="true">
        <div className="pf-mockmx__aggs">
          {AGGREGATES.map((a) => (
            <div className="pf-mockmx__agg" key={a.k}>
              <span className="pf-mockmx__agg-k">{a.k}</span>
              <span className="pf-mockmx__agg-v dms-data">{a.v}</span>
              <span className="pf-mockmx__agg-d">{a.d}</span>
            </div>
          ))}
        </div>
        <div className="dms-mock__grid dms-mock__head" style={{ gridTemplateColumns: cols }}>
          <span>Thread</span><span>Title</span><span>Open</span><span>Waiting</span><span>Evidence</span>
        </div>
        {THREADS.map((t) => (
          <div key={t.ref} className={"dms-mock__grid dms-mock__row" + (t.key ? " is-key" : "")} style={{ gridTemplateColumns: cols }}>
            <span className="dms-mock__mono">{t.ref}</span>
            <span className="dms-mock__title">{t.title}</span>
            <span className="dms-mock__mono">{t.open}</span>
            <span className="dms-mock__mono">{t.waiting}</span>
            <span className="pf-mockmx__ev">
              <span className="pf-mockmx__ev-track"><span className="pf-mockmx__ev-fill" style={{ width: `${t.evidence}%` }} /></span>
              <span className="dms-mock__mono dms-data">{t.evidence}%</span>
            </span>
          </div>
        ))}
        <div className="dms-mock__foot">Visible per thread, updated as work moves · overdue signatures are nudged, then escalated, automatically</div>
      </div>
    </div>
  );
}
