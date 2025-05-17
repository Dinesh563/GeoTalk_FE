import React from 'react';

const MessageCard2 = (item) => {
    return (
        <div className="flex flex-grow gap-4 items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-lg font-bold">
                {item.username ? item.username.charAt(0).toUpperCase() : 'A'}
            </div>

            <div className="flex-grow overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {item.username || 'Anonymous'}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.inserted_at
                            ? new Date(item.inserted_at).toLocaleTimeString([], {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                            })
                            : 'Just now'}
                    </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                    {item.content}
                </p>

                <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5 mr-1"
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
                        {item.latitude && item.longitude
                            ? `${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}`
                            : 'Location unknown'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MessageCard2;
