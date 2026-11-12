import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Evita caché molesto mientras desarrollas
});

const nextConfig: NextConfig = {
  reactCompiler: true,

  turbopack: {
    root: process.cwd(),
  },

  allowedDevOrigins: ["192.168.56.1", "localhost:3000"],
};

export default withPWA(nextConfig);