import React from 'react'

const NavbarItem = ({title,classProp}) => {
    return<>
    <li className={`mx-4 cursor-pointer ${classProp}`}>
        {title}
    </li>
  </>
}

export default NavbarItem