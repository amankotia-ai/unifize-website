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
  | "shield" | "ledger" | "truck";
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

/* line-work glyphs (24-grid, 1.6 stroke) matching the system's data marks */
export const NAV_ICONS: Record<IconName, React.ReactNode> = {
  qms: (<><path d="M12 3.2l6.8 2.6v4.8c0 4.3-2.9 7.4-6.8 8.7-3.9-1.3-6.8-4.4-6.8-8.7V5.8z" /><path d="M8.9 11.8l2.1 2.1 4.1-4.3" /></>),
  dms: (<><path d="M6.5 3.2h6.5l4.5 4.5V20.8H6.5z" /><path d="M13 3.2v4.5h4.5" /><path d="M9 12.5h6M9 15.5h6" /></>),
  mes: (<><circle cx="12" cy="12" r="3.1" /><path d="M12 4.2v2M12 17.8v2M4.2 12h2M17.8 12h2M6.5 6.5l1.4 1.4M16.1 16.1l1.4 1.4M17.5 6.5l-1.4 1.4M7.9 16.1l-1.4 1.4" /></>),
  plm: (<><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" /><path d="M19.8 4.5v4h-4" /></>),
  flask: (<><path d="M9.5 3.2h5M10.6 3.2v5.3L6 17a2 2 0 0 0 1.8 2.9h8.4A2 2 0 0 0 18 17l-4.6-8.5V3.2" /><path d="M8 14.6h8" /></>),
  droplet: (<path d="M12 3.4c2.8 3.6 5 6.2 5 9a5 5 0 0 1-10 0c0-2.8 2.2-5.4 5-9z" />),
  cube: (<><path d="M12 3.4l7.4 4.2v8.8L12 20.6 4.6 16.4V7.6z" /><path d="M12 11.8v8.8M4.6 7.6L12 11.8l7.4-4.2" /></>),
  stories: (<><rect x="3.5" y="5.5" width="17" height="13" /><path d="M10 9.6l4.4 2.4L10 14.4z" /></>),
  case: (<><path d="M4 19.5h16" /><path d="M7 19.5v-5.5M12 19.5V8M17 19.5v-3.5" /></>),
  blog: (<><path d="M4.6 19.4l1-3.8L15.5 5.7l2.8 2.8L8.4 18.4z" /><path d="M13.6 7.6l2.8 2.8" /></>),
  shield: (<><path d="M12 3.2l6.8 2.6v4.8c0 4.3-2.9 7.4-6.8 8.7-3.9-1.3-6.8-4.4-6.8-8.7V5.8z" /><path d="M8.9 11.8l2.1 2.1 4.1-4.3" /></>),
  ledger: (<><rect x="5" y="3.6" width="14" height="16.8" /><path d="M9 3.6V2.8h6v0.8" /><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" /></>),
  truck: (<><path d="M3 6.5h11v9H3z" /><path d="M14 9.5h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17.5" cy="17.5" r="1.6" /></>),
};

export function NavGlyph({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {NAV_ICONS[name]}
    </svg>
  );
}

export const NAV: NavItem[] = [
  { label: "Platform", href: "/explorations/platform" },
  {
    label: "Products",
    menu: "products",
    items: [
      { code: "QMS", label: "Quality management", href: "/explorations/products/qms", desc: "CAPA, audits, NCs and change control on one governed thread.", icon: "qms" },
      { code: "DMS", label: "Document management", href: "/explorations/products/dms", desc: "Controlled documents, versioning and e-signatures, always audit-ready.", icon: "dms" },
      { code: "MES", label: "Manufacturing execution", href: "/explorations/products/mes", desc: "Electronic batch records and shop-floor execution, paperless.", icon: "mes" },
      { code: "PLM", label: "Product lifecycle", href: "/explorations/products/plm", desc: "Specs, BOMs and design history from concept to launch.", icon: "plm" },
    ],
    foot: { title: "One connected platform", desc: "Quality, documents and production on a single record.", href: "/explorations/platform", cta: "Explore platform" },
  },
  {
    label: "Solutions",
    menu: "domains",
    cols: [
      {
        heading: "Quality & Compliance", icon: "shield", items: [
          { label: "Quality", href: "/explorations/domains/quality", desc: "NCs, CAPA and audits on one quality record." },
          { label: "Compliance", href: "/explorations/domains/compliance", desc: "Stay inspection-ready against every standard." },
          { label: "Regulatory Affairs", href: "/explorations/domains/regulatory-affairs", desc: "Submissions, registrations and regulatory change." },
          { label: "Supplier Quality", href: "/explorations/domains/supplier-quality", desc: "SCARs, approvals and supplier performance." },
          { label: "Post-Market & Recall", href: "/explorations/domains/post-market-and-recall", desc: "Complaints, adverse events and recalls, closed." },
        ],
      },
      {
        heading: "Governance & Control", icon: "ledger", items: [
          { label: "Change Control", href: "/explorations/domains/change-control", desc: "Every change proposed, reviewed and approved." },
          { label: "Document & Records Control", href: "/explorations/domains/document-and-records-control", desc: "Controlled documents and records, audit-ready." },
          { label: "Periodic Review & Data Governance", href: "/explorations/domains/periodic-review-and-data-governance", desc: "Scheduled reviews and defensible data integrity." },
          { label: "Training & Competency", href: "/explorations/domains/training-and-competency", desc: "Role-based training tied to controlled documents." },
          { label: "System & Data Integration Governance", href: "/explorations/domains/system-and-data-integration-governance", desc: "Govern the systems and the data between them." },
        ],
      },
      {
        heading: "Operations & Supply Chain", icon: "truck", items: [
          { label: "Operations", href: "/explorations/domains/operations", desc: "Run the shop floor without paper or handoffs." },
          { label: "Supply Chain & Planning", href: "/explorations/domains/supply-chain-and-planning", desc: "Plan and keep supply aligned to demand." },
          { label: "Procurement & Sourcing", href: "/explorations/domains/procurement-and-sourcing", desc: "Source and buy against quality requirements." },
          { label: "Customer Management", href: "/explorations/domains/customer-management", desc: "Orders, complaints and commitments, connected." },
          { label: "New Product Development", href: "/explorations/domains/new-product-development", desc: "Concept to launch with the design history intact." },
        ],
      },
    ],
    foot: { title: "The Problem, end to end", desc: "See how the solutions connect into one system of record.", href: "/explorations/domains", cta: "All solutions" },
  },
  {
    label: "Industries",
    menu: "industries",
    cols: [
      {
        heading: "Life sciences", icon: "flask", items: [
          { label: "Medical Devices", href: "/explorations/industry-template-modern", desc: "Class II & III OEMs and CDMOs" },
          { label: "Pharmaceuticals", href: "/explorations/industries/pharmaceuticals", desc: "Commercial sponsors and CDMOs" },
          { label: "Contract Research Orgs", href: "/explorations/industries/cro", desc: "GCP clinical trial services" },
          { label: "Laboratories", href: "/explorations/industries/laboratories", desc: "ISO/IEC 17025 testing & calibration" },
        ],
      },
      {
        heading: "Process & consumer", icon: "droplet", items: [
          { label: "Chemicals", href: "/explorations/industries/chemicals", desc: "Specialty and pharma-supply" },
          { label: "Cosmetics", href: "/explorations/industries/cosmetics", desc: "Personal care under MoCRA" },
          { label: "Food Processing", href: "/explorations/industries/food-processing", desc: "FSMA and GFSI manufacturers" },
          { label: "Nutritional Supplements", href: "/explorations/industries/nutritional-supplements", desc: "21 CFR Part 111 makers" },
        ],
      },
      {
        heading: "Discrete manufacturing", icon: "cube", items: [
          { label: "Automotive", href: "/explorations/industries/automotive", desc: "IATF 16949 tiers and suppliers" },
          { label: "Aerospace", href: "/explorations/industries/aerospace", desc: "AS9100 and NADCAP suppliers" },
          { label: "Industrial Machinery", href: "/explorations/industries/industrial-machinery", desc: "Build-to-order OEMs" },
        ],
      },
    ],
    foot: { title: "See a complete industry page", desc: "Tour how Unifize maps to one industry end to end.", href: "/explorations/industry-template-modern", cta: "Take the tour" },
  },
  { label: "About us", href: "/about" },
  {
    label: "Resources",
    menu: "resources",
    items: [
      { label: "Customer stories", href: "/explorations/resources/testimonials", desc: "Video stories by company, industry and module.", icon: "stories" },
      { label: "Case studies", href: "/explorations/resources/case-studies", desc: "The backlog, the change, the numbers.", icon: "case" },
      { label: "Blog", href: "/explorations/resources/blog", desc: "Field notes on running quality.", icon: "blog" },
    ],
    foot: { title: "The full library", desc: "Every story, study and field note in one place.", href: "/explorations/resources", cta: "All resources" },
  },
];
