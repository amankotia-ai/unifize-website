/* ============================================================================
 * The canonical list of domain (Solutions) pages, single-sourced for the
 * footer nav, the future index page, and anything else that needs the set.
 *
 * source: Domains DB (The Problem Architecture -> Domains, collection
 * b835b86d-e5e0-4e7e-8625-e239fbf9c196), active rows only, per the 2026-07-09
 * Website Rebuild call:
 *   - Periodic Review & Data Governance is being retired ("that's archived.
 *     We need to exclude archived ones") — excluded here.
 *   - Supplier Quality was renamed Supplier Management (DB, 2026-05-14); the
 *     header NAV still carries the old label/slug and needs reconciling.
 *   - New Product Development was subsumed into Product Development; Change
 *     Control keeps its own Secondary row and its own page.
 *   - System & Data Integration Governance no longer exists in the DB.
 * Pillar grouping mirrors the nav dropdown's three columns (not yet a DB
 * property — flagged as a candidate Notion field).
 * ========================================================================== */

export type DomainPillar =
  | "Quality & Compliance"
  | "Governance & Control"
  | "Operations & Supply Chain";

export interface DomainLink {
  slug: string;
  label: string;
  href: string;
  pillar: DomainPillar;
  tier: "Primary" | "Secondary";
}

export const ALL_DOMAINS: DomainLink[] = [
  // Quality & Compliance
  { slug: "quality", label: "Quality", href: "/explorations/domains/quality", pillar: "Quality & Compliance", tier: "Primary" },
  { slug: "compliance", label: "Compliance", href: "/explorations/domains/compliance", pillar: "Quality & Compliance", tier: "Secondary" },
  { slug: "regulatory-affairs", label: "Regulatory Affairs", href: "/explorations/domains/regulatory-affairs", pillar: "Quality & Compliance", tier: "Secondary" },
  { slug: "supplier-management", label: "Supplier Management", href: "/explorations/domains/supplier-management", pillar: "Quality & Compliance", tier: "Primary" },
  { slug: "post-market-and-recall", label: "Post-Market & Recall", href: "/explorations/domains/post-market-and-recall", pillar: "Quality & Compliance", tier: "Secondary" },
  // Governance & Control
  { slug: "change-control", label: "Change Control", href: "/explorations/domains/change-control", pillar: "Governance & Control", tier: "Secondary" },
  { slug: "document-and-records-control", label: "Document & Records Control", href: "/explorations/domains/document-and-records-control", pillar: "Governance & Control", tier: "Secondary" },
  { slug: "training-and-competency", label: "Training & Competency", href: "/explorations/domains/training-and-competency", pillar: "Governance & Control", tier: "Secondary" },
  // Operations & Supply Chain
  { slug: "operations", label: "Operations", href: "/explorations/domains/operations", pillar: "Operations & Supply Chain", tier: "Primary" },
  { slug: "supply-chain-and-planning", label: "Supply Chain & Planning", href: "/explorations/domains/supply-chain-and-planning", pillar: "Operations & Supply Chain", tier: "Secondary" },
  { slug: "procurement-and-sourcing", label: "Procurement & Sourcing", href: "/explorations/domains/procurement-and-sourcing", pillar: "Operations & Supply Chain", tier: "Secondary" },
  { slug: "customer-management", label: "Customer Management", href: "/explorations/domains/customer-management", pillar: "Operations & Supply Chain", tier: "Secondary" },
  { slug: "product-development", label: "Product Development", href: "/explorations/domains/product-development", pillar: "Operations & Supply Chain", tier: "Primary" },
];
