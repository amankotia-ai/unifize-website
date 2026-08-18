/* ============================================================================
 * customer-films.ts - the Customer proof adapter over the Website Customer
 * Videos mirror (src/content/notion/customer-videos.json, synced from Notion
 * by scripts/notion/sync-sources.mjs). Each product page renders the films
 * whose Module tags intersect the page's modules, so tagging a video in
 * Notion adds it to the right page on the next sync.
 *
 * Governance is enforced here, not trusted from the caller: a film renders
 * only when its row is Status Live AND Web Use Approved, and carries the
 * complete facts a card needs (wistia + thumbnail + slug + title + an
 * attributed customer). Role and company columns are filled in Notion only
 * where attested, so absent values simply do not render.
 * ========================================================================== */

import customerVideos from "@/content/notion/customer-videos.json";

export type CustomerFilm = {
  url: string;
  title: string;
  person: string;
  role?: string;
  company?: string;
  industry?: string;
  tags: string[];
  duration: string;
  wistia: string;
  poster: string;
};

/* the lead card at the head of the rail: one customer-attested figure */
export type ProofLead = {
  label: string;
  stat: string;
  statLabel: string;
  body: string;
  footnote: string;
  href?: string;
};

type MirrorRow = (typeof customerVideos)[number];

const CONTENT = "https://www.unifize.com/content/";

const renderable = (row: MirrorRow) =>
  row.status === "Live" &&
  row.webUseApproved &&
  Boolean(row.wistia && row.thumbnail && row.slug && row.name && row.customer);

const toFilm = (row: MirrorRow): CustomerFilm => ({
  url: `${CONTENT}${row.slug}`,
  title: row.name,
  person: row.customer,
  role: row.role || undefined,
  company: row.company || undefined,
  industry: row.industry || undefined,
  tags: row.modules,
  duration: row.duration,
  wistia: row.wistia,
  poster: row.thumbnail,
});

/* Films whose Module tags intersect the page's modules. Deterministic order:
 * most page-relevant first (module overlap), then Notion Fav Count, then the
 * stable auto-increment id. */
export function filmsForModules(
  modules: string[],
  opts: { limit?: number; exclude?: string[] } = {},
): CustomerFilm[] {
  const { limit = 10, exclude = [] } = opts;
  const wanted = new Set(modules);
  const excluded = new Set(exclude);

  return customerVideos
    .filter(renderable)
    .filter((row) => !excluded.has(row.wistia))
    .map((row) => ({
      row,
      overlap: row.modules.filter((m) => wanted.has(m)).length,
    }))
    .filter((entry) => entry.overlap > 0)
    .sort(
      (a, b) =>
        b.overlap - a.overlap ||
        (b.row.favCount ?? 0) - (a.row.favCount ?? 0) ||
        Number(a.row.id) - Number(b.row.id),
    )
    .slice(0, limit)
    .map((entry) => toFilm(entry.row));
}

/* A lead card whose claim the customer states on film. The figure framing is
 * page copy; the attribution and link come from the mirror row, so the card
 * disappears if the film is ever unapproved or unpublished in Notion. */
export function attestedLead(
  wistia: string,
  framing: { stat: string; statLabel: string; body: (film: CustomerFilm) => string },
): ProofLead | null {
  const row = customerVideos.find((r) => r.wistia === wistia);
  if (!row || !renderable(row)) return null;
  const film = toFilm(row);
  return {
    label: "Customer-attested on film",
    stat: framing.stat,
    statLabel: framing.statLabel,
    body: framing.body(film),
    footnote: "Watch the customer say it",
    href: film.url,
  };
}
