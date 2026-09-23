"use client";

/* ----------------------------------------------------------------------------
 * stories-browser.tsx - the middle of the Customer stories page (22 Sep 2026
 * rails wave), the one place the page's filter state lives.
 *
 * Two railed sections share that state, so the ledger above is a real door
 * into the library below:
 *
 *   1. THE CUSTOMERS - a rail-to-rail ledger, one cell per customer on film,
 *      each cell carrying that customer's wordmark whited out on a plate in
 *      their own colour, then the name, the industry, and who speaks.
 *      Picking a cell filters the library and scrolls to it; picking it again
 *      clears. Customers come from the data, grouped by company (the rows the
 *      Notion DB leaves company-less by governance group under their industry).
 *   2. THE LIBRARY - the head, the sticky "Filter by" toolbar, then every
 *      story as a hairline cell in one ledger drawn rail to rail, revealed a
 *      page at a time so the collection opens in a screen instead of a mile.
 *
 * No count of the site's own inventory is rendered anywhere: the toolbar's
 * number is a result count for the current filter, and the menus' numbers say
 * what choosing a row yields.
 * -------------------------------------------------------------------------- */

import { useMemo, useRef, useState } from "react";
import { Eyebrow } from "../../products/dms/dms-primitives";
import { HatchBand } from "../../_shared/page-rails";
import { VIDEO_INDUSTRIES, VIDEO_PERSONAS, type CustomerVideo } from "./customer-videos";
import { FilterMenu, FilterLabel, SearchBox, pad, tally, videoHay } from "./resources-interactive";
import { StoryCell } from "./resource-cards";

/* a customer is a company where the DB names one, otherwise the industry the
 * speakers are attributed to - the same key the filter runs on */
const customerKey = (v: CustomerVideo) => v.company ?? v.industry ?? "Unifize customers";

/* The customer marks: the wordmark whited out (brightness(0) invert(1), the
 * homepage logo strip's treatment) on a plate in that customer's own colour.
 *
 * `plate` is SAMPLED FROM THE LOGO FILE ITSELF, never picked by eye:
 *   Harmonic Bionics  #425f75  the whole wordmark is set in it
 *   Applechem         #2ac84d  the apple mark, beside a black wordmark
 *   Biovation Labs    #111112  its wordmark is monochrome; that is the ink
 * The Will-Burt Company has no wordmark file in public/customers yet, so it
 * keeps the page's charcoal and sets its name in the display face. Drop a
 * flat file in and give it a `plate` here and it joins the others. */
const CUSTOMER_MARKS: Record<string, { logo?: string; plate: string }> = {
  "Biovation Labs": { logo: "/customers/biovation-labs.svg", plate: "#111112" },
  "Harmonic Bionics": { logo: "/customers/harmonic-bionics.png", plate: "#425f75" },
  Applechem: { logo: "/customers/applechem.png", plate: "#2ac84d" },
  "The Will-Burt Company": { plate: "var(--hm-charcoal, #1f2126)" },
};

export type CustomerGroup = {
  /* the value the filter runs on */
  key: string;
  /* what the cell is titled: the company, or - where the DB names none - the
   * speakers themselves, so no cell repeats its own industry as its name */
  title: string;
  /* the whited-out wordmark file, where one exists */
  logo?: string;
  /* the plate behind it, in the customer's own colour */
  plate: string;
  industry?: string;
  people: string[];
  still?: string;
  /* the story that opens the group: its most-watched film */
  lead: CustomerVideo;
};

/* Only NAMED companies are customers here (Abhishek, 23 Sep). The rows the
 * Notion DB leaves company-less by governance still carry their films into
 * the library below; they just have no company to put on a plate. */
function groupCustomers(videos: CustomerVideo[]): CustomerGroup[] {
  const map = new Map<string, CustomerVideo[]>();
  for (const v of videos) {
    if (!v.company) continue;
    const k = v.company;
    const bucket = map.get(k);
    if (bucket) bucket.push(v);
    else map.set(k, [v]);
  }
  return [...map.entries()]
    .map(([key, list]) => {
      const ranked = [...list].sort((a, b) => b.fav - a.fav);
      const lead = ranked[0];
      const people: string[] = [];
      for (const v of ranked) if (!people.includes(v.person)) people.push(v.person);
      const mark = CUSTOMER_MARKS[key];
      return {
        key,
        title: key,
        logo: mark?.logo,
        plate: mark?.plate ?? "var(--hm-charcoal, #1f2126)",
        industry: lead.industry,
        people,
        still: lead.thumb,
        lead,
        weight: list.length,
      };
    })
    /* the customers who put the most of their own work on film lead */
    .sort((a, b) => b.weight - a.weight || a.key.localeCompare(b.key))
    .map(({ weight: _weight, ...g }) => g);
}

const PAGE = 18;

export function StoriesBrowser({ videos }: { videos: CustomerVideo[] }) {
  const [q, setQ] = useState("");
  const [ind, setInd] = useState("All");
  const [who, setWho] = useState("All");
  const [customer, setCustomer] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE);
  const libRef = useRef<HTMLElement>(null);

  const s = q.trim().toLowerCase();
  const groups = useMemo(() => groupCustomers(videos), [videos]);

  const list = useMemo(
    () =>
      videos.filter(
        (v) =>
          (customer === null || customerKey(v) === customer) &&
          (ind === "All" || v.industry === ind) &&
          (who === "All" || v.persona === who) &&
          (!s || videoHay(v).includes(s)),
      ),
    [videos, customer, ind, who, s],
  );

  /* each menu's counts honor the other filters, so every row states exactly
   * what choosing it yields */
  const byInd = useMemo(() => {
    const base = videos.filter(
      (v) => (customer === null || customerKey(v) === customer) && (who === "All" || v.persona === who) && (!s || videoHay(v).includes(s)),
    );
    return tally(base.length, base.map((v) => v.industry));
  }, [videos, customer, who, s]);

  const byWho = useMemo(() => {
    const base = videos.filter(
      (v) => (customer === null || customerKey(v) === customer) && (ind === "All" || v.industry === ind) && (!s || videoHay(v).includes(s)),
    );
    return tally(base.length, base.map((v) => v.persona));
  }, [videos, customer, ind, s]);

  const filtered = customer !== null || ind !== "All" || who !== "All" || q.trim() !== "";

  const pickCustomer = (key: string) => {
    const next = customer === key ? null : key;
    setCustomer(next);
    setShown(PAGE);
    if (next) {
      window.requestAnimationFrame(() => {
        libRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const reset = () => {
    setCustomer(null);
    setInd("All");
    setWho("All");
    setQ("");
    setShown(PAGE);
  };

  const visible = list.slice(0, shown);
  const more = list.length - visible.length;

  return (
    <>
      {/* ==================== 01 · THE CUSTOMERS ======================== */}
      <section className="dms-section cs-cust hm-railed" id="customers" aria-labelledby="cs-cust-h">
        <div className="dms-wrap">
          <header className="cs-head" data-reveal>
            <div className="cs-head__lead">
              <Eyebrow>The customers</Eyebrow>
              <h2 className="dms-h2" id="cs-cust-h">Start with the team that looks like yours.</h2>
            </div>
            <p className="dms-lede cs-head__lede">
              Each one runs their own regulated work on Unifize and put their people in front of a camera to say
              how. Pick a customer to see only their stories.
            </p>
          </header>
        </div>

        <div className="dms-wrap hm-bleed">
          <ul className="cs-custgrid" aria-label="Customers on film">
            {groups.map((g) => {
              const active = customer === g.key;
              return (
                <li className="cs-custcell" key={g.key}>
                  <button
                    type="button"
                    className={"cs-cust__btn" + (active ? " is-active" : "")}
                    aria-pressed={active}
                    onClick={() => pickCustomer(g.key)}
                  >
                    <span className="cs-cust__plate" style={{ background: g.plate }}>
                      {g.logo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="cs-cust__logo" src={g.logo} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <span className="cs-cust__wordmark">{g.title}</span>
                      )}
                    </span>
                    <span className="cs-cust__body">
                      <span className="cs-cust__name">{g.title}</span>
                      {g.industry ? <span className="cs-cust__ind">{g.industry}</span> : null}
                      <span className="cs-cust__who">{g.people.join(" · ")}</span>
                    </span>
                    <span className="cs-cust__go" aria-hidden="true">
                      {active ? "Showing their stories" : "See their stories"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <HatchBand />

      {/* ==================== 02 · THE LIBRARY ========================== */}
      <section className="dms-section cs-lib hm-railed" id="all" ref={libRef} aria-labelledby="cs-lib-h">
        <div className="dms-wrap">
          <header className="cs-head" data-reveal>
            <div className="cs-head__lead">
              <Eyebrow>Every story</Eyebrow>
              <h2 className="dms-h2" id="cs-lib-h">
                {customer
                  ? `${groups.find((g) => g.key === customer)?.title ?? customer}, in their own words.`
                  : "The whole library, in their own words."}
              </h2>
            </div>
            <p className="dms-lede cs-head__lede">
              Short films, recorded with customers who agreed to be named. Filter by industry or by the role the
              speaker holds.
            </p>
          </header>
        </div>

        <div className="cs-toolbar">
          <div className="dms-wrap cs-toolbar__inner">
            <div className="cs-toolbar__filters">
              <FilterLabel>Filter by</FilterLabel>
              {customer ? (
                <button type="button" className="cs-chip" onClick={() => pickCustomer(customer)}>
                  <span className="cs-chip__lab">Customer</span>
                  <span className="cs-chip__val">{groups.find((g) => g.key === customer)?.title ?? customer}</span>
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden="true">
                    <path d="m3 3 6 6M9 3l-6 6" />
                  </svg>
                </button>
              ) : null}
              <FilterMenu label="Industry" allLabel="All industries" value={ind} options={VIDEO_INDUSTRIES} counts={byInd} onChange={(v) => { setInd(v); setShown(PAGE); }} />
              <FilterMenu label="Role" allLabel="All roles" value={who} options={VIDEO_PERSONAS} counts={byWho} onChange={(v) => { setWho(v); setShown(PAGE); }} />
            </div>
            <div className="cs-toolbar__right">
              {filtered ? (
                <button type="button" className="rs-reset" onClick={reset}>Reset</button>
              ) : null}
              <SearchBox value={q} onChange={(v) => { setQ(v); setShown(PAGE); }} placeholder="Search the stories" />
              {/* a result count only once something narrows the list: unfiltered
                * it would just be a count of our own library */}
              <span className="cs-toolbar__count" aria-live="polite">
                {filtered ? <><b>{pad(list.length)}</b><i>matching</i></> : null}
              </span>
            </div>
          </div>
        </div>

        <div className="dms-wrap hm-bleed">
          {visible.length ? (
            <ul className="cs-ledger">
              {visible.map((v) => (
                <li className="cs-ledger__cell" key={v.slug}>
                  <StoryCell v={v} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="cs-empty">No stories match. Clear the filters or try another search.</p>
          )}
        </div>

        {more > 0 ? (
          <div className="dms-wrap cs-more">
            <button type="button" className="dms-btn dms-btn-ghost" onClick={() => setShown(shown + PAGE)}>
              Show more stories
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}
