/* ============================================================================
 * qms-proof.tsx - the QMS Customer proof section: the shared film rail
 * (products/_shared/proof-films.tsx) over the Website Customer Videos mirror.
 * Films are the ones whose Notion Module tags touch the QMS modules; the lead
 * card carries the one figure a customer states on film. Re-tagging a video
 * in Notion changes this page on the next sync.
 * ========================================================================== */

import { ProofFilmRail } from "../_shared/proof-films";
import { attestedLead, filmsForModules } from "../_shared/customer-films";

/* Notion Module tags that map to the six QMS modules on this page */
const QMS_FILM_MODULES = [
  "NCs / Defects",
  "CAPAs",
  "Complaints",
  "Audit Management",
  "Supplier Quality",
  "Supplier Corrective Actions (SCAR)",
  "Risk Management",
  "Out of Spec",
];

/* Tedd Carr, The Will-Burt Company: NC closure down 75% in the first month */
const QMS_LEAD_WISTIA = "qp7129voyy";

export function QmsProofFilms() {
  const lead = attestedLead(QMS_LEAD_WISTIA, {
    stat: "75%",
    statLabel: "faster NC closure",
    body: (film) =>
      `Non-conformance closure time down 75% within the first month on Unifize, attested on film by ${film.person} of ${film.company}.`,
  });

  return (
    <ProofFilmRail
      idPrefix="qms"
      heading="What quality teams say when the proof stays on the record."
      lede="Short, candid accounts of non-conformances, CAPAs, audits, and supplier quality from the people who run them."
      countNoun="customer films"
      films={filmsForModules(QMS_FILM_MODULES, { exclude: [QMS_LEAD_WISTIA] })}
      lead={lead}
    />
  );
}
