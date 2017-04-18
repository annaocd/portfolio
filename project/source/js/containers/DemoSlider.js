import React, { PropTypes, Component } from 'react'
import Slider from '../components/Slider'
import TodoList from '../components/TodoList'
import TodoItem from '../components/TodoItem'
import '../../stylesheets/components/demo.scss'


class DemoSlider extends Component {
  render () {
    return (
      <div className='page-content demo demo--slider'>
        <h2>Slider</h2>
        <div className='project'>
          <div className='project__demo'>
            <Slider />
          </div>
          <div className='project__info'>
            <p>I built this simple slider to mimic the slidey OSX preview pane and to try-out <a href='https://github.com/chenglou/react-motion' target='_blank'>react-motion</a>.</p>
            <p>Changes in mouseX (relative to the component element) are used to tween the transform property of a stateful style object. The <a href='https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list' target='_blank'>draggable list demo</a> provided helpful guidance for this mechanic.</p>
            <h3>Directions:</h3>
            <p>Click (or tap) and drag left or right.</p>
            <h3>Todo:</h3>
            <TodoList>
              <TodoItem isComplete={true}>Responsive item size</TodoItem>
              <TodoItem>Add items to array</TodoItem>
              <TodoItem>Item nav</TodoItem>
              <TodoItem>Fullscreen mode</TodoItem>
            </TodoList>
          </div>
        </div>
      </div>
    )
  }
}

export default DemoSlider
