import React from "react";
import "./styles/helpsupport.css"; 
import Navbar from "./Navbar";
import Footer from "./Footer";
import Feedback from "./Feedback";

const HelpSupportPage = () => {
  return (
   <>
   
   
   <Navbar/>
   
   
   <div className="help-support-page">
  <h1>Help & Support</h1>
  
  <section className="help-section">
    <h2>Frequently Asked Questions (FAQs)</h2>
    <div className="faq-item">
      <h3>1. What is the purpose of the Mental Health Wellness Platform?</h3>
      <p>
        The platform is designed to support mental well-being through a variety of tools, such as mood tracking, anonymous chat with community, AI chatBot, therapist bookings, and personalized insights.
      </p>
    </div>
    <div className="faq-item">
      <h3>2. How do I track my mood?</h3>
      <p>
        You can select your current mood from predefined options (e.g., happy, sad, angry, etc.), and the platform will track your mood over time. You can add additional notes to reflect your feelings.
      </p>
    </div>
    <div className="faq-item">
      <h3>3. How do I book an appointment with a therapist?</h3>
      <p>
        Browse available therapists and choose one that fits your needs. You can book appointments directly through the platform, and you will receive email notifications with the appointment details.
      </p>
    </div>
    <div className="faq-item">
      <h3>4. What is the spiritual motivation feature?</h3>
      <p>
        The platform provides spiritual motivational content tailored to different religions. You can select your religion (Islam, Hinduism, Christianity, Buddhism) and receive uplifting quotes, verses, and messages to help you through tough times.
      </p>
    </div>
    <div className="faq-item">
      <h3>5. How can I use the Breathing Tool?</h3>
      <p>
        The Breathing Tool is designed to help you relax and manage stress. It guides you through controlled breathing exercises, with inhale, hold, and exhale phases. Use it to reduce anxiety and center yourself in moments of stress.
      </p>
    </div>
    <div className="faq-item">
      <h3>6. How can I join the anonymous chat community?</h3>
      <p>
        The anonymous chat community is a safe space where you can express your thoughts and feelings without revealing your identity. To join, simply navigate to the chat feature and start interacting with other members.
      </p>
    </div>
  </section>

  <section className="feature-guide">
    <h2>How to Use Features</h2>
    <div className="feature-item">
      <h3>Mood Tracker</h3>
      <p>
        To track your mood, go to the mood tracker section, select your current mood, and optionally add additional notes. This feature helps track your emotional well-being over time, so you can monitor trends in your mental health.
      </p>
    </div>
    <div className="feature-item">
      <h3>AI Chatbot</h3>
      <p>
        The AI chatbot allows you to express your thoughts and feelings anonymously. The bot is designed to offer supportive responses based on your emotions. You can also listen to music that matches your mood through the bot.
      </p>
    </div>
    <div className="feature-item">
      <h3>Spiritual Motivation</h3>
      <p>
        Choose your religion from the available options, and the platform will display spiritual motivational quotes or verses. Whether you're feeling down or frustrated, these messages will help you find peace and comfort.
      </p>
    </div>
    <div className="feature-item">
      <h3>Therapist Booking</h3>
      <p>
        Browse through our list of therapists, view their availability, and book an appointment directly through the platform. After booking, you will receive email notifications with your appointment details.
      </p>
    </div>
    <div className="feature-item">
      <h3>Breathing Tool</h3>
      <p>
        The Breathing Tool helps you manage stress by guiding you through controlled breathing exercises. To use it, simply start the exercise and follow the inhale, hold, and exhale instructions. The tool can be accessed anytime when you need a moment of calm.
      </p>
    </div>
    <div className="feature-item">
      <h3>Join the Anonymous Chat Community</h3>
      <p>
        The community is a safe, supportive environment where you can share your thoughts or just listen. To join, go to the chat feature, and start interacting. It’s anonymous, so you can speak freely without judgment or fear of revealing your identity.
      </p>
    </div>
    <div className="feature-item">
      <h3>How to Post Anonymously:</h3>
      <p>
         Start typing your thoughts or feelings. The platform ensures that your identity remains confidential, and your messages are not linked to any personal data.
      </p>
      <p>
         If you'd like, you can participate in group discussions or interact with other users anonymously, creating a space of support without the need for identifying yourself.
      </p>
    </div>
  </section>
  </div>

  <Feedback/>

   
   
   <Footer/>
   
   
   </>
  );
};

export default HelpSupportPage;
