import React, { PropTypes, Component } from 'react'
import TodoItem from './TodoItem'
import '../../stylesheets/components/todo-list.scss'

class TodoList extends Component {

  constructor (props) {
    super(props)
  }

  // --- lifecycle events --- //
  // shouldComponentUpdate (nextProps, nextState) {
  // }

  componentDidUpdate (prevProps, prevState) {

  }

  componentDidMount () {
    //DFahicSpdjc3iqwTuZfnA
    //this.props.actions.findFetchContent('https://www.goodreads.com/search/index.xml?key=DFahicSpdjc3iqwTuZfnA&q=Ender%27s+Game')
  }

  render () {
    return <ul>{this.props.children}</ul>
  }
}

TodoList.propTypes = {
    //items: PropTypes.array
}

export default TodoList
