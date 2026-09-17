/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "advocatevishnu.com",
          },
        ],
        destination: "https://www.advocatevishnu.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
