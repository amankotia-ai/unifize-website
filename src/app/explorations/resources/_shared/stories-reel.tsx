/* ----------------------------------------------------------------------------
 * stories-reel.tsx - the Customer stories hero's establishing shot (22 Sep
 * 2026 rails wave): the one light object on the charcoal, in the slot the
 * homepage and the product pages give the arcade window.
 *
 * A contact sheet of the real stills, drifting slowly across a sky wash that
 * runs rail to rail and fades into the hero at both edges. Two identical
 * tracks; the second is decorative and makes the loop seamless (the homepage
 * logo strip's trick). Purely an establishing shot: the navigable ledger is
 * the section below, so the whole strip is hidden from assistive tech and it
 * stops moving under prefers-reduced-motion.
 *
 * Server component.
 * -------------------------------------------------------------------------- */

import type { CustomerVideo } from "./customer-videos";

export function StoriesReel({ videos, rows = 2, per = 9 }: { videos: CustomerVideo[]; rows?: number; per?: number }) {
  /* spread the stills so neither row repeats a face next to itself: row 0
   * takes every other film from the top of the list, row 1 the ones between */
  const withThumb = videos.filter((v) => v.thumb);
  const lanes = Array.from({ length: rows }, (_, r) =>
    withThumb.filter((_, i) => i % rows === r).slice(0, per),
  );

  return (
    <div className="cs-reel" aria-hidden="true">
      <div className="cs-reel__wash">
        <i className="cs-reel__grain" />
        {lanes.map((lane, r) => (
          <div className={"cs-reel__lane cs-reel__lane--" + r} key={r}>
            {[0, 1].map((copy) => (
              <ul className="cs-reel__track" key={copy}>
                {lane.map((v) => (
                  <li className="cs-reel__still" key={copy + v.slug}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.thumb} alt="" loading="lazy" decoding="async" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
      <i className="cs-reel__fade cs-reel__fade--l" />
      <i className="cs-reel__fade cs-reel__fade--r" />
    </div>
  );
}
