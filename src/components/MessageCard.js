import { useState, useEffect } from 'react';

const MessageCard = ({ message, inserted_at }) => {
  // message = "lianwiengioaiwbecabuwelcuiabwelfbalwjbvdlaebwclkjawbcjawebljkcbawlbvclajbvcjlabcjlhabcljhasbdjvbasvbdjldabvjbdvkasdjasvbdjhvbdhjvbd"
  
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const CHAR_LIMIT = 100;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
  };

  const toggleExpanded = () => setExpanded(prev => !prev);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const shouldTruncate = message.length > CHAR_LIMIT;
  const displayedMessage = expanded ? message : message.slice(0, CHAR_LIMIT);

  const formatTime = (t) =>
    new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="relative overflow-hidden flex-grow p-4 pr-10 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

      {/* Message text */}
      <pre className="whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200">
        {displayedMessage}
        {shouldTruncate && !expanded && '...'}
        {shouldTruncate && (
          <button
            onClick={toggleExpanded}
            className="mt-2 text-blue-500 hover:underline text-sm inline"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </pre>

      {/* Footer timestamps */}
      <div className="absolute bottom-3 left-4 right-4 text-xs text-gray-500 flex justify-between">
        <span>{formatTime(inserted_at)}</span>
        {/* <span>Expires: {formatTime(expires_at)}</span> */}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        aria-label="Copy text"
        className={`absolute top-3 right-3 p-1.5 rounded-md transition-all ${copied
            ? 'text-green-500 bg-green-50 dark:bg-green-900/20'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>

      {/* Copied indicator */}
      {copied && (
        <span className="absolute right-3 top-10 text-xs text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </div>
  );
};

export default MessageCard;
