# Shipping a film to a page

Ask before putting a film on a page, unless the person already asked for
it. Then:

## Files

- Copy the page cut (no baked grain) and a poster into `public/` under a
  **new** versioned name, e.g. `public/explorations/platform/hero-film-v3-hq.mp4`.
  These are served immutable for a year (`next.config.ts` headers for
  `hero-film-*`), so a changed film must never reuse a name.
- Poster: the film's first frame (playback starts without a jump).
- Keep the previous version's files until the person signs off on the new
  one; then delete superseded intermediates you created. Never delete a
  version you didn't create (v2 stays).

## The platform hero (already wired)

`src/app/explorations/platform/hero-film-assets.ts`:

```ts
export const HERO_FILM_VERSION = "v3-hq";
export const HERO_FILM = {
  src: `/explorations/platform/hero-film-${HERO_FILM_VERSION}.mp4`,
  type: "video/mp4",
  poster: `/explorations/platform/hero-film-poster-${HERO_FILM_VERSION}.jpg`,
  chapterStarts: [0, 5.0, 11.4, 16.6, 22.6, 29.0],   // from join.py
  keyBeats: [3.8, 3.7, 3.4, 4.5, 3.7, 2.2],          // step-local still per chapter
} as const;
```

`platform-hero-film.tsx` (`PlatformHeroFilm`) plays it: the rail follows
the playhead, a click seeks to the chapter start, chapters past the end of
a partial film are disabled, and under reduced motion or blocked autoplay
it holds each chapter's key beat. Update the `description` prop in
`page.tsx` to say what the film shows (it is the video's accessible name).

Grain: `.pf-film::after` in `platform-rails.css` lays the grain tile
(`hero-film-grain-v3.png`, hard-light, 0.06, 128 px, 12 fps jitter) over
the video. The page's 20:9 box and edge mask are in the same file.

## A new page

`PlatformHeroFilm` is generic in its props, but its CSS (the 20:9 box,
edge mask, grain overlay, rail) is scoped to the platform page. For a
second page, move that CSS and the component into `_shared/` rather than
copying it, and give the page its own assets file.

## The homepage hero (already wired)

`src/app/explorations/home/hero-film-assets.ts` holds one film per hero tab
(`HOME_HERO_FILMS.quality`, ...: src, poster, keyBeat, description); a
`HERO_VIEWS` entry in `home/page.tsx` takes `film: HOME_HERO_FILMS.<key>`.
`HeroArcadeSwitcher` (home-interactive.tsx) mounts the film over the
arcade from 768px (phones keep the arcade), plays it once, holds 1.5 s,
then advances; the tab timer spans film + hold. The film's box, plate and
grain are the HERO FILMS block at the end of home-rails.css; its zoom
steps must stay in step with the hero camera's in home-kit.css. Files go
in `public/explorations/home/hero-film-<key>-vN.mp4` (immutable cache).

## Verify

On the dev server (`preview_start` or the running one), check with the
page's JS: the video source, duration, which steps are enabled, the active
step and timer at a few times, and that a rail click seeks. A hidden
browser pane won't play media; say so rather than claiming playback.

## Finally

- Update the direction log's render table and the film's memory note.
- Send the review cut (grain baked) and say what changed, the file size,
  and what's still pending.
