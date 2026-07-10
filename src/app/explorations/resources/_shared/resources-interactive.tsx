"use client";

/* ----------------------------------------------------------------------------
 * resources-interactive.tsx - the client layer for the Resources catalog. The
 * content is presented as numbered exhibits: video "film cards", paper plates
 * for writing, metric-hero case cards. A quiet sticky toolbar filters/searches.
 *
 *   VideoPoster        - a numbered film-card tile (used in grid + related).
 *   TestimonialLibrary - group-by (company/industry/module) + search over films.
 *   VideoPlayer        - the item page's cinematic player.
 *   BlogLibrary        - category chips + search over paper-plate post cards.
 *   CaseLibrary        - industry/module chips + search over metric-hero cards.
 * -------------------------------------------------------------------------- */

import { useMemo, useState } from "react";
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

const pad = (n: number) => String(n).padStart(2, "0");
type Industry = (typeof INDUSTRIES)[number];

const initialsOf = (name: string) => name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function PlayIcon({ className }: { className?: string }) {
  return (
    <span className={"rs-play" + (className ? " " + className : "")} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none"><path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor" /></svg>
    </span>
  );
}

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

/* ============================================================ film-card tile */
export function VideoPoster({ t, no }: { t: Testimonial; no: number }) {
  return (
    <Link href={`/explorations/resources/testimonials/${t.slug}`} className="rs-vtile">
      <div className="rs-plate">
        {t.poster ? <img className="rs-plate__img" src={t.poster} alt="" loading="lazy" /> : <span className="rs-plate__ghost" aria-hidden="true">{initialsOf(t.company)}</span>}
        <span className="rs-plate__scrim" aria-hidden="true" />
        <span className="rs-plate__no">{pad(no)}</span>
        <PlayIcon className="rs-plate__play" />
        <span className="rs-plate__dur dms-data">{t.duration}</span>
        <span className="rs-plate__sample">Sample</span>
      </div>
      <div className="rs-vtile__body">
        <div className="rs-vtile__meta">
          <span className="rs-vtile__co">{t.company}</span>
          <span className="rs-vtile__mods">{t.modules.join(" · ")}</span>
        </div>
        <p className="rs-vtile__quote">{t.headline}</p>
        <span className="rs-vtile__who">{t.person} — {t.role}</span>
      </div>
    </Link>
  );
}

type View = "company" | "industry" | "module" | "all";
const VIEWS: { key: View; label: string }[] = [
  { key: "company", label: "Company" },
  { key: "industry", label: "Industry" },
  { key: "module", label: "Module" },
  { key: "all", label: "All" },
];

/* ============================================================ video library */
export function TestimonialLibrary({ testimonials }: { testimonials: Testimonial[] }) {
  const [view, setView] = useState<View>("company");
  const [q, setQ] = useState("");
  const [ind, setInd] = useState<Industry | "All">("All");
  const [mod, setMod] = useState<ModuleTag | "All">("All");

  const catNo = useMemo(() => new Map(testimonials.map((t, i) => [t.slug, i + 1])), [testimonials]);

  const base = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return testimonials;
    return testimonials.filter((t) => [t.company, t.person, t.role, t.headline, t.industry, t.modules.join(" ")].join(" ").toLowerCase().includes(s));
  }, [testimonials, q]);

  const clusters = useMemo(() => {
    if (view === "company") {
      const map = new Map<string, Testimonial[]>();
      for (const t of base) { if (!map.has(t.company)) map.set(t.company, []); map.get(t.company)!.push(t); }
      return [...map.entries()].map(([label, items]) => ({ label, sub: items[0].companyKind, items }));
    }
    if (view === "industry") {
      return INDUSTRIES.map((label) => ({ label, sub: undefined as string | undefined, items: base.filter((t) => t.industry === label) })).filter((c) => c.items.length);
    }
    return MODULES.map((m) => ({ label: `${m.key} · ${m.name}`, sub: m.blurb, items: base.filter((t) => t.modules.includes(m.key)) })).filter((c) => c.items.length);
  }, [view, base]);

  const flat = useMemo(() => base.filter((t) => (ind === "All" || t.industry === ind) && (mod === "All" || t.modules.includes(mod))), [base, ind, mod]);
  const count = view === "all" ? flat.length : base.length;

  return (
    <>
      <div className="rs-toolbar">
        <div className="dms-wrap rs-toolbar__inner">
          <div className="rs-toolbar__seg">
            <span className="rs-toolbar__lab">Group</span>
            <div className="rs-seg" role="tablist" aria-label="Group films">
              {VIEWS.map((v) => (
                <button key={v.key} type="button" role="tab" aria-selected={view === v.key} className={"rs-seg__btn" + (view === v.key ? " is-active" : "")} onClick={() => setView(v.key)}>{v.label}</button>
              ))}
            </div>
          </div>
          <div className="rs-toolbar__right">
            <SearchBox value={q} onChange={setQ} placeholder="Search films" />
            <span className="rs-toolbar__count dms-data" aria-live="polite">{pad(count)}</span>
          </div>
        </div>
        {view === "all" ? (
          <div className="dms-wrap rs-toolbar__chips">
            <div className="rs-chips"><span className="rs-chips__lab">Industry</span>
              <Chip active={ind === "All"} onClick={() => setInd("All")}>All</Chip>
              {INDUSTRIES.map((i) => <Chip key={i} active={ind === i} onClick={() => setInd(i)}>{i}</Chip>)}
            </div>
            <div className="rs-chips"><span className="rs-chips__lab">Module</span>
              <Chip active={mod === "All"} onClick={() => setMod("All")}>All</Chip>
              {MODULES.map((m) => <Chip key={m.key} active={mod === m.key} onClick={() => setMod(m.key)}>{m.key}</Chip>)}
            </div>
          </div>
        ) : null}
      </div>

      <div className="dms-wrap rs-libbody">
        {view === "all" ? (
          flat.length ? (
            <div className="rs-vgrid">{flat.map((t) => <VideoPoster key={t.slug} t={t} no={catNo.get(t.slug)!} />)}</div>
          ) : <p className="rs-empty">No films match. Clear the filters or try another search.</p>
        ) : clusters.length ? (
          <div className="rs-clusters">
            {clusters.map((c) => (
              <section className="rs-cluster" key={c.label}>
                <div className="rs-blocklabel">
                  <span className="rs-blocklabel__t">{c.label}{c.sub ? <span className="rs-blocklabel__sub"> — {c.sub}</span> : null}</span>
                  <span className="rs-blocklabel__c dms-data">{pad(c.items.length)}</span>
                </div>
                <div className="rs-vgrid">{c.items.map((t) => <VideoPoster key={c.label + t.slug} t={t} no={catNo.get(t.slug)!} />)}</div>
              </section>
            ))}
          </div>
        ) : <p className="rs-empty">No films match &ldquo;{q}&rdquo;.</p>}
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
          <PlayIcon />
          <span className="rs-player__runtime dms-data">{t.duration}</span>
        </button>
      )}
      <div className="rs-player__bar" aria-hidden="true">
        <span className="rs-player__scrub"><span className="rs-player__fill" style={{ width: playing ? "34%" : "0%" }} /></span>
        <span className="rs-player__time dms-data">{playing ? "1:24" : "0:00"} / {t.duration}</span>
      </div>
    </div>
  );
}

/* ============================================================ blog library */
export function BlogLibrary({ posts, categories }: { posts: Post[]; categories: readonly BlogCategory[] }) {
  const [cat, setCat] = useState<BlogCategory | "All">("All");
  const [q, setQ] = useState("");
  const catNo = useMemo(() => new Map(posts.map((p, i) => [p.slug, i + 1])), [posts]);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return posts.filter((p) => (cat === "All" || p.category === cat) && (!s || [p.title, p.dek, p.category, p.author.name].join(" ").toLowerCase().includes(s)));
  }, [posts, cat, q]);

  return (
    <>
      <div className="rs-toolbar">
        <div className="dms-wrap rs-toolbar__inner">
          <div className="rs-chips rs-chips--flow">
            <Chip active={cat === "All"} onClick={() => setCat("All")}>All</Chip>
            {categories.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
          </div>
          <div className="rs-toolbar__right">
            <SearchBox value={q} onChange={setQ} placeholder="Search the blog" />
            <span className="rs-toolbar__count dms-data" aria-live="polite">{pad(list.length)}</span>
          </div>
        </div>
      </div>
      <div className="dms-wrap rs-libbody">
        {list.length ? (
          <div className="rs-postgrid">
            {list.map((p) => (
              <Link key={p.slug} href={`/explorations/resources/blog/${p.slug}`} className="rs-postcard">
                <div className="rs-plate rs-plate--paper">
                  <span className="rs-plate__no">{pad(catNo.get(p.slug)!)}</span>
                  <span className="rs-plate__kind dms-data">{p.readMins} min</span>
                  <span className="rs-plate__word">{p.category}</span>
                </div>
                <div className="rs-postcard__body">
                  <div className="rs-postcard__meta">
                    <span className="dms-data">{p.dateLabel}</span>
                    <span className="rs-postcard__dot" aria-hidden="true" />
                    <span className="dms-data">{p.readMins} min read</span>
                  </div>
                  <h3 className="rs-postcard__title">{p.title}</h3>
                  <p className="rs-postcard__dek">{p.dek}</p>
                  <span className="rs-postcard__by">{p.author.name} — {p.author.role}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : <p className="rs-empty">No posts match. Try another category or search.</p>}
      </div>
    </>
  );
}

/* ============================================================ case library */
export function CaseLibrary({ studies }: { studies: CaseStudy[] }) {
  const [ind, setInd] = useState<Industry | "All">("All");
  const [mod, setMod] = useState<ModuleTag | "All">("All");
  const [q, setQ] = useState("");
  const catNo = useMemo(() => new Map(studies.map((c, i) => [c.slug, i + 1])), [studies]);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return studies.filter((c) => (ind === "All" || c.industry === ind) && (mod === "All" || c.modules.includes(mod)) && (!s || [c.company, c.headline, c.industry, c.modules.join(" ")].join(" ").toLowerCase().includes(s)));
  }, [studies, ind, mod, q]);

  return (
    <>
      <div className="rs-toolbar">
        <div className="dms-wrap rs-toolbar__inner">
          <div className="rs-chips rs-chips--flow"><span className="rs-chips__lab">Industry</span>
            <Chip active={ind === "All"} onClick={() => setInd("All")}>All</Chip>
            {INDUSTRIES.map((i) => <Chip key={i} active={ind === i} onClick={() => setInd(i)}>{i}</Chip>)}
          </div>
          <div className="rs-toolbar__right">
            <SearchBox value={q} onChange={setQ} placeholder="Search case studies" />
            <span className="rs-toolbar__count dms-data" aria-live="polite">{pad(list.length)}</span>
          </div>
        </div>
        <div className="dms-wrap rs-toolbar__chips">
          <div className="rs-chips"><span className="rs-chips__lab">Module</span>
            <Chip active={mod === "All"} onClick={() => setMod("All")}>All</Chip>
            {MODULES.map((m) => <Chip key={m.key} active={mod === m.key} onClick={() => setMod(m.key)}>{m.key}</Chip>)}
          </div>
        </div>
      </div>
      <div className="dms-wrap rs-libbody">
        {list.length ? (
          <div className="rs-casegrid">
            {list.map((c) => (
              <Link key={c.slug} href={`/explorations/resources/case-studies/${c.slug}`} className="rs-casecard">
                <div className="rs-casecard__top">
                  <span className="rs-casecard__no">{pad(catNo.get(c.slug)!)}</span>
                  <span className="rs-casecard__ind">{c.industry}</span>
                </div>
                <div className="rs-casecard__hero">
                  <span className="rs-casecard__val">{c.metrics[0].value}</span>
                  <span className="rs-casecard__vlab">{c.metrics[0].label}</span>
                </div>
                <h3 className="rs-casecard__headline">{c.headline}</h3>
                <div className="rs-casecard__more">
                  {c.metrics.slice(1).map((m) => <span className="rs-casecard__stat" key={m.label}><b>{m.value}</b>{m.label}</span>)}
                </div>
                <div className="rs-casecard__foot">
                  <span className="rs-casecard__co">{c.company}</span>
                  <span className="rs-casecard__mods">{c.modules.join(" · ")}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : <p className="rs-empty">No case studies match. Clear the filters or try another search.</p>}
      </div>
    </>
  );
}
