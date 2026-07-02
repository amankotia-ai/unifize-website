# 01 — The Coordination Tax Ledger

> **Direction angle:** Economics-first. The page is built like a financial statement — a P&L of inaction. The invisible cost of coordination is made *visible*, *attributed* to specific cost types and specific events, and then *resolved* by routing the buyer to the exact module or persona that owns the leak.
>
> **Primary reader:** COO / VP Operations — the economic buyer who signs (the only `Goal Zero = Pass` persona in the MD set) — and the CFO-minded skeptic standing behind them.
>
> **Secondary reader:** VP Quality (primary functional buyer), who must recognize the line items as *their* world.
>
> **Traces to:** `docs/industry-page-template/00-overview-and-model.md` (content model, IA arc, locked decisions, do-NOT-publish list); `src/lib/platform-data/medical-devices-canonical.ts` (economics, variants, consequences, proof, competitors); `src/lib/platform-data/md-module-map.ts` (Domains × Modules ingress).

---

## 1. Thesis — why a ledger, and why for this buyer

Every other direction in the bake-off opens on *feeling* (the Mirror), *urgency* (the War Room), *breadth* (the Atlas), *a claim* (the Decision Trace), or *the two doors* themselves. This direction opens on **money the buyer is already losing and cannot see on any system they own.**

The economic buyer doesn't have a quality problem; they have a **margin problem with a quality cause.** Coordination cost is real, it is large, and it is *uncaptured* — it lives in email threads, escalation calls, and spreadsheets, so it never lands on a line in the GL. The page's job is to draw that line for them, then hand them the door to the function where the cost accrues.

The organizing metaphor is a **financial statement**, used with discipline, not gimmick:

- The **headline** is the segment-level annual coordination tax — a real, canonical range (`$75.2M–$808.1M`).
- The **liabilities side** is the five canonical Consequence types, rendered as *named line items with no invented dollar values* (the Consequences DB is qualitative by design — this is the hard constraint this angle must honor).
- The **general ledger** is the three canonical workflow variants, which *do* carry real per-instance cost ranges — the only place real dollars-per-event appear.
- The **accounting note** is the two root causes: *why* the tax accrues at all.
- The **ledger of where it lands** is the Domains × Modules map — the MODULE INGRESS — reframed as "which account each cost posts to."
- The **signatories** are the personas — the PERSONA INGRESS — reframed as "who owns this account / who signs the check."
- The **single audited figure** is the proof: `$81,350/yr (~41%)` against a signed `$198,150` baseline. One hard number, customer-attested, treated like the one line a CFO can take to the board.

The financial-statement frame is what makes this direction *distinct* — not a reshuffle. The IA blocks from the canonical arc are all present, but they are **re-cast as accounting objects and re-sequenced so cost precedes cause.** Stakes come *before* the structural why, because for this reader the number is the hook and the cause is the justification.

### Why this shape serves the routing-hub job
A ledger is, structurally, **a routing instrument.** Every line in a real ledger points to an account; every account has an owner. So the financial metaphor doesn't fight the routing-hub mandate — it *is* the routing-hub mandate, dressed for the economic buyer:

- The **liabilities line items** (consequences) tease the *cost*; clicking nothing — they're stakes, not doors.
- The **general-ledger rows** (workflow variants) each carry a "post this to →" link straight to the owning module page (e.g. Engineering change → Change Control). This is a *second, cost-led path* into the module graph.
- The **"where it lands" ledger** (Domains × Modules) is the primary MODULE INGRESS, organized as a chart of accounts.
- The **signatories block** is the PERSONA INGRESS, organized as account owners.

Both ingress systems are present, obvious, and — crucially for this angle — *economically motivated*. The buyer enters by **which account is bleeding** (problem → module) or **whose budget owns it** (role → persona).

---

## 2. Altitude discipline for this angle (the trap and the guardrail)

The economics frame has one specific failure mode: **over-quantifying.** It will be tempting to attach dollars to consequences, to extrapolate the segment range down to "your company's tax," or to invent a savings multiple. **Do not.** The guardrails for this direction specifically:

- **Consequences are line-item *names only*** — "Cycle Time," "COPQ," "Working Capital," "Compliance Drag," "Revenue Risk." No `$` on any of them. They are rendered as a liabilities schedule *whose values read "—" or "unquantified, recurring."* The visual literally shows an empty amount column on the liabilities side, which is itself the argument: *this is the cost you can't see.*
- **Only the three workflow variants carry per-event `$`** (canonical: NCR→CAPA `$285–$907`, Engineering change `$420–$1,400`, Audit evidence `$310–$1,040`). These are real `Industry Variants` fields. They are framed as *per-instance unit cost*, never multiplied into a fabricated annual total.
- **Only the proof carries a company-level `$`** (`$81,350` / `41%` / `$198,150` baseline). One audited figure. It is the *only* place a savings claim appears.
- **The segment range is segment-level only** (`$75.2M–$808.1M`, 81 companies, 1.215M employees). Never implied to be one buyer's number.
- **No module mechanics, no persona day-in-the-life.** The general-ledger rows name the event and its unit cost and link out — they never show the CAPA flow. The signatory cards name the role and what account they own and link out — they never narrate a day.

If a section can't be expressed without inventing a number, it gets *fewer* numbers, not faked ones. Restraint is on-brand for a financial document.

---

## 3. Page shape — the whole thing, top to bottom

Nine sections. The spine is **A (headline tax) → B (liabilities) → C (unit-cost ledger) → D (why it accrues) → E (where it lands = MODULE INGRESS) → F (who signs = PERSONA INGRESS) → G (the one audited recovery) → H (why incumbents can't close it) → I (reconcile / demo).**

Note the deliberate re-sequence vs. the canonical arc: **stakes (B) and unit cost (C) come *before* the structural why (D).** For the economic buyer, the number earns the right to explain the cause — not the other way round.

### ASCII wireframe (full page)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Unifize]                              Platform   Industries   Pricing  [Demo] │  sticky header
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  A · THE LEDGER HERO                                       surface: ledger-dark │
│  ───────────────────────────────────────────────────────────────────────────  │
│  Industries / Medical Devices                                                  │
│  ◦ MEDICAL DEVICES · ANNUAL STATEMENT OF COORDINATION                           │
│                                                                                │
│   Coordination is costing the medical-device          ┌─────────────────────┐  │
│   segment                                              │  SEGMENT TAX / YR    │  │
│                                                        │  ┌────────────────┐  │  │
│     $75.2M ───────────────────────── $808.1M          │  │ $75.2M–$808.1M │  │  │
│        the annual coordination tax.                   │  └────────────────┘  │  │
│        Here's where it's hiding.                      │  81 companies        │  │
│                                                        │  1.215M employees    │  │
│   81 companies · 1.2M people · 9 of 12 coordination    │  TAM ≈ $7.61B        │  │
│   domains. Unifize reconstructs the decision trace     │  wage band $80–$200/h│  │
│   your QMS can't — without ripping it out.             └─────────────────────┘  │
│                                                                                │
│   [ Find your line item ↓ ]   [ Book a demo → ]                                │
│                                                                                │
│   AUDITED AGAINST:  21 CFR 820 · 21 CFR Part 11 · ISO 13485 · ISO 14971 ·      │
│                     EU MDR 2017/745 · 21 CFR 803      (19 standards in frame)   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  B · LIABILITIES — THE COST YOU CAN'T SEE ON ANY SYSTEM YOU OWN   surface:white │
│  ───────────────────────────────────────────────────────────────────────────  │
│  ◦ STATEMENT OF LIABILITIES (recurring, unquantified by design)                 │
│  Five accounts the coordination tax posts to. None of them show up on your GL.  │
│                                                                                │
│   ┌─────────────────────────────────┬─────────────────────────────┬─────────┐ │
│   │ LINE ITEM                        │ WHAT ACCRUES                │ AMOUNT  │ │
│   ├─────────────────────────────────┼─────────────────────────────┼─────────┤ │
│   │ Cycle Time                       │ Long cycle times; delayed   │   —     │ │
│   │                                  │ time to market              │ recurring│ │
│   │ Cost of Poor Quality (COPQ)      │ Coordination headcount      │   —     │ │
│   │                                  │ embedded in COGS            │ recurring│ │
│   │ Working Capital                  │ Trapped cash; quarantine    │   —     │ │
│   │                                  │ holds                       │ recurring│ │
│   │ Compliance Drag                  │ Overdue controls; slow audit│   —     │ │
│   │                                  │ & customer proof; lagging   │ recurring│ │
│   │                                  │ post-market signal          │         │ │
│   │ Revenue Risk                     │ Quality escapes & warranty; │   —     │ │
│   │                                  │ expanded recall; lost access│ recurring│ │
│   └─────────────────────────────────┴─────────────────────────────┴─────────┘ │
│   ↳ "—" is the point. These never hit a line item — so no one is accountable    │
│      for them. The next section is where we start putting numbers on it.        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  C · THE GENERAL LEDGER — COST PER COORDINATION EVENT          surface: alt/tint│
│  ───────────────────────────────────────────────────────────────────────────  │
│  ◦ UNIT COST OF COORDINATION (per instance, segment wage band $80–$200/hr)      │
│  Three workflows where the tax is actually metered. Each posts to a module.     │
│                                                                                │
│   ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐  │
│   │ Nonconformance → CAPA│ │ Engineering change   │ │ Audit evidence       │  │
│   │ ──────────────────── │ │ ─────────────────────│ │ ──────────────────── │  │
│   │   $285 – $907        │ │   $420 – $1,400      │ │   $310 – $1,040      │  │
│   │   per instance       │ │   per instance       │ │   per instance       │  │
│   │ 6 decisions          │ │ 8 decisions · CRITICAL│ │ 4 decisions          │  │
│   │ 35 touchpoints       │ │ 48 touchpoints       │ │ 35 touchpoints       │  │
│   │ cycle: weeks         │ │ cycle: months        │ │ cycle: days          │  │
│   │ Overdue CAPAs are a  │ │ Highest coordination-│ │ Work was done; prov- │  │
│   │ common 483 finding.  │ │ density event in seg.│ │ ing it takes weeks.  │  │
│   │ post to → CAPA module│ │ post to → Change Ctrl│ │ post to → Doc&Records│  │
│   └──────────────────────┘ └──────────────────────┘ └──────────────────────┘  │
│   ↳ These are unit costs, not annual totals. Multiply by your volume to estimate.│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  D · ACCOUNTING NOTE — WHY THE TAX ACCRUES                     surface: white   │
│  ───────────────────────────────────────────────────────────────────────────  │
│  ◦ NOTE 1 TO THE STATEMENT                                                      │
│   Two structural causes. Every line item above traces to the first.            │
│                                                                                │
│   ① No shared operational truth                                                │
│      The system of record is separate from the system of coordination, so      │
│      cross-functional work runs on ungoverned channels — email, meetings,      │
│      spreadsheets.  ← every symptom and every line item traces here.            │
│                                                                                │
│   ② Missing decision trace                                                     │
│      Records capture what was decided — not the context, reasoning, and         │
│      evidence at the time. You can't replay decision-time reality. That is a    │
│      compliance liability, not just an inconvenience.                           │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  E · WHERE THE TAX LANDS — CHART OF ACCOUNTS    ★ MODULE INGRESS ★  surface:dark│
│  ───────────────────────────────────────────────────────────────────────────  │
│  ◦ THE LEDGER OF ACCOUNTS · 9 of 12 coordination domains                        │
│  Every account is a domain. Every line is a module — a door into the platform.  │
│  Pick the account that's bleeding.                                              │
│                                                                                │
│   PRIMARY ACCOUNTS                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐    │
│   │ QUALITY                              owner: VP Quality / QA Director    │    │
│   │ The largest accumulator of coordination tax; your audit surface.       │    │
│   │  · CAPA & Effectiveness    · Nonconformance / NCR   · MRB Disposition  │    │
│   │  · Deviation Management    · Internal Audit              [5 modules →]  │    │
│   ├──────────────────────────────────────────────────────────────────────┤    │
│   │ PRODUCT DEVELOPMENT                  owner: VP R&D / VP Engineering     │    │
│   │ Stage-gated decisions that lose rationale in email and design reviews.  │    │
│   │  · Change Control (ECO) ●LIVE  · Design Controls / DHF                  │    │
│   │  · Design Transfer / NPI       · Risk Management File   [4 modules →]   │    │
│   ├──────────────────────────────────────────────────────────────────────┤    │
│   │ SUPPLIER MANAGEMENT                  owner: CPO / SQ Director           │    │
│   │  · Supplier Qual / PPAP  · SCAR  · Incoming Insp / MRB  · Quality Agts  │    │
│   ├──────────────────────────────────────────────────────────────────────┤    │
│   │ OPERATIONS                           owner: VP Operations / Plant Mgr   │    │
│   │  · Production Hold Disposition · WIP/MRB Backlog · Batch/DHR Review     │    │
│   └──────────────────────────────────────────────────────────────────────┘    │
│   SECONDARY ACCOUNTS  (MD-critical doors)                                       │
│   ┌────────────────┬────────────────┬────────────────┬────────────────────┐   │
│   │ Change Control │ Document &     │ Training &     │ Post-Market &      │   │
│   │ VP Engineering │ Records Control│ Competency     │ Recall             │   │
│   │ ECO/ECR ●LIVE  │ VP Quality     │ VP Quality     │ VP Quality / CMO   │   │
│   │ Ctrl'd Distrib.│ Doc Ctrl·Per.Rv│ Cascades·Re-qual│ MDR Rpt·Recall Exec│   │
│   ├────────────────┴────────────────┴────────────────┴────────────────────┤   │
│   │ Regulatory Affairs   owner: Head of RA   · Label Governance · 510(k)/PMA│   │
│   └────────────────────────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  F · WHO SIGNS THE CHECK — ACCOUNT OWNERS     ★ PERSONA INGRESS ★  surface:white│
│  ───────────────────────────────────────────────────────────────────────────  │
│  ◦ AUTHORIZED SIGNATORIES                                                       │
│  Every account has an owner. Enter by the role that owns the budget.            │
│                                                                                │
│   ┌─────────────────────────┐ ┌─────────────────────────┐                      │
│   │ ⬤ ECONOMIC BUYER        │ │ ⬤ PRIMARY BUYER         │                      │
│   │ Operations Leadership   │ │ Quality Leadership      │                      │
│   │ COO · VP Ops · Plant Mgr│ │ VP Quality · QA Dir ·   │                      │
│   │ · GM · Site Director    │ │ Quality Mgr · RAQA Dir  │                      │
│   │ Owns: output, stability,│ │ Owns: release conf.,    │                      │
│   │ delivery, cross-fn exec │ │ audit, traceability     │                      │
│   │ Signs & decides expand  │ │ Worries: missing evid., │                      │
│   │ vs. churn.              │ │ unclear approvals       │                      │
│   │ [ See the Ops page → ]  │ │ [ See Quality Mgr → ]   │                      │
│   └─────────────────────────┘ └─────────────────────────┘                      │
│   ┌──────────────┬──────────────┬──────────────────────────┐                   │
│   │ Regulatory   │ Compliance & │ adjacent doors:          │                   │
│   │ Affairs Gov. │ Validation   │ Eng. change gov. ·       │                   │
│   │ Head of RA · │ Validation Mgr│ Supplier quality gov. ·  │                   │
│   │ VP Regulatory│ · CSV Lead   │ Innovation / NPI exec    │                   │
│   │ [ door → ]   │ [ door → ]   │                          │                   │
│   └──────────────┴──────────────┴──────────────────────────┘                   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  G · THE ONE AUDITED RECOVERY                                  surface: alt/tint│
│  ───────────────────────────────────────────────────────────────────────────  │
│  ◦ RECONCILED · CUSTOMER-ATTESTED                                               │
│   The one number on this page that's been signed off.                          │
│                                                                                │
│   ┌────────────────────────────┐   ┌──────────────────────────────────────┐   │
│   │   $81,350 / yr recovered   │   │  [ PLACEHOLDER: product / dashboard  │   │
│   │   ≈ 41%                     │   │    screenshot — not yet shipped ]    │   │
│   │   against a signed         │   │                                      │   │
│   │   $198,150 baseline,       │   └──────────────────────────────────────┘   │
│   │   year one, on             │                                              │
│   │   non-conformance          │   Recovery Force   ·   Harmonic Bionics      │
│   │   coordination cost.       │   Class I/II wearables  surgical robotics     │
│   │   Customer-attested ·      │                                              │
│   │   medical devices          │                                              │
│   └────────────────────────────┘                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  H · WHY THE INCUMBENTS CAN'T CLOSE THE GAP                   surface: white    │
│  ───────────────────────────────────────────────────────────────────────────  │
│  ◦ THE STRUCTURAL DIFFERENCE                                                    │
│   Incumbents track document status. Unifize reconstructs the decision trace     │
│   across functions. It coexists with your QMS — no rip-and-replace.             │
│                                                                                │
│   ┌─ tracks documents ──────────┐   ┌─ reconstructs the decision ───────────┐  │
│   │ MasterControl  (strong doc, │   │ UNIFIZE                               │  │
│   │  weak cross-fn coordination)│   │ the cross-functional decision trace,  │  │
│   │ Veeva Vault Quality (pharma)│   │ sitting on top of the QMS/PLM/MES you │  │
│   │ ETQ Reliance (mid-market)   │   │ already validated.                    │  │
│   │ Greenlight Guru (smaller co)│   │                                       │  │
│   └─────────────────────────────┘   └───────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  I · THE RECONCILIATION                                        surface: ledger-dk│
│  ───────────────────────────────────────────────────────────────────────────  │
│   Put a number on your coordination tax.                                        │
│   A 30-minute walkthrough against your standards, workflows, and systems.       │
│   [ Book a demo → ]        [ See the platform ]                                 │
│                                                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│  [Unifize]   Platform · Industries · Resources · Company        © Unifize       │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Section-by-section IA (sources, exact values, altitude rule, routing)

### A · The Ledger Hero
**Canonical arc block 0.** Source: `MD_ECONOMICS`, `MD_STANDARDS` (lead 6, "19 standards in frame"), `MD_COMPETITORS.differentiator`.

- **Headline (the hook):** *"Coordination is costing the medical-device segment $75.2M to $808.1M a year. Here's where it's hiding."* The range is rendered as a literal ledger figure on the right rail, with the supporting facts stacked like statement metadata.
- **Stat rail (canonical, verbatim):** `$75.2M–$808.1M` annual coordination tax · `81 companies` · `1.215M employees` (rendered "1.2M people") · `TAM ≈ $7.61B` · `wage band $80–$200/hr`. These are the only segment-level numbers; do not derive a per-company figure from them.
- **Reg frame strip:** lead 6 standards verbatim — `21 CFR 820 · 21 CFR Part 11 · ISO 13485 · ISO 14971 · EU MDR 2017/745 · 21 CFR 803`, labeled "Audited against · 19 standards in frame." Carries SEO + credibility.
- **Sub-promise:** the differentiator in one line — "Unifize reconstructs the decision trace your QMS can't — without ripping it out."
- **Altitude rule:** one promise, one frame, one number. No feature list. No module names yet.
- **CTAs:** primary scroll anchor `[ Find your line item ↓ ]` (jumps to E, the ledger of accounts — the routing payload); secondary `[ Book a demo → ]`.
- **Routing:** the scroll CTA is itself a routing primer — it tells the buyer the page's payload is "find *your* account."

### B · Liabilities — the cost you can't see
**Canonical arc block 4 (Consequences), pulled UP to second position.** Source: `MD_CONSEQUENCES` (all 5 groups, verbatim).

- Rendered as a **liabilities schedule** with three columns: *Line item · What accrues · Amount.* The five rows are the canonical consequence types:
  - **Cycle Time** — "Long cycle times; delayed time to market"
  - **Cost of Poor Quality (COPQ)** — "Coordination headcount embedded in COGS"
  - **Working Capital** — "Trapped cash; quarantine holds"
  - **Compliance Drag** — "Overdue controls; slow audit & customer proof; lagging post-market signal"
  - **Revenue Risk** — "Quality escapes & warranty; expanded recall scope; lost market access"
- **The Amount column reads "—" / "recurring" for every row.** This is the load-bearing design move of the whole direction: *the empty amount column is the argument.* A caption states it plainly: "'—' is the point. These never hit a line item — so no one is accountable for them."
- **Altitude rule:** named consequences, **no fake `$`** (the Consequences DB is qualitative — do-NOT-publish rule). This section must never be tempted into numbers.
- **Routing:** none (stakes, not a door). It sets up C and E.

### C · The General Ledger — cost per coordination event
**This is the direction's signature section and has no 1:1 in the canonical arc — it's a new framing of the canonical `MD_WORKFLOW_VARIANTS`.** Source: `MD_WORKFLOW_VARIANTS` (all real `Industry Variants` fields).

Three cards, each a "general-ledger entry" with the real per-instance cost:

| Variant | Unit cost | Decisions | Touchpoints | Cycle | Canonical note | Posts to (link) |
|---|---|---|---|---|---|---|
| **Nonconformance → CAPA** | `$285–$907` | 6 | 35 | weeks | "Overdue CAPAs are a common 483 finding." | CAPA module |
| **Engineering change** | `$420–$1,400` | 8 (`Critical`) | 48 | months | "The single highest coordination-density event in the segment." | Change Control |
| **Audit evidence** | `$310–$1,040` | 4 | 35 | days | "Work was done; proving it takes weeks." | Document & Records Control |

- **Altitude rule:** unit cost per instance only. A caption explicitly forbids the reader from reading these as annual totals: "These are unit costs, not annual totals. Multiply by your volume to estimate." No mechanics — name the event, its cost, its density, link out.
- **Routing (cost-led MODULE INGRESS, secondary path):** each card's "post to →" link goes to the owning module page. Engineering change → `/industries/medical-devices/change-control` (LIVE). NCR→CAPA and Audit evidence link to the CAPA and Document Control module pages (stubbed today — see routing map). This gives the economic buyer a *cost-motivated* door, distinct from the breadth-motivated map in E.

### D · Accounting Note — why the tax accrues
**Canonical arc block 3 (Root Causes), placed AFTER stakes.** Source: `MD_ROOT_CAUSE.primary`, `MD_ROOT_CAUSE.secondary` (verbatim).

- **① No shared operational truth** — the system of record is separate from the system of coordination; cross-functional work runs on ungoverned channels. Tagged: "every line item above traces here."
- **② Missing decision trace** — records capture *what* was decided, not the context/reasoning/evidence at the time; you can't replay decision-time reality; that's a compliance liability.
- **Altitude rule:** one-line thesis per cause, no taxonomy, no amplifier list (the 5 amplifiers stay down on module pages).
- **Routing:** none. This is the "note to the statement" — it justifies the numbers and sets up the differentiator in H.

### E · Where the tax lands — Chart of Accounts ★ MODULE INGRESS (primary) ★
**Canonical arc block 5 — the spine.** Source: `MD_DOMAIN_MAP` (all 9 domains, primary tier first, exactly as ordered in `md-module-map.ts`).

- Rendered as a **chart of accounts.** Each domain is an account header carrying `name`, `tier`, `owner` (canonical Domain field), and a one-line `promise`. Under each, the modules render as ledger lines (`name` + on-hover `blurb`), each a link to its module page.
- **Primary accounts** (expanded rows): Quality (5 modules), Product Development (4), Supplier Management (4), Operations (3).
- **Secondary accounts** (compact grid): Change Control (2), Document & Records Control (2), Training & Competency (2), Post-Market & Recall (2), Regulatory Affairs (2).
- **`●LIVE` badge** only on the two modules with a real `href` in `md-module-map.ts`: Change Control (ECO) and Engineering Change (ECO/ECR) — both → `/industries/medical-devices/change-control`. Every other module is a labeled stub (see routing map; never fake a live page).
- **Altitude rule:** domain name + owner + one-line promise; module name + one-line blurb; link out. **NO mechanics.**
- **Routing:** this is the canonical MODULE INGRESS — 24 module doors across 9 domains. The "find your line item" hero CTA lands here.

### F · Who signs the check — Account Owners ★ PERSONA INGRESS ★
**Canonical arc block 6.** Source: `MD_PERSONA` (Quality), plus the Personas inventory in the brief (Operations Leader as economic buyer, Regulatory affairs, Compliance & validation, adjacent doors).

- **Two lead signatory cards** sized largest because they are the two weighted buyers:
  - **⬤ Economic buyer — Operations Leadership.** Titles: `COO · VP Operations · Plant Manager · GM · Site Director`. Owns: output, stability, delivery, cross-functional execution. Tagged as the one who "signs and decides expand vs. churn" (the only `Goal Zero = Pass` persona — but we never expose that internal status; we express it as *signing authority*, which is exactly on-angle). Card link → Operations Leader persona page.
  - **⬤ Primary buyer — Quality Leadership.** Titles from `MD_PERSONA.titles`: `VP Quality · Head of Quality · Quality Director · Quality Manager · QA Manager · RAQA Director`. Cares (`MD_PERSONA.caresAbout`): release confidence, audit outcomes, traceability, recurrence. Worries (`MD_PERSONA.worriesAbout`): missing evidence, unclear approvals, repeat issues, audit findings, release risk. Card link → Quality Manager persona page (LIVE in exploration set).
- **Three compact cards:** Regulatory Affairs governance (`Head of RA · VP Regulatory`); Compliance & Validation (`Validation Manager · CSV Lead` — the procurement/IQ-OQ-PQ gatekeeper); and an "adjacent doors" tile listing Engineering change governance · Supplier quality governance · Innovation/NPI execution.
- **Altitude rule:** title cluster + one-line cares/worries + link. **NO day-in-the-life.** (The persona's actual caseload / `MD_PERSONA_JOBS` stays on the persona page.)
- **Routing:** the PERSONA INGRESS. Economic buyer card is visually dominant because this direction is *for* that reader.

### G · The one audited recovery
**Canonical arc block 7.** Source: `MD_PROOF` (verbatim).

- **The single hard company-level figure on the page**, framed as the one reconciled line: `$81,350/yr recovered ≈ 41%`, against a signed `$198,150` baseline, year one, on non-conformance coordination cost. Attribution: "Customer-attested · medical devices."
- **Named customers:** `Recovery Force` (Class I/II wearables) · `Harmonic Bionics` (surgical robotics).
- **Labeled placeholder slot** for the product/dashboard screenshot (does not exist yet — never fake a UI as shipped).
- **Altitude rule:** anonymized %, named customers, placeholder for screens. No invented second metric.
- **Routing:** none (trust object). Pairs the audited number against the empty liabilities column from B — the rhetorical payoff: *the cost you couldn't see (B), made visible and recoverable (G).*

### H · Why the incumbents can't close the gap
**Canonical arc block 8.** Source: `MD_COMPETITORS` (verbatim).

- Two columns: **"tracks documents"** (MasterControl — strong doc, weak cross-fn coordination; Veeva Vault Quality — pharma; ETQ Reliance — mid-market; Greenlight Guru — smaller cos) vs. **"reconstructs the decision"** (Unifize — the cross-functional decision trace, coexisting on top of the QMS/PLM/MES already validated).
- **Differentiator verbatim:** "Unifize reconstructs the decision trace across functions, rather than tracking document status." Plus the coexistence line — "no rip-and-replace" — which is the economic buyer's de-risking lever.
- **Altitude rule:** the differentiator + named incumbents + "coexists with QMS." No feature war.

### I · The Reconciliation (close)
**Canonical arc block 9.** Source: none (CTA).

- Single clear CTA: *"Put a number on your coordination tax."* — a 30-minute walkthrough against your standards, workflows, systems. `[ Book a demo → ]` primary; `[ See the platform ]` secondary.
- Closes the ledger metaphor: the demo is the "reconciliation" that turns the segment range into the buyer's own number.

---

## 5. Routing map (every link, with destination + live/stub state)

> Live routes today (verified in repo): `/industries/medical-devices/change-control` (one live module page) and the persona/exploration parallels under `/explorations/medical-devices/`. Everything else is a **labeled stub** — render the link but flag visually (no `●LIVE` badge); do not fake a shipped page. Template note: when promoted to production, swap `/explorations/...` for `/industries/medical-devices/...`.

**Hero (A)**
- `[ Find your line item ↓ ]` → in-page anchor `#chart-of-accounts` (section E)
- `[ Book a demo → ]` → `#reconciliation` (section I) / demo modal

**General Ledger cost cards (C) — cost-led MODULE INGRESS**
- Nonconformance → CAPA · "post to →" → `/industries/medical-devices/capa` *(STUB — wire to `💽 Modules` CAPA row)*
- Engineering change · "post to →" → `/industries/medical-devices/change-control` **(LIVE — `href` in `md-module-map.ts`)**
- Audit evidence · "post to →" → `/industries/medical-devices/document-records-control` *(STUB)*

**Chart of Accounts (E) — primary MODULE INGRESS (24 module doors / 9 domains)**

| Domain (account) | Modules → destination |
|---|---|
| **Quality** | CAPA & Effectiveness → `/…/capa` *(stub)* · Nonconformance/NCR → `/…/ncr` *(stub)* · MRB Disposition → `/…/mrb-disposition` *(stub)* · Deviation → `/…/deviation` *(stub)* · Internal Audit → `/…/internal-audit` *(stub)* |
| **Product Development** | Change Control (ECO) → `/industries/medical-devices/change-control` **(LIVE)** · Design Controls/DHF → `/…/design-controls-dhf` *(stub)* · Design Transfer/NPI → `/…/design-transfer-npi` *(stub)* · Risk Management File → `/…/risk-management-file` *(stub)* |
| **Supplier Management** | Supplier Qualification/PPAP → `/…/supplier-qualification` *(stub)* · SCAR → `/…/scar` *(stub)* · Incoming Inspection/MRB → `/…/incoming-inspection` *(stub)* · Quality Agreements → `/…/quality-agreements` *(stub)* |
| **Operations** | Production Hold Disposition → `/…/production-hold` *(stub)* · WIP/MRB Backlog → `/…/wip-mrb-backlog` *(stub)* · Batch/DHR Review → `/…/batch-dhr-review` *(stub)* |
| **Change Control** | Engineering Change (ECO/ECR) → `/industries/medical-devices/change-control` **(LIVE)** · Controlled Distribution → `/…/controlled-distribution` *(stub)* |
| **Document & Records Control** | Document Control → `/…/document-control` *(stub)* · Periodic Review → `/…/periodic-review` *(stub)* |
| **Training & Competency** | Training Cascades → `/…/training-cascades` *(stub)* · Competency/Re-qualification → `/…/competency` *(stub)* |
| **Post-Market & Recall** | Complaint/MDR Reporting → `/…/mdr-reporting` *(stub)* · Recall Execution → `/…/recall-execution` *(stub)* |
| **Regulatory Affairs** | Label Governance → `/…/label-governance` *(stub)* · 510(k)/PMA Submission → `/…/submission` *(stub)* |

**Authorized Signatories (F) — PERSONA INGRESS**
- Economic buyer — Operations Leadership → `/industries/medical-devices/operations-leader` *(STUB; exploration parallel `/explorations/medical-devices/operations-leader`)*
- Primary buyer — Quality Leadership → `/industries/medical-devices/quality-manager` **(LIVE — route exists; exploration parallel `/explorations/medical-devices/quality-manager` LIVE)**
- Regulatory Affairs governance → `/industries/medical-devices/regulatory-affairs` *(stub)*
- Compliance & Validation → `/industries/medical-devices/compliance-validation` *(stub)*
- Adjacent doors tile → links to Eng. change gov. / Supplier quality gov. / Innovation-NPI persona pages *(all stubs)*

**Close (I)**
- `[ Book a demo → ]` → demo modal/route · `[ See the platform ]` → `/platform`

**Routing integrity check:** Both ingress systems present (E = problem→module; F = role→persona), both reachable from the hero's intent, and the economic buyer gets a *third* cost-led path into modules via C. No dead ends; every stub is a real intended destination, badged honestly.

---

## 6. Fresh visual language — "Statement-grade enterprise"

The look is a **financial document re-imagined as a modern product surface** — not skeuomorphic spreadsheet, but the *restraint and precision* of a printed statement, with one accent that does all the emotional work. It is deliberately not the current site.

### Type
- **Display:** a confident grotesque with tabular figures — e.g. a humanist-but-tight sans for headlines (think "neo-grotesque with character"). Headlines set tight, large, left-aligned, almost no tracking.
- **Numerals everywhere use tabular / lining figures** — the `$75.2M–$808.1M`, the unit costs, the touchpoint counts must align in columns like a real ledger. This is non-negotiable for the metaphor.
- **Body:** the same family at comfortable measure; a slightly wider measure than the current site (~70–74ch) so line-item descriptions read like statement prose, not marketing copy.
- **One monospaced micro-voice** for the eyebrows / column headers / "AMOUNT" / "—" cells, set in `letter-spacing: 0.08em` uppercase — this is what signals "ledger" without a single border-heavy table.

### Color
- **Base:** near-paper warm white (`oklch(98% 0.005 95)`), ink near-black (`oklch(22% 0.02 265)`). Statement neutrality.
- **Ledger-dark surfaces** (hero A, MODULE INGRESS E, close I) on a deep desaturated ink-navy (`oklch(26% 0.03 255)`) — the "cover page" feel.
- **One accent — "ledger green"** (`oklch(62% 0.13 155)`), used *only* on real, reconciled numbers: the segment range, the unit costs, the `$81,350/41%` proof. Money the buyer can act on is green; everything theoretical stays ink. This is the single chromatic rule.
- **One muted "liability red/amber"** (`oklch(58% 0.10 40)`) used *exclusively* for the "—" amount cells and "recurring" tags in B — the unbilled liability. Sparingly.
- (Use the `oklch-skill` to lock the palette and verify AA contrast on both paper and ledger-dark surfaces.)

### Grid & layout
- **12-col grid, wider gutters**, max content ~1200–1280px (wider measure per the locked decision).
- **Hairline rules, not boxes.** The ledger feel comes from *horizontal hairline rules between rows* (1px, `oklch` ink at 12% alpha) — never heavy cell borders. Tables read as statements, not spreadsheets.
- **Right-aligned amount columns** in B and C — the single most recognizable "financial statement" cue, achieved with type alignment alone.
- **Section eyebrows render as statement labels:** "STATEMENT OF LIABILITIES," "NOTE 1 TO THE STATEMENT," "AUTHORIZED SIGNATORIES" — the metaphor carried in microcopy, cheaply.

### Motion
- **Restraint.** One signature motion: in the hero, the segment figure **counts/reveals into place** once (`$0 → $75.2M–$808.1M`) on first view, with a `prefers-reduced-motion` static fallback. Nothing else animates numbers (faking precision elsewhere would read as gimmick).
- **Scroll-reveal hairlines:** ledger rows draw their underline rule left-to-right on enter (subtle, 240ms). Implementable with `gsap-scrolltrigger` if desired, or pure CSS `@scroll-driven` where supported.
- Hover on a module line: the "post to →" / arrow slides in; row tints faintly. No card lift theatrics.

### Texture
- Almost none — restraint is the texture. Optional: an extremely faint **ruled-ledger baseline grid** behind sections B/C only (1px lines at 4% alpha), evoking accounting paper. Must be near-invisible; it's a whisper, not a skin.

### How this reads as fresh, not the current site
The current exploration page leans on placeholder image slots, dark hero, and pilltag frames. This direction replaces the *decorative* placeholders with **typographic ledger structure** — the page can carry its whole argument in type + hairlines + two accent colors, with placeholders confined to the proof screenshot only. That austerity is itself the differentiation, and it's exactly the register a CFO trusts.

---

## 7. How BOTH ingress systems are expressed (explicit, per the non-negotiable)

| Ingress | Section | Metaphor frame | What's shown (altitude-safe) | Links to |
|---|---|---|---|---|
| **Module (problem → module)** | E · Chart of Accounts (primary) + C · General Ledger (cost-led secondary) | "which account is bleeding" | Domain name + owner + 1-line promise; module name + 1-line blurb; `●LIVE` only where real | 24 module pages (1 live, rest badged stubs) |
| **Persona (role → persona)** | F · Authorized Signatories | "who owns the account / signs the check" | Title cluster + 1-line cares/worries; economic + primary buyers sized largest | 4 persona pages + adjacent-doors tile (1 live, rest stubs) |

Both are reachable from the hero (the "Find your line item" CTA primes the module path; the page structure surfaces signatories immediately after), and the economic-buyer angle is honored by giving that reader a *cost-first* third path into modules through section C. A buyer senses early — by the second screen — "I can enter by my account (problem) or by who owns it (role)."

---

## 8. Risks & mitigations (specific to this angle)

1. **Over-quantification / fabricated math.** The biggest risk. *Mitigation:* the empty Amount column in B is a feature, not a bug; the C captions forbid annualizing unit costs; only G carries a company-level number. Hard rule enforced in copy.
2. **The metaphor turning gimmicky.** A ledger skin could feel cute, undercutting a serious buyer. *Mitigation:* austerity — hairlines not boxes, one accent color, one motion, real numbers only. The metaphor lives in microcopy and alignment, not chrome.
3. **Quality buyer feeling sidelined.** This is for the COO; VP Quality is the panel's primary buyer and must still nod. *Mitigation:* B's line items (Compliance Drag, Revenue Risk) and C's CAPA/Audit variants are *their* world; the primary-buyer signatory card is co-equal with the economic buyer's.
4. **Cost-led C path competing with the E map.** Two module ingresses could confuse. *Mitigation:* C links are framed as "post to →" (cost-motivated, 3 events) and E is the full "chart of accounts" (breadth) — clearly different jobs, clearly labeled.
5. **Stub-heavy routing reads as vaporware to a skeptic.** 22 of 24 module doors are stubs. *Mitigation:* badge honesty (`●LIVE` only where true), and the live Change Control door is featured prominently as proof the pattern is real. Provenance honesty is on-brand.
6. **Segment range mistaken for "your cost."** *Mitigation:* it's always labeled "segment," and the close CTA ("Put a number on *your* coordination tax") explicitly defers the per-buyer number to the demo.
