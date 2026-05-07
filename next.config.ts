import type { NextConfig } from "next";

const ALLOWED_ORIGINS = [
  "https://tikitaxicr.com",
  "https://www.tikitaxicr.com",
  "https://tikitaxicr.vercel.app",
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
].filter(Boolean);

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.cal.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://dzmchqwpawbwlettazev.supabase.co https://api.resend.com https://api.cal.com https://tikitaxicr.vercel.app",
      "media-src 'self' https://res.cloudinary.com",
      "frame-src https://cal.com https://app.cal.com",
      "worker-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [];
  },
  experimental: {
    serverActions: {
      allowedOrigins: ALLOWED_ORIGINS as string[],
    },
  },
};

export default nextConfig;