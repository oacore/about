const path = require('path')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

module.exports = withImages(withSass({
  sassLoaderOptions: {
    includePaths: [path.resolve(__dirname, 'node_modules')],
  },
}))
