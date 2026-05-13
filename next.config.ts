import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 88, 90],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
