/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self' https://s10.histats.com https://sstatic1.histats.com; " +
              "script-src 'self' 'unsafe-inline' https://s10.histats.com; " +
              "img-src 'self' https://sstatic1.histats.com data:; " +
              "connect-src 'self' https://s10.histats.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "font-src 'self' https://fonts.gstatic.com;"
          }
        ]
      }
    ]
  }
};
