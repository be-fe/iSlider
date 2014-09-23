
require('./_promisify_all')(
  require('child_process'),
  exports, [
    'exec',
    'execFile',
  ]
)
