import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cx from 'bem-classnames'
import * as actions from '../state/modules/modal'

class ModalLink extends Component {
    constructor(props) {
      super(props)
      this.onClick = this.onClick.bind(this)
    }

    onClick () {
      this.props.actions.openModal(this.props.component)
    }

    render () {
      return (
        <button onClick={this.onClick} title='opens modal'>
          {this.props.children}
        </button>
      )
    }
}

ModalLink.propTypes = {
    actions: PropTypes.shape({
        openModal: PropTypes.func
    })
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ModalLink)
