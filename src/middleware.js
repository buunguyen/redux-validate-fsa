import {isFSA} from 'flux-standard-action'

/**
 * Creates a Redux middleware that validates if supplied actions are FSA-compliant.
 *
 * @param {Array|Function} ignore (optional) - an array of action types
 * that should be skipped from the FSA check or a predicate of type (Action) => bool
 * that should return true for actions that should be skipped from the FSA check.
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
    const message = action && action.type
      ? `action '${action.type}' must be FSA compliant`
      : `'action' must be an object and FSA compliant`
    if (global.console && global.console.warn) global.console.warn(message, action);
    throw new Error(message)
  }
}
