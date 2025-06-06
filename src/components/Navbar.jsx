import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowDown, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx";
import useAxios from "../hooks/useAxios";
import { clearRefresh } from "../utils/token";
import React from "react";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesMenuOpen, setCoursesMenuOpen] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);
  const axios = useAxios();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(auth.access);

  /* ─── Handlers ────────────────────────────────────────────────── */
  const toggleMenu = () => setMenuOpen((p) => !p);
  const closeMenu = () => {
    setMenuOpen(false);
    setCoursesMenuOpen(false);
  };
  const toggleCoursesMenu = () => setCoursesMenuOpen((p) => !p);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout/", { refresh: auth.refresh });
    } catch (_) {
      // swallow – we still clear local state below
    } finally {
      clearRefresh();
      setAuth({ user: null, access: null, refresh: null });
      navigate("/login", { replace: true });
    }
  };

  /* ─── JSX ─────────────────────────────────────────────────────── */
  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo1.png" alt="Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center text-gray-800 text-[16px] font-medium space-x-12">
          <li>
            <Link to="/" className="hover:text-[#FFB703]">
              Home
            </Link>
          </li>

          {/* Courses dropdown */}
          <li className="relative group">
            <div className="flex items-center">
              <Link to="/courses" className="hover:text-[#FFB703]">
                All Courses
              </Link>
              <button onClick={toggleCoursesMenu} className="ml-1 text-sm focus:outline-none">
                <FaArrowDown />
              </button>
            </div>
            {(coursesMenuOpen || true) && (
              <ul className="absolute top-full left-0 mt-2 flex flex-col bg-white shadow-lg rounded-lg py-2 w-64 z-30 border border-gray-200 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible">
                {[
                  { label: "AI & ML", to: "/courses" },
                  { label: "Full Stack Web Dev", to: "/courses" },
                  { label: "Cloud Computing", to: "/courses" },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="px-4 py-2 hover:bg-gray-100 hover:text-[#FFB703]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link to="/services" className="hover:text-[#FFB703]">
              Services
            </Link>
          </li>
          <li>
            <Link to="/resources" className="hover:text-[#FFB703]">
              Resources
            </Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login" className="px-6 py-3 border rounded-md hover:bg-gray-100">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="px-6 py-3 bg-[#FFB703] text-white rounded-md hover:bg-yellow-500">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile burger */}
        <div className="lg:hidden text-black text-2xl cursor-pointer p-3 rounded-md hover:bg-gray-100 transition" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white px-6 pb-6 pt-4 border-t shadow-lg rounded-b-xl">
          <ul className="flex flex-col text-gray-800 text-[15px] font-medium space-y-4">
            <li>
              <Link onClick={closeMenu} to="/">
                Home
              </Link>
            </li>

            {/* Mobile Courses Dropdown */}
            <li className="relative">
              <div className="flex justify-between items-center">
                <span
                  className="cursor-pointer hover:text-[#FFB703]"
                  onClick={() => {
                    closeMenu();
                    navigate("/courses");
                  }}
                >
                  All Courses
                </span>
                <FaArrowDown className="ml-2 cursor-pointer" onClick={toggleCoursesMenu} />
              </div>
              {coursesMenuOpen && (
                <ul className="mt-2 pl-4 border-l border-gray-200">
                  {[
                    { label: "AI & ML", to: "/courses" },
                    { label: "Full Stack Web Dev", to: "/courses" },
                    { label: "Cloud Computing", to: "/courses" },
                  ].map(({ label, to }) => (
                    <li key={label}>
                      <Link to={to} className="block py-2 hover:text-[#FFB703]" onClick={closeMenu}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link onClick={closeMenu} to="/services">
                Services
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} to="/resources">
                Resources
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <Link onClick={closeMenu} to="/login" className="block px-6 py-3 border rounded-md hover:bg-gray-100 text-center">
                    Login
                  </Link>
                </li>
                <li>
                  <Link onClick={closeMenu} to="/register" className="block px-6 py-3 bg-[#FFB703] text-white rounded-md hover:bg-yellow-500 text-center">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => { closeMenu(); handleLogout(); }} className="block text-red-500 px-6 py-3 border rounded-md w-full text-center">
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
