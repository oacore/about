const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  sassLoaderOptions: {
    includePaths: [path.resolve(__dirname, 'node_modules')],
  },
})
