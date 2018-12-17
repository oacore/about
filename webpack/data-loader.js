const camelize = require('camelize')

const dataLoader = content => JSON.stringify(camelize(JSON.parse(content)))

module.exports = dataLoader
