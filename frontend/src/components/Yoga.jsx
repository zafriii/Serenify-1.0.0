import React, {useEffect} from 'react'
import './styles/yoga.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Yoga() {

  useEffect(() => {
    AOS.init({ duration: 1000});  
  }, []);

  return (

    <div className='yoga'>        
        <p>Try meditation for 20 mins a day</p>
        <div className="yoga-poses" data-aos='fade-up'>
            <img src='/images/pose1.jpg'></img>
            <img src='/images/pose2.jpg'></img>
            <img src='/images/pose3.jpg'></img>
        </div>
    </div>

   
  )
}

export default Yoga