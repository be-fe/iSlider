# Node Beautify - an asset beautifier for node.js


## Installation

	npm install node-beautify

## Usage

to beautify javascript:

		require('beautify-node').beautifyJs(source, options);
		
where
	source is a string of javascript source code, and options is a set of options (not required)
		

## Default Options 

	- indentSize: 4
	- indentChar: ' '
	- preserveNewlines: true
	- bracesOnOwnLine: false
	- keepArrayIndentation: false
	- spaceAfterAnonFunction: true
	- indentLevel: 0


## Requirements

* node.js


## Acknowledgements

The original [JS Beautifier](http://github.com/einars/js-beautify) is written by [Einar Lielmanis](mailto:einar@jsbeautifier.org).


## License

MIT-License, see `LICENSE.txt`.

## Roadmap

- Add support for other asset types
- Integrate into Node-Tabs / Cram
