/* ============================================================================
 * home-proof.tsx - the homepage Customer proof section: the shared film rail
 * (products/_shared/proof-films.tsx) over the Website Customer Videos mirror,
 * the same carousel treatment the product pages use. The lead card carries
 * the one figure a customer states on film; the curated head of the rail
 * keeps the quality, operations, and engineering voices the panel asked for
 * (role-coverage finding); the rest fills by module relevance across the
 * suite. Governance lives in customer-films.ts: an unapproved or unpublished
 * row simply stops rendering.
 * ========================================================================== */

import { ProofFilmRail } from "../products/_shared/proof-films";
import {
  attestedLead,
  filmByWistia,
  filmsForModules,
  type CustomerFilm,
} from "../products/_shared/customer-films";

/* Tedd Carr, The Will-Burt Company: NC closure down 75% in the first month */
const LEAD_WISTIA = "qp7129voyy";

/* the curated head of the rail: operations and engineering voices first */
const CURATED_WISTIAS = [
  "rsqybjoajw", /* Jesse Kolstad, Biovation Labs: mock recall down to 18 minutes */
  "xwv3jvzgzv", /* Michael Hogan, Harmonic Bionics: engineering system of record */
];

/* cross-functional module spread so the rail reads as the whole suite */
const HOME_FILM_MODULES = [
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

export function HomeProofFilms() {
  const lead = attestedLead(LEAD_WISTIA, {
    stat: "75%",
    statLabel: "faster NC closure",
    body: (film) =>
      `Non-conformance closure time down 75% within the first month on Unifize, attested on film by ${film.person} of ${film.company}.`,
  });

  const curated = CURATED_WISTIAS
    .map((wistia) => filmByWistia(wistia))
    .filter((film): film is CustomerFilm => film !== null);

  /* fill by module relevance, one film per speaker so the rail reads as
   * many voices rather than one customer's back catalogue */
  const seen = new Set(curated.map((film) => film.person));
  const fill = filmsForModules(HOME_FILM_MODULES, {
    limit: 24,
    exclude: [LEAD_WISTIA, ...CURATED_WISTIAS],
  }).filter((film) => {
    if (seen.has(film.person)) return false;
    seen.add(film.person);
    return true;
  });

  const films = [...curated, ...fill.slice(0, 6)];

  return (
    <ProofFilmRail
      idPrefix="hm"
      eyebrowN={6}
      heading="From the people who stopped paying the coordination tax."
      lede="Real customers, on film. Quality directors, operators, and engineers on their own before and after: off legacy systems, live in weeks, closing work faster."
      countNoun="customer films"
      films={films}
      lead={lead}
    />
  );
}
