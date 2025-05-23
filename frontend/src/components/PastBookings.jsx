import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function PastBookings() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null); // store userId in state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded._id);
      console.log('User ID from token:', decoded._id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const getBookings = async () => {
      try {
        console.log("Fetching bookings for user ID:", userId);
        const res = await axios.get(`http://localhost:5000/user-api/bookings/${userId}`);
        if (res.data.message === 'Bookings List') {
          setBookings(res.data.payload);
        }
      } catch (err) {
        console.error('Failed to load bookings:', err);
      }
    };

    getBookings();
  }, [userId]); // depends on userId

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Your Past Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-muted">No bookings found.</p>
      ) : (
        <table className="table table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Movie</th>
              <th>Theatre</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={idx}>
                <td>{b.movieName || b.movieId}</td>
                <td>{b.theatreName || b.theatreId}</td>
                <td>{new Date(b.bookingTime).toLocaleDateString()}</td>
                <td>{b.showTime}</td>
                <td>{b.seatNumbers.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PastBookings;
