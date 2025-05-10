import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import CheckoutPage from './CheckoutPage';
import CityDetector from './CityDetector';

function AdminProfile() {
  return (
    <div className='container'>
      <ul className='nav justify-content-around fs-3'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='addmovie'>Add Movie</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='addtheatre' className='nav-link'>Add Theatre</NavLink>

        </li>
        <li className='nav-item'>
          <NavLink to='addmanager' className='nav-link'>Add Manager</NavLink>

        </li>
        <li className='nav-item'>
          <NavLink to='assign' className='nav-link'>Assign Theatre</NavLink>
        </li>
      </ul>
      <CheckoutPage/>
      <CityDetector/>
      <Outlet></Outlet>
      </div>

  )
}

export default AdminProfile;