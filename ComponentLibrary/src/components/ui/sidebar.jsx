// Sidebar.jsx
import React from "react";
import { HomeIcon, UserIcon, LogOutIcon, BookOpenIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isAuthenticated, onLogout, isVisible }) => {
  return (
    <div
      className={`fixed z-50 w-64 h-full bg-black border-r border-gray-200 border-opacity-50 text-gray-100 flex flex-col
        transform transition-transform duration-300
        ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex-1 mt-8 space-y-2">
        <NavLink
          to="/"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 transition-colors duration-150"
        >
          <HomeIcon className="mr-3 h-5 w-5" />
          Home
        </NavLink>
        {!isAuthenticated && (
          <>
            <NavLink
              to="/login"
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 transition-colors duration-150"
            >
              <UserIcon className="mr-3 h-5 w-5" />
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 transition-colors duration-150"
            >
              <UserIcon className="mr-3 h-5 w-5" />
              Register
            </NavLink>
          </>
        )}
        {isAuthenticated && (
          <>
            {/* <NavLink
              to="/account"
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 transition-colors duration-150"
            >
              <UserIcon className="mr-3 h-5 w-5" />
              Account
            </NavLink> */}
            <NavLink
              to="/components/library"
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 transition-colors duration-150"
            >
              <BookOpenIcon className="mr-3 h-5 w-5" />
              My Library
            </NavLink>
            <button
              onClick={onLogout}
              className="flex items-center w-full px-4 py-2 text-gray-100 hover:bg-gray-700 transition-colors duration-150"
            >
              <LogOutIcon className="mr-3 h-5 w-5" />
              Logout
            </button>
          </>
        )}
      </div>
      {isAuthenticated && (
        <div className="mt-auto p-4">
          <NavLink
            to="/account"
            className="flex items-center space-x-2 text-gray-100 hover:bg-gray-700 transition-colors duration-150 px-4 py-2"
          >
            <UserIcon className="h-6 w-6" />
            <span>Account</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
