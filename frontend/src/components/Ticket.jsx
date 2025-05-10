import { useLocation, useParams } from 'react-router-dom';

function Ticket() {
  const { bookingId } = useParams();
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails; 


  if (!bookingDetails) {
    // Fetch booking details from API using the bookingId
    // You can use `useEffect` to fetch data from the backend if necessary
    // Example:
    // const fetchBookingDetails = async () => {
    //   const response = await axios.get(`/user-api/bookings/${bookingId}`);
    //   setBookingDetails(response.data);
    // };
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Booking Ticket</h2>
      {bookingDetails ? (
        <div className="border rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-lg text-red-500">Movie: {bookingDetails.movieName}</h3>
          <p className="mt-2">Theatre: {bookingDetails.theatreName}</p>
          <p className="mt-2">Showtime: {bookingDetails.showTime}</p>
          <p className="mt-2">Seats: {bookingDetails.seatNumbers.join(", ")}</p>
          <p className="mt-2">Amount Paid: ₹{bookingDetails.amountPaid}</p>
          <p className="mt-2">Booking Time: {new Date(bookingDetails.bookingTime).toLocaleString()}</p>
          <p className="mt-2 font-bold text-green-600">Status: {bookingDetails.status}</p>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
}

export default Ticket;
