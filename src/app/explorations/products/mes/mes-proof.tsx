/* ============================================================================
 * mes-proof.tsx - the MES Customer proof section: the shared film rail
 * (products/_shared/proof-films.tsx) over the Website Customer Videos mirror.
 * Films are the ones whose Notion Module tags touch the MES modules; the lead
 * card carries the one figure a customer states on film. Re-tagging a video
 * in Notion changes this page on the next sync.
 * ========================================================================== */

import { ProofFilmRail } from "../_shared/proof-films";
import { attestedLead, filmsForModules } from "../_shared/customer-films";

/* Notion Module tags that map to the five MES modules on this page */
const MES_FILM_MODULES = [
  "Work Orders & Routing",
  "Electronic Lot Records",
  "Device Manufacturing Record",
  "Finished Good",
  "Preventive Maintenance",
  "Calibration Management",
  "Out of Spec",
  "Mock Recall",
];

/* Mikala Hukka: finished-good lot release from half a day to 10 minutes.
 * Her company is not attested in the mirror's Company column, so the card
 * attributes the person only. */
const MES_LEAD_WISTIA = "dwea6mfuoq";

export function MesProofFilms() {
  const lead = attestedLead(MES_LEAD_WISTIA, {
    stat: "10 min",
    statLabel: "finished-good lot release",
    body: (film) =>
      `Finished-good lot release down from half a day to ten minutes, attested on film by ${film.person}${film.company ? ` of ${film.company}` : ""}.`,
  });

  return (
    <ProofFilmRail
      idPrefix="mes"
      heading="What operations teams say when the record builds itself."
      lede="Short, candid accounts of lot release, travellers, and floor-level traceability from the people running production."
      countNoun="customer films"
      films={filmsForModules(MES_FILM_MODULES, { exclude: [MES_LEAD_WISTIA] })}
      lead={lead}
    />
  );
}
