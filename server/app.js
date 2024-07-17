const express = require('express');
const cors = require('cors');
const seatsRouter = require('./routes/seats');

const app = express();
app.use(cors());
app.use(express.json());

// Use the seats router for all routes under /seats
app.use('/seats', seatsRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Train Seat Reservation API');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
