import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't try to use a parent lockfile.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  // the platform hero film and its poster carry a version in their names
  // (src/app/explorations/platform/hero-film-assets.ts), so they can be
  // cached for a year: the homepage prefetches the film and the platform
  // page then plays it straight from cache
  // the nav pages live under src/app/explorations but are served at clean
  // URLs. beforeFiles so they win over the older root routes of the same
  // name (/platform, /home, /industries/[slug]). The solution pages keep
  // their files in explorations/domains but are served at /solution/<slug>.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/home", destination: "/explorations/home" },
        { source: "/platform", destination: "/explorations/platform" },
        { source: "/industries/medical-devices", destination: "/explorations/industry-template-modern" },
        { source: "/products/:path*", destination: "/explorations/products/:path*" },
        { source: "/solution/:path*", destination: "/explorations/domains/:path*" },
        { source: "/industries/:path*", destination: "/explorations/industries/:path*" },
        { source: "/resources/:path*", destination: "/explorations/resources/:path*" },
        // role pages: linked from the product pages' "Who it is for", not the nav
        { source: "/personas/:path*", destination: "/explorations/personas/:path*" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  // old /explorations links keep working. Exact matches for home and
  // platform so the public hero-film assets under /explorations/platform/
  // are not redirected. The solution pages were served at /domains/<slug>
  // until 2026-09-25, so those links move to /solution/<slug> too.
  async redirects() {
    return [
      { source: "/explorations/home", destination: "/home", permanent: true },
      { source: "/explorations/platform", destination: "/platform", permanent: true },
      { source: "/explorations/industry-template-modern", destination: "/industries/medical-devices", permanent: true },
      { source: "/explorations/products/:path*", destination: "/products/:path*", permanent: true },
      { source: "/explorations/domains/:path*", destination: "/solution/:path*", permanent: true },
      { source: "/domains/:path*", destination: "/solution/:path*", permanent: true },
      { source: "/explorations/industries/:path*", destination: "/industries/:path*", permanent: true },
      { source: "/explorations/resources/:path*", destination: "/resources/:path*", permanent: true },
      { source: "/explorations/personas/:path*", destination: "/personas/:path*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/explorations/platform/:file(hero-film-.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        /* the homepage hero films, versioned the same way
         * (src/app/explorations/home/hero-film-assets.ts) */
        source: "/explorations/home/:file(hero-film-.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        /* the platform tax cell film, versioned the same way
         * (src/app/explorations/platform/tax-cell-film.tsx) */
        source: "/explorations/platform/:file(tax-film-.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
