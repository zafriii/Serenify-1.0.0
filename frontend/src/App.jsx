import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import QuoteGenerator from './components/QuoteGenerator'
import Home from './pages/Home'
import Chats from './pages/Chats'
import Medication from './pages/Medication'
import Articles from './pages/Articles'
import EmotionDetector from './components/EmotionDetector'
import Tips from './pages/Tips'
import Quiz from './components/Quiz'
import Manifest from './pages/Manifest'
import Community from './components/Community'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Services from './components/Services'
import Updateprofile from './components/Updateprofile'
import Profile from './components/Profile'
import Posts from './pages/Posts'
import SinglePost from './components/SinglePost'
import Userpost from './components/Userpost'
import Error from './pages/Error'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import DoctorList from './components/DoctorList'
import DoctorDetails from './components/DoctorDetails'
import BookingSummary from './components/BookingSummary '
import MoodAnalyzer from './components/MoodAnalyzer'
import OTPVerification from './components/OTPVerification'
import HelpSupportPage from './components/HelpSupportPage'

function App() {
 
 return (
    <>

    <BrowserRouter>

        <Routes>                

            <Route path='/' element={<QuoteGenerator/>}/>

            <Route path='/welcome' element={<Home/>}/>
            <Route path='/chats' element={<Chats/>}/>
            <Route path='/medication' element={<Medication/>}/>
            <Route path='/articles' element={<Articles/>}/>
            {/* <Route path='/stories' element={<Stories/>}/> */}
            <Route path='/emotion_detector' element={<EmotionDetector/>}/>
            <Route path='/tips' element={<Tips/>}/>
            <Route path='/quiz' element={<Quiz/>}/>
            <Route path='/manifest' element={<Manifest/>}/>
            <Route path='/community' element={<Community/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/update_profile' element={<Updateprofile/>}/>
            <Route path='/posts' element={<Posts/>}/>
            <Route path="/post/:id" element={<SinglePost/>}/>
            <Route path='/posts/:postId' element={<Userpost/>} />          
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password/:resetToken" element={<ResetPassword/>}/>
            <Route path="/therapists" element={<DoctorList/>} />
            <Route path="/doctors/:id" element={<DoctorDetails/>} />
            <Route path="/booking_details" element={<BookingSummary/>} />
            <Route path="/mood_analyzer" element={<MoodAnalyzer/>} />
            <Route path="/verify-account" element={<OTPVerification/>} />
            <Route path="/help" element={<HelpSupportPage/>} />
            <Route path='/*' element={<Error/>} />

            
        </Routes>    

    </BrowserRouter>

    


    </>
  )
}

export default App
