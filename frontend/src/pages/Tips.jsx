import React from 'react'
import Slider from '../components/Slider'
import Feedback from '../components/Feedback'
import Footer from '../components/Footer'
import Tipsec from '../components/Tipsec'
import Navbar from '../components/Navbar'
import GuidesForYourMind from '../components/Guide'



function Tips() {
  return (
   <>

   <Navbar/>
   <Tipsec/>
   <GuidesForYourMind/>      
   <Slider/>
   {/* <Feedback/> */}
   <Footer/>

   </>
  )
}

export default Tips