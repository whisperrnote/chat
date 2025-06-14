import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript build errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
