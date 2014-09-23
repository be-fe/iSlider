
module.exports = require('./promise')

/* istanbul ignore next */
if (!module.exports) {
  console.error('Neither `bluebird` nor the native `Promise` functions were found.')
  console.error('Please install `bluebird` yourself.')
  process.exit(1)
}
