import React from "react";
import Location from "./components/Location";

function Header(props) {
  return (
    <header className="bg-white shadow-md py-3 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-blue-600"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <h1 className="text-xl font-bold text-gradient">GeoTalk</h1>
        </div>
          <Location {...props} />
          </div>
    </header>
  );
}

export default Header;
