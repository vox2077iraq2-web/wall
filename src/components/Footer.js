import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">
          &copy; {new Date().getFullYear()} Wallpaperz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
