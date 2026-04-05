import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/preview.html",
        destination: "/preview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;