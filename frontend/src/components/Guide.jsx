import React, {useEffect} from 'react';
import './styles/guide.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Guide({ title, subtitle, description, time, imgSrc }) {

  useEffect(() => {       
    AOS.init({ duration: 1000 });        
}, []);


  return (
    <div className="guide" data-aos='fade-right'>
      <img src={imgSrc} alt={title} className="guide-image" />
      <div className="guide-content">
        <h4>{title}</h4>
        <h5>{subtitle}</h5>
        <p>{description}</p>
        <p><strong>{time}</strong></p>
      </div>
    </div>
  );
}

function GuidesForYourMind() {
  const guides = [
    {
      title: 'Negative Thinking',
      subtitle: 'Overcoming Negative Thoughts: Building a Positive Mindset',
      description: 'Explore techniques for transforming negative thought patterns into a more positive outlook. This approach offers practical strategies to help you change your mindset, build resilience, and cultivate a more optimistic perspective for better overall well-being.',
      time: '12 mins',
      imgSrc: 'https://i.pinimg.com/564x/cf/09/51/cf09510679cc60df5c12962414a7a70d.jpg', // Replace with your actual image path
    },
    {
      title: 'Depression',
      subtitle: 'Understanding Depression',
      description: 'Learn about common signs of depression and explore supportive tools and resources to manage and improve mental health.',
      time: '16 mins',
      imgSrc: 'https://i.pinimg.com/564x/25/34/51/2534510b8c764137004bd74d6054d540.jpg', // Replace with your actual image path
    },
    {
      title: 'Sleep Disorder',
      subtitle: 'The Impact of Sleep on Mental Health',
      description: 'Understand how the quality of sleep affects mental health and explore practical strategies to improve sleep hygiene for overall well-being.',
      time: '10 mins',
      imgSrc: 'https://i.pinimg.com/564x/48/eb/04/48eb0487eb5d184a17afdd68e7458010.jpg', // Replace with your actual image path
    },
    {
      title: 'Life Transitions',
      subtitle: 'Adapting to Life\'s Transitions',
      description: 'Develop strategies for navigating major life changes and adjusting to new circumstances with resilience.',
      time: '14 mins',
      imgSrc: 'https://i.pinimg.com/564x/8f/11/8f/8f118fc6f758676e780481f17a8c7efa.jpg', // Replace with your actual image path
    },
    {
      title: 'Burnout',
      subtitle: 'Understanding and Managing Burnout',
      description: 'Recognize the signs of burnout and discover techniques for managing stress and building healthy boundaries.',
      time: '8 mins',
      imgSrc: 'https://i.pinimg.com/564x/b2/c4/f4/b2c4f46ed11bc91daaf85515292fe2e6.jpg', // Replace with your actual image path
    },
  ];

  return (
    <section>
      <h2>Guides for Your Mind</h2>
      {guides.map((guide, index) => (
        <Guide 
          key={index}
          title={guide.title}
          subtitle={guide.subtitle}
          description={guide.description}
          time={guide.time}
          imgSrc={guide.imgSrc}
        />
      ))}
    </section>
  );
}

export default GuidesForYourMind;





















