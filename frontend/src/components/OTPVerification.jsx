// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
// import './styles/otp.css';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import { useAuth } from '../store/Auth';  // Import your auth context if needed

// const OTPVerification = () => {
//     const { user } = useAuth();  // Assuming useAuth returns user details
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState(['', '', '', '', '', '']);  // Store OTP in an array for each digit
//     const [loading, setLoading] = useState(false);
//     const [otpSent, setOtpSent] = useState(false);  // Track whether OTP has been sent

//     const navigate = useNavigate();  // Initialize navigate

//     useEffect(() => {
//         // Automatically set the email from user context or localStorage when the component mounts
//         if (user && user.email) {
//             setEmail(user.email);  // If using useAuth context
//         } else {
//             const savedEmail = localStorage.getItem('email');
//             if (savedEmail) {
//                 setEmail(savedEmail);  // Use email from localStorage if no user context
//             }
//         }
//     }, [user]);  // Dependency on user to update email when available

//     const handleOtpChange = (e, index) => {
//         let otpCopy = [...otp];
//         otpCopy[index] = e.target.value.slice(0, 1); // Ensure only one digit is allowed
//         setOtp(otpCopy);
//         if (e.target.value && index < otp.length - 1) {
//             // Move focus to the next input if a digit is entered
//             document.getElementById(`otp-input-${index + 1}`).focus();
//         }
//     };

//     const sendOtp = async () => {
//         if (!email) {
//             alert('Please enter your email.');
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await axios.post(
//                 'http://localhost:5000/api/auth/send-otp',
//                 { email },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 alert('OTP sent successfully to your email');
//                 setOtpSent(true);  // Set otpSent to true once OTP is sent
//             }
//         } catch (error) {
//             alert('Error sending OTP');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const verifyOtp = async () => {
//         const otpValue = otp.join(''); // Combine the OTP digits into a string
//         if (!otpValue) {
//             alert('Please enter OTP.');
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await axios.post(
//                 'http://localhost:5000/api/auth/verify-otp',
//                 { email, otp: otpValue },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 alert('Account verified successfully!');
                
//                 navigate('/profile');  // Navigate to profile page after successful OTP verification
//             }
//         } catch (error) {
//             alert('Error verifying OTP');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="otp-verification">
//                 <h1>Verify Your Account</h1>

//                 {/* Only show email field if OTP has not been sent */}
//                 {!otpSent && (
//                     <>
                    
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         readOnly
//                     />
//                     <button onClick={sendOtp} disabled={loading}>
//                     {loading ? 'Sending OTP...' : 'Send OTP'}
//                     </button>
                    
                    
//                     </>
//                 )}
                
                

//                 {/* OTP field, shown only after OTP is sent */}
//                 {otpSent && (
//                     <>
//                         <div className="otp-box-container">
//                             {otp.map((digit, index) => (
//                                 <input
//                                     key={index}
//                                     id={`otp-input-${index}`}
//                                     type="text"
//                                     maxLength="1"
//                                     value={digit}
//                                     onChange={(e) => handleOtpChange(e, index)}
//                                     className="otp-box"
//                                 />
//                             ))}
//                         </div>
//                         <button onClick={verifyOtp} disabled={loading}>
//                             {loading ? 'Verifying OTP...' : 'Verify OTP'}
//                         </button>
//                     </>
//                 )}
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default OTPVerification;















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './styles/otp.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../store/Auth';  // Import your auth context if needed
import Showmsg from "./Showmsg"; // Import Showmsg component

const OTPVerification = () => {
    const { user } = useAuth();  // Assuming useAuth returns user details
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);  // Store OTP in an array for each digit
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);  // Track whether OTP has been sent
    const [showmsg, setShowmsg] = useState({ message: "", type: "" }); // State for Showmsg

    const navigate = useNavigate();  // Initialize navigate

    useEffect(() => {
        // Automatically set the email from user context or localStorage when the component mounts
        if (user && user.email) {
            setEmail(user.email);  // If using useAuth context
        } else {
            const savedEmail = localStorage.getItem('email');
            if (savedEmail) {
                setEmail(savedEmail);  // Use email from localStorage if no user context
            }
        }
    }, [user]);  // Dependency on user to update email when available

    const handleOtpChange = (e, index) => {
        let otpCopy = [...otp];
        otpCopy[index] = e.target.value.slice(0, 1); // Ensure only one digit is allowed
        setOtp(otpCopy);
        if (e.target.value && index < otp.length - 1) {
            // Move focus to the next input if a digit is entered
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const sendOtp = async () => {
        if (!email) {
            setShowmsg({ message: 'Please enter your email.', type: 'error' });  // Show error message
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/send-otp',
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.status === 200) {
                setShowmsg({ message: 'OTP sent successfully to your email.', type: 'success' });  // Show success message
                setOtpSent(true);  // Set otpSent to true once OTP is sent
            }
        } catch (error) {
            setShowmsg({ message: 'Error sending OTP. Please try again.', type: 'error' });  // Show error message
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        const otpValue = otp.join(''); // Combine the OTP digits into a string
        if (!otpValue) {
            setShowmsg({ message: 'Please enter OTP.', type: 'error' });  // Show error message
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/verify-otp',
                { email, otp: otpValue },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.status === 200) {
                setShowmsg({ message: 'Account verified successfully!', type: 'success' });  // Show success message
                navigate('/profile');  // Navigate to profile page after successful OTP verification
            }
        } catch (error) {
            setShowmsg({ message: 'Error verifying OTP. Please try again.', type: 'error' });  // Show error message
        } finally {
            setLoading(false);
        }
    };

    const closeMessage = () => {
        setShowmsg({ message: "", type: "" });
    };

    return (
        <>
            <Navbar />
            <div className="otp-verification">
                <h1>Verify Your Account</h1>

                {/* Showmsg Component */}
                <Showmsg
                    message={showmsg.message}
                    type={showmsg.type}
                    onClose={closeMessage}
                />

                {/* Only show email field if OTP has not been sent */}
                {!otpSent && (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly
                        />
                        <button onClick={sendOtp} disabled={loading}>
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </>
                )}

                {/* OTP field, shown only after OTP is sent */}
                {otpSent && (
                    <>
                        <div className="otp-box-container">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    className="otp-box"
                                />
                            ))}
                        </div>
                        <button onClick={verifyOtp} disabled={loading}>
                            {loading ? 'Verifying OTP...' : 'Verify OTP'}
                        </button>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OTPVerification;
