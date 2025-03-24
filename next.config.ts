import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  output: "standalone", // Quan trọng để chạy trên Render
  images: {
    unoptimized: true, // Fix lỗi ảnh khi deploy
  },
};

export default nextConfig;
