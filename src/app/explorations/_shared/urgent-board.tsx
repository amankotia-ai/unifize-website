/* ============================================================================
 * urgent-board.tsx - the "when it's urgent" board on the rails, shared by the
 * Solutions pages (SolutionPage) and the medical-devices industry page
 * (23 Sep 2026). The homepage way-in grammar: cells rail to rail, each led by
 * a warm wash panel holding one drawn surface for the moment (a received
 * sheet, the working days running out, a classification at its worst, the
 * alert that starts it), then the moment, where it routes and who owns it,
 * and the trigger page when one exists. Styles: urgent-board.css.
 * ========================================================================== */

import type { CSSProperties } from "react";
import Link from "next/link";
import "./urgent-board.css";

/* structural, so both the industries TriggerRow and the industry-template
 * one fit */
export type UrgentRow = {
  name: string;
  clock: string;
  routesTo: string;
  owner: string;
  href?: string;
  viz?: UrgentKind;
  /* the moment's own furniture for its surface (see each kind) */
  detail?: string[];
};

/* The urgent board's drawn surfaces (23 Sep 2026, Abhishek: "all three
 * visuals look the same, need some variance"). Four precise mini-UIs, one
 * per kind of moment, each a zoomed fragment on the warm wash: the clock in
 * the tax rust, never a status colour. */
export type UrgentKind =
  | "sheet" | "calendar" | "scale" | "alerts"
  /* the sibling Solutions pages (23 Sep 2026), one surface per moment so no
   * two cells across the Solutions pages draw the same picture:
   *   compliance       trail (an audit trail with a hole in it), state (a
   *                    validated system losing its status), elements (a
   *                    programme's elements with the gaps marked)
   *   regulatory       countdown (the statutory days left, per market),
   *                    letter (the agency's letterhead), tree (a design
   *                    history index with a missing node)
   *   supplier         andon (the stopped line's board), dock (the receiving
   *                    floor filling up), capacity (demand over what the
   *                    supplier can make)
   *   post-market      genealogy (the lot and its sisters out to the field),
   *                    rings (each authority's clock), bins (the held stock)
   *   change control   rejected (the customer's stamp across the ECO),
   *   (24 Sep 2026)    revs (the site's copy one revision behind the
   *                    release), roster (the trained list short on the
   *                    effective date)
   *   document control findings (the audit report's table, one row
   *   (24 Sep 2026)    open), affected (the batches built to the old
   *                    version, under review), agenda (the audit day, the
   *                    document walk-through not ready)
   *   training         lag (effective dates against training completion,
   *   (24 Sep 2026)    the gap in days), shifts (units built per shift by
   *                    operators not yet trained), cert (a training record
   *                    for a version that is no longer current)
   *   operations       stopwatch (the line held, time running up, the
   *   (24 Sep 2026)    sign-offs still missing), allocate (the last units
   *                    against the lines that need them), aging (the
   *                    review board's queue by age)
   *   supply chain     tradeoff (the allocation options on the table, each
   *   (24 Sep 2026)    with the order it slips), stack (expedite requests
   *                    piling on one supplier), sources (the alternates for
   *                    a stopped part, each with its status)
   *   procurement      debrief (the lost bid's reasons, as the customer
   *   (24 Sep 2026)    gave them), gantt (a qualification's steps, planned
   *                    against actual), clauses (an agreement's open points
   *                    and how many rounds each has taken) */
  | "trail" | "state" | "elements"
  | "countdown" | "letter" | "tree"
  | "andon" | "dock" | "capacity"
  | "genealogy" | "rings" | "bins"
  | "rejected" | "revs" | "roster"
  | "findings" | "affected" | "agenda"
  | "lag" | "shifts" | "cert"
  | "stopwatch" | "allocate" | "aging"
  | "tradeoff" | "stack" | "sources"
  | "debrief" | "gantt" | "clauses";
const URGENT_VIZ: UrgentKind[] = ["sheet", "calendar", "scale", "alerts"];

/* the row's own furniture, with a fallback */
const at = (row: UrgentRow, i: number, fallback: string) => row.detail?.[i] ?? fallback;

function UrgentViz({ row, kind }: { row: UrgentRow; kind: UrgentKind }) {
  if (kind === "trail") {
    /* the audit trail, one amendment with nobody behind it */
    const entries = [
      { t: "09:14", who: "a.novak", act: "Result entered" },
      { t: "11:02", who: "no user", act: "Result amended", gap: true },
      { t: "11:40", who: "t.osei", act: "Result reviewed" },
    ];
    return (
      <div className="sk-uv sk-uv--trail">
        <header><small>{at(row, 0, "Audit trail")}</small><b>{row.name}</b></header>
        <ol>
          {entries.map((e) => (
            <li key={e.t} className={e.gap ? "is-gap" : undefined}>
              <time>{e.t}</time><span>{e.act}</span><code>{e.who}</code>
            </li>
          ))}
        </ol>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "state") {
    /* a validated system, its status struck through */
    return (
      <div className="sk-uv sk-uv--state">
        <header><small>{at(row, 0, "GxP system")}</small><b>{at(row, 1, row.name)}</b></header>
        <div className="sk-uv__was"><span>Validated</span><s>{at(row, 2, "Since the last audit")}</s></div>
        <div className="sk-uv__now"><span>Under review</span><small>{row.clock}</small></div>
      </div>
    );
  }
  if (kind === "elements") {
    /* the programme's elements, the gaps marked */
    const items = row.detail?.slice(1) ?? ["Element one", "Element two", "Element three", "Element four", "Element five"];
    return (
      <div className="sk-uv sk-uv--elements">
        <header><small>{at(row, 0, "Programme")}</small><b>{row.name}</b></header>
        <ul>
          {items.map((it) => {
            const gap = it.startsWith("!");
            return <li key={it} className={gap ? "is-gap" : undefined}><i aria-hidden="true" />{gap ? it.slice(1) : it}<small>{gap ? "Gap" : "Held"}</small></li>;
          })}
        </ul>
      </div>
    );
  }
  if (kind === "countdown") {
    /* the statutory days left, big, with each market's clock under it */
    /* detail: the days left first, then one line per market */
    const [left = "11", ...markets] = row.detail ?? [];
    return (
      <div className="sk-uv sk-uv--count">
        <small className="sk-uv__lab">Report due in</small>
        <div className="sk-uv__digits"><b>{left}</b><span>days</span></div>
        <ul>{markets.map((m) => <li key={m}>{m}</li>)}</ul>
      </div>
    );
  }
  if (kind === "letter") {
    /* the agency's letterhead, the clock stamped in the margin */
    return (
      <div className="sk-uv sk-uv--letter">
        <div className="sk-uv__lh"><span className="sk-uv__seal" aria-hidden="true" /><small>{at(row, 0, "Department of Health and Human Services")}</small></div>
        <b className="sk-uv__subj">{at(row, 1, "WARNING LETTER")}</b>
        <i /><i /><i className="is-short" />
        <p className="sk-uv__stamp"><small>Respond within</small>{row.clock}</p>
      </div>
    );
  }
  if (kind === "tree") {
    /* the design history index, one node missing */
    const nodes = row.detail ?? ["Design inputs", "Design outputs", "!Verification", "Validation", "Design transfer"];
    return (
      <div className="sk-uv sk-uv--tree">
        <header><small>Index</small><b>{row.name}</b></header>
        <ul>
          {nodes.map((n) => {
            const gap = n.startsWith("!");
            return <li key={n} className={gap ? "is-gap" : undefined}><span>{gap ? n.slice(1) : n}</span>{gap ? <small>Missing</small> : null}</li>;
          })}
        </ul>
      </div>
    );
  }
  if (kind === "rejected") {
    /* the change notice, the customer's stamp across it.
     * detail: form kicker, then the reason written in the margin */
    return (
      <div className="sk-uv sk-uv--rejected">
        <header><small>{at(row, 0, "Engineering change notice")}</small><b>{at(row, 1, row.name)}</b></header>
        <i /><i /><i className="is-short" />
        <p className="sk-uv__reason"><small>Customer comment</small>{at(row, 2, "Evidence incomplete")}</p>
        <span className="sk-uv__rej" aria-hidden="true">Rejected</span>
      </div>
    );
  }
  if (kind === "revs") {
    /* the released revision against the copy on the floor.
     * detail: document, released rev, site rev, site name */
    return (
      <div className="sk-uv sk-uv--revs">
        <header><small>Document</small><b>{at(row, 0, "Work instruction")}</b></header>
        <div className="sk-uv__rev"><span>Released</span><b>{at(row, 1, "Rev D")}</b></div>
        <div className="sk-uv__rev is-site"><span>{at(row, 3, "At the site")}</span><b>{at(row, 2, "Rev C")}</b></div>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "roster") {
    /* the roles the change retrains, short on the effective date.
     * detail: the change, then one line per person ("!" = not trained) */
    const people = row.detail?.slice(1) ?? ["Operator one", "!Operator two", "!Operator three"];
    return (
      <div className="sk-uv sk-uv--roster">
        <header><small>{at(row, 0, "Retraining")}</small><b>{row.name}</b></header>
        <ul>
          {people.map((p) => {
            const due = p.startsWith("!");
            return <li key={p} className={due ? "is-due" : undefined}><span>{due ? p.slice(1) : p}</span><small>{due ? "Not trained" : "Trained"}</small></li>;
          })}
        </ul>
      </div>
    );
  }
  if (kind === "findings") {
    /* the audit report's findings table, the document-control row open.
     * detail: report kicker, then "clause|finding" rows ("!" marks ours) */
    const rows = row.detail?.slice(1) ?? ["7.5|Records retention", "!4.2.4|Obsolete copy in use", "8.2|Internal audit schedule"];
    return (
      <div className="sk-uv sk-uv--findings">
        <header><small>{at(row, 0, "Audit report")}</small><b>{row.name}</b></header>
        <table>
          <tbody>
            {rows.map((r, i) => {
              const hot = r.startsWith("!");
              const [clause, text] = (hot ? r.slice(1) : r).split("|");
              return <tr key={r} className={hot ? "is-hot" : undefined}><td>{i + 1}</td><td>{clause}</td><td>{text}</td></tr>;
            })}
          </tbody>
        </table>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "affected") {
    /* the output built to the superseded version, each record under review.
     * detail: the version found, then one line per record */
    const recs = row.detail?.slice(1) ?? ["Record one", "Record two", "Record three"];
    return (
      <div className="sk-uv sk-uv--affected">
        <header><small>Built to</small><b>{at(row, 0, "The superseded version")}</b></header>
        <ul>{recs.map((r) => <li key={r}><span>{r}</span><small>Under review</small></li>)}</ul>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "agenda") {
    /* the audit day's agenda, the document walk-through not ready.
     * detail: the date line, then "time|item" rows ("!" = not ready) */
    const items = row.detail?.slice(1) ?? ["09:00|Opening meeting", "!10:00|Document control", "13:00|Floor walk"];
    return (
      <div className="sk-uv sk-uv--agenda">
        <header><small>{at(row, 0, "Audit agenda")}</small><b>{row.name}</b></header>
        <ol>
          {items.map((it) => {
            const due = it.startsWith("!");
            const [t, what] = (due ? it.slice(1) : it).split("|");
            return <li key={it} className={due ? "is-due" : undefined}><time>{t}</time><span>{what}</span>{due ? <small>Pack not ready</small> : null}</li>;
          })}
        </ol>
      </div>
    );
  }
  if (kind === "lag") {
    /* effective date against training completion, per procedure.
     * detail: "doc|effective|trained %|lag" rows ("!" marks the worst) */
    const rows = row.detail ?? ["SOP-231|02 Jun|100%|0 d", "!WI-0417|16 Jun|40%|+34 d", "SOP-118|30 Jun|75%|+12 d"];
    return (
      <div className="sk-uv sk-uv--lag">
        <header><small>Effective vs trained</small><b>{row.name}</b></header>
        <table>
          <thead><tr><th>Procedure</th><th>Effective</th><th>Trained</th><th>Lag</th></tr></thead>
          <tbody>
            {rows.map((r) => {
              const hot = r.startsWith("!");
              const cells = (hot ? r.slice(1) : r).split("|");
              return <tr key={r} className={hot ? "is-hot" : undefined}>{cells.map((c, i) => <td key={i}>{c}</td>)}</tr>;
            })}
          </tbody>
        </table>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "shifts") {
    /* units built per shift under the new procedure, and by whom.
     * detail: the procedure, then "shift|operator|units|untrained?" rows */
    const rows = row.detail?.slice(1) ?? ["A|P. Nair|120|", "B|S. Kim|96|!", "C|E. Lind|104|!"];
    const max = Math.max(...rows.map((r) => Number(r.split("|")[2]) || 0), 1);
    return (
      <div className="sk-uv sk-uv--shifts">
        <header><small>Built to {at(row, 0, "the new procedure")}</small><b>{row.name}</b></header>
        <ul>
          {rows.map((r) => {
            const [shift, who, units, flag] = r.split("|");
            return (
              <li key={r} className={flag ? "is-untrained" : undefined}>
                <span className="sk-uv__sh">Shift {shift}</span>
                <span className="sk-uv__bar"><i style={{ width: `${(Number(units) / max) * 100}%` }} /></span>
                <span className="sk-uv__who">{who}<small>{flag ? "Not trained" : "Trained"}</small></span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  if (kind === "cert") {
    /* a training certificate, issued for a version that has moved on.
     * detail: person, role, trained-on version, current version */
    return (
      <div className="sk-uv sk-uv--cert">
        <div className="sk-uv__cert">
          <span className="sk-uv__rosette" aria-hidden="true" />
          <small>Certificate of training</small>
          <b>{at(row, 0, "Operator")}</b>
          <span>{at(row, 1, "")}</span>
          <p>Qualified on <s>{at(row, 2, "v2.8")}</s></p>
        </div>
        <p className="sk-uv__cur"><small>Version in use</small><b>{at(row, 3, "v3.2")}</b><em>Not covered</em></p>
      </div>
    );
  }
  if (kind === "stopwatch") {
    /* the line held: time running up, the sign-offs it waits on.
     * detail: the line, the elapsed time, then "who|state" rows ("!" = waiting) */
    const [line = "Line 3", elapsed = "03:40", ...who] = row.detail ?? [];
    return (
      <div className="sk-uv sk-uv--watch">
        <small className="sk-uv__lab">{line} held for</small>
        <div className="sk-uv__elapsed"><b>{elapsed}</b><span>h : m</span></div>
        <ul>
          {who.map((w) => {
            const wait = w.startsWith("!");
            const [name, state] = (wait ? w.slice(1) : w).split("|");
            return <li key={w} className={wait ? "is-wait" : undefined}><span>{name}</span><small>{state}</small></li>;
          })}
        </ul>
      </div>
    );
  }
  if (kind === "allocate") {
    /* the last units on hand, and the lines asking for them: the
     * allocation fields still empty.
     * detail: "part|on hand", then "line|need" rows */
    const [head = "Component|40", ...lines] = row.detail ?? [];
    const [part, have] = head.split("|");
    return (
      <div className="sk-uv sk-uv--alloc">
        <header><small>Allocate · {part}</small><b>{have} on hand</b></header>
        <ul>
          {lines.map((l) => {
            const [name, need] = l.split("|");
            return <li key={l}><span>{name}</span><small>needs {need}</small><i aria-hidden="true">?</i></li>;
          })}
        </ul>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "aging") {
    /* the review board's queue by age, the oldest in rust.
     * detail: "bucket|count" rows, oldest last */
    const rows = row.detail ?? ["0-2 d|6", "3-7 d|9", "8-14 d|7", "15+ d|5"];
    const max = Math.max(...rows.map((r) => Number(r.split("|")[1]) || 0), 1);
    return (
      <div className="sk-uv sk-uv--aging">
        <header><small>Lots awaiting disposition, by age</small><b>{row.name}</b></header>
        <div className="sk-uv__hist">
          {rows.map((r, i) => {
            const [bucket, n] = r.split("|");
            return (
              <span key={r} className={i >= rows.length - 2 ? "is-old" : undefined}>
                <i style={{ height: `${(Number(n) / max) * 100}%` }} />
                <small>{bucket}</small>
              </span>
            );
          })}
        </div>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "tradeoff") {
    /* the allocation options, each with what it costs; nothing chosen.
     * detail: the question, then "option|consequence" rows */
    const [q = "Who gets the 40 kits?", ...opts] = row.detail ?? [];
    return (
      <div className="sk-uv sk-uv--trade">
        <header><small>Allocation</small><b>{q}</b></header>
        <ol>
          {opts.map((o, i) => {
            const [opt, cost] = o.split("|");
            return <li key={o}><span className="sk-uv__opt">{String.fromCharCode(65 + i)}</span><span>{opt}<small>{cost}</small></span></li>;
          })}
        </ol>
        <p className="sk-uv__foot"><i aria-hidden="true" />Criteria: not recorded</p>
      </div>
    );
  }
  if (kind === "stack") {
    /* expedite requests stacking on one supplier, newest on top.
     * detail: the supplier, then "id|who|age" rows, newest first */
    const [sup = "Supplier", ...reqs] = row.detail ?? [];
    return (
      <div className="sk-uv sk-uv--stack">
        <small className="sk-uv__lab">Expedites open with {sup}</small>
        <div className="sk-uv__pile">
          {reqs.map((r, i) => {
            const [id, who, age] = r.split("|");
            return (
              <span key={r} style={{ "--i": i } as CSSProperties} className={i === 0 ? "is-top" : undefined}>
                <b>{id}</b><small>{who} · {age}</small><em>Expedite</em>
              </span>
            );
          })}
        </div>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "sources") {
    /* the alternates for a stopped part.
     * detail: the part, then "supplier|status|note" rows (status down/ok/no) */
    const [part = "Part", ...rows] = row.detail ?? [];
    return (
      <div className="sk-uv sk-uv--sources">
        <header><small>Sources for</small><b>{part}</b></header>
        <ul>
          {rows.map((r) => {
            const [name, st, note] = r.split("|");
            return (
              <li key={r} className={"is-" + st}>
                <i aria-hidden="true" />
                <span>{name}<small>{note}</small></span>
                <em>{st === "down" ? "Stopped" : st === "ok" ? "Qualified" : "Not qualified"}</em>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  if (kind === "debrief") {
    /* the customer's reasons for the loss, weighted.
     * detail: the bid, then "reason|weight 1-3" rows ("!" = cited first) */
    const [bid = "Bid", ...reasons] = row.detail ?? [];
    return (
      <div className="sk-uv sk-uv--debrief">
        <header><small>Loss debrief</small><b>{bid}</b></header>
        <ul>
          {reasons.map((r) => {
            const top = r.startsWith("!");
            const [why, w] = (top ? r.slice(1) : r).split("|");
            return (
              <li key={r} className={top ? "is-top" : undefined}>
                <span>{why}</span>
                <span className="sk-uv__w" aria-hidden="true">{[1, 2, 3].map((n) => <i key={n} className={n <= Number(w) ? "is-on" : undefined} />)}</span>
              </li>
            );
          })}
        </ul>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "gantt") {
    /* a qualification's steps: planned against actual days.
     * detail: the supplier, then "step|planned|actual" rows */
    const [who = "Alternate", ...steps] = row.detail ?? [];
    const max = Math.max(...steps.map((st) => Math.max(Number(st.split("|")[1]) || 0, Number(st.split("|")[2]) || 0)), 1);
    return (
      <div className="sk-uv sk-uv--gantt">
        <header><small>Qualification · {who}</small><b>{row.name}</b></header>
        <ul>
          {steps.map((st) => {
            const [name, plan, act] = st.split("|");
            const late = Number(act) > Number(plan);
            return (
              <li key={st} className={late ? "is-late" : undefined}>
                <span>{name}</span>
                <span className="sk-uv__gbar">
                  <i className="is-plan" style={{ width: `${(Number(plan) / max) * 100}%` }} />
                  <i className="is-act" style={{ width: `${(Number(act) / max) * 100}%` }} />
                </span>
                <small>{act} d</small>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  if (kind === "clauses") {
    /* an agreement's clauses: agreed, or open and on which round.
     * detail: the agreement, then "clause|state" rows (state "agreed" or rounds) */
    const [doc = "Quality agreement", ...cls] = row.detail ?? [];
    return (
      <div className="sk-uv sk-uv--clauses">
        <header><small>In negotiation</small><b>{doc}</b></header>
        <ol>
          {cls.map((c) => {
            const [name, st] = c.split("|");
            const open = st !== "agreed";
            return <li key={c} className={open ? "is-open" : undefined}><span>{name}</span><small>{open ? st : "Agreed"}</small></li>;
          })}
        </ol>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "andon") {
    /* the line board: stopped, and how long */
    return (
      <div className="sk-uv sk-uv--andon">
        <div className="sk-uv__lines">
          {["Line 1", at(row, 0, "Line 2"), "Line 3"].map((l, n) => (
            <span key={l} className={n === 1 ? "is-stop" : undefined}><small>{l}</small>{n === 1 ? "Stopped" : "Running"}</span>
          ))}
        </div>
        <div className="sk-uv__timer"><b>03:42:17</b><small>{at(row, 1, "Waiting on supplier parts")}</small></div>
      </div>
    );
  }
  if (kind === "dock") {
    /* the receiving floor: lots waiting, most of them aging */
    const cells = Array.from({ length: 18 }, (_, n) => n);
    return (
      <div className="sk-uv sk-uv--dock">
        <header><small>{at(row, 0, "Receiving")}</small><b>{row.name}</b></header>
        <div className="sk-uv__bays">
          {cells.map((n) => <span key={n} className={n < 11 ? "is-held" : n < 13 ? "is-new" : ""} />)}
        </div>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "capacity") {
    /* weekly demand against what the supplier says it can make */
    const weeks = [[70, 92], [74, 60], [78, 44], [80, 40]];
    return (
      <div className="sk-uv sk-uv--cap">
        <header><small>{at(row, 0, "Supplier capacity")}</small><b>{row.name}</b></header>
        <div className="sk-uv__cols">
          {weeks.map(([need, can], n) => (
            <span key={n}>
              <i className="is-need" style={{ height: `${need}%` }} />
              <i className="is-can" style={{ height: `${can}%` }} />
              <small>W{n + 1}</small>
            </span>
          ))}
        </div>
        <p className="sk-uv__key"><span><i className="is-need" />Demand</span><span><i className="is-can" />Committed</span></p>
      </div>
    );
  }
  if (kind === "genealogy") {
    /* the lot, its sister lots, out to the field */
    const lots = row.detail ?? ["22-303", "22-301", "22-305"];
    return (
      <div className="sk-uv sk-uv--gen">
        <header><small>Scope</small><b>{row.name}</b></header>
        <div className="sk-uv__gen">
          <span className="sk-uv__src">Lot {lots[0]}</span>
          <svg viewBox="0 0 40 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 C 20 30, 20 8, 40 8 M0 30 H40 M0 30 C 20 30, 20 52, 40 52" /></svg>
          <span className="sk-uv__sis">{lots.slice(1).map((l) => <i key={l}>Lot {l}</i>)}<i className="is-q">Lot ?</i></span>
        </div>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "rings") {
    /* each authority's clock as a ring, the tightest nearly closed */
    const clocks = [
      { lab: at(row, 0, "Urgent"), left: 2, of: 5, unit: "working days" },
      { lab: at(row, 1, "Routine"), left: 26, of: 30, unit: "days" },
    ];
    return (
      <div className="sk-uv sk-uv--rings">
        {clocks.map((c) => {
          const f = 1 - c.left / c.of;
          return (
            <div key={c.lab} className="sk-uv__ring">
              <svg viewBox="0 0 44 44" aria-hidden="true">
                <circle cx="22" cy="22" r="18" />
                <circle cx="22" cy="22" r="18" className="is-gone" strokeDasharray={`${f * 113.1} 113.1`} />
              </svg>
              <b>{c.left}</b>
              <small>{c.lab}</small>
              <span>{c.unit} left</span>
            </div>
          );
        })}
      </div>
    );
  }
  if (kind === "bins") {
    /* the warehouse: the held stock, and what is still shipping */
    const bins = Array.from({ length: 12 }, (_, n) => n);
    return (
      <div className="sk-uv sk-uv--bins">
        <header><small>{at(row, 0, "Warehouse")}</small><b>{row.name}</b></header>
        <div className="sk-uv__rack">
          {bins.map((n) => <span key={n} className={[1, 2, 5, 6, 9].includes(n) ? "is-held" : ""}>{[1, 2, 5, 6, 9].includes(n) ? "HOLD" : ""}</span>)}
        </div>
        <p className="sk-uv__foot"><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  if (kind === "sheet") {
    /* the document that arrived: numbered observations, a response stamp */
    return (
      <div className="sk-uv sk-uv--sheet">
        <header><small>Received · Today</small><b>{row.name}</b></header>
        <ol>
          {[0.92, 0.74].map((w, n) => (
            <li key={n}><span>Observation {n + 1}</span><i style={{ width: `${w * 100}%` }} /><i style={{ width: `${w * 62}%` }} /></li>
          ))}
        </ol>
        <p className="sk-uv__stamp"><small>Respond within</small>{row.clock}</p>
      </div>
    );
  }
  if (kind === "calendar") {
    /* the working days running out: three weeks, today ringed, the gone
     * days in rust, the last one flagged */
    const days = Array.from({ length: 15 }, (_, n) => n);
    return (
      <div className="sk-uv sk-uv--cal">
        <header><b>{row.clock}</b></header>
        <div className="sk-uv__dow">{["M", "T", "W", "T", "F"].map((d, n) => <span key={n}>{d}</span>)}</div>
        <div className="sk-uv__days">
          {days.map((n) => (
            <span key={n} className={n < 2 ? "is-gone" : n === 2 ? "is-today" : n === 14 ? "is-due" : ""}>
              {n === 14 ? "Due" : n + 1}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "scale") {
    /* a classification landing at its worst end */
    const steps = ["Low", "Moderate", "High", "Critical"];
    return (
      <div className="sk-uv sk-uv--scale">
        <header><small>Classification</small><b>{row.name}</b></header>
        <div className="sk-uv__steps">
          {steps.map((st, n) => <span key={st} className={n === steps.length - 1 ? "is-on" : ""}>{st}</span>)}
        </div>
        <p><i aria-hidden="true" />{row.clock}</p>
      </div>
    );
  }
  /* alerts: the notification that starts it, older ones behind */
  return (
    <div className="sk-uv sk-uv--alerts">
      <div className="sk-uv__note is-new">
        <span className="sk-uv__dot" />
        <p><b>{row.name}</b><small>{row.clock}</small></p>
        <time>Now</time>
      </div>
      <div className="sk-uv__note"><span className="sk-uv__dot" /><p><i /><i /></p><time>2h</time></div>
      <div className="sk-uv__note"><span className="sk-uv__dot" /><p><i /><i /></p><time>1d</time></div>
    </div>
  );
}

export function UrgentBoard({ rows }: { rows: UrgentRow[] }) {
  return (
    <div className="sk-urg" data-reveal>
      {rows.map((t, idx) => {
        const inner = (
          <>
            <div className="sk-urg__wash" aria-hidden="true">
              <UrgentViz row={t} kind={t.viz ?? URGENT_VIZ[idx % URGENT_VIZ.length]} />
            </div>
            <h3 className="sk-urg__name">{t.name}</h3>
            <p className="sk-urg__owner">Routes to {t.routesTo} &middot; owned by {t.owner}</p>
            {t.href ? <span className="sk-urg__go">Open the trigger page &rarr;</span> : null}
          </>
        );
        return t.href ? (
          <Link key={t.name} href={t.href} className="sk-urg__cell" aria-label={`Open the page for: ${t.name}`}>{inner}</Link>
        ) : (
          <div key={t.name} className="sk-urg__cell">{inner}</div>
        );
      })}
    </div>
  );
}
