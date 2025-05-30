import React, { useState, useRef, useEffect } from 'react';
import { PostMessageAPI } from './backend/api';

const MessageSendBox = ({ locationStatus, coordinates, setMessages }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const textareaRef = useRef(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);


  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type }), 3000);
  };

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      setIsLoading(true);

      const payload = {
        latitude: coordinates.lat,
        longitude: coordinates.lon,
        message: message.trim()
      };

      const res = await PostMessageAPI(payload)

      setMessages((prev) => [res, ...prev])
      showToast('Message published successfully! 🚀', 'success');

      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showToast('Failed to send message.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const renderLocationStatus = () => {
    switch (locationStatus) {
      case 'loading':
        return (
          <div className="flex items-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-xs">loading location...</span>
          </div>
        );
      case 'granted':
        return (
          <div className="flex items-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-xs">Location: active</span>
          </div>
        );
      case 'denied':
        return (
          <div className="flex items-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-xs">Location: denied</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (

    <>
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-sm font-medium transition-all duration-300
        ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.message}
        </div>
      )}

      <div className="rounded-lg bottom-0 bg-white dark:bg-gray-900 px-4 pb-6 pt-4 z-10 w-full max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700 transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none overflow-hidden transition-all duration-300 min-h-[100px]"
                style={{ maxHeight: '200px' }}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {message.length} / 500
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {renderLocationStatus()}
                <div className="hidden sm:block text-xs text-gray-400">
                  {message.length > 400 && <span className="text-amber-500">{500 - message.length} chars left</span>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || locationStatus !== 'granted' || !message.trim()}
                className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 ${isLoading || locationStatus !== 'granted' || !message.trim() || message.length > 500
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transform'
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z"></path>
                      <path d="M22 2 11 13"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageSendBox;
