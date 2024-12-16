import React, { useState, useEffect } from "react";
import './styles/spiritualMotivation.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Spritualmotivationsdata } from "./data/Spritualmotivationsdata";


const SpiritualMotivation = () => {
  const [selectedReligion, setSelectedReligion] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Generate a quote when the component mounts
  }, []);

  const handleReligionSelection = (religion) => {
    setSelectedReligion(religion);
    setShowModal(true); // Show the modal when a religion is selected
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const getRandomMotivation = (religion) => {
    const quotes = Spritualmotivationsdata[religion];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const currentMotivation = selectedReligion ? getRandomMotivation(selectedReligion) : null;

  return (
    <div className="spiritual-motivation-container" data-aos="fade-right">
      <h2>Want Some Spiritual Motivation?</h2>
      <p>Select your religion below</p>
      <div className="religion-buttons">
        <button onClick={() => handleReligionSelection("Islam")}>Islam</button>
        <button onClick={() => handleReligionSelection("Hindu")}>Hindu</button>
        <button onClick={() => handleReligionSelection("Christian")}>Christian</button>
        <button onClick={() => handleReligionSelection("Buddha")}>Buddha</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Religious Motivation</h2>
            {selectedReligion === "Islam" ? (
              <>
                <p><b>Arabic:</b> {currentMotivation.arabic}</p>
                <p><b>English:</b> {currentMotivation.english}  {currentMotivation.source}</p>
              </>
            ) : (
              <p>{currentMotivation}</p>
            )}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpiritualMotivation;
