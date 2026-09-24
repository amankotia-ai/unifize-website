/* ============================================================================
 * industry-journey.ts - builds an industry page's 01 journey (24 Sep 2026).
 *
 * Section 01 on every industry page runs the Medical Devices page's arcade:
 * ONE persistent record, the decision trail driving a camera over it. Each
 * industry's data file carries its own world (the record, its checklist,
 * its inbox) and one pose per trail row. The pose is chosen by what that
 * step actually is on the record (an entry, a bound impact, an AI answer,
 * a review, a task run, a signature, the sealed history), from the poses
 * the engine already has; nothing here draws new UI.
 *
 * People (user, 24 Sep 2026): the trail beside the product names the
 * DEPARTMENT (`cast`); inside the arcade UI (owner, thread, signers, sign
 * dialog, task owners) people have names. Never a job title like
 * "Qualified Person" in either. The record ids are the kit's own
 * (`difference.mobileId`).
 * ========================================================================== */
import type { ArcadeFlowWorld, ArcadeStepConfig } from "../../products/_shared/arcade/arcade";

type Base = { type: string; id: string; title: string; world: ArcadeFlowWorld };
type Pose = Omit<ArcadeStepConfig, "source" | "type" | "id" | "title" | "world" | "checklist" | "checklistItems"> &
  Partial<Pick<ArcadeStepConfig, "world" | "checklist" | "checklistItems">>;

/** onRecord(base)(zoom, pose): one journey step on the base record */
export const onRecord =
  (base: Base) =>
  (zoom: number, pose: Pose): { zoom: number; config: ArcadeStepConfig } => ({
    zoom,
    config: {
      source: `${base.id} · ${pose.ghost}`,
      checklist: pose.checklistOpen ?? "",
      checklistItems: [],
      ...base,
      ...pose,
    },
  });

/** cast(who, steps): who acts on each step (a department, or "Unifize"
 *  for the system's own steps). It overrides the kit trail's labels so the
 *  trail names a department; the record keeps its people's names. */
export const cast = <T extends { zoom: number; config: ArcadeStepConfig }>(who: string[], steps: T[]) =>
  steps.map((s, i) => ({ ...s, who: who[i] }));
