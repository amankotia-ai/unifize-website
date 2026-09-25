/* ============================================================================
 * Procurement & Sourcing: domain (Solutions) page data. All values trace to
 * Notion.
 *
 * source: Domains DB -> "Procurement and Sourcing"
 *   (327860e6b45e812d81edca623d764bfc, Domain 14, Tier Secondary). The hero
 *   framing and the leak thesis are the row's Description: sourcing
 *   decisions, supplier selection and qualification, bid evaluation and
 *   commercial governance need alignment across procurement, quality and
 *   engineering without a decision trace; award rationale, alternate
 *   qualification decisions and bid criteria live in email and spreadsheets.
 *   Distinct from Supplier Quality (incoming quality, supplier CAPA, audit)
 *   and Supply Chain (planning, allocation, logistics). Named triggers: lost
 *   bid, alternate qualification delay, supplier capacity crisis, quality
 *   agreement negotiation bottleneck. Internal fields used for understanding
 *   only.
 * source: Themes DB, all 9 rows linked -> section 01 in three clusters.
 * source: Pain Points DB, all 3 rows linked (PNT-63 High; 64, 65 Medium).
 *   The hero is PNT-63: sourcing optimises unit price without the total cost
 *   of quality.
 * source: Trigger Events DB, all 5 rows linked. Three are Medium; the
 *   Solutions trigger type now carries Medium (SolutionTriggerRow), so the
 *   board features the domain's own named moments (lost bid, alternate
 *   qualification delay, quality agreement bottleneck). Supplier capacity
 *   crisis is featured on the supplier management page already.
 * source: Modules -> the Domains row links none. Shown: MDL-15 Supplier
 *   Quality (QMS), named by all three Pain Points' Modules Addressing;
 *   MDL-18 Product Specifications (PLM) for the Raw Material and Component
 *   Specification Theme; MDL-25 FAI & Control Plan Execution (MES) for the
 *   New Part Approval and First Article Inspection Theme. MDL-70 Vendor
 *   Portal is also named but is in development, so it is not shown.
 * source: Website Customer Videos mirror -> five supplier and specification
 *   films none of the other Solutions pages use; facts from each film's title.
 * The arcade record (award AW-0418 for the seal housing) and every cell
 *   artifact are illustrative furniture, never claims.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";

/* ------------------------------------------------------------------------
 * The live arcade journey: a sourcing award for the seal housing, from the
 * request for quote to the onboarded supplier. */
const AWARD_WORLD: ArcadeFlowWorld = {
  team: "Procurement",
  recordNoun: "Sourcing Award",
  owner: "S. Lindqvist",
  ownerInitials: "SL",
  participants: ["SL", "HT", "VR", "+2"],
  participantsLabel: "S. Lindqvist, H. Tan, V. Rao, and two others",
  recordKicker: "SOURCING AWARD",
  context: {
    initials: "SL",
    name: "S. Lindqvist",
    time: "09:00",
    message: "RFQ out for the seal housing, three suppliers.",
    detail: "SPC-310 Rev C attached · quotes due Friday",
  },
  inboxNeighbors: [
    { title: "Westline requalification", time: "11:30", detail: "Last assessed 2023 · overdue", kind: "Requalification" },
    { title: "Quality agreement · Northgate", time: "10:15", detail: "Change notification clause open", kind: "Agreement" },
    { title: "Q3 scorecard refresh", time: "Yesterday", detail: "Owner not assigned", kind: "Scorecard" },
  ],
  checklistTitle: "Sourcing Award",
  checklistSections: [
    {
      title: "REQUEST",
      items: [
        { label: "Specification", note: "SPC-310 · seal housing · Rev C" },
        { label: "Suppliers invited", note: "Apex, Westline, Northgate" },
        { label: "Quotes received", note: "3 of 3" },
      ],
    },
    {
      title: "EVALUATION",
      items: [
        { label: "Commercial", note: "Unit price · lead time · terms" },
        { label: "Quality history", note: "SCARs · rejections · ppm" },
        { label: "Engineering fit", note: "Capability confirmed" },
      ],
    },
    {
      title: "AWARD",
      items: [
        { label: "Cross-functional review", kind: "approval", signer: "H. Tan", state: "Approved" },
        { label: "Award approval", kind: "approval", signer: "M. Okafor", state: "Signed" },
        { label: "Supplier onboarded", note: "Approved list · quality agreement" },
      ],
    },
  ],
};

/* the same record as the approver sees it */
const APPROVER_WORLD: ArcadeFlowWorld = { ...AWARD_WORLD, viewer: "M. Okafor", viewerInitials: "MO" };

const AWARD_REC = {
  type: "Sourcing Award",
  id: "AW-0418",
  title: "Seal housing · SPC-310",
  world: AWARD_WORLD,
} as const;

export const PROCUREMENT_AND_SOURCING_DATA: DomainPageData = {
  slug: "procurement-and-sourcing",
  name: "Procurement & Sourcing",
  tier: "Secondary",

  hero: {
    crumb: "Procurement & Sourcing",
    titleLead: "The award went to the lowest price.",
    titleTurn: "The rework came with it.",
    sub: "Award rationale, bid criteria and alternate-qualification calls live in email and spreadsheets, so sourcing sees unit price and never the cost of quality. Unifize keeps the evaluation, the evidence and the award on one record quality can read.",
    chips: ["Supplier selection", "Bid evaluation", "Alternate sources", "Part approval", "Purchase orders"],
    floats: [
      { kind: "seal", title: "Awarded on the record", meta: "AW-0418 · evaluation and approver" },
      { kind: "clock", title: "Alternate qualification running long", meta: "Single-source risk stays open" },
    ],
    runsIn: {
      label: "Runs wherever a supplier choice is audited",
      links: [
        { name: "Automotive", href: "/industries/automotive" },
        { name: "Aerospace", href: "/industries/aerospace" },
        { name: "Medical devices", href: "/industries/medical-devices" },
        { name: "Industrial machinery", href: "/industries/industrial-machinery" },
        { name: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside */
  work: {
    heading: "Every supplier choice, with its reasons.",
    lede: "The sourcing work procurement, quality and engineering run together, as governed decisions: the criteria, the evidence and who agreed, next to the supplier they chose.",
    groups: [
      {
        glyph: "scale",
        name: "Choosing the supplier",
        line: "Selection, qualification and the alternate you need before you need it.",
        runsIn: { label: "Supplier records run in the QMS product →", href: "/products/qms" },
        viz: {
          kind: "bids",
          wash: "sky",
          cursor: { name: "S. Lindqvist", tone: "#7c3aed" },
          kicker: "Bid evaluation · seal housing",
          rows: ["Unit price", "Lead time", "SCARs, 12 mo", "Total cost"],
          suppliers: [
            { name: "Westline", cells: ["$4.10", "4 wk", "3", "$4.92"], flag: 2 },
            { name: "Apex", cells: ["$4.55", "5 wk", "0", "$4.61"], pick: true },
            { name: "Northgate", cells: ["$4.80", "3 wk", "1", "$4.95"] },
          ],
        },
        items: [
          { name: "Supplier Selection and Qualification", line: "New suppliers evaluated, audited and onto the approved list with every record aligned." },
          { name: "Emergency Supplier Authorization and Alternate Source Qualification", line: "A months-long qualification compressed into days without undisclosed risk." },
          { name: "Supplier Quality Management", line: "Scorecards, audits and agreements kept current, so the approved list stays true." },
        ],
      },
      {
        glyph: "doc",
        name: "Specifying and approving the part",
        line: "The spec the supplier builds to, and the proof the first parts meet it.",
        runsIn: { label: "Specifications run in the PLM product →", href: "/products/plm" },
        viz: {
          kind: "fai",
          wash: "warm",
          cursor: { name: "V. Rao", tone: "#0f8f7e" },
          part: "Seal housing",
          drawing: "DWG-310 Rev C",
          rows: [
            { n: 1, char: "Bore diameter", nominal: "22.00", actual: "22.01", ok: true },
            { n: 2, char: "Flange thickness", nominal: "3.50", actual: "3.49", ok: true },
            { n: 3, char: "Seal groove depth", nominal: "1.20", actual: "1.31", ok: false },
            { n: 4, char: "Surface finish", nominal: "Ra 0.8", actual: "Ra 0.7", ok: true },
          ],
        },
        items: [
          { name: "Raw Material and Component Specification Management", line: "Specs versioned and approved, and the supplier's acknowledgement of the current one on record." },
          { name: "New Part Approval and First Article Inspection", line: "Production gated until the first parts are proven against the latest drawing." },
          { name: "Inbound Inspection and Quarantine", line: "Failed receipts linked back to the supplier and the award that chose them." },
        ],
      },
      {
        glyph: "box",
        name: "Ordering",
        line: "Purchase orders released to suppliers in good standing, and every change agreed.",
        viz: {
          kind: "gate",
          wash: "blue",
          cursor: { name: "M. Okafor", tone: "#d97706" },
          po: "PO-90114",
          supplier: "Westline",
          checks: [
            { label: "On the approved list", ok: true, note: "Approved" },
            { label: "Quality agreement", ok: true, note: "Signed" },
            { label: "Requalification", ok: false, note: "Last assessed 2023" },
          ],
          verdict: "Release held until requalification",
        },
        items: [
          { name: "Purchase Order Approval and Release", line: "POs released only once the supplier's status and agreements check out." },
          { name: "Purchase Order Change Management", line: "Changes to an open order confirmed by the supplier in writing." },
          { name: "Shortage and Expedite Management", line: "Substitutions approved on the record when supply runs short." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks */
  leaks: {
    heading: "The award looked cheaper. The cost arrived later.",
    lede: "The failure modes we see inside procurement and sourcing. None of them is a missing feature. All of them are supplier decisions made without the quality record in view.",
    scene: {
      kicker: "Q3 sourcing review",
      chip: "Slide 7",
      title: "The award slide",
      rows: [
        { state: "done", label: "Westline", age: "$4.10" },
        { state: "done", label: "Apex", age: "$4.55" },
        { state: "idle", label: "Cost of quality", age: "not on the slide", warn: true },
      ],
      float: { kicker: "Receiving · six months later", note: "Westline lot rejected again. Third SCAR this quarter." },
      caption: "The deck showed price. The cost of quality was never on it.",
      slide: {
        deck: "Q3 sourcing review",
        title: "Seal housing: recommend Westline",
        bars: [
          { name: "Westline", value: 4.1, label: "$4.10", pick: true },
          { name: "Apex", value: 4.55, label: "$4.55" },
          { name: "Northgate", value: 4.8, label: "$4.80" },
        ],
        callout: "Saves 10% on unit price",
        page: "7 / 14",
      },
    },
    pains: [
      {
        severity: "High",
        surface: "The bid sheet",
        name: "Sourcing decisions optimise unit price without total quality cost",
        short: "Price is on the sheet. Rework, SCARs and scrap are not.",
        body: "Sourcing has a clean view of unit price, lead time and terms, and no view of the supplier's cost of quality: rework, SCAR cycles, expedites, scrap. Decisions optimise the visible cost at the expense of the hidden one.",
      },
      {
        severity: "Medium",
        surface: "The approved list",
        name: "Supplier requalification cadence drifts without trigger",
        short: "The list says current. Nobody has reassessed in three years.",
        body: "Requalification slips whenever sourcing and quality are busy. The approved supplier list claims a supplier is current when it has not been formally reassessed in three years.",
      },
      {
        severity: "Medium",
        surface: "The scorecard",
        name: "Sourcing scorecard refresh stalls without owner accountability",
        short: "The scorecard becomes history, not a current view.",
        body: "Scorecards are meant to be refreshed quarterly. With no owner and no time blocked for it, the refresh happens partially or not at all.",
      },
    ],
    note: "Severity as rated in our field research with procurement and supplier quality teams, current as of the last review.",
    tax: {
      label: "The recurring bill",
      value: "A supplier chosen on price, paid for in SCARs.",
      meta: "Rework, corrective action cycles and expedites land on quality and operations long after the award, and nothing ties them back to the choice.",
      tail: "That hidden cost is the coordination tax.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: the Domains Description (award rationale, bid criteria) and
   * PNT-63; the Supplier Selection and Qualification Theme. Times narrative. */
  flow: {
    heading: "Award on the whole record, not the unit price.",
    lede: "Most procurement tools record the PO. Unifize holds the award decision itself: the bids next to each supplier's quality history, the cross-functional review and the approver, so the next buyer can see why.",
    trailLabel: "How the award moves",
    trail: [
      { t: "RFQ issued with the current spec", who: "Buyer", when: "Day 0" },
      { t: "Bids bound to each supplier's quality history", who: "Procurement · Supplier Quality", when: "Day 6" },
      { t: "Scored across procurement, quality and engineering", who: "Sourcing team", when: "Day 8" },
      { t: "Award approved", who: "Procurement Director", when: "Day 9" },
      { t: "Supplier onboarded · rationale sealed", who: "Supplier Quality", when: "Day 12" },
    ],
    steps: [
      { title: "Request the quote", body: "Three suppliers, one spec: SPC-310 Rev C attached to the RFQ.", icon: "rfq" },
      { title: "Compare the whole record", body: "Each bid beside the supplier's SCARs and rejections, not just price.", icon: "compare" },
      { title: "Score it together", body: "Procurement, quality and engineering weigh in on one thread.", icon: "score" },
      { title: "Award it", body: "M. Okafor approves Apex on total cost, with the reason attached.", icon: "award" },
      { title: "Onboard the supplier", body: "Approved list, quality agreement and requalification date, set.", icon: "onboard" },
    ],
    trailFoot: "The award runs back to the bids that informed it and forward into every PO and receipt it governs. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / sourcing / AW-0418",
    mobileLabel: "Sourcing award trace",
    mobileId: "AW-0418 · RFQ → bids → scoring → award → onboarding",
    arcade: {
      steps: [
        {
          ...AWARD_REC,
          source: "PS · AW-0418 · rfq",
          ghost: "Request",
          status: "Open",
          actor: "You",
          event: "Issued the RFQ to three suppliers",
          eventDetail: "SPC-310 Rev C attached · quotes due Friday",
          checklist: "REQUEST",
          checklistItems: ["Specification", "Suppliers invited", "Quotes received"],
          focus: "record",
          focusRows: ["Seal housing · SPC-310 Rev C", "Apex, Westline, Northgate invited"],
          focusTitle: "Request for quote",
          ownershipNote: "One record from the first request",
          checklistOpen: "REQUEST",
          checklistProgress: { REQUEST: 2, EVALUATION: 0, AWARD: 0 },
        },
        {
          ...AWARD_REC,
          source: "PS · AW-0418 · compare",
          ghost: "Compare",
          status: "Open",
          actor: "automator",
          event: "Bound each bid to the supplier's quality history",
          eventDetail: "SCARs, rejections and ppm beside price and lead time",
          checklist: "EVALUATION",
          checklistItems: ["Commercial", "Quality history", "Engineering fit"],
          focus: "trace",
          focusTitle: "Bids with their history",
          focusRows: ["Westline · $4.10 · 3 SCARs in 12 months", "Apex · $4.55 · no SCARs", "Northgate · $4.80 · 1 SCAR"],
          focusAction: "Open the comparison",
          ownershipNote: "The hidden cost is on the table",
          checklistOpen: "EVALUATION",
          checklistProgress: { REQUEST: 3, EVALUATION: 2, AWARD: 0 },
          related: 3,
        },
        {
          ...AWARD_REC,
          source: "PS · AW-0418 · score",
          ghost: "Score",
          status: "In Review",
          actor: "Unifize Assistant",
          event: "Sourcing team reviewing the award",
          eventDetail: "Procurement, quality and engineering on one thread",
          checklist: "AWARD",
          checklistItems: ["Cross-functional review", "Award approval", "Supplier onboarded"],
          focus: "review",
          focusTitle: "Award · seal housing",
          focusRows: ["Procurement · Apex on total cost", "Quality · Apex, no open SCARs", "Engineering · both capable"],
          focusAction: "Approve award",
          focusAlts: ["Return with comment"],
          ownershipNote: "The criteria stay with the award",
          checklistOpen: "AWARD",
          checklistProgress: { EVALUATION: 3, AWARD: 0 },
        },
        {
          ...AWARD_REC,
          source: "PS · AW-0418 · award",
          ghost: "Award",
          status: "Needs Approval",
          actor: "You",
          event: "Approving the award to Apex",
          eventDetail: "Signer, meaning and time seal to AW-0418",
          checklist: "AWARD",
          checklistItems: ["Cross-functional review", "Award approval", "Supplier onboarded"],
          focus: "signature",
          focusTitle: "Apply your signature",
          focusRows: [],
          focusAction: "Confirm and sign",
          ownershipNote: "The approver is on the record",
          world: APPROVER_WORLD,
          checklistOpen: "AWARD",
          checklistProgress: { AWARD: 1 },
          signedItems: [
            { name: "H. Tan", initials: "HT", role: "Supplier quality review", approvalId: "6B04A0418C19", time: "Day 8" },
          ],
        },
        {
          ...AWARD_REC,
          source: "PS · AW-0418 · onboard",
          ghost: "Onboard",
          status: "Approved",
          actor: "automator",
          event: "Apex onboarded for the seal housing",
          eventDetail: "Approved list updated · quality agreement linked · requalification set",
          checklist: "AWARD",
          checklistItems: ["Cross-functional review", "Award approval", "Supplier onboarded"],
          focus: "history",
          focusKicker: "DECISION TRACE",
          focusTitle: "Why Apex won",
          focusRows: ["AW-0418 · awarded on total cost", "Bids, quality history and reviewers on the record", "Requalification due in 24 months"],
          ownershipNote: "Readable at the next award",
          checklistOpen: "AWARD",
          signedItems: [
            { name: "M. Okafor", initials: "MO", role: "Procurement Director", approvalId: "6B04A0418D52", time: "Day 9" },
          ],
          related: 3,
        },
      ],
    },
  },

  /* ------------------------------------------------ 04 · for your industry */
  industries: {
    heading: "Sourcing, in your regulatory frame.",
    lede: "The same supplier decisions, under the purchasing controls you are audited against.",
    rows: [
      { name: "Automotive", line: "Supplier selection and PPAP before production.", chips: ["IATF 16949 8.4"], href: "/industries/automotive" },
      { name: "Aerospace", line: "Approved sources and first article inspection.", chips: ["AS9100 8.4", "AS9102"], href: "/industries/aerospace" },
      { name: "Medical devices", line: "Purchasing controls and supplier evaluation records.", chips: ["21 CFR 820.50", "ISO 13485 7.4"], href: "/industries/medical-devices" },
      { name: "Industrial machinery", line: "Component sourcing with quality history in view.", chips: ["ISO 9001 8.4"], href: "/industries/industrial-machinery" },
      { name: "Pharmaceuticals", line: "Supplier qualification and quality agreements.", chips: ["ICH Q10", "21 CFR 211.84"], href: "/industries/pharmaceuticals" },
    ],
    foot: "Yours not listed? Purchasing controls work the same way under ISO 9001.",
  },

  /* ------------------------------------------------ 05 · the modules */
  coverage: {
    heading: "The supplier's whole record, behind every award.",
    lede: "The supplier's quality history, the spec it builds to and the proof its first parts meet it, on the same record as the award.",
    standardFilters: ["ISO 9001", "IATF 16949", "AS9100", "21 CFR 820"],
    groups: [
      {
        slug: "qms",
        name: "Quality Management System",
        tier: "Primary",
        promise: "Qualification, corrective actions and scorecards: the quality history every award should weigh.",
        modules: [
          { name: "Supplier Quality", blurb: "Supplier qualification, corrective action requests and scorecard maintenance.", href: "/products/qms" },
        ],
      },
      {
        slug: "plm",
        name: "Product Lifecycle Management",
        tier: "Secondary",
        promise: "The specification the supplier quotes against and builds to.",
        modules: [
          { name: "Product Specifications", blurb: "Specification records for materials, components and assemblies, versioned and approved.", href: "/products/plm" },
        ],
      },
      {
        slug: "mes",
        name: "Manufacturing Execution System",
        tier: "Secondary",
        promise: "First article inspection that gates the new supplier's parts into production.",
        modules: [
          { name: "FAI & Control Plan Execution", blurb: "First article inspection and control plan execution with results and disposition.", href: "/products/mes" },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role */
  personas: {
    heading: "An award has three signatures behind it.",
    lede: "Find yours.",
    cards: [
      {
        key: "procurement",
        iconKey: "regulatory",
        name: "Procurement leadership",
        stake: "Owns the award",
        titles: ["Chief Procurement Officer", "Head of Procurement", "Procurement Director"],
        value: "Every award carries its criteria and the supplier's quality history, so savings are real savings.",
        cares: "Total cost · Supplier risk · Cycle time",
        worries: "Hidden cost of quality · Single sources",
        primary: true,
      },
      {
        key: "buyers",
        iconKey: "operations",
        name: "Buyers and category managers",
        stake: "Run the sourcing event",
        titles: ["Buyer", "Category Manager", "Sourcing Manager"],
        value: "RFQs, bids and POs sit next to the supplier's standing, so a release never waits on a spreadsheet.",
        cares: "Responsive suppliers · Clean POs",
        worries: "Bids decided in email · Stale scorecards",
      },
      {
        key: "supplier-quality",
        iconKey: "quality",
        name: "Supplier quality",
        stake: "Qualifies the source",
        titles: ["Supplier Quality Engineer", "Supplier Quality Director"],
        value: "Qualification, requalification and FAI evidence are part of the award, not an afterthought.",
        cares: "Qualified sources · Requalification cadence",
        worries: "Suppliers chosen before they are assessed",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Engineering",
        stake: "Confirms the fit",
        titles: ["Design Engineer", "Manufacturing Engineer"],
        value: "Technical fit is signed on the award, against the current specification.",
        cares: "Capability · Spec compliance",
        worries: "Parts built to an old drawing",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, all 5 rows linked. */
  triggers: {
    heading: "When a supplier choice comes due.",
    lede: "Each of these starts a clock, and each routes into a governed decision, so the sourcing call is made on the record it will be judged by.",
    rows: [
      {
        name: "Lost bid",
        clock: "Weeks · feed it back before the next bid",
        severity: "High",
        routesTo: "Supplier Quality",
        owner: "Sales · Quality · Engineering · Operations",
        viz: "debrief",
        detail: ["Housing assembly · OEM bid", "!Lead time|3", "Qualification status|2", "Price|1", "Responsiveness|1"],
      },
      {
        name: "Alternate supplier qualification delay",
        clock: "Weeks · single-source risk stays open",
        severity: "Medium",
        routesTo: "Supplier Quality",
        owner: "Procurement · Supplier Quality · Engineering",
        viz: "gantt",
        detail: ["Northgate", "Documents|5|4", "Audit|7|9", "Samples|10|24", "First article|7|0"],
      },
      {
        name: "Quality agreement negotiation bottleneck",
        clock: "Weeks · qualification waits on it",
        severity: "Medium",
        routesTo: "Supplier Quality",
        owner: "Quality · Procurement · Legal",
        viz: "clauses",
        detail: ["Quality agreement · Northgate", "Audit rights|agreed", "Change notification|Round 3", "Sub-tier disclosure|Round 2", "Termination|agreed"],
      },
      { name: "Supplier capacity crisis", clock: "Weeks · within the supplier's recovery window", severity: "High", routesTo: "Supplier Quality", owner: "Procurement · Supply Chain · Commercial" },
      { name: "PO change chaos", clock: "Days", severity: "Medium", routesTo: "Supplier Quality", owner: "Procurement · Planning · Finance" },
    ],
    featured: ["Lost bid", "Alternate supplier qualification delay", "Quality agreement negotiation bottleneck"],
  },

  /* ------------------------------------------------ 08 · coexistence */
  coexistence: {
    heading: "It sits beside the systems you already run.",
    systemsOfRecord: ["ERP", "PLM", "QMS", "MES"],
    body: "Your ERP keeps the purchase orders and prices; the award decisions and supplier evidence run on Unifize.",
    diagramCaption: "Unifize as the sourcing decision layer beside your ERP, PLM, QMS and MES.",
    bands: {
      lede: "Keep the ERP that holds purchase orders, prices and vendor master data. The evaluation, the award and the supplier's quality record run on Unifize, approved with a named signature.",
      note: "No supplier quality system yet? Supplier Quality ships in the QMS above.",
      tools: {
        title: "Bid sheets and inboxes",
        sub: "Stop being the record",
        names: ["Sheets", "Email", "Meetings", "Drives"],
        label: "Where award rationale used to live",
        body: "The bid tab, the award email and the review deck stop being where the reason for a supplier choice lives.",
      },
      back: "One record per award, the bids and quality history bound, and only the approved choice goes back to the ERP.",
    },
  },

  /* ------------------------------------------------ 09 · proof */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, plus the teams who run their supplier and specification work on Unifize, in their own words.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on non-conformance coordination at a medical-device manufacturer. The figure is anonymized.",
    },
    stills: [
      { wistia: "fbk68mk5yw", fact: "Rejections caught by looking at the data" }, /* Seth Bozman */
      { wistia: "x98prmmwgc", fact: "Faster approvals on product specifications" }, /* Jesse Kolstad, Biovation Labs */
      { wistia: "mn4ooo6r95", fact: "Corrective actions and risk on raw materials" }, /* Wilson Lin, Applechem */
      { wistia: "qpl36rd9bh", fact: "The quality problems nutraceutical makers face" }, /* Jesse Kolstad, Biovation Labs */
      { wistia: "vq0ikj3duz", fact: "Why Carol uses Unifize now" }, /* Carol Wilson */
    ],
    references: [
      { tag: "Named reference", name: MD_PROOF.customers[0].name, desc: MD_PROOF.customers[0].desc },
    ],
    foot: { label: "All customer stories", href: "/resources/testimonials" },
  },

  trust: null,
  caseKit: null,

  growth: {
    heading: "Choose the supplier. Then manage it.",
    lede: "Sourcing runs on the same governed record as supplier quality and supply planning.",
    steps: [
      { name: "Procurement & sourcing", note: "You are here" },
      { name: "Supplier management", note: "Solution page", href: "/solution/supplier-management" },
      { name: "Supply chain & planning", note: "Solution page", href: "/solution/supply-chain-and-planning" },
    ],
  },

  close: {
    eyebrow: "Sourcing on Unifize",
    heading: "Award it. Keep the reason.",
    lede: "Bring one real award, a stalled alternate qualification or a quality agreement stuck in negotiation, and see it run on your own work in a 30-minute walkthrough.",
  },
};
