/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
