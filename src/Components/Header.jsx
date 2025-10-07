import React, { useState, useContext } from 'react';
import mbLogo from '../assets/mb-event-logo.png';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import {
  LuCalendarRange,
  LuLogOut,
  LuUserRoundPen,
  LuSettings,
  LuCircleHelp,
  LuChevronDown,
} from "react-icons/lu";

export default function Header() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const getInitials = (fullName) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    return parts.length === 1
      ? parts[0].slice(0, 2).toUpperCase()
      : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const userMenuLinks = [
    { id: 1, content: "Your Events", to: "/yourevents", icon: <LuCalendarRange /> },
    { id: 2, content: "Profile", to: "/profile", icon: <LuUserRoundPen /> },
    { id: 3, content: "Settings", to: "/comingsoon", icon: <LuSettings /> },
    { id: 4, content: "Help", to: "/comingsoon", icon: <LuCircleHelp /> },
  ];

  const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
      logout();
      setIsOpen(false);
    };

    return (
      <div className="relative flex items-center gap-2">
        {/* Avatar */}
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#9747FF] overflow-hidden bg-[#D9D9D9]">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg sm:text-xl font-bold text-gray-800">
              {getInitials(user.fullName)}
            </span>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-gray-700 hover:text-[#9747FF] transition"
        >
          <LuChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 top-14 w-48 bg-white shadow-lg rounded-lg border border-gray-100 z-50">
            <ul className="flex flex-col divide-y divide-gray-100">
              {userMenuLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#9747FF] hover:text-white transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    {link.content}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition"
                >
                  <LuLogOut />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  const links = [
    { id: 1, pathName: 'Home', to: '/' },
    { id: 2, pathName: 'Events', to: '/event' },
    { id: 3, pathName: 'Create event', to: '/create-event' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="page-container flex justify-between items-center py-5">
        {/* Logo */}
        <Link to="/">
          <img
            src={mbLogo}
            alt="Logo"
            className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 2xl:w-48 h-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={
                location.pathname === link.to
                  ? 'text-lg underline text-[#9747FF] font-bold'
                  : 'text-lg'
              }
            >
              {link.pathName}
            </Link>
          ))}
        </nav>

        {/* Auth / User Menu */}
        <div className="hidden md:flex gap-4">
          {user ? <UserMenu /> : (
            <div className="flex gap-4">
              <Link
                to="/sign-up"
                className="rounded py-2 px-4 sm:py-3 sm:px-6 bg-[#9747FF] text-white"
              >
                Sign Up
              </Link>
              <Link
                to="/sign-in"
                className="rounded py-2 px-4 sm:py-3 sm:px-6 border border-[#9747FF] text-black"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-3xl text-[#9747FF] z-[60] relative"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-1/2 z-50 transform transition-transform duration-300
          ${menuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}
          bg-white shadow-lg
        `}
        role="dialog"
        aria-hidden={!menuOpen}
      >
        <div className="h-full flex flex-col gap-6 p-6">
          <nav className="flex flex-col gap-6 mt-12">
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                className={
                  location.pathname === link.to
                    ? 'text-lg underline text-[#9747FF] font-bold'
                    : 'text-lg'
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.pathName}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-6">
            {user ? <UserMenu /> : (
              <>
                <Link
                  to="/sign-up"
                  className="rounded py-2 px-4 bg-[#9747FF] text-white text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/sign-in"
                  className="rounded py-2 px-4 border border-[#9747FF] text-black text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
