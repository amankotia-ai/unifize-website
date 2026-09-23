/* ============================================================================
 * platform-proof.tsx - 06 · customer proof on the platform page.
 *
 * 22 Sep 2026 (Abhishek: "use the new testimonial section we have used on
 * the homepage"): the section is the homepage's reel (home/home-proof-reel
 * .tsx), a charcoal band with one row of customer stills scrolling past the
 * rails, each captioned with the one fact that customer attests. The shared
 * ProofFilmRail is no longer used here.
 *
 * Every still is a Live, web-approved film from the Website Customer Videos
 * mirror (governance in products/_shared/customer-films); a film that is
 * ever unapproved drops out. Facts are the film's own title or the figure
 * the customer states on camera, never a new claim. Tedd Carr's 75% film
 * (qp7129voyy) is not repeated here: it carries the measured section.
 * ========================================================================== */

import { HomeProofReel, type ProofStill } from "../home/home-proof-reel";
import { filmByWistia } from "../products/_shared/customer-films";

const STILLS: Array<{ wistia: string; fact: string }> = [
  { wistia: "zna343d4uv", fact: "A collaborative eQMS live in 4 weeks" }, /* Harmonic Bionics */
  { wistia: "r8sesxmui9", fact: "Moved off MasterControl" }, /* Jesse Kolstad, Biovation Labs */
  { wistia: "xwv3jvzgzv", fact: "Unifize as the engineering system of record" }, /* Michael Hogan, Harmonic Bionics */
  { wistia: "rsqybjoajw", fact: "Mock recall done in 18 minutes" }, /* Jesse Kolstad, Biovation Labs */
  { wistia: "pu02wkm0a4", fact: "Configured in house, no IT tickets" }, /* Harmonic Bionics */
  { wistia: "1dqmvmlupm", fact: "Management review straight from dashboards" },
  { wistia: "zrvex9chm8", fact: "Supplier documents without the chasing" }, /* Applechem */
  { wistia: "1g31maaxtb", fact: "Smaller groups, 70% faster actions" },
];

export function PlatformProofFilms() {
  const stills: ProofStill[] = [];
  for (const still of STILLS) {
    const film = filmByWistia(still.wistia);
    if (film) stills.push({ ...film, fact: still.fact });
  }
  if (stills.length === 0) return null;

  return (
    <HomeProofReel
      eyebrowN={6}
      heading="Real teams, on camera, on the record."
      lede="Quality directors, engineers, and operators on their own before and after: off legacy systems, live in weeks, closing work faster."
      stills={stills}
      allHref="/explorations/resources/testimonials"
    />
  );
}
