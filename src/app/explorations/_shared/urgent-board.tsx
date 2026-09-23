/* ============================================================================
 * urgent-board.tsx - the "when it's urgent" board on the rails, shared by the
 * Solutions pages (SolutionPage) and the medical-devices industry page
 * (23 Sep 2026). The homepage way-in grammar: cells rail to rail, each led by
 * a warm wash panel holding one drawn surface for the moment (a received
 * sheet, the working days running out, a classification at its worst, the
 * alert that starts it), then the moment, where it routes and who owns it,
 * and the trigger page when one exists. Styles: urgent-board.css.
 * ========================================================================== */

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
   *                    rings (each authority's clock), bins (the held stock) */
  | "trail" | "state" | "elements"
  | "countdown" | "letter" | "tree"
  | "andon" | "dock" | "capacity"
  | "genealogy" | "rings" | "bins";
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
