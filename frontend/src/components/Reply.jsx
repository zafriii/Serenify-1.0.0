import React, { useState, useEffect } from 'react';
import './styles/reply.css'; 
import axios from 'axios';
import { useAuth } from '../store/Auth';
import ConfirmModal from './ConfirmModal';
import Replyreaction from './Replyreaction';

function Reply({ commentId, onReplyCountUpdate, postAuthorId }) {
  const [replies, setReplies] = useState([]);
  const [replyCount, setReplyCount] = useState(0); 
  const [replyContent, setReplyContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editReplyId, setEditReplyId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteReplyId, setDeleteReplyId] = useState(null);
  const [showReplyInput, setShowReplyInput] = useState(false); 
  const { user, isLoggedin } = useAuth();


//Fetching Reply

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/replies/${commentId}`);       
        setReplies(response.data.replies);
        setReplyCount(response.data.replyCount);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };
    fetchReplies();
  }, [commentId]);

  //Create & edir reply

  const handleReplySubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert("Please log in to reply.");

    try {
      if (editMode && editReplyId) {
        await axios.put(
          `http://localhost:5000/api/replies/${editReplyId}`,
          { content: replyContent },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReplies(replies.map(reply => 
          reply._id === editReplyId ? { ...reply, content: replyContent } : reply
        ));
        setEditMode(false);
        setEditReplyId(null);
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/replies`,
          { content: replyContent, commentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReplies(prevReplies => [...prevReplies, response.data.reply]);
        setReplyCount(prevCount => prevCount + 1);
        onReplyCountUpdate(prevCount => prevCount + 1);
      }
      setReplyContent('');
      setShowReplyInput(false); // Hide input after reply is added
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  //Delete reply with confirmation

  const requestDeleteReply = (id) => {
    setDeleteReplyId(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteReply = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert("Please log in to delete.");

    if (deleteReplyId) {
      try {
        await axios.delete(
          `http://localhost:5000/api/replies/${deleteReplyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReplies(replies.filter(reply => reply._id !== deleteReplyId));
        setReplyCount(prevCount => prevCount - 1);
        onReplyCountUpdate(prevCount => prevCount - 1);
        setShowConfirmModal(false);
      } catch (error) {
        console.error('Error deleting reply:', error);
      }
    }
  };

  //Updated reply

  const editReply = (id, content) => {
    setEditMode(true);
    setEditReplyId(id);
    setReplyContent(content);
    setShowReplyInput(true); // Show input when editing a reply
  };

  //How much time ago reply was created

  const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMs = now - postDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="reply-section">
      <h4>Replies ({replyCount})</h4>
      {isLoggedin && (
        <>
          <button className='rply-cancel' onClick={() => setShowReplyInput(!showReplyInput)}>
            {showReplyInput ? 'Cancel' : 'Reply to this comment'}
          </button>
          {showReplyInput && (
            <form onSubmit={handleReplySubmit} className="reply-form">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Add a reply..."
                required
              />
              <button type="submit">{editMode ? 'Save' : '✔️'}</button>
            </form>
          )}
        </>
      )}
      <div className="replies-list">
        {replies.length > 0 ? (
          replies.map(reply => (
            <div key={reply._id} className="reply">
              <p className="reply-author">
                {reply.user._id === postAuthorId ? 'By Author' : 'Anonymous user'}
              </p>
              <p className="reply-content">{reply.content}</p>

          
              <p className="reply-date">{timeAgo(reply.createdAt)}</p>
              
                <div className="rply-options">

                {(reply.user._id === user._id) && (
                <div className="reply-options">
                  <button onClick={() => editReply(reply._id, reply.content)}>Edit</button>
                  <button onClick={() => requestDeleteReply(reply._id)}>Delete</button>
                </div>
              )}

              <Replyreaction replyId={reply._id} userId={user._id}/>

                </div>

            </div>
          ))
        ) : (
          <p>No replies yet.</p>
        )}
      </div>
      <ConfirmModal
        show={showConfirmModal}
        message="Are you sure you want to delete this reply?"
        onConfirm={confirmDeleteReply}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
}

export default Reply;
