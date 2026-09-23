/* ----------------------------------------------------------------------------
 * nav-data - the single source of truth for the site's information
 * architecture: Platform · Products · Solutions · Industries · About us ·
 * Resources. Consumed by both site headers (itm + dms kits) for the nav
 * mega-panels and by the shared SiteFooter for the full site map, so the
 * header, the footer and every dropdown stay in lock-step.
 * -------------------------------------------------------------------------- */

export type IconName =
  | "qms" | "dms" | "mes" | "plm"
  | "flask" | "droplet" | "cube"
  | "stories" | "case" | "blog"
  | "shield" | "ledger" | "truck"
  | "seal" | "pallet" | "compass";
export type NavLink = { label: string; href: string; desc?: string; code?: string; icon?: IconName };
export type NavCol = { heading: string; icon: IconName; items: NavLink[] };
export type NavFoot = { title: string; desc: string; href: string; cta: string };
export type NavItem = {
  label: string;
  href?: string;
  menu?: "products" | "industries" | "resources" | "domains";
  items?: NavLink[];
  cols?: NavCol[];
  foot?: NavFoot;
};

/* solid glyphs (24-grid, filled geometry). Detail is carved out of the
 * silhouette (evenodd holes, or opposite-winding subpaths where shapes union),
 * so every mark stays one currentColor and works on any plate. */
export const NAV_ICONS: Record<IconName, React.ReactNode> = {
  /* shield, check carved out */
  qms: (<path fillRule="evenodd" d="M12 2.6l7.4 2.8v5.1c0 4.7-3.1 8.1-7.4 9.7-4.3-1.6-7.4-5-7.4-9.7V5.4L12 2.6zM9.25 10.65l1.45 1.45 4.05-4.2 1.6 1.5-5.65 5.8-2.95-3.05z" />),
  /* document with clipped fold corner, two record lines carved out */
  dms: (<path fillRule="evenodd" d="M6.2 2.8h7l5.6 5.6v12.8H6.2V2.8zM9 12.4h6v1.5H9v-1.5zm0 3.2h6v1.5H9v-1.5z" />),
  /* gear: body + 8 teeth union, hub carved by opposite winding */
  mes: (<path d="M19.2 12A7.2 7.2 0 1 1 4.8 12A7.2 7.2 0 1 1 19.2 12z M18.8 10.45h3v3.1h-3z M17.9 15.71l2.13 2.12-2.2 2.2-2.12-2.13z M13.55 18.8v3h-3.1v-3z M8.29 17.9l-2.12 2.13-2.2-2.2 2.13-2.12z M5.2 13.55h-3v-3.1h3z M6.1 8.29L3.97 6.17l2.2-2.2 2.12 2.13z M10.45 5.2v-3h3.1v3z M15.71 6.1l2.12-2.13 2.2 2.2-2.13 2.12z M15.1 12A3.1 3.1 0 1 0 8.9 12A3.1 3.1 0 1 0 15.1 12z" />),
  /* lifecycle loop with a solid station node bridging the band */
  plm: (<path d="M19.2 12A7.2 7.2 0 1 1 4.8 12A7.2 7.2 0 1 1 19.2 12z M16.6 12A4.6 4.6 0 1 0 7.4 12A4.6 4.6 0 1 0 16.6 12z M14.7 6.1A2.7 2.7 0 1 1 9.3 6.1A2.7 2.7 0 1 1 14.7 6.1z" />),
  flask: (<path d="M9.9 3.2h4.2v5.2l4.8 9a2.1 2.1 0 0 1-1.9 3.1H7a2.1 2.1 0 0 1-1.9-3.1l4.8-9V3.2z" />),
  droplet: (<path d="M12 3.4c2.8 3.6 5 6.2 5 9a5 5 0 0 1-10 0c0-2.8 2.2-5.4 5-9z" />),
  /* cube with the top face carved out */
  cube: (<path fillRule="evenodd" d="M12 2.9l7.9 4.5v9.2L12 21.1l-7.9-4.5V7.4L12 2.9zm0 1.7L16.9 7.4 12 10.2 7.1 7.4 12 4.6z" />),
  /* video card, play carved out */
  stories: (<path fillRule="evenodd" d="M3.4 5.4h17.2v13.2H3.4V5.4zm6.8 3.9l4.6 2.7-4.6 2.7V9.3z" />),
  /* bar chart on a solid baseline */
  case: (<path d="M4.6 10.6h3.6v7.8H4.6z M10.2 5.9h3.6v12.5h-3.6z M15.8 8.4h3.6v10h-3.6z M4.6 18.4h14.8v1.6H4.6z" />),
  /* pen with a separated cap */
  blog: (<path d="M4.5 19.5l1-3.9 9.8-9.8 2.9 2.9-9.8 9.8z M16.1 5l1.8-1.8 2.9 2.9-1.8 1.8z" />),
  shield: (<path fillRule="evenodd" d="M12 2.6l7.4 2.8v5.1c0 4.7-3.1 8.1-7.4 9.7-4.3-1.6-7.4-5-7.4-9.7V5.4L12 2.6zM9.25 10.65l1.45 1.45 4.05-4.2 1.6 1.5-5.65 5.8-2.95-3.05z" />),
  /* clipboard: board + clip union, entry lines carved by opposite winding */
  ledger: (<path d="M5.6 4h12.8v17H5.6z M9 2.4h6v3.2H9z M8.4 9.2v1.4h7.2V9.2z M8.4 12.4v1.4h7.2v-1.4z M8.4 15.6v1.4H13v-1.4z" />),
  truck: (<><path d="M2.8 6h11.6v9.4H2.8z M14.4 9H18l3.2 3.2v3.2h-6.8z" /><circle cx="7" cy="17.3" r="1.9" /><circle cx="17.3" cy="17.3" r="1.9" /></>),
  /* rosette seal (quality): twelve-point scalloped disc, check carved out,
   * so it does not rhyme with the QMS shield in the next row */
  seal: (<path fillRule="evenodd" d="M12.00 2.30L14.15 3.98L16.85 3.60L17.87 6.13L20.40 7.15L20.02 9.85L21.70 12.00L20.02 14.15L20.40 16.85L17.87 17.87L16.85 20.40L14.15 20.02L12.00 21.70L9.85 20.02L7.15 20.40L6.13 17.87L3.60 16.85L3.98 14.15L2.30 12.00L3.98 9.85L3.60 7.15L6.13 6.13L7.15 3.60L9.85 3.98zM10.75 15.35l5.35-5.45-1.6-1.55-3.75 3.85-1.9-1.9-1.55 1.55z" />),
  /* pallet (operations): two crates on a base, a third stacked, gaps carved
   * so the stack reads as separate lots on hold */
  pallet: (<path d="M8.4 3.6h7.2v6.4H8.4z M3.4 11.4h7.6v6.4H3.4z M13 11.4h7.6v6.4H13z M2.6 19.2h18.8v2.2H2.6z" />),
  /* drafting compass (product development): nub, hinge, two open legs */
  compass: (<path d="M11.2 1.4h1.6v2.4h-1.6z M14.9 5.2A2.9 2.9 0 1 1 9.1 5.2A2.9 2.9 0 1 1 14.9 5.2z M10.8 7.4h2.4L19.6 21h-2.4L12 10.4 6.8 21H4.4z" />),
};

export function NavGlyph({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {NAV_ICONS[name]}
    </svg>
  );
}

export const NAV: NavItem[] = [
  { label: "Platform", href: "/platform" },
  {
    label: "Products",
    menu: "products",
    items: [
      { code: "QMS", label: "Quality management", href: "/products/qms", desc: "CAPA, audits, NCs and change control on one governed thread.", icon: "qms" },
      { code: "DMS", label: "Document management", href: "/products/dms", desc: "Controlled documents, versioning and e-signatures, always audit-ready.", icon: "dms" },
      { code: "MES", label: "Manufacturing execution", href: "/products/mes", desc: "Electronic batch records and shop-floor execution, paperless.", icon: "mes" },
      { code: "PLM", label: "Product lifecycle", href: "/products/plm", desc: "Specs, BOMs and design history from concept to launch.", icon: "plm" },
    ],
  },
  {
    label: "Solutions",
    menu: "domains",
    cols: [
      {
        heading: "Quality & Compliance", icon: "shield", items: [
          { label: "Quality", href: "/domains/quality", desc: "NCs, CAPA and audits on one quality record." },
          { label: "Compliance", href: "/domains/compliance", desc: "Stay inspection-ready against every standard." },
          { label: "Regulatory Affairs", href: "/domains/regulatory-affairs", desc: "Submissions, registrations and regulatory change." },
          // Renamed in the Domains DB on 2026-05-14 (Supplier Quality -> Supplier
          // Management) to widen the buyer door past the Supplier Quality Director
          // to the CPO / Head of Procurement. Slug follows the DB, not the old nav.
          { label: "Supplier Management", href: "/domains/supplier-management", desc: "Qualification, SCARs and supplier performance." },
          { label: "Post-Market & Recall", href: "/domains/post-market-and-recall", desc: "Complaints, adverse events and recalls, closed." },
        ],
      },
      {
        heading: "Governance & Control", icon: "ledger", items: [
          { label: "Change Control", href: "/domains/change-control", desc: "Every change proposed, reviewed and approved." },
          { label: "Document & Records Control", href: "/domains/document-and-records-control", desc: "Controlled documents and records, audit-ready." },
          { label: "Periodic Review & Data Governance", href: "/domains/periodic-review-and-data-governance", desc: "Scheduled reviews and defensible data integrity." },
          { label: "Training & Competency", href: "/domains/training-and-competency", desc: "Role-based training tied to controlled documents." },
          { label: "System & Data Integration Governance", href: "/domains/system-and-data-integration-governance", desc: "Govern the systems and the data between them." },
        ],
      },
      {
        heading: "Operations & Supply Chain", icon: "truck", items: [
          { label: "Operations", href: "/domains/operations", desc: "Run the shop floor without paper or handoffs." },
          { label: "Supply Chain & Planning", href: "/domains/supply-chain-and-planning", desc: "Plan and keep supply aligned to demand." },
          { label: "Procurement & Sourcing", href: "/domains/procurement-and-sourcing", desc: "Source and buy against quality requirements." },
          { label: "Customer Management", href: "/domains/customer-management", desc: "Orders, complaints and commitments, connected." },
          { label: "New Product Development", href: "/domains/new-product-development", desc: "Concept to launch with the design history intact." },
        ],
      },
    ],
    foot: { title: "The Problem, end to end", desc: "See how the solutions connect into one system of record.", href: "/domains", cta: "All solutions" },
  },
  {
    label: "Industries",
    menu: "industries",
    cols: [
      {
        heading: "Life sciences", icon: "flask", items: [
          { label: "Medical Devices", href: "/industries/medical-devices", desc: "Class II & III OEMs and CDMOs" },
          { label: "Pharmaceuticals", href: "/industries/pharmaceuticals", desc: "Commercial sponsors and CDMOs" },
          { label: "Contract Research Orgs", href: "/industries/cro", desc: "GCP clinical trial services" },
          { label: "Laboratories", href: "/industries/laboratories", desc: "ISO/IEC 17025 testing & calibration" },
        ],
      },
      {
        heading: "Process & consumer", icon: "droplet", items: [
          { label: "Chemicals", href: "/industries/chemicals", desc: "Specialty and pharma-supply" },
          { label: "Cosmetics", href: "/industries/cosmetics", desc: "Personal care under MoCRA" },
          { label: "Food Processing", href: "/industries/food-processing", desc: "FSMA and GFSI manufacturers" },
          { label: "Nutritional Supplements", href: "/industries/nutritional-supplements", desc: "21 CFR Part 111 makers" },
        ],
      },
      {
        heading: "Discrete manufacturing", icon: "cube", items: [
          { label: "Automotive", href: "/industries/automotive", desc: "IATF 16949 tiers and suppliers" },
          { label: "Aerospace", href: "/industries/aerospace", desc: "AS9100 and NADCAP suppliers" },
          { label: "Industrial Machinery", href: "/industries/industrial-machinery", desc: "Build-to-order OEMs" },
        ],
      },
    ],
    foot: { title: "See a complete industry page", desc: "Tour how Unifize maps to one industry end to end.", href: "/industries/medical-devices", cta: "Take the tour" },
  },
  { label: "About us", href: "/about" },
  {
    label: "Resources",
    menu: "resources",
    items: [
      { label: "Customer stories", href: "/resources/testimonials", desc: "Video stories by company, industry and module.", icon: "stories" },
      { label: "Case studies", href: "/resources/case-studies", desc: "The backlog, the change, the numbers.", icon: "case" },
      { label: "Blog", href: "/resources/blog", desc: "Field notes on running quality.", icon: "blog" },
    ],
    foot: { title: "The full library", desc: "Every story, study and field note in one place.", href: "/resources", cta: "All resources" },
  },
];
