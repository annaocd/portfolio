import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './modules'

function configureMiddleware () {
  const middleware = [
    thunk
  ]

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }

  return applyMiddleware.apply(null, middleware)
}

function createRootStore (initialState = {}) {
  const middleware = configureMiddleware()
  const store = createStore(
    rootReducer,
    middleware
  )

  if (module.hot) {
      module.hot.accept('./modules', () => {
          const nextRootReducer = require('./modules')
          store.replaceReducer(nextRootReducer)
      })
  }

  return store
}

export default createRootStore
