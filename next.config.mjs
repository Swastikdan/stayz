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
      fullUrl: true
    }
  }
};
export default nextConfig;
