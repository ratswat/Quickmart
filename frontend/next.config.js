/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'quickmart.com', 'api.quickmart.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
