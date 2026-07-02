# 02 · The Regulatory War Room

> **Direction angle:** Trigger/clock-first. The page opens on the buy-now moments — a 483, a
> recall-scope call, an MDR deadline — with their *statutory* clocks already running, then frames
> Unifize as the command center where the cross-functional response gets coordinated on a durable
> trace. Urgency and command-center energy, held to industry altitude.
>
> **For whom:** VP Quality / Head of Regulatory Affairs in or near a firefight. Secondary read:
> the COO/VP Ops who gets pulled into the escalation call and signs the disposition.
>
> **The thing this direction must land:** convey clock pressure from *real* Trigger Events
> (severity + time-sensitivity) **without** presenting `Pending` triggers as validated case
> evidence. Every clock on this page is *statutory* (the law's deadline), never "our customer hit
> this." The proof block — and only the proof block — carries the one customer-attested number.

---

## 1. Thesis (the one-line organizing idea)

**The industry doesn't buy a QMS on a calm Tuesday. It buys the day a clock starts.** So this page
opens *inside the moment the clock starts* — and shows Unifize as the war room where the response
gets run, coordinated, and traced, then hands the buyer to the exact module and the exact role that
owns that fire.

Every other direction earns the buyer's attention through recognition, economics, or breadth. This
one earns it through *time pressure that is already true in the buyer's world* — the statutory clock
exists whether or not Unifize does. We are not manufacturing urgency; we are naming the urgency the
regulation imposes, and offering the place to run against it.

The page is still a **routing hub**, not a campaign landing page. The war-room frame is the
*organizing metaphor*, but the spine is unchanged: the two ingress systems (Domains × Modules map,
Persona cards) are the load-bearing exits. The difference is *sequencing and energy* — we route from
a fire, not from a brochure. A buyer in a firefight doesn't want to browse nine domains; they want
to see their fire on the board, then find the door.

---

## 2. Why this shape for a routing hub

A routing hub has one failure mode: it feels like a sitemap. Breadth without a reason to move is a
directory. The War Room solves the "why move now" problem at the *top* of the page instead of the
bottom, which changes the physics of the whole hub:

- **The trigger band becomes a router, not a billboard.** In the canonical IA, "Why now → trigger
  moments" routes to *persona*. This direction makes that literal and bidirectional: each incident
  on the board carries two exits — the **module** that runs that response (e.g. Recall scope →
  Post-Market & Recall) and the **role** that owns the room (e.g. Head of RA). So the page's most
  attention-dense element is *also* its densest ingress surface. That is the strongest possible
  routing-hub move.
- **Urgency makes altitude discipline easier, not harder.** Because we're naming *moments* and
  *clocks*, the natural register is "name + tease + point at the door." There is no temptation to
  render module mechanics — a war room briefs the situation and assigns the response; it doesn't
  re-litigate the SOP. The metaphor *enforces* the altitude rule.
- **It is honest about maturity.** Triggers are `Goal Zero = Pending`. A war-room board of
  *situations with statutory clocks* is exactly what `Pending` triggers legitimately are: real
  buying moments with real deadlines, not validated outcomes. We never put a customer logo or a
  recovered-dollar figure on the board. The board is the *problem space*; proof is quarantined to
  one clearly-attributed section far below.
- **It generalizes as a template.** Swap the incident board's contents (Pharma: data-integrity
  483, Annex 1 deadline; Aerospace: AS9100 major finding, escape containment) and the same shape
  holds. The war room is industry-agnostic structure; Medical Devices is the proof instance.

This is a genuinely different page *shape* from its siblings: `01 Coordination Tax Ledger` leads
with a P&L; `03 Coverage Atlas` leads with the map; `04 Mirror` leads with symptoms. **`02` leads
with a live incident board and a ticking statutory clock**, and treats the map and personas as the
"assign the response" layer beneath it.

---

## 3. Section-by-section IA

Altitude rule restated for this direction: **name the moment, name the clock (statutory), point at
the door.** Never render the inside of a module workflow or a persona's day-in-the-life. The "Inside
the War Room" section (D) is the closest we get to mechanics, and it is deliberately held to a
*coordination posture* (one thread, one trace) — not a flow diagram of any single module.

### A · War-Room Hero — trigger + clock
- **Source:** Industries → Opportunity, Regulatory Vocabulary, Economics (one stat); statutory
  clock from `MD_STANDARDS` 21 CFR 803 (30-day FDA / 15-day EU).
- **Content:**
  - Eyebrow: `Medical Devices · Regulatory Affairs & Quality`
  - H1 (one promise): **"A 483 just landed. The clock started before the meeting did."**
  - Sub (one frame): "When an FDA inspection, a recall-scope call, or an MDR deadline hits, the
    work scatters across email, calls, and spreadsheets — and the trace you'll be audited on is the
    first casualty. Unifize is the war room where regulated device teams run the response on one
    accountable thread."
  - One economic number, framed as exposure not ROI: "Across 81 US device makers, the segment carries
    an estimated **$75.2M–$808.1M / year** in coordination tax — most of it spent *under deadline*."
    (`MD_ECONOMICS.annualTaxLow/High`, `companies`.)
  - Regulatory frame chips (lead 6, from `MD_STANDARDS`): `21 CFR 820` · `21 CFR Part 11` ·
    `ISO 13485` · `ISO 14971` · `EU MDR` · `21 CFR 803`. Subtext: "19 standards in frame."
  - **Live clock motif (illustrative + statutory only):** three small monospace "clock chips" with
    *statutory* deadlines, not customer events — `MDR · FDA 30-day / EU 15-day` · `CAPA · 30–90 day
    window` · `483 response · 15 business days`. A muted footnote: "Statutory windows. Your clock
    depends on your finding." This is the single most important honesty guardrail in the hero: the
    clocks are the *law's*, not a claim about a Unifize customer.
  - CTAs: primary **`Book a demo`**; secondary **`See the platform`**.
- **Altitude:** one promise, one frame, one number — exactly per the model. No feature list.
- **Routing:** primary CTA → demo; secondary → `/platform`. Hero is awareness, not ingress.

### B · The Incident Board — trigger moments with severity + statutory clock  *(the signature section)*
- **Source:** Trigger Events DB via `MD_TRIGGERS` (8 urgent/immediate rows, buyer language). All are
  `Goal Zero = Pending` — handled as *situations*, never as evidence.
- **Content:** an "incident board" / status-board grid. Each card = one trigger moment, styled like
  a war-room ticket:
  - **Moment** (verbatim buyer language from `MD_TRIGGERS`): "Form 483 observation issued",
    "FDA Warning Letter received", "Recall scope to be defined", "MDR / vigilance reporting
    deadline", "DHF gap found at audit", "Production hold pending disposition", "Supplier-caused
    line stop", "Data integrity finding".
  - **Severity tag** (editorial, derived from the moment's regulatory nature — *not* a Notion
    metric): `Critical` for Warning Letter, 483, Recall scope, MDR deadline; `High` for the rest.
    Rendered as a colored status pill, like a triage board.
  - **Clock** (statutory, attached only where a real statutory window exists, else "no statutory
    clock — but it compounds daily"):
    - MDR / vigilance deadline → `FDA 30-day · EU 15-day` (21 CFR 803).
    - Form 483 issued → `Response due in 15 business days`.
    - Recall scope → `Health-hazard evaluation drives the clock`.
    - CAPA-adjacent (DHF gap, data integrity) → `CAPA window 30–90 days`.
    - Production hold / supplier line stop → `No statutory clock — burns schedule + working capital
      daily`.
  - **Two exits per card (the ingress payload):**
    - `Run this in →` a **module** (link to the module/domain that owns the response).
    - `Owned by →` a **role** (link to the persona page).
- **Altitude:** names + severity + clock + two pointers. *No remediation steps.* We say "this is
  where it runs," not "here's how the workflow works."
- **Honesty guardrail (critical):** a persistent caption under the board — "These are the moments
  device teams reach for a better way to coordinate the response. Clocks shown are statutory
  deadlines, not customer outcomes." This sentence is the firewall that keeps `Pending` triggers
  from reading as validated proof.
- **Routing (per-card map in §6):** this is the densest ingress surface on the page — 8 cards × 2
  exits = up to 16 routes, collapsing onto the canonical module pages + persona pages.

### C · The First Casualty — root cause (why the trace breaks in a firefight)
- **Source:** Root Causes DB → 2 canonical (`MD_ROOT_CAUSE`).
- **Content:** a single tight thesis line, framed for the war-room reader:
  - Lead: **"In a firefight, the trace is the first casualty."**
  - Primary cause (one line): *No shared operational truth* — "The system of record is separate from
    the system of coordination, so the response runs on ungoverned channels — email, meetings,
    spreadsheets. Under deadline, that's where the trace dies."
  - Secondary (one line): *Missing decision trace* — "Records capture *what* was decided, not the
    context and evidence at the time. When the auditor asks you to replay the decision, you can't."
- **Altitude:** two sentences, no taxonomy, no amplifier list (the 5 amplifiers stay down on module
  pages). This is the *why* spine, kept to a single beat so the page keeps its forward momentum.
- **Routing:** none — this is a pivot beat from "the fire" to "the room."

### D · Inside the War Room — how the response gets coordinated (altitude-safe tease)
- **Source:** Industries → Opportunity / positioning + `MD_COEXISTENCE` posture. No module
  mechanics.
- **Content:** the "command center" payoff beat — *coordination posture only*, three short claims,
  each with a labeled placeholder slot (screens don't exist yet → `MD_NEEDS_BEN.productScreens`):
  - "One thread, every function" — the response runs in one place across Quality, R&D, Ops, Supplier,
    RA — instead of N threads that have to be reconciled afterward.
  - "The trace builds itself" — who decided what, on what evidence, at what time, is captured as the
    response happens, not reconstructed under audit pressure.
  - "Coexists with your stack" — sits on top of your validated QMS/PLM/ERP; no rip-and-replace.
    (`MD_COEXISTENCE.systemsOfRecord`.)
  - One labeled placeholder: `[ Product screen — the response thread ]` (never faked as shipped).
- **Altitude:** this is the *one* place the page describes the product, and it stops at posture. We
  never show a change-control flow or a CAPA form — those are module-page material. The test: every
  sentence here would be true of *all nine domains*, so it cannot be mechanics of any one.
- **Routing:** soft — a single `See how the platform coordinates work →` to `/platform`. The real
  ingress is the next two sections.

### E · Where the response runs — Domains × Modules map  **(MODULE INGRESS)**
- **Source:** `MD_DOMAIN_MAP` (9 domains, 12 modules across them; owners + promises). Reuse the
  existing `IndustryModuleMap` two-pane explorer pattern.
- **War-room framing (the reskin):** the map is presented as **"the response surface"** — *"Every
  fire on the board runs in one of these nine domains. Pick a domain to see its modules — each opens
  its own page."* Domains are the **stations** of the war room; modules are the **doors**.
- **Content per domain:** domain name + tier + budget owner + one-line promise (verbatim/condensed
  from `MD_DOMAIN_MAP`), then its modules (name + one-line blurb + standards chips + link). Primary
  pillars first (Quality, Product Development, Supplier Management, Operations), then the five
  secondary doors (Change Control, Document & Records Control, Training & Competency, Post-Market &
  Recall, Regulatory Affairs).
- **Incident-to-domain wiring (what makes this direction cohere):** each domain panel header carries
  a small "responds to" chip-set linking back to the board moments it owns — e.g. **Post-Market &
  Recall** shows `↳ responds to: Recall scope · MDR deadline`. This closes the loop: the fire on the
  board (B) lands on a station here (E), and the station names the door (module page).
- **Altitude:** domain name + owner + one-line promise; module name + one-line; link out. **No
  mechanics.** Module value-stream previews stay as labeled placeholders.
- **Routing:** every module → its module page. Only `Change Control (ECO)` and `Engineering Change
  (ECO/ECR)` are live today → `/industries/medical-devices/change-control`. All others →
  `/industries/medical-devices/[module-slug]` rendered as `Module page →` (clearly future, per the
  existing `.imap-mod-soon` treatment), **not** dead links styled as live.

### F · Who runs the room — persona cards  **(PERSONA INGRESS)**
- **Source:** Buyer Personas via the MD ICP (`MD_PERSONA` + the persona roster in the brief).
- **War-room framing:** *"Every war room has a commander. Find yours."* Personas are the people who
  own the response.
- **Content (cards):**
  - **Quality governance — *primary buyer / room commander.*** Titles cluster (`MD_PERSONA.titles`:
    VP Quality, Head of Quality, Quality Director, Quality Manager, QA Manager, RAQA Director).
    One-line cares (release confidence, audit outcomes, traceability, recurrence) + one-line worries
    (missing evidence, unclear approvals, audit findings, release risk). Tag: `Primary buyer`.
  - **Operations Leader — *economic buyer.*** COO, VP Operations, Plant Manager, GM, Site Director.
    Cares: output, stability, delivery, cross-functional execution. Worries: missed shipments,
    schedule instability, firefighting, slow decisions. Tag: `Signs the disposition` (war-room
    voice for economic buyer). This card is weighted up in this direction because the economic buyer
    gets pulled into every escalation call.
  - **Regulatory Affairs governance.** Head of RA, VP Regulatory. Cares: submission timelines, label
    compliance across markets, MDR/vigilance deadlines. Tag: `Owns the clock`.
  - **Compliance & validation.** Validation Manager, CSV Lead. Cares: validated state, audit
    readiness by default; the IQ/OQ/PQ procurement gatekeeper. Tag: `Clears the tool`.
- **Altitude:** title cluster + one-line cares/worries + link. **No day-in-the-life.**
- **Routing:** Quality governance → `/explorations/medical-devices/quality-manager` (live).
  Operations / RA / Compliance → their persona pages (`/explorations/medical-devices/operations`,
  `/regulatory-affairs`, `/validation`) rendered as future routes, honestly labeled.

### G · What it costs when the room is improvised — consequences
- **Source:** Consequences DB (`MD_CONSEQUENCES`, 5 types). **Qualitative — no invented $.**
- **Content:** five named consequence types as a tight strip, framed as "what an improvised response
  costs you": Cycle Time (long cycles; delayed time to market) · COPQ (coordination headcount in
  COGS) · Working Capital (trapped cash / quarantine holds) · Compliance Drag (overdue controls;
  slow audit & customer proof; lagging post-market signal) · Revenue Risk (quality escapes &
  warranty; expanded recall scope; lost market access).
- **Altitude / honesty:** named consequences only. **No dollar figure on any consequence** — that
  DB is qualitative by design (do-NOT-publish list). The only number on the page below the hero is
  the proof stat in H.
- **Routing:** none. Stakes beat, intentionally placed *after* ingress so it deepens conviction for
  a buyer who's already seen where to go (rather than blocking the path to the doors).

### H · Proof — a device company in your regulatory class
- **Source:** `MD_PROOF` (Advocacy maturity, customer-attested, anonymized %).
- **Content:** the one validated number, clearly attributed and visually *separated from the incident
  board* so the page never blurs `Pending` triggers with `Advocacy` proof:
  - Big stat: **41%** lower non-conformance coordination cost — **$81,350 recovered** in year one,
    against a signed **$198,150** baseline. Attribution chip: `Customer-attested · medical devices`.
  - Named references (real): **Recovery Force** (FDA-regulated Class I/II wearables — CAPA, document
    control, training, complaints on Unifize) · **Harmonic Bionics** (surgical robotics — quality
    and change control on one accountable thread).
  - One labeled placeholder for a future dashboard/screen (`MD_NEEDS_BEN.productScreens`).
- **Altitude / honesty:** anonymized %, named customers, placeholder for screens. This is the *only*
  section with a customer outcome. A short rule-line above it: "Everything above is the problem
  space. Here's the one result a customer has signed off on." That sentence is the explicit
  firewall between trigger-as-situation and proof-as-evidence.
- **Routing:** none (or a soft link to a future case study). Conviction beat.

### I · Why Unifize vs. the incumbents — decision trace vs. document status
- **Source:** Industries → Competitive Landscape (`MD_COMPETITORS`).
- **Content:** the differentiator as the war-room punchline: **"Incumbents track document status.
  Unifize reconstructs the decision."** Named incumbents (MasterControl — strong doc control, weak
  cross-functional coordination & real-time decision trace; Veeva Vault Quality — pharma-focused;
  ETQ Reliance — mid-market; Greenlight Guru — device-specific, smaller cos). Coexistence line:
  "Coexists with your QMS — no rip-and-replace."
- **Altitude:** the one differentiator + named incumbents + coexistence. No feature matrix.
- **Routing:** none (or soft to `/platform`).

### J · Close / demo
- **Source:** —
- **Content:** dark close band, war-room voice: H2 "When the next clock starts, run it here." Sub:
  "A 30-minute walkthrough — your standards, your triggers, your stack." Single primary CTA
  `Book a demo`; secondary `See the platform`.
- **Routing:** demo (primary), `/platform` (secondary).

---

## 4. Full-page ASCII wireframe

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  [Unifize]   Platform   Industries ▾   Pricing   Resources        [Book a demo] │  site header
└───────────────────────────────────────────────────────────────────────────────┘
╔═══════════════════════════════════════════════════════════════════════════════╗
║  A · WAR-ROOM HERO                                       (surface: dark)         ║
║  Industries / Medical Devices                                                    ║
║  ● MEDICAL DEVICES · REGULATORY AFFAIRS & QUALITY                                ║
║                                                                                  ║
║  A 483 just landed.                              ┌───────────────────────────┐  ║
║  The clock started before the meeting did.       │  ▓ clock chips (statutory)│  ║
║                                                  │  ┌──────────┐ ┌──────────┐│  ║
║  When an inspection, a recall-scope call, or an  │  │MDR 30/15d│ │CAPA 30-90││  ║
║  MDR deadline hits, the work scatters — and the  │  └──────────┘ └──────────┘│  ║
║  trace you'll be audited on is the first         │  ┌──────────┐             │  ║
║  casualty. Unifize is the war room.              │  │483 · 15bd│  (statutory)│  ║
║                                                  │  └──────────┘             │  ║
║  Segment exposure: $75.2M–$808.1M / yr · 81 cos  └───────────────────────────┘  ║
║  [21 CFR 820][Part 11][ISO 13485][14971][EU MDR][803]   19 standards in frame   ║
║  ( Book a demo → )   ( See the platform )                                        ║
╚═══════════════════════════════════════════════════════════════════════════════╝
│ TRUST STRIP · Trusted by regulated device & life-science teams · Recovery Force · Harmonic Bionics │
╔═══════════════════════════════════════════════════════════════════════════════╗
║  B · THE INCIDENT BOARD          WHY NOW              (surface: alt / board)     ║
║  "The moments a device company starts looking."                                  ║
║  ┌──────────────────────────┐ ┌──────────────────────────┐ ┌─────────────────┐ ║
║  │ [CRITICAL]   ⏱ 15 bus.day│ │ [CRITICAL]  ⏱ FDA30/EU15 │ │ [CRITICAL]  ⏱ HHE│ ║
║  │ Form 483 observation     │ │ MDR / vigilance deadline │ │ Recall scope to │ ║
║  │ issued                   │ │                          │ │ be defined      │ ║
║  │ Run this in → Quality    │ │ Run this in → Post-Mkt   │ │ Run → Post-Mkt  │ ║
║  │ Owned by → VP Quality    │ │ Owned by → Head of RA    │ │ Owned by → Qual │ ║
║  └──────────────────────────┘ └──────────────────────────┘ └─────────────────┘ ║
║  ┌──────────────────────────┐ ┌──────────────────────────┐ ┌─────────────────┐ ║
║  │ [CRITICAL] ⏱ compounds   │ │ [HIGH] ⏱ CAPA 30-90 day  │ │ [HIGH] ⏱ daily  │ ║
║  │ FDA Warning Letter recv'd│ │ DHF gap found at audit   │ │ Production hold │ ║
║  │ Run → Quality / RA       │ │ Run → Product Dev't      │ │ Run → Operations│ ║
║  │ Owned by → VP Quality    │ │ Owned by → VP Quality    │ │ Owned by → Ops  │ ║
║  └──────────────────────────┘ └──────────────────────────┘ └─────────────────┘ ║
║  ┌──────────────────────────┐ ┌──────────────────────────┐                      ║
║  │ [HIGH] ⏱ daily           │ │ [HIGH] ⏱ CAPA 30-90 day  │   8 trigger moments  ║
║  │ Supplier-caused line stop│ │ Data integrity finding   │                      ║
║  │ Run → Supplier Mgmt      │ │ Run → Quality            │                      ║
║  │ Owned by → Ops / SQ      │ │ Owned by → VP Quality    │                      ║
║  └──────────────────────────┘ └──────────────────────────┘                      ║
║  ⓘ Statutory deadlines shown — not customer outcomes. These are buying moments.  ║  ← honesty rail
╚═══════════════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════════════╗
║  C · THE FIRST CASUALTY          THE STRUCTURAL WHY      (surface: white)        ║
║  "In a firefight, the trace is the first casualty."                              ║
║  No shared operational truth — the response runs on ungoverned channels.         ║
║  Missing decision trace — you can't replay the decision when the auditor asks.   ║
╚═══════════════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════════════╗
║  D · INSIDE THE WAR ROOM         HOW IT RUNS            (surface: dark)          ║
║  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐                       ║
║  │ One thread,    │ │ The trace      │ │ Coexists with  │  ┌──────────────────┐ ║
║  │ every function │ │ builds itself  │ │ your stack     │  │ [ screen slot:   │ ║
║  └────────────────┘ └────────────────┘ └────────────────┘  │   response thread]│ ║
║  See how the platform coordinates work →                    └──────────────────┘ ║
╚═══════════════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════════════╗
║  E · THE RESPONSE SURFACE   WHERE UNIFIZE COMES IN   ★ MODULE INGRESS (alt)      ║
║  "Every fire runs in one of nine domains. Each door opens its own page."         ║
║  ┌──────────────┐ ┌──────────────────────────────────────────────────────────┐ ║
║  │ PILLARS      │ │ ◀ Quality            VP Quality / QA Director  [Primary]   │ ║
║  │ ▸ Quality  5 │ │   ↳ responds to: Form 483 · Data integrity · Warning Ltr  │ ║
║  │ ▸ Product  4 │ │   "Largest accumulator of coordination tax…"              │ ║
║  │ ▸ Supplier 4 │ │   ┌────────────┐┌────────────┐┌────────────┐              │ ║
║  │ ▸ Operatns 3 │ │   │CAPA & Eff. ││NCR         ││MRB Disp.   │  Module page→ │ ║
║  │ ADJACENT     │ │   │[820][13485]││[820]       ││[13485]     │              │ ║
║  │ ▸ Change C 2 │ │   └────────────┘└────────────┘└────────────┘              │ ║
║  │ ▸ Doc/Rec  2 │ │   ┌────────────┐┌────────────┐                            │ ║
║  │ ▸ Training 2 │ │   │Deviation   ││Internal Aud│                            │ ║
║  │ ▸ Post-Mkt 2 │ │   └────────────┘└────────────┘                            │ ║
║  │ ▸ Reg Aff  2 │ │   [ domain value-stream preview · placeholder ]           │ ║
║  └──────────────┘ └──────────────────────────────────────────────────────────┘ ║
║  (Change Control modules → live /industries/medical-devices/change-control)     ║
╚═══════════════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════════════╗
║  F · WHO RUNS THE ROOM      WHO IT'S FOR        ★ PERSONA INGRESS (white)        ║
║  ┌─────────────────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────┐ ║
║  │ [Primary buyer]         │ │ Operations   │ │ Regulatory   │ │ Compliance  │ ║
║  │ Quality governance      │ │ Leader       │ │ Affairs      │ │ & Validation│ ║
║  │ VP Quality · Head of Q  │ │ [Signs the   │ │ [Owns clock] │ │ [Clears the │ ║
║  │ · QA Mgr · RAQA Dir     │ │  disposition]│ │ Head of RA   │ │  tool]      │ ║
║  │ cares: release conf,    │ │ COO·VP Ops·  │ │ cares: subm. │ │ Val Mgr·CSV │ ║
║  │ audit, traceability     │ │ Plant Mgr    │ │ timelines,   │ │ cares: val. │ ║
║  │ See Quality page →      │ │ persona pg → │ │ MDR clocks   │ │ state, IQ/OQ│ ║
║  └─────────────────────────┘ └──────────────┘ └──────────────┘ └─────────────┘ ║
╚═══════════════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════════════╗
║  G · WHAT AN IMPROVISED RESPONSE COSTS   CONSEQUENCES   (alt) — no $ here        ║
║  [Cycle Time] · [COPQ] · [Working Capital] · [Compliance Drag] · [Revenue Risk] ║
╚═══════════════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════════════╗
║  H · PROOF   "Everything above is the problem. Here's the one signed result."    ║
║  ┌────────────────┐  Recovery Force · Class I/II wearables                       ║
║  │      41%       │  Harmonic Bionics · surgical robotics       ┌─────────────┐ ║
║  │ $81,350 rec'd  │  $81,350/yr recovered vs signed $198,150    │ [screen slot│ ║
║  │ Cust-attested  │  baseline · non-conformance coord. cost     │  dashboard ]│ ║
║  └────────────────┘                                             └─────────────┘ ║
╚═══════════════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════════════╗
║  I · WHY UNIFIZE   "Incumbents track document status. Unifize reconstructs the   ║
║  decision." [MasterControl][Veeva][ETQ][Greenlight Guru] · Coexists with QMS     ║
╚═══════════════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════════════╗
║  J · CLOSE (dark)   "When the next clock starts, run it here."                   ║
║  ( Book a demo → )   ( See the platform )                                        ║
╚═══════════════════════════════════════════════════════════════════════════════╝
│ FOOTER · Industries · Platform · © Unifize 2026                                  │
```

---

## 5. Fresh visual language

Not the current site. The register is **enterprise command-center**: high-contrast, instrument-panel
calm with one channel of controlled urgency. Restraint everywhere except the incident board, which is
allowed to feel *alive*.

**Type.** A grotesque/neo-grotesque display for headlines (e.g. a tight, slightly condensed sans —
think the precision of an aviation HUD label, not a startup hero). Body in a humanist sans at a
generous size for an enterprise reader. **A monospace is load-bearing here** — it's the war-room
typeface, used for every clock, severity tag, standard code (`21 CFR 803`), and incident ID. The
mono is the visual signal of "this is operational data, not marketing copy." Headlines large but few
words; the page reads like a briefing.

**Color.** A restrained dark/neutral base (deep slate / near-black for the hero, board, and close;
warm paper-white for the white sections; a cool light-gray for `alt`). One **single accent of
controlled urgency** — an amber/signal-orange reserved *exclusively* for live clocks and the
`Critical` severity pill. A secondary cooler accent (a desaturated teal or steel-blue) for `High`
severity and module standard-chips, so urgency reads on a two-step scale, not a wall of red. Crucially
**red is avoided** — a true-red board would feel like a fake alarm and undercut the honesty posture;
amber reads "deadline," not "we're lying to you about an outage." Color carries meaning (severity,
clock) and nothing else; everything decorative is monochrome.

**Grid & measure.** Slightly wider than the standard site (per locked decision) — a 12-col grid on a
~1200–1280px max with comfortable gutters. The incident board breaks to a 3-up (desktop) / 2-up /
1-up responsive grid of equal-height tickets. The Domains × Modules map keeps the existing two-pane
explorer proportions (narrow left rail, wide right panel) because that interaction already works and
shouldn't be reinvented.

**Motion.** Discipline is the brand here, so motion is minimal and *functional*:
- Clock chips have a single, slow, 1Hz tick on the colon/separator (the only ambient motion on the
  page) — enough to read as "running," never strobing or anxiety-inducing.
- Incident tickets fade/rise in on scroll, staggered ~40ms, once. No looping.
- Domain selection in the map is an instant cross-fade of the right panel (existing pattern).
- Respect `prefers-reduced-motion`: the tick becomes static, the stagger becomes a single fade.

**Texture.** Almost none — this is minimal enterprise. The one texture is a faint *status-board grid
line* behind the incident board (a 1px hairline lattice at low opacity) that reads as "operations
display," plus a subtle scanline-free monospace tabular alignment. No gradients-as-decoration, no
glassmorphism, no glow. The placeholder slots use a clearly-labeled neutral fill (`[ screen slot ]`)
so nothing reads as a faked, shipped UI.

**Why this language fits the angle:** a war room is *instruments and discipline under pressure*. The
visual system should feel like a team that is calm because their tools are good — the opposite of the
email-and-spreadsheet chaos in the root-cause section. The single amber accent is the only thing
"moving," which is exactly how a well-run incident response feels: one clear signal, everything else
steady.

---

## 6. How BOTH ingress systems are expressed

This direction is unusual in that **ingress appears twice** — once as *triage exits on the incident
board* (B), and once as the *canonical dedicated sections* (E, F). The board's exits are the
"fast-path" router for a buyer in a hurry; the dedicated sections are the "browse" router for a buyer
who wants the full surface. Both resolve to the same module/persona pages, so there's one routing
graph, two entry textures.

**Module ingress (problem → module):**
- *Fast path:* every incident ticket in B carries a `Run this in → [domain/module]` exit.
- *Full surface:* section E is the complete Domains × Modules map (9 domains, all modules), with each
  domain panel showing a `↳ responds to: [board moments]` chip-set that visibly ties the board to the
  map.

**Persona ingress (role → persona):**
- *Fast path:* every incident ticket carries an `Owned by → [role]` exit.
- *Full surface:* section F is the four persona cards.

A buyer should sense within the first two screens — hero clock chips + the incident board's dual
exits — that they can enter *by their fire (problem→module)* or *by their seat (role→persona)*. That
satisfies "both ingress systems present and obvious above the fold's reach."

---

## 7. Routing map (explicit — every link's destination)

Legend: **LIVE** = page exists today; **FUTURE** = canonical route, render as honestly-labeled
"page coming" (not a dead link styled as live).

### From the Incident Board (B) — `Run this in →` (MODULE exits)
| Trigger moment | Domain station (E) | Module page target | Status |
|---|---|---|---|
| Form 483 observation issued | Quality | `/industries/medical-devices/capa` (CAPA & Effectiveness) | FUTURE |
| FDA Warning Letter received | Quality | `/industries/medical-devices/capa` | FUTURE |
| Data integrity finding | Quality | `/industries/medical-devices/capa` | FUTURE |
| DHF gap found at audit | Product Development | `/industries/medical-devices/design-controls` (Design Controls/DHF) | FUTURE |
| MDR / vigilance deadline | Post-Market & Recall | `/industries/medical-devices/complaint-mdr` (Complaint/MDR Reporting) | FUTURE |
| Recall scope to be defined | Post-Market & Recall | `/industries/medical-devices/recall-execution` | FUTURE |
| Production hold pending disposition | Operations | `/industries/medical-devices/production-hold` | FUTURE |
| Supplier-caused line stop | Supplier Management | `/industries/medical-devices/scar` (SCAR/Supplier CAPA) | FUTURE |

> Engineering-change moments (not on the 8-card board but reachable via the map) → **Change Control**
> → `/industries/medical-devices/change-control` — **the only LIVE module page today.** This is the
> one place a board/map exit lands on a real page, so it should be visually first/featured in the map.

### From the Incident Board (B) — `Owned by →` (PERSONA exits)
| Trigger moment | Role | Persona page target | Status |
|---|---|---|---|
| Form 483 / Warning Letter / DHF gap / Data integrity | VP Quality | `/explorations/medical-devices/quality-manager` | LIVE |
| MDR / vigilance deadline | Head of Regulatory Affairs | `/explorations/medical-devices/regulatory-affairs` | FUTURE |
| Recall scope to be defined | VP Quality (w/ RA) | `/explorations/medical-devices/quality-manager` | LIVE |
| Production hold / Supplier line stop | Operations Leader | `/explorations/medical-devices/operations` | FUTURE |

### From the Domains × Modules map (E) — full module roster
All 12 modules across the 9 domains link to their module page. Mapping mirrors `MD_DOMAIN_MAP`:
- **Quality:** CAPA & Effectiveness, NCR, MRB Disposition, Deviation, Internal Audit → respective
  `/industries/medical-devices/[module]` (FUTURE).
- **Product Development:** **Change Control (ECO) → `/industries/medical-devices/change-control`
  (LIVE)**; Design Controls/DHF, Design Transfer/NPI, Risk Management File → FUTURE.
- **Supplier Management:** Supplier Qualification/PPAP, SCAR, Incoming Inspection/MRB, Quality
  Agreements → FUTURE.
- **Operations:** Production Hold Disposition, WIP/MRB Backlog, Batch/DHR Review → FUTURE.
- **Change Control:** **Engineering Change (ECO/ECR) → `/industries/medical-devices/change-control`
  (LIVE)**; Controlled Distribution → FUTURE.
- **Document & Records Control:** Document Control, Periodic Review → FUTURE.
- **Training & Competency:** Training Cascades, Competency/Re-qualification → FUTURE.
- **Post-Market & Recall:** Complaint/MDR Reporting, Recall Execution → FUTURE.
- **Regulatory Affairs:** Label Governance, 510(k)/PMA Submission → FUTURE.

### From the Persona cards (F)
| Card | Target | Status |
|---|---|---|
| Quality governance (primary buyer) | `/explorations/medical-devices/quality-manager` | LIVE |
| Operations Leader (economic buyer) | `/explorations/medical-devices/operations` | FUTURE |
| Regulatory Affairs governance | `/explorations/medical-devices/regulatory-affairs` | FUTURE |
| Compliance & Validation | `/explorations/medical-devices/validation` | FUTURE |

### Non-ingress links
- Hero secondary CTA, D's soft link, I's soft link → `/platform`.
- All `Book a demo` → demo route/modal.
- Breadcrumb "Industries" → `/platform#industries`.
- Footer → existing `SiteFooterX` targets.

**Implementation note:** reuse `IndustryModuleMap` (the two-pane explorer) for E; reuse the
`ScreenFrame`/`.ph` placeholder pattern for all screen slots; the incident board (B) is the one net-new
component — a `<IncidentBoard>` reading `MD_TRIGGERS`, with a co-located `MD_TRIGGER_ROUTING` table
(moment → severity → statutory clock → module href → persona href) added to `md-module-map.ts` so the
dual exits are data-driven and the same severity/clock metadata can't drift between B and E.

---

## 8. Risks & mitigations

1. **Triggers reading as validated proof (the cardinal risk).** `Pending` triggers near urgency
   visuals could imply "customers hit these and we fixed them." → *Mitigations:* (a) every clock is
   *statutory*, labeled "statutory deadline, not customer outcome"; (b) the persistent honesty rail
   under the board; (c) proof is physically and tonally quarantined in H with the explicit "here's
   the one signed result" rule-line; (d) zero customer names or dollar figures appear on the board.
2. **Manufactured-urgency / fearmongering tone.** A red, alarm-bell board could feel manipulative to
   an audit-minded buyer and *lower* credibility. → Amber not red; severity is a two-step
   (Critical/High) editorial scale, not a fake live alert; copy names the regulation's clock, never
   "act now." The single slow tick is the only motion.
3. **Severity tags being mistaken for a Notion metric.** Severity is editorial (derived from the
   moment's regulatory nature). → Keep it to two values, don't number it, and never cite a source —
   it reads as obvious triage, not a fabricated data field.
4. **Altitude creep in D ("Inside the War Room").** The temptation to show a real workflow. →
   Constrain D to *coordination posture* claims that are true of all nine domains; the test is "would
   this sentence be equally true of CAPA, Change Control, and Recall?" If not, it's module-page
   material. All product imagery stays labeled placeholders.
5. **Routing-clarity dilution from too many exits.** 8 cards × 2 exits + a full map + 4 personas is a
   lot of links. → The board exits are *terse pointers* (one-word destinations); the canonical map/
   persona sections are where the buyer browses. Visual hierarchy keeps the board scannable, not
   busy; the `↳ responds to` chips reinforce one mental model (fire → station → door) rather than
   adding new ones.
6. **Most module exits are FUTURE pages.** Only Change Control is live. → Honestly label future
   routes (existing `.imap-mod-soon` pattern), and feature the live Change Control door prominently
   so at least one fast-path exit lands somewhere real today.
7. **Template generality.** The board is MD-specific in content. → Keep it data-driven
   (`MD_TRIGGER_ROUTING`); for Pharma/Aerospace the same component reads that industry's trigger +
   routing table. The *shape* (board → casualty → war room → map → personas → cost → proof) is the
   reusable template; the values are the instance.
