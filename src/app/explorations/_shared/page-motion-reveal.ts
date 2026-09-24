/* What <DmsMotion> reveals on a page-motion page (page-motion.css). The
 * product pages add each section head's parts: their heads come from many
 * shared components with different wrappers, so the eyebrow, the H2 and the
 * lede are revealed on their own instead of through a head container. */
export const PM_REVEAL_PAGE = "[data-reveal], .hm-hatch";
export const PM_REVEAL =
  PM_REVEAL_PAGE + ", .dms-section:not(.dms-hero, .dms-close) :is(.dms-eyebrow, .dms-h2, .dms-lede)";

/* the industry pages: their section heads are `.md-head` blocks with no
 * data-reveal of their own, so the head itself is registered (and then
 * choreographed like the homepage's split head) */
export const PM_REVEAL_INDUSTRY = PM_REVEAL_PAGE + ", .md-head";
