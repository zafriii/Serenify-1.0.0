import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import './styles/quoteGenerator.css';
import SpiritualMotivation from "./SpiritualMotivation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Motivationalquotes } from "./data/Motivationalquotes";
import { useAuth } from '../store/Auth';
import Footer from "./Footer";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(""); // Track the current quote

   const {user, isLoggedin} = useAuth();

  // Function to generate a random quote
  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * Motivationalquotes.length); // Pick a random index from the quotes array
    setQuote(Motivationalquotes[randomIndex]); // Set the randomly chosen quote
  };

  // Effect to set an initial random quote on component mount
  useEffect(() => {
    generateQuote();
    AOS.init({ duration: 1000 }); 
  }, []);

 
  return (

    
    <div className="quote-generator">

  <div className="navbar">
        <div className="navlogo">
        <NavLink to="/welcome">
            <img src="images/site-logo.png" alt="Logo" />
        </NavLink>
    </div>
    <div className="navlinks">
    <NavLink to="/welcome">
            <button className="button">
              <span>Get Started</span>
            </button>
          </NavLink>
    </div>
    </div>


      {/* {isLoggedin ?(
        <h1 className="greeting">Hey <span className="username">{user.username} ,</span> How are you feeling today?</h1>
      ) : (
        <h1 className="greeting">Hey, How are you feeling today?</h1>
      )} */}

      {isLoggedin && user?.username ? (
          <h1 className="greeting">
              Hey <span className="username">{user.username}</span>, Welcome to Serenify
          </h1>
      ) : (
          <h1 className="greeting">Hey, Welcome to Serenify</h1>
      )}


      {/* <h1 className="greeting">Hey, How are you feeling today?</h1> */}

      <p className="quote-text">Explore tools available for you, with expert help available whenever you need</p>
      <p>& a supportive community dedicated to improve your mental well-being</p>

      <p className="with">We're with you on your journey to <span className="quote-span">Mental Wellness</span></p>
      
      <div className="quote-container" data-aos="fade-right">
        {/* <h1>Welcome to Serenify</h1> */}
        <h2>Today's Motivation!</h2>
        <p className="quote">{quote || 'Click the button to get a motivational quote!'}</p>
        <div className="btns">
          <button className="button" onClick={generateQuote}>
            <span>Generate Quote</span>
          </button>
          
        </div>
      </div>

      <SpiritualMotivation/>

      <Footer/>

    </div>
  
  );
};

export default QuoteGenerator;
