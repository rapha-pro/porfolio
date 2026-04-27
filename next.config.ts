import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.local",
    "10.0.0.*",
    "192.168.*.*",
    "172.16.*.*",
  ],
};

export default nextConfig;
