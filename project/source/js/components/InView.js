import React, { Component } from 'react'
import cx from 'bem-classnames'

class InView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isActive: false,
      style: {
        transform: `scale(1)`, //`translate(${motion.x}px, 0)`
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const halfWindowElem = Math.abs(window.innerHeight - this.refs.elem.offsetHeight) / 2
    const halfWindow = window.innerHeight / 2
    const bottomElem = this.refs.elem.offsetTop + this.refs.elem.offsetHeight
    const yDelta = this.refs.elem.offsetTop - nextProps.pageY

    if (yDelta <= (halfWindow/2) && (nextProps.pageY + (halfWindow/2)) < bottomElem && yDelta > -(halfWindowElem / 2)) {
    //if (yDelta <= halfWindow && (nextProps.pageY + halfWindow) < bottomElem && yDelta > -(halfWindowElem / 2)) {
      this.setState({
        isActive: true,
        style: {
          transform: `scale(1.05)`, //`translate(${motion.x}px, 0)`
        }
      })
    } else {
      this.setState({
        isActive: false,
        style: {
          transform: `scale(1)`, //`translate(${motion.x}px, 0)`
        }
      })
    }
  }

  render () {
    const { isActive, style } = this.state
    let classes = {
        name: this.props.className,
        state: ['hover']
    }

    return (
      <li className={cx(classes, { hover: isActive })} style={style} ref='elem'>
        {this.props.children}
      </li>
    )
  }
}

export default InView
