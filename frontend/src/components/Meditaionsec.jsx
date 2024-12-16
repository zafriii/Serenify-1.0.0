import React from 'react'
import './styles/meditaionsec.css'
import ScreenDimmer from './ScreenDimmer';
import { useAuth } from '../store/Auth';

function Meditaionsec() {




  return (

    <>

    

    <ScreenDimmer/>
    
    <div className="meditation">


        <div className="meditaion-text">
            <p className='med-text'>Mindfullness</p>
            <p className='med-text'>| More calm</p>
            <p className='med-text'>Focus</p>

            <p className='med-texts'>----- We offer you breathing tools & </p>
            <p>meditations blending tradional</p>
            <p>techniques with modern technology</p>
            <p>to help you find your inner peace</p>
        </div>


      <div className="medication-card">

        <div className="medication-image">
          <img src='/images/meditation.jpg' alt=''></img>
        </div>

        <div className="medication-text">
        <p>Your anxiety companion</p>
        </div>

        <ul className="medication-btns">
       
        <button>Mindfullness</button>
        <button>Breathing</button>
        <button>Calmness</button>  
        
        </ul>

      </div>


        <div className="med-right">
      
              <p className='brief'>Reduce your anxiety with our breathing tool</p>
              
              <p className='exp'>Experience calm and clarity with our guided breathing tool.</p>
              <p>Designed to help reduce anxiety, improve focus</p>
              <p>and promote relaxation,this simple exercise encourages</p>
              <p>mindful breathing to bring balance and tranquility into your daily routine. A few minutes a day</p>
              <p>can make a significant difference in managing stress</p>
              <p>and enhancing overall well-being.</p>
            
        <p className='med-text'>Explore Breathing Exrcises</p>
        <p className='med-text'>Breath In & Out Process</p>

        <button>Try Breathing Tool</button> whenever you're angry, anxious
        </div>

    </div>

    </>
  )
}

export default Meditaionsec
