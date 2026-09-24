/* ----------------------------------------------------------------------------
 * split-words.tsx - a headline line split into word spans for the page-in
 * timeline (page-motion.css, 24 Sep 2026). Each word carries its running
 * index as --w, so a second line continues the stagger where the first
 * stopped (pass `from`). The spaces stay real text between the spans, so
 * copy, selection and wrapping behave exactly like the unsplit line.
 *
 * No hooks: renders on the server and inside client components alike.
 * -------------------------------------------------------------------------- */
import { Fragment, type CSSProperties } from "react";

export function Words({ text, from = 0 }: { text: string; from?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="pm-w" style={{ "--w": from + i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
