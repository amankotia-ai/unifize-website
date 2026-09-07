/* ============================================================================
 * CONTAINER LAB - ten container treatments for the product visual engine,
 * built for task E1 from the 2 Sep 2026 sync with Raj: the blue plate with
 * lines behind every product mock is "jarring", "like those old Windows PC
 * backgrounds", has no layering, and clashes with the rounded, layered
 * language of the rest of the site. Abhishek proposed a more graphical
 * container in the style newer AI companies use; Raj: "those might look
 * nice, classier."
 *
 * Second cut (same day): Abhishek kept only the ambient-bloom direction and
 * asked for one container per variant with the visual directly inside it,
 * each built with a different web technique (WebGL, SVG filters, @property,
 * canvas, pointer tracking, 3D, backdrop-filter, scroll-driven animation).
 * The page mounts the SAME live ArcadeStepScene inside each so the pick can
 * be made in place. The winner becomes the shared container primitive
 * applied to every ArcadeStepScene and HeroArcade instance (arcade.css,
 * hero-arcade.css, platform-kit.css).
 *
 * Review at /explorations/containers. Scene toggle at the top.
 * ========================================================================== */
import type { Metadata } from "next";
import { DmsHeader } from "../products/dms/dms-header";
import { SiteFooter } from "../_shared/site-footer";
import { ContainerLab } from "./container-lab";
import "../products/dms/dms.css";
import "../products/_shared/product-kit.css";
import "../platform/platform-kit.css";
import "../products/dms/dms-redesign.css";
import "../home/home-kit.css";
import "./containers.css";

export const metadata: Metadata = {
  title: "Container lab · Product visual engine",
  description: "Ten container treatments for the Unifize product visual engine, side by side on the live mock.",
  robots: { index: false, follow: false },
};

export default function ContainersPage() {
  return (
    <main className="dms dms--redesign dms--consistent-eyebrows dms--home dms--cx">
      <DmsHeader />
      <ContainerLab />
      <SiteFooter />
    </main>
  );
}
