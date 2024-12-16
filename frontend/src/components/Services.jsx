import React, {useEffect} from 'react'
import './styles/service.css'
import Navbar from './Navbar';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Services() {

  useEffect(() => {       
    AOS.init({ duration: 1000 });        
  }, []);

    const services = [
        {
          title: "Emobot",
          description:
            "Interact with our AI-powered Emobot to help you share your thoughts and receive personalized responses based on your mood.",
          link: "/chats", 
        },
        {
          title: "Mood Tracker",
          description:
            "Track your mood with our interactive mood tracker & live tracker and see your all over mood percentage",
          link: "/emotion_detector", 
        },
        {
          title: "Breathing Tool",
          description:
            "Use our guided breathing tool to reduce stress, improve focus, and promote relaxation with step-by-step breathing exercises.",
          link: "/medication", 
        },
        {
          title: "Manifest",
          description:
            "Discover ways to manifest positive thoughts and energy into your life & write down your secrets in your personalized digital diary",
          link: "/manifest", 
        },
        {
          title: "Tips",
          description:
            "Get Tips for coping with the situations you are facing",
          link: "/tips", 
        },
        {
          title: "Community Chat",
          description:
              "Join our community to connect with others and engage in meaningful conversations.",
          link: "/community", 
      },
      {
          title: "User Posts",
          description:
              "Share your thoughts and experiences by posting in our community space.",
          link: "/posts", 
      },
      {
        title: "Your Timeline",
        description:
            "Share your thoughts and experiences by posting in our community space.",
        link: "/profile", 
      },
      {
        title: "Meet Our Therapists",
        description:
            "Connect with certified therapists who are here to support you on your journey to mental well-being.",
        link: "/therapists", 
      },
      ];


  return (

    <>

    <Navbar/>

    <div className="services-page" data-aos='fade-right'>
    <h2>Our Services</h2>
    <p className='find'>Explore tools and resources designed to support your mental well-being.</p>
    <div className="service-list">
      {services.map((service, index) => (
        <div key={index} className="service-item">
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          
          <div className="link">
            <a href={service.link} >
              Learn More 
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>

  <Footer/>

  </>


  )
}

export default Services