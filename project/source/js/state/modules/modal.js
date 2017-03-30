const OPEN = 'modal/OPEN'
const CLOSE = 'modal/CLOSE'

const INITIAL_STATE = {
    isOpen: false,
    component: null
}

const handlers = {
  [OPEN] (state, action) {
    return Object.assign({}, state, {
      isOpen: true,
      component: action.component
    })
  },

  [CLOSE] (state) {
    return Object.assign({}, state, {
      isOpen: false
    })
  }
}

function reducer (state = INITIAL_STATE, action) {
  const handler = handlers[action.type]
  if (!handler) return state
  return handler(state, action)
}

function openModal (component) {
  return {
    type: OPEN,
    component: component
  }
}

function closeModal () {
  return {
    type: CLOSE
  }
}

export default reducer
export {
  openModal,
  closeModal
}
