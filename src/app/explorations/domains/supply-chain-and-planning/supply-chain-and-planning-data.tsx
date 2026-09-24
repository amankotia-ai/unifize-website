/* ============================================================================
 * Supply Chain & Planning: domain (Solutions) page data. All values trace to
 * Notion.
 *
 * source: Domains DB -> "Supply Chain and Planning"
 *   (31d860e6b45e81c6b5b7fe09cc06bc6e, Domain 8, Tier Secondary). The hero
 *   framing and the leak thesis are the row's Description: shortage
 *   allocation, PO change management, expedite decisions, supply disruption
 *   governance and schedule freeze management need cross-functional commit
 *   points but no system captures the decision trace; who gets the last units
 *   when three lines compete is decided in escalation calls with no record of
 *   who decided, the criteria, or the customer commitments affected. Named
 *   triggers: shortage-driven line stop, PO change chaos, expedite spiral.
 *   Internal fields (budget owner, play coverage) used for understanding only.
 * source: Themes DB, all 8 rows linked -> section 01 in three clusters.
 * source: Pain Points DB, all 4 rows linked (PNT-56, 59 High; 57, 58 Medium).
 * source: Trigger Events DB, the 5 rows linked. TE-23 "PO change chaos" is
 *   Medium and the board renders Urgent / High only; it is carried by the PO
 *   cell in section 01 instead.
 * source: Modules -> the Domains row links NO modules or products. The
 *   modules shown are the ones this domain's Pain Points name in Modules
 *   Addressing: MDL-23 Work Order Management (MES) and MDL-15 Supplier
 *   Quality (QMS). MDL-70 Vendor Portal (APQP & PPAP) is also named but is
 *   in development, so it is not shown. Planning itself stays in the ERP;
 *   the page says so.
 * source: Website Customer Videos mirror -> the rails proof reel. No film is
 *   about supply chain or planning; the five shown are about decisions,
 *   priorities and why chat cannot be the record, which is this domain's
 *   leak. Facts are taken from each film's own title.
 * The arcade record (shortage allocation SA-0912 on seal kit SK-12) and every
 *   cell artifact are illustrative furniture, never claims.
 * ========================================================================== */

import { MD_PROOF } from "@/lib/platform-data/medical-devices-canonical";
import type { DomainPageData } from "../_shared/types";
import type { ArcadeFlowWorld } from "../../products/_shared/arcade/arcade";

/* ------------------------------------------------------------------------
 * The live arcade journey: a shortage allocation, from the shortfall to the
 * recommitted orders. */
const SHORT_WORLD: ArcadeFlowWorld = {
  team: "Supply Chain",
  recordNoun: "Shortage",
  owner: "G. Moreau",
  ownerInitials: "GM",
  participants: ["GM", "TA", "RS", "+2"],
  participantsLabel: "G. Moreau, T. Ahmed, R. Sato, and two others",
  recordKicker: "SHORTAGE ALLOCATION",
  context: {
    initials: "GM",
    name: "G. Moreau",
    time: "08:15",
    message: "SK-12 seal kits short for week 40.",
    detail: "40 on hand · Lines 1, 2 and 4 need 75",
  },
  inboxNeighbors: [
    { title: "PO-88213 revision 3", time: "10:02", detail: "Quantity and date change · quality approval open", kind: "PO change" },
    { title: "Expedite request · Apex Seals", time: "09:20", detail: "Fourth this week", kind: "Expedite" },
    { title: "Last-time buy · IC-2231", time: "Yesterday", detail: "Order by 14 Nov", kind: "End of life" },
  ],
  checklistTitle: "Shortage",
  checklistSections: [
    {
      title: "SHORTFALL",
      items: [
        { label: "Part short", kind: "field", value: "SK-12 seal kit · 35 short · week 40", note: "Entered from the plan" },
        { label: "Demand affected", note: "Lines 1, 2, 4 · SO-4410, SO-4417, SO-4423" },
        { label: "Supply open", note: "PO-88213 · Apex Seals" },
      ],
    },
    {
      title: "OPTIONS",
      items: [
        { label: "Expedite", note: "PO-88213 · +10 by Thursday" },
        { label: "Alternate source", note: "Northgate · qualified" },
        { label: "Resequence", note: "Line 4 build to week 41" },
      ],
    },
    {
      title: "COMMITMENT",
      items: [
        { label: "Allocation", kind: "approval", signer: "R. Sato", state: "Approved" },
        { label: "Orders recommitted", note: "SO-4417 · 07 Oct" },
        { label: "Customers notified", note: "Customer service · same day" },
      ],
    },
  ],
};

/* the same record as the approver sees it */
const APPROVER_WORLD: ArcadeFlowWorld = { ...SHORT_WORLD, viewer: "R. Sato", viewerInitials: "RS" };

const SHORT_REC = {
  type: "Shortage",
  id: "SA-0912",
  title: "SK-12 seal kit · week 40",
  world: SHORT_WORLD,
} as const;

export const SUPPLY_CHAIN_AND_PLANNING_DATA: DomainPageData = {
  slug: "supply-chain-and-planning",
  name: "Supply Chain & Planning",
  tier: "Secondary",

  hero: {
    crumb: "Supply Chain & Planning",
    titleLead: "Three lines want the last 40 units.",
    titleTurn: "Nobody wrote down who got them.",
    sub: "Shortage allocations, PO changes and expedites are decided in escalation calls, and the planning system only ever sees the outcome. Unifize keeps the options, the criteria and the commitments on the record behind every call.",
    chips: ["Shortage allocation", "PO changes", "Expedites", "Capacity commitments", "End of life"],
    floats: [
      { kind: "seal", title: "Allocated on the record", meta: "SA-0912 · criteria and approver" },
      { kind: "clock", title: "Shortage-driven line stop", meta: "Every hour of line-stop has a cost" },
    ],
    runsIn: {
      label: "Runs wherever supply is tight",
      links: [
        { name: "Automotive", href: "/industries/automotive" },
        { name: "Industrial machinery", href: "/industries/industrial-machinery" },
        { name: "Aerospace", href: "/industries/aerospace" },
        { name: "Medical devices", href: "/industries/medical-devices" },
        { name: "Food processing", href: "/industries/food-processing" },
      ],
      more: { label: "All industries ↓", href: "#by-industry" },
    },
  },

  /* ------------------------------------------------ 01 · the work inside */
  work: {
    heading: "Every commit point, on the record.",
    lede: "The supply work planners and buyers actually run, as governed decisions: the options, the criteria and who agreed, next to the plan they change.",
    groups: [
      {
        glyph: "pulse",
        name: "Shortages and commitments",
        line: "Who gets the parts, what the plant can promise, and what is held while it is decided.",
        viz: {
          kind: "coverage",
          wash: "warm",
          cursor: { name: "G. Moreau", tone: "#7c3aed" },
          part: "SK-12",
          name: "Seal kit · coverage by week",
          weeks: [
            { wk: "W38", demand: 60, supply: 70 },
            { wk: "W39", demand: 55, supply: 60 },
            { wk: "W40", demand: 75, supply: 40 },
            { wk: "W41", demand: 50, supply: 90 },
          ],
        },
        items: [
          { name: "Shortage and Expedite Management", line: "Shortages prioritised and resolved with the substitution and expedite approvals on record." },
          { name: "Capacity Planning and Commitment", line: "Capacity modelled against demand before the commitment is made." },
          { name: "Warehouse and Inventory Hold/Release", line: "Hold impact communicated to planning and customer service as it happens." },
        ],
      },
      {
        glyph: "doc",
        name: "Purchase orders",
        line: "Orders released to qualified suppliers, and every change to them agreed on both sides.",
        viz: {
          kind: "po",
          wash: "sky",
          cursor: { name: "T. Ahmed", tone: "#0f8f7e" },
          po: "PO-88213",
          supplier: "Apex Seals",
          rev: "Rev 3",
          changes: [
            { field: "Quantity", from: "500", to: "350" },
            { field: "Due", from: "12 Oct", to: "26 Oct" },
            { field: "Sub-supplier", from: "Plant A", to: "Plant B" },
          ],
          lanes: [
            { name: "Sourcing", done: true },
            { name: "Quality", done: false },
          ],
        },
        items: [
          { name: "Purchase Order Approval and Release", line: "POs walked through approval thresholds with supplier status checked in time." },
          { name: "Purchase Order Change Management", line: "Quantity, date and specification changes confirmed by the supplier in writing." },
        ],
      },
      {
        glyph: "loop",
        name: "End of life and service",
        line: "Last-time buys, service parts and the installed base through the support window.",
        viz: {
          kind: "ltb",
          wash: "blue",
          cursor: { name: "R. Sato", tone: "#d97706" },
          part: "IC-2231",
          name: "Pressure sensor · last-time buy",
          rows: [
            { k: "Demand to end of support", v: "1,240" },
            { k: "On hand", v: "310" },
            { k: "Open orders", v: "0" },
            { k: "Last-time buy", v: "930", total: true },
          ],
          by: "Order by 14 Nov · supplier notice",
        },
        items: [
          { name: "Product Lifecycle and Obsolescence Management", line: "Obsolescence notices tracked, last-time buys placed and alternates qualified." },
          { name: "Service Parts and Replacement Supply Chain", line: "Low-volume service parts forecast and held against service commitments." },
          { name: "Installed Base and Product Discontinuation", line: "The installed base sustained through the support window, then retired in order." },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 02 · where it leaks */
  leaks: {
    heading: "The plan shows the outcome. Never the call.",
    lede: "The failure modes we see inside supply chain and planning. None of them is a missing feature. All of them are decisions made in a meeting that never reached the record.",
    scene: {
      kicker: "Supply stand-up",
      chip: "Thu 18 Sep",
      title: "The stand-up notes",
      rows: [
        { state: "done", label: "SK-12 short 35", age: "noted" },
        { state: "wait", label: "Line 1 first", age: "per call", warn: true },
        { state: "idle", label: "Customer told?", age: "unknown" },
      ],
      float: { kicker: "Customer service · 3 weeks later", note: "Who agreed to slip SO-4417?" },
      caption: "Decided in a stand-up. The plan got the outcome, not the reasons.",
      minutes: {
        title: "Supply stand-up",
        date: "Thu 18 Sep",
        attendees: "Planning, purchasing, ops",
        bullets: [
          { text: "Resin lead times still 6 wks", faint: true },
          { text: "SK-12 short ~35 for W40" },
          { text: "Line 1 gets kits first (agreed on call)", mark: true },
          { text: "SO-4417 will probably slip. CS to tell customer?" },
          { text: "Apex: chase again", faint: true },
        ],
      },
    },
    pains: [
      {
        severity: "High",
        surface: "Meeting notes",
        name: "Shortage decisions live in meeting notes, not the planning system",
        short: "The plan shows the outcome, not the trade-off.",
        body: "Which customer, which order, what substitute: the decision is made in a stand-up and recorded in meeting notes. The planning system reflects the result, not the reasoning or the alternatives considered.",
      },
      {
        severity: "High",
        surface: "War-room chat",
        name: "Supply disruption response runs in a war-room chat thread",
        short: "Fast in the moment. Gone three months later.",
        body: "A supplier shutdown or logistics failure is coordinated in a real-time chat thread. It works in the moment and leaves no durable record, so the same disruption pattern surprises the team again.",
      },
      {
        severity: "Medium",
        surface: "Parallel approvals",
        name: "PO change approvals scattered between sourcing and quality",
        short: "Sourcing approves one version. Quality approves another.",
        body: "A PO change routes through sourcing for commercial approval and quality for technical approval, in parallel and without a shared view. One lands before the other and the change executes inconsistently.",
      },
      {
        severity: "Medium",
        surface: "The schedule of record",
        name: "Expedite escalations bypass the schedule of record",
        short: "The customer is served. The master schedule drifts.",
        body: "Customer escalations trigger expedites that override the published schedule. The next planning cycle runs on data that does not match what happened.",
      },
    ],
    note: "Severity as rated in our field research with supply chain and planning teams, current as of the last review.",
    tax: {
      label: "The recurring bill",
      value: "The same allocation argued again at the next shortage.",
      meta: "With no record of who decided, on what criteria, or which commitments moved, every shortage starts from zero.",
      tail: "That re-argument is the coordination tax.",
    },
  },

  /* ------------------------------------------------ 03 · the difference
   * source: the Domains Description (who decided, the criteria, commitments
   * affected), TE-22 Shortage-driven line stop, PNT-56. Times narrative. */
  flow: {
    heading: "Make the allocation where it can be read later.",
    lede: "Most planning systems record the plan after the call. Unifize holds the call itself: the shortfall, the options, the criteria, who approved and which customers were told.",
    trailLabel: "How the allocation moves",
    trail: [
      { t: "Shortfall raised against open demand", who: "Planner", when: "08:15" },
      { t: "Options bound: expedite, alternate, resequence", who: "Buyer · Supplier Quality", when: "09:30" },
      { t: "Allocation proposed with its criteria", who: "Planning · Operations", when: "11:00" },
      { t: "Approved", who: "VP Supply Chain", when: "12:10" },
      { t: "Orders recommitted · customers told", who: "Customer Service", when: "14:00" },
    ],
    steps: [
      { title: "Raise the shortfall", body: "SK-12 is 35 short for week 40, against three lines' demand.", icon: "short" },
      { title: "Lay out the options", body: "Expedite PO-88213, the qualified alternate, or move Line 4.", icon: "options" },
      { title: "Allocate with criteria", body: "Line 1 in full, Line 2 in part, and why, on the thread.", icon: "allocate" },
      { title: "Approve it", body: "R. Sato signs the allocation and the orders it moves.", icon: "commit" },
      { title: "Tell the customers", body: "SO-4417 recommitted, the customer told the same day.", icon: "notify" },
    ],
    trailFoot: "The allocation runs back to the shortfall that raised it and forward into the orders it moved. The thread is the trace.",
    chatVariant: "capa",
    shellUrl: "app.unifize.com / shortages / SA-0912",
    mobileLabel: "Shortage allocation trace",
    mobileId: "SA-0912 · shortfall → options → allocation → approval → recommit",
    arcade: {
      steps: [
        {
          ...SHORT_REC,
          source: "SC · SA-0912 · raise",
          ghost: "Shortfall",
          status: "Open",
          actor: "You",
          event: "Raised the SK-12 shortfall for week 40",
          eventDetail: "Demand from Lines 1, 2 and 4 linked · open PO attached",
          checklist: "SHORTFALL",
          checklistItems: ["Part short", "Demand affected", "Supply open"],
          focus: "record",
          focusRows: ["SK-12 seal kit · 35 short", "Needed by Lines 1, 2 and 4 · week 40"],
          focusTitle: "Shortage",
          ownershipNote: "One record from the first shortfall",
          checklistOpen: "SHORTFALL",
          checklistEntry: { section: "SHORTFALL", item: "Part short" },
          checklistProgress: { SHORTFALL: 2, OPTIONS: 0, COMMITMENT: 0 },
        },
        {
          ...SHORT_REC,
          source: "SC · SA-0912 · options",
          ghost: "Options",
          status: "Open",
          actor: "automator",
          event: "Bound the options to the shortage",
          eventDetail: "Expedite, alternate source and resequence, each with its cost",
          checklist: "OPTIONS",
          checklistItems: ["Expedite", "Alternate source", "Resequence"],
          focus: "trace",
          focusTitle: "Options on the table",
          focusRows: ["Expedite PO-88213 · +10 by Thursday", "Northgate · qualified alternate", "Line 4 build to week 41"],
          focusAction: "Compare options",
          ownershipNote: "The alternatives stay on the record",
          checklistOpen: "OPTIONS",
          checklistProgress: { OPTIONS: 3, COMMITMENT: 0 },
          related: 3,
        },
        {
          ...SHORT_REC,
          source: "SC · SA-0912 · allocate",
          ghost: "Allocate",
          status: "In Review",
          actor: "Unifize Assistant",
          event: "Allocation proposed with its criteria",
          eventDetail: "Customer priority and contract terms on the thread",
          checklist: "COMMITMENT",
          checklistItems: ["Allocation", "Orders recommitted", "Customers notified"],
          focus: "review",
          focusTitle: "Allocation · 40 kits",
          focusRows: ["Line 1 · SO-4410 · 30 in full", "Line 2 · SO-4417 · 10 of 25", "Line 4 · moved to week 41"],
          focusAction: "Approve allocation",
          focusAlts: ["Return with comment"],
          ownershipNote: "Who decided, and on what criteria",
          checklistOpen: "COMMITMENT",
          checklistProgress: { COMMITMENT: 0 },
        },
        {
          ...SHORT_REC,
          source: "SC · SA-0912 · approve",
          ghost: "Approve",
          status: "Needs Approval",
          actor: "You",
          event: "Approving the allocation",
          eventDetail: "Signer, meaning and time seal to SA-0912",
          checklist: "COMMITMENT",
          checklistItems: ["Allocation", "Orders recommitted", "Customers notified"],
          focus: "signature",
          focusTitle: "Apply your signature",
          focusRows: [],
          focusAction: "Confirm and sign",
          ownershipNote: "The approver is on the record",
          world: APPROVER_WORLD,
          checklistOpen: "COMMITMENT",
          checklistProgress: { COMMITMENT: 0 },
        },
        {
          ...SHORT_REC,
          source: "SC · SA-0912 · recommit",
          ghost: "Recommit",
          status: "Approved",
          actor: "automator",
          event: "Orders recommitted · customers notified",
          eventDetail: "SO-4417 to 07 Oct · schedule of record updated",
          checklist: "COMMITMENT",
          checklistItems: ["Allocation", "Orders recommitted", "Customers notified"],
          focus: "history",
          focusKicker: "DECISION TRACE",
          focusTitle: "Who got the kits, and why",
          focusRows: ["SA-0912 · allocation approved · R. Sato", "Criteria · customer priority, contract terms", "SO-4417 · recommitted 07 Oct · customer told"],
          ownershipNote: "Readable at the next shortage",
          checklistOpen: "COMMITMENT",
          signedItems: [
            { name: "R. Sato", initials: "RS", role: "VP Supply Chain", approvalId: "8F12S0912A31", time: "12:10" },
          ],
          related: 3,
        },
      ],
    },
  },

  /* ------------------------------------------------ 04 · for your industry */
  industries: {
    heading: "Supply decisions, in your industry.",
    lede: "The same commit points, under the contracts and standards you work to.",
    rows: [
      { name: "Automotive", line: "Line-stop exposure and customer schedule commitments.", chips: ["IATF 16949"], href: "/industries/automotive" },
      { name: "Industrial machinery", line: "Build-to-order commitments and long-lead components.", chips: ["ISO 9001"], href: "/industries/industrial-machinery" },
      { name: "Aerospace", line: "Long-lead parts, obsolescence and approved sources.", chips: ["AS9100"], href: "/industries/aerospace" },
      { name: "Medical devices", line: "Supplier controls and component end of life.", chips: ["ISO 13485"], href: "/industries/medical-devices" },
      { name: "Food processing", line: "Ingredient shortages and approved alternates.", chips: ["FSMA"], href: "/industries/food-processing" },
    ],
    foot: "Yours not listed? The commit points are the same everywhere.",
  },

  /* ------------------------------------------------ 05 · the modules
   * source: Pain Points DB Modules Addressing (the Domains row links none). */
  coverage: {
    heading: "Your plan stays in the ERP. The decisions run here.",
    lede: "Unifize does not replace your planning system. The work orders and supplier records these decisions touch run on two products, on the same record as the call.",
    standardFilters: ["ISO 9001", "IATF 16949"],
    groups: [
      {
        slug: "mes",
        name: "Manufacturing Execution System",
        tier: "Primary",
        promise: "The work orders an allocation moves, rescheduled on the record.",
        modules: [
          { name: "Work Order Management", blurb: "Open, schedule, execute and close work orders on the shop floor.", href: "/products/mes" },
        ],
      },
      {
        slug: "qms",
        name: "Quality Management System",
        tier: "Secondary",
        promise: "The supplier's status and corrective actions behind every PO and alternate.",
        modules: [
          { name: "Supplier Quality", blurb: "Supplier qualification, corrective action requests and scorecards.", href: "/products/qms" },
        ],
      },
    ],
  },

  /* ------------------------------------------------ 06 · by your role */
  personas: {
    heading: "Supply is decided across seats.",
    lede: "Find yours.",
    cards: [
      {
        key: "supply",
        iconKey: "operations",
        name: "Supply chain leadership",
        stake: "Owns the commitments",
        titles: ["VP Supply Chain", "Chief Procurement Officer", "Director of Planning"],
        value: "Every allocation, expedite and PO change carries its criteria, so the next shortage starts from what was decided last time.",
        cares: "On-time delivery · Cost · Supplier risk",
        worries: "Line stops · Expedite spirals · Re-argued decisions",
        primary: true,
      },
      {
        key: "planners",
        iconKey: "engineering",
        name: "Planners and schedulers",
        stake: "Keep the plan real",
        titles: ["Supply Planner", "Production Scheduler", "Materials Manager"],
        value: "The schedule of record moves with the decision, not after it.",
        cares: "Plan accuracy · Coverage",
        worries: "Schedules that drift from reality",
      },
      {
        key: "buyers",
        iconKey: "regulatory",
        name: "Buyers and sourcing",
        stake: "Carry it to the supplier",
        titles: ["Buyer", "Sourcing Manager", "Supplier Relationship Manager"],
        value: "PO changes and expedites are agreed with sourcing, quality and the supplier on one record.",
        cares: "Supplier confirmation · Lead times",
        worries: "Unconfirmed changes · Disputes",
      },
      {
        key: "quality",
        iconKey: "quality",
        name: "Supplier quality",
        stake: "Approves the alternate",
        titles: ["Supplier Quality Engineer", "Quality Manager"],
        value: "Substitutions and alternates are approved against the supplier's record, in time.",
        cares: "Qualified sources · Technical approval",
        worries: "Approvals out of step with sourcing",
        href: "/explorations/personas/quality-manager",
      },
    ],
  },

  /* ------------------------------------------------ 07 · when it's urgent */
  triggers: {
    heading: "When supply breaks.",
    lede: "Each of these starts a clock, and each routes into a governed decision, so the call is made on the record it will be judged by.",
    rows: [
      {
        name: "Shortage-driven line stop",
        clock: "Immediate · every hour of line-stop has a cost",
        severity: "Urgent",
        routesTo: "Work Order Management",
        owner: "Planning · Operations · Procurement",
        viz: "tradeoff",
        detail: ["Who gets the 40 kits?", "Line 1 in full|SO-4417 slips 4 days", "Split across lines|Two orders slip 2 days", "Expedite and wait|Line stops half a shift"],
      },
      {
        name: "Expedite spiral",
        clock: "Days · each expedite invites the next",
        severity: "High",
        routesTo: "Supplier Quality · Work Order Management",
        owner: "Procurement · Planning",
        viz: "stack",
        detail: ["Apex Seals", "EXP-114|Line 2|today", "EXP-111|Customer service|1 d", "EXP-109|Line 1|2 d", "EXP-102|Planning|4 d"],
      },
      {
        name: "Supplier-caused line stop",
        clock: "Immediate",
        severity: "Urgent",
        routesTo: "Supplier Quality",
        owner: "Procurement · Supplier Quality · Manufacturing",
        viz: "sources",
        detail: ["SK-12 seal kit", "Apex Seals|down|Plant A shutdown", "Northgate|ok|Qualified · 3 wk lead", "Westline|no|Samples under review"],
      },
      { name: "Supplier capacity crisis", clock: "Weeks · within the supplier's recovery window", severity: "High", routesTo: "Supplier Quality", owner: "Procurement · Supply Chain · Commercial" },
    ],
    featured: ["Shortage-driven line stop", "Expedite spiral", "Supplier-caused line stop"],
  },

  /* ------------------------------------------------ 08 · coexistence */
  coexistence: {
    heading: "It sits beside the plan you already run.",
    systemsOfRecord: ["ERP", "MES", "QMS", "PLM"],
    body: "Your ERP and planning tools keep the plan; the decisions that change it run on Unifize.",
    diagramCaption: "Unifize as the decision layer beside your ERP, MES, QMS and PLM.",
    bands: {
      lede: "Keep the ERP and planning tools that hold demand, supply and the schedule. The shortage calls, PO changes and expedites that move them run on Unifize, with who decided and why.",
      note: "No execution or supplier system yet? The MES and QMS above run work orders and supplier records on the same layer.",
      tools: {
        title: "Stand-ups and war rooms",
        sub: "Stop being the record",
        names: ["Meetings", "Chat", "Email", "Sheets"],
        label: "Where supply decisions used to vanish",
        body: "The stand-up notes, the war-room thread and the expedite spreadsheet stop being where the allocation lives.",
      },
      flows: { contextIn: "DEMAND AND SUPPLY IN", back: "THE APPROVED PLAN", captured: "CALLS CAPTURED", linked: "THE CRITERIA, LINKED" },
      back: "One record per decision, the options and criteria bound, and only the approved change goes back to the plan.",
    },
  },

  /* ------------------------------------------------ 09 · proof */
  proof: {
    heading: "Proof, to the standard you'd hold us to.",
    lede: "A signed baseline, plus the teams who moved their decisions onto one record, in their own words.",
    attested: {
      label: MD_PROOF.stat.attribution,
      stat: `${MD_PROOF.stat.pct}%`,
      statLabel: `lower ${MD_PROOF.stat.metric}, measured in year one`,
      body: MD_PROOF.stat.detail,
      note: "One signed, verifiable customer baseline, measured on non-conformance coordination at a medical-device manufacturer. The figure is anonymized.",
    },
    stills: [
      { wistia: "m4ammug17o", fact: "Why chat can't replace a collaborative system" }, /* Mikala Hukka */
      { wistia: "wm7hxkv1ka", fact: "Collaborative discussions, faster decisions" }, /* Seth Bozman */
      { wistia: "uashgnl3ie", fact: "Accountability and faster decisions" }, /* Tedd Carr, The Will-Burt Company */
      { wistia: "tgyxcnnyrs", fact: "Priorities set on the record" }, /* Seth Bozman */
      { wistia: "nnlge3r2h0", fact: "Silos broken, knowledge centralised" }, /* Jesse Kolstad, Biovation Labs */
    ],
    references: [
      { tag: "Named reference", name: MD_PROOF.customers[0].name, desc: MD_PROOF.customers[0].desc },
    ],
    foot: { label: "All customer stories", href: "/resources/testimonials" },
  },

  trust: null,
  caseKit: null,

  growth: {
    heading: "Decide the supply. Then the floor that uses it.",
    lede: "Supply decisions run on the same governed record as operations and suppliers.",
    steps: [
      { name: "Supply chain & planning", note: "You are here" },
      { name: "Operations", note: "Solution page", href: "/domains/operations" },
      { name: "Supplier management", note: "Solution page", href: "/domains/supplier-management" },
    ],
  },

  close: {
    eyebrow: "Supply chain on Unifize",
    heading: "Allocate it. Keep the reason.",
    lede: "Bring one real shortage, a stuck PO change or an expedite spiral, and see it run on your own work in a 30-minute walkthrough.",
  },
};
