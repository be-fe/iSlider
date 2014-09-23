
# RNDM

Random string generator.
Basically `Math.random().toString(36).slice(2)`,
but with both upper and lower case letters and arbitrary lengths.
Useful for creating fast, not cryptographically secure salts.

## API

```js
import rndm from 'rndm@1'

var salt = rndm(16)
```
