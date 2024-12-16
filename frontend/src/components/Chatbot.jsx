import React, { useState, useEffect } from "react";
import './styles/chatbot.css';
import { IoIosMic } from "react-icons/io";
import { FaSmile, FaSadCry, FaAngry, FaHeartBroken, FaFrown, FaGrin } from "react-icons/fa";
import { ImFrustrated } from "react-icons/im";
import { BiHappy } from "react-icons/bi";
import { IoMicCircle } from "react-icons/io5"; 
import axios from 'axios'; 
import { NavLink } from "react-router-dom";
import { HiSpeakerWave } from "react-icons/hi2";
import { BsFillStopCircleFill } from "react-icons/bs";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [mood, setMood] = useState("");
  const [responseIndex, setResponseIndex] = useState(0); 
  const [isListening, setIsListening] = useState(false);
  const [activeMood, setActiveMood] = useState("");
  const [hoveredMood, setHoveredMood] = useState(null);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  // Initialize the Web Speech API for voice recognition
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    //recognition.lang = "bn-BD";
  }

  const handleVoiceInput = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript); // Set voice input as the text input
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
        alert("Voice recognition error, please try again.");
      };
    } else {
      alert("Your browser does not support speech recognition.");
    }
  };

  // Mood responses
  const moodResponses = {
    happy: [],
    sad: [],
    angry: [],
    depressed: [],
    frustrated: [],
    heartbroken: [],
  };

  // Initial messages based on mood
  const initialMoodResponses = {
    happy: [
      "I'm so glad you're feeling happy! Want to share the reason?",
    ],
    sad: [
      "It's sad to hear you're feeling this way. I'm here if you want to share.",
    ],
    angry: [
      "It's okay to feel angry sometimes. Let's talk about it.",
    ],
    depressed: [
      "I'm sorry to hear you're feeling this way. It's important to talk.",
    ],
    frustrated: [
      "It's okay to feel frustrated. What's bothering you?",
    ],
    heartbroken: [
      "Let's talk about how you're feeling; I'm here for you.",
    ],
  };

  //Some convo patterns for if needed

  const conversationPatterns = [
     { pattern: /(hi|hello|hey)/i, response: "Hello! How can I assist you today?" },
    // { pattern: /my name is (.*)/i, response: (name) => `Hello ${name}, how are you today?` },
     { pattern: /(how are you|how r u)/i, response: "I'm doing great! How about you?" },
    // { pattern: /what's your name/i, response: "I'm a simple chatbot, created to assist you!" },
    { pattern: /(bye|goodbye|see you next time|talk to you later|ok bye)/i, response: "Goodbye! Take care!" },
    { pattern: /(good night)/i, response: "Good night! Have sweet dreams!" },
    { pattern: /(good morning)/i, response: "Good morning!" },
    { pattern: /(good afternoon)/i, response: "Good afternoon!" },
    { pattern: /(good evening)/i, response: "Good evening!" },
  ];

  // Array for unknown responses
  const unknownResponses = [
    "I didn't understand that. Can you try again?",
    "Hey, please select a mood so I can understand your situation well and talk to you.",
  ];

  //Chat handle

  const handleSendMessage = async (e) => {
    e.preventDefault();


    if (mood) {
      // Check if the user input matches any goodbye patterns
      for (const { pattern, response } of conversationPatterns) {
        if (pattern.test(input)) {
          setMessages([...messages, { sender: "user", text: input }, { sender: "bot", text: response }]);
          setInput("");
          return; // Exit the function after responding
        }
      }
    }

    if (!mood) {
      // Check if the user input matches any patterns
      for (const { pattern, response } of conversationPatterns) {
        if (pattern.test(input)) {
          setMessages([...messages, { sender: "user", text: input }, { sender: "bot", text: response }]);
          setInput("");
          return; // Exit the function after responding
        }
      }
    }


    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    
  
    const API_KEY = 'AIzaSyAthlKHyWW3uqlWwc2EGZV4lhGlUEChgJk' ;
    
    if(mood){

      try {
        setInput("");
        setGeneratingAnswer(true);

        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
          method: "post",
          data: {
            contents: [{ parts: [{ text: `Mood: ${mood}. Message: ${input}` }] }],  //Pass mood and input when mood is selected
          },
        });
  
        const geminiResponse = response.data.candidates[0].content.parts[0].text;
        newMessages.push({ sender: "bot", text: geminiResponse });
      } catch (error) {
        console.log(error);
        newMessages.push({ sender: "bot", text: "Sorry - Something went wrong. Please try again!" });
      } finally {
        setGeneratingAnswer(false); 
      }

    }else{

      try {
        setInput("");
        setGeneratingAnswer(true);

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: input }] }],
        },
        
      });

      const geminiResponse = response.data.candidates[0].content.parts[0].text;
        newMessages.push({ sender: "bot", text: geminiResponse }); // when mood isn't selected
      } catch (error) {
        console.log(error);
        newMessages.push({ sender: "bot", text: "Sorry - Something went wrong. Please try again!" });
      } finally {
        setGeneratingAnswer(false); 
      }


    }

    setMessages(newMessages);
    setInput(""); 

  };


const [progress, setProgress] = useState(0);  
const [improvingMessage, setImprovingMessage] = useState('');

const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    setResponseIndex(0);
    setActiveMood(selectedMood);  // Reset response index when a new mood is selected
  
    // Update the mood count
    setMoodCounts((prevCounts) => ({
      ...prevCounts,
      [selectedMood]: prevCounts[selectedMood] + 1, // Increment count for the selected mood
    }));
  
    // Respond immediately based on the selected mood
    const initialResponse = initialMoodResponses[selectedMood][0]; // First initial response for the selected mood
    setMessages([...messages, { sender: "bot", text: initialResponse }]);


    // Handle progress based on mood selection

    const highestMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);

    setProgress((prevProgress) => {
      if (prevProgress === 0 && selectedMood === 'happy') {
        // If it's the first button click and the mood is 'happy', increase by 10%
        return Math.min(prevProgress + 10, 100)
        
      } else if (selectedMood === highestMood) {
        // If the selected mood matches the highest count, increase progress
        return Math.min(prevProgress + 10, 100);
      } else {
        // If the selected mood does not match the highest, decrease progress
        return Math.max(prevProgress - 5, 0);
      }
    });

    if (selectedMood === highestMood && selectedMood === 'happy') {
      setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      setImprovingMessage("Woo! Your mood is improving!"); // Increase by 10% up to a max of 100%
    } 

    else if (selectedMood === highestMood) {
      // If the selected mood matches the highest count, increase progress
      setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      setImprovingMessage("Woo! Your mood is improving!");
    }
      
    else {
      setProgress((prevProgress) => Math.max(prevProgress - 5, 0));
      setImprovingMessage(""); // Decrease by 5% to a min of 0%
    }
  };


  const [darkMode, setDarkMode] = useState(() => {
    // Check if a theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    // Save the theme to localStorage
    AOS.init({ duration: 1000}); 
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const [moodCounts, setMoodCounts] = useState({
    happy: 0,
    sad: 0,
    angry: 0,
    depressed: 0,
    frustrated: 0,
    heartbroken: 0,
    
  });

  const calculateMoodPercentage = (mood) => {
    const totalSelections = Object.values(moodCounts).reduce((acc, count) => acc + count, 0);
    return totalSelections ? ((moodCounts[mood] / totalSelections) * 100).toFixed(2) : 0;
  };

 

  const moodIcons = {
    happy: <BiHappy size={24} color="#fff"/>, 
    sad: <FaSadCry size={24} color="#fff" />,
    angry: <FaAngry size={24} color="#fff"/>,
    depressed: <FaFrown size={24} color="#fff"/>,
    frustrated: <ImFrustrated  size={24} color="#fff"/>,
    heartbroken:<FaHeartBroken size={24} color="#fff"/>,
  };


  //Bot text sppech

  const [speaking, setSpeaking] = useState(false); 
  const [currentMsg, setCurrentMsg] = useState(null); 

  const handleTextToSpeech = (text) => {
    if (speaking && currentMsg === text) {
      // If already speaking and the same message, stop the speech
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      // Stop any ongoing speech first
      window.speechSynthesis.cancel();

      // Start new speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);

      // Track current speaking status
      setSpeaking(true);
      setCurrentMsg(text);

      // Once the speech ends, reset the state
      utterance.onend = () => {
        setSpeaking(false);
        setCurrentMsg(null);
      };
    }
  };


  return (
    <>
      <div className="chatbot">        
        <p> <span className="emobot"> EmoBot:  </span> Empathetic AI companion. Your Emotions, Our Priority</p>
        <p>Connect, Share, and Heal :)</p>
      </div>

      {/* Mood buttons */}

      <div className={`chatbot-container ${darkMode ? "dark" : "light"}`}>
        <p className="select">Select your current mood for better response</p>
        <div className="mood-buttons">
          {Object.keys(moodResponses).map((moodType) => (
            <button
            key={moodType}
            onClick={() => handleMoodSelection(moodType)}
            onMouseEnter={() => setHoveredMood(moodType)} 
            onMouseLeave={() => setHoveredMood(null)} 
            style={{
                backgroundColor:
                activeMood === moodType
                    ? '#15292b' 
                    : hoveredMood === moodType
                    ? '#456d70' 
                    : '#234E52', 
                color: activeMood === moodType || hoveredMood === moodType ? '#ffffff' : '#ffffff', 
            }}
            >
              {moodType.charAt(0).toUpperCase() + moodType.slice(1)}
            </button>
          ))} 

          <div className="toggle-container" onClick={toggleDarkMode}>
            <div className={`toggle-switch ${darkMode ? "dark" : "light"}`}>
              <div className="toggle-circle"></div>
            </div>
          </div>
        </div>

       
  
      <div className="chat-window">
        {messages.map((msg, index) => {
          // Calculate the width based on the message length (up to a max value, for example, 70% of the screen width)
          const messageLength = msg.text.length;
          const maxMessageLength = 200;  // Set a limit to prevent messages from becoming too large
          const width = Math.min(100, (messageLength / maxMessageLength) * 150);  // Adjust width to a percentage based on length
          
          return (
            <div
              key={index}
              className={`message ${msg.sender}`}
              
            >
              {msg.sender === "bot" ? (
                <>
                  <img
                    src="/images/bot.jpg"
                    alt="EmoBot"
                    className="bot-profile-pic"
                  />
                  <span className="message-text">{msg.text}</span>
                  
                  <button
                    onClick={() => handleTextToSpeech(msg.text)}
                    className="tts-button"
                  >
                    {speaking && currentMsg === msg.text ? <BsFillStopCircleFill size={24}/> : <HiSpeakerWave size={24}/>}
                  </button>
                </>
              ) : (
                <span className="message-text">You : {msg.text}</span>
              )}
            </div>
          );
        })}
      </div>


        {generatingAnswer && (
            <div className="loading">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}


        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            className={darkMode ? "input-dark" : "input-light"}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          
          <button 
          type="submit"
          disabled={!input.trim()} 
          className={`send-button ${!input.trim() ? 'disabled' : ''}`}>
          Send</button>

          <button
            type="button"
            onClick={handleVoiceInput}
            className={`mic-button ${isListening ? "listening" : ""}`}
          >
            {isListening ? <IoMicCircle style={{ fontSize: '30px' }}/> : <IoIosMic className="mic" style={{ fontSize: '25px' }}/>} 
          </button>
        </form>
       
      </div>



      {/* Mood Tracker     */}

       <div className="mood-tracker" data-aos='fade-right'> 
       <p>What are your current emotions?</p>  


          <div className="tracker-btn">
          <NavLink to='/emotion_detector'>
            <button className="tracker">Live Tracker</button>
          </NavLink>

          <NavLink to='/mood_analyzer'>
            <button className="tracker">Mental health Analyzer</button>
          </NavLink>
          </div>
          

      <div className="mood-percentage-container" >
          
          {Object.keys(moodCounts).map((moodType) => (
            <div key={moodType} className="mood-percentage">
                 
              
              <div className="progress-circle">
                <div
                  className="progress"
                  style={{
                    background: `conic-gradient(
                      #0b3336 ${calculateMoodPercentage(moodType)}%,
                      #1e6369 ${calculateMoodPercentage(moodType)}%
                    )`,
                  }}
                >
                    <div className="mood-icon">{moodIcons[moodType]}</div>
                </div>
              </div>
              
              <span className="mood-label">{calculateMoodPercentage(moodType)}%   {moodType.charAt(0).toUpperCase() + moodType.slice(1)}</span>
            </div>
          ))}
        </div>

        </div>


       {/* Mood progress */}


        <div className="progress-load" data-aos='fade-right'>

        <div className="progress-bar-container">
        <p>Current Mood Progress</p>
        <span className="progress-text">{progress > 0 ? `${progress}%` : "0 %"}</span>
        {improvingMessage && <p>{improvingMessage}</p>}
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          >            
          </div>
        
        </div>
      </div>

      </div>

       
           
    </>
  );
};

export default Chatbot;




















