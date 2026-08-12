import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  turbopack: {
    root: process.cwd(),
  },

  allowedDevOrigins: ["192.168.56.1", "localhost:3000"],
};

export default nextConfig;