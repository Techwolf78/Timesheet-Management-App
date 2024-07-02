import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ user }) => {
  const location = useLocation();

  const showLoginButton =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-300 to-purple-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <span className="text-white text-xl font-bold">ShiftSync</span>
            </Link>
          </div>
          {showLoginButton && (
            <div className="flex items-center">
              <Link to="/login">
                <button className="bg-white text-indigo-500 px-4 py-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
