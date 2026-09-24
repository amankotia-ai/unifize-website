"use client";

/* ----------------------------------------------------------------------------
 * home-industries.tsx - 05 · industries, as tabs over large tiles.
 *
 * 9 Sep 2026 review (Lakshman): the old three-column list told the visitor
 * which bucket their industry sits in ("automotive is part of discrete
 * manufacturing"), which is not interesting. What is: "there is something
 * for me behind this tile". So the three groups are tabs, and each industry
 * is a large tile that leads with its own challenge, an example of where it
 * bites, the standards it is audited under, and a Learn more door.
 *
 * 22 Sep 2026: the tiles are built on the way-in card grammar (01): grey
 * tint card with no ring, small label, display statement, a white plate
 * for the ledger (where it bites, standards, customer) and a white pill
 * door that turns brand blue on hover. Grouping and tabs unchanged.
 *
 * 23 Sep 2026: every tile used to end on the same "Not why." turn, which
 * read as repetitive across eleven tiles. Each headline now carries its own
 * stake (claim + turn), drawn from the Notion Industries DB Primary Fear
 * Anchor, and the example line names the moment it bites. Standards are the
 * industry page's own. `customer` renders only
 * where the Website Customer Videos mirror attests a company in that
 * industry. No auto-advance: the visitor picks.
 *
 * 24 Sep 2026: four tiles in a row read busy. A group of four or more lays
 * out 2x2, three or fewer stay one row (home-rails.css). The tile reads in
 * one order: who (label), the stake (claim), the evidence (a captioned
 * ledger: where it bites, audited under), then a door named for the
 * industry. A wide tile splits story left, evidence right (container query).
 * -------------------------------------------------------------------------- */
import Link from "next/link";
import { useId, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import "./home-industries.css";

export type HomeIndustry = {
  name: string;
  href: string;
  icon: ReactNode;
  /* the plain half of the headline, e.g. "One late 8D" */
  claim: string;
  /* the accented half, e.g. "puts you on controlled shipping." */
  turn: string;
  /* where it bites, e.g. "A PPAP resubmission" */
  example: string;
  standards: string[];
  customer?: { name: string; src: string };
};

export type HomeIndustryGroup = { name: string; body: string; industries: HomeIndustry[] };

export function HomeIndustries({ groups }: { groups: HomeIndustryGroup[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = `${uid}-panel`;

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (active + (event.key === "ArrowRight" ? 1 : groups.length - 1)) % groups.length;
    setActive(next);
    document.getElementById(tabId(next))?.focus();
  };

  const group = groups[active];
  return (
    <div className="hm-ind">
      <div className="hm-ind__tabs" role="tablist" aria-label="Industry groups" onKeyDown={onKey}>
        {groups.map((g, i) => (
          <button
            key={g.name}
            id={tabId(i)}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={panelId}
            tabIndex={i === active ? 0 : -1}
            className={"hm-ind__tab" + (i === active ? " is-active" : "")}
            onClick={() => setActive(i)}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="hm-ind__panel" id={panelId} role="tabpanel" aria-labelledby={tabId(active)}>
        <p className="hm-ind__lede">{group.body}</p>
        <ul
          className={"hm-ind__tiles " + (group.industries.length >= 4 ? "hm-ind__tiles--grid" : "hm-ind__tiles--row")}
          style={{ "--hm-ind-count": group.industries.length } as CSSProperties}
          key={group.name}
        >
          {group.industries.map((industry) => (
            <li key={industry.name}>
              <article className="hm-ind__tile">
                <div className="hm-ind__intro">
                  <span className="hm-ind__label">
                    <span className="hm-ind__glyph" aria-hidden="true">{industry.icon}</span>
                    {industry.name}
                  </span>
                  <h3 className="hm-ind__claim">
                    {industry.claim} <em>{industry.turn}</em>
                  </h3>
                </div>
                {/* the ledger plate: where it bites, the standards, and the
                  * attested customer where there is one */}
                <dl className="hm-ind__plate">
                  <div className="hm-ind__row">
                    <dt>Where it bites</dt>
                    <dd>{industry.example}</dd>
                  </div>
                  <div className="hm-ind__row">
                    <dt>Audited under</dt>
                    <dd className="hm-ind__standards">
                      {industry.standards.map((s) => <i key={s}>{s}</i>)}
                    </dd>
                  </div>
                  {industry.customer ? (
                    <div className="hm-ind__row">
                      <dt>Runs on Unifize</dt>
                      <dd className="hm-ind__customer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={industry.customer.src} alt={industry.customer.name} loading="lazy" decoding="async" />
                      </dd>
                    </div>
                  ) : null}
                </dl>
                <Link className="hm-ind__go" href={industry.href}>
                  Explore {industry.name} <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
