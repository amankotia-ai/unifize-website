/* ============================================================================
 * dms-proof.tsx - the DMS Customer proof section over the Website Customer
 * Videos mirror (Notion-governed; synced by scripts/notion/sync-sources.mjs).
 *
 * Two renderings:
 *   - DmsProofReel (22 Sep 2026, the rails wave): the homepage's reel of
 *     customer stills (home/home-proof-reel.tsx) with a DMS roster, one film
 *     per DMS module beat: training on the right version, approvals that no
 *     longer linger, change control, audits, compliance, and the case for a
 *     collaborative system at all. Under each still, the one thing that
 *     customer attests, taken from the film's title or transcript
 *     (src/content/webflow/video-transcripts.json). Nothing counts the
 *     inventory (locked site rule).
 *   - DmsProofFilms: the earlier shared film rail (products/_shared/
 *     proof-films.tsx), kept for the sibling pages' reference.
 *
 * Governance is unchanged: every film goes through customer-films.ts, so an
 * unapproved or unpublished row simply stops rendering, and its fact with it.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import { ProofFilmRail } from "../_shared/proof-films";
import { filmByWistia, filmsForModules } from "../_shared/customer-films";
import { HomeProofReel, type ProofStill } from "../../home/home-proof-reel";
import { dmsCopy } from "./dms-copy";

const usd = (n: number) => "$" + n.toLocaleString("en-US");

/* Notion Module tags that map to the DMS modules on this page */
const DMS_FILM_MODULES = [
  "Document Management",
  "Approval Workflows",
  "Change Control",
  "Training",
];

/* The reel roster, keyed by Wistia id, in DMS order: document control,
 * approvals, change control, audits, compliance, the collaborative case.
 * Each fact is what the film is titled or what the customer says in it; no
 * figure appears here that the film does not make. */
const STILLS: Array<{ wistia: string; fact: string }> = [
  {
    wistia: "qayx823k6h", /* Jesse Kolstad, Biovation Labs */
    fact: "Everyone trained on the right version of every SOP",
  },
  {
    wistia: "p0chdk1ja3", /* Wilson Lin, Applechem */
    fact: "Sign-offs that lingered for weeks now get chased automatically",
  },
  {
    wistia: "8zmhdejn6c", /* Jesse Kolstad, Biovation Labs */
    fact: "Change control that moves faster",
  },
  {
    wistia: "f1hnfv4qc6", /* Wilson Lin, Applechem */
    fact: "Audits handled without the scramble",
  },
  {
    wistia: "s1k1d1xklj", /* Clarissa Archer, Harmonic Bionics */
    fact: "Medical device compliance, reached fast with AI",
  },
  {
    wistia: "n0wdm8afqj", /* Natalie Jones */
    fact: "What breaks without a collaborative eQMS",
  },
];

export function DmsProofReel() {
  const stills: ProofStill[] = [];
  for (const still of STILLS) {
    const film = filmByWistia(still.wistia);
    if (film) stills.push({ ...film, fact: still.fact });
  }
  if (stills.length === 0) return null;

  return (
    <HomeProofReel
      eyebrowN={6}
      heading={dmsCopy("proof.heading", "Results, honestly stated, from quality teams like yours.")}
      lede={dmsCopy("proof.sub", "Short, candid accounts of document control, training, and change management from the people doing the work.")}
      stills={stills}
      allHref="/explorations/resources/testimonials"
    />
  );
}

export function DmsProofFilms() {
  return (
    <ProofFilmRail
      idPrefix="dms"
      heading={dmsCopy("proof.heading", "Results, honestly stated, from quality teams like yours.")}
      lede={dmsCopy("proof.sub", "Short, candid accounts of document control, training, and change management from the people doing the work.")}
      countNoun="customer films"
      films={filmsForModules(DMS_FILM_MODULES)}
      lead={{
        label: "Customer-attested result",
        stat: `${MD_PROOF.stat.pct}%`,
        statLabel: `lower ${MD_PROOF.stat.metric}`,
        body: `${usd(MD_PROOF.stat.recovered)} recovered in year one, against a signed ${usd(MD_PROOF.stat.baseline)} baseline.`,
        footnote: "Signed, verifiable customer baseline",
      }}
    />
  );
}
