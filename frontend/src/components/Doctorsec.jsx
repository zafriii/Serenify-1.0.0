import React, {useEffect} from 'react'
import './styles/docsec.css'
import ProgressCircle from './ProgressCircle'
import AOS from 'aos';
import 'aos/dist/aos.css';


function Doctorsec() {

    useEffect(() => {
        AOS.init({ duration: 1000 }); 
      }, []);


  return (
    <div className='doctor-sec'>

       
        <div className="doc-herosec" data-aos='fade-right'>
        <div className="doc-text">
        <h2>Elevating Emotional Wellness</h2>
        <h2>& Strong Bond For All</h2>
        <p>Discover the power of personalized therapy with Serenify</p>
        </div>
        <img src='https://img.freepik.com/free-photo/woman-with-hands-together-talking-with-counselor_23-2148759093.jpg?t=st=1731359824~exp=1731363424~hmac=5d731b8b4a718bed62d6dd2f73f86e6ad2826eb905cf6ba4d96cd8d00a616b3c&w=740'></img>              
        </div>


        <div className="doc-part" data-aos='fade-right'>

        <div className="doc-card">
            <h3>Individual Counsiling</h3>
            <p>Invidual counsiling provides personalized support</p>
        </div>

        <div className="doc-card">
            <h3>Couple Counsiling</h3>
            <p>Every couple at a point faces challenges</p>
        </div>

        <div className="doc-card">
            <h3>Family Counsiling</h3>
            <p>Family counciling plays a crucial role</p>
        </div>

        <div className="doc-card">
            <h3>Teen Counsiling</h3>
            <p>Your space to talk about what's going on</p>
        </div>

        </div>


        <div className="doc-work">


        <div className="we-care"  data-aos='fade-right'>

            <h2>We care for you</h2>

            <div className="we-care-card">
                <h3>Affordable Sessions</h3>
                <p>Serenify gives you affordable theray sessions</p>
            </div>

            <div className="we-care-card">
                <h3>Simple Search Process</h3>
                <p>Simple search for our professionals</p>
            </div>

            <div className="we-care-card">
                <h3>High Quality care</h3>
                <p>We care for your mental wellness</p>
            </div>

            </div>


            <div className="how-works"  data-aos='fade-left'>

                <h2>How Serenify Therapy Works?</h2>

            <div className="how-works-card">
                <h3>Search Therapist</h3>
                <p>Find the right therapist for you</p>
            </div>

            <div className="how-works-card">
                <h3>Schedule Date</h3>
                <p>Schedule a date for your session</p>
            </div>

            <div className="how-works-card">
                <h3>Start Therapy</h3>
                <p>Start a session with your therapist</p>
            </div>

            <ProgressCircle progress={70}/>

            </div>


        </div>


    </div>
  )
}

export default Doctorsec