# Notion Evidence Dossier: Unifize /home and /platform ICP panel

Compiled 2026-09-24. Read-only pull from Notion. Everything in quotation marks is verbatim Notion text. Each item gives the source row name or ID and its URL. Where something could not be found, the entry says NOT FOUND and lists what was searched.

Source databases used:
- Product Personas (PPS): https://app.notion.com/p/ac2aec57bfbf42f19c569f2ba7f5a20e (collection://640d9b55-...)
- Pain Points: https://app.notion.com/p/066cf87e835a4eedaecf8f8c7c172362 (collection://4a5cf14f-...). Row IDs below are written "PP-n".
- Buyer Personas (IDs shown as PES-n; the task's "BP-n" labels are the same rows): https://app.notion.com/p/2f0860e6b45e80138508ea38c376a6be
- Domains: https://app.notion.com/p/84727ef76d2d406480f701b88599e973
- Site Pages: https://app.notion.com/p/b15d5c2965b0445e9697716072291cc0 ; Website Tasks: https://app.notion.com/p/bee201da52b44c1d849647ce57872d9d
- Website FAQs: https://app.notion.com/p/f77fdc4b18714711b967ff4330e99498 ; Website Customer Videos: https://app.notion.com/p/5a2c0f46a2a64464949f4df6f27027dc

---

## 1. PERSONA PAINS

Structure note: the Pain Points relation is filled in only for PPS-2 (Quality Manager, 40 linked), PPS-5 (Document Controller, 15) and PPS-8 (Engineering Manager, 9). The Pain Points relation on PPS-25, 26, 27 and 28 is empty (null), so for those four personas the pains come from their Description plus the matching Buyer Persona (PES) page. The PES pages were last edited 2026-03-27, except PES-5 (edited 2026-09-23).

### 1.1 PPS-2 Quality Manager (Primary, Active)
URL: https://app.notion.com/352860e6b45e817e81c7caf0eb4f92ba
- Description: "Senior quality professional accountable for the QMS at a site or business unit. Reports to VP Quality or directly to the executive team. Owns the quality strategy, the audit programme, supplier qualification programme, training programme, and management review... Typical caseload at any given moment: dozens of pending decisions across CAPAs, change controls, document approvals, deviations, supplier corrective actions, training overdue alerts, audit findings."
- Daily Activities: empty (null).
- Linked pain points rated High or Critical. Every one has Discovery Source "Session 15 population sweep, 2026-05-17" or a variant of it:
  - PP-1 Status-chasing across CAPA threads (High): "Investigators and quality managers spend daily cycles asking the next owner where a CAPA stands because the record does not surface its own state."
  - PP-2 Evidence not bound to commit points (Critical): "When the audit asks for evidence at the commit point, the operator rebuilds it."
  - PP-3 Disposition decisions live in side channels (High): "The disposition lands in the record but the reasoning, the alternatives considered, and who agreed do not."
  - PP-4 Repeat non-conformance pattern recognition fails (High): "The same defect type closes again three months later with a different CAPA number."
  - PP-5 Audit-day evidence pull collapses to a manual rebuild (Critical; also linked to DC): "The audit passes but the cost of passing is days of senior time per audit cycle."
  - PP-8 Internal audit findings stall at owner assignment (High): "the next audit re-finds it."
  - PP-10 Quality system drift between paper-passable and shop-floor reality (Critical): "The drift is invisible until a serious finding forces it open."
  - PP-11 Production hold disposition stalls on documented rationale (High): "Audit and recall investigations later cannot reconstruct the call."
  - PP-22 Validation runs cannot be reproduced from the record alone (High; also EM)
  - PP-26 Supplier qualification evidence cannot be reconstructed at re-qual time (High)
  - PP-27 SCAR loops close on paperwork without behaviour change at supplier (High)
  - PP-30 Lot genealogy breaks at the supplier handoff during traceability events (Critical)
  - PP-31 Supplier change notifications drop between supplier, sourcing, and quality (High)
  - PP-34 Change impact assessment skips the affected persona set (High; also EM)
  - PP-41 Training matrix is the first audit pull and the last system updated (High)
  - PP-45 Compliance posture answer assembled per question, never queryable (High)
  - PP-49 Submission cross-references chase outdated controlled documents (Critical; also DC)
  - PP-51 Field-action timeline rebuilt from email and meeting notes (Critical)
  - PP-53 Complaint trend signals lost in case-by-case triage (High)
  - PP-55 Recall traceability assembled in spreadsheets under regulator pressure (Critical)
  - PP-60 APR and PQR rebuilt each cycle from cold-start exports (High; also DC): "the act of producing it consumes weeks of senior time."
  - PP-62 Data integrity findings recur each audit cycle (High)
  - PP-63 Sourcing decisions optimise unit price without total quality cost (High)
  - PP-66 Customer-specific requirements not flowed down to operating documents (High; also DC)
- Matching buyer persona PES-3 Quality governance: https://app.notion.com/p/2f0860e6b45e800eac32e781b5931bf6
  - Cares: "Release confidence, audit outcomes, traceability, recurrence reduction"
  - Worries: "Missing evidence, unclear approvals, repeat issues, audit findings, release risk"
  - Deeper worry: "that they are spending 60-70% of their time on coordination busywork... instead of the judgment work they were hired for." (No source is given in Notion for the 60-70% figure.)
  - Needs: "A number they can take to their CFO." "Proof from their industry." "A path that doesn't require rip-and-replace."
  - Evaluates: "Does it work with our existing QMS? (Coexistence, not displacement.)" "Is it validated for our regulatory environment?" "Can I show my CFO a number?"
  - Discovery quotes: "We run Excel trackers alongside the QMS because the QMS can't show us what's happening right now." "Every audit, we spend three weeks just getting the packets together."
  - Objections: "We already have a QMS." / "We don't have budget for another system." / "My team is too busy to implement something new." / "How is this different from [competitor]?"

### 1.2 PPS-25 VP Quality (Primary, Active)
URL: https://app.notion.com/381860e6b45e81d088ceeffea3625735
- Title Variants: "Head of Quality; Director of Quality; Quality Director; Chief Quality Officer; VP Quality and Regulatory"
- Description: "The most senior quality executive... accountable for the entire quality system and its audit-readiness to the executive team and the board... the budget holder who signs for a platform like Unifize. They do not work individual records day to day; they consume roll-ups and approve the consequential decisions. They are the primary economic buyer for the quality value case, and the organisation-level coordination-tax-to-profit-and-loss view is built for them."
- Daily Activities: "Chair management review... Face external auditors and regulators. Review quality and coordination-tax dashboards. Defend the quality budget and headcount to the executive team and the board."
- Pain Points relation: EMPTY. Use PES-3 (1.1) for cares, worries and objections.

### 1.3 PPS-5 Document Controller (Primary, Active)
URL: https://app.notion.com/361860e6b45e81839ea3dd204c736ed2
- Title Variants: "DC, Doc Control Specialist, QA Document Coordinator, QMS Administrator, Records Manager"
- Description: "Owns the controlled document lifecycle... answering 'is this the latest', running audit pulls. Typical caseload 200 to 2000 active controlled documents... Pain is mostly small: a missed periodic review, an out-of-date SOP on the shop floor, a signature loop that stalls for two weeks."
- Daily Activities: "Issue new revisions; chase approvers; verify training was completed against revisions; respond to 'where is the latest copy' questions; pull document trees for audits..."
- Linked pain points (DC-specific):
  - PP-33 Change effectivity not propagated to the production line before parts ship (Critical; also EM): "The first the operator hears about the change is when a finished part is rejected."
  - PP-36 Late training cascade after change closure (High)
  - PP-37 SOP version drift between Notion, file share, and shop floor (Critical): "The 'current' version is a function of where you look."
  - PP-38 Document approval queue invisible until SLA breach (Medium)
  - PP-39 Periodic review of controlled documents stalls without owner accountability (Medium): "Audit finding is predictable."
  - PP-40 Effective-date governance ambiguous at point of use (High)
  - PP-52 Labeling changes propagate inconsistently to packaging and inserts (High)
  - Also linked: PP-5, 47, 49, 50, 60, 61, 66, 68
- Matching buyer persona: NOT FOUND. No Buyer Persona row is a document-control seat (all 18 PES rows checked). The nearest are PES-3 Quality governance and PES-7 Compliance & validation. Domain 4 "Document and Records Control" gives "Primary budget owner: VP Quality / Document Control function."

### 1.4 PPS-8 Engineering Manager (Primary, Active)
URL: https://app.notion.com/361860e6b45e81159243c81508af35cc
- Title Variants: "Director of Engineering, R&D Manager, Engineering Lead, VP Engineering (small co.)"
- Description: "Approves design and change decisions on behalf of the engineering function. Lives in PLM and the QMS change module... Typical caseload 30 to 100 open change orders, 5 to 20 active projects, plus people management."
- Linked pain points: PP-7 risk register "up to date as of the last gate" (Medium), PP-19 APQP gate review evidence rebuilt at each phase (High), PP-21 PPAP submissions assembled from scratch each programme (High), PP-22 (High), PP-23 design change loop "originating record stays open or closes blind" (Medium), PP-25 design review action items "'we covered this in the last review' answered with 'where'" (Medium), PP-33 (Critical), PP-34 (High), PP-35 low-risk changes inherit high-risk approval depth (Medium)
- Matching buyer persona PES-6 Engineering change governance: https://app.notion.com/p/2f0860e6b45e8067bbd7d53351b34483
  - Cares: "Change velocity with control, readiness, cut-in discipline, avoiding mixed revision"
  - Worries: "Uncontrolled changes, long review loops, launch slips, mixed revision execution"
  - "A change order enters the review cycle and bounces between quality, engineering, regulatory, and manufacturing for 3-6 weeks."
  - Needs: "Compatibility with their existing PLM (Unifize complements PLM, doesn't replace it)."
  - Objections: "We have PLM for this." / "Our process is too complex for a standard tool."

### 1.5 PPS-26 COO and VP Operations (Secondary, Active)
URL: https://app.notion.com/381860e6b45e81b9b405dc439ebdce8a
- Title Variants: "Chief Operating Officer; VP Operations; VP Manufacturing; Operations Director; Head of Operations; Plant Director"
- Description: "Quality and coordination problems reach them as operating cost, scrap, downtime, and missed shipments rather than as individual records... they read the organisation-level and domain roll-up dashboards rather than operational tiles."
- Pain Points relation: EMPTY.
- Matching buyer persona PES-20 Operations Leader (Tier Primary, Goal Zero Pass): https://app.notion.com/p/352860e6b45e81a4a549f814521bc11c
  - Cares: "Output, stability, delivery performance, cross-functional execution"
  - Worries: "Missed shipments, schedule instability, firefighting, slow decisions"
  - Description: "Sees Unifize as one of many investments competing for budget and attention... Typical session is short, infrequent, and goal-directed."
  - Goal Zero Justification: "They are the persona who pays for Unifize and the persona who decides whether to expand or churn."
  - Page body is blank. NOT FOUND: objections for this persona.

### 1.6 Closest IT/CIO seat
- Product Personas: NOT FOUND. There is no IT or CIO product persona; all 25 PPS rows were checked. The nearest is PPS-30 Data Governance Lead (Draft, Secondary): https://app.notion.com/398860e6b45e81d19eedc778fbd0ea15. It "Feels coordination tax as analyst-weeks of assembly from systems that do not talk to each other."
- Buyer persona PES-5 IT risk & enablement (edited 2026-09-23): https://app.notion.com/p/2f0860e6b45e80caba83c768074802c3
  - Titles: "CIO, VP IT, IT Director, Enterprise Architect, CISO, Security Director, Head of IT Applications, ERP Director"
  - Cares: "Secure deployment, predictable architecture, controlled integrations, validation posture"
  - Worries: "Shadow IT, validation exposure, integration sprawl, security delays"
  - "They are gatekeepers, not initiators." "Coordination tax may never be mentioned directly."
  - Needs: "Startability without integration... 'Start with no integrations, prove value, add connectors later' is the single most important message for this persona."
  - Evaluation questions: "What's your SOC 2 status?" "Do you have a validation package?" "Can we start without any integrations?" "We don't want anything writing to our ERP without governance."
  - Objections: "We need to validate this before it can be used in our GxP environment." / "We can't add another integration point." / "How do I know this won't become another shadow IT problem?" / "We're not ready for AI in regulated operations."
  - Added 2026-09-23: "The information technology buyer often arrives as two roles in one person or one meeting." This points to PES-17.
- PES-17 Digital transformation & AI governance: https://app.notion.com/325860e6b45e81a8ae8bd64c01c38347
  - Worries: "AI producing unreliable outputs because the underlying decision trace data is undocumented. Regulatory pushback on AI-assisted decisions without an auditable rationale trail."
- PES-16 Regulated systems governance: https://app.notion.com/325860e6b45e81129d0fe9bab69118b1
  - Worries: "21 CFR Part 11 and Annex 11 findings... AI tools deployed on top of undocumented data. Validation burden during system migrations."

### 1.7 PPS-28 CEO (brief)
URL: https://app.notion.com/381860e6b45e81608c54fa4e752fcaff
- Description: "most often the economic buyer in a smaller company... They care about the business outcome of cost, risk, customer trust, and growth, not the mechanics of the quality system."
- PES-10 Leader: https://app.notion.com/p/2f0860e6b45e809fbc4dc5bd81f7be7f
  - Worries: "Brand damage from quality failures, major customer escalations, inability to scale execution, surprises"
  - Evaluates: "Can I explain this to my board in two minutes?"
  - Objections: "This sounds like a quality tool." / "We have bigger priorities." Typical quote: "I don't want another tool. I want an operational advantage."

### 1.8 PPS-27 CFO (brief)
URL: https://app.notion.com/381860e6b45e8156b58fcb1e4e480be7
- Description: "They care that a claimed coordination-tax saving maps to a real profit-and-loss line and survives scrutiny."
- PES-2 Finance governance: https://app.notion.com/p/2f0860e6b45e803d989dc9731b154b09
  - Worries: "Soft savings, inconsistent counting rules, weak attribution, unreconciled data"
  - Typical questions: "Show me the math." "How do I know the savings are real and not just activity metrics?"
  - Objections: "We already track COPQ." / "I need to see ROI before approving."

### 1.9 PES-7 Compliance & validation (context for the IT and quality seats)
URL: https://app.notion.com/p/2f0860e6b45e809aa2aed1893e8daed7
- Worries: "Uncontrolled changes, revalidation triggers, incomplete audit trail, SOP drift"
- "Our biggest risk is not that the work is bad - it's that we can't prove it was done correctly."
- Objections: "We already have a validated QMS." / "Validation will take too long."
- Deal role: "Their approval is often a gate: if the compliance team says the system doesn't meet regulatory requirements, the deal stalls."

---

## 2. PROBLEM STATEMENTS

### 2.1 Coordination tax definition
- Vocabulary Registry row "Coordination tax" (ID 69): https://app.notion.com/p/33f860e6b45e81f8bd6ddeb039499bcc
  - Definition: "The cost of coordinating regulated work across people, systems, and organisational boundaries - and proving afterward that the work was done correctly. Layer 2 in the causal chain: the diagnosis and measurable cost, not the root cause."
  - Customer-Facing Phrasing: "The hidden cost of coordinating regulated work across functions, systems, and organisational boundaries."
- Positioning Strategy v3.11 (2026-09-23, owner Ben Merton): https://app.notion.com/p/32f860e6b45e81e1aeb6dbebaa604562
  - Primary positioning statement: "In regulated processes, cross-functional work runs across siloed teams and fragmented systems. The hidden cost of holding that work together is what we call Coordination Tax. Unifize makes this visible, measurable, and reducible, so that decisions, evidence, and completion stay connected across every team involved."
  - Concept order: "1 Symptoms (entry) -> 2 Coordination tax (naming) -> 3 Systems of record vs. systems of coordination (the gap...) -> 4 Governed interface -> 5 AI acceleration -> 6 Transformation outcome -> 7 Outcome-based pricing". Symptoms come first: "the buyer must first recognise their own reality before they will accept a new conceptual frame."
  - Tagline: "People. Process. AI. Outcomes."
  - Non-negotiable: "'regulated manufacturing'... must never appear in any customer-facing document... website page". Use "regulated processes" sparingly instead.

### 2.2 The gap: where the system of record ends and the work happens
- Positioning Strategy Concept 3: "Systems of record (QMS, ERP, PLM, DMS) capture what is officially true. Systems of coordination (email, meetings, Excel trackers, WhatsApp, Teams, SharePoint) are where the actual cross-functional work happens. The gap between them is the structural root cause of coordination tax."
- Usage rule: "Unifize is NOT a system of coordination. Unifize is the governed layer that captures what happens in the systems of coordination, bridges it to the systems of record."
- Added in v3.10 for AI: "An AI assistant can only read what has a record... gets faster conversation and no faster closure." External phrasing: "'the record' and 'an assistant is only as good as the record it sits on'".
- Story Architecture v1.6 (2026-06-27): https://app.notion.com/p/33e860e6b45e81f09113f5a79891fb96
  - "Layer 1: The root cause (the gap). The structural disconnect between the system of record and the system of coordination. Architectural, not behavioural."
  - Layers 2 to 4: "Coordination tax (the diagnosis and measurable cost)... Second-order effects (operational damage)... P&L damage (strategic impact)."
  - Buyer takeaways: "(1) Unifize coexists with what you already have, (2) Unifize captures the coordination that your existing systems can't see, and (3) the value is measurable outcomes, not features."
  - The internal CT primitives are "never" to appear on the website.
- Canonical Definitions: https://app.notion.com/p/330860e6b45e81dbaa00cfb49804b71b. Not fetched in full. Its search snippet reads: "Coordination tax is what the gap produces."

### 2.3 Domains DB problem statements (14 active)
- Domain 10 Quality (Primary): https://app.notion.com/31d860e6b45e812e8ea6ddb2f1f49bfd
  - "Coordination tax accumulates when deviation management, CAPA execution, MRB disposition, and audit findings require cross-functional evidence assembly without a structured decision trace... lives in email and side channels rather than a durable record... The strongest single entry domain in the Unifize ICP."
- Domain 9 Operations (Primary): https://app.notion.com/31d860e6b45e81498fbef2b20956f764
  - "WIP aging, production holds, schedule instability, and MRB backlog all result from cross-functional coordination without durable decision traces... VP Operations and Plant Manager are underpenetrated personas in current outbound motion."
- Domain 2 Product Development (Primary): https://app.notion.com/31d860e6b45e818ea37febf5f4f4ae08
  - "Decision rationale and gate exit criteria are lost when approvals live in email and design review meetings, leading to stage-gate recycling, delayed launches, and DHF gaps at audit."
- Domain 7 Supplier Management (Primary): https://app.notion.com/31d860e6b45e81cfbc91dacd5d9755dc
  - "Supplier-caused quality events create coordination spirals when precedent, policy context, and decision history are not retrievable."
- Domain 3 Change Control (Secondary): https://app.notion.com/31d860e6b45e816f83a5d5b945352394
  - "design review meetings leave no durable record of what evidence was reviewed, which conditions were accepted, or what changed between revisions."
- Domain 4 Document and Records Control (Secondary): https://app.notion.com/31d860e6b45e81eabe66f39f9cd762be
  - "Audit findings result when documents in active use at sites cannot be tied to an auditable approval record and a controlled distribution log — the version mismatch failure mode... Play coverage: gap — 0 plays currently."
- Domain 15 Compliance (Secondary): https://app.notion.com/327860e6b45e814e9274cab4e707d8e3
  - "Compliance frameworks are often managed as separate governance layers above or beside the QMS, creating parallel coordination tax."
- Domain 11 Post-Market and Recall: https://app.notion.com/31d860e6b45e81d4ae37e1ad4077bdb1
  - "Recall is the single highest-coordination-tax event in regulated manufacturing."
- Taxonomy drift: the Homepage Site Pages row still says "All 15 coordination tax domains". Story Architecture v1.6 corrected the count to "14 named buyer doors".

### 2.4 Value-stream tax figures (hours and $)
- Reference Value Stream VS-2 "Non-Conformance - Detection to CAPA Closure" (Status Draft): https://app.notion.com/p/334860e6b45e81c6aee9e63bb8d38300
  - "Typical: ~1,163 minutes (~19.4 hours)" per record. Low "~459 minutes (~7.7 hours)". High "~3,403 minutes (~56.7 hours)". "NVA steps: 54 (72%)".
  - Unifize without AI is estimated at "40-50% of active coordination time". Total with AI: "57-70%".
  - "At typical volumes of 100-500 NCRs per year and a blended wage rate of $45-65/hour, annual coordination tax reduction is $60,000-$450,000 for this single process type."
  - Caveat inside the page: "the current step rows sum to 983 active minutes at typical... do not cite the 1163 figure and the current step set together without noting the difference."
  - Proof anchor inside the page: "The Prestige case study... 18 hours per week coordinating with different teams, reduced by 42% in 30 days, with 12 hours per week freed up per quality manager."
- Build Specification: Coordination Tax Dashboards and Charts: https://app.notion.com/p/37a860e6b45e812a88dbc9879ccf858e. Seen only in a search snippet, not fetched: "per-record coordination time 1,523 minutes (25.4 hours)", "full cycle median 28.3 days".
- Positioning Strategy claims table:
  - "Coordination tax exists and is measurable | Engine produces credible estimate | Engine build in progress | Engine not yet live; estimates model-based"
  - "Governed interface reduces coordination tax | Measured before/after from Phase 0 | Architecture defined; no measurement data | **Most critical gap**"
- Risk ERR-195 (Severity Critical, Stage Assessed): https://app.notion.com/p/3e4860e6b45e819e9799ef48253fef97
  - "The coordination tax and return-on-investment figures shown to the customer rest on no baseline." Raj Patel is quoted: "We haven't developed any baseline", "We don't know what we're doing", "But we're very convincing that we do."
  - Re-checked 22 Sep: "no closure evidence found."
  - Relevance: CFO and VP Quality panelists would likely probe any $ or hours figure on the site.

### 2.5 Intelligence Posture (PLT-8, v1.2, owner Ben Merton; Status property says "Not started")
URL: https://app.notion.com/p/320860e6b45e8180a4e3dfe2565d9c80
- "AI accelerates work, but does not become the authority." "AI outputs are proposals, not decisions." "Every AI-assisted action must be traceable: input → output → human acceptance → resulting change."
- "AI belongs inside the thread, not outside it... AI should not act as a detached assistant operating on partial context."
- Four autonomy levels, A (Propose only) to D (Advanced automation). "Default posture should start at Level A."
- "Cross-thread intelligence... cannot operate before the platform has a sufficient corpus of structured decision traces."
- The Positioning Strategy claims table records "AI acceleration compounds | ... | Intelligence Posture defined; Level A".
- Homepage §8 copy direction (23 Sep, Brief v0.9): "Say 'the record'; do not say 'knowledge base' or 'company brain'."
- Conflict for the panel: the local Sep 9 memory has Lakshman asking for "company brain" framing. Notion (CHG-1360, 23 Sep) now keeps "Company brain" internal-only. See 3.3.

---

## 3. EXISTING ISSUES: HOME AND PLATFORM

### 3.1 Site Pages rows
- SIT-11 Homepage: https://app.notion.com/p/32c860e6b45e8127914cfe808ddc9241
  - Status "In Design", Build Stage "In design", Priority "P1 - Launch Blocker", Phase 1/2/3 Ready all NO, Target Date 2026-07-29 (passed). Last edited 2026-09-23.
  - "Not yet rebuilt. The current live site uses the old product-category IA (QMS, DMS, PLM, MES)."
  - Phase 1 draft hero headline (v0.1, "Not reviewed"): "Regulated manufacturing doesn't fail because people don't care. It fails at the seams." Its constraint: "Must resonate with VP Quality at Class II medical device company."
  - Section 7 Proof: "Not started. Blocked on testimonial audit." Constraint: "HARD - Advocacy level only. Med Device customers only. No generic quotes."
  - Section 8 AI Implication (updated 23 Sep 2026, Brief v0.9): "A full beat written for the digital buyer... an assistant can only read what has a record... never disparage it, never name a licence price, never compare models."
  - Open questions: "(23 Sep 2026) Hero Option B is the first candidate for the A/B register per Brief v0.9." "Copy owner not assigned. Ben owns direction but copywriting needs an owner."
  - Open Decisions relation: EMPTY. Comments on the page, including resolved and block-level: NONE.
- SIT-60 Platform: https://app.notion.com/p/38e860e6b45e8170a642e1506b5516ac
  - Status "Not Started", Page Type "Utility Page", Target 2026-07-26. "This page is blank and has no content." Open Decisions EMPTY. Comments NONE.
  - Result: Notion has no copy direction, review hub or recorded decisions for /platform.

### 3.2 Website Tasks that are open or relevant
- WT-52 (Open, Dependency, needed 2026-10-07) "Add the Why it looks familiar section to the QMS page and check its closure-time claim against the proof rule": https://app.notion.com/3e4860e6b45e8170a4e4cf8abe6cea9b
  - "The same page carries a 75 percent faster closure claim attributed to a customer; Medical Devices is at Advocacy, where a metric claim is allowed only with the customer's explicit approval of the specific number."
- WT-53 (Open, needed 2026-10-14) "Write the Quality domain page as the second page after the homepage": https://app.notion.com/3e4860e6b45e81bf97d3d79ecfe803eb
- WT-41 (Open, needed 2026-07-20, overdue) "Create Claims/Stats DB": https://app.notion.com/3a3860e6b45e81c9869ccb969e30bef1
  - "Every number on the site needs a source. The problem-section stat ('up to a third of their week') currently has none."
- WT-51 (Open) "Product Flows for QMS, PLM, MES"
- No task has Type Decision or Risk against Home or Platform.

### 3.3 Change request CHG-1360 (Done, 2026-09-23, approved by Ben)
URL: https://app.notion.com/p/3e4860e6b45e8175a53dcc578fa198a2
- "Add the record first argument and the digital buyer to the positioning and website briefs."
- Trigger: a prospect's digital lead said "we don't have enough consistent data to use LLMs". He also said the platform was "very similar to other platforms I've used", which the change request calls "the failure mode the same positioning has to prevent."
- Changes: Brief v0.9 promotes homepage §8 to a full beat and makes "Hero copy: Option B (the AI provocation)... the option to test first." Positioning Strategy v3.11.
- "Remaining: homepage copy to apply the promoted AI beat when drafted".

### 3.4 Raj review, 2 September, and the go-live threshold
Source: ACT-2555 (Status Done, due 2026-09-07): https://app.notion.com/p/3d3860e6b45e8106b65adc8f65322e68. From the 3 Sep Sales & Solutions Retro.
- Faults Raj named:
  - "the same content repeating across pages ('if I scroll through two pages of the website I feel like I'm looking at the same thing')"
  - "bad design elements and containers that do not work"
  - "a responsiveness problem, links that go nowhere, pages that were never built"
  - "an About Us page listing every employee"
  - "a homepage that reads like a competitor's ('It makes us sound like slack')"
- Raj: "we can't go live because these are, like, basic problems... it will harm us if we go live." Ben: "I will defer to your judgment on this."
- Open item: "The open question the room did not answer is what the homepage should say... Neither carries a date."
- NOT FOUND: the written re-review outcome of 7 Sep that the item's "Done when" requires.

### 3.5 Sep 9 Website Sync and the Sep 16 independent reviews
- Sep 9 Website Sync: Capacity Allocation rows exist, e.g. https://app.notion.com/3d4860e6b45e8112a982ceecb329dec8, status Complete. Outcome and Notes are empty. No Notion meeting page with the rulings was found. The rulings exist only in local memory (sep-9-review-call-decisions.md, Fireflies 01M1GWBQQW6Q7052D7CAFCQ6Q0), not in Notion.
- Sep 16 independent reviews by Raj and Lakshman: NOT FOUND in Notion. No Review Log for Home or Platform exists. The only Review Log found is the archived DMS Review Log. The capacity log shows that Raj's review time slipped repeatedly:
  - Sep 10 "Website copy review" was "Unable to Attend": https://app.notion.com/3d5860e6b45e81c497eff3c884f3d2a4
  - Sep 11, 14 and 15: "website time still owed"
  - Sep 21 "Website copy and positioning review, platform and product pages": "did not run on 21 September... Website review has now rolled on 11, 14, 15 and 21 September." https://app.notion.com/3d5860e6b45e81489095f3fd18c74b00
  - Sep 22 "Website review": "Final block of the sprint did not run... Website carries into Sprint 10." https://app.notion.com/3d5860e6b45e81e393ebd8d3812b1c90
  - Sep 15 "Arcades - Build Loom videos for website": "Configuration closed out ahead of Lakshman's review." No Lakshman review record was found.
- Searches run: "homepage review Raj Lakshman September", "platform page review feedback", "Website Sync", "Review Log homepage platform reviewer verdict" (inside Website 3.0), "Lakshman website homepage feedback solutions industries functions taxonomy" (created Sep 8 to 24).

### 3.6 Earlier recorded gaps
- T3B3 July 2026: https://app.notion.com/p/3b1860e6b45e801fa23ee991829a289a
  - "The website, the landing point for all inbound, is still not good enough to go live... not live until 31 August, which might potentially get pushed out by another 1 to 2 months."
- Homepage A/B Tests: "Homepage Hero Headline - Problem Framing" and "Homepage CTA - Engine vs Demo (Phase 2)" (March 2026). Both under Website 3.0 / A/B Tests. Not fetched.

---

## 4. SALES AND BUYER OBJECTIONS

### 4.1 Real deal evidence (T3B3 July 2026)
URL: https://app.notion.com/p/3b1860e6b45e801fa23ee991829a289a
- "The coordination tax pitch stalled the Beaufort deal rather than moving it forward. The business case sized the customer's problem but never answered the two questions the deal turns on - how the coordination cost is reduced, and how Unifize is better than the competition."
- "We haven't asked some basic qualification questions here because we got too jumpy about coordination tax and value stream mapping."
- "Outcome-based pricing was discussed and deprecated over 2-3 weeks, and then we found the champion had been left believing we billed against key performance indicators."
- "4 deals closed-lost in July... 'We do not have enough touch points.'"
- JLL: "would not proceed with our DMS solution due to platform gaps and usability issues."
- "Unaccounted churn - Nectero and PhoMedics"

### 4.2 Canonical objection scripts (Positioning Strategy v3.11 §4)
- "How to answer 'we already have something for this'": "This is the most common first objection regardless of which system the prospect references." There are per-system scripts for "We already have MasterControl/ETQ/Qualio", "We're an SAP shop", "We use Windchill/Arena", "We're a Microsoft shop" and "We don't have a system for [X]".
- "How to answer 'this looks like the other systems I have used' (added v3.10)": "It should look familiar. A record has to look like a record... None of them stored the argument that produced the form."
- Per-persona objections are listed in section 1: PES-2, 3, 5, 6, 7 and 10.

### 4.3 Competitive frames (Positioning Strategy §4)
- Frame 1, legacy ("MasterControl, QPulse, TrackWise, Veeva, Infor, Epicor, SAP, Plex, Oracle, ETQ, Arena"): "Traditional QMS captures what happened. Unifize captures how it happened." It anticipates that "'we have AI too' will be table stakes in every legacy evaluation."
- Frame 2, point solutions ("Qualio, Greenlight Guru, ComplianceQuest..."): "Point solutions solve one process well. Coordination tax accumulates in the spaces between processes."
- Frame 3, horizontal tools ("Teams, SharePoint... Smartsheet"): "complementary, not competitive". Unifize has a Microsoft partnership.
- Frame 4, status quo (the "primary frame"): "Your Excel trackers are not the problem. They are the symptom."
- Frame 5, the assistant the customer already owns ("Copilot, ChatGPT Enterprise, Claude, Gemini"): "Your assistant is fine. It has nothing consistent to read."
- Battlecard rows: MasterControl weakness is "Rigid, siloed, heavy customisation; fragmented collaboration". Veeva weakness is "Legacy-style silos; external tools for collaboration; rule-based automation".
- Discovery evidence: NeuroPace (Jul 2026) notes "ETQ replacement candidates commonly include Greenlight Guru, MasterControl, and Veeva" (https://app.notion.com/p/3a3860e6b45e81acbef4c232047d9d33). TotalEnergies (Apr 2026) was "actively evaluating 'several solutions'" (https://app.notion.com/p/351860e6b45e81b893f5e3f1a829326b). Neither page was fetched in full.

### 4.4 Coexistence, migration and proof requirements (Positioning Strategy)
- "No rip-and-replace required." "No integration required to start." "Integration is earned, not assumed." "90 days to prove value."
- Proof gate: "Hypothesis (now): ... Say 'we estimate' - not 'we deliver.' Do not claim measured reduction."
- Claims rules: "Company-wide ROI | No | Do not extrapolate from a single lane".

### 4.5 Website FAQs DB (36 rows; 32 Live)
The Source field on nearly all rows reads "unifize.com live site · Webflow FAQs collection export". These are legacy answers, and several conflict with the current positioning:
- Migration, FAQ 16 "How do I get my historical data into the system?": "CSV Importer... Data migration services".
- Validation and security:
  - FAQ 24: "Unifize offers best-in-class security features that will pass the most stringent security reviews."
  - FAQ 6 (HIPAA, ITAR, NIST, CMMC, 21 CFR Part 11, SOC 2): "These specific compliances can be opted for at an additional time and cost." A SOC 2 status is not stated anywhere.
  - FAQ 32 (Draft): "We offer support for 21 CFR Part 11, ISO 13485, GAMP5".
- Integration and IT:
  - FAQ 14: "Most custom integrations take 2-3 business months".
  - FAQ 13: "Integrations are not included in the implementation cost".
  - FAQ 26: "Custom integrations require collaboration between Unifize's team and your IT department".
- Pricing:
  - FAQ 9: "Our starter package starts at $1,000 per month."
  - FAQ 34 (Draft, CMMS): "Starting at $12K annually including 10 Full Users."
  - FAQ 2: "paid in advance annually".
  - FAQ 10 (justify cost): "On the demo call, we'll walk you through a detailed ROI justification."
- Claims:
  - FAQ 22: "get you up and running in less than 8 hours of your time (1 day)".
  - FAQ 19: "We typically get your team up and running within a day."
  - FAQ 20: onboarding "Typically takes 30–90 days".
  - FAQ 5: "We have not had anyone stop using Unifize once started". T3B3 contradicts this with "Unaccounted churn - Nectero and PhoMedics".
  - FAQ 29: "We are the only software tool that helps quality management teams build a culture of continuous improvement".
  - FAQ 28: "The quickest and simplest of all QMS". This conflicts with the Product Subordination Principle and the coordination-tax positioning.
- Data ownership, FAQ 35: "You do. Always and forever. Period."

---

## 5. PROOF INVENTORY

### 5.1 Website Customer Videos DB
- Counts: 233 rows are Web Use Approved and Live; 3 are Draft and not approved.
- Named companies in approved rows: Biovation Labs (Jesse Kolstad, Director of Quality), The Will-Burt Company (Tedd Carr, Director of Quality Control), Applechem (Wilson Lin), Harmonic Bionics (Clarissa Archer, Michael Hogan, Denis Machoka "VP of Quality"). Adaptive Health (Mikala Hukka, Erica Bennerman) and Efco (Dave Anderson, Seth Bozman, Carol Wilson) appear in titles only; their Company field is empty ("confirm before web use").
- Industries: Nutritional Supplements, Medical Devices, Cosmetics, Construction, Manufacturing. No pharma or aerospace customer video is approved.
- Attestable quantitative claims (video titles, all Web Use Approved):
  - #71 Tedd Carr, Will-Burt: "How Unifize improved our Non-conformances closure time by 75% within the first month". #123 repeats it: "boosted issue closure time by 75% within the first month". This is Manufacturing, not Med Device. WT-52 flags a 75 percent claim on the QMS page for proof-rule checking.
  - #77 Jesse Kolstad, Biovation: "How I reduced Mock Recall time down to 18 minutes with Unifize"
  - #67 Biovation: "How Unifize helped reduce $60,000 of material cost on just one product"
  - #138 Dave Anderson: "How did Dave improve efficiency and save $44,000 by not filling a position"
  - #70 Dave Anderson: "How smaller groups lead to 70% faster actions"
  - #101 Mikala Hukka: "Speeding up finished good lot process from half a day to 10 minutes"
  - #7 Applechem: "Accelerating product development by upto 30% with Unifize"
  - #35 Will-Burt: "Doing 95% internal audits remotely with Unifize"
  - #166 Harmonic Bionics: "Implementing a collaborative eQMS in 4 weeks". #85 (no customer named): "How I got my MedTech company to comply with FDA Part 820 in 4 weeks"
  - #194 Dave Anderson: "Under 24h response times from Unifize Customer Support"
- Displacement proof:
  - #216 "Why Biovation moved from MasterControl to Unifize"
  - #223 "What made us switch from MasterControl to Unifize" (Mikala Hukka)
  - #118 "Moving from MasterControl to Unifize" (Erica Bennerman)
  - #37 "Experience with UniPoint"
  - #41 "Comparing Unifize vs QT9"
  - #31 "Comparing Unifize to other eQMS software" (Harmonic Bionics)

### 5.2 Other proof and its limits
- The Prestige case study is cited only inside VS-2: "42% cycle time reduction in 30 days, 12 hours/week freed per quality manager". No Web Use Approved Prestige video was found.
- Proof maturity:
  - Site Pages Medical Devices: "Proof Maturity of any Active industry (Advocacy)"
  - WT-52: "Medical Devices is at Advocacy, where a metric claim is allowed only with the customer's explicit approval of the specific number."
  - Positioning Strategy: "Governed interface reduces coordination tax... no measurement data | Most critical gap".
- Claims/Stats DB: NOT FOUND. It has not been built (WT-41 is Open).
- Customer logo currency: Harmonic Bionics has 10+ Web Use Approved videos. Local memory (not Notion) says the Sep 9 call asked to remove Harmonic's logo as "no longer customers". Notion does not record this. The only churn record found is T3B3's "Nectero and PhoMedics".

---

## GAPS AND NOT FOUND (summary)
1. Sep 16 2026 independent reviews by Raj and Lakshman of /home and /platform: NOT FOUND. Raj's review slots rolled on Sep 10, 11, 14, 15, 21 and 22.
2. Sep 9 Website Sync rulings: not in Notion (capacity rows are empty). They exist only in the local memory and Fireflies.
3. Platform Site Pages row: blank, with no decisions, comments or review hub.
4. Homepage and Platform page comments: none, including resolved and block-level.
5. There is no Product Persona for IT/CIO. PES-5 and PES-17 are used instead. There is no Buyer Persona for the Document Controller.
6. The Pain Points relation is empty for VP Quality, COO, CFO and CEO.
7. The Claims/Stats DB is not built. The CT figures have no baseline (ERR-195, Critical).
8. There is no structured lost-deal-reasons dataset. The Q1 2026 Quarterly Sales Review and the Closed Lost stage page were found but not fetched.
9. The Canonical Definitions and the Dashboards Build Spec were seen only through search snippets.
