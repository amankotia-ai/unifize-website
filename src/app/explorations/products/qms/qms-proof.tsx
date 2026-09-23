/* ============================================================================
 * qms-proof.tsx - the QMS Customer proof section: the shared film rail
 * (products/_shared/proof-films.tsx) over the Website Customer Videos mirror.
 * Films are the ones whose Notion Module tags touch the QMS modules; the lead
 * card carries the one figure a customer states on film. Re-tagging a video
 * in Notion changes this page on the next sync.
 * ========================================================================== */

import { ProofFilmRail } from "../_shared/proof-films";
import { attestedLead, filmByWistia, filmsForModules } from "../_shared/customer-films";
import { HomeProofReel, type ProofStill } from "../../home/home-proof-reel";

/* The reel roster (23 Sep 2026, the rails port, same reel as the DMS page),
 * keyed by Wistia id in QMS module order: non-conformance, CAPA, audits,
 * supplier quality, recall readiness. Each fact is what the film is titled;
 * no figure appears here that the film does not make. */
const STILLS: Array<{ wistia: string; fact: string }> = [
  { wistia: "qp7129voyy", /* Tedd Carr, The Will-Burt Company */ fact: "Non-conformance closure 75% faster within the first month" },
  { wistia: "pox8uvli70", /* Clarissa Archer, Harmonic Bionics */ fact: "Non-conformances and deviations tracked on one record" },
  { wistia: "9yt9buua6q", /* Wilson Lin, Applechem */ fact: "Corrective actions traced, with visible accountability" },
  { wistia: "czpp4z5i75", /* Jesse Kolstad, Biovation Labs */ fact: "Audits made easier" },
  { wistia: "44wjlgpqqt", /* Clarissa Archer, Harmonic Bionics */ fact: "Supplier quality run on the same system" },
  { wistia: "rsqybjoajw", /* Jesse Kolstad, Biovation Labs */ fact: "Mock recall time down to 18 minutes" },
];

export function QmsProofReel() {
  const stills: ProofStill[] = [];
  for (const still of STILLS) {
    const film = filmByWistia(still.wistia);
    if (film) stills.push({ ...film, fact: still.fact });
  }
  if (stills.length === 0) return null;

  return (
    <HomeProofReel
      eyebrowN={6}
      heading="What quality teams say when the proof stays on the record."
      lede="Short, candid accounts of non-conformances, CAPAs, audits, and supplier quality from the people who run them."
      stills={stills}
      allHref="/explorations/resources/testimonials"
    />
  );
}

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
