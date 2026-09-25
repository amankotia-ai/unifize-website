/* ============================================================================
 * about-data.ts. Every fact the About page states, in one place, so the
 * visible copy, the key-facts table, the FAQ and the JSON-LD cannot drift.
 *
 * 24 Sep 2026: the page follows the "anatomy of an optimized About page"
 * format (entity definition, what we do, what makes us different, who uses
 * us, the team, how we work, FAQ, schema). Two readers: people
 * and answer engines, so every sentence carries one extractable fact.
 *
 * Sources: founder story from Ben's "Who We're Building For" (Notion PBD-6);
 * Ben's CEO title from his own blog post (src/content/webflow); product
 * one-liners from the Notion Products DB; alternatives named on the quality
 * and industry pages (coexistence bands); customer outcomes from the
 * customer videos (platform-proof.tsx); customers from the home trust strip
 * (Notion Companies DB, current only). Offices confirmed 2 Sep 2026.
 * Nothing here is invented: no headcount, no customer totals, no pricing,
 * no founder LinkedIn URLs until Raj supplies them.
 * Sentence case, no em dashes.
 * ========================================================================== */

export const ENTITY = {
  name: "Unifize",
  category: "AI platform for regulated, cross-functional work",
  founded: "2018",
  url: "https://unifize.com",
  /* the hero sub: the entity sentence, short enough to sit level with the
   * two-line headline */
  short: "Unifize is an AI platform for cross-functional work in regulated manufacturing.",
  /* the long form, for the JSON-LD and the FAQ */
  definition:
    "Unifize is an AI platform for regulated, cross-functional work. It runs change control, CAPA, supplier decisions and audit evidence on one accountable thread, for manufacturers in medical devices, pharmaceuticals, food, chemicals, automotive and aerospace.",
};

export type Product = { code: string; name: string; href: string; line: string };

export const PRODUCTS: Product[] = [
  { code: "QMS", name: "Quality management", href: "/products/qms", line: "Non-conformance, CAPA, audits and supplier quality." },
  { code: "DMS", name: "Document management", href: "/products/dms", line: "Document control, change control and training." },
  { code: "PLM", name: "Product lifecycle", href: "/products/plm", line: "Specifications, design controls, FMEA and control plans." },
  { code: "MES", name: "Manufacturing execution", href: "/products/mes", line: "Work orders, travellers, first article inspection and batch records." },
];

/* one comparison: the eQMS Unifize sits beside, and Unifize. Category
 * level only, as on the quality and industry pages. */
export const COMPARE: { label: string; eqms: string; unifize: string }[] = [
  { label: "What it holds", eqms: "The approved record", unifize: "The work that produces the record" },
  { label: "Cross-team decisions", eqms: "Made outside it, in email and meetings", unifize: "Made on the record, with who, when and why" },
  { label: "Audit evidence", eqms: "The final document", unifize: "Bound to each decision, with a Part 11 signature" },
  { label: "Your systems", eqms: "It stays your system of record", unifize: "Runs alongside it, no rip-and-replace" },
];

export const INDUSTRIES = [
  { name: "Medical devices", href: "/industries/medical-devices" },
  { name: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
  { name: "Contract research", href: "/industries/cro" },
  { name: "Laboratories", href: "/industries/laboratories" },
  { name: "Chemicals", href: "/industries/chemicals" },
  { name: "Cosmetics", href: "/industries/cosmetics" },
  { name: "Food processing", href: "/industries/food-processing" },
  { name: "Nutritional supplements", href: "/industries/nutritional-supplements" },
  { name: "Automotive", href: "/industries/automotive" },
  { name: "Aerospace", href: "/industries/aerospace" },
  { name: "Industrial machinery", href: "/industries/industrial-machinery" },
];

export const FOUNDERS = [
  {
    name: "Ben Merton",
    role: "Co-founder and CEO",
    initials: "BM",
    bio: "Ben spent fifteen years running a manufacturing business that supplied life sciences, with plants in the United States, China, South Korea and India, under ISO 13485 and ISO 9001.",
  },
  {
    name: "Lakshman Thatai",
    role: "Co-founder",
    initials: "LT",
    bio: "Lakshman led operations in food processing, medical devices and consumer goods across the United States, China and India.",
  },
];

export const STEPS = [
  {
    title: "Pick one process",
    body: "Start where the coordination tax is highest: change control, CAPA, supplier approval or audit prep.",
  },
  {
    title: "Configure it together",
    body: "Our team configures Unifize to your process with yours in the room, on top of the systems you keep.",
  },
  {
    title: "Prove it in ninety days",
    body: "Run the process live and measure cycle time and audit readiness against how it ran before.",
  },
  {
    title: "Expand",
    body: "Add the next process or product on the same platform when you are ready. Nothing is re-implemented.",
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Unifize?",
    a: "Unifize is an AI platform for regulated, cross-functional work. It runs change control, CAPA, supplier decisions and audit evidence on one accountable thread for manufacturers in regulated industries, with a 21 CFR Part 11 signature on every approval.",
  },
  {
    q: "Does Unifize replace my eQMS?",
    a: "No, unless you want it to. Unifize runs alongside the eQMS that already passed your audits and holds the work around it, so there is no rip-and-replace and no revalidation. Teams on spreadsheets and shared drives can run Unifize's QMS modules as their system of record.",
  },
  {
    q: "How is Unifize different from MasterControl or Veeva?",
    a: "MasterControl and Veeva store the approved record. Unifize holds the work that produces it: the investigation, the cross-team decision and the evidence, on one thread per event. You can keep your eQMS and run Unifize beside it.",
  },
  {
    q: "Who founded Unifize?",
    a: "Unifize was founded in 2018 by Ben Merton, the CEO, and Lakshman Thatai, two operators who ran regulated manufacturing across the United States, China, South Korea and India. The company works from Palo Alto and Bengaluru.",
  },
  {
    q: "What does Unifize offer?",
    a: "Unifize offers quality management (QMS), document management (DMS), product lifecycle (PLM) and manufacturing execution (MES) on one platform, plus a no-code process builder and Unifize AI for change impact and investigations.",
  },
  {
    q: "How long does it take to get started with Unifize?",
    a: "Unifize starts with one process, configured with our team in the room, and proves its value on that process in ninety days. You add the next process or product on the same platform when you are ready.",
  },
];

/* coordinates: 430 Cambridge Avenue geocoded to the building; the Bengaluru
 * pin is 6th Cross Road, Old Binnamangala, since the plot number is not in
 * OpenStreetMap (both via Nominatim, 7 Sep 2026) */
export const OFFICES = [
  {
    key: "palo-alto",
    city: "Palo Alto",
    country: "United States",
    lines: ["430 Cambridge Avenue", "Palo Alto, CA 94306"],
    lat: 37.4270176,
    lng: -122.1460579,
  },
  {
    key: "bengaluru",
    city: "Bengaluru",
    country: "India",
    lines: ["#267, 1st Floor, 6th Cross, 1st Stage", "Binnamangala, Indiranagar", "Bengaluru 560038"],
    lat: 12.980404,
    lng: 77.6401323,
  },
];

/* one script block: Organization (with founders), SoftwareApplication,
 * BreadcrumbList and FAQPage. The FAQ answers match the page word for word. */
export function aboutJsonLd(siteUrl: string) {
  const org = `${siteUrl}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: ENTITY.name,
        url: siteUrl,
        logo: `${siteUrl}/logo_dark.svg`,
        description: ENTITY.definition,
        foundingDate: ENTITY.founded,
        founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
        address: {
          "@type": "PostalAddress",
          streetAddress: "430 Cambridge Avenue",
          addressLocality: "Palo Alto",
          addressRegion: "CA",
          postalCode: "94306",
          addressCountry: "US",
        },
        location: OFFICES.map((o) => ({
          "@type": "Place",
          name: `Unifize ${o.city}`,
          address: o.lines.join(", ") + ", " + o.country,
          geo: { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng },
        })),
        knowsAbout: ["Quality management", "Document control", "Change control", "CAPA", "21 CFR Part 11"],
      },
      {
        "@type": "SoftwareApplication",
        name: "Unifize",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: ENTITY.definition,
        publisher: { "@id": org },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
