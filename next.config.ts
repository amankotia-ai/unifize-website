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
  async headers() {
    return [
      {
        source: "/explorations/platform/:file(hero-film-.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
