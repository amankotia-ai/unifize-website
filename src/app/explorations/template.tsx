/* Remounted by Next on every navigation under /explorations, which is what
 * makes the page-in animation replay per route change. See
 * page-transition.css for the why. */
import type { ReactNode } from "react";
import "./page-transition.css";

export default function ExplorationsTemplate({ children }: { children: ReactNode }) {
  return <div className="x-page-in">{children}</div>;
}
