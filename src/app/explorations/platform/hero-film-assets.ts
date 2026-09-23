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

export const HERO_FILM_VERSION = "v2";

export const HERO_FILM = {
  src: `/explorations/platform/hero-film-${HERO_FILM_VERSION}.mp4`,
  type: "video/mp4",
  poster: `/explorations/platform/hero-film-poster-${HERO_FILM_VERSION}.jpg`,
} as const;
