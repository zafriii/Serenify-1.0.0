import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import './styles/notification.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/Auth';

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const { isLoggedin } = useAuth();

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Function to fetch alerts
  const fetchAlerts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/alerts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  // Fetch notifications and alerts on mount
  useEffect(() => {
    fetchNotifications();
    fetchAlerts();

    const intervalId = setInterval(() => {
      fetchNotifications();
      fetchAlerts();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await axios.put('http://localhost:5000/api/notifications/markAsRead', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications([]);
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  // Mark all alerts as read
  const markAllAlertsAsRead = async () => {
    try {
      await axios.put('http://localhost:5000/api/alerts/markAsRead', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAlerts([]);
    } catch (error) {
      console.error('Error marking alerts as read:', error);
    }
  };

  const handleNotificationClick = () => {
    setShowMessage(!showMessage);
  };

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
    <div className="notification-container">

      

      {isLoggedin && (
        <button className="bell-button" onClick={handleNotificationClick}>
          <FaBell style={{ fontSize: '30px', marginTop: '10px' }} />
          {(notifications.length + alerts.length) > 0 && (
            <span className="notification-count">{notifications.length + alerts.length}</span>
          )}
        </button>
      )}

      {showMessage && (
        <div className="notification-overlay">

          <h3>Notifications & alerts</h3>

          <button onClick={markAllAsRead}>Mark All Notifications as Read</button>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li key={notification._id}>
                <div className="notif-details">
                  <div className="notif">
                    {notification.message}
                    <NavLink to={`/post/${notification.post}`} className="view-button">
                      View Post
                    </NavLink>
                  </div>
                  <p className="date">
                    {timeAgo(notification.createdAt)}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>No new notifications.</p>
          )}

          <button onClick={markAllAlertsAsRead}>Mark All Alerts as Read</button>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <li key={alert._id}>
                <div className="notif-details">
                  <div className="notif">
                    {alert.message}
                  </div>
                  <p className="date">
                    {timeAgo(alert.createdAt)}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>No new alerts.</p>
          )}
          <button onClick={() => setShowMessage(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
