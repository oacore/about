module.exports = {
  plugins: {
    'postcss-preset-env': {
      // https://github.com/csstools/postcss-preset-env/issues/163#issuecomment-685660017
      stage: 1,
    },
    'cssnano': {
      preset: [
        'default',
        {
          rawCache: false,
          discardComments: false,
          mergeLonghand: false,
          normalizeWhitespace: false,
          svgo: false,
          reduceInitial: false,
          reduceTransforms: false,
        },
      ],
    },
    'postcss-extend': {},
  },
}
