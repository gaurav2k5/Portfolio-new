/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevent double-invoking canvas hooks in dev mode
  transpilePackages: ['three'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
