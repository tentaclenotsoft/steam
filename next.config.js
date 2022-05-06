/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.akamai.steamstatic.com',
      'avatars.cloudflare.steamstatic.com',
      'steamcdnstoragequincy.blob.core.windows.net'
    ]
  },
  async redirects() {
    return [
      {
        source: '/tentaclesoft',
        destination: 'https://tentaclesoft.com',
        permanent: true
      }
    ]
  }
}
