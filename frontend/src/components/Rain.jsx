import React, { useEffect, useState } from 'react';

import './styles/rain.css';

const Rain = () => {
    const [raindrops, setRaindrops] = useState([]);

    useEffect(() => {
        const totalRaindrops = 100; // You can adjust the number of raindrops
        const raindropArray = [];

        for (let i = 0; i < totalRaindrops; i++) {
            const delay = Math.random() * 2; // Random delay for each raindrop
            const left = Math.random() * 100; // Random horizontal position
            const duration = 1 + Math.random() * 2; // Random falling duration

            raindropArray.push({
                id: i,
                delay,
                left,
                duration
            });
        }

        setRaindrops(raindropArray);
    }, []);

    return (
        <div className="rain-container">
            {raindrops.map(({ id, delay, left, duration }) => (
                <div
                    key={id}
                    className="raindrop"
                    style={{
                        left: `${left}vw`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default Rain;
