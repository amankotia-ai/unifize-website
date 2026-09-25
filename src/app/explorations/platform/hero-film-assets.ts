/* ----------------------------------------------------------------------------
 * hero-film-assets.ts - where the platform hero film lives, shared by the
 * platform page (plays it) and the homepage (warms the cache with it).
 *
 * The files are served immutable for a year (next.config.ts), so the name
 * carries a version: after re-rendering (scripts/platform-render), copy the
 * new files in under the next version and bump HERO_FILM_VERSION. Never
 * overwrite a published version in place, or returning visitors keep the
 * old cut.
 * -------------------------------------------------------------------------- */

/* v3 (25 Sep 2026): the film re-made so each step is performed rather than
 * lifted (scripts/platform-render/v3/film.html, one timeline, rendered in
 * Blender a step at a time and joined). 34.6 s, six chapters of their own
 * length; its last frame is its first, so the loop has no cut.
 * v3-hq (25 Sep 2026, "around 15 MB is fine"): x264 CRF 22, preset BEST,
 * 15.1 MB, about 2-3 dB PSNR over v3 (CRF 26, 9.6 MB) on the hardest
 * frames, most on small type. v3 stays in public/ to compare; the v2 files
 * too: set the version back to "v2" and drop chapterStarts/keyBeats (5 s
 * chapters, 2.6 s stills) to restore it. */
export const HERO_FILM_VERSION = "v3-hq";

export const HERO_FILM = {
  src: `/explorations/platform/hero-film-${HERO_FILM_VERSION}.mp4`,
  type: "video/mp4",
  poster: `/explorations/platform/hero-film-poster-${HERO_FILM_VERSION}.jpg`,
  /* where each rail step starts, seconds (v3 steps run to their own length) */
  chapterStarts: [0, 5.0, 11.4, 16.6, 22.6, 29.0],
  /* seconds into each chapter of the still shown when the film can't play
   * (reduced motion, autoplay blocked): step 1 the click on Open record,
   * step 2 the thread with every function's reply in, step 3 the checklist
   * at 4 of 9 with M. Kerr's readiness just landed, step 4 the signature
   * landed on checklist and thread, step 5 the new approval named and set,
   * reminder on, step 6 the dashboard loaded with a month on hover */
  keyBeats: [3.8, 3.7, 3.4, 4.5, 3.7, 2.2],
} as const;
