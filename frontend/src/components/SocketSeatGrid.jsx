import { useEffect, useState } from "react";

function SocketSeatGrid({ seats, screenId, onSeatClick, selectedSeats, socket }) {
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    socket.on("seat-update", ({ seatNumbers, screen }) => {
      if (screen === screenId) {
        setBookedSeats((prev) => [...new Set([...prev, ...seatNumbers])]);
      }
    });
  
    return () => {
      socket.off("seat-update");
    };
  }, [socket, screenId]);

  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3 p-4 bg-white border rounded-xl shadow-md">
      {seats.map((seat, idx) => {
        const isSelected = selectedSeats[seat.seat_number];
        const isBooked = seat.isBooked || bookedSeats.includes(seat.seat_number);

        return (
          <div
            key={idx}
            className={`text-xs sm:text-sm text-center p-2 border-2 rounded cursor-pointer transition-all duration-200
              ${isBooked
                ? "bg-gray-400 text-white border-gray-600 cursor-not-allowed"
                : isSelected
                ? "bg-green-500 text-white border-green-700"
                : "bg-white text-black border-green-500 hover:bg-green-100"}`}
            onClick={() => !isBooked && onSeatClick(seat)}
          >
            {seat.seat_number}
          </div>
        );
      })}
    </div>
  );
}

export default SocketSeatGrid;
