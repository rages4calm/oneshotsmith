/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@oneshotsmith/ui", "@oneshotsmith/core", "@oneshotsmith/db", "@oneshotsmith/adapters"],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig;
