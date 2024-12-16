import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import './styles/reaction.css'
import { useNavigate } from 'react-router-dom';

function Reaction({ postId }) {
  const [reactionCounts, setReactionCounts] = useState({  sad: 0 });
  const [reactionType, setReactionType] = useState(null);
  const { user, isLoggedin } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reactions/${postId}/reactions`);
        //console.log('Fetched reaction counts:', response.data.reactionCounts);

        // Update reaction counts and set the user's reaction type if logged in
        setReactionCounts(response.data.reactionCounts || {  sad: 0 });

        // Check if the user has reacted
        if (isLoggedin) {
          const userReaction = response.data.reactions.find(reaction => reaction.user._id === user.id);
          setReactionType(userReaction ? userReaction.type : null);
        }
      } catch (error) {
        console.error('Error fetching reactions:', error);
      }
    };

    fetchReactions();
  }, [postId, isLoggedin, user]);



  const handleReaction = async (type) => {

    if (isProcessing) return;

    const token = localStorage.getItem('token');
    if (!token && reactionType !== type) {
      // alert("Please log in to react.");
      navigate("/login")
      return;
    }

    setIsProcessing(true);

    

    try {
      if (reactionType === type) {
        //console.log(`Removing ${type} reaction`);
        await removeReaction(token);
      } else {
        //console.log(`Adding ${type} reaction`);
        await addReaction(type, token);
      }
    } catch (error) {
      console.error("Error handling reaction:", error);
    }finally {
      setTimeout(() => setIsProcessing(false), 200); // Add a small delay to allow backend processing
    }
  };

  const addReaction = async (type, token) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/reactions/add`,
        { postId, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      //console.log('Added reaction:', data.reactionCounts);
      setReactionCounts(data.reactionCounts || {  sad: 0 });
      setReactionType(type);
    } catch (error) {
      console.error("Error adding reaction:", error.response ? error.response.data : error);
    }
  };

  const removeReaction = async (token) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/reactions/remove`,
        { postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      //console.log('Removed reaction:', data.reactionCounts);
      setReactionCounts(data.reactionCounts || {  sad: 0 });
      setReactionType(null);
    } catch (error) {
      console.error("Error removing reaction:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="reactions-section">
      <div className="reaction-button">
        <button
          onClick={() => handleReaction('sad')}
          className={`reaction-btn ${reactionType === 'sad' ? 'active' : ''}`}
          disabled={isProcessing}
        >
          😢 {reactionCounts.sad}
        </button>
        
      </div>
    </div>
  );
}

export default Reaction;
