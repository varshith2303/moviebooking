import React from "react";
import { FaBars } from "react-icons/fa";

const H1 = () => {
  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">
          book<span className="text-red-600">my</span>show
        </span>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search for Movies, Events, Plays, Sports and Activities"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Right: Location & Sign In */}
      <div className="flex items-center space-x-4">
        <select className="bg-transparent border rounded px-3 py-1">
          <option>Hyderabad</option>
          <option>Delhi</option>
          <option>Mumbai</option>
        </select>
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Sign in
        </button>
        
      </div>
    </header>
  );
};

export default H1;
