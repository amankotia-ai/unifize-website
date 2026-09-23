/* ============================================================================
 * mes-proof.tsx - the MES Customer proof section over the Website Customer
 * Videos mirror (Notion-governed; synced by scripts/notion/sync-sources.mjs).
 *
 * Two renderings:
 *   - MesProofReel (23 Sep 2026, the rails port): the homepage's reel of
 *     customer stills (home/home-proof-reel.tsx) with an MES roster, in the
 *     order a lot moves: release, incoming material, finished-good release,
 *     traceability, recall, and the before/after of a floor process. Each
 *     fact is what the film is titled; no figure appears that the film does
 *     not make. Nothing counts the inventory (locked site rule).
 *   - MesProofFilms: the earlier shared film rail, kept for reference.
 *
 * Governance is unchanged: every film goes through customer-films.ts, so an
 * unapproved or unpublished row simply stops rendering, and its fact with it.
 * ========================================================================== */

import { ProofFilmRail } from "../_shared/proof-films";
import { attestedLead, filmByWistia, filmsForModules } from "../_shared/customer-films";
import { HomeProofReel, type ProofStill } from "../../home/home-proof-reel";

/* The reel roster, keyed by Wistia id. */
const STILLS: Array<{ wistia: string; fact: string }> = [
  {
    wistia: "c0rsc1e43v", /* Jesse Kolstad, Biovation Labs */
    fact: "Lot release time, down to minutes",
  },
  {
    wistia: "vh4sj0ytie", /* Clarissa Archer, Harmonic Bionics */
    fact: "Incoming material and lot tracking on one record",
  },
  {
    wistia: "dwea6mfuoq", /* Mikala Hukka */
    fact: "Finished-good lot release, from half a day to ten minutes",
  },
  {
    wistia: "wmltnu3t49", /* Denis Machoka */
    fact: "Traceability and lot tracking that close the loop",
  },
  {
    wistia: "rsqybjoajw", /* Jesse Kolstad, Biovation Labs */
    fact: "Mock recall time, down to 18 minutes",
  },
  {
    wistia: "4kbdugixfw", /* Tedd Carr, The Will-Burt Company */
    fact: "What happens on the floor, heard in real time",
  },
];

export function MesProofReel() {
  const stills: ProofStill[] = [];
  for (const still of STILLS) {
    const film = filmByWistia(still.wistia);
    if (film) stills.push({ ...film, fact: still.fact });
  }
  if (stills.length === 0) return null;

  return (
    <HomeProofReel
      eyebrowN={6}
      heading="What operations teams say when the record builds itself."
      lede="Short, candid accounts of lot release, travellers, and floor-level traceability from the people running production."
      stills={stills}
      allHref="/resources/testimonials"
    />
  );
}

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
