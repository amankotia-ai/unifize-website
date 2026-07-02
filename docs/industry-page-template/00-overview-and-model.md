# Industry Page Template — Overview, Model & Canonical Brief

> This is the **shared source of truth** for the industry-page redesign. Every structural
> direction (`01`–`06`) and the final built page trace back to this document. It encodes
> (a) the canonical content model, (b) the Medical-Devices content inventory with real
> values, (c) the information architecture, (d) the locked constraints, and (e) the
> tournament method. If a fact isn't here or in the Notion source-of-truth, it does not
> go on the page.

---

## 0. Locked decisions (from the kickoff)

| Decision | Choice | Implication |
|---|---|---|
| **Build target** | New exploration route (`/explorations/industry-template`) | Production `/industries/[slug]` stays untouched; winner can be promoted later. |
| **Page's primary job** | **Routing hub** | Make the buyer feel seen at breadth, then distribute into the right **module** and **persona** pages. Conversion happens deeper. The tournament optimizes for this. |
| **Content depth** | **Two ingress, no JTBD layer** | The only organizing/ingress systems are **Personas** and the **Domains × Modules map**. JTBDs and the S1–S15 lifecycle stay *down* on module/persona pages. |
| **Visual system** | **Fresh visual language** | New type, color, layout, motion — not bound to the current site. Still implemented cleanly inside the Next app. |
| **Measure** | Slightly wider than the standard site | Enterprise + modern + minimal, with room to breathe. |

**The two non-negotiables the page must satisfy:**
1. **Both ingress systems are present and obvious** — a buyer can enter by *who they are* (persona) or by *what's broken* (problem-domain → module). These are the links out to the rest of the platform graph.
2. **Altitude discipline** — the industry page *names and teases*; it never renders module mechanics (e.g. the deep change-control flow) or persona day-in-the-life. Those live one level down. This is the single most important editorial rule.

---

## 1. The content model: one connected "Problem Architecture" graph

The 8 canonical Notion databases are not independent — they form one graph. The **Industries**
registry is the hub; **Medical Devices = `IND-28`** (page `185860e6-b45e-8023-a7d3-e6053bad2a2b`)
is its single richest, most complete row and can drive most of the page by itself.

```
                        ┌──────────────────────────────────────────┐
                        │  INDUSTRIES registry  →  Medical Devices   │  the flagship row
                        │  Opportunity · Primary Fear Anchor ·       │
                        │  Regulatory Vocabulary · Economics ·       │
                        │  Competitive Landscape · Proof             │
                        └───────────────────┬───────────────────────┘
        HARD-WIRED to the row (queryable):  │
   ┌──────────────┬──────────────────┬──────┴───────────┬─────────────────┐
   ▼              ▼                  ▼                  ▼                 ▼
TRIGGER        STANDARDS        ICP → BUYER         MODULE           Competitors /
EVENTS (33)    (19)             PERSONAS (3+econ)   HIERARCHY (12)   Channels / Proof
"buy-now                         ▲ PERSONA INGRESS    ▲ MODULE INGRESS
 moments"

   PROBLEM ARCHITECTURE sub-graph  (universal entities, bound to MD *editorially*):
   SYMPTOMS ───▶ CONSEQUENCES ───▶ ROOT CAUSES          DOMAINS (9 of 12) ──▶ MODULES
   "what it       "what it          "why it happens"     "where tax lands"     "the doors"
    feels like"    costs"           2 canonical+5 amp                          ↓ module pages
   JTBDs (~97, 15-stage lifecycle) — persona-owned, module-served  [NOT on the industry page]
```

### The 8 databases at a glance

| DB | What it is | MD coverage | Page role |
|---|---|---|---|
| **Industries** (`4d1fd81b`) | One row per vertical; the registry | MD = `IND-28`, flagship, all fields dense | Hero, positioning, economics, competitive, proof framing |
| **Trigger Events** (`55d52078`) | The "buy-now moment" catalog | 33 of 37 link to MD; severity + clock badged | "Why now" urgency band → routes to persona |
| **Root Causes** (`0fda224e`) | The structural "why" | Universal; 2 canonical + 5 amplifiers | The thesis spine (one-line structural claim) |
| **Consequences** (`1663180c`) | "Cost of inaction, in words" | Universal; 5 types; **qualitative, no $** | The stakes band |
| **Symptoms** (`f498bfbe`) | Buyer-voice "coordination tax" lines | 60 rows, all `Hypothesis` | "Sound familiar?" recognition tiles |
| **Domains** (`b835b86d`) | Cross-industry organizing spine | 9 of 12 relevant = the coverage claim | **Module ingress** — the Domains × Modules map |
| **Customer JTBD** (`0390be1a`) | ~97 job archetypes across 15 stages | Indirect/thin link | *Pushed down* (per locked decision) |
| **Buyer Personas** (`2f0860e6`) | Function-grouped roles | 3 via MD ICP + economic buyer | **Persona ingress** — who-it's-for cards |

### Three hard truths that constrain the template
1. **Industry-specificity is mostly editorial, not relational.** Only Triggers, Standards, Personas (via the one MD ICP), and the row itself are hard-wired to MD. Symptoms / Consequences / Root Causes / Domains / JTBDs have *no* working industry relation. → The page is **hand-authored in buyer voice + provenance-tagged** (the repo already does this in `medical-devices-canonical.ts` and `md-module-map.ts`). It cannot be purely query-driven.
2. **Maturity gates are everywhere.** Every MD Trigger is `Goal Zero = Pending`; all Symptoms are `Hypothesis`; Proof Maturity = `Advocacy`. → Strong *messaging* is fair; presenting it as *validated proof* or inventing metrics is not.
3. **Altitude discipline** (restated because it governs everything): name + tease at breadth; push mechanics and day-in-the-life down.

---

## 2. Canonical content inventory — Medical Devices (real values)

Everything below is canonical (Notion source-of-truth, mirrored in `src/lib/platform-data/medical-devices-canonical.ts` + `md-module-map.ts`). Directions and the page pull from *these* values.

**Economics (segment, US, >$1B):** 81 companies · 1,215,000 employees · TAM ≈ $7.61B · est. annual coordination tax **$75.2M–$808.1M** · wage band $80–$200/hr · Documentation Factor 1.25 · Process Rigour 1.2 · SIC 3841–3845.

**Regulatory frame (19 standards; lead 6):** 21 CFR 820 (QSR) · 21 CFR Part 11 (e-records/signatures) · ISO 13485 · ISO 14971 (risk) · EU MDR 2017/745 · 21 CFR 803 (MDR, 30-day / EU 15-day).

**Regulatory vocabulary (verbatim, SEO + credibility):** DHF, DHR, DMR, CAPA, Design Controls, V&V, 510(k), PMA, MDR, NCR, ECO, ISO 14971 risk file, traceability matrix, UDI, IQ/OQ/PQ, batch record, lot history record.

**Primary fear anchor:** FDA Warning Letter / consent decree / 483 citing **lost traceability between design inputs & outputs**, incomplete CAPA effectiveness evidence, or DHR failure. *Secondary:* a recall driven by a design change that wasn't propagated to all records.

**Trigger moments (urgent/immediate cluster, buyer language):** Recall scope definition required · Failed FDA inspection (OAI) · FDA Form 483 issued · MDR / vigilance deadline · DHF gap at audit · Data integrity finding · Production hold pending disposition · Supplier-caused line stop · Failed design transfer · Audit finding on training records.

**Root causes (the thesis):**
- *No shared operational truth* — the system of record is separate from the system of coordination, so cross-functional work runs on ungoverned channels (email, meetings, spreadsheets). **Every symptom traces here.**
- *Missing decision trace* — records capture *what* was decided, not the context/reasoning/evidence at the time. The inability to replay decision-time reality is a compliance liability.
- *Amplifiers (why it's worse in devices):* validated QMS/PLM/MES lock-in · Mode-2 work on Mode-1 tools · networked operations (CDMOs/suppliers) · factory execution complexity · product/technical complexity.

**Consequences (5 types — qualitative, never with invented $):** Cycle Time (long cycle times; delayed time to market) · COPQ (coordination headcount embedded in COGS) · Working Capital (trapped cash / quarantine holds) · Compliance Drag (overdue controls; slow audit & customer proof; lagging post-market signal) · Revenue Risk (quality escapes & warranty; expanded recall scope; lost market access).

**Symptoms (buyer voice — recognition tiles):** "When auditors ask for the full record we spend days pulling it together" · "We can't reconstruct what we knew and who decided what at the time" · "Changes get made but half the people are still on the old version" · "Everything sits in someone's queue for days before it moves" · "We can't tell if a CAPA actually fixed it or just the symptom" · "We spend more time coordinating the work than doing the work."

**Domains × Modules — the coverage map (9 of 12; MODULE INGRESS).** Primary pillars first, then MD-critical secondary doors. Each module funnels to its own module page; only **Change Control** has a live page today (`/industries/medical-devices/change-control`).
- **Quality** (owner VP Quality/QA Dir): CAPA & Effectiveness · NCR · MRB Disposition · Deviation · Internal Audit
- **Product Development** (VP R&D/Eng): Change Control (ECO) · Design Controls/DHF · Design Transfer/NPI · Risk Management File
- **Supplier Management** (CPO/SQ Dir): Supplier Qualification/PPAP · SCAR · Incoming Inspection/MRB · Quality Agreements
- **Operations** (VP Ops/Plant Mgr): Production Hold Disposition · WIP/MRB Backlog · Batch/DHR Review
- **Change Control** (VP Eng): Engineering Change (ECO/ECR) · Controlled Distribution
- **Document & Records Control** (VP Quality/Doc Control): Document Control · Periodic Review
- **Training & Competency** (VP Quality/Training): Training Cascades · Competency/Re-qualification
- **Post-Market & Recall** (VP Quality/CMO): Complaint/MDR Reporting · Recall Execution
- **Regulatory Affairs** (Head of RA): Label Governance · 510(k)/PMA Submission

**Personas (PERSONA INGRESS; reached via the single MD ICP):**
- **Quality governance** — *primary buyer.* Titles: VP Quality, Head of Quality, Quality Director, Quality Manager, QA Manager, RAQA Director. Cares: release confidence, audit outcomes, traceability, recurrence. Worries: missing evidence, unclear approvals, repeat issues, audit findings, release risk.
- **Operations Leader** — *economic buyer* (the only `Goal Zero = Pass` persona; pays and decides expand/churn). Titles: COO, VP Operations, Plant Manager, GM, Site Director. Cares: output, stability, delivery, cross-functional execution. Worries: missed shipments, schedule instability, firefighting, slow decisions.
- **Regulatory affairs governance** — Head of RA, VP Regulatory. Cares: submission timelines, label compliance across markets, MDR/vigilance deadlines.
- **Compliance & validation** — Validation Manager, CSV Lead. Cares: validated state, audit readiness by default; the procurement/IQ-OQ-PQ gatekeeper.
- *(adjacent doors:)* Engineering change governance · Supplier quality governance · Innovation/NPI execution.

**Competitive contrast:** MasterControl (primary incumbent; strong doc control, weak cross-functional coordination & real-time decision trace) · Veeva Vault Quality (pharma-focused) · ETQ Reliance (mid-market) · Arena · Greenlight Guru (device-specific but smaller cos). **Differentiator:** *Unifize reconstructs the decision trace across functions, rather than tracking document status.* Coexists with the QMS — no rip-and-replace.

**Proof (Advocacy maturity — usable, anonymized):** an FDA-regulated device manufacturer recovered **$81,350/yr (≈41%)** against a signed **$198,150** baseline in year one, on non-conformance coordination cost (customer-attested). Named customers: **Recovery Force** (Class I/II wearables) · **Harmonic Bionics** (surgical robotics).

### Do-NOT-publish list (provenance discipline)
- ❌ Invented headline metrics ("80% coordination tax", "65% cycle-time reduction", "4× faster to market") — not canonical.
- ❌ Any dollar figure on a Consequence (that DB is qualitative by design).
- ❌ Goal Zero / Hypothesis / Pending statuses, "Play coverage" notes — internal GTM scaffolding.
- ⚠️ Product screens / dashboards do not exist yet → use **labeled placeholder slots** where a packaged screenshot will plug in. Never fake a UI as if shipped.

---

## 3. Information architecture (the canonical arc)

The narrative the data supports: **recognition → why → stakes → where we come in → who → proof → close.** The directions re-sequence and re-weight these blocks; they don't invent new content.

| # | Block | Source | Ingress? | Altitude rule |
|---|---|---|---|---|
| 0 | Hero / positioning + regulatory frame + 1 economic stat | Industries: Opportunity, Reg Vocab, Economics | — | One promise, one frame, one number. No feature list. |
| 1 | "Sound familiar?" recognition | Symptoms | — | 5–7 buyer-voice tiles; name and move on. |
| 2 | Why now — trigger moments | Trigger Events | → persona | Names + severity/clock badges only; no remediation detail. |
| 3 | The structural *why* | Root Causes (2 canonical) | — | One-line thesis; no taxonomy. |
| 4 | What it costs | Consequences (5 types) | — | Named consequences, no fake $. |
| 5 | **Where Unifize comes in — Domains × Modules map** | Domains (9/12) → Modules | **MODULE INGRESS** | Domain name + owner + one-line promise; module name + one-line; link out. NO mechanics. |
| 6 | **Who it's for — persona cards** | Buyer Personas (via MD ICP) | **PERSONA INGRESS** | Title cluster + one-line cares/worries; link to persona page. NO day-in-the-life. |
| 7 | Proof | Industries: Proof + canonical proof | — | Anonymized %, named customers, placeholder for screens. |
| 8 | Why Unifize / competitive contrast | Industries: Competitive Landscape | — | The differentiator + named incumbents; "coexists with QMS". |
| 9 | Close / demo | — | — | Single clear CTA. |

---

## 4. Shared constraints for every direction & the final page
- **Routing-hub first:** every section should either build recognition or hand the buyer toward a module/persona page. The two ingress blocks (5 & 6) are the spine, not afterthoughts.
- **Both ingress systems visible above the fold's reach** (a buyer should sense "I can enter by my role or by my problem" early).
- **Altitude discipline** enforced in every block.
- **Fresh, enterprise-modern-minimal visual language**, wider measure. Restraint over decoration. Type and whitespace do the work.
- **Provenance honesty:** only canonical facts; labeled placeholders for what doesn't exist yet.
- **Template-ready:** the structure must generalize to other industries (Pharma, Aerospace…), with MD as the proof instance.

---

## 5. The directions (bake-off entrants)
Each is the *same truth in a different shape*, tuned to a different buyer psychology so the tournament has real range.

1. **`01` The Coordination Tax Ledger** — economics-first; stakes read like a P&L of inaction. For the COO/economic buyer.
2. **`02` The Regulatory War Room** — trigger/clock-first; opens on buy-now moments and their deadlines. For Quality/RA in firefight mode.
3. **`03` The Coverage Atlas** — breadth-first; the Domains × Modules map *is* the hero. Purest routing-hub expression.
4. **`04` The Mirror** — recognition-first; earn the nod with buyer-voice symptoms before naming cause or product. For the skeptic.
5. **`05` The Decision Trace** — thesis-first; everything is proof of one claim (incumbents track documents; Unifize reconstructs the decision). Positioning-led.
6. **`06` The Two Doors** — ingress-first; the page is organized *by* the two entry paths (by your role / by your problem), making ingress the structure itself.

---

## 6. Tournament method
**Persona panel** (simulated from the real Buyer Personas), each scores every direction 1–10 on:
- **Recognition** — "this is my world."
- **Credibility** — survives a skeptic / audit-minded buyer; no overreach.
- **Routing clarity** — do I know where to go next (to my role or my problem)? *(weighted — it's the page's job)*
- **Differentiation** — vs. MasterControl et al.
- **Pull** — would I book the demo / forward to my team.

**Panel:** VP Quality (primary buyer) · COO/VP Ops (economic buyer) · Head of Regulatory Affairs · Compliance/Validation gatekeeper (procurement blocker) · skeptical Quality Manager (adversarial). Economic + primary buyer scores weighted higher.

**Output:** ranked board, a champion, and the single best block to *graft* from each runner-up. The built page is the champion + grafts. Results recorded in `07-tournament-results.md`.
