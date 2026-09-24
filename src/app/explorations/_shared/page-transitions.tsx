"use client";

/* ----------------------------------------------------------------------------
 * page-transitions.tsx - the route change (24 Sep 2026). Mounted once in
 * explorations/layout.tsx, so it survives navigation.
 *
 * Every same-origin page link (the header's plain anchors and the in-page
 * Next <Link>s alike) is taken over by a capture-phase click handler that
 * wraps router.push in document.startViewTransition: one client navigation,
 * one way of leaving, and the header stays put across it. A document load
 * that still happens (before hydration, a typed URL) gets the same dissolve
 * from the `@view-transition` rule in page-transition.css.
 *
 * Either way the click lights the nav line at once (html.pm-leaving): a blue
 * hairline drawing across the top edge while the next page loads, so the
 * click is answered inside a frame even when the server is slow. The old
 * page then dissolves (page-transition.css) and the new one plays its own
 * page-in timeline (page-motion.css). A rail-to-rail sweep was tried on
 * 24 Sep 2026 and rejected in favour of this dissolve.
 *
 * Skipped: modified clicks, new tabs, downloads, other origins, same-page
 * hash links, browsers without view transitions, and reduced motion.
 * -------------------------------------------------------------------------- */

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => {
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  };
};

const LEAVING = "pm-leaving";

export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  /* resolves the transition's update callback once the new route commits */
  const settle = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    settle.current?.();
    settle.current = null;
  }, [pathname]);

  /* a route outside this segment unmounts the handler instead */
  useLayoutEffect(() => () => settle.current?.(), []);

  useEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      /* same document (a hash link, or the page itself): not a page change */
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      /* files (a PDF, an image) are not pages */
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return;
      if (reduce?.matches) return;

      html.classList.add(LEAVING);
      const doc = document as ViewTransitionDocument;
      if (!doc.startViewTransition) return;

      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      const transition = doc.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            settle.current = resolve;
            router.push(href);
            /* never hold the page frozen if the route is slow to commit */
            window.setTimeout(resolve, 2500);
          }),
      );
      /* a transition that cannot run its frames (a hidden or throttled tab)
       * must not leave the page frozen under the old snapshot */
      let guard = 0;
      transition.ready
        .then(() => { guard = window.setTimeout(() => transition.skipTransition(), 2500); })
        .catch(() => {});
      transition.finished.finally(() => {
        window.clearTimeout(guard);
        html.classList.remove(LEAVING);
      });
    };

    /* back/forward from the bfcache must not come back mid-leave */
    const onShow = () => html.classList.remove(LEAVING);

    document.addEventListener("click", onClick, true);
    window.addEventListener("pageshow", onShow);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pageshow", onShow);
    };
  }, [router]);

  return <div className="pm-navline" aria-hidden="true" />;
}
