/* ============================================================================
 * md-hero-trace.tsx - the Medical Devices hero visual's data (23 Sep 2026).
 * The component is the shared _shared/industry-hero-trace.tsx.
 *
 * The key element is the page's own story, CC-2148 (the sterilization SOP
 * change the decision trail walks): one change record whose impact
 * assessment binds every record the change touches, then takes the Part 11
 * signature and releases Rev D. Notion IND-28's secondary fear is exactly
 * this ("a design change that was not propagated to all affected records").
 * The chips are IND-28 use cases: the regulatory frame, the training
 * cascade (Domain 7), MDR reportability (Domain 9), the sealed DHF trace.
 * Record numbers are the page's illustrative arcade world, never claims.
 * ========================================================================== */
import { IndustryHeroTrace, type HeroTraceData } from "../_shared/industry-hero-trace";

const MD_HERO_TRACE: HeroTraceData = {
  kind: "change",
  id: "CC-2148 · Change control",
  title: "Sterilization SOP change",
  from: "Raised from SOP-118 · Class II · 21 CFR 820.70",
  stages: { assess: "Impact assessment", review: "Cross-functional review", signing: "Signing", released: "Released · Rev D" },
  rows: [
    { rec: "Device master record", ref: "SPEC-204 sterilization spec", fn: "Mfg eng", done: "Updated" },
    { rec: "Risk file · ISO 14971", ref: "H-07 bioburden hazard", fn: "Quality", done: "Re-assessed" },
    { rec: "Process validation", ref: "PQ-31 EO cycle", fn: "Validation", done: "Linked" },
    { rec: "Contract sterilizer", ref: "Quality agreement QA-12", fn: "Supply", done: "Notified" },
    { rec: "Labeling · IFU", ref: "Sterility statement, 14 markets", fn: "Reg affairs", done: "Checked" },
    { rec: "Training", ref: "12 operators on SOP-118", fn: "Training", done: "Assigned" },
  ],
  sign: { idle: "Sign · Part 11", done: "Signed · Part 11" },
  approvers: { initials: ["LM", "RK", "JS"], label: "3 approvers" },
  frame: { cap: "Checked against", items: ["21 CFR 820", "ISO 13485", "ISO 14971", "EU MDR"] },
  cascadeRow: 5,
  cascade: {
    cap: "Training cascade",
    big: { off: "0", on: "12" },
    off: "operators assigned",
    on: "operators assigned",
    note: "Effective when SOP-118 Rev D releases",
  },
  clock: { cap: "MDR reportability · CMP-311", line: "Day 6 of 30 · decision on the record", day: 6, span: 30 },
  seal: { cap: "Design history file", off: "Trace building", on: "Trace sealed" },
  aria:
    "A sterilization SOP change in Unifize: the impact assessment links every affected record across manufacturing, quality, validation, supply, regulatory and training, then the change is signed under 21 CFR Part 11 and released with its trace sealed.",
};

export function MdHeroTrace() {
  return <IndustryHeroTrace data={MD_HERO_TRACE} />;
}
