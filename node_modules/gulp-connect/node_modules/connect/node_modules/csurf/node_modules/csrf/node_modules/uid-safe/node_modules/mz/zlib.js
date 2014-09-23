
require('./_promisify_all')(
  require('zlib'),
  exports, [
    'deflate',
    'deflateRaw',
    'gzip',
    'gunzip',
    'inflate',
    'inflateRaw',
    'unzip',
  ]
)
