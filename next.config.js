/** @type {import('next').NextConfig} */
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tes.varcel.app'

module.exports = {
  reactStrictMode: true,
  images: {
    // Allow images used for social preview. Add domains you expect.
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
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' },
          // Basic Content-Security-Policy — adapt if you need inline scripts/styles
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self';"
          }
        ]
      }
    ]
  }
}
