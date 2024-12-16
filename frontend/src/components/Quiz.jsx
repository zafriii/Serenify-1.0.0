import React, { useState, useEffect } from 'react';
import './styles/quiz.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../store/Auth';


const questions = [
  {
    questionText: "How often do you feel overwhelmed with tasks or responsibilities?",
    options: [
      { text: "Almost every day", score: 4 },
      { text: "A few times a week", score: 3 },
      { text: "Occasionally", score: 2 },
      { text: "Rarely", score: 1 }
    ]
  },
  {
    questionText: "How often do you find it hard to relax or unwind?",
    options: [
      { text: "Very often", score: 4 },
      { text: "Sometimes", score: 3 },
      { text: "Rarely", score: 2 },
      { text: "Never", score: 1 }
    ]
  },
  {
    questionText: "How well do you sleep at night?",
    options: [
      { text: "Poorly, I often wake up", score: 4 },
      { text: "I wake up occasionally", score: 3 },
      { text: "I sleep okay", score: 2 },
      { text: "I sleep great", score: 1 }
    ]
  },
  {
    questionText: "How often do you feel anxious or worried?",
    options: [
      { text: "Almost all the time", score: 4 },
      { text: "Frequently", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Rarely", score: 1 }
    ]
  },
  {
    questionText: "Do you often feel tired despite getting enough sleep?",
    options: [
      { text: "Yes, I feel tired a lot", score: 4 },
      { text: "Sometimes", score: 3 },
      { text: "Rarely", score: 2 },
      { text: "No, I feel rested", score: 1 }
    ]
  },
  {
    questionText: "How often do you have trouble focusing on tasks?",
    options: [
      { text: "Very often", score: 4 },
      { text: "Sometimes", score: 3 },
      { text: "Rarely", score: 2 },
      { text: "Never", score: 1 }
    ]
  },
  {
    questionText: "How often do you engage in physical activity or exercise?",
    options: [
      { text: "Almost every day", score: 1 },
      { text: "A few times a week", score: 2 },
      { text: "Rarely", score: 3 },
      { text: "Never", score: 4 }
    ]
  },
  {
    questionText: "How often do you feel disconnected from your emotions?",
    options: [
      { text: "Almost always", score: 4 },
      { text: "Sometimes", score: 3 },
      { text: "Rarely", score: 2 },
      { text: "Never", score: 1 }
    ]
  },
  {
    questionText: "How often do you experience physical symptoms like headaches or muscle tension due to stress?",
    options: [
      { text: "Very often", score: 4 },
      { text: "Sometimes", score: 3 },
      { text: "Rarely", score: 2 },
      { text: "Never", score: 1 }
    ]
  },
  {
    questionText: "Do you take time to relax or engage in hobbies regularly?",
    options: [
      { text: "Almost every day", score: 1 },
      { text: "A few times a week", score: 2 },
      { text: "Rarely", score: 3 },
      { text: "Never", score: 4 }
    ]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [score, setScore] = useState(0); 
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);  // Timer for each question
  const [showFeedback, setShowFeedback] = useState(""); // Feedback message
  const {user, isLoggedin} = useAuth();
    
  

  // Countdown Timer for each question
  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswerOptionClick(0); // Auto move to next question when time runs out
    }
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer); // Clean up timer on unmount
  }, [timeLeft]);

  const handleAnswerOptionClick = (scoreValue) => {
    setScore(score + scoreValue);
    setShowFeedback(scoreValue === 0 ? "Time's up! Moving to next question." : "Good choice!");

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30); // Reset the timer
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setTimeLeft(30);
  };

  return (
    <>
      <Navbar />

      <div className="quiz-heading">
      {isLoggedin && user?.username ? (
          <h2 className="greeting">
            <span className="username">{user.username}</span>, Wanna play this quiz?
          </h2>
      ) : (
          <h2 className="greeting">Wanna play this quiz?</h2>
      )}
      </div>

      <div className="mental-health-quiz">
        {showScore ? (
          <div className="score-section">
            <h3>Your Quiz Result:</h3>
            <p>Your score is {score} out of {questions.length * 4}.</p>
            {score >= 30 && (
            <p>You may be experiencing very high levels of stress. It’s important to prioritize self-care, practice relaxation techniques, and consider seeking support from a professional if needed.</p>
            )}
            {score >= 15 && score < 30 && (
              <p>Your stress levels are moderate. You’re managing, but be mindful and take time to rest, recharge, and find ways to reduce stress regularly.</p>
            )}
            {score < 15 && (
              <p>You seem to have a good balance with stress. Great job maintaining it! Keep up the healthy habits and self-care routines.</p>
            )}
            <button onClick={restartQuiz}>Retake Quiz</button>
          </div>
        ) : (
          <div className="question-section">
            <h3>Question {currentQuestion + 1}</h3>
            <p className='question'>{questions[currentQuestion].questionText}</p>
            <p className='quiz-time'>Time Left: {timeLeft}s</p>
            <div className="feedback">{showFeedback}</div> {/* Display feedback */}
            <div className="options-section">
              {questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick(option.score)}>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Quiz;
