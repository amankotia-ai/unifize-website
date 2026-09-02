/* ============================================================================
 * video-transcripts.ts - typed accessor over the transcript mirror at
 * src/content/webflow/video-transcripts.json: full timestamped transcripts
 * for the 50 videos in customer-videos.ts, extracted 2026-09-01 from the
 * live unifize.com content pages (the Webflow Content collection renders
 * each transcript as [MM:SS - MM:SS] paragraphs in div.transcript). The
 * Notion DB only flags "Transcript Available"; the text itself lives here.
 * ========================================================================== */

import data from "@/content/webflow/video-transcripts.json";

export type TranscriptCue = { t: string; text: string };

const TRANSCRIPTS = data.transcripts as Record<string, TranscriptCue[]>;

export const getTranscript = (slug: string): TranscriptCue[] => TRANSCRIPTS[slug] ?? [];
