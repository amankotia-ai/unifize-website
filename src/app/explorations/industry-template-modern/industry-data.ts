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
