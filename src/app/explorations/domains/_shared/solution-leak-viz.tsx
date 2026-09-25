/* ----------------------------------------------------------------------------
 * solution-leak-viz.tsx - 02 · the leak on the sibling Solutions pages
 * (23 Sep 2026). Quality stages its old world as an inbox (LeakInbox in
 * SolutionPage); each sibling gets a different widget of the same family,
 * so no two pages stage the leak the same way:
 *
 *   files     compliance: the validation folder, untouched since the audit
 *   citation  regulatory affairs: the filed submission citing a revision
 *             the register has already moved past
 *   sheet     supplier management: the SCAR tracker, gone quiet
 *   chat      post-market: the recall argued in a channel
 *   invite    new product development: the design review invite,
 *             rescheduled again, the deck on v7 (24 Sep 2026)
 *   manual    customer management: the customer's requirements manual,
 *             acknowledged, never flowed down (24 Sep 2026)
 *   slide     procurement: the award deck, unit price on it, the cost of
 *             quality not (24 Sep 2026)
 *   minutes   supply chain: the stand-up notes where the allocation was
 *             decided (24 Sep 2026)
 *   call      operations: the escalation call where the hold was released,
 *             nobody taking notes (24 Sep 2026)
 *   signin    training: the classroom sign-in sheet, signed, never typed
 *             into the matrix (24 Sep 2026)
 *   copies    document & records: one procedure, three places, three
 *             versions, the operator on the oldest (24 Sep 2026)
 *   printout  change control: the work instruction at the station, still
 *             on the revision the change retired (24 Sep 2026)
 *
 * Same frame as the inbox (sk-ib: the paper wash, one window, the dark
 * interruption landing over its corner, one caption), a different window
 * inside it (sk-ow-*, solution-viz.css). Server module.
 * -------------------------------------------------------------------------- */
import type { CSSProperties } from "react";
import type { LeakScene } from "./types";

const FILE_ICONS: Record<"pdf" | "doc" | "sheet" | "folder", string> = {
  folder: "M1.5 3.5h4l1.2 1.3h7.8v8.7h-13z",
  pdf: "M3 1.5h6.5L13 5v9.5H3zM9.5 1.5V5H13",
  doc: "M3 1.5h6.5L13 5v9.5H3zM9.5 1.5V5H13M5.5 8h5M5.5 10.5h5",
  sheet: "M2.5 2.5h11v11h-11zM2.5 6.2h11M2.5 9.8h11M6.2 2.5v11",
};

function Files({ box }: { box: NonNullable<LeakScene["files"]> }) {
  return (
    <div className="sk-ib__win sk-ow-fl">
      <div className="sk-ow-fl__bar">
        <span className="sk-ow__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="sk-ow-fl__path">
          {box.path.map((p, i) => (
            <span key={p}>{i > 0 ? <i aria-hidden="true">/</i> : null}{p}</span>
          ))}
        </span>
      </div>
      <div className="sk-ow-fl__cols"><span>Name</span><span>Modified</span></div>
      <ul className="sk-ow-fl__rows">
        {box.rows.map((r) => (
          <li key={r.name} className={r.warn ? "is-warn" : undefined}>
            <svg viewBox="0 0 16 16" className={"is-" + r.kind}><path d={FILE_ICONS[r.kind]} /></svg>
            <span className="sk-ow-fl__name">{r.name}</span>
            <span className="sk-ow-fl__meta">{r.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Citation({ doc }: { doc: NonNullable<LeakScene["citation"]> }) {
  return (
    <div className="sk-ow-ct">
      <div className="sk-ib__win sk-ow-ct__page">
        <div className="sk-ib__bar">
          <span className="sk-ib__kicker">{doc.doc}</span>
          <span className="sk-ib__meta">Filed</span>
        </div>
        <div className="sk-ow-ct__body">
          <b>{doc.section}</b>
          {Array.from({ length: doc.lines }, (_, i) => <i key={i} style={{ width: `${[96, 88, 92, 70][i % 4]}%` }} />)}
          <p>
            {doc.before} <mark>{doc.cited}</mark> {doc.after}
          </p>
          <i style={{ width: "90%" }} /><i style={{ width: "58%" }} />
        </div>
      </div>
      <div className="sk-ow-ct__note" aria-hidden="true">
        <small>{doc.register.label}</small>
        <b>{doc.register.value}</b>
      </div>
    </div>
  );
}

function Sheet({ box }: { box: NonNullable<LeakScene["sheet"]> }) {
  const n = box.cols.length;
  return (
    <div className="sk-ib__win sk-ow-sh" style={{ "--cols": n } as CSSProperties}>
      <div className="sk-ib__bar">
        <span className="sk-ow-sh__file">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d={FILE_ICONS.sheet} /></svg>
          {box.file}
        </span>
        <span className="sk-ib__meta">{box.meta}</span>
      </div>
      <div className="sk-ow-sh__fx"><span>fx</span>{box.active}</div>
      <div className="sk-ow-sh__grid" role="presentation">
        <span className="sk-ow-sh__corner" />
        {box.cols.map((c, i) => <span key={c} className="sk-ow-sh__colh">{String.fromCharCode(65 + i)}</span>)}
        <span className="sk-ow-sh__rowh">1</span>
        {box.cols.map((c) => <span key={c} className="sk-ow-sh__th">{c}</span>)}
        {box.rows.map((r, ri) => (
          <RowCells key={ri} n={ri + 2} cells={r.cells} warn={r.warn} />
        ))}
      </div>
    </div>
  );
}

function RowCells({ n, cells, warn }: { n: number; cells: string[]; warn?: number }) {
  return (
    <>
      <span className="sk-ow-sh__rowh">{n}</span>
      {cells.map((c, i) => (
        <span key={i} className={"sk-ow-sh__td" + (warn === i ? " is-warn" : "")}>{c}</span>
      ))}
    </>
  );
}

function Chat({ box }: { box: NonNullable<LeakScene["chat"]> }) {
  return (
    <div className="sk-ib__win sk-ow-ch">
      <div className="sk-ib__bar">
        <span className="sk-ow-ch__chan"><i aria-hidden="true">#</i>{box.channel}</span>
        <span className="sk-ib__meta">{box.meta}</span>
      </div>
      <ul className="sk-ow-ch__msgs">
        {box.messages.map((m) => (
          <li key={m.text}>
            <span className="sk-ow-ch__av" style={{ background: m.tone }}>{m.initials}</span>
            <span className="sk-ow-ch__body">
              <span className="sk-ow-ch__who"><b>{m.who}</b><time>{m.time}</time></span>
              <span>{m.text}</span>
              {m.file ? (
                <span className="sk-ow-ch__file">
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d={FILE_ICONS.sheet} /></svg>
                  {m.file}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Printout({ doc }: { doc: NonNullable<LeakScene["printout"]> }) {
  return (
    <div className="sk-ib__win sk-ow-pr">
      <div className="sk-ow-pr__tb">
        <span><small>Document</small><b>{doc.doc}</b></span>
        <span className="is-rev"><small>Rev</small><b>{doc.rev}</b></span>
        <span><small>Effective</small><b>{doc.effective}</b></span>
        <span><small>Station</small><b>{doc.station}</b></span>
      </div>
      <p className="sk-ow-pr__title">{doc.title}</p>
      <ol className="sk-ow-pr__steps">
        {doc.steps.map((st, i) => (
          <li key={st} className={i === doc.changed ? "is-changed" : undefined}>{st}</li>
        ))}
      </ol>
      <span className="sk-ow-pr__stamp">Controlled copy</span>
    </div>
  );
}

function Invite({ inv }: { inv: NonNullable<LeakScene["invite"]> }) {
  return (
    <div className="sk-ib__win sk-ow-iv">
      <div className="sk-ow-iv__head">
        <span className="sk-ow-iv__cal" aria-hidden="true"><i /></span>
        <span><b>{inv.title}</b><small>{inv.when}</small></span>
      </div>
      <p className="sk-ow-iv__note">{inv.note}</p>
      <div className="sk-ow-iv__people">
        {inv.people.map((p) => <i key={p}>{p}</i>)}
        <em>{inv.more}</em>
      </div>
      <ul className="sk-ow-iv__files">
        {inv.files.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </div>
  );
}

function Manual({ doc }: { doc: NonNullable<LeakScene["manual"]> }) {
  return (
    <div className="sk-ib__win sk-ow-mu">
      <div className="sk-ow-mu__cover">
        <small>{doc.customer}</small>
        <b>{doc.title}</b>
        <span>{doc.rev}</span>
        <em className="sk-ow-mu__stamp" aria-hidden="true">{doc.stamp}</em>
      </div>
      <ol className="sk-ow-mu__toc">
        {doc.toc.map((t) => (
          <li key={t.n} className={t.hot ? "is-hot" : undefined}><code>{t.n}</code><span>{t.name}</span></li>
        ))}
      </ol>
    </div>
  );
}

function Slide({ slide }: { slide: NonNullable<LeakScene["slide"]> }) {
  const max = Math.max(...slide.bars.map((b) => b.value), 1);
  return (
    <div className="sk-ib__win sk-ow-sl">
      <div className="sk-ow-sl__bar"><span>{slide.deck}</span><span>{slide.page}</span></div>
      <div className="sk-ow-sl__body">
        <b>{slide.title}</b>
        <div className="sk-ow-sl__chart">
          {slide.bars.map((bar) => (
            <span key={bar.name} className={bar.pick ? "is-pick" : undefined}>
              <small>{bar.label}</small>
              <i style={{ height: `${(bar.value / max) * 100}%` }} />
              <em>{bar.name}</em>
            </span>
          ))}
        </div>
        <p className="sk-ow-sl__call">{slide.callout}</p>
      </div>
    </div>
  );
}

function Minutes({ doc }: { doc: NonNullable<LeakScene["minutes"]> }) {
  return (
    <div className="sk-ib__win sk-ow-mn">
      <div className="sk-ow-mn__head">
        <b>{doc.title}</b>
        <small>{doc.date} · {doc.attendees}</small>
      </div>
      <ul className="sk-ow-mn__list">
        {doc.bullets.map((b) => (
          <li key={b.text} className={(b.faint ? "is-faint " : "") + (b.mark ? "is-mark" : "")}>{b.text}</li>
        ))}
      </ul>
    </div>
  );
}

function Call({ call }: { call: NonNullable<LeakScene["call"]> }) {
  return (
    <div className="sk-ib__win sk-ow-cl">
      <div className="sk-ow-cl__bar"><b>{call.title}</b><time>{call.time}</time></div>
      <div className="sk-ow-cl__grid">
        {call.people.map((p) => (
          <span key={p.name} className={"sk-ow-cl__tile" + (p.speaking ? " is-speaking" : "")}>
            <i style={{ background: p.tone }}>{p.initials}</i>
            <small>{p.name}</small>
          </span>
        ))}
      </div>
      <div className="sk-ow-cl__foot">
        <span className="sk-ow-cl__rec"><i aria-hidden="true" />Not recording</span>
        <span>{call.notes}</span>
      </div>
    </div>
  );
}

/* a pen scribble per signature, varied by row */
const SCRIBBLES = [
  "M2 14c6-9 9-9 8 0s5-8 9-4 4 6 9-2 6 1 10 2",
  "M2 12c4-6 7 4 11-3s6 7 10 0 5-2 8 3 5-6 9-1",
  "M2 13c3-8 9-1 12-6s2 9 8 3 7-5 10 0 3 2 8-2",
];

function SignIn({ sheet }: { sheet: NonNullable<LeakScene["signin"]> }) {
  return (
    <div className="sk-ib__win sk-ow-si">
      <header className="sk-ow-si__head">
        <b>{sheet.title}</b>
        <span><small>Procedure</small>{sheet.doc}</span>
        <span><small>Session</small>{sheet.date}</span>
      </header>
      <div className="sk-ow-si__cols"><span>Name</span><span>Signature</span></div>
      <ol className="sk-ow-si__rows">
        {sheet.rows.map((r, i) => (
          <li key={r.name} className={r.signed ? undefined : "is-blank"}>
            <span>{r.name}</span>
            {r.signed ? (
              <svg viewBox="0 0 50 20" aria-hidden="true"><path d={SCRIBBLES[i % SCRIBBLES.length]} /></svg>
            ) : <i aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="sk-ow-si__foot">{sheet.foot}</p>
    </div>
  );
}

function Copies({ box }: { box: NonNullable<LeakScene["copies"]> }) {
  return (
    <div className="sk-ow-cp">
      {box.items.map((c, i) => (
        <div key={c.where} className={"sk-ib__win sk-ow-cp__sheet is-" + c.state} style={{ "--i": i } as CSSProperties}>
          <div className="sk-ow-cp__bar"><span>{c.where}</span><b>{c.version}</b></div>
          <div className="sk-ow-cp__body">
            <small>{box.doc}</small>
            <i /><i className="is-short" /><i />
          </div>
          <p className="sk-ow-cp__note">{c.note}</p>
        </div>
      ))}
    </div>
  );
}

export function hasOldWorld(scene?: LeakScene) {
  return Boolean(scene && (scene.files || scene.citation || scene.sheet || scene.chat || scene.printout || scene.copies || scene.signin || scene.call || scene.minutes || scene.slide || scene.manual || scene.invite));
}

export function LeakOldWorld({ scene }: { scene: LeakScene }) {
  const kind = scene.files ? "files" : scene.citation ? "citation" : scene.sheet ? "sheet" : scene.printout ? "printout" : scene.copies ? "copies" : scene.signin ? "signin" : scene.call ? "call" : scene.minutes ? "minutes" : scene.slide ? "slide" : scene.manual ? "manual" : scene.invite ? "invite" : "chat";
  return (
    <figure className={"sk-ib sk-ow sk-ow--" + kind} aria-label={`${scene.title}. ${scene.caption}`}>
      <div className="sk-ib__stage" aria-hidden="true">
        {scene.files ? <Files box={scene.files} /> : null}
        {scene.citation ? <Citation doc={scene.citation} /> : null}
        {scene.sheet ? <Sheet box={scene.sheet} /> : null}
        {scene.chat ? <Chat box={scene.chat} /> : null}
        {scene.printout ? <Printout doc={scene.printout} /> : null}
        {scene.copies ? <Copies box={scene.copies} /> : null}
        {scene.signin ? <SignIn sheet={scene.signin} /> : null}
        {scene.call ? <Call call={scene.call} /> : null}
        {scene.minutes ? <Minutes doc={scene.minutes} /> : null}
        {scene.slide ? <Slide slide={scene.slide} /> : null}
        {scene.manual ? <Manual doc={scene.manual} /> : null}
        {scene.invite ? <Invite inv={scene.invite} /> : null}
        {/* the citation brings its own interruption (the register's answer) */}
        {scene.float && !scene.citation ? (
          <div className="sk-ib__float">
            <span className="sk-ib__kicker">{scene.float.kicker}</span>
            <span>{scene.float.note}</span>
          </div>
        ) : null}
      </div>
      <figcaption className="sk-ib__cap">{scene.caption}</figcaption>
    </figure>
  );
}
