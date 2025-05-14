import React, { useState, useEffect } from 'react';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationPermission, setLocationPermission] = useState('pending'); // 'granted', 'denied', 'pending'
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  // Request location permission and fetch coordinates
  useEffect(() => {
    const getLocation = async () => {
      try {
        if (!navigator.geolocation) {
          setLocationPermission('unavailable');
          setError('Geolocation is not supported by your browser');
          return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            setLocationPermission('granted');
            fetchMessages(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error('Location error:', error);
            setLocationPermission('denied');
            setIsLoading(false);

            
            setError('Location permission denied. Please allow location access to see messages.');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
      } catch (error) {
        console.error('Location error:', error);
        setLocationPermission('error');
        setIsLoading(false);
        setError('An error occurred while getting your location.');
      }
    };

    getLocation();
  }, []);

  // Fetch messages from API
  const fetchMessages = async (latitude, longitude) => {
    try {
      setIsLoading(true);
      // Use the coordinates in the API call
      const response = await fetch(`https://localhost:8443/GetMsgs?latitude=${latitude}&longitude=${longitude}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Retry getting location
  const retryLocationPermission = () => {
    setLocationPermission('pending');
    setError(null);
    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLocationPermission('granted');
        fetchMessages(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Location retry error:', error);
        setLocationPermission('denied');
        setIsLoading(false);
        setError('Location permission still denied. Please check your browser settings.');
      }
    );
  };

  // Manual refresh button handler
  const handleRefresh = () => {
    if (locationPermission === 'granted' && coordinates.latitude && coordinates.longitude) {
      fetchMessages(coordinates.latitude, coordinates.longitude);
    } else {
      retryLocationPermission();
    }
  };

  // Define keyframe animations for Tailwind
  // Add this to your global CSS or use a package like tailwindcss-animate
  const fadeInAnimation = "animate-[fadeIn_0.5s_ease-out_forwards]";
  const spinAnimation = "animate-[spin_1s_ease-in-out_infinite]";

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 m-8 mx-auto max-w-[90%] w-[700px] min-h-[300px] rounded-xl shadow-lg bg-gradient-to-r from-indigo-700 to-blue-500 text-white text-center">
        <div className="w-12 h-12 mb-6 border-4 border-white/30 rounded-full border-t-white animate-spin"></div>
        <h2 className="text-2xl font-bold mb-2">Loading Messages</h2>
        <p className="text-white/80">Fetching nearby messages for you...</p>
      </div>
    );
  }

  // Render location permission denied state
  if (locationPermission === 'denied' || locationPermission === 'unavailable') {
    return (
      <div className="flex flex-col items-center justify-center p-8 m-8 mx-auto max-w-[90%] w-[700px] min-h-[300px] rounded-xl shadow-lg bg-gradient-to-r from-red-300 to-pink-200 text-pink-900 text-center">
        <div className="mb-4 text-pink-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Location Access Required</h2>
        <p className="mb-4">{error || 'Unable to show messages as location access is not granted.'}</p>
        <button 
          className="px-6 py-3 mt-4 bg-white rounded-lg shadow-md font-semibold text-pink-800 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          onClick={retryLocationPermission}
        >
          Grant Access
        </button>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 m-8 mx-auto max-w-[90%] w-[700px] min-h-[300px] rounded-xl shadow-lg bg-gradient-to-r from-red-500 to-red-400 text-white text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Something Went Wrong</h2>
        <p className="mb-4">{error}</p>
        <button 
          className="px-6 py-3 mt-4 bg-white rounded-lg shadow-md font-semibold text-red-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          onClick={handleRefresh}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Render empty state
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 m-8 mx-auto max-w-[90%] w-[700px] min-h-[300px] rounded-xl shadow-lg bg-gradient-to-r from-blue-300 to-blue-200 text-blue-900 text-center">
        <div className="text-5xl mb-4">📭</div>
        <h2 className="text-2xl font-bold mb-2">No Messages Found</h2>
        <p className="mb-4">There are no messages in your area yet. Be the first to leave one!</p>
        <button 
          className="px-6 py-3 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md font-semibold text-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
    );
  }

  // Render messages
  return (
    <div className="max-w-3xl mx-auto w-[90%] my-8">
      <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500">
          Messages Near You
        </h2>
        
        <div className="flex items-center bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium my-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Location active</span>
        </div>
        
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto justify-center mt-2 sm:mt-0"
          onClick={handleRefresh}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
            <path d="M21 3v5h-5"></path>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
            <path d="M3 21v-5h5"></path>
          </svg>
          Refresh
        </button>
      </div>
      
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div 
            key={message.id || index} 
            className="flex gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-lg font-bold">
              {message.username ? message.username.charAt(0).toUpperCase() : 'A'}
            </div>
            
            <div className="flex-grow overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">{message.username || 'Anonymous'}</h3>
                <span className="text-xs text-gray-500">
                  {message.timestamp ? new Date(message.timestamp).toLocaleString() : 'Just now'}
                </span>
              </div>
              
              <p className="text-gray-700 whitespace-pre-wrap break-words">
                {message.content}
              </p>
              
              <div className="flex items-center mt-3 text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>
                  {message.latitude && message.longitude 
                    ? `${message.latitude.toFixed(4)}, ${message.longitude.toFixed(4)}`
                    : 'Location unknown'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;