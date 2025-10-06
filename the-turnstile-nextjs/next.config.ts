/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // static export for Firebase Hosting
  images: { unoptimized: true }, // required for next export if you use <Image>
  reactStrictMode: true
};
module.exports = nextConfig;
