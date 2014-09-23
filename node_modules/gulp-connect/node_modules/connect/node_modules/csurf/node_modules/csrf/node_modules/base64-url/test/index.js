var test = require('tape');
var base64url = require('../');


test('base64url', function (t) {
  t.plan(4);

  var text = 'Node.js is awesome.';

  var encode = base64url.encode(text);
  t.ok(encode, 'encode: ' + encode);

  var decode = base64url.decode(encode);
  t.deepEqual(decode, text, 'decode: ' + decode);

  var text_escape = 'This+is/goingto+escape==';
  console.log(text_escape);

  var escape = base64url.escape(text_escape);
  t.equal(escape.match(/\+|\//g), null, 'escape (omit + and /): ' + escape);

  var unescape = base64url.unescape(escape);
  t.equal(unescape.match(/\-|_/g), null, 'unescape (back to first form): ' + unescape);
});
