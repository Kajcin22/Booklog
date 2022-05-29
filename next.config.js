/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['books.google.com', 'books.google.cz'],
  },
};

module.exports = nextConfig;
