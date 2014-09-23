
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
var length = chars.length

module.exports = function rndm(len) {
  var salt = ''
  for (var i = 0; i < len; i++)
    salt += chars[Math.floor(length * Math.random())]
  return salt
}
