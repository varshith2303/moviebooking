import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function PastBookings() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null); // store userId in state
  const navigate=useNavigate();

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
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user-api/bookings/${userId}`);
        console.log("bookings",res);
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
                <td>{b.movie}</td>
                <td>{b.theatre}</td>
                <td>{new Date(b.bookingTime).toLocaleDateString()}</td>
                <td>{b.showTime}</td>
                <td>{Array.isArray(b.seatNumbers) ? b.seatNumbers.join(', ') : b.seatNumbers || "N/A"}</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => navigate('/userprofile') } className='bg-slate-500 p-2 rounded'>Back to Profile</button>
    </div>
  );
}

export default PastBookings;
