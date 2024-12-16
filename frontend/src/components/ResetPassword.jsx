import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/form.css'; // Make sure your styles are applied
import { MdOutlineCheckCircle } from "react-icons/md"; // You can change the icon if needed
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

const ResetPassword = () => {
    const { resetToken } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State for loading spinner
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading spinner
        try {
            const response = await fetch(`http://localhost:5000/api/auth/reset-password/${resetToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsLoading(false); // Stop loading spinner
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="l-form">
            <div className="shape1"></div>
            <div className="shape2"></div>

            <div className="reset-form">
                <h2 className="form__title">Reset Password</h2>
                <form onSubmit={handleSubmit} className="form__content">
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
                                placeholder='Enter new password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                    <p>password must be 6 characters</p>
                    <button type="submit" className="form__button" disabled={isLoading}>
                        {isLoading ? (
                            <span className="spin"></span> // Spinner element
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                {message && <p className="form__message">{message} <MdOutlineCheckCircle size={24} /></p>}
                
            </div>
        </div>
    );
};

export default ResetPassword;
