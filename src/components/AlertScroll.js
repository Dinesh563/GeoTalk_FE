import React from 'react';

const AlertScroll = ({ message }) => {
  return (
    <div className="w-full overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="animate-fadeIn">
        <span className="inline-block px-4 py-2 text-yellow-800 dark:text-yellow-100 font-medium text-sm">
          🔔 {message}
        </span>
      </div>
    </div>
  );
};

export default AlertScroll;
