/* ============================================================================
 * platform-proof.tsx - the Platform page's Customer proof section: the shared
 * film rail over the Website Customer Videos mirror. Platform-wide selection:
 * the lead card carries the device-company implementation figure stated on
 * film, the curated head of the rail answers the panel's named objections
 * (moving off a legacy eQMS, engineering as a first-class citizen), and the
 * rest fills by module relevance across quality, documents, design, and
 * production. Governance lives in customer-films.ts: an unapproved or
 * unpublished row simply stops rendering.
 * ========================================================================== */

import { ProofFilmRail } from "../products/_shared/proof-films";
import {
  attestedLead,
  filmByWistia,
  filmsForModules,
  type CustomerFilm,
} from "../products/_shared/customer-films";

/* Clarissa Archer, Harmonic Bionics: a collaborative eQMS live in 4 weeks */
const LEAD_WISTIA = "zna343d4uv";

/* the curated head of the rail: the stories the buying committee asked for */
const CURATED_WISTIAS = [
  "r8sesxmui9", /* Jesse Kolstad, Biovation: why they moved off MasterControl */
  "xwv3jvzgzv", /* Michael Hogan, Harmonic: engineering system of record */
  "i43nixcmyj", /* Tedd Carr, Will-Burt: what attracted a manufacturer */
];

/* used elsewhere on the page; keep the rail free of repeats */
const USED_ON_PAGE = ["qp7129voyy", LEAD_WISTIA];

/* cross-functional module spread, one tag per band of the committee */
const PLATFORM_FILM_MODULES = [
  "CAPAs",
  "NCs / Defects",
  "Change Control",
  "Change Requests & Orders",
  "Document Management",
  "Design History File",
  "Work Orders & Routing",
  "Supplier Quality",
  "Training",
];

export function PlatformProofFilms() {
  const lead = attestedLead(LEAD_WISTIA, {
    stat: "4 weeks",
    statLabel: "to a live, collaborative eQMS",
    body: (film) =>
      `A collaborative eQMS implemented in four weeks at a medical device company, told on film by ${film.person} of ${film.company}.`,
  });

  const curated = CURATED_WISTIAS
    .map((wistia) => filmByWistia(wistia))
    .filter((film): film is CustomerFilm => film !== null);

  const films = [
    ...curated,
    ...filmsForModules(PLATFORM_FILM_MODULES, {
      limit: 7,
      exclude: [...USED_ON_PAGE, ...CURATED_WISTIAS],
    }),
  ];

  return (
    <ProofFilmRail
      idPrefix="pf"
      eyebrowN={6}
      heading="Real teams, on camera, on the record."
      lede="Quality directors, engineers, and operators on their own before and after: off legacy systems, live in weeks, closing work faster."
      countNoun="customer films"
      films={films}
      lead={lead}
    />
  );
}
