/* ============================================================================
 * DMS · STYLIZED - promoted to the primary DMS page (../page) in Sep 2026.
 * This route stays as a redirect so existing links keep resolving. The
 * stylized building blocks (stylized-mocks, stylized-ctax, stylized.css)
 * remain in this directory and are imported by the primary page and by the
 * other product pages that share the ctax treatment.
 * ========================================================================== */
import { redirect } from "next/navigation";

export default function DmsStylizedRedirect() {
  redirect("/explorations/products/dms");
}
