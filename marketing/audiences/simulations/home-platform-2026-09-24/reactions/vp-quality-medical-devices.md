# Reactor: vp-quality-medical-devices (synthetic, 2026-09-24)

```json
{
  "personaId": "vp-quality-medical-devices",
  "arrivalContext": "Post-inspection pressure (a rough audit plus a management review we rebuilt by hand in Excel); my Quality Manager put Unifize on a three-link shortlist next to MasterControl and Greenlight and I am giving each one a minute.",
  "home": {
    "firstImpression": "\"Defensible at audit\" in the hero is the right promise for me, and the first screen names CAPAs, change orders and design reviews, so this is at least quality-shaped and not a generic workflow tool.",
    "comprehension": "A layer that runs CAPA, change control, document control and design review work across functions in one governed record, sold as four products (QMS, DMS, MES, PLM) on one platform, pitched around the hours lost to chasing sign-offs. I am not sure whether it replaces my eQMS or sits next to it: the suite section says 'alongside the systems you already trust', but it also sells a QMS.",
    "resonance": 2,
    "whereAttentionPeaked": "The Medical Devices industry card ('A complaint turns reportable and the 30-day MDR clock starts' with 21 CFR 820 / ISO 13485 / EU MDR chips) and the Quality performance dashboard mock (on-time closure, recurrence, avg closure, 'No export, no reconciliation'). That is my management review and my regulators, in my words.",
    "whereAttentionDropped": "The coordination tax band with its six problem cards and the 54-of-75 grid. By the third card it reads as the same argument again, and '19 hrs per non-conformance' has no source, so I can't use it upstairs. The customer reel lost me too: the first two films are a machinery company and a lab, and the one device story (Denis Machoka, 'Management review straight from dashboards') is off-screen with no company name.",
    "firstClick": "Medical Devices"
  },
  "platform": {
    "firstImpression": "\"Your work crosses teams. Your systems don't.\" is fine for my COO, but it is a problem statement, not an answer to the question I came with: can I defend this to an FDA investigator?",
    "comprehension": "This page made the coexistence position clear ('Your systems stay', FAQ: 'Do we have to replace our ERP, PLM, or eQMS? No.') and showed Part 11 is at least designed in (the seal: 'Sign-off is a Part 11 signature, with its meaning attached'; a standards grid listing ISO 13485, 21 CFR 820 QMSR, EU MDR, ISO 14971, Part 11). It also muddied the picture: the proof reel says 'Moved off MasterControl' and 'A collaborative eQMS live in 4 weeks', so it replaces an eQMS after all. Which story do I tell my board?",
    "resonance": 2,
    "whereAttentionPeaked": "The Compliance section ('Audit-ready, whichever standard governs you', the Life Sciences row with 13485, QMSR, EU MDR, 14971) and the proof card 'Moved off MasterControl' with a named Director of Quality. That is the first thing on either page I would screenshot for my QM.",
    "whereAttentionDropped": "'What the tax turns into': $10M per recall, $1.5T stalled production, 30% of R&D spend. These are industry-wide macro figures, not a number for my site, and they read like vendor inflation. The stack isometric and the AI tabs didn't register; I skimmed past them. The FAQ lost me at the exact moment it mattered: 'Does it support 21 CFR Part 11 electronic signatures?' is collapsed, last in the list."
  },
  "concernCoverage": [
    {"concern": "\"Is it validated for our regulatory environment?\" / \"Validation will take too long.\"", "source": "notion PES-3 Evaluates + PES-7 Objections", "home": "partial", "platform": "partial", "evidence": "Home: standards chips on the MD card and 'Whichever standard governs you, from 21 CFR Part 11 and ISO 13485...'. Platform: standards grid, Part 11 seal, SOC 2 Type II badge. Nothing on validation itself: no CSV/GAMP 5 validation package, no IQ/OQ/PQ, no statement of who validates what or how long it takes. The Part 11 FAQ answer is collapsed."},
    {"concern": "\"Proof from their industry.\"", "source": "notion PES-3 Needs", "home": "partial", "platform": "partial", "evidence": "The only story tagged Medical Devices is 'Denis Machoka, Medical Devices, Management review straight from dashboards': no company, late in the carousel. The logo strip (Adaptive Health, ATS Life Sciences...) is unlabelled. No device case study with numbers on either page."},
    {"concern": "\"Does it work with our existing QMS? (Coexistence, not displacement.)\" / \"We already have a QMS.\"", "source": "notion PES-3 Evaluates + Objections", "home": "partial", "platform": "addressed", "evidence": "Platform: 'Your systems stay.' diagram plus the open FAQ answer 'No. Your systems of record stay authoritative...'. But on the same page the proof says 'Moved off MasterControl' and 'A collaborative eQMS live in 4 weeks', and the home suite sells a QMS product. The position contradicts itself."},
    {"concern": "\"A number they can take to their CFO.\"", "source": "notion PES-3 Needs", "home": "partial", "platform": "partial", "evidence": "Home: '≈19 hrs of coordination per non-conformance', '≈30 hrs per change order', '54 of 75 steps', plus 'Take the Coordination Tax Assessment'. Per-record hours are the right unit but carry no source. Platform: $10M/recall and $1.5T are macro figures with sources, not my P&L. The dashboard mock ('Median closure 11d, was 34d at baseline') is illustrative, not a customer result."},
    {"concern": "\"Every audit, we spend three weeks just getting the packets together.\" / \"we can't prove it was done correctly.\"", "source": "notion PES-3 Discovery quotes + PES-7", "home": "partial", "platform": "partial", "evidence": "'Defensible at audit', 'the record you show an auditor is the record the work created', '40 min to pull one controlled document under audit pressure', 'Mock recall done in 18 minutes', 'Evidence complete 98% at sign-off'. Neither page shows what I hand an auditor: an audit trail view, an exported DHF or CAPA packet."},
    {"concern": "\"We run Excel trackers alongside the QMS because the QMS can't show us what's happening right now.\"", "source": "notion PES-3 Discovery quotes", "home": "addressed", "platform": "addressed", "evidence": "Home 'Quality performance: Live from every record... No export, no reconciliation' (open CAPAs, on-time closure, recurrence, avg closure). Platform dashboard 'Cross-functional work, measured' with median closure and evidence complete. This is my management review deck without the Excel."},
    {"concern": "\"My team is too busy to implement something new.\" / \"We don't have budget for another system.\"", "source": "notion PES-3 Objections", "home": "partial", "platform": "partial", "evidence": "'live in weeks', 'Configured in house, no IT tickets', 'eQMS live in 4 weeks', and a collapsed FAQ 'Do we have to adopt the whole platform at once?'. No migration or implementation timeline, no named effort for my QA team, no pricing signal. Budget is not addressed."},
    {"concern": "\"How is this different from [competitor]?\"", "source": "notion PES-3 Objections + persona file objections (MasterControl/Veeva/ETQ/Greenlight all say 'audit-ready')", "home": "absent", "platform": "partial", "evidence": "Only the 'Moved off MasterControl' film title. Both pages lean on 'audit-ready' and 'governed', which every vendor on my shortlist also says. The coordination-tax framing is the only differentiator, and it is stated as fact without a named study."}
  ],
  "objectionsRanked": [
    "Where is the validation story? Part 11 is named, but I see no validation package or CSV approach and no time-to-validated. That decides my compliance team's gate.",
    "Coexist or replace? 'Your systems stay' and 'Moved off MasterControl' are on the same page, and I need to know which risk I'm signing up for.",
    "No device company I can call. One unnamed Medical Devices film does not count as a reference.",
    "Will an investigator accept a record that looks like a chat thread? Every mock-up is a conversation UI, and the seal only answers this halfway.",
    "The tax numbers are unsourced ('19 hrs', '54 of 75') or macro ($1.5T). I can't put either in front of my CFO.",
    "What does migration of our existing DHF, document history and open CAPAs actually take?"
  ],
  "missing": [
    "A plain compliance block: 'Part 11 / Annex 11 compliant; validation package provided (IQ/OQ/PQ, GAMP 5 category); typical validation N weeks', open by default, not buried in a collapsed FAQ.",
    "One named Class II device customer with a before/after number (CAPA closure, audit prep time, or management review hours), on the homepage reel in the first two slots.",
    "One sentence that reconciles coexistence and replacement, e.g. 'Run alongside your eQMS, or replace it when you are ready', with the migration path stated.",
    "A shot of the audit-facing output: the audit trail or exported CAPA/DHF packet an investigator would actually see.",
    "A source line under the 19 hrs / 54-of-75 figures."
  ],
  "demoWillingness": {
    "score": 6,
    "anchor": "6-7 would book the 30-minute walkthrough if one named condition were met",
    "whatWouldMakeItAYes": "A written validation and Part 11 posture (validation package, who owns IQ/OQ/PQ, typical duration) plus one Class II device reference I can call.",
    "whoYouWouldBringOrForwardTo": "Forward to my Quality Manager to pull the validation docs and a device reference first. If those hold up, bring the QM and our CSV/validation lead to the walkthrough."
  },
  "nextAction": "delegate-down",
  "verbatims": [
    "(synthetic) \"'Defensible at audit' is the right headline. Now show me the validation package, because every vendor on my list says audit-ready.\"",
    "(synthetic) \"You tell me my systems stay, then your best film is someone who moved off MasterControl. Which one is it?\"",
    "(synthetic) \"The dashboard is my management review without the Excel. That part I'd pay for, if a device company tells me it's real.\""
  ],
  "confidence": "high: the persona evaluates exactly these pages (homepage from a shortlist, then platform), and the pages talk directly to the persona's audit, Part 11 and management-review concerns"
}
```

## Honest read (as the persona)

The hero earned the first thirty seconds: "Defensible at audit" is the promise I'm judged on, and the Medical Devices card spoke my language (MDR clock, 820, 13485, EU MDR). The dashboard mock landed hardest because it is my management review without the hand-built roll-up. The platform's standards grid and the Part 11 seal are the most trust-building elements across both pages.

Trust leaked in three places. First, validation. Part 11 appears as a chip, a seal and a collapsed FAQ question, but nothing tells me what validation costs me. That is the question my compliance lead will stall the deal on. Second, proof. No named device company is in front of me, and the one Medical Devices film is anonymous and buried. Third, the coexistence story contradicts itself. The platform FAQ says my eQMS stays, while the proof reel celebrates moving off MasterControl, and the homepage sells a QMS.

Repetition: the coordination tax argument appears twice on each page. The 54-of-75 grid and the 19-hours figure are repeated almost verbatim. The platform's macro figures ($10M, $1.5T) added volume, not credibility. The "Bring the process that hurts" close also repeats.

Together, the two pages got me to "worth my QM's time", not to "worth mine". I'd send it down with two questions (validation package, device reference) and book the walkthrough if both come back clean.
