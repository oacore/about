const camelize = require('camelize')

const retrieveStats = async () => ({
  totalArticlesCount: 208396257,
  fullTextCount: 26109570,
  repositoriesCount: 10279,
  countriesCount: 147,
  openAccessLinksCount: 75006205,
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
