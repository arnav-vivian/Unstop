import React from 'react';
import Seat from './Seat';

const SeatRow = ({ row, rowIndex }) => (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
        {row.map((seat, index) => (
            <Seat key={index} status={seat} seatNumber={rowIndex * 7 + index + 1} />
        ))}
    </div>
);

export default SeatRow;
