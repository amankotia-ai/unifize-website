/* ============================================================================
 * Customer Management: domain (Solutions) page data. All values trace to
 * Notion.
 *
 * source: Domains DB -> "Customer Management"
 *   (31d860e6b45e81f0a0cbef6847ed6553, Domain 6, Tier Secondary). The hero
 *   framing and the leak thesis are the row's Description: RFQ response, bid
 *   evaluation, quote management and contract review need engineering,
 *   quality and commercial to coordinate under time pressure; the trace is
 *   lost when approvals happen in email, qualification context is not
 *   packaged with responses, and bid rationale is not kept for the next RFQ
 *   or a customer dispute. Named triggers: lost bid, missed RFQ deadline,
 *   customer responsiveness complaint. Entry point for contract
 *   manufacturers, CDMOs and job shops. Internal fields used for
 *   understanding only.
 * source: Themes DB, all 9 rows linked -> section 01 in three clusters.
 *   TH-165 Warranty Claims Management is self-flagged DUPLICATE CANDIDATE
 *   (of TH-176); it is listed once.
 * source: Pain Points DB, all 3 rows linked (PNT-66 High; 67, 68 Medium).
 * source: Trigger Events DB, all 5 rows linked (TE-26, 28, 25, 13, 27).
 * source: Modules -> the Domains row links 14 modules, all in two products
 *   (UPD FSM Field Service Management, UPD CRM Customer Requirements
 *   Management), both priced Enhancements with no product page. The other
 *   Solutions pages treat Enhancements without a page as not yet shown
 *   (post-market lists FSM and CRM as in development), so neither is named
 *   here. The modules shown are the live ones this domain's Pain Points name
 *   in Modules Addressing: MDL-14 Audit Management, MDL-16 Complaint
 *   Handling, MDL-6 CAPA (QMS) and MDL-9 Document Control (DMS). MDL-66
 *   Customer Requirements Tracking (APQP & PPAP) is in development.
 * source: Website Customer Videos mirror -> four films none of the other
 *   Solutions pages use; no film is about quoting or customer requirements,
 *   so these are the closest: connected data, commercialisation, cutting
 *   duplicated work. Facts from each film's title.
 * The arcade record (RFQ response RQ-2231 for a housing assembly) and every
 *   cell artifact are illustrative furniture, never claims.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";

/* ------------------------------------------------------------------------
 * The live arcade journey: an RFQ response, from the request to the
 * customer's requirements flowed down after the award. */
const RFQ_WORLD: ArcadeFlowWorld = {
  team: "Commercial",
  recordNoun: "RFQ Response",
  owner: "C. Duarte",
  ownerInitials: "CD",
  participants: ["CD", "VR", "HT", "+2"],
  participantsLabel: "C. Duarte, V. Rao, H. Tan, and two others",
  recordKicker: "RFQ RESPONSE",
  context: {
    initials: "CD",
    name: "C. Duarte",
    time: "08:40",
    message: "RFQ in from Northwind for the housing assembly.",
    detail: "Drawing HA-220 · requirements manual Rev 7 · due Friday 17:00",
  },
  inboxNeighbors: [
    { title: "Northwind contract amendment", time: "10:20", detail: "Change notification clause · legal review", kind: "Contract" },
    { title: "Complaint · CMP-0714", time: "09:05", detail: "Housing crack · lot 24-331", kind: "Complaint" },
    { title: "Customer audit · 14 Oct", time: "Yesterday", detail: "Evidence pack requested", kind: "Audit" },
  ],
  checklistTitle: "RFQ Response",
  checklistSections: [
    {
      title: "REQUEST",
      items: [
        { label: "Drawing and specification", note: "HA-220 · Rev B" },
        { label: "Customer requirements", note: "Manual Rev 7 · special characteristics" },
        { label: "Due", note: "Friday 17:00 · customer portal" },
      ],
    },
    {
      title: "INPUTS",
      items: [
        { label: "Engineering feasibility", note: "Feasible with new fixture" },
        { label: "Quality capability", note: "SC-4 needs 100% check" },
        { label: "Capacity", note: "Line 3 · from week 44" },
      ],
    },
    {
      title: "QUOTE & COMMITMENT",
      items: [
        { label: "Quote review", kind: "approval", signer: "H. Tan", state: "Approved" },
        { label: "Commercial approval", kind: "approval", signer: "E. Brandt", state: "Signed" },
        { label: "Requirements flowed down", note: "Control plan · inspection plan" },
      ],
    },
  ],
};

/* the same record as the approver sees it */
const APPROVER_WORLD: ArcadeFlowWorld = { ...RFQ_WORLD, viewer: "E. Brandt", viewerInitials: "EB" };

const RFQ_REC = {
  type: "RFQ Response",
  id: "RQ-2231",
  title: "Northwind · housing assembly",
  world: RFQ_WORLD,
} as const;

export const CUSTOMER_MANAGEMENT_DATA: DomainPageData = {
  slug: "customer-management",
  name: "Customer Management",
  tier: "Secondary",

  hero: {
    crumb: "Customer Management",
    titleLead: "The RFQ closes Friday.",
    titleTurn: "Engineering hasn't seen it yet.",
    sub: "Quotes, contract terms and customer requirements are pieced together across engineering, quality and sales in email threads, so responses run late and what they promised never reaches the floor. Unifize runs the response, and the commitments it makes, on one record.",
    chips: ["RFQ response", "Contract review", "Customer requirements", "Complaints", "Customer audits"],
    floats: [
      { kind: "seal", title: "Quoted on the record", meta: "RQ-2231 · inputs and approver" },
      { kind: "clock", title: "Missed RFQ deadline", meta: "Revenue and relationship both at stake" },
    ],
    runsIn: {
      label: "Runs wherever customers audit their suppliers",
      links: [
        { name: "Automotive", href: "/industries/automotive" },
        { name: "Aerospace", href: "/industries/aerospace" },
        { name: "Industrial machinery", href: "/industries/industrial-machinery" },
        { name: "Medical devices", href: "/industries/medical-devices" },
        { name: "Contract research orgs", href: "/industries/cro" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside */
  work: {
    heading: "Every promise to a customer, on the record.",
    lede: "The customer work commercial, engineering and quality run together, as governed workflows: the response assembled in time, the commitment it makes carried to the floor, and the customer's voice routed to the right owner.",
    groups: [
      {
        glyph: "chat",
        name: "Winning the work",
        line: "Quotes and contracts answered on the customer's deadline, with every function's input on them.",
        viz: {
          kind: "quote",
          wash: "sky",
          cursor: { name: "C. Duarte", tone: "#7c3aed" },
          rfq: "RQ-2231",
          customer: "Northwind",
          due: "Due Fri 17:00",
          inputs: [
            { fn: "Engineering", note: "Feasible with new fixture", done: true },
            { fn: "Quality", note: "SC-4 needs 100% check", done: true },
            { fn: "Operations", note: "Capacity from week 44", done: true },
            { fn: "Pricing", note: "Waiting on fixture cost", done: false },
          ],
        },
        items: [
          { name: "Customer Quote and RFQ Response", line: "Technical inputs gathered, pricing defended and the quote submitted on the customer's deadline." },
          { name: "Contract Review", line: "Redlines routed across legal, quality and finance, and the commitments tracked to delivery." },
        ],
      },
      {
        glyph: "doc",
        name: "Keeping the promise",
        line: "What the customer specified, reaching the documents, the shipment and the date.",
        viz: {
          kind: "coc",
          wash: "warm",
          cursor: { name: "H. Tan", tone: "#0f8f7e" },
          title: "Certificate of conformance",
          fields: [
            { k: "Customer", v: "Northwind" },
            { k: "Part", v: "HA-220" },
            { k: "Lot", v: "24-339" },
            { k: "Spec", v: "Rev B", bad: "PO calls Rev C" },
            { k: "Quantity", v: "1,200" },
          ],
          signer: "Quality release",
        },
        items: [
          { name: "Customer Specification and Contract Change", line: "A customer's change walked through every function it touches and proven back to them." },
          { name: "On-Time Delivery and Shipment Commitment", line: "Commitments monitored, slippage told early, root cause closed with the customer." },
          { name: "Shipping Documentation and Distribution Control", line: "Certificates and shipping documents in step with the batch and the order." },
        ],
      },
      {
        glyph: "pulse",
        name: "After the sale",
        line: "Complaints, feedback and warranty claims, each sent where it belongs.",
        viz: {
          kind: "triage",
          wash: "blue",
          cursor: { name: "R. Iqbal", tone: "#d97706" },
          kicker: "Customer input · this week",
          items: [
            { text: "Housing cracked at assembly", tag: "Complaint", to: "Quality · CMP-0714" },
            { text: "Would like a longer cable option", tag: "Feedback", to: "Product management" },
            { text: "Unit failed inside 12 months", tag: "Warranty", to: "Service · claim review" },
          ],
        },
        items: [
          { name: "Customer Feedback and Voice of Customer", line: "Complaints kept apart from feedback, and both turned into decisions." },
          { name: "Warranty Claims Management", line: "Claims decided consistently and linked back to design and supplier cause." },
          { name: "Installed Base and Product Discontinuation", line: "Customers told early, and supported through the end of the support window." },
          { name: "Product Lifecycle and Obsolescence Management", line: "Obsolescence communicated to customers before it reaches them." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks */
  leaks: {
    heading: "Acknowledged. Never flowed down.",
    lede: "The failure modes we see inside customer management. None of them is a missing feature. All of them are customer commitments that stopped at the inbox.",
    scene: {
      kicker: "Northwind requirements",
      chip: "Acknowledged",
      title: "The requirements manual",
      rows: [
        { state: "done", label: "Manual received", age: "12 Mar" },
        { state: "done", label: "Acknowledged", age: "12 Mar" },
        { state: "idle", label: "Special characteristics", age: "not flowed down", warn: true },
      ],
      float: { kicker: "Customer audit · finding", note: "Special characteristic SC-4 is not on the control plan." },
      caption: "Signed for in March. SC-4 never reached the control plan.",
      manual: {
        customer: "Northwind",
        title: "Customer-specific requirements",
        rev: "Rev 7",
        stamp: "Acknowledged 12 Mar",
        toc: [
          { n: "2", name: "Part approval format" },
          { n: "3", name: "Deviation handling" },
          { n: "4.3", name: "Special characteristics", hot: true },
          { n: "5", name: "Packaging and labelling" },
          { n: "6", name: "Change notification" },
        ],
      },
    },
    pains: [
      {
        severity: "High",
        surface: "The operating documents",
        name: "Customer-specific requirements not flowed down to operating documents",
        short: "Received and acknowledged. Never on the control plan.",
        body: "Each customer brings its own requirements package: special characteristics, part-approval format, deviation handling, packaging. It is received and acknowledged; it does not consistently reach the operating documents and inspection plans for that customer's parts.",
      },
      {
        severity: "Medium",
        surface: "The complaint file",
        name: "Customer complaint root cause not traceable to design or supplier",
        short: "The cause is found. The link to act on it is not kept.",
        body: "A complaint is investigated and a probable cause found, but the link back to the design decision, supplier lot or process change is rarely durable. The same cause keeps producing complaints.",
      },
      {
        severity: "Medium",
        surface: "Audit prep",
        name: "Customer audit prep duplicates internal audit prep effort",
        short: "The same evidence, gathered twice.",
        body: "Internal and customer audits ask for similar evidence: training records, deviations, supplier qualification, document control. The two preps run in parallel instead of from one evidence base.",
      },
    ],
    note: "Severity as rated in our field research with commercial and quality teams at contract manufacturers, current as of the last review.",
    tax: {
      label: "The recurring bill",
      value: "The quote answered on time, the promise broken on the floor.",
      meta: "What the customer asked for is agreed in the response and lost before production, so it comes back as a finding, a complaint or a lost renewal.",
      tail: "That gap is the coordination tax.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: the Domains Description (RFQ response, approvals, qualification
   * context, bid rationale kept) and PNT-66. Times narrative. */
  flow: {
    heading: "Answer the customer, then keep what you answered.",
    lede: "Most commercial tools record the quote that went out. Unifize holds the response itself: every function's input, the approval and the customer's requirements, carried into the plans that build the part.",
    trailLabel: "How the response moves",
    trail: [
      { t: "RFQ received with the requirements manual", who: "Account Manager", when: "Mon" },
      { t: "Engineering, quality and operations inputs bound", who: "Engineering · Quality · Operations", when: "Tue" },
      { t: "Quote reviewed with its assumptions", who: "Sales · Quality", when: "Wed" },
      { t: "Approved and submitted", who: "Commercial Director", when: "Thu" },
      { t: "Awarded · requirements flowed down", who: "Quality Engineering", when: "Award" },
    ],
    steps: [
      { title: "Take in the RFQ", body: "The drawing and Northwind's requirements manual on one record.", icon: "intake" },
      { title: "Gather the inputs", body: "Feasibility, capability and capacity, each from its owner.", icon: "inputs" },
      { title: "Price it together", body: "Sales and quality agree the quote and its assumptions.", icon: "price" },
      { title: "Commit to it", body: "E. Brandt approves; the quote goes in a day early.", icon: "contract" },
      { title: "Flow it down", body: "On award, SC-4 lands on the control and inspection plans.", icon: "flowdown" },
    ],
    trailFoot: "The response runs back to the RFQ that asked and forward into the documents that deliver it. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / rfq / RQ-2231",
    mobileLabel: "RFQ response trace",
    mobileId: "RQ-2231 · RFQ → inputs → quote → approval → flow-down",
    arcade: {
      steps: [
        {
          ...RFQ_REC,
          source: "CM · RQ-2231 · intake",
          ghost: "Intake",
          status: "Open",
          actor: "You",
          event: "Opened the RFQ response for Northwind",
          eventDetail: "Drawing and requirements manual attached · due Friday",
          checklist: "REQUEST",
          checklistItems: ["Drawing and specification", "Customer requirements", "Due"],
          focus: "record",
          focusRows: ["Northwind · housing assembly", "Due Friday 17:00 · customer portal"],
          focusTitle: "RFQ response",
          ownershipNote: "One record from the first request",
          checklistOpen: "REQUEST",
          checklistProgress: { REQUEST: 3, INPUTS: 0, "QUOTE & COMMITMENT": 0 },
        },
        {
          ...RFQ_REC,
          source: "CM · RQ-2231 · inputs",
          ghost: "Inputs",
          status: "Open",
          actor: "automator",
          event: "Bound each function's input to the response",
          eventDetail: "Feasibility, capability and capacity from their owners",
          checklist: "INPUTS",
          checklistItems: ["Engineering feasibility", "Quality capability", "Capacity"],
          focus: "trace",
          focusTitle: "Inputs in",
          focusRows: ["Engineering · feasible with new fixture", "Quality · SC-4 needs 100% check", "Operations · Line 3 from week 44"],
          focusAction: "Open the inputs",
          ownershipNote: "Nobody chased by email",
          checklistOpen: "INPUTS",
          checklistProgress: { INPUTS: 3, "QUOTE & COMMITMENT": 0 },
          related: 3,
        },
        {
          ...RFQ_REC,
          source: "CM · RQ-2231 · review",
          ghost: "Price",
          status: "In Review",
          actor: "Unifize Assistant",
          event: "Quote review assembled",
          eventDetail: "Sales and quality on one thread · assumptions listed",
          checklist: "QUOTE & COMMITMENT",
          checklistItems: ["Quote review", "Commercial approval", "Requirements flowed down"],
          focus: "review",
          focusTitle: "Quote · RQ-2231",
          focusRows: ["Unit price · includes 100% SC-4 check", "Fixture · quoted separately", "Lead time · 6 weeks from award"],
          focusAction: "Approve quote",
          focusAlts: ["Return with comment"],
          ownershipNote: "The assumptions stay with the quote",
          checklistOpen: "QUOTE & COMMITMENT",
          checklistProgress: { "QUOTE & COMMITMENT": 0 },
        },
        {
          ...RFQ_REC,
          source: "CM · RQ-2231 · approve",
          ghost: "Commit",
          status: "Needs Approval",
          actor: "You",
          event: "Approving the quote to Northwind",
          eventDetail: "Signer, meaning and time seal to RQ-2231",
          checklist: "QUOTE & COMMITMENT",
          checklistItems: ["Quote review", "Commercial approval", "Requirements flowed down"],
          focus: "signature",
          focusTitle: "Apply your signature",
          focusRows: [],
          focusAction: "Confirm and sign",
          ownershipNote: "The commitment has a name on it",
          world: APPROVER_WORLD,
          checklistOpen: "QUOTE & COMMITMENT",
          checklistProgress: { "QUOTE & COMMITMENT": 1 },
          signedItems: [
            { name: "H. Tan", initials: "HT", role: "Quality review", approvalId: "2E61R2231A07", time: "Wed" },
          ],
        },
        {
          ...RFQ_REC,
          source: "CM · RQ-2231 · flowdown",
          ghost: "Flow down",
          status: "Approved",
          actor: "automator",
          event: "Awarded · requirements flowed down",
          eventDetail: "SC-4 on the control plan and inspection plan for HA-220",
          checklist: "QUOTE & COMMITMENT",
          checklistItems: ["Quote review", "Commercial approval", "Requirements flowed down"],
          focus: "history",
          focusKicker: "DECISION TRACE",
          focusTitle: "What we promised, and where it went",
          focusRows: ["RQ-2231 · quoted and awarded", "SC-4 · control plan and inspection plan", "Assumptions kept for the next RFQ"],
          ownershipNote: "Readable at the next RFQ or dispute",
          checklistOpen: "QUOTE & COMMITMENT",
          signedItems: [
            { name: "E. Brandt", initials: "EB", role: "Commercial Director", approvalId: "2E61R2231B33", time: "Thu" },
          ],
          related: 3,
        },
      ],
    },
  },

  /* ------------------------------------------------ 04 · for your industry */
  industries: {
    heading: "Customer work, in your industry.",
    lede: "The same commitments, under the requirements your customers flow down to you.",
    rows: [
      { name: "Automotive", line: "Customer-specific requirements, PPAP and customer change approval.", chips: ["IATF 16949"], href: "/industries/automotive" },
      { name: "Aerospace", line: "Prime contractor flow-down and first article inspection.", chips: ["AS9100"], href: "/industries/aerospace" },
      { name: "Industrial machinery", line: "Build-to-order quotes and customer acceptance.", chips: ["ISO 9001"], href: "/industries/industrial-machinery" },
      { name: "Medical devices", line: "OEM quality agreements and complaint cooperation.", chips: ["ISO 13485"], href: "/industries/medical-devices" },
      { name: "Contract research orgs", line: "Sponsor requirements and responsiveness under contract.", chips: ["ICH E6(R2) GCP"], href: "/industries/cro" },
    ],
    foot: "Yours not listed? Customer requirements work the same way under ISO 9001.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Pain Points DB Modules Addressing (live modules only). */
  coverage: {
    heading: "Where customer commitments land.",
    lede: "Customer audits, complaints and the corrective actions behind them run in the Quality Management System; the requirements a customer flows down live in controlled documents.",
    standardFilters: ["ISO 9001", "IATF 16949", "AS9100", "ISO 13485"],
    groups: [
      {
        slug: "qms",
        name: "Quality Management System",
        tier: "Primary",
        promise: "Customer audits, complaints and the corrective actions they drive.",
        modules: [
          { name: "Audit Management", blurb: "Internal, external and customer audits with findings, responses and bounded external access.", href: "/products/qms" },
          { name: "Complaint Handling", blurb: "Complaint intake, investigation and closure, linked to the corrective action.", href: "/products/qms" },
          { name: "Corrective and Preventive Actions", blurb: "Root cause, action plan and effectiveness, traced back to the complaint.", href: "/products/qms" },
        ],
      },
      {
        slug: "dms",
        name: "Document Management System",
        tier: "Secondary",
        promise: "The operating documents a customer's requirements have to reach.",
        modules: [
          { name: "Document Control", blurb: "Controlled documents with version history and effective-date governance.", href: "/products/dms" },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role */
  personas: {
    heading: "A customer promise has many owners.",
    lede: "Find yours.",
    cards: [
      {
        key: "commercial",
        iconKey: "regulatory",
        name: "Commercial leadership",
        stake: "Owns the response",
        titles: ["VP Sales", "Commercial Director", "Account Manager"],
        value: "Quotes go out on time with every function's input, and the rationale is there for the next RFQ.",
        cares: "Win rate · Responsiveness · Margin",
        worries: "Missed deadlines · Lost bids",
        primary: true,
      },
      {
        key: "quality",
        iconKey: "quality",
        name: "Customer quality",
        stake: "Keeps the promise",
        titles: ["Customer Quality Manager", "Quality Engineer"],
        value: "Customer requirements reach the control plan, and audits draw on one evidence base.",
        cares: "Flow-down · Audit readiness · Complaints",
        worries: "Findings on customer requirements · Duplicate audit prep",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "engineering",
        iconKey: "engineering",
        name: "Engineering",
        stake: "Confirms feasibility",
        titles: ["Applications Engineer", "Manufacturing Engineer"],
        value: "Feasibility is asked once, on the record, in time for the quote.",
        cares: "Clear requests · Realistic commitments",
        worries: "Quotes that promise what the line cannot do",
      },
      {
        key: "service",
        iconKey: "operations",
        name: "Customer service",
        stake: "Hears the customer",
        titles: ["Customer Service Manager", "Customer Success"],
        value: "Complaints, feedback and warranty claims each go to the owner who can act on them.",
        cares: "Response time · Closing the loop",
        worries: "Complaints that never reach quality",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, all 5 rows linked. */
  triggers: {
    heading: "When the customer is waiting.",
    lede: "Each of these starts a clock, and each routes into a governed workflow, so the answer to the customer comes from the record.",
    rows: [
      {
        name: "Missed RFQ deadline",
        clock: "Days · revenue and the relationship at stake",
        severity: "High",
        routesTo: "RFQ response",
        owner: "Sales · Engineering · Quality · Operations",
        viz: "portal",
        detail: ["RQ-2231", "Closes in 5 hours", "Quote|ok", "Quality plan|missing", "Capacity statement|missing", "Drawing acknowledgement|ok"],
      },
      {
        name: "Customer responsiveness complaint",
        clock: "Weeks · the relationship is eroding",
        severity: "Medium",
        routesTo: "Complaint Handling",
        owner: "Customer Quality · Account Management",
        viz: "escalation",
        detail: ["Northwind supplier quality", "Formal notice: responsiveness", "Complaint CMP-0698 closure|41", "Change notice for HA-210|26", "8D response, lot 24-301|19"],
      },
      {
        name: "Customer audit notification",
        clock: "Weeks · a fixed external date",
        severity: "High",
        routesTo: "Audit Management",
        owner: "Quality · Customer Quality",
        viz: "twin",
        detail: ["Internal audit, Sep", "Northwind audit, Oct", "Training records", "Deviation log", "Supplier approvals", "Document control"],
      },
      { name: "Customer ECO rejection", clock: "Days · the change is blocked", severity: "High", routesTo: "Change Control", owner: "Engineering · Customer Quality" },
      { name: "Lost bid", clock: "Weeks · feed it back before the next bid", severity: "High", routesTo: "RFQ response", owner: "Sales · Quality · Engineering · Operations" },
    ],
    featured: ["Missed RFQ deadline", "Customer responsiveness complaint", "Customer audit notification"],
  },

  /* ------------------------------------------------ 08 · coexistence */
  coexistence: {
    heading: "It sits beside the systems you already run.",
    systemsOfRecord: ["CRM", "ERP", "PLM", "QMS"],
    body: "Your CRM keeps accounts and opportunities, your ERP keeps orders; the responses, requirements and commitments between them run on Unifize.",
    diagramCaption: "Unifize as the customer commitment layer beside your CRM, ERP, PLM and QMS.",
    bands: {
      lede: "Keep the CRM that holds accounts and the ERP that holds orders. The RFQ response, the customer's requirements and the commitments they create run on Unifize, approved with a named signature.",
      note: "No complaint or audit system yet? Both ship in the QMS above.",
      tools: {
        title: "Inboxes and customer portals",
        sub: "Stop being the record",
        names: ["Email", "Sheets", "Drives", "Portal"],
        label: "Where customer commitments used to stall",
        body: "The RFQ thread, the quote spreadsheet and the requirements PDF on a shared drive stop being where the promise lives.",
      },
      back: "One record per response, every input bound, and the approved commitment carried into the documents that deliver it.",
    },
  },

  /* ------------------------------------------------ 09 · proof */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, plus teams who connected their customer and quality work on Unifize, in their own words.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on non-conformance coordination at a medical-device manufacturer. The figure is anonymized.",
    },
    stills: [
      { wistia: "6nt3l612xc", fact: "Trends understood by connecting the data" }, /* Jesse Kolstad, Biovation Labs */
      { wistia: "ymg52djn2s", fact: "From development to commercialisation" }, /* Wilson Lin, Applechem */
      { wistia: "b21oka4aiv", fact: "Redundant work cut, done faster" }, /* Wilson Lin, Applechem */
      { wistia: "3hqfw813d7", fact: "Institutional knowledge standardised" }, /* Seth Bozman */
    ],
    references: [
      { tag: "Named reference", name: MD_PROOF.customers[0].name, desc: MD_PROOF.customers[0].desc },
    ],
    foot: { label: "All customer stories", href: "/resources/testimonials" },
  },

  trust: null,
  caseKit: null,

  growth: {
    heading: "Win the work. Then deliver it.",
    lede: "Customer commitments run on the same governed record as quality and change.",
    steps: [
      { name: "Customer management", note: "You are here" },
      { name: "Quality", note: "Solution page", href: "/solution/quality" },
      { name: "Change control", note: "Solution page", href: "/solution/change-control" },
    ],
  },

  close: {
    eyebrow: "Customer work on Unifize",
    heading: "Answer on time. Keep what you promised.",
    lede: "Bring one real RFQ, a customer requirements manual or an audit on the calendar, and see it run on your own work in a 30-minute walkthrough.",
  },
};
