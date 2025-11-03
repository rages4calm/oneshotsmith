/** @type {import('next').NextConfig} */
// Only use basePath when deploying to cPanel subdirectory
// For dev and CI/CD, run at root
const USE_BASE_PATH = process.env.USE_BASE_PATH === 'true';
const BASE_PATH = USE_BASE_PATH ? '/oneshot' : '';

const nextConfig = {
  output: 'export', // Static HTML export for cPanel
  ...(USE_BASE_PATH && { basePath: BASE_PATH }), // Only apply basePath for cPanel
  ...(USE_BASE_PATH && { assetPrefix: BASE_PATH }), // Only apply assetPrefix for cPanel
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
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

