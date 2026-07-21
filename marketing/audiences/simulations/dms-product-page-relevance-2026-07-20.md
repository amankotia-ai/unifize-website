# Panel simulation: /explorations/products/dms (relevance re-test)

**Synthetic panel output, not real user research.** Run 2026-07-20 against the local build, text-only stimulus (full rendered page text; design, motion, imagery, and scroll behavior out of scope). Panel: the six draft personas in `marketing/audiences/` (all `status: draft`, never founder-approved, zero calibration history). One isolated reactor per persona, separate synthesis agent, adversarial verify pass: **PASS-WITH-CORRECTIONS** (corrections applied below).

Decision informed: how relevant is the current page to each panel segment after the July rework (proof rail, condensed coordination-tax scene, copy rewiring), and which segments does it still not address?

## Verdict

**The rework landed the page squarely on the document-lifecycle core — one persona moved from lukewarm to sold — but the page still fails its own second hop: the three adjacent readers the core will forward it to (engineering, operations, IT) each stop at the section that was supposed to contain their answer and does not. Confidence: medium overall; medium-high on the core-vs-adjacent split, which now replicates across two runs with different methods.**

- **Fully addressed:** document-controller-pharma (for-me, resonance 3, read to the Close — the panel's first 3 on this page) and vp-quality-medical-devices (for-me, 2, share-internally as advocacy).
- **Half-addressed:** quality-manager-site (partially, 2). Named on the page, but his caseload is CAPAs and deviations — "CAPA shows up here as a document number" (synthetic).
- **Still not addressed:** engineering-manager-npd (partially — no engineering role anywhere), coo-vp-operations-pharma-cdmo (**not-for-me, resonance 1** — hardened from an indistinct 2 on Jul 15), cio-regulated-manufacturer (partially — the Integrations section he came for is "seven logos and a talk-to-us line", synthetic).

## Resonance, relevance, next action

Distribution: **1, 2, 2, 2, 2, 3** (vs flat 2×6 on Jul 15 — the range opened in both directions).

| Persona | Res. | Relevance | Next action | Stopped at | Conf. |
|---|---|---|---|---|---|
| document-controller-pharma | 3 | for-me | share-internally | read to the Close | high |
| vp-quality-medical-devices | 2 | for-me | share-internally | FAQ (scanned for migration/CSV entry; absent) | high |
| quality-manager-site | 2 | partially | keep-reading | active through 06 Customer proof, then skim | high |
| engineering-manager-npd | 2 | partially | keep-reading | 05 Who it is for (no engineering role) | high |
| cio-regulated-manufacturer | 2 | partially | keep-reading | Integrations (logo strip; FAQ confirmed no IT entries) | medium |
| coo-vp-operations-pharma-cdmo | 1 | not-for-me | share-internally | coordination-tax section; delegated down to VP Quality | high |

**The three share-internally are not the same act:** advocacy (VP Quality — the MasterControl film is "the one I'd screenshot for my QM", synthetic), shortlisting (Doc Controller), and disengagement-by-delegation (COO, after a not-for-me read). Counting next actions without the why overstates mid-funnel success.

Note: all six personas hit the 3-objection cap, so theme counts below are shares of a fixed 18-objection budget; two compound objections (VP Quality #3, Eng Manager #2) each serve two themes, so theme counts sum to 19.

## Convergent themes

1. **Coexistence with incumbents unstated — 4/6.** Replace or bind to the validated eQMS (QM: footer sells "Quality management" separately while the trace says BOUND TO QMS — "which one am I buying?"; CIO reads the MasterControl film as rip-and-replace and notes the page never says which), the PLM (EM: "how do ECO-441 and CC-2148 actually stay in sync?"), the MES/floor (COO). The most persistent finding across both runs.
2. **Migration + validation burden absent — 3/6** (VP Quality: "the CSV burden of switching is the whole cost of the decision"; QM: who loads a 118-document live library; CIO: vendor validation pack, CSV story). The literal reason the VP stopped at the FAQ.
3. **Proof is real now, but not visibly from "a company like mine" — 3/6.** No film on the page is identified as a cGMP pharma site (Doc Controller's top objection); one device company in the rail against a MasterControl/Veeva/ETQ shortlist (VP Quality); the 41% / $81,350 number lacks provenance the COO can interrogate ("whose baseline?").
4. **Role exclusion from "05 Who it is for" — 2 objections + 1 relevance rationale** (EM: "engineering is an approval checkbox again, not a workflow"; COO; CIO cites the absence of an IT/architecture owner).
5. **Stalled-approval mechanics unanswered — 2/6, NEW this run.** QM: "Who chases the chasers?" — the page's own role cards still read "chase approvers" and "Chase incomplete training". Doc Controller (missing list): what the system does when the signer has not signed.
6. **Integrations strip too vague to gate on — 2** (CIO: "a logo wall, not an architecture: what reads, what writes back, and under whose signature?"; EM: not one PLM named, contradicting the BOUND TO PLM chip).
7. **Coordination-tax framing reads as deck language — 2**, plus the split below.
8. **Threaded-record audit acceptability — 1** (VP Quality, second run in a row).

## Splits worth knowing

- **Core vs adjacent, replicated — with a new fault line inside the core.** Doc-lifecycle readers read deep and share; adjacent readers each stop at their failed section. New: the Quality Manager sits on the "partially" side despite being named on the page — it serves the document controller's whole job and the quality manager's half-job.
- **The coordination-tax section splits three ways.** It hooked the COO ("the phrase 'coordination tax' bought a third scroll", synthetic) then lost him when the line items turned out to be audit-retrieval minutes and SOP review dates; the Doc Controller skips the framing as "strategy-deck language" and reads only the numbers; the VP treats it as an assertion every vendor makes. It attracts the executive it then disappoints and bores the operator who stays.
- **"BOUND TO QMS · PLM" cuts both ways:** the single best line on the page for the Eng Manager ("the first line on this page written for me", synthetic) and a doubt-generator for the QM and CIO (nothing explains it).
- **The film rail splits by industry, not role:** exactly the QM's info diet, the VP's forwardable screenshot, the EM's only reason to open the Change Control tab — and the Doc Controller's top objection (no visible cGMP pharma site).
- **The hero still self-selects instantly** (same shape as Jul 15): instant credibility for doc-side readers, instant "quality's tool, not mine" for the EM and COO.

## vs the 2026-07-15 run

Caveat: different method (Jul 15 = design/flow audit over 21 scroll frames; this run = text-only relevance) and the page changed in between — "did not recur" means "not present in these transcripts," not necessarily "fixed."

**Resolved or no longer surfacing:** the pinned deeper-problem stage (Jul 15 blocker #1) drew no length/broken-state complaints and its copy actually hooked the COO; the proof-section presentation (blocker #2, 3/6 stop point) stopped nobody — the sample cards and footnote are gone from every transcript, replaced by a higher-quality objection about industry mix and provenance; pricing (3/6 then) got zero mentions, though the page still shows none; resonance flatness resolved (1–3 spread).

**Recurring:** coexistence/record-of-authority (5/6 → 4/6, both runs' broadest finding); migration + validation (4/6 → 3/6); the FAQ failing its own heading — now the stop point for TWO personas (VP Quality joined the CIO); engineering has no seat; no operations-terms outcome (the COO hardened to not-for-me); the threaded-record audit doubt; the hero self-selection split.

## Ranked recommendations (relevance-scoped)

1. **State the coexistence answer on the page** — what DMS replaces, what it binds to, where the record of authority lives (eQMS/PLM/MES), including the DMS-vs-QMS-product boundary the QM needs. Unblocks 4. Both runs' #1-by-breadth. ⚑ validate-with-real: this is a positioning statement.
2. **Re-scope the FAQ to its own heading**: add migration/CSV, validation-pack, and integration/API/identity entries. Cheapest fix; the literal stop point of two personas, second run in a row.
3. **Put migration + validation content on the page — including the numbers behind the Biovation MasterControl move the rail already teases.** Unblocks 3; likely converts the VP's share into sponsorship.
4. **Name a cGMP pharma or ISO 17025 lab in the proof rail (or state industry coverage honestly beside it) and put a provenance line on the $81,350/41% claim.** Unblocks 3. ⚑ validate-with-real: customer-$ claim.
5. **State overdue-approval mechanics as product behavior** (reminders, escalation, delegation) and rewrite the role cards so the product, not the coordinator, owns the chasing. Unblocks 2; part copy, part product question.
6. **Give engineering a fourth "Who it is for" row and name PLM connectivity concretely.** Unblocks 1 (a downstream veto-holder); the CC-2148 mock proves the material exists — move it from illustration caption to page copy.
7. **One operations line in the first two scrolls connecting document delay to holds/batch-release/OTD — or deliberately accept the COO as a router and optimize the delegation path.** Unblocks 1.
8. **Auditor-acceptance evidence for the threaded record.** Unblocks 1 (VP Quality, second ask).

## Caveats

1. Synthetic provenance: all reactions are simulated; all quotes synthetic and labeled. **All six personas are `status: draft`, never founder-approved, with zero calibration history** — treat verdicts as directional.
2. Text-only stimulus: "resolved" claims about Jul 15 visual blockers rest partly on this method being unable to surface them.
3. Cross-run comparisons are directional, not controlled (method and page both changed).
4. High-stakes items (coexistence positioning, proof-provenance claims): validate with real users before acting as if proven.

## Calibration hooks (falsifiable predictions to score against real data)

- If the FAQ gains migration/validation/integration entries: the VP-Quality- and CIO-profile stop point at the FAQ disappears (exit/scroll data).
- If a named cGMP pharma customer joins the proof rail: lift in pharma-segment demo bookings from this page.
- If a coexistence diagram ships: fewer "replace or coexist" first-call questions from page-sourced leads.
- Operations-profile visitors continue to exit around the coordination-tax section until an operations-terms line ships.

Artifacts: reactor transcripts, synthesis, reactor prompt template, and verifier report in the session scratchpad (`.../scratchpad/dms-relevance/`).
