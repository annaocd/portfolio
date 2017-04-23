import React from 'react'
import { Link } from 'react-router'
import cx from 'bem-classnames'

import Logo from './Logo'
import '../../stylesheets/components/header-main.scss'

function HeaderMain (props) {
  let classes = {
      name: 'header-main',
      state: ['top']
  }

  return (
    <header className={cx(classes, { top: props.isTop })}>
      { props.currentPath === '/' ? (
        <Logo />
      ) : (
        <Link to='/' title='home' className='header-main__link'>
          <Logo />
        </Link>
      )}
    </header>
  )
}

export default HeaderMain
