# 06 — The Two Doors

> **Direction:** Ingress-first. The page is organized *by* its two entry paths.
> **Angle:** Make the ingress system itself the structure. The two doors —
> "enter by your role" (persona) and "enter by what's breaking" (problem-domain →
> module) — are the centerpiece, not a buried section. The rest of the page is the
> *threshold* that earns the choice.
> **For whom:** Everyone. The page self-sorts the visitor instead of guessing.
> **Trace:** Obeys `00-overview-and-model.md` strictly. All values from
> `medical-devices-canonical.ts` and `md-module-map.ts`. No invented metrics.

---

## 1. Thesis — why this shape

Every other direction picks a *story* (economics, the clock, the map, the mirror,
the decision-trace claim) and lets that story imply where you go next. **The Two
Doors inverts that.** It treats the single most important job of this page — it is
a **routing hub** (locked decision §0) — as the literal architecture. The page
does not bury its two ingress systems inside an arc; it **promotes the choice to
the hero's eye-line** and builds everything around it.

The insight that makes this work for Medical Devices specifically: **there are two
fundamentally different people in the room, and they don't enter through the same
door.** The canonical persona set proves it —

- **Quality governance** is the *primary buyer*. They think in **records, audits,
  recurrence, traceability.** They enter by *who they are*: "I'm the VP Quality,
  show me my world."
- **Operations Leader** is the *economic buyer* — the only `Goal Zero = Pass`
  persona, the one who pays and decides expand/churn. They do **not** think
  "I am a persona." They think in **what's on fire right now**: a production hold,
  a supplier line-stop, a missed shipment. They enter by *what's breaking*.

A single linear narrative serves one of these and loses the other. **Two doors
serves both at once, and lets each self-select** — which is exactly the
routing-hub mandate ("make the buyer feel seen at breadth, then distribute,"
§0). The two ingress systems the brief calls "the spine, not afterthoughts" (§4)
become, here, the **load-bearing wall**.

This is the *purest possible* expression of the locked content model: "the only
organizing/ingress systems are Personas and the Domains × Modules map" (§0). The
Two Doors does not add a third frame. It takes the exact two systems the model
already mandates and makes them the skeleton.

**The named risk** (from the assignment): *a navigation page with no soul.* The
defense is built into the structure — see §3 (the doors carry stakes language, not
just labels) and §4 (a single thesis line and a single stakes line form the
"threshold" you cross before the doors, so the page has a spine and a pulse before
it asks you to choose). The doors are *consequential*, not a menu.

---

## 2. What "industry altitude" means in this shape (the editorial rule)

The non-negotiable: **name + tease, never mechanics, never day-in-the-life** (§0,
§1). In a doors-first layout the temptation is to make each door deep so it "feels
worth it." We resist:

- **Door A (Role)** shows, per persona: the **title cluster**, a one-line
  *cares/worries* pair, and the count of domains that persona owns. It links out.
  It does **not** render a day-in-the-life. (Brief block 6.)
- **Door B (Problem)** shows, per domain: **domain name + budget owner + a
  one-line promise**, then module names each with one buyer-voice line and a link.
  It does **not** render the change-control flow or any module mechanics.
  (Brief block 5.)
- The threshold (§4 of this doc) carries exactly **one** thesis line and **one**
  stakes line. No taxonomy, no five-type consequence grid expanded inline.

If a block here starts explaining *how* a module works or *what a persona's
Tuesday looks like*, it has broken altitude and belongs one level down.

---

## 3. The core mechanic: the two doors as the centerpiece

The doors appear **twice**, deliberately, and this is the spine of the design:

1. **The Chooser** (Section C, immediately after the threshold, in the upper third
   of the page): two large, equal-weight panels side by side. This is the
   *decision*. A visitor who knows what they want never has to scroll past here.
2. **The Expansions** (Sections D and E): each door opens into its full content —
   Door A → the persona cards, Door B → the Domains × Modules map. These are the
   *destinations within the page* before the destinations *off* the page.

**Equality is enforced visually and structurally** (the MUST-LAND): identical
panel dimensions, identical type scale, mirrored copy structure, symmetric color
treatment (one warm-neutral door, one cool-neutral door — equal saturation,
neither louder). On desktop they sit at a true 50/50 split with a thin seam
between them; on mobile they stack with identical heights and a "or" divider so
neither reads as primary/secondary.

**Anti-soul-less defense, restated as a rule:** every door's headline is written
in *stakes language*, not category language.

- Door A is **not** "Browse by role." It is **"I own the outcome."**
- Door B is **not** "Browse by problem." It is **"Something is breaking."**

The labels carry the fear anchor and the coordination-tax thesis *inside the
choice itself*, so even a pure router has a point of view.

---

## 4. Section-by-section IA

Altitude rule stated for each block. Source DB cited. Real MD values inline.

### A. Hero + the two-door promise
**Source:** Industries → Opportunity, Regulatory Vocabulary, Economics.
**Altitude:** one promise, one frame, one number; *the choice is previewed here.*

- **Headline:** "Two ways in. One operating truth for medical devices."
- **Subhead:** names both doors in one breath — "Whether you own the audit
  outcome or you own the schedule, the coordination tax lands on you. Enter by
  your role, or enter by what's breaking." This satisfies §4's "both ingress
  systems visible above the fold's reach" by **stating the two doors as the
  hero's actual promise.**
- **One number, chosen for breadth not drama:** "Coverage across **9 of the 12
  domains** where coordination tax accumulates." (From `md-module-map.ts` — the
  9 featured domains == the Opportunity coverage claim.) This is a *routing*
  number, on-brand for a doors page: it tells you the second door is wide.
- **Regulatory frame strip** (quiet, single row of chips): `21 CFR 820` ·
  `21 CFR Part 11` · `ISO 13485` · `ISO 14971` · `EU MDR` · `21 CFR 803` —
  the lead 6 of 19 standards (`MD_STANDARDS`). Establishes "this page knows
  devices" before asking anyone to choose. No expansion.
- **No feature list. No CTA-stack.** The hero's only forward motion is *toward
  the doors.* A single muted scroll cue ("choose your way in ↓").

### B. The threshold — one stakes line + the frame
**Source:** Consequences (named, no $) + Industries economics.
**Altitude:** named stakes only; no fake $, no five-type grid expanded.

This is the *soul insurance*. Before the doors, one tight band gives the page a
pulse so the choice feels consequential:

- **One stakes sentence**, distilled from the Consequences DB (qualitative, never
  with invented $): "Long cycle times, audit findings that age, recall scope that
  expands, cash trapped in quarantine — every one of these is **coordination
  failing across functions**, not a single team failing." Names the five
  consequence *families* (Cycle time, Compliance drag, Revenue risk, Working
  capital, COPQ) in prose without a number on any of them (obeys the
  do-NOT-publish rule).
- **One economic anchor, framed as scale not proof:** "$75.2M–$808.1M a year in
  estimated coordination tax across the segment" (`MD_ECONOMICS.annualTaxLow/High`)
  — presented as the *size of the problem the two doors lead into*, not as a
  validated result. (Range, not a single fake figure.)
- This band is **deliberately short** — 2–3 lines and a number. Its job is to
  earn the doors, not to compete with them.

### C. THE TWO DOORS — the chooser (centerpiece)
**Source:** the ingress systems themselves (Personas; Domains × Modules).
**Altitude:** labels + one teaser line each; the choice, nothing more.

Two equal panels. This is the page's reason to exist.

| | **Door A — by your role** | **Door B — by what's breaking** |
|---|---|---|
| **Label** | "I own the outcome." | "Something is breaking." |
| **Subline** | "Find your seat. We'll show you the decisions that land on your desk and where they're slipping." | "Start from the failure. We'll route you to the domain — and the module — that governs it." |
| **Teaser chips** | VP Quality · COO / VP Ops · Head of RA · Validation Lead | CAPA · Change Control · Production Hold · Recall · Supplier · DHF |
| **Footer** | "5 roles →" | "9 domains · 24 modules →" |
| **Action** | smooth-scroll to **Door A expanded (§D)** | smooth-scroll to **Door B expanded (§E)** |

The chips are *previews of the ingress targets*, not links themselves — the click
target is the whole panel. Hover state lifts the panel and reveals a one-line
"because…" (Door A: "because the coordination tax has an owner — you"; Door B:
"because every failure traces to one root cause"). The two "because" lines
quietly seed the thesis (§G) without stealing its slot.

### D. Door A expanded — Personas (PERSONA INGRESS)
**Source:** Buyer Personas via the single MD ICP (`MD_PERSONA` + brief §2.10).
**Altitude:** title cluster + one cares/worries pair + a domain-count; link out.
**NO day-in-the-life.**

Five persona cards, in a row that mirrors the chip order from Door A. Each card:

- **Persona name + title cluster** (the recognizable seats).
- **One "cares about" line + one "worries about" line** (verbatim from the
  canonical persona fields where available).
- **A routing footer:** "owns N of the 9 domains →" — the bridge that connects
  Door A back to Door B (a persona card tells you which problem-doors are *yours*).
- **A badge on Operations Leader:** "the one who signs" (it is the only
  `Goal Zero = Pass` / economic-buyer persona) — surfaced as a *role fact*, never
  as the internal status string.

| Persona (card) | Cares (1 line) | Worries (1 line) | Routes to (persona page) | Owns domains → |
|---|---|---|---|---|
| **VP Quality / Quality governance** *(primary buyer)* | Release confidence, audit outcomes, traceability, recurrence | Missing evidence, unclear approvals, repeat findings, release risk | `/industries/medical-devices/quality-manager` *(live persona page)* | Quality, Doc & Records, Training, Post-Market |
| **COO / VP Operations** *(economic buyer · "the one who signs")* | Output, stability, delivery, cross-functional execution | Missed shipments, schedule instability, firefighting, slow decisions | `/industries/medical-devices/operations-leader` *(to build)* | Operations, Change Control |
| **Head of Regulatory Affairs** | Submission timelines, multi-market label currency, MDR/vigilance clocks | Missed reporting deadlines, label drift across markets | `/industries/medical-devices/regulatory-affairs` *(to build)* | Regulatory Affairs, Post-Market |
| **Validation / Compliance Lead** *(procurement gatekeeper)* | Validated state, audit-readiness by default | IQ/OQ/PQ burden, unproven systems | `/industries/medical-devices/compliance-validation` *(to build)* | Doc & Records, Training |
| **VP R&D / Engineering** *(NPI + engineering-change governance)* | Stage-gate velocity without losing rationale | Approvals stuck in email, change not propagated | `/industries/medical-devices/product-development` *(to build)* | Product Development, Change Control |

> Note on persona count: brief §2.10 lists 3 core personas reached via the MD ICP
> plus adjacent doors (engineering-change, supplier-quality, NPI). This direction
> surfaces **5 role-cards** — the 3 core + the two highest-signal adjacents
> (Validation gatekeeper, because they block procurement; R&D, because they own
> the highest-coordination event). If engineering build wants strict 3, collapse
> R&D and Validation into "adjacent roles" links. **Recommended: 5.**

### E. Door B expanded — Domains × Modules map (MODULE INGRESS)
**Source:** `MD_DOMAIN_MAP` (Domains DB → Modules), 9 of 12 domains.
**Altitude:** domain name + owner + one-line promise; module name + one line +
link. **NO mechanics.**

The full coverage map, laid out as **9 domain blocks**, primary tier first. Each
domain block: name, budget owner (the bridge *back* to Door A), the one-line
promise, then its modules as a tight list of name + buyer-voice blurb + link.

Live link today: **only Change Control** has a module page
(`/industries/medical-devices/change-control`). Every other module renders as a
*named door with a "module page →" affordance pointing at its future route* (see
the routing map, §H). This is honest per the brief: name + tease, link where it
exists, signpost where it will.

**Primary domains (pillars):**
- **Quality** — *owner VP Quality / QA Director.* "Your most visible audit
  surface — where the decision trace either exists or has to be rebuilt." Modules:
  CAPA & Effectiveness · Nonconformance / NCR · MRB Disposition · Deviation
  Management · Internal Audit.
- **Product Development** — *owner VP R&D / VP Engineering.* "Stage-gated
  decisions that lose their rationale when approvals live in email." Modules:
  **Change Control (ECO)** *(live page)* · Design Controls / DHF · Design
  Transfer / NPI · Risk Management File.
- **Supplier Management** — *owner CPO / SQ Director.* "Coordination tax across
  organisational boundaries." Modules: Supplier Qualification / PPAP · SCAR ·
  Incoming Inspection / MRB · Quality Agreements.
- **Operations** — *owner VP Ops / Plant Manager.* "Commit points made in
  escalation calls with no durable decision trace." Modules: Production Hold
  Disposition · WIP / MRB Backlog · Batch / DHR Review.

**Secondary domains (MD-critical doors):**
- **Change Control** — *owner VP Engineering.* Modules: **Engineering Change
  (ECO/ECR)** *(live page)* · Controlled Distribution.
- **Document & Records Control** — *owner VP Quality / Doc Control.* Modules:
  Document Control · Periodic Review.
- **Training & Competency** — *owner VP Quality / Training.* Modules: Training
  Cascades · Competency / Re-qualification.
- **Post-Market & Recall** — *owner VP Quality / CMO.* Modules: Complaint / MDR
  Reporting · Recall Execution.
- **Regulatory Affairs** — *owner Head of RA.* Modules: Label Governance ·
  510(k) / PMA Submission.

Each domain block also shows **owner-name as a chip that links up to that
persona's card** — closing the loop between the two doors (a problem-first visitor
can find out *whose* problem this is and switch to the role door).

### F. Why-now triggers band (the cross-router)
**Source:** Trigger Events DB (33 of 37 linked; `MD_TRIGGERS`).
**Altitude:** names + severity/clock badge only; no remediation detail.
**Ingress:** → routes into **both** doors.

Placed *after* the doors deliberately: it is the **bridge between the two doors**
for the visitor who didn't self-sort. A horizontal band of trigger chips, each
badged with its clock/severity, and each chip routing to *both* its owning persona
and its governing module:

- "FDA Warning Letter received" → Quality persona + CAPA / Post-Market modules
- "Form 483 observation issued" → Quality persona + Internal Audit / DHF
- "MDR / vigilance reporting deadline" *(30-day FDA / 15-day EU clock badge)* →
  RA persona + Complaint/MDR Reporting module
- "Recall scope to be defined" → Quality+Ops personas + Recall Execution module
- "DHF gap found at audit" → R&D persona + Design Controls / DHF module
- "Production hold pending disposition" → Ops persona + Production Hold module
- "Supplier-caused line stop" → Ops+Supplier personas + Incoming Inspection / SCAR
- "Data integrity finding" → Quality persona + Document Control module

This band is the *only* place both doors visibly converge — it demonstrates that
"by role" and "by problem" are two views of one graph. Honest provenance: all 33
triggers are `Goal Zero = Pending`, so these are framed strictly as *moments*, not
as proof.

### G. The structural why — thesis spine
**Source:** Root Causes DB (`MD_ROOT_CAUSE`, 2 canonical).
**Altitude:** one-line thesis; no taxonomy.

A single quiet full-measure line that explains *why two doors lead to one place*:

> "Two doors, one cause. **No shared operational truth** — the system of record is
> separate from the system of coordination, so cross-functional work runs on
> ungoverned channels. Whichever door you came in, this is what you hit."

Plus the second canonical cause as a one-liner: "And the records capture *what*
was decided, never *why* — the **missing decision trace.**" No amplifier list, no
diagram. This is the line that turns a router into an argument.

### H. Proof
**Source:** Industries Proof + `MD_PROOF` (Advocacy maturity).
**Altitude:** anonymized %, named customers, placeholder for screens.

- **The one usable number:** "An FDA-regulated device manufacturer recovered
  **$81,350 a year — about 41%** — against a signed **$198,150** baseline, in the
  first year, on non-conformance coordination cost." Attributed
  "Customer-attested · medical devices."
- **Named customers (logos/words only):** **Recovery Force** (Class I/II
  wearables — CAPA, document control, training, complaints on Unifize) ·
  **Harmonic Bionics** (surgical robotics — quality + change control on one
  thread).
- **Labeled placeholder slot** for the packaged product screen ("Screen — coming
  with Sachin's prototype"). Never fake a shipped UI (do-NOT-publish §2).

### I. Why Unifize / competitive contrast
**Source:** Industries → Competitive Landscape (`MD_COMPETITORS`).
**Altitude:** differentiator + named incumbents; "coexists with the QMS."

- **The differentiator, tied to the doors thesis:** "Both doors end at the same
  place the incumbents can't reach. **MasterControl** and the rest track document
  *status*; **Unifize reconstructs the decision trace across functions.**"
- Named incumbents as a quiet contrast row: MasterControl (primary; strong doc
  control, weak cross-functional coordination) · Veeva Vault Quality
  (pharma-focused) · ETQ Reliance (mid-market) · Greenlight Guru (device-specific,
  smaller cos).
- **Coexistence line:** "Coexists with the QMS/PLM/MES you already validated — no
  rip-and-replace."

### J. Close / demo
**Altitude:** single clear CTA.

- One line that re-states the choice as the close: "Still deciding which door?
  Book a 30-minute walkthrough and we'll start from whichever one is on fire."
- Single primary CTA: **Book a walkthrough.** Secondary, low-emphasis: "or pick a
  door above." No form wall on the page.

---

## 5. ASCII wireframe (whole page)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ▌Unifize        Platform   Industries▾   Pricing            [ Book demo ] │  nav
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   MEDICAL DEVICES                                                          │  A. HERO
│                                                                            │
│   Two ways in.                                                            │
│   One operating truth for medical devices.                                │
│                                                                            │
│   Whether you own the audit outcome or you own the schedule, the          │
│   coordination tax lands on you. Enter by your role, or enter by          │
│   what's breaking — we'll take you straight to where Unifize comes in.     │
│                                                                            │
│   ◇ Coverage across 9 of the 12 domains where coordination tax lands       │
│                                                                            │
│   [21 CFR 820] [Part 11] [ISO 13485] [ISO 14971] [EU MDR] [21 CFR 803]     │  reg frame
│                                                                            │
│                         choose your way in  ↓                              │
├──────────────────────────────────────────────────────────────────────────┤
│  ── THE THRESHOLD ───────────────────────────────────────────────────────  │  B. STAKES
│  Long cycle times, audit findings that age, recall scope that expands,     │
│  cash trapped in quarantine — every one is coordination failing across     │
│  functions, not one team failing.                                         │
│  Est. segment coordination tax: $75.2M – $808.1M / yr            (scale)   │
├──────────────────────────────────────────────────────────────────────────┤
│  ╔══════════════════════════════╗  ║  ╔══════════════════════════════╗     │  C. THE
│  ║  DOOR A — by your role        ║  ║  ║  DOOR B — by what's breaking  ║     │  TWO DOORS
│  ║                               ║  ║  ║                               ║     │  (centerpiece)
│  ║  "I own the outcome."         ║  ║  ║  "Something is breaking."     ║     │
│  ║                               ║  ║  ║                               ║     │  equal
│  ║  Find your seat. We'll show   ║  ║  ║  Start from the failure.      ║     │  50 / 50
│  ║  the decisions on your desk   ║  ║  ║  We route you to the domain   ║     │
│  ║  and where they're slipping.  ║  ║  ║  and the module that governs  ║     │
│  ║                               ║  ║  ║  it.                          ║     │
│  ║  VP Quality · COO/Ops · RA ·  ║  ║  ║  CAPA · Change Control ·      ║     │
│  ║  Validation · R&D             ║  ║  ║  Hold · Recall · Supplier ·DHF║     │
│  ║                               ║  ║  ║                               ║     │
│  ║         5 roles →             ║  ║  ║   9 domains · 24 modules →     ║     │
│  ╚══════════════════════════════╝  ║  ╚══════════════════════════════╝     │
│        ↓ scrolls to §D              seam        ↓ scrolls to §E             │
├──────────────────────────────────────────────────────────────────────────┤
│  ▶ DOOR A — WHO IT'S FOR  (PERSONA INGRESS)                                │  D. PERSONAS
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐ ┌──────────┐   │
│  │ VP QUALITY │ │ COO / OPS  │ │ HEAD OF RA │ │VALIDATION│ │ VP R&D   │   │
│  │ primary    │ │ ▣ the one  │ │            │ │gatekeeper│ │          │   │
│  │ buyer      │ │   who signs│ │            │ │          │ │          │   │
│  │ cares: ... │ │ cares: ... │ │ cares: ... │ │cares: ...│ │cares:... │   │
│  │ worries:...│ │ worries:...│ │ worries:...│ │worries..│ │worries..│   │
│  │ owns 4 ⇩   │ │ owns 2 ⇩   │ │ owns 2 ⇩   │ │ owns 2 ⇩ │ │ owns 2 ⇩ │   │
│  │ persona →  │ │ persona →  │ │ persona →  │ │persona → │ │persona → │   │
│  └────────────┘ └────────────┘ └────────────┘ └──────────┘ └──────────┘   │
├──────────────────────────────────────────────────────────────────────────┤
│  ▶ DOOR B — WHERE UNIFIZE COMES IN  (MODULE INGRESS · Domains × Modules)   │  E. MAP
│  ┌─ PRIMARY ────────────────────────────────────────────────────────────┐ │
│  │ QUALITY · owner VP Quality⇧                                           │ │
│  │   "your most visible audit surface"                                   │ │
│  │   CAPA & Effectiveness →   NCR →   MRB →   Deviation →  Int. Audit →   │ │
│  │ PRODUCT DEVELOPMENT · owner VP R&D⇧                                   │ │
│  │   Change Control (ECO) ●LIVE→   Design Controls/DHF →  NPI →  Risk →  │ │
│  │ SUPPLIER MANAGEMENT · owner CPO⇧                                      │ │
│  │   Supplier Qual/PPAP →   SCAR →   Incoming Insp/MRB →  Qual Agmt →    │ │
│  │ OPERATIONS · owner VP Ops⇧                                            │ │
│  │   Production Hold →   WIP/MRB Backlog →   Batch/DHR Review →           │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│  ┌─ SECONDARY (MD-critical doors) ──────────────────────────────────────┐ │
│  │ CHANGE CONTROL⇧:  Engineering Change ●LIVE→   Controlled Dist. →      │ │
│  │ DOC & RECORDS⇧:   Document Control →   Periodic Review →              │ │
│  │ TRAINING⇧:        Training Cascades →   Competency/Re-qual →          │ │
│  │ POST-MARKET⇧:     Complaint/MDR →   Recall Execution →                │ │
│  │ REGULATORY⇧:      Label Governance →   510(k)/PMA →                   │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────┤
│  ── WHY NOW · the moments that send you through a door ──────────────────  │  F. TRIGGERS
│  [Warning Letter]→Q+CAPA  [483]→Q+Audit  [MDR ⏱30/15d]→RA+Complaint        │  (cross-router)
│  [Recall scope]→Q/Ops+Recall  [DHF gap]→R&D+DHF  [Prod hold]→Ops+Hold      │
│  [Supplier line-stop]→Ops/Supp+SCAR  [Data integrity]→Q+DocControl         │
├──────────────────────────────────────────────────────────────────────────┤
│  TWO DOORS, ONE CAUSE.  No shared operational truth — record is split from │  G. THESIS
│  coordination; cross-functional work runs on ungoverned channels.         │
│  And the records never capture WHY — the missing decision trace.          │
├──────────────────────────────────────────────────────────────────────────┤
│  PROOF   $81,350 / yr recovered (~41%) vs a signed $198,150 baseline,      │  H. PROOF
│          year one · non-conformance coordination cost · customer-attested │
│          Recovery Force · Harmonic Bionics      [ screen slot — coming ]   │
├──────────────────────────────────────────────────────────────────────────┤
│  WHY UNIFIZE   Both doors end where incumbents can't reach. MasterControl  │  I. CONTRAST
│  tracks document status; Unifize reconstructs the decision trace.          │
│  MasterControl · Veeva · ETQ · Greenlight Guru   ·  coexists with the QMS  │
├──────────────────────────────────────────────────────────────────────────┤
│         Still deciding which door? Book a 30-min walkthrough.              │  J. CLOSE
│                       [ Book a walkthrough ]   or pick a door above        │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Fresh visual language

Distinct from the current Unifize site; enterprise-modern-minimal, wider measure.
The governing metaphor is **threshold + doorway**: restraint, symmetry, and a
sense of *passage*.

**Layout & grid.** A **12-column grid at a wider container (max ~1240px)** with
generous gutters. The doors section breaks to a true **6+6 split** with a 1px seam
column between. Everything else lives in a **wider single measure (~760px) for
prose**, which delivers the brief's "slightly wider than the standard site."
Vertical rhythm is large — sections are separated by full-bleed hairline rules
(the "thresholds" you cross), not by colored bands.

**Type.** Two families. **Headlines:** a confident modern grotesque
(e.g. *Söhne* / *Neue Haas Grotesk* / Inter Display as the free fallback) at
large display sizes with tight tracking — the doors' labels ("I own the outcome.")
are set big enough to feel like signage. **Body:** the same grotesque at a calm
reading size, or a humanist sans for warmth. **Mono accent** (e.g. *Berkeley Mono*
/ JetBrains Mono) reserved exclusively for **regulatory tokens and clock badges**
(`21 CFR 820`, `⏱ 30d`) — this is the "device credibility" texture and nothing
else uses mono.

**Color.** A near-monochrome enterprise base — **paper white / ink near-black**
with a single graphite mid-tone for structure. The **two doors carry the only
real color**, and they must be *equal in weight*:
- **Door A (Role):** a warm neutral — soft clay / sand (`oklch(~0.92 0.03 70)`),
  ink text. "Human, who-you-are."
- **Door B (Problem):** a cool neutral — pale slate / steel
  (`oklch(~0.92 0.03 245)`), ink text. "Mechanical, what-broke."
- The two hues sit at **identical lightness and chroma** — only hue differs — so
  neither door dominates. (Run the `oklch` skill at build to lock equal L/C and
  verify AA contrast on text.)
- One **accent ink** (a deep authoritative teal or oxblood) used *only* for live
  links / the proof number / the primary CTA — the one place the eye is allowed
  to be pulled.

**Texture.** Almost none, by design (restraint over decoration). The single
motif: a **thin vertical seam** between the doors that subtly extends as a faint
guide-line through the page, visually reminding you that two paths run in parallel
to one destination. Optional: a barely-there **lined-paper / ledger hairline**
background at <4% opacity in the threshold and proof bands to evoke the
records-and-evidence world without literal skeuomorphism.

**Motion (restrained, purposeful).**
- On scroll into the doors: the two panels **slide in from opposite edges** and
  meet at the seam — a literal "two doors closing into one frame."
- Hover on a door: panel **lifts 4px**, the "because…" line fades in, the seam
  brightens. The *non*-hovered door dims ~8% (never more — equality preserved).
- Clicking a door does a **smooth-scroll** to its expansion with a brief
  highlight pulse on the target heading (so the connection door→expansion is felt).
- Trigger chips (§F): on hover, **two faint connector lines** draw from the chip
  to its persona card *and* its module — visually proving the two-door duality.
- All motion respects `prefers-reduced-motion` (panels just fade).

**Iconography.** No clip-art. At most a **single hairline glyph per door** — a
minimal doorway/arch outline — drawn in the same stroke weight as the rules.
Persona cards and module rows use **no icons**; type and spacing carry hierarchy.

---

## 7. How BOTH ingress systems are expressed

This is the whole point of the direction, so it is explicit and redundant by
design (a buyer meets the duality at least three times):

1. **In the hero promise (§A):** the subhead *names both doors in one sentence* —
   "enter by your role, or enter by what's breaking." Ingress duality is the
   headline-level promise, satisfying "both visible above the fold's reach" (§4).
2. **In the chooser (§C):** the two doors are the literal centerpiece, equal and
   side-by-side — the strongest possible statement that the page has two ingress
   systems and they are peers.
3. **In the expansions (§D persona cards, §E Domains × Modules map):** each
   ingress system gets its full, altitude-correct treatment — Door A = the persona
   ingress (5 role cards → persona pages); Door B = the module ingress (9 domains →
   24 modules → module pages).
4. **In the cross-links:** persona cards show "owns N domains ⇩" (Door A → Door B);
   domain blocks show "owner ⇧" linking back to the persona (Door B → Door A); and
   the trigger band (§F) routes *every* chip into **both** a persona and a module.
   The two doors are never presented as a fork the visitor is locked into — they
   are two views of one graph, and the page lets you cross between them.

---

## 8. The routing map (where every link goes)

**Build target:** new exploration route, e.g.
`/explorations/industry-template` (MD instance). Production
`/industries/[slug]` stays untouched (locked §0). Routes below use the
`/industries/medical-devices/…` namespace the existing live pages already use, so
grafting onto production later is a path-prefix swap.

**Legend:** ● live today · ○ to build (named/teased now, link signposted).

### Door A → Persona pages (PERSONA INGRESS)
| Card | Route | State |
|---|---|---|
| VP Quality / Quality governance | `/industries/medical-devices/quality-manager` | ● live (`quality-manager/page.tsx`) |
| COO / VP Operations (economic buyer) | `/industries/medical-devices/operations-leader` | ○ to build |
| Head of Regulatory Affairs | `/industries/medical-devices/regulatory-affairs` | ○ to build |
| Validation / Compliance Lead | `/industries/medical-devices/compliance-validation` | ○ to build |
| VP R&D / Engineering | `/industries/medical-devices/product-development` | ○ to build |

### Door B → Module pages (MODULE INGRESS)
Driven by `MD_DOMAIN_MAP`. Where a module row already has an `href`, use it (only
Change Control does today). All others point at a deterministic future route
`/industries/medical-devices/<module-slug>` and render with a "module page →"
affordance until the route ships.

| Domain | Module | Route | State |
|---|---|---|---|
| Product Development | **Change Control (ECO)** | `/industries/medical-devices/change-control` | ● live (`href` in map) |
| Change Control | **Engineering Change (ECO/ECR)** | `/industries/medical-devices/change-control` | ● live (`href` in map) |
| Quality | CAPA & Effectiveness | `…/capa` | ○ |
| Quality | Nonconformance / NCR | `…/ncr` | ○ |
| Quality | MRB Disposition | `…/mrb` | ○ |
| Quality | Deviation Management | `…/deviation` | ○ |
| Quality | Internal Audit | `…/internal-audit` | ○ |
| Product Development | Design Controls / DHF | `…/design-controls` | ○ |
| Product Development | Design Transfer / NPI | `…/design-transfer` | ○ |
| Product Development | Risk Management File | `…/risk-management` | ○ |
| Supplier Management | Supplier Qualification / PPAP | `…/supplier-qualification` | ○ |
| Supplier Management | SCAR / Supplier CAPA | `…/scar` | ○ |
| Supplier Management | Incoming Inspection / MRB | `…/incoming-inspection` | ○ |
| Supplier Management | Quality Agreements | `…/quality-agreements` | ○ |
| Operations | Production Hold Disposition | `…/production-hold` | ○ |
| Operations | WIP / MRB Backlog | `…/wip-mrb` | ○ |
| Operations | Batch / DHR Review | `…/dhr-review` | ○ |
| Change Control | Controlled Distribution | `…/controlled-distribution` | ○ |
| Doc & Records | Document Control | `…/document-control` | ○ |
| Doc & Records | Periodic Review | `…/periodic-review` | ○ |
| Training & Competency | Training Cascades | `…/training-cascades` | ○ |
| Training & Competency | Competency / Re-qualification | `…/competency` | ○ |
| Post-Market & Recall | Complaint / MDR Reporting | `…/complaint-mdr` | ○ |
| Post-Market & Recall | Recall Execution | `…/recall-execution` | ○ |
| Regulatory Affairs | Label Governance | `…/label-governance` | ○ |
| Regulatory Affairs | 510(k) / PMA Submission | `…/510k-pma` | ○ |

### Cross-links (the two doors talking to each other)
- Persona card "owns N domains ⇩" → smooth-scroll to that domain block(s) in §E.
- Domain "owner ⇧" chip → smooth-scroll to that persona card in §D.
- Trigger chip (§F) → **dual route**: opens a tiny tooltip with two links, one to
  the owning persona page, one to the governing module page (table below).

| Trigger | Persona route | Module route |
|---|---|---|
| FDA Warning Letter received | `…/quality-manager` | `…/capa` |
| Form 483 observation issued | `…/quality-manager` | `…/internal-audit` |
| MDR / vigilance deadline (⏱30d/15d) | `…/regulatory-affairs` | `…/complaint-mdr` |
| Recall scope to be defined | `…/quality-manager` + `…/operations-leader` | `…/recall-execution` |
| DHF gap found at audit | `…/product-development` | `…/design-controls` |
| Production hold pending disposition | `…/operations-leader` | `…/production-hold` |
| Supplier-caused line stop | `…/operations-leader` | `…/scar` |
| Data integrity finding | `…/quality-manager` | `…/document-control` |

### Off-page
- Primary CTA "Book a walkthrough" → existing demo/contact route (`/demo`).
- Regulatory chips (hero) → **non-links** (frame only, no destination).
- Proof customers (Recovery Force, Harmonic Bionics) → **non-links / words only**
  unless a case-study page exists (none wired today — `MD_NEEDS_BEN.namedCustomer`).

---

## 9. Engineering notes (build-ready)

- **Data binding.** Door B renders by mapping `MD_DOMAIN_MAP`; module `href` is
  used where present (Change Control), else compose `…/<slug>` and gate behind a
  `live: boolean` so ○ doors render the "module page →" affordance without a dead
  link. Door A renders from a small persona array (extend `MD_PERSONA` to the 5
  cards, or add `MD_PERSONAS[]`) — keep `cares`/`worries` one-line each.
- **Counts are computed, not typed.** "9 domains" = `MD_DOMAIN_MAP.length`;
  "24 modules" = sum of `domain.modules.length`; "5 roles" = persona array length.
  This keeps the hero/chooser honest if the map changes.
- **Trigger band** maps `MD_TRIGGERS` to a `{ persona, module, clock? }` lookup
  (the table in §8). Only MDR carries a clock badge (30-day FDA / 15-day EU).
- **Provenance honesty enforced in code:** the `$75.2M–$808.1M` range comes from
  `MD_ECONOMICS.annualTaxLow/High` (never a single figure); the proof block reads
  `MD_PROOF.stat` (41% / $81,350 / $198,150) verbatim; no Consequence renders a $;
  no Goal Zero / Hypothesis / Pending string ever reaches the DOM.
- **Template-ready:** the page component takes the industry's
  `{ economics, domainMap, personas, triggers, proof, competitors }` as props so
  Pharma/Aerospace instances drop in the same shape. MD is the proof instance.
- **Accessibility:** the two doors are real `<a>`/`<button>` with descriptive
  labels ("Enter by your role — see the 5 buyer roles"); the visual 50/50 split
  must keep keyboard order Door A → Door B; reduced-motion fallback = fade.

---

## 10. Why this wins / where it's weak (honest self-assessment)

**Strengths against the tournament rubric (§6):**
- **Routing clarity (weighted):** structurally unbeatable — the page *is* the
  router; both ingress systems are the centerpiece. Should top the board here.
- **Recognition:** strong for *both* primary (Quality, by role) and economic (Ops,
  by problem) buyers simultaneously — the self-sort is the recognition.
- **Credibility:** the threshold + thesis + honest proof give it a spine; no
  invented metrics; ranges and "customer-attested" language survive a skeptic.

**Weaknesses / risks (and the grafts to watch):**
- **Soul risk (the named risk).** Mitigated by the threshold band and stakes-laden
  door labels, but if executed flatly it can still read as a fancy menu. If it
  underperforms on *Pull*, **graft the opening emotional punch from `04 The
  Mirror`** (lead the threshold with one verbatim symptom line — "We spend more
  time coordinating the work than doing the work") to add a human pulse.
- **Differentiation** is deferred to §I/§G; a skeptic might choose a door before
  reaching the decision-trace claim. If *Differentiation* scores low, **graft the
  one-line decision-trace contrast from `05 The Decision Trace`** *up* into the
  threshold so the point-of-view lands pre-choice.
- **Economic-buyer drama:** the COO may want the P&L framing sooner. If Ops scores
  the doors low on Pull, **graft the coordination-tax ledger framing from `01`**
  into Door B's header (problem door = the expensive door).
