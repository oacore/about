const { promises: fsPromises } = require('fs')
const path = require('path')

const camelize = require('camelize')
const fetch = require('node-fetch')

let fetchStatsPromise = null

// Hack to avoid data retrieval in the all components
// TODO: Implement Babel plugin instead
const statsUrl = 'https://api.core.ac.uk/internal/repositories/formap'
const cachePath =
  process.env.NODE_ENV === 'production'
    ? ''
    : path.join(__dirname, 'formap.json.cache')
const defaultStatsPath =
  process.env.NODE_ENV === 'production'
    ? ''
    : path.join(__dirname, 'formap.json')

const fetchStats = (url) => {
  let stats = null
  const date = new Date()
  return new Promise((resolve, reject) => {
    if (stats == null) {
      fetch(url)
        .then((res) => {
          if (res.status >= 400)
            throw new Error('Could not fetch actual formap')
          return res
        })
        .then((res) => res.json())
        .then((data) => {
          stats = {
            data,
            timestamp: date.getDate(),
          }
          resolve(stats)
        })
        .catch(reject)
    } else resolve(stats)
  })
}

const saveCachedStats = (cacheFilePath, formapData) => {
  if (!cacheFilePath) throw new Error('Cache path cannot be empty')

  return fsPromises.writeFile(cacheFilePath, formapData)
}

const loadCachedStats = async (cacheFilePath, { ignoreModified = false }) => {
  if (!cacheFilePath) throw new Error('Cache path cannot be empty')

  // console.log('==> cacheFilePath')
  // console.log(cacheFilePath)

  if (!ignoreModified) {
    const cacheStats = await fsPromises.stat(cacheFilePath)
    if (cacheStats.mtimeMs < Date.now() - 6 * 60 * 60 * 1000)
      throw new Error('Cache outdated')
  }

  return fsPromises
    .readFile(cacheFilePath)
    .then((contents) => JSON.parse(contents))
}

const retrieveStats = async (url, catchFilePath) => {
  const errorMsg =
    'Fail. ==> Formap retrieval failed due to API Core instability.'
  try {
    return await loadCachedStats(catchFilePath)
  } catch (cacheError) {
    try {
      const stats = await fetchStats(url)

      try {
        saveCachedStats(catchFilePath, JSON.stringify(stats))
      } catch (cannotWriteFile) {
        // Ignored
        // We don't care if we cannot create a local cache. It's for dev only.
      }

      return stats
    } catch (fetchError) {
      if (process.env.NODE_ENV !== 'production')
        return loadCachedStats(defaultStatsPath, { ignoreModified: true })
      console.error(errorMsg)
      process.exit(-1) // It needs for strict success build
      throw new Error(errorMsg)
    }
  }
}

const dataLoaderFormap = function loadDataFile(content) {
  const callback = this.async()
  const dataFile = camelize(JSON.parse(content))
  if (!fetchStatsPromise) fetchStatsPromise = retrieveStats(statsUrl, cachePath)

  fetchStatsPromise.then((formap) =>
    callback(
      null,
      JSON.stringify({
        ...dataFile,
        formap,
      })
    )
  )
}

module.exports = dataLoaderFormap
