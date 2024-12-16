import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import DoctorsData from './data/Doctorsdata';
import './styles/drlist.css'
import Navbar from './Navbar';
import Footer from './Footer';
import SideBar from './Sidebar';
import Doctorsec from './Doctorsec';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DoctorList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter doctors based on search query
    const filteredDoctors = DoctorsData.filter((doctor) =>
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        AOS.init({ duration: 1000 }); 
      }, []);
    

    return (

        <>
        
        <Navbar/>

        <Doctorsec/>
       
        <div className="dr-list-container">
        <SideBar/>

        <div className='dr-list-texts'>
            <h2>Here're our Professional Therapists</h2>
            <p>We're there for you if you need professional help!</p>
            <p>You'll receive an email once your booking is complete. If you're unable to attend for any reason, please let us know in advance.</p> 
            <input
                type="text"
                placeholder="Search by specialty"
                value={searchQuery}
                onChange={handleSearchChange}
            />

        <div className="dr-list-card-container" data-aos="fade-up">
        <ul className="dr-list">
            {filteredDoctors.map((doctor) => (
            <li key={doctor.id} className="dr-list-item">
                <div className="dr-list-card" data-aos="fade-up">
                <NavLink to={`/doctors/${doctor.id}`}>
                    <strong className="dr-name">{doctor.name}</strong>
                    <p className='dr-specialty'>{doctor.specialty}</p>
                    <p className='dr-fee'>Visit Fee: 500 BDT (Discount based on visit)</p>
                    <p className='dr-time'>Time : Between 3pm - 10pm</p>
                    <button className="dr-book">See more</button>
                </NavLink>
                </div>
            </li>
            ))}
        </ul>
        </div>
        {filteredDoctors.length === 0 && <p>No doctors found for this specialty.</p>} 

        </div>

        </div>     

        <Footer/>
              
        </>
     
    );
};

export default DoctorList;
