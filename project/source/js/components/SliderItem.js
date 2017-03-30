import React from 'react'
import cx from 'bem-classnames'

function SliderItem (props) {
  let classes = {
      name: 'slider__item',
      states: ['entering', 'exiting', 'pressed']
  }

  return (
    <li
      style={props.style}
      className={cx(classes, {entering: props.isEntering, exiting: props.isExiting, pressed: props.isPressed})}
      onMouseDown={props.onMouseDown}>
        {props.children}
    </li>
  )
}

export default SliderItem
