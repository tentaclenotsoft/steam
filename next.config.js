/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects () {
    return [
      {
        source: '/tentaclesoft',
        destination: 'https://github.com/tentaclenotsoft',
        permanent: true
      }
    ]
  }
}
