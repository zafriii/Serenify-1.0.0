import React, { useState } from "react";

const MoodTracker = () => {
  const [mood, setMood] = useState(""); // Track the selected mood

  // Define content for each mood
  const moodContent = {
    happy: "Yay! Keep up the positivity and spread joy wherever you go!",
    sad: "It's okay to feel sad sometimes. Here's a motivational story: 'This too shall pass. Keep moving forward.'",
    anxious: "Take a deep breath. Here's a calming meditation to help you relax: 'Breathe in... Breathe out... Let go of your worries.'",
    neutral: "Staying balanced is important. Keep reflecting on the positives in life.",
  };

  // Handle mood change
  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>How are you feeling today?</h2>

      {/* Mood Selector Dropdown */}
      <select
        value={mood}
        onChange={handleMoodChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <option value="">Select your mood</option>
        <option value="happy">Happy</option>
        <option value="neutral">Neutral</option>
        <option value="sad">Sad</option>
        <option value="anxious">Anxious</option>
      </select>

      {/* Content based on the mood */}
      {mood && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
          <h3>You are feeling {mood}.</h3>
          <p>{moodContent[mood]}</p>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
