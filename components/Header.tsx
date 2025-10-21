import React, { useState } from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import type { NavLink } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useSiteContent } from '../contexts/SiteContentContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const { currentUser, logout } = useAuth();
  const { siteContent } = useSiteContent();
  const { navLinks } = siteContent;

  const linkClasses = "block py-2 px-3 text-slate-300 rounded hover:bg-slate-700/50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0 transition-colors duration-200";
  const activeLinkClasses = "text-yellow-400 font-semibold md:bg-transparent";

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  }

  const handleLogout = () => {
    logout();
    closeAllMenus();
  }
  
  const toggleMainMenu = () => {
    if (isMenuOpen) {
      setOpenMobileDropdown(null);
    }
    setIsMenuOpen(!isMenuOpen);
  }


  return (
    <>
      <header className="bg-slate-900/50 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-slate-700/50">
        <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-4 rtl:space-x-reverse" onClick={closeAllMenus}>
            <div className="flex items-center space-x-2.5">
                <img src={siteContent.conferenceLogo} alt="Conference Logo" className="w-[50px] md:w-[60px] h-auto rounded-md object-contain" />
                <img src={siteContent.universityLogo} alt="University Logo" className="w-[50px] md:w-[60px] h-auto rounded-md object-contain" />
            </div>
            <div className="text-left">
                <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-slate-100 uppercase">HỘI THẢO QUỐC TẾ</h1>
                <h2 className="text-sm sm:text-base md:text-xl font-semibold text-slate-300 uppercase">DIỄN ĐÀN VĂN HOÁ VÀ GIÁO DỤC MÙA THU LẦN THỨ HAI</h2>
                <h3 className="text-xs sm:text-sm md:text-lg italic text-slate-400 font-serif">Chủ đề: "Phát triển văn hoá và giáo dục sáng tạo trong kỷ nguyên số"</h3>
            </div>
          </Link>

          <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
             {currentUser ? (
              <div className="flex items-center gap-4 text-sm">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-slate-100">Welcome, {currentUser.username}</p>
                  <p className="text-xs text-amber-400 capitalize">{currentUser.role}</p>
                </div>
                <button onClick={handleLogout} className="text-white font-medium rounded-lg text-sm px-4 py-2 text-center bg-red-600 hover:bg-red-700 transition-colors">
                    Logout
                </button>
              </div>
            ) : (
                 <div className="h-9"></div> // Placeholder to maintain layout height
            )}
            <button
              onClick={toggleMainMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
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
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-slate-700 rounded-lg bg-slate-800/80 md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
              {navLinks.map((link: NavLink) => {
                if (link.path === '/admin' && currentUser?.role !== 'admin') {
                  return null;
                }
                
                if (link.children) {
                  const isMobileDropdownOpen = openMobileDropdown === link.name;
                  return (
                    <li key={link.id} className="relative group">
                      <button
                        onClick={() => setOpenMobileDropdown(isMobileDropdownOpen ? null : link.name)}
                        className="w-full flex items-center justify-between py-2 px-3 text-slate-300 rounded hover:bg-slate-700/50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0 transition-colors duration-200"
                        aria-haspopup="true"
                        aria-expanded={isMobileDropdownOpen}
                      >
                        {link.name}
                        <svg className="w-2.5 h-2.5 ms-2.5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                      </button>
                      
                      {/* Desktop Dropdown */}
                      <div className="absolute top-full left-0 z-20 w-56 hidden group-hover:block bg-slate-800 rounded-lg shadow-lg border border-slate-700 mt-1">
                          <ul className="py-2 text-sm text-slate-300" aria-label={link.name}>
                              {link.children.map((child) => (
                                  <li key={child.id}>
                                      <RouterNavLink to={child.path!} className={({ isActive }) => `block px-4 py-2 hover:bg-slate-700 ${isActive ? 'text-yellow-400' : ''}`} onClick={closeAllMenus}>
                                          {child.name}
                                      </RouterNavLink>
                                  </li>
                              ))}
                          </ul>
                      </div>

                      {/* Mobile Dropdown */}
                      {isMobileDropdownOpen && (
                          <div className="pt-2 ps-4 md:hidden">
                              <ul className="space-y-2">
                                  {link.children.map((child) => (
                                      <li key={child.id}>
                                          <RouterNavLink to={child.path!} className={({ isActive }) => `block px-4 py-2 rounded-lg hover:bg-slate-700 ${isActive ? 'text-yellow-400 bg-slate-700' : ''}`} onClick={closeAllMenus}>
                                              {child.name}
                                          </RouterNavLink>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={link.id}>
                    <RouterNavLink
                      to={link.path!}
                      className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                      onClick={closeAllMenus}
                    >
                      {link.name}
                    </RouterNavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
