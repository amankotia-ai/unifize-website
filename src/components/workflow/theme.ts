/* Colour + label maps for the process visual language.
 * Values are CSS custom properties from globals.css so the canvas
 * stays on the design-system tokens (OKLCH brand + status + workflow). */

import type { ModuleKind, Medium, System, CTPrimitive, GoalZero, VSClassification } from "@/lib/platform-data/workflows";

/** Module family → accent colour (left bar, branch edges, decision stroke). */
export const MODULE_VAR: Record<ModuleKind, string> = {
  spec: "var(--u-primary)",
  qevent: "var(--s-warn)",
  improve: "var(--s-err)",
  train: "var(--wf-train)",
};

/** Delivery surface → dot colour. */
export const MEDIUM_VAR: Record<Medium, string> = {
  notification: "var(--s-warn)",
  web: "var(--u-primary)",
  mobile: "var(--s-ok)",
  email: "var(--wf-train)",
  voice: "var(--wf-voice)",
};

export const MEDIUM_LABEL: Record<Medium, string> = {
  notification: "Notification",
  web: "Web",
  mobile: "Mobile",
  email: "Email",
  voice: "Voice",
};

/** Existing system of record → full label (chip hover title). Chips render the
 * key (acronym) itself; there is no colour map — the customer's existing stack
 * reads as neutral ground truth, not a Unifize-coloured layer. */
export const SYSTEM_LABEL: Record<System, string> = {
  eQMS: "Electronic quality management system",
  DMS: "Document management system",
  ERP: "Enterprise resource planning",
  PLM: "Product lifecycle management",
  MES: "Manufacturing execution system",
  LMS: "Learning management system",
  Email: "Email",
  Teams: "Microsoft Teams / chat",
  Calendar: "Calendar",
};

/** CT primitive → badge colour (opt-in overlay layer). */
export const CT_VAR: Record<CTPrimitive, string> = {
  RC: "var(--wf-train)",
  SC: "var(--s-err)",
  DR: "var(--wf-voice)",
  TR: "var(--u-primary)",
  ER: "var(--wf-er)",
  MT: "var(--s-warn)",
};

export const CT_LABEL: Record<CTPrimitive, string> = {
  RC: "Reconciliation",
  SC: "Status-chasing",
  DR: "Decision-rebuilding",
  TR: "Translation",
  ER: "Errors",
  MT: "Meetings",
};

/** Goal Zero validation status → dot colour. */
export const GOALZERO_VAR: Record<GoalZero, string> = {
  Pass: "var(--s-ok)",
  Pending: "var(--s-warn)",
  Fail: "var(--s-err)",
  "Phase 0 only": "var(--u-primary)",
};

/** Value-stream classification → bar segment colour (the work layer). */
export const VSCLASS_VAR: Record<VSClassification, string> = {
  "VA-irreducible": "var(--s-ok)",
  "VA-reducible": "var(--wf-train)",
  NVA: "var(--s-warn)",
  WAIT: "var(--n-300)",
};

export const VSCLASS_LABEL: Record<VSClassification, string> = {
  "VA-irreducible": "Value-add (irreducible)",
  "VA-reducible": "Value-add (reducible)",
  NVA: "Non-value-add",
  WAIT: "Wait",
};
