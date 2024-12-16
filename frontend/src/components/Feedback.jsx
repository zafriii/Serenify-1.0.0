import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import './styles/feedback.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Showmsg from './Showmsg'; // Import Showmsg component

const Feedback = () => {
    const { user, isLoggedin } = useAuth(); // Get user from useAuth hook
    const [text, setText] = useState('');
    const maxChars = 1000;
    const navigate = useNavigate();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [showmsg, setShowmsg] = useState({ message: "", type: "" }); // State for Showmsg

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Redirect to login if not logged in
        if (!isLoggedin) {
            setShouldRedirect(true);
            return;
        }

        if (shouldRedirect) {
            window.location.href = '/login';
            return null;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setShowmsg({ message: "Please log in to submit feedback.", type: "error" });
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/feedback',
                {
                    email: user?.email || '', // Directly use user email from useAuth
                    content: text,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setText(''); // Reset only the feedback text after submission
            setShowmsg({ message: 'Feedback submitted successfully!', type: 'success' });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setShowmsg({ message: 'Failed to submit feedback. Please try again.', type: 'error' });
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const closeMessage = () => {
        setShowmsg({ message: '', type: '' });
    };

    return (
        <>
            {/* Showmsg Component */}
            <Showmsg
                message={showmsg.message}
                type={showmsg.type}
                onClose={closeMessage}
            />

            <div className="feedback" data-aos='fade-up'>
                <div className="feedback-texts">
                    <h2>Dear Serenity Seekers,</h2>
                    <h2>Your feedbacks are valuable for us!</h2>
                    <h2>Let us know your experience on Serenify</h2>
                    <p>Share your experience with our therapists & give us feedback.</p>
                    <p>We'll be glad to hear from you.</p>
                </div>

                <div className="feedback-section">
                    <h3>Share Your Experience</h3>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            value={user?.email || ''} 
                            placeholder="Email"
                            readOnly
                            required
                        />

                        <textarea
                            placeholder="Give your feedback..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            maxLength={maxChars}
                            required
                        />
                        <p>{text.length}/{maxChars} characters</p>

                        <div className="feed-btns">
                            {!isLoggedin && (
                                <button className='redirect-feedback' onClick={() => { window.location.href = '/login'; }}>
                                    Submit
                                </button>
                            )}
                            {isLoggedin && (
                                <button className='submit-feedback' type='submit'> Submit</button>
                            )}

                            <NavLink to="/quiz">
                                <button type="button">Take Quiz</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Feedback;
