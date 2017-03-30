import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cx from 'bem-classnames'
import * as actions from '../state/modules/content'

import NavSub from '../components/NavSub'

import '../../stylesheets/components/about.scss'

class About extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount () {
      //this.props.actions.findFetchStaticContent('/about')
    }

    getClassNames () {
      const { isFetching } = this.props
      const classes = {
          name: 'about',
          states: ['fetching']
      }

      return cx(classes, { fetching: isFetching })
    }

    render () {
      return (
        <div className={ this.getClassNames() }>
          <p>{"I'm"} Anna Yovandich (YO-vahn-ditch).</p>
          <p>I love building user interfaces. </p>
        </div>
      )
    }
}

About.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(About)
