import type { NextConfig } from "next";
import withPWA from "next-pwa";

// ✅ Create the base config
const baseConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],

    // 🔥 Fix warning: "Webpack is configured while Turbopack is not"
    turbo: {
      rules: {},
    },
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "api.dicebear.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL || "https://kurunzinews.co.ke",
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "img-src * blob: data:;",
              "media-src *;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io *.vercel-insights.com *.googletagmanager.com;",
              "style-src 'self' 'unsafe-inline';",
              "font-src 'self' data:;",
            ].join(" "),
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Permissions-Policy", value: "camera=(), microphone=()" },
        ],
      },
    ];
  },
};

// ✅ Add PWA support (only in production)
const withPWASupport = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

export default withPWASupport(baseConfig);
