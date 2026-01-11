/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure images from external domains are allowed if you decide to add them later
  images: {
    domains: [],
  },
};

module.exports = nextConfig;