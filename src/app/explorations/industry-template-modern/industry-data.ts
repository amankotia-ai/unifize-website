/* ============================================================================
 * industry-template-modern — local data shim.
 *
 * This route is a pure REDESIGN of /explorations/industry-template: same
 * content, new skin. To keep a single source of truth for every copy string
 * and data value, we re-export the champion's page-local data rather than
 * copying it. The canonical modules (medical-devices-canonical.ts,
 * md-module-map.ts) are imported directly where needed.
 * ========================================================================== */
export * from "../industry-template/industry-data";
