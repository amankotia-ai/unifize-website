```json
{
  "personaId": "document-controller-pharma",
  "arrivalContext": "Came from a Google search for document control software under 21 CFR Part 11, after an inspection observation on SOP version control: the line was running a superseded revision.",
  "home": {
    "firstImpression": "The headline talks about CAPAs, change orders and design reviews, not documents, but I can see a 'Controlled document' tab in the hero and 'Document management / DMS' in the product list, so I know where my door is.",
    "comprehension": "A regulated-work platform for quality, change and supply-chain work. One of its four products is a DMS that handles controlled documents, versioning and e-signatures 'from draft to obsolete', and when a revision goes effective it assigns the retraining. The big story is that approvals get stuck between teams.",
    "resonance": 2,
    "whereAttentionPeaked": "The 'Three copies of one SOP claim to be current' card (v3.2 in the system, v3.1 on the share, laminated v2.8 on Line 2, and 'Which one do I follow?'). That is my inspection finding, almost word for word. The DMS product tile line 'A revision going effective assigns the retraining itself' came a close second.",
    "whereAttentionDropped": "At the coordination-tax assessment block. The '54 of 75 steps' grid is about one non-conformance through to CAPA closure, which is the Quality Manager's problem, not mine. Industries, customer films and resources were a skim because none of them is about documents.",
    "firstClick": "Document management"
  },
  "platform": {
    "firstImpression": "This is the platform thesis I was worried about: 'Your work crosses teams. Your systems don't.' followed by a defect journey, recall dollars and AI. Document control shows up only as a line item inside other people's records.",
    "comprehension": "It confirmed that DMS sits on the same layer as QMS, MES and PLM, and that sign-off is a Part 11 signature with its meaning attached. It also showed a process builder where quality, not IT, sets approval order and reminders, and a change record that lists affected documents (SOP-118) and assigns training to 12 operators. It added nothing on the document lifecycle itself: no periodic review, no obsolescence, no distribution or controlled copies. 'You come for a product. The platform comes with it.' tells me my module is the way in, not the point.",
    "resonance": 1,
    "whereAttentionPeaked": "The six-step hero rail: 'The seal: Sign-off is a Part 11 signature, with its meaning attached' and 'The process builder: Fields, approval order and reminders, set by your team. No code.' Routing and reminders are my daily work. Also the 21 CFR Part 11 and EU Annex 11 tiles in the compliance grid.",
    "whereAttentionDropped": "Immediately at 'What the tax turns into' ($10M recalls, $1.5T stalled production, 30% of R&D spend). That is strategy-deck language, and I scrolled past the defect-through-six-tools section and the AI section looking for anything about SOPs."
  },
  "concernCoverage": [
    {
      "concern": "PP-37 SOP version drift between Notion, file share, and shop floor: \"The 'current' version is a function of where you look.\"",
      "source": "notion PPS-5 Pain Points (PP-37, Critical)",
      "home": "addressed",
      "platform": "partial",
      "evidence": "Home: the Document & Records Control card 'Three copies of one SOP claim to be current ... The current version depends on where you look', plus the DMS tile 'One current version, everywhere' and the hero doc tab 'The screen shows the master record, not a downloaded copy'. Platform: only an inbox line in the mock-up ('SOP-118 · Rev D effective') and 'Rev C superseded → Rev D approved' inside a change record."
    },
    {
      "concern": "PP-36 Late training cascade after change closure",
      "source": "notion PPS-5 Pain Points (PP-36, High); persona file decision criteria 'Training tied to revisions out of the box'",
      "home": "addressed",
      "platform": "partial",
      "evidence": "Home: DMS tile 'A revision going effective assigns the retraining itself.' (the one sentence I would quote to my QM). Platform: the change-control checklist mock-up shows 'Training assigned · 12 operators · due in 7 days', but it is tied to a change, not to a document revision, and there is no copy on it."
    },
    {
      "concern": "PP-40 Effective-date governance ambiguous at point of use",
      "source": "notion PPS-5 Pain Points (PP-40, High)",
      "home": "partial",
      "platform": "absent",
      "evidence": "Home: the hero 'Controlled document' tab shows it well ('Opened the controlled document at point of use', 'Effective date 02 Jul 2026', a controlled print with 'Reason for print', 'Copy owner: Packaging line 2', 'Expiry and recall'), but it is the fourth tab. Change order loads first, so I only see it if I click. Platform: nothing on point-of-use access."
    },
    {
      "concern": "PP-33 Change effectivity not propagated to the production line before parts ship: \"The first the operator hears about the change is when a finished part is rejected.\"",
      "source": "notion PPS-5 Pain Points (PP-33, Critical)",
      "home": "partial",
      "platform": "partial",
      "evidence": "Home hero (Change order tab): AI flags 'Two documents still state the torque this change replaces' (WI-092, FRM-201). Platform: CC-2148 lists 'Affected documents SOP-118, DWG-2201' and 'Production readiness · Line 2 briefed'. The pain is shown in both places, but only as a change-control story and a beta AI button, never as a document-control guarantee."
    },
    {
      "concern": "PP-38 Document approval queue invisible until SLA breach",
      "source": "notion PPS-5 Pain Points (PP-38, Medium); persona file pain 'Signature loops stall for two weeks'",
      "home": "partial",
      "platform": "partial",
      "evidence": "Home: 'QA director sign-off · 18d waiting' appears, but on a CAPA card, not a document approval. Platform: the dashboard shows 'TIME SPENT WAITING 9%', the process builder offers 'Reminders', and the AI section says 'It chases, so nobody has to'. None of this shows a document approval queue or a routing slip closing."
    },
    {
      "concern": "PP-39 Periodic review of controlled documents stalls without owner accountability: \"Audit finding is predictable.\"",
      "source": "notion PPS-5 Pain Points (PP-39, Medium)",
      "home": "partial",
      "platform": "absent",
      "evidence": "Home: one tiny inbox line in the hero mock-up ('Water system review · Periodic review due Friday') plus a footer link 'Periodic Review & Data Governance'. Platform: periodic review is never mentioned."
    },
    {
      "concern": "PP-52 Labeling changes propagate inconsistently to packaging and inserts",
      "source": "notion PPS-5 Pain Points (PP-52, High)",
      "home": "partial",
      "platform": "absent",
      "evidence": "Home: 'WI-092 · Packaging / Line clearance' and a controlled copy for packaging line 2 appear in the hero mock-ups, but nothing mentions labels or inserts. Platform: nothing."
    },
    {
      "concern": "\"I searched for document control; is this a DMS or something bigger I did not ask for?\" / \"Big-platform pitches usually mean my module is an afterthought\"",
      "source": "persona file objections",
      "home": "partial",
      "platform": "absent",
      "evidence": "Home: DMS is one of four equal product tiles and a 'Document management' row under 'I am evaluating a system', so routing works. But the hero subline names CAPAs, change orders and design reviews, never documents. Platform: 'You come for a product. The platform comes with it.' and 'Three bands on one governed foundation' confirm the objection instead of answering it."
    }
  ],
  "objectionsRanked": [
    "Neither page shows the document lifecycle end to end (revision, routing, approval, distribution, periodic review, obsolete). I get one line, 'from draft to obsolete', and the rest is change orders and CAPAs.",
    "The platform page says my module is the way in to a bigger sale ('You come for a product. The platform comes with it.'). I worry DMS is thin compared with a dedicated doc-control tool.",
    "Part 11 is claimed ('The seal', compliance tiles, a collapsed FAQ question), but I cannot see audit trail, signature manifestation or validation support. Our compliance lead will ask about validation first.",
    "The walkthrough offer is built around 'A CAPA, a change order, a supplier approval'. It does not say they will run a document revision with retraining, so it does not read as a demo for me.",
    "Periodic review, the thing that becomes the predictable audit finding, has no presence beyond a footer link."
  ],
  "missing": [
    "A document-controller door on the homepage: one line or card like 'Controlled documents: revision to obsolete, training tied to every revision', linked straight to DMS, above the fold or in the hero subline",
    "Make the 'Controlled document' hero scene reachable or first for document-intent visitors. It is the strongest thing on the site for me and it sits behind the fourth tab",
    "On the platform page, show one document revision walking the stack (routing → Part 11 approval → effective date → training assigned → old revision obsoleted) instead of only a defect",
    "Open the Part 11 FAQ answer, or add a proof point for audit trail and validation (a validation package or IQ/OQ support)",
    "A pharma or lab customer quote about SOP control or periodic review (the films are about NC closure, mock recall and CAPA)"
  ],
  "demoWillingness": {
    "score": 4,
    "anchor": "4-5 would take the assessment or watch a customer film, not a sales call yet",
    "whatWouldMakeItAYes": "The walkthrough explicitly offering to run one of my SOP revisions end to end (routing, Part 11 approval, effective date, automatic retraining, superseded copy withdrawn) instead of a CAPA or change order.",
    "whoYouWouldBringOrForwardTo": "Forward the DMS page (not the platform page) to my Quality Manager. If it goes further, bring the CSV/compliance lead for Part 11 and validation."
  },
  "nextAction": "explore-product-pages",
  "verbatims": [
    "(synthetic) \"The three-SOP card is literally my 483. Now show me the DMS page, not a recall statistic.\"",
    "(synthetic) \"'A revision going effective assigns the retraining itself': if that is true out of the box, that is the sentence I bring to my QM.\"",
    "(synthetic) \"'You come for a product, the platform comes with it.' That is exactly what I was afraid of. Where is periodic review?\""
  ],
  "confidence": "medium: the persona file is explicit that this reader routes to the DMS page and treats home and platform as corridors. The reaction to those two pages is well grounded, but the verdict really depends on the DMS page, which was not in the stimulus."
}
```

## Honest read (as the document controller)

What earned trust: the homepage speaks my language in two places. The "Three copies of one SOP" card (v3.2, v3.1, laminated v2.8, "Which one do I follow?") is my inspection finding. The DMS tile's "A revision going effective assigns the retraining itself" is the one capability I screen every vendor for. The hero's Controlled document tab (point-of-use master record, effective date, a controlled print with reason, owner and expiry) is the best document-control visual I have seen on a vendor site, but I had to click the fourth tab to find it. Routing worked: "Document management" was one click away, and that is all the homepage owes me.

What cost trust: the hero subline lists CAPAs, change orders and design reviews and never mentions documents. The platform page then does what I feared. It is a thesis about cross-team work, recall dollars, a defect crossing six tools and AI, and it says outright that "You come for a product. The platform comes with it." Document control appears only as supporting detail inside change and CAPA records. Periodic review and obsolescence never appear on the platform page.

Redundant: the 54-of-75 coordination grid and the customer reel appear on both pages. Contradiction: the homepage presents DMS as a product in its own right with "One current version, everywhere", while the platform page frames every product as a doorway into the platform. Part 11 gets a stronger treatment on the platform page (The seal, the compliance grid), but the FAQ answer is collapsed.

Together, the two pages did not get me into a conversation. They got me to the DMS page, and whether I book will depend on that page.
