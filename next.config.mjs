/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material", "react-toastify", "swiper", "@reduxjs/toolkit", "axios", "dayjs"],
    scrollRestoration: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
    styledComponents: true,
    emotion: true,
  },

  /**
   * CDN is already handling images
   * Disable Next.js image optimization to save ~300MB RAM
   */
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 1024, 1600],
    imageSizes: [32, 64, 128, 256],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_BACKEND_HOST,
      },
      {
        protocol: "http",
        hostname: "ratnaafin.com",
      },
      {
        protocol: "https",
        hostname: "ratnaafin.com",
      },
      {
        protocol: "http",
        hostname: "www.ratnaafin.com",
      },
      {
        protocol: "https",
        hostname: "www.ratnaafin.com",
      },
    ],
  },

  serverExternalPackages: ["sharp", "canvas"],

  productionBrowserSourceMaps: false,

  trailingSlash: false,

  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    if (process.env.NODE_ENV !== "production") return [];

    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|svg|ico|webp|avif|js|css|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/career",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/business-loan",
        destination: "/business-loan/overview",
        permanent: true,
      },
      {
        source: "/machinery-loan",
        destination: "/machinery-loan/overview",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
