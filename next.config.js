const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import("next").NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.firebasestorage.app",
        pathname: "**",
      },
    ],
  },
  // Use webpack instead of Turbopack for next-pwa compatibility
  webpack: (config) => config,
});

module.exports = nextConfig;
