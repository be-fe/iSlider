
var promisify = require('./_promisify.js')

module.exports = function (source, exports, methods) {
  methods.forEach(function (name) {
    if (deprecated(source, name)) return
    if (typeof source[name] === 'function')
      exports[name] = promisify(name, source[name])
  })

  // proxy the rest
  Object.keys(source).forEach(function (name) {
    if (deprecated(source, name)) return
    if (exports[name]) return
    exports[name] = source[name]
  })
}

function deprecated(source, name) {
  var desc = Object.getOwnPropertyDescriptor(source, name)
  if (!desc || !desc.get) return false
  if (desc.get.name === 'deprecated') return true
  return false
}
