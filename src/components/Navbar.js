import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Wallpaperz
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-900">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/admin" className="px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-900">
                  Admin
                </Link>
                <button
                  onClick={signOut}
                  className="px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-900"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-900">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
