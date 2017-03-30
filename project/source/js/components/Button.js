import React from 'react'
import cx from 'bem-classnames'

function Button (props) {
  let classes = {
      name: 'button',
      states: ['active']
  }

  return (
    <button onClick={props.onClick} className={cx(classes, {active: props.isActive})}>
      {props.children}
    </button>
  )
}

export default Button
