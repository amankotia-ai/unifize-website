/* ============================================================================
 * The canonical list of industry pages, single-sourced so the footer nav (and
 * anything else that needs the full set) stays in step as industries are added.
 * The reference Medical Devices instance lives at its own route; every other
 * industry is an instance of the _shared kit under /explorations/industries/.
 * Order = the Notion Site Pages list order.
 * ========================================================================== */

export interface IndustryLink {
  slug: string;
  label: string;
  href: string;
}

export const ALL_INDUSTRIES: IndustryLink[] = [
  { slug: "medical-devices", label: "Medical devices", href: "/explorations/industry-template-modern" },
  { slug: "pharmaceuticals", label: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals" },
  { slug: "chemicals", label: "Chemicals", href: "/explorations/industries/chemicals" },
  { slug: "cosmetics", label: "Cosmetics", href: "/explorations/industries/cosmetics" },
  { slug: "laboratories", label: "Laboratories", href: "/explorations/industries/laboratories" },
  { slug: "automotive", label: "Automotive", href: "/explorations/industries/automotive" },
  { slug: "aerospace", label: "Aerospace", href: "/explorations/industries/aerospace" },
  { slug: "food-processing", label: "Food processing", href: "/explorations/industries/food-processing" },
  { slug: "nutritional-supplements", label: "Nutritional supplements", href: "/explorations/industries/nutritional-supplements" },
  { slug: "industrial-machinery", label: "Industrial machinery", href: "/explorations/industries/industrial-machinery" },
  { slug: "cro", label: "Contract research orgs", href: "/explorations/industries/cro" },
];
