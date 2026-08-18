import type { NextConfig } from "next";

const wordpressHostname = (() => {
  try {
    return new URL(
      process.env.WORDPRESS_BASE_URL ?? "http://localhost:8080",
    ).hostname;
  } catch {
    return "localhost";
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: wordpressHostname,
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: wordpressHostname,
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
