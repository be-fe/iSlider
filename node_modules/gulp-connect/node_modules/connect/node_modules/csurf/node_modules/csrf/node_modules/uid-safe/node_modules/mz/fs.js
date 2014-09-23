
var fs = require('fs')

require('./_promisify_all.js')(fs, exports, [
  'rename',
  'ftruncate',
  'chown',
  'fchown',
  'lchown',
  'chmod',
  'fchmod',
  'stat',
  'lstat',
  'fstat',
  'link',
  'symlink',
  'readlink',
  'realpath',
  'unlink',
  'rmdir',
  'mkdir',
  'readdir',
  'close',
  'open',
  'utimes',
  'futimes',
  'fsync',
  'write',
  'read',
  'readFile',
  'writeFile',
  'appendFile',
])

var promisify = require('./_promisify.js')

// don't know enough about promises to do this haha
exports.exists = promisify('exists', function exists(filename, done) {
  fs.stat(filename, function (err) {
    done(null, !err)
  })
})
