import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AdminProfile() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
      <div className="flex justify-center mb-6">
        <ul className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-xl shadow-md">
          <li>
            <NavLink
              to="addmovie"
              className={({ isActive }) =>
                `no-underline px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-100'
                }`
              }
            >
              Add Movie
            </NavLink>
          </li>
          <li>
            <NavLink
              to="addtheatre"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-100'
                }`
              }
            >
              Add Theatre
            </NavLink>
          </li>
          <li>
            <NavLink
              to="addmanager"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-100'
                }`
              }
            >
              Add Manager
            </NavLink>
          </li>
          <li>
            <NavLink
              to="assign"
              className={({ isActive }) =>
                `no-underline px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-100'
                }`
              }
            >
              Assign Theatre
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md bt-2">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminProfile;
