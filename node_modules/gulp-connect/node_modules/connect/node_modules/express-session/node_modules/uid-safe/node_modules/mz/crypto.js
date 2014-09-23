
require('./_promisify_all')(
  require('crypto'),
  exports, [
    'pbkdf2',
    'randomBytes',
    'pseudoRandomBytes',
  ]
)
