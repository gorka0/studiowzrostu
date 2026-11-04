import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "@base-ui/react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/realizacje",
        destination: "/projekty",
        permanent: true,
      },
      {
        source: "/realizacje/:slug*",
        destination: "/projekty",
        permanent: true,
      },
      {
        source: "/blog/dlaczego-szybkosc-strony-decyduje-o-sprzedazy",
        destination: "/blog/jak-zdobyc-wiecej-klientow-ze-strony-internetowej",
        permanent: true,
      },
      {
        source: "/blog/ile-kosztuje-nowoczesna-strona-www",
        destination: "/blog/strona-internetowa-a-rozwoj-biznesu",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/concepts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
