---
id: engineering-manager-npd
name: "Engineering Manager owning design changes and NPD"
segment: "MedTech / discrete manufacturing (product development)"
status: draft
weight: 1.0
derivedFrom:
  sources:
    - "notion:Personas DB PPS-8 Engineering Manager (Description: approves design and change decisions; lives in PLM and the QMS change module; chairs design reviews; caseload 30–100 open change orders, 5–20 active projects; joint sign-offs with Quality Manager and Production Supervisor; Tier=Primary)"
    - "notion:Domains DB #2 Product Development (design controls, DHF assembly, decision traces lost in email threads and design review meetings)"
firmographics:
  role: "Engineering Manager / Director of Engineering / R&D Manager"
  reportsTo: "VP Engineering / GM"
  companySize: "150–800"
  industry: "Medical devices / discrete manufacturing"
  stack: ["PLM", "CAD", "the QMS change module", "Jira or similar for engineering work"]
jobsToBeDone:
  - "Move 30–100 open ECOs without losing the decision trail"
  - "Chair design reviews whose outcomes survive into the DHF"
  - "Balance cost, quality, and schedule on every change"
pains:
  - "Design review outcomes evaporate; DHF gets reconstructed under deadline"
  - "Joint sign-offs with quality and production stall in sequence nobody can see"
objections:
  - "Quality tools treat engineering as an approval checkbox, not a workflow"
  - "We already have PLM; what does this add that PLM does not do?"
buyingTriggers:
  - "A launch slipped on change-control churn; an audit hit the design history"
decisionCriteria:
  - "Speaks engineering: ECOs, design reviews, effectivity, suppliers on old revisions"
  - "Coexists with PLM rather than pretending to replace it"
infoDiet: ["engineering leadership peers", "PLM vendor ecosystem", "evaluates tools by workflow walkthroughs"]
vocabulary:
  resonates: ["ECO", "design review", "DHF", "revision", "effectivity", "sign-off"]
  repels: ["quality-department framing that ignores engineering", "marketing that never mentions the change process"]
sophistication: "Pragmatic; burned by tools bought for another function and imposed on engineering. Looks for whether engineering is a first-class citizen"
willingnessToPay: "Gatekeeper for anything touching the change process; can veto"
calibration:
  predictions: 0
  hits: 0
---

## How they evaluate

Arrives via the quality team ("we are looking at this, does engineering object?"). Scans for their world: changes, design reviews, DHF. If the page is all CAPAs and SOPs, they conclude "quality tool, not mine" and disengage.

## Synthetic phrasing reference

(synthetic) "Where do my ECOs live in this?" · "PLM already holds the BOM; what holds the argument about it?" · "If engineering is an afterthought, we will be the ones paying for it."
