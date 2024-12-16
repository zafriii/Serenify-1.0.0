import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/Auth';
import './styles/profile.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
import Mypost from './Mypost';
import { IoIosSettings } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";

function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);  // Initial loading state
  const [refreshMessage, setRefreshMessage] = useState(false);  // State to show the "refresh" message


  // Effect to handle loading and the refresh message
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setRefreshMessage(true); // After 2 seconds, show the refresh message if still loading
      }
    }, 3000); // 2 seconds delay

    if (user) {
      setLoading(false);  // User data is available, stop loading
      setRefreshMessage(false); // Remove refresh message
    }

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [user, loading]);

  if (loading && refreshMessage) {
    return <p className='refresh'>Refresh the page ...</p>; // Show refresh message after 2 seconds
  }

  if (loading) {
    return <p className='loader'>Loading your profile...</p>; // Initial loading message
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); 
    const year = date.getFullYear();
  
    return `${day} ${month}, ${year}`;
  };

  return (
    <>
      <Navbar />

      <div className="timeline">

    <div className="profile-container">
      <div className="profile-card">
      <h3 className='profile-title'>Personal Informations</h3>
        <div className="profile-picture">
          <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" alt="Profile" className="profile-img" />
        </div>
        
        <div className="profile-details">
         
          <h3 className="profile-name">{user.username}</h3>
        
          
          <div className="profile-info">
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Joined since {formatDate(user.createdAt)} </p>
          </div>
          
          <NavLink to="/update_profile">
            <button className="edit-btn"> <IoIosSettings size={20}/>  Edit Profile</button>
          </NavLink>


        {user.isVerified ? (            
          <p className='verify'>Account verified <MdOutlineVerified size={18} /></p>
                          
        ) : (
            <div>
               
                <NavLink to="/verify-account">
                    <button className='verify-btn'>Verify Account</button>
                </NavLink>
            </div>
        )}
          
        </div>
      </div>
    </div>


     <div className="myposts">
     <Mypost/>
     </div> 

    </div>

    <Footer />
    </>
  );
}

export default Profile;
