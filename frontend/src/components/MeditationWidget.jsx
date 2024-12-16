import React, { useState, useEffect } from 'react';
import './styles/yoga.css';


//Glass card for medtion time

function MeditationWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getMeditationTitle = () => {
    const currentHour = currentDate.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Morning meditation';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Afternoon meditation';
    } else if (currentHour >= 18 && currentHour < 21) {
        return 'Evening meditation';
      } else {
        return 'Night meditation';
      }
  };

  const getMeditationTime = () => {
    const startTime = new Date(currentDate);
    const endTime = new Date(currentDate);
    endTime.setMinutes(startTime.getMinutes() + 20);

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const meditationTime = getMeditationTime();
  const meditationTitle = getMeditationTitle();

  return (
    <div className="meditation-widget">
      <div className="meditation-header">
        <p className="meditation-date">{formatDate(currentDate)}</p>
        <div className="meditation-icon">
          <span role="img" aria-label="yoga">🧘🏻‍♀️</span>
        </div>
      </div>
      <div className="meditation-content">
        <h1 className="meditation-day">{dayOfWeek}</h1>
        <p className="meditation-time">{meditationTime} <span>(20 mins)</span></p>
        <p className="meditation-title">{meditationTitle}</p>
      </div>
    </div>
  );
}

export default MeditationWidget;
