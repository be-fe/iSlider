'use strict';
module.exports = process.platform === 'win32' ? (process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH) : process.env.HOME;
