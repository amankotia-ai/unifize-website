# What I need from you, Ben — canonical inputs for the scalable page system

Follow-up to the May 21 Design Sync. You asked me to come back with a structured list rather than naming things in isolation. This is framed the way the architecture is layered: the end state is that pages are *generated from a single canonical source*, never hand-authored, so each thing below is mapped to the layer that consumes it. Where you've already offered something on the call, I've noted it.

The short version: I built the medical-devices and aerospace pages from whatever I could find (the Solutions HQ NCR demo doc, the Approval Workflows doc, and Ashwath's video storyboard). That's why there are assumptions and inaccuracies in them. To make this a scalable system instead of one-off pages, I need access to the canonical graph, a few decisions, and the deeper journey data. None of this is blocking me from continuing the prototype work — it's what turns the prototype into the system.

---

## A. Access — unblocks me immediately

1. **Product HQ + GTM HQ (full).** The live databases: Domains, Modules, Features, Product Requirements, External Standards, Personas (buyer *and* product), Journey Steps, Value-Stream Steps, Pain Points, Trigger Events. You offered this on the call — this is the single biggest unblock.
2. **ADR + Experiments databases.** So I can register the front-end/website architecture as an ADR and tie it to Experiment 29, the way you do for core platform work.
3. **Design system source.** The Sarah design system Notion page + current core-platform references, so the website tokens reconcile with the in-app UI instead of drifting.
4. **Actual product screens / Figma.** Right now the screens on the pages are assumptions built from one storyboard. Real screens (or the Figma) stop me from inventing UI.
5. **The Proverum coordination-tax deck.** As input for the narrative and so the deck output matches.

---

## B. Canonical inputs, by architecture layer

**Layer 1 — Canonical knowledge graph.** Confirm the entity list is complete and that every entity is *numbered and linked* (no orphan pick-lists). Specifically I need:
- The **Industries** database with each industry's external-standards mapping and proof maturity (the list you referenced — "Phase 1 / Advocacy" etc.). I want to source those claims, not type them.
- The **feature ↔ module** relationship, and the **variation rules**: you confirmed (1000%) that feature config changes by industry *and* external standard. I need those variation rules explicitly, because the page template binds them.
- **Sub-industry granularity** — e.g. heart valve vs. external robotic device (Harmonic Bionics) vs. pharma. How far down does the graph go today?

**Layer 2 — CMS projection.** A decision (see C) on which entity-relationship subset the website actually needs. I'll derive the projection from the graph; you don't maintain a second copy.

**Layer 3 — Retrieval (RAG).** A rough **end-state page-count target**. You said this may not be a now-problem — agreed — but I can't size the retrieval architecture without knowing whether we're aiming at hundreds or 10,000+ pages.

**Layer 4 — Generation pipeline.** The canonical **Journey Steps + Value-Stream Steps** for the first target workflows (the 71-step audit example is the ideal seed). This is the data that lets a page show the "value between the steps" depth you said we still need to reach. Plus your canonical phrasing conventions for journey steps so copy uses the right language.

**Layer 5 — Render system.** The shared **design tokens**, and the output of the **quality team's UI audit / gap analysis** so the website and product converge rather than diverge.

**Layer 6 — CI/CD publish.** Your sign-off on the monorepo PR / CI hygiene conventions (you mentioned reviewing these), so generated pages flow through gates you trust.

**Layer 7 — Outputs.** The deck template requirements (Proverum), so the same fragments render to a PPT that matches house style.

---

## C. Decisions I need from you

1. **Page-template scope.** Confirm we're building a scalable *system* of journey/explainer pages off one template — and which `Industry × Domain × Module × Feature` tuples to seed first.
2. **Narrative spine: top-down vs. bottom-up.** You flagged that top-down has never landed and bottom-up "everyone gets very quickly." Decide this before we generate at scale, because it changes the template.
3. **CMS host.** Notion-as-CMS now, RAG layer added when page count outgrows agent context — confirm that's the plan.
4. **End-state scale target** (feeds the RAG sizing in B/Layer 3).
5. **Sub-industry depth for v1** — industry only, or industry × device-type × standard?

---

## D. What I'll deliver back (so you can hold me to it)

- A **Notion schema spec** — exactly how to structure information per layer for the CMS projection.
- The **front-end ADR + experiment entry**, in your format, dropping into the experiments system.
- A **solution architecture for the RAG** once the end state is confirmed.
- The **template grammar + primitive/fragment library** (the 26 fragments / primitives, formalized).
- A **drift-detection scheduled task** (Cowork) that diffs the CMS projection against the canonical graph.

## Already done this week (quick wins from the audit)

- Corrected the domains claim to the canonical count (the page said "sixteen"; the Domains DB has **14**) and fixed "Supplier" → "Supplier Management."
- Reframed the weak NCR example ("welding machine not working") to a real product nonconformance, and brought every NCR screen onto one consistent record.
- Updated the regulatory framing to the current **QMSR / ISO 13485 §8.3** (post-Feb-2026), replacing the retired "Quality System Regulation" and 820.90 references.
- **Outstanding hygiene item:** an em-dash sweep across the pages and fragments — your explicit ask, not yet done.
