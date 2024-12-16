import React from 'react'
import BreathingMeditationTools from '../components/BreathingMeditationTools'
import Meditaionsec from '../components/Meditaionsec'
import Navbar from '../components/Navbar'
import Yoga from '../components/Yoga'
import Footer from '../components/Footer'
import Wave from '../components/Wave'
import YogaExercise from '../components/YogaExercise'

function Medication() {
  return (
    <>
    <Navbar/>
    <Meditaionsec/>
    <BreathingMeditationTools/>
    <Yoga/>
    <YogaExercise/>
    <Wave/>
    <Footer/>
    </>
  )
}

export default Medication