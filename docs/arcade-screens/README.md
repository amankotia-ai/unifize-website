# Arcade screens: ground truth, engine additions, audit

26 Sep 2026. Source: the four narrated product recordings shared on 16 Sep 2026
(`~/Downloads/WhatsApp Video 2026-09-16 at 07.59.18*.mp4`, `07.59.19*.mp4`),
re-read frame by frame and re-transcribed.

## 1. What the AI actually is (from the recordings, nothing added)

One pattern, four buttons, all tagged **(Beta)** in the product:

| Checklist field label | Button | What comes back |
|---|---|---|
| Generate Problem Description | Generate Problem Description (Beta) | Writes the Problem Description rich-text field directly (Summary, What happened) |
| Generate Why N | Generate Why N (Beta) | A suggestion: one "Why N (Choose only one)" row with three options |
| Generate Risk analysis and CAPAs | Build with AI (Beta) | A suggestion: Root cause analysis, Risk, CAPAs Identification, each record with an Embedded field / Suggested Value sub-table |
| Assess impacted documents | What else does this change affect? (Beta) | A suggestion: one "AI impact summary" row, a numbered list of procedures |

How a suggestion looks and behaves:

- The button is full width in the checklist, under its field label, with a wand mark. It is grey until it is pressed.
- The suggestion is posted in the record's thread **under the name of the person who pressed it**: "<name> asked AI suggestion for <field label>". It is not posted as the Unifize Assistant.
- The body is a table with the columns Field label and Suggested Value, and a tick box on every row. "Choose only one" options each get their own box inside the value cell.
- The only action is **Add to Checklist**. It stays greyed until a box is ticked.
- Nothing lands until a person adds it. After Add to Checklist:
  - text fields fill (AI impact summary, Root cause analysis);
  - linked fields gain records (Why (Level n) #1, Risk #7, CA #1072/#1073, impacted document records);
  - each new record appears in the inbox as its own conversation, with "No Owner" and "Pending" until someone assigns it.
- Approval requested: the Unifize Assistant tags the approver on the record ("@Brandon Wu this is ready for approval", "@Signatories, the investigation is complete. Need your approval to proceed.").

What the recordings do not show, and what the site no longer shows:

- an "AI reads this" tag on fields;
- per-row "why" chips on suggestions;
- an "Accepted" or "Linked" badge;
- "Accept into the record" or "Edit first" buttons;
- a replayable "what it read" trail.

The narration says the AI reads the reason for change and the impact answers. That claim can go in page copy, never in the UI.

## 2. Engine additions (`products/_shared/arcade/`)

`arcade.tsx` + `arcade-screens.css`, all backward compatible.

| Surface / state | API |
|---|---|
| AI suggestion message (product-exact) | `assist: { asker?, field, rows[{label, value? \| list? \| options? \| records?, picked?}], pressed? }` |
| Checklist input types, old styling kept | field `input: text \| number \| select \| date \| rich \| file \| user`, `placeholder`, `lines` (rich, `# ` headings) |
| New checklist kinds | `records` (embedded records: state chip, reminder bell, owner, date, View all fields), `signature` ("+ Add Signature 1" slot) |
| Checklist interactions | `checklistPick` (picklist or linked-field search open, "+ Create"), `checklistFilled` (fresh wash), `checklistScroll` (panel scrolled to the field) |
| Persona home with charts | `world.home { section, cards[{link, updated, chart}], quickStart, lists, shortcuts }` + step `homeCard`, `chartHover` |
| Chart drill-down report | `world.report` / step `report`, focus `"report"` (chart with hovered column and tooltip, CHART / SAVE AS / SAVE CHANGES, results bar, Filters applied, table, Back to Report) |
| Saved dashboards page | `world.dashboards { list, active, by, cards }`, focus `"dashboards"` |
| Record quick-view modal | step `modal { over, noun, id, title, state, reminder, owner, participants, due, thread[], composer }`, focus `"modal"` |
| Thread lines in the modal | `date`, `updates` (View / Viewing N updates), `event` ("You removed Charlie Johnson"), `field` (You updated Month), `message` (assistant reminder + "Turn off reminders") |
| Start-new dialog | step `startNew { noun, title, owner, participants }`, focus `"start"` |
| @mention composer | step `composer { mention, text, picker? }`, focus `"mention"` |
| Inbox | `world.inboxFilter` ("Document (1)"), step `inboxNew` (new records land on top) |
| Charts | `ArcadeChart` bars (single indigo series with unit, or stacked series) and donut |
| Cut frames | pages set `--stx-cut-l` / `--stx-cut-r` on the camera; every page and dialog draws inside the cut |

## 3. Audit: what was repeating (before this pass)

375 arcade step slots across 30 public pages. The five most repeated surfaces:

1. The sealed decision-trace history card, 26 slots. It closes every solution page and every industry trace.
2. The review decision card, 49 slots.
3. The "... bound" trace card, 44 slots.
4. The Part 11 "Apply your signature" dialog, 38 slots on 23 pages.
5. The opening record/print card.

Two more patterns:

- All 13 solution pages show the **same five poses in the hero and in the 03 journey**.
- 10 of 11 dashboard poses drew the same generic reports page (KPI row plus skeleton charts).

## 4. Placed in this pass

| Page | Section | Was | Now |
|---|---|---|---|
| Platform | 04 Unifize AI | invented AI card and trail | product-exact: button, suggestion, Add to Checklist, nudge; the trail shows only the thread |
| Platform | 02 gap, Why | invented card | Generate Why 3 suggestion (choose only one), Why record in the inbox |
| Home | hero, change tab | invented AI card | product-exact AI (the platform confirm pose) |
| QMS | lifecycle PF-6 | invented AI cards | Generate Problem Description (writes the field), Why 3 pick, Build with AI (Root cause, Risk, CAPAs) with records and owners |
| QMS | hero "Find the cause" | review card | PF-6 Why pick (AI) |
| QMS | hero "Measure it" | generic reports | quality manager home, CAPA aging hovered |
| QMS | hero "Capture it", PF-5 s1 | record card | Start new Non-conformance dialog |
| QMS | module Audit | generic reports | Findings and CAPA dashboards page |
| QMS | lifecycle PF-2 s7 | generic reports | Open Audit Finding by Severity drilled to AUD-12 majors |
| DMS | hero "Measure it" | generic reports | Document Control dashboards page |
| DMS | module Change Control | builder (repeat of the hero) | AI suggestion, Add to Checklist greyed |
| DMS | module Training | generic reports | Training Group record: Training Record(s), Completed / Pending with the reminder bell |
| DMS | lifecycle PF-18 s7 | home tiles | Documents Pending Review by Owner, drilled |
| DMS | lifecycle PF-30 s6 | home tiles | document controller home, periodic reviews by month |
| DMS | lifecycle PF-28 s1 | invented AI card | product-exact AI |
| Persona QM | 03 s7 | record dashboard table | CAPA-618 opened over the drilled chart: the reminder and "@M. Osei any update on this" |
| Solution: change-control | hero | same 5 poses as the journey | Start new Change Control, then the AI suggestion, then the assistant tags the approver |
| Solution: change-control | journey beat 2 | "Impact assessment bound" trace | AI impact, added as records |
| Solution: quality | hero | same 5 poses | QM home, then the CAPA aging drill, then the CAPA modal with its reminder |
| Solution: document & records | hero | same 5 poses | controller home, then the pending-review drill, then @mention to the approver |
| Solution: training & competency | hero | same 5 poses | Training dashboard, then the Training Group records, then the overdue Training Record tagged |
| Industries: chemicals, labs | AI step | invented AI card | product-exact AI; labs step 1 shows the Westgard rule picklist open |
| All pages | checklists | text boxes only | real input types on 41 fields (rich, select, number), old styling kept |

## 5. Next, recommended (not yet placed)

Ordered by how much repetition each removes.

1. **Nine solution heroes still repeat their journey.** Give each one a 3-pose manager view:
   - **Compliance** (CSV-0912): Findings and CAPA dashboards, then findings by severity drilled, then the finding opened with its reminder.
   - **Supplier management** (CAPA-2148): a "[CXO] Supplier Management" dashboard (the recording lists it), then supplier NCs by supplier drilled, then the SCAR tagged.
   - **Operations** (PH-0331): hold aging by line, drilled, then the hold record modal.
   - **Post-market** (FSCA-0417): complaints by month by product, drilled.
   - **Regulatory affairs** (MDR-0912): reportable events due by week, drilled, then the reminder.
   - **Procurement, supply chain, customer management, NPD:** the start dialog for their record plus one drilled chart.
2. **Industry traces all close on the sealed history card.** On half of them, replace beat 5 with the record rolling into the manager's chart (report drilled to that record), or with the assistant's reminder in the record modal.
3. **PLM "Measure it" and MES "Watch it"** still draw the generic reports page. Move them to the report page for their own record type, for example requirement coverage by product, or open work orders by line drilled to WO-9021.
4. **QMS module Non-conformance** could show Generate Problem Description. It is currently a capture card that repeats PF-5.
5. **States built but not used yet:**
   - the mention picker with groups ("All, every participant of the conversation", "01. CXO, 7 members");
   - the drilled inbox ("Document (1)");
   - a linked-field search with "+ Create".

   Good homes for these: DMS PF-4 comment, and DMS PF-18 s1.
6. **Pages that should not get AI:** PLM, MES, and industry records other than NC or document change. The recordings only show AI on a non-conformance and on a document change control.
