var fs=require('fs'),
	assert = require('assert'),
	nodeBeautify = require('../node-beautify'),
	expected = {
		js: fs.readFileSync(__dirname + '/expected/test.js')
	};
	
// test beautifyJs
var source = "var x=1;var y=[1,2,3];function test(){console.log('test');}var z={a:1,b:[2,3],c:{I:'i'};";
var result = nodeBeautify.beautifyJs(source);
assert.equal(result, expected.js);
console.log('node-beautify test completed successfully');