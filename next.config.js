/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects () {
    return [
      {
        source: '/tentaclesoft',
        destination: 'https://tentaclesoft.com',
        permanent: true
      }
    ]
  }
}
