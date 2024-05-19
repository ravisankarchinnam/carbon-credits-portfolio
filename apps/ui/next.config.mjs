/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return process.env.NODE_ENV !== 'production'
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_APP_API_URL}/api/:path*`, // Proxy to Backend
          },
        ]
      : [];
  },
};

export default nextConfig;
