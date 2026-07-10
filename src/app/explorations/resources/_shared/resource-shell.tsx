/* ============================================================================
 * resource-shell.tsx - the outer chrome shared by every Resources page: the
 * `.dms` root (so the entire DMS stylesheet applies), the scroll-reveal motion
 * layer and the site header. Loads the DMS stylesheet + the resources kit. Each
 * page composes its sections between <ResourceShell> and the closing furniture.
 * ========================================================================== */
import { DmsHeader } from "../../products/dms/dms-header";
import { DmsMotion } from "../../products/dms/dms-motion";
import "../../products/dms/dms.css";
import "./resources-kit.css";

export function ResourceShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="dms">
      <DmsMotion />
      <DmsHeader />
      {children}
    </main>
  );
}
