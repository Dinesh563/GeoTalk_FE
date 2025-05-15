import './App.css';
import React, { useEffect, useState } from "react";
import Header from "./Header.js"
import Footer from './Footer';
import MessageList from './Messages';
import MessageSendBox from './MessageSendBox';

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
      <Header locationStatus={locationStatus} coords={coords}/>
      <MessageList locationStatus={locationStatus} coords={coords} setLocationStatus={setLocationStatus}/>
      <MessageSendBox />
      <Footer />
    </div>
  );
}

export default App;
