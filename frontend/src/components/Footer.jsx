import React from 'react';
import './styles/footer.css';
import { NavLink } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section about-contact">
          <h3>About Us</h3>
          <p>
            Serenify is your mental sanctuary, guiding you towards positivity, peace, and self-love. Let's walk the path of serenity together.
          </p>
          <h3>Contact Us</h3>
          <p>Email: contact@serenify.com</p>
          <p>Phone: +880 1714483890</p>
        </div>

        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
            <NavLink to='/services'>Our Services</NavLink>
            </li>
            <li>
            <NavLink to='/articles'>Articles & resources</NavLink>
            </li>
            <li>
            <NavLink to='/tips'>Tips</NavLink>
            </li>
            <li>
            <NavLink to='/'>Quotes</NavLink>
            </li>
            <li>
              <NavLink to='/community'>Join Community</NavLink>
            </li>

            <li>
              <NavLink to='/therapists'>Our Professionals</NavLink>
            </li>
            <li>
              <NavLink to='/help'>Help & Support</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-section social-links">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://instagram.com"><FaInstagram size={24} color="#fff"/></a></li>
            <li><a href="https://facebook.com"><FaFacebook size={24} color="#fff"/></a></li>
            <li><a href="https://linkedin.com"><CiLinkedin size={24} color="#fff"/></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Serenify. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
