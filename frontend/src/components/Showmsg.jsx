import React from "react";
import "./styles/showmsg.css"; // Add custom styles here

const Showmsg = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`showmsg ${type}`}>
      <p>{message}</p>
      <button className="msg-close" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Showmsg;
