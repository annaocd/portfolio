import React, { Component } from 'react'
import Squares from '../components/Squares'
import TodoList from '../components/TodoList'
import TodoItem from '../components/TodoItem'
import '../../stylesheets/components/demo.scss'

class DemoSquares extends Component {
  render () {
    return (
      <div className='page-content demo demo--squares'>
        <h2>Squares</h2>
        <div className='project'>
          <div className='project__info'>
            <p>Squares is a game to play when you and a friend are super bored and want to competitively connect dots. I made this experiment to sharpen my SVG skills and to tryout the <a href='http://snapsvg.io/' target='_blank'>Snap.svg</a> library.</p>
            <h3>Directions:</h3>
            <p>Choose 2 adjacent dots to make a line. If your line forms a square you get a point and another turn.</p>
            <h3>Todo:</h3>
            <TodoList>
              <TodoItem>Responsive grid size</TodoItem>
              <TodoItem>Socket sessions (create or join a unique game url)</TodoItem>
              <TodoItem>Square fill &amp; winner animation</TodoItem>
              <TodoItem>Automated player</TodoItem>
            </TodoList>
          </div>
          <div className='project__demo'>
            <Squares />
          </div>
        </div>
      </div>
    )
  }
}

export default DemoSquares
