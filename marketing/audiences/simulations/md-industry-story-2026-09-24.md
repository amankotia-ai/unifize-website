# SYNTHETIC synthesis: /industries/medical-devices "one story spine" panel, 2026-09-24

> **SYNTHETIC.** Every reaction, score and quote below comes from simulated personas, not real buyers. Treat it as a pre-test to shape hypotheses, never as evidence of buyer behaviour.

- **Date:** 2026-09-24
- **Stimulus:** rendered text of `/industries/medical-devices` after the one-story-spine pass (`md-industry-story-2026-09-24/page-text.md`). Every product visual from hero to cost section plays one illustrative story: seal-breach complaint CMP-311, then CAPA-2140, then change CC-2148 to sterilization SOP-118, then six affected records, then Lot 22-114 on hold, then an FDA 483 about the change. Section head copy stayed broad.
- **Panel:** 6 draft personas from `marketing/audiences/*.md`, **never founder-approved**. On-segment for a device page: `vp-quality-medical-devices` (VPQ), `quality-manager-site` (QM), `engineering-manager-npd` (EM), `cio-regulated-manufacturer` (CIO). Off-segment (pharma personas): `document-controller-pharma` (DC), `coo-vp-operations-pharma-cdmo` (COO).
- **Method:** 6 isolated reactor subagents, one per persona, each reading the rendered page text only; reactions in `md-industry-story-2026-09-24/reactions/*.json`. Separate synthesis agent (this file) that did not write the reactions. **Verifier pass: PASS-WITH-CORRECTIONS, corrections applied (section 8).**
- **Decision informed:** keep the one-story spine on the MD page and roll it out to the other 10 industry pages? What must change first?

---

## 1. Scoreboard (SYNTHETIC)

| Persona | On-segment? | Resonance 0-3 | Demo willingness 0-10 | Next action | Confidence | Sections "about my work" (yes / partly / no) |
|---|---|---|---|---|---|---|
| vp-quality-medical-devices | yes | 2 | 6 | share-internally | high | 5 / 4 / 0 |
| quality-manager-site | yes | 2 | 6 | share-internally | high | 5 / 4 / 0 |
| engineering-manager-npd | yes | 2 | 5 | share-internally | high | 1 / 7 / 1 |
| cio-regulated-manufacturer | yes | 2 | 4 | share-internally | medium | 1 / 6 / 2 |
| document-controller-pharma | no (pharma) | 1 | 2 | keep-reading (to the DMS page via footer) | medium | 0 / 6 / 3 |
| coo-vp-operations-pharma-cdmo | no (pharma) | 1 | 2 | bounce | medium | 0 / 3 / 6 |
| **All six** | | **1.67** | **4.17** | book-demo 0/6, share 4/6 | | 12 / 30 / 12 |
| **On-segment four** | | **2.0** | **5.25** | book-demo 0/4, share 4/4 | | 12 / 21 / 3 |

No reactor chose book-demo. The two quality seats (VPQ, QM) reach 6, the same level as the previous run.

---

## 2. Q1: Does the single story narrow the page?

**Short answer: it narrows by type of change more than by role. The spine is a quality-event-driven process change (complaint, CAPA, SOP revision, lot hold). Readers whose work is that shape see themselves strongly; the one on-segment reader whose work is a different change type (design change) sees himself only partly, and the story is the reason.**

> *Synthesis inference:* "narrows by change type more than by role" rests on one on-segment reader (EM). The two off-segment readers echo the pattern but cannot carry it. Treat it as a hypothesis.

### On-segment (4)

| Persona | Sees own work? | What the story did | Evidence (synthetic) |
|---|---|---|---|
| QM | **Strongly** | The spine *is* the QM's week; the story widened recognition rather than narrowing it. | "Finally a vendor page that shows the change fanning out to the risk file, the PQ and the training, not just a document status." Hero, 01, 03, 05 and close all marked "yes". |
| VPQ | **Strongly** | Recognised the blast radius as real; the 483 card read as the buying trigger. Gap is altitude, not story: wants a management-review roll-up, not an engineer's inbox. | "Whoever wrote the sterilization change card has lived one. I'll give them that." |
| EM | **Partly, narrowed by the story** | ECO-441 and DHF in the hero landed, but the showcase change is an SOP/process change, and engineering raises it then disappears; approvers are quality. | "A sterilization hold-time change is an SOP revision. Show me a design review that survives into the DHF and we can talk." / "I raise it, and then quality signs it. Where do I sign?" |
| CIO | **Only in 04; not caused by the story** | The story is neutral for him. His gap is architecture: "Linked to PLM ECO-441" is a label, not a connector. No IT seat in 02. | "'Linked to PLM ECO-441', linked how? Show me the arrow and tell me which way it points." |

Split among on-segment readers: **2/4 fully served (VPQ, QM), 1/4 narrowed by change type (EM), 1/4 unserved for reasons outside the story (CIO).**

### Off-segment (2, pharma personas; industry mismatch is expected)

- **COO:** found himself in exactly one story object, the Lot 22-114 hold card ("Released the hour CC-2148 closes"), and objected that it is fifth of five seats. Also: the device scenario "made the page feel less like mine". Bounced.
- **DC:** found fragments of her work only as rows inside the story (training cascade on SOP-118 Rev D, "Rev C effective to Rev D draft", "Controlled Distribution" tag). No document-control seat, and "Incumbents track document status" read as a dismissal of her function. Heads to the footer DMS link.

Reading: for both off-segment roles the spine *did* carry a foothold for their work (hold card, training row), and both found it. The problem is placement and weight (a row on a card, fifth card), not absence. This is the nearest the panel gets to evidence on role narrowing for readers outside the story, and it is off-segment, so weight it lightly.

---

## 3. Q2: Illustrative or fabricated? Help or hurt trust?

> **Prompted:** the reactor brief offered "illustrative example" as an option and described visuals as illustrations. Treat 6/6 illustrative and 5/6 noticed recycling as upper bounds; calibration hooks 1-2 are the unprompted test.

| Question | Count | Personas |
|---|---|---|
| Read the records as an illustrative scenario | **6/6 (prompted; upper bound)** | all |
| Read them as fabricated customer history | **0/6** | none |
| Said the single thread helped them follow the product | **5/6** | VPQ, QM, EM, CIO ("helped a little"), COO ("helped a little"). DC neutral: "coherent enough to follow" |
| Noticed the cast recycling roles (L. Martin = Engineering and Complaints; R. Kapoor = Regulatory Affairs and Supplier quality) | **5/6 (prompted; upper bound, the brief named "people")** | VPQ, QM, EM, CIO, DC (not COO) |
| Called the recycled names "staged" or "sloppy" | **3/6** | "staged": EM, DC; "sloppy": CIO |
| Story raised credibility through domain accuracy | **2/6** | QM (correct clause numbers, "whoever wrote it knows device QA"), VPQ (card "has lived one") |
| Effect on trust | **mixed, 1/6 explicit "little for trust"** | VPQ explicit: "does little for trust, because it is clearly staged". EM: "hurt trust a little". CIO and DC imply a cost via "sloppy" and "staged". COO: "doesn't hurt trust". |
| Regulatory citations | **split** | QM praised "correct clause numbers" ('21 CFR 820.70', '820.198', '807.81(a)(3)'); VPQ questioned their currency: 483 items use "the old QSR section numbers ('820.70(b)', '820.198')". |

Synthetic quotes:
- (synthetic, CIO) "The role swapping reads as sloppy, and a sceptical reviewer on my team will notice it."
- (synthetic, EM) "The same few names play different roles... That made it feel staged."
- (synthetic, QM) "It stretched a little when the same initials keep changing hats."
- (synthetic, COO) "That's fine and doesn't hurt trust, since I'm not taking it as customer data."

**Answer:** within the limits of a prompted brief, the records read as illustrative (6/6, upper bound), help comprehension for 5/6 (DC neutral), and are roughly trust-neutral with a small cost. That cost is self-inflicted and cheap to fix: the recycled cast (5/6 noticed, upper bound; 3/6 called it staged or sloppy). The story does not substitute for proof: 3/6 (VPQ, CIO say "only"; DC "the one real number") single out the anonymized 41% NC figure as the only customer-grade evidence, while EM and COO also count the Harmonic Bionics videos as real. Nobody asked for an "illustrative" label.

**Validate-with-real (high stakes):** the citation split. The hero cites 21 CFR 820.70; section 01 cites 820.40; the 483 card cites 820.70(b), 820.100 and 820.198. One synthetic reader praised them, one questioned their currency.

> *Synthesis inference (outside knowledge, not from any reaction):* FDA's QMSR, which incorporates ISO 13485 and restructures Part 820, took effect in February 2026. If so, a 2026-dated 483 citing the old section numbers may read as out of date to a real regulatory reader. Check with an RA reviewer before rollout.

---

## 4. Findings beyond the two questions (SYNTHETIC, ranked by count)

1. **The $0.9M to $10M coordination-tax range is too wide to use: 5/6** (VPQ, QM, EM, CIO, COO). DC treated section 06 as someone else's budget conversation. Per-event dollar figures failed a further way for 3/6: they make the problem look small (VPQ), are not how a case is argued (QM), or are not operating units (COO). CIO alone found per-event figures more useful but wanted the method.
2. **Share internally: 4/6; book-demo: 0/6.** All four sharers are on-segment, each sending it to someone else (CIO back to Quality, VPQ to QM, QM to VP, EM to quality).
3. **Proof is concentrated on one customer and one person: 4/6** (VPQ, QM, CIO, EM). VPQ: (synthetic) "I want three device logos, not seven clips from one." Related: COO notes no operations voice; DC and EM note the 41% figure is about NCs, not their area (2/6).
4. **The 41% signed-baseline figure: anonymization flagged 4/6** (VPQ, CIO, COO, QM); **called the most credible or useful number 3/6** (VPQ, CIO, COO).
5. **Coexistence stated and credited: 4/6** (VPQ, QM, EM, CIO).
6. **Coexistence asserted, not shown: 3/6** (CIO wants a diagram with read/write-back arrows; EM wants what stays in PLM vs Unifize; DC asks where controlled copies live). COO notes MES is missing from the list.
7. **Validation and implementation deferred to a meeting: 3/6** (VPQ, QM, CIO). VPQ flags a contradiction: (synthetic) "You say I don't have to re-validate, then you offer me an IQ/OQ/PQ review. Which is it?"
8. **The close offer ("pick a decision you could not replay... we reconstruct it live") works: 3/6** (QM, VPQ, EM). EM would bring a design change, COO wanted a hold, CIO wanted an architecture session.
9. **Role-level views missing: 2/6.** VPQ wants a management-review roll-up; EM wants a view across 30 to 100 open ECOs.
10. **Chat/inbox as the record worries: 2/6** (VPQ: will an auditor accept a thread; QM: a third inbox).
11. **No seat for my role: 2/6** (CIO: no IT seat; DC: no document-controller seat). COO's seat exists but is fifth.
12. **"Incumbents track documents" does not differentiate: 2/6**, two ways: DC reads it as dismissive of her function; VPQ says it does not explain the difference from MasterControl's change module.
13. **Engineering is originator, not approver: 1/6** (EM), tied to the Q1 change-type narrowing.
14. **Chasing/escalation claimed, never shown: 1/6** (QM: "will it chase R. Kapoor, or will I?").
15. **Identity, SSO, hosting, AI governance absent: 1/6** (CIO).

---

## 5. Comparison with the previous run (home + platform, same day)

| Theme | Previous run | This run |
|---|---|---|
| Book-demo | 0/6, mean willingness 4.5 | 0/6, mean 4.17 (on-segment 5.25) |
| QM and VPQ at "book if one condition met" | 6 and 6 | 6 and 6 |
| Coexistence credited | 5/6 | 4/6, with "asserted, not shown" 3/6 |
| Validation posture missing or deferred | 4/6 | 3/6, plus a new internal contradiction (VPQ) |
| Proof not in my column | 4/6 | 4/6 concentration on one customer and one person |
| Coordination-tax figures fail the reader | 5/6 to 6/6 | 5/6 on the range |
| "My door is a side door" | 3/6 (DC, EM, COO) | same trio again (EM partly; DC, COO off-segment) plus CIO |
| Chat/inbox as the record | 2/6 | 2/6 |
| "It chases" claimed, not shown | 2/6 | 1/6 |
| Walkthrough offer names only quality artifacts | 2/6 | EM repeats the demand: use one of our ECOs, not a CAPA |

> *Synthesis inference (cross-page, no control):* the recurring blockers (proof, validation posture, cost framing) appear in both runs regardless of the story spine, which suggests the spine does not move them. The two runs tested different pages, so this is not a measured effect.
>
> *Synthesis inference (repetition):* CC-2148 also appears on the home hero (EM, previous run). Rolling the same record family across all 11 industry pages risks the repetition the previous run flagged; per-industry spines avoid that. No reaction in this run raised it.
>
> *Verifier inference:* CC-2148 is a torque change on home and platform but a sterilization SOP change here. Reusing one ID for different stories strengthens the case for per-industry spines with their own IDs.

---

## 6. Verdict (SYNTHETIC; confidence: medium for MD, low for rollout)

**Keep the one-story spine on the MD page. Roll out to the other 10 industries only after the cast fix and a change-type check per industry, with each industry choosing its own spine.**

Why keep it: 6/6 read it as illustrative and 0/6 as fabricated history, 5/6 say it helped them follow (DC neutral), and the two quality buyers had their strongest reactions on story objects (hero card, CAPA-to-CC chain, 483 card). It cost nothing on comprehension and little on trust. **Prompted:** the reactor brief offered "illustrative example" as an option and described visuals as illustrations; treat 6/6 illustrative and 5/6 noticed recycling as upper bounds; calibration hooks 1-2 are the unprompted test.

Why not roll out as-is: (a) the recycled cast is the single story-caused trust cost (5/6 noticed, upper bound; 3/6 called it staged or sloppy); (b) one change type narrows the page for the reader whose change type differs (EM on-segment, a single reader; COO and DC off-segment echo the same pattern with holds and document lifecycle); (c) the spine does not appear to fix what caps demo willingness (cost range, proof depth, validation posture; cross-page inference). Rollout confidence is low because only one industry was tested, the panel is draft, two seats were off-segment, and the brief was leading on Q2.

### Recommended fixes, ranked

1. **Give every named person one role across the page** (5/6 noticed recycling, upper bound; 3/6 called it staged or sloppy). Cheapest fix, removes the only story-caused trust cost. Apply as a rule to all 11 spines, and give each industry its own record IDs (verifier inference on CC-2148 reuse).
2. **Check every regulatory citation against current rules before rollout** (split: QM praised, VPQ questioned currency; QMSR timing is synthesis inference). **Validate-with-real** with an RA reviewer; a wrong citation costs more with real RA readers than with synthetic ones.
3. **Let the spine touch a second change type or give the other type a real beat** (EM: design change with design review into the DHF and an engineering signature). On MD, put an engineering approver on the signature block. For each rollout industry, pick the spine from that industry's primary buyer's change type, not by copying the CC-2148 shape. Rests on one on-segment reader; treat as hypothesis.
4. **Raise the weight of non-quality footholds the story already contains** (COO's hold card is fifth; DC's training cascade is a single row). Evidence is off-segment, so treat as a hypothesis for the pharma and CDMO pages rather than a fix for MD.
5. **Not spine fixes, but the biggest demo-willingness levers:** narrow or source the $0.9M to $10M range (5/6); add named device proof beyond one customer and one person (4/6); state the validation package plainly and resolve the "not re-validate" vs IQ/OQ/PQ contradiction (3/6); show one coexistence diagram with sync direction (3/6). **Validate-with-real** before changing cost figures, since sourcing is the issue, not wording.
6. Optional, untested: a small "illustrative scenario" caption. No reactor needed it; test only if real readers show confusion.

---

## 7. Calibration hooks (falsifiable predictions for a real test)

1. In 5 real device-quality interviews, at least 4 describe CC-2148 and its records as an example, and none as a real customer's history.
2. Shown the current page, at least 2 of 5 real quality readers comment on the same names appearing in different roles unprompted; after the one-role fix, 0 of 5 do.
3. A real RA or regulatory lead, shown the 483 card, flags the pre-QMSR section numbers within one read.
4. Real engineering managers rate "sees my own work" lower than quality managers on this page; a design-change beat closes at least half the gap.
5. On session recordings, section 06 (cost) shows the steepest scroll-speed increase or drop-off of the page for quality visitors.
6. Demo-request rate from the MD page does not change after the spine alone (compare pre and post spine over equal traffic); it moves only when proof or validation fixes ship.
7. Pharma or CDMO visitors who land on the MD page exit to the footer DMS or pharma links at a higher rate than device visitors.

---

## 8. Verifier

**Verdict: PASS-WITH-CORRECTIONS.**

| Criterion | Score (0-3) | Note |
|---|---|---|
| Independence | 2 | |
| Stimulus fidelity | 3 | |
| Prompt neutrality | 1 | The examplesRead prompt was leading: its preamble called the visuals "illustrations" and offered "an illustrative example" as an option; naming "people" primed the cast-recycling observation. |
| Persona adherence | 3 | |
| Synthesis honesty | 2 | Corrected: thread-helped count (6/6 to 5/6), trust-effect counts, "only customer-grade evidence" count (4/6 to 3/6), 41% credibility vs anonymization split, citations reported as a split, staged/sloppy count (4/6 to 3/6), inferences separated from reaction evidence, 820.70 (hero) vs 820.40 (section 01) placement, section 4 re-ranked by count. |
| Decision linkage | 3 | |

Corrections applied 2026-09-24. Added as verifier inference: CC-2148 names a torque change on home/platform and a sterilization SOP change here (section 5).
