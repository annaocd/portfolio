import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import animateScrollTo from 'animated-scroll-to'

import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'
import CV from './containers/CV'
import DemoSquares from './containers/DemoSquares'
import DemoSlider from './containers/DemoSlider'


browserHistory.listen((ev) => {
  window.scrollTo(0,0)
  // const options = {
  //   speed: 200,
  //   maxDuration: 500,
  //   cancelOnUserAction: true
  // }
  // animateScrollTo(0, options);
})

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/squares' component={DemoSquares} />
      <Route path='slider' component={DemoSlider} />
      <Route path='/cv' component={CV} />
    </Route>
  </Router>
)

export default routes
