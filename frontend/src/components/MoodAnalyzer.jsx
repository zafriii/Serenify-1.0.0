import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';  // Import both Line and Pie charts
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Colors } from 'chart.js';  // Import necessary Chart.js components
import axios from 'axios';
import './styles/moodanalyzer.css';
import Footer from './Footer';
import Navbar from './Navbar';
import Showmsg from './Showmsg'; // Import Showmsg component
import { useAuth } from '../store/Auth';

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend
);

const MoodAnalyzer = () => {
    const [status, setStatus] = useState('');
    const [moodCounts, setMoodCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [showmsg, setShowmsg] = useState({ message: "", type: "" }); // Message state
    const { user, isLoggedin } = useAuth();

    const fetchMentalHealthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setShowmsg({ message: 'Please log in to view your mental health status.', type: 'error' });
                return;
            }

            const response = await axios.get('http://localhost:5000/api/moods', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { moodCount, mentalHealthStatus } = response.data;
            setMoodCounts(moodCount || {});
            setStatus(mentalHealthStatus || 'Unknown');
        } catch (error) {
            console.error('Error fetching mood history:', error.response?.data || error.message);
            setShowmsg({ message: 'Failed to fetch mood history.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const saveMood = async (mood) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return alert('Please log in to save your mood.');

            const response = await axios.post(
                'http://localhost:5000/api/moods',
                { mood },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { moodCount, mentalHealthStatus } = response.data;
            setMoodCounts(moodCount);
            setStatus(mentalHealthStatus);
            setShowmsg({ message: 'Mood saved successfully!', type: 'success' });
        } catch (error) {
            console.error('Error saving mood:', error.response?.data || error.message);
            setShowmsg({ message: 'Failed to save mood.', type: 'error' });
        }
    };

    // Data for the Line chart
    const getLineChartData = () => {
        const labels = ['Happy', 'Sad', 'Angry', 'Depressed', 'Frustrated', 'Heartbroken'];
        const data = labels.map((mood) => moodCounts[mood.toLowerCase()] || 0);

        return {
            labels,
            datasets: [
                {
                    label: 'Mood Count',
                    data,
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',  
                    tension: 0.7,
                    
                },
            ],
        };
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 6, // Controls the width of the circle
                    boxHeight: 6,
                    font: {
                        size: 15, // Adjust font size of legend labels
                    },  // This will make the legend items appear as circles
                },
               
            },
        },
    };

    // Data for the Pie chart
    const getPieChartData = () => {
        const labels = ['Happy', 'Sad', 'Angry', 'Depressed', 'Frustrated', 'Heartbroken'];
        const data = labels.map((mood) => moodCounts[mood.toLowerCase()] || 0);

        return {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)', 
                        'rgba(255, 99, 132, 0.6)', 
                        'rgba(255, 159, 64, 0.6)', 
                        'rgba(153, 102, 255, 0.6)', 
                        'rgba(54, 162, 235, 0.6)', 
                        'rgba(255, 222, 86, 0.6)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    useEffect(() => {
        fetchMentalHealthStatus();
    }, []);

    const closeMessage = () => {
        setShowmsg({ message: "", type: "" });
    };



    //Number of days since joining

    const calculateDaysSinceCreation = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    
    const timeDifference = currentDate - createdDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1;; // Convert milliseconds to days
    
    return daysDifference;
   };
  
   const daysSinceCreation = calculateDaysSinceCreation(user.createdAt);

    const getOrdinalSuffix = (day) => {
        if (day % 10 === 1 && day % 100 !== 11) return 'st';
        if (day % 10 === 2 && day % 100 !== 12) return 'nd';
        if (day % 10 === 3 && day % 100 !== 13) return 'rd';
        return 'th';
    };
  
   const ordinalDay = `${daysSinceCreation}${getOrdinalSuffix(daysSinceCreation)}`;

    return (
        <>
            <Navbar />

            <Showmsg
                    message={showmsg.message}
                    type={showmsg.type}
                    onClose={closeMessage}
                />

            <div className="analysis-container">
                
                <div className="analysis-header">
                {isLoggedin && user?.username ? (
                    <h2 className="greeting">
                        Hey <span className="username">{user.username}</span>, how are you feeling today?
                    </h2>
                ) : (
                    <h2 className="greeting">Hey, how are you feeling today?</h2>
                )}
                </div>

                <div className="day">
                {isLoggedin && (
                <p>It's your <span className='day-no'>{ordinalDay}</span> day on your mental wellness journey!</p>
                )}
                </div>
    

                <div className="mood-buttons">
                    {['happy', 'sad', 'angry', 'depressed', 'frustrated', 'heartbroken'].map((mood) => (
                        <button key={mood} onClick={() => saveMood(mood)} className="mood-button">
                            {mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="loading-message">Loading mental health status...</p>
                ) : (
                    <div className="analysis-section">

                        <h2 className="analysis-title">Mental Health Analysis</h2>

                        {/* <p className="status">Your mental health status: {status}</p> */}
                        
                        {isLoggedin && (
                        <p className="status">Your mental health status: {status}</p>
                        )}

                        {Object.keys(moodCounts).length === 0 ? (
                            <p className="no-data-message">No mood data available</p>
                        ) : (
                            <div className="chart-container">
                                <div className="chart">
                                    <Line data={getLineChartData()} options={options}/>
                                </div>
                                <div className="chart pie-chart-container">
                                    <h3>Mood Distribution</h3>
                               
                                    <Pie data={getPieChartData()} />

                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default MoodAnalyzer;












