import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cx from 'bem-classnames'
import * as actions from '../state/modules/content'

import { Link } from 'react-router'

import Squares from '../components/Squares'

class Experiments extends Component {
    constructor(props) {
        super(props)
    }

    getClassNames () {
        const { isFetching } = this.props
        const classes = {
            name: 'experiments',
            states: ['fetching']
        }

        return cx(classes, { fetching: isFetching })
    }

    render () {
        const { isFetching, data } = this.props
        //if (isFetching || !data) return null
        return (
            <div className={ this.getClassNames() }>
              <Link to='/experiments/squares'>Squares</Link>
              <Link to='/experiments/pager'>Pager</Link>
            </div>
        )
    }
}

Experiments.propTypes = {
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
    const { pathname: path } = ownProps.location

    const {
        isFetching,
        data
    } = content[path] || {
        isFetching: true,
        data: {}
    }

    return {
        data,
        isFetching,
        path
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiments)
