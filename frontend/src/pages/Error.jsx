import React from 'react'
import '../components/styles/error.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'

function Error() {
  return (

   <>
  
  <Navbar/>

  <div className='error'>
        <h2>Error! 404 not found!</h2>
  </div>


  <Footer/>
   
   
   </>


  )
}

export default Error









