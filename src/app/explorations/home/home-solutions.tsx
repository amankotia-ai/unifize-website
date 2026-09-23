"use client";

/* ----------------------------------------------------------------------------
 * home-solutions.tsx - the recognition grid's "see more" control.
 *
 * 2026-09-02 sync (H6): Raj wants more than four solutions reachable from
 * the homepage, but not a carousel ("people might miss things"). Agreed
 * pattern: the first four cards render, then one control reveals the rest
 * IN PLACE, in the same grid, with the same claim + note + Explore shape.
 * No auto-scroll, no rotation. The homepage stays an ingress point; the
 * depth lives on the L2 solution pages.
 *
 * The cards themselves are rendered by the server page and passed in as
 * nodes, so the data array stays in page.tsx where Lakshman's 9 Sep wording
 * pass can swap it. This component only owns the expanded/collapsed state.
 * Without JS the first four render and the control is inert.
 * -------------------------------------------------------------------------- */

import { useId, useRef, useState, type ReactNode } from "react";

export function SolutionsGrid({
  cards,
  initial = 4,
  peek = 2,
}: {
  cards: { key: string; node: ReactNode }[];
  initial?: number;
  /** how many of the hidden cards show through the blurred preview */
  peek?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const hasMore = cards.length > initial;
  const peeked = expanded ? [] : cards.slice(initial, initial + peek);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    if (next) {
      /* hand keyboard focus to the first revealed card once it is in the
       * tree, so the reveal is not a silent DOM change for screen readers */
      requestAnimationFrame(() => {
        listRef.current
          ?.querySelector<HTMLAnchorElement>(`li:nth-child(${initial + 1}) a`)
          ?.focus({ preventScroll: true });
      });
    }
  };

  return (
    <>
      <ul className="hm-symptoms" id={listId} ref={listRef} data-reveal>
        {cards.map((card, index) => {
          const extra = index >= initial;
          if (extra && !expanded) return null;
          return (
            <li className={"hm-symptom" + (extra ? " hm-symptom--more" : "")} key={card.key}>
              {card.node}
            </li>
          );
        })}
      </ul>
      {hasMore ? (
        <>
          {/* blurred, fading preview of the next row: decorative only, so it
            * is hidden from assistive tech and inert to focus and clicks */}
          {peeked.length > 0 ? (
            <div className="hm-peek" aria-hidden="true" inert>
              {/* three copies, sharp / soft / heavy, each masked to its own
                * band: a progressive blur that needs no backdrop-filter */}
              {[0, 1, 2].map((layer) => (
                <ul className="hm-symptoms hm-symptoms--peek" data-layer={layer} key={layer}>
                  {peeked.map((card) => (
                    <li className="hm-symptom" key={card.key}>
                      {card.node}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ) : null}
          <div className={"hm-more-row" + (expanded ? " is-expanded" : "")}>
            <button
              type="button"
              className="hm-more"
              aria-expanded={expanded}
              aria-controls={listId}
              onClick={toggle}
            >
              {expanded ? "Show fewer solutions" : "See more solutions"}
              <span aria-hidden="true">{expanded ? "\u2191" : "\u2193"}</span>
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
