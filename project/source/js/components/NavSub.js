import React from 'react'
import { Link } from 'react-router'

// import '../../stylesheets/components/nav-sub.scss'

function NavSub (props) {
  return (
    <nav className='nav-sub'>
      {props.links.map((link, i) =>
        <Link to={link.to} className='nav-sub__link' activeClassName='nav-sub__link--active'>{link.label}</Link>
      )}
    </nav>
  )
}

export default NavSub
