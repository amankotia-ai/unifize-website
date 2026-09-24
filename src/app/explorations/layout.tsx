/* The explorations segment's persistent shell: it outlives every navigation
 * between the nav pages (template.tsx remounts, this does not), so the route
 * change handler lives here. See _shared/page-transitions.tsx. */
import type { ReactNode } from "react";
import { PageTransitions } from "./_shared/page-transitions";
import "./page-transition.css";

export default function ExplorationsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransitions />
      {children}
    </>
  );
}
