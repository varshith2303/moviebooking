import React, { useEffect, useContext, useState } from 'react';
import { useCity } from './context/CityContext.jsx';
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { LoginContext } from './context/LoginContext';
import img1 from '../assets/img1.jpg';
import { NavLink } from 'react-router-dom';

function Header() {
  const { city, setCity } = useCity();
  const { login, setLogin, user, setUser, role, setRole } = useContext(LoginContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const detectedCity =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state;
            setCity(detectedCity);
          } catch {
            setCity("Unable to detect");
          }
        },
        () => setCity("Permission denied")
      );
    } else {
      setCity("Geolocation not supported");
    }
  }, [setCity]);

  const logOut = () => {
    setLogin(false);
    setUser(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center border-none px-4 py-2 gap-3">
      
      {/* Left section (Logo + Search + City) */}
      <div className="flex justify-between items-center w-full md:w-auto">
        {/* Logo */}
        <img src={img1} alt="logo" className="h-12 w-16 object-cover" />

        {/* Hamburger Icon (only on mobile) */}
        <button
          className="md:hidden text-red-600 text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Search bar (hidden on very small screens, visible on md+) */}
      <div className="hidden md:flex items-center border border-red-400 rounded-lg px-2 py-1 w-full md:w-1/3">
        <IoSearch className="text-red-400 text-xl mr-2" />
        <input
          type="text"
          placeholder="Search for movies"
          className="w-full px-2 py-1 outline-none text-sm"
        />
      </div>

      {/* City Dropdown (always visible) */}
      <div className="flex justify-center md:justify-start  md:mt-0">
        <select
          className="bg-transparent border rounded-md px-3 py-2 text-red-600 text-sm"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        >
          <option value={city}>{`📍 ${city}`}</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>

      {/* Nav Links (responsive) */}
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:items-center md:gap-5 text-red-800 text-lg mt-2 md:mt-0`}
      >
        {login === false ? (
          <>
            <li className="m-1 md:m-0 cursor-pointer nav-item shadow rounded-b-md bg-red-500 text-center">
              <NavLink className="block px-3 py-2 text-white nav-link" to="">Home</NavLink>
            </li>
            <li className="m-1 md:m-0 cursor-pointer shadow rounded-b-md nav-item w-auto bg-red-500 text-center flex-none">
              <NavLink className="block px-3 py-2 text-white nav-link" to="signup">Sign up</NavLink>
            </li>
            <li className="m-1 md:m-0 cursor-pointer shadow rounded-b-md nav-item bg-red-500 text-center flex-none">
              <NavLink className="block px-3 py-2 text-white nav-link" to="signin">Sign in</NavLink>
            </li>
          </>
        ) : (
          <>
            {role === 'user' && (
              <li className="m-1 md:m-0 nav-item">
                <NavLink
                  to="/bookings"
                  className="px-3 py-2  bg-blue-500 text-white underline-offset-3 rounded-md block text-center"
                >
                  View Past Bookings
                </NavLink>
              </li>
            )}
            <li>
              <p className="m-2 text-red-600 text-center md:text-left">Hello, {user}</p>
            </li>
            <li className="m-1 md:m-0 cursor-pointer shadow rounded-b-md bg-red-500 text-center nav-item">
              <NavLink onClick={logOut} className="block px-3 py-2 text-white nav-link">
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
