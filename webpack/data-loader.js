const { promises: fsPromises } = require('fs')
const path = require('path')

const camelize = require('camelize')
const fetch = require('node-fetch')

let fetchStatsPromise = null

// Hack to avoid data retrieval in the all components
// TODO: Implement Babel plugin instead
const statsUrl = 'https://api.core.ac.uk/internal/statistics'
const cachePath =
  process.env.NODE_ENV === 'production'
    ? ''
    : path.join(__dirname, 'statistics.json.cache')
const defaultStatsPath =
  process.env.NODE_ENV === 'production'
    ? ''
    : path.join(__dirname, 'statistics.json')

const fetchStats = (url) => {
  let stats = null
  return new Promise((resolve, reject) => {
    if (stats == null) {
      fetch(url)
        .then((res) => {
          if (res.status >= 400)
            throw new Error('Could not fetch actual statistics')
          return res
        })
        .then((res) => res.json())
        .then((data) => {
          stats = data
          resolve(stats)
        })
        .catch(reject)
    } else resolve(stats)
  })
}

const saveCachedStats = (cacheFilePath, statisticsData) => {
  if (!cacheFilePath) throw new Error('Cache path cannot be empty')

  return fsPromises.writeFile(cacheFilePath, statisticsData)
}

const loadCachedStats = async (cacheFilePath, { ignoreModified = false }) => {
  if (!cacheFilePath) throw new Error('Cache path cannot be empty')

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
      console.error(
        'Fail. Statistics retrieval failed due to API Core instability.'
      )
      process.exit(-1)
      throw new Error(
        'Fail. Statistics retrieval failed due to API Core instability.'
      )
    }
  }
}

const dataLoader = function loadDataFile(content) {
  const callback = this.async()
  const dataFile = camelize(JSON.parse(content))
  if (!fetchStatsPromise) fetchStatsPromise = retrieveStats(statsUrl, cachePath)

  fetchStatsPromise.then((statistics) =>
    callback(
      null,
      JSON.stringify({
        ...dataFile,
        statistics,
      })
    )
  )
}

module.exports = dataLoader
