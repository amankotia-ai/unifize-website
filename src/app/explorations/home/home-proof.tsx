/* ============================================================================
 * home-proof.tsx - the homepage Customer proof section, 2026-09-22 (late):
 * a reel of customer stills, replacing the stage-and-playlist of earlier the
 * same day (Abhishek: "I don't want a video player and playlist kind of
 * section here"; the reference is Rox's customer reel).
 *
 *   - One row of stills at the poster's native 16:9, scrolling edge to edge,
 *     arrows in the head. Nothing plays inline; each still links to the
 *     customer's story page on unifize.com.
 *   - Under each still: the company, the speaker, and the one fact that
 *     customer attests on film, taken from the film's title or transcript
 *     (src/content/webflow/video-transcripts.json).
 *   - The roster is one film per speaker, cross-functional on purpose:
 *     quality control (manufacturing), quality (supplements), engineering
 *     (medical devices), implementation, executive review, a small cosmetics
 *     manufacturer, and the shop floor.
 *
 * Governance is unchanged: every film goes through customer-films.ts, so an
 * unapproved or unpublished row simply stops rendering, and its fact with it.
 * No inventory counts are rendered (locked site rule).
 * ========================================================================== */

import { HomeProofReel, type ProofStill } from "./home-proof-reel";
import { filmByWistia } from "../products/_shared/customer-films";

/* Facts keyed by Wistia id. Each is what the customer says or the film is
 * titled, in a few words; nothing here is a claim the film does not make. */
const STILLS: Array<{ wistia: string; fact: string }> = [
  {
    wistia: "qp7129voyy", /* Tedd Carr, The Will-Burt Company */
    fact: "NC closure 75% faster in the first month",
  },
  {
    wistia: "rsqybjoajw", /* Jesse Kolstad, Biovation Labs */
    fact: "Mock recall done in 18 minutes",
  },
  {
    wistia: "ml5sr2nkgy", /* Michael Hogan, Harmonic Bionics */
    fact: "Everyone on the same files and the same history",
  },
  {
    wistia: "pu02wkm0a4", /* Clarissa Archer, Harmonic Bionics */
    fact: "Configured in house, no IT tickets",
  },
  {
    wistia: "1dqmvmlupm", /* Denis Machoka */
    fact: "Management review straight from dashboards",
  },
  {
    wistia: "zrvex9chm8", /* Wilson Lin, Applechem */
    fact: "Supplier documents without the chasing",
  },
  {
    wistia: "1g31maaxtb", /* Dave Anderson */
    fact: "Smaller groups, 70% faster actions",
  },
];

export function HomeProofFilms() {
  const stills: ProofStill[] = [];
  for (const still of STILLS) {
    const film = filmByWistia(still.wistia);
    if (film) stills.push({ ...film, fact: still.fact });
  }
  if (stills.length === 0) return null;

  return (
    <HomeProofReel
      eyebrowN={6}
      heading="From the people who stopped paying the coordination tax."
      lede="Real customers, on film. Quality directors, engineers, and operators on their own before and after: off legacy systems, live in weeks, closing work faster."
      stills={stills}
      allHref="/resources/testimonials"
    />
  );
}
