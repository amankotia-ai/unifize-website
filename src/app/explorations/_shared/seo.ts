/* ============================================================================
 * seo.ts - titles, descriptions and share cards for every public page, in one
 * place so they cannot drift from each other.
 *
 * Rules (2026-09-24):
 *   - the root layout's title template appends " · Unifize", so a `title`
 *     here never carries the brand; pages whose title already leads with the
 *     brand set `absolute: true`
 *   - descriptions restate what the page actually says (its H1 and hero
 *     lede), 110-165 characters, no em dashes
 *   - the share card headline IS the page's H1, split where the page turns
 *     it muted (`turn`), so a shared link previews the page it opens
 *
 * The cards render at /og/<page path> (src/app/og/[...path]/route.tsx), a
 * 1200 x 630 wide image.
 * ========================================================================== */
import type { Metadata } from "next";
import { CASE_STUDIES, POSTS, getCaseStudy, getPost } from "../resources/_shared/resources-data";
import { CUSTOMER_VIDEOS, getVideo } from "../resources/_shared/customer-videos";

export const SITE_NAME = "Unifize";

/* the share-card image URLs must resolve wherever the site is deployed: a
 * Vercel preview serves its own cards, production serves unifize.com's */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://unifize.com");

export type OgCard = {
  /* small mono label above the headline: where on the site this is */
  eyebrow: string;
  /* the H1, split at the page's muted turn */
  lead: string;
  turn?: string;
};

export type PageSeo = {
  title: string;
  /* true when the title already carries the brand (skips the template) */
  absolute?: boolean;
  description: string;
  card: OgCard;
};

export const PAGE_SEO: Record<string, PageSeo> = {
  /* ---------------------------------------------------------------- core */
  "/home": {
    title: "Unifize · AI platform for regulated, cross-functional work",
    absolute: true,
    description:
      "Unifize closes the gap between your systems and your teams, so CAPAs, change orders, and design reviews in regulated industries close faster and close proven.",
    card: { eyebrow: "Unifize", lead: "Regulated work, closed on time.", turn: "Defensible at audit." },
  },
  "/platform": {
    title: "Platform: make cross-team work visible and measurable",
    description:
      "Approvals, changes, and investigations close in email and meetings your systems never see. Unifize makes that work visible, measurable, and faster.",
    card: { eyebrow: "Platform", lead: "Your work crosses teams.", turn: "Your systems don’t." },
  },
  "/about": {
    title: "About Unifize · AI platform for regulated work",
    absolute: true,
    description:
      "Unifize is an AI platform for regulated, cross-functional work, for manufacturers in medical devices, pharma, food and more. Founded 2018 in Palo Alto.",
    card: { eyebrow: "About", lead: "Built by operators.", turn: "For regulated industries." },
  },
  "/coordination-tax-calculator": {
    title: "Coordination Tax Assessment",
    description:
      "See where coordination tax is likely hurting your company most: a cold read from public data, every figure labelled by source, sharpened as you confirm your numbers.",
    card: { eyebrow: "Coordination tax assessment", lead: "Where coordination tax is likely hurting you the most.", turn: "Read from public data." },
  },
  "/coordination-tax-calculator/report": {
    title: "Coordination Tax Assessment: full report",
    description:
      "Your coordination tax from six angles: confirmed volumes, honest peer benchmarks, and the path from an estimate to a measured reduction.",
    card: { eyebrow: "Coordination tax assessment", lead: "A few details and we will build", turn: "your coordination tax report." },
  },

  /* ------------------------------------------------------------ products */
  "/products/dms": {
    title: "Document Management System (DMS)",
    description:
      "Document Control, Change Control, and Training on one governed record: controlled documents from draft to obsolete, with one current version everywhere you look.",
    card: { eyebrow: "Product · DMS", lead: "One current version.", turn: "Everywhere you look." },
  },
  "/products/qms": {
    title: "Quality Management System (QMS)",
    description:
      "Non-conformance, CAPA, Audit, and Supplier Quality on one governed record, so every finding carries an owner, an action, and a verified close.",
    card: { eyebrow: "Product · QMS", lead: "A finding isn’t closed until the fix is", turn: "proven." },
  },
  "/products/plm": {
    title: "Product Lifecycle Management (PLM)",
    description:
      "Product specifications, design controls, risk, and FMEA on one record, so every requirement ends in a verification you can point to.",
    card: { eyebrow: "Product · PLM", lead: "The trace from requirement to result shouldn’t have", turn: "gaps." },
  },
  "/products/mes": {
    title: "Manufacturing Execution System (MES)",
    description:
      "Work orders, electronic travellers, inspection, and batch records on one system, so every operation is signed, evidenced, and traceable by lot.",
    card: { eyebrow: "Product · MES", lead: "What happened on the floor.", turn: "A record, not a memory." },
  },

  /* ----------------------------------------------------------- solutions */
  "/solution/quality": {
    title: "Quality: the decision behind every CAPA, on the record",
    description:
      "The judgement behind every deviation, CAPA, and audit response lives in email and side channels. Unifize makes the decision part of the quality record.",
    card: { eyebrow: "Solutions · Quality", lead: "Your quality system closes the event.", turn: "It loses the decision." },
  },
  "/solution/compliance": {
    title: "Compliance: proof that holds the next time someone asks",
    description:
      "Validation, data integrity, safety, and regulatory change live in briefs and spreadsheets. Unifize keeps the decision trace, so the answer holds when someone asks again.",
    card: { eyebrow: "Solutions · Compliance", lead: "You can prove compliance today.", turn: "Ask again tomorrow." },
  },
  "/solution/regulatory-affairs": {
    title: "Regulatory Affairs: reporting and submissions on the clock",
    description:
      "Reportability, submissions, and label approvals close on deadlines someone else set. Unifize holds the decision and its evidence on one record, inside the clock.",
    card: {
      eyebrow: "Solutions · Regulatory Affairs",
      lead: "The clock starts the moment the event lands.",
      turn: "The evidence is still in five inboxes.",
    },
  },
  "/solution/supplier-management": {
    title: "Supplier Management: qualification you can still prove",
    description:
      "Supplier qualification, part approval, incoming disposition, and corrective action close across company lines. Unifize keeps each decision on the record.",
    card: { eyebrow: "Solutions · Supplier Management", lead: "You qualified the supplier.", turn: "A year on, nobody can prove it." },
  },
  "/solution/post-market-and-recall": {
    title: "Post-Market & Recall: four workflows, one record",
    description:
      "A recall runs the hold, customer notification, returns, and regulatory submission in parallel. Unifize holds all four on one record, from complaint to verified close.",
    card: { eyebrow: "Solutions · Post-Market & Recall", lead: "A recall is four workflows at once.", turn: "Each one runs its own clock." },
  },
  "/solution/change-control": {
    title: "Change Control: every approval you can replay",
    description:
      "Sign-off happens in email threads and design reviews, so the evidence and conditions never reach the record. Unifize holds the change from request to effective date.",
    card: { eyebrow: "Solutions · Change Control", lead: "The change gets approved.", turn: "Nobody can replay why." },
  },

  "/solution/document-and-records-control": {
    title: "Document & Records Control: one version, the one in use",
    description:
      "Documents are approved in one place, copied to a share and printed for the floor. Unifize keeps one controlled version, its approval and where it went on the same record.",
    card: { eyebrow: "Solutions · Document & Records Control", lead: "The system says v3.2.", turn: "The workstation says v2.8." },
  },

  "/solution/training-and-competency": {
    title: "Training & Competency: trained on the version in use",
    description:
      "The procedure goes live and the training catches up weeks later. Unifize creates training from the revision and closes it on a qualified trainer's sign-off.",
    card: { eyebrow: "Solutions · Training & Competency", lead: "The SOP went live.", turn: "The training didn't." },
  },

  "/solution/operations": {
    title: "Operations: release the hold, keep the reason",
    description:
      "QA dispositions and engineering calls are chased through email and escalation calls. Unifize runs the hold, the review and the release on one record the next shift can read.",
    card: { eyebrow: "Solutions · Operations", lead: "The line is held.", turn: "The decision is on a call." },
  },

  "/solution/supply-chain-and-planning": {
    title: "Supply Chain & Planning: every allocation, with its reasons",
    description:
      "Shortage allocations, PO changes and expedites are decided in escalation calls. Unifize keeps the options, the criteria and the commitments on the record behind every call.",
    card: { eyebrow: "Solutions · Supply Chain & Planning", lead: "Three lines want the last 40 units.", turn: "Nobody wrote down who got them." },
  },

  "/solution/procurement-and-sourcing": {
    title: "Procurement & Sourcing: award on the whole record",
    description:
      "Award rationale and bid criteria live in email and spreadsheets, so sourcing sees price and never the cost of quality. Unifize keeps the evaluation and the award on one record.",
    card: { eyebrow: "Solutions · Procurement & Sourcing", lead: "The award went to the lowest price.", turn: "The rework came with it." },
  },

  "/solution/customer-management": {
    title: "Customer Management: answer on time, keep what you promised",
    description:
      "Quotes, contract terms and customer requirements are pieced together in email, so responses run late and promises never reach the floor. Unifize runs the response and its commitments on one record.",
    card: { eyebrow: "Solutions · Customer Management", lead: "The RFQ closes Friday.", turn: "Engineering hasn't seen it yet." },
  },

  "/solution/new-product-development": {
    title: "New Product Development: pass every gate on evidence",
    description:
      "Gate evidence is rebuilt for every review and approvals live in email, so gates recycle and launches slip. Unifize holds each gate's criteria, evidence and decision on the record.",
    card: { eyebrow: "Solutions · New Product Development", lead: "The gate passed on a deck.", turn: "Launch slipped anyway." },
  },

  /* ---------------------------------------------------------- industries */
  "/industries/medical-devices": {
    title: "Unifize for Medical Device OEMs and CDMOs",
    absolute: true,
    description:
      "Your QMS remembers it was approved, not why. Unifize keeps the decision trace behind every change, CAPA, and complaint for Class II and III device makers.",
    card: { eyebrow: "Industries · Medical devices", lead: "Your QMS remembers that it was approved.", turn: "Not why." },
  },
  "/industries/pharmaceuticals": {
    title: "Unifize for Pharmaceutical Sponsors and CDMOs",
    absolute: true,
    description:
      "Your batch record shows the lot was released, not why. Unifize keeps the decision trace across quality, regulatory, and operations, ready for an FDA inspection.",
    card: { eyebrow: "Industries · Pharmaceuticals", lead: "One OOS result stops the batch.", turn: "The release carries the reason." },
  },
  "/industries/chemicals": {
    title: "Unifize for Specialty Chemical Manufacturers",
    absolute: true,
    description:
      "Your change log shows what changed, not why. Unifize keeps the decision trace across quality, EHS, and the regulatory dossier, so it holds up in a GMP or REACH audit.",
    card: { eyebrow: "Industries · Chemicals", lead: "One raw material changes supplier.", turn: "The SDS and the dossier follow it." },
  },
  "/industries/cosmetics": {
    title: "Unifize for Cosmetics and Personal Care Manufacturers",
    absolute: true,
    description:
      "Your substantiation file says the product is safe, not why. Unifize keeps the decision trace behind every formula change and supplier COA under MoCRA.",
    card: { eyebrow: "Industries · Cosmetics", lead: "The retailer asks for the safety file.", turn: "The missing COA lands on its lot." },
  },
  "/industries/laboratories": {
    title: "Unifize for ISO/IEC 17025 Testing and Calibration Labs",
    absolute: true,
    description:
      "Your LIMS has the result, not why. Unifize keeps the decision trace behind every nonconformance, method deviation, and competency record for ISO/IEC 17025 labs.",
    card: { eyebrow: "Industries · Laboratories", lead: "One QC point breaks 1-3s.", turn: "Every result it touched is held." },
  },
  "/industries/automotive": {
    title: "Unifize for Automotive Suppliers under IATF 16949",
    absolute: true,
    description:
      "Your PPAP proves the part conforms, not why. Unifize keeps the decision trace behind every PPAP, engineering change, and 8D for IATF 16949 suppliers.",
    card: { eyebrow: "Industries · Automotive", lead: "A warranty return opens the 8D.", turn: "Suspect stock is contained everywhere." },
  },
  "/industries/aerospace": {
    title: "Unifize for Aerospace and Defense Suppliers",
    absolute: true,
    description:
      "Your FAI signed off the first article, not why. Unifize keeps the decision trace behind every change and special process, ready for AS9100 and NADCAP.",
    card: { eyebrow: "Industries · Aerospace", lead: "Balloon 3 is out of tolerance.", turn: "The FAI closes with the MRB on it." },
  },
  "/industries/food-processing": {
    title: "Unifize for Food Manufacturers and Co-Packers",
    absolute: true,
    description:
      "Your HACCP plan cleared the lot, not why. Unifize keeps the decision trace behind every deviation, allergen control, and hold for FSMA and GFSI audits.",
    card: { eyebrow: "Industries · Food processing", lead: "A supplier flags an undeclared allergen.", turn: "Every finished lot it reached is on hold." },
  },
  "/industries/nutritional-supplements": {
    title: "Unifize for Dietary Supplement Manufacturers",
    absolute: true,
    description:
      "Your COA cleared the ingredient, not why. Unifize keeps the decision trace behind identity testing, batch records, and specifications under 21 CFR Part 111.",
    card: { eyebrow: "Industries · Nutritional supplements", lead: "The supplier’s COA passed.", turn: "The FTIR fingerprint didn’t." },
  },
  "/industries/industrial-machinery": {
    title: "Unifize for Industrial Machinery OEMs",
    absolute: true,
    description:
      "Your FAT accepted the machine, not why. Unifize keeps the decision trace behind every engineering change and safety-critical choice, through FAT, SAT, and audit.",
    card: { eyebrow: "Industries · Industrial machinery", lead: "A missing IQ protocol holds the FAT.", turn: "Acceptance releases payment." },
  },
  "/industries/cro": {
    title: "Unifize for Contract Research Organizations",
    absolute: true,
    description:
      "Your eTMF says the study closed, not why. Unifize keeps every protocol deviation and CAPA inspection-ready per study and per sponsor, for BIMO and sponsor audits.",
    card: { eyebrow: "Industries · Contract research", lead: "Sponsor B audits Study 03.", turn: "It sees Study 03, and only that." },
  },

  /* --------------------------------------------------------------- roles
   * reached from the product pages' "Who it is for" rosters, not the nav */
  "/personas/quality-manager": {
    title: "For Quality Managers: every decision, with its evidence",
    description:
      "CAPAs, change controls, deviations and audit findings reach you in one queue, each with its evidence and thread, decided on the record and signed under Part 11.",
    card: { eyebrow: "Roles · Quality Manager", lead: "Dozens of decisions wait on you.", turn: "Each one arrives with its evidence." },
  },

  /* ----------------------------------------------------------- resources */
  "/resources": {
    title: "Resources: customer videos, case studies, and writing",
    description:
      "Customer videos, case studies, and writing on the practice of quality in regulated manufacturing, all grounded in real work.",
    card: { eyebrow: "Resources", lead: "Everything you need to", turn: "evaluate Unifize." },
  },
  "/resources/blog": {
    title: "Blog: quality in regulated manufacturing",
    description:
      "Practical insights and real-world advice on improving quality and collaboration: CAPA, 21 CFR Part 11, design controls, and surviving an FDA 483.",
    card: { eyebrow: "Resources · Blog", lead: "Latest writing,", turn: "from the practice." },
  },
  "/resources/case-studies": {
    title: "Customer case studies",
    description:
      "The situation, the change, and the measured result: how teams across regulated manufacturing run quality, documents, and product on Unifize.",
    card: { eyebrow: "Resources · Case studies", lead: "The numbers,", turn: "and the work behind them." },
  },
  "/resources/testimonials": {
    title: "Customer stories on video",
    description:
      "Quality directors, engineers, and operators on what changed after Unifize, recorded in their own voice and named.",
    card: { eyebrow: "Resources · Customer stories", lead: "Hear it from the people", turn: "who do the work." },
  },
};

/* ------------------------------------------------ resource detail pages */

/* trim long source copy to a snippet-sized description on a word boundary */
function clip(text: string, max = 160): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "") + "…";
}

/* the SEO entry for any public path, including the generated resource
 * detail pages */
export function seoFor(path: string): PageSeo | undefined {
  if (PAGE_SEO[path]) return PAGE_SEO[path];
  const [, section, kind, slug] = path.split("/");
  if (section !== "resources" || !slug) return undefined;
  if (kind === "blog") {
    const p = getPost(slug);
    return p && { title: p.title, description: clip(p.dek), card: { eyebrow: `Blog · ${p.category}`, lead: p.title } };
  }
  if (kind === "case-studies") {
    const c = getCaseStudy(slug);
    return (
      c && {
        title: `${c.company} case study`,
        description: clip(c.summary),
        card: { eyebrow: `Case study · ${c.industry}`, lead: c.headline },
      }
    );
  }
  if (kind === "testimonials") {
    const v = getVideo(slug);
    const who = [v?.person, v?.company].filter(Boolean).join(", ");
    return (
      v && {
        title: `${v.name}: ${v.person} on Unifize`,
        description: clip(v.description),
        card: { eyebrow: `Customer story · ${who}`, lead: v.name },
      }
    );
  }
  return undefined;
}

/* every path that has a share card, for static generation */
export function allSeoPaths(): string[] {
  return [
    ...Object.keys(PAGE_SEO),
    ...POSTS.map((p) => `/resources/blog/${p.slug}`),
    ...CASE_STUDIES.map((c) => `/resources/case-studies/${c.slug}`),
    ...CUSTOMER_VIDEOS.map((v) => `/resources/testimonials/${v.slug}`),
  ];
}

/* the page's Metadata: title, description, canonical, Open Graph and X
 * cards, all pointing at the same wide share image */
export function pageMetadata(path: string): Metadata {
  const seo = seoFor(path);
  if (!seo) return {};
  const fullTitle = seo.absolute ? seo.title : `${seo.title} · ${SITE_NAME}`;
  const image = {
    url: `/og${path}`,
    width: 1200,
    height: 630,
    alt: [seo.card.lead, seo.card.turn].filter(Boolean).join(" "),
  };
  return {
    title: seo.absolute ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description: seo.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: seo.description,
      images: [image],
    },
  };
}
