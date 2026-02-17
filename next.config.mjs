/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/AIXD-Project2',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
