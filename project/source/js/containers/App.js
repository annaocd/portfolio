import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTransitionGroup from 'react-addons-transition-group'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import cx from 'bem-classnames'

import NavMain from '../components/NavMain'
import HeaderMain from '../components/HeaderMain'
import Modal from '../components/Modal'
import '../../stylesheets/app.scss'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModal: false,
      pageY: 0
    }

    this.onScroll = this.onScroll.bind(this)
  }

  onScroll (e) {
    this.setState({
      pageY: window.pageYOffset
    })
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  componentWillReceiveProps(nextProps) {
    // if route changed
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children
      this.previousChildren = this.props.children
      this.setState({ isModal: true })
      document.body.classList.add('has-modal')
    } else {
      this.setState({ isModal: false })
      document.body.classList.remove('has-modal')
    }
  }

  render() {
    const { location, children } = this.props
    const { isModal } = this.state
    const containerClassName = location.pathname === '/' ? 'home' : ''
    const pageY = this.props.children.props.route.bindScroll ? this.state.pageY : null

    let classes = {
        name: 'app-container',
        modifiers: ['page']
    }

    return (
      <div className={cx(classes, { page: containerClassName })}>
        <HeaderMain isTop={this.state.pageY <= 10} currentPath={location.pathname} />
        <ReactCSSTransitionGroup
          component="div"
          className="page-container"
          transitionName="page-transition-"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={1000}>
          {React.cloneElement(children, {
            key: location.pathname,
            pageY: pageY
          })}
        </ReactCSSTransitionGroup>

        { this.props.modalIsOpen &&
          <Modal>{this.props.modalComponent}</Modal>
        }
      </div>
    )

    // const { location } = this.props
    // const { isModal } = this.state
    // const containerClassName = location.pathname === '/' ? 'home' : ''
    // const mainChildren = isModal ? this.previousChildren : this.props.children
    // return (
    //   <div className={cx(classes, { hasModal: isModal, page: containerClassName })}>
    //     <HeaderMain />
    //     <ReactCSSTransitionGroup
    //       component="div"
    //       className="page-container"
    //       transitionName="page-transition-"
    //       transitionEnterTimeout={500}
    //       transitionLeaveTimeout={500}
    //       transitionAppear={true}
    //       transitionAppearTimeout={1000}>
    //       {React.cloneElement(mainChildren, {
    //         key: location.pathname
    //       })}
    //     </ReactCSSTransitionGroup>
    //
    //     <ReactCSSTransitionGroup
    //       component='div'
    //       className='modal-container'
    //       transitionName='modal-transition-'
    //       transitionEnterTimeout={500}
    //       transitionLeaveTimeout={500}
    //       transitionAppear={true}
    //       transitionAppearTimeout={1000}>
    //       { isModal &&
    //         <Modal>{this.props.children}</Modal>
    //       }
    //     </ReactCSSTransitionGroup>
    //
    //     { this.props.modalIsOpen &&
    //       <Modal>{this.props.modalComponent}</Modal>
    //     }
    //   </div>
    // )
  }
}

function mapStateToProps (state, ownProps) {
    const {
      isOpen: modalIsOpen,
      component: modalComponent
    } = state.modal

    return {
        modalIsOpen,
        modalComponent
    }
}

export default connect(mapStateToProps)(App)
