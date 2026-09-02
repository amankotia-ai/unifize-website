"use client";

/* ----------------------------------------------------------------------------
 * resources-interactive.tsx - the client layer for the Resources area,
 * following unifize.com's collection structure in the DMS design language:
 *
 *   VideoLibrary       - the /videos pattern: one "Filter by" bar over the
 *                        real customer-video grid.
 *   BlogLibrary        - topic dropdown + search over the post grid.
 *   CaseLibrary        - industry/module dropdowns + search over the case grid.
 *   CineMedia          - the item page's cinematic hero media + play state.
 *   TranscriptView     - the item page's collapsible timestamped transcript.
 *
 * Filtering runs through FilterMenu: a popover listbox whose rows carry live
 * result counts, so every option says what choosing it yields.
 * -------------------------------------------------------------------------- */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MODULES,
  INDUSTRIES,
  type ModuleTag,
  type Post,
  type BlogCategory,
  type CaseStudy,
} from "./resources-data";
import { VIDEO_INDUSTRIES, VIDEO_PERSONAS, type CustomerVideo } from "./customer-videos";
import type { TranscriptCue } from "./video-transcripts";
import { VideoCard, PostCard, CaseCard, PlayGlyph, initialsOf } from "./resource-cards";

const pad = (n: number) => String(n).padStart(2, "0");
type Industry = (typeof INDUSTRIES)[number];

/* ------------------------------------------------------------ primitives */
function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="rs-search">
      <svg className="rs-search__ic" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <circle cx="9" cy="9" r="6" /><path strokeLinecap="round" d="m14 14 3.5 3.5" />
      </svg>
      <input type="search" className="rs-search__input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} aria-label={placeholder} />
    </label>
  );
}

function FilterLabel({ children }: { children: React.ReactNode }) {
  return <span className="rs-filterlab">{children}</span>;
}

/* --------------------------------------------------------- filter dropdown
 * One popover listbox per filter group. The trigger is a pill in the search
 * box's grammar that names the group and its current value; the panel lists
 * "All" plus every option with a live count of what choosing it yields.
 * Escape / outside click / blur close it; arrows, Home, and End move focus. */
function FilterMenu({ label, allLabel, value, options, counts, onChange }: {
  label: string;
  allLabel: string;
  value: string;
  options: readonly string[];
  counts: ReadonlyMap<string, number>;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const filtered = value !== "All";

  /* keep the panel inside the viewport: pull it left by however much its
   * default trigger-aligned position would spill past the right edge */
  useEffect(() => {
    if (!open) { setShift(0); return; }
    const p = panelRef.current;
    if (!p) return;
    const vw = document.documentElement.clientWidth;
    const r = p.getBoundingClientRect();
    const over = r.right - (vw - 12);
    if (over > 0) setShift(-Math.min(over, Math.max(0, r.left - 12)));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = panelRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]') ?? panelRef.current?.querySelector<HTMLButtonElement>(".rs-fmenu__opt");
    el?.focus();
  }, [open]);

  const moveFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const items = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>(".rs-fmenu__opt") ?? []);
    if (!items.length) return;
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next =
      e.key === "Home" ? 0 :
      e.key === "End" ? items.length - 1 :
      e.key === "ArrowDown" ? Math.min(items.length - 1, i + 1) : Math.max(0, i - 1);
    items[next]?.focus();
  };

  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
    btnRef.current?.focus();
  };

  const row = (v: string, name: string) => {
    const active = value === v;
    const n = counts.get(v) ?? 0;
    return (
      <button
        type="button"
        key={v}
        role="option"
        aria-selected={active}
        className={"rs-fmenu__opt" + (active ? " is-active" : "") + (n === 0 && !active ? " is-empty" : "")}
        onClick={() => pick(v)}
      >
        <span className="rs-fmenu__tick" aria-hidden="true">
          {active ? (
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m2.5 7.5 3 3 6-7" /></svg>
          ) : null}
        </span>
        <span className="rs-fmenu__optname">{name}</span>
        <span className="rs-fmenu__count">{pad(n)}</span>
      </button>
    );
  };

  return (
    <div
      className="rs-fmenu"
      ref={rootRef}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <button
        type="button"
        ref={btnRef}
        className={"rs-fmenu__btn" + (filtered ? " is-filtered" : "") + (open ? " is-open" : "")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => { if (e.key === "ArrowDown" && !open) { e.preventDefault(); setOpen(true); } }}
      >
        <span className="rs-fmenu__lab">{label}</span>
        <span className="rs-fmenu__val">{filtered ? value : "All"}</span>
        <svg className="rs-fmenu__chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" /></svg>
      </button>
      {open ? (
        <div className="rs-fmenu__panel" style={shift ? { marginLeft: shift } : undefined} role="listbox" aria-label={label} ref={panelRef} onKeyDown={moveFocus}>
          {row("All", allLabel)}
          <span className="rs-fmenu__rule" aria-hidden="true" />
          {options.map((o) => row(o, o))}
        </div>
      ) : null}
    </div>
  );
}

/* ============================================================ video library
 * One "Filter by" toolbar over the real customer-video grid: industry and
 * role dropdowns, and search. */
const videoHay = (v: CustomerVideo) =>
  [v.company, v.person, v.role, v.name, v.description, v.industry, v.modules.join(" ")].filter(Boolean).join(" ").toLowerCase();

function tally(all: number, entries: Iterable<string | undefined>) {
  const m = new Map<string, number>([["All", all]]);
  for (const k of entries) if (k) m.set(k, (m.get(k) ?? 0) + 1);
  return m;
}

export function VideoLibrary({ videos }: { videos: CustomerVideo[] }) {
  const [q, setQ] = useState("");
  const [ind, setInd] = useState<string>("All");
  const [who, setWho] = useState<string>("All");
  const s = q.trim().toLowerCase();

  const list = useMemo(() =>
    videos.filter((v) =>
      (ind === "All" || v.industry === ind) &&
      (who === "All" || v.persona === who) &&
      (!s || videoHay(v).includes(s))),
  [videos, s, ind, who]);

  /* each menu's counts honor the other menu + search, so every row states
   * exactly what choosing it yields */
  const byInd = useMemo(() => {
    const base = videos.filter((v) => (who === "All" || v.persona === who) && (!s || videoHay(v).includes(s)));
    return tally(base.length, base.map((v) => v.industry));
  }, [videos, who, s]);
  const byWho = useMemo(() => {
    const base = videos.filter((v) => (ind === "All" || v.industry === ind) && (!s || videoHay(v).includes(s)));
    return tally(base.length, base.map((v) => v.persona));
  }, [videos, ind, s]);

  const filtered = ind !== "All" || who !== "All" || q.trim() !== "";

  return (
    <>
      <div className="rs-toolbar">
        <div className="dms-wrap rs-toolbar__inner">
          <div className="rs-toolbar__filters">
            <FilterLabel>Filter by</FilterLabel>
            <FilterMenu label="Industry" allLabel="All industries" value={ind} options={VIDEO_INDUSTRIES} counts={byInd} onChange={setInd} />
            <FilterMenu label="Role" allLabel="All roles" value={who} options={VIDEO_PERSONAS} counts={byWho} onChange={setWho} />
          </div>
          <div className="rs-toolbar__right">
            {filtered ? (
              <button type="button" className="rs-reset" onClick={() => { setInd("All"); setWho("All"); setQ(""); }}>Reset</button>
            ) : null}
            <SearchBox value={q} onChange={setQ} placeholder="Search videos" />
            <span className="rs-toolbar__count" aria-live="polite">{pad(list.length)}</span>
          </div>
        </div>
      </div>

      <div className="dms-wrap rs-libbody">
        {list.length ? (
          <div className="rs-grid rs-grid--3">{list.map((v) => <VideoCard key={v.slug} v={v} />)}</div>
        ) : <p className="rs-empty">No videos match. Clear the filters or try another search.</p>}
      </div>
    </>
  );
}

/* ============================================================ blog library */
const postHay = (p: Post) => [p.title, p.dek, p.category, p.author.name].join(" ").toLowerCase();

export function BlogLibrary({ posts, categories }: { posts: Post[]; categories: readonly BlogCategory[] }) {
  const [cat, setCat] = useState<BlogCategory | "All">("All");
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();

  const list = useMemo(() =>
    posts.filter((p) => (cat === "All" || p.category === cat) && (!s || postHay(p).includes(s))),
  [posts, cat, s]);

  const byCat = useMemo(() => {
    const base = posts.filter((p) => !s || postHay(p).includes(s));
    return tally(base.length, base.map((p) => p.category));
  }, [posts, s]);

  const filtered = cat !== "All" || q.trim() !== "";

  return (
    <>
      <div className="rs-toolbar">
        <div className="dms-wrap rs-toolbar__inner">
          <div className="rs-toolbar__filters">
            <FilterLabel>Filter by</FilterLabel>
            <FilterMenu label="Topic" allLabel="All topics" value={cat} options={categories} counts={byCat} onChange={(v) => setCat(v as BlogCategory | "All")} />
          </div>
          <div className="rs-toolbar__right">
            {filtered ? (
              <button type="button" className="rs-reset" onClick={() => { setCat("All"); setQ(""); }}>Reset</button>
            ) : null}
            <SearchBox value={q} onChange={setQ} placeholder="Search the blog" />
            <span className="rs-toolbar__count" aria-live="polite">{pad(list.length)}</span>
          </div>
        </div>
      </div>
      <div className="dms-wrap rs-libbody">
        {list.length ? (
          <div className="rs-grid rs-grid--3">{list.map((p) => <PostCard key={p.slug} p={p} />)}</div>
        ) : <p className="rs-empty">No posts match. Try another topic or search.</p>}
      </div>
    </>
  );
}

/* ============================================================ case library */
const caseHay = (c: CaseStudy) => [c.company, c.headline, c.summary, c.industry, c.modules.join(" ")].join(" ").toLowerCase();
const MODULE_KEYS = MODULES.map((m) => m.key);

export function CaseLibrary({ studies }: { studies: CaseStudy[] }) {
  const [ind, setInd] = useState<Industry | "All">("All");
  const [mod, setMod] = useState<ModuleTag | "All">("All");
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();

  const list = useMemo(() =>
    studies.filter((c) => (ind === "All" || c.industry === ind) && (mod === "All" || c.modules.includes(mod)) && (!s || caseHay(c).includes(s))),
  [studies, ind, mod, s]);

  const byInd = useMemo(() => {
    const base = studies.filter((c) => (mod === "All" || c.modules.includes(mod)) && (!s || caseHay(c).includes(s)));
    return tally(base.length, base.map((c) => c.industry));
  }, [studies, mod, s]);
  const byMod = useMemo(() => {
    const base = studies.filter((c) => (ind === "All" || c.industry === ind) && (!s || caseHay(c).includes(s)));
    const m = new Map<string, number>([["All", base.length]]);
    for (const c of base) for (const k of c.modules) m.set(k, (m.get(k) ?? 0) + 1);
    return m;
  }, [studies, ind, s]);

  const filtered = ind !== "All" || mod !== "All" || q.trim() !== "";

  return (
    <>
      <div className="rs-toolbar">
        <div className="dms-wrap rs-toolbar__inner">
          <div className="rs-toolbar__filters">
            <FilterLabel>Filter by</FilterLabel>
            <FilterMenu label="Industry" allLabel="All industries" value={ind} options={INDUSTRIES} counts={byInd} onChange={(v) => setInd(v as Industry | "All")} />
            <FilterMenu label="Module" allLabel="All modules" value={mod} options={MODULE_KEYS} counts={byMod} onChange={(v) => setMod(v as ModuleTag | "All")} />
          </div>
          <div className="rs-toolbar__right">
            {filtered ? (
              <button type="button" className="rs-reset" onClick={() => { setInd("All"); setMod("All"); setQ(""); }}>Reset</button>
            ) : null}
            <SearchBox value={q} onChange={setQ} placeholder="Search case studies" />
            <span className="rs-toolbar__count" aria-live="polite">{pad(list.length)}</span>
          </div>
        </div>
      </div>
      <div className="dms-wrap rs-libbody">
        {list.length ? (
          <div className="rs-grid rs-grid--3">{list.map((c) => <CaseCard key={c.slug} c={c} />)}</div>
        ) : <p className="rs-empty">No case studies match. Clear the filters or try another search.</p>}
      </div>
    </>
  );
}

/* ====================================================== cinematic hero media
 * The video item's hero layer: the real thumbnail as the full stage with a
 * centered play control; on play, the Wistia embed takes over the stage.
 * The server page lays the title block over it (hidden while playing via a
 * :has() rule); this component only owns the media and its play state. */
export function CineMedia({ v }: { v: CustomerVideo }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <div className="rs-cine__media is-playing">
        <iframe
          className="rs-cine__wistia"
          src={`https://fast.wistia.net/embed/iframe/${v.wistiaId}?autoPlay=true&playerColor=005BB7`}
          title={v.name}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="rs-cine__media">
      {v.thumb ? <img className="rs-cine__img rs-cine__img--center" src={v.thumb} alt="" /> : <span className="rs-cine__ghost" aria-hidden="true">{initialsOf(v.company ?? v.person)}</span>}
      <span className="rs-cine__scrim" aria-hidden="true" />
      <button type="button" className="rs-cine__play" onClick={() => setPlaying(true)} aria-label={`Play ${v.person}'s story`}>
        <PlayGlyph />
        <span className="rs-cine__runtime">{v.duration}</span>
      </button>
    </div>
  );
}

/* ========================================================= transcript view
 * The reading view for a video's timestamped transcript: a centered column
 * of time + passage rows, collapsed to a teaser with a fade until expanded.
 * Short transcripts render open with no toggle. */
export function TranscriptView({ cues, duration }: { cues: TranscriptCue[]; duration: string }) {
  const [open, setOpen] = useState(false);
  const collapsible = cues.length > 4;
  const expanded = open || !collapsible;
  return (
    <div className={"rs-transcript" + (expanded ? " is-open" : "")}>
      <div className="rs-transcript__head">
        <h2 className="rs-transcript__h">Transcript</h2>
        <span className="rs-transcript__meta">{cues.length} passages · {duration}</span>
      </div>
      <div className="rs-transcript__body">
        <ol className="rs-transcript__list">
          {cues.map((c, i) => (
            <li className="rs-transcript__cue" key={i}>
              <span className="rs-transcript__t">{c.t}</span>
              <p className="rs-transcript__text">{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
      {collapsible ? (
        <button type="button" className="dms-btn dms-btn-ghost dms-btn-sm rs-transcript__toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Collapse transcript" : "Read the full transcript"}
        </button>
      ) : null}
    </div>
  );
}
