import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeatGrid from './components/SeatGrid';
import './App.css';

function App() {
  const [seats, setSeats] = useState([]);
  const [numSeats, setNumSeats] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/seats');
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  const handleBooking = async () => {
    if (numSeats < 1 || numSeats > 7) {
      setMessage('You can book between 1 and 7 seats only.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/seats/book', { numSeats: parseInt(numSeats) });
      setMessage(response.data.message);
      setSeats(response.data.seats);
    } catch (error) {
      console.error('Error booking seats:', error);
    }
  };

  return (
    <div className="App">
      <h1>Train Seat Reservation</h1>

      <SeatGrid seats={seats} />
    </div>
  );
}

export default App;


