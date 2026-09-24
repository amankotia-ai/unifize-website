# Reaction: Engineering Manager owning design changes and NPD (PPS-8)

```json
{
  "personaId": "engineering-manager-npd",
  "arrivalContext": "Quality forwarded Unifize with 'we are looking at this, does engineering object?' after a launch slipped on ECO churn; I am checking whether my change process is a first-class citizen or an approval checkbox, and what it does to our PLM.",
  "home": {
    "firstImpression": "Unusually, the hero subline names change orders and design reviews, and the hero record is a torque-spec change with a drawing going Rev C to Rev D, so this is not the usual CAPA-and-SOP pitch.",
    "comprehension": "A layer that sits between our systems and the people who sign things, where a change order, CAPA or design review runs as one record with its thread, checklist and signatures, so the reasoning behind an approval survives. It also sells four 'products', one of which is called PLM, which muddies whether it sits beside my PLM or wants to replace it.",
    "resonance": 2,
    "whereAttentionPeaked": "The hero Change order tab (CC-2148): the AI finding WI-092 and FRM-201 'States 4.2 N·m' after the drawing moved to 4.8 is precisely the missed-record problem on every change I approve. The Change Control tax card ('The change gets approved. Nobody can replay why.', ≈30 hrs per change order, scanned QA-07 with 'see email') was a close second.",
    "whereAttentionDropped": "The coordination-tax assessment block: 54 of 75 steps for a non-conformance to CAPA closure is quality's metric, not mine. Then the industries tabs, proof reel (mostly quality directors) and resources, which I skimmed without reading.",
    "firstClick": "Product Development"
  },
  "platform": {
    "firstImpression": "'Your work crosses teams. Your systems don't.' is true of my ECOs, and the hero is the same CC-2148 change with an impact assessment ('No form or fit change. Torque spec only; risk low'), so engineering is still the example.",
    "comprehension": "Confirmed it runs alongside PLM, not instead of it: the open FAQ says 'Do we have to replace our ERP, PLM, or eQMS? No.' and the coexistence diagram shows systems of record staying authoritative. Added that the change route is configurable (approval order, gates) and that AI can list the documents a change affects. It also sharpened a worry, because the builder says the route is 'configured by quality, not coded by IT', and the gap section follows a quality defect rather than a change.",
    "resonance": 2,
    "whereAttentionPeaked": "The Unifize AI section on CC-2148: 'What else does this change affect?' reading the reason for change and the impact assessment, with separate Quality and Engineering approvals, Rev C superseded to Rev D, and 12 operators assigned retraining. That is my change review. Also the 'Design delays: 30% of your R&D spend leaks into duplication and rework' card, because 'decisions made in reviews and threads are rebuilt weeks later' is my DHF.",
    "whereAttentionDropped": "The compliance standards wall (about 45 tiles, I only checked for ISO 13485, 820 and 14971) and the recall/$1.5T stall stats, which read like quality and ops numbers. The six-tool gap walkthrough is a defect, not an ECO, so I skimmed it."
  },
  "concernCoverage": [
    {"concern": "\"A change order enters the review cycle and bounces between quality, engineering, regulatory, and manufacturing for 3-6 weeks.\"", "source": "notion PES-6 Engineering change governance", "home": "addressed", "platform": "addressed", "evidence": "Home: Change Control card with sequential Engineering/Quality/Production sign-offs on scanned QA-07 and '≈30 hrs of coordination per change order, initiation to implementation'. Platform: CC-2148 with Quality approval and Engineering approval pending on one record, and a dashboard reporting median closure of 11d against a 34d baseline (not change-specific)."},
    {"concern": "\"Compatibility with their existing PLM (Unifize complements PLM, doesn't replace it).\" / \"We have PLM for this.\"", "source": "notion PES-6 Needs + Objections; persona file objections", "home": "partial", "platform": "addressed", "evidence": "Home works against this: the suite sells 'Product lifecycle: requirements, design controls, BOMs, and change orders on one traceable product record', and a proof tile on the platform page reads 'Unifize as the engineering system of record'. Platform answers it directly in the open FAQ ('Your systems of record stay authoritative… nothing is ripped out') and the 'Your systems stay' diagram. It never names a PLM (Windchill, Arena, Teamcenter) or says what is pulled from the BOM."},
    {"concern": "PP-25 design review action items: \"'we covered this in the last review' answered with 'where'\"", "source": "notion PPS-8 Pain Points PP-25", "home": "partial", "platform": "partial", "evidence": "Home hero names 'design reviews', but the Product Development card ('The design history is assembled after the fact… DHF · Section 4.2 · Decision record missing') is hidden behind 'See more solutions', so I never saw it. Platform only has the 'Design delays' card line 'Decisions made in reviews and threads are rebuilt weeks later'. Neither page shows a design review record, its action items, or its link into the DHF."},
    {"concern": "PP-23 design change loop: \"originating record stays open or closes blind\"", "source": "notion PPS-8 Pain Points PP-23", "home": "partial", "platform": "partial", "evidence": "Both show the link: 'Housing fastener torque raised from 4.2 to 4.8 N·m. Raised from NC-204.' Platform's inbox also shows 'NC-204 · root cause confirmed' next to the change. Neither shows the NC closing because the change went effective and was verified, which is the half of the loop that breaks."},
    {"concern": "Mixed revision execution and cut-in discipline (\"avoiding mixed revision\", \"readiness, cut-in discipline\")", "source": "notion PES-6 Cares / Worries; persona decisionCriteria (effectivity, suppliers on old revisions)", "home": "partial", "platform": "partial", "evidence": "The strongest proof point on both pages: AI flags WI-092 and FRM-201 still stating 4.2 N·m, Rev C is superseded by Rev D, the platform page shows 'Production readiness: Line 2 briefed' and '12 operators · due in 7 days'. The word effectivity never appears, and nothing covers WIP, supplier stock at the old revision, or a cut-in serial or date."},
    {"concern": "PP-35 \"low-risk changes inherit high-risk approval depth\"", "source": "notion PPS-8 Pain Points PP-35", "home": "absent", "platform": "partial", "evidence": "The platform hero impact assessment says 'risk low', and the process builder offers approval order, gates and 'Link to another process'. No risk-based routing is shown: nothing lets a minor change take a shorter path than a form/fit/function change."},
    {"concern": "PP-19 \"APQP gate review evidence rebuilt at each phase\" / PP-21 \"PPAP submissions assembled from scratch each programme\" / PP-7 risk register \"up to date as of the last gate\"", "source": "notion PPS-8 Pain Points PP-19, PP-21, PP-7", "home": "partial", "platform": "absent", "evidence": "Home's supplier card covers incoming PPAP evidence in email threads (RE: RE: FW: PPAP evidence), which is SQE's pain, not my programme PPAP or gate reviews. The platform page only lists 'APQP / PPAP' and 'ISO 14971' as compliance tiles. It says nothing about phase gates, a living risk register, or evidence assembled as the programme runs."},
    {"concern": "\"Quality tools treat engineering as an approval checkbox, not a workflow\"", "source": "persona file objections", "home": "partial", "platform": "partial", "evidence": "For: the hero and the AI example are both engineering changes, S. Okafor uploads the drawing, and there is a mechanical engineer on the proof reel. Against: the process builder says 'configured by quality, not coded by IT', the gap story and the tax metric are quality defects, and on CC-2148 the engineering role is literally one 'Engineering approval' row."}
  ],
  "objectionsRanked": [
    "Who owns the change route? 'Configured by quality' reads like engineering gets a signature box in quality's workflow",
    "You sell a 'PLM' product and put 'engineering system of record' on a proof tile, then tell me PLM stays authoritative. Which is it, and what exactly syncs with my PLM and BOM?",
    "No effectivity or cut-in, and nothing on WIP or supplier stock at the old revision, so mixed-revision risk is only half answered",
    "Design reviews and the DHF were promised in the hero, but the only card about them is hidden behind a button",
    "Every number (54/75, 19 hrs, 11d median) is NC/CAPA. There is no ECO cycle-time or launch-slip figure"
  ],
  "missing": [
    "A visible Product Development / design review story: a review record whose action items and decisions land in the DHF section, shown next to the change card rather than behind 'See more solutions'",
    "One sentence naming the PLM boundary: BOM and CAD stay in PLM, Unifize holds the review argument and the cross-functional sign-off, and here is what links back",
    "Effectivity and cut-in on the change record (serial or date, WIP and supplier stock disposition), plus risk-tiered routing so a torque tweak does not get a full-board review",
    "An engineering-side metric or customer: ECO cycle time or launch slip avoided, told by an engineering lead"
  ],
  "demoWillingness": {
    "score": 5,
    "anchor": "4-5: would take the assessment or watch a customer film, not a sales call yet",
    "whatWouldMakeItAYes": "An end-to-end ECO walkthrough with our PLM in the loop, where engineering configures its own route and I see the decision trail land in the DHF",
    "whoYouWouldBringOrForwardTo": "Back to the Quality Manager who sent it ('no objection in principle, show me the ECO route'), plus our PLM admin and a senior design engineer who chairs reviews"
  },
  "nextAction": "explore-solution-pages",
  "verbatims": [
    "(synthetic) \"The torque example is the first time a quality vendor has shown me a drawing revision instead of a CAPA. Then the builder tells me quality configures my route.\"",
    "(synthetic) \"PLM already holds the BOM. Your FAQ says it stays, your product menu says you are a PLM. Pick one and tell me where the seam is.\"",
    "(synthetic) \"I'll click 'Watch one change close' before I give anyone thirty minutes.\""
  ],
  "confidence": "high: the pages repeatedly use a change order as the lead example, which sits squarely in this persona's change-governance evidence"
}
```

## Honest read

Trust came from specifics. The homepage hero names change orders and design reviews in the first sentence. Both pages lead with the same real-looking ECO: a torque spec going from 4.2 to 4.8 N·m, DWG-2201 moving from Rev C to Rev D, and AI flagging the two documents that still state the old value. That is the missed-record failure I lose sleep over. The FAQ answer that PLM stays authoritative is what I needed before I would engage at all.

Trust was lost in three places:
- **Who owns the route:** "Configured by quality, not coded by IT" is exactly the imposed-tool smell I watch for.
- **PLM boundary:** the homepage sells its own PLM product and the proof reel says "engineering system of record", which cuts against the coexistence answer.
- **Engineering depth:** design review and DHF, my second job, sit behind "See more solutions". Effectivity, cut-in and gate reviews never appear.

**Redundant:** the platform page reran the 54-of-75 NC grid, the same CC-2148 record and the same customer reel. By the platform page, the tax framing read as quality's story told twice.

**Contradiction:** the homepage "One platform. Four governed records." with PLM as a product, against the platform FAQ "Do we have to replace… PLM? No." Both can be true, but neither page says where the seam is.

Did they get me into a conversation? Not yet. They got me to stop objecting and to click "Watch one change close". I would tell Quality that engineering is open to a walkthrough if it is run on an ECO with our PLM in the loop.
