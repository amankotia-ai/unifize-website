/* ============================================================================
 * plm-proof.tsx - the PLM Customer proof section: the shared film rail
 * (products/_shared/proof-films.tsx) over the Website Customer Videos mirror.
 * Films are the ones whose Notion Module tags touch the PLM modules; the lead
 * card carries the one figure a customer states on film. Re-tagging a video
 * in Notion changes this page on the next sync.
 * ========================================================================== */

import { ProofFilmRail } from "../_shared/proof-films";
import { attestedLead, filmsForModules } from "../_shared/customer-films";

/* Notion Module tags that map to the five PLM modules on this page */
const PLM_FILM_MODULES = [
  "Design Control",
  "Design History File",
  "Traceability Matrix",
  "Risk Management",
  "Change Requests & Orders",
  "Raw Material Validation",
];

/* Wilson Lin, Applechem: product development accelerated by up to 30% */
const PLM_LEAD_WISTIA = "wvpvgqna7b";

export function PlmProofFilms() {
  const lead = attestedLead(PLM_LEAD_WISTIA, {
    stat: "30%",
    statLabel: "faster product development",
    body: (film) =>
      `Product development accelerated by up to 30% on Unifize, attested on film by ${film.person} of ${film.company}.`,
  });

  return (
    <ProofFilmRail
      idPrefix="plm"
      heading="What engineering teams say when the trace holds."
      lede="Short, candid accounts of design control, traceability, risk, and change from the engineers who own the record."
      countNoun="customer films"
      films={filmsForModules(PLM_FILM_MODULES, { exclude: [PLM_LEAD_WISTIA] })}
      lead={lead}
    />
  );
}
