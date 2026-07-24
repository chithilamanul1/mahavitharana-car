import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
    // Allow data URLs (base64) for locally uploaded vehicle images
    dangerouslyAllowSVG: true,
  },
  output: 'standalone',
};

export default nextConfig;
