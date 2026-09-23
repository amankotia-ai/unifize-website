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
  { slug: "medical-devices", label: "Medical devices", href: "/industries/medical-devices" },
  { slug: "pharmaceuticals", label: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
  { slug: "chemicals", label: "Chemicals", href: "/industries/chemicals" },
  { slug: "cosmetics", label: "Cosmetics", href: "/industries/cosmetics" },
  { slug: "laboratories", label: "Laboratories", href: "/industries/laboratories" },
  { slug: "automotive", label: "Automotive", href: "/industries/automotive" },
  { slug: "aerospace", label: "Aerospace", href: "/industries/aerospace" },
  { slug: "food-processing", label: "Food processing", href: "/industries/food-processing" },
  { slug: "nutritional-supplements", label: "Nutritional supplements", href: "/industries/nutritional-supplements" },
  { slug: "industrial-machinery", label: "Industrial machinery", href: "/industries/industrial-machinery" },
  { slug: "cro", label: "Contract research orgs", href: "/industries/cro" },
];
