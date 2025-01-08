import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/navbar.css';
import NotificationBell from './NotificationBel';
import { useAuth } from '../store/Auth';
import { IoMdArrowDropdown } from "react-icons/io";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    chats: false,
    medication: false,
  });

  const { isLoggedin, LogoutUser } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
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
        {/* Chats Dropdown */}
        <div
          className={`dropdown ${dropdownOpen.chats ? 'open' : ''}`}
          onMouseEnter={() => toggleDropdown('chats')}
          onMouseLeave={() => toggleDropdown('chats')}
        >
          <button className="button">
            <span>Chats <IoMdArrowDropdown /></span>
          </button>
          <div className="dropdown-menu">
            <NavLink to="/chats" onClick={toggleMenu}>
              <span>Chat with AI</span>
            </NavLink>
            <NavLink to="/community" onClick={toggleMenu}>
              <span>Chat Anonymously</span>
            </NavLink>
          </div>
        </div>

        {/* Medication Dropdown */}
        <div
          className={`dropdown ${dropdownOpen.medication ? 'open' : ''}`}
          onMouseEnter={() => toggleDropdown('medication')}
          onMouseLeave={() => toggleDropdown('medication')}
        >
          <button className="button">
            <span>Medication <IoMdArrowDropdown /></span>
          </button>
          <div className="dropdown-menu">
            <NavLink to="/medication" onClick={toggleMenu}>
              <span>Explore Tools</span>
            </NavLink>
            <NavLink to="/therapists" onClick={toggleMenu}>
              <span>Our Professionals</span>
            </NavLink>
          </div>
        </div>

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

        <NotificationBell />
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
