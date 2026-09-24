# Reactor: COO / VP Operations at a pharma CDMO

```json
{
  "personaId": "coo-vp-operations-pharma-cdmo",
  "arrivalContext": "Forwarded the link after a quarter where missed shipments traced back to lots sitting on quality hold waiting for dispositions, plus one customer escalation; checking whether this fixes my holds problem or is just the quality team's software.",
  "home": {
    "firstImpression": "Clean, confident, and within one line it's talking CAPAs, change orders and design reviews, which is the VP Quality's list, not mine.",
    "comprehension": "A workflow layer for regulated companies that sits between existing systems and the people, so quality events (CAPAs, change orders, SOP control, supplier approvals) close faster with a clean audit trail. It sells four modules (QMS, DMS, MES, PLM). Operations looks like a side door: one row in a list and a 'Holds & release' tab I didn't click.",
    "resonance": 1,
    "whereAttentionPeaked": "The 'Choose your way in' cards, the 'Operations · Holds · Dispositions' row. It's the only place in my first two screens that says my word 'holds', and it's a row in a list, not a claim.",
    "whereAttentionDropped": "The coordination tax grid: 'CAPAs take 90+ days', 'Three copies of one SOP', supplier PPAP threads, change control. All quality-department problems. The Operations card ('WIP ages while dispositions wait in inboxes') is blurred behind 'See more solutions', so I never saw the one card written for me. After the 54-of-75 waffle, which counts one non-conformance's steps, I was skimming for the exit.",
    "firstClick": "Operations"
  },
  "platform": {
    "firstImpression": "'Your work crosses teams. Your systems don't.' Better. That's the escalation problem I live with, framed at my level rather than quality's.",
    "comprehension": "It's pitched as a cross-functional layer, not only a QMS: it pulls context from the ERP, keeps the disposition on one record with named approvers, sits alongside ERP and MES instead of replacing them, and reports median closure and time spent waiting off the records. The 'Stalled production' card finally says my pain out loud: WIP aging while holds and dispositions wait in inboxes with no owner and no due date. But it's still demonstrated on a non-conformance and a change control, and nothing is stated in throughput or on-time delivery.",
    "resonance": 2,
    "whereAttentionPeaked": "'What the tax turns into', the STALLED PRODUCTION card. The 'how the tax gets there' line is my holds problem word for word. Second peak was 'Your systems stay': ERP and MES untouched, nothing re-keyed from the floor.",
    "whereAttentionDropped": "'$1.5T lost annually to stalled production' is a national macro number, not mine, and it cost the card credibility. Then the stack diagram, the AI section and the long standards wall. None of it is an operations payoff, and I stopped around the stack."
  },
  "concernCoverage": [
    {
      "concern": "Quality and coordination problems reach them as operating cost, scrap, downtime, and missed shipments rather than as individual records",
      "source": "notion PPS-26 Description",
      "home": "absent",
      "platform": "partial",
      "evidence": "Home frames cost only as hours per quality record (≈19 hrs per NC, ≈30 hrs per change order). Platform's 'What the tax turns into' names stalled production and recalls, but as industry macro figures ($1.5T, $10M) with no scrap, downtime or shipment outcome."
    },
    {
      "concern": "they read the organisation-level and domain roll-up dashboards rather than operational tiles",
      "source": "notion PPS-26 Description",
      "home": "partial",
      "platform": "partial",
      "evidence": "Home suite mockup: 'Quality performance' dashboard (on-time closure 94%, avg closure 34d). Quality KPIs. Platform: 'Cross-functional work, measured' (median closure 11d was 34d, time spent waiting 9%). Closer to a roll-up, but no holds aging, lots released or OTD tile."
    },
    {
      "concern": "Worries: Missed shipments, schedule instability, firefighting, slow decisions",
      "source": "notion PES-20 Operations Leader Worries",
      "home": "partial",
      "platform": "partial",
      "evidence": "Home: slow decisions implied in 'Explore solution' cards, but the Operations card is hidden behind 'See more solutions'. Platform: 'Work in progress ages while holds and dispositions wait in inboxes'. Missed shipments and schedule never named on either page."
    },
    {
      "concern": "Batches and WIP sit on quality holds while dispositions wait in inboxes",
      "source": "persona file pains",
      "home": "partial",
      "platform": "addressed",
      "evidence": "Home: 'Holds & release' hero tab and 'Operations · Holds · Dispositions' row are visible, but the explanatory card is collapsed. Platform: stalled-production card plus the defect walkthrough's Disposition step ('Rework lot 118-B to spec... re-inspect 100% before release' with named approvers)."
    },
    {
      "concern": "Escalations reach them late and without a trail of who committed to what",
      "source": "persona file pains",
      "home": "partial",
      "platform": "partial",
      "evidence": "Home's hidden Operations card uses almost exactly this line ('no trail of who committed to what'), but it isn't visible by default. Platform: inbox 'One owner, every function, decisions and evidence in a single thread' and recalls card 'joined by calls nobody records'. Mechanism shown, but not tied to escalations reaching me."
    },
    {
      "concern": "Sounds like a quality-team tool; why is this my meeting?",
      "source": "persona file objections",
      "home": "absent",
      "platform": "partial",
      "evidence": "Home hero names CAPAs, change orders and design reviews; the tax cards are Quality, Document control, Supplier, Change control; proof comes from quality directors. Platform hero is cross-team, but the walkthrough offer is 'A CAPA, a change order, a supplier approval', with no batch disposition or hold."
    },
    {
      "concern": "Numbers on vendor pages are never my numbers; show me the mechanism",
      "source": "persona file objections",
      "home": "partial",
      "platform": "partial",
      "evidence": "54 of 75 steps is a mechanism, but for a non-conformance, not a held lot. Platform labels it 'ONE OF YOUR NON-CONFORMANCES', which it isn't. $1.5T and $10M are exactly the vendor numbers I discount. The 'Today vs On Unifize' six-tools-to-one-record comparison is the most convincing mechanism."
    },
    {
      "concern": "Does not add work for the floor; coexists with ERP and MES",
      "source": "persona file decision criteria",
      "home": "partial",
      "platform": "addressed",
      "evidence": "Home: 'alongside the systems you already trust'. Platform: 'Your systems stay'; FAQ 'Your systems of record stay authoritative... nothing is re-keyed'; 'Raised from the line. Part, work order, and photos attach themselves from the ERP and the phone.'"
    }
  ],
  "objectionsRanked": [
    "This is the quality team's tool. Every worked example is a CAPA, an NC or a change order, never a held batch or a late shipment.",
    "No operations outcome: nothing about cycle time, lots released faster, hold aging or on-time delivery from a customer like me.",
    "The numbers aren't mine. $1.5T and $10M are macro figures, and the 19 hours per NC is a quality-record cost, not a line on my P&L.",
    "No CDMO or pharma manufacturing proof on either reel. The customers shown are quality directors and engineers, mostly device and industrial.",
    "The Operations story exists but is hidden behind 'See more solutions' on the homepage, so I nearly missed that you cover it at all."
  ],
  "missing": [
    "A visible homepage card, or hero tab default, showing a batch on hold, the disposition owner, days waiting, and the release, with the hold-aging number",
    "One customer outcome in operations terms: hold-to-release time or dispositions per week before and after, ideally at a CDMO or pharma site",
    "A roll-up dashboard frame for my level: WIP on hold by age, lots released on time, time waiting by function",
    "The walkthrough offer naming 'a held lot or batch disposition' alongside CAPA and change order"
  ],
  "demoWillingness": {
    "score": 3,
    "anchor": "2-3 would forward a link down or sideways, no personal time",
    "whatWouldMakeItAYes": "Show one held batch going from hold to released on Unifize, with a real customer's hold-to-release time before and after.",
    "whoYouWouldBringOrForwardTo": "VP Quality (sideways), with the platform page's stalled-production card flagged; possibly the site Head of QA who owns dispositions"
  },
  "nextAction": "share-internally",
  "verbatims": [
    "(synthetic) \"Everything here is CAPAs. What does it do to my holds?\"",
    "(synthetic) \"The one card about my problem was behind a 'see more' button. That tells me who this was written for.\"",
    "(synthetic) \"One-point-five trillion isn't my number. Show me a lot that sat nine days and now sits two.\""
  ],
  "confidence": "medium: persona file is draft and the Notion Pain Points relation is empty, so concerns rest on the PPS-26 description, PES-20 cares/worries and the persona file; the stimulus sits squarely in the 'is this quality's tool or mine' test the persona describes"
}
```

## Honest read

What earned trust: the platform page's hero ("Your work crosses teams. Your systems don't.") and the Stalled Production card are the first things on either page that describe my problem the way I'd describe it. So is the 'Your systems stay' section: ERP and MES untouched, the floor not re-keying anything. The Today vs On Unifize defect walkthrough is a real mechanism, and it includes a disposition with named approvers. That's closer to my world than anything on the homepage.

What cost trust: the homepage never gets out of the quality department. Hero, tax grid, product suite dashboard, customer reel: CAPAs, SOPs, PPAPs, quality directors. The Operations card is literally blurred behind a button. Within my two screens I'd have filed this as "VP Quality's evaluation". The big platform numbers ($1.5T, $10M) are the vendor-page numbers I tune out, and calling the 54-of-75 waffle "one of YOUR non-conformances" oversteps.

Redundancy: the 54-of-75 waffle and the customer reel appear almost identically on both pages. The second time around they added nothing. Minor inconsistency: the homepage says "Four governed records", the platform page "Three bands"; I wouldn't notice, but my VP Quality might.

Did it get me into a conversation? No. It got a forward to the VP Quality with "the stalled-production bit is our holds problem; worth a look?" A held-batch example with a hold-to-release number would have made it my meeting.
