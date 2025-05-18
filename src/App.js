import './App.css';
import React, { useEffect, useState } from "react";
import Header from "./Header.js"
import Footer from './Footer';
import MessageList from './Messages';
import MessageSendBox from './MessageSendBox';
import AlertScroll from './components/AlertScroll';

function App() {
  const [locationStatus, setLocationStatus] = useState("loading");
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationStatus("granted");
      },
      (error) => {
        console.log(`Error: ${error.message}`)
        setLocationStatus(`denied`);
      }
    );
  }, []);

  return (
    <div className="App">
      <div>
        <Header locationStatus={locationStatus} coords={coords} />
        <AlertScroll message="Please note that the messages will be expired after 5 minutes" />
      </div>
      <MessageList locationStatus={locationStatus} coords={coords} setLocationPermission={setLocationStatus} messages={messages} setMessages={setMessages} />
      <MessageSendBox locationStatus={locationStatus} coordinates={coords} setLocationPermission={setLocationStatus} setMessages={setMessages} />
      <Footer />
    </div>
  );
}

export default App;
