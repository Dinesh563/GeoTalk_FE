import './App.css';
import React, { useEffect, useState } from "react";
import Header from "./Header.js"
import Footer from './Footer';
import MessageList from './Messages';
import MessageSendBox from './MessageSendBox';
import MessageCard from './components/MessageCard';
import AlertScroll from './components/AlertScroll';

function App() {
  const [locationStatus, setLocationStatus] = useState("Loading");
  const [coords, setCoords] = useState({ lat: null, lon: null });

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
      <Header locationStatus={locationStatus} coords={coords} />
      <AlertScroll message="Please note that the messages will be expired after 5 minutes"/>
      <MessageList locationStatus={locationStatus} coords={coords} setLocationPermission={setLocationStatus} />
      <MessageSendBox />
      <Footer />
    </div>
  );
}

export default App;
