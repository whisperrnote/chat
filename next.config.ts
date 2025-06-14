import { createCivicAuthPlugin } from "@civic/auth/nextjs";
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

// Only initialize Civic Auth if client ID is provided
const withCivicAuth = process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID
  ? createCivicAuthPlugin({
      clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID
    })
  : (config: NextConfig) => config;

export default withCivicAuth(nextConfig);
