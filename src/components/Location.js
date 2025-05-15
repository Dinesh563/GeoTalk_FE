import React from "react";

function Location({ locationStatus, coords }) {
    return (
        <div className="flex items-center space-x-2 text-green-600 text-sm">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
            <span>
                {locationStatus}
                {coords.lat != null &&
                    `: ${coords.lat.toFixed(2)}, ${coords.lon.toFixed(2)}`}
            </span>
        </div>
    );
}

export default Location;
