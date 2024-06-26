/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_APP_API_URL}/:path*`, // Proxy to Backend
          },
        ];
  },
};

export default nextConfig;
