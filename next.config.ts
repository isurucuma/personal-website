import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure static file serving
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_APP_URL ?? "your-domain.com",
        pathname: "/uploads/**",
      },
    ],
  },
  // Serve static files from /public/uploads
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/public/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
