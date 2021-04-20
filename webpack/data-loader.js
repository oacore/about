const camelize = require('camelize')

const retrieveStats = async () => ({
  totalArticlesCount: 208035267,
  fullTextCount: 26150625,
  repositoriesCount: 1098,
  countriesCount: 144,
  openAccessLinksCount: 76814521,
})

const fetchStatsPromise = retrieveStats()

const dataLoader = function loadDataFile(content) {
  const callback = this.async()
  const dataFile = camelize(JSON.parse(content))

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
