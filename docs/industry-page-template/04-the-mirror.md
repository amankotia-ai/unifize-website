# 04 — The Mirror

> **Direction family:** Industry Page Template · instanced on Medical Devices
> **Build route:** `/explorations/industry-template` (MD instance; production `/industries/[slug]` untouched)
> **Angle owner's one-liner:** *Recognition first. Earn the nod with the buyer's own words before you name a cause or a product — then convert that recognition into routing.*
> Traces to `docs/industry-page-template/00-overview-and-model.md`. Every value below is canonical (`medical-devices-canonical.ts` + `md-module-map.ts`). No invented metrics.

---

## 1. Thesis

Most B2B industry pages open by asserting a problem and selling a cure. The skeptical practitioner — the Quality Manager who has been burned by QMS marketing three times — has antibodies for that. They scroll past the value prop because they don't yet believe *you* understand *their* world.

**The Mirror inverts the order.** The page opens not with a claim but with a quote — the buyer's own sentence, verbatim from the Symptoms inventory: *"We spend more time coordinating the work than doing the work."* No logo wall first, no promise, no number. Just a line so specific that the reader thinks *that's me.* Then a second line. Then a wall of six. Recognition is the on-ramp; the reader earns their own diagnosis before we offer one.

Only after the nod is banked do we **turn**: we name the single structural root cause (*No shared operational truth*), state what it costs (in words, never invented dollars), and then — critically — **we hand the reader a fork.** Recognition without an exit is a therapy session. The Mirror's whole job is to take the emotional energy of "finally, someone gets it" and immediately route it: *by your problem* (the Domains × Modules map) or *by your role* (the persona cards). The doors are the payoff, not a footnote.

**The shape in one breath:** *symptom → symptom → symptom → "here's the name for that" → "here's what it's costing" → "here's the door."*

---

## 2. Why this shape for a routing hub

The brief is explicit: the page's primary job is a **routing hub** — make the buyer feel seen at breadth, then distribute into the right **module** and **persona** pages. Conversion happens deeper. The Mirror is arguably the *purest psychological fit* for that job, for one reason:

**Recognition is the cheapest, highest-trust routing signal there is.** When a reader recognizes themselves in a symptom, they have already self-identified their problem *and* their role. The symptom *"Changes get made but half the people are still on the old version"* is a person standing at the Change Control / Document Control door. The symptom *"Everything sits in someone's queue for days before it moves"* is the Operations Leader at the Operations door. **The symptoms are pre-routing.** The Mirror exploits this: it lets the buyer triage themselves emotionally, *then* gives them the literal map.

So the routing-hub requirement is satisfied not by leading with a directory (that's `03 Coverage Atlas`'s job) but by **earning the right to show the directory.** The two ingress systems still appear in full — but they land on a reader who is now leaning in, not bracing.

This also resolves The Mirror's signature risk head-on (see §11): a recognition-led page can wallow. We counter that structurally by making **Section F a hard fork**, placed the moment recognition peaks, so the page never drifts into a feelings-loop with no way out.

---

## 3. Altitude discipline (the governing rule)

The Mirror is *more* tempted than other directions to drop altitude, because empathy invites detail. We hold the line:

- Symptoms (A, B) are buyer-voice **feelings**, not mechanics. "We spend more time coordinating the work than doing the work" — never "here's how CAPA effectiveness verification works."
- The root cause (C) is **one structural sentence**, not a taxonomy. We name *No shared operational truth* and stop. The five amplifiers (validated-QMS lock-in, Mode-2-on-Mode-1, networked ops, factory complexity, product complexity) stay *off* the page — they're module/persona-page depth.
- The module map (G) renders **domain name + owner + one-line promise; module name + one-line blurb + link out.** No `ProcessStraighten`, no dramatized chat, no compression story. Those live one level down.
- Persona cards (H) render **title cluster + one-line cares/worries + link.** No day-in-the-life narrative; that's the persona page's job (`/explorations/medical-devices/quality-manager`).
- Triggers (E) are **names + severity/clock badges only.** No remediation detail.

---

## 4. The content model → this page (provenance map)

| Section | Canonical source | Exact values used |
|---|---|---|
| A Hero / Mirror | Symptoms (`f498bfbe`) + Reg Vocab + Industries:Opportunity | Lead symptom verbatim; reg-frame chips |
| B Verbatim wall | Symptoms (`f498bfbe`) | The 6 buyer-voice lines (see §6.B) |
| C The turn / root cause | Root Causes (`0fda224e`) — `MD_ROOT_CAUSE.primary` | "No shared operational truth" + body |
| D What it's costing | Consequences (`1663180c`) — `MD_CONSEQUENCES` | 5 named types, **no $** |
| E Why now | Trigger Events (`55d52078`) — `MD_TRIGGERS` | 8 buyer-language triggers → persona ingress |
| F The two doors | — (IA construct) | Fork UI; no new content |
| G By your problem | Domains (`b835b86d`) → Modules — `MD_DOMAIN_MAP` | 9 domains, owners, promises, module rosters · MODULE INGRESS |
| H By your role | Buyer Personas (`2f0860e6`) — `MD_PERSONA` + adjacents | 3 persona clusters · PERSONA INGRESS |
| I Proof | Industries:Proof — `MD_PROOF` | $81,350/yr · 41% · $198,150 baseline · Recovery Force · Harmonic Bionics |
| J Why Unifize | Industries:Competitive — `MD_COMPETITORS` | Differentiator + 4 named incumbents |
| K Close | — | Single CTA |

**Do-NOT-publish guards observed:** no invented headline metrics; no $ on any Consequence; no Goal-Zero/Hypothesis status text; product screens are **labeled placeholder slots** (`.ph`), never faked.

---

## 5. The page shape — full ASCII wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  SiteHeader (sticky, light)                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│  A · THE MIRROR  — surface: paper-light, NOT the usual dark hero                │
│  ┌────────────────────────────────────────────────────────────────────────┐   │
│  │  Industries / Medical Devices                          (breadcrumb)      │   │
│  │  ·  Medical Devices                                     (eyebrow, dot)    │   │
│  │                                                                          │   │
│  │     “We spend more time coordinating                                     │   │
│  │      the work than doing the work.”      ← lead SYMPTOM, oversized serif  │   │
│  │                                            italic, quote-mark hung left   │   │
│  │                                                                          │   │
│  │  That sentence shows up in every device quality team we talk to.         │   │
│  │  Not a discipline problem. Not your QMS failing. One structural gap —    │   │
│  │  and it has a name. Read the six lines below. If three are your week,    │   │
│  │  you're in the right place.                          (subhead)           │   │
│  │                                                                          │   │
│  │  [21 CFR 820][21 CFR Part 11][ISO 13485][ISO 14971][EU MDR]  reg chips   │   │
│  │                                                                          │   │
│  │  [ Find your way in  ↓ ]   [ Book a demo ]          (CTAs; #1 = scroll)  │   │
│  └────────────────────────────────────────────────────────────────────────┘   │
│  (no hero image. Whitespace + one quote IS the hero. Faint vertical hairline    │
│   rule on the left margin, like a margin-note in a lab notebook.)               │
├──────────────────────────────────────────────────────────────────────────────┤
│  THIN TRUST STRIP — “Trusted by regulated device & life-science teams”          │
│  Recovery Force · Harmonic Bionics            (TrustStrip component, reused)     │
├──────────────────────────────────────────────────────────────────────────────┤
│  B · ONE MORE LINE  — the verbatim wall.  surface: white                        │
│  eyebrow “In your words”   ·   h2 “If you've said one of these, read on.”       │
│  ┌─────────────────────────┐ ┌─────────────────────────┐ ┌──────────────────┐  │
│  │ “When auditors ask for  │ │ “We can't reconstruct   │ │ “Changes get made│  │
│  │  the full record we     │ │  what we knew and who   │ │  but half the    │  │
│  │  spend days pulling it  │ │  decided what at the    │ │  people are still│  │
│  │  together.”             │ │  time.”                 │ │  on the old ver.”│  │
│  │  — pulled-quote tile    │ │                         │ │                  │  │
│  └─────────────────────────┘ └─────────────────────────┘ └──────────────────┘  │
│  ┌─────────────────────────┐ ┌─────────────────────────┐ ┌──────────────────┐  │
│  │ “Everything sits in     │ │ “We can't tell if a     │ │ “We spend more   │  │
│  │  someone's queue for    │ │  CAPA actually fixed it │ │  time coordinat- │  │
│  │  days before it moves.” │ │  or just the symptom.”  │ │  ing than doing.”│  │
│  └─────────────────────────┘ └─────────────────────────┘ └──────────────────┘  │
│  (6 quote tiles, hung quotation marks, no icons. Each tile carries a faint      │
│   inline data-attr → its routing target, used in F/G. See routing map §9.)      │
├──────────────────────────────────────────────────────────────────────────────┤
│  C · THE TURN  — name the cause.  surface: DARK (the one tonal shift)           │
│  eyebrow “What you just felt has a name”                                        │
│  ┌────────────────────────────────────────────────────────────────────────┐   │
│  │  No shared operational truth.                  ← root-cause name, large   │   │
│  │                                                                          │   │
│  │  Your system of record is separate from your system of coordination,    │   │
│  │  so cross-functional work runs on ungoverned channels — email,          │   │
│  │  meetings, spreadsheets. Every line above traces back here.             │   │
│  │                                       (MD_ROOT_CAUSE.primary.body)        │   │
│  │  ─────────────────────────────────────────────────────────────────     │   │
│  │  The QMS holds what's officially true. The work that produces it lives  │   │
│  │  in a second system your QMS never sees. That gap is the tax.           │   │
│  └────────────────────────────────────────────────────────────────────────┘   │
│  (dark band = the “aha” pivot. Everything before = their world; everything      │
│   after = ours. This is the visual hinge of the page.)                          │
├──────────────────────────────────────────────────────────────────────────────┤
│  D · WHAT IT'S COSTING YOU  — consequences, qualitative.  surface: white        │
│  eyebrow “Left alone, the gap compounds”                                        │
│  ┌────────┬────────┬────────┬────────┬────────┐                                 │
│  │ Cycle  │ Cost of│ Compli-│ Revenue│ Working│   5 named consequence columns   │
│  │ time   │ poor   │ ance   │ risk   │ capital│   each: 1–3 sub-items, words    │
│  │        │ quality│ drag   │        │        │   ONLY. NO dollar figures.      │
│  └────────┴────────┴────────┴────────┴────────┘                                 │
│  small-print: “Costs stated as consequences, not estimates — your number is     │
│  yours to run.”  → [ Run the coordination-tax calculator → ]                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  E · WHY NOW  — trigger moments.  surface: alt   (PERSONA-INGRESS warmup)       │
│  eyebrow “The week teams reach for a better way”                                │
│  [FDA Warning Letter received] [Form 483 observation] [MDR/vigilance deadline]  │
│  [Recall scope to be defined]  [DHF gap found at audit] [Production hold]        │
│  [Supplier-caused line stop]   [Data integrity finding]                         │
│  (8 trigger chips w/ severity dot. Footer line: “Recognize the week you're in?  │
│   These land on a person — meet them in Section H.” → soft link to personas)    │
├──────────────────────────────────────────────────────────────────────────────┤
│  F · THE TWO DOORS  — the fork.  surface: DARK, full-bleed, anchor #doors       │
│  eyebrow “You've seen yourself. Now pick a door.”                               │
│  h2 “Two ways in. Same platform underneath.”                                    │
│  ┌──────────────────────────────────┐  ┌──────────────────────────────────┐    │
│  │  DOOR 1 — BY YOUR PROBLEM         │  │  DOOR 2 — BY YOUR ROLE           │    │
│  │  “I know what's broken.”          │  │  “I know who I am.”              │    │
│  │  9 coordination domains, each a   │  │  The people who own the work —   │    │
│  │  door to a module page.           │  │  Quality, Operations, Reg Affairs│    │
│  │  → Quality · Product Dev ·        │  │  → Quality leadership (primary)  │    │
│  │    Supplier · Operations · +5     │  │    Operations · Reg Affairs      │    │
│  │  [ Open the map ↓ ]               │  │  [ Find your role ↓ ]           │    │
│  └──────────────────────────────────┘  └──────────────────────────────────┘    │
│  (both ingress systems named & obvious. Buttons scroll to G and H. This band    │
│   is the recognition→routing conversion. It is the spine of the page.)          │
├──────────────────────────────────────────────────────────────────────────────┤
│  G · BY YOUR PROBLEM — DOMAINS × MODULES MAP.  surface: alt   anchor #problem   │
│  eyebrow “Where Unifize comes in”  ·  h2 “Nine domains. Every door is a module.”│
│  ┌───────────────┬──────────────────────────────────────────────────────────┐ │
│  │ PILLARS       │  [Primary domain]  VP Quality / QA Director                │ │
│  │ ▸ Quality (5) │  one-line promise……………………………………………………                  │ │
│  │   Product (4) │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │ │
│  │   Supplier(4) │  │ CAPA & Eff.  │ │ Nonconf./NCR │ │ MRB Dispos.  │  …     │ │
│  │   Operations  │  │ blurb + chips│ │ blurb + chips│ │ blurb + chips│        │ │
│  │ ADJACENT      │  │ Module page→ │ │ Module page→ │ │ Module page→ │        │ │
│  │   Change Ctrl │  └──────────────┘ └──────────────┘ └──────────────┘        │ │
│  │   Doc & Rec.  │  (Change Control module = LIVE → /…/change-control)        │ │
│  │   Training    │                                                            │ │
│  │   Post-Mkt    │                                                            │ │
│  │   Reg Affairs │                                                            │ │
│  └───────────────┴──────────────────────────────────────────────────────────┘ │
│  (= IndustryModuleMap component, reused. MODULE INGRESS. name+tease only.)      │
├──────────────────────────────────────────────────────────────────────────────┤
│  H · BY YOUR ROLE — PERSONA CARDS.  surface: white   anchor #role               │
│  eyebrow “Who it's for”  ·  h2 “The people who own the work.”                   │
│  ┌────────────────────────────────────┐  ┌─────────────────────────────────┐   │
│  │  PRIMARY BUYER                      │  │  Operations leadership          │   │
│  │  Quality leadership                 │  │  COO · VP Ops · Plant Manager   │   │
│  │  VP Quality · Head of Quality ·     │  │  cares: output, delivery,       │   │
│  │  Quality Director · QA Mgr · RAQA   │  │  cross-functional execution     │   │
│  │  cares: release confidence, audit   │  │  → economic buyer · adjacent    │   │
│  │  outcomes, traceability, recurrence │  └─────────────────────────────────┘   │
│  │  worries: missing evidence, unclear │  ┌─────────────────────────────────┐   │
│  │  approvals, repeat issues, findings │  │  Regulatory affairs             │   │
│  │  [ See the Quality Manager page → ] │  │  Head of RA · VP Regulatory     │   │
│  └────────────────────────────────────┘  │  cares: submission timelines,   │   │
│   (lead card LINKS to persona page)       │  label currency, MDR deadlines  │   │
│                                           │  → adjacent door                │   │
│                                           └─────────────────────────────────┘   │
│  (PERSONA INGRESS. title cluster + cares/worries + link. NO day-in-the-life.)   │
├──────────────────────────────────────────────────────────────────────────────┤
│  I · YOU'RE NOT THE FIRST TO RECOGNIZE THIS  — proof.  surface: alt             │
│  eyebrow “Proof”  ·  h2 “A device company in your regulatory class did this.”   │
│  ┌──────────────────────────────┐  ┌───────────────────────────────────────┐   │
│  │  41%                          │  │  [ .ph — Product / dashboard slot ]   │   │
│  │  lower non-conformance        │  │   labeled placeholder, never faked    │   │
│  │  coordination cost            │  └───────────────────────────────────────┘   │
│  │  $81,350 recovered, year one, │  Recovery Force · Harmonic Bionics            │
│  │  vs signed $198,150 baseline. │  Customer-attested · medical devices          │
│  └──────────────────────────────┘                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  J · WHY UNIFIZE  — competitive contrast.  surface: white                       │
│  h2 “Incumbents track documents. Unifize reconstructs the decision.”            │
│  differentiator body + [MasterControl][Veeva][ETQ][Greenlight Guru]             │
│  caption: “Coexists with your QMS — no rip-and-replace.”                        │
├──────────────────────────────────────────────────────────────────────────────┤
│  K · CLOSE  — surface: DARK                                                     │
│  h2 “See Unifize wired for your stack.”                                         │
│  sub “A 30-minute walkthrough: your standards, your workflows, your systems.”   │
│  [ Book a demo ]   [ See the platform ]                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│  SiteFooterX                                                                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Reading rhythm (surface cadence) — designed so the dark bands are the two pivots:**
`paper-light (A) → white (B) → ⬛DARK (C, the turn) → white (D) → alt (E) → ⬛DARK (F, the fork) → alt (G) → white (H) → alt (I) → white (J) → ⬛DARK (K)`. The two dark bands (C "name it" and F "pick a door") are the emotional hinges; everything between A→C is *their world*, everything after C is *ours*.

---

## 6. Section-by-section IA (with exact MD values)

### A · The Mirror (hero) — Symptoms · Reg Vocab
- **Lead symptom (verbatim, `MD` Symptoms):** *"We spend more time coordinating the work than doing the work."* Rendered as the H1-equivalent — oversized italic serif, hung quotation mark. This is the only hero "headline."
- **Subhead (authored, altitude-safe):** "That sentence shows up in every device quality team we talk to — VP Quality, Plant Manager, Head of RA. It isn't a discipline problem and it isn't your QMS failing. It's one structural gap, and it has a name. Read the six lines below. If three of them are your week, you're in the right place."
- **Reg-frame chips:** `21 CFR 820 · 21 CFR Part 11 · ISO 13485 · ISO 14971 · EU MDR` (from `MD_STANDARDS.slice(0,5)`).
- **CTAs:** primary `Find your way in ↓` (smooth-scrolls to `#doors`, Section F) · secondary `Book a demo`.
- **No hero image.** The restraint *is* the credibility signal for the skeptic — a quote and whitespace, not a stock surgeon photo.

### B · One more line (the verbatim wall) — Symptoms (`f498bfbe`)
Six buyer-voice quote tiles, all canonical:
1. "When auditors ask for the full record we spend days pulling it together."
2. "We can't reconstruct what we knew and who decided what at the time."
3. "Changes get made but half the people are still on the old version."
4. "Everything sits in someone's queue for days before it moves."
5. "We can't tell if a CAPA actually fixed it or just the symptom."
6. "We spend more time coordinating the work than doing the work." *(echo of the hero — bookends the recognition)*
- eyebrow "In your words" · h2 "If you've said one of these, read on."
- Each tile is **a hung-quote pull-quote**, no icon, no title-line — the quote *is* the content. Each carries a hidden routing affinity used in F/G (see §9 routing map).

### C · The turn (root cause) — Root Causes · `MD_ROOT_CAUSE.primary`
- eyebrow "What you just felt has a name"
- **Name (large):** "No shared operational truth."
- **Body (verbatim):** "Your system of record is separate from your system of coordination, so cross-functional work runs on ungoverned channels — email, meetings, spreadsheets. Every line above traces back here." (`MD_ROOT_CAUSE.primary.body`, lightly framed to point back at the wall).
- **Coda (authored, altitude-safe):** "The QMS holds what's officially true. The work that produces it lives in a second system your QMS never sees. That gap is the tax." (We deliberately do **not** enumerate the 5 amplifiers — altitude.)
- This is the **only place the secondary root cause (`Missing decision trace`) is foreshadowed** — and only as a phrase ("what you knew and who decided what at the time" already appeared in tile 2), not as a labeled taxonomy.

### D · What it's costing you — Consequences · `MD_CONSEQUENCES`
Five named columns, **words only, zero dollars:**
- **Cycle time:** Long cycle times · Delayed time to market
- **Cost of poor quality:** Coordination headcount embedded in COGS
- **Compliance drag:** Persistent overdue controls and unresolved holds · Slow audit and customer proof · Lagging post-market signal detection
- **Revenue risk:** Quality escapes and warranty cost · Expanded recall scope · Lost market access
- **Working capital:** Trapped cash and high working capital
- Small-print honesty line: "Costs stated as consequences, not estimates — your number is yours to run." → links to `/coordination-tax-calculator`. (This is the *only* place economics surface; we deliberately keep the $75.2M–$808.1M segment range **off** The Mirror — it's the Ledger direction's hero, and quoting it here would break the intimate, you-shaped tone. Graft target if proof-of-scale is wanted.)

### E · Why now (triggers → persona ingress) — Trigger Events · `MD_TRIGGERS`
Eight trigger chips with a severity dot, names only:
FDA Warning Letter received · Form 483 observation issued · MDR / vigilance reporting deadline · Recall scope to be defined · DHF gap found at audit · Production hold pending disposition · Supplier-caused line stop · Data integrity finding.
- eyebrow "The week teams reach for a better way."
- **Ingress bridge line:** "Recognize the week you're in? These land on a person — meet them in Section H." → soft anchor to `#role`. (This makes E a *persona-ingress warmup*, not a dead band.)

### F · The two doors (the fork) — IA construct, **the spine**
- eyebrow "You've seen yourself. Now pick a door." · h2 "Two ways in. Same platform underneath."
- **Door 1 — By your problem** ("I know what's broken"): teases the 9 domains; button `Open the map ↓` → `#problem` (Section G).
- **Door 2 — By your role** ("I know who I am"): teases Quality / Operations / Reg Affairs; button `Find your role ↓` → `#role` (Section H).
- This is the single most important band on the page: it is where recognition becomes routing, and it satisfies non-negotiable #1 (both ingress systems present and obvious) in one explicit, symmetrical UI. Placed at the recognition peak so the page can never feel like a no-exit therapy session.

### G · By your problem — Domains × Modules map (**MODULE INGRESS**) — `MD_DOMAIN_MAP`
- Reuses the existing `IndustryModuleMap` two-pane explorer.
- **Pillars (Primary):** Quality (5) · Product Development (4) · Supplier Management (4) · Operations (3).
- **Adjacent doors (Secondary):** Change Control · Document & Records Control · Training & Competency · Post-Market & Recall · Regulatory Affairs.
- Each panel: tier badge + **owner** (e.g. "VP Quality / QA Director") + one-line promise + module cards (name + blurb + standards chips + link).
- **Live link today:** Change Control module → `/industries/medical-devices/change-control`. All other modules render "Module page →" (deferred slot), per provenance honesty.

### H · By your role — persona cards (**PERSONA INGRESS**) — `MD_PERSONA` + adjacents
- **Lead card — Quality leadership (primary buyer):** titles `VP Quality · Head of Quality · Quality Director · QA Manager · RAQA Director`; cares `release confidence · audit outcomes · traceability · recurrence reduction`; worries `missing evidence · unclear approvals · repeat issues · audit findings · release risk`. **Links to** `/explorations/medical-devices/quality-manager`.
- **Adjacent card — Operations leadership (economic buyer):** `COO · VP Operations · Plant Manager · GM · Site Director`; cares `output, stability, delivery, cross-functional execution`. *(The economic buyer is surfaced honestly as the one who pays/decides — flagged, not buried.)*
- **Adjacent card — Regulatory Affairs:** `Head of RA · VP Regulatory`; cares `submission timelines, label currency, MDR/vigilance deadlines`.
- Cares/worries are one line each. **No day-in-the-life** — that's the persona page.

### I · Proof — `MD_PROOF`
- eyebrow "Proof" · h2 "A device company in your regulatory class did this."
- **41%** lower non-conformance coordination cost; **$81,350 recovered** in year one against a signed **$198,150** baseline; attribution "Customer-attested · medical devices"; named refs **Recovery Force · Harmonic Bionics**.
- The dashboard is a **labeled `.ph` placeholder slot**, never a faked UI.
- Headline echoes the angle: "you're not the first to recognize this" — recognition closing the loop into social proof.

### J · Why Unifize — `MD_COMPETITORS`
- h2 "Incumbents track documents. Unifize reconstructs the decision." (= the differentiator, verbatim spirit).
- Named incumbents: MasterControl (primary) · Veeva Vault Quality · ETQ Reliance · Greenlight Guru.
- Caption: "Coexists with your QMS — no rip-and-replace."

### K · Close
- Single CTA band (reuse the existing dark close pattern): "See Unifize wired for your stack." · `Book a demo` · `See the platform`.

---

## 7. How BOTH ingress systems are expressed

The Mirror carries the two ingress systems **twice each** — once latently, once explicitly — which is its structural signature:

- **Latent (the symptoms pre-route).** Every symptom tile in B has an affinity to a domain/persona (see §9). A reader who recognizes "Changes get made but half the people are still on the old version" is already pointed at Change Control + Document Control. Recognition does the first cut.
- **Explicit fork (Section F).** The two doors are named side-by-side, symmetrical, equally weighted, with their own scroll anchors. *By your problem* → G (module ingress). *By your role* → H (persona ingress). This is the canonical "a buyer can enter by who they are or by what's broken" requirement, made into literal UI.
- **Module ingress (G):** the full Domains × Modules map; 9 domains, every module a door to a module page.
- **Persona ingress (H):** persona cards; lead card links to the Quality Manager persona page; adjacents named (incl. the economic buyer).

Both are sensed early (the F teaser language can also be foreshadowed in the hero subhead and the E bridge line), satisfying "both ingress systems visible above the fold's reach."

---

## 8. Fresh visual language

Distinct from the current site and from sibling directions. The metaphor is **a lab notebook / margin annotation** — quiet, exact, evidentiary; the aesthetic a skeptical Quality person trusts.

- **Type.** Editorial **serif** for the symptom quotes and root-cause name (the human voice); **grotesque sans** for structure, labels, owners, chips (the system voice). The serif/sans split *is* the "their world vs. our system" narrative, rendered typographically. Lead symptom set very large (clamp ~`2.6rem`→`4.2rem`), tight leading, optical hung punctuation.
- **Measure.** Slightly wider than the standard site per brief; symptom quotes get a generous ~62–68ch measure so they read like spoken sentences, not marketing.
- **Color.** Restrained, near-monochrome paper base (warm off-white `#F7F6F3`-ish) with near-black ink; **two dark bands only** (C, F, K) as the tonal hinges; a single low-chroma accent (deep clinical teal or ink-blue) reserved exclusively for ingress affordances — the two-door buttons, the module "→", the persona link. Accent = "this is a way out." (Recommend authoring the accent in OKLCH for consistent perceived lightness across the dark/light bands.)
- **Grid.** A persistent faint **left hairline rule** down the whole page — the "notebook margin" — that the quotes hang off, giving the recognition section a transcript feel. Symptom tiles: airy, no card borders on B (just the hung quote + a thin rule), so it reads as a *list of things people said*, not a feature grid.
- **Motion.** Restraint. Symptom tiles fade/rise in sequence on scroll (staggered, ~60ms apart) so the wall *accumulates* — recognition built line by line. The C dark band cross-fades the surface (the "turn"). The two-door buttons get a quiet underline-grow on hover. No parallax, no decorative animation — motion only ever marks meaning.
- **Texture.** Optional very faint paper grain on the light bands; otherwise flat. The dark bands are pure ink with the accent.

---

## 9. Routing map (every link's destination)

| Origin (section · element) | Type | Destination |
|---|---|---|
| Hero CTA "Find your way in ↓" | in-page | `#doors` (Section F) |
| Hero CTA "Book a demo" | conversion | demo modal / `#demo` |
| Breadcrumb "Industries" | nav | `/platform#industries` |
| B · tile "auditors ask for the full record" | latent affinity | Quality → CAPA/Internal Audit + Doc & Records (no link; informs F) |
| B · tile "reconstruct what we knew / who decided" | latent affinity | Quality + Change Control (decision trace) |
| B · tile "half the people on the old version" | latent affinity | Change Control + Document & Records Control |
| B · tile "sits in someone's queue for days" | latent affinity | Operations (persona: Ops Leader) |
| B · tile "CAPA fixed it or just the symptom" | latent affinity | Quality → CAPA & Effectiveness |
| B · tile "coordinating more than doing" | latent affinity | all / the root cause (no link) |
| D · "Run the coordination-tax calculator →" | tool | `/coordination-tax-calculator` |
| E · trigger bridge "meet them in Section H" | in-page | `#role` (Section H) |
| **F · Door 1 "Open the map ↓"** | **MODULE INGRESS** | `#problem` (Section G) |
| **F · Door 2 "Find your role ↓"** | **PERSONA INGRESS** | `#role` (Section H) |
| G · module "Change Control (ECO)" | module page (LIVE) | `/industries/medical-devices/change-control` |
| G · module "Engineering Change (ECO/ECR)" | module page (LIVE) | `/industries/medical-devices/change-control` |
| G · all other modules (Quality, Supplier, Ops, etc.) | module page (deferred) | per-module slot — wire to `💽 Modules` rows when `Industries` relation fills |
| **H · Quality leadership card** | **PERSONA page (LIVE)** | `/explorations/medical-devices/quality-manager` |
| H · Operations leadership card | persona page (deferred) | persona slot (economic buyer) |
| H · Regulatory Affairs card | persona page (deferred) | persona slot |
| I · proof dashboard | placeholder | `.ph` slot (Sachin's packaged screen) |
| J · incumbent chips | — | non-link (named contrast only) |
| K · "Book a demo" / "See the platform" | conversion / nav | `#demo` / `/platform` |

**Live targets today:** Change Control module page and the Quality Manager persona page. Everything else is a labeled deferred slot — honest, not faked.

---

## 10. Build notes (so an engineer can build it)

- **Route:** new page under `/explorations/industry-template` (MD instance), mirroring `src/app/explorations/medical-devices/industry/page.tsx` structure; reuse `SiteHeader`, `TrustStrip`, `SiteFooterX`, `IndustryModuleMap` (Section G verbatim), and the dark close band.
- **New components:** `MirrorHero` (quote-led, no image), `SymptomWall` (6 hung-quote tiles, staggered scroll-in — a `"use client"` island for the IntersectionObserver), `TheTurn` (dark root-cause band), `TwoDoors` (the fork, anchors `#doors`/`#problem`/`#role`). Consequences (D) and personas (H) are static server components.
- **Data:** import `MD_ROOT_CAUSE`, `MD_CONSEQUENCES`, `MD_TRIGGERS`, `MD_STANDARDS`, `MD_PERSONA`, `MD_PROOF`, `MD_COMPETITORS` from `medical-devices-canonical.ts`; `MD_DOMAIN_MAP` from `md-module-map.ts`. The six symptom strings should be promoted into a `MD_SYMPTOMS` const in `medical-devices-canonical.ts` (they currently live only in the brief and inline in the old symptoms page) so the wall is canonical-sourced, not hand-typed.
- **Anchors:** `#doors` (F), `#problem` (G), `#role` (H), `#demo` (K) — all CTAs use smooth-scroll.
- **Fresh CSS:** add a scoped block in `explorations.css` (or a sibling) for the serif/sans pairing, the notebook left-rule, the two-band dark cadence, and the accent token. Don't reuse the dark hero gradient from the other explorations — The Mirror's hero is light.
- **Placeholders:** all not-yet-real visuals use the existing `.ph` pattern with a visible `ph-label`.

---

## 11. Risks & mitigations

| Risk | Mitigation in this structure |
|---|---|
| **Therapy-session feeling** (recognition with no exit) — the angle's signature failure mode | Section F (the fork) is placed at the recognition *peak* and is the page spine; the hero CTA jumps straight to it; the E bridge line and the I "you're not the first" headline keep pulling toward action. The reader is never more than one scroll from a door. |
| **Skeptic reads it as manipulation** ("you're just feeding me my own complaints") | We never overreach on the quotes (they're verbatim, mundane, un-dramatized), the hero has no stock photo or hype, and C names a *structural* cause (not "you're doing it wrong"). Credibility through restraint. |
| **Altitude creep** (empathy invites mechanics) | Hard rule §3; the only "how" anywhere is one sentence in C; module/persona depth is strictly behind links. |
| **Recognition fatigue** (six near-identical complaints) | The six are deliberately varied across domains (audit, decision trace, version control, queue latency, CAPA efficacy, the meta-line) and the wall accumulates via staggered motion so it reads as a chorus, not repetition. |
| **Economics under-served for the COO** | Intentional — The Mirror is tuned to the skeptic, not the economic buyer (that's `01 Ledger`). The D calculator link + I proof carry just enough $ honesty. Graft target: the segment coordination-tax range ($75.2M–$808.1M) from the Ledger into D if the panel wants more scale. |
| **No invented metrics** | Only canonical numbers appear: 41%, $81,350, $198,150 (I) — everything else is words. |

---

## 12. The one-line pitch to the tournament panel

> *"Other directions tell the device buyer what's wrong. The Mirror lets them say it first — in their own words — then hands them the name for it and the two doors out. For the skeptical Quality Manager who's been burned by QMS marketing, recognition is the only opening line that survives the first scroll."*
