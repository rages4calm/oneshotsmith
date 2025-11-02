/** @type {import('next').NextConfig} */
const BASE_PATH = '/oneshot';

const nextConfig = {
  output: 'export', // Static HTML export for cPanel
  basePath: BASE_PATH, // IMPORTANT: App is in subdirectory
  assetPrefix: BASE_PATH, // Ensure assets load from the subdirectory
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@oneshotsmith/ui", "@oneshotsmith/core", "@oneshotsmith/db", "@oneshotsmith/adapters"],
  images: {
    unoptimized: true, // cPanel doesn't support Next.js image optimization
  },
  // Note: Server Actions are not available in static export mode
  // All data generation happens at build time
};

module.exports = nextConfig;

