    // TheatresList.jsx
    import { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import SocketSeatGrid from "./SocketSeatGrid";
    import socket from "../socket"; 
import RazorpayButton from "./RazorpayButton";

    function TheatresList() {
      const { movieId, city } = useParams();
      const [theatres, setTheatres] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [selectedTimeSlot, setSelectedTimeSlot] = useState({});
      const [selectedSeats, setSelectedSeats] = useState({});

      useEffect(() => {
        async function fetchTheatres() {
          try {
            const res = await axios.get(`/user-api/theatres/movie/${movieId}/location/${city}`);
            if (!res.data.payload || res.data.payload.length === 0) {
              setError("No theatres found for this movie in the selected city.");
            } else {
              setTheatres(res.data.payload);
            }
          } catch (err) {
            setError("Failed to fetch theatres.");
            console.error(err);
          }
          setLoading(false);
        }

        fetchTheatres();
      }, [movieId, city]);

      const handleTimeSlotClick = (theatreId, screenId, timeSlot) => {
        const key = `${theatreId}-${screenId}`;
        setSelectedTimeSlot((prev) => ({
          ...prev,
          [key]: prev[key] === timeSlot ? null : timeSlot,
        }));
        setSelectedSeats({});
      };

      const handleSeatClick = (seat,screenId) => {
        setSelectedSeats((prev) => {
          const newSeats = { ...prev };
          if (newSeats[seat.seat_number]) {
            delete newSeats[seat.seat_number];
          } else {
            newSeats[seat.seat_number] = seat;
            /*socket.emit("lock-seat",
              {
              seatNumber: seat.seat_number,
              screenId: screenId, // assuming seat contains this
            });*/
          }
          return newSeats;
        });
      };

      const totalAmount = Object.values(selectedSeats).reduce(
        (acc, seat) => acc + (seat.price || 150),
        0
      );

      return (
        <div className="p-4 max-w-7xl mx-auto w-full">
          <h2 className="text-xl font-semibold mb-4">Available Theatres in {city}</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <ul className="space-y-4">
            {theatres.map((theatre) => (
              <li key={theatre._id} className="p-3 mb-2 border rounded-lg shadow">
                <h3 className="font-semibold text-lg">{theatre.name}</h3>
                {theatre.screens.map((screen) => (
                  <div key={screen.screen_id} className="mt-3 p-2 border rounded-md bg-gray-100">
                    <h4 className="font-medium">{screen.name}</h4>
                    {screen.movies.map((movie) =>
                      movie.movie_id === movieId ? (
                        <div key={movie.movie_id}>
                          <h5 className="text-sm mt-2 font-semibold">Showtimes:</h5>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {movie.time_slots.map((slot, index) => (
                              <button
                                key={index}
                                className={`px-2 py-1 rounded text-sm ${
                                  selectedTimeSlot[`${theatre._id}-${screen.screen_id}`] === slot.time
                                    ? "bg-blue-600 text-white"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                                onClick={() =>
                                  handleTimeSlotClick(theatre._id, screen.screen_id, slot.time)
                                }
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>

                          {/* Seat Grid if time slot selected */}
                          {selectedTimeSlot[`${theatre._id}-${screen.screen_id}`] &&
                            movie.time_slots.map((slot) =>
                              slot.time === selectedTimeSlot[`${theatre._id}-${screen.screen_id}`] ? (
                                <div key={slot.time}>
                                  <p className="mt-2 text-center font-semibold">
                                    Seat Layout for {slot.time}
                                  </p>
                                  <SocketSeatGrid
                                    seats={slot.seats}
                                    screenId={screen.screen_id}
                                    onSeatClick={(seat) => handleSeatClick(seat, screen.screen_id)}
                                    selectedSeats={selectedSeats}
                                    socket={socket}
                                  />
                                  {Object.keys(selectedSeats).length > 0 && (
                                    <div className="mt-4 text-center">
                                      <RazorpayButton amount={totalAmount}

                                      selectedSeats={selectedSeats}
                                      screenId={screen.screen_id}
                                      selectedShowTime={selectedTimeSlot[`${theatre._id}-${screen.screen_id}`]}
                                      theatreId={theatre._id}
                                      movieId={movie.movie_id}
                                      ></RazorpayButton>
                                    </div>
                                  )}
                                </div>
                              ) : null
                            )}
                        </div>
                      ) : null
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default TheatresList;
