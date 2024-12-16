import React, { useEffect, useState } from 'react';
import './styles/carousel.css';
import { NavLink } from 'react-router-dom';

const images = [
    {
        src: 'images/mud.jpg',
        author: 'Mindful Moments',
        title: 'Peaceful Meditation',
        topic: 'Meditation',
        description: 'Discover the power of meditation to calm your mind rejuvenate your spirit.'
      },
      {
        src: 'images/slide2.jpg',
        author: 'Nature Vibes',
        title: 'Nature Retreat',
        topic: 'Nature',
        description: 'Immerse yourself in the beauty of nature to find tranquility and peace within.'
      },
      {
        src: 'images/rock.jpg',
        author: 'Reflective Souls',
        title: 'Gratitude ',
        topic: 'Self-Reflection',
        description: 'Writing down your thoughts can help you find clarity and foster a positive mindset.'
      },
  
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const id = setTimeout(nextSlide, 3000);
    setTimeoutId(id);
    return () => clearTimeout(id);
  }, [currentIndex]);

  return (
    <div className="carousel">
        <div className="list">
            {images.map((image, index) => (
            <div className={`list-item ${index === currentIndex ? 'active' : ''}`} key={index}>
                <div className="image-container">
                <img src={image.src} alt={image.title} />
                <div className="carousel-content">
                  
                    <div className="title"><h2>{image.title}</h2></div>
                   
                    <div className="des">{image.description}</div>
                    <div className="buttons">
                                     
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>

      <div className="arrows">
        <button className='arrow' onClick={prevSlide}>&lt;</button>
        <button className='arrow' onClick={nextSlide}>&gt;</button>
        <NavLink to='/medication'>
            <button className='carousel-btn'>SEE MORE</button>
        </NavLink>
      </div>
      <div className="time" />
    </div>
  );
};

export default Carousel;
