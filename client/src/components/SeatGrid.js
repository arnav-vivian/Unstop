import React from 'react';
import Seat from './Seat';
// import './SeatGrid.css';

function SeatGrid({ seats }) {
    return (
        <div className="seat-grid">
            {seats.map((seat, index) => (
                <Seat key={index} seat={seat} index={index} />
            ))}
        </div>
    );
}

export default SeatGrid;
