# CSRF

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Logic behind CSRF token creation and verification.
Read [Understanding-CSRF](http://www.jongleberry.com/understanding-csrf.html) for more information on CSRF.
Use this module to create custom CSRF middleware and what not.

### Install

```bash
$ npm install csrf-tokens
```

## API

```js
var tokens = require('csrf-tokens')(options)

var secret = tokens.secretSync()
var token  = tokens.create(secret)
var valid  = tokens.verify(secret, token)
```

### Options

- `secretLength: 24` - the byte length of the secret key
- `saltLength: 8` - the string length of the salt
- `tokensize: (secret, salt) => token` - a custom token creation function

#### tokens.secret([cb])

Asynchronously create a new `secret` of length `secretLength`.
If `cb` is not defined, a promise is returned.
You don't have to use this.

```js
tokens.secret().then(function (secret) {

})

tokens.secret(function (err, secret) {

})
```

#### var secret = tokens.secretSync()

Synchronous version of `tokens.secret()`

#### var token = tokens.token(secret)

Create a CSRF token based on a `secret`.
This is the token you pass to clients.

#### var valid = tokens.verify(secret, token)

Check whether a CSRF token is valid based on a `secret`.
If it's not valid, you should probably throw a `403` error.

## [License (MIT)](LICENSE)

[npm-image]: https://img.shields.io/npm/v/csrf.svg?style=flat-square
[npm-url]: https://npmjs.org/package/csrf
[github-tag]: http://img.shields.io/github/tag/pillarjs/csrf.svg?style=flat-square
[github-url]: https://github.com/pillarjs/csrf/tags
[travis-image]: https://img.shields.io/travis/pillarjs/csrf.svg?style=flat-square
[travis-url]: https://travis-ci.org/pillarjs/csrf
[coveralls-image]: https://img.shields.io/coveralls/pillarjs/csrf.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/pillarjs/csrf?branch=master
[david-image]: http://img.shields.io/david/pillarjs/csrf.svg?style=flat-square
[david-url]: https://david-dm.org/pillarjs/csrf
[license-image]: http://img.shields.io/npm/l/csrf.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/csrf.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/csrf
