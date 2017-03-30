import fetch from 'isomorphic-fetch'

const REQUEST = 'content/REQUEST'
const RECEIVE = 'content/RECEIVE'
const ERROR = 'content/ERROR'

const INITIAL_STATE = {
    activeRequests: 0,
    isFetching: false
}

const handlers = {
  [REQUEST] (state, action) {
    const { path } = action.payload
    const activeRequests = state.activeRequests + 1

    return Object.assign({}, state, {
      activeRequests,
      [path]: {
          isFetching: true
        }
    })
  },

  [RECEIVE] (state, action) {
    const { path, data } = action.payload
    const activeRequests = state.activeRequests - 1
    const nextState = {
      isFetching: false,
      data
    }

    return Object.assign({}, state, {
      activeRequests,
      [path]: {
          isFetching: false,
          data
        }
    })
  },

  [ERROR] (state, action) {
    const { path } = action.payload
    const activeRequests = state.activeRequests - 1
    const nextState = {
      isFetching: false,
      error: action.error
    }

    return Object.assign({}, state, {
      activeRequests,
      [path]: nextState
    })
  }
}

function reducer (state = INITIAL_STATE, action) {
  const handler = handlers[action.type]
  if (!handler) return state
  return handler(state, action)
}

function requestContent (path) {
  return {
    type: REQUEST,
    payload: { path }
  }
}

function receiveContent (path, data) {
  return {
    type: RECEIVE,
    payload: { path, data }
  }
}

function errorContent (path, error) {
  return {
    type: ERROR,
    payload: { path },
    error
  }
}

function fetchContent (path) {
  //const sep = path.indexOf('?') === -1 ? '?' : '&'
  console.log(path, `/data${path}.json`)
  const url = `/data${path}.json`
  const config = {
    credentials: 'same-origin',
    headers: {
      'Access-Control-Allow-Origin':'*',
      'content-type': 'application/json',
      'mode': 'cors',
      'headers':{
        'Access-Control-Allow-Origin':'*'
      },
    }
  }

  return (dispatch) => {
    dispatch(requestContent(path))
    return fetch(url, config)
      .then((res) => res.json())
      .then((data) => dispatch(receiveContent(path, data)))
      .catch((error) => dispatch(errorContent(path, error)))
  }
}

function shouldFetchContent (state, path) {
  const item = state.content[path]
  if (!item) return true
  if (item.isFetching) return false
}

function findFetchContent (path, fullPath) {
  return (dispatch, getState) => {
    if (shouldFetchContent(getState(), path)) {
      return dispatch(fetchContent(path, fullPath))
    }
  }
}

function findFetchStaticContent (path) {
  return (dispatch, getState) => {
    if (shouldFetchContent(getState(), path)) {
      //const fullPath = path.replace('/static/', STATIC_URL)
      return dispatch(fetchContent(path))
    }
  }
}

export default reducer
export {
  findFetchContent,
  findFetchStaticContent
}
