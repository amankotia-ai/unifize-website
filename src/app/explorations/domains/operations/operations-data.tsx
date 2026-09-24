/* ============================================================================
 * Operations: domain (Solutions) page data. All values trace to Notion.
 *
 * source: Domains DB -> "Operations" (31d860e6b45e81498fbef2b20956f764,
 *   Domain 9, Tier Primary). The hero framing and the leak thesis are the
 *   row's Description: WIP aging, production holds, schedule instability and
 *   MRB backlog come from cross-functional coordination with no durable
 *   decision trace; QA dispositions, engineering decisions and lab results are
 *   awaited via email and escalation calls with no record of priority criteria
 *   or commitments; shortage allocation (who gets the last units across
 *   competing lines) is decided in firefighting mode with no record. Named
 *   triggers: production hold, MRB backlog, WIP aging. Internal fields (budget
 *   owner, play coverage, persona penetration) are used for understanding
 *   only, never published.
 * source: Themes DB, all 18 rows linked -> section 01 in four editorial
 *   clusters; items are the Theme names, lines distilled from each Description.
 * source: Pain Points DB, all 8 rows linked (PNT-11..18) -> section 02, names
 *   verbatim, bodies condensed, Severity verbatim; the rails list shows the
 *   four High rows.
 * source: Trigger Events DB, the 11 rows linked -> section 07. TE-19 "WIP
 *   aging excursion" is rated Medium and the trigger board renders Urgent /
 *   High only, so it is carried by the MRB and hold rows rather than listed.
 * source: Modules DB, the 12 modules linked (Primary Domain = this row):
 *   MDL-23..27 in the Manufacturing Execution System, MDL-28..34 in CMMS.
 *   Products DB: UPD-6 "CMMS" is a priced Enhancement (shipped) with no
 *   product page on the site yet, so its modules are listed unlinked.
 * source: Website Customer Videos mirror -> the rails proof reel, seven
 *   shop-floor and lot-release films none of the other Solutions pages use;
 *   each fact is taken from the film's own title.
 * The arcade record (production hold on lot 24-331, Line 3) and every cell
 *   artifact are illustrative furniture, never claims.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";

/* ------------------------------------------------------------------------
 * The live arcade journey: a production hold on lot 24-331, from the hold
 * to the release the next shift can read. */
const HOLD_WORLD: ArcadeFlowWorld = {
  team: "Plant 2 Operations",
  recordNoun: "Production Hold",
  owner: "D. Alvarez",
  ownerInitials: "DA",
  participants: ["DA", "HT", "VR", "+2"],
  participantsLabel: "D. Alvarez, H. Tan, V. Rao, and two others",
  recordKicker: "PRODUCTION HOLD",
  context: {
    initials: "DA",
    name: "D. Alvarez",
    time: "14:20",
    message: "Held lot 24-331 on Line 3 at Op 30.",
    detail: "Seal torque out of range on the in-process check",
  },
  inboxNeighbors: [
    { title: "Incoming resin lot R-7781", time: "13:05", detail: "Receiving inspection · held", kind: "Inspection" },
    { title: "Torque wrench TW-044", time: "11:40", detail: "Calibration due in 6 days", kind: "Calibration" },
    { title: "SO-4417 commit", time: "Yesterday", detail: "Projected 4 days late", kind: "Commitment" },
  ],
  checklistTitle: "Production Hold",
  checklistSections: [
    {
      title: "HOLD",
      items: [
        { label: "Reason for hold", kind: "field", value: "Seal torque out of range · Op 30", note: "Entered at the line" },
        { label: "Material segregated", note: "40 units · hold area B" },
        { label: "Nonconformance", note: "NC-1183 · linked" },
      ],
    },
    {
      title: "EVIDENCE",
      items: [
        { label: "In-process check", note: "Torque 3.6 N·m · limit 3.8" },
        { label: "Tool calibration", note: "TW-044 · in date" },
        { label: "Engineering assessment", note: "V. Rao · rework method" },
      ],
    },
    {
      title: "DISPOSITION",
      items: [
        { label: "Material review", kind: "approval", signer: "V. Rao", state: "Approved" },
        { label: "QA release · Part 11", kind: "approval", signer: "H. Tan", state: "Signed" },
        { label: "Released to line", note: "Rework complete · Op 30 re-run" },
      ],
    },
  ],
};

/* the same record as QA sees it at release */
const QA_WORLD: ArcadeFlowWorld = { ...HOLD_WORLD, viewer: "H. Tan", viewerInitials: "HT" };

const HOLD_REC = {
  type: "Production Hold",
  id: "PH-0331",
  title: "Lot 24-331 · Line 3",
  world: HOLD_WORLD,
} as const;

export const OPERATIONS_DATA: DomainPageData = {
  slug: "operations",
  name: "Operations",
  tier: "Primary",

  hero: {
    crumb: "Operations",
    titleLead: "The line is held.",
    titleTurn: "The decision is on a call.",
    sub: "QA dispositions, engineering calls and lab results are chased through email and escalation calls, so holds stall and nobody can say later why a lot moved. Unifize runs the hold, the review and the release on one record the next shift can read.",
    chips: ["Holds and disposition", "Electronic travellers", "Changeover", "Calibration and maintenance", "Delivery commitments"],
    floats: [
      { kind: "seal", title: "Released on the record", meta: "PH-0331 · QA release · Part 11" },
      { kind: "clock", title: "Line held pending disposition", meta: "Every hour compounds lateness and WIP" },
    ],
    runsIn: {
      label: "Runs wherever the line has to keep moving",
      links: [
        { name: "Industrial machinery", href: "/industries/industrial-machinery" },
        { name: "Automotive", href: "/industries/automotive" },
        { name: "Aerospace", href: "/industries/aerospace" },
        { name: "Medical devices", href: "/industries/medical-devices" },
        { name: "Food processing", href: "/industries/food-processing" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside
   * source: the 18 Themes, four editorial clusters. */
  work: {
    heading: "If it stops the line, it has a home here.",
    lede: "The operations work plants actually run, as governed workflows: holds with an owner, releases with a reason, and commitments that change on the record instead of on a call.",
    groups: [
      {
        glyph: "box",
        name: "Holds and disposition",
        line: "Material held, reviewed and released, from receiving dock to returned goods.",
        viz: {
          kind: "mrb",
          wash: "warm",
          cursor: { name: "H. Tan", tone: "#7c3aed" },
          kicker: "Material review board",
          cols: [
            { name: "On hold", lots: [{ id: "24-331", note: "Seal torque" }] },
            { name: "In review", lots: [{ id: "24-318", note: "Label mismatch" }, { id: "R-7781", note: "Resin · day 12", aging: true }] },
            { name: "Released", lots: [{ id: "24-290", note: "Reworked" }] },
          ],
        },
        items: [
          { name: "WIP Hold and Material Disposition", line: "Held work-in-process segregated, dispositioned by the review board before it ages out." },
          { name: "Inbound Inspection and Quarantine", line: "Supplier shipments sampled, held and released in time to feed production." },
          { name: "Warehouse and Inventory Hold/Release", line: "The physical hold and the system hold kept in step across the warehouse." },
          { name: "Product Returns and RMA Processing", line: "Returns authorised, received, dispositioned and fed back into CAPA." },
        ],
      },
      {
        glyph: "loop",
        name: "Running the line",
        line: "The schedule, the changeover and the record of what each lot went through.",
        runsIn: { label: "Runs in the MES product →", href: "/products/mes" },
        viz: {
          kind: "route",
          wash: "sky",
          cursor: { name: "D. Alvarez", tone: "#0f8f7e" },
          kicker: "eTraveller · WO-5512",
          title: "Pump housing assembly",
          ops: [
            { op: "10", name: "Kit", state: "done" },
            { op: "20", name: "Press", state: "done" },
            { op: "30", name: "Torque", state: "now" },
            { op: "40", name: "Leak test", state: "next" },
            { op: "50", name: "Pack", state: "next" },
          ],
          entry: { label: "Seal torque, N·m", value: "4.2" },
        },
        items: [
          { name: "Production Schedule Change and Exception", line: "Shortages, downtime and holds resequenced without breaking commitments." },
          { name: "Line Changeover and Process Setup", line: "Changeovers executed, cleared and released by Quality in time to keep the schedule." },
          { name: "Cleaning Validation and Changeover Verification", line: "Cleaning verified between lots before the line restarts." },
          { name: "Lot Traceability and Serialization", line: "Lot, batch and serial identifiers traceable from production to the field." },
        ],
      },
      {
        glyph: "pulse",
        name: "Equipment and facility",
        line: "The equipment, environment and safety programmes the line depends on.",
        viz: {
          kind: "instrument",
          wash: "blue",
          cursor: { name: "N. Obi", tone: "#d97706" },
          id: "TW-044",
          name: "Torque wrench · Line 3",
          low: "3.8 N·m",
          high: "4.6 N·m",
          at: 55,
          due: "Calibration due in 6 days",
          owner: "Owner · N. Obi",
        },
        items: [
          { name: "Equipment Qualification and Calibration", line: "Equipment qualified and calibrated around production, out-of-tolerance events traced to product." },
          { name: "Environmental Monitoring and Facility Control", line: "Excursions classified and tied to the lots they may affect." },
          { name: "Environmental Health and Safety Compliance", line: "Incidents and near-misses captured on the floor, actions tracked across shifts." },
          { name: "Waste Management and Controlled Destruction", line: "Waste lots tracked from generation to certified destruction." },
        ],
      },
      {
        glyph: "scale",
        name: "Commitments and transfer",
        line: "What the plant promises, and what it takes on from development.",
        viz: {
          kind: "promise",
          wash: "paper",
          cursor: { name: "M. Ito", tone: "#db2777" },
          kicker: "Order commitments · this week",
          orders: [
            { id: "SO-4410", promised: "02 Oct", projected: "02 Oct", state: "ok" },
            { id: "SO-4417", promised: "03 Oct", projected: "07 Oct", state: "risk" },
            { id: "SO-4423", promised: "06 Oct", projected: "09 Oct", state: "recommit" },
          ],
        },
        items: [
          { name: "Capacity Planning and Commitment", line: "Capacity modelled against demand before sales commits it." },
          { name: "On-Time Delivery and Shipment Commitment", line: "Slippage communicated early and recovered on the record." },
          { name: "Technology Transfer Governance", line: "A process moved into production with its knowledge, validation and training." },
          { name: "Design for Manufacturing", line: "Manufacturing engineering in the design review before freeze." },
          { name: "Packaging Specification Management", line: "Packaging specs transitioned on shared lines without stranding stock." },
          { name: "Shipping Documentation and Distribution Control", line: "Certificates and shipping documents in step with the batch record." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks
   * source: Pain Points DB, all 8 rows linked. */
  leaks: {
    heading: "The lot moved. Nobody wrote down why.",
    lede: "The failure modes we see inside operations. None of them is a missing feature. All of them are decisions made on the floor that never reached the record.",
    scene: {
      kicker: "Line 3 hold",
      chip: "00:47:12",
      title: "The escalation call",
      rows: [
        { state: "done", label: "Hold placed", age: "14:20" },
        { state: "wait", label: "Disposition", age: "on a call", warn: true },
        { state: "idle", label: "Rationale", age: "not recorded" },
      ],
      float: { kicker: "Night shift · 22:10", note: "Why is lot 24-331 moving? The hold tag is still on it." },
      caption: "Released on a call. The next shift got the lot, not the reason.",
      call: {
        title: "Line 3 hold · quick call",
        time: "00:47:12",
        people: [
          { initials: "DA", name: "D. Alvarez", tone: "#0f8f7e", speaking: true },
          { initials: "HT", name: "H. Tan", tone: "#7c3aed" },
          { initials: "VR", name: "V. Rao", tone: "#d97706" },
          { initials: "SQ", name: "Supplier QA", tone: "#6b7280" },
        ],
        notes: "No notes taken",
      },
    },
    pains: [
      {
        severity: "High",
        surface: "Escalation calls",
        name: "Production hold disposition stalls on documented rationale",
        short: "The call decides. The reason catches up days later, or never.",
        body: "The disposition is made verbally and parts move; the rationale (why, on what evidence, who agreed) catches up days later, sometimes never. Audits and recalls cannot reconstruct the call.",
      },
      {
        severity: "High",
        surface: "Shift handoffs",
        name: "Shop-floor decision rationale lost between shift handoffs",
        short: "The next shift inherits the consequence without the reasoning.",
        body: "A deviation accepted or a parameter adjusted on one shift does not transfer to the next. The same call gets re-litigated when the issue recurs.",
      },
      {
        severity: "High",
        surface: "Paper and three systems",
        name: "Travellers and batch records exist in paper plus three systems",
        short: "Paper, MES, ERP and QMS each hold part of the batch.",
        body: "A batch carries a paper traveller, an MES record of steps, an ERP record of consumption and a QMS record of inspections. None is the single source of truth; the operator reconciles when forced to.",
      },
      {
        severity: "High",
        surface: "The line",
        name: "Standard work drifts from documented version on the line",
        short: "The document changes. The line keeps doing what works.",
        body: "The documented standard and the running standard diverge slowly and nobody flags it while the line produces. It surfaces when a new operator joins or an auditor walks.",
      },
      {
        severity: "Medium",
        surface: "Operator memory",
        name: "Inspection checklist not bound to the work order it covers",
        body: "The binding between the work order and the right checklist at the right revision is operator memory, so the wrong checklist, or the right one at the wrong revision, gets used.",
      },
      {
        severity: "Medium",
        surface: "Breakdowns",
        name: "Maintenance breakdown response leaves no record of decisions taken",
        body: "The technician fixes it, the supervisor accepts, the line restarts. What failed, why, what changed and what was deferred rarely reaches the maintenance record.",
      },
      {
        severity: "Medium",
        surface: "Shared inboxes",
        name: "Calibration overdue alerts notify nobody specific",
        body: "Due-date alerts go to a shared inbox, not the instrument's owner. Overdue instruments stay in use until the audit finds them.",
      },
      {
        severity: "Medium",
        surface: "Site knowledge",
        name: "Cross-site lessons learned trapped at the originating site",
        body: "One site solves a recurring problem; the others solve it again months later. Improvement never compounds across the network.",
      },
    ],
    note: "Severity as rated in our field research with operations and quality teams, current as of the last review.",
    tax: {
      label: "The recurring bill",
      value: "Lines held while the decision is chased through calls.",
      meta: "Every hour a line is held compounds finished-goods lateness, review-board inventory and customer-promise risk.",
      tail: "Every held hour is the coordination tax.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: TE-17 Production hold pending disposition (multi-function
   * sign-off to release), PNT-11 and PNT-12, the WIP Hold and Material
   * Disposition Theme. Times are narrative. */
  flow: {
    heading: "Release the hold on the record, not on a call.",
    lede: "Most plant systems record that a lot was held and released. Unifize holds the disposition itself: the evidence, the review board's call and the signed release, on one record the next shift reads.",
    trailLabel: "How the hold moves",
    trail: [
      { t: "Hold placed at the line", who: "Production Supervisor", when: "14:20" },
      { t: "Evidence bound to the hold", who: "Quality · Engineering", when: "14:45" },
      { t: "Review board decides the disposition", who: "QA · Engineering · Production", when: "15:30" },
      { t: "Released with e-signature", who: "QA", when: "17:10" },
      { t: "Next shift reads the reason", who: "Night shift lead", when: "22:05" },
    ],
    steps: [
      { title: "Hold it at the line", body: "Lot 24-331 held at Op 30, the reason entered where it happened.", icon: "hold" },
      { title: "Bind the evidence", body: "The torque check, the tool's calibration and the engineering note, linked.", icon: "gather" },
      { title: "Decide together", body: "QA, engineering and production agree the rework on the thread.", icon: "decide" },
      { title: "Release it, signed", body: "H. Tan re-authenticates; the release seals to the lot.", icon: "release" },
      { title: "Hand it over", body: "The night shift reads why the lot moved, before anyone asks.", icon: "handover" },
    ],
    trailFoot: "The hold runs back to the check that raised it and forward into the lot record and the next shift's handover. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / holds / PH-0331",
    mobileLabel: "Production hold trace",
    mobileId: "PH-0331 · hold → evidence → review → release → handover",
    arcade: {
      steps: [
        {
          ...HOLD_REC,
          source: "OP · PH-0331 · hold",
          ghost: "Hold",
          status: "On Hold",
          actor: "You",
          event: "Held lot 24-331 at Op 30",
          eventDetail: "40 units segregated · NC-1183 linked",
          checklist: "HOLD",
          checklistItems: ["Reason for hold", "Material segregated", "Nonconformance"],
          focus: "record",
          focusRows: ["Lot 24-331 · Line 3", "Held · seal torque out of range"],
          focusTitle: "Production hold",
          ownershipNote: "One record from the moment the line stops",
          checklistOpen: "HOLD",
          checklistEntry: { section: "HOLD", item: "Reason for hold" },
          checklistProgress: { HOLD: 2, EVIDENCE: 0, DISPOSITION: 0 },
        },
        {
          ...HOLD_REC,
          source: "OP · PH-0331 · evidence",
          ghost: "Evidence",
          status: "On Hold",
          actor: "automator",
          event: "Bound the evidence to the hold",
          eventDetail: "Check result, tool calibration and engineering note on one thread",
          checklist: "EVIDENCE",
          checklistItems: ["In-process check", "Tool calibration", "Engineering assessment"],
          focus: "trace",
          focusTitle: "Evidence bound",
          focusRows: ["Torque 3.6 N·m · limit 3.8", "TW-044 · calibration in date", "Rework method · V. Rao"],
          focusAction: "Open evidence chain",
          ownershipNote: "The evidence travels with the lot",
          checklistOpen: "EVIDENCE",
          checklistProgress: { EVIDENCE: 3, DISPOSITION: 0 },
          related: 3,
        },
        {
          ...HOLD_REC,
          source: "OP · PH-0331 · review",
          ghost: "Decide",
          status: "In Review",
          actor: "Unifize Assistant",
          event: "Review board assembled on the hold",
          eventDetail: "QA, engineering and production on one thread",
          checklist: "DISPOSITION",
          checklistItems: ["Material review", "QA release · Part 11", "Released to line"],
          focus: "review",
          focusTitle: "Disposition · lot 24-331",
          focusRows: ["Engineering · Rework at Op 30", "Production · Approved", "QA · Pending release"],
          focusAction: "Approve rework",
          focusAlts: ["Scrap", "Use as is"],
          ownershipNote: "The call happens on the record",
          checklistOpen: "DISPOSITION",
          checklistProgress: { DISPOSITION: 1 },
        },
        {
          ...HOLD_REC,
          source: "OP · PH-0331 · release",
          ghost: "Release",
          status: "Needs Approval",
          actor: "You",
          event: "Re-authenticated to release the lot",
          eventDetail: "Signer, meaning and time seal to PH-0331",
          checklist: "DISPOSITION",
          checklistItems: ["Material review", "QA release · Part 11", "Released to line"],
          focus: "signature",
          focusTitle: "Apply your signature",
          focusRows: [],
          focusAction: "Confirm and sign",
          ownershipNote: "Identity re-verified · 21 CFR Part 11",
          world: QA_WORLD,
          checklistOpen: "DISPOSITION",
          checklistProgress: { DISPOSITION: 1 },
          signedItems: [
            { name: "V. Rao", initials: "VR", role: "Material review", approvalId: "5D20H0331B14", time: "15:30" },
          ],
        },
        {
          ...HOLD_REC,
          source: "OP · PH-0331 · handover",
          ghost: "Handover",
          status: "Approved",
          actor: "automator",
          event: "Released · handover read by the night shift",
          eventDetail: "Rework complete · Op 30 re-run · 22:05",
          checklist: "DISPOSITION",
          checklistItems: ["Material review", "QA release · Part 11", "Released to line"],
          focus: "history",
          focusKicker: "DECISION TRACE",
          focusTitle: "Why lot 24-331 moved",
          focusRows: ["PH-0331 · Released · rework complete", "Evidence, decision and signers on the record", "Night shift handover · read 22:05"],
          ownershipNote: "Reconstructable at audit and at recall",
          checklistOpen: "DISPOSITION",
          signedItems: [
            { name: "H. Tan", initials: "HT", role: "QA release", approvalId: "5D20H0331C27", time: "17:10" },
          ],
          related: 3,
        },
      ],
    },
  },

  /* ------------------------------------------------ 04 · for your industry */
  industries: {
    heading: "Operations, in your regulatory frame.",
    lede: "The same work, translated to the standards your plant is audited against.",
    rows: [
      { name: "Industrial machinery", line: "Build-to-order work orders, holds and first-article inspection.", chips: ["ISO 9001"], href: "/industries/industrial-machinery" },
      { name: "Automotive", line: "Control plans, holds and line-stop response.", chips: ["IATF 16949"], href: "/industries/automotive" },
      { name: "Aerospace", line: "First-article inspection and traceable travellers.", chips: ["AS9100", "AS9102"], href: "/industries/aerospace" },
      { name: "Medical devices", line: "Device history records and nonconforming product control.", chips: ["21 CFR 820", "ISO 13485"], href: "/industries/medical-devices" },
      { name: "Pharmaceuticals", line: "Batch records, line clearance and cleaning verification.", chips: ["21 CFR 211"], href: "/industries/pharmaceuticals" },
      { name: "Food processing", line: "Lot traceability, holds and sanitation between runs.", chips: ["FSMA", "BRCGS"], href: "/industries/food-processing" },
      { name: "Chemicals", line: "Batch execution with process safety management of change.", chips: ["OSHA PSM"], href: "/industries/chemicals" },
    ],
    foot: "Yours not listed? The workstreams are industry-agnostic by design.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Modules DB, the 12 modules with Primary Domain = Operations. */
  coverage: {
    heading: "Execution and maintenance, on one record.",
    lede: "The Manufacturing Execution System runs the work orders, travellers and lot records; the maintenance product keeps the equipment they depend on calibrated and running.",
    standardFilters: ["ISO 9001", "IATF 16949", "AS9100", "21 CFR 820"],
    groups: [
      {
        slug: "mes",
        name: "Manufacturing Execution System",
        tier: "Primary",
        promise: "Work orders, travellers, inspections and lot records, signed at every operation.",
        modules: [
          { name: "Work Order Management", blurb: "Open, schedule, execute and close work orders on the shop floor.", href: "/products/mes" },
          { name: "eTravellers", blurb: "Electronic travellers capturing step completion, evidence and signatures at each operation.", href: "/products/mes" },
          { name: "FAI & Control Plan Execution", blurb: "First article inspection and control plan execution with results, disposition and escalation.", href: "/products/mes" },
          { name: "Inspections, Forms & Checklists", blurb: "Configurable inspections executed at defined points in the workflow.", href: "/products/mes" },
          { name: "Electronic Batch/Lot Records", blurb: "Batch and lot records with QR codes for traceability through distribution.", href: "/products/mes" },
        ],
      },
      {
        slug: "cmms",
        name: "Maintenance management (CMMS)",
        tier: "Secondary",
        promise: "Preventive maintenance, breakdowns, calibration and downtime on the same record.",
        modules: [
          { name: "Preventive Maintenance Scheduling", blurb: "Calendar-driven preventive maintenance with route schedules and overdue tracking." },
          { name: "Breakdown & Work Order Management", blurb: "Breakdown reporting, work order assignment and execution tracking." },
          { name: "Calibration Management", blurb: "Calibration schedules, records, certificates and overdue tracking." },
          { name: "Asset Management and Tracking", blurb: "Asset register, location, criticality and history." },
          { name: "Downtime Reporting", blurb: "Downtime captured and classified by reason against availability targets." },
          { name: "Spare Parts Inventory", blurb: "Spare parts catalogue, on-hand quantities and reorder points." },
          { name: "Labour Hours Tracking", blurb: "Time tracked against work orders, maintenance and assets." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role */
  personas: {
    heading: "The plant runs on handoffs.",
    lede: "Find your seat.",
    cards: [
      {
        key: "plant",
        iconKey: "operations",
        name: "Plant leadership",
        stake: "Owns throughput",
        titles: ["VP Operations", "Plant Manager", "Operations Director"],
        value: "Holds, backlogs and commitments carry their reasons, so the plant is run on decisions you can see.",
        cares: "Throughput · On-time delivery · WIP",
        worries: "Line stops · MRB backlog · Firefighting",
        primary: true,
      },
      {
        key: "supervisors",
        iconKey: "engineering",
        name: "Production supervisors",
        stake: "Runs the shift",
        titles: ["Production Supervisor", "Shift Lead", "Line Lead"],
        value: "Holds, dispositions and handovers happen on the record, so the next shift starts with the reasons.",
        cares: "Keeping the line running · Clear handovers",
        worries: "Re-litigated calls · Paper travellers",
      },
      {
        key: "quality",
        iconKey: "quality",
        name: "Quality on the floor",
        stake: "Releases the lot",
        titles: ["QA Manager", "Quality Engineer", "MRB Chair"],
        value: "Dispositions arrive with the evidence bound, so a release is a signature, not a search.",
        cares: "Disposition speed · Audit trail",
        worries: "Verbal releases · Aging holds",
        href: "/explorations/personas/quality-manager",
      },
      {
        key: "maintenance",
        iconKey: "compliance-validation",
        name: "Maintenance and metrology",
        stake: "Keeps equipment in control",
        titles: ["Maintenance Manager", "Metrology Technician", "Reliability Engineer"],
        value: "Calibration and breakdowns are owned by name and tied to the product they touch.",
        cares: "Uptime · Calibration status",
        worries: "Overdue instruments · Undocumented fixes",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent
   * source: Trigger Events DB, the Urgent / High rows linked. */
  triggers: {
    heading: "When the line stops.",
    lede: "Each of these starts a clock, and each routes into a governed workflow, so the response is decided on the record it will be judged by.",
    rows: [
      {
        name: "Production hold pending disposition",
        clock: "Immediate · every held hour compounds",
        severity: "Urgent",
        routesTo: "Work Order Management · Nonconformance",
        owner: "Production · QA · Engineering",
        viz: "stopwatch",
        detail: ["Line 3", "03:40", "QA disposition|Signed", "!Engineering review|Waiting", "!Supplier confirmation|Waiting"],
      },
      {
        name: "Shortage-driven line stop",
        clock: "Immediate · priority decided on a call",
        severity: "Urgent",
        routesTo: "Work Order Management",
        owner: "Planning · Operations · Procurement",
        viz: "allocate",
        detail: ["Seal kit SK-12|40", "Line 1|30", "Line 2|25", "Line 4|20"],
      },
      {
        name: "MRB backlog",
        clock: "Days · WIP cost compounds",
        severity: "High",
        routesTo: "Nonconformance · Material review",
        owner: "Quality · Engineering · Materials",
        viz: "aging",
        detail: ["0-2 d|6", "3-7 d|9", "8-14 d|7", "15+ d|5"],
      },
      { name: "Supplier-caused line stop", clock: "Immediate", severity: "Urgent", routesTo: "Supplier Management", owner: "Procurement · Supplier Quality · Manufacturing" },
      { name: "Recall scope definition required", clock: "Immediate · the regulator's timeline", severity: "Urgent", routesTo: "Post-market and recall", owner: "Quality · Regulatory · Operations" },
      { name: "Failed FDA inspection", clock: "Immediate · weeks of remediation", severity: "Urgent", routesTo: "Quality", owner: "Quality · Manufacturing · Legal" },
      { name: "Incoming inspection backlog", clock: "Days", severity: "High", routesTo: "Inspections, Forms & Checklists", owner: "Quality · Supplier Quality · Materials" },
      { name: "Expedite spiral", clock: "Days", severity: "High", routesTo: "Work Order Management", owner: "Procurement · Planning" },
      { name: "Failed design transfer", clock: "Weeks · the launch date slips", severity: "High", routesTo: "FAI & Control Plan Execution", owner: "Engineering · Operations" },
      { name: "OSHA Process Safety Management gap", clock: "Weeks", severity: "High", routesTo: "EHS", owner: "EHS · Operations · Engineering" },
    ],
    featured: ["Production hold pending disposition", "Shortage-driven line stop", "MRB backlog"],
  },

  /* ------------------------------------------------ 08 · coexistence
   * source: Theme Descriptions naming the systems a plant reconciles across
   * (ERP, planning, QMS, LIMS); the canonical Part 11 claim. */
  coexistence: {
    heading: "It sits on the stack you already run.",
    systemsOfRecord: ["ERP", "QMS", "PLM", "LIMS"],
    body: "Your ERP keeps orders and inventory, your QMS and LIMS keep their records; the holds, dispositions and commitments between them run on Unifize.",
    diagramCaption: "Unifize as the coordination layer on the floor, beside your ERP, QMS, PLM and LIMS.",
    bands: {
      lede: "Keep the ERP that holds orders and inventory, and the quality and lab systems that hold their records. The holds, dispositions and handovers between them run on Unifize, released with a 21 CFR Part 11 signature.",
      note: "No execution system on the floor yet? The MES above runs work orders and travellers on the same layer.",
      tools: {
        title: "Calls and paper travellers",
        sub: "Stop being the record",
        names: ["Calls", "Chat", "Sheets", "Binders"],
        label: "Where floor decisions used to go missing",
        body: "The escalation call, the shift group chat, the hold tracker and the paper traveller stop being where the disposition lives.",
      },
      flows: { contextIn: "ORDERS AND LOTS IN", back: "RELEASED, SIGNED", captured: "DECISIONS CAPTURED", linked: "THE HANDOVER, LINKED" },
      back: "One record per hold, the evidence bound, and only the signed release goes back to the lot.",
    },
  },

  /* ------------------------------------------------ 09 · proof */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, plus the plants that run their floor on Unifize, in their own words.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on non-conformance coordination at a medical-device manufacturer. The figure is anonymized.",
    },
    filmTags: ["Work Orders & Routing", "Electronic Lot Records"],
    stills: [
      { wistia: "dwea6mfuoq", fact: "Finished-good lot process from half a day to 10 minutes" }, /* Mikala Hukka */
      { wistia: "c0rsc1e43v", fact: "Lot release time cut to minutes" }, /* Jesse Kolstad, Biovation Labs */
      { wistia: "wzhhijchdi", fact: "Collaboration right from the shop floor" }, /* Dave Anderson */
      { wistia: "rtcxy7rvv9", fact: "Quantifying what was deemed impossible" }, /* Seth Bozman */
      { wistia: "urt58k17lo", fact: "Lot release, formulas and raw material approvals, accelerated" }, /* Jesse Kolstad, Biovation Labs */
      { wistia: "iveq7d1mjb", fact: "Why pen and paper can't run an FDA-regulated plant" }, /* Natalie Jones */
      { wistia: "rogj3z55b9", fact: "The core problem Efco needed solved" }, /* Seth Bozman */
    ],
    references: [
      { tag: "Named reference", name: MD_PROOF.customers[0].name, desc: MD_PROOF.customers[0].desc },
    ],
    foot: { label: "All customer stories", href: "/resources/testimonials" },
  },

  trust: null,
  caseKit: null,

  growth: {
    heading: "Run the floor. Then the supply behind it.",
    lede: "Operations runs on the same governed record as quality and suppliers.",
    steps: [
      { name: "Operations", note: "You are here" },
      { name: "Quality", note: "Solution page", href: "/domains/quality" },
      { name: "Supplier management", note: "Solution page", href: "/domains/supplier-management" },
      { name: "Manufacturing execution", note: "Live · the MES product", href: "/products/mes" },
    ],
  },

  close: {
    eyebrow: "Operations on Unifize",
    heading: "Release the hold. Keep the reason.",
    lede: "Bring one real hold, a stalled disposition or an aging review-board queue, and see it run on your own work in a 30-minute walkthrough.",
  },
};
