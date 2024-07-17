const express = require('express');
const router = express.Router();

const totalSeats = 80;
let seats = Array(totalSeats).fill(null); // Initially all seats are available

// Helper function to get the number of available seats
// Inside your /seats route
app.get('/seats', (req, res) => {
    const availableSeats = seats.filter(seat => seat === null).length;
    res.json({ seats: seats, availableSeats: availableSeats });
});

// Inside your /book route, update the response to include availableSeats
app.post('/book', (req, res) => {
    const { numSeats } = req.body;
    let bookedSeats = [];

    // Check if there are enough available seats
    const availableSeats = seats.filter(seat => seat === null).length;
    if (availableSeats < numSeats) {
        return res.status(200).json({
            message: `Only ${availableSeats} seats are available. Please try booking ${availableSeats} or fewer seats.`,
            availableSeats: availableSeats,
            seats: seats
        });
    }

    // Try to find a single row with enough seats
    for (let i = 0; i < seats.length; i += 7) {
        const row = seats.slice(i, i + 7);
        const availableSeatsInRow = row.filter(seat => seat === null).length;

        if (availableSeatsInRow >= numSeats) {
            for (let j = 0; j < 7 && bookedSeats.length < numSeats; j++) {
                if (seats[i + j] === null) {
                    seats[i + j] = true;
                    bookedSeats.push(i + j + 1);
                }
            }
            return res.json({
                message: 'Seats successfully booked',
                bookedSeats: bookedSeats,
                availableSeats: seats.filter(seat => seat === null).length,
                seats: seats
            });
        }
    }

    // If no single row is found, book nearby seats
    for (let i = 0; i < seats.length && bookedSeats.length < numSeats; i++) {
        if (seats[i] === null) {
            seats[i] = true;
            bookedSeats.push(i + 1);
        }
    }

    res.json({
        message: 'Seats successfully booked',
        bookedSeats: bookedSeats,
        availableSeats: seats.filter(seat => seat === null).length,
        seats: seats
    });
});
