import React, { useState, useEffect } from 'react';
import './styles/slider.css';
import TipsData from './data/TipsData'; 
import { FaSearch } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Slider = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const items = TipsData; // Assuming TipsData contains an array of tips

  // Filter items based on the search term
  useEffect(() => {
    AOS.init({ duration: 1000});
    const results = items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchTerm]);

  return (
    <div className="tips-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title (e.g., Depression)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch size={20} />
      </div>

      <div className="tips-list">
        <h2 className='looking'>Tips you can be looking for</h2>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="tip-item" data-aos='fade-up'>
              <h2 className="tip-title">{item.title}</h2>
              <ul>
                {item.tips.map((tip, index) => (
                  <li key={index} className="tip-text">
                    {item.title === "Loneliness" && index === 1 ? (
                      <>
                        Join a group or <a href="/community" className="community-link">community</a> that interests you.
                      </>
                    ) : (
                      tip
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className='no-rslts'>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Slider;
