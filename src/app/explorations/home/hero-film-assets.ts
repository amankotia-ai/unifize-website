/* ----------------------------------------------------------------------------
 * hero-film-assets.ts - the homepage hero films: one short video per hero
 * tab, each a complete workflow performed in the window, filmed still in the
 * window's own place (scripts/product-films/home-hero, direction.md there).
 * The video covers only the window; the wash, dots and plate around it stay
 * the page's CSS, and the grain over it is CSS too.
 *
 * The files are served immutable for a year (next.config.ts), so a new cut
 * ships under the next version: copy it in with a new name and bump the
 * version here. Never overwrite a published version in place.
 * -------------------------------------------------------------------------- */

export type HomeHeroFilm = {
  src: string;
  poster: string;
  /* seconds in: the still shown when the film can't play (reduced motion,
   * autoplay blocked), the finished workflow */
  keyBeat: number;
  /* what the film shows, for assistive tech (the video has no audio) */
  description: string;
};

/* v1 (26 Sep 2026): Quality event, 6.6 s, 2568 x 1344, x264 CRF 18, 1.1 MB.
 * NC-204: the containment ask, the answer from the line, both ticks live.
 * v2 (26 Sep 2026, "looks incomplete, no real story of what a quality event
 * means on Unifize"): NC-204 raised to closed, 20.5 s, x264 CRF 22, 3.8 MB.
 * Evidence ticks itself, owners contain it in the thread, engineering posts
 * the root cause, J. Rivera picks the disposition and signs in the platform
 * film's Part 11 dialog, Close unlocks at 7 of 7. v1 stays in public/ until
 * v2 is signed off. */
const QUALITY_VERSION = "v2";

/* v1 (26 Sep 2026): Change order, CC-2148 raised to released, 18.6 s,
 * x264 CRF 22, 3.9 MB. Reason and affected documents tick from NC-204 and
 * the drawing; D. Fontaine asks "What else does this change affect? (Beta)"
 * and adds the AI suggestion (WI-092, FRM-201 linked); M. Kerr confirms
 * production readiness; she signs in the Part 11 dialog; Release unlocks
 * with the approvals in; Rev D effective, training assigned. */
const CHANGE_VERSION = "v1";

/* v1 (26 Sep 2026): Holds & release, lot 118-B held to released, 17.2 s,
 * x264 CRF 22, 2.7 MB. Placed from NC-204's containment; the disposition
 * ticks in from NC-204 and the rework lands; M. Osei types the
 * re-inspection results, signs the release in the Part 11 dialog, and
 * Release lot unlocks only with the signature on the record. */
const HOLDS_VERSION = "v1";

/* v1 (27 Sep 2026): Controlled document, SOP-118 Rev E draft to point of
 * use, 18.6 s, x264 CRF 22, 3.5 MB. Raised from NC-204's corrective action,
 * reviewed, signed in the Part 11 dialog, made effective (Rev D superseded,
 * retraining assigned), then a line 2 operator reads the controlled copy
 * the next morning and acknowledges it. */
const DOCUMENT_VERSION = "v1";

export const HOME_HERO_FILMS = {
  quality: {
    src: `/explorations/home/hero-film-quality-${QUALITY_VERSION}.mp4`,
    poster: `/explorations/home/hero-film-quality-poster-${QUALITY_VERSION}.jpg`,
    keyBeat: 20.4,
    description:
      "Quality event NC-204, coating thickness out of spec on line 2, from raised to closed on one record. The report lands with photos, readings and the part and work order. J. Rivera asks in the thread for lot 118-B to be quarantined and the WIP sorted, and both tasks tick live. Engineering posts the root cause, a worn fixture. J. Rivera chooses Rework to spec and signs the quality approval under 21 CFR Part 11. Close unlocks only once every item and the signature are on the record, and she closes the event.",
  },
  change: {
    src: `/explorations/home/hero-film-change-${CHANGE_VERSION}.mp4`,
    poster: `/explorations/home/hero-film-change-poster-${CHANGE_VERSION}.jpg`,
    keyBeat: 18.5,
    description:
      "Change order CC-2148, a torque spec update raised from quality event NC-204, from raised to released on one record. The reason and the affected documents fill in from NC-204 and the uploaded drawing. D. Fontaine asks the AI what else the change affects, reviews its suggestion in the thread, and adds it, linking two more documents. Production confirms readiness, she signs the quality approval under 21 CFR Part 11, and Release unlocks only once the approvals are in. She releases the change: the new drawing revision goes effective and training is assigned.",
  },
  holds: {
    src: `/explorations/home/hero-film-holds-${HOLDS_VERSION}.mp4`,
    poster: `/explorations/home/hero-film-holds-poster-${HOLDS_VERSION}.jpg`,
    keyBeat: 17.1,
    description:
      "Hold HLD-118 on lot 118-B, from held to released on one record. The hold comes from quality event NC-204's containment, with its reason and scope filled in. Quality posts the disposition, rework to spec, and production reports the rework done. M. Osei enters the re-inspection results, three of three samples in spec, and signs the release under 21 CFR Part 11. Release unlocks only once her signature is on the record, and she releases the lot: 240 units cleared for use.",
  },
  document: {
    src: `/explorations/home/hero-film-document-${DOCUMENT_VERSION}.mp4`,
    poster: `/explorations/home/hero-film-document-poster-${DOCUMENT_VERSION}.jpg`,
    keyBeat: 18.5,
    description:
      "Controlled document SOP-118, cleaning validation for coating line 2, from a new revision to point of use. Revision E is raised from quality event NC-204 to add a fixture check before each shift. Document control attaches the redline, engineering reviews it, and D. Fontaine signs the quality approval under 21 CFR Part 11. Once it is approved she makes it effective: revision D is superseded and retraining is assigned to line 2. The next morning a line 2 operator opens the controlled copy, goes straight to the new step, and marks it read and understood.",
  },
} satisfies Record<string, HomeHeroFilm>;
