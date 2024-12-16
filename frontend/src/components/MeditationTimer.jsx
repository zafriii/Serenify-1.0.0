import React, { useState, useEffect, useRef } from "react";
import './styles/meditation.css'

const MeditationTimer = () => {
    const [timeLeft, setTimeLeft] = useState(0); // Store remaining time in seconds
    const [isActive, setIsActive] = useState(false); // Track if the timer is running
    const [selectedTime, setSelectedTime] = useState(0); // User selected session duration
    const audioStartRef = useRef(null); // Reference for start sound
    const audioEndRef = useRef(null); // Reference for end sound

    // Handle session duration selection
    const handleTimeSelect = (minutes) => {
        setSelectedTime(minutes * 60); 
        setTimeLeft(minutes * 60);
        setIsActive(false);
    };

    // Start the meditation session
    const startMeditation = () => {
        if (selectedTime > 0) {
            setIsActive(true);
            audioStartRef.current.play(); // Play start sound
        }
    };

    // Timer countdown logic
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            audioEndRef.current.play(); // Play end sound
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Function to format time display
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="meditation-timer">
            <p>You can also Select our fixed Meditation Session Duration</p>
            <div className="timer-controls">
                <button onClick={() => handleTimeSelect(5)}>5 Minutes</button>
                <button onClick={() => handleTimeSelect(10)}>10 Minutes</button>
                <button onClick={() => handleTimeSelect(15)}>15 Minutes</button>
                <button onClick={() => handleTimeSelect(20)}>20 Minutes</button>
            </div>

            {selectedTime > 0 && (
                <>                   
                    <div className="display-btn">

                    <button className="display" onClick={startMeditation} disabled={isActive}>
                        {isActive ? "Meditation in Progress" : "Start Meditation"}
                    </button>
                    <div className="time-display">
                        <p>Time Left: {formatTime(timeLeft)}</p>
                    </div>

                    </div>
                                     
                </>
            )}

            <audio ref={audioStartRef} src="alert.mp3" preload="auto" />
            <audio ref={audioEndRef} src="alert.mp3" preload="auto" />
        </div>
    );
};

export default MeditationTimer;
