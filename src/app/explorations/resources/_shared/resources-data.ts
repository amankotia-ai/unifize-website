/* ============================================================================
 * resources-data.ts - content for the Resources area (customer video stories,
 * blog, case studies). Built in the DMS design system (see ../../products/dms).
 *
 * GROUNDING. The taxonomy is real Unifize domain: the four products
 * (QMS / DMS / PLM / MES) are the module facets; industries and the compliance
 * frame (ISO 13485, 21 CFR Part 11, FDA 483 -> CAPA, IATF 16949, AS 9100 ...)
 * mirror the canonical platform data. Company names and outcome figures are
 * REPRESENTATIVE SAMPLE content for the template - video tiles carry a "Sample"
 * marker and no invented human faces are used (posters are coded field tiles;
 * only the two real generated portraits appear on featured cards). Replace the
 * records with real customer footage / stories before shipping.
 * ========================================================================== */

export type ModuleTag = "QMS" | "DMS" | "PLM" | "MES";

export const MODULES: { key: ModuleTag; name: string; blurb: string }[] = [
  { key: "QMS", name: "Quality", blurb: "CAPA, audits, complaints, supplier quality" },
  { key: "DMS", name: "Documents", blurb: "Controlled documents, revisions, training" },
  { key: "PLM", name: "Product", blurb: "DHF, design controls, change orders" },
  { key: "MES", name: "Manufacturing", blurb: "eDHR, deviations, batch release" },
];

export const INDUSTRIES = [
  "Medical Devices",
  "Pharmaceuticals",
  "Aerospace & Defense",
  "Automotive",
  "Food & Beverage",
  "Contract Manufacturing",
] as const;
export type Industry = (typeof INDUSTRIES)[number];

/* two real generated portraits that already ship in /public (see design-system
 * memory): reused as featured customer faces. Everything else is a coded poster. */
const PORTRAIT_DOC = "/Gemini_Generated_Image_3wwcb33wwcb33wwc.png"; // document controller
const PORTRAIT_TRAIN = "/Gemini_Generated_Image_r84h7yr84h7yr84h.png"; // training coordinator

/* ---------------------------------------------------------------- shared */
export type Metric = { value: string; label: string };

/* company profiles for the SAMPLE case studies (real customer videos live in
 * customer-videos.ts, generated from the Notion Website Customer Videos DB) */
const CO = {
  corvent: {
    about:
      "Corvent Medical designs and manufactures Class III implantable cardiovascular devices, carrying products from design controls through post-market surveillance under FDA and EU MDR oversight.",
    size: "420 employees",
    standards: ["ISO 13485", "21 CFR 820", "21 CFR Part 11", "EU MDR"],
  },
  aldale: {
    about:
      "Aldale Therapeutics is a sterile injectables CDMO running fill-finish and lyophilization programs for clinical and commercial customers under FDA and EU GMP oversight.",
    size: "260 employees",
    standards: ["21 CFR Part 211", "21 CFR Part 11", "EU GMP Annex 1", "ICH Q10"],
  },
  northpin: {
    about:
      "Northpin Aerospace is a Tier-1 supplier of structural assemblies for commercial and defense airframes, delivering build-to-print and design-assist programs under AS9100 and NADCAP accreditation.",
    size: "1,100 employees",
    standards: ["AS9100D", "ISO 9001", "NADCAP", "ITAR"],
  },
  veremark: {
    about:
      "Veremark Devices develops Class II diagnostic instruments and assays, taking products through design controls, verification, and FDA submission on an ISO 13485 quality system.",
    size: "180 employees",
    standards: ["ISO 13485", "21 CFR 820", "21 CFR Part 11"],
  },
  brightbore: {
    about:
      "Brightbore Automotive machines and assembles powertrain components for global vehicle OEMs, running IATF 16949 quality across high-volume production lines.",
    size: "680 employees",
    standards: ["IATF 16949", "ISO 9001", "VDA 6.3"],
  },
  fenmoor: {
    about:
      "Fenmoor Foods manufactures ready-to-eat meals across three production sites, running HACCP-based food safety under FSMA and GFSI certification.",
    size: "350 employees",
    standards: ["FSMA 21 CFR 117", "HACCP", "SQF"],
  },
  atlas: {
    about:
      "Atlas Contract Manufacturing is a medical device CDMO building finished devices and subassemblies for a dozen client programs on a shared ISO 13485 backbone.",
    size: "540 employees",
    standards: ["ISO 13485", "21 CFR 820", "21 CFR Part 11"],
  },
};

/* ---------------------------------------------------------------- blog */
export type Author = { name: string; role: string; img?: string };
export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "list"; items: string[] }
  | { kind: "callout"; label: string; text: string };

export const BLOG_CATEGORIES = [
  "Quality strategy",
  "Compliance",
  "Product",
  "Manufacturing",
  "How-to",
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type Post = {
  slug: string;
  title: string;
  dek: string;
  category: BlogCategory;
  author: Author;
  date: string; // ISO
  dateLabel: string;
  readMins: number;
  featured?: boolean;
  body: Block[];
};

const AUTHOR_BEN: Author = { name: "Ben Basalone", role: "Head of Quality Practice" };
const AUTHOR_SACHIN: Author = { name: "Sachin Kundu", role: "Product" };
const AUTHOR_DANA: Author = { name: "Dana Whitfield", role: "Guest, VP Quality at Corvent", img: PORTRAIT_DOC };

export const POSTS: Post[] = [
  {
    slug: "why-capa-backlogs-never-clear",
    title: "Why your CAPA backlog never clears (and what actually fixes it)",
    dek: "The backlog is not a discipline problem. It is a coordination problem, and coordination is a system you can change.",
    category: "Quality strategy",
    author: AUTHOR_BEN,
    date: "2026-06-24",
    dateLabel: "Jun 24, 2026",
    readMins: 7,
    featured: true,
    body: [
      { kind: "p", text: "Every quality leader has inherited a CAPA list they did not create and cannot seem to close. The instinct is to blame follow-through. The reality is that a CAPA touches five people in three systems, and the work stalls in the gaps between them." },
      { kind: "h2", text: "The backlog is made of handoffs" },
      { kind: "p", text: "An investigation waits on a subject-matter expert who never got the email. An effectiveness check waits on data that lives in a spreadsheet nobody owns. Each handoff is a place the work goes cold, and the backlog is just the sum of the cold handoffs." },
      { kind: "quote", text: "Nothing in a CAPA is hard. The waiting between the steps is the whole problem.", cite: "A quality director we work with" },
      { kind: "h2", text: "Put the whole action in one thread" },
      { kind: "p", text: "When the investigation, the root cause, the linked evidence, and the effectiveness check live in a single thread with a single owner, the handoffs stop being handoffs. The next person is already in the conversation. The evidence is already attached. The auditor sees the whole story in one place." },
      { kind: "list", items: [
        "One owner and one due date, visible to everyone the action touches",
        "Evidence linked in place, not attached to an email",
        "Effectiveness checks scheduled the moment the action closes",
        "A record that reads as a story, not a scavenger hunt",
      ] },
      { kind: "callout", label: "The shift", text: "You do not clear a backlog by working harder on each CAPA. You clear it by removing the places a CAPA can wait." },
      { kind: "p", text: "Teams that make this shift do not just close faster. They stop generating the backlog in the first place, because the system no longer has cold corners for work to die in." },
    ],
  },
  {
    slug: "21-cfr-part-11-plain-english",
    title: "21 CFR Part 11 in plain English for the people who have to live with it",
    dek: "Electronic records and signatures, minus the legalese. What Part 11 actually asks of your quality system.",
    category: "Compliance",
    author: AUTHOR_SACHIN,
    date: "2026-06-11",
    dateLabel: "Jun 11, 2026",
    readMins: 9,
    body: [
      { kind: "p", text: "Part 11 is short. The anxiety around it is not. Most of the fear comes from treating it as a checklist of features rather than a set of guarantees your records have to make." },
      { kind: "h2", text: "What the rule is really about" },
      { kind: "p", text: "Part 11 asks three things of an electronic record: that you know who did what and when, that the record cannot be quietly altered, and that a signature means the same thing it would on paper. Everything else is implementation detail in service of those three guarantees." },
      { kind: "list", items: [
        "Attributable: every action ties to an identified person",
        "Trustworthy: an audit trail you cannot edit away",
        "Enduring: the record and its meaning survive time and export",
      ] },
      { kind: "quote", text: "A compliant system is not one with more controls. It is one where the controls are inseparable from the work." },
      { kind: "h2", text: "Where teams get it wrong" },
      { kind: "p", text: "The failure mode is bolting signatures onto a system that was never designed to be attributable. If the audit trail is a report you generate, it is already suspect. If it is the substrate the work runs on, it is trustworthy by construction." },
      { kind: "callout", label: "Rule of thumb", text: "If you can describe how a record could be changed without a trace, you have a Part 11 gap - regardless of what the feature list says." },
    ],
  },
  {
    slug: "review-by-exception-on-the-floor",
    title: "Review-by-exception: how electronic batch records give you back the shift",
    dek: "When a clean record releases itself, your reviewers only ever touch the deviations. Here is what that changes.",
    category: "Manufacturing",
    author: AUTHOR_BEN,
    date: "2026-05-28",
    dateLabel: "May 28, 2026",
    readMins: 6,
    body: [
      { kind: "p", text: "Paper batch records are reviewed line by line because any line could be wrong. Electronic records flip the default: the system knows what a complete, in-spec record looks like, so a human only has to look where something deviated." },
      { kind: "h2", text: "The economics of only looking at exceptions" },
      { kind: "p", text: "If ninety-eight percent of your batches are right the first time, review-by-exception means ninety-eight percent of your review time disappears. The reviewers are not doing less quality work. They are doing all of the quality work and none of the transcription." },
      { kind: "quote", text: "A clean batch should release itself the moment the record is complete. A human belongs on the two percent that did not go clean." },
      { kind: "h2", text: "What it takes to get there" },
      { kind: "list", items: [
        "In-line checks that catch a deviation at the step, not at review",
        "A record that is complete by construction, not by reconciliation",
        "Escalation that pulls quality in before the batch moves on",
      ] },
      { kind: "callout", label: "The payoff", text: "Teams that adopt review-by-exception routinely cut days off release while raising right-first-time rates - because the same in-line checks that release clean batches prevent the dirty ones." },
    ],
  },
  {
    slug: "design-controls-that-build-the-dhf",
    title: "Stop assembling the design history file. Let it build itself.",
    dek: "The DHF is not a deliverable you write at the end. It is a view of design work you already did - if your system is built for it.",
    category: "Product",
    author: AUTHOR_SACHIN,
    date: "2026-05-14",
    dateLabel: "May 14, 2026",
    readMins: 8,
    body: [
      { kind: "p", text: "Ask any device team about their design history file and you will hear about the crunch: the weeks before a submission spent reconstructing decisions from memory, email, and half-current documents." },
      { kind: "h2", text: "The DHF as a byproduct" },
      { kind: "p", text: "Design controls are not paperwork about the work. They are the work: needs become requirements, requirements become verifications, changes are traced through. If that chain is captured as it happens, the DHF is just a report over it." },
      { kind: "quote", text: "The best design history file is the one nobody assembled - because the system recorded the design as it was designed." },
      { kind: "list", items: [
        "User needs linked to design inputs, live",
        "Inputs traced to outputs and verification, one to one",
        "Every change carrying its justification and approval",
      ] },
      { kind: "callout", label: "The test", text: "If your team can generate a submission-ready DHF on any random Tuesday, your design controls are working. If it takes a project, they are not." },
    ],
  },
  {
    slug: "surviving-an-fda-483",
    title: "You got an FDA 483. Here is the first week, hour by hour.",
    dek: "A Form 483 is not a Warning Letter yet. What you do in the first days decides which one it becomes.",
    category: "Compliance",
    author: AUTHOR_BEN,
    date: "2026-04-30",
    dateLabel: "Apr 30, 2026",
    readMins: 10,
    body: [
      { kind: "p", text: "A 483 lists observations, not conclusions. The agency is telling you what it saw and waiting to see how you respond. A serious, well-evidenced response inside fifteen business days is the difference between a closed observation and an escalation." },
      { kind: "h2", text: "The clock starts now" },
      { kind: "p", text: "The response has to acknowledge each observation, state corrections already made, and lay out a corrective action plan with dates. Vague intentions read as risk. Specific, evidenced actions read as control." },
      { kind: "list", items: [
        "Day 1: assign an owner per observation, open a CAPA for each",
        "Day 2-5: contain - what did you fix immediately, with proof",
        "Day 6-12: root cause and a dated corrective action plan",
        "Day 13-15: a response the evidence backs, not the intent",
      ] },
      { kind: "quote", text: "The 483 is a question about whether you are in control of your quality system. Answer it with records, not reassurance." },
      { kind: "callout", label: "Why the system matters", text: "When your CAPAs, evidence, and effectiveness checks already live in one place, the 483 response is a matter of pointing at work you were already doing - not building a case from scratch under a deadline." },
    ],
  },
  {
    slug: "one-workspace-per-program-cdmo",
    title: "The CDMO advantage: one workspace per client program",
    dek: "Contract manufacturers win or lose on tech transfer speed. The bottleneck is almost never the process - it is the paperwork around it.",
    category: "How-to",
    author: AUTHOR_DANA,
    date: "2026-04-16",
    dateLabel: "Apr 16, 2026",
    readMins: 5,
    body: [
      { kind: "p", text: "A contract manufacturer lives on how fast it can take a client's process and make it real: controlled documents stood up, batch records built, operators trained, first article run. The process itself is rarely the constraint." },
      { kind: "h2", text: "The constraint is coordination" },
      { kind: "p", text: "Every new client arrives with their own document set, their own change conventions, their own quality expectations. Standing that up in a system that keeps it separate from your other programs - while still running on your quality backbone - is the whole game." },
      { kind: "quote", text: "Onboarding a client stopped being a project the day each program got its own workspace on a shared spine." },
      { kind: "callout", label: "The result", text: "Transfers that used to take a quarter land in weeks, and every program stays audit-ready without a separate system for each client." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/* ---------------------------------------------------------------- case studies */
export type CaseStudy = {
  slug: string;
  company: string;
  companyKind: string;
  industry: Industry;
  modules: ModuleTag[];
  headline: string;
  summary: string;
  size: string;
  standards: string[];
  /** company profile shown in the item page's About card */
  about: string;
  /** display headings for the challenge/approach/result story blocks */
  storyHeads: { challenge: string; approach: string; result: string };
  metrics: Metric[]; // 3 headline results
  quote: { text: string; person: string; role: string; img?: string };
  challenge: string[];
  approach: string[];
  result: string[];
  featured?: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "corvent-medical",
    company: "Corvent Medical",
    companyKind: "Class III device OEM",
    industry: "Medical Devices",
    modules: ["QMS", "DMS", "PLM"],
    headline: "How Corvent Medical cleared a CAPA backlog and walked into an audit with nothing overdue",
    summary:
      "A growing Class III manufacturer was drowning in a CAPA list that spanned three systems. Consolidating quality, documents, and design onto one thread-based backbone turned closure into a routine, not a fire drill.",
    size: "420 employees",
    standards: ["ISO 13485", "21 CFR 820", "21 CFR Part 11", "EU MDR"],
    about: CO.corvent.about,
    storyHeads: { challenge: "Three systems, one backlog", approach: "One thread-based backbone", result: "Nothing overdue, nothing assembled" },
    metrics: [
      { value: "63%", label: "faster CAPA closure" },
      { value: "0", label: "overdue CAPAs at audit" },
      { value: "5 wks", label: "off submission prep" },
    ],
    quote: {
      text: "The investigation, the effectiveness check, the linked evidence - it all lives in one thread now. Nothing waits on an email.",
      person: "Dana Whitfield",
      role: "VP Quality, Corvent Medical",
      img: PORTRAIT_DOC,
    },
    challenge: [
      "CAPAs, controlled documents, and design records lived in three disconnected systems, so every action required manual reconciliation.",
      "The backlog was not a discipline problem - work went cold in the handoffs between owners, systems, and email threads.",
      "Audit prep meant a week of assembling evidence that should have been a click.",
    ],
    approach: [
      "Moved CAPA, document control, and design controls onto one thread-based workspace, each action carrying its own owner and evidence.",
      "Wired effectiveness checks to schedule automatically at closure.",
      "Linked training reassignment to document revisions so competency never drifted from the current SOP.",
    ],
    result: [
      "CAPA closure time fell by nearly two thirds within a quarter.",
      "The team walked into its next ISO 13485 surveillance audit with zero overdue actions and pulled evidence live.",
      "Submission preparation dropped by five weeks as the DHF became a view of work already done.",
    ],
    featured: true,
  },
  {
    slug: "aldale-therapeutics",
    company: "Aldale Therapeutics",
    companyKind: "Sterile injectables CDMO",
    industry: "Pharmaceuticals",
    modules: ["MES", "QMS", "DMS"],
    headline: "Aldale Therapeutics releases sterile batches on the same shift they finish",
    summary:
      "A sterile injectables CDMO replaced paper batch records with an electronic record that releases clean batches by exception - freeing reviewers to work only the deviations.",
    size: "260 employees",
    standards: ["21 CFR Part 211", "21 CFR Part 11", "EU GMP Annex 1", "ICH Q10"],
    about: CO.aldale.about,
    storyHeads: { challenge: "Days lost to line-by-line review", approach: "eDHR with review-by-exception", result: "Release on the same shift" },
    metrics: [
      { value: "2 days", label: "cut from batch release" },
      { value: "98%", label: "right-first-time" },
      { value: "48%", label: "faster SCAR closure" },
    ],
    quote: {
      text: "Review-by-exception means my team only touches the deviations. A clean batch releases itself the moment the record is complete.",
      person: "Marcus Hale",
      role: "Head of Manufacturing, Aldale Therapeutics",
      img: PORTRAIT_TRAIN,
    },
    challenge: [
      "Paper batch records were reviewed line by line, adding days to every release.",
      "Deviations surfaced at review, long after the step that caused them.",
      "Supplier corrective actions went cold in email chains with no owner.",
    ],
    approach: [
      "Deployed eDHR on the floor with in-line checks that catch deviations at the step.",
      "Configured review-by-exception so complete, in-spec records release without line-by-line review.",
      "Brought suppliers into corrective-action threads with visible owners and due dates.",
    ],
    result: [
      "Batch release moved from days to the same shift the record completes.",
      "Right-first-time rose to 98% as in-line checks prevented the dirty batches.",
      "Supplier corrective actions closed nearly twice as fast.",
    ],
  },
  {
    slug: "northpin-aerospace",
    company: "Northpin Aerospace",
    companyKind: "Tier-1 structures supplier",
    industry: "Aerospace & Defense",
    modules: ["QMS", "PLM", "MES"],
    headline: "Northpin Aerospace made AS9100 surveillance a non-event",
    summary:
      "A Tier-1 aerostructures supplier tied every change, nonconformance, and disposition to the part serial number - so traceability is the default and audit prep nearly disappeared.",
    size: "1,100 employees",
    standards: ["AS9100D", "ISO 9001", "NADCAP", "ITAR"],
    about: CO.northpin.about,
    storyHeads: { challenge: "Traceability rebuilt for every audit", approach: "Recorded against the serial number", result: "Surveillance became a non-event" },
    metrics: [
      { value: "0", label: "major findings" },
      { value: "40%", label: "less audit prep" },
      { value: "70%", label: "faster NCR disposition" },
    ],
    quote: {
      text: "The auditor asked for the change history on a fastener spec. I pulled it up in the thread while they watched. No binder, no scramble.",
      person: "Priya Raman",
      role: "Quality Systems Manager, Northpin Aerospace",
    },
    challenge: [
      "Traceability was reconstructed for every audit rather than captured as work happened.",
      "Nonconforming parts waited in hold cages for MRB meetings.",
      "Change history for specifications lived across disconnected documents.",
    ],
    approach: [
      "Recorded every change, NCR, and disposition against the part and serial number.",
      "Moved MRB disposition to the floor, pulling the right reviewers into the thread.",
      "Made specification change history a live view rather than an assembled report.",
    ],
    result: [
      "The last AS9100 surveillance closed with zero major findings.",
      "Audit preparation dropped by 40% as evidence was already in place.",
      "Nonconformance disposition sped up 70%, cutting work-in-progress on hold.",
    ],
  },
  {
    slug: "brightbore-automotive",
    company: "Brightbore Automotive",
    companyKind: "Powertrain components",
    industry: "Automotive",
    modules: ["QMS", "PLM"],
    headline: "Brightbore Automotive gets PPAP accepted first time, 92% of the time",
    summary:
      "A powertrain components supplier tied every PPAP element to the part revision, turning a week-long submission package into a single click - and lifting first-time acceptance from OEM customers.",
    size: "680 employees",
    standards: ["IATF 16949", "ISO 9001", "VDA 6.3"],
    about: CO.brightbore.about,
    storyHeads: { challenge: "PPAP scattered across folders", approach: "Every element bound to the revision", result: "Accepted the first time" },
    metrics: [
      { value: "1 click", label: "PPAP package" },
      { value: "92%", label: "first-time acceptance" },
      { value: "35%", label: "less rework on submissions" },
    ],
    quote: {
      text: "Every PSW, every control plan, every dimensional result is tied to the part revision. The submission package is one click, not one week.",
      person: "Owen Castellano",
      role: "Supplier Quality Lead, Brightbore Automotive",
    },
    challenge: [
      "PPAP elements were scattered across spreadsheets and folders, disconnected from the part revision.",
      "Assembling a submission took a week and often bounced back from the OEM.",
      "Control plans drifted out of sync with the current design.",
    ],
    approach: [
      "Linked every PPAP element - PSW, control plan, dimensional results - to the governing part revision.",
      "Generated the submission package directly from the linked records.",
      "Kept control plans bound to design changes so they never drifted.",
    ],
    result: [
      "The PPAP package became a single click over already-linked records.",
      "First-time acceptance from OEM customers reached 92%.",
      "Rework on submissions fell by a third.",
    ],
  },
  {
    slug: "atlas-contract-manufacturing",
    company: "Atlas Contract Manufacturing",
    companyKind: "Medical device CDMO",
    industry: "Contract Manufacturing",
    modules: ["DMS", "MES", "QMS"],
    headline: "Atlas CDMO onboards new client programs in weeks, not quarters",
    summary:
      "A medical-device contract manufacturer gave every client program its own workspace on a shared quality spine - turning tech transfer from a project into a routine.",
    size: "540 employees",
    standards: ["ISO 13485", "21 CFR 820", "21 CFR Part 11"],
    about: CO.atlas.about,
    storyHeads: { challenge: "Every client, a separate project", approach: "One workspace per program", result: "Transfer in weeks, audit-ready by default" },
    metrics: [
      { value: "3x", label: "faster tech transfer" },
      { value: "12", label: "programs on one system" },
      { value: "100%", label: "programs audit-ready" },
    ],
    quote: {
      text: "When a client hands us a process, we stand up their controlled documents and their batch record in the same workspace. Onboarding stopped being a project.",
      person: "Nadia Fournier",
      role: "Program Quality Manager, Atlas Contract Manufacturing",
    },
    challenge: [
      "Every new client arrived with their own documents, conventions, and quality expectations.",
      "Standing up a program meant reconciling a client's system with Atlas's own.",
      "Keeping a dozen programs audit-ready meant a dozen ways of working.",
    ],
    approach: [
      "Gave each client program its own workspace on a shared quality backbone.",
      "Stood up controlled documents and batch records together, per program.",
      "Ran every program on one spine so audit-readiness was uniform.",
    ],
    result: [
      "Tech transfer sped up threefold.",
      "Twelve client programs now run on one system without collision.",
      "Every program stays audit-ready without a separate system per client.",
    ],
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);

/* ---------------------------------------------------------------- shared footer */
export const RESOURCE_FOOTER = {
  tagline: "The collaboration backbone for quality-run companies.",
  baseRight: "Built for regulated manufacturing",
  nav: [
    {
      label: "Products",
      links: [
        { label: "QMS", href: "/explorations/products/qms" },
        { label: "DMS", href: "/explorations/products/dms" },
        { label: "MES", href: "/explorations/products/mes" },
        { label: "PLM", href: "/explorations/products/plm" },
      ],
    },
    {
      label: "Resources",
      links: [
        { label: "Customer stories", href: "/explorations/resources/testimonials" },
        { label: "Case studies", href: "/explorations/resources/case-studies" },
        { label: "Blog", href: "/explorations/resources/blog" },
      ],
    },
    {
      label: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Platform", href: "/platform" },
        { label: "Book a demo", href: "#" },
      ],
    },
  ],
};
