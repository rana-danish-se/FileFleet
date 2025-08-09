import React, { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Logo from './Logo';
import { navItems } from '@/utils/assets';
import { AppContext } from '@/context/AppContext';

const Sidebar = () => {
  const location = useLocation();
  const { userInfo } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  // Hide sidebar when menu item is clicked on mobile
  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  // Hamburger icon
  const Hamburger = (
    <button
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-gray-900 text-white"
      onClick={() => setIsOpen(true)}
      aria-label="Open sidebar"
    >
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-menu"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );

  // Sidebar overlay for mobile
  const Overlay = (
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={() => setIsOpen(false)}
    />
  );

  return (
    <>
      {Hamburger}
      {isOpen && Overlay}
      <div
        className={`h-full items-start flex flex-col w-[300px] shadow-md bg-gray-950 z-50
          fixed top-0 left-0 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:flex
        `}
        style={{ height: '100vh' }}
      >
        <div className=" py-4 flex items-center justify-between w-full">
          <Logo />
          {/* Close icon for mobile */}
          <button
            className="md:hidden p-2 rounded bg-gray-800 text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mt-10 flex flex-1 px-2 w-full">
          <ul className="flex flex-col gap-2 mt-4 w-full">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.url;
              return (
                <li key={index}>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-colors duration-200
                      ${
                        isActive
                          ? 'bg-gray-800 text-white font-semibold'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    onClick={handleMenuClick}
                  >
                    <img src={item.icon} alt={item.name} className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex w-full items-start justify-start gap-2 p-2">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-sm">
            {userInfo?.name?.slice(0, 1)}
          </div>
          <div className="flex flex-col text-sm text-gray-300">
            <span className="font-semibold">{userInfo?.name}</span>
            <span>{userInfo?.email}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
