import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/form.css'; // Make sure your styles are applied
import { MdOutgoingMail } from "react-icons/md";


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State for loading spinner
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading spinner

        try {
            const response = await fetch(`http://localhost:5000/api/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setMessage("Password reset link sent to your email");
                setEmail(""); // Clear the email input
            } else {
                setMessage("Failed to send reset link");
            }
        } catch (error) {
            console.log("Forgot Password Error", error);
            setMessage("Server Error");
        } finally {
            setIsLoading(false); // Stop loading spinner
        }
    };

   

    return (
        <div className="l-form">
            <div className="shape1"></div>
            <div className="shape2"></div>

            <div className="forget-form">
                <h2 className="form__title">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="form__content">
                    <div className="form__div">
                        <div className="form__icon">
                            <i className='bx bx-envelope'></i>
                        </div>
                        <div className="form__div-input">
                            <label htmlFor="email" className="form__label"></label>
                            <input
                                type="email"
                                name="email"
                                className="form__input"
                                id="email"
                                placeholder='Enter your email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="form__button" disabled={isLoading}>
                        {isLoading ? (
                            <span className="spin"></span> 
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>

                {message && <p className="form__message">{message}  <MdOutgoingMail size={24} /> </p>}

                <div className="form__social">
                    <span className="form__social-text">
                        Remembered your password? <NavLink to='/login'>Login</NavLink>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
