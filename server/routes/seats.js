const express = require('express');
const router = express.Router();

const totalSeats = 80;
let seats = Array(totalSeats).fill(null); // Initially all seats are available

// GET /seats - Get all seats
router.get('/', (req, res) => {
    res.json(seats);
});

// POST /seats/book - Book seats
router.post('/book', (req, res) => {
    const { numSeats } = req.body;
    let bookedSeats = [];

    // Check if there are enough available seats
    const availableSeats = seats.filter(seat => seat === null).length;
    if (availableSeats < numSeats) {
        return res.status(200).json({
            message: `Only ${availableSeats} seats are available. Please try booking ${availableSeats} or fewer seats.`,
            availableSeats: availableSeats
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
        seats: seats
    });
});

module.exports = router;
