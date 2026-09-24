```json
{
  "personaId": "quality-manager-site",
  "arrivalContext": "My CAPA backlog will not close and the last audit wrote us up on training records; I searched 'CAPA closure time' and landed here to see whether this tool chases people so I do not have to.",
  "home": {
    "firstImpression": "\"Closed on time. Defensible at audit.\" is my job in six words, and there is a real record window right under it, so I kept scrolling.",
    "comprehension": "A layer that runs CAPAs, change orders, and document approvals as one thread per record, with checklist, evidence, and Part 11 sign-off on it, and it sits next to the systems we already have. Or it is a QMS/DMS/MES/PLM suite I would buy instead of my eQMS. The page says both, and I can't tell which one it is.",
    "resonance": 2,
    "whereAttentionPeaked": "The coordination-tax card 'CAPAs take 90+ days to close', with the CAPA-0091 tracker showing 'QA director sign-off · 18d waiting'. That is my Monday. The next peak was the CAPA #612 mock in the product suite: action plan tasks with owners and dates, an effectiveness section, and 'Closes only on verified effectiveness'.",
    "whereAttentionDropped": "The industries tabs and the customer-proof reel. I'm already sold that it's regulated manufacturing, and the thumbnails are marketing banners I'd have to click into. The hero window also shows a change control with an AI 'what else does this change affect' box. It's nice, but it isn't the CAPA I came for.",
    "firstClick": "Explore solution"
  },
  "platform": {
    "firstImpression": "Headline is abstract ('Your work crosses teams. Your systems don't.'), but the six-tab strip under the window (home screen, inbox, checklist, seal, process builder, dashboard) is the product tour I actually want.",
    "comprehension": "This page moved me toward 'layer on top'. 'Your systems stay', the FAQ answer 'Do we have to replace our ERP, PLM, or eQMS? No.', and the ERP-context NC-204 record make it read as something that sits beside my eQMS. The process builder showed reminders and approval order set by quality with no code. A tab says 'It chases, so nobody has to'. Then the proof reel headlines 'Moved off MasterControl', which is a replacement story, so I'm back to not knowing.",
    "resonance": 2,
    "whereAttentionPeaked": "The Gap section. It shows a defect today (ERP, email, Teams, Excel tracker, nothing linked) next to one NC record with photos, part, and work order attached and 'nothing re-keyed', across step tabs that run from defect to closure. The dashboard pose ('EVIDENCE COMPLETE 98% at sign-off', 'TIME SPENT WAITING 9%') is also exactly what I'd show my VP.",
    "whereAttentionDropped": "'What the tax turns into': 30% of R&D spend, $10M recalls, $1.5T stalled production. Those are industry-wide numbers I can't take to anyone, and they aren't about my site. After that the stack isometric and the long standards grid got skimmed. A wall of acronyms only confirms 'yes, 13485 is in there'."
  },
  "concernCoverage": [
    {"concern": "PP-1 Status-chasing across CAPA threads: \"spend daily cycles asking the next owner where a CAPA stands because the record does not surface its own state.\"", "source": "notion PPS-2 Pain Points (PP-1)", "home": "partial", "platform": "partial", "evidence": "Home names the pain ('The other eleven are spent chasing sign-offs, evidence, and owners', '18d waiting'). Platform has the 'It chases, so nobody has to' tab and 'reminders' in the builder. Neither shows the chase itself: no overdue reminder firing, no escalation, no 'who is it waiting on' view on a CAPA."},
    {"concern": "PP-2 Evidence not bound to commit points: \"When the audit asks for evidence at the commit point, the operator rebuilds it.\"", "source": "notion PPS-2 Pain Points (PP-2)", "home": "partial", "platform": "addressed", "evidence": "Home CAPA #612: 'Every action owned and dated · evidence lands as each completes'. Platform checklist: 'Data lands on it as the work happens', NC-204 with photos and readings attached from the line, 'EVIDENCE COMPLETE 98% at sign-off'."},
    {"concern": "PP-5 Audit-day evidence pull collapses to a manual rebuild / \"Every audit, we spend three weeks just getting the packets together.\"", "source": "notion PPS-2 Pain Points (PP-5) + PES-3 discovery quote", "home": "partial", "platform": "partial", "evidence": "Claimed repeatedly ('Defensible at audit', 'the record you show an auditor is the record the work created', '40 min to pull one controlled document'). Nobody shows me the audit side: pulling a CAPA packet or an audit-trail export for an inspector."},
    {"concern": "PP-41 Training matrix is the first audit pull and the last system updated", "source": "notion PPS-2 Pain Points (PP-41) + persona file pains (side spreadsheets)", "home": "partial", "platform": "partial", "evidence": "Home DMS card: 'A revision going effective assigns the retraining itself'. Platform CC-2148 closure: 'Training assigned · 12 operators · due in 7 days'. Assignment is shown. The training-status view an auditor would pull is not."},
    {"concern": "PP-4 Repeat non-conformance pattern recognition fails: \"The same defect type closes again three months later with a different CAPA number.\"", "source": "notion PPS-2 Pain Points (PP-4)", "home": "partial", "platform": "absent", "evidence": "Home dashboard pose: 'RECURRENCE 0 since action · 90 days', 'Recurrence · PRT-4412', and the CAPA's Effectiveness 'Recurrence check'. Platform doesn't come back to it."},
    {"concern": "\"We already have a QMS.\" / \"Does it work with our existing QMS? (Coexistence, not displacement.)\" / \"Is this replacing my QMS or sitting on top of it?\"", "source": "notion PES-3 Objections + Evaluates; persona file", "home": "partial", "platform": "partial", "evidence": "Platform answers it directly ('Your systems stay', FAQ 'No. Your systems of record stay authoritative'). But home sells a QMS product ('I am evaluating a system' → Quality management QMS) and platform proof headlines 'Moved off MasterControl' and 'A collaborative eQMS live in 4 weeks'. Those are replacement stories, so the message contradicts itself."},
    {"concern": "\"Who does the migration and configuration work? Because it will be me.\" / \"My team is too busy to implement something new.\"", "source": "persona file objections + notion PES-3 Objections", "home": "partial", "platform": "partial", "evidence": "Proof captions 'Configured in house, no IT tickets', 'live in weeks', 'live in 4 weeks'. Platform process builder: 'configured by quality, not coded by IT'. That last line means it's me doing the configuring. Nothing says who migrates open CAPAs and documents, or how many hours of my team it takes."},
    {"concern": "\"Another system means another place to check; my team already ignores two inboxes\"", "source": "persona file objections", "home": "absent", "platform": "partial", "evidence": "Every product mock is a 'My Conversations 24' inbox, which looks like inbox number three. Platform 'Everyday tools · keep being used' and 'Decisions captured' hint that email and Teams feed it, but I never see how a reply from Outlook lands on the record."}
  ],
  "objectionsRanked": [
    "Is this replacing my eQMS or sitting on top of it? The home QMS card and 'Moved off MasterControl' say replace. The platform FAQ says layer.",
    "It'll be me configuring and migrating. The pages never say how many hours that takes or who does the moving of open CAPAs.",
    "Another inbox. The mocks are all conversation lists, and I didn't see my people staying in Outlook and still landing on the record.",
    "Show me it chasing. 'It chases, so nobody has to' is a tab label, and I never see an overdue reminder or escalation on a CAPA.",
    "The big numbers ($1.5T, $10M, 30% R&D) are not a number I can take upstairs. The 19 hrs per NC is closer, but it's Unifize's number, not mine."
  ],
  "missing": [
    "One screen showing a CAPA overdue: the reminder that went out, who it's waiting on, the escalation, all without me sending an email.",
    "A plain one-liner near the top of both pages: 'Keep your eQMS. Unifize runs the CAPA/change workflow and links back.' Or the honest opposite. Either way, stop saying both.",
    "An implementation line in my terms: who configures, who migrates open records, typical weeks and hours from our team, and whether it's validated for Part 11/13485 use.",
    "The audit-side view: pulling a CAPA's full trail or a training status report for an inspector in minutes.",
    "The customer films labelled with the pain they fixed in my vocabulary (CAPA backlog, audit prep time), not just banner headlines."
  ],
  "demoWillingness": {
    "score": 6,
    "anchor": "6-7: would book the 30-minute walkthrough if one named condition were met",
    "whatWouldMakeItAYes": "Confirmation that the walkthrough runs one of MY overdue CAPAs alongside our existing eQMS (no rip-and-replace) and shows the automatic chasing. The 'You bring the process that hurts' format is close, but it needs to say it'll work next to the eQMS we keep.",
    "whoYouWouldBringOrForwardTo": "Forward the platform page and the Biovation mock-recall film to my VP Quality, and pull in our CAPA coordinator for the walkthrough."
  },
  "nextAction": "explore-solution-pages",
  "verbatims": [
    "(synthetic) \"'QA director sign-off, 18 days waiting'. Yes, that's the one. Now show me what your tool does on day three of that wait.\"",
    "(synthetic) \"Page one sells me a QMS, page two says keep my QMS, and the video says they left MasterControl. Which is it?\"",
    "(synthetic) \"'Configured by quality, not coded by IT' is lovely until you realise quality is me.\""
  ],
  "confidence": "high: CAPA backlog, chasing, and audit evidence are this persona's core triggers, and both pages lean directly into them."
}
```

## Honest read (as the Quality Manager)

**What earned trust:** The homepage names my problem in my own words ("CAPAs take 90+ days… chasing sign-offs, evidence, and owners") and shows the product, not a stock photo. The CAPA #612 record, with owned and dated actions, an effectiveness window, and a Part 11 sign-off pending, looks like a real workflow. On the platform page, the Gap section was the most convincing thing I saw: six tools on one side, one NC record with the ERP context attached on the other. The walkthrough offer ("you bring the process that hurts… in the product rather than on slides") is the right offer for someone like me.

**What cost trust:** Mixed signals on replacement. Home routes me to "evaluating a system → QMS", the platform FAQ says my eQMS stays, and the proof reel leads with "Moved off MasterControl". "It chases" is a tab label, never a shown behaviour. The $1.5T and $10M stat band is analyst-deck filler that my VP would wave away. The long standards grid adds scroll but no confidence.

**Redundancy:** The platform page repeats the 54-of-75 tax grid and the 19-hours line almost verbatim, repeats the same customer reel with the same Harmonic and Biovation cards, and closes with the same "Bring the process that hurts" CTA. The second time through it felt like padding.

**Did it get me into a conversation?** Nearly. I'd go to the Quality solution page first. I'd book the 30 minutes once someone confirms it runs beside our eQMS and shows the chasing on a live CAPA.
