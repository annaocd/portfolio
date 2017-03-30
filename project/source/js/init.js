import 'babel-polyfill'
import { createElement } from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'
import createStore from './state/store'

const store = createStore()
const router = createElement(Router, {
  routes,
  history: browserHistory
})
const provider = createElement(Provider, { store }, router)
const element = document.getElementById('root')

render(provider, element)
