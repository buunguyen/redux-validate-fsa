## redux-validate-fsa

[![NPM](https://nodei.co/npm/redux-validate-fsa.png?compact=true)](https://www.npmjs.com/package/redux-validate-fsa)

[![Build Status](https://travis-ci.org/buunguyen/redux-validate-fsa.svg?branch=master)](https://travis-ci.org/buunguyen/redux-validate-fsa)

Redux middleware that validates if an action is a [Flux Standard Action](https://github.com/acdlite/flux-standard-action) (FSA).

### Usage

```js
const middleware = [reduxThunk]
if (__DEV__) {
  const fsaMiddleware = require('redux-validate-fsa')(ignore /* optional */)
  middleware.push(fsaMiddleware)
}
```

The `ignore` argument is for you to filter actions that should be skipped from the FSA check. This is useful if you have to deal with non-compliant actions from third-party libraries.

* If an array is given, it must be the array of action types that should be skipped from the FSA check.
* If a function is given, it must return true for action that should be skipped from the FSA check.

For example, if you use redux-simple-router, you should ignore the path-update actions, which are not FSA compliant.

```js
import {UPDATE_PATH} from 'redux-simple-router'
const fsaMiddleware = require('redux-validate-fsa')([UPDATE_PATH])
```

Notes:
* This middleware is only useful in dev mode. So it should be included conditionally.
* If you use [redux-thunk](https://github.com/gaearon/redux-thunk), make sure the thunk middleware is added before this middleware. Alternatively, you can use the `ignore` predicate to filter out actions that are thunks.

### Test

```bash
npm install
npm test
```
