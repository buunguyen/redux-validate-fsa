import {isFSA} from 'flux-standard-action'

/**
 * Creates a Redux middleware that validates if supplied actions are FSA-compliant.
 *
 * @param {Array|Function} ignore (optional) - an array of action types
 * whose actions should *not* be validated or a predicate of type (Action) => bool 
 * that should return true if the action should *not* be validated.
 *
 * @returns {Function} A Redux middleware.
 */
export default function fsa(ignore) {
  const _ignore = (function () {
    if (!ignore) return () => false
    if (typeof ignore === 'function') return ignore
    if (Array.isArray(ignore)) return (action) => action && ~ignore.indexOf(action.type)
    throw new Error(`'ignore' must be an array or function`)
  })()

  return store => next => action => {
    if (_ignore(action) || (action && isFSA(action))) {
      return next(action)
    }
    throw new Error(`'action' must be an object and FSA compliant`)
  }
}
