import type { NextConfig } from "next";

const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  experimental: { globalNotFound: true },
  async headers() {
    return [
      { source: "/studio/:path*", headers: noindex },
      // Setup links carry a one-time token; never leak it in a Referer header.
      { source: "/admin/:path*", headers: [...noindex, { key: "Referrer-Policy", value: "no-referrer" }] },
    ];
  },
};

export default nextConfig;
