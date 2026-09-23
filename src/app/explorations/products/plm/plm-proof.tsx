/* ============================================================================
 * plm-proof.tsx - the PLM Customer proof section over the Website Customer
 * Videos mirror (Notion-governed; synced by scripts/notion/sync-sources.mjs).
 *
 * Two renderings:
 *   - PlmProofReel (23 Sep 2026, the rails port): the homepage's reel of
 *     customer stills with a PLM roster, same treatment as the DMS page.
 *     Under each still, the one thing that customer attests, taken from the
 *     film's title. Nothing counts the inventory (locked site rule).
 *   - PlmProofFilms: the earlier shared film rail, kept for reference.
 *
 * Every film goes through customer-films.ts, so an unapproved or unpublished
 * row simply stops rendering, and its fact with it.
 * ========================================================================== */

import { ProofFilmRail } from "../_shared/proof-films";
import { attestedLead, filmByWistia, filmsForModules } from "../_shared/customer-films";
import { HomeProofReel, type ProofStill } from "../../home/home-proof-reel";
import { plmCopy } from "./plm-copy";

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

/* The reel roster, keyed by Wistia id, in PLM order: the engineering
 * record, the design history file, traceability, the DMR + DHF chain,
 * change, and the development-speed result. Each fact is what the film is
 * titled; no figure appears here that the film does not make. */
const STILLS: Array<{ wistia: string; fact: string }> = [
  {
    wistia: "xwv3jvzgzv", /* Michael Hogan, Harmonic Bionics */
    fact: "Unifize as the engineering system of record",
  },
  {
    wistia: "ue3xmg5nol", /* Clarissa Archer, Harmonic Bionics */
    fact: "The Design History File, managed on one record",
  },
  {
    wistia: "drmp9dgyf9", /* Jesse Kolstad, Biovation Labs */
    fact: "Traceability that supports better decisions",
  },
  {
    wistia: "pvf4lw69q4", /* Denis Machoka */
    fact: "The DMR and DHF, connected",
  },
  {
    wistia: "qbj2id6s7m", /* Mikala Hukka */
    fact: "Change requests, streamlined",
  },
  {
    wistia: PLM_LEAD_WISTIA, /* Wilson Lin, Applechem */
    fact: "Product development accelerated by up to 30%",
  },
];

export function PlmProofReel() {
  const stills: ProofStill[] = [];
  for (const still of STILLS) {
    const film = filmByWistia(still.wistia);
    if (film) stills.push({ ...film, fact: still.fact });
  }
  if (stills.length === 0) return null;

  return (
    <HomeProofReel
      eyebrowN={6}
      heading={plmCopy("proof.heading", "What engineering teams say when the trace holds.")}
      lede={plmCopy("proof.sub", "Short, candid accounts of design control, traceability, risk, and change from the engineers who own the record.")}
      stills={stills}
      allHref="/explorations/resources/testimonials"
    />
  );
}

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
