import React, { useEffect, useState, useRef } from 'react';
import './styles/home.css';
import Navbar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import Carousel from './Carousel';
import { NavLink } from 'react-router-dom';
import Cards from './Cards';
import { FaLock } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import CardSlide from './CardSlide';



function Herosec() {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      AOS.init({ duration: 1000 }); 
    }, 2000); // Simulate a loading time of 2 seconds
  
    return () => clearTimeout(timer);
  }, []);
  


  return (
    <div id="main">
      {loading ? <Loader /> : null}
      {/* <Navbar/>
      <Part1/>
      <Part2/>
      <Cards/>
      <Part3/>
      <CardSlide/>
      <Part4/>
      <Carousel/>
      <Footer/> */}
      <Navbar/>
      <Part1/>
      <Part2/>
      <Cards/>
      <Part3/>
      <CardSlide/>
      <Part4/>
      <Carousel/>
      <Footer/>
    </div>
  );
}

const Loader = () => (

<div id="loader">
    <div className="spinner"></div>
    <h1>Nurturing Serenity...</h1>
  </div>
);



const Part1 = () => (
    <div id="page1">
     
      <div id="center" >
        <div id="left">
            <img src='images/girl.png'></img>         
           <NavLink to='/community'>
              <button className='seekers'>Serenity Seekers</button>
           </NavLink>
          
        </div>
        
        <div id="right">
          <h2>EMBRACE YOUR</h2>
          <h1><br className="spacer" />MENTAL <br className="spacer"/>WELLNESS</h1>         
        </div>

      </div>
      
    </div>
  );


const Part2  = ()  => (
    <div className="mental-wealth-container" data-aos="fade-right">
      <div className="icon-container">
        <span className="heart-icon">🩶</span>
      </div>
      <div className="text-container">
        <h2>How We Elevate Your Mental Health ?</h2>
        <p>Together we'll explore holistic approaches to mentall wellness, self care & personal growth</p>
      </div>
      <div className="arrow-container">
        <button className="arrow-button">
         <NavLink to='/services'> Explore</NavLink>
        </button>
      </div>
    </div>
);

const Part3 = () => (
    <div id="page2">


      <div id="moving-text">
        <div className="con">
          <h1>POSITIVITY</h1>
          <div id="gola"></div>
          <h1>SELF-LOVE</h1>
          <div id="gola"></div>
          <h1>MOTIVATION</h1>
          <div id="gola"></div>
        </div>
        <div className="con">
          <h1>POSITIVITY</h1>
          <div id="gola"></div>
          <h1>SELF-LOVE</h1>
          <div id="gola"></div>
          <h1>MOTIVATION</h1>
          <div id="gola"></div>
        </div>
        <div className="con">
          <h1>POSITIVITY</h1>
          <div id="gola"></div>
          <h1>SELF-LOVE</h1>
          <div id="gola"></div>
          <h1>MOTIVATION</h1>
          <div id="gola"></div>
        </div>
      </div>


      <div id="page2-bottom" data-aos="fade-right">
        <div className="page2-bottom-texts">
        <p className='big-text'>You deserve to be mentally healthy</p>

        <p className='small-text'>Embrace the journey within. Each moment is a chance to find your peace, ignite your passion, and rise above the challenges. 
        Remember, the light you seek is already within you</p>




        <div className="page2-format-container">

        <div className="page-2-box">
          <div className="page-2-item">
            <a href="/manifest" className="page-2-item-link">
              <div className="page-2-item-bg"></div>

              <div className="page-2-item-title">
                <div className="card-title">Confidentiality <FaLock /></div>
                <p>Your privacy is sacred, we maintain the highest level of confidentiality</p>
              </div>
            </a>
          </div>

          <div className="page-2-item">
            <a href="/medication" className="page-2-item-link">
              <div className="page-2-item-bg"></div>

              <div className="page-2-item-title">
                <div className="card-title">Accessibility <FaUserLock /></div>
                <p>Access mental health support with our designed tools</p>
              </div>
            </a>
          </div>

          <div className="page-2-item">
            <a href="/community" className="page-2-item-link">
              <div className="page-2-item-bg"></div>

              <div className="page-2-item-title">
                <div className="card-title">Community <MdGroups size={24}/></div>
                <p>We foster a supportive community where you can connect & share</p>
              </div>

              
            </a>
          </div>
        </div>


        </div>

        </div>
        
    <div className="bottom-part2" >
       
      <div className="bottom-part2-container" data-aos="fade-left">
          <div className="bottom-part2-card">
            <div className="front">
           
           <button>Mental Health</button>
           <p>We understand the challenges you face</p>
            </div>
            <div className="back">
           
            <button>Mental Health</button>
            <p>We understand the challenges you face</p>
            </div>
          </div>
        </div>

      </div>

      {/* Phone */}

      <div className="bottom-part2-img">
            
            <div className="bottom-part2--img-container">
                <div className="bottom-part2-img-card">
                  <div className="part2-img-card">
                
                <button>Mental Health</button>
                <p>We understand the challenges you face</p>
                  </div>
                  </div>
                  </div>

          </div>



      </div>
      <div id="gooey"></div>
      
    </div>
  );


    const Part4 = () => (
    <div id="page4" data-aos="fade-right">
      <div id="elem-container">
  
        <Elem title="Sadness" />
        <Elem title="Anger" />
        <Elem title="Depression" />
        <Elem title="Frustration" />
      </div>
    </div>
  );
  
  const Elem = ({ title }) => (
    <div className="elem">
      <div className="overlay"></div>
      <h2>{title}</h2>
    </div>
  );


  


  export default Herosec;