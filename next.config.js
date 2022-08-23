/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr'
  },
  images: {
    loader: 'imgix'
  }
};

module.exports = nextConfig;