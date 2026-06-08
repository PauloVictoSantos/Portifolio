import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "api.microlink.io",
      "images.domains", 
      "images.remotePatterns"
    ],
  },
};

export default nextConfig;
