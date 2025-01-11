const fs = require('fs')

const getDemoData = (fileName) => {
  const rawData = fs.readFileSync(`./openliga/samples/${fileName}.json`)
  return JSON.parse(rawData)
}


module.exports = { getDemoData }