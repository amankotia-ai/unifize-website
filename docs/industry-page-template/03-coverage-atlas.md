# 03 — The Coverage Atlas

> **Direction key:** `03-coverage-atlas`
> **Instanced on:** Medical Devices (`IND-28`)
> **Build route:** `/explorations/industry-template` (the production `/industries/[slug]` stays untouched)
> **Traces to:** `docs/industry-page-template/00-overview-and-model.md` · `src/lib/platform-data/md-module-map.ts` · `src/lib/platform-data/medical-devices-canonical.ts`

---

## 0. Thesis

**The map is not a section of this page. The map is the page.**

Every other direction treats the Domains × Modules map as the payoff at the end of a narrative (recognize → why → stakes → *here's where we come in*). The Coverage Atlas inverts that. It opens with the map at full bleed, because the angle is **breadth-first**: the single question this page answers, before any story, is the one the scanning buyer is actually asking — *"do they cover my problem area, and where do I click?"*

This is the **purest expression of the routing-hub job** described in the brief (§0): "make the buyer feel seen at breadth, then distribute into the right module and persona pages." The Atlas makes "seen at breadth" *literal* — you can see all 9 of the 12 coordination domains and all ~26 module doors in one view, the way you'd see every country on a world map before zooming into one. Recognition here is not "this symptom sounds like my Tuesday"; it is **"that's my whole org on one chart, and they cover almost all of it."**

The narrative blocks (why-now, the structural why, stakes, proof, why-Unifize) still exist — the IA arc is not discarded — but they are **demoted to supporting evidence that orbits the map**, not a runway leading up to it. The buyer who already knows their problem area never has to read them. The buyer who needs convincing scrolls past the map into them.

**For whom:** a buyer scanning for coverage — *any* of the function leaders, not one in particular. VP Quality lands and looks for the Quality column. VP Ops looks for Operations. Head of RA looks for Regulatory Affairs. The Supplier Quality Director looks for Supplier Management. The Atlas is the one shape that serves all of them equally well in the first five seconds, because it doesn't privilege one persona's story — it shows the whole territory and lets each buyer find their own region.

**What must land (and the failure mode to avoid):** the map must route *cleanly* to module pages **and coexist with the persona ingress** — without collapsing into a feature wall. A feature wall is 26 equal-weight tiles screaming for attention; an atlas is a *legible territory* with hierarchy, owners, and a clear "you are here." The discipline that separates the two is **altitude**: domain name + owner + one-line promise, module name + one-line blurb, and a link out. Never module mechanics. Never the deep change-control flow. Never a persona day-in-the-life. The Atlas earns its size by being *shallow and wide*, not deep.

---

## 1. Why this shape, for the routing-hub job

A routing hub has exactly one success metric: **the buyer leaves for the right next page.** Three properties make the Atlas the strongest hub shape:

1. **Breadth is visible before the fold's reach is exhausted.** The brief's hard constraint (§4) is that "both ingress systems are visible above the fold's reach" and that the two ingress blocks "are the spine, not afterthoughts." The Atlas satisfies this maximally: the *module* ingress IS the hero, and the *persona* ingress sits as a co-equal rail/strip docked to it. A buyer senses "I can enter by my problem or by my role" in the first viewport — not after scrolling through a stakes argument.

2. **The coverage claim is self-evidencing.** "9 of 12 domains" is the Medical Devices Opportunity field's actual claim. Most directions *assert* breadth in a sentence. The Atlas *demonstrates* it — you can count the domains. For the breadth-scanning buyer, a demonstrated claim is worth ten asserted ones, and it survives the skeptic (a panel scorer) because nothing is invented — it's the literal domain roster.

3. **It's the most template-portable shape.** The brief requires the template to "generalize to other industries, with MD as the proof instance" (§4). An atlas of Domains × Modules is the single most structural, least-prose-dependent block in the whole model — Pharma, Aerospace, etc. each have their own domain subset and module roster, and the Atlas re-renders from `MD_DOMAIN_MAP`-shaped data with zero copy rewriting of the hero. The narrative directions lean on hand-authored MD voice; the Atlas leans on the data structure, which is exactly what a *template* wants.

**The risk this shape must actively manage** is the feature-wall collapse. The next section's whole job is to show how the Atlas stays an atlas. (See §7 Risks for the full register.)

---

## 2. Section-by-section IA — what's on the page, in order

The page is **map-dominant**: the Atlas occupies roughly the first two viewports. Everything after it is compressed evidence. Source DBs and exact MD values are named per block. Altitude rule restated per block.

---

### A · Atlas hero — map preview + frame + dual ingress
**Source:** Industries (Opportunity, Reg Vocab, Economics) → `MD_ECONOMICS`, `MD_STANDARDS`
**Ingress:** sets up BOTH (the map below = module ingress; the role chips = persona ingress)
**Altitude:** one promise, one frame, one number. No feature list, no story.

The hero is **not a separate illustrated band** — it is the *legend and on-ramp to the map directly beneath it*. It is deliberately short (≈ one-third viewport) so the map crests into view immediately. It carries:

- **Eyebrow:** `Medical Devices · Coverage Atlas`
- **H1:** *"Every place the coordination tax lands in a device operation — and the door out of each one."*
- **Subhead (the promise + the breadth claim, stated once):** *"Nine of the twelve coordination domains that run a Class II/III manufacturer."* Then the coexistence promise inline: *"Audited against your standards. Coexists with your QMS, ERP and PLM — no rip-and-replace."*
- **Regulatory frame chips** (the 6 lead standards, verbatim from `MD_STANDARDS`): `21 CFR 820` · `21 CFR Part 11` · `ISO 13485` · `ISO 14971` · `EU MDR 2017/745` · `21 CFR 803`. Rendered as a quiet monospace strip — this is the "one frame."
- **One economic number** (the "one number" rule): segment coordination tax **$75.2M–$808.1M / yr** across **81 companies · 1.215M employees**, from `MD_ECONOMICS.annualTaxLow/High`, `.companies`, `.employees`. Set small, as a caption to the breadth claim, NOT as a hero stat (this is the breadth direction, not the economics direction `01`).
- **The dual on-ramp, stated explicitly as the page's two doors:**
  - *"↓ Find your area on the map"* (anchors to the Atlas, B)
  - *"→ Or enter by your role"* (a row of 4 persona chips — Quality · Operations · Regulatory Affairs · Compliance & Validation — that deep-link to C / their persona pages)
- **CTA:** `Book a demo` (primary) · `See the platform` (ghost).

> **Editorial note:** the hero says the breadth claim *in words once* so it's SEO-legible and screen-reader-first, then the map *proves* it visually. No invented metric. The $-range is the only number and it's a real `MD_ECONOMICS` field.

---

### B · The Atlas — Domains × Modules (THE CENTERPIECE)
**Source:** Domains (9/12) → Modules → `MD_DOMAIN_MAP` (all 9 domains, ~26 modules)
**Ingress:** **MODULE INGRESS** (the primary one, given hero status)
**Altitude:** domain name + owner + one-line promise; module name + one-line blurb + standards chips + link out. **NO mechanics, no value-stream diagrams of the flow, no ProcessStraighten.**

This is the hero block. It is **not** the existing two-pane "pick one domain, see its modules" explorer (that hides 8 domains behind a click and undercuts the breadth claim). The Atlas shows **the whole territory at once**, then lets the buyer zoom.

**Layout: a single coverage grid — all 9 domains visible simultaneously, as columns/regions.**

- **9 domain regions**, ordered exactly as `MD_DOMAIN_MAP`: the **4 Primary pillars first** (Quality, Product Development, Supplier Management, Operations — given larger, bolder regions), then the **5 Secondary doors** (Change Control, Document & Records Control, Training & Competency, Post-Market & Recall, Regulatory Affairs — smaller, denser, but still on-screen). The Primary/Secondary tier difference is the visual hierarchy that keeps it an *atlas* (regions of different prominence) rather than a *wall* (26 equal tiles).
- **Each domain region header** carries: the domain **name**, the **owner** (verbatim from the row — e.g. Quality → *VP Quality / QA Director*; Operations → *VP Operations / Plant Manager*), a **module count badge** (e.g. Quality = 5), and the **one-line promise** condensed to ≤14 words (e.g. Quality → *"Your most visible audit surface — where the decision trace exists or has to be rebuilt."*).
- **Inside each region, the module doors** as compact rows: module **name** (e.g. *CAPA & Effectiveness*), a **one-line blurb** (verbatim/condensed from `MapModule.blurb`), **standards chips** (e.g. `21 CFR 820` · `ISO 13485`), and a **link affordance**. The only module with a **live** page is **Change Control (ECO)** → `/industries/medical-devices/change-control` — it renders with an active "Open the page →" treatment; every other module renders a "Module page →" affordance pointing at its (future) slug. (Provenance honesty: do not pretend the other 25 pages are live — but the door must still *look* like a destination, because routing is the job.)
- **The "you are here" mechanic — coverage filtering, not drill-down hiding.** Above the grid sits a thin filter rail with two facets, so the buyer can re-color the *whole map* without losing the breadth view:
  - **By role** (persona facet): clicking *Quality* dims everything except domains a Quality leader owns (Quality, Document & Records, Training, Post-Market, Regulatory Affairs); *Operations* highlights Operations + Production Hold/MRB; etc. This is the literal join between the two ingress systems — persona becomes a *lens over the module map*, which is the cleanest possible way to make them "coexist."
  - **By standard** (regulatory facet): clicking `21 CFR 803` highlights only the modules that evidence it (Complaint/MDR Reporting, Recall Execution). Clicking `EU MDR` highlights Label Governance. This serves the RA/Compliance scanner directly and reinforces credibility (the chips are real `standards` fields).
  - Default state = nothing dimmed (full coverage visible). Filters are additive, URL-syncable (`?role=quality`, `?std=21cfr803`) so a persona-page CTA can deep-link *into a pre-filtered Atlas*.
- **The "12 minus 3" honesty line**, small, under the grid: *"Nine of twelve coordination domains. The three not shown — [the 3 unlisted] — aren't where the device coordination tax concentrates."* This pre-empts the skeptic's "why not all 12?" and turns a gap into a credibility signal. (Altitude: name the absence, don't explain mechanics.)

> **Why a full grid and not the existing two-pane explorer:** the two-pane explorer is a *good module-page-finder* but a *bad breadth-prover* — it shows one domain at a time, so it can't make the "9 of 12" claim visible. The Atlas direction's entire thesis is the visible whole, so it must render all 9 regions at once. On mobile the grid reflows to a single scrollable column of collapsible domain regions (Primary expanded by default, Secondary collapsed), preserving the "scan all, then open one" behavior.

---

### C · Two ways in — persona ingress, co-equal with the map
**Source:** Buyer Personas (via the single MD ICP) → `MD_PERSONA`, plus the adjacent personas
**Ingress:** **PERSONA INGRESS** (the second one — deliberately docked right under the map, not buried at position 6)
**Altitude:** title cluster + one-line cares/worries + link to persona page. **NO day-in-the-life.**

The brief's non-negotiable is that *both* ingress systems are present and obvious. In a map-dominant page the danger is the persona ingress getting orphaned. The Atlas solves this by **putting the persona cards immediately after the map and framing them as the map's other axis** — same altitude, same prominence band, explicit header: *"The map shows what's broken. These show who owns it."*

Four persona cards (the buyer-relevant set from the brief), each linking to its persona page:

| Card | Tag | Titles (from `MD_PERSONA` / brief) | One-line cares → worries | Routes to |
|---|---|---|---|---|
| **Quality governance** | *Primary buyer* | VP Quality · Head of Quality · Quality Director · Quality Manager · QA Manager · RAQA Director | Release confidence & audit outcomes → missing evidence, repeat findings | `/explorations/medical-devices/quality-manager` (live) |
| **Operations Leader** | *Economic buyer* | COO · VP Operations · Plant Manager · GM · Site Director | Output & cross-functional execution → missed shipments, firefighting, slow decisions | persona page (future) |
| **Regulatory Affairs** | *Governance* | Head of RA · VP Regulatory | Submission timelines & label currency → MDR/vigilance deadlines | persona page (future) |
| **Compliance & Validation** | *Procurement gatekeeper* | Validation Manager · CSV Lead | Validated state & audit-readiness by default → the IQ/OQ/PQ gate | persona page (future) |

Each card carries a **"see your region on the map"** secondary link that deep-links back into B with that persona's filter pre-applied (`?role=...`). This makes the two ingress systems genuinely *interlock* rather than merely coexist — the cleanest answer to the "must coexist without becoming a feature wall" requirement.

> Adjacent doors (Engineering change governance · Supplier quality governance · Innovation/NPI execution) get a single muted line — *"Also serves: …"* — named, not carded. Altitude: name and move on.

---

### D · Why now — trigger moments, overlaid as map markers
**Source:** Trigger Events (33 of 37 link to MD) → `MD_TRIGGERS`
**Ingress:** → persona (a trigger hands off to the relevant role)
**Altitude:** names + severity/clock badges only. **NO remediation detail.**

Instead of a generic urgency band, the Atlas expresses "why now" *in its own idiom*: trigger moments are **the events that light up regions of the map.** A compact horizontal strip of the urgent cluster from `MD_TRIGGERS`, each as a badge with its severity/clock and a thin connector to the domain region it detonates:

- *FDA Warning Letter received* → Quality + Post-Market
- *Form 483 observation issued* → Quality + Document & Records
- *MDR / vigilance reporting deadline* (30-day FDA / 15-day EU clock) → Post-Market & Recall + Regulatory Affairs
- *Recall scope to be defined* → Post-Market & Recall
- *DHF gap found at audit* → Product Development
- *Production hold pending disposition* → Operations
- *Supplier-caused line stop* → Supplier Management
- *Data integrity finding* → Document & Records (21 CFR Part 11)

Clicking a trigger scroll-spies/highlights its region(s) up in the Atlas and surfaces the relevant persona card. This keeps the page *one coherent atlas* rather than a stack of unrelated sections — the trigger band is a temporal lens over the same territory. (Altitude: each is a named buy-now moment with a clock; no "here's how we fix it.")

---

### E · The structural why — the thesis spine
**Source:** Root Causes (2 canonical) → `MD_ROOT_CAUSE`
**Ingress:** —
**Altitude:** one-line thesis, no taxonomy.

A single quiet full-measure line under the trigger band, explaining *why the whole map leaks at the same seam*:

> **"No shared operational truth."** The system of record is separate from the system of coordination — so every domain on the map runs cross-functional work on email, meetings and spreadsheets. *And the records that result capture what was decided, not the reasoning and evidence at the time — the* **missing decision trace** *that turns an audit into an archaeology dig."*

This is the connective tissue that makes the Atlas more than a directory: it tells the buyer that the *reason* coverage matters is that one structural gap underlies every region. Two sentences. No amplifier taxonomy (the 5 amplifiers stay on root-cause depth pages).

---

### F · What it costs — the five named consequences
**Source:** Consequences (5 types, qualitative) → `MD_CONSEQUENCES`
**Ingress:** —
**Altitude:** named consequences, **NO invented $** (this DB is qualitative by design).

Five compact word-tiles, no numbers, framed as *"what the leak costs in every region of the map"*:
**Cycle Time** (long cycles; delayed time to market) · **Cost of Poor Quality** (coordination headcount embedded in COGS) · **Working Capital** (trapped cash / quarantine holds) · **Compliance Drag** (overdue controls; slow audit & customer proof; lagging post-market signal) · **Revenue Risk** (quality escapes & warranty; expanded recall scope; lost market access).

> Provenance discipline (brief §2 do-NOT-publish): **zero dollar figures here.** The only $ on the page are the segment tax range (hero, real `MD_ECONOMICS`) and the proof block (real customer-attested `MD_PROOF`).

---

### G · Proof
**Source:** Industries Proof + `MD_PROOF` (Advocacy maturity)
**Ingress:** —
**Altitude:** anonymized %, named customers, **labeled placeholder** for the screen.

One proof unit, kept tight because the Atlas is the star:

- **Stat:** *"A medical-device manufacturer recovered* **$81,350 a year — about 41%** *— against a signed* **$198,150** *baseline, in the first year,"* on **non-conformance coordination cost**. Attribution: *Customer-attested · medical devices* (from `MD_PROOF.stat`).
- **Named customers:** **Recovery Force** (FDA-regulated Class I/II wearables) · **Harmonic Bionics** (surgical robotics) — from `MD_PROOF.customers`.
- **Screen slot:** a clearly **labeled placeholder** (`ph` slot, "Product / dashboard screenshot") where Sachin's packaged prototype plugs in. **Never fake a UI as shipped** (brief §2, `MD_NEEDS_BEN.productScreens`).

> No "80% / 65% / 4×" invented headline metrics anywhere (explicitly on the do-NOT-publish list).

---

### H · Why Unifize — the differentiator + coexistence
**Source:** Industries Competitive Landscape → `MD_COMPETITORS`
**Ingress:** —
**Altitude:** the differentiator + named incumbents; "coexists with QMS."

A single contrast line, positioned as *why coverage of the map is only half the story*:

> **"Incumbents track document status. Unifize reconstructs the decision trace across functions."** — the verbatim `MD_COMPETITORS.differentiator`, set as the section's spine.

Named incumbents as quiet chips with their one-line read: **MasterControl** (primary incumbent — strong doc control, weak cross-functional coordination & real-time decision trace) · **Veeva Vault Quality** (pharma-focused) · **ETQ Reliance** (mid-market) · **Greenlight Guru** (device-specific, smaller cos). Coexistence restated: *"Sits on top of your validated QMS / ERP / PLM — no rip-and-replace."*

---

### I · Close / demo
**Source:** —
**Ingress:** —
**Altitude:** single clear CTA.

Dark close band, breadth-framed: *"You've seen the whole territory. Book 30 minutes and we'll walk your standards, your workflows, your systems."* Single primary CTA `Book a demo`, ghost `See the platform`. A small "back to the map ↑" link returns the scanner to the Atlas.

---

## 3. Full-page ASCII wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [ Unifize ]                      Platform  Industries  Pricing      [Demo →]  │  site header
├──────────────────────────────────────────────────────────────────────────────┤
│ A · ATLAS HERO  (short — ~⅓ viewport, it's the legend for the map below)        │
│                                                                                │
│  Medical Devices · Coverage Atlas                                              │
│  Every place the coordination tax lands in a device operation —               │
│  and the door out of each one.                                                │
│  Nine of twelve coordination domains. Coexists with your QMS · ERP · PLM.      │
│                                                                                │
│  ┌21 CFR 820┐ ┌21 CFR Part 11┐ ┌ISO 13485┐ ┌ISO 14971┐ ┌EU MDR┐ ┌21 CFR 803┐  │ frame chips
│  segment coordination tax $75.2M–$808.1M/yr · 81 cos · 1.215M employees        │ the one number
│                                                                                │
│  [ ↓ Find your area on the map ]      [ → Or enter by your role ]              │ DUAL ON-RAMP
│  role chips:  (Quality) (Operations) (Reg Affairs) (Compliance & Val)         │ → deep-link C / B-filter
│  [ Book a demo → ]  [ See the platform ]                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ B · THE ATLAS — Domains × Modules  ◀── THE HERO. all 9 domains on screen ──▶    │  MODULE INGRESS
│                                                                                │
│  filter:  Role ▸ [All][Quality][Ops][RA][Compliance]   Standard ▸ [All][820]…  │ coverage lenses
│                                                                                │
│  ── PRIMARY PILLARS ───────────────────────────────────────────────────────    │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌────────┐ │
│  │ QUALITY        (5) │ │ PRODUCT DEV    (4) │ │ SUPPLIER MGMT  (4) │ │ OPS (3)│ │
│  │ VP Quality/QA Dir  │ │ VP R&D / VP Eng    │ │ CPO / SQ Director  │ │VP Ops/ │ │
│  │ "your most visible │ │ "stage-gated       │ │ "tax across org    │ │ Plant  │ │
│  │  audit surface"    │ │  decisions"        │ │  boundaries"       │ │ Mgr"   │ │
│  │ • CAPA & Effect.   │ │ • Change Ctrl(ECO)●│ │ • Supplier Qual/   │ │•Prod   │ │
│  │   [820][13485] →   │ │   LIVE  Open page →│ │   PPAP  [13485] →  │ │ Hold → │ │
│  │ • Nonconf. / NCR → │ │ • Design Ctrl/DHF →│ │ • SCAR / Sup CAPA →│ │•WIP/   │ │
│  │ • MRB Disposition →│ │ • Design Transfer/ │ │ • Incoming Insp/   │ │ MRB →  │ │
│  │ • Deviation Mgmt → │ │   NPI →            │ │   MRB →            │ │•Batch/ │ │
│  │ • Internal Audit → │ │ • Risk Mgmt File → │ │ • Quality Agree. → │ │ DHR →  │ │
│  └───────────────────┘ └───────────────────┘ └───────────────────┘ └────────┘ │
│  ── ADJACENT DOORS (secondary — denser, still on-screen) ───────────────────    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────┐│
│  │CHANGE CTRL(2)│ │DOC & RECORDS │ │TRAINING & (2)│ │POST-MKT &  (2)│ │REG    ││
│  │VP Eng/R&D    │ │   (2) VP Q   │ │COMPETENCY    │ │RECALL VP Q/CMO│ │AFFAIRS││
│  │•Eng Chg(ECO)●│ │•Document Ctrl│ │•Training     │ │•Complaint/MDR │ │ (2)   ││
│  │ LIVE  page → │ │ [Part11] →   │ │ Cascades →   │ │ [803] 30/15d →│ │Head RA││
│  │•Controlled   │ │•Periodic     │ │•Competency/  │ │•Recall        │ │•Label ││
│  │ Distribution→│ │ Review →     │ │ Re-qual →    │ │ Execution →   │ │ Gov → ││
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │•510k/ ││
│                                                                       │ PMA → ││
│  Nine of twelve domains. The three not shown aren't where the device  └───────┘│
│  coordination tax concentrates.                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ C · TWO WAYS IN — persona ingress (co-equal, docked under the map)              │  PERSONA INGRESS
│  "The map shows what's broken. These show who owns it."                         │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐  │
│  │ QUALITY GOV.   │ │ OPERATIONS LDR │ │ REGULATORY AFF.│ │ COMPLIANCE &VAL│  │
│  │ Primary buyer  │ │ Economic buyer │ │ Governance     │ │ Proc. gatekeeper│  │
│  │ VP Q·Dir·QA Mgr│ │ COO·VP Ops·PM  │ │ Head RA·VP Reg │ │ Val Mgr·CSV Lead│  │
│  │ audit outcomes │ │ output, exec   │ │ submission /   │ │ validated state │  │
│  │ → repeat finds │ │ → firefighting │ │ MDR deadlines  │ │ → the IQ/OQ gate│  │
│  │ See page →     │ │ See page →     │ │ See page →     │ │ See page →     │  │
│  │ ◑ your region  │ │ ◑ your region  │ │ ◑ your region  │ │ ◑ your region  │  │  → B with ?role=
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘  │
│  Also serves: Engineering-change · Supplier-quality · Innovation/NPI governance │
├──────────────────────────────────────────────────────────────────────────────┤
│ D · WHY NOW — triggers as map markers  (severity/clock badges; → light region) │  → persona
│  [FDA Warning Ltr]→Quality  [Form 483]→Quality  [MDR deadline �clock 30/15d]→PMR │
│  [Recall scope]→PMR  [DHF gap @audit]→ProdDev  [Production hold]→Ops            │
│  [Supplier line stop]→Supplier  [Data integrity finding]→Doc&Records            │
├──────────────────────────────────────────────────────────────────────────────┤
│ E · THE STRUCTURAL WHY  (one line)                                             │
│  "No shared operational truth." Record ≠ coordination → every region runs on    │
│  email/meetings/spreadsheets, and the decision trace is missing.               │
├──────────────────────────────────────────────────────────────────────────────┤
│ F · WHAT IT COSTS  (5 named consequences — NO $)                               │
│  [Cycle Time] [Cost of Poor Quality] [Working Capital] [Compliance Drag]       │
│  [Revenue Risk]                                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ G · PROOF                                                                      │
│  41% · $81,350/yr recovered vs signed $198,150 baseline · year one ·            │
│  non-conformance coordination cost · Customer-attested · medical devices       │
│  Recovery Force · Harmonic Bionics      ┌──────────────────────────────────┐  │
│                                         │  [ Product / dashboard — SLOT ]  │  │ labeled placeholder
│                                         └──────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────────────┤
│ H · WHY UNIFIZE                                                                │
│  "Incumbents track document status. Unifize reconstructs the decision trace."  │
│  MasterControl · Veeva Vault · ETQ · Greenlight Guru  · coexists w/ QMS/ERP/PLM │
├──────────────────────────────────────────────────────────────────────────────┤
│ I · CLOSE  (dark)   You've seen the whole territory. [ Book a demo → ] [Platform]│
│                                                       ↑ back to the map         │
├──────────────────────────────────────────────────────────────────────────────┤
│  footer                                                                        │
└──────────────────────────────────────────────────────────────────────────────┘
●  = live module page today (/industries/medical-devices/change-control)
◑  = deep-link into the Atlas pre-filtered by that role (?role=…)
```

---

## 4. Fresh visual language

Not the current site. Enterprise-modern-minimal, wider measure. The governing metaphor is a **precision survey map / control-room atlas** — calm, legible, instrumented. Restraint does the work; the map's structure is the only "decoration."

**Type**
- A confident grotesk for display (e.g. *Söhne*, *Neue Haas Grotesk*, or *Geist*) — the H1 is large but tight-tracked, not loud.
- A **monospace** (e.g. *Berkeley Mono*, *Geist Mono*) reserved for the regulatory frame chips, standards chips, owners, and the economic number — it reads as "instrument labels on a map," reinforcing the survey metaphor and signaling provenance/credibility without a single decorative flourish.
- Generous type scale steps; domain region headers ~20px, module names ~15px, blurbs ~13px. The hierarchy *is* the atlas legibility.

**Color**
- **Paper-white / warm-paper base** for the map field (the territory), so domain regions read as plotted areas rather than UI cards.
- **Ink near-black** for primary text. **One cool accent** (a deep teal or ink-blue, the "Unifize" mark) used *only* for live routing affordances and the active filter state — so color literally means "you can go here." Restraint: accent appears < 10% of the surface.
- **Tier encoding by weight/elevation, not hue:** Primary pillars sit on a faint raised plane (subtle warm tint + 1px hairline + soft shadow); Secondary doors sit flat on the paper. This keeps the 4-vs-5 hierarchy without a rainbow — the single biggest defense against the feature-wall look.
- **Filter highlight = focus, dim = recede.** Selecting a role/standard drops non-matching regions to ~35% opacity rather than hiding them — coverage stays visible, attention narrows. Light/dark: light is the default (paper atlas); the hero and close use an ink-dark plane for bookending contrast.

**Grid & measure**
- Slightly **wider measure than the standard site** (max content ~1240–1320px) so all 9 regions breathe on one row-set. 12-col grid; Primary pillars span wider columns, Secondary doors narrower — the column math *is* the tier hierarchy.
- Hairline 1px dividers (warm grey) plot the regions like survey lines. Generous gutters; whitespace is the primary separator, borders secondary.

**Motion** (subtle, purposeful, never decorative)
- On scroll-in, domain regions **plot in** with a 60–120ms stagger (Primary first, then Secondary) — like a map drawing itself. Respect `prefers-reduced-motion` (instant render).
- Filter transitions cross-fade opacity over ~180ms; the connector lines from trigger badges to regions draw with a quick path animation on click.
- Hover on a module door: a 1px accent underline slides in + the "→" nudges right. That's it. No card lift parties.

**Texture**
- A barely-there survey-grid texture / faint contour hairlines on the paper base (≤3% opacity) so the field feels like a chart, not a void. No gradients-as-drama, no glassmorphism.

---

## 5. How BOTH ingress systems are expressed (and interlock)

This is the make-or-break for the Atlas, so it's explicit:

- **Module ingress = the Atlas itself (B), given hero status.** Every one of the ~26 module doors is a route to a module page. Live today: Change Control → `/industries/medical-devices/change-control`. All others render an intentional "Module page →" destination affordance pointed at their slug, ready to wire when those pages ship (the `md-module-map.ts` `href` field is the single source for this — present = live link, absent = placeholder route).
- **Persona ingress = the co-equal cards (C), docked directly under the map** with a header that frames them as the map's *other axis* ("what's broken" vs "who owns it") — so persona ingress is structurally prominent, not a position-6 afterthought. Each card routes to its persona page (Quality Manager live today; others future).
- **The interlock (the original move of this direction):** the **Role filter** in B turns each persona into a *lens over the whole module map*, and each persona card carries a "see your region" link that deep-links back into B pre-filtered (`?role=quality`). This is the cleanest possible answer to the brief's "the map must route to module pages AND coexist with the persona ingress" — the two systems aren't merely adjacent, they're **two views of one territory.** A Quality VP can enter by role, see her region light up across 5 domains, and click straight into CAPA. An Ops VP can do the same for Production Hold. The page works identically well from either door.

---

## 6. Routing map — where every link goes

| Element / surface | Routes to | Status |
|---|---|---|
| Hero "↓ Find your area" | anchor `#atlas` (B) | n/a |
| Hero "→ enter by your role" chips (Quality/Ops/RA/Compliance) | `#two-ways-in` (C) + apply `?role=` filter on B | live anchors |
| Hero `Book a demo` / `See the platform` | demo route / `/platform` | live |
| **Atlas B — module door: Change Control (ECO)** | `/industries/medical-devices/change-control` | **LIVE** |
| Atlas B — module: Engineering Change (ECO/ECR) | `/industries/medical-devices/change-control` | **LIVE** (same module page) |
| Atlas B — CAPA & Effectiveness · NCR · MRB Disposition · Deviation · Internal Audit | `/industries/medical-devices/[module-slug]` | placeholder routes (Quality domain) |
| Atlas B — Design Controls/DHF · Design Transfer/NPI · Risk Management File | `…/[module-slug]` | placeholder (Product Dev) |
| Atlas B — Supplier Qual/PPAP · SCAR · Incoming Inspection/MRB · Quality Agreements | `…/[module-slug]` | placeholder (Supplier) |
| Atlas B — Production Hold Disposition · WIP/MRB Backlog · Batch/DHR Review | `…/[module-slug]` | placeholder (Operations) |
| Atlas B — Controlled Distribution | `…/[module-slug]` | placeholder (Change Control) |
| Atlas B — Document Control · Periodic Review | `…/[module-slug]` | placeholder (Doc & Records) |
| Atlas B — Training Cascades · Competency/Re-qualification | `…/[module-slug]` | placeholder (Training) |
| Atlas B — Complaint/MDR Reporting · Recall Execution | `…/[module-slug]` | placeholder (Post-Market) |
| Atlas B — Label Governance · 510(k)/PMA Submission | `…/[module-slug]` | placeholder (Reg Affairs) |
| Atlas B — Role filter chips | re-render B (URL `?role=`) | live (client) |
| Atlas B — Standard filter chips | re-render B (URL `?std=`) | live (client) |
| **C — Quality governance card** | `/explorations/medical-devices/quality-manager` | **LIVE** |
| C — Operations Leader card | `/industries/medical-devices/personas/operations` | placeholder route |
| C — Regulatory Affairs card | `/industries/medical-devices/personas/regulatory-affairs` | placeholder route |
| C — Compliance & Validation card | `/industries/medical-devices/personas/compliance-validation` | placeholder route |
| C — each card "◑ your region" link | `#atlas?role=…` (back into B, filtered) | live anchor |
| D — trigger badges | highlight region in B + surface persona card in C | live (client scroll/highlight) |
| G — screen slot | none (labeled placeholder) | placeholder (Sachin's prototype) |
| H — incumbent chips | none (text only) | n/a |
| I — `Book a demo` / "back to the map ↑" | demo route / `#atlas` | live |

> **Build note for engineering:** B and the filter logic are a client component reading `MD_DOMAIN_MAP` (already exists). The Role→domains and Standard→modules join tables should be added to `md-module-map.ts` as two small lookup maps (`PERSONA_DOMAIN_LENS`, `STANDARD_MODULE_LENS`) so the filter and the persona "your region" deep-link share one source of truth. Module placeholder hrefs should be derived from a `slug` field added to `MapModule` (today only `name`/`blurb`/`standards`/`href` exist) — until those pages ship, the route can resolve to a "coming soon" module shell rather than a 404, preserving routing honesty without faking content.

---

## 7. Risks & how this direction defends against them

| Risk | Why it threatens the Atlas | Mitigation built into the design |
|---|---|---|
| **Feature-wall collapse** (the #1 risk for a map-as-hero page) | 26 equal tiles = an undifferentiated grid that overwhelms instead of orienting. | Tier hierarchy via *elevation/weight not hue* (Primary raised, Secondary flat); domain regions as plotted areas, not cards; owners + promises give each region a "why"; filters let the buyer narrow without losing the whole. |
| **Altitude creep** | A coverage grid tempts per-module mechanics ("here's the CAPA flow"). | Hard rule enforced in copy: module = name + one ≤16-word blurb + standards chips + link. No value-stream diagrams in B (the existing two-pane `imap-viz` placeholder is *removed* in this direction — mechanics belong on module pages). |
| **Persona ingress orphaned by the dominant map** | Map-as-hero can swallow the second ingress. | C is docked immediately under B at co-equal prominence, framed as the map's other axis, and *interlocked* via the role filter + "your region" deep-links. |
| **"Why only 9 of 12?" skepticism** | A breadth claim invites a completeness challenge. | The explicit "nine of twelve — the three not shown aren't where the device tax concentrates" line turns the gap into a credibility signal. |
| **Provenance overreach** | Big visible grid tempts invented metrics/fake screens. | Only canonical facts render: `MD_ECONOMICS` $-range (hero), `MD_PROOF` 41%/$81,350 (G), real standards/owners/blurbs. Consequences carry no $. Screen is a labeled slot. Per `MD_NEEDS_BEN` and the do-NOT-publish list. |
| **Dead-link feel** (only 1 of 26 module pages live) | Routing hub with 25 placeholder doors could feel hollow. | Live door (Change Control) gets a distinct active treatment; placeholders route to a "coming soon" module shell, never a 404; the persona ingress (Quality Manager live) gives every visitor at least one fully-live deep path today. |
| **Mobile breadth loss** | 9 regions can't sit side-by-side on a phone. | Reflow to a single scroll column; Primary expanded, Secondary collapsed — preserves "scan the whole list, open one." |

---

## 8. One-line summary for the tournament board

**The Coverage Atlas makes the routing-hub job visible:** the buyer sees the entire territory Unifize covers — 9 of 12 device coordination domains, ~26 module doors, owners and standards plotted — and routes by problem *or* by role through two interlocked views of the same map, with every claim drawn from canonical MD data and not one invented metric.