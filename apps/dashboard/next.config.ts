import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },

  images: {
    dangerouslyAllowLocalIP: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.devshelf.ir",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
