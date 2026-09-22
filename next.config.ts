import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atdpcgnzpqsxypahkvds.supabase.co",
        pathname: "/storage/v1/object/public/article-images/**",
      },
    ],
  },
};

export default nextConfig;
