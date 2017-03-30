import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cx from 'bem-classnames'
import * as actions from '../state/modules/content'

class Blog extends Component {
    constructor(props) {
        super(props)
    }

    getClassNames () {
        const { isFetching } = this.props
        const classes = {
            name: 'blog',
            states: ['fetching']
        }

        return cx(classes, { fetching: isFetching })
    }

    render () {
        const { isFetching, data } = this.props
        //if (isFetching || !data) return null
        return (
            <div className={ this.getClassNames() }>
            </div>
        )
    }
}

Blog.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
