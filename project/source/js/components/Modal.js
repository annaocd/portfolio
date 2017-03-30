import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cx from 'bem-classnames'
import * as actions from '../state/modules/modal'

import '../../stylesheets/components/modal.scss'

class Modal extends Component {

  constructor (props) {
    super(props)

    this.defaultProps = {
      closeTimeout: 400
    }

    this.state = {
      isOpen: false
    }
  }

  close () {
    this.setState({ isOpen: false })
    document.body.classList.remove('has-modal')
    setTimeout(() => {
      this.props.actions.closeModal()
    }, 400)
  }

  componentDidMount () {
    setTimeout(() => {
      document.body.classList.add('has-modal')
      this.setState({ isOpen: true })
    }, 10)
  }

  render () {
    let classes = {
        name: 'modal',
        states: ['open']
    }

    const Content = this.props.children

    return (
      <div className={cx(classes, {open: this.state.isOpen})}>
        <div className='modal__content'><Content /></div>
        <button className='modal__button--close' onClick={this.close.bind(this)}><i className='material-icons'>&#xE5CD;</i></button>
      </div>
    )
  }
}

Modal.propTypes = {
    actions: PropTypes.shape({
        closeModal: PropTypes.func
    })
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Modal)

// componentWillAppear(callback) {
//     console.log('will appear');
//     callback();
// }

// componentDidAppear () {
//   this.setState({
//     isOpen: true
//   })
//   console.log('did appear');
// }
// componentWillEnter(callback) {
//   this.setState({
//     isOpen: true
//   })
//     callback();
//     console.log('will enter', callback);
// }
// componentDidEnter() {
//
//     console.log('did enter');
// }
// componentWillLeave(callback) {
//   this.setState({
//     isOpen: true
//   })
//   callback();
//   console.log('wiil leave');
// }
// componentDidLeave() {
//     console.log('did leave');
// }
