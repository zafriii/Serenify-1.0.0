import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/card.css'

function Cards() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  // Dataset of card information
  const cardData = [
    {
      imageUrl: 'https://about.sharecare.com/wp-content/uploads/2017/03/healthy-communities.jpg',
      title: 'Join Community',
      description: 'Join our vibrant community and unlock a world of shared experiences and connections.'
    },
    {
      imageUrl: 'https://images.pexels.com/photos/6951489/pexels-photo-6951489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Therapy Sessions',
      description: 'Expert counseling for personalized mental well-being with our consultant experts.'
    },
    {
      imageUrl: 'https://i.pinimg.com/originals/59/08/11/5908116815ae91cc01d1f97d55fa3cbc.jpg',
      title: 'Self Care',
      description: 'Embrace self-compassion, nurture your mind and body, and prioritize your well-being.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1523536334348-b792b2c0fa41?q=80&w=1555&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Wellness Tips',
      description: 'Discover tips and practices to maintain your mental and physical health also guided info for your wellness.'
    }
  ];

  return (
    <div id="page5" className="card-container">
      {cardData.map((card, index) => (
        <div key={index} className="image-card" data-aos="fade-up">
          <img
            src={card.imageUrl}
            alt={card.title}
            className="card-image"
          />
          <div className="card-content">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
          <div className="icon">
            <span>↗</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;