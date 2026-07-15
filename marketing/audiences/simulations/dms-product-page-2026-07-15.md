# Panel simulation: /explorations/products/dms (design + flow audit)

**Synthetic panel output, not real user research.** Run 2026-07-15 against the local build (uncommitted changes included), desktop 1440x900, 21 scroll frames. Panel: the six draft personas in `marketing/audiences/` (all `status: draft`, not yet founder-approved; calibration history empty). One isolated reactor per persona, separate synthesis agent, adversarial verify pass: **PASS-WITH-CORRECTIONS** (corrections applied below).

Decision informed: is the page's design and flow ready to ship, and what should change first?

## Verdict

**Not yet, but close for the core quality reader. Confidence: medium.**
Information architecture is validated: comprehension was 6/6 on the core (three modules on one record, Draft-to-Obsolete lifecycle with Part 11, training assigned off revisions), and nobody faulted the design system, typography, or aesthetic. What blocks shipping: the pinned "deeper problem" stage (criticized 5/6, with rendering-defect reads verified on frames 03/04/06), the proof section's visual treatment discrediting its own evidence (3/6 stat-legibility complaints, 3/6 stopped reading at its footnote), and an FAQ whose heading promises procurement answers it does not contain.

## Resonance distribution

2, 2, 2, 2, 2, 2. Flat; treat as "nobody repelled, nobody compelled" and read the signal in next actions and stop points instead (verifier flagged compressed dynamic range at anchor 2 as a plausible contributor).

| Persona | Next action | Stopped at | Confidence |
|---|---|---|---|
| quality-manager-site | keep-reading | proof footnote | high |
| vp-quality-medical-devices | share-internally | proof footnote | high |
| document-controller-pharma | share-internally | FAQ (had enough to shortlist; called the FAQ titles "the right questions") | high |
| engineering-manager-npd | keep-reading | "Who it is for" cards | medium |
| coo-vp-operations-pharma-cdmo | share-internally | proof footnote | medium |
| cio-regulated-manufacturer | keep-reading | FAQ (his IT-gate questions absent; left to hunt for an architecture page) | medium |

Nobody bounced; nobody converted. The page enters every evaluation and advances none past shortlist on its own.

## What works (keep)

- **Hero register, 6/6 praised.** The document table with real lifecycle vocabulary (IN APPROVAL, REVIEW DUE, OBSOLETE Retired) is the most credible element on the page and bought attention for everything after it.
- **The dark middle (modules, capabilities, lifecycle) is where evaluation happens.** The CC-2148 change window was called best or most useful visual by three personas; the revision history + standards chips frame is "the screenshot I would drop into my evaluation file" (VP Quality, synthetic).
- **Problem copy lands with the target persona.** "The auditor asked for one SOP. It took us forty minutes" was quoted approvingly by both quality readers. The closing CTA line was called the strongest copy on the page.
- **Honesty is respected**: no persona accused the page of overclaiming.

## Ship blockers (design and flow)

1. **Pinned "deeper problem" stage (frames 03-07).** Criticized by 5/6: three explicit near-bails, one section skip, one nearly missed the payoff row. Four to five viewport-heights of headline swaps over one diagram; three personas independently read intermediate scroll states as broken (near-empty viewport, stray red sliver, unlabeled block rows; all verified on frames). The COO alone valued the diagram ("the only visual that speaks my language, I'd lead with it"), while the Quality Manager dismissed the same headline as CFO language: the stage targets an executive who will never scroll to it and bores the operator who does.
2. **Proof section presentation (frame 15).** Stat text over busy photos (3 complaints), the sample-stories disclaimer set in the smallest type in the section, a key number cut off behind a carousel control. Three personas ended active evaluation at the footnote; two of those three explicitly respected the honesty while disengaging. The three numbers personas most wanted to quote upstairs (9 days, 3x, $2.4M) all sit on admitted sample cards.
3. **FAQ scope vs its heading.** "The questions procurement and QA ask first" answers only QA. No migration/CSV, no security/hosting/validation, no API/integration entry. The CIO exited the page there.

## Content gaps (design cannot fake these)

- **Coexistence / record of authority, 5/6.** Replace or sit beside the incumbent eQMS, SharePoint, PLM, MES? The footer's own product list amplifies the doubt ("your own footer sells both answers", QM, synthetic). The CIO says one coexistence diagram alone earns the technical deep-dive.
- **Migration + validation, 4/6.** No legacy-library import story, no validation package (IQ/OQ, Part 11 assessment), no SOC 2/hosting posture. "The first-call question, and it isn't on the page" (VP Quality, synthetic).
- **Pricing signal, 3/6.** Demo-only exit; "I cannot shortlist blind" (Doc Controller, synthetic).
- **Audit-evidence doubt about the chat thread, VP Quality:** will an investigator accept a threaded conversation as objective evidence? (The Doc Controller's separate concern about the same frame is scope creep: "is this a DMS or something bigger I did not ask for?")

## Splits worth knowing

- **Core quality buyers vs adjacent stakeholders.** Quality readers (QM, VPQ, DC) read deeply and exited on evidence gaps. Adjacent readers (EM, COO, CIO) skimmed for their entry point (ECO/PLM, holds/OTD, architecture) and never found it. The adjacent three are exactly who the quality readers say they will forward the page to; the page currently fails its own second hop.
- **The hero register self-selects.** Instant credibility for quality readers; "signals library, not change process" to the Engineering Manager, "a quality workspace, not mine" to the COO, within seconds.
- **The chat-style change record splits on trust**: most convincing product evidence (EM, QM) vs audit-risk question (VPQ).

## Ranked changes (by personas unblocked x severity)

1. Rebuild the proof presentation: lead with attested evidence, stat text off the photos, disclaimer out of footnote type, no numbers cut off by carousel controls; quarantine or shrink sample cards until real case studies exist. (Unblocks 5; the literal stop point for 3.)
2. Compress the pinned stage to one or two viewports and eliminate broken-looking intermediate scroll states. Consider surfacing the compressed Today-vs-Unifize contrast higher for exec skimmers. (5/6 criticized it.)
3. Add an explicit coexistence / record-of-authority statement or diagram. (Unblocks 5, defuses the footer objection.)
4. Add migration + validation content, even as FAQ entries or a linked page. (Unblocks 4.)
5. Re-scope the FAQ to its own heading: migration/CSV, security/hosting, API/integration. (Cheap; partially substitutes for 3 and 4; fixes the CIO exit.)
6. Give engineering a visible seat: show the Change Control tab / an ECO-driven walkthrough, name one PLM connector. (Unblocks a downstream veto-holder; CC-2148 proves the material exists.)
7. Operations-terms outcome band with one credible number in the first two scrolls. (Serves the forwarding path.)
8. Acknowledge pricing (band or packaging), pay off the hero play button with the lifecycle video.
9. One line connecting the governed record to AI readiness ("governed, attributable layer" language). (Trivial cost; converts the CIO from skeptic to sponsor.)

## Caveats (attach to any promoted insight)

1. Synthetic provenance: all verbatims are synthetic; personas are drafts, never founder-approved, zero calibration history.
2. Behavior is narrated, not observed: stop/skim claims are simulated self-reports (the COO's two-screen trait was prompt-reinforced and then not enacted in the transcript).
3. Resonance flatness is a distribution artifact; the information lives in objections, next actions, stop points.
4. Recurring pattern, not new discovery: proof-too-thin-to-forward repeats the verified /domains/quality panel finding (mid-funnel evidence loses).
5. High-stakes items (pricing exposure, proof claims): validate-with-real before acting as if proven.

## Calibration hooks (falsifiable predictions to score when real data exists)

- Scroll-depth/exit spike inside the pinned stage vs adjacent sections.
- Engagement drop-off at the proof section footnote.
- Above-average page exits at the FAQ for IT-profile visitors.
- If a real named pharma case study replaces a sample card: measurable lift in demo bookings from this page.

Artifacts: reactor transcripts, synthesis, and verifier report in the session scratchpad (`.../scratchpad/reactions/`, `synthesis.md`); 21 scroll frames `frame-00..20.png`.
