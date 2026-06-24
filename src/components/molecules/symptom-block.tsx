import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SymptomItem {
  quote: ReactNode;
  who: ReactNode;
  /** 2-digit index (e.g. "01"). Auto-computed from position if omitted. */
  index?: ReactNode;
}

export interface SymptomBlockProps {
  items: SymptomItem[];
  className?: string;
}

/**
 * M.12 — Symptom block. Field-research format, not testimonial.
 * Each item: a numbered index, the captured statement in body
 * weight (curly quotes do the speech work), a dashed hairline,
 * and a mono attribution. The diagnostic "tell" inside the
 * statement should be wrapped in `<span className="tell">` so it
 * picks up the brand-blue highlight.
 */
export function SymptomBlock({ items, className }: SymptomBlockProps) {
  return (
    <div className={cn("symptoms", className)}>
      {items.map((s, i) => {
        const index = s.index ?? String(i + 1).padStart(2, "0");
        return (
          <div className="sym" key={i}>
            <blockquote>&ldquo;{s.quote}&rdquo;</blockquote>
            <div className="who">
              <span className="sym-index">{index}</span>
              <span>{s.who}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
