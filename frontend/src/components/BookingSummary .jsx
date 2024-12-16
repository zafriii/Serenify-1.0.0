import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/booking.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../store/Auth';
import Feedback from './Feedback';

const BookingSummary = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const [selectedDoctor, setSelectedDoctor] = useState(''); 
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const itemsPerPage = 10; 
    const { user, isLoggedin } = useAuth();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppointments(response.data.appointments);
                setFilteredAppointments(response.data.appointments); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Calculate the current page appointments
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

    // Change page handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle doctor's filter selection
    const handleDoctorFilterChange = (e) => {
        const selectedDoctor = e.target.value;
        setSelectedDoctor(selectedDoctor);

        // Filter appointments based on selected doctor
        if (selectedDoctor === '') {
            setFilteredAppointments(appointments); // No filter, show all
        } else {
            const filtered = appointments.filter(
                (appointment) => appointment.doctorName === selectedDoctor
            );
            setFilteredAppointments(filtered);
        }
        setCurrentPage(1); // Reset to the first page when filtering
    };

    // Get unique doctor names
    const doctorNames = [...new Set(appointments.map((appointment) => appointment.doctorName))];

    // Get the number of appointments for the selected doctor
    const doctorAppointmentCount = appointments.filter(
        (appointment) => appointment.doctorName === selectedDoctor
    ).length;

    if (loading) return <div className='bookings-loading'><p>Loading...</p></div>;

    return (
        <>
            <Navbar />

            <div className="bookings">
                
            {isLoggedin ? (

            <>
            <h3>{user.username}, your appointments till now</h3>

            {/* Doctor filter selector */}
            <div className="doctor-filter">
                <label htmlFor="doctor-filter">Filter by Doctor: </label>
                <select
                    id="doctor-filter"
                    value={selectedDoctor}
                    onChange={handleDoctorFilterChange}
                >
                    <option value="">All Doctors</option>
                    {doctorNames.map((doctor) => (
                        <option key={doctor} value={doctor}>
                            {doctor}
                        </option>
                    ))}
                </select>
            </div>

            {appointments.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                <>
                    <div className="doctor-appointment-count">
                        {selectedDoctor && (
                            <p className='number'>{`Number of appointments with  ${selectedDoctor}: ${doctorAppointmentCount}`}</p>
                        )}
                    </div>

                    <table className="appointments-table">
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>Specialty</th>
                                <th>Appointment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAppointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.doctorName}</td>
                                    <td>{appointment.specialty}</td>
                                    <td>
                                        {new Date(appointment.date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="pagination">
                        {[...Array(Math.ceil(filteredAppointments.length / itemsPerPage)).keys()].map((number) => (
                            <button
                                key={number + 1}
                                onClick={() => paginate(number + 1)}
                                className={currentPage === number + 1 ? 'active-page' : ''}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </>
    ) : (
        <h3>Login to book or see your appointments (If have any)</h3>
    )}
    </div>


            <Footer />
        </>
    );
};

export default BookingSummary;
