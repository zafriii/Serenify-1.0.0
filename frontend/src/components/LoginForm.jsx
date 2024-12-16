import React, { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Showmsg from "./Showmsg"; // Import Showmsg component
import './styles/form.css';
import { useAuth } from '../store/Auth';

function LoginForm() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State for loading spinner
    const [showmsg, setShowmsg] = useState({ message: "", type: "" }); // State for Showmsg

    const navigate = useNavigate();
    const { storeTokenInLs } = useAuth();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start the spinner

        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });

                if (response.ok) {
                    const res_data = await response.json();
                    storeTokenInLs(res_data.token);

                    // Show success message
                    setShowmsg({ message: "Login successful!", type: "success" });

                    setUser({
                        email: "",
                        password: ""
                    });
                    setTimeout(() => navigate("/"), 2000); // Navigate after 2 seconds
                } else {
                    // Show error message
                    setShowmsg({ message: "Invalid credentials. Please try again.", type: "error" });
                }
            } catch (error) {
                console.log("Login Error", error);
                // Show error message
                setShowmsg({ message: "An error occurred. Please try again.", type: "error" });
            } finally {
                setIsLoading(false); // Stop the spinner
            }
        }, 1000); // 1-second delay
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const closeMessage = () => {
        setShowmsg({ message: "", type: "" });
    };

    return (
        <div className="l-form">
            <div className="shape1"></div>
            <div className="shape2"></div>

            {/* Showmsg Component */}
            <Showmsg
                message={showmsg.message}
                type={showmsg.type}
                onClose={closeMessage}
            />

            <div className="form">
                <form onSubmit={handleSubmit} className="form__content">
                    <h2 className="form__title">Login</h2>

                    <div className="form__div form__div-one">
                        <div className="form__icon">
                            <i className='bx bx-user-circle'></i>
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
                                value={user.email} 
                                onChange={handleInput} 
                            />
                        </div>
                    </div>

                    <div className="form__div">
                        <div className="form__icon">
                            <i className='bx bx-lock'></i>
                        </div>

                        <div className="form__div-input">
                            <div className="password">
                                <label htmlFor="password" className="form__label"></label>
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    name="password"
                                    className="form__input" 
                                    id="password" 
                                    placeholder='Enter your password'
                                    required 
                                    value={user.password} 
                                    onChange={handleInput} 
                                />
                                <span 
                                    className="toggle-password" 
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <TbEyeClosed size={24}/> : <FaEye size={24}/>}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="forgot">
                        <NavLink to='/forgot-password'>Forgot password?</NavLink>
                    </div>

                    <button type="submit" className="form__button" disabled={isLoading}>
                        {isLoading ? (
                            <span className="spin"></span> 
                        ) : (
                            "Login"
                        )}
                    </button>

                    <div className="form__social">
                        <span className="form__social-text">
                            Don't Have an account? <NavLink to='/signup'>Sign Up</NavLink>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
