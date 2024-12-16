import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/note.css'

const StreakTracker = () => {
  const [notes, setNotes] = useState([]);
  const [streak, setStreak] = useState(0);
  const [uniqueDaysCount, setUniqueDaysCount] = useState(0);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedNotes = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setNotes(sortedNotes);
      calculateStreak(sortedNotes);
      countUniqueDays(sortedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const calculateStreak = (sortedNotes) => {
    if (sortedNotes.length === 0) {
      setStreak(0);
      return;
    }

    let currentStreak = 1;
    let maxStreak = 0;

    for (let i = 1; i < sortedNotes.length; i++) {
      const prevDate = new Date(sortedNotes[i - 1].createdAt);
      const currentDate = new Date(sortedNotes[i].createdAt);

      const differenceInTime = currentDate - prevDate;
      const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

      if (differenceInDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else if (differenceInDays > 1) {
        currentStreak = 1;
      }
    }

    setStreak(maxStreak > 1 ? maxStreak : 0);
  };

  const countUniqueDays = (sortedNotes) => {
    const currentYear = new Date().getFullYear();
    const uniqueDays = new Set();

    sortedNotes.forEach(note => {
      const date = new Date(note.createdAt);
      if (date.getFullYear() === currentYear) {
        const dayString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; 
        uniqueDays.add(dayString);
      }
    });

    setUniqueDaysCount(uniqueDays.size);
  };

  return (
    <div className='streaks'>
      {/* <h4>Current Streak : <span className='streak-days'>{streak > 0 ? `${streak} days` : '0 days'}</span></h4> */}
      <h4>Notes Written in {new Date().getFullYear()} : <span className='note-days'>{uniqueDaysCount} / {isLeapYear(new Date().getFullYear()) ? 366 : 365} days</span></h4>
    </div>
  );
};

// Helper function to check if a year is a leap year
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export default StreakTracker;
