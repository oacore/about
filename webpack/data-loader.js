const camelize = require('camelize')
const fetch = require('node-fetch')

// Hack to avoid data retrieval in the all components
// TODO: Implement Babel plugin instead
const statsUrl = 'https://api.core.ac.uk/internal/statistics'

const retrieveStats = url => {
  let stats = null
  return new Promise((resolve, reject) => {
    if (stats == null) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          stats = data
          resolve(stats)
        })
        .catch(reject)
    } else resolve(stats)
  })
}

const dataLoader = function loadDataFile(content) {
  const callback = this.async()
  const dataFile = camelize(JSON.parse(content))
  retrieveStats(statsUrl).then(statistics =>
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
