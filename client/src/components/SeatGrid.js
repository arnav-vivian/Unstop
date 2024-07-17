import React, { useEffect, useState } from 'react';

const SeatGrid = () => {
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availableSeats, setAvailableSeats] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/seats')
            .then(response => response.json())
            .then(data => {
                setSeats(data.seats);
                setAvailableSeats(data.availableSeats);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching seats:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Available Seats: {availableSeats}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {seats.map((seat, index) => (
                    <div
                        key={index}
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: seat === null ? 'green' : 'red',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeatGrid;
