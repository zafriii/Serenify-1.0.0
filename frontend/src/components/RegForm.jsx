import React, { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { NavLink, useNavigate } from 'react-router-dom';
import Showmsg from "./Showmsg"; 
import './styles/form.css';
import { useAuth } from '../store/Auth';

function RegForm() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [showmsg, setShowmsg] = useState({ message: "", type: "" }); 

    const navigate = useNavigate();
    const { storeTokenInLs } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });

        const updatedErrors = { ...errors };

        // Validation
        if (name === 'username' && value.length < 3) {
            updatedErrors.username = 'Username must be at least 3 characters long';
        } else if (name === 'username') {
            updatedErrors.username = '';
        }
    
        if (name === 'email') {
            if (!value) {
                updatedErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                updatedErrors.email = "Invalid email address";
            } else {
                updatedErrors.email = "";
            }
        }
    
        if (name === 'password' && value.length < 6) {
            updatedErrors.password = 'Password must be at least 6 characters long';
        } else if (name === 'password') {
            updatedErrors.password = '';
        }
    
        setErrors(updatedErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
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
                setShowmsg({ message: "Registration successful!", type: "success" });

                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                });

                setTimeout(() => navigate("/"), 2000); // Navigate after 2 seconds
            } else if (response.status === 400) {
                const res_data = await response.json();
                if (res_data.message === "Email already exists") {
                    setShowmsg({ message: "Email already exists. Please use a different email.", type: "error" });
                } else if (res_data.message === "Username taken") {
                    setShowmsg({ message: "Username already taken. Please choose a different username.", type: "error" });
                } else {
                    setShowmsg({ message: "Registration failed. Please try again later.", type: "error" });
                }
            } else {
                setShowmsg({ message: "Registration failed. Please try again later.", type: "error" });
            }
        } catch (error) {
            console.log("Registration Error", error);
            setShowmsg({ message: "Something went wrong. Please try again.", type: "error" });
        } finally {
            setIsLoading(false); // Stop loading spinner
        }
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
                    <h2 className="form__title">Signup</h2>

                    <div className="form__div form__div-one">
                        <div className="form__icon">
                            <i className='bx bx-user-circle'></i>
                        </div>
                        <div className="form__div-input">
                            <input 
                                type="text" 
                                className="form__input" 
                                name="username"
                                placeholder="Username"
                                value={user.username}
                                onChange={handleInput}
                                required
                            />
                            {errors.username && <div className="error-message">{errors.username}</div>}
                        </div>
                    </div>

                    <div className="form__div form__div-one">
                        <div className="form__icon">
                            <i className='bx bx-envelope'></i>
                        </div>
                        <div className="form__div-input">
                            <input 
                                type="email" 
                                className="form__input" 
                                name="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={handleInput}
                                required
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                    </div>

                    <div className="form__div form__div-one">
                        <div className="form__icon">
                            <i className='bx bx-phone'></i>
                        </div>
                        <div className="form__div-input">
                            <input 
                                type="number" 
                                className="form__input" 
                                name="phone"
                                placeholder="Phone No"
                                value={user.phone}
                                onChange={handleInput}
                                required
                            />
                        </div>
                    </div>

                    <div className="form__div">
                        <div className="form__icon">
                            <i className='bx bx-lock'></i>
                        </div>
                        <div className="form__div-input">
                            <div className="password">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    className="form__input" 
                                    name="password"
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={handleInput}
                                    required
                                />
                                <span className="toggle-password" onClick={togglePasswordVisibility}>
                                    {showPassword ? <TbEyeClosed size={24}/> : <FaEye size={24}/>}
                                </span>
                                {errors.password && <div className="error-message">{errors.password}</div>}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="form__button" disabled={isLoading}>
                        {isLoading ? <span className="spin"></span> : "Signup"}
                    </button>

                    <div className="form__social">
                        <span className="form__social-text">
                            Already have an account? <NavLink to='/login'>Login</NavLink>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegForm;
