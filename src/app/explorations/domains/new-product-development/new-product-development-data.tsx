/* ============================================================================
 * New Product Development: domain (Solutions) page data. All values trace to
 * Notion.
 *
 * source: Domains DB -> "Product Development"
 *   (31d860e6b45e818ea37febf5f4f4ae08, Domain 2, Tier Primary). The nav item
 *   is "New Product Development"; the Domains DB has no row by that name. The
 *   Product Development row's own Description says it "subsumes the
 *   historical New Product Development and Change Control Domains as the two
 *   main sub-Themes", so this page is built from it, on the new-product side
 *   (change control has its own page). The hero framing and the leak thesis
 *   are that Description: stage-gated decisions needing R&D, Quality,
 *   Regulatory, Operations and Supply Chain sign-off, evidence packaged at
 *   each gate, transfer to manufacturing; gate rationale and exit criteria
 *   lost in email and design reviews, leading to stage-gate recycling,
 *   delayed launches and DHF gaps at audit. Internal fields used for
 *   understanding only.
 * source: Themes DB, all 11 rows linked -> section 01 in three clusters.
 * source: Pain Points DB, all 7 rows linked (PNT-24 Critical; 19, 21, 22
 *   High; 20, 23, 25 Medium).
 * source: Trigger Events DB, all 6 rows linked. Featured: TE-31 stage gate
 *   recycling, TE-30 failed design transfer, TE-29 delayed product launch
 *   (none featured on another Solutions page). DHF gap at audit and customer
 *   ECO rejection are featured on the regulatory affairs and change control
 *   pages already.
 * source: Modules DB, the 11 modules linked. MDL-18..22 are in the Product
 *   Lifecycle Management product (live, linked). MDL-66..71 are in APQP &
 *   PPAP, which the other Solutions pages treat as in development, so they
 *   are not shown.
 * source: Website Customer Videos mirror -> seven product-development films
 *   none of the other Solutions pages use; facts from each film's title.
 * The arcade record (gate 3 review GR-0310 on the pump housing, SPC-310) and
 *   every cell artifact are illustrative furniture, never claims. SPC-310 and
 *   Apex are shared with the procurement page on purpose: the same part, seen
 *   from the design side.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";

/* ------------------------------------------------------------------------
 * The live arcade journey: a gate 3 design-freeze review, from its exit
 * criteria to the design released to manufacture. */
const GATE_WORLD: ArcadeFlowWorld = {
  team: "Product Development",
  recordNoun: "Gate Review",
  owner: "J. Okoye",
  ownerInitials: "JO",
  participants: ["JO", "PL", "HT", "+3"],
  participantsLabel: "J. Okoye, P. Lindgren, H. Tan, and three others",
  recordKicker: "GATE REVIEW",
  context: {
    initials: "JO",
    name: "J. Okoye",
    time: "09:10",
    message: "Opened gate 3, design freeze, for the pump housing.",
    detail: "Exit criteria from the program plan · review Thursday",
  },
  inboxNeighbors: [
    { title: "DFMEA · pump housing", time: "11:05", detail: "Two actions open from gate 2", kind: "FMEA" },
    { title: "VER-131 · seal fit test", time: "10:20", detail: "Passed · linked to REQ-058", kind: "Verification" },
    { title: "Apex capability study", time: "Yesterday", detail: "Groove depth · Cpk requested", kind: "Supplier" },
  ],
  checklistTitle: "Gate 3 · Design Freeze",
  checklistSections: [
    {
      title: "EXIT CRITERIA",
      items: [
        { label: "Design verification complete", note: "REQ to VER · traced" },
        { label: "DFMEA actions closed", note: "From gate 2" },
        { label: "Supplier capability confirmed", note: "Before the spec locks" },
      ],
    },
    {
      title: "EVIDENCE",
      items: [
        { label: "Verification results", note: "VER-131 and 4 others" },
        { label: "Risk file", note: "RA-067 · reviewed" },
        { label: "Supplier capability", note: "Apex · groove depth study" },
      ],
    },
    {
      title: "DECISION",
      items: [
        { label: "Cross-functional review", kind: "approval", signer: "H. Tan", state: "Approved" },
        { label: "Gate approval", kind: "approval", signer: "A. Mehta", state: "Signed" },
        { label: "Released to manufacture", note: "SPC-310 Rev C · frozen" },
      ],
    },
  ],
};

/* the same record as the gate approver sees it */
const APPROVER_WORLD: ArcadeFlowWorld = { ...GATE_WORLD, viewer: "A. Mehta", viewerInitials: "AM" };

const GATE_REC = {
  type: "Gate Review",
  id: "GR-0310",
  title: "Pump housing · gate 3",
  world: GATE_WORLD,
} as const;

export const NEW_PRODUCT_DEVELOPMENT_DATA: DomainPageData = {
  slug: "new-product-development",
  name: "New Product Development",
  tier: "Primary",

  hero: {
    crumb: "New Product Development",
    titleLead: "The gate passed on a deck.",
    titleTurn: "Launch slipped anyway.",
    sub: "Gate evidence is rebuilt for every review and approvals live in email and meeting notes, so gates recycle and launches slip. Unifize holds each gate's criteria, evidence and decision on the record, from concept to release.",
    chips: ["Stage gates", "Design freeze", "Risk and FMEA", "Validation", "Design transfer"],
    floats: [
      { kind: "seal", title: "Gate passed on the record", meta: "GR-0310 · criteria, evidence and approver" },
      { kind: "clock", title: "Delayed product launch", meta: "Commitments, filings and ramp move with it" },
    ],
    runsIn: {
      label: "Runs wherever launches are gated",
      links: [
        { name: "Medical devices", href: "/industries/medical-devices" },
        { name: "Automotive", href: "/industries/automotive" },
        { name: "Aerospace", href: "/industries/aerospace" },
        { name: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
        { name: "Chemicals", href: "/industries/chemicals" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside */
  work: {
    heading: "From concept to launch, the design history intact.",
    lede: "The development work R&D, quality, operations and suppliers run together, as governed decisions: each gate's criteria, the evidence behind it and who passed it, on the record the auditor will read.",
    groups: [
      {
        glyph: "loop",
        name: "Concept to design freeze",
        line: "Prototypes, handoffs and the gate that freezes the design.",
        runsIn: { label: "Runs in the PLM product →", href: "/products/plm" },
        viz: {
          kind: "gates",
          wash: "sky",
          cursor: { name: "J. Okoye", tone: "#7c3aed" },
          program: "Pump housing · program",
          gates: ["Concept", "Feasibility", "Design", "Validation", "Launch"],
          at: 2,
          criteria: [
            { label: "Design verification complete", met: true },
            { label: "DFMEA actions closed", met: true },
            { label: "Supplier capability confirmed", met: false },
          ],
        },
        items: [
          { name: "Prototyping and Concept Development", line: "Concepts de-risked before formal design controls engage." },
          { name: "Concurrent Engineering Handoff", line: "Manufacturing and suppliers shaping the design before freeze, not after." },
          { name: "Design for Manufacturing", line: "Realistic cost and yield data in the design review." },
          { name: "Design Freeze and Release to Manufacture", line: "The design gated into production with the history file signed." },
        ],
      },
      {
        glyph: "scale",
        name: "Risk and validation",
        line: "What could fail, what controls it, and proof the process holds.",
        viz: {
          kind: "heat",
          wash: "warm",
          cursor: { name: "P. Lindgren", tone: "#0f8f7e" },
          kicker: "DFMEA · pump housing",
          title: "Seal leak at groove",
          from: [2, 2],
          to: [2, 0],
          others: [[1, 1], [0, 2], [1, 0]],
        },
        items: [
          { name: "Product Risk Management", line: "Hazards, controls and verification held against the product itself." },
          { name: "FMEA and Design/Process Risk Analysis", line: "Failure modes scored and controls owned, carried into the next program." },
          { name: "Validation and Qualification", line: "Validation runs that can be reproduced from the record alone." },
        ],
      },
      {
        glyph: "box",
        name: "Transfer and launch",
        line: "The product, its evidence and its process, handed to manufacturing and the market.",
        runsIn: { label: "Traceability runs in the PLM product →", href: "/products/plm" },
        viz: {
          kind: "chain",
          wash: "blue",
          cursor: { name: "H. Tan", tone: "#d97706" },
          kicker: "Traceability · REQ-058",
          links: [
            { id: "REQ-058", label: "Seal holds 6 bar" },
            { id: "SPC-310", label: "Groove depth 1.20" },
            { id: "VER-131", label: "Seal fit test" },
            { id: "VAL-012", label: "Process validation", open: true },
          ],
        },
        items: [
          { name: "Design Transfer and Product Launch", line: "Every drawing, BoM, validation and qualification in place before first output." },
          { name: "Technology Transfer Governance", line: "Process knowledge moved to the receiving site with its validation and training." },
          { name: "PPAP and APQP", line: "The part-approval evidence package planned, built and submitted." },
          { name: "Clinical and Pre-Market Evidence Management", line: "The evidence behind the submission and the launch claims." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks */
  leaks: {
    heading: "The gate review moved again. So did the launch.",
    lede: "The failure modes we see inside product development. None of them is a missing feature. All of them are gate decisions made without the evidence on the record.",
    scene: {
      kicker: "Gate 3 design review",
      chip: "Rescheduled",
      title: "The design review invite",
      rows: [
        { state: "wait", label: "Gate 3 review", age: "moved 3 times", warn: true },
        { state: "done", label: "Evidence deck", age: "v7" },
        { state: "idle", label: "Supplier capability", age: "not in the deck" },
      ],
      float: { kicker: "Incoming inspection · six weeks later", note: "Housings fail SPC-310 Rev C. The supplier was never qualified to it." },
      caption: "The gate passed on deck v7. Supplier capability wasn't in it.",
      invite: {
        title: "Gate 3 design review · pump housing",
        when: "Thu 14:00 to 16:00",
        note: "Rescheduled (3rd time): evidence not ready",
        people: ["JO", "PL", "HT", "VR", "SK"],
        more: "+9 invited",
        files: ["Gate3_evidence_v7_FINAL.pptx", "DFMEA_housing_rev4.xlsx", "Actions_from_gate2.docx"],
      },
    },
    pains: [
      {
        severity: "Critical",
        surface: "Incoming inspection",
        name: "Specifications locked before supplier capability is verified",
        short: "The spec freezes at the gate. The supplier finds out at inspection.",
        body: "Specifications lock at a phase gate before supplier capability data exists for them. Parts arrive that fail a spec the supplier was never qualified to meet, and the spec is rolled back or waivered.",
      },
      {
        severity: "High",
        surface: "Gate reviews",
        name: "APQP gate review evidence rebuilt at each phase",
        short: "The same evidence, re-explained at every gate.",
        body: "Each gate needs a package: DFMEA, PFMEA, control plan, validation, supplier capability. It is assembled fresh each time from the same artefacts, which are never bound to the gate they support.",
      },
      {
        severity: "High",
        surface: "Notebooks and memory",
        name: "Validation runs cannot be reproduced from the record alone",
        short: "The report exists. The conditions behind it do not.",
        body: "IQ, OQ and PQ runs produce a report, but parameters, deviations and operator actions live in raw data, supervisor notebooks and memory. Revalidating under the same conditions is guesswork.",
      },
      {
        severity: "High",
        surface: "Every program",
        name: "PPAP submissions assembled from scratch each programme",
        short: "Every program rebuilds the part-approval package by hand.",
        body: "Part-approval submissions need many elements plus the customer's format. The reusable pieces exist but are not threaded, so each program builds the package again.",
      },
      {
        severity: "Medium",
        surface: "The next program",
        name: "Design FMEA and Process FMEA drift between programmes",
        body: "Lessons, failure modes and controls from one program do not flow into the next, so the team rediscovers the same failure modes a program later.",
      },
      {
        severity: "Medium",
        surface: "Meeting notes",
        name: "Design review action items dispersed across email and meeting notes",
        body: "Actions from design reviews live in notes, emails and spreadsheets; assignment, due date and closure rarely sit together.",
      },
      {
        severity: "Medium",
        surface: "The originating record",
        name: "Design change loop never closes back to the originating decision",
        body: "A change raised by a CAPA, complaint or supplier issue is implemented, but its closure rarely links back to the record that raised it.",
      },
    ],
    note: "Severity as rated in our field research with R&D, engineering and quality teams, current as of the last review.",
    tax: {
      label: "The recurring bill",
      value: "Gates recycled, launches slipped, the history file rebuilt at audit.",
      meta: "Each recycled gate adds review meetings, evidence packaging and supplier confirmations, and erodes confidence the launch will hold.",
      tail: "That rework is the coordination tax.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: the Domains Description (stage-gated decisions, evidence at each
   * gate, transfer) and PNT-24 / PNT-19. Days are narrative. */
  flow: {
    heading: "Pass the gate on evidence, not on a deck.",
    lede: "Most development tools track tasks and files. Unifize holds the gate itself: its exit criteria, the evidence bound to each one, the supplier's capability confirmed before the spec locks, and the signed decision.",
    trailLabel: "How the gate moves",
    trail: [
      { t: "Gate opened with its exit criteria", who: "Program Manager", when: "Day 0" },
      { t: "Evidence bound to each criterion", who: "Engineering · Quality", when: "Day 4" },
      { t: "Supplier capability confirmed before freeze", who: "Supplier Quality", when: "Day 6" },
      { t: "Gate approved", who: "VP R&D", when: "Day 8" },
      { t: "Design frozen and released", who: "Document Control", when: "Day 9" },
    ],
    steps: [
      { title: "Set the exit criteria", body: "Gate 3 opens with what it takes to pass, from the program plan.", icon: "criteria" },
      { title: "Bind the evidence", body: "Verification, the risk file and DFMEA actions, each under its criterion.", icon: "evidence" },
      { title: "Confirm the supplier", body: "Apex's groove-depth capability in hand before SPC-310 locks.", icon: "capability" },
      { title: "Pass the gate", body: "A. Mehta signs on the evidence, not on a deck.", icon: "gate" },
      { title: "Freeze the design", body: "SPC-310 Rev C released to manufacture with its history attached.", icon: "freeze" },
    ],
    trailFoot: "The gate runs back to the requirements it answers and forward into the transfer and launch it opens. The thread is the trace.",
    chatVariant: "change-control",
    shellUrl: "app.unifize.com / gates / GR-0310",
    mobileLabel: "Gate review trace",
    mobileId: "GR-0310 · criteria → evidence → supplier → approval → freeze",
    arcade: {
      steps: [
        {
          ...GATE_REC,
          source: "PD · GR-0310 · criteria",
          ghost: "Criteria",
          status: "Open",
          actor: "You",
          event: "Opened gate 3 with its exit criteria",
          eventDetail: "From the program plan · review Thursday",
          checklist: "EXIT CRITERIA",
          checklistItems: ["Design verification complete", "DFMEA actions closed", "Supplier capability confirmed"],
          focus: "record",
          focusRows: ["Pump housing · gate 3 · design freeze", "Three exit criteria · review Thursday"],
          focusTitle: "Gate review",
          ownershipNote: "The criteria are set before the review",
          checklistOpen: "EXIT CRITERIA",
          checklistProgress: { "EXIT CRITERIA": 0, EVIDENCE: 0, DECISION: 0 },
        },
        {
          ...GATE_REC,
          source: "PD · GR-0310 · evidence",
          ghost: "Evidence",
          status: "In Review",
          actor: "automator",
          event: "Bound the evidence to each criterion",
          eventDetail: "Verification results, risk file and DFMEA actions linked",
          checklist: "EVIDENCE",
          checklistItems: ["Verification results", "Risk file"],
          focus: "trace",
          focusTitle: "Evidence bound",
          focusRows: ["VER-131 · seal fit · passed", "RA-067 · risk file · reviewed", "DFMEA · gate 2 actions · closed"],
          focusAction: "Open evidence chain",
          ownershipNote: "Built once, carried to the next gate",
          checklistOpen: "EVIDENCE",
          checklistProgress: { "EXIT CRITERIA": 2, EVIDENCE: 2, DECISION: 0 },
          related: 3,
        },
        {
          ...GATE_REC,
          source: "PD · GR-0310 · supplier",
          ghost: "Supplier",
          status: "In Review",
          actor: "automator",
          event: "Supplier capability confirmed before freeze",
          eventDetail: "Apex groove-depth study attached by H. Tan",
          checklist: "EXIT CRITERIA",
          checklistItems: ["Design verification complete", "DFMEA actions closed", "Supplier capability confirmed"],
          focus: "comment",
          focusRows: ["Apex · groove depth · capable to Rev C"],
          focusTitle: "Capability confirmed",
          focusAction: "Open the study",
          ownershipNote: "The spec locks after the supplier can meet it",
          checklistOpen: "EXIT CRITERIA",
          checklistProgress: { "EXIT CRITERIA": 3, EVIDENCE: 3, DECISION: 0 },
        },
        {
          ...GATE_REC,
          source: "PD · GR-0310 · approve",
          ghost: "Gate",
          status: "Needs Approval",
          actor: "You",
          event: "Approving gate 3 on the evidence",
          eventDetail: "Signer, meaning and time seal to GR-0310",
          checklist: "DECISION",
          checklistItems: ["Cross-functional review", "Gate approval", "Released to manufacture"],
          focus: "signature",
          focusTitle: "Apply your signature",
          focusRows: [],
          focusAction: "Confirm and sign",
          ownershipNote: "Identity re-verified · 21 CFR Part 11",
          world: APPROVER_WORLD,
          checklistOpen: "DECISION",
          checklistProgress: { DECISION: 1 },
          signedItems: [
            { name: "H. Tan", initials: "HT", role: "Cross-functional review", approvalId: "9A31G0310B11", time: "Day 7" },
          ],
        },
        {
          ...GATE_REC,
          source: "PD · GR-0310 · freeze",
          ghost: "Freeze",
          status: "Approved",
          actor: "automator",
          event: "Design frozen · released to manufacture",
          eventDetail: "SPC-310 Rev C · history attached",
          checklist: "DECISION",
          checklistItems: ["Cross-functional review", "Gate approval", "Released to manufacture"],
          focus: "history",
          focusKicker: "DECISION TRACE",
          focusTitle: "Why gate 3 passed",
          focusRows: ["GR-0310 · approved on the evidence", "Criteria, evidence and supplier capability on the record", "SPC-310 Rev C · released to manufacture"],
          ownershipNote: "Readable at the next gate and at audit",
          checklistOpen: "DECISION",
          signedItems: [
            { name: "A. Mehta", initials: "AM", role: "VP R&D", approvalId: "9A31G0310C45", time: "Day 8" },
          ],
          related: 3,
        },
      ],
    },
  },

  /* ------------------------------------------------ 04 · for your industry
   * source: the Domains Description's per-industry framing. */
  industries: {
    heading: "Product development, in your industry's words.",
    lede: "The same gated decisions, called by the name your industry uses.",
    rows: [
      { name: "Medical devices", line: "Design controls, the design history file and design transfer.", chips: ["21 CFR 820.30", "ISO 13485 7.3"], href: "/industries/medical-devices" },
      { name: "Pharmaceuticals", line: "CMC, formulation and process development, and tech transfer.", chips: ["ICH Q8", "ICH Q10"], href: "/industries/pharmaceuticals" },
      { name: "Chemicals", line: "Formulation, scale-up and process development.", chips: ["ISO 9001"], href: "/industries/chemicals" },
      { name: "Food processing", line: "Recipe development and pilot to commercial scale.", chips: ["FSMA"], href: "/industries/food-processing" },
      { name: "Automotive", line: "New product introduction, stage gates and part approval.", chips: ["IATF 16949", "APQP"], href: "/industries/automotive" },
      { name: "Aerospace", line: "Stage gates, first article and configuration control.", chips: ["AS9100 8.3"], href: "/industries/aerospace" },
    ],
    foot: "Yours not listed? The gates are the same shape everywhere.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Modules DB, MDL-18..22 (PLM, live). */
  coverage: {
    heading: "One product holds the design history.",
    lede: "Specifications, design controls, risk, FMEA and inspection parameters live in Product Lifecycle Management, on the same record as every gate.",
    standardFilters: ["21 CFR 820", "ISO 13485", "ISO 14971", "IATF 16949", "AS9100"],
    groups: [
      {
        slug: "plm",
        name: "Product Lifecycle Management",
        tier: "Primary",
        promise: "The product record every gate reads: specs, design controls, risk and FMEA.",
        modules: [
          { name: "Design Controls & Traceability", blurb: "Design input, output, verification and validation, traced from requirement to test result.", href: "/products/plm" },
          { name: "Product Specifications", blurb: "Specification records for materials, assemblies and parts, versioned and approved.", href: "/products/plm" },
          { name: "Product Risk Management", blurb: "Hazards, controls and verification held against the product through its lifecycle.", href: "/products/plm" },
          { name: "FMEA & Control Plan Definition", blurb: "Design and process FMEAs with the control plans they drive.", href: "/products/plm" },
          { name: "Inspection & Process Parameters", blurb: "Inspection plans, parameters and sampling rules tied to the product.", href: "/products/plm" },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role */
  personas: {
    heading: "A gate needs every function's signature.",
    lede: "Find yours.",
    cards: [
      {
        key: "rd",
        iconKey: "engineering",
        name: "R&D and engineering leadership",
        stake: "Owns the launch",
        titles: ["VP R&D", "VP Product Development", "VP Engineering"],
        value: "Every gate carries its criteria and evidence, so reviews end in decisions and launches hold their date.",
        cares: "Time to launch · Gate discipline",
        worries: "Recycled gates · Slipped launches",
        primary: true,
      },
      {
        key: "program",
        iconKey: "operations",
        name: "Program management",
        stake: "Runs the gates",
        titles: ["Program Manager", "NPI Manager"],
        value: "Evidence is built once and carried forward, not rebuilt for each review.",
        cares: "Gate readiness · Action closure",
        worries: "Evidence decks rebuilt · Actions lost in notes",
      },
      {
        key: "quality",
        iconKey: "quality",
        name: "Design quality",
        stake: "Signs the history file",
        titles: ["Design Quality Engineer", "Quality Manager"],
        value: "The design history file is the record the gates wrote, not a reconstruction.",
        cares: "DHF integrity · Risk file",
        worries: "DHF gaps at audit",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "supplier",
        iconKey: "regulatory",
        name: "Supplier quality",
        stake: "Confirms capability",
        titles: ["Supplier Quality Engineer"],
        value: "Supplier capability is a gate criterion, confirmed before the spec locks.",
        cares: "Capable suppliers · Clean first articles",
        worries: "Specs the supplier cannot meet",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, all 6 rows linked. */
  triggers: {
    heading: "When the launch is at risk.",
    lede: "Each of these starts a clock, and each routes into a governed workflow, so the recovery is decided on the record the auditor will read.",
    rows: [
      {
        name: "Stage gate recycling",
        clock: "Weeks · each loop adds reviews and evidence",
        severity: "Medium",
        routesTo: "Design Controls & Traceability",
        owner: "Program Management · Engineering · Quality",
        viz: "loopback",
        detail: ["Gate 3", "Design", "Supplier capability not confirmed", "Two DFMEA actions open"],
      },
      {
        name: "Failed design transfer",
        clock: "Weeks · the launch date slips",
        severity: "High",
        routesTo: "Design Controls & Traceability",
        owner: "Engineering · Operations · Quality",
        viz: "readiness",
        detail: ["Yield|95%|88%|fail", "Cycle time|42 s|40 s|ok", "Process capability|1.33|1.12|fail", "Training|100%|100%|ok"],
      },
      {
        name: "Delayed product launch",
        clock: "Weeks · filings and supplier ramp move with it",
        severity: "High",
        routesTo: "Design Controls & Traceability",
        owner: "VP R&D · Product Management",
        viz: "slip",
        detail: ["Pump housing · commercial launch", "03 Mar", "14 Apr", "02 Jun"],
      },
      { name: "DHF gap at audit", clock: "Days · treated as systemic", severity: "Urgent", routesTo: "Design Controls & Traceability", owner: "Engineering · Regulatory · Quality" },
      { name: "Customer ECO rejection", clock: "Days · the change is blocked", severity: "High", routesTo: "Product Specifications", owner: "Engineering · Customer Quality" },
      { name: "Regulatory requirements intake spike", clock: "Weeks", severity: "Medium", routesTo: "Design Controls & Traceability", owner: "Regulatory · Engineering" },
    ],
    featured: ["Stage gate recycling", "Failed design transfer", "Delayed product launch"],
  },

  /* ------------------------------------------------ 08 · coexistence */
  coexistence: {
    heading: "It sits beside the tools engineering already uses.",
    systemsOfRecord: ["ERP", "QMS", "MES", "LIMS"],
    body: "Your CAD and PDM keep the models, your ERP the released BoM; the gates, evidence and decisions between them run on Unifize.",
    diagramCaption: "Unifize as the gate and design-history layer beside your ERP, QMS, MES and LIMS.",
    bands: {
      lede: "Keep the CAD and PDM tools that hold your models and the ERP that holds the released BoM. The gates, the evidence behind them and the design history run on Unifize, approved with a 21 CFR Part 11 signature.",
      note: "No product lifecycle system yet? Product Lifecycle Management above holds specs, design controls and risk.",
      tools: {
        title: "Review decks and notes",
        sub: "Stop being the record",
        names: ["Meetings", "Email", "Sheets", "Drives"],
        label: "Where gate decisions used to go missing",
        body: "The gate deck, the design review notes and the actions spreadsheet stop being where the decision and its evidence live.",
      },
      back: "One record per gate, the evidence bound, and only the released design goes back to the systems that build it.",
    },
  },

  /* ------------------------------------------------ 09 · proof */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, plus the teams who run product development on Unifize, in their own words.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on non-conformance coordination at a medical-device manufacturer. The figure is anonymized.",
    },
    stills: [
      { wistia: "wvpvgqna7b", fact: "Product development up to 30% faster" }, /* Wilson Lin, Applechem */
      { wistia: "t53sn7gmq6", fact: "Product development and quality, working together" }, /* Natalie Jones */
      { wistia: "h7owj6fxja", fact: "From product idea to market" }, /* Natalie Jones */
      { wistia: "rzt8zyyhc4", fact: "Product lifecycle and traceability, managed" }, /* Jesse Kolstad, Biovation Labs */
      { wistia: "68u5q2fg58", fact: "Speed to market in medtech" }, /* Denis Machoka */
      { wistia: "pl5hthvk34", fact: "A configurable system that helps engineers" }, /* Michael Hogan, Harmonic Bionics */
      { wistia: "drmp9dgyf9", fact: "Traceability for better decisions" }, /* Jesse Kolstad, Biovation Labs */
    ],
    references: [
      { tag: "Named reference", name: MD_PROOF.customers[0].name, desc: MD_PROOF.customers[0].desc },
    ],
    foot: { label: "All customer stories", href: "/resources/testimonials" },
  },

  trust: null,
  caseKit: null,

  growth: {
    heading: "Launch the product. Then control every change after.",
    lede: "Development runs on the same governed record as the change control that sustains the product.",
    steps: [
      { name: "New product development", note: "You are here" },
      { name: "Change control", note: "Solution page", href: "/solution/change-control" },
      { name: "Procurement & sourcing", note: "Solution page", href: "/solution/procurement-and-sourcing" },
    ],
  },

  close: {
    eyebrow: "Product development on Unifize",
    heading: "Pass the gate. Keep the history.",
    lede: "Bring one real gate, a recycled review or a transfer that failed acceptance, and see it run on your own work in a 30-minute walkthrough.",
  },
};
