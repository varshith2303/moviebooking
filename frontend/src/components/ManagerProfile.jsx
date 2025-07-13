import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function ManagerProfile() {
  return (
    <div>
    <ul className='nav justify-around'>
      <li className='nav-item m-5'>
        <NavLink className=' text-3xl' to='assignmovie'>Assign movie</NavLink>
      </li>

    </ul>
    <Outlet></Outlet>
    </div>
  )
}

export default ManagerProfile