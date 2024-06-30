/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/debewnh29/**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/admin',
        destination: '/admin/bookings/',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/dashboard/bookings',
        permanent: true,
      },
      // Wildcard path matching
      // {
      //   source: '/blog/:slug',
      //   destination: '/news/:slug',
      //   permanent: true,
      // },
    ];
  }
};
export default nextConfig;
