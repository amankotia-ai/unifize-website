import type { Metadata } from "next";
import { SiteHeader } from "../home/site-header";
import { Button, Eyebrow, type CellState } from "@/components/atoms";
import { DashboardShell } from "@/components/organisms";
import { PlatformExplorer, type ExploreSection } from "./platform-explorer";

/* ------------------------------------------------------------
 * Section glyphs — 14 cols × 7 rows pixel-art icons that signal
 * the shape of each ingress point.
 * ------------------------------------------------------------ */

// Factory skyline — three buildings of varying heights with a chimney.
const GLYPH_INDUSTRY: CellState[] = [
  "off","off","on","off","off","off","off","off","off","off","off","off","off","off",
  "off","on","on","on","off","off","off","off","off","off","off","on","off","off",
  "off","on","on","on","off","off","off","on","on","off","off","on","on","on",
  "off","on","on","on","off","off","on","on","on","off","off","on","on","on",
  "off","on","on","on","off","off","on","on","on","off","off","on","on","on",
  "off","on","on","on","off","off","on","on","on","off","off","on","on","on",
  "on","on","on","on","on","on","on","on","on","on","on","on","on","on",
];

// 2×2 quadrant grid — four named domains, each its own enclosure.
const GLYPH_DOMAIN: CellState[] = [
  "on","on","on","on","on","on","off","off","on","on","on","on","on","on",
  "on","off","off","off","off","on","off","off","on","off","off","off","off","on",
  "on","off","off","off","off","on","off","off","on","off","off","off","off","on",
  "on","on","on","on","on","on","off","off","on","on","on","on","on","on",
  "off","off","off","off","off","off","off","off","off","off","off","off","off","off",
  "on","on","on","on","on","on","off","off","on","on","on","on","on","on",
  "on","off","off","off","off","on","off","off","on","off","off","off","off","on",
];

// Person silhouette — head, shoulders, body.
const GLYPH_BUYER: CellState[] = [
  "off","off","off","off","off","on","on","on","on","off","off","off","off","off",
  "off","off","off","off","on","on","on","on","on","on","off","off","off","off",
  "off","off","off","off","on","on","on","on","on","on","off","off","off","off",
  "off","off","off","off","off","on","on","on","on","off","off","off","off","off",
  "off","off","off","on","on","on","on","on","on","on","on","off","off","off",
  "off","off","on","on","on","on","on","on","on","on","on","on","off","off",
  "off","on","on","on","on","on","on","on","on","on","on","on","on","off",
];

export const metadata: Metadata = {
  title: "Explore the platform — by industry, domain, or buyer",
  description:
    "Three doors into Unifize. Pick the one that matches your starting point — the industry you operate in, the domain you own, or the buyer you are.",
};

const SECTIONS: ExploreSection[] = [
  {
    id: "industries",
    num: "01",
    eyebrow: "By industry",
    title: "By industry",
    blurb:
      "Where coordination tax accumulates differently — by regulation, by supply chain shape, by the failure event you most need to avoid.",
    pattern: GLYPH_INDUSTRY,
    items: [
      {
        num: "01",
        title: "Medical Devices",
        href: "/industries/medical-devices",
        description:
          "Class II & III device OEMs and CDMOs. The deepest coverage in the platform.",
        longDescription:
          "Your DHF, DMR, CAPA, and design-change work has to stay traceable across R&D, QA, manufacturing, and supply chain — without slowing the team down. Unifize sits inside the quality team's day-to-day and binds the conversation to the device record, so the audit trail is built as the work happens.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "21 CFR 820 | ISO 13485 | ISO 14971 | DHF | DHR | DMR | Design Controls | 510(k) | UDI",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "02",
        title: "Pharmaceuticals",
        description:
          "Drug substance and product manufacturers, plus CDMOs and CMOs.",
        longDescription:
          "Deviations, CAPAs, change control, and batch-record review run under 21 CFR 210/211, ICH Q10, and Annex 11. Unifize keeps the cross-functional decisions — what was escalated, what was approved, what was changed — bound to the regulated record, and carries through to APR, training cascades, and label changes.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "21 CFR Part 210/211 | 21 CFR Part 11 | ICH Q7 / Q9 / Q10 | EU GMP Annex 1 / 11 | APR / PQR",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "03",
        title: "Aerospace",
        description:
          "Airframe, propulsion, and component manufacturers under AS9100 and NADCAP.",
        longDescription:
          "Configuration management drives most of your audit findings, and a NADCAP special-process issue can revoke accreditation in 90 days. Unifize binds FAI, ECO, CDRL, and program-quality-plan work to a defensible trail — so the next audit doesn't depend on someone's memory.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "AS9100 | AS9120 | NADCAP | FAA Part 21 / 145 | FAI (AS9102) | AS6081 | OASIS",
          },
        ],
        meta: "Manufacturing",
      },
      {
        num: "04",
        title: "Industrial Machinery",
        description:
          "Capital equipment makers serving regulated end-markets — pharma, food, semiconductor.",
        longDescription:
          "Your customer's compliance bar becomes yours. CE marking technical files, FAT/SAT qualification packets, and engineering-change orders today live across emails, spreadsheets, and drives. Unifize consolidates them into one thread you can ship with the machine.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "CE marking | Machinery Directive 2006/42/EC | ISO 12100 | ISO 13849 | IEC 62443 | 21 CFR Part 11 | IQ / OQ / PQ | FAT / SAT",
          },
        ],
        meta: "Manufacturing",
      },
      {
        num: "05",
        title: "Laboratories",
        description:
          "Clinical, environmental, and pharmaceutical QC labs under ISO/IEC 17025.",
        longDescription:
          "Your LIMS handles results, not document control or corrective action. Unifize fills the gap — method deviations, non-conformances, analyst competency, and audit responses in one place, so the biennial accreditation surveillance doesn't become a scramble.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "ISO/IEC 17025 | 21 CFR Part 11 | 21 CFR Part 58 (GLP) | CLIA | CAP | ALCOA+ | A2LA / ANAB / UKAS",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "06",
        title: "Automotive",
        description:
          "OEMs and Tier 1/2 suppliers under IATF 16949, APQP, PPAP, and 8D.",
        longDescription:
          "PPAP alone is a high-coordination document assembly that crosses every function. Customer-specific requirements from Ford, GM, and others stack on top. Warranty and 8D corrective action keep coming. Unifize gives all of it one home — so the customer scorecard doesn't slip.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "IATF 16949 | PPAP | APQP | FMEA | Control Plan | 8D | IMDS | Layered process audit",
          },
        ],
        meta: "Manufacturing",
      },
      {
        num: "07",
        title: "Cosmetics",
        description:
          "Personal-care brands and contract manufacturers under MoCRA and EU 1223/2009.",
        longDescription:
          "MoCRA brought new facility-registration, adverse-event-reporting, and safety-substantiation requirements. EU rules require a PIF and Responsible Person per SKU. Unifize keeps the safety files, supplier COAs, and adverse-event work tied to each SKU and ready for a retailer audit.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "MoCRA | 21 CFR Part 700 / 740 | 21 CFR Part 330 (OTC overlap) | ISO 22716 | EU CR 1223/2009 | PIF | AER / SAER",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "08",
        title: "Food Processing",
        description:
          "Food manufacturers under FSMA preventive controls and GFSI certification.",
        longDescription:
          "HACCP, allergen control, supplier COAs, corrective actions — all high-frequency, all weakly tooled in the mid-market. Unifize lands on corrective action and deviation management first, then carries through to the recall mock and the annual GFSI surveillance.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "FSMA | HACCP | 21 CFR Part 117 (PCHF) | SQF | BRCGS | FSSC 22000 | GFSI | Allergen control",
          },
        ],
        meta: "Food Production",
      },
      {
        num: "09",
        title: "Nutritional Supplements",
        description:
          "Dietary supplement brands and contract manufacturers under 21 CFR Part 111.",
        longDescription:
          "FDA 483s in this space almost always cite weak document control or CAPA. Identity-testing rigor, supplier qualification, and batch-record completeness are what move the needle. Unifize gives the brand owner and the co-man one thread, with trails NSF, USP, and Informed Sport will accept.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "21 CFR Part 111 | DSHEA | NDI notification | MMR / BPR | NSF supplement | USP Verified | Informed Sport",
          },
        ],
        meta: "Life Sciences",
      },
      {
        num: "10",
        title: "Chemicals",
        description:
          "Specialty chemical manufacturers serving pharma, food, and industrial markets.",
        longDescription:
          "When you supply pharma, GMP scrutiny lands on you. REACH, TSCA, and food-contact rules add documentation burden, and process safety adds incident workflows. Unifize is the governed layer where change control, supplier qualification, and incident investigation share one trail.",
        details: [
          {
            label: "Standards we speak",
            variant: "chips",
            body: "ICH Q7 | 21 CFR Part 211 | REACH | TSCA | GHS / CLP | OSHA PSM | EPA RMP | DMF | FCN / GRAS",
          },
        ],
        meta: "Manufacturing",
      },
    ],
  },
  {
    id: "domains",
    num: "02",
    eyebrow: "By domain",
    title: "By domain",
    blurb:
      "Each is a named door — a persona, a workflow, a trigger. None were designed to live in the seam between systems. That is the work Unifize does.",
    pattern: GLYPH_DOMAIN,
    items: [
      {
        num: "01",
        title: "Quality",
        href: "/domains/quality",
        description:
          "CAPAs, deviations, MRB, audit findings.",
        longDescription:
          "When a hold comes off, when an exception is granted, when an investigation closes — the trail of who decided what, when, and with what evidence usually lives in email and side channels. Unifize makes the conversation itself the audit trail, with the disposition and the record bound at the moment of decision.",
        meta: "Typically owned by VP Quality / QA Director",
      },
      {
        num: "02",
        title: "Operations",
        description:
          "WIP aging, production holds, schedule instability, MRB backlog.",
        longDescription:
          "Dispositions, engineering calls, lab results — your team chases them all day across email and escalation calls. Shortage allocation happens on a call with no record. Unifize gives every decision a trace and a clear owner, so the floor doesn't lose a shift waiting on a missing approval.",
        meta: "Typically owned by VP Operations / Plant Manager",
      },
      {
        num: "03",
        title: "Product Development",
        description:
          "End-to-end coordination from idea to commercial product — and every change after.",
        longDescription:
          "In medical devices it's DHF and design transfer. In pharma it's CMC and tech transfer. In aerospace and auto it's stage gates and PPAP. The structure is the same: multi-function sign-off, evidence packaging at each gate, sustaining change after launch. Unifize keeps the gate decisions, exit criteria, and impact assessments in one defensible place.",
        meta: "Typically owned by VP R&D / VP Engineering",
      },
      {
        num: "04",
        title: "Supplier Management",
        description:
          "Supplier qualification, PPAP/APQP, supplier CAPA, quality agreements, incoming inspection, RFQ-to-PO.",
        longDescription:
          "A supplier issue starts in email and ages there. The CPO, the SQ Director, and Quality all touch different pieces. Unifize gives the supplier one governed channel and your team one queue — with closure trails the auditor will accept.",
        meta: "Typically owned by CPO / Supplier Quality Director",
      },
      {
        num: "05",
        title: "Document and Records Control",
        description:
          "Procedure authoring, review, approval, controlled distribution, and obsolescence.",
        longDescription:
          "Audit findings come from a document in active use at a site that can't be tied back to an approval record. Unifize handles the multi-owner review, version integrity, and controlled distribution in one place — and fires the training cascade automatically when a procedure changes.",
        meta: "Typically owned by VP Quality / Doc Control Lead",
      },
      {
        num: "06",
        title: "Regulatory Affairs",
        description:
          "MDR/vigilance reporting, 510(k)/PMA/BLA prep, label approval across multi-market variants.",
        longDescription:
          "30-day MDR clock, 15-day EU NCA clock, hundreds of country-specific label variants — each on its own approval timeline. Unifize keeps the submission assembly, label changes, and vigilance commitments on one timeline you can defend.",
        meta: "Typically owned by Head of Regulatory Affairs",
      },
      {
        num: "07",
        title: "Change Control",
        description:
          "ECO and ECR workflows requiring multi-function sign-off, DHF evidence packaging, and version-controlled distribution.",
        longDescription:
          "Approvals happen in email threads; design reviews leave no record of what was decided or why. Unifize captures the impact assessments, the conditions accepted, and the cut-in plan — so the change record is whole when an audit asks.",
        meta: "Typically owned by VP Engineering / Head of R&D",
      },
      {
        num: "08",
        title: "Training and Competency",
        description:
          "Training cascades triggered by change control, new procedure releases, and audit findings.",
        longDescription:
          "Every SOP change should fire a training cascade, but the document system and the training system don't talk. Compliance gaps accumulate on every effective date. Unifize closes the loop: the workflow that releases the new SOP starts the cascade and tracks completion.",
        meta: "Typically owned by VP Quality / Head of Training",
      },
      {
        num: "09",
        title: "Customer Management",
        description:
          "RFQ response, bid evaluation, quote management, contract review.",
        longDescription:
          "Bid-evaluation rationale, qualification context, and approval threads live in email — until a dispute or rebid arrives and nobody can find them. Unifize keeps the customer-facing thread governed, so the next RFQ inherits the qualification, not the chaos.",
        meta: "Typically owned by VP Sales / Commercial Director",
      },
      {
        num: "10",
        title: "Supply Chain and Planning",
        description:
          "Shortage allocation, PO change management, expedite decisions, schedule freeze, supply disruption.",
        longDescription:
          "Three production lines compete for the same last component. The call happens, the decision sticks — and no one captures why. Unifize gives the commit point a structure, so the rationale outlives the call.",
        meta: "Typically owned by VP Supply Chain / CPO",
      },
      {
        num: "11",
        title: "Post-Market and Recall",
        description:
          "Complaint investigation, MDR/vigilance reporting, recall scope, FSCA execution.",
        longDescription:
          "A recall runs in parallel — manufacturing hold, customer notifications, returns logistics, regulatory filings — all under hard deadlines with cross-functional sign-off at every step. Unifize is the one place where those workflows share state.",
        meta: "Typically owned by VP Quality / Chief Medical Officer",
      },
      {
        num: "12",
        title: "Periodic Review and Data Governance",
        description:
          "APR, PQR, and data-integrity governance.",
        longDescription:
          "APR/PQR assembly pulls data from production, QA, complaints, stability, and regulatory on a hard internal deadline that costs the VP Quality weeks of personal time every year. Unifize keeps the evidence indexed and assembly-ready, year over year.",
        meta: "Typically owned by VP Quality / Head of Regulatory Affairs",
      },
      {
        num: "13",
        title: "Procurement and Sourcing",
        description:
          "Sourcing decisions, supplier selection, bid evaluation, commercial governance.",
        longDescription:
          "Award rationale and alternate-qualification context live in email and spreadsheets. The CPO and the SQ Director see different parts. Unifize keeps them aligned with one decision record.",
        meta: "Typically owned by CPO / Head of Procurement",
      },
      {
        num: "14",
        title: "Compliance",
        description:
          "CSV validation, data integrity, EHS, regulatory change management, cross-border alignment.",
        longDescription:
          "Compliance often runs as its own governance layer above or beside the QMS — a separate function with its own audit cycle. Unifize gives the Compliance & Validation team their own governed thread without forcing them onto the QMS.",
        meta: "Typically owned by Director of Quality Compliance / Validation Manager",
      },
    ],
  },
  {
    id: "buyer",
    num: "03",
    eyebrow: "By buyer",
    title: "By buyer persona",
    blurb:
      "Who you are when you walk in. Unifize is built for the people accountable for cross-functional execution — and for the auditors, regulators, and customers who hold them to it.",
    pattern: GLYPH_BUYER,
    items: [
      {
        num: "01",
        title: "Operations Leader",
        href: "/buyers/operations-leader",
        description:
          "COO, VP Operations, Plant Manager, GM, Site Director.",
        longDescription:
          "You're accountable for output, stability, and delivery across a site, business unit, or company. Unifize turns daily firefighting into a repeatable record — without slowing the floor down.",
      },
      {
        num: "02",
        title: "Quality governance",
        description:
          "VP Quality, Head of Quality, Quality Director, Quality Manager, QA Manager, RAQA Director.",
        longDescription:
          "You own release confidence, audit outcomes, and recurrence. Unifize gives you defensibility by default — so audit prep stops being a sprint.",
      },
      {
        num: "03",
        title: "Regulatory affairs governance",
        description:
          "Head of Regulatory Affairs, VP Regulatory, RA Director, RA Manager, Director of Regulatory Strategy.",
        longDescription:
          "You're on the clock for submissions, label currency, and vigilance — across markets you can't miss. Unifize keeps the cross-functional commitments, evidence chains, and label versions on one timeline.",
      },
      {
        num: "04",
        title: "Compliance & validation",
        description:
          "Validation Manager, CSV Lead, QA Validation Lead, Quality Compliance Manager, Director of Quality Compliance.",
        longDescription:
          "You keep validated systems defensible without becoming a bottleneck. Unifize captures controlled execution and audit-readiness as a byproduct of the work, not a separate project.",
      },
      {
        num: "05",
        title: "Supplier quality governance",
        description:
          "Supplier Quality Director, VP Supplier Quality, SQ Manager, Senior / Lead SQE.",
        longDescription:
          "You want zero supplier-caused line stops and clean audit results on supplier oversight. Unifize turns the supplier exchange into a governed channel with closure trails the auditor accepts.",
      },
      {
        num: "06",
        title: "Engineering change governance",
        description:
          "VP Engineering, Head of Engineering, Director of Engineering, NPI Manager, Engineering PM, R&D Director.",
        longDescription:
          "You move change through faster without losing control. Unifize keeps the ECO conversation, impact reviews, and cut-in decisions in one thread that survives the launch.",
      },
      {
        num: "07",
        title: "Innovation and NPI execution",
        description:
          "VP R&D, Head of NPI, NPI Program Director, Product Development Director, Design Transfer Lead.",
        longDescription:
          "You ship on time without skipping readiness. Unifize keeps validation, evidence packaging, and design-transfer decisions indexed against the design record.",
      },
      {
        num: "08",
        title: "Manufacturing engineering execution",
        description:
          "Manufacturing Engineering Manager, Process Engineering Manager, IE Manager, Methods Engineer Lead.",
        longDescription:
          "You keep processes stable while methods change. Unifize handles SOP-cascade adoption at the point of use, so revisions don't cause variation.",
      },
      {
        num: "09",
        title: "Lab operations and release testing",
        description:
          "Lab Manager, QC Manager, LIMS Owner, Quality Control Director.",
        longDescription:
          "Release moves at the speed of evidence completeness. Unifize tightens the loop between the lab decision, the deviation, and the disposition.",
      },
      {
        num: "10",
        title: "Supply chain execution",
        description:
          "VP Supply Chain, Planning Manager, Materials Manager, Logistics Manager.",
        longDescription:
          "You're keeping materials and finished goods moving while disruption hits. Unifize keeps allocation, expedite, and recovery decisions in one place — with explicit owners.",
      },
      {
        num: "11",
        title: "Procurement decisioning",
        description:
          "CPO, Head of Procurement, Category Manager, Strategic Sourcing Manager, Purchasing Manager.",
        longDescription:
          "You want sourcing outcomes Finance will recognise and a compliance posture you can defend. Unifize is where Procurement, Quality, and Engineering converge on one auditable award.",
      },
      {
        num: "12",
        title: "Customer service and field quality",
        description:
          "VP Customer Success, Head of Customer Service, Service Ops Director, Field Quality Manager.",
        longDescription:
          "You're closing complaints faster with less warranty drag. Unifize gives the field, the lab, and the QMS one shared thread for triage and closure.",
      },
      {
        num: "13",
        title: "EHS governance",
        description:
          "EHS Manager, Director of EHS, Safety Manager.",
        longDescription:
          "You own incident-closure discipline and compliance evidence. Unifize keeps the investigation, controls, and effectiveness checks tied to the incident — so recurrence stops climbing.",
      },
      {
        num: "14",
        title: "Finance governance",
        description:
          "CFO, VP Finance, Controller, Plant Controller, FP&A Director, Finance Business Partner.",
        longDescription:
          "You protect margin and cash with proof discipline. Unifize attaches the operational decision trail to the saving — so Finance can recognise it.",
      },
      {
        num: "15",
        title: "IT risk & enablement",
        description:
          "CIO, VP IT, IT Director, Enterprise Architect, CISO, Head of IT Applications, ERP Director.",
        longDescription:
          "You enable the business without adding risk. Unifize is a defensible, validated layer that sits between QMS, ERP, and PLM without expanding shadow IT.",
      },
      {
        num: "16",
        title: "Regulated systems governance",
        description:
          "Quality Systems Manager, Director of Quality Systems, Head of Digital Quality, VP IT (Life Sciences).",
        longDescription:
          "You're eliminating fragmentation across QMS, ERP, PLM, and MES while staying defensible under Part 11 and Annex 11. Unifize gives the cross-system decision trail one home — and AI tooling stops sitting on undocumented data.",
      },
      {
        num: "17",
        title: "Digital transformation & AI governance",
        description:
          "Head of Digital Transformation, CDO, AI Programme Manager, Director of Digital Innovation, VP Digital.",
        longDescription:
          "You're building AI capability on regulated data without losing defensibility. Unifize is the structured operational substrate that makes AI outputs auditable under GxP and Part 11.",
      },
      {
        num: "18",
        title: "Leader",
        description:
          "CEO, President, Managing Director.",
        longDescription:
          "You see catastrophic risk, customer trust, and the cost of execution surprises. Unifize is the layer that makes operational performance auditable across sites — and AI investment legible.",
      },
    ],
  },
];

export default function PlatformPage() {
  return (
    <main>
      <SiteHeader />

      <header className="mast surface dark hero platform-hero">
        <div className="mast-inner">
          <Eyebrow dot>Explore the platform</Eyebrow>
          <h1>
            Three doors.
            <br />
            <em>One governed layer.</em>
          </h1>
          <p className="sub">
            Pick the door that matches your starting point — the{" "}
            <strong>industry</strong> you operate in, the{" "}
            <strong>domain</strong> you own, or the{" "}
            <strong>buyer</strong> you are. Each leads to the same governed
            layer underneath.
          </p>
          <div className="hero-ctas">
            <Button arrow size="lg">
              Book a demo
            </Button>
            <Button variant="dark-ghost" size="lg">
              Read the thesis
            </Button>
          </div>
        </div>
      </header>

      <PlatformExplorer sections={SECTIONS} />

      <section className="section dark close-band">
        <div className="section-inner">
          <div className="close-grid">
            <div className="close-copy">
              <span className="section-eyebrow">The governed layer</span>
              <h2 className="section-title close-title">
                Same layer underneath. Different door in.
              </h2>
              <p className="close-sub">
                Whichever door you walked through, the work lives in one place
                and binds to the record at the moment of decision. No
                reconstruction from inboxes. No audit-prep sprint.
              </p>
              <div className="close-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
                <Button variant="dark-ghost" size="lg">
                  Back to the homepage
                </Button>
              </div>
            </div>
            <div className="close-visual">
              <DashboardShell />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer surface dark">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <strong>Unifize</strong>
          <span>People. Process. AI. Outcomes.</span>
          <span className="site-footer-desc">
            The governed layer for regulated processes.
          </span>
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="lab">Explore</span>
            <a href="/platform#industries">By industry</a>
            <a href="/platform#domains">By domain</a>
            <a href="/platform#buyer">By buyer</a>
          </div>
          <div>
            <span className="lab">Problem</span>
            <a href="/#thesis">Coordination tax</a>
            <a href="/#domains">The 15 domains</a>
            <a href="/#seam">The seam</a>
          </div>
          <div>
            <span className="lab">By industry</span>
            <a href="/platform#industries">Medical Devices</a>
            <a href="/platform#industries">Pharmaceuticals</a>
            <a href="/platform#industries">Aerospace</a>
            <a href="/platform#industries">Industrial Machinery</a>
          </div>
          <div>
            <span className="lab">How it works</span>
            <a href="/#how">Overview</a>
            <a href="/#benefits">What changes</a>
            <a href="/#proof">Proof</a>
          </div>
        </div>
      </div>
      <div className="site-footer-rule" />
      <div className="site-footer-base">
        <span>© Unifize 2026</span>
        <span>v0.7 · Platform exploration</span>
      </div>
    </footer>
  );
}
