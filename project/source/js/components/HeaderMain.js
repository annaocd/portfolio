import React from 'react'
import { Link } from 'react-router'
import cx from 'bem-classnames'

import '../../stylesheets/components/header-main.scss'

function HeaderMain (props) {
  let classes = {
      name: 'header-main',
      state: ['top']
  }

  return (
    <header className={cx(classes, { top: props.isTop })}>
    <Link to='/'>
      <h1>
        <span>а<i>n</i>na</span>
        <span>Yovandich</span>
      </h1>
    </Link>
    </header>
  )
}

export default HeaderMain
