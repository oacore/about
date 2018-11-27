const path = require('path')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

const nextConfig = {
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        use: ['json-loader', 'yaml-loader'],
      },
      {
        test: /\.md$/,
        use: ['raw-loader'],
      }
    )

    return config
  },

  sassLoaderOptions: {
    includePaths: [path.resolve(__dirname, 'node_modules')],
  },
}

module.exports = withImages(withSass(nextConfig))
