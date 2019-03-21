import {
  resolve as resolveUrl,
  parse as parseUrl,
  format as formatUrl,
} from 'url'
import routes from './core.routes.yml'

const routesMap = new Map()

class Router {
  static resolve(href) {
    if (href.charAt() !== '~') return href

    const key = href.slice(1)
    if (routesMap.has(key)) return routesMap.get(key)

    const url = parseUrl(key)
    const pattern = url.pathname.split('/')
    while (pattern.length && !routesMap.has(pattern.join('/'))) pattern.pop()

    if (!pattern.length) {
      const fallback = `/${key}`

      if (process.env.NODE_ENV === 'development') {
        console.error(
          `Trying to resolve unexisted route ${href}. Fallback to ${fallback}`
        )
      }

      return fallback
    }

    if (process.env.NODE_ENV === 'development') {
      const match = pattern.join('/')
      if (match.length < url.pathname.length)
        console.log(`Partial match: ${href} -> ${match}`)
    }

    url.pathname = routesMap.get(pattern.join('/'))

    return formatUrl(url)
  }
}

const flatRoutesTree = (node, [parentKey = '', parentPath = '/'] = []) => {
  const items = []

  Object.entries(node || {}).forEach(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}/${key}` : key
    const path = value.pattern || value
    const absPath =
      path.charAt() === '~'
        ? path
        : resolveUrl(
            parentPath.slice(-1) !== '/' ? `${parentPath}/` : parentPath,
            path
          )
    const route = [fullKey, absPath]

    items.push(...flatRoutesTree(value.children, route))
    items.push(route)
  })

  items.sort(
    ([, leftPath], [, rightPath]) =>
      rightPath.split('/').slice(1).length - leftPath.split('/').slice().length
  )

  return items
}

const mapped = flatRoutesTree(routes)
mapped.forEach(item => routesMap.set(...item))

// eslint-disable-next-line no-restricted-syntax
for (const entry of routesMap.entries()) {
  const [key] = entry
  let [, route] = entry
  while (route.charAt() === '~') route = Router.resolve(route)
  routesMap.set(key, route)
}

export default Router
