import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimize images for frame animation
    formats: ['image/webp', 'image/avif'],
    // Cache images aggressively in production
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    // Disable static imports for frame directory
    disableStaticImages: false,
  },
  // Compress static files
  compress: true,
  // Enable SWR (Stale-While-Revalidate) for better caching
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  headers: async () => {
    return [
      {
        source: '/frames/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year cache
          },
          {
            key: 'Content-Type',
            value: 'image/png',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
