import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Restaurant",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
