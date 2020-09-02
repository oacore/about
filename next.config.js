const path = require('path')

const withImages = require('next-images')

const nextConfig = {
  webpack: config => {
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      if (entries['main.js']) entries['main.js'].unshift('./polyfills')

      return entries
    }

    Object.assign(config.resolve.alias, {
      components: path.resolve(__dirname, 'components'),
      data: path.resolve(__dirname, 'data'),
    })

    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        include: [path.resolve(__dirname, 'data')],
        use: [
          'json-loader',
          path.resolve('webpack/data-loader.js'),
          {
            loader: 'yaml-import-loader',
            options: {
              output: 'json',
              importRawKeyword: 'file',
            },
          },
        ],
      },
      {
        test: /\.ya?ml$/,
        exclude: [path.resolve(__dirname, 'data')],
        use: {
          loader: 'yaml-import-loader',
          options: {
            importNested: false,
          },
        },
      },
      {
        test: /\.md$/,
        use: ['json-loader', 'yaml-frontmatter-loader'],
      }
    )

    return config
  },

  trailingSlash: true,
}

module.exports = withImages(nextConfig)
