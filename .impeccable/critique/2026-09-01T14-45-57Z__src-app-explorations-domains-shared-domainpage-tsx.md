---
target: Solutions/domain page template (Quality instance)
total_score: 18
max_score: 28
na_heuristics: 7,9,10
p0_count: 1
p1_count: 4
timestamp: 2026-09-01T14-45-57Z
slug: src-app-explorations-domains-shared-domainpage-tsx
---
Method: dual-agent (A: design-director review · B: deterministic detector + mechanical evidence), plus a six-seat synthetic ICP panel (isolated reactors → isolated synthesis → adversarial verifier, PASS-WITH-CAVEATS). Target: Solutions/domain template, Quality instance, rendered snapshot Sep 1 (worktree @3002; 17,363px ≈ 19 screens at 1440×900).

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Sub-nav appears at 40% depth, tracks 5 of ~13 sections, no CTA |
| 2 | Match System / Real World | 4 | Best-in-class regulated-industry vocabulary; checkable statutory clocks |
| 3 | User Control and Freedom | 2 | Auto-cycling hero (no pause), pinned section appropriates ~2 screens of scroll |
| 4 | Consistency and Standards | 2 | By-role section ships broken; banned count readouts in 07/09 while 05 suppresses them; off-brand film posters |
| 5 | Error Prevention | 3 | Data-derived filter chips can't filter to zero; emptied groups get SR explanation |
| 6 | Recognition Rather Than Recall | 2 | Sections 01 and 05 catalog the same territory with different names, 8 screens apart |
| 7 | Flexibility and Efficiency | n/a | Linear persuade surface; anchor nav is the expected accelerator and exists |
| 8 | Aesthetic and Minimalist Design | 2 | 19 screens, double catalog, 1.5-screen broken shield, 9px mono microcopy |
| 9 | Error Recovery | n/a | No error states on a static persuade surface |
| 10 | Help and Documentation | n/a | The page is its own documentation |
| **Total** | | **18/28** | **Acceptable (64%) — craft pulled down by one shipped defect + structural bloat** |

## Design Specificity Verdict
AUTHORED. One record (CAPA-1284, D. Okafor, Day 0→35) threads hero → trace → seal; regulatory literalism (483 = 15 working days, OAI posture, MDR 5–30 days) checks out; honesty engineered into the data layer (fact-gated null sections, hedged signed baseline, In-development labels). Three generic lapses: stock coexistence diagram, pattern-stock growth chain, imported Wistia poster art. Detector: 1 advisory finding (false positive — dashed wire strokes read as grid). No browser overlay run (headless capture used); console clean.

## Priority Issues
- [P0] By-role section ships broken: PersonaExplorer markup (itm-pex__head/icon/cw/chips/cta) has NO CSS anywhere in the repo — the industries/_shared rewrite drifted from itm.css (which styles the older variant's classes). The unconstrained 24px role glyph renders as an ~858×858 white shield filling 1.5 screens; the best persona copy on the site renders unstyled beneath it. Affects industries pages too. Panel: vpq skipped the section because of it; cio "tells me nothing"; qm "I wanted a screenshot of that queue, not an icon." Fix: restore itm.css-compatible markup or add the missing rules with a 48px icon tile; add a visual regression shot.
- [P1] All proof at 84% scroll depth, off-brand when it arrives: the signed 41%/$198,150 baseline — the single best fact owned — is at screen ~16; exec-pattern readers exit with zero numbers (coo transcript: read 2 screens, never saw any proof). Wistia posters (lime/purple/yellow) break the ink/blue system at the exact moment the page asks to be believed. Fix: one proof line above the fold; duotone/scrim poster treatment; consider the stat card out of the rail.
- [P1] 17-screen CTA desert: demo CTAs at screens 0 and ~18 only; sticky sub-nav carries none. Fix: sub-nav CTA + one quiet inline CTA at the section-03 conviction peak.
- [P1] Replace-vs-coexist self-contradiction (panel's #1 finding, 4/6 seats incl. both champions): 05 sells a QMS product and 03 says "holds the investigation itself" while hero+08 promise not to touch the QMS that passed your audits; em variant: PLM missing from the coexistence diagram while the footer sells a PLM product. Comprehension-level — survives a full read. Fix: one early, screenshot-able positioning statement (Ben's spec already defines the three-path answer + QMS selector); make 03/05/08 agree.
- [P1] Banned inventory-count readouts regressed in: "07 moments"/"02 moments" (DomainPage.tsx:419), "08 customer films" (domain-proof-films.tsx:71) — while 05 passes showCounts={false} for exactly this rule.
- [P2] Double catalog: 01 (18 workstreams) vs 05 (17 modules) map the same territory 8 screens apart; merging saves ~2.5 screens and a recall task. Also: raise 9px mono microcopy to ≥11px; AA contrast failures (--itm-faint 3.10:1 on white, warn label 2.97:1, ok tag 4.02:1 at 9px).
- [P3] Finish burrs: "CAPA CAPA-1284" stutter; clipped Draft chip; orphaned growth-chain arrow on wrap; coexistence aria-label promises write-back the diagram doesn't draw + chips duplicated; footer leaks "Solutions template · Quality instance"; ~400px dead padding in close; five identical "Open module →" links to one URL.

## Persona Red Flags
- Jordan (first-timer): no plain-English category sentence until screen ~15 ("coordination layer"); OAI/MRB/8D unglossed; exits in the dark catalogs.
- Casey (small-viewport skimmer): below 1080px the page deletes its proof textures (industry reg chips, coexistence wires+chips, hero clock float); stacked trace auto-advances every 5.2s while she reads; sub-nav's 5th tab hidden behind invisible-scrollbar overflow.
- Executive skimmer: headline lands, visual cycles, but the one number that would convert is at 84% depth — leaves with zero numbers.
- Panel (synthetic, draft personas, uncalibrated): 4×2 + 2×1, zero direct bookings; the page's real conversion event is the armed internal forward; coo and dc quote back their exact answers from sections they never reach (pure placement failures).

## Minor Observations
Sub-nav active underline is a single-edge accent line (house-rule spirit); aria-live on scroll-driven stage announces every pose; persona tabpanel lacks aria-labelledby; ARIA tabs pattern incomplete (no aria-controls/roving tabindex); inert "Talk to us" button; SR empty-state orphaned in default state and unannounced on filter; no forced-colors rules (focus ring invisible in WHC); coexistence wires vanish at 640px while the role=img label still describes them.

## Questions to Consider
1. Why does the reader get four taxonomies between the trace (03) and the proof it's real (09)? What if 03 dissolved directly into the signed baseline + named references?
2. Is the IA serving the buyer or mirroring the Notion schema (Themes DB → 01, Modules DB → 05)?
3. "Four ways in" is walked sequentially by everyone — would a true tabbed ingress (pick industry OR role OR moment) beat 7.5 screens of dark completeness?
