import { resolve as resolveUrl } from 'url'
import routes from './core.routes.yml'

const routesMap = new Map()

const flatRoutesTree = (node, [parentKey = '', parentPath = '/'] = []) => {
  const items = []

  Object.entries(node || {}).forEach(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}/${key}` : key
    const absPath = resolveUrl(parentPath, value.pattern || value)
    const route = [fullKey, absPath]

    items.push(...flatRoutesTree(value.children, route))
    items.push(route)
  })

  return items
}

const mapped = flatRoutesTree(routes)
mapped.forEach(item => routesMap.set(...item))

class Router {
  static resolve(pathname) {
    if (pathname.charAt() !== '~') return pathname

    // Special keys
    // TODO: Try to implement smart route lookup instead this hack
    if (pathname.match(/^~static/))
      return pathname.replace(/^~static/, '/static')
    if (pathname.match(/^~images/))
      return pathname.replace(/^~images/, '/static/images')

    const key = pathname.substr(1)

    if (!routesMap.has(key)) {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          `Trying to resolve unexisted route ${pathname}. Fallback to ${key}`
        )
      }

      return key
    }

    return routesMap.get(pathname.substr(1))
  }
}

export default Router
