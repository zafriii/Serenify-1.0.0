import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './styles/community.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { useAuth } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import { IoMdSend } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import ConfirmModal from './ConfirmModal';

const socket = io('http://localhost:5000', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: true
});

const Community = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState('');
  const [typingUser, setTypingUser] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { isLoggedin, token } = useAuth(); 
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);


  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      setTypingUser('');
    });

    socket.on('typing', (name) => {
      setTypingUser(`${name} is typing...`);
    });

    socket.on('update users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('delete message', (messageId) => {
      setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messageId));
    });

    return () => {
      socket.off('chat message');
      socket.off('typing');
      socket.off('update users');
      socket.off('disconnect');
      socket.off('connect');
      socket.off('delete message');
    };
  }, [username, room, token]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('chat message', { message, room });
      setMessage('');
    }
  };

  const handleLogin = () => {
    if (isLoggedin) {
      if (username.trim() && room.trim()) {
        socket.emit('join', { name: username, room, token });
        setIsJoined(true);
      }
    } else {
      navigate('/login');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', room);
  };

  const handleDeleteMessage = (messageId) => {
    socket.emit('delete message', { messageId, room });
  };

  const handleLeaveChat = () => {
    socket.emit('leave');
    setIsJoined(false); // Reset joined state to show join container
    const leaveMessage = { id: generateId(), text: `${username} has left the chat`, sender: 'Left' };
    setMessages((prevMessages) => [...prevMessages, leaveMessage]); // Optionally show leave message
  };

  // Function to handle delete button click
  const handleDeleteClick = (msgId) => {
    setMessageToDelete(msgId);
    setShowConfirmModal(true); // Show the confirm modal
  };

  // Function to confirm deletion
  const confirmDeleteMessage = () => {
    if (messageToDelete !== null) {
      handleDeleteMessage(messageToDelete); 
      setMessageToDelete(null); // Reset message to delete
    }
    setShowConfirmModal(false); // Hide modal
  };

  // Function to cancel deletion
  const cancelDeleteMessage = () => {
    setMessageToDelete(null);
    setShowConfirmModal(false); // Hide modal
  };

  const generateId = () => '_' + Math.random().toString(36).substr(2, 9); // Unique ID for messages


  return (
    <>
      <Navbar />
      <div className="community">
        <div className="chat-container">
          {!isJoined ? (
            <div className="join-container">
              <h2>Join community to get help & do help</h2>
              <h2>Enter your name and select a room</h2>
              <p>Feel free to connect & share with our instant message system</p>
              <p>Once you leave the chat, previous chats won't be available anymore</p>
              <input
                type="text"
                placeholder="Anonymous name..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <select value={room} onChange={(e) => setRoom(e.target.value)}>
                <option value="">Select a room</option>
                <option value="depression">Depression</option>
                <option value="heart-break">Heart Break</option>
                <option value="anxiety-support">Anxiety Support</option>
              </select>
              <button onClick={handleLogin}>Join Chat</button>
            </div>
          ) : (
            <div className="chat-box">
              <h2>Welcome to your community 🌎</h2>
              <div className="online-users">
                <p>Start a conversation ✨</p>
                <p>Active members - {onlineUsers.length} 🟢</p>
                <p>{room} room</p>
                <ul>
                  {onlineUsers.map((user, index) => (
                    <li key={index}>
                      <p>
                        {user === username ? `${user} (You)` : user}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
          
              <div className="messages">
                {messages.map((msg, index) => (
                  <div key={index} className={msg.sender === username ? 'message-right' : 'message-left'}>
                    <p className="sender-name">
                      {msg.sender === username ? 'You' : msg.sender}
                      <span className="text">: {msg.text} <span className='msg-time'>{msg.time}</span> </span>

                      {msg.sender === username && (
                        <button onClick={() => handleDeleteClick(msg.id)} className="dlt-msg">
                          <TiDeleteOutline />
                        </button>
                      )}
                    </p>                        
                  </div>
                ))}
              </div>

              <ConfirmModal
                show={showConfirmModal}
                message="Do you want to unsend the message?"
                onConfirm={confirmDeleteMessage}
                onCancel={cancelDeleteMessage}
              />

              {typingUser && <p className="typing">{typingUser}</p>}
              <div className="btn-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleTyping}
                />
                <button onClick={handleSendMessage}><IoMdSend size={25}/></button>
              </div>
              <button onClick={handleLeaveChat} className="leave-btn">Leave</button> 
            </div>
          )}
        </div>
      </div>
     
      <Footer />
    </>
  );
};

export default Community;







