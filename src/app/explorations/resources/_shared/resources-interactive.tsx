"use client";

/* ----------------------------------------------------------------------------
 * resources-interactive.tsx - the client layer for the Resources area,
 * following unifize.com's collection structure in the DMS design language:
 *
 *   QuoteCarousel      - the video hero's rotating featured customer quotes.
 *   TestimonialLibrary - the /videos pattern: one "Filter by" bar over a
 *                        uniform card grid.
 *   BlogLibrary        - category chips + search over the post grid.
 *   CaseLibrary        - industry/module chips + search over the case grid.
 *   VideoPlayer        - the item page's player.
 * -------------------------------------------------------------------------- */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  MODULES,
  INDUSTRIES,
  type Testimonial,
  type ModuleTag,
  type Post,
  type BlogCategory,
  type CaseStudy,
} from "./resources-data";
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

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className={"rs-chip" + (active ? " is-active" : "")} aria-pressed={active} onClick={onClick}>{children}</button>
  );
}

function FilterLabel({ children }: { children: React.ReactNode }) {
  return <span className="rs-filterlab">{children}</span>;
}

/* ===================================================== featured quote carousel
 * The live /videos hero: a rotating card of customer quotes beside the intro.
 * Auto-advances; pauses on hover; dots to jump. */
export function QuoteCarousel({ items }: { items: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const hover = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!hover.current) setIdx((i) => (i + 1) % items.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [items.length]);

  const t = items[idx];
  return (
    <div
      className="rs-qcar"
      onMouseEnter={() => { hover.current = true; }}
      onMouseLeave={() => { hover.current = false; }}
    >
      <Link key={t.slug} href={`/explorations/resources/testimonials/${t.slug}`} className="rs-qcard">
        <div className="rs-qcard__media">
          {t.poster
            ? <img className="rs-qcard__img" src={t.poster} alt="" />
            : <span className="rs-qcard__ghost" aria-hidden="true">{initialsOf(t.company)}</span>}
          <PlayGlyph className="rs-qcard__play" />
          <span className="rs-qcard__dur">{t.duration}</span>
        </div>
        <div className="rs-qcard__body">
          <blockquote className="rs-qcard__q">&ldquo;{t.quote}&rdquo;</blockquote>
          <div className="rs-qcard__who">
            <span className="rs-qcard__name">{t.person}</span>
            <span className="rs-qcard__role">{t.role}, {t.company}</span>
          </div>
        </div>
      </Link>
      <div className="rs-qcar__dots" role="tablist" aria-label="Featured stories">
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={`Story ${i + 1}: ${it.company}`}
            className={"rs-qcar__dot" + (i === idx ? " is-active" : "")}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================ video library
 * The live /videos pattern: one "Filter by" toolbar over a uniform grid. */
export function TestimonialLibrary({ testimonials }: { testimonials: Testimonial[] }) {
  const [q, setQ] = useState("");
  const [ind, setInd] = useState<Industry | "All">("All");
  const [mod, setMod] = useState<ModuleTag | "All">("All");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return testimonials.filter((t) =>
      (ind === "All" || t.industry === ind) &&
      (mod === "All" || t.modules.includes(mod)) &&
      (!s || [t.company, t.person, t.role, t.headline, t.quote, t.industry, t.modules.join(" ")].join(" ").toLowerCase().includes(s)));
  }, [testimonials, q, ind, mod]);

  const filtered = ind !== "All" || mod !== "All" || q.trim() !== "";

  return (
    <>
      <div className="rs-toolbar">
        <div className="dms-wrap rs-toolbar__inner">
          <div className="rs-toolbar__filters">
            <FilterLabel>Filter by</FilterLabel>
            <div className="rs-chips" aria-label="Industry">
              <Chip active={ind === "All"} onClick={() => setInd("All")}>All industries</Chip>
              {INDUSTRIES.map((i) => <Chip key={i} active={ind === i} onClick={() => setInd(i)}>{i}</Chip>)}
            </div>
            <span className="rs-toolbar__sep" aria-hidden="true" />
            <div className="rs-chips" aria-label="Module">
              {MODULES.map((m) => <Chip key={m.key} active={mod === m.key} onClick={() => setMod(mod === m.key ? "All" : m.key)}>{m.key}</Chip>)}
            </div>
          </div>
          <div className="rs-toolbar__right">
            {filtered ? (
              <button type="button" className="rs-reset" onClick={() => { setInd("All"); setMod("All"); setQ(""); }}>Reset</button>
            ) : null}
            <SearchBox value={q} onChange={setQ} placeholder="Search videos" />
            <span className="rs-toolbar__count" aria-live="polite">{pad(list.length)}</span>
          </div>
        </div>
      </div>

      <div className="dms-wrap rs-libbody">
        {list.length ? (
          <div className="rs-grid rs-grid--3">{list.map((t) => <VideoCard key={t.slug} t={t} />)}</div>
        ) : <p className="rs-empty">No videos match. Clear the filters or try another search.</p>}
      </div>
    </>
  );
}

/* ============================================================ blog library */
export function BlogLibrary({ posts, categories }: { posts: Post[]; categories: readonly BlogCategory[] }) {
  const [cat, setCat] = useState<BlogCategory | "All">("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return posts.filter((p) => (cat === "All" || p.category === cat) && (!s || [p.title, p.dek, p.category, p.author.name].join(" ").toLowerCase().includes(s)));
  }, [posts, cat, q]);

  return (
    <>
      <div className="rs-toolbar">
        <div className="dms-wrap rs-toolbar__inner">
          <div className="rs-toolbar__filters">
            <FilterLabel>Filter by</FilterLabel>
            <div className="rs-chips" aria-label="Topic">
              <Chip active={cat === "All"} onClick={() => setCat("All")}>All topics</Chip>
              {categories.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
            </div>
          </div>
          <div className="rs-toolbar__right">
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
export function CaseLibrary({ studies }: { studies: CaseStudy[] }) {
  const [ind, setInd] = useState<Industry | "All">("All");
  const [mod, setMod] = useState<ModuleTag | "All">("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return studies.filter((c) => (ind === "All" || c.industry === ind) && (mod === "All" || c.modules.includes(mod)) && (!s || [c.company, c.headline, c.summary, c.industry, c.modules.join(" ")].join(" ").toLowerCase().includes(s)));
  }, [studies, ind, mod, q]);

  return (
    <>
      <div className="rs-toolbar">
        <div className="dms-wrap rs-toolbar__inner">
          <div className="rs-toolbar__filters">
            <FilterLabel>Filter by</FilterLabel>
            <div className="rs-chips" aria-label="Industry">
              <Chip active={ind === "All"} onClick={() => setInd("All")}>All industries</Chip>
              {INDUSTRIES.map((i) => <Chip key={i} active={ind === i} onClick={() => setInd(i)}>{i}</Chip>)}
            </div>
            <span className="rs-toolbar__sep" aria-hidden="true" />
            <div className="rs-chips" aria-label="Module">
              {MODULES.map((m) => <Chip key={m.key} active={mod === m.key} onClick={() => setMod(mod === m.key ? "All" : m.key)}>{m.key}</Chip>)}
            </div>
          </div>
          <div className="rs-toolbar__right">
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

/* ============================================================ video player */
export function VideoPlayer({ t }: { t: Testimonial }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={"rs-player" + (playing ? " is-playing" : "")}>
      {t.poster ? <img className="rs-player__img" src={t.poster} alt="" /> : <span className="rs-player__ghost" aria-hidden="true">{initialsOf(t.company)}</span>}
      <span className="rs-player__scrim" aria-hidden="true" />
      <span className="rs-player__no">{t.industry}</span>
      {playing ? (
        <div className="rs-player__note">
          <span className="rs-player__note-lab">Sample reel</span>
          <p>The customer&rsquo;s video plays here. Swap in the real footage before this page ships.</p>
        </div>
      ) : (
        <button type="button" className="rs-player__cta" onClick={() => setPlaying(true)} aria-label={`Play ${t.person}'s story`}>
          <PlayGlyph />
          <span className="rs-player__runtime">{t.duration}</span>
        </button>
      )}
      <div className="rs-player__bar" aria-hidden="true">
        <span className="rs-player__scrub"><span className="rs-player__fill" style={{ transform: playing ? "scaleX(0.34)" : "scaleX(0)" }} /></span>
        <span className="rs-player__time">{playing ? "1:24" : "0:00"} / {t.duration}</span>
      </div>
    </div>
  );
}
