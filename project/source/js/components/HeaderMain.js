import React from 'react'
import { Link } from 'react-router'

import '../../stylesheets/components/header-main.scss'

function HeaderMain (props) {
  return (
    <header className='header-main'>
      <h1>
        <Link to='/'>
          <span>a<i>n</i>na</span>
          <span>Yovandich</span>
        </Link>
      </h1>
    </header>
  )
}

export default HeaderMain
