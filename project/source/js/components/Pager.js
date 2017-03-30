import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../state/modules/content'

import '../../stylesheets/app.scss'

class Pager extends Component {

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
    return (
      <div>
        <p>Pager goes here</p>
      </div>
    )
  }
}

Pager.propTypes = {
    actions: PropTypes.shape({
        findFetchContent: PropTypes.func
    }),
    isFetching: PropTypes.bool,
    content: PropTypes.object
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

function mapStateToProps (state, ownProps) {
    const { content } = state
    const { path } = ownProps

    const {
        isFetching,
        notContent
    } = content[path] || {
        isFetching: true,
        notContent: {}
    }

    return {
        path,
        notContent,
        isFetching
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager)
