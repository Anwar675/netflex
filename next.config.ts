import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  output: "standalone", // ✅ Giữ lại để chạy trên Render
  images: {
    domains: ["example.com"],
  },
};

export default nextConfig;
