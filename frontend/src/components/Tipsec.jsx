import React, {useEffect} from 'react'
import './styles/tips.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Tipsec() {


  useEffect(() => {       
    AOS.init({ duration: 1000 });        
  }, []);

  return (


    <div className='tipsec'>


       <div className="tipsec-text">
        <h2>Whatever you're facing,</h2>
        <h2>we're here to support you</h2>
        <p className='tipsec-text-p1'>Wheather you're feeling stuck, overwhealmed or unsure</p>
        <p className='tipsec-text-p2'>about your future, we're here to listen and help you find a way to move forward</p>
       </div>


       <div className="advices" data-aos='fade-right'>


       <div className='advice-box'>
        <h4>Relationship & Family Conflict</h4>
        <p>Navigate difficult relationships and challenges with tools to build healthier connections.</p>
        </div>
        <div className='advice-box'>
        <h4>Trauma & Grief</h4>
        <p>Healing after loss or traumatic experiences is possible with the right support and care.</p>
        </div>
        <div className='advice-box'>
        <h4>Depression</h4>
        <p>Feelings of sadness, hopelessness, or loss of interest that affect daily life can be overwhelming—but you're not alone.</p>
        </div>
        <div className='advice-box'>
        <h4>Anxiety & Stress</h4>
        <p>When worry, fear, or stress become too much to handle, we can help you regain control and find peace.</p>
        </div>
        <div className='advice-box'>
        <h4>Insomnia & Sleep</h4>
        <p>Struggling to rest? We'll work with you to restore healthy sleep patterns for a more restful life.</p>
        </div>


       </div>

       

    </div>
  )
}

export default Tipsec