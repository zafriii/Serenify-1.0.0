import React from 'react';
import { useParams } from 'react-router-dom';
import DoctorsData from './data/Doctorsdata';
import AppointmentForm from './AppointmentForm';
import './styles/drdetails.css'

import Navbar from './Navbar';
import Footer from './Footer';

const DoctorDetails = () => {
    const { id } = useParams();
    const doctor = DoctorsData.find((doc) => doc.id === parseInt(id));

    // if (!doctor) {
    //     return <h2>Doctor not found</h2>;
    // }

    return (
    
    <>
    
    <Navbar />
    
    <div className="details-form">

        <div className='dr-details'>
            <h1>{doctor.name}</h1>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Bio:</strong> {doctor.bio}</p>
            <p><strong>Experience:</strong> {doctor.experience}</p>
            <p><strong>Contact:</strong> {doctor.contact}</p>
            <p><strong>Phone No:</strong> {doctor.phone}</p>
        </div>

        <div className="appoint-form">
            <AppointmentForm doctor={doctor} />
        </div>


       </div>   
    
    <Footer/>
    
    </>
    );
};

export default DoctorDetails;
