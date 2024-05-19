/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://localhost:4000/api", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
