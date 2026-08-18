/* ============================================================================
 * product-audience.ts - Notion-backed "Who it is for" cards, shared by the
 * product pages (same contract the DMS page established in dms-data.ts).
 *
 * Membership = the Target Personas relation on the page's Products row in
 * src/content/notion/products.json; facts (role name, daily activities) come
 * from the personas mirror. Adding or removing a persona on the product row
 * in Notion adds or removes the card here on the next sync. Presentation
 * (lifecycle span, portrait, route, page-context daily lines) stays
 * page-owned, keyed by persona ID; a persona without an entry still renders
 * from mirror facts with a fallback portrait. Personas missing name or daily
 * activities are held back rather than rendered broken.
 * ========================================================================== */
import productsMirror from "@/content/notion/products.json";
import personasMirror from "@/content/notion/personas.json";

export type PersonaPresentation = {
  /* the lifecycle span this role owns, in the page's own lifecycle words */
  owns?: string;
  img?: string;
  href?: string;
  /* copy-tightened daily lines for this page's context; falls back to the
   * mirror's Daily Activities facts */
  daily?: string[];
};

export type AudiencePersona = {
  role: string;
  owns: string;
  daily: string[];
  img: string;
  href?: string;
};

type PersonaMirrorRow = {
  pageId: string;
  id: string;
  name: string;
  daily: string[];
};

const FALLBACK_PORTRAIT = "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png";

/* The mirror keeps Daily Activities as the sync wrote them: newline-split
 * when the Notion field has line breaks, one semicolon-joined line when it
 * does not. Normalize both into short list items. */
const splitDaily = (daily: string[]): string[] =>
  daily
    .flatMap((line) => line.split(";"))
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1));

export function buildAudiencePersonas(
  productId: string,
  presentation: Record<string, PersonaPresentation>,
): AudiencePersona[] {
  const productRow = productsMirror.find((product) => product.id === productId);
  return (productRow?.personas ?? [])
    .map((pageId) => (personasMirror as PersonaMirrorRow[]).find((p) => p.pageId === pageId))
    .filter((p): p is PersonaMirrorRow => Boolean(p && p.name && p.daily.length > 0))
    .map((p) => {
      const pres = presentation[p.id] ?? {};
      return {
        role: p.name,
        owns: pres.owns ?? "",
        daily: (pres.daily ?? splitDaily(p.daily)).slice(0, 3),
        img: pres.img ?? FALLBACK_PORTRAIT,
        href: pres.href,
      };
    });
}
