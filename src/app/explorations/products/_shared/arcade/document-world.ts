/* ============================================================================
 * document-world.ts - PF-29's document world: the arcade's fallback world so
 * pre-world call sites render unchanged. Lives outside the "use client"
 * boundary of arcade.tsx so server components (the page-level mocks files)
 * can import and extend it as plain data - a value exported from a client
 * module arrives in a server component as a client reference, not an object.
 * The type import below is erased at compile time, so no runtime cycle.
 * ========================================================================== */
import type { ArcadeFlowWorld } from "./arcade";

export const DOCUMENT_WORLD: ArcadeFlowWorld = {
  team: "Engineering Industries",
  recordNoun: "Document",
  owner: "R. Mehta",
  ownerInitials: "RM",
  participants: ["RM", "QA", "+2"],
  participantsLabel: "R. Mehta, Quality Assurance, and two others",
  recordKicker: "STANDARD OPERATING PROCEDURE",
  searchResult: "SOP-118 · Rev D · current result",
  context: {
    initials: "RM",
    name: "R. Mehta",
    time: "09:14",
    message: "Released revision D to point of use.",
    detail: "Quality approved · effective since 02 Jul 2026",
  },
  inboxNeighbors: [
    { title: "Line clearance", time: "11:42", detail: "WI-092 · Packaging", kind: "Document" },
    { title: "Water system review", time: "09:18", detail: "Periodic review due Friday", kind: "Review" },
    { title: "Batch record exception", time: "Yesterday", detail: "Owner response received", kind: "Quality event" },
  ],
  checklistTitle: "Document Control",
  checklistSections: [
    {
      title: "DOCUMENT CLASSIFICATION",
      items: [
        { label: "Effective revision", note: "Revision D · Effective" },
        { label: "Approval signature", kind: "approval", signer: "N. Varga", state: "Signed" },
        { label: "Signed document", note: "Signed and sealed" },
      ],
    },
    {
      title: "SIGNED DOCUMENT",
      items: [
        { label: "Document-118-Cleaning_Validation.pdf", note: "Current render · 4 pages" },
        { label: "Revision", kind: "revision", from: "Rev C · superseded", to: "Rev D · approved" },
        { label: "Effective date", note: "02 Jul 2026" },
      ],
    },
    {
      title: "CONTROLLED COPY",
      items: [
        { label: "Reason for print", kind: "field", value: "Screen unavailable at packaging line 2", note: "Entered at print" },
        { label: "Copy owner", note: "Packaging line 2" },
        { label: "Expiry and recall", note: "07 Aug 2026" },
      ],
    },
  ],
};
