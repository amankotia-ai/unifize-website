/* ------------------------------------------------------------
 * Shared types for /industries, /domains, /buyers detail pages.
 * Data is hand-authored in buyer voice (no internal taxonomy)
 * and synced from Notion editorially.
 * ------------------------------------------------------------ */

import type { DriftStation } from "@/components/organisms/ingress-drift";

/** A clickable reference to another page in the platform graph. */
export interface CrossLink {
  /** Path-safe slug, e.g. "medical-devices". */
  slug: string;
  /** Display title for the link card. */
  title: string;
  /** Optional one-line context shown under the title. */
  blurb?: string;
}

export type IngressType = "industries" | "domains" | "buyers";

/** The failure event a buyer most wants to avoid, elevated into a band. */
export interface IndustryFearAnchor {
  eyebrow: string;
  headline: string;
  /** The primary regulatory fear. */
  primary: string;
  /** The secondary fear (e.g. the failure that ships as a recall). */
  secondary: string;
}

/** One regulated motion on the coordination surface. */
export interface IndustryMotion {
  title: string;
  body: string;
  /** "established" = strong proof today; "emerging" = newer entry surface. */
  status: "established" | "emerging";
}

/** The breadth of coordination domains an industry runs across. */
export interface IndustryCoordinationSurface {
  eyebrow: string;
  headline: string;
  lede: string;
  /** Domains in play, e.g. 9 of 12 — drives the dot-matrix headline. */
  covered: number;
  total: number;
  motions: IndustryMotion[];
}

/** Where the system of record stops and Unifize begins. */
export interface IndustryContrast {
  eyebrow: string;
  headline: string;
  /** Systems Unifize sits alongside, named. */
  systems: string[];
  qms: { label: string; body: string };
  unifize: { label: string; body: string };
}

/** The evidence standard buyers in this segment hold. */
export interface IndustryProof {
  eyebrow: string;
  headline: string;
  lede: string;
  points: { label: string; body: string }[];
}

export interface IndustryPageData {
  slug: string;
  title: string;
  /** Industry vertical label shown as a chip in the hero. */
  vertical: string;
  /** One-sentence hero promise in buyer voice. */
  promise: string;
  /** The failure event the buyer most wants to avoid. POV rewrite. */
  failureEvent: string;
  /** Regulatory standards & terminology shown as chips. */
  standards: string[];
  /** 2–3 paragraphs of buyer-reality narrative. */
  weekNarrative: string[];
  /** Sticky-rail stations — domains where this industry's coordination tax lands. */
  driftStations: DriftStation[];
  /** Primary entry personas for this industry (compact link list). */
  personas: CrossLink[];
  /** Where buyers in this industry are found (optional). */
  channels?: string[];

  /* ---- Richer, optional content (synced editorially from Notion) ---- */
  /** Hero regulatory-frame pills (device class + core standards). */
  frame?: string[];
  /** The failure event, elevated into a stakes band. */
  fearAnchor?: IndustryFearAnchor;
  /** The breadth of coordination domains in play. */
  coordinationSurface?: IndustryCoordinationSurface;
  /** Regulatory vocabulary — the terms we speak, shown as dense chips. */
  vocabulary?: string[];
  /** Where the QMS records the outcome and Unifize records the trace. */
  qmsContrast?: IndustryContrast;
  /** The evidence standard this segment requires. */
  proof?: IndustryProof;
}

export interface DomainPageData {
  slug: string;
  title: string;
  /** Tier in the Unifize coverage map. */
  tier: "Primary" | "Secondary";
  /** Display label for typical owner shown in hero. */
  owner: string;
  /** One-sentence hero promise. */
  promise: string;
  /** The moment-it-bites narrative — when the buyer recognises this. */
  moment: string;
  /** 1–2 paragraphs of what this domain does, POV. */
  workNarrative: string[];
  /** Concrete capability blocks (what changes with Unifize). */
  capabilities: { title: string; body: string }[];
  /** Sticky-rail stations — industries where this domain accumulates heaviest. */
  driftStations: DriftStation[];
  /** Personas who typically own or enter through this domain. */
  personas: CrossLink[];
  /** Buyer-facing pain points (short). */
  painPoints: string[];
}

export interface BuyerPageData {
  slug: string;
  title: string;
  /** Comma-separated typical titles. */
  typicalTitles: string;
  /** One-sentence hero promise. */
  promise: string;
  /** "Your week" POV paragraphs. */
  weekNarrative: string[];
  /** "Sound familiar?" recognitions — buyer-voice symptoms. */
  recognitions: string[];
  /** Sticky-rail stations — domains this persona enters Unifize through. */
  driftStations: DriftStation[];
  /** Industries where this persona operates (compact link list). */
  industries: CrossLink[];
  /** 3–4 outcome statements in buyer language. */
  outcomes: string[];
}
