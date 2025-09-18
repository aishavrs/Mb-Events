import React, { useState, useContext } from 'react';
import mbLogo from '../assets/mb-event-logo.png';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import { LuCalendarRange, LuLogOut, LuUserRoundPen, LuSettings, LuCircleHelp, LuChevronDown  } from "react-icons/lu";


export default function Header() {
  const location = useLocation();
  const {user, logout} = useContext(AuthContext)

  const getInitials = (fullName) => {
  if (!fullName) return "";

  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    // If only one name, take the first two letters
    return parts[0].slice(0, 2).toUpperCase();
  }

  // Otherwise take first letter of first name + first letter of last name
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

  const userMenuLinks = [
    {
      id: 1,
      content: "Your Events",
      to: "/",
      icon: <LuCalendarRange className='text-dark'/>

    },
    {
      id: 2,
      content: "Profile",
      to: "/",
      icon: <LuUserRoundPen  className='text-dark'/>

    },
    {
      id: 3,
      content: "Settings",
      to: "/",
      icon: <LuSettings  className='text-dark'/>

    },
    {
      id: 4,
      content: "Help",
      to: "/",
      icon: <LuCircleHelp  className='text-dark'/>

    }
  ]

  const UserMenu = () =>{
    const [isOpen, setIsOpen] = useState(false)
    const handleLogout = () =>{
      logout()
      setIsOpen(false)
    }
    return(
      <div className='flex gap-[10px]'>
            <div className="inline-flex items-center justify-center rounded-full border border-[#9747FF]
             bg-[#D9D9D9] w-16 h-16 text-2xl font-bold">{getInitials(user.fullName)}
            </div>
            <button onClick={()=> setIsOpen(!isOpen)}><LuChevronDown/> </button>
            {isOpen && (
              <div>
                {userMenuLinks.map((link)=>{
                  return <Link key={link.id} to={link.to}><span>{link.icon}</span>{link.content}</Link>
                })}
                <button onClick={handleLogout}><span className='text-red-600'><LuLogOut/></span></button>
              </div>)}

            </div>
    )
  }

  const links = [
    { id: 1, pathName: 'Home', to: '/' },
    { id: 2, pathName: 'Events', to: '/event' },
    { id: 3, pathName: 'Create event', to: '/create-event' },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-4 sm:px-6 lg:px-12">
        {/* --- Logo --- */}
        <a href="/">
          <img
            src={mbLogo}
            alt="Logo"
            className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 2xl:w-48 h-auto object-contain"
          />
        </a>

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

        <div className="hidden md:flex gap-4">
         {user ? <UserMenu /> : (<div className='flex gap-4'>
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
         </div>)}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-3xl text-[#9747FF] z-[60] relative"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

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
          {user ? (
            <UserMenu />) : (
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
