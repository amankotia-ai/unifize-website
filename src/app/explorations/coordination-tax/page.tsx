/* ============================================================================
 * THE COORDINATION TAX - a standalone, Apple-grade explainer in three parts.
 * A standalone motion language using the shared Unifize type and color tokens.
 * Three chapters: name it (scroll-driven detour scene), measure it (interactive
 * path arithmetic), remove it (drag the work onto one record). Copy is grounded
 * in the DMS coordination-tax research.
 * ========================================================================== */
import type { Metadata } from "next";
import { CtaxStory } from "./ctax-story";
import "./ctax.css";

export const metadata: Metadata = {
  title: "The Coordination Tax · An explainer in three parts",
  description:
    "The hours your best people spend moving work between people and systems. What it is, how it compounds, and how Unifize removes it.",
};

export default function CoordinationTaxPage() {
  return (
    <main className="ctax">
      <CtaxStory />
    </main>
  );
}
