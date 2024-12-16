import React, { useState, useEffect } from 'react';
import './styles/appointment.css'

function UserLocation({ onLocationChange }) {
    const [location, setLocation] = useState(null); // To store the user's country
    const [error, setError] = useState(null); // To store any error messages

    useEffect(() => {
        // Check if geolocation is available in the browser
        if (navigator.geolocation) {
            // Use geolocation to fetch the user's current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Fetch country information using the OpenCage Geocoding API
                    fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5b1f9abf95ec453f8fefbfb1b6d6adea`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.results && data.results.length > 0) {
                                const country = data.results[0].components.country;
                                setLocation(country);

                                // Send the country data to the parent component
                                if (onLocationChange) {
                                    onLocationChange(country);
                                }
                            } else {
                                setError('Unable to retrieve location information.');
                            }
                        })
                        .catch(() => {
                            setError('Error fetching location data. Please try again later.');
                        });
                },
                (error) => {
                    // Handle geolocation errors
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setError('You have denied access to your location.');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setError('Your location is unavailable.');
                            break;
                        case error.TIMEOUT:
                            setError('The request to get your location timed out.');
                            break;
                        default:
                            setError('An unknown error occurred.');
                            break;
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    }, [onLocationChange]); // Rerun effect if onLocationChange changes

    return (
        <div>
            {location ? (
                <p></p>
            ) : error ? (
                <p className='location-error' style={{ color: 'red' }}>{error}</p>
            ) : (
                <p className='load-location'>Loading location...</p>
            )}
        </div>
    );
}

export default UserLocation;
