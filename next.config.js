/** @type {import('next').NextConfig} */
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://biolinkfb.vercel.app';

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**'
      }
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },

          // ========================== CSP FIX DI SINI ==========================
          {
            key: 'Content-Security-Policy',
            value:
              [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://s10.histats.com",
                "img-src 'self' data: https: https://sstatic1.histats.com",
                "connect-src 'self' https://s10.histats.com",
                "frame-ancestors 'none'",
                "base-uri 'self'",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                "font-src 'self' https://fonts.gstatic.com data:"
              ].join('; ')
          }
          // ======================================================================
        ]
      }
    ];
  }
};
