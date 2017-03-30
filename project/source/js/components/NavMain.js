import React from 'react'
import { Link } from 'react-router'

import '../../stylesheets/components/nav-main.scss'

function NavMain (props) {
  return (
    <nav className='nav-main rendered'>
      <Link to='/' className='nav-main__link' activeClassName='nav-main__link--active'>about</Link>
      <Link to='/cv' className='nav-main__link' activeClassName='nav-main__link--active'>cv</Link>
      <Link to='/experiments' className='nav-main__link' activeClassName='nav-main__link--active'>experiments</Link>
    </nav>
  )
}

export default NavMain
