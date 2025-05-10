import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function ManagerProfile() {
  return (
    <div><h3>ManagerProfile</h3>
    <ul className='nav justify-around'>
      <li className='nav-item'>
        <NavLink className='nav-link' to='assignmovie'>Assign movie</NavLink>
      </li>

    </ul>
    <Outlet></Outlet>
    </div>
  )
}

export default ManagerProfile