import React from "react";

function Location({ locationStatus, coords }) {
    const isGranted = locationStatus === 'granted';

    const textColor = isGranted ? 'text-green-600' : 'text-red-600';
    const bgColor = isGranted ? 'bg-green-100' : 'bg-red-50';
    const status = isGranted? 'active' : locationStatus;

    return (
        <div className={`flex items-center space-x-2 text-sm ${textColor}`}>
            <div className={`flex items-center ${bgColor} ${textColor} px-3 py-1.5 rounded-full font-medium my-2`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>

                <span>{status}</span>
            </div>
        </div>
    );
}

export default Location;
