import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't try to use a parent lockfile.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
