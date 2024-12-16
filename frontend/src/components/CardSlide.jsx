// import React, {useEffect} from 'react';
// import './styles/cardslide.css'
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// function CardSlide() {


//     useEffect(() => {
//         AOS.init({ duration: 1000 }); 
//       }, []);

//   return (
//    <>
   
//    <div className="cardslide-wrapper">
//     <div className="cardslide-container" data-aos="fade-up">
//         <input type="radio" name="slide" id="c1" checked />
//         <label htmlFor="c1" className="card">
//             <div className="row">
//                 <div className="no">1 </div>
//                 <div className="description">
//                     <h4>Heart</h4>
//                     <p>Your heart is your guiding light. Embrace love and compassion</p>
//                 </div>
//             </div>
//         </label>
//         <input type="radio" name="slide" id="c2" />
//         <label htmlFor="c2" className="card">
//             <div className="row">
//                 <div className="no">2</div>
//                 <div className="description">
//                     <h4>Mind</h4>
//                     <p>Your mind is powerful. Nurture it with positivity and clarity</p>
//                 </div>
//             </div>
//         </label>
//         <input type="radio" name="slide" id="c3" />
//         <label htmlFor="c3" className="card">
//             <div className="row">
//                 <div className="no">3</div>
//                 <div className="description">
//                     <h4>You</h4>
//                     <p> Self-love is the key to unlocking all the strength.</p>
//                 </div>
//             </div>
//         </label>
//         <input type="radio" name="slide" id="c4" />
//         <label htmlFor="c4" className="card">
//             <div className="row">
//                 <div className="no">4</div>
//                 <div className="description">
//                     <h4>Universe</h4>
//                     <p>You are the center of your universe.</p>
//                 </div>
//             </div>
//         </label>
//     </div>
// </div>

   
//    </>
//   )
// }

// export default CardSlide






import React, { useEffect } from 'react';
import './styles/cardslide.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function CardSlide() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="cardslide-wrapper">
        <div className="cardslide-container" data-aos="fade-up">
          {/* Use defaultChecked instead of checked */}
          <input type="radio" name="slide" id="c1" defaultChecked />
          <label htmlFor="c1" className="card">
            <div className="row">
              <div className="no">1 </div>
              <div className="description">
                <h4>Heart</h4>
                <p>Your heart is your guiding light. Embrace love and compassion</p>
              </div>
            </div>
          </label>
          <input type="radio" name="slide" id="c2" />
          <label htmlFor="c2" className="card">
            <div className="row">
              <div className="no">2</div>
              <div className="description">
                <h4>Mind</h4>
                <p>Your mind is powerful. Nurture it with positivity and clarity</p>
              </div>
            </div>
          </label>
          <input type="radio" name="slide" id="c3" />
          <label htmlFor="c3" className="card">
            <div className="row">
              <div className="no">3</div>
              <div className="description">
                <h4>You</h4>
                <p>Self-love is the key to unlocking all the strength.</p>
              </div>
            </div>
          </label>
          <input type="radio" name="slide" id="c4" />
          <label htmlFor="c4" className="card">
            <div className="row">
              <div className="no">4</div>
              <div className="description">
                <h4>Universe</h4>
                <p>You are the center of your universe.</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}

export default CardSlide;
