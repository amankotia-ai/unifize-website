/* ============================================================================
 * industry-template-modern — local data shim.
 *
 * This route is a pure REDESIGN of /explorations/industry-template: same
 * content, new skin. To keep a single source of truth for every copy string
 * and data value, we re-export the champion's page-local data rather than
 * copying it. The canonical modules (medical-devices-canonical.ts,
 * md-module-map.ts) are imported directly where needed.
 *
 * The ONLY divergence: this modern route wires its two ingress surfaces to the
 * new product-page-style template pages (see /explorations/personas/* and
 * /explorations/triggers/*), so PERSONAS + TRIGGERS are re-exported with those
 * two hrefs overridden. Only the two flagship template pages exist today, so
 * only those two cards get live links; every other card stays honest (no dead
 * ends), and the champion route keeps its own destinations untouched.
 * ========================================================================== */
export * from "../industry-template/industry-data";

import { PERSONAS as BASE_PERSONAS, TRIGGERS as BASE_TRIGGERS } from "../industry-template/industry-data";

/* persona key -> new persona template page */
const PERSONA_PAGES: Record<string, string> = {
  quality: "/explorations/personas/quality-manager",
};
/* trigger name -> new trigger template page */
const TRIGGER_PAGES: Record<string, string> = {
  "FDA Form 483 observation issued": "/explorations/triggers/fda-483",
};

export const PERSONAS = BASE_PERSONAS.map((p) =>
  PERSONA_PAGES[p.key] ? { ...p, href: PERSONA_PAGES[p.key] } : p,
);
export const TRIGGERS = BASE_TRIGGERS.map((t) =>
  TRIGGER_PAGES[t.name] ? { ...t, href: TRIGGER_PAGES[t.name] } : t,
);

/* ============================================================================
 * PROOF FILMS — real Medical Devices customer videos, from the Notion
 * "Website Customer Videos" DB (collection 7fdba279, synced 2026-08-08).
 * 10 of 65 Medical Devices films, picked for page relevance: implementation
 * speed, supplier quality, traceability/lot tracking, management review,
 * change control (the page thesis), FDA audits, DHF, NCs, and the two
 * engineering-seat films. Every row is Live + Web Use Approved in the DB.
 * Attribution governance: company/role shown ONLY where the DB attests them
 * (Clarissa Archer, Michael Hogan · Harmonic Bionics); Denis Machoka's rows
 * carry no attested company, so his cards show the name alone. Posters are
 * the Webflow CMS thumbnails; links go to the live unifize.com content page;
 * wistia ids kept for future inline embeds.
 * ========================================================================== */
export type MdProofFilm = {
  url: string;
  title: string;
  person: string;
  role?: string;
  company?: string;
  modules: string[];
  duration: string;
  wistia: string;
  poster: string;
};

const WF = "https://cdn.prod.website-files.com/6475b503eba1a8c129c44339/";
const CONTENT = "https://www.unifize.com/content/";

export const MD_PROOF_FILMS: MdProofFilm[] = [
  {
    url: `${CONTENT}how-unifizes-no-code-configuration-speeds-up-implementation`,
    title: "How Unifize's no-code configuration speeds up implementation",
    person: "Clarissa Archer",
    company: "Harmonic Bionics",
    modules: ["No-code Processes"],
    duration: "02:32",
    wistia: "pu02wkm0a4",
    poster: `${WF}657aabe7ab5569d13be763d0_HB-CA-07%20Speed%20up%20implementation%20with%20No-Code.png`,
  },
  {
    url: `${CONTENT}enabling-supplier-quality-on-unifize`,
    title: "Enabling Supplier Quality on Unifize",
    person: "Clarissa Archer",
    company: "Harmonic Bionics",
    modules: ["Supplier Quality", "SCAR"],
    duration: "03:23",
    wistia: "44wjlgpqqt",
    poster: `${WF}657aa4ca021f925e8be65e62_HB-CA-17%20Enabling%20supplier%20quality.png`,
  },
  {
    url: `${CONTENT}closing-the-loop-traceability-and-lot-tracking-using-unifize`,
    title: "Closing the loop: Traceability and lot tracking using Unifize",
    person: "Denis Machoka",
    modules: ["Traceability Matrix", "Electronic Lot Records"],
    duration: "01:36",
    wistia: "wmltnu3t49",
    poster: `${WF}657aa8a2ab5569d13be4ac3f_HB-DM-18%20-%20Closing%20the%20loop_%20Traceability%20and%20lot%20tracking%20using%20Unifize.png`,
  },
  {
    url: `${CONTENT}using-dashboards-on-unifize-to-make-management-review-meetings-easier`,
    title: "Using dashboards on Unifize to make Management Review Meetings easier",
    person: "Denis Machoka",
    modules: ["Dashboards", "CAPAs"],
    duration: "01:32",
    wistia: "1dqmvmlupm",
    poster: `${WF}657aa8b3ab5569d13be4b919_HB-DM-17%20-%20Using%20dashboards%20on%20Unifize%20to%20make%20Management%20Review%20Meetings%20Easier.png`,
  },
  {
    url: `${CONTENT}streamlining-change-control-on-unifize`,
    title: "Streamlining Change Control on Unifize",
    person: "Clarissa Archer",
    company: "Harmonic Bionics",
    modules: ["Change Control"],
    duration: "05:37",
    wistia: "juwzkpk7sw",
    poster: `${WF}657aa52c4b198b064ebbdcd7_HB-CA-13%20Streamlining%20change%20control.webp`,
  },
  {
    url: `${CONTENT}how-to-make-facing-fda-audits-easy`,
    title: "How to make facing FDA audits easy",
    person: "Clarissa Archer",
    company: "Harmonic Bionics",
    modules: ["Supplier Quality"],
    duration: "01:33",
    wistia: "de8le15g7a",
    poster: `${WF}657aabb34465b7e73ac07e55_HB-CA-11%20Facing%20FDA%20audits%20easily.png`,
  },
  {
    url: `${CONTENT}managing-your-design-history-file-on-unifize`,
    title: "Managing your Design History File on Unifize",
    person: "Clarissa Archer",
    company: "Harmonic Bionics",
    modules: ["Design History File"],
    duration: "03:20",
    wistia: "ue3xmg5nol",
    poster: `${WF}657aa495d210fc4265828c21_HB-CA-20%20Managing%20your%20DHF%20on%20Unifize.png`,
  },
  {
    url: `${CONTENT}using-unifize-to-track-non-conformances-and-deviations`,
    title: "Using Unifize to track Non-Conformances and Deviations",
    person: "Clarissa Archer",
    company: "Harmonic Bionics",
    modules: ["NCs / Defects", "CAPAs"],
    duration: "03:16",
    wistia: "pox8uvli70",
    poster: `${WF}657aa50f8eedc067b2bac308_HB-CA-15%20Tracking%20non-conformances%20and%20deviations.png`,
  },
  {
    url: `${CONTENT}managing-change-on-unifize`,
    title: "How we manage change on Unifize",
    person: "Michael Hogan",
    role: "Mechanical Engineer",
    company: "Harmonic Bionics",
    modules: ["Change Control", "Design History File"],
    duration: "02:11",
    wistia: "h03uca847z",
    poster: `${WF}657aaaf6eeb9f695a761f696_HB-MH-09%20-%20How%20we%20manage%20change%20on%20Unifize.png`,
  },
  {
    url: `${CONTENT}unifize-as-an-engineering-system-of-record`,
    title: "How we use Unifize as an engineering system of record",
    person: "Michael Hogan",
    role: "Mechanical Engineer",
    company: "Harmonic Bionics",
    modules: ["Change Requests & Orders", "Document Management"],
    duration: "01:23",
    wistia: "xwv3jvzgzv",
    poster: `${WF}657aab4cd685df933c53ffe0_HB-MH-08%20-%20How%20we%20use%20Unifize%20as%20an%20engineering%20system%20of%20record.webp`,
  },
];
