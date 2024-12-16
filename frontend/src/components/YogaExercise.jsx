import React, { useEffect, useState } from 'react';
import './styles/yoga.css'
import MeditationWidget from './MeditationWidget';
import MeditationTimer from './MeditationTimer';
import AOS from 'aos';
import 'aos/dist/aos.css';



function YogaExercise() {


  const exercises = [
    { name: 'Mountain Pose', instruction: 'Stand tall with feet together and arms by your side. Breathe deeply and focus on your posture.', difficulty: 'beginner' },
    { name: 'Downward Dog', instruction: 'Come onto your hands and knees, lift your hips and straighten your legs to form an upside-down V.', difficulty: 'beginner' },
    { name: 'Warrior II', instruction: 'Step one foot back, turn it out, and bend your front knee. Extend your arms parallel to the ground and look forward.', difficulty: 'advanced' },
    { name: 'Tree Pose', instruction: 'Stand on one leg, place the sole of your other foot on your thigh, and bring your palms together at your chest.', difficulty: 'beginner' },
    { name: 'Child’s Pose', instruction: 'Sit back on your heels, stretch your arms out in front of you, and rest your forehead on the floor. Breathe deeply and relax.', difficulty: 'beginner' },
    { name: 'Seated Forward Bend', instruction: 'Sit with your legs extended in front of you. Inhale, lengthen your spine and exhale as you reach for your feet or shins.', difficulty: 'beginner' },
    { name: 'Legs Up the Wall', instruction: 'Lie on your back with your legs extended up against a wall. Let your arms rest by your sides and breathe deeply.', difficulty: 'beginner' },
    { name: 'Bridge Pose', instruction: 'Lie on your back with knees bent and feet flat on the floor. Press into your feet to lift your hips, keeping your shoulders grounded.', difficulty: 'beginner' },
    { name: 'Easy Pose', instruction: 'Sit cross-legged with your hands resting on your knees. Close your eyes and take deep, mindful breaths.', difficulty: 'beginner' },
    { name: 'Sphinx Pose', instruction: 'Lie on your stomach and prop yourself up on your forearms with elbows under your shoulders. Gently lift your chest and hold.', difficulty: 'advanced' },
    { name: 'Happy Baby Pose', instruction: 'Lie on your back and bring your knees towards your chest. Grab the outside edges of your feet and gently rock side to side.', difficulty: 'beginner' },
    { name: 'Supine Twist', instruction: 'Lie on your back, bring one knee across your body, and extend the opposite arm out to the side. Hold and breathe, then switch sides.', difficulty: 'beginner' }
  ];

  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Load voices and set them in state

    AOS.init({ duration: 1000}); 

    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    // Load voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const handleInstruction = (instruction) => {
    const utterance = new SpeechSynthesisUtterance(instruction);

    // Set the speaking rate to be slower
    utterance.rate = 0.45; // Adjust between 0.1 (slowest) to 2.0 (fastest)

    speechSynthesis.speak(utterance);
  };





  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner'); // default to beginner

  const filteredExercises = exercises.filter(exercise => exercise.difficulty === selectedDifficulty);

 
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty); // Change the difficulty filter
  };


  return (
    <div className='yoga-tool'>
      <h2>Yoga Instructions (Click it)</h2>

      <div className="difficulty-buttons">
        <button onClick={() => handleDifficultyChange('beginner')} className={selectedDifficulty === 'beginner' ? 'active' : ''}>Beginner</button>
        <button onClick={() => handleDifficultyChange('advanced')} className={selectedDifficulty === 'advanced' ? 'active' : ''}>Advanced</button>
      </div>

        <div className="yoga-exercise" data-aos='fade-right'>

            <div className="exercise-time">
                <MeditationWidget/>
            </div>

        <div className="exercise-buttons">
        {filteredExercises.map((exercise, index) => (
              <button key={index} onClick={() => handleInstruction(exercise.instruction)}>
                {exercise.name}
              </button>
          ))}

        <MeditationTimer/>

      </div>
      </div>
     
    </div>
  );
}

export default YogaExercise;











