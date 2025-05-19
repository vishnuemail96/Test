import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser(); // Make sure this function exists
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 px-4">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo1.png" alt="Logo" className="h-14 w-auto" />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center text-gray-800 text-[16px] font-medium space-x-12">
          <li><a href="/" className="hover:text-[#FFB703]">Home</a></li>
          <li className="relative group">
            <a href="/courses" className="flex items-center hover:text-[#FFB703]">
              All Courses <FaArrowDown className="ml-1 text-sm" />
            </a>
            <ul className="absolute top-full left-0 mt-2 hidden group-hover:flex flex-col bg-white shadow-lg rounded-lg py-2 w-64 z-30 border border-gray-200">
              <li><a href="/courses/data" className="px-4 py-2 hover:bg-gray-100 hover:text-[#FFB703]">AI & ML</a></li>
              <li><a href="/courses/web" className="px-4 py-2 hover:bg-gray-100 hover:text-[#FFB703]">Full Stack Web Dev</a></li>
              <li><a href="/courses/cloud" className="px-4 py-2 hover:bg-gray-100 hover:text-[#FFB703]">Cloud Computing</a></li>
            </ul>
          </li>
          <li><a href="/services" className="hover:text-[#FFB703]">Services</a></li>
          <li><a href="/resources" className="hover:text-[#FFB703]">Resources</a></li>

          {!isLoggedIn ? (
            <>
              <li><a href="/login" className="px-6 py-3 border rounded-md hover:bg-gray-100">Login</a></li>
              <li><a href="/register" className="px-6 py-3 bg-[#FFB703] text-white rounded-md hover:bg-yellow-500">Register</a></li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div
          className="lg:hidden text-black text-2xl cursor-pointer p-3 rounded-md hover:bg-gray-100 transition"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white px-6 pb-6 pt-4 border-t shadow-lg rounded-b-xl">
          <ul className="flex flex-col text-gray-800 text-[15px] font-medium space-y-4">
            <li><a onClick={closeMenu} href="/">Home</a></li>
            <li><a onClick={closeMenu} href="/courses">Courses</a></li>
            <li><a onClick={closeMenu} href="/services">Services</a></li>
            <li><a onClick={closeMenu} href="/resources">Resources</a></li>
            {!isLoggedIn ? (
              <>
                <li><a onClick={closeMenu} href="/login">Login</a></li>
                <li>
                  <a
                    onClick={closeMenu}
                    href="/signup"
                    className="bg-[#FFB703] text-white px-3 py-2 rounded"
                  >
                    Sign Up
                  </a>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="text-red-500 px-3 py-2 border rounded"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
