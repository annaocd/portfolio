import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cx from 'bem-classnames'
import * as actions from '../state/modules/content'

import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Education from '../components/Education'
import DateRange from '../components/DateRange'
import Resume from '../components/Resume'


import '../../stylesheets/components/resume.scss'

class CV extends Component {
    constructor(props) {
        super(props)
    }

    getClassNames () {
        const { isFetching } = this.props
        const classes = {
            name: 'resume',
            states: ['fetching']
        }

        return cx(classes, { fetching: isFetching })
    }

    render () {
        const { isFetching, data } = this.props

        return (
          <Resume />
        )
    }
}

CV.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CV)

// componentDidMount () {
//   this.props.actions.findFetchStaticContent(this.props.path)
// }
// render () {
//     const { isFetching, data } = this.props
//     if (isFetching || !data) return null
//     return (
//         <div className={ this.getClassNames() }>
//           <Skills content={data.skills} />
//           <Experience content={data.experience} />
//           <Education content={data.education} />
//         </div>
//     )
// }
