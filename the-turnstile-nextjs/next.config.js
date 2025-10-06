/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },      // keep for now
  typescript: { ignoreBuildErrors: true }    // keep for now
};
 
