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

export function hasOldWorld(scene?: LeakScene) {
  return Boolean(scene && (scene.files || scene.citation || scene.sheet || scene.chat));
}

export function LeakOldWorld({ scene }: { scene: LeakScene }) {
  const kind = scene.files ? "files" : scene.citation ? "citation" : scene.sheet ? "sheet" : "chat";
  return (
    <figure className={"sk-ib sk-ow sk-ow--" + kind} aria-label={`${scene.title}. ${scene.caption}`}>
      <div className="sk-ib__stage" aria-hidden="true">
        {scene.files ? <Files box={scene.files} /> : null}
        {scene.citation ? <Citation doc={scene.citation} /> : null}
        {scene.sheet ? <Sheet box={scene.sheet} /> : null}
        {scene.chat ? <Chat box={scene.chat} /> : null}
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
