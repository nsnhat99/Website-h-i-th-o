import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS, CONFERENCE_TITLE } from '../constants';
import type { NavLink as NavLinkType } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const linkClasses = "block py-2 px-3 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 transition-colors duration-200";
  const activeLinkClasses = "text-white bg-blue-600 md:bg-transparent md:text-blue-400";

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  }

  return (
    <>
      <header className="bg-slate-900/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://picsum.photos/seed/logo1/40/40" className="h-10 rounded-full" alt="Conference Logo" />
            <img src="https://picsum.photos/seed/logo2/40/40" className="h-10 rounded-full" alt="University Logo" />
            <span className="self-center text-sm sm:text-lg font-semibold whitespace-nowrap text-white hidden md:block">{CONFERENCE_TITLE}</span>
          </Link>

          <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
             {currentUser ? (
              <div className="flex items-center gap-4 text-sm">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-white">Welcome, {currentUser.username}</p>
                  <p className="text-xs text-yellow-400 capitalize">{currentUser.role}</p>
                </div>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white font-medium rounded-lg text-sm px-4 py-2 text-center bg-red-600 hover:bg-red-700 transition-colors">
                    Logout
                </button>
              </div>
            ) : (
                 <div className="h-9"></div> // Placeholder to maintain layout height
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto md:order-1`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-slate-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
              {NAV_LINKS.map((link: NavLinkType) => {
                if(link.path === '/admin' && currentUser?.role !== 'admin') {
                  return null;
                }
                return (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              )})}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;