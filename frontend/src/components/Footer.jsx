import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer  className="bg-[#800000]  p-4 mt-5  text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between  text-sm">
        

        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">🎬 Cinema Booking</h2>
          <p className="text-white/90 mt-1">Book your favorite movies in seconds. Simple. Fast. Secure.</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5 text-xl gap-2">
          <FaFacebookF className="hover:text-white/80 cursor-pointer transition-transform hover:scale-110" />
          <FaTwitter className="hover:text-white/80 cursor-pointer transition-transform hover:scale-110" />
          <FaInstagram className="hover:text-white/80 cursor-pointer transition-transform hover:scale-110" />
          <FaGithub className="hover:text-white/80 cursor-pointer transition-transform hover:scale-110" />
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-white/70 md:text-right">
          &copy; {new Date().getFullYear()} Cinema Booking. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
