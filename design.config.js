const path = require('path')

const icons = [
  'menu',
  'chevron-left',
  'chevron-right',
  'account',
  'domain',
  'office-building',
  'file-search',
  'database',
  'school',
  'close',
]

const iconsRoot = path.join(
  path.dirname(require.resolve('@mdi/svg/package.json')),
  './svg'
)

const config = {
  icons: {
    path: iconsRoot,
    files: icons,
  },

  output: {
    path: path.join(__dirname, 'public/design'),
    publicPath: '/design',
    icons: {
      files: 'icons',
      sprite: 'icons.svg',
    },
  },
}

module.exports = config
