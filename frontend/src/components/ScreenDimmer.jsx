import React, { useState } from 'react';
import './styles/dimming.css';

const ScreenDimmer = () => {
  const [isDimming, setIsDimming] = useState(false);

  // Function to toggle dimming effect
  const startDimming = () => {
    setIsDimming(true);
  };

  const stopDimming = () => {
    setIsDimming(false);
  };

  return (
    <div className="dimmer-container">
        <div className="dim-btns">
        <button onClick={startDimming}>Start Dimming</button>
        <button onClick={stopDimming}>Stop Dimming</button>
        </div>
      <div className={`dim-overlay ${isDimming ? 'dim' : ''}`}></div>
    </div>
  );
};

export default ScreenDimmer;
