import {assert} from 'chai'
import sinon from 'sinon'
import fsa from '../src/middleware'

describe('fsa', () => {
  const dispatch = () => {}
  const getState = () => {}

  describe('handle action', () => {
    const fsaMiddleware = fsa()({dispatch, getState})

    it('should throw if action is undefined', () => {
      const next = (action) => {}
      assert.throws(() => {
        fsaMiddleware(next)(undefined)
      }, Error, `'action' must be an object and FSA compliant`)
    })

    it('should throw if action is not an FSA', () => {
      const next = (action) => {}
      assert.throws(() => {
        fsaMiddleware(next)({type: 'action', nonFsaProperty: 0})
      }, Error, `'action' must be an object and FSA compliant`)
    })

    it('should call next and return its result if action is an FSA', () => {
      const action = {type: 'fsa'}
      const next = sinon.stub()
      next.withArgs(action).returns(42)

      const result = fsaMiddleware(next)(action)
      assert.equal(result, 42)
    })
  })

  describe('handle ignore', () => {
    it('should skip FSA check if an array whitelists the action type', () => {
      const whitelist = ['ignore_me']
      const fsaMiddleware = fsa(whitelist)({dispatch, getState})
      const next = sinon.spy()
      fsaMiddleware(next)({type: 'ignore_me', nonFsaProperty: 0})
      assert.isTrue(next.calledOnce)
    })

    it('should skip FSA check if a predicate filters the action', () => {
      const predicate = (action) => action.type === 'ignore_me'
      const fsaMiddleware = fsa(predicate)({dispatch, getState})
      const next = sinon.spy()
      fsaMiddleware(next)({type: 'ignore_me', nonFsaProperty: 0})
      assert.isTrue(next.calledOnce)
    })

    it('should skip FSA check if a predicate filters undefined action', () => {
      const predicate = (action) => action === undefined
      const fsaMiddleware = fsa(predicate)({dispatch, getState})
      const next = sinon.spy()
      fsaMiddleware(next)(undefined)
      assert.isTrue(next.calledOnce)
    })
  })
})
