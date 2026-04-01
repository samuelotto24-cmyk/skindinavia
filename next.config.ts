import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skindinavia.wpenginepowered.com",
      },
      {
        protocol: "https",
        hostname: "skindinavia.com",
      },
    ],
  },
};

export default nextConfig;
