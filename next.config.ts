import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Allow data URLs (base64) for locally uploaded vehicle images
    dangerouslyAllowSVG: true,
  },
  output: 'standalone',
};

export default nextConfig;
