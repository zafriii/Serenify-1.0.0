import React, { useState, useRef } from 'react';
import './styles/musicplayer.css';
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('ocean.mp3'); // Track the currently selected song
  const audioRef = useRef(null); // Using useRef to access the audio element

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause(); 
    } else {
      audio.play();  
    }
    setIsPlaying(!isPlaying); // Toggle the playing state
  };

  // Change the song
  const changeSong = (song) => {
    const audio = audioRef.current;
    if (audio.src !== song) {
      audio.pause(); // Pause current audio
      setCurrentSong(song); // Set the new song
      setIsPlaying(false); // Reset the playing state
    }
  };

  return (
    <div className="music-player">

      <div className="player-controls">
       
        <div className={`sound-wave ${isPlaying ? 'active' : ''}`}>

        <h2 className="song-title">{currentSong === 'ocean.mp3' ? 'Ocean' : 'Rain'}</h2>

          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>

          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>

          <div className="bar"></div>
          {/* <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div> */}
        </div>
      </div>

      {/* Song selection buttons */}
      <div className="song-selection">

        <p>Select a soothing Background sound for you</p>

      <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? (
            <i className="pause-icon"><CiPause1 />Pause</i>
          ) : (
            <i className="play-icon"><CiPlay1 />Play </i>
          )}
        </button>
        <button onClick={() => changeSong('ocean.mp3')} disabled={currentSong === 'ocean.mp3'}>
         Ocean
        </button>
        <button onClick={() => changeSong('rain.mp3')} disabled={currentSong === 'rain.mp3'}>
         Rain
        </button>
      </div>

      {/* Audio element with the current song */}
      <audio ref={audioRef} src={currentSong} preload="metadata" loop></audio>
    </div>
  );
};

export default MusicPlayer;
