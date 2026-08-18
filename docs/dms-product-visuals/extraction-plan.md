# DMS product visuals — Arcade extraction plan

Plan for grounding the stylized product visuals on `/explorations/products/dms`
(modules + lifecycle sections) in the six DMS Arcades, per the Jul 23 call
decision: visuals are deliberately stylized (Asana idiom, never 1:1 screenshots),
but restyled from **real** flows — 5–6 reusable stylized screens.

## Source arcades

| # | Arcade | Steps | Covers |
|---|--------|-------|--------|
| A1 | [Create and Approve documents](https://app.arcade.software/share/97vz7kR7cL01p5CbNQE8) | 65 | Draft → classification → settings (numbering, periodic review, effective date) → Part 11 sign → APPROVED → signed PDF w/ QR |
| A2 | [Approve from the Homescreen](https://app.arcade.software/share/J24xnufajlJNKjRqMPVl) | 9 | Pending-approval tile → record → sign → APPROVED |
| A3 | [Create a Training Quiz](https://app.arcade.software/share/K1AESVTNqwBJwRBUMsEG) | 35 | Training on Document → AI question generation → quiz config → training records created |
| A4 | [Complete Pending Trainings](https://app.arcade.software/share/fpKoU6OliKzrdhQWlwck) | 25 | Trainings tile → training record → read SOP → take quiz → auto-scored |
| A5 | [Document Change Control](https://app.arcade.software/share/h0Qb7qfLR3QVJoLj06PC) | 32 | CC draft → risk analysis → affected doc → approval → auto implementation tasks → VERIFIED & APPROVED |
| A6 | [Create an Employee record](https://app.arcade.software/share/Vk7OT6oFhnXA1OXUNq2Z) | 14 | Employee details → training group → auto-created training records |

## Extraction pipeline (mechanical part — already proven)

Arcade share pages embed the full flow as JSON in `__NEXT_DATA__`
(`props.pageProps._serializablePublicFlow`): every step with its hotspot
caption, the app URL it was captured on, the element clicked, and a full-res
(2940×1594) CDN screenshot URL. No clicking through demos needed.

- `arcade-catalog.json` (this directory) is the parsed catalog for all six.
- Re-fetch any frame from the `url` field of a step; `pageContext` tells you
  which app surface it is (`/home`, `/conversation/<id>`).
- If Ben records new arcades, the same parse applies — treat arcades as the
  canonical, always-current source of product truth for the website.

## What the arcades establish (the accuracy contract)

**1. The record anatomy.** Every record — document, change control, training
record, employee — is a *conversation*: inbox list (left), conversation stream
where `automator` and `Unifize Assistant` post checklist updates (center), and
a collapsible checklist panel (right) with ALL-CAPS sections and count badges,
plus a red `Mandatory N` counter. This is Unifize's actual signature layout and
none of our current stylized mocks show it. Asana's stylized screens are still
recognizably Asana; ours must be recognizably Unifize → the conversation +
checklist anatomy is the reusable master screen.

**2. Real vocabulary.** Checklist sections on a document: DOCUMENT
CLASSIFICATION, RELATED DOCUMENT(S), FILE(S), DOCUMENT SETTINGS, SIGNATURE(S),
SIGNED DOCUMENT, REVISION, TRAINING, RELATED RECORD(S). State chips: DRAFT,
PENDING, NEEDS DEPARTMENT APPROVAL, APPROVED, EFFECTIVE. Change-control
lifecycle (from the real status menu): DRAFT → REVIEW → CHANGE APPROVED →
IMPLEMENTATION COMPLETE → VERIFIED & APPROVED (+ CHANGE REJECTED, CANCELLED).
Buttons: "Request Approval", "+ Add Signature", "Confirm and sign",
"Generate Questions (Beta)", "View all fields", "Archive this conversation".

**3. Real moments worth marketing** (each maps to a claim already on the page):
- Part 11 sign: "Apply your signature" dialog — Approval/Rejection type,
  email + password re-authentication, comment, system-generated signature.
- Signed PDF cover sheet: logo, QR code to the live record, Document
  Classification table, Revision History table, signature block with
  Approved By / Approved Date / Signature ID.
- Automation as an actor: automator assigns approvers from the Department,
  opens training records per person on release (`Training Rec… #294 PENDING`),
  creates implementation tasks from the change checklist, nudges
  "@Victor Smith the implementation here is complete…".
- AI: quiz questions generated from the SOP with special instructions,
  suggested-answers table, auto-scoring ("Score (%) · 60").
- Revision numbering scheme: `Document #63/1C` → `#63/2` (revision suffix).

## The 5–6 reusable stylized screens (the call's contract)

| Screen | Grounded in | Used by |
|--------|------------|---------|
| S1 Record view (conversation + checklist) | A1 s6–s47, A5 s6–s20 | Modules 1+2, lifecycle Draft/Review, flow scenes |
| S2 Part 11 signature dialog | A1 s51, A2 s5 | Module 2, lifecycle In Approval |
| S3 Signed render / cover sheet w/ QR + revision history | A1 s59–62 | Lifecycle Effective/Superseded, proof moments |
| S4 Training quiz (AI gen + take + score) | A3 s11–15, A4 s7–23 | Module 3, lifecycle Effective |
| S5 Home tiles (pending approvals, trainings due) | A2 s1, A4 s2, home charts | PF-29 "find the current version", QMS/MES reuse |
| S6 Cascade panel (implementation tasks + training records auto-created) | A5 s23–30, A6 s9–12 | Module 2+3, lifecycle Effective |

All six re-drawn as JSX/CSS fragments in the existing `stylized/` idiom — no
screenshots ship to the site; Arcade CDN URLs stay in this doc only.

## Accuracy deltas vs current stylized mocks

- **StyDocControl**: register table + revision trail is invented idiom. Rework
  rows as inbox-style record cards (state chip, `automator: Filled a
  checklist`, record-type tag) and anchor one open record with real checklist
  section names. Keep fictional pharma dataset (SOP-118 etc.).
- **StyChangeControl**: approval-route card survives, but adopt the real CC
  states, the linked affected-document revision (`#63/2`), auto-created
  implementation tasks with COMPLETED chips, and the automator nudge. The
  "meaning of signature" facts belong to the PDF signature block (S3), not the
  route card.
- **StyTraining**: matrix survives (training groups are real), add the quiz
  fragment: AI-generated question with options, passing score, attempts, and
  the auto-computed score. Per-person training records with due dates are the
  real evidence of "the change reaches the people".
- **Lifecycle scenes**: Draft (automator assigns owner/approvers — real; keep
  template chip), In Approval (swap invented facts for the restyled sign
  dialog), Effective (training records open per person — real), Superseded
  (ground trail in the `#63/1C → #63/2` scheme + Revision History table),
  Obsolete (ground on "Archive this conversation" + status menu; see gaps).

## Gaps — no arcade covers these (ask Ben/Sachin)

1. Documents library / register view (StyDocControl's premise) — need a grab
   of the actual library, or keep register as declared marketing shorthand.
2. Review stage with comments/redlines on the record (lifecycle "In Review").
3. Periodic review execution (a module 1 bullet + PF-30).
4. Obsolescence / copy retrieval (lifecycle "Obsolete").
5. Operator "find the current version" (PF-29) — QR scan on the floor is
   implied by A1 s62 but not shown end-to-end.

## Sequence

1. Extend frame pulls to all steps; annotate the six flows against the S1–S6
   manifest (this doc).
2. Rework `stylized/stylized-mocks.tsx` per the deltas above, in the
   `/dms/stylized` sandbox route.
3. Review pass with Ben via the DMS review hub (vocabulary check: are the
   fictionalized labels still true to product?).
4. Promote: swap `STYLIZED_MODULE_MOCKS` / `STYLIZED_LIFECYCLE_MOCKS` into the
   main DMS page's ModuleExplorer + LifecycleExplorer; flows scenes index by
   station so they inherit automatically.
5. Reuse S1/S5/S6 skeletons on QMS/PLM/MES with their own record types (the
   "5–6 reusable screens" promise).

Fictional-data rules: never the trial-org data (JLL DMS TRIAL ORG, Victor
Smith, Facility Maintenance Procedure) — keep the page's pharma-flavored
dataset (SOP-118 cleaning validation, R. Mehta). Real structure, real
vocabulary, fictional content. Design-system rules apply: square corners, warm
grey field, no one-sided colored borders, Unifize blue accents.
