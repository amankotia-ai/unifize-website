import type { DomainPageData } from "./types";

export const DOMAINS: Record<string, DomainPageData> = {
  quality: {
    slug: "quality",
    title: "Quality",
    tier: "Primary",
    owner: "VP Quality / QA Director",
    promise:
      "Where the audit trail either exists, or has to be reconstructed.",
    moment:
      "A CAPA opens. Five owners hold five pieces of the same thread before the record exists. The disposition decision lives in someone's inbox. The effectiveness check is a meeting on next Tuesday's calendar.",
    workNarrative: [
      "When a hold comes off the floor, when an exception is granted, when an investigation closes — the trail of who decided what, when, and with what evidence usually lives in email and side channels. The record in your QMS is just the outcome.",
      "Unifize makes the conversation itself the audit trail. Every disposition, every approval, every effectiveness check is timestamped where it happens, with the evidence attached. The disposition lands in the QMS bound to the thread that produced it — not reconstructed two weeks later from inboxes.",
    ],
    capabilities: [
      {
        title: "CAPA, deviation, and NCR threads",
        body: "One owner, one thread, every approval and evidence attachment in place. The QMS record is the closure event, not a manual reconciliation.",
      },
      {
        title: "Disposition with the record",
        body: "MRB disposition, exception approval, and risk-based decisions are bound to the part, lot, or product they apply to — so audit asks resolve in minutes.",
      },
      {
        title: "Cross-functional review",
        body: "Quality, operations, engineering, and supplier teams meet on the same thread. No more parallel investigations that never converge.",
      },
      {
        title: "Effectiveness checks that close",
        body: "Scheduled, owned, and surfaced when due — so CAPAs don't quietly age past their effectiveness window.",
      },
    ],
    driftStations: [
      {
        num: "01",
        title: "Medical Devices",
        trigger:
          "Class II & III OEMs and CDMOs. DHF, DMR, CAPA, and change-control flows that must stay traceable across R&D, QA, manufacturing, and supply chain.",
        metric: "9 of 12 domains in play",
        persona: "Life Sciences · Advocacy",
        anchor: "Sharpest in Medical Devices.",
        weight: "deep",
        href: "/industries/medical-devices",
      },
      {
        num: "02",
        title: "Pharmaceuticals",
        trigger:
          "Drug substance and product manufacturers, plus CDMOs and CMOs. Deviations, batch records, and CAPAs under 21 CFR 210/211 and Annex 11.",
        metric: "Permanent compliance cost",
        persona: "Life Sciences · In development",
        anchor: "Heavy in Pharmaceuticals.",
        weight: "deep",
        href: "/industries/pharmaceuticals",
      },
      {
        num: "03",
        title: "Aerospace",
        trigger:
          "AS9100 is the commercial prerequisite. NCR, MRB, and configuration control generate most audit findings — a single NADCAP issue revokes accreditation in 90 days.",
        metric: "90 days to lose accreditation",
        persona: "Manufacturing · Advocacy",
        anchor: "Constant in Aerospace.",
        weight: "deep",
        href: "/industries/aerospace",
      },
      {
        num: "04",
        title: "Automotive",
        trigger:
          "IATF 16949 with APQP, PPAP, and 8D obligations. Customer-specific requirements stack on top. Warranty and 8D corrective action keeps coming.",
        metric: "Customer scorecard governs",
        persona: "Manufacturing · In development",
        anchor: "Through Automotive.",
        weight: "light",
        href: "/industries/automotive",
      },
      {
        num: "05",
        title: "Laboratories",
        trigger:
          "ISO/IEC 17025-accredited labs serving FDA-regulated end-markets. LIMS handles results, not document control or corrective action.",
        metric: "Biennial accreditation cycle",
        persona: "Life Sciences · Advocacy",
        anchor: "And in Laboratories.",
        weight: "light",
        href: "/industries/laboratories",
      },
    ],
    personas: [
      {
        slug: "quality-governance",
        title: "Quality governance",
        blurb: "VP Quality / Head of Quality / RAQA Director.",
      },
      {
        slug: "compliance-and-validation",
        title: "Compliance & validation",
        blurb: "Validation Manager / CSV Lead.",
      },
      {
        slug: "lab-operations-and-release-testing",
        title: "Lab operations and release testing",
        blurb: "Lab / QC Manager, LIMS Owner.",
      },
    ],
    painPoints: [
      "CAPAs that close on paper but recur in the field",
      "Investigations restarted from scratch when the owner leaves",
      "Disposition decisions that can't be reconstructed at audit",
      "Effectiveness checks that quietly age past their window",
      "Approvals scattered across email, with no audit trail",
    ],
  },
};

export function getDomain(slug: string): DomainPageData | undefined {
  return DOMAINS[slug];
}

export function listDomainSlugs(): string[] {
  return Object.keys(DOMAINS);
}
