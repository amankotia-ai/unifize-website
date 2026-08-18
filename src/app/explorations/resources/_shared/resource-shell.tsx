/* ============================================================================
 * resource-shell.tsx - the outer chrome shared by every Resources page: the
 * `.dms dms--redesign` root (the same layered system the product pages run on)
 * and the site header. Loads the DMS stylesheet, the redesign layer, then the
 * resources kit. Each page composes its sections between <ResourceShell> and
 * the closing furniture.
 * ========================================================================== */
import { DmsHeader } from "../../products/dms/dms-header";
import "../../products/dms/dms.css";
import "../../products/dms/dms-redesign.css";
import "./resources-kit.css";

export function ResourceShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="dms dms--redesign rs">
      <DmsHeader />
      {children}
    </main>
  );
}
