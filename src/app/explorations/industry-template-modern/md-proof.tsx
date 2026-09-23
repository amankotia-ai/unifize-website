/* ============================================================================
 * md-proof.tsx - the Medical Devices Customer proof on the rails (23 Sep
 * 2026): the homepage's reel of customer stills (home/home-proof-reel.tsx)
 * with a medical-device roster, the same section the DMS and platform pages
 * now close on. It replaces the film rail (proof-films.tsx, kept for
 * reference) so all four pages read the same.
 *
 * The roster is drawn from MD_PROOF_FILMS (industry-data.ts), in the page's
 * order: change control (the thesis), the DHF, NCs and deviations, FDA
 * audits, traceability, supplier quality. Each fact restates the film's own
 * title; no figure appears that the film does not make. Governance runs
 * through customer-films.ts, so an unapproved or unpublished row simply
 * stops rendering, and its fact with it. Nothing counts the inventory.
 * ========================================================================== */

import { filmByWistia } from "../products/_shared/customer-films";
import { HomeProofReel, type ProofStill } from "../home/home-proof-reel";
import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";

/* the one signed figure leads the reel as a brand-blue cell (23 Sep 2026,
 * carried over from the quality Solutions page), captioned in the stills'
 * grammar: who, the figure in one line, a short provenance */
const LEAD = {
  label: MD_PROOF.stat.attribution,
  stat: `${MD_PROOF.stat.pct}%`,
  statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
  who: "Medical-device manufacturer",
  body: `$${MD_PROOF.stat.recovered.toLocaleString("en-US")} a year recovered against a signed $${MD_PROOF.stat.baseline.toLocaleString("en-US")} baseline`,
  footnote: "Signed baseline, anonymized",
};

const STILLS: Array<{ wistia: string; fact: string }> = [
  { wistia: "juwzkpk7sw", fact: "Change control, streamlined on one record" }, /* Clarissa Archer, Harmonic Bionics */
  { wistia: "h03uca847z", fact: "Engineering change managed in one place" }, /* Michael Hogan, Harmonic Bionics */
  { wistia: "ue3xmg5nol", fact: "The Design History File, kept current" }, /* Clarissa Archer, Harmonic Bionics */
  { wistia: "pox8uvli70", fact: "Non-conformances and deviations tracked" }, /* Clarissa Archer, Harmonic Bionics */
  { wistia: "de8le15g7a", fact: "FDA audits, faced without the scramble" }, /* Clarissa Archer, Harmonic Bionics */
  { wistia: "wmltnu3t49", fact: "Traceability and lot tracking, loop closed" }, /* Denis Machoka */
  { wistia: "44wjlgpqqt", fact: "Supplier quality run on the same system" }, /* Clarissa Archer, Harmonic Bionics */
];

export function MdProofReel() {
  const stills: ProofStill[] = [];
  for (const still of STILLS) {
    const film = filmByWistia(still.wistia);
    if (film) stills.push({ ...film, fact: still.fact });
  }
  if (stills.length === 0) return null;

  return (
    <HomeProofReel
      eyebrowN={7}
      heading="Device teams, in their own words."
      lede="Short, candid accounts of change control, the DHF, and FDA audits from the engineers and quality leads doing the work."
      stills={stills}
      lead={LEAD}
      allHref="/explorations/resources/testimonials"
    />
  );
}
