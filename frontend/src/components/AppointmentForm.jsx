import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import UserLocationMap from './UserLocationMap'; 
import Showmsg from './Showmsg';  
import './styles/appointment.css';

const AppointmentForm = ({ doctor }) => {
    const { user, isLoggedin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        email: user?.email || '',
        phone: user?.phone || '',
        isStudent: '',
        doctorName: doctor?.name || '',
        specialty: doctor?.specialty || '',
        date: '',
        userId: user?._id || ''
    });

    const [discountMessage, setDiscountMessage] = useState('');
    const [finalFee, setFinalFee] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({});
    const [showRegionModal, setShowRegionModal] = useState(false); 
    const [country, setCountry] = useState('');
    const [showmsg, setShowmsg] = useState({ message: "", type: "" }); 
    const [loading, setLoading] = useState(false); 

    //Location Handling

    const handleLocationChange = (newCountry) => {
        setCountry(newCountry);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'radio' ? value : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLoggedin) {
            window.location.href = '/login';
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) return alert("Please log in to book an appointment.");

        if (country === 'Bangladesh') {
            setBookingDetails({
                ...formData,
                email: user.email,
                phone: user.phone,
            });
            setShowModal(true); 
        } else {
            setShowRegionModal(true); 
        }
    };

    const handleConfirm = async () => {
        const token = localStorage.getItem('token');
        setLoading(true); 
        try {
            const response = await axios.post(
                'http://localhost:5000/api/appointments',
                {
                    ...formData,
                    email: user.email,
                    phone: user.phone
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 201) {
                setShowmsg({ message: 'Appointment booked successfully!', type: 'success' });
                setDiscountMessage(response.data.discountMessage);
                setFinalFee(response.data.finalFee);
                setFormData({
                    name: '',
                    age: '',
                    gender: '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    isStudent: '',
                    doctorName: doctor?.name || '',
                    specialty: doctor?.specialty || '',
                    date: '',
                    userId: user?._id || ''
                });
                setShowModal(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setShowmsg({ message: error.response.data.message, type: 'error' });
            } else {
                setShowmsg({ message: 'Failed to book appointment. Please try again.', type: 'error' });
            }
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseRegionModal = () => setShowRegionModal(false);

    const closeMessage = () => {
        setShowmsg({ message: "", type: "" });
    };

    return (
            <>

            <Showmsg
                message={showmsg.message}
                type={showmsg.type}
                onClose={closeMessage}
            />

             <UserLocationMap onLocationChange={handleLocationChange} />
            <div className="appoint-country">
              <h2> {user.username}'s Location: {country || 'Not available yet'}</h2>
            </div>
            <div className="appointment-form-section">
                <h3>Book an Appointment</h3>


                <form onSubmit={handleSubmit}>                 
                    
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder='Enter name...'
                    />
                </label>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        placeholder='Enter age...'
                    />
                </label>
                <label>Gender:</label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                        required
                    />
                    Male
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                        required
                    />
                    Female
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={handleChange}
                        required
                    />
                    Other
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        placeholder='Enter email...'
                        value={user.email}
                        readOnly
                        required
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        placeholder='Enter phone...'
                        value={user.phone}
                        readOnly
                        required
                    />
                </label>
                <label>Student Status:</label>
                <label>
                    <input
                        type="radio"
                        name="isStudent"
                        value="Student"
                        checked={formData.isStudent === 'Student'}
                        onChange={handleChange}
                    />
                    Student
                </label>
                <label>
                    <input
                        type="radio"
                        name="isStudent"
                        value="Non-Student"
                        checked={formData.isStudent === 'Non-Student'}
                        onChange={handleChange}
                    />
                    Non-Student
                </label>
                <label>
                    Therapist:
                    <input
                        type="text"
                        value={formData.doctorName}
                        readOnly
                        required
                    />
                </label>
                <label>
                    Specialty:
                    <input
                        type="text"
                        value={formData.specialty}
                        readOnly
                        required
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Book Appointment</button>
            </form>
               
            {discountMessage && (
                <div className="discount-message">
                    <p>{discountMessage}</p>
                    <p>Main fee 500 BDT</p>
                    <p>Fee after discount: {finalFee} BDT</p>
                </div>
            )}

           
            {showModal && (
                <div className="appoint-modal-overlay">
                    <div className="appoint-modal-content">
                        <h4>Booking Details</h4>
                        <ul>
                            <li><strong>Name:</strong> {bookingDetails.name}</li>
                            <li><strong>Age:</strong> {bookingDetails.age}</li>
                            <li><strong>Gender:</strong> {bookingDetails.gender}</li>
                            <li><strong>Email:</strong> {bookingDetails.email}</li>
                            <li><strong>Phone:</strong> {bookingDetails.phone}</li>
                            <li><strong>Student Status:</strong> {bookingDetails.isStudent}</li>
                            <li><strong>Doctor:</strong> {bookingDetails.doctorName}</li>
                            <li><strong>Specialty:</strong> {bookingDetails.specialty}</li>
                            <li><strong>Date: </strong>
                            {new Date(bookingDetails.date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                            </li>
                        </ul>
                        <div>
                            <button onClick={handleConfirm} disabled={loading}>
                                {loading ? 'Confirming...' : 'Confirm'}
                            </button>
                            <button onClick={handleCloseModal} disabled={loading}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


                {showRegionModal && (
                    <div className="appoint-modal-overlay">
                        <div className="appoint-modal-content">
                            <h4>Feature Unavailable</h4>
                            <p>This feature isn't available in your region.</p>
                            <button onClick={handleCloseRegionModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            </>
    );
};

export default AppointmentForm;


