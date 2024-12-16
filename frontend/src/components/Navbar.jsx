import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/navbar.css';
import NotificationBell from './NotificationBel';
import { useAuth } from '../store/Auth';
import TranslateComponent from './TranslateComponent';



function Navbar() {

  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { isLoggedin, LogoutUser } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    LogoutUser();
    toggleMenu();
  };

  return (
    <div className="navbar">
    
    <div className="navlogo">
        <NavLink to="/welcome">
            <img src="/images/site-logo.png" alt="Logo" />
        </NavLink>

    </div>



      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        
        <NavLink to="/chats">
            <button className="button" onClick={toggleMenu}>
              <span>Chats</span>
            </button>
          </NavLink>


          <NavLink to="/medication">
            <button className="button" onClick={toggleMenu}>
              <span>Medication</span>
            </button>
          </NavLink>

          

          <NavLink to="/manifest">
            <button className="button" onClick={toggleMenu}>
              <span>Manifest</span>
            </button>
          </NavLink>

          <NavLink to="/posts">
            <button className="button" onClick={toggleMenu}>
              <span>Posts</span>
            </button>
          </NavLink>

          


          {/* <TranslateComponent/> */}

          

      {isLoggedin ? (

        <>

        <NavLink to="/profile">
          <button className="button" onClick={toggleMenu}>
            <span>Profile</span>
          </button>
        </NavLink>

          <NavLink to="/login">
          <button className="button" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </NavLink>

        </>

        ) : (
          <NavLink to="/login">
            <button className="button" onClick={toggleMenu}>
              <span>Login</span>
            </button>
          </NavLink>
        )}


       <NotificationBell/>
    
       
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar-link ${isMenuOpen ? 'open' : ''}`} />
        <div className={`bar-link ${isMenuOpen ? 'open' : ''}`} />
        <div className={`bar-link ${isMenuOpen ? 'open' : ''}`} />
      </div>
    </div>
  );
}

export default Navbar;
