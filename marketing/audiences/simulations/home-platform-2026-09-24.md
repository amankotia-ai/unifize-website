# Synthesis: /home + /platform six-seat ICP panel, 2026-09-24

**SYNTHETIC OUTPUT.** Every score and quote below comes from model-generated reactions (six isolated reactors, files in `reactions/`). This synthesis agent wrote none of them. Verbatims are synthetic and must never be presented as real buyer quotes. Directional signal, not proof.

**Decision informed:** before the end-Sep V1 launch, do /home and /platform address the ICP's Notion-recorded concerns, how willing is each seat to book a demo, and what should change first to raise demo willingness?

**Stimulus:** `home-text.txt`, `platform-text.txt` and 1440px scroll frames (`frames/home-00..13`, `frames/platform-00..15`). Text plus stills only: no interaction, hidden "See more solutions" cards and collapsed FAQ answers (all but the first) were not visible to reactors.

**Persona ids used below:** QM = quality-manager-site, VPQ = vp-quality-medical-devices, DC = document-controller-pharma, EM = engineering-manager-npd, COO = coo-vp-operations-pharma-cdmo, CIO = cio-regulated-manufacturer.

---

## 1. Headline verdict

Both pages now name real Notion-recorded pains for the quality-side seats. The platform page also answers the coexistence question directly (5/6 credit it). Neither page converts, though. No reactor chose book-demo as the next action (0/6), and mean demo willingness is 4.5/10. Only QM and VPQ reach the "book if one named condition is met" band (6). The conditions are mostly factual (validation posture, proof from the reader's own column, a single coexist-or-replace answer that the proof reel does not contradict), plus a platform walkthrough offer that names only quality artifacts. **Confidence: medium.** The reactor signal converges and traces to Notion, but the personas are drafts, there is no calibration history, and there is no economic-buyer seat.

---

## 2. Scoreboard

| Persona | Home resonance (0-3) | Platform resonance (0-3) | Demo willingness (0-10) | Next action | First click (home) | The one thing that would make it a yes (reactor's own words, condensed) |
|---|---|---|---|---|---|---|
| QM | 2 | 2 | 6 | explore-solution-pages | "Explore solution" (CAPA card) | Walkthrough runs one of MY overdue CAPAs alongside the eQMS we keep (no rip-and-replace) and shows the automatic chasing |
| VPQ | 2 | 2 | 6 | delegate-down | "Medical Devices" | Written validation + Part 11 posture (package, who owns IQ/OQ/PQ, duration) plus one Class II device reference I can call |
| DC | 2 | 1 | 4 | explore-product-pages | "Document management" | Walkthrough explicitly runs one of my SOP revisions end to end (routing, Part 11 approval, effective date, auto retraining, superseded copy withdrawn) |
| EM | 2 | 2 | 5 | explore-solution-pages | "Product Development" | End-to-end ECO walkthrough with our PLM in the loop, engineering configures its own route, decision trail lands in the DHF |
| COO | 1 | 2 | 3 | share-internally | "Operations" | One held batch going hold to released, with a real customer's hold-to-release time before and after |
| CIO | 1 | 2 | 3 | delegate-down | "Platform" | Architecture + validation session: validation package, SSO, write-back approval model, confirmed zero-integration start |
| **Mean** | **1.67** | **1.83** | **4.5** | book-demo 0/6 | 6 distinct doors | |

Reactor self-confidence: high for QM, VPQ and EM, medium for DC, COO and CIO.

Distribution: demo willingness 6 (QM, VPQ), 4-5 (DC, EM), 2-3 (COO, CIO). Forwarding direction: VPQ delegates down to their QM; CIO's nextAction is delegate-down but the forward goes back to the VP Quality and sideways to the architect and CSV lead; COO forwards sideways to the VP Quality, DC forwards the DMS page to the QM, and EM goes back to Quality with "no objection in principle" (EM, CIO, COO reactions).

**Delta vs Sep 1** (`home-page-2026-09-01.md`, `platform-page-2026-09-01.md`). Sep 1 had resonance 2 for every seat on both pages and 0/6 demo intent. The 0-10 demo scale is new, so only a qualitative comparison is possible:
- **Still 0/6 book-demo.** But 2/6 now name a single condition that would get them to book (QM, VPQ). Sep 1 had no graded intent at all.
- **Resonance dispersed.** Home fell to 1 for COO and CIO (quality-department framing). The platform page lifted both back to 2 and dropped DC to 1. Different stimulus and different reactor runs, so this is directional only.
- **Shipped fixes that landed.** The DMS retraining line ("A revision going effective assigns the retraining itself") is now DC's key sentence (DC concern PP-36, home "addressed"). The coexistence section recommended on Sep 1 is now CIO's peak ("the picture I came looking for").
- **Persisting from Sep 1:**
  - Layer-vs-suite. The Sep 1 top objection is still raised by 4/6. Platform copy now states coexistence plainly, but the same home suite line cited on Sep 1 ("One platform. Four governed records.") is still cited, and proof-reel captions ("Moved off MasterControl"; "engineering system of record", already flagged by CIO on Sep 1) now add to it.
  - Macro stat band skipped. Sep 1: 6/6. Now: 6/6.
  - Compliance reads as tiles, not posture (VPQ, CIO both runs).
  - No proof in the reader's own column (4/6 both runs).
  - The coordination-tax band is where attention drops (Sep 1 4/6 on home, now 5/6).

---

## 3. Concern-coverage matrix

The six reactors produced 48 concernCoverage rows (8 each). Overall: **home 4 addressed / 34 partial / 10 absent. Platform 8 addressed / 32 partial / 8 absent.** Themes are grouped below. Counts are per row (A = addressed, P = partial, X = absent).

| # | Theme | Rows (persona: home/platform) | Personas | Home A/P/X | Platform A/P/X | Notion source |
|---|---|---|---|---|---|---|
| T1 | Status chasing / approval queue visibility | QM PP-1 (P/P); DC PP-38 (P/P) | QM, DC | 0/2/0 | 0/2/0 | PP-1, PP-38 |
| T2 | Audit evidence rebuild / evidence at commit point | QM PP-2 (P/A); QM PP-5 (P/P); VPQ audit packets (P/P) | QM, VPQ | 0/3/0 | 1/2/0 | PP-2, PP-5, PES-3 discovery quote, PES-7 |
| T3 | Coexistence vs replace (eQMS, PLM, ERP/MES) | QM (P/P); VPQ (P/A); EM PLM (P/A); COO ERP/MES (P/A) | QM, VPQ, EM, COO | 0/4/0 | 3/1/0 | PES-3 Needs/Evaluates/Objections, PES-6 Needs/Objections, persona files |
| T4 | Validation / Part 11 / SOC 2 | VPQ validation (P/P); CIO validation package (X/P); CIO SOC 2 (X/A) | VPQ, CIO (DC raises it as objection #3) | 0/1/2 | 1/2/0 | PES-3 Evaluates, PES-5, PES-7 |
| T5 | Migration / implementation effort | QM who configures and migrates (P/P); VPQ too busy / budget (P/P) | QM, VPQ | 0/2/0 | 0/2/0 | PES-3 Objections, persona files |
| T6 | IT posture: zero-integration start, write-back governance, shadow IT, integration first-class | CIO start with no integrations (X/P); ERP write-back (P/P); shadow IT (X/X); data silo / APIs / SSO (P/P) | CIO | 0/2/2 | 0/3/1 | PES-5 (Needs, Evaluation questions, Objections) |
| T7 | Proof from my industry | VPQ (P/P) | VPQ as a row. DC, EM and COO raise it in objections/missing (see §6) | 0/1/0 | 0/1/0 | PES-3 Needs |
| T8 | ROI / CFO number / "numbers aren't mine" | VPQ CFO number (P/P); COO operating cost (X/P); COO vendor numbers (P/P) | VPQ, COO | 0/2/1 | 0/3/0 | PES-3 Needs, PPS-26 Description, persona file |
| T9 | Document lifecycle: version drift, point-of-use effective date, periodic review, labeling | DC PP-37 (A/P); PP-40 (P/X); PP-39 (P/X); PP-52 (P/X) | DC | 1/3/0 | 0/1/3 | PP-37, PP-40, PP-39, PP-52 |
| T10 | Change governance and effectivity (review loop, design change loop, cut-in, risk-tiered routing, effectivity to line) | EM 3-6 week bounce (A/A); PP-23 (P/P); mixed revision (P/P); PP-35 (X/P); DC PP-33 (P/P) | EM, DC | 1/3/1 | 1/4/0 | PES-6, PP-23, PP-35, PP-33 |
| T11 | Training tied to revision/change | QM PP-41 (P/P); DC PP-36 (A/P) | QM, DC | 1/1/0 | 0/2/0 | PP-41, PP-36 |
| T12 | Product development: design review, DHF, APQP/PPAP, risk register | EM PP-25 (P/P); PP-19/21/7 (P/X) | EM | 0/2/0 | 0/1/1 | PP-25, PP-19, PP-21, PP-7 |
| T13 | Ops holds, escalations, missed shipments | COO worries (P/P); holds (P/A); escalations late (P/P) | COO | 0/3/0 | 1/2/0 | PES-20 Worries, persona file (PPS-26 Pain Points relation empty) |
| T14 | Live visibility / roll-up dashboards | VPQ Excel trackers (A/A); COO roll-ups (P/P) | VPQ, COO | 1/1/0 | 1/1/0 | PES-3 discovery quote, PPS-26 Description |
| T15 | "Is this for my function?" (quality's tool / DMS afterthought / engineering as approval checkbox) | DC (P/X); EM (P/P); COO (X/P) | DC, EM, COO | 0/2/1 | 0/2/1 | persona files; cf. PES-10 "This sounds like a quality tool" (CEO, not on panel) |
| T16 | AI governance and Copilot | CIO AI rationale trail (P/P); CIO Copilot context (X/X) | CIO | 0/1/1 | 0/1/1 | PES-17 Worries, PES-5 Objections, persona file |
| T17 | Repeat NC / recurrence | QM PP-4 (P/X) | QM | 0/1/0 | 0/0/1 | PP-4 |
| T18 | Another inbox / another place to check | QM (X/P) | QM | 0/0/1 | 0/1/0 | persona file |
| T19 | Differentiation vs competitor | VPQ (X/P) | VPQ | 0/0/1 | 0/1/0 | PES-3 Objections; dossier §4.3 |

Re-count check: the row totals per theme are 2+3+4+3+2+4+1+3+4+5+2+2+3+2+3+2+1+1+1 = 48.

**Well addressed (per the panel):**
- **Addressed on both pages:**
  - PES-6 "A change order ... bounces between quality, engineering, regulatory, and manufacturing for 3-6 weeks" (EM).
  - PES-3 "We run Excel trackers alongside the QMS because the QMS can't show us what's happening right now" (VPQ).
- **Addressed on home:**
  - PP-37 SOP version drift: the "Three copies of one SOP claim to be current" card (DC).
  - PP-36 training cascade: the DMS tile line (DC).
- **Addressed on platform:**
  - PP-2 evidence bound to commit points (QM).
  - Coexistence for VPQ, EM and COO. EM called the FAQ answer "what I needed before I would engage at all".
  - COO's held-WIP pain, via the Stalled Production card.
  - SOC 2 (CIO).

**Absent on both pages:**
- PES-5 "How do I know this won't become another shadow IT problem?" (CIO). Both pages lean the other way ("Configured in house, no IT tickets", "configured by quality, not coded by IT").
- The Copilot / cross-system context trigger (CIO persona file; dossier §4.3 Frame 5 "Your assistant is fine. It has nothing consistent to read").

**Absent from the platform page and only partial on home:**
- PP-39 periodic review, PP-40 point-of-use effectivity, PP-52 labeling (all DC).
- PP-4 recurrence (QM).
- PP-19/21/7 APQP/PPAP/risk register (EM).
- DC's "module is an afterthought" objection.

**Absent from home and only partial on platform:**
- PES-5 "Start with no integrations", which PES-5 calls "the single most important message for this persona".
- PES-5 validation package.
- QM's "another place to check" objection (persona file).
- PP-35 risk-tiered routing.
- COO's operating-cost framing and "why is this my meeting".
- PES-3 "How is this different from [competitor]?"

**Not assessed.** Several Notion pains in the QM slice were not listed by the QM reactor, so the panel gives no verdict on them. These include PP-3 disposition reasoning in side channels, PP-8, PP-10, PP-11, PP-45 and PP-55 (dossier §1.1). Treat them as untested, not as covered.

---

## 4. Problem-statement fidelity (pages vs Notion §2)

**Where the pages follow the canonical statements**

- **Gap as root cause (Story Architecture Layer 1, Positioning Concept 3, dossier §2.2).**
  - Platform: "THE GAP / Your system of record is detached from where the work happens. Follow one quality defect. Today it crosses six tools. On Unifize it stays on one record." (`platform-text.txt` lines 93-96).
  - Home hero: "Unifize closes the gap between your systems and your teams".
  - This is a faithful rendering. QM ((synthetic) "the most convincing thing I saw") and COO ((synthetic) "the most convincing mechanism") peaked on it.
- **Governed layer, not a system of coordination (§2.2 usage rule).**
  - The coexistence diagram labels Unifize "THE GOVERNED LAYER BETWEEN", with "Everyday tools KEEP BEING USED" and "Systems of record STAY AUTHORITATIVE".
  - The home footer reads "The governed interface for cross-functional work."
- **Story Architecture takeaway (1), "Unifize coexists with what you already have".**
  - Platform "COEXISTENCE / Your systems stay." plus the open FAQ answer "No. Your systems of record stay authoritative ... nothing is ripped out".
  - Home "alongside the systems you already trust".
  - Credited by 5/6 (QM, VPQ, EM, COO, CIO).
- **Positioning primary statement (§2.1) "visible, measurable, and reducible".** The platform hero subline is "Unifize makes that work visible, measurable, and faster."
- **Tagline (§2.1).** The home footer reads "People · Process · AI · Outcomes".
- **Coordination tax definition (§2.1).** Home: "The chasing, the waiting, and the rebuilding of context around it is the coordination tax". Platform: "the work your systems never see". Both are consistent with the Vocabulary Registry phrasing.
- **"regulated manufacturing" ban (§2.1 non-negotiable).** Neither text file contains the phrase (grep verified). Both pages use "Regulated work" / "your regulated world".
- **Intelligence Posture (§2.5) "AI outputs are proposals, not decisions".** Platform: "AI that does the coordination work. Your people keep the decisions." The home hero change-order tab shows "Suggested by AI, added by a person" (verified in frame home-00; not in the text dump). CIO credited both as (synthetic) "the right attributable pattern".
- **Outcome-based pricing (Concept 7).** Absent from both pages. That is consistent with T3B3's note that it was "discussed and deprecated" (dossier §4.1).
- **Domains (§2.3).** Home symptom cards map onto Domain problem statements:
  - "Three copies of one SOP" is Domain 4's "version mismatch failure mode".
  - "The design history is assembled after the fact" is Domain 2's "DHF gaps at audit".
  - "WIP ages while dispositions wait in inboxes" is Domain 9's "WIP aging, production holds".
  - "The change gets approved. Nobody can replay why." is Domain 3.
  - The platform recall card matches Domain 11 "Recall is the single highest-coordination-tax event".

**Where the pages diverge**

1. **Concept order (Positioning v3.11 §2.1: Symptoms, then coordination tax, then the gap, then governed interface, then AI, then outcomes).**
   - **Home** puts symptoms and naming in one band: the symptom cards sit under "THE COORDINATION TAX / Why regulated work slows down". But the gap is named in the hero subline, before any symptom.
   - **Platform** opens on naming, not symptoms: the hero is followed by "THE COORDINATION TAX". It then jumps to second-order and P&L damage ("What the tax turns into", Story Architecture Layers 3-4) before the root cause ("THE GAP", Layer 1). After that come the stack, coexistence (governed interface) and AI.
   - The Positioning note that "the buyer must first recognise their own reality before they will accept a new conceptual frame" is the risk. 5/6 reactors' home attention dropped at the coordination-tax band or the 54-of-75 grid (VPQ, DC, EM, COO, CIO). QM is the exception: they peaked on the CAPA tax card.
2. **Value-stream figures vs VS-2 Draft caveat and ERR-195 (dossier §2.4).**
   - **Where they match.** Platform: "54 of 75 steps ... About 19 hours of it per record." (lines 35-37). This matches VS-2's "NVA steps: 54 (72%)" and "Typical ~19.4 hours".
   - **The caveat it breaks.** VS-2 is Status Draft and warns: "do not cite the 1163 figure and the current step set together without noting the difference". The platform sentence cites both together, with no note.
   - **No baseline.** ERR-195 (Critical) says the figures "rest on no baseline", re-checked 22 Sep with "no closure evidence found".
   - **"We estimate" gate.** The Positioning proof gate says "Say 'we estimate' - not 'we deliver.'" Both pages state the figures as fact. The only hedge is the "≈" sign.
   - **Labelled as the reader's own.** Platform labels the grid "ONE OF YOUR NON-CONFORMANCES". COO called that an overstep (synthetic reaction).
   - **Figures with no dossier source.** Home also states "≈30 hrs ... per change order", "≈14 hrs ... per supplier quality issue" and "40 min to pull one controlled document". The dossier contains no value-stream source for these (WT-41: "Every number on the site needs a source").
   - **Panel.** QM ((synthetic) "Unifize's number, not mine"), VPQ ((synthetic) "has no source, so I can't use it upstairs") and COO independently discounted them.
3. **Macro figures framed as the reader's own (WT-41; Positioning proof gate).**
   - Platform: "30% of your R&D spend leaks into duplication and rework", "$10M ... single recall", "$1.5T lost annually to stalled production". Each carries a source line (EC/HBR, Sedgwick, ISM), but "your" frames an industry figure as the reader's.
   - All 6 reactors discounted or dropped attention at this band: QM, VPQ, DC ((synthetic) "strategy-deck language"), EM, COO ((synthetic) "not mine"), CIO ((synthetic) "analyst-deck macro numbers").
4. **"Company brain" (§2.5, §3.3 CHG-1360).**
   - Platform has an AI tab labelled "One brain for the whole company" (`platform-text.txt` line 512).
   - The Homepage §8 direction (Brief v0.9) says "do not say 'knowledge base' or 'company brain'". CHG-1360 (Done 23 Sep) keeps "Company brain" internal-only. The direction is written for homepage §8 and /platform has no copy direction (SIT-60 blank), so this is a divergence by extension.
   - Home contains no "brain" wording.
   - Only CIO noticed the tab ((synthetic) "a collapsed tab with no content visible").
5. **"Coordination tax" as the lead pitch (T3B3, dossier §4.1).**
   - T3B3: the pitch "stalled the Beaufort deal ... never answered ... how the coordination cost is reduced, and how Unifize is better than the competition."
   - Both pages foreground the tax: home band plus "Take the Coordination Tax Assessment"; platform section plus close "Watch the tax fall".
   - Neither page states a competitive difference. VPQ marked "How is this different from [competitor]?" absent on home ((synthetic) "every vendor on my shortlist also says" audit-ready). Positioning §4.3 has the Frame 1 line ("Traditional QMS captures what happened. Unifize captures how it happened."), but it does not appear on either page.
   - PES-5 says for IT that "Coordination tax may never be mentioned directly". CIO: (synthetic) "That's my VP Quality's business case, not my gate."
6. **Coexistence takeaway undercut by proof captions.**
   - Platform proof tiles read "Moved off MasterControl", "A collaborative eQMS live in 4 weeks" and "Unifize as the engineering system of record".
   - The home suite reads "One platform. Four governed records."
   - Displacement is real proof (§5.1 #216 "Why Biovation moved from MasterControl to Unifize"), and Positioning has per-system scripts for "We already have MasterControl" (§4.2). The pages carry both stories without reconciling them.
   - 4/6 reported the contradiction (QM, VPQ, EM, CIO). §6 has the details.
7. **Stack count.** Home says "Four governed records". Platform says "Three bands on one governed foundation". COO noticed ((synthetic) "my VP Quality might"). Story Architecture's three-band rule is cited in the Sep 1 platform record (P1). Treat that as a prior-run reference, not a dossier item.
8. **Domains visibility vs Domain priority (§2.3).**
   - Hidden behind "See more solutions": the Operations (Domain 9, Primary) and Product Development (Domain 2, Primary) cards.
   - Visible: Document & Records Control (Domain 4, Secondary) and Change Control (Domain 3, Secondary).
   - Domain 9 notes "VP Operations and Plant Manager are underpenetrated personas". COO: (synthetic) "The one card about my problem was behind a 'see more' button".
   - Taxonomy drift: the home footer lists 15 solutions, while Story Architecture v1.6 corrected the count to "14 named buyer doors". This is an evidence-only flag.

---

## 5. Existing-issue check (dossier §3 and §4)

### 5a. Surfaced independently by the panel

| Existing issue (Notion) | Panel surfaced it? | Who, and how |
|---|---|---|
| Raj, ACT-2555: "the same content repeating across pages" | **Yes, 6/6, prompted** (the reactor brief asked every reactor to note repetition; this confirms the repetition is visible, not that buyers notice it unprompted) | All six report redundancy between home and platform. The 54-of-75 grid is repeated 6/6. The customer reel is repeated 5/6 (QM, DC, EM, COO, CIO). The close CTA is repeated 2/6 (QM, VPQ). CC-2148 is repeated (EM). The standards list is repeated (CIO). |
| Raj, ACT-2555: "It makes us sound like slack" | **Partly, 2/6** | QM: (synthetic) "Another inbox. The mocks are all conversation lists". VPQ: (synthetic) "Will an investigator accept a record that looks like a chat thread? Every mock-up is a conversation UI". |
| CHG-1360: prospect found the platform "very similar to other platforms I've used" | **Partly, 1/6** | VPQ: both pages lean on "audit-ready" and "governed", (synthetic) "which every vendor on my shortlist also says". |
| Homepage §8 AI beat (Brief v0.9) / Frame 5 (Copilot) | **Partly, 1/6** | CIO: home AI is a BETA button inside a change record, (synthetic) "Microsoft 365 and Copilot aren't mentioned". No other reactor raised Copilot or an AI-governance posture. QM, DC and EM did register the home hero's AI impact check; it was EM's home peak. |
| PES-5 "Start with no integrations" as the single most important IT message | **Yes, 1/6 (the only IT seat)** | CIO: absent on home, partial on platform. "The rest of the platform arrives on day one" reads (synthetic) "as scope creep, not a light start". |
| ERR-195 / WT-41 unsourced CT figures | **1/6 explicitly; 3/6 discount** | VPQ names the missing source. QM ((synthetic) "Unifize's number, not mine") and COO ((synthetic) "ONE OF YOUR" oversteps) discount the figures without raising sourcing. |
| T3B3 coordination-tax pitch not answering "how is it better than the competition" | **Partly, 1/6 on differentiation (VPQ); 5/6 attention drop at the tax band** | See §4 items 1 and 5. |
| SIT-11 §7 proof constraint: "Med Device customers only. No generic quotes." | **Yes, 1/6** | VPQ: (synthetic) "the first two films are a machinery company and a lab", and the one device story (synthetic) "is off-screen with no company name". The home reel leads with Will-Burt (Manufacturing) and Biovation Labs (industry not stated in the dossier) and includes Dave Anderson (Construction). |

### 5b. Evidence-only flags (in Notion, not raised by any reactor)

- **WT-52 proof rule / 75% claim.** The home reel shows "The Will-Burt Company ... NC closure 75% faster in the first month". It is sourced from Web Use Approved video #71 (§5.1). Will-Burt is Manufacturing, not Medical Devices, so the Advocacy metric rule in WT-52 may not bind. WT-52 is still open, though. No reactor mentioned the 75%.
- **Harmonic Bionics logo currency.** Harmonic cards appear twice on home and three times on platform. Local memory (not Notion) records a Sep 9 request to remove Harmonic as "no longer customers". Notion records no churn for Harmonic (§5.2). Related: the "Denis Machoka / Medical Devices" card has no company name. Per §5.1, Denis Machoka is Harmonic Bionics' "VP of Quality". VPQ felt the anonymity as a proof gap without knowing the cause.
- **FAQ legacy claims (§4.5).**
  - The collapsed platform FAQ answers were not visible, so the panel could not assess them.
  - Risk: if they are populated from the legacy Webflow FAQ DB, they may contradict the pages. Examples: FAQ 6 "21 CFR Part 11, SOC 2 ... can be opted for at an additional time and cost"; FAQ 14 "Most custom integrations take 2-3 business months"; FAQ 13 "Integrations are not included in the implementation cost".
  - Three reactors want the Part 11 answer opened (VPQ, DC, CIO), so this risk grows once the answer is opened.
- **SOC 2 Type II badge.** Platform shows "SOC 2 Type II · GDPR ready · Zero data training". The dossier notes "A SOC 2 status is not stated anywhere" in the FAQ DB. CIO scored SOC 2 as "addressed" on this badge alone, which makes the badge load-bearing. It needs fact confirmation.
- **SIT-60 Platform row is blank.** Notion has no copy direction, review hub or decisions for /platform (§3.1). The page's copy is ungoverned in Notion.
- **SIT-11 Homepage.** Status "P1 - Launch Blocker", Phase 1/2/3 Ready all NO, copy owner not assigned (§3.1). CHG-1360 made hero "Option B (the AI provocation)" the first test candidate. The current hero is the outcome headline. There is no Home/Platform Review Log, and Raj's review slots rolled on Sep 10, 11, 14, 15, 21 and 22 (§3.5).
- **Raj's "links that go nowhere, pages that were never built".** Not testable with a text+frames stimulus.
- **Taxonomy drift: 15 solutions in the footer vs 14 buyer doors (§2.3).** Not raised.

---

## 6. Consensus wins, failures, splits, surprises

### Consensus wins

1. **Coexistence section and the open FAQ answer on /platform: 5/6** (QM, VPQ, EM, COO, CIO). CIO peak: (synthetic) "COEXISTENCE: 'Your systems stay.'" EM: the FAQ answer (synthetic) "is what I needed before I would engage at all". DC did not engage with it.
2. **A specific product scene was a peak moment: 5/6.**
   - QM: CAPA #612, the Gap, the dashboard.
   - VPQ: the Quality performance dashboard.
   - DC: platform hero rail "The seal" / "The process builder".
   - EM: CC-2148 torque change.
   - CIO: "Suggested by AI, added by a person".
   - COO peaked on text cards instead but called the Today-vs-On-Unifize walkthrough (synthetic) "the most convincing mechanism".
3. **Part 11 signing on the record registered: 4/6** (QM, VPQ, DC, CIO). VPQ: the standards grid and the Part 11 seal are (synthetic) "the most trust-building elements across both pages". Only VPQ calls it trust-building and DC names the seal as a peak; DC (objection #3) and CIO ((synthetic) "a list of standards is not a validation posture") say it does not answer validation.
4. **Home symptom cards recognised as the reader's own pain: 3/6.**
   - QM: CAPA card, (synthetic) "That is my Monday".
   - DC: three-SOPs card, (synthetic) "my inspection finding, almost word for word".
   - EM: Change Control card.
5. **Home routing gave each seat a role-matched first click: 6/6, six distinct doors** (see scoreboard). No reactor bounced.

### Consensus failures (ranked by frequency)

1. **Home and platform repeat each other: 6/6** (see §5a) (prompted by the reactor brief).
2. **The macro "What the tax turns into" band was discounted or dropped: 6/6** (QM, VPQ, DC, EM, COO, CIO).
3. **The 54-of-75 / 19 hrs figures failed the reader: 6/6.** Two failure modes:
   - Unsourced or "Unifize's number": QM, VPQ.
   - Not my metric: DC ((synthetic) "the Quality Manager's problem"), EM ((synthetic) "quality's metric"), COO ((synthetic) "for a non-conformance, not a held lot"), CIO ((synthetic) "VP Quality's business case").
4. **Coexist vs replace contradiction: 4/6** (QM, VPQ, EM, CIO).
   - Ranked objection #1 for QM and #2 for VPQ and EM. CIO ranks it inside objection #1 as a validated-footprint question.
   - 3/6 cite a proof tile as the contradicting evidence: QM and VPQ cite "Moved off MasterControl"; EM cites "Unifize as the engineering system of record".
   - Adjacent contradictions: DC (DMS as a standalone product on home vs "You come for a product. The platform comes with it." on platform) and COO ("Four governed records" vs "Three bands").
5. **Validation / Part 11 posture missing, or buried in a collapsed FAQ: 4/6.**
   - VPQ objection #1 ((synthetic) "That decides my compliance team's gate").
   - CIO objection #1.
   - DC objection #3.
   - QM missing #3 ((synthetic) "whether it's validated for Part 11/13485 use").
6. **Proof is not in my column: 4/6.**
   - VPQ: no named Class II device company.
   - DC: no pharma or lab SOP-control quote.
   - EM: no engineering metric or customer.
   - COO: (synthetic) "No CDMO or pharma manufacturing proof".
   - QM asks only that films be labelled with the pain in their vocabulary.
7. **"Configured by quality / no IT tickets" read as a threat: 3/6.**
   - EM objection #1: (synthetic) "Who owns the change route?"
   - CIO objection #2: (synthetic) "shadow IT".
   - QM: "(synthetic) 'Configured by quality, not coded by IT' is lovely until you realise quality is me."
   - No reactor praised the ownership line; DC peaked on the process-builder rail ("set by your team. No code.") as routing work.
8. **"This is for another function" / my door is a side door: 3/6** (DC, EM, COO). CIO: (synthetic) "aimed at my VP Quality, not at me".
9. **The reader's own scene was hidden: 3/6.**
   - COO: Operations card behind "See more solutions".
   - EM: Product Development card behind "See more solutions".
   - DC: the Controlled document scene is the fourth hero tab.
10. **Platform walkthrough offer names only quality artifacts ("A CAPA, a change order, a supplier approval"): 2/6 explicitly** (DC, COO). EM makes the same demand in their yes condition (ECO with PLM in the loop).
11. **Implementation / migration effort unstated: 2/6** (QM, VPQ). CIO adds the zero-integration start.
12. **Audit-facing output never shown (the trail or packet you hand an inspector): 2/6** (QM, VPQ).
13. **"It chases" claimed, never shown: 2/6** (QM, and DC via the PP-38 approval queue).

### Splits (preserve them)

- **Coordination-tax band on home.** QM peaked on the CAPA tax card ((synthetic) "That is my Monday"). The other 5 dropped there.
- **Stalled Production card.** COO's platform peak ((synthetic) "my holds problem word for word"). The same COO discounts its $1.5T headline ((synthetic) "One-point-five trillion isn't my number").
- **Design Delays card.** EM's platform peak ((synthetic) "my DHF"). COO peaked on another card in the same band (Stalled Production). The other four treated it as macro filler.
- **The Gap section.**
  - QM and COO: most convincing.
  - EM: (synthetic) "a defect, not an ECO, so I skimmed it".
  - DC: (synthetic) "scrolled past".
- **Walkthrough offer.**
  - QM: (synthetic) "the right offer for someone like me".
  - EM prefers "Watch one change close" before giving 30 minutes.
  - DC and COO: it isn't their artifact.
- **Platform page effect.** It lifted COO and CIO (1 to 2), lowered DC (2 to 1), and left QM, VPQ and EM flat.
- **Where demo willingness sits.** Resonance 2 on both pages produces 6 (QM, VPQ) and 5 (EM). COO and CIO (home 1, platform 2) sit at 3, and DC (home 2, platform 1) at 4. Among the 2/2 seats, the difference is whether the blocker is a condition a walkthrough can meet or a fact the seat must see first.

### Surprises

1. **The coexistence fix shipped and landed (5/6), but the same page's proof reel re-opened the question.** Platform copy now states coexistence, but the home suite line ("Four governed records") and the proof-reel captions keep the question open.
2. **The one Medical Devices proof card is anonymised.** Denis Machoka is shown with no company, while the dossier says he is Harmonic Bionics' VP of Quality. For the device buyer this turned the best-fitting asset into a gap (VPQ).
3. **The DMS retraining line shipped after Sep 1 is now DC's single most-quoted sentence.** Yet DC's platform resonance fell to 1, driven by the absent document lifecycle and one line: "You come for a product. The platform comes with it."
4. **Primary domains are hidden while secondary ones are visible** on the home solutions grid (Domain 9 Operations and Domain 2 Product Development vs Domain 4 and Domain 3). Both seats whose cards are hidden named that card as their top missing item: COO (home resonance 1, demo 3) and EM (demo 5).
5. **Only 1/6 noticed "One brain for the whole company"** (CIO), even though it directly conflicts with CHG-1360. It is a copy-governance problem, not a buyer-visible one.

Representative verbatims (all synthetic):
- (synthetic) "Page one sells me a QMS, page two says keep my QMS, and the video says they left MasterControl. Which is it?" (QM)
- (synthetic) "'Defensible at audit' is the right headline. Now show me the validation package, because every vendor on my list says audit-ready." (VPQ)
- (synthetic) "Everything here is CAPAs. What does it do to my holds?" (COO)
- (synthetic) "'Configured in house, no IT tickets' is the sentence that ends up in my shadow-IT audit finding." (CIO)

---

## 7. Home vs Platform

**What home does for demo willingness.** It is a recognition and routing surface.
- 6/6 get a role-matched first click through six distinct doors.
- 3/6 recognise their own pain in a symptom card (QM, DC, EM).
- It does not move the gatekeepers. COO and CIO sit at home resonance 1 because home stays in the quality department: hero subline, tax cards, dashboard and reel (COO, CIO).
- Home carries the strongest single-seat assets:
  - the DMS retraining line and three-SOPs card (DC);
  - the CC-2148 torque change (EM);
  - the Medical Devices card with 820/13485/EU MDR chips (VPQ);
  - the Quality performance dashboard (VPQ).

**What platform does for demo willingness.** It is the objection-handling surface for coexistence and security.
- It lifted COO and CIO to resonance 2 ("Your work crosses teams. Your systems don't." read (synthetic) "at my level", COO).
- It delivered the coexistence answer (5/6).
- It showed Part 11 and SOC 2.
- It also carries the page-level liabilities:
  - the macro band (6/6 discount);
  - the "Moved off MasterControl" / "engineering system of record" captions (QM, VPQ, EM);
  - "configured by quality, not coded by IT" (EM, CIO, QM);
  - "the rest of the platform arrives on day one" (CIO);
  - "You come for a product. The platform comes with it." (DC).
- The questions that decide a gate sit in collapsed FAQs (VPQ, DC, CIO): Part 11, what flows back, how it connects, whole-platform adoption.

**Redundancy reported:** 6/6, in answer to a direct brief question (see §5a). QM: (synthetic) "The second time through it felt like padding."

**Contradictions reported between the pages:**
- Home sells QMS/PLM products vs the platform FAQ saying they need not be replaced (QM, VPQ, EM).
- Home "Start with the system your team needs" vs platform "the rest of the platform arrives on day one" (CIO: (synthetic) "Which footprint am I validating?").
- Home "Four governed records" vs platform "Three bands" (COO).
- Home presents DMS as a product in its own right; platform frames every product as a doorway (DC).

---

## 8. Ranked changes to raise demo willingness

Movement estimates use only the reactors' own "whatWouldMakeItAYes" and "missing" fields and the scale anchors. By the anchor definition, meeting the one named condition of a 6-7 seat moves it to the 8-9 band ("would book the walkthrough today"). Seats below 6 named what would move them, not a target score, so their movement is stated qualitatively.

| Rank | Change | Personas moved (per their own words) | Notion grounding | Gate | Stakes | Context reason (segment + business stake) |
|---|---|---|---|---|---|---|
| 1 | **Rewrite the walkthrough offer so each seat sees its artifact, and state it runs beside the incumbent system.** Today it reads "A CAPA, a change order, a supplier approval". Add "a controlled-document revision", "a held batch to release" and "an ECO with your PLM in the loop". Add "alongside the eQMS/PLM you keep". Apply on both closes. | QM: yes condition is "MY overdue CAPA alongside our existing eQMS", 6 to the 8-9 band if met. DC: this IS their yes condition (4 now, "not a sales call yet"). EM: yes condition names the ECO + PLM walkthrough (5 now). COO: missing #4 "naming 'a held lot or batch disposition'" (3 now; their yes also needs a customer number, see rank 4). | PES-3 "A path that doesn't require rip-and-replace"; PES-6 Needs (PLM complements); Domain 9/Domain 4 problem statements; §4.4 "No rip-and-replace required" | Copy/design, but **fact-gated operationally**: Ben/sales must confirm they can actually run a document revision, a batch disposition and an ECO live | validate-with-real (the offer is a sales commitment) | Segment: quality, document-control, engineering and ops seats at regulated sites (QM, DC, EM, COO). Stake: the walkthrough is the page's only conversion step; if it names only quality artifacts, three of the six committee seats see no meeting for themselves and the deal stays a quality-only evaluation. |
| 2 | **One sentence that settles coexist vs replace, placed on both pages, with proof tiles re-captioned to match.** VPQ's draft: "Run alongside your eQMS, or replace it when you are ready". Add EM's PLM seam: BOM/CAD stay in PLM, Unifize holds the review argument and cross-functional sign-off. Re-caption "Moved off MasterControl" / "engineering system of record" as the second path, not a contradiction. | QM objection #1 and missing #2; VPQ objection #2 and missing #3; EM objection #2 and missing #2; CIO footprint in objection #1. 4/6. | Story Architecture takeaway (1); Positioning §4.2 per-system scripts ("We already have MasterControl/ETQ/Qualio", "We use Windchill/Arena"); §5.1 displacement films #216, #223, #118 | Copy only | **validate-with-real** (deployment posture is positioning; Sep 1 flagged the same and it is still open) | Segment: champions and vetoes who own an incumbent eQMS or PLM (QM, VPQ, EM, CIO). Stake: an unresolved replace-or-coexist question blocks the gatekeeper, the budget holder and the engineering veto; Positioning names 'we already have something for this' the most common first objection. |
| 3 | **An open-by-default "For compliance and IT" block on /platform** (not collapsed FAQs). It should cover: validation approach (package, IQ/OQ/PQ or CSA, who revalidates on releases); the Part 11 answer; SOC 2 status; SSO/SCIM and role-based admin with an audit trail of configuration changes; the write-back approval model; and "Start with zero integrations, add connectors later". Replace "the rest of the platform arrives on day one" and rebalance "no IT tickets" to "configured by quality, governed by IT". | VPQ: first half of their yes condition (6 to the 8-9 band needs this plus rank 4). CIO: this IS their yes condition (3 now) and covers missing #1, #2, #5. DC objection #3 and missing #4. QM missing #3. EM objection #1 (route ownership). | PES-5 Needs + Evaluation questions + Objections; PES-7 "Validation will take too long"; PES-16; §4.4 "No integration required to start. Integration is earned, not assumed." | **Fact-gated.** Needs real validation-package facts, SOC 2 Type II confirmation (§4.5 finds no stated SOC 2 status), SSO and admin capability from Ben/eng. Legacy FAQ 6/13/14 answers must not be reused. | **validate-with-real** (legal/compliance claims) | Segment: the compliance and IT gate (VPQ, CIO, with DC and QM). Stake: PES-7 says the compliance team's approval is a gate where 'the deal stalls'; without a validation and IT posture, VPQ and CIO delegate down instead of booking. |
| 4 | **Proof per buying column, from approved inventory.** Restore the company name on the Denis Machoka Medical Devices card if Harmonic is still a customer, and move it into the first two reel slots. Surface an ops lot-release number (#101 Mikala Hukka "finished good lot process from half a day to 10 minutes", Company field empty, "confirm before web use"). Surface an engineering number (#7 Applechem "Accelerating product development by upto 30%"). Caption films with the pain they fixed. | VPQ: second half of their yes condition ("one Class II device reference I can call"). COO: their yes condition needs a real hold-to-release before/after; the dossier has no approved pharma/CDMO video (§5.1), so the nearest candidate is #101. EM missing #4. DC missing #5 has no candidate in the inventory. QM missing #5 (captions). | §5.1 Website Customer Videos; SIT-11 §7 "Med Device customers only"; WT-52 proof rule | **Fact-gated:** logo currency (Harmonic), Company field on #101, customer approval of any number used as a metric claim (WT-52 Advocacy rule) | **validate-with-real** (customer claims) | Segment: budget holders who need peer evidence (VPQ for Class II devices, COO for pharma/CDMO ops, EM for engineering). Stake: PES-3 'Proof from their industry' and PES-20 'the persona who pays'; without column-matched proof the economic buyers forward rather than book. |
| 5 | **Cut the cross-page repetition and fix figure hygiene.** Drop or compress "What the tax turns into" (macro band) on /platform. Stop repeating the 54-of-75 grid and the reel verbatim. Where 19 hrs / 54-of-75 stay, add a source line and "we estimate", and do not pair the step count with the 19.4 hr figure without the VS-2 note. Remove "ONE OF YOUR". Source or remove ≈30 hrs, ≈14 hrs and 40 min. | Removes a trust cost for 6/6 (redundancy, prompted by the brief; macro discount, unprompted). VPQ missing #5 ("A source line under the 19 hrs / 54-of-75 figures"). QM objection #5. COO objection #3. No seat names this as its yes condition, so the direct demo movement is small. | ACT-2555 (Raj: repetition); VS-2 caveat; ERR-195; WT-41; Positioning proof gate "Say 'we estimate'" | Copy/design, **fact-gated for sources** | **validate-with-real** (quantitative claims) | Segment: all six seats, weighted to budget holders who carry figures upstairs (VPQ, COO). Stake: unsourced or macro figures are discounted on sight and expose the site to ERR-195 (Critical, no baseline) at launch. |
| 6 | **Un-hide the Primary-domain cards and make the Controlled document scene reachable.** Show the Operations and Product Development cards without "See more solutions". Let document-intent visitors land on the Controlled document hero tab. | COO missing #1 (visible hold card). EM missing #1 (visible Product Development / design review story). DC missing #1-#2. | Domains §2.3 (Domains 9 and 2 are Primary; Domain 9 "underpenetrated personas") | Copy/design only | none | Segment: ops and engineering leaders (COO, EM) and document control (DC). Stake: Domains 9 and 2 are Primary entry domains and Domain 9 names VP Operations as underpenetrated; hiding their cards loses the seats at the routing step. |
| 7 | **Show the chase, not the tab label.** One frame of an overdue CAPA or document approval: reminder sent, who it is waiting on, escalation. Keep AI wording within Level A ("Propose only") unless eng confirms autonomous reminders. | QM: missing #1 and part of their yes condition ("shows the automatic chasing"). DC PP-38. | PP-1, PP-38; Intelligence Posture PLT-8 ("Default posture should start at Level A") | Design; **fact-gated** on what the product does automatically today | validate-with-real only for the AI-autonomy wording | Segment: site quality managers and document controllers (QM, DC). Stake: PP-1 and PP-38 are their daily pain; 'It chases' as a label alone leaves the QM's yes condition unmet. |
| 8 | **AI copy governance.** Remove "One brain for the whole company". Add one line on how Unifize AI relates to Copilot ("an assistant is only as good as the record it sits on"). Say how an AI suggestion is attributed before it touches a record. | CIO missing #4 and objection #5. Nobody else registered it. | CHG-1360; Homepage §8 Brief v0.9; Positioning §4.3 Frame 5; PES-17 | Copy only | validate-with-real (AI claims in a GxP context) | Segment: IT and digital buyers (CIO; PES-17). Stake: CHG-1360 records a digital lead's 'not enough consistent data to use LLMs' objection; AI wording that contradicts the brief risks the IT gate and a copy-governance breach at launch. |

**Cheapest high-coverage move:** rank 1 (the walkthrough offer) touches the stated yes conditions of 3 seats (QM, DC, EM) plus COO's missing list, and needs no new product facts. It does need a sales commitment. **Highest-ceiling move:** ranks 3 + 4 together are the only path that satisfies both halves of VPQ's yes condition and all of CIO's. They are fact-gated on Ben/eng and customer approvals.

---

## 9. Calibration hooks (falsifiable, score against real data after launch)

1. **Direct booking.** ICP-shaped first-session visitors will rarely book from /home or /platform directly. Demo requests will cluster among quality-titled visitors, and operations (COO/VP Ops) and IT titles will be near zero as bookers (panel: 0/6 book-demo; COO and CIO forward or delegate).
2. **First objection on site-sourced calls.** The first objection in site-sourced first calls will be coexist vs replace. The "Moved off MasterControl" film will be cited against the "Your systems stay" answer (QM, VPQ, EM, CIO).
3. **Validation questions.** Validation and Part 11 questions will come up in the first or second meeting of any deal where a VP Quality or IT seat is involved. If rank 3 ships, the share of first-call time spent on them should fall (VPQ, CIO objection #1).
4. **Macro band.** On /platform, the "What the tax turns into" band will show fast scroll-through (skim) relative to the Coexistence and Gap sections (6/6 discount).
5. **Hidden cards and tabs.** "See more solutions" expansion will be low. Visitors who arrive via Operations or Product Development nav links will have lower demo conversion than those arriving via Quality, until the cards are visible (COO, EM). The Controlled document hero tab will get fewer clicks than the default Change order tab (DC).
6. **Walkthrough offer.** If rank 1 ships, walkthrough-CTA clicks from visitors who first viewed DMS, Operations or Product Development pages will rise against the pre-change baseline (DC, COO, EM yes conditions).
7. **First-click distribution.** Home first clicks will be role-matched: Quality solution for QMs, Medical Devices for device VPs, Document management for doc control, Product Development for engineering, Operations for ops, Platform for IT.

---

## 10. Caveats

- **Synthetic panel.** All reactions are model-generated. Verbatims are synthetic. Treat this as directional evidence for prioritising copy work, not as proof of buyer behaviour.
- **Draft personas, no calibration history.** Every persona file is draft, and none of the Sep 1 calibration hooks has been scored against real data yet.
- **No economic-buyer seat.** There is no CFO (PPS-27/PES-2) or CEO (PPS-28/PES-10) on the panel. PES-20 says the Operations Leader "pays for Unifize", and COO sat at 3. "A number they can take to their CFO" (PES-3) was judged only second-hand by VPQ and COO.
- **Notion gaps (dossier Gaps summary).**
  - No IT/CIO product persona: CIO rests on PES-5/PES-17.
  - No Document Controller buyer persona.
  - The Pain Points relation is empty for VP Quality and COO, so those rows trace to PES-3/PES-20 and persona files, not PP rows.
  - The QM reactor listed 5 of the ~24 in-scope PP rows, so several QM pains are untested (§3).
  - SIT-60 (Platform) is blank.
  - There is no Home/Platform review log.
- **Stimulus limits.** Text dumps plus stills only: no interaction.
  - Hidden solution cards (Operations, Product Development and later cards) were not visible, and all FAQ answers but the first were collapsed. Reactors' "absent" verdicts can therefore mean "not visible without a click".
  - Hero tabs other than Change order were visible only in the text dump. DC's point-of-use evidence came from the Controlled document tab text.
  - Links were not followed.
- **Scale change.** Demo willingness 0-10 is new this run, so the Sep 1 comparison is qualitative. Resonance moves between runs also reflect a different page state and different reactor instances.
- **Prompt structure.** The brief told reactors to treat their Notion pains as the concerns they arrive with, list ALL in-scope pains (capped at 5-8), and note repetition and contradiction. Coverage "partial/absent" rates are inflated by the method, and the redundancy and contradiction counts were solicited. Layer-vs-suite still stands independently: it appears unprompted in the QM, VPQ, EM and CIO comprehension fields.
- **Convergence risk.** Several reactors use similar "which is it" phrasing (QM, VPQ, EM), as the Sep 1 verifier also noted. Weigh the content of objections over their wording.

---

## Verification

Adversarial verifier pass 2026-09-24: PASS-WITH-CORRECTIONS. Independence 2, stimulus fidelity 3, prompt neutrality 2, persona adherence 3, synthesis honesty 2, decision linkage 3. All counts recounted and matched; corrections applied.
