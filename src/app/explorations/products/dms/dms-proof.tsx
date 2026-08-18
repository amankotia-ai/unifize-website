/* ============================================================================
 * dms-proof.tsx - the DMS Customer proof section: the shared film rail
 * (products/_shared/proof-films.tsx) over the Website Customer Videos mirror
 * (Notion-governed; synced by scripts/notion/sync-sources.mjs). Films are the
 * ones whose Notion Module tags touch the DMS modules. The lead card keeps
 * the one signed, customer-attested figure (MD_PROOF). Used by the DMS page
 * and the stylized variant.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import { ProofFilmRail } from "../_shared/proof-films";
import { filmsForModules } from "../_shared/customer-films";
import { dmsCopy } from "./dms-copy";

const usd = (n: number) => "$" + n.toLocaleString("en-US");

/* Notion Module tags that map to the DMS modules on this page */
const DMS_FILM_MODULES = [
  "Document Management",
  "Approval Workflows",
  "Change Control",
  "Training",
];

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
