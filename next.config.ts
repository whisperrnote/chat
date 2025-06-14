import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
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

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || "",
  loginUrl: "/auth/login", // custom login page
  loginSuccessUrl: "/app", // redirect to app/dashboard after login
  logoutUrl: "/", // redirect to landing page after logout
  // callbackUrl: "/api/auth/callback", // use default unless you need to customize
  // You can add include/exclude/basePath here if needed in the future
});

export default withCivicAuth(nextConfig);
