import React, { useEffect } from 'react';
import { useCity } from './context/CityContext.jsx' 
import { IoSearch } from "react-icons/io5";
import { LoginContext } from './context/LoginContext';
import { useContext } from 'react';
import img1 from '../assets/img1.jpg';
import { NavLink } from 'react-router-dom';

function Header() {
  const { city, setCity } = useCity(); // Using city from context
  const { login, setLogin, user, setUser } = useContext(LoginContext);

  
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

            setCity(detectedCity); // Set the detected city in context
          } catch (error) {
            console.error("Geolocation error:", error);
            setCity("Unable to detect");
          }
        },
        (error) => {
          console.error("Permission error:", error);
          setCity("Permission denied");
        }
      );
    } else {
      setCity("Geolocation not supported");
    }
  }, [setCity]);

  const logOut = () => {
    setLogin(false);
    setUser(null);
    console.log('Logout');
  };

  return (
    <div className='w-100 flex justify-between items-center border-b-red-500'>
      <img src={img1} alt='' className='mx-3 my-2' style={{height:"50px", width:"70px"}} />

      <div className="flex items-center border border-red-400 rounded-lg m-3 p-2 w-full max-w-md">
        <IoSearch className="text-red-400 text-xl mr-2" />
        <input
          type="text"
          placeholder="Search for movies"
          className="w-full px-2 py-1 outline-none"
        />
      </div>

      {/* Dropdown with both auto-detect and manual selection */}
      <select
        className="bg-transparent border rounded-md px-3 py-2 text-red-600"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      >
        {/* Auto-detected city will be shown as an option */}
        <option value={city}>{`📍 ${city}`}</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      <ul className='nav flex justify-end text-red-600 text-lg' type='none'>
        {login === false ? (
          <>
            <li className='nav-item m-3 cursor-pointer shadow rounded-b-md p-0 bg-red-400'>
              <NavLink className='nav-link' to='' style={{ color: "white" }}>Home</NavLink>
            </li>
            <li className='nav-item m-3 cursor-pointer shadow rounded-b-md bg-red-400'>
              <NavLink className='nav-link' to='signup' style={{ color: "white" }}>Sign up</NavLink>
            </li>
            <li className='nav-item m-3 cursor-pointer shadow rounded-b-md bg-red-400'>
              <NavLink className='nav-link' to='signin' style={{ color: "white" }}>Sign in</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <p className='fs-lead m-3' style={{ color: "red" }}>Hello, {user}</p>
            </li>
            <li className='nav-item m-3 cursor-pointer shadow rounded-b-md p-0 bg-red-400'>
              <NavLink className='nav-link' onClick={logOut} style={{ color: "white" }}>Logout</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
