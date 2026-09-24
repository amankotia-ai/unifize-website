/* ----------------------------------------------------------------------------
 * solution-work-viz.tsx - the artifact in each "work inside" cell's wash
 * panel on the rails (23 Sep 2026). The homepage way-in grammar
 * (home/home-entry-viz.tsx): one small, precise product surface floating on
 * the wash, a named cursor on the step the visitor would touch. One card
 * per cluster, built from the cluster's `viz` data (the page's own arcade
 * world: records, people, dates), so each domain stages its own record.
 *
 * Kinds (second wave, 23 Sep 2026, the sibling Solutions pages): quality's
 * four cells are `record` cards. Every other page draws a different widget
 * per cluster (a validation matrix, a rule fanning out to documents, a
 * carton label, a supplier scorecard, a hold tag, four parallel lanes...),
 * so no two cells on the Solutions pages share a picture.
 *
 * Presentational (aria-hidden at the call site). Status is carried by
 * glyph + label colour, never a coloured edge. Styles: solution-rails.css
 * (sk-wv, the record card) and solution-viz.css (every other kind).
 * Server module.
 * -------------------------------------------------------------------------- */
import type { CSSProperties } from "react";
import type { VizCursor, WorkViz } from "./types";

function Done() {
  return (
    <svg className="sk-wv__ico is-done" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6.4" />
      <path d="m4.4 7.2 1.9 1.9 3.4-4" />
    </svg>
  );
}

function Open() {
  return (
    <svg className="sk-wv__ico is-open" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6.4" />
      <circle cx="7" cy="7" r="2.2" className="sk-wv__dot" />
    </svg>
  );
}

function Gap() {
  return (
    <svg className="sk-wv__ico is-gap" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 1.6 12.8 12H1.2L7 1.6Z" />
      <path d="M7 5.6v2.8M7 10.1v.1" />
    </svg>
  );
}

function Cursor({ cursor }: { cursor?: VizCursor }) {
  if (!cursor) return null;
  return (
    <span className="sk-wv__you" style={{ "--cursor": cursor.tone } as CSSProperties}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 3.5 19 11.2l-6.1 1.5-3.4 5.4z" />
      </svg>
      <b>{cursor.name}</b>
    </span>
  );
}

function Surface({ viz }: { viz: WorkViz }) {
  switch (viz.kind) {
    case "matrix":
      /* the validated estate: systems down, checks across */
      return (
        <div className="sk-wv__card sk-vz-mx">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <table>
            <thead>
              <tr><th />{viz.cols.map((c) => <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {viz.rows.map((r) => (
                <tr key={r.name}>
                  <th>{r.name}</th>
                  {r.cells.map((c, i) => (
                    <td key={i} className={"is-" + c}>{c === "ok" ? <Done /> : c === "due" ? <Open /> : <Gap />}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "impact":
      /* one rule, fanning out to what it touches */
      return (
        <div className="sk-vz-im">
          <div className="sk-wv__card sk-vz-im__src">
            <span className="sk-wv__kicker">{viz.source.kicker}</span>
            <b>{viz.source.title}</b>
          </div>
          <svg className="sk-vz-im__wires" viewBox="0 0 40 120" preserveAspectRatio="none" aria-hidden="true">
            {viz.items.map((_, i) => {
              const y = ((i + 0.5) / viz.items.length) * 120;
              return <path key={i} d={`M0 60 C 22 60, 18 ${y}, 40 ${y}`} />;
            })}
          </svg>
          <ul className="sk-vz-im__items">
            {viz.items.map((it) => (
              <li key={it.id} className={it.open ? "is-open" : undefined}>
                <span>{it.id}</span>
                {it.label}
              </li>
            ))}
          </ul>
        </div>
      );

    case "form":
      /* the report being filled where it happened */
      return (
        <div className="sk-wv__card sk-vz-fm">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <p className="sk-wv__title">{viz.title}</p>
          <div className="sk-vz-fm__fields">
            {viz.fields.map((f) => (
              <label key={f.label} className={f.focus ? "is-focus" : undefined}>
                <small>{f.label}</small>
                <span>
                  {f.value}
                  {f.select ? <svg viewBox="0 0 10 10" aria-hidden="true"><path d="m2.5 4 2.5 2.5L7.5 4" /></svg> : null}
                  {f.focus ? <i aria-hidden="true" /> : null}
                </span>
              </label>
            ))}
          </div>
        </div>
      );

    case "signoff":
      /* a release signed across two organisations */
      return (
        <div className="sk-wv__card sk-vz-so">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <p className="sk-wv__title">{viz.title}</p>
          <ol>
            {viz.signers.map((s) => (
              <li key={s.org} className={s.time ? "is-signed" : "is-pending"}>
                <small>{s.org}</small>
                <span className="sk-vz-so__line">{s.time ? <em>{s.name}</em> : <i>Awaiting signature</i>}</span>
                <span className="sk-vz-so__meta">{s.time ? `${s.meaning} · ${s.time}` : `${s.name} · ${s.meaning}`}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case "dossier":
      /* the filing as a stack of sheets; the citation checked against the
       * register on the front one */
      return (
        <div className="sk-vz-ds">
          <span className="sk-vz-ds__sheet is-back2" />
          <span className="sk-vz-ds__sheet is-back1" />
          <div className="sk-vz-ds__sheet is-front">
            <span className="sk-wv__kicker">{viz.kicker}</span>
            <b>{viz.title}</b>
            <i /><i /><i className="is-short" />
            <p className="sk-vz-ds__cite"><Done /><span>{viz.cite}</span><small>{viz.state}</small></p>
            <i /><i className="is-short" />
          </div>
        </div>
      );

    case "clock": {
      /* one day axis: gone days filled, today ringed, the deadlines marked */
      const pct = (n: number) => `${(n / viz.span) * 100}%`;
      return (
        <div className="sk-wv__card sk-vz-ck">
          <header className="sk-wv__head">
            <span className="sk-wv__kicker">{viz.kicker}</span>
            <span className="sk-wv__state">Day {viz.day}</span>
          </header>
          <p className="sk-wv__title">{viz.title}</p>
          <div className="sk-vz-ck__axis" style={{ "--today": pct(viz.day) } as CSSProperties}>
            <span className="sk-vz-ck__gone" />
            <span className="sk-vz-ck__today" />
            {viz.marks.map((m) => (
              <span key={m.label} className="sk-vz-ck__mark" style={{ left: pct(m.day) }}>
                <b>{m.label}</b>
                <small>Day {m.day}</small>
              </span>
            ))}
          </div>
          <div className="sk-vz-ck__ticks"><span>Day 0</span><span>Day {viz.span}</span></div>
        </div>
      );
    }

    case "label":
      /* the carton label, and where the approved change has landed */
      return (
        <div className="sk-vz-lb">
          <div className="sk-vz-lb__label">
            <div className="sk-vz-lb__top">
              <b>{viz.product}</b>
              <span>{viz.version}</span>
            </div>
            {viz.lines.map((l) => <small key={l}>{l}</small>)}
            <div className="sk-vz-lb__udi" aria-hidden="true">
              {Array.from({ length: 34 }, (_, i) => (
                <i key={i} style={{ width: [1, 2, 1, 3, 1, 1, 2][i % 7] }} />
              ))}
            </div>
            <div className="sk-vz-lb__syms" aria-hidden="true"><span>REF</span><span>LOT</span><span>MD</span></div>
          </div>
          <ul className="sk-vz-lb__ends">
            {viz.endpoints.map((e) => (
              <li key={e.name} className={e.done ? "is-done" : "is-open"}>{e.done ? <Done /> : <Open />}{e.name}</li>
            ))}
          </ul>
        </div>
      );

    case "feed":
      /* the regulatory-intelligence feed; the binding item routed */
      return (
        <div className="sk-wv__card sk-vz-fd">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <ul>
            {viz.items.map((it) => (
              <li key={it.title} className={it.hot ? "is-hot" : undefined}>
                <span className="sk-vz-fd__src">{it.source}</span>
                <span className="sk-vz-fd__t">{it.title}</span>
                <span className="sk-vz-fd__tag">{it.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "scorecard":
      return (
        <div className="sk-wv__card sk-vz-sc">
          <header className="sk-vz-sc__head">
            <span className="sk-vz-sc__logo" aria-hidden="true">{viz.name.slice(0, 2)}</span>
            <b>{viz.name}</b>
            <span className="sk-wv__state">{viz.status}</span>
          </header>
          <ul>
            {viz.metrics.map((m) => (
              <li key={m.label}>
                <small>{m.label}</small>
                <span className="sk-vz-sc__bar"><i style={{ width: `${m.value}%` }} className={m.value < 80 ? "is-low" : undefined} /></span>
                <b>{m.value}</b>
              </li>
            ))}
          </ul>
        </div>
      );

    case "tiles":
      /* the part-approval package: one tile per element, the open ones ringed */
      return (
        <div className="sk-wv__card sk-vz-tl">
          <header className="sk-wv__head">
            <span className="sk-wv__kicker">{viz.kicker}</span>
            <span className="sk-wv__state">{viz.total - viz.open.length} of {viz.total}</span>
          </header>
          <p className="sk-wv__title">{viz.title}</p>
          <div className="sk-vz-tl__grid">
            {Array.from({ length: viz.total }, (_, i) => (
              <span key={i} className={viz.open.includes(i + 1) ? "is-open" : "is-done"}>{i + 1}</span>
            ))}
          </div>
          <p className="sk-vz-tl__foot">{viz.foot}</p>
        </div>
      );

    case "tag":
      /* the hold tag on the lot at the dock */
      return (
        <div className="sk-vz-tg">
          <span className="sk-vz-tg__hole" aria-hidden="true" />
          <b className="sk-vz-tg__stamp">{viz.stamp}</b>
          <dl>
            {viz.lines.map((l) => (
              <div key={l.k}><dt>{l.k}</dt><dd>{l.v}</dd></div>
            ))}
          </dl>
          <p>{viz.note}</p>
        </div>
      );

    case "thread":
      /* one thread, both companies on it */
      return (
        <div className="sk-wv__card sk-vz-th">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <ul>
            {viz.messages.map((m) => (
              <li key={m.text} className={m.ext ? "is-ext" : undefined}>
                <small>{m.org}</small>
                <span>{m.text}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "signal": {
      const max = Math.max(...viz.weeks);
      return (
        <div className="sk-wv__card sk-vz-sg">
          <header className="sk-wv__head">
            <span className="sk-wv__kicker">{viz.kicker}</span>
          </header>
          <p className="sk-wv__title">{viz.title}</p>
          <div className="sk-vz-sg__bars">
            {viz.weeks.map((w, i) => (
              <span key={i} className={i === viz.spike ? "is-spike" : undefined} style={{ height: `${(w / max) * 100}%` }} />
            ))}
          </div>
          <p className="sk-vz-sg__note"><i aria-hidden="true" />{viz.note}</p>
        </div>
      );
    }

    case "decision":
      /* the reportability call, one question at a time */
      return (
        <div className="sk-wv__card sk-vz-dc">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <ol>
            {viz.steps.map((s) => (
              <li key={s.q}>
                <span>{s.q}</span>
                <b className={s.a === "Yes" ? "is-yes" : "is-no"}>{s.a}</b>
              </li>
            ))}
          </ol>
          <p className="sk-vz-dc__out">{viz.outcome}</p>
        </div>
      );

    case "lanes":
      /* four tracks, one record */
      return (
        <div className="sk-wv__card sk-vz-ln">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <ul>
            {viz.lanes.map((l) => (
              <li key={l.name}>
                <span className="sk-vz-ln__name">{l.name}<small>{l.owner}</small></span>
                <span className="sk-vz-ln__track"><i style={{ width: `${l.pct}%` }} /></span>
              </li>
            ))}
          </ul>
          <span className="sk-vz-ln__spine" aria-hidden="true" />
        </div>
      );

    case "asset":
      /* one installed unit and its service history on a line */
      return (
        <div className="sk-wv__card sk-vz-as">
          <header className="sk-vz-as__head">
            <span className="sk-vz-as__qr" aria-hidden="true">
              {Array.from({ length: 25 }, (_, i) => <i key={i} className={[0, 2, 4, 6, 7, 10, 12, 13, 16, 18, 20, 21, 24].includes(i) ? "is-on" : undefined} />)}
            </span>
            <span>
              <b>{viz.serial}</b>
              <small>{viz.model}</small>
            </span>
          </header>
          <ol className="sk-vz-as__line">
            {viz.visits.map((v) => (
              <li key={v.label} className={v.now ? "is-now" : undefined}>
                <i aria-hidden="true" />
                <span>{v.label}</span>
                <small>{v.when}</small>
              </li>
            ))}
          </ol>
        </div>
      );

    case "redline":
      /* change control: the revision itself, one line struck and one
       * inserted, the approvers it still waits on */
      return (
        <div className="sk-wv__card sk-vz-rl">
          <header className="sk-wv__head">
            <span className="sk-wv__kicker">{viz.doc}</span>
            <span className="sk-vz-rl__rev"><s>{viz.from}</s><i aria-hidden="true">&rarr;</i><b>{viz.to}</b></span>
          </header>
          <ol className="sk-vz-rl__lines">
            {viz.lines.map((l) => (
              <li key={l.text} className={l.mark ? "is-" + l.mark : undefined}>{l.text}</li>
            ))}
          </ol>
          <ul className="sk-vz-rl__who">
            {viz.approvers.map((a) => (
              <li key={a.name} className={a.done ? "is-done" : undefined}>{a.done ? <Done /> : <Open />}{a.name}</li>
            ))}
          </ul>
        </div>
      );

    case "bom":
      /* the bill of materials, the revised line bumped */
      return (
        <div className="sk-wv__card sk-vz-bm">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <p className="sk-wv__title">{viz.title}</p>
          <ul>
            {viz.rows.map((r) => (
              <li key={r.part} className={(r.next ? "is-next " : "") + "d" + r.depth}>
                <code>{r.part}</code>
                <span>{r.name}</span>
                <small>{r.next ? <><s>{r.rev}</s> {r.next}</> : r.rev}</small>
              </li>
            ))}
          </ul>
          <p className="sk-vz-bm__foot">{viz.foot}</p>
        </div>
      );

    case "watermark":
      /* document & records: the controlled page, its state across it */
      return (
        <div className="sk-wv__card sk-vz-wm">
          <div className="sk-vz-wm__page">
            <header><code>{viz.doc}</code><b>{viz.version}</b></header>
            <p>{viz.title}</p>
            <i /><i /><i className="is-short" /><i /><i className="is-short" />
            <span className="sk-vz-wm__mark" aria-hidden="true">{viz.mark}</span>
          </div>
          <dl className="sk-vz-wm__meta">
            {viz.meta.map((m) => (
              <div key={m.k}><dt>{m.k}</dt><dd>{m.v}</dd></div>
            ))}
          </dl>
        </div>
      );

    case "artwork":
      /* an artwork proof, markup pins over it, one language open */
      return (
        <div className="sk-wv__card sk-vz-aw">
          <header className="sk-wv__head">
            <span className="sk-wv__kicker">{viz.file}</span>
            <span className="sk-vz-aw__langs">
              {viz.langs.map((l, i) => <i key={l} className={i === viz.lang ? "is-on" : undefined}>{l}</i>)}
            </span>
          </header>
          <div className="sk-vz-aw__proof" aria-hidden="true">
            <span className="sk-vz-aw__logo" />
            <b /><i /><i className="is-short" />
            <span className="sk-vz-aw__bars">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ width: [1, 2, 1, 3, 1, 1, 2][i % 7] }} />)}</span>
            {viz.pins.map((p, i) => <em key={p.n} className={p.open ? "is-open" : undefined} style={{ top: `${[18, 44, 70][i % 3]}%`, left: `${[72, 30, 60][i % 3]}%` }}>{p.n}</em>)}
          </div>
          <ul className="sk-vz-aw__notes">
            {viz.pins.map((p) => <li key={p.n} className={p.open ? "is-open" : undefined}><em>{p.n}</em>{p.note}</li>)}
          </ul>
        </div>
      );

    case "access":
      /* the periodic access review, one account to revoke */
      return (
        <div className="sk-wv__card sk-vz-ac">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span><span className="sk-vz-ac__sys">{viz.system}</span></header>
          <ul>
            {viz.users.map((u) => (
              <li key={u.name} className={u.flag ? "is-flag" : undefined}>
                <span className="sk-vz-ac__av" aria-hidden="true">{u.name.split(/[\s.]+/).filter(Boolean).map((x) => x[0]).join("").slice(0, 2)}</span>
                <span className="sk-vz-ac__who"><b>{u.name}</b><small>{u.flag ?? u.role}</small></span>
                <span className="sk-vz-ac__act">{u.flag ? "Revoke" : "Keep"}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "delta":
      /* training: the revision's sections, only the changed ones retrained */
      return (
        <div className="sk-wv__card sk-vz-dl">
          <header className="sk-wv__head">
            <span className="sk-wv__kicker">{viz.doc}</span>
            <span className="sk-vz-rl__rev"><s>{viz.from}</s><i aria-hidden="true">&rarr;</i><b>{viz.to}</b></span>
          </header>
          <ol>
            {viz.sections.map((sec) => (
              <li key={sec.name} className={sec.changed ? "is-changed" : undefined}>
                <span>{sec.name}</span>
                <small>{sec.changed ? "Changed" : "Unchanged"}</small>
              </li>
            ))}
          </ol>
          <p className="sk-vz-dl__choice"><span className="sk-vz-dl__radio" aria-hidden="true" />{viz.choice}</p>
        </div>
      );

    case "onboard":
      /* a new hire's ramp, planned by week instead of by shadowing */
      return (
        <div className="sk-wv__card sk-vz-ob">
          <header className="sk-vz-ob__head">
            <span className="sk-vz-ac__av" aria-hidden="true">{viz.name.split(/[\s.]+/).filter(Boolean).map((x) => x[0]).join("").slice(0, 2)}</span>
            <span><b>{viz.name}</b><small>{viz.role}</small></span>
          </header>
          <ol>
            {viz.weeks.map((w) => (
              <li key={w.wk} className={"is-" + w.state}>
                <code>{w.wk}</code>
                <span>{w.step}</span>
                {w.state === "done" ? <Done /> : w.state === "now" ? <Open /> : <i aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
      );

    case "levels":
      /* one person's qualification, level by competency */
      return (
        <div className="sk-wv__card sk-vz-lv">
          <header className="sk-vz-ob__head">
            <span className="sk-vz-ac__av" aria-hidden="true">{viz.name.split(/[\s.]+/).filter(Boolean).map((x) => x[0]).join("").slice(0, 2)}</span>
            <span><b>{viz.name}</b><small>{viz.role}</small></span>
          </header>
          <ul>
            {viz.skills.map((sk) => (
              <li key={sk.name} className={sk.pending ? "is-pending" : undefined}>
                <span className="sk-vz-lv__name">{sk.name}{sk.pending ? <small>{sk.pending}</small> : null}</span>
                <span className="sk-vz-lv__pips" aria-hidden="true">{[1, 2, 3, 4].map((n) => <i key={n} className={n <= sk.level ? "is-on" : undefined} />)}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "mrb":
      /* operations: the review board's columns, one lot aging */
      return (
        <div className="sk-wv__card sk-vz-mb">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <div className="sk-vz-mb__cols" style={{ "--mb-n": viz.cols.length } as CSSProperties}>
            {viz.cols.map((c) => (
              <div key={c.name} className="sk-vz-mb__col">
                <small>{c.name}</small>
                {c.lots.map((l) => (
                  <span key={l.id} className={"sk-vz-mb__lot" + (l.aging ? " is-aging" : "")}><b>{l.id}</b>{l.note}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      );

    case "route":
      /* the traveller as its route, the current operation open */
      return (
        <div className="sk-wv__card sk-vz-rt">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <p className="sk-wv__title">{viz.title}</p>
          <ol className="sk-vz-rt__ops">
            {viz.ops.map((o) => (
              <li key={o.op} className={"is-" + o.state}><code>{o.op}</code><span>{o.name}</span></li>
            ))}
          </ol>
          <label className="sk-vz-rt__entry"><small>{viz.entry.label}</small><span>{viz.entry.value}<i aria-hidden="true" /></span></label>
        </div>
      );

    case "instrument":
      /* one gauge in its tolerance band, calibration due */
      return (
        <div className="sk-wv__card sk-vz-in">
          <header className="sk-vz-in__head"><code>{viz.id}</code><b>{viz.name}</b></header>
          <div className="sk-vz-in__band" aria-hidden="true">
            <span className="sk-vz-in__ok" />
            <i style={{ left: `${viz.at}%` }} />
          </div>
          <div className="sk-vz-in__scale"><span>{viz.low}</span><span>{viz.high}</span></div>
          <p className="sk-vz-in__due"><Open /><span>{viz.due}</span><small>{viz.owner}</small></p>
        </div>
      );

    case "promise":
      /* customer orders, promised against projected */
      return (
        <div className="sk-wv__card sk-vz-pr">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <table>
            <thead><tr><th>Order</th><th>Promised</th><th>Projected</th><th /></tr></thead>
            <tbody>
              {viz.orders.map((o) => (
                <tr key={o.id} className={"is-" + o.state}>
                  <td>{o.id}</td><td>{o.promised}</td><td>{o.projected}</td>
                  <td><em>{o.state === "ok" ? "On track" : o.state === "risk" ? "At risk" : "Recommitted"}</em></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "coverage":
      /* supply chain: one part's weeks, supply against demand */
      return (
        <div className="sk-wv__card sk-vz-cv">
          <header className="sk-vz-in__head"><code>{viz.part}</code><b>{viz.name}</b></header>
          <table>
            <thead><tr><th />{viz.weeks.map((w) => <th key={w.wk}>{w.wk}</th>)}</tr></thead>
            <tbody>
              <tr><th>Demand</th>{viz.weeks.map((w) => <td key={w.wk}>{w.demand}</td>)}</tr>
              <tr><th>Supply</th>{viz.weeks.map((w) => <td key={w.wk}>{w.supply}</td>)}</tr>
              <tr className="sk-vz-cv__net">
                <th>Net</th>
                {viz.weeks.map((w) => {
                  const net = w.supply - w.demand;
                  return <td key={w.wk} className={net < 0 ? "is-short" : undefined}>{net > 0 ? `+${net}` : net}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      );

    case "po":
      /* a PO revision, its terms changed, two approvals in parallel */
      return (
        <div className="sk-wv__card sk-vz-po">
          <header className="sk-wv__head">
            <span className="sk-wv__kicker">{viz.po} · {viz.supplier}</span>
            <span className="sk-vz-po__rev">{viz.rev}</span>
          </header>
          <ul className="sk-vz-po__chg">
            {viz.changes.map((c) => (
              <li key={c.field}><small>{c.field}</small><s>{c.from}</s><i aria-hidden="true">&rarr;</i><b>{c.to}</b></li>
            ))}
          </ul>
          <div className="sk-vz-po__lanes">
            {viz.lanes.map((l) => <span key={l.name} className={l.done ? "is-done" : undefined}>{l.done ? <Done /> : <Open />}{l.name}</span>)}
          </div>
        </div>
      );

    case "ltb":
      /* the last-time buy, worked to the end of support */
      return (
        <div className="sk-wv__card sk-vz-lt">
          <header className="sk-vz-in__head"><code>{viz.part}</code><b>{viz.name}</b></header>
          <dl>
            {viz.rows.map((r) => (
              <div key={r.k} className={r.total ? "is-total" : undefined}><dt>{r.k}</dt><dd>{r.v}</dd></div>
            ))}
          </dl>
          <p className="sk-vz-lt__by"><Open /><span>{viz.by}</span></p>
        </div>
      );

    case "bids":
      /* procurement: suppliers side by side, the award on total cost */
      return (
        <div className="sk-wv__card sk-vz-bd">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.kicker}</span></header>
          <table>
            <thead><tr><th />{viz.suppliers.map((sp) => <th key={sp.name} className={sp.pick ? "is-pick" : undefined}>{sp.name}</th>)}</tr></thead>
            <tbody>
              {viz.rows.map((r, ri) => (
                <tr key={r}>
                  <th>{r}</th>
                  {viz.suppliers.map((sp) => (
                    <td key={sp.name} className={(sp.pick ? "is-pick " : "") + (sp.flag === ri ? "is-flag" : "")}>{sp.cells[ri]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "fai":
      /* a first article check sheet, balloons against the drawing */
      return (
        <div className="sk-wv__card sk-vz-fa">
          <header className="sk-wv__head"><span className="sk-wv__kicker">FAI · {viz.part}</span><span className="sk-vz-fa__dwg">{viz.drawing}</span></header>
          <ol>
            {viz.rows.map((r) => (
              <li key={r.n} className={r.ok ? undefined : "is-fail"}>
                <em>{r.n}</em>
                <span>{r.char}</span>
                <code>{r.nominal}</code>
                <code>{r.actual}</code>
                {r.ok ? <Done /> : <Gap />}
              </li>
            ))}
          </ol>
        </div>
      );

    case "gate":
      /* the PO release gate: the supplier's standing, checked */
      return (
        <div className="sk-wv__card sk-vz-gt">
          <header className="sk-wv__head"><span className="sk-wv__kicker">{viz.po} · {viz.supplier}</span></header>
          <ul>
            {viz.checks.map((c) => (
              <li key={c.label} className={c.ok ? undefined : "is-gap"}>{c.ok ? <Done /> : <Gap />}<span>{c.label}</span><small>{c.note}</small></li>
            ))}
          </ul>
          <p className="sk-vz-gt__verdict">{viz.verdict}</p>
        </div>
      );

    case "eol":
      /* a component's life as stages, the buy window it is in */
      return (
        <div className="sk-wv__card sk-vz-eo">
          <header className="sk-vz-eo__head">
            <code>{viz.part}</code>
            <b>{viz.name}</b>
          </header>
          <ol className="sk-vz-eo__stages" style={{ "--eo-n": viz.stages.length } as CSSProperties}>
            {viz.stages.map((st, i) => (
              <li key={st} className={i < viz.at ? "is-past" : i === viz.at ? "is-now" : undefined}>{st}</li>
            ))}
          </ol>
          <p className="sk-vz-eo__note">{viz.note}</p>
          <p className="sk-vz-eo__alt"><Done /><span>{viz.alt.name}</span><small>{viz.alt.state}</small></p>
        </div>
      );

    default:
      return (
        <div className="sk-wv__card">
          <header className="sk-wv__head">
            <span className="sk-wv__kicker">{viz.kicker}</span>
            <span className="sk-wv__state">{viz.state}</span>
          </header>
          <p className="sk-wv__title">{viz.title}</p>
          <ul className="sk-wv__steps">
            {viz.rows.map((row) => (
              <li key={row.label} className={row.open ? "is-target" : undefined}>
                {row.open ? <Open /> : <Done />}
                <span>{row.label}</span>
                <small>{row.meta}</small>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export function WorkArtifact({ viz }: { viz: WorkViz }) {
  return (
    <div className={"sk-wv sk-wv--" + (viz.kind ?? "record")}>
      <Surface viz={viz} />
      <Cursor cursor={viz.cursor} />
    </div>
  );
}
