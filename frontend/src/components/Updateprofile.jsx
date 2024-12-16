import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/Auth';
import { TbEyeClosed } from 'react-icons/tb';
import { FaEye } from 'react-icons/fa';
import './styles/profile.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Showmsg from './Showmsg'; // Import Showmsg component

function Updateprofile() {
    const { user, setUser, storeTokenInLs } = useAuth(); 
    const [updatedUser, setUpdatedUser] = useState({
        email: user.email,
        username: user.username,
        phone: user.phone,
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [showmsg, setShowmsg] = useState({ message: "", type: "" }); // State for Showmsg

    useEffect(() => {
        setUpdatedUser({
            email: user.email,
            username: user.username,
            phone: user.phone,
            password: ""
        });
    }, [user]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUpdatedUser({
            ...updatedUser,
            [name]: value
        });

        // Validate username
        if (name === 'username' && value.length < 3) {
            setErrors({ ...errors, username: 'Username must be at least 3 characters long' });
        } else {
            setErrors({ ...errors, username: '' });
        }

        // Validate phone
        if (name === 'phone' && value.length < 10) { // Adjust validation as needed
            setErrors({ ...errors, phone: 'Phone number must be at least 10 digits' });
        } else {
            setErrors({ ...errors, phone: '' });
        }

        // Validate password
        if (name === 'password' && value.length > 0 && value.length < 6) {
            setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
        } else {
            setErrors({ ...errors, password: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start the loading spinner

        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/update_profile`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Include token for authorization
                    },
                    body: JSON.stringify(updatedUser)
                });

                if (response.ok) {
                    const res_data = await response.json();
                    // Store the new token
                    localStorage.setItem('token', res_data.token); // Store the new token
                    storeTokenInLs(res_data.token); 
                    setUser(res_data.user); 
                    setShowmsg({ message: "Profile updated successfully", type: "success" });
                } else {
                    const res_data = await response.json();
                    // Handle the "Username taken" message
                    if (res_data.message === "Username taken") {
                        setShowmsg({ message: "Username already taken. Please choose a different username.", type: "error" });
                    } else if (response.status === 400) {
                        setShowmsg({ message: "Failed to update profile. Please try again.", type: "error" });
                    } else {
                        setShowmsg({ message: "Server error. Please try again later.", type: "error" });
                    }
                }
            } catch (error) {
                console.log("Update Profile Error", error);
                setShowmsg({ message: "An error occurred. Please try again.", type: "error" });
            } finally {
                setIsLoading(false); // Stop the loading spinner
            }
        }, 1000); // 1-second delay for visual effect
    };

    const closeMessage = () => {
        setShowmsg({ message: "", type: "" });
    };

    return (
        <>
            <Navbar />

            {/* Showmsg Component */}
            <Showmsg
                message={showmsg.message}
                type={showmsg.type}
                onClose={closeMessage}
            />

            <div className="l-form">
                <div className="shape2"></div>

                <div className="form">
                    <form onSubmit={handleSubmit} className="form__content">
                        <h2 className="form__title">Update Profile</h2>

                        <div className="form__div form__div-one">
                            <div className="form__icon">
                                <i className='bx bx-user-circle'></i>
                            </div>
                            <div className="form__div-input">
                                <label htmlFor="username" className="form__label"></label>
                                <input
                                    type="text"
                                    className="form__input"
                                    name="username"
                                    placeholder="Username"
                                    value={updatedUser.username}
                                    onChange={handleInput}
                                    required
                                />
                                {errors.username && <div className="error-message">{errors.username}</div>}
                            </div>
                        </div>

                        <div className="form__div form__div-one">
                            <div className="form__icon">
                                <i className='bx bx-phone'></i>
                            </div>
                            <div className="form__div-input">
                                <label htmlFor="phone" className="form__label"></label>
                                <input
                                    type="tel" 
                                    className="form__input"
                                    name="phone"
                                    placeholder="Phone No"
                                    value={updatedUser.phone}
                                    onChange={handleInput}
                                    required
                                />
                                {errors.phone && <div className="error-message">{errors.phone}</div>}
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
                                        className="form__input"
                                        name="password"
                                        placeholder="New Password (Optional)"
                                        value={updatedUser.password}
                                        onChange={handleInput}
                                    />
                                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                                        {showPassword ? <TbEyeClosed size={24} /> : <FaEye size={24} />}
                                    </span>
                                    {errors.password && <div className="error-message">{errors.password}</div>}
                                </div>
                            </div>
                        </div>

                        <input type="submit" className="form__button" value={isLoading ? "Updating..." : "Update Profile"} disabled={isLoading} />
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Updateprofile;
