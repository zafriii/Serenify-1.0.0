import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { BiSolidDetail } from "react-icons/bi";
import { AnimatePresence, motion } from 'framer-motion';
import './styles/sidebar.css';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="main-container">
            <motion.div
                animate={{
                    width: isOpen ? "180px" : "45px",
                    // transition: {
                    //     duration: 1,
                    //     type: "spring",
                    //     damping: 5,
                    // },
                }}
                className="sidebar"
            >
                <div className="top_section">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.h1
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="logo"
                            >
                                <p>Serenify</p>
                            </motion.h1>
                        )}
                    </AnimatePresence>
                    <div className="bars">
                      <FaBarsStaggered onClick={toggle} />
                        
                    </div>
                </div>

               
                <AnimatePresence>

                

                    {isOpen && (
                        <motion.div
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                        >
                            <div className="booking-link">
                                <BiSolidDetail size={20}  className='book-icon'/> 
                                <NavLink to='/booking_details'>Booking Details</NavLink>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default SideBar;
