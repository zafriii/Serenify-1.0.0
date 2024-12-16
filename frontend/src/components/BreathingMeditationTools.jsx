import React, { useState, useEffect, useRef } from 'react';
import './styles/breathingMeditationTools.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BreathingMeditationTools = () => {

    const [animationState, setAnimationState] = useState('');
    const [text, setText] = useState('Click Start to begin'); // Initial text before breathing starts
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [breathCount, setBreathCount] = useState(0); // Track breath cycles

    const audioStartRef = useRef(null); // Reference for start sound
    
    //Breath in & out process

    const breatheInOut = () => {
        setText('Breathe In!');
        setAnimationState('grow');

        setTimeout(() => {
            setText('Breathe Out!');
            setAnimationState('shrink');
        }, 4000); // Time for breathe in

        setTimeout(() => {
            setBreathCount(prevCount => prevCount + 1); // Increment after breathe in and out
        }, 8000); // Time for one complete cycle (in + out)
    };


    //Button Start Stop

    const startBreathing = () => {
        setIsRunning(true);
        breatheInOut(); // Start the first breathing cycle
        const id = setInterval(breatheInOut, 8000); // Continuously run every 8 seconds
        setIntervalId(id);
        
    };

    const stopBreathing = () => {
        setIsRunning(false);
        clearInterval(intervalId);
        setText('Click Start to begin');
        setAnimationState('');
    };

    const handleToggle = () => {
        if (isRunning) {
            stopBreathing();
        } else {
            startBreathing();
            audioStartRef.current.play();
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1000}); 
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [intervalId]);


    //Stop Watch for the tool

    const [isCounting, setIsCounting] = useState(false); 
    const [secondsElapsed, setSecondsElapsed] = useState(0); 
    const [countdownId, setCountdownId] = useState(null); 
    const [modalVisible, setModalVisible] = useState(false);

    // Function to start the stopwatch
    const beginCountdown = () => {
        if (!isCounting) {
            setIsCounting(true);
            const id = setInterval(() => {
                setSecondsElapsed((prev) => prev + 1);
            }, 1000);
            setCountdownId(id);
        }
    };

    // Function to stop the stopwatch
    const haltCountdown = () => {
        if (isCounting) {
            clearInterval(countdownId);
            setIsCounting(false);
            setModalVisible(true);
        }
    };

    // Function to reset the stopwatch
    const resetCountdown = () => {
        clearInterval(countdownId);
        setIsCounting(false);
        setSecondsElapsed(0);
        setModalVisible(false);
    };

    // Function to format time as mm:ss
    const formatElapsedTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            
        <div className="mediaction-heading">
        <p>Try Breathing Exercise 2 mins a day</p>
        </div>        


        <div className="medication-container" data-aos='fade-right'>

                <div className="breathing-tool">

                <div className={`tool-container ${animationState}`}>
                <div className="circle"></div>
                <p id="text">{text}</p>
                <div className="pointer-container">
                    <span className="pointer"></span>
                </div>
                <div className="gradient-circle"></div>
                </div>


                <div className="controls">
                <button onClick={handleToggle}>
                    {isRunning ? 'Stop session' : 'Start session'}
                </button>
                {isRunning && <p className="instruction">You can stop the session after completing</p>}
                </div>

                </div>

                    <div className="stop-watch">
                        <p>Keep track of your exercise</p>
                        <div className="watch-btns">
                            <button onClick={beginCountdown} disabled={isCounting}>Start</button>
                            <button onClick={haltCountdown} disabled={!isCounting}>Stop</button>
                            <button onClick={resetCountdown}>Reset</button>
                        </div>                
                        <p><span>Total Exercise Time: {formatElapsedTime(secondsElapsed)}</span></p>
                        <p><span>Total Breathing Cycles: {breathCount}</span></p>
                                     
                    </div>

            {modalVisible && (
                <div className="modal-box">
                    <div className="modal-contents">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src='images/breath.jpeg'></img>
                        <p>Nice! You're on your way to feeling more relaxed. Keep going to reduce stress. This breathing exercise helps to cope up with our anxiety</p>
                        <p>Your exercise lasted: {formatElapsedTime(secondsElapsed)}</p>
                        <p>You completed {breathCount} breathing cycles.</p>
                    </div>
                </div>
            )}

        <audio ref={audioStartRef} src="alert.mp3" preload="auto" />
            
         </div> 
        

        </>
    );
};

export default BreathingMeditationTools;
